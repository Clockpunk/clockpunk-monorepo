# Архитектура проекта

## Принципы

1. **Контент через CMS**: Весь контент управляется из Sanity, никакого хардкода
2. **Sections-based**: Страницы собираются из переиспользуемых секций
3. **TypeScript Strict**: Полная типизация, безопасность на этапе компиляции
4. **Монорепозиторий**: Единое место для всего кода
5. **Vercel-ready**: Оптимизировано под Vercel-подобные платформы

## Структура монорепозитория

```
clockpunk-monorepo/
├── apps/
│   ├── web/              # Next.js App Router приложение
│   │   ├── src/
│   │   │   ├── app/      # Страницы (App Router)
│   │   │   ├── components/
│   │   │   │   ├── sections/   # Компоненты секций
│   │   │   │   └── ui/         # UI компоненты
│   │   │   └── lib/
│   │   │       ├── sanity/     # Sanity client, queries, types
│   │   │       └── seo/        # SEO утилиты
│   │   ├── public/
│   │   ├── .env.example
│   │   ├── next.config.mjs
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── studio/           # Sanity Studio v3
│       ├── schemaTypes/
│       │   ├── documents/  # Документы (artwork, page, homePage)
│       │   └── objects/    # Секции (heroSection, ctaSection...)
│       ├── sanity.config.ts
│       ├── .env.example
│       └── package.json
│
├── packages/
│   └── config/           # Shared конфиги (eslint, prettier, tsconfig)
│
├── docs/                 # Документация
├── .github/workflows/    # CI/CD
├── .gitignore
├── .editorconfig
├── package.json          # Root workspace
└── README.md
```

## Data Flow

```
Sanity Studio → Sanity Content Lake → Next.js (fetch) → Render
     ↓                   ↓                    ↓
 Редактор          GROQ Queries         ISR Cache
 создает           возвращают           (revalidate: 180s)
 контент           типизированные
                   данные
```

## Web App (Next.js)

### Routing

Используется **App Router** (Next.js 14+):

```
/                    → app/page.tsx (Home)
/artworks            → app/artworks/page.tsx (List)
/artworks/[slug]     → app/artworks/[slug]/page.tsx (Detail)
/about               → app/about/page.tsx
/contacts            → app/contacts/page.tsx
/legal               → app/legal/page.tsx
/sitemap.xml         → app/sitemap.ts (dynamic)
/robots.txt          → app/robots.ts
```

### Санity Data Layer

**Файлы**:
- `client.ts` - Sanity клиент и fetch wrapper
- `queries.ts` - GROQ запросы
- `types.ts` - TypeScript типы
- `api.ts` - API функции
- `image.ts` - Image URL builder

**Паттерн использования**:
```typescript
// В page.tsx
import { getHomePage } from '@/lib/sanity/api';

export default async function HomePage() {
  const data = await getHomePage(); // Типизированный результат
  return <SectionRenderer sections={data.sections} />;
}
```

**Кеширование**:
- Все запросы используют `revalidate: 180` (3 минуты)
- ISR (Incremental Static Regeneration)
- Контент обновляется автоматически через 3 минуты после изменений в Sanity

### Section Renderer

**Файл**: `components/sections/SectionRenderer.tsx`

**Задача**: Универсальный рендерер секций

```typescript
<SectionRenderer sections={data.sections} />
  ↓
  Фильтрует по enabled=true
  ↓
  Перебирает секции и рендерит по _type
  ↓
  <HeroSection /> | <FeaturedArtworksSection /> | ...
```

**Добавление новой секции**:
1. Создать схему в Studio
2. Создать компонент
3. Добавить case в SectionRenderer

### Компоненты секций

Каждая секция:
- Получает `section` объект с данными
- Получает `id` и `theme` для общих пропсов
- Самодостаточна (не зависит от других компонентов)

**Пример**:
```typescript
type Props = {
  section: HeroSectionType;
  id?: string;
  theme: 'dark' | 'light';
};

export function HeroSection({ section, id, theme }: Props) {
  // Рендер на основе section данных
}
```

### Styling

**Tailwind CSS**:
- Утилитные классы
- Кастомные цвета в `tailwind.config.ts`:
  - `gold` - акцентный золотой
  - `steel` - серый металлический
  - `background` / `foreground` - темная тема

**Шрифты**:
- `Inter` - основной (sans)
- `Playfair Display` - заголовки (display)

**Адаптив**:
- Mobile-first подход
- Breakpoints: `md:` (768px), `lg:` (1024px)

## Sanity Studio

### Content Schema

**Documents** (коллекции):
- `siteSettings` - singleton, глобальные настройки
- `homePage` - singleton, главная страница
- `page` - страницы сайта
- `artwork` - работы/арт-объекты

**Objects** (встроенные объекты):
- Секции: `heroSection`, `featuredArtworksSection`, и т.д.
- Не хранятся отдельно, только как часть документов

### Sections Architecture

**Inline Objects, не References**:
```
homePage {
  sections: [
    { _type: 'heroSection', _key: 'abc123', ... },  // inline
    { _type: 'ctaSection', _key: 'def456', ... }    // inline
  ]
}
```

**Почему не references?**
- Проще перетаскивать
- Нет лишних запросов
- Секции связаны с конкретной страницей

**Порядок секций**:
- Определяется порядком в массиве
- Drag-and-drop в Studio UI

### GROQ Queries

**Особенности**:
```groq
// Featured artworks - условная логика в GROQ
autoFeatured == false => {
  "items": items[]-> { ... }  // Ручной выбор
},
autoFeatured == true => {
  "items": *[featured == true] { ... }  // Автоматический выбор
}

// Сортировка работ
order(featured desc, sortOrder asc, year desc, title asc)

// Проекция с переименованием
"slug": slug.current
```

