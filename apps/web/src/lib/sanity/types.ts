// Base types
export type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
};

export type SanityBlock = {
  _type: 'block';
  children: Array<{
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
  style?: string;
  markDefs?: unknown[];
};

// Site Settings
export type SiteSettings = {
  _id: string;
  title: string;
  description?: string;
  ogImage?: SanityImage;
  logo?: SanityImage;
  socials?: Array<{
    title: string;
    url: string;
  }>;
  contacts?: {
    email?: string;
    phone?: string;
    telegram?: string;
    address?: string;
  };
  seoDefaults?: {
    noindex?: boolean;
    canonicalBase?: string;
  };
};

// Artwork
export type ArtworkStatus = 'draft' | 'available' | 'sold' | 'archived';

export type Artwork = {
  _id: string;
  _type: 'artwork';
  title: string;
  slug: {
    current: string;
  };
  status: ArtworkStatus;
  year: number;
  medium?: string;
  dimensions?: string;
  description?: SanityBlock[];
  price?: number;
  currency?: string;
  priceOnRequest?: boolean;
  coverImage: SanityImage;
  images?: SanityImage[];
  tags?: string[];
  featured?: boolean;
  sortOrder?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
    noindex?: boolean;
  };
};

// Section Types
export type HeroSection = {
  _type: 'heroSection';
  _key: string;
  enabled: boolean;
  id?: string;
  theme: 'dark' | 'light';
  headline: string;
  subheadline?: string;
  backgroundImage?: SanityImage;
  videoUrl?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export type FeaturedArtworksSection = {
  _type: 'featuredArtworksSection';
  _key: string;
  enabled: boolean;
  id?: string;
  theme: 'dark' | 'light';
  title: string;
  subtitle?: string;
  autoFeatured: boolean;
  items?: Artwork[];
  showCount: number;
};

export type GalleryGridSection = {
  _type: 'galleryGridSection';
  _key: string;
  enabled: boolean;
  id?: string;
  theme: 'dark' | 'light';
  title: string;
  subtitle?: string;
  artworks: Artwork[];
};

export type BrandStorySection = {
  _type: 'brandStorySection';
  _key: string;
  enabled: boolean;
  id?: string;
  theme: 'dark' | 'light';
  title: string;
  body: SanityBlock[];
  image?: SanityImage;
};

export type ProcessSection = {
  _type: 'processSection';
  _key: string;
  enabled: boolean;
  id?: string;
  theme: 'dark' | 'light';
  title: string;
  subtitle?: string;
  items: Array<{
    title: string;
    text: string;
    icon?: string;
  }>;
};

export type PressSection = {
  _type: 'pressSection';
  _key: string;
  enabled: boolean;
  id?: string;
  theme: 'dark' | 'light';
  title: string;
  subtitle?: string;
  items?: Array<{
    title: string;
    place: string;
    date: string;
    link?: string;
  }>;
};

export type CtaSection = {
  _type: 'ctaSection';
  _key: string;
  enabled: boolean;
  id?: string;
  theme: 'dark' | 'light';
  title: string;
  text?: string;
  cta: {
    label: string;
    href: string;
  };
};

export type Section =
  | HeroSection
  | FeaturedArtworksSection
  | GalleryGridSection
  | BrandStorySection
  | ProcessSection
  | PressSection
  | CtaSection;

// Page Types
export type HomePage = {
  _id: string;
  title: string;
  sections: Section[];
};

export type Page = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  sections?: Section[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
    noindex?: boolean;
  };
};
