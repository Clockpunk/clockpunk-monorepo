import type { Section } from '@/lib/sanity/types';
import HeroSection from './HeroSection';
import { FeaturedArtworksSection } from './FeaturedArtworksSection';
import { GalleryGridSection } from './GalleryGridSection';
import { BrandStorySection } from './BrandStorySection';
import { ProcessSection } from './ProcessSection';
import PressSection from './PressSection';
import CtaSection from './CtaSection';

type SectionRendererProps = {
  sections: Section[];
};

export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        // Skip disabled sections
        if (!section.enabled) {
          return null;
        }

        const key = section._key;
        const commonProps = {
          id: section.id,
          theme: section.theme,
        };

        switch (section._type) {
          case 'heroSection':
            return <HeroSection key={key} section={section} {...commonProps} />;

          case 'featuredArtworksSection':
            return <FeaturedArtworksSection key={key} section={section} {...commonProps} />;

          case 'galleryGridSection':
            return <GalleryGridSection key={key} section={section} {...commonProps} />;

          case 'brandStorySection':
            return <BrandStorySection key={key} section={section} {...commonProps} />;

          case 'processSection':
            return <ProcessSection key={key} section={section} {...commonProps} />;

          case 'pressSection':
            return <PressSection key={key} section={section} {...commonProps} />;

          case 'ctaSection':
            return <CtaSection key={key} section={section} {...commonProps} />;

          default:
            console.warn(`Unknown section type: ${(section as any)._type}`);
            return null;
        }
      })}
    </>
  );
}
