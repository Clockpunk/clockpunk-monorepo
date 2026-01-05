import Link from 'next/link';
import Image from 'next/image';
import { getArtworksList } from '@/lib/sanity/api';
import { urlForImage } from '@/lib/sanity/image';

export const revalidate = 180;

export default async function ArtworksPage() {
  const artworks = await getArtworksList();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-16">
          <Link href="/" className="text-steel hover:text-gold transition-colors mb-8 inline-block">
            ← Назад
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-bold">Работы</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
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
              <h2 className="font-display text-2xl font-semibold mb-2">{artwork.title}</h2>
              <div className="flex items-center gap-4 text-steel-light">
                <span>{artwork.year}</span>
                {artwork.status === 'sold' && (
                  <span className="text-gold">Продано</span>
                )}
                {artwork.featured && (
                  <span className="text-gold">★</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
