import type { TriLocale } from "./types";

export type ServiceLineRow = TriLocale<string>;

export const serviceLines = [
  {
    ru: "Продажа техники из Японии и Европы.",
    ro: "Vânzare tehnică din Japonia și Europa.",
    en: "Equipment sales from Japan and Europe.",
  },
  {
    ru: "Аренда погрузчиков на гибких условиях.",
    ro: "Închiriere cu termeni flexibili.",
    en: "Flexible forklift rental.",
  },
  {
    ru: "Ремонт и ТО в собственном сервисе.",
    ro: "Reparații și mentenanță în service propriu.",
    en: "Repair and planned maintenance in-house.",
  },
  {
    ru: "Запчасти и комплектующие со склада.",
    ro: "Piese și componente din stoc.",
    en: "Parts and components from stock.",
  },
  {
    ru: "РВД и гидроцилиндры — изготовление и ремонт.",
    ro: "Furtunuri HID și cilindri — producție și reparație.",
    en: "Hydraulic hoses and cylinders — build & repair.",
  },
  {
    ru: "Шины для спецтехники с монтажом на месте.",
    ro: "Anvelope pentru tehnică specială cu montaj la fața locului.",
    en: "Industrial tires with on-site mounting.",
  },
  {
    ru: "Ковши и навесное оборудование.",
    ro: "Cupe și echipamente atașabile.",
    en: "Buckets and attachments.",
  },
] as ServiceLineRow[];
