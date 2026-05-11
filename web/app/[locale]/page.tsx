import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SITE_ORIGIN } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/seo";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import DockNav from "@/components/layout/DockNav";
import Footer from "@/components/layout/Footer";
import SiteHeader from "@/components/layout/SiteHeader";
import HomeHero from "@/components/hero/HomeHero";
import AboutSection from "@/components/sections/AboutSection";
import CatalogSection from "@/components/sections/CatalogSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroPhotoMarqueeSection from "@/components/sections/HeroPhotoMarqueeSection";
import ImageAutoSliderSection from "@/components/sections/ImageAutoSliderSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhySection from "@/components/sections/WhySection";

type Props = {
  params: Promise<{ locale: string }>;
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NEOCAR SRL",
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/media/neocar-logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "str. Voluntarilor 3",
    addressLocality: "Chișinău",
    postalCode: "MD-2037",
    addressCountry: "MD",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+373-22-479-545",
      contactType: "customer service",
      email: "info@neocar.md",
      areaServed: "MD",
      availableLanguage: ["Russian", "Romanian", "English"],
    },
  ],
} as const;

const localBusinessLd = localBusinessJsonLd();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const ogLocale =
    locale === "ru" ? "ru_MD" : locale === "ro" ? "ro_MD" : "en_US";

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(SITE_ORIGIN),
    alternates: {
      canonical: `${SITE_ORIGIN}/${locale}`,
      languages: {
        ru: `${SITE_ORIGIN}/ru`,
        ro: `${SITE_ORIGIN}/ro`,
        en: `${SITE_ORIGIN}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_ORIGIN}/${locale}`,
      siteName: "NEOCAR",
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: `${SITE_ORIGIN}/media/hero/marquee-1.jpg`,
          width: 1600,
          height: 900,
          alt: "NEOCAR",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_ORIGIN}/media/hero/marquee-1.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <Script
        id="localbusiness-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessLd),
        }}
      />
      <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
        <SiteHeader />
        <AnnouncementBanner />
        <HomeHero />
        <HeroPhotoMarqueeSection />
        <AboutSection />
        <CatalogSection />
        <ServicesSection />
        <ImageAutoSliderSection />
        <WhySection />
        <ComparisonSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <DockNav />
      </div>
    </>
  );
}
