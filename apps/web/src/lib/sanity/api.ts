import { clientFetch } from './client';
import {
  homePageQuery,
  pageQuery,
  artworksListQuery,
  artworkDetailQuery,
  siteSettingsQuery,
  artworkSlugsQuery,
  pageSlugsQuery,
} from './queries';
import type {
  HomePage,
  Page,
  Artwork,
  SiteSettings,
} from './types';

export async function getHomePage(): Promise<HomePage | null> {
  return clientFetch<HomePage>(homePageQuery);
}

export async function getPage(slug: string): Promise<Page | null> {
  return clientFetch<Page>(pageQuery, { slug });
}

export async function getArtworksList(): Promise<Artwork[]> {
  return clientFetch<Artwork[]>(artworksListQuery);
}

export async function getArtworkDetail(slug: string): Promise<Artwork | null> {
  return clientFetch<Artwork>(artworkDetailQuery, { slug });
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return clientFetch<SiteSettings>(siteSettingsQuery);
}

export async function getArtworkSlugs(): Promise<Array<{ slug: string }>> {
  return clientFetch<Array<{ slug: string }>>(artworkSlugsQuery);
}

export async function getPageSlugs(): Promise<Array<{ slug: string }>> {
  return clientFetch<Array<{ slug: string }>>(pageSlugsQuery);
}
