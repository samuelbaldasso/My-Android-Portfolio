import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { profile } from '@/data/profile';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'pt-BR') as 'pt-BR' | 'en';
  const baseUrl = 'https://samuelbaldasso.dev';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s · Samuel Baldasso',
      default: `${profile.fullName} · ${profile.headline[typedLocale]}`,
    },
    description: profile.valueProposition[typedLocale],
    keywords: [
      'Android',
      'Kotlin',
      'Jetpack Compose',
      'Clean Architecture',
      'Senior Android Engineer',
      'Coroutines',
      'StateFlow',
      'Dagger Hilt',
      'Room Database',
      'Paging 3',
      'Samuel Baldasso',
    ],
    authors: [{ name: profile.fullName, url: profile.social.github }],
    creator: profile.fullName,
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'pt-BR': `${baseUrl}/pt-BR`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'profile',
      locale: locale === 'pt-BR' ? 'pt_BR' : 'en_US',
      url: `${baseUrl}/${locale}`,
      title: `${profile.fullName} · ${profile.headline[typedLocale]}`,
      description: profile.valueProposition[typedLocale],
      siteName: `${profile.fullName} Portfolio`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.fullName} · ${profile.headline[typedLocale]}`,
      description: profile.valueProposition[typedLocale],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const typedLocale = locale as 'pt-BR' | 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullName,
    jobTitle: 'Senior Android Engineer',
    url: 'https://samuelbaldasso.dev',
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location[typedLocale],
      addressCountry: 'BR',
    },
    sameAs: [
      profile.social.github,
      profile.social.linkedin,
    ],
    knowsAbout: [
      'Android SDK',
      'Kotlin',
      'Jetpack Compose',
      'Clean Architecture',
      'Unidirectional Data Flow',
      'Dagger Hilt',
      'Room Database',
      'Kotlin Coroutines',
      'Paging 3',
      'Robolectric',
      'Turbine',
      'Baseline Profiles',
    ],
  };

  return (
    <html
      lang={locale}
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
