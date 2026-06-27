import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { toArabicDigits } from "@/lib/fare";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const phone = locale === "ar" ? toArabicDigits(siteConfig.contact.phone) : siteConfig.contact.phone;
  const year = new Date().getFullYear();
  const yearStr = locale === "ar" ? toArabicDigits(year) : String(year);
  const rights = `© ${yearStr} ${siteConfig.legalName}. ${dict.foot.rightsReserved}`;

  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
      <div className="vc-footer-grid" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(40px,5vw,60px) clamp(12px,3vw,20px) 28px", display: "grid", gap: "32px" }}>
        <div style={{ minWidth: "220px" }}>
          <Logo size={30} fontSize={21} />
          <p style={{ color: "var(--ink2)", fontSize: "14px", lineHeight: 1.55, margin: "14px 0 0", maxWidth: "26em" }}>{dict.foot.tagline}</p>
          <div style={{ marginTop: "18px", fontSize: "14px", lineHeight: 1.9 }}>
            <div style={{ color: "var(--ink2)", fontWeight: 600 }}>{dict.foot.callUs}</div>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "20px", color: "var(--ink)", textDecoration: "none" }}>{phone}</a>
            <div>
              <a href={`mailto:${siteConfig.contact.email}`} className="vc-link" style={{ color: "var(--ink2)", textDecoration: "none" }}>{siteConfig.contact.email}</a>
            </div>
          </div>
        </div>

        {dict.footCols.map((col, i) => (
          <nav key={i} aria-label={col.title}>
            <div style={{ fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ink2)", marginBottom: "14px" }}>{col.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.links.map((label, j) => (
                <a key={j} href="#top" className="vc-link" style={{ textDecoration: "none", color: "var(--ink)", fontSize: "14px", fontWeight: 600 }}>{label}</a>
              ))}
            </div>
          </nav>
        ))}
      </div>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "18px clamp(12px,3vw,20px) 40px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <div style={{ color: "var(--ink2)", fontSize: "13px", fontWeight: 600 }}>{rights}</div>
        <div style={{ color: "var(--ink2)", fontSize: "13px", fontWeight: 600 }}>{dict.foot.licence}</div>
      </div>
    </footer>
  );
}
