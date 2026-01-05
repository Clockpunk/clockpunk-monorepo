import Image from 'next/image';
import Link from 'next/link';
import type { GalleryGridSection as GalleryGridSectionType } from '@/lib/sanity/types';
import { urlForImage } from '@/lib/sanity/image';

type Props = {
  section: GalleryGridSectionType;
  id?: string;
  theme: 'dark' | 'light';
};

export function GalleryGridSection({ section, id, theme }: Props) {
  const bgClass = theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-black';

  return (
    <section id={id} className={`py-20 md:py-32 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-xl opacity-80">{section.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section.artworks.map((artwork) => (
            <Link
              key={artwork._id}
              href={`/artworks/${artwork.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                <Image
                  src={urlForImage(artwork.coverImage).width(800).height(600).url()}
                  alt={artwork.coverImage.alt || artwork.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">{artwork.title}</h3>
              <p className="text-steel-light">{artwork.year}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
