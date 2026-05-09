import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ru", "ro", "en"] as const;
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${SITE_ORIGIN}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === "ru" ? 1 : 0.9,
  }));
}
