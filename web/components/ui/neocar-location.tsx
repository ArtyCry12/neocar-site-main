"use client";

import React, { useState } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { useTranslations } from "next-intl";

import Globe from "@/components/ui/globe";

interface NeocarLocationProps {
  className?: string;
}

const NEOCAR_COORDS = { lat: 47.0245, lng: 28.8325 };

export default function NeocarLocation({ className = "" }: NeocarLocationProps) {
  const [showMap, setShowMap] = useState(false);
  const t = useTranslations("Location");
  const tc = useTranslations("Contact");

  const encodedAddress = encodeURIComponent(tc("address"));

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  const googleMapsViewUrl = `https://www.google.com/maps/search/?api=1&query=${NEOCAR_COORDS.lat},${NEOCAR_COORDS.lng}`;

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${NEOCAR_COORDS.lat},${NEOCAR_COORDS.lng}`;

  const googleMapsStaticHref = `https://maps.google.com/?q=${NEOCAR_COORDS.lat},${NEOCAR_COORDS.lng}`;

  return (
    <div className={`relative w-full ${className}`}>
      <noscript>
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 text-sm text-white/75 backdrop-blur-md">
          <p className="font-semibold text-white">{tc("companyLegalName")}</p>
          <p className="mt-2">{tc("address")}</p>
          <a
            href={googleMapsStaticHref}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-white/90"
          >
            {t("googleMapsBtn")}
          </a>
        </div>
      </noscript>
      <div
        className={`transition-all duration-1000 ease-in-out ${
          showMap
            ? "pointer-events-none absolute inset-0 scale-95 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        <button
          type="button"
          className="group block w-full cursor-pointer text-left"
          onClick={() => setShowMap(true)}
          aria-label={t("openMapAria")}
        >
          <Globe />
          <p className="-mt-8 pb-4 text-center text-sm text-white/70 transition-colors group-hover:text-white">
            {t("globeHint")}
          </p>
        </button>
      </div>

      <div
        className={`transition-all duration-1000 ease-in-out ${
          showMap
            ? "relative scale-100 opacity-100"
            : "pointer-events-none absolute inset-0 scale-105 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-md">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapIframeTitle")}
            />
          </div>

          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full bg-accent-burnt p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{tc("companyLegalName")}</h3>
                <p className="mt-1 text-white/70">{tc("address")}</p>
                <div className="mt-2 space-y-1 text-sm text-white/45">
                  <div>{tc("phoneOffice")}</div>
                  <div>{tc("phoneMobile")}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={googleMapsViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-gray-900 transition-colors hover:bg-white/90"
              >
                <ExternalLink className="h-4 w-4" />
                {t("googleMapsBtn")}
              </a>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-500"
              >
                <Navigation className="h-4 w-4" />
                {t("routeBtn")}
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMap(false)}
            className="text-sm text-white/40 transition-colors hover:text-white/70"
          >
            {t("backToGlobe")}
          </button>
        </div>
      </div>
    </div>
  );
}
