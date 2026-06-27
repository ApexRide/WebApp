import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.companyName} — instant fixed-price taxis across Britain`;
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
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#f23a2f",
              transform: "rotate(45deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 4, background: "#fff" }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.brandName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 980 }}>
            <span>Your fare,&nbsp;</span>
            <span style={{ color: "#ff4b3e" }}>estimated instantly.</span>
          </div>
          <div style={{ fontSize: 30, color: "#a79e91", maxWidth: 820 }}>
            Licensed UK private hire. Fixed prices, no surge, no surprises.
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
