# NEOCAR — сайт (Next.js)

## Запуск

```bash
npm install
npm run dev
```

Локали: `/ru`, `/ro`, `/en` (префикс всегда в URL).

## Сборка

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Окружение

Скопируйте `.env.example` → `.env.local` и заполните переменные (см. комментарии в файле).

## Корень монорепозитория

Родительская папка `neo-car-site2/` содержит **`design/`** (промпты и исходные медиа) и этот каталог **`web/`** как единственную продакшен-сборку.

Vercel: **Root Directory = `web`**.
