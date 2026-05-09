import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import LocaleSwitcher from "@/components/layout/LocaleSwitcher";

export default async function SiteHeader() {
  const t = await getTranslations("Header");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="shrink-0 overflow-hidden rounded-lg"
            style={{ position: "relative", width: 40, height: 40 }}
          >
            <Image
              src="/media/neocar-logo.png"
              alt="NEOCAR"
              fill
              className="object-contain"
              sizes="40px"
              priority
              loading="eager"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-white">
              NEOCAR
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
              {t("subtitle")}
            </div>
          </div>
        </Link>

        <LocaleSwitcher />
      </div>
    </header>
  );
}
