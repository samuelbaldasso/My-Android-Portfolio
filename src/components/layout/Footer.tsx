import { useTranslations, useLocale } from 'next-intl';
import { profile } from '@/data/profile';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/icons';
import { Mail, FileDown } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale() as 'pt-BR' | 'en';
  const currentYear = new Date().getFullYear();

  const resumeHref = profile.resumes[locale] || profile.resumes['pt-BR'];

  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--surface-container-low)] transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand & Headline */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="font-mono text-base font-bold text-[var(--foreground)]">
              {profile.fullName}
            </span>
            <span className="mt-0.5 text-xs text-[var(--on-surface-variant)]">
              {profile.headline[locale]}
            </span>
          </div>

          {/* Social Links & Resume Download */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              aria-label="Send Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <Mail className="h-4 w-4" />
            </a>

            <a
              href={resumeHref}
              download
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-mono font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <FileDown className="h-3.5 w-3.5 text-[var(--primary)]" />
              <span>{tNav('resume')}</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--on-surface-variant)]">
          <p>
            © {currentYear} {profile.fullName}. {t('rights')}
          </p>
          <p className="mt-1 font-mono text-[11px] opacity-75">{t('builtWith')}</p>
        </div>
      </div>
    </footer>
  );
}
