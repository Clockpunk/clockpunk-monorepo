import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import type { BrandStorySection as BrandStorySectionType } from '@/lib/sanity/types';
import { urlForImage } from '@/lib/sanity/image';

type Props = {
  section: BrandStorySectionType;
  id?: string;
  theme: 'dark' | 'light';
};

export function BrandStorySection({ section, id, theme }: Props) {
  const bgClass = theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-black';

  return (
    <section id={id} className={`py-20 md:py-32 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {section.image && (
              <div className="relative aspect-[4/3] lg:aspect-square">
                <Image
                  src={urlForImage(section.image).width(800).height(800).url()}
                  alt={section.image.alt || section.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className={section.image ? '' : 'lg:col-span-2 max-w-3xl mx-auto'}>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
                {section.title}
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <PortableText value={section.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
