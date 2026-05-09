import type { TriLocale } from "./types";

export type TeamMemberRow = TriLocale<{
  name: string;
  role: string;
  phone: string;
  email: string;
}>;

export const teamMembers = [
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
  {
    ru: {
      name: "Дорган Сергей",
      role: "Менеджер запчастей",
      phone: "+373 69 88 22 88",
      email: "info@neocar.md",
    },
    ro: {
      name: "Serghei Dorgan",
      role: "Manager piese",
      phone: "+373 69 88 22 88",
      email: "info@neocar.md",
    },
    en: {
      name: "Serghei Dorgan",
      role: "Parts manager",
      phone: "+373 69 88 22 88",
      email: "info@neocar.md",
    },
  },
  {
    ru: {
      name: "Козмик Марин",
      role: "Менеджер запчастей",
      phone: "+373 69 88 11 86",
      email: "info@neocar.md",
    },
    ro: {
      name: "Marin Cozmic",
      role: "Manager piese",
      phone: "+373 69 88 11 86",
      email: "info@neocar.md",
    },
    en: {
      name: "Marin Cozmic",
      role: "Parts manager",
      phone: "+373 69 88 11 86",
      email: "info@neocar.md",
    },
  },
  {
    ru: {
      name: "Мунтян Андрей",
      role: "Менеджер сервиса",
      phone: "+373 68 44 11 44",
      email: "info@neocar.md",
    },
    ro: {
      name: "Andrei Munțean",
      role: "Manager service",
      phone: "+373 68 44 11 44",
      email: "info@neocar.md",
    },
    en: {
      name: "Andrei Munțean",
      role: "Service manager",
      phone: "+373 68 44 11 44",
      email: "info@neocar.md",
    },
  },
  {
    ru: {
      name: "Мунтяну Леонид",
      role: "Менеджер сервиса",
      phone: "+373 62 111 444",
      email: "info@neocar.md",
    },
    ro: {
      name: "Leonid Munțeanu",
      role: "Manager service",
      phone: "+373 62 111 444",
      email: "info@neocar.md",
    },
    en: {
      name: "Leonid Munțeanu",
      role: "Service manager",
      phone: "+373 62 111 444",
      email: "info@neocar.md",
    },
  },
] as TeamMemberRow[];

export const teamGroups = [
  { titleKey: "sales" as const, slice: [0, 2] as const },
  { titleKey: "parts" as const, slice: [2, 4] as const },
  { titleKey: "service" as const, slice: [4, 6] as const },
] as const;
