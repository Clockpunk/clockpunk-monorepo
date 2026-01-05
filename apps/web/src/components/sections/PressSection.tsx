'use client';

import type { FC } from 'react';
import type { PressSection as PressSectionType } from '@/lib/sanity/types';

interface PressSectionProps {
  section: PressSectionType;
  id?: string;
  theme?: 'dark' | 'light';
}

const PressSection: FC<PressSectionProps> = ({ section, id, theme = 'dark' }) => {
  if (!section?.enabled) return null;

  return (
    <section
      id={id || section.id}
      className={`section-museum ${theme === 'light' ? 'bg-white text-graphite' : 'bg-black text-white'}`}
    >
      <div className="container-museum">
        {section.title && <h2 className="text-hero mb-6">{section.title}</h2>}
        {section.subtitle && <p className="text-large mb-10 max-w-3xl opacity-90">{section.subtitle}</p>}

        {Array.isArray(section.items) && section.items.length > 0 && (
          <div className="space-y-6">
            {section.items.map((item, idx) => (
              <div key={idx} className="border-t border-white/10 pt-6">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="text-editorial">{item.title}</div>
                  <div className="text-sm opacity-70">
                    {[item.place, item.date].filter(Boolean).join(' - ')}
                  </div>
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
                  >
                    Open
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PressSection;
