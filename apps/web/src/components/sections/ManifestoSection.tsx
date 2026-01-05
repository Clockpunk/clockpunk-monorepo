'use client';

type Props = {
  section: any;
  id?: string;
  theme: 'dark' | 'light';
};

export function ManifestoSection({ section, id }: Props) {
  if (!section.enabled) return null;

  return (
    <section id={id} className="relative py-32 md:py-48 overflow-hidden bg-background">
      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl">
        {section.heading && (
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-16 md:mb-24">
            {section.heading}
          </h2>
        )}

        <div className="space-y-12">
          {section.philosophy?.map((paragraph: string, index: number) => (
            <p 
              key={index}
              className="text-2xl md:text-4xl lg:text-5xl leading-relaxed font-light text-white/90 tracking-tight"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {section.signature && (
          <div className="mt-24 pt-12 border-t border-white/10">
            <p className="text-lg md:text-xl text-white/60 tracking-widest uppercase">
              {section.signature}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
