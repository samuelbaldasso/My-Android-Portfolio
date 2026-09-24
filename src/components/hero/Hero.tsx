import { getTranslations } from 'next-intl/server';
import { profile } from '@/data/profile';
import { HeroShowcase } from './HeroShowcase';
import { CodeBlock } from '@/components/code-block/CodeBlock';
import { GitHubIcon, LinkedInIcon, AndroidIcon } from '@/components/ui/icons';
import { ArrowRight, FileDown, Mail } from 'lucide-react';

interface HeroProps {
  locale: 'pt-BR' | 'en';
}

const sampleKotlinSnippet = `// Clean Domain: Value Class & Pure Single-Responsibility UseCase
@JvmInline
value class Money(val amountMinor: Long) {
    operator fun plus(other: Money) = Money(amountMinor + other.amountMinor)
}

class CreateInstallmentPurchaseUseCase @Inject constructor(
    private val repository: TransactionRepository
) {
    suspend operator fun invoke(
        account: Account,
        total: Money,
        installments: Int
    ): Result<List<Transaction>> = runCatching {
        require(account.type == AccountType.CREDIT_CARD)
        require(installments in 1..48)
        
        // Distribuição exata sem resíduo de centavos
        val base = total.amountMinor / installments
        val rem = total.amountMinor % installments
        
        val transactions = (1..installments).map { i ->
            val installmentAmount = if (i == 1) base + rem else base
            Transaction.installment(account.id, Money(installmentAmount), i)
        }
        repository.insertAtomic(transactions)
    }
}`;

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations('hero');
  const tNav = await getTranslations('nav');

  const resumeHref = profile.resumes[locale] || profile.resumes['pt-BR'];

  const codeNode = (
    <CodeBlock
      code={sampleKotlinSnippet}
      language="kotlin"
      title="CreateInstallmentPurchaseUseCase.kt"
    />
  );

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient decorative glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Bio & CTAs */}
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-container-low)] px-3.5 py-1 text-xs font-mono text-[var(--foreground)] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{profile.availability[locale]}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[var(--foreground)]">
              {profile.fullName}
            </h1>

            {/* Role & Specialization */}
            <div className="mt-3 flex items-center gap-2">
              <AndroidIcon className="h-5 w-5 text-[var(--primary)]" />
              <p className="font-mono text-base font-semibold text-[var(--primary)] sm:text-lg">
                {profile.headline[locale]}
              </p>
            </div>

            {/* Value Proposition */}
            <p className="mt-4 max-w-2xl text-base text-[var(--on-surface-variant)] leading-relaxed sm:text-lg">
              {profile.valueProposition[locale]}
            </p>

            {/* Short Bio */}
            <p className="mt-3 max-w-2xl text-sm text-[var(--on-surface-variant)]/90 leading-normal">
              {profile.shortBio[locale]}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--on-primary)] shadow-sm transition-all hover:bg-[var(--primary-hover)] hover:shadow-md"
              >
                <span>{t('viewProjects')}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={resumeHref}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <FileDown className="h-4 w-4 text-[var(--primary)]" />
                <span>{tNav('downloadResume')}</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-[var(--on-surface-variant)] transition-colors hover:text-[var(--foreground)]"
              >
                <Mail className="h-4 w-4" />
                <span>{t('contactMe')}</span>
              </a>
            </div>

            {/* Social verification links */}
            <div className="mt-8 flex items-center gap-3 text-xs text-[var(--on-surface-variant)]">
              <span className="font-mono">Verificação:</span>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors hover:text-[var(--primary)]"
              >
                <GitHubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <span className="opacity-40">·</span>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors hover:text-[var(--primary)]"
              >
                <LinkedInIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Phone Mockup / Code Showcase */}
          <div className="flex w-full justify-center lg:col-span-5">
            <HeroShowcase
              codeSnippetNode={codeNode}
              interactiveTabLabel={t('interactiveTab')}
              codeTabLabel={t('codeTab')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
