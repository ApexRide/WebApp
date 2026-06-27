import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { pageHref } from "@/lib/routes";

export default function NotFound() {
  return (
    <section
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "clamp(64px,12vw,140px) clamp(12px,3vw,20px)",
        textAlign: "center",
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(64px,12vw,120px)", color: "var(--accent)", letterSpacing: "-.04em", lineHeight: 1 }}>404</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px,4vw,38px)", margin: "12px 0 0" }}>This page took a wrong turn.</h1>
      <p style={{ color: "var(--ink2)", fontSize: "17px", lineHeight: 1.5, margin: "14px 0 28px" }}>
        The page you’re looking for doesn’t exist or has moved. Let’s get you back on the road.
      </p>
      <Link
        href={pageHref(defaultLocale, "home")}
        className="vc-lift"
        style={{ display: "inline-block", textDecoration: "none", background: "var(--accent)", color: "var(--on-accent)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", padding: "14px 26px", borderRadius: "13px", boxShadow: "0 14px 30px -12px var(--accent)" }}
      >
        Back to home
      </Link>
    </section>
  );
}
