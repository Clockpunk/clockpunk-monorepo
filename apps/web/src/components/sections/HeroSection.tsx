'use client';

import type { FC } from 'react';
import type { HeroSection as HeroSectionType } from '@/lib/sanity/types';

interface HeroSectionProps {
  section: HeroSectionType;
  id?: string;
  theme?: 'dark' | 'light';
}

const HeroSection: FC<HeroSectionProps> = ({ section, id, theme = 'dark' }) => {
  if (!section?.enabled) return null;

  return (
    <section
      id={id || section.id}
      className={`section-hero ${theme === 'light' ? 'bg-white text-graphite' : 'bg-black text-white'}`}
    >
      <div className="container-museum text-center">
        {section.headline && <h1 className="text-display mb-6">{section.headline}</h1>}

        {section.subheadline && (
          <p className="text-xl md:text-2xl mb-12 text-balance max-w-2xl mx-auto opacity-90">
            {section.subheadline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {section.primaryCta?.href && (
            <a
              href={section.primaryCta.href}
              className="px-8 py-4 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors"
            >
              {section.primaryCta.label}
            </a>
          )}

          {section.secondaryCta?.href && (
            <a
              href={section.secondaryCta.href}
              className="px-8 py-4 border border-current rounded-sm hover:bg-white/10 transition-colors"
            >
              {section.secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
