'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { profile } from '@/data/profile';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSwitcher } from './LocaleSwitcher';
import { FileDown, Menu, X, Terminal } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as 'pt-BR' | 'en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const resumeHref = profile.resumes[locale] || profile.resumes['pt-BR'];

  const navLinks = [
    { label: t('projects'), href: '/#projects' },
    { label: t('skills'), href: '/#skills' },
    { label: t('experience'), href: '/#experience' },
    { label: t('contact'), href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[var(--foreground)] focus-visible:rounded-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-container)] text-[var(--on-primary-container)] transition-transform group-hover:scale-105">
            <Terminal className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-tight text-[var(--foreground)]">
              {profile.fullName}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--primary)]">
              Android Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--on-surface-variant)] transition-colors hover:text-[var(--primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5">
          <LocaleSwitcher />
          <ThemeToggle />

          {/* Download Resume button */}
          <a
            href={resumeHref}
            download
            className="hidden items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-1.5 text-xs font-semibold text-[var(--on-primary)] shadow-sm transition-all hover:bg-[var(--primary-hover)] sm:inline-flex"
            title={t('downloadResume')}
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>{t('downloadResume')}</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--foreground)] md:hidden"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-container)] hover:text-[var(--primary)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-[var(--border)]">
              <a
                href={resumeHref}
                download
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--on-primary)] shadow-sm"
              >
                <FileDown className="h-4 w-4" />
                <span>{t('downloadResume')}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
