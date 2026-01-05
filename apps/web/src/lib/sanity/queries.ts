import groq from 'groq';

// === HOME PAGE QUERY ===
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    _id,
    title,
    sections[] {
      _type,
      _key,
      enabled,
      id,
      theme,
      
      _type == "heroSection" => {
        headline,
        subheadline,
        backgroundImage {
          asset->,
          alt,
          caption
        },
        videoUrl,
        primaryCta {
          label,
          href
        },
        secondaryCta {
          label,
          href
        }
      },
      
      _type == "manifestoSection" => {
        title,
        philosophy[] {
          _type,
          children[] {
            text
          }
        },
        signature
      },
      
      _type == "featuredArtworksSection" => {
        title,
        subtitle,
        autoFeatured,
        showCount,
        items[]-> {
          _id,
          _type,
          title,
          slug,
          coverImage {
            asset->,
            alt
          },
          year,
          status
        }
      },
      
      _type == "galleryGridSection" => {
        title,
        artworks[]-> {
          _id,
          _type,
          title,
          slug,
          coverImage {
            asset->,
            alt
          },
          year,
          status
        }
      },
      
      _type == "brandStorySection" => {
        title,
        body[] {
          _type,
          children[] {
            text
          }
        },
        image {
          asset->,
          alt
        }
      },
      
      _type == "processSection" => {
        title,
        subtitle,
        items[] {
          title,
          text,
          icon
        }
      },
      
      _type == "pressSection" => {
        title,
        subtitle,
        items[] {
          title,
          place,
          date
        }
      },
      
      _type == "contactCtaSection" => {
        heading,
        body,
        email,
        phone,
        telegram,
        ctaLabel,
        ctaLink,
        socialLinks[] {
          title,
          url
        }
      },
      
      _type == "ctaSection" => {
        title,
        text,
        cta {
          label,
          href
        }
      }
    }
  }
`;

// === PAGE QUERY ===
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    sections[] {
      _type,
      _key,
      enabled,
      id,
      theme,
      title,
      
      _type == "brandStorySection" => {
        body[] {
          _type,
          children[] {
            text
          }
        },
        image {
          asset->,
          alt
        }
      },
      
      _type == "contactCtaSection" => {
        heading,
        body,
        email,
        phone,
        telegram,
        ctaLabel,
        ctaLink,
        socialLinks[] {
          title,
          url
        }
      }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->
      },
      noindex
    }
  }
`;

// === ARTWORKS LIST QUERY ===
export const artworksListQuery = groq`
  *[_type == "artwork" && status != "draft"] | order(sortOrder asc, year desc) {
    _id,
    title,
    slug,
    year,
    status,
    coverImage {
      asset->,
      alt
    },
    medium,
    featured
  }
`;

// === ARTWORK DETAIL QUERY ===
export const artworkDetailQuery = groq`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    status,
    medium,
    dimensions,
    description[] {
      _type,
      children[] {
        text
      }
    },
    price,
    currency,
    priceOnRequest,
    coverImage {
      asset->,
      alt,
      caption
    },
    images[] {
      asset->,
      alt,
      caption
    },
    tags,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->
      },
      noindex
    }
  }
`;

// === SITE SETTINGS QUERY ===
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    ogImage {
      asset->
    },
    logo {
      asset->
    },
    contacts {
      email,
      phone,
      telegram,
      address
    },
    socials[] {
      title,
      url
    },
    seoDefaults {
      noindex,
      canonicalBase
    }
  }
`;

// === ARTWORK SLUGS QUERY ===
export const artworkSlugsQuery = groq`
  *[_type == "artwork" && defined(slug.current) && status != "draft"] {
    "slug": slug.current,
    _updatedAt
  }
`;

// === PAGE SLUGS QUERY ===
export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`;
