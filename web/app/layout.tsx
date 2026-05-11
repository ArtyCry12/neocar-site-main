import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";

import { routing } from "@/i18n/routing";
import { SITE_ORIGIN } from "@/lib/site";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={routing.defaultLocale}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${GeistMono.variable} relative h-full`}
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
