import Link from 'next/link';
import { getPage, getSiteSettings } from '@/lib/sanity/api';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

export const revalidate = 180;

export default async function ContactsPage() {
  const [page, settings] = await Promise.all([
    getPage('contacts'),
    getSiteSettings(),
  ]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-steel hover:text-gold transition-colors inline-block mb-8">
            ← Назад
          </Link>
        </div>
      </div>

      {page?.sections && <SectionRenderer sections={page.sections} />}

      {/* Fallback контакты из настроек */}
      {!page && settings?.contacts && (
        <div className="container mx-auto px-4 py-20">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-12">Контакты</h1>
          <div className="max-w-2xl space-y-6 text-xl">
            {settings.contacts.email && (
              <div>
                <span className="text-steel-light">Email:</span>{' '}
                <a href={`mailto:${settings.contacts.email}`} className="text-gold hover:text-gold-light">
                  {settings.contacts.email}
                </a>
              </div>
            )}
            {settings.contacts.phone && (
              <div>
                <span className="text-steel-light">Телефон:</span>{' '}
                <a href={`tel:${settings.contacts.phone}`} className="text-gold hover:text-gold-light">
                  {settings.contacts.phone}
                </a>
              </div>
            )}
            {settings.contacts.telegram && (
              <div>
                <span className="text-steel-light">Telegram:</span>{' '}
                <a href={`https://t.me/${settings.contacts.telegram.replace('@', '')}`} className="text-gold hover:text-gold-light" target="_blank" rel="noopener noreferrer">
                  {settings.contacts.telegram}
                </a>
              </div>
            )}
            {settings.contacts.address && (
              <div>
                <span className="text-steel-light block mb-2">Адрес:</span>
                <p className="whitespace-pre-line">{settings.contacts.address}</p>
              </div>
            )}
          </div>

          {settings.socials && settings.socials.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-display font-semibold mb-6">Социальные сети</h2>
              <div className="flex gap-6">
                {settings.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    {social.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
