import { siteConfig, type FareTier } from "@/config/site";
import type { City } from "@/lib/cities";

// Great-circle distance (miles) between two coordinates, scaled by the
// road-distance factor so the estimate approximates real driving distance.
export function roadMiles(a: City, b: City): number {
  const R = 3958.8; // Earth radius in miles
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  const straight = 2 * R * Math.asin(Math.sqrt(h));
  return straight * siteConfig.fares.roadFactor;
}

/** Fare for a tier over a given distance: base + perMile * miles. */
export function tierFare(tier: FareTier, miles: number): number {
  return tier.base + tier.perMile * miles;
}

/** Estimated journey time in minutes, rounded to the nearest 5. */
export function etaMinutes(miles: number): number {
  const mins = (miles / siteConfig.fares.avgSpeedMph) * 60;
  return Math.round(mins / 5) * 5;
}

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

/** Convert Western digits to Arabic-Indic digits (for the `ar` locale). */
export function toArabicDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => arabicDigits[Number(d)]);
}
