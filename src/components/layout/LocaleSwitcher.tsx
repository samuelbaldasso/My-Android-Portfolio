'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'pt-BR' ? 'en' : 'pt-BR';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      aria-label={locale === 'pt-BR' ? 'Switch language to English' : 'Mudar idioma para Português'}
      className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-container-low)] px-2.5 py-1.5 text-xs font-mono font-medium text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:opacity-50"
    >
      <Languages className="h-3.5 w-3.5 text-[var(--primary)]" />
      <span>{locale === 'pt-BR' ? 'EN' : 'PT'}</span>
    </button>
  );
}
