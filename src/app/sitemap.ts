import { MetadataRoute } from 'next';
import { getPinnedRepositories } from '@/lib/github';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://samuelbaldasso.dev';
  const projects = await getPinnedRepositories();
  const currentDate = new Date();

  const entries: MetadataRoute.Sitemap = [
    // Homepages
    {
      url: `${baseUrl}/pt-BR`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt-BR`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/pt-BR`,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];

  // Project pages
  for (const project of projects) {
    entries.push(
      {
        url: `${baseUrl}/pt-BR/projects/${project.slug}`,
        lastModified: new Date(project.pushedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            'pt-BR': `${baseUrl}/pt-BR/projects/${project.slug}`,
            en: `${baseUrl}/en/projects/${project.slug}`,
          },
        },
      },
      {
        url: `${baseUrl}/en/projects/${project.slug}`,
        lastModified: new Date(project.pushedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            'pt-BR': `${baseUrl}/pt-BR/projects/${project.slug}`,
            en: `${baseUrl}/en/projects/${project.slug}`,
          },
        },
      }
    );
  }

  return entries;
}
