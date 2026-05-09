import type { TriLocale } from "./types";

export type TestimonialRow = TriLocale<{
  name: string;
  role: string;
  quote: string;
}>;

export const testimonials = [
  {
    ru: {
      name: "Александр П.",
      role: "Руководитель логистики, производство",
      quote:
        "Арендовали электропогрузчики на сезонный пик — подобрали мощность и высоту под наши стеллажи, техника приехала в срок, сервис на связи.",
    },
    ro: {
      name: "Alexandru P.",
      role: "Șef logistică, producție",
      quote:
        "Am închiriat stivuitoare electrice pentru vârf sezonier — capacitatea și înălțimea mastului au fost alese pentru rafturi, tehnică la timp, service disponibil.",
    },
    en: {
      name: "Alexander P.",
      role: "Head of logistics, manufacturing",
      quote:
        "We rented electric forklifts for a seasonal peak — lift capacity and mast height matched our racking, units arrived on time, service stayed responsive.",
    },
  },
  {
    ru: {
      name: "Марина С.",
      role: "Закупки, дистрибьютор",
      quote:
        "Нужны были запчасти и РВД в короткие сроки. Собственный склад NEOCAR сработал — простой минимальный, без посредников.",
    },
    ro: {
      name: "Marina S.",
      role: "Achiziții, distribuție",
      quote:
        "Ne trebuiau piese și furtunuri rapid. Stocul propriu NEOCAR ne-a scos din încurcătură — downtime minim, fără intermediari.",
    },
    en: {
      name: "Marina S.",
      role: "Procurement, distribution",
      quote:
        "We needed parts and hoses urgently. NEOCAR’s in-house stock delivered — minimal downtime, no middlemen.",
    },
  },
  {
    ru: {
      name: "Ион Д.",
      role: "Технический директор, склад",
      quote:
        "Обслуживаем парк Toyota и Mitsubishi у них уже несколько лет. Прозрачная диагностика, понятные сроки ремонта — рекомендую как партнёра.",
    },
    ro: {
      name: "Ion D.",
      role: "Director tehnic, depozit",
      quote:
        "Întreținem parcul Toyota și Mitsubishi la ei de ani de zile. Diagnostic clar, termeni reali la reparație — recomand ca partener.",
    },
    en: {
      name: "Ion D.",
      role: "Technical director, warehouse",
      quote:
        "We service our Toyota and Mitsubishi fleet with them for years. Clear diagnostics and realistic repair timelines — a partner we trust.",
    },
  },
] as TestimonialRow[];
