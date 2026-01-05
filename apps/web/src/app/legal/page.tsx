import Link from 'next/link';
import { getPage } from '@/lib/sanity/api';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

export const revalidate = 180;

export default async function LegalPage() {
  const page = await getPage('legal');

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-steel hover:text-gold transition-colors inline-block mb-8">
            ← Назад
          </Link>
        </div>
      </div>

      {page?.sections ? (
        <SectionRenderer sections={page.sections} />
      ) : (
        <div className="container mx-auto px-4 py-20">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-12">
            Юридическая информация
          </h1>
          <div className="max-w-3xl prose prose-lg prose-invert">
            <p>Создайте страницу &quot;legal&quot; в Sanity Studio для отображения юридической информации.</p>
          </div>
        </div>
      )}
    </main>
  );
}
