import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import { SITE_ORIGIN } from "@/lib/site";

export const runtime = "nodejs";

export const alt = "NEOCAR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("title");
  const subtitle = t("description").slice(0, 160);

  let logoSrc: ArrayBuffer | null = null;
  try {
    const res = await fetch(`${SITE_ORIGIN}/media/neocar-logo.png`);
    if (res.ok) logoSrc = await res.arrayBuffer();
  } catch {
    logoSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg,#09090b 0%,#3f0f1f 45%,#18181b 100%)",
          color: "#fafafa",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- OG ImageResponse JSX
            <img
              src={`data:image/png;base64,${Buffer.from(logoSrc).toString("base64")}`}
              alt=""
              width={88}
              height={88}
              style={{ borderRadius: 20, objectFit: "contain" }}
            />
          ) : (
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 20,
                background: "#dc2626",
              }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.05 }}>
              NEOCAR
            </div>
            <div style={{ fontSize: 22, color: "rgba(250,250,250,0.72)" }}>
              {locale.toUpperCase()}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 34,
            fontWeight: 600,
            maxWidth: 980,
            lineHeight: 1.25,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 22,
            color: "rgba(250,250,250,0.78)",
            maxWidth: 980,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...size },
  );
}
