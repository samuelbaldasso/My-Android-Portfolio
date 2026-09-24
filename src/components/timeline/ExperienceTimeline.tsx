import { getTranslations } from 'next-intl/server';
import { profile } from '@/data/profile';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Award, Globe } from 'lucide-react';

interface ExperienceTimelineProps {
  locale: 'pt-BR' | 'en';
}

export async function ExperienceTimeline({ locale }: ExperienceTimelineProps) {
  const t = await getTranslations('experience');

  return (
    <section id="experience" className="py-20 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-container)] px-3 py-1 text-xs font-mono font-medium text-[var(--on-primary-container)]">
            <Briefcase className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Track Record & Engineering Impact</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {t('title')}
          </h2>

          <p className="mt-2.5 max-w-2xl text-base text-[var(--on-surface-variant)]">
            {t('subtitle')}
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative mt-12 pl-6 sm:pl-8 border-l-2 border-[var(--border)] space-y-12">
          {profile.experience.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--background)]">
                {item.isCurrent ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)] animate-pulse" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-[var(--outline)]" />
                )}
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs transition-colors hover:border-[var(--primary)]/60">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-mono text-lg font-bold text-[var(--foreground)]">
                      {item.role[locale]}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--primary)]">
                      {item.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--on-surface-variant)]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{item.period[locale]}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{item.location[locale]}</span>
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="mt-4 text-sm text-[var(--on-surface-variant)] leading-relaxed">
                  {item.summary[locale]}
                </p>

                {/* Achievements Bullets */}
                {item.achievements[locale].length > 0 && (
                  <div className="mt-5 space-y-2.5">
                    {item.achievements[locale].map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--foreground)] leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--primary)] mt-0.5" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                {item.technologies.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--border)] bg-[var(--surface-container-low)] px-2 py-0.5 text-[11px] font-mono text-[var(--on-surface-variant)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education, Certifications & Languages Card */}
        <div className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Degree */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--primary)] uppercase tracking-wider">
                <GraduationCap className="h-4 w-4" />
                <span>Formação Acadêmica</span>
              </div>
              <p className="font-mono text-sm font-bold text-[var(--foreground)]">
                {profile.education.degree[locale]}
              </p>
              <p className="text-xs text-[var(--on-surface-variant)]">
                {profile.education.institution}
              </p>
            </div>

            {/* Certifications */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--primary)] uppercase tracking-wider">
                <Award className="h-4 w-4" />
                <span>Certificações</span>
              </div>
              {profile.education.certifications.map((cert) => (
                <div key={cert} className="rounded-lg bg-[var(--surface-container-low)] border border-[var(--border)] p-2.5">
                  <p className="font-mono text-xs font-bold text-[var(--foreground)]">
                    {cert}
                  </p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--primary)] uppercase tracking-wider">
                <Globe className="h-4 w-4" />
                <span>Idiomas</span>
              </div>
              <div className="space-y-1.5">
                {profile.education.languages.map((lang) => (
                  <p key={lang} className="font-mono text-xs text-[var(--on-surface-variant)]">
                    • {lang}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
