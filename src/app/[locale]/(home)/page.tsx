import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero/Hero';
import { FeaturedProjects } from '@/components/featured-projects/FeaturedProjects';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as 'pt-BR' | 'en';
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <Hero locale={typedLocale} />
      <FeaturedProjects locale={typedLocale} />
    </div>
  );
}
