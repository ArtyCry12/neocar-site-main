import type { TriLocale } from "./types";

export type ContactPerson = TriLocale<{
  name: string;
  role: string;
  phone: string;
  email?: string;
}>;

export type ContactGroup = {
  id: "sales" | "parts" | "accounting";
  titleKey: "groupSales" | "groupParts" | "groupAccounting";
  iconKey: "Building2" | "Wrench" | "Calculator";
  members: ContactPerson[];
};

export const contactGroups: ContactGroup[] = [
  {
    id: "sales",
    titleKey: "groupSales",
    iconKey: "Building2",
    members: [
      {
        ru: {
          name: "Котруцэ Виталий",
          role: "Ген. директор",
          phone: "+373 69 88 55 88",
          email: "vitaly@neocar.md",
        },
        ro: {
          name: "Vitalie Cotruță",
          role: "Director general",
          phone: "+373 69 88 55 88",
          email: "vitaly@neocar.md",
        },
        en: {
          name: "Vitalie Cotruță",
          role: "CEO",
          phone: "+373 69 88 55 88",
          email: "vitaly@neocar.md",
        },
      },
      {
        ru: {
          name: "Котруцэ Александр",
          role: "Ком. директор",
          phone: "+373 69 555 888",
          email: "alex@neocar.md",
        },
        ro: {
          name: "Alexandru Cotruță",
          role: "Director comercial",
          phone: "+373 69 555 888",
          email: "alex@neocar.md",
        },
        en: {
          name: "Alexandru Cotruță",
          role: "Commercial director",
          phone: "+373 69 555 888",
          email: "alex@neocar.md",
        },
      },
    ] as ContactPerson[],
  },
  {
    id: "parts",
    titleKey: "groupParts",
    iconKey: "Wrench",
    members: [
      {
        ru: {
          name: "Козмик Марин",
          role: "Менеджер по продажам",
          phone: "+373 69 88 11 86",
        },
        ro: {
          name: "Marin Cozmic",
          role: "Manager vânzări",
          phone: "+373 69 88 11 86",
        },
        en: {
          name: "Marin Cozmic",
          role: "Sales manager",
          phone: "+373 69 88 11 86",
        },
      },
    ] as ContactPerson[],
  },
  {
    id: "accounting",
    titleKey: "groupAccounting",
    iconKey: "Calculator",
    members: [
      {
        ru: {
          name: "Марина Бырка",
          role: "Бухгалтер",
          phone: "+373 79 334 633",
          email: "contabil@neocar.md",
        },
        ro: {
          name: "Marina Bîrca",
          role: "Contabil",
          phone: "+373 79 334 633",
          email: "contabil@neocar.md",
        },
        en: {
          name: "Marina Bîrca",
          role: "Accountant",
          phone: "+373 79 334 633",
          email: "contabil@neocar.md",
        },
      },
      {
        ru: {
          name: "Наталия Попа",
          role: "Главный бухгалтер",
          phone: "+373 69 007 937",
          email: "contabil@neocar.md",
        },
        ro: {
          name: "Natalia Popa",
          role: "Contabil-șef",
          phone: "+373 69 007 937",
          email: "contabil@neocar.md",
        },
        en: {
          name: "Natalia Popa",
          role: "Chief accountant",
          phone: "+373 69 007 937",
          email: "contabil@neocar.md",
        },
      },
    ] as ContactPerson[],
  },
];
