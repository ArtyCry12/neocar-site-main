"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const tc = useTranslations("Contact");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-accent-burnt/20 bg-gradient-to-b from-[#0a0a0a] via-[#1A1A1A] to-[#0a0a0a] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:justify-between md:px-8">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="shrink-0 overflow-hidden rounded-xl"
              style={{ position: "relative", width: 40, height: 40 }}
            >
              <Image
                src="/media/neocar-logo.png"
                alt="NEOCAR"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div>
              <div className="text-lg font-semibold">NEOCAR</div>
              <div className="text-xs uppercase tracking-[0.22em] text-white/55">
                {t("brandSubtitle")}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{t("tagline")}</p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-8 text-sm md:grid-cols-3">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/45">
              {t("contacts")}
            </div>
            <address className="not-italic">
              <ul className="space-y-2 text-white/70">
                <li>
                  <a className="hover:text-white" href={`mailto:${tc("email")}`}>
                    {tc("email")}
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white"
                    href={`tel:${tc("phoneOffice").replace(/\s+/g, "")}`}
                  >
                    {tc("phoneOffice")}
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white"
                    href={`tel:${tc("phoneMobile").replace(/\s+/g, "")}`}
                  >
                    {tc("phoneMobile")}
                  </a>
                </li>
              </ul>
            </address>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/45">
              {t("services")}
            </div>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => scrollTo("services")}
                >
                  {t("navServices")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => scrollTo("catalog")}
                >
                  {t("navCatalog")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="hover:text-white"
                  onClick={() => scrollTo("contact")}
                >
                  {t("navContact")}
                </button>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/45">
              {t("legal")}
            </div>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link className="hover:text-white" href="/privacy">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/terms">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/cookies">
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-xs text-white/50 md:flex-row md:items-center md:justify-between md:px-8 md:text-left">
          <span>
            © {new Date().getFullYear()} {tc("companyLegalName")} · {t("rights")}
          </span>
          <a
            href={`https://${tc("site")}`}
            className="hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tc("site")}
          </a>
        </div>
      </div>
    </footer>
  );
}
