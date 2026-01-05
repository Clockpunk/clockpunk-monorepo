import { MetadataRoute } from 'next';
import { getArtworkSlugs, getPageSlugs } from '@/lib/sanity/api';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clockpunks.ru';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artworkSlugs, pageSlugs] = await Promise.all([
    getArtworkSlugs(),
    getPageSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/artworks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const artworkRoutes: MetadataRoute.Sitemap = artworkSlugs.map((item) => ({
    url: `${baseUrl}/artworks/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pageSlugs.map((item) => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...artworkRoutes, ...pageRoutes];
}
