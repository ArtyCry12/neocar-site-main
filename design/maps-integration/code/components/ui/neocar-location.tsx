"use client";

import React, { useState } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import Globe from "@/components/ui/globe";

interface NeocarLocationProps {
  className?: string;
}

const NEOCAR_COORDS = { lat: 47.0245, lng: 28.8325 };
const NEOCAR_ADDRESS = "str. Voluntarilor 3, MD-2037, Chișinău, Moldova";

const ENCODED_QUERY = encodeURIComponent(NEOCAR_ADDRESS);

const GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${ENCODED_QUERY}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

const GOOGLE_MAPS_VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${NEOCAR_COORDS.lat},${NEOCAR_COORDS.lng}`;

const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${NEOCAR_COORDS.lat},${NEOCAR_COORDS.lng}`;

const NeocarLocation: React.FC<NeocarLocationProps> = ({ className = "" }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`transition-all duration-1000 ease-in-out ${
          showMap
            ? "pointer-events-none absolute inset-0 scale-50 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        <div
          className="group cursor-pointer"
          onClick={() => setShowMap(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && setShowMap(true)
          }
          aria-label="Открыть карту с офисом NEOCAR"
        >
          <Globe />
          <div className="-mt-16 pb-8 text-center">
            <p className="text-sm text-white/70 transition-colors group-hover:text-white">
              Нажмите на глобус, чтобы открыть карту
            </p>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-1000 ease-in-out ${
          showMap
            ? "scale-100 opacity-100"
            : "pointer-events-none absolute inset-0 scale-150 opacity-0"
        }`}
      >
        <div className="flex min-h-[520px] flex-col items-center justify-center bg-gray-950 px-4 py-12">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NEOCAR — str. Voluntarilor 3, Chișinău"
            />
          </div>

          <div className="mt-6 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-full bg-red-600 p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">NEOCAR SRL</h2>
                <p className="mt-1 text-white/60">{NEOCAR_ADDRESS}</p>
                <p className="mt-2 text-sm text-white/40">
                  Офис: +373 22 479 545 · Моб.: +373 69 555 888
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={GOOGLE_MAPS_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-gray-900 transition-colors hover:bg-white/90"
              >
                <ExternalLink className="h-4 w-4" />
                Google Maps
              </a>
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-500"
              >
                <Navigation className="h-4 w-4" />
                Маршрут
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMap(false)}
            className="mt-4 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            ← Назад к глобусу
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeocarLocation;
