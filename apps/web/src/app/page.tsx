import { getHomePage } from '@/lib/sanity/api';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

export const revalidate = 180; // 3 минуты

export default async function HomePage() {
  const data = await getHomePage();

  if (!data || !data.sections) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Clockpunk</h1>
          <p className="text-steel-light">Настройте контент в Sanity Studio</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <SectionRenderer sections={data.sections} />
    </main>
  );
}
