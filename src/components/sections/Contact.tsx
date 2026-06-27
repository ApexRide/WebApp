"use client";

import { useRef, useState } from "react";
import { useApp } from "@/components/providers";
import { Toast } from "@/components/Toast";
import { ImageSlot } from "@/components/ImageSlot";
import { siteConfig, fullAddress } from "@/config/site";
import { toArabicDigits } from "@/lib/fare";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  color: "var(--ink2)",
  textTransform: "uppercase",
  letterSpacing: ".05em",
  marginBottom: "6px",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  border: "1px solid var(--line)",
  background: "var(--surface2)",
  color: "var(--ink)",
  borderRadius: "12px",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
};

export function Contact() {
  const { dict, isRtl } = useApp();
  const t = dict.contact;
  const c = siteConfig.contact;
  const phone = isRtl ? toArabicDigits(c.phone) : c.phone;

  const [sent, setSent] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const methods = [
    { label: t.phoneLabel, value: phone, href: `tel:${c.phone.replace(/\s+/g, "")}` },
    { label: t.emailLabel, value: c.email, href: `mailto:${c.email}` },
    { label: t.officeLabel, value: fullAddress(), href: undefined },
    { label: t.hoursLabel, value: t.hours, href: undefined },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSent(false), 3500);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(48px,7vw,90px) clamp(12px,3vw,20px) clamp(40px,6vw,70px)" }}>
      <div style={{ maxWidth: "38em" }}>
        <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: ".12em" }}>{t.kicker}</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,4.2vw,48px)", letterSpacing: "-.03em", margin: "10px 0 0", lineHeight: 1.05 }}>{t.title}</h1>
        <p style={{ color: "var(--ink2)", fontSize: "17px", lineHeight: 1.5, margin: "14px 0 0" }}>{t.sub}</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(22px,3vw,40px)", marginTop: "36px", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 320px", minWidth: "280px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {methods.map((m, i) => {
            const inner = (
              <>
                <span style={{ width: "42px", height: "42px", borderRadius: "12px", background: "color-mix(in oklab, var(--accent) 12%, var(--surface))", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <span aria-hidden="true" style={{ width: "11px", height: "11px", borderRadius: "3px", background: "var(--accent)", transform: "rotate(45deg)" }} />
                </span>
                <span>
                  <span style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--ink2)", textTransform: "uppercase", letterSpacing: ".05em" }}>{m.label}</span>
                  <span style={{ display: "block", fontWeight: 700, fontSize: "16px", color: "var(--ink)", marginTop: "2px" }}>{m.value}</span>
                </span>
              </>
            );
            const baseStyle: React.CSSProperties = { display: "flex", gap: "14px", alignItems: "center", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "16px", padding: "16px 18px", textDecoration: "none", color: "inherit" };
            return m.href ? (
              <a key={i} href={m.href} className="vc-lift-sm" style={baseStyle}>{inner}</a>
            ) : (
              <div key={i} style={baseStyle}>{inner}</div>
            );
          })}
          <div style={{ position: "relative", borderRadius: "18px", overflow: "hidden", boxShadow: "0 24px 50px -30px var(--shadow)", marginTop: "4px" }}>
            <ImageSlot hint="Office map" style={{ width: "100%", height: "200px" }} />
          </div>
        </div>

        <form onSubmit={onSubmit} style={{ flex: "1 1 360px", minWidth: "280px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "22px", padding: "clamp(22px,3vw,30px)", boxShadow: "0 30px 60px -34px var(--shadow)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", letterSpacing: "-.01em" }}>{t.formTitle}</div>
          <label style={{ display: "block", marginTop: "18px" }}>
            <span style={labelStyle}>{t.name}</span>
            <input type="text" name="name" required autoComplete="name" placeholder={t.namePh} style={fieldStyle} />
          </label>
          <label style={{ display: "block", marginTop: "14px" }}>
            <span style={labelStyle}>{t.emailLabel}</span>
            <input type="email" name="email" required autoComplete="email" placeholder={t.emailPh} style={fieldStyle} />
          </label>
          <label style={{ display: "block", marginTop: "14px" }}>
            <span style={labelStyle}>{t.msg}</span>
            <textarea name="message" rows={4} required placeholder={t.msgPh} style={{ ...fieldStyle, resize: "vertical" }} />
          </label>
          <button type="submit" className="vc-lift" style={{ width: "100%", border: "none", background: "var(--accent)", color: "var(--on-accent)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", padding: "15px", borderRadius: "13px", cursor: "pointer", marginTop: "18px", boxShadow: "0 14px 30px -12px var(--accent)" }}>{t.send}</button>
        </form>
      </div>

      <Toast show={sent} message={t.sent} />
    </section>
  );
}
