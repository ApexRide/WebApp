import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImageSlot } from "@/components/ImageSlot";

export function Reviews({ dict }: { dict: Dictionary }) {
  return (
    <section id="reviews" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(40px,6vw,70px) clamp(12px,3vw,20px)" }}>
      <div data-reveal>
        <SectionHeading kicker={dict.reviews.kicker} title={dict.reviews.title} />
      </div>
      <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", marginTop: "32px" }}>
        {dict.reviewItems.map((r, i) => (
          <figure key={i} style={{ margin: 0, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "20px", padding: "26px", display: "flex", flexDirection: "column" }}>
            <div aria-label="Rated 5 out of 5" style={{ display: "flex", gap: "3px", color: "var(--accent2)", fontSize: "16px" }}>
              {[0, 1, 2, 3, 4].map((s) => (
                <span key={s} aria-hidden="true">★</span>
              ))}
            </div>
            <blockquote style={{ margin: 0, fontSize: "16px", lineHeight: 1.55, marginTop: "14px", flex: 1, color: "var(--ink)", textWrap: "pretty" }}>{r.text}</blockquote>
            <figcaption style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "20px" }}>
              <ImageSlot hint={r.name} shape="circle" style={{ width: "46px", height: "46px", flex: "none" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px" }}>{r.name}</div>
                <div style={{ fontSize: "13px", color: "var(--ink2)", fontWeight: 600 }}>{r.city}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
