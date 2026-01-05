# Инструкция по загрузке кода в GitHub

## Вариант 1: Через GitHub CLI (gh)

```bash
# Если у вас установлен GitHub CLI
cd /path/to/clockpunk-monorepo
gh auth login
git push -u origin main
```

## Вариант 2: Через Personal Access Token

1. Создайте Personal Access Token:
   - Перейдите: https://github.com/settings/tokens
   - **Generate new token (classic)**
   - Выберите scopes: `repo` (полный доступ к репозиториям)
   - Сохраните токен (показывается один раз!)

2. Загрузите код:
```bash
cd /path/to/clockpunk-monorepo
git remote set-url origin https://YOUR_TOKEN@github.com/Clockpunk/Clockpunk.git
git push -u origin main
```

3. После успешного push верните обычный URL:
```bash
git remote set-url origin https://github.com/Clockpunk/Clockpunk.git
```

## Вариант 3: Через SSH ключ (рекомендуется)

1. Создайте SSH ключ (если нет):
```bash
ssh-keygen -t ed25519 -C "clockpunkman@gmail.com"
```

2. Добавьте ключ в GitHub:
   - Скопируйте публичный ключ: `cat ~/.ssh/id_ed25519.pub`
   - Перейдите: https://github.com/settings/keys
   - **New SSH key** → вставьте ключ

3. Измените URL и загрузите:
```bash
cd /path/to/clockpunk-monorepo
git remote set-url origin git@github.com:Clockpunk/Clockpunk.git
git push -u origin main
```

## Вариант 4: Через GitHub Desktop

1. Скачайте [GitHub Desktop](https://desktop.github.com/)
2. **File** → **Add Local Repository** → выберите папку `clockpunk-monorepo`
3. **Publish repository** → выберите `Clockpunk/Clockpunk`
4. Нажмите **Publish**

## Вариант 5: Ручная загрузка файлов

Если ничего не работает:

1. Скачайте архив:
   ```bash
   tar -czf clockpunk-monorepo.tar.gz clockpunk-monorepo/
   ```

2. Перейдите на GitHub: https://github.com/Clockpunk/Clockpunk
3. Нажмите **Add file** → **Upload files**
4. Загрузите все файлы из папки `clockpunk-monorepo/`

**Важно**: При ручной загрузке:
- Не загружайте `node_modules/`, `.next/`, `dist/`
- Загружайте только исходный код
- GitHub автоматически создаст первый commit

## Проверка успешной загрузки

После загрузки проверьте:
- https://github.com/Clockpunk/Clockpunk
- Должны быть видны все файлы
- Последний commit: "Initial commit: Complete Clockpunk monorepo setup"
- 59 files changed

## Дальнейшие шаги

После успешной загрузки:

1. **Установите зависимости локально**:
   ```bash
   cd clockpunk-monorepo
   npm install
   ```

2. **Настройте Sanity**:
   ```bash
   cd apps/studio
   npx sanity init
   # Следуйте инструкциям для создания проекта
   ```

3. **Настройте переменные окружения**:
   ```bash
   # apps/web/.env.local
   cp .env.example .env.local
   # Заполните NEXT_PUBLIC_SANITY_PROJECT_ID

   # apps/studio/.env
   cp .env.example .env
   # Заполните SANITY_STUDIO_PROJECT_ID
   ```

4. **Запустите локально**:
   ```bash
   # Терминал 1
   npm run dev

   # Терминал 2
   npm run dev:studio
   ```

5. **Настройте Vercel деплой**:
   - Следуйте инструкциям в `docs/deployment.md`

## Если возникли проблемы

- **Permission denied**: Проверьте права доступа к репозиторию
- **Authentication failed**: Проверьте токен/SSH ключ
- **Remote already exists**: Используйте `git remote set-url origin <URL>`
- **Large files**: Убедитесь, что не загружаете `node_modules/`

## Контакты поддержки

Если ничего не помогает, свяжитесь с технической поддержкой GitHub:
https://support.github.com/

Или проверьте документацию:
https://docs.github.com/en/get-started/getting-started-with-git
