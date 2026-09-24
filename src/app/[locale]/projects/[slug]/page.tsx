import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, Locale, Link } from '@/i18n/routing';
import { getPinnedRepositories, getProjectBySlug } from '@/lib/github';
import { ArchitectureDiagram } from '@/components/case-study/ArchitectureDiagram';
import { CodeBlock } from '@/components/code-block/CodeBlock';
import { PhoneFrame } from '@/components/phone-frame/PhoneFrame';
import { GitHubIcon, AndroidIcon } from '@/components/ui/icons';
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Calendar,
  Layers,
  Sparkles,
  GitBranch,
  Scale,
} from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getPinnedRepositories();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const project of projects) {
      params.push({
        locale,
        slug: project.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Projeto não encontrado',
    };
  }

  return {
    title: `${project.title} · Case Study`,
    description: project.description || `Case study arquitetural de ${project.title}`,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations('caseStudy');
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const formattedDate = new Date(project.pushedAt).toLocaleDateString(
    locale === 'pt-BR' ? 'pt-BR' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <article className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--on-surface-variant)] transition-colors hover:text-[var(--primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('backToHome')}</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="mt-8 border-b border-[var(--border)] pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.isAndroid && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
                <AndroidIcon className="h-3.5 w-3.5" />
                <span>Android Nativo</span>
              </span>
            )}

            {project.primaryLanguage && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--foreground)]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: project.primaryLanguage.color || '#3DDC84',
                  }}
                />
                <span>{project.primaryLanguage.name}</span>
              </span>
            )}

            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--on-surface-variant)]">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <h1 className="mt-4 font-mono text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          {project.description && (
            <p className="mt-4 text-lg text-[var(--on-surface-variant)] leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-xs font-semibold text-[var(--on-primary)] shadow-xs transition-all hover:bg-[var(--primary-hover)]"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>{t('viewRepo')}</span>
            </a>

            {project.releasesUrl && (
              <a
                href={project.releasesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-mono font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <Download className="h-4 w-4 text-[var(--primary)]" />
                <span>{t('viewReleases')}</span>
              </a>
            )}

            {project.playStoreUrl && (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-mono font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <ExternalLink className="h-4 w-4 text-emerald-400" />
                <span>Google Play</span>
              </a>
            )}
          </div>
        </header>

        {/* Stack Tags */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 font-mono text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            <span>Stack Detectada & Tópicos</span>
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.repositoryTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-container-low)] px-2.5 py-1 font-mono text-xs text-[var(--on-surface-variant)]"
              >
                #{topic}
              </span>
            ))}
          </div>
        </section>

        {/* Problem and Context */}
        <section className="mt-16">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
            <GitBranch className="h-4 w-4" />
            <span>{t('problemContext')}</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Desafio de Engenharia & Requisitos de Domínio
          </h2>
          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 text-sm text-[var(--on-surface-variant)] leading-relaxed space-y-4">
            <p>
              Aplicações modernas exigem confiabilidade estrita: em cenários críticos como operações financeiras e streaming offline, inconsistências de dados ou falhas de sincronização afetam diretamente a retenção e a experiência do usuário.
            </p>
            <p>
              O projeto foi concebido para resolver desafios de concorrência assíncrona, desacoplamento de regras de negócio em relação ao Android SDK e garantia de renderização reativa sem travamentos de frame (jank-free) com Jetpack Compose.
            </p>
          </div>
        </section>

        {/* Architecture & Layers Diagram */}
        <section className="mt-16">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>{t('architecture')}</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Separação Estrita de Responsabilidades
          </h2>
          <div className="mt-6">
            <ArchitectureDiagram
              pattern={project.architectureSummary?.pattern || 'Clean Architecture + UDF'}
              layers={project.architectureSummary?.layers}
            />
          </div>
        </section>

        {/* Technical Decisions & Trade-offs */}
        {project.tradeOffs && project.tradeOffs.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
              <Scale className="h-4 w-4" />
              <span>{t('decisions')}</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Trade-offs Arquiteturais Documentados (ADRs)
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.tradeOffs.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs"
                >
                  <div>
                    <h3 className="font-mono text-base font-bold text-[var(--foreground)]">
                      {item.decision}
                    </h3>

                    {/* Chosen vs Alternative */}
                    <div className="mt-4 space-y-2">
                      <div className="rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20 text-xs">
                        <span className="font-mono font-bold text-emerald-400 block mb-0.5">
                          ✓ {t('chosen')}:
                        </span>
                        <span className="font-mono text-[var(--foreground)]">
                          {item.chosen}
                        </span>
                      </div>

                      <div className="rounded-lg bg-rose-500/5 p-3 border border-rose-500/15 text-xs">
                        <span className="font-mono font-semibold text-rose-400 block mb-0.5">
                          ✕ {t('alternative')}:
                        </span>
                        <span className="text-[var(--on-surface-variant)] line-through">
                          {item.alternative}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <span className="font-mono text-[11px] font-semibold text-[var(--primary)] block mb-1">
                      {t('why')}:
                    </span>
                    <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Code Deep Dive */}
        {project.highlightCode && (
          <section className="mt-16">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>{t('codeDeepDive')}</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Implementação de Produção & Padrões
            </h2>
            <div className="mt-6">
              <CodeBlock
                code={project.highlightCode.code}
                language={project.highlightCode.language}
                title={project.highlightCode.title}
              />
            </div>
          </section>
        )}

        {/* Screenshots Gallery in Phone Frame */}
        <section className="mt-16">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold text-[var(--primary)] uppercase tracking-wider">
            <AndroidIcon className="h-4 w-4" />
            <span>{t('screenshots')}</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Interface Jetpack Compose & Material 3
          </h2>

          {project.screenshots && project.screenshots.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.screenshots.slice(0, 6).map((src, index) => (
                <div key={src} className="flex flex-col items-center">
                  <PhoneFrame
                    imageSrc={src}
                    imageAlt={`${project.title} - Tela ${index + 1}`}
                  />
                  <span className="mt-3 font-mono text-xs text-[var(--on-surface-variant)]">
                    Tela #{index + 1}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-[var(--border)] p-10 text-center">
              <p className="font-mono text-xs text-[var(--on-surface-variant)]">
                {t('noScreenshots')}
              </p>
            </div>
          )}
        </section>

        {/* Bottom Navigation */}
        <footer className="mt-20 border-t border-[var(--border)] pt-8 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[var(--primary)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('backToHome')}</span>
          </Link>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-mono text-[var(--foreground)] hover:border-[var(--primary)]"
          >
            <GitHubIcon className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </footer>
      </div>
    </article>
  );
}
