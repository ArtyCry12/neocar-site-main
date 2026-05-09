import type { TriLocale } from "./types";

export type CatalogCard = {
  title: string;
  body: string;
};

export type CatalogCardRow = TriLocale<CatalogCard>;

export const catalogCards = [
  {
    ru: {
      title: "Авто-погрузчики (Д / Б / Газ / Электро)",
      body:
        "Вилочные погрузчики для склада и производства. Грузоподъёмность от 1 до 10+ тонн.",
    },
    ro: {
      title: "Stivuitoare (Motorină / Benzină / Gaz / Electric)",
      body:
        "Pentru depozit și producție. Capacitate de ridicare 1–10+ tone.",
    },
    en: {
      title: "Forklifts (Diesel / Gasoline / LPG / Electric)",
      body:
        "Warehouse and plant trucks with capacity from 1 to 10+ tons.",
    },
  },
  {
    ru: {
      title: "Электро-погрузчики",
      body:
        "Бесшумная техника для закрытых помещений, пищевых производств и холодных складов.",
    },
    ro: {
      title: "Stivuitoare electrice",
      body:
        "Operare silențioasă pentru spații închise și producție alimentară.",
    },
    en: {
      title: "Electric forklifts",
      body:
        "Quiet units for indoor plants, food production and cold storage.",
    },
  },
  {
    ru: {
      title: "Гидравлические тележки",
      body:
        "Ручные и электрические — для перемещения паллет без лишних затрат.",
    },
    ro: {
      title: "Transpalete hidraulice",
      body:
        "Manuale și electrice pentru paleți — costuri optimizate.",
    },
    en: {
      title: "Pallet trucks",
      body:
        "Manual and powered pallet movers with optimized cost.",
    },
  },
  {
    ru: {
      title: "Штабелеры",
      body:
        "Ручные гидравлические и с электроподъёмом — для укладки грузов на стеллажи.",
    },
    ro: {
      title: "Stivuitoare cu catarg",
      body:
        "Manuale și cu ridicare electrică pentru rafturi înalte.",
    },
    en: {
      title: "Stackers",
      body:
        "Manual and powered lift for high-bay shelving.",
    },
  },
  {
    ru: {
      title: "Мини-погрузчики Bobcat",
      body:
        "Компактная техника для строительства и работы в стеснённых условиях.",
    },
    ro: {
      title: "Miniîncărcătoare Bobcat",
      body:
        "Compacte pentru construcții și spații înguste.",
    },
    en: {
      title: "Bobcat skid-steers",
      body:
        "Compact loaders for construction and tight yards.",
    },
  },
  {
    ru: {
      title: "Телескопические погрузчики",
      body:
        "Для работы на высоте в строительстве и сельском хозяйстве.",
    },
    ro: {
      title: "Stivuitoare telescopice",
      body:
        "Lucru la înălțime în construcții și agricultură.",
    },
    en: {
      title: "Telehandlers",
      body:
        "Height work for construction and agriculture.",
    },
  },
  {
    ru: {
      title: "Экскаваторы",
      body: "Земляные и строительные работы — аренда и продажа.",
    },
    ro: {
      title: "Excavatoare",
      body: "Lucrări de săpat și construcții — închiriere și vânzare.",
    },
    en: {
      title: "Excavators",
      body: "Earthworks — rental and sales.",
    },
  },
] as CatalogCardRow[];
