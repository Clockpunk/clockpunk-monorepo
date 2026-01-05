'use client';

import Link from 'next/link';

type Props = {
  section: any;
  id?: string;
  theme: 'dark' | 'light';
};

export function ContactCtaSection({ section, id }: Props) {
  if (!section.enabled) return null;

  return (
    <section id={id} className="relative py-32 md:py-48 overflow-hidden bg-background">
      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl text-center space-y-12">
        {section.heading && (
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
            {section.heading}
          </h2>
        )}

        {section.body && (
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/70 max-w-2xl mx-auto">
            {section.body}
          </p>
        )}

        {(section.email || section.phone || section.telegram) && (
          <div className="flex flex-col items-center gap-6 pt-8">
            {section.email && (
              <a 
                href={`mailto:${section.email}`}
                className="group text-xl md:text-2xl text-white hover:text-yellow-500 transition-colors duration-300"
              >
                <span className="inline-block group-hover:tracking-wider transition-all duration-300">
                  {section.email}
                </span>
              </a>
            )}

            {section.phone && (
              <a 
                href={`tel:${section.phone.replace(/\s/g, '')}`}
                className="group text-xl md:text-2xl text-white hover:text-yellow-500 transition-colors duration-300"
              >
                <span className="inline-block group-hover:tracking-wider transition-all duration-300">
                  {section.phone}
                </span>
              </a>
            )}

            {section.telegram && (
              <a 
                href={`https://t.me/${section.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-xl md:text-2xl text-white hover:text-yellow-500 transition-colors duration-300"
              >
                <span className="inline-block group-hover:tracking-wider transition-all duration-300">
                  {section.telegram}
                </span>
              </a>
            )}
          </div>
        )}

        {section.ctaLabel && section.ctaLink && (
          <div className="pt-12">
            <Link
              href={section.ctaLink}
              className="inline-flex items-center gap-3 px-12 py-4 bg-yellow-600 text-black font-medium tracking-wide uppercase text-sm hover:bg-yellow-500 transition-all duration-300"
            >
              {section.ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
