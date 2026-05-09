import type { TriLocale } from "./types";

export type WhyRowData = TriLocale<{
  advantage: string;
  description: string;
}>;

export const whyRows = [
  {
    ru: {
      advantage: "Полный цикл",
      description:
        "Купить, арендовать, отремонтировать, найти запчасть — всё у нас.",
    },
    ro: {
      advantage: "Ciclu complet",
      description:
        "Cumpără, închiriază, repară, găsește piese — tot la noi.",
    },
    en: {
      advantage: "Full cycle",
      description:
        "Buy, rent, repair, source parts — all with us.",
    },
  },
  {
    ru: {
      advantage: "Аренда",
      description:
        "Гибкие сроки — от нескольких дней до долгосрочного контракта.",
    },
    ro: {
      advantage: "Închiriere",
      description:
        "De la câteva zile la contracte pe termen lung.",
    },
    en: {
      advantage: "Rental",
      description:
        "From a few days to multi-year contracts.",
    },
  },
  {
    ru: {
      advantage: "Свой сервис",
      description:
        "Свои механики и склад запчастей без посредников.",
    },
    ro: {
      advantage: "Service propriu",
      description:
        "Mecanici și stoc de piese — fără intermediari.",
    },
    en: {
      advantage: "Own workshop",
      description:
        "Technicians and spare parts without brokers.",
    },
  },
  {
    ru: {
      advantage: "10+ брендов",
      description:
        "Подберём технику под задачу и бюджет.",
    },
    ro: {
      advantage: "10+ branduri",
      description:
        "Potrivim utilajul la sarcină și buget.",
    },
    en: {
      advantage: "10+ brands",
      description:
        "We match equipment to task and budget.",
    },
  },
  {
    ru: {
      advantage: "Опыт",
      description:
        "Работаем в Молдове с 2004 года — живые люди рядом.",
    },
    ro: {
      advantage: "Experiență",
      description:
        "În Moldova din 2004 — oameni reali aproape de tine.",
    },
    en: {
      advantage: "Experience",
      description:
        "Operating in Moldova since 2004 — real people nearby.",
    },
  },
  {
    ru: {
      advantage: "Запчасти",
      description:
        "Собственный склад — минимальный простой техники.",
    },
    ro: {
      advantage: "Piese",
      description:
        "Stoc propriu — timpi morți minimi.",
    },
    en: {
      advantage: "Parts stock",
      description:
        "Own warehouse — minimal downtime.",
    },
  },
] as WhyRowData[];
