export interface PinnedRepository {
  name: string;
  slug: string;
  title: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color?: string;
  } | null;
  repositoryTopics: string[];
  pushedAt: string;
  isAndroid: boolean;
  playStoreUrl?: string;
  releasesUrl?: string;
  readme?: string;
  screenshots?: string[];
  architectureSummary?: {
    pattern: string;
    layers: { name: string; description: string; tech: string[] }[];
  };
  tradeOffs?: {
    decision: string;
    chosen: string;
    alternative: string;
    reason: string;
  }[];
  highlightCode?: {
    title: string;
    language: 'kotlin' | 'gradle' | 'xml' | 'java';
    code: string;
  };
}

export type PinnedRepositoriesList = PinnedRepository[];
