import { PinnedRepository } from '@/data/pinned.types';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { GitHubIcon, AndroidIcon } from '@/components/ui/icons';
import { Star, GitFork, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  repo: PinnedRepository;
  locale: 'pt-BR' | 'en';
}

export function ProjectCard({ repo, locale }: ProjectCardProps) {
  const t = useTranslations('projects');

  // Format last push date
  const formattedDate = new Date(repo.pushedAt).toLocaleDateString(
    locale === 'pt-BR' ? 'pt-BR' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)] hover:shadow-md">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Primary Language */}
          <div className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-container-low)] px-2.5 py-0.5 text-xs font-mono">
            {repo.primaryLanguage && (
              <>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: repo.primaryLanguage.color || '#3DDC84',
                  }}
                  aria-hidden="true"
                />
                <span className="text-[var(--foreground)]">
                  {repo.primaryLanguage.name}
                </span>
              </>
            )}
          </div>

          {/* Android Badge */}
          {repo.isAndroid && (
            <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              <AndroidIcon className="h-3 w-3" />
              <span>{t('featuredBadge')}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-4 font-mono text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
          <Link href={`/projects/${repo.slug}`}>
            {repo.name}
          </Link>
        </h3>

        {/* Description */}
        {repo.description && (
          <p className="mt-2.5 text-sm text-[var(--on-surface-variant)] line-clamp-3 leading-relaxed">
            {repo.description}
          </p>
        )}

        {/* Topics */}
        {repo.repositoryTopics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologias e tópicos">
            {repo.repositoryTopics.slice(0, 6).map((topic) => (
              <span
                key={topic}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-container-low)] px-2 py-0.5 text-[11px] font-mono text-[var(--on-surface-variant)]"
              >
                #{topic}
              </span>
            ))}
            {repo.repositoryTopics.length > 6 && (
              <span className="rounded-md px-1.5 py-0.5 text-[10px] font-mono text-[var(--on-surface-variant)] opacity-70">
                +{repo.repositoryTopics.length - 6}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Details & Action Buttons */}
      <div className="mt-6 pt-4 border-t border-[var(--border)]">
        {/* Metrics Bar */}
        <div className="flex items-center justify-between text-xs text-[var(--on-surface-variant)] font-mono mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title={`${repo.stargazerCount} estrelas`}>
              <Star className="h-3.5 w-3.5" />
              <span>{repo.stargazerCount}</span>
            </span>

            {repo.forkCount > 0 && (
              <span className="flex items-center gap-1" title={`${repo.forkCount} forks`}>
                <GitFork className="h-3.5 w-3.5" />
                <span>{repo.forkCount}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px]" title={`Último push: ${formattedDate}`}>
            <Calendar className="h-3.5 w-3.5 opacity-70" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Case study link */}
          <Link
            href={`/projects/${repo.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-semibold text-[var(--on-primary)] shadow-xs transition-all hover:bg-[var(--primary-hover)]"
          >
            <span>{t('caseStudy')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* GitHub link */}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('viewCode')} ${repo.name}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-container-low)] px-3 py-2 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t('viewCode')}</span>
          </a>

          {/* Google Play link (only if present) */}
          {repo.playStoreUrl && (
            <a
              href={repo.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('playStore')} ${repo.name}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-container-low)] px-3 py-2 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t('playStore')}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
