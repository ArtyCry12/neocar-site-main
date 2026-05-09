# NEOCAR Site — репозиторий

Продакшен-приложение: **`web/`** (Next.js 16, App Router, next-intl, Tailwind).  
Корень репозитория держит **исходные дизайн-материалы** и карту ассетов; в деплой попадает только содержимое `web/` (и переменные окружения на хостинге).

## Быстрый запуск

```bash
cd web
npm.cmd install
npm.cmd run generate:media
npm.cmd run dev
```

Откройте `http://localhost:3000` — произойдёт редирект на локаль по умолчанию (`/ru`).

```bash
npm run build
npm start
```

Переменные окружения скопируйте из `web/.env.example`.

## Структура репозитория

```
neo-car-site2/
├── README.md                 ← этот файл
├── ASSETS-MAP.md             ← карта: исходники → компоненты в web/
├── design/                   ← НЕ часть Next-сборки; референсы и медиа для контента
│   ├── prompts/              ← текстовые промпты и ТЗ по блокам
│   ├── source-models/        ← исходный GLB (копия боевой модели лежит в web/public/models/)
│   ├── hero-section-design/
│   ├── footer-design/
│   ├── clients-design-reviews/
│   ├── image-auto-slider-design/
│   ├── media-pool/
│   └── maps-integration/     ← старый эталон globe/map (актуальный код — web/components/ui/)
└── web/                      ← Next.js-проект (Root Directory на Vercel = web)
    ├── app/                  ← маршруты, layout, robots, sitemap, API lead
    ├── components/           ← hero, sections, layout, ui, contact, providers
    ├── i18n/                 ← routing, request, navigation (next-intl)
    ├── messages/             ← ru.ts, ro.ts, en.ts
    ├── lib/                  ← утилиты, SITE_ORIGIN
    ├── public/               ← статика: media/, models/, только нужное в проде
    ├── proxy.ts
    ├── next.config.ts
    ├── vercel.json
    └── package.json
```

## Деплой (Vercel)

1. Проект: **Root Directory** = `web`.  
2. Env: см. `web/.env.example` (`NEXT_PUBLIC_SITE_URL`, Resend и т.д.).  
3. Тяжёлый `forklift.glb` уже в `web/public/models/`; исходник дублируется в `design/source-models/` для архива.

## Где что искать в коде

| Задача | Путь |
|--------|------|
| Главная страница (сборка секций) | `web/app/[locale]/page.tsx` |
| Переводы | `web/messages/*.ts` |
| Hero 3D | `web/components/hero/` |
| Форма лида + API | `web/components/contact/LeadForm.tsx`, `web/app/api/lead/route.ts` |
| Отзывы | `web/components/sections/TestimonialsSection.tsx` |
| Карта | `web/components/ui/neocar-location.tsx` |

Подробная привязка файлов дизайна к компонентам — в **`ASSETS-MAP.md`**.
