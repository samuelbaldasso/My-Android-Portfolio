import { PinnedRepository } from '@/data/pinned.types';
import { fallbackPinnedRepositories } from '@/data/pinned.fallback';
import generatedPinnedJson from '@/data/pinned.generated.json';

export interface RawGraphQLRepository {
  name: string;
  description: string | null;
  url: string;
  homepageUrl?: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage?: {
    name: string;
    color?: string;
  } | null;
  repositoryTopics?: {
    nodes?: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  pushedAt: string;
  object?: {
    text?: string;
  } | null;
}

/**
 * Checks whether a repository is an Android/Kotlin project based on language or topics.
 */
export function isAndroidRepository(repo: {
  primaryLanguage?: { name: string } | null;
  repositoryTopics: string[];
}): boolean {
  const lang = repo.primaryLanguage?.name?.toLowerCase() || '';
  const topics = repo.repositoryTopics.map((t) => t.toLowerCase());

  return (
    lang === 'kotlin' ||
    topics.includes('android') ||
    topics.includes('jetpack-compose') ||
    topics.includes('kotlin')
  );
}

/**
 * Maps a single GitHub GraphQL repository node into our typed PinnedRepository.
 */
export function mapGraphQLPinnedItem(raw: RawGraphQLRepository): PinnedRepository {
  const topics =
    raw.repositoryTopics?.nodes?.map((node) => node.topic.name) || [];
  const isAndroid = isAndroidRepository({
    primaryLanguage: raw.primaryLanguage,
    repositoryTopics: topics,
  });

  const slug = raw.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    name: raw.name,
    slug,
    title: raw.name.replace(/[-_]/g, ' '),
    description: raw.description,
    url: raw.url,
    homepageUrl: raw.homepageUrl || null,
    stargazerCount: raw.stargazerCount || 0,
    forkCount: raw.forkCount || 0,
    primaryLanguage: raw.primaryLanguage || null,
    repositoryTopics: topics,
    pushedAt: raw.pushedAt,
    isAndroid,
    readme: raw.object?.text || undefined,
  };
}

/**
 * Sorts repositories placing Android/Kotlin projects first, then by date of last push.
 */
export function sortRepositories(repos: PinnedRepository[]): PinnedRepository[] {
  return [...repos].sort((a, b) => {
    // 1. Android/Kotlin first
    if (a.isAndroid && !b.isAndroid) return -1;
    if (!a.isAndroid && b.isAndroid) return 1;

    // 2. Most recent push date
    const dateA = new Date(a.pushedAt).getTime();
    const dateB = new Date(b.pushedAt).getTime();
    return dateB - dateA;
  });
}

/**
 * Loads all pinned repositories with fallback support and case study enrichment.
 */
export async function getPinnedRepositories(): Promise<PinnedRepository[]> {
  try {
    const rawList = generatedPinnedJson as unknown as PinnedRepository[];
    if (Array.isArray(rawList) && rawList.length > 0) {
      // Merge with case study rich metadata from fallback if available
      const enriched = rawList.map((item) => {
        const fallbackMatch = fallbackPinnedRepositories.find(
          (f) => f.slug === item.slug || f.name.toLowerCase() === item.name.toLowerCase()
        );
        if (!fallbackMatch) return item;

        return {
          ...item,
          title: fallbackMatch.title || item.title,
          screenshots: fallbackMatch.screenshots || item.screenshots,
          architectureSummary: fallbackMatch.architectureSummary || item.architectureSummary,
          tradeOffs: fallbackMatch.tradeOffs || item.tradeOffs,
          highlightCode: fallbackMatch.highlightCode || item.highlightCode,
          releasesUrl: fallbackMatch.releasesUrl || item.releasesUrl,
          playStoreUrl: fallbackMatch.playStoreUrl || item.playStoreUrl,
        };
      });

      return sortRepositories(enriched);
    }
  } catch {
    // Silently fall back to fallbackPinnedRepositories
  }

  return sortRepositories(fallbackPinnedRepositories);
}

/**
 * Gets a single project by slug for the dynamic case study page.
 */
export async function getProjectBySlug(slug: string): Promise<PinnedRepository | null> {
  const allProjects = await getPinnedRepositories();
  const match = allProjects.find((p) => p.slug === slug);
  return match || null;
}
