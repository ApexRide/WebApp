import { siteConfig } from "@/config/site";

/**
 * The Apex Ride mark — a double chevron ("the racing line through a corner,
 * climbing to an apex"). Two strokes: amber outer, red inner. The mark is
 * two-colour and background-independent, so it reads on both the light (cream)
 * and dark (near-black) themes without modification.
 *
 * From the Apex Ride brand kit. viewBox is 0 0 100 100.
 */
export function ApexMark({
  size = 32,
  amber = "#FFB300",
  red = "#F23A2F",
  strokeWidth = 13,
}: {
  size?: number;
  amber?: string;
  red?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M18 76 L50 44 L82 76" stroke={amber} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 56 L50 24 L82 56" stroke={red} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Horizontal logo lockup: the chevron mark beside the "APEX / RIDE" wordmark.
 * The primary brand text comes from siteConfig (env-driven). The descriptor
 * line ("RIDE") is derived from the company name's second word when present.
 */
export function Logo({ size = 34, fontSize = 22 }: { size?: number; fontSize?: number }) {
  const words = siteConfig.companyName.trim().split(/\s+/);
  const descriptor = (words[1] ?? "").toUpperCase();

  return (
    <span style={{ display: "flex", alignItems: "center", gap: "11px" }}>
      <ApexMark size={size} />
      <span style={{ display: "flex", flexDirection: "column", gap: "2px", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize,
            letterSpacing: "-.02em",
            color: "var(--ink)",
            lineHeight: 0.9,
          }}
        >
          {siteConfig.brandName}
        </span>
        {descriptor && (
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: Math.max(9, Math.round(fontSize * 0.32)),
              letterSpacing: ".42em",
              color: "var(--accent)",
              paddingInlineStart: "2px",
            }}
          >
            {descriptor}
          </span>
        )}
      </span>
    </span>
  );
}
