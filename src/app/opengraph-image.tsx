import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.companyName} — one fixed fare, no surge, across Greater Manchester`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamically generated social-share image (Open Graph / Twitter card).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #13100e 0%, #1d1916 100%)",
          color: "#f6f1e9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* The Apex Ride double-chevron mark. */}
          <svg viewBox="0 0 100 100" width={76} height={76} fill="none">
            <path d="M18 76 L50 44 L82 76" stroke="#FFB300" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 56 L50 24 L82 56" stroke="#F23A2F" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.brandName}</div>
            <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: 8, color: "#ffc23a" }}>RIDE</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 80, fontWeight: 700, letterSpacing: -2, lineHeight: 1.04, maxWidth: 980 }}>
            <span>One fixed fare.&nbsp;</span>
            <span style={{ color: "#ff4b3e" }}>No surge. Ever.</span>
          </div>
          <div style={{ fontSize: 30, color: "#a79e91", maxWidth: 820 }}>
            Premium private hire across Greater Manchester.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#a79e91" }}>
          <div style={{ display: "flex" }}>{siteConfig.companyName}</div>
          <div style={{ display: "flex", color: "#ffc23a" }}>4.9 / 5 rating — available 24/7</div>
        </div>
      </div>
    ),
    size,
  );
}
