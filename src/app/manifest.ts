import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.companyName} — instant fixed-price taxis`,
    short_name: siteConfig.companyName,
    description: "Licensed UK private hire with transparent, fixed fares.",
    start_url: `/${siteConfig.defaults.lang}`,
    display: "standalone",
    background_color: "#13100e",
    theme_color: "#f23a2f",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
