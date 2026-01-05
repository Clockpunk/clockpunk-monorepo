import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { getArtworkDetail, getArtworkSlugs } from '@/lib/sanity/api';
import { urlForImage } from '@/lib/sanity/image';

export const revalidate = 180;

export async function generateStaticParams() {
  const slugs = await getArtworkSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

type Props = {
  params: { slug: string };
};

export default async function ArtworkPage({ params }: Props) {
  const artwork = await getArtworkDetail(params.slug);

  if (!artwork) {
    notFound();
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <Link href="/artworks" className="text-steel hover:text-gold transition-colors mb-8 inline-block">
          ← Все работы
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3]">
              <Image
                src={urlForImage(artwork.coverImage).width(1200).height(900).url()}
                alt={artwork.coverImage.alt || artwork.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {artwork.images && artwork.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {artwork.images.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3]">
                    <Image
                      src={urlForImage(image).width(600).height(450).url()}
                      alt={image.alt || `${artwork.title} - изображение ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">{artwork.title}</h1>

            <div className="space-y-4 mb-8 text-steel-light">
              <div>
                <span className="text-foreground font-semibold">Год:</span> {artwork.year}
              </div>
              {artwork.medium && (
                <div>
                  <span className="text-foreground font-semibold">Материалы:</span> {artwork.medium}
                </div>
              )}
              {artwork.dimensions && (
                <div>
                  <span className="text-foreground font-semibold">Размеры:</span> {artwork.dimensions}
                </div>
              )}
              <div>
                <span className="text-foreground font-semibold">Статус:</span>{' '}
                {artwork.status === 'available' && <span className="text-gold">Доступно</span>}
                {artwork.status === 'sold' && <span className="text-gold">Продано</span>}
                {artwork.status === 'draft' && <span>Черновик</span>}
                {artwork.status === 'archived' && <span>Архив</span>}
              </div>
            </div>

            {artwork.description && (
              <div className="prose prose-lg prose-invert max-w-none mb-8">
                <PortableText value={artwork.description} />
              </div>
            )}

            {artwork.tags && artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {artwork.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-steel-dark text-sm rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-steel-dark pt-8">
              {artwork.priceOnRequest ? (
                <p className="text-2xl font-semibold mb-4">Цена по запросу</p>
              ) : artwork.price ? (
                <p className="text-3xl font-bold text-gold mb-4">
                  {artwork.price.toLocaleString('ru-RU')} {artwork.currency}
                </p>
              ) : null}

              <Link
                href="/contacts"
                className="inline-block px-8 py-4 bg-gold text-black font-semibold rounded-sm hover:bg-gold-light transition-colors"
              >
                Связаться с автором
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
