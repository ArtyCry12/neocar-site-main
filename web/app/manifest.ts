import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEOCAR — Погрузчики в Молдове",
    short_name: "NEOCAR",
    description:
      "Продажа, аренда и сервис погрузчиков в Молдове с 2004 года",
    start_url: "/ru",
    display: "standalone",
    background_color: "#050506",
    theme_color: "#E29303",
    icons: [
      {
        src: "/media/neocar-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/media/neocar-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
