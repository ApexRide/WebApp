import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ImageSlot } from "@/components/ImageSlot";
import { cities, cityName } from "@/lib/cities";

export function Coverage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="coverage" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,7vw,90px) clamp(12px,3vw,20px) clamp(40px,6vw,70px)" }}>
      <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,52px)", alignItems: "center" }}>
        <div style={{ flex: "1 1 360px", minWidth: "280px" }}>
          <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: ".12em" }}>{dict.coverage.kicker}</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,4.2vw,48px)", letterSpacing: "-.03em", margin: "10px 0 0", lineHeight: 1.05 }}>{dict.coverage.title}</h1>
          <p style={{ color: "var(--ink2)", fontSize: "17px", lineHeight: 1.5, margin: "14px 0 0" }}>{dict.coverage.sub}</p>
          <div style={{ display: "flex", gap: "30px", marginTop: "24px" }}>
            {dict.coverageStats.map((cs, i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "32px", color: "var(--accent)", letterSpacing: "-.02em" }}>{cs.num}</div>
                <div style={{ fontSize: "13px", color: "var(--ink2)", fontWeight: 600, marginTop: "2px" }}>{cs.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "24px" }}>
            {cities.map((c) => (
              <span key={c.id} style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", background: "var(--surface)", border: "1px solid var(--line)", padding: "8px 14px", borderRadius: "99px" }}>{cityName(c, locale)}</span>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 360px", minWidth: "280px" }}>
          <div style={{ position: "relative", borderRadius: "22px", overflow: "hidden", boxShadow: "0 30px 60px -32px var(--shadow)" }}>
            <ImageSlot hint="UK coverage map" style={{ width: "100%", height: "clamp(280px,30vw,400px)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
