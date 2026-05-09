import type { TriLocale } from "./types";

export type ComparisonRowData = TriLocale<{
  feature: string;
  other: string;
  us: string;
}>;

export const comparisonRows = [
  {
    ru: {
      feature: "Продажа техники",
      other: "Да",
      us: "Да",
    },
    ro: {
      feature: "Vânzare tehnică",
      other: "Da",
      us: "Da",
    },
    en: {
      feature: "Equipment sales",
      other: "Yes",
      us: "Yes",
    },
  },
  {
    ru: {
      feature: "Аренда погрузчиков",
      other: "Нет",
      us: "Да",
    },
    ro: {
      feature: "Închiriere stivuitoare",
      other: "Nu",
      us: "Da",
    },
    en: {
      feature: "Rental",
      other: "No",
      us: "Yes",
    },
  },
  {
    ru: {
      feature: "Ремонт и ТО",
      other: "Нет",
      us: "Да",
    },
    ro: {
      feature: "Service",
      other: "Nu",
      us: "Da",
    },
    en: {
      feature: "Repair & PM",
      other: "No",
      us: "Yes",
    },
  },
  {
    ru: {
      feature: "Запчасти в наличии",
      other: "Нет",
      us: "Да",
    },
    ro: {
      feature: "Piese în stoc",
      other: "Nu",
      us: "Da",
    },
    en: {
      feature: "Parts on shelf",
      other: "No",
      us: "Yes",
    },
  },
  {
    ru: {
      feature: "Несколько брендов",
      other: "Обычно 1–2",
      us: "10+",
    },
    ro: {
      feature: "Mai multe branduri",
      other: "1–2",
      us: "10+",
    },
    en: {
      feature: "Multiple brands",
      other: "1–2",
      us: "10+",
    },
  },
  {
    ru: {
      feature: "Изготовление РВД",
      other: "Нет",
      us: "Да",
    },
    ro: {
      feature: "Furtunuri HID",
      other: "Nu",
      us: "Da",
    },
    en: {
      feature: "Hydraulic hoses",
      other: "No",
      us: "Yes",
    },
  },
  {
    ru: {
      feature: "Шины для техники",
      other: "Нет",
      us: "Да",
    },
    ro: {
      feature: "Anvelope",
      other: "Nu",
      us: "Da",
    },
    en: {
      feature: "Industrial tires",
      other: "No",
      us: "Yes",
    },
  },
  {
    ru: {
      feature: "Всё в одном месте",
      other: "Нет",
      us: "Да",
    },
    ro: {
      feature: "Tot într-un loc",
      other: "Nu",
      us: "Da",
    },
    en: {
      feature: "Single partner",
      other: "No",
      us: "Yes",
    },
  },
] as ComparisonRowData[];
