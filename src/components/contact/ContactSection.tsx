import { getTranslations } from 'next-intl/server';
import { profile } from '@/data/profile';
import { CopyEmailButton } from './CopyEmailButton';
import { GitHubIcon, LinkedInIcon } from '@/components/ui/icons';
import { Mail, FileDown, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  locale: 'pt-BR' | 'en';
}

export async function ContactSection({ locale }: ContactSectionProps) {
  const t = await getTranslations('contact');
  const tNav = await getTranslations('nav');

  const resumeHref = profile.resumes[locale] || profile.resumes['pt-BR'];
  const mailtoSubject = encodeURIComponent(t('subjectPrefilled'));
  const mailtoUrl = `mailto:${profile.email}?subject=${mailtoSubject}`;

  return (
    <section id="contact" className="py-20 scroll-mt-20 border-t border-[var(--border)] bg-[var(--surface-container-low)]/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-container)] px-3 py-1 text-xs font-mono font-medium text-[var(--on-primary-container)]">
          <MessageSquare className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span>Direct Channel</span>
        </div>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {t('title')}
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-base text-[var(--on-surface-variant)] leading-relaxed">
          {t('subtitle')}
        </p>

        {/* Action cards */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Main Mailto Button */}
          <a
            href={mailtoUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-[var(--on-primary)] shadow-sm transition-all hover:bg-[var(--primary-hover)] hover:shadow-md"
          >
            <Mail className="h-4 w-4" />
            <span>{t('emailButton')}</span>
          </a>

          {/* Copy email button */}
          <CopyEmailButton
            email={profile.email}
            labelCopy={t('copyEmail')}
            labelCopied={t('emailCopied')}
          />

          {/* Resume Download */}
          <a
            href={resumeHref}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <FileDown className="h-4 w-4 text-[var(--primary)]" />
            <span>{tNav('downloadResume')}</span>
          </a>
        </div>

        {/* Profiles */}
        <div className="mt-10 pt-8 border-t border-[var(--border)]">
          <p className="text-xs font-mono text-[var(--on-surface-variant)] mb-4 uppercase tracking-wider">
            {t('socialProfiles')}
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-mono text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-mono text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
