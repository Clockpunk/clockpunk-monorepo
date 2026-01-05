import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPage } from '@/lib/sanity/api';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

export const revalidate = 180;

export default async function AboutPage() {
  const page = await getPage('about');

  if (!page) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <Link href="/" className="text-steel hover:text-gold transition-colors mb-8 inline-block">
            ← Назад
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8">Об авторе</h1>
          <p className="text-xl text-steel-light">
            Создайте страницу &quot;about&quot; в Sanity Studio
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="bg-background text-foreground py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-steel hover:text-gold transition-colors inline-block">
            ← Назад
          </Link>
        </div>
      </div>
      {page.sections && <SectionRenderer sections={page.sections} />}
    </main>
  );
}
