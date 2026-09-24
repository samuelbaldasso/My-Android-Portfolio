import { describe, it, expect } from 'vitest';
import {
  isAndroidRepository,
  mapGraphQLPinnedItem,
  sortRepositories,
  getPinnedRepositories,
  RawGraphQLRepository,
} from '@/lib/github';
import { profile } from '@/data/profile';
import { fallbackPinnedRepositories } from '@/data/pinned.fallback';
import { PinnedRepository } from '@/data/pinned.types';

describe('Data Layer & GitHub Utilities', () => {
  it('correctly detects Android repositories based on language or topics', () => {
    expect(
      isAndroidRepository({
        primaryLanguage: { name: 'Kotlin' },
        repositoryTopics: [],
      })
    ).toBe(true);

    expect(
      isAndroidRepository({
        primaryLanguage: { name: 'Java' },
        repositoryTopics: ['android', 'mobile'],
      })
    ).toBe(true);

    expect(
      isAndroidRepository({
        primaryLanguage: { name: 'Java' },
        repositoryTopics: ['spring-boot', 'backend'],
      })
    ).toBe(false);

    expect(
      isAndroidRepository({
        primaryLanguage: { name: 'TypeScript' },
        repositoryTopics: ['nextjs', 'react'],
      })
    ).toBe(false);
  });

  it('maps raw GraphQL repository node into typed PinnedRepository', () => {
    const raw: RawGraphQLRepository = {
      name: 'Finance-Flow-App',
      description: 'Modern Android FinTech app',
      url: 'https://github.com/samuelbaldasso/Finance-Flow-App',
      homepageUrl: null,
      stargazerCount: 15,
      forkCount: 3,
      primaryLanguage: {
        name: 'Kotlin',
        color: '#A97BFF',
      },
      repositoryTopics: {
        nodes: [
          { topic: { name: 'android' } },
          { topic: { name: 'jetpack-compose' } },
        ],
      },
      pushedAt: '2026-09-24T12:00:00Z',
      object: {
        text: '# Finance Flow README',
      },
    };

    const mapped = mapGraphQLPinnedItem(raw);

    expect(mapped.name).toBe('Finance-Flow-App');
    expect(mapped.slug).toBe('finance-flow-app');
    expect(mapped.stargazerCount).toBe(15);
    expect(mapped.forkCount).toBe(3);
    expect(mapped.primaryLanguage?.name).toBe('Kotlin');
    expect(mapped.repositoryTopics).toEqual(['android', 'jetpack-compose']);
    expect(mapped.isAndroid).toBe(true);
    expect(mapped.readme).toBe('# Finance Flow README');
  });

  it('sorts Android/Kotlin repositories first, then by last push date', () => {
    const repos: PinnedRepository[] = [
      {
        name: 'Java-Backend',
        slug: 'java-backend',
        title: 'Java Backend',
        description: null,
        url: 'https://github.com/example/java',
        homepageUrl: null,
        stargazerCount: 10,
        forkCount: 1,
        primaryLanguage: { name: 'Java' },
        repositoryTopics: ['spring'],
        pushedAt: '2026-09-24T10:00:00Z',
        isAndroid: false,
      },
      {
        name: 'Android-App-Older',
        slug: 'android-app-older',
        title: 'Android App Older',
        description: null,
        url: 'https://github.com/example/android-old',
        homepageUrl: null,
        stargazerCount: 5,
        forkCount: 0,
        primaryLanguage: { name: 'Kotlin' },
        repositoryTopics: ['android'],
        pushedAt: '2026-01-01T10:00:00Z',
        isAndroid: true,
      },
      {
        name: 'Android-App-Newer',
        slug: 'android-app-newer',
        title: 'Android App Newer',
        description: null,
        url: 'https://github.com/example/android-new',
        homepageUrl: null,
        stargazerCount: 5,
        forkCount: 0,
        primaryLanguage: { name: 'Kotlin' },
        repositoryTopics: ['android'],
        pushedAt: '2026-09-20T10:00:00Z',
        isAndroid: true,
      },
    ];

    const sorted = sortRepositories(repos);

    expect(sorted[0].name).toBe('Android-App-Newer');
    expect(sorted[1].name).toBe('Android-App-Older');
    expect(sorted[2].name).toBe('Java-Backend');
  });

  it('loads pinned repositories and preserves fallback data integrity', async () => {
    const repos = await getPinnedRepositories();
    expect(repos.length).toBeGreaterThanOrEqual(2);

    const first = repos[0];
    expect(first.isAndroid).toBe(true);
    expect(first.primaryLanguage?.name).toBe('Kotlin');
  });

  it('validates profile structure and single source of truth integrity', () => {
    expect(profile.fullName).toBe('Samuel Baldasso');
    expect(profile.email).toBe('baldassosamuel93@gmail.com');
    expect(profile.social.github).toContain('github.com/samuelbaldasso');
    expect(profile.social.linkedin).toContain('linkedin.com/in/');
    expect(profile.resumes['pt-BR']).toBe('/resume/resume-pt.pdf');
    expect(profile.resumes.en).toBe('/resume/resume-en.pdf');
    expect(profile.skills.length).toBe(7);
    expect(profile.experience.length).toBeGreaterThanOrEqual(1);

    // Verify skills categories
    const categoryIds = profile.skills.map((s) => s.id);
    expect(categoryIds).toContain('language');
    expect(categoryIds).toContain('ui');
    expect(categoryIds).toContain('architecture');
    expect(categoryIds).toContain('data');
    expect(categoryIds).toContain('quality');
    expect(categoryIds).toContain('performance');
    expect(categoryIds).toContain('delivery');
  });

  it('validates fallback pinned items contain real non-invented repositories', () => {
    const names = fallbackPinnedRepositories.map((r) => r.name);
    expect(names).toContain('Finance-Flow-App');
    expect(names).toContain('The-Movie-DB-App');
    expect(names).toContain('Java-Banking-Core');
    expect(names).toContain('Java-Subscription-B2C-Service');

    // Kotlin/Android repos must be ordered first
    expect(fallbackPinnedRepositories[0].name).toBe('Finance-Flow-App');
    expect(fallbackPinnedRepositories[1].name).toBe('The-Movie-DB-App');
  });
});
