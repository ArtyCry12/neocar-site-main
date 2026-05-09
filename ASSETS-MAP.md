# NEOCAR — карта ассетов → код (`web/`)



Исходники лежат в **`design/`** (не входят в Next-сборку). В проде используются копии в **`web/public/`**.



| Ассет (в `design/`) | Назначение | Цель в проекте |

|---------------------|------------|----------------|

| `prompts/text-content-and-text-structure-of-the-website.txt` | Копирайт / структура | `web/messages/*.ts`, `web/lib/site.ts` |

| `source-models/*.glb` | 3D hero (архив) | деплой: `web/public/models/forklift.glb` |

| `hero-section-design/` | Маркиза + hero | `HeroPhotoMarqueeSection`, `web/public/media/hero/*`, логотип |

| `maps-integration/code/` | Эталон globe/map | актуально: `web/components/ui/globe.tsx`, `neocar-location.tsx` |

| `media-pool/` | Фото/видео | `web/public/media/slider/*` и др. |

| `image-auto-slider-design/` | Лента / фоны | `ImageAutoSliderSection` |

| `clients-design-reviews/` | Отзывы (эталонный текст не про погрузчики) | **`TestimonialsSection`**, копирайт в `messages` |

| `footer-design/` | Футер | `web/components/layout/Footer.tsx` |

| `prompts/navigation-panel-design-prompt.txt` | Dock | `DockNav` |

| `prompts/scroll-animation-prompt.txt` | Скролл | `HeroSection`, Lenis |

| `prompts/announcements-design-prompt.txt` | Баннер | `AnnouncementBanner` |

| `prompts/background-design-prompt.txt` | Фон | опционально позже |

| `prompts/border-design-prompt.txt` | Рамки | частично в карточках UI |

| `prompts/sidebar-design-prompt.txt` | Сайдбар | опционально |

| `prompts/testimonials-design-prompt.txt` | Social proof | `SocialProof` |



Локали: **ru** (default), **ro**, **en** — `next-intl`.


