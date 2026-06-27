// ============================================================================
//  Site configuration — sourced from environment variables.
//
//  Every value a non-developer is likely to change (company name, contact
//  details, fares, social links) is read from NEXT_PUBLIC_* env vars with a
//  sensible fallback. Edit `.env.local` to change them; no code edits needed.
//
//  Because NEXT_PUBLIC_* vars are inlined at build time, this single module is
//  safe to import from both server and client components.
// ============================================================================

// NOTE: always reference `process.env.NEXT_PUBLIC_*` as a full static
// expression below. Next.js inlines those literals into the client bundle at
// build time; aliasing (e.g. `const env = process.env`) defeats the inlining
// and leaves a bare `process` reference that throws in the browser.

/** Read a string env var, trimming and falling back when unset/empty. */
function str(value: string | undefined, fallback: string): string {
  const v = (value ?? "").trim();
  return v.length > 0 ? v : fallback;
}

/** Read a numeric env var with a fallback. */
function num(value: string | undefined, fallback: number): number {
  const n = Number((value ?? "").trim());
  return Number.isFinite(n) ? n : fallback;
}

/** Read a boolean env var ("true"/"1" → true). */
function bool(value: string | undefined, fallback: boolean): boolean {
  const v = (value ?? "").trim().toLowerCase();
  if (v === "") return fallback;
  return v === "true" || v === "1" || v === "yes";
}

export type ThemePreference = "system" | "light" | "dark";

export interface FareTier {
  id: "saloon" | "estate" | "mpv" | "executive";
  base: number;
  perMile: number;
  seats: number;
}

const rawSiteUrl = str(process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000");
// Normalise: no trailing slash, so we can safely concatenate paths.
const siteUrl = rawSiteUrl.replace(/\/+$/, "");

export const siteConfig = {
  url: siteUrl,

  brandName: str(process.env.NEXT_PUBLIC_BRAND_NAME, "APEX"),
  companyName: str(process.env.NEXT_PUBLIC_COMPANY_NAME, "Apex Ride"),
  legalName: str(process.env.NEXT_PUBLIC_LEGAL_NAME, "Apex Ride Ltd"),
  foundingYear: num(process.env.NEXT_PUBLIC_FOUNDING_YEAR, 2016),

  contact: {
    phone: str(process.env.NEXT_PUBLIC_CONTACT_PHONE, "0800 123 4567"),
    email: str(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "ride@apexride.co.uk"),
    address: str(
      process.env.NEXT_PUBLIC_OFFICE_ADDRESS,
      "Apex House, 12 Whitworth Street",
    ),
    city: str(process.env.NEXT_PUBLIC_OFFICE_CITY, "Manchester"),
    postcode: str(process.env.NEXT_PUBLIC_OFFICE_POSTCODE, "M1 3AL"),
    country: str(process.env.NEXT_PUBLIC_OFFICE_COUNTRY, "GB"),
    lat: num(process.env.NEXT_PUBLIC_OFFICE_LAT, 53.4763),
    lng: num(process.env.NEXT_PUBLIC_OFFICE_LNG, -2.236),
  },

  social: {
    twitter: str(process.env.NEXT_PUBLIC_SOCIAL_TWITTER, ""),
    facebook: str(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK, ""),
    instagram: str(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM, ""),
    twitterHandle: str(process.env.NEXT_PUBLIC_TWITTER_HANDLE, ""),
  },

  defaults: {
    theme: str(process.env.NEXT_PUBLIC_DEFAULT_THEME, "system") as ThemePreference,
    lang: str(process.env.NEXT_PUBLIC_DEFAULT_LANG, "en"),
    showCityMarquee: bool(process.env.NEXT_PUBLIC_SHOW_CITY_MARQUEE, true),
  },

  currency: {
    code: str(process.env.NEXT_PUBLIC_CURRENCY, "GBP"),
    symbol: str(process.env.NEXT_PUBLIC_CURRENCY_SYMBOL, "£"),
  },

  fares: {
    tiers: [
      {
        id: "saloon",
        base: num(process.env.NEXT_PUBLIC_RATE_SALOON_BASE, 3.2),
        perMile: num(process.env.NEXT_PUBLIC_RATE_SALOON_PER_MILE, 1.75),
        seats: num(process.env.NEXT_PUBLIC_RATE_SALOON_SEATS, 4),
      },
      {
        id: "estate",
        base: num(process.env.NEXT_PUBLIC_RATE_ESTATE_BASE, 3.8),
        perMile: num(process.env.NEXT_PUBLIC_RATE_ESTATE_PER_MILE, 2.05),
        seats: num(process.env.NEXT_PUBLIC_RATE_ESTATE_SEATS, 4),
      },
      {
        id: "mpv",
        base: num(process.env.NEXT_PUBLIC_RATE_MPV_BASE, 4.6),
        perMile: num(process.env.NEXT_PUBLIC_RATE_MPV_PER_MILE, 2.45),
        seats: num(process.env.NEXT_PUBLIC_RATE_MPV_SEATS, 6),
      },
      {
        id: "executive",
        base: num(process.env.NEXT_PUBLIC_RATE_EXECUTIVE_BASE, 6.5),
        perMile: num(process.env.NEXT_PUBLIC_RATE_EXECUTIVE_PER_MILE, 3.2),
        seats: num(process.env.NEXT_PUBLIC_RATE_EXECUTIVE_SEATS, 4),
      },
    ] as FareTier[],
    roadFactor: num(process.env.NEXT_PUBLIC_ROAD_FACTOR, 1.18),
    avgSpeedMph: num(process.env.NEXT_PUBLIC_AVG_SPEED_MPH, 52),
  },
};

export type SiteConfig = typeof siteConfig;

/** Full single-line postal address, handy for structured data and footers. */
export function fullAddress(): string {
  const c = siteConfig.contact;
  return `${c.address}, ${c.city} ${c.postcode}`;
}
