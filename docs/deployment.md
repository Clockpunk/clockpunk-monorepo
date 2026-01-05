# Руководство по деплою

## Варианты деплоя

### Web (Next.js)
- Vercel (рекомендуется)
- Netlify
- Любой Node.js хостинг

### Studio (Sanity)
- Sanity Hosting (рекомендуется)
- Vercel

## Деплой Web на Vercel

### 1. Подготовка

Создайте аккаунт на [vercel.com](https://vercel.com) и подключите GitHub.

### 2. Создание проекта

1. **Import Project** → выберите репозиторий
2. Настройки:
   ```
   Framework Preset: Next.js
   Root Directory: apps/web
   Build Command: npm run build (автоматически)
   Output Directory: .next (автоматически)
   Install Command: npm install (автоматически)
   ```

### 3. Environment Variables

Добавьте переменные:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-01
NEXT_PUBLIC_SITE_URL=https://ваш-домен.vercel.app

# Опционально: только для приватного dataset
# SANITY_API_READ_TOKEN=your_token
```

**Получение Sanity Project ID**:
- Из Studio: настройки проекта
- Или из https://sanity.io/manage

### 4. Deploy

Нажмите **Deploy**. Автоматический деплой при каждом push в main.

### 5. Кастомный домен

**Settings** → **Domains** → добавьте ваш домен

Обновите переменную:
```env
NEXT_PUBLIC_SITE_URL=https://clockpunks.ru
```

## Деплой Studio

### Вариант 1: Sanity Hosting (рекомендуется)

```bash
cd apps/studio

# Первый деплой
npm run deploy

# Последующие деплои
npm run deploy
```

Studio будет доступна по адресу: `https://ваш-проект.sanity.studio`

**Настройка CORS**:
1. Перейдите в https://sanity.io/manage
2. Выберите проект → **API** → **CORS Origins**
3. Добавьте:
   ```
   https://clockpunks.ru
   http://localhost:3000 (для разработки)
   ```

### Вариант 2: Vercel

1. Создайте отдельный проект в Vercel
2. Настройки:
   ```
   Framework Preset: Other
   Root Directory: apps/studio
   Build Command: npm run build
   Output Directory: dist
   ```
3. Environment Variables:
   ```env
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_API_VERSION=2024-03-01
   ```
4. Deploy

## Настройка CI/CD

GitHub Actions уже настроен в `.github/workflows/ci.yml`.

### Добавьте секреты в GitHub:

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
NEXT_PUBLIC_SANITY_DATASET = production
```

CI запускается автоматически при:
- Push в `main` или `develop`
- Pull Request в `main` или `develop`

## Обновление production

### Процесс

1. Внесите изменения локально
2. Commit и push:
   ```bash
   git add .
   git commit -m "Описание изменений"
   git push origin main
   ```
3. Vercel автоматически задеплоит изменения
4. Studio обновляется через `npm run deploy` в `apps/studio`

### Проверка деплоя

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Actions**: вкладка Actions в репозитории
- **Build Logs**: в интерфейсе Vercel

## Откат изменений

### Vercel

1. Откройте проект в Dashboard
2. **Deployments** → найдите стабильную версию
3. **...** → **Promote to Production**

### Studio

Studio не требует отката, изменения контента управляются в Sanity.

## Мониторинг

### Vercel Analytics

**Settings** → **Analytics** → включите бесплатный тариф

### Логи ошибок

**Monitoring** → **Logs** в Vercel Dashboard

## Troubleshooting

### Build Failed

1. Проверьте логи в Vercel
2. Убедитесь, что переменные окружения заданы
3. Локально проверьте `npm run build`

### 404 на странице

1. Проверьте, что контент опубликован в Sanity
2. Очистите кеш: Vercel → **...** → **Redeploy**
3. Проверьте CORS настройки в Sanity

### Изображения не загружаются

1. Проверьте `next.config.mjs` - добавлен ли `cdn.sanity.io`
2. Проверьте CORS в Sanity
3. Убедитесь, что изображения загружены в Sanity Assets

## Production Checklist

- [ ] Переменные окружения настроены
- [ ] Кастомный домен подключен
- [ ] CORS настроен в Sanity
- [ ] Site Settings заполнены
- [ ] Работы добавлены и опубликованы
- [ ] Главная страница собрана
- [ ] SEO настройки проверены
- [ ] Все страницы открываются
- [ ] Изображения загружаются
- [ ] Lighthouse Score проверен
- [ ] Мобильная версия работает
- [ ] 404 страница отображается
- [ ] Sitemap генерируется
- [ ] Robots.txt доступен
