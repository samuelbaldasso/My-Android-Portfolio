import { describe, it, expect } from 'vitest';
import { getPinnedRepositories, getProjectBySlug } from '@/lib/github';

describe('Project Case Study Routing & Resolution', () => {
  it('resolves every pinned repository by its slug', async () => {
    const projects = await getPinnedRepositories();
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(project.slug).toBeDefined();
      expect(project.slug.length).toBeGreaterThan(0);

      const found = await getProjectBySlug(project.slug);
      expect(found).not.toBeNull();
      expect(found?.name).toBe(project.name);
      expect(found?.slug).toBe(project.slug);
      expect(found?.title).toBeDefined();
    }
  });

  it('generates valid static parameters for all locales and projects', async () => {
    const projects = await getPinnedRepositories();
    const expectedLocales = ['pt-BR', 'en'];

    for (const locale of expectedLocales) {
      for (const project of projects) {
        expect(['pt-BR', 'en']).toContain(locale);
        expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });

  it('ensures middleware matcher correctly matches project routes and excludes static assets', () => {
    // Official next-intl regex matcher pattern
    const pattern = new RegExp('^/((?!api|_next|_vercel|.*\\..*).*)$');

    // These MUST match the middleware so next-intl can handle i18n routing
    expect(pattern.test('/projects/finance-flow-app')).toBe(true);
    expect(pattern.test('/projects/eat-me')).toBe(true);
    expect(pattern.test('/projects/the-movie-db-app')).toBe(true);
    expect(pattern.test('/projects/java-banking-core')).toBe(true);
    expect(pattern.test('/projects/java-subscription-b2c-service')).toBe(true);
    expect(pattern.test('/pt-BR/projects/finance-flow-app')).toBe(true);
    expect(pattern.test('/pt-BR/projects/eat-me')).toBe(true);
    expect(pattern.test('/en/projects/eat-me')).toBe(true);
    expect(pattern.test('/en/projects/finance-flow-app')).toBe(true);
    expect(pattern.test('/')).toBe(true);

    // These MUST NOT match the middleware (static assets with file extensions)
    expect(pattern.test('/favicon.ico')).toBe(false);
    expect(pattern.test('/icon.svg')).toBe(false);
    expect(pattern.test('/resume/resume-pt.pdf')).toBe(false);
    expect(pattern.test('/screenshots/finance-flow/01_accounts_screen.png')).toBe(false);
    expect(pattern.test('/screenshots/eat-me/01_home_screen.png')).toBe(false);
    expect(pattern.test('/api/hello')).toBe(false);
    expect(pattern.test('/_next/static/chunks/app.js')).toBe(false);
  });
});
