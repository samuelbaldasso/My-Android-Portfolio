import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero/Hero';
import { FeaturedProjects } from '@/components/featured-projects/FeaturedProjects';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ExperienceTimeline } from '@/components/timeline/ExperienceTimeline';
import { ContactSection } from '@/components/contact/ContactSection';

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
      <SkillsSection locale={typedLocale} />
      <ExperienceTimeline locale={typedLocale} />
      <ContactSection locale={typedLocale} />
    </div>
  );
}
