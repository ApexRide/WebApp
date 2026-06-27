// ============================================================================
//  Site configuration.
//
//  All the business constants a non-developer is likely to change — brand
//  name, contact details, social links, fares — live in `site.json`. Edit that
//  file; no code changes needed. It is plain public marketing data, so it is
//  safe to import into both server and client components.
//
//  Environment variables are reserved for things that are environment-specific
//  or sensitive:
//    • NEXT_PUBLIC_SITE_URL — where this deployment is hosted. Overrides the
//      canonical `url` in site.json (e.g. for preview/staging deployments).
//    • Future secrets (API keys, booking-system tokens, analytics IDs) should
//      be added as env vars here too — NOT in site.json.
// ============================================================================

import data from "./site.json";

export type ThemePreference = "system" | "light" | "dark";

export interface FareTier {
  id: "saloon" | "estate" | "mpv" | "executive";
  base: number;
  perMile: number;
  seats: number;
}

interface SiteData {
  url: string;
  brand: { brandName: string; companyName: string; legalName: string; foundingYear: number };
  contact: {
    phone: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
    lat: number;
    lng: number;
  };
  social: { twitter: string; facebook: string; instagram: string; twitterHandle: string };
  defaults: { theme: ThemePreference; lang: string; showCityMarquee: boolean };
  currency: { code: string; symbol: string };
  fares: { tiers: FareTier[]; roadFactor: number; avgSpeedMph: number };
}

// JSON literals widen to `string`/`number`; assert the precise shape once here.
const config = data as unknown as SiteData;

// The site URL is the one environment-specific value: an env var (set per
// deployment) wins, otherwise we fall back to the canonical URL in site.json.
// Normalise away any trailing slash so paths concatenate cleanly.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || config.url).replace(/\/+$/, "");

export const siteConfig = {
  url: siteUrl,

  brandName: config.brand.brandName,
  companyName: config.brand.companyName,
  legalName: config.brand.legalName,
  foundingYear: config.brand.foundingYear,

  contact: { ...config.contact },
  social: { ...config.social },
  defaults: { ...config.defaults },
  currency: { ...config.currency },
  fares: {
    tiers: config.fares.tiers,
    roadFactor: config.fares.roadFactor,
    avgSpeedMph: config.fares.avgSpeedMph,
  },
};

export type SiteConfig = typeof siteConfig;

/** Full single-line postal address, handy for structured data and footers. */
export function fullAddress(): string {
  const c = siteConfig.contact;
  return `${c.address}, ${c.city} ${c.postcode}`;
}
