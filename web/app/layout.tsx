import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { SITE_ORIGIN } from "@/lib/site";

import "./globals.css";

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
      className="relative h-full"
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
