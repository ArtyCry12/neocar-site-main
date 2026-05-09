import { SITE_ORIGIN } from "@/lib/site";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "NEOCAR SRL",
    image: `${SITE_ORIGIN}/media/neocar-logo.png`,
    url: SITE_ORIGIN,
    telephone: "+373-22-479-545",
    address: {
      "@type": "PostalAddress",
      streetAddress: "str. Voluntarilor 3",
      addressLocality: "Chișinău",
      postalCode: "MD-2037",
      addressCountry: "MD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.0245,
      longitude: 28.8325,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
  } as const;
}