### Preview Configuration

Studio использует:
```typescript
preview: {
  select: { title: 'title', enabled: 'enabled' },
  prepare(selection) {
    return {
      title: `Hero: ${selection.title}`,
      subtitle: selection.enabled ? '✓' : '✗'
    };
  }
}
```

## SEO

### Metadata

**Файл**: `app/layout.tsx` - root metadata

**Динамическая metadata**:
```typescript
// В page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getData(params.slug);
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription,
    // ...
  };
}
```

### Sitemap

**Файл**: `app/sitemap.ts`

**Динамический**:
- Запрашивает все slugs из Sanity
- Генерирует sitemap.xml на лету
- Включает статические страницы + динамические

### Robots.txt

**Файл**: `app/robots.ts`

**Конфигурация**:
```typescript
return {
  rules: { userAgent: '*', allow: '/' },
  sitemap: `${baseUrl}/sitemap.xml`
};
```

## Изображения

### Next.js Image

Все изображения через `next/image`:
- Автоматическая оптимизация
- Lazy loading
- Responsive sizes

### Sanity Image URL Builder

```typescript
import { urlForImage } from '@/lib/sanity/image';

<Image
  src={urlForImage(image).width(800).height(600).url()}
  alt={image.alt}
  width={800}
  height={600}
/>
```

**Форматы**:
- `.auto('format')` - WebP/AVIF поддержка
- `.fit('max')` - сохранить пропорции
- `.quality(80)` - контроль качества

### Оптимизация

`next.config.mjs`:
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' }
  ]
}
```

## Performance

### ISR (Incremental Static Regeneration)

```typescript
export const revalidate = 180; // 3 минуты

// Или в fetch:
fetch(url, {
  next: { revalidate: 180 }
});
```

**Поведение**:
1. Первый запрос → генерация страницы
2. Последующие → отдача из кеша
3. Через 180 сек → фоновая регенерация
4. Следующий запрос → новая версия

### Lighthouse Targets

**MVP Цели**:
- Performance: ≥80 (mobile)
- SEO: ≥90
- Accessibility: ≥90

**Оптимизации**:
- `priority` на hero изображениях
- Lazy load для остальных
- Font optimization (Next.js автоматически)
- Минимальный JavaScript

## Безопасность

### Environment Variables

**Публичные** (NEXT_PUBLIC_):
- Доступны в браузере
- Для client-side кода
- Пример: Sanity Project ID

**Приватные**:
- Только на сервере
- Пример: Sanity Read Token (если dataset приватный)

### CORS

Настройка в Sanity Dashboard:
```
Allowed origins:
- https://clockpunks.ru
- http://localhost:3000
```

## Расширение

### Добавление секции

1. **Schema** (`apps/studio/schemaTypes/objects/newSection.ts`):
```typescript
export const newSection = defineType({
  name: 'newSection',
  type: 'object',
  fields: [...]
});
```

2. **Type** (`apps/web/src/lib/sanity/types.ts`):
```typescript
export type NewSection = {
  _type: 'newSection';
  // ...
};
```

3. **Query** (`apps/web/src/lib/sanity/queries.ts`):
```groq
_type == "newSection" => { title, body, ... }
```

4. **Component** (`apps/web/src/components/sections/NewSection.tsx`):
```typescript
export function NewSection({ section }: Props) { ... }
```

5. **Renderer** (`apps/web/src/components/sections/SectionRenderer.tsx`):
```typescript
case 'newSection':
  return <NewSection key={key} section={section} />;
```

### Добавление страницы

Создайте `app/new-page/page.tsx`:
```typescript
import { getPage } from '@/lib/sanity/api';
import { SectionRenderer } from '@/components/sections/SectionRenderer';

export default async function NewPage() {
  const page = await getPage('new-page'); // slug
  return <SectionRenderer sections={page?.sections || []} />;
}
```

Создайте страницу в Studio со slug `new-page`.

## Ограничения и правила

### НЕ захардкодить контент

❌ **Плохо**:
```typescript
<h1>Clockpunk</h1>
<p>Инженерная эстетика</p>
```

✅ **Хорошо**:
```typescript
<h1>{section.headline}</h1>
<p>{section.subheadline}</p>
```

**Исключения** (технический контент):
- Системные сообщения ("Загрузка...", "Ошибка")
- 404 страница
- Fallback UI

### Типизация обязательна

Все данные из Sanity:
```typescript
const data = await getHomePage(); // HomePage | null
data.sections // Section[]
```

Никаких `any`:
```typescript
const data: any = await fetch(); // ❌
const data = await fetch() as HomePage; // ✅
```

### Caching

Всегда указывайте revalidate:
```typescript
export const revalidate = 180; // Страница
// Или
next: { revalidate: 180 } // Fetch
```

## Troubleshooting

### Изменения не отображаются

1. Проверьте, опубликован ли контент (Publish в Studio)
2. Подождите 3 минуты (revalidate time)
3. Очистите кеш браузера

### TypeScript ошибки

```bash
npm run typecheck
```

Проверьте:
- Соответствие типов в `types.ts` и схемах
- Обязательные поля в GROQ
- Nullable значения

### Build Failed

```bash
# Локально
cd apps/web
npm run build

# Проверить логи
```

Частые причины:
- Отсутствуют env variables
- TypeScript ошибки
- Sanity недоступен

## Best Practices

1. **Тестируйте локально** перед push
2. **Используйте semantic commits**: `feat:`, `fix:`, `docs:`
3. **Один PR = одна feature**
4. **Документируйте** сложные решения
5. **Оптимизируйте изображения** перед загрузкой в Sanity
6. **Заполняйте alt texts** обязательно
7. **Тестируйте мобильную версию** всегда
