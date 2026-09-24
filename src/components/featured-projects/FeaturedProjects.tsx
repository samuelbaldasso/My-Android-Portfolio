import { getTranslations } from 'next-intl/server';
import { getPinnedRepositories } from '@/lib/github';
import { ProjectCard } from '@/components/project-card/ProjectCard';
import { FolderGit2 } from 'lucide-react';

interface FeaturedProjectsProps {
  locale: 'pt-BR' | 'en';
}

export async function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t = await getTranslations('projects');
  const projects = await getPinnedRepositories();

  return (
    <section id="projects" className="py-20 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-container)] px-3 py-1 text-xs font-mono font-medium text-[var(--on-primary-container)]">
            <FolderGit2 className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>GitHub Pinned Repositories</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {t('title')}
          </h2>

          <p className="mt-2.5 max-w-2xl text-base text-[var(--on-surface-variant)]">
            {t('subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((repo) => (
              <ProjectCard key={repo.name} repo={repo} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] p-12 text-center">
            <FolderGit2 className="h-12 w-12 text-[var(--on-surface-variant)] opacity-40" />
            <p className="mt-4 text-sm text-[var(--on-surface-variant)] font-mono">
              {t('empty')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
