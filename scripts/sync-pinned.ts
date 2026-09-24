import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  mapGraphQLPinnedItem,
  sortRepositories,
  RawGraphQLRepository,
} from '../src/lib/github';
import { fallbackPinnedRepositories } from '../src/data/pinned.fallback';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse .env file manually if exists
function loadEnvFile(envPath: string) {
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

// Load .env.local and .env
loadEnvFile(path.resolve(__dirname, '../.env.local'));
loadEnvFile(path.resolve(__dirname, '../.env'));

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/pinned.generated.json');

const GRAPHQL_QUERY = `
query GetPinnedRepos($username: String!) {
  user(login: $username) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          pushedAt
          object(expression: "HEAD:README.md") {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  }
}
`;

async function syncPinned() {
  console.log('🔄 [sync-pinned] Initiating pinned repositories synchronization...');

  if (!GITHUB_TOKEN || GITHUB_TOKEN === 'your_github_token_here') {
    console.warn(
      '⚠️  [sync-pinned] No valid GITHUB_TOKEN found. Using fallback pinned repositories from src/data/pinned.fallback.ts.'
    );
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(fallbackPinnedRepositories, null, 2),
      'utf-8'
    );
    console.log(`✅ [sync-pinned] Wrote fallback repositories to ${OUTPUT_FILE}`);
    return;
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'samuelbaldasso-portfolio-sync',
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { username: 'samuelbaldasso' },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors && json.errors.length > 0) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`);
    }

    const nodes: RawGraphQLRepository[] =
      json.data?.user?.pinnedItems?.nodes || [];

    if (nodes.length === 0) {
      console.warn(
        '⚠️  [sync-pinned] No pinned items returned from GitHub GraphQL API. Falling back to default list.'
      );
      fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(fallbackPinnedRepositories, null, 2),
        'utf-8'
      );
      return;
    }

    const mapped = nodes.map((node) => {
      const basic = mapGraphQLPinnedItem(node);
      const fallbackMatch = fallbackPinnedRepositories.find(
        (f) => f.slug === basic.slug || f.name.toLowerCase() === basic.name.toLowerCase()
      );

      return {
        ...basic,
        title: fallbackMatch?.title || basic.title,
        screenshots: fallbackMatch?.screenshots || undefined,
        architectureSummary: fallbackMatch?.architectureSummary || undefined,
        tradeOffs: fallbackMatch?.tradeOffs || undefined,
        highlightCode: fallbackMatch?.highlightCode || undefined,
        releasesUrl: fallbackMatch?.releasesUrl || undefined,
        playStoreUrl: fallbackMatch?.playStoreUrl || undefined,
      };
    });

    const sorted = sortRepositories(mapped);

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sorted, null, 2), 'utf-8');
    console.log(
      `✅ [sync-pinned] Successfully synced ${sorted.length} pinned repositories to ${OUTPUT_FILE}`
    );
  } catch (error) {
    console.error('❌ [sync-pinned] Failed to fetch from GitHub GraphQL API:', error);
    console.log('ℹ️  [sync-pinned] Preserving fallback pinned repositories.');
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(fallbackPinnedRepositories, null, 2),
      'utf-8'
    );
  }
}

syncPinned();
