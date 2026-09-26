import { getTranslations } from 'next-intl/server';
import { profile } from '@/data/profile';
import {
  Code,
  Layout,
  Layers,
  Database,
  ShieldCheck,
  Gauge,
  Rocket,
  Cpu,
} from 'lucide-react';

interface SkillsSectionProps {
  locale: 'pt-BR' | 'en';
}

function getCategoryIcon(id: string) {
  switch (id) {
    case 'language':
      return <Code className="h-5 w-5 text-emerald-400" />;
    case 'ui':
      return <Layout className="h-5 w-5 text-sky-400" />;
    case 'architecture':
      return <Layers className="h-5 w-5 text-purple-400" />;
    case 'data':
      return <Database className="h-5 w-5 text-amber-400" />;
    case 'quality':
      return <ShieldCheck className="h-5 w-5 text-emerald-400" />;
    case 'performance':
      return <Gauge className="h-5 w-5 text-rose-400" />;
    case 'delivery':
      return <Rocket className="h-5 w-5 text-blue-400" />;
    default:
      return <Cpu className="h-5 w-5 text-emerald-400" />;
  }
}

export async function SkillsSection({ locale }: SkillsSectionProps) {
  const t = await getTranslations('skills');

  return (
    <section id="skills" className="py-20 scroll-mt-20 border-t border-[var(--border)] bg-[var(--surface-container-low)]/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="inline-flex items-center gap-2 rounded-md bg-[var(--primary-container)] px-3 py-1 text-xs font-mono font-medium text-[var(--on-primary-container)]">
            <Cpu className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Android Core Competencies</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {t('title')}
          </h2>

          <p className="mt-2.5 max-w-2xl text-base text-[var(--on-surface-variant)]">
            {t('subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((category) => (
            <div
              key={category.id}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs transition-colors hover:border-[var(--primary)]/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-container)] border border-[var(--border)]">
                  {getCategoryIcon(category.id)}
                </div>
                <h3 className="font-mono text-sm font-bold text-[var(--foreground)]">
                  {category.label[locale]}
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                      skill.highlight
                        ? 'border border-[var(--primary)]/40 bg-[var(--primary-container)]/30 font-semibold text-[var(--foreground)]'
                        : 'border border-[var(--border)] bg-[var(--surface-container-low)] text-[var(--on-surface-variant)]'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
