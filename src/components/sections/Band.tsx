import type { Dictionary } from "@/i18n/dictionaries";
import { ImageSlot } from "@/components/ImageSlot";

export function Band({ dict }: { dict: Dictionary }) {
  return (
    <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "14px clamp(12px,3vw,20px) 0" }}>
      <div data-reveal style={{ position: "relative", borderRadius: "26px", overflow: "hidden", boxShadow: "0 30px 70px -34px var(--shadow)" }}>
        <ImageSlot hint="Black cab on a UK street" style={{ width: "100%", height: "clamp(260px,38vw,420px)" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, color-mix(in oklab, #000 62%, transparent))", pointerEvents: "none" }} />
        <div style={{ position: "absolute", insetInlineStart: "clamp(20px,4vw,40px)", bottom: "clamp(20px,4vw,36px)", color: "#fff", maxWidth: "24em", pointerEvents: "none" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px,3.4vw,40px)", lineHeight: 1.05, letterSpacing: "-.02em" }}>{dict.band.title}</div>
          <div style={{ fontSize: "15px", opacity: 0.85, marginTop: "8px", fontWeight: 600 }}>{dict.band.sub}</div>
        </div>
      </div>
    </section>
  );
}
