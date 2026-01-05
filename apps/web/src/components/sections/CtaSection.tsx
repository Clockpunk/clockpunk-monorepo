'use client';

import type { FC } from 'react';
import type { CtaSection as CtaSectionType } from '@/lib/sanity/types';

interface CtaSectionProps {
  section: CtaSectionType;
  id?: string;
  theme?: 'dark' | 'light';
}

const CtaSection: FC<CtaSectionProps> = ({ section, id, theme = 'dark' }) => {
  if (!section?.enabled) return null;

  const href = section?.cta?.href;

  return (
    <section
      id={id || section.id}
      className={`section-museum ${theme === 'light' ? 'bg-white text-graphite' : 'bg-black text-white'}`}
    >
      <div className="container-museum text-center">
        {section.title && <h2 className="text-hero mb-6">{section.title}</h2>}
        {section.text && <p className="text-large mb-10 max-w-3xl mx-auto">{section.text}</p>}

        {section.cta?.label && href && (
          <a
            href={href}
            className="inline-block px-12 py-5 bg-gold text-black font-semibold text-lg rounded-sm hover:bg-gold-light transition-colors"
          >
            {section.cta.label}
          </a>
        )}
      </div>
    </section>
  );
};

export default CtaSection;
