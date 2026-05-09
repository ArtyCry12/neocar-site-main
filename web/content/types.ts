export type Locale = "ru" | "ro" | "en";

export type TriLocale<T> = Record<Locale, T>;

export function pickLocale<T>(locale: string, row: TriLocale<T>): T {
  if (locale === "ro" || locale === "en") return row[locale];
  return row.ru;
}
