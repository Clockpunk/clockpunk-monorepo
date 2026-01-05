import type { ProcessSection as ProcessSectionType } from '@/lib/sanity/types';

type Props = {
  section: ProcessSectionType;
  id?: string;
  theme: 'dark' | 'light';
};

export function ProcessSection({ section, id, theme }: Props) {
  const bgClass = theme === 'dark' ? 'bg-background text-foreground' : 'bg-white text-black';

  return (
    <section id={id} className={`py-20 md:py-32 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-xl opacity-80">{section.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {section.items.map((item, index) => (
            <div key={index} className="text-center">
              {item.icon && (
                <div className="text-4xl md:text-5xl mb-4 text-gold">{item.icon}</div>
              )}
              <div className="text-5xl font-bold text-gold mb-4">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="font-display text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-steel-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
