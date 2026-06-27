import { Space_Grotesk, Manrope, Cairo, Tajawal } from "next/font/google";

// Self-hosted via next/font — no external requests, no layout shift.
// Latin pairing: Space Grotesk (display) + Manrope (body).
// Arabic pairing: Cairo (display) + Tajawal (body).

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const fontVariables = [
  spaceGrotesk.variable,
  manrope.variable,
  cairo.variable,
  tajawal.variable,
].join(" ");
