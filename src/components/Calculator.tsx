"use client";

import { useMemo, useRef, useState } from "react";
import { useApp } from "@/components/providers";
import { Toast } from "@/components/Toast";
import { siteConfig } from "@/config/site";
import { cities, cityName, findCity } from "@/lib/cities";
import { roadMiles, tierFare, etaMinutes, toArabicDigits } from "@/lib/fare";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  color: "var(--ink2)",
  textTransform: "uppercase",
  letterSpacing: ".05em",
  marginBottom: "6px",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  appearance: "none",
  WebkitAppearance: "none",
  paddingBlock: "14px",
  paddingInline: "38px 40px",
  border: "1px solid var(--line)",
  background: "var(--surface2)",
  color: "var(--ink)",
  borderRadius: "13px",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
};

export function Calculator() {
  const { dict, isRtl, locale } = useApp();
  const t = dict.calc;
  const { tiers } = siteConfig.fares;
  const { symbol } = siteConfig.currency;

  const [from, setFrom] = useState("london");
  const [to, setTo] = useState("manchester");
  const [passengers, setPassengers] = useState(2);
  const [tier, setTier] = useState<string>("saloon");
  const [returnTrip, setReturnTrip] = useState(false);
  const [booked, setBooked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const dg = (s: string | number) => (isRtl ? toArabicDigits(s) : String(s));
  const money = (n: number) => symbol + dg(Math.round(n).toLocaleString("en-GB"));
  const money1 = (n: number) => symbol + dg(n.toFixed(2));

  const view = useMemo(() => {
    const fromCity = findCity(from)!;
    const toCity = findCity(to)!;
    const sameError = from === to;
    const oneWay = sameError ? 0 : roadMiles(fromCity, toCity);
    const dist = oneWay * (returnTrip ? 2 : 1);

    const tierCards = tiers.map((tr) => ({
      id: tr.id,
      name: dict.veh[tr.id],
      seatsLabel: `${dg(tr.seats)} ${t.seats}`,
      priceLabel: sameError ? "—" : money(tierFare(tr, dist)),
      isSelected: tier === tr.id,
    }));
    const selected = tierCards.find((c) => c.isSelected) ?? tierCards[0];

    const mins = sameError ? 0 : etaMinutes(dist);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const etaLabel = h > 0 ? `${dg(h)}${dict.unit.hr} ${dg(m)}${dict.unit.min}` : `${dg(m)} ${dict.unit.min}`;

    return {
      sameError,
      tierCards,
      fareLabel: selected.priceLabel,
      distLabel: `${dg(Math.round(dist))} ${dict.unit.mi}`,
      etaLabel,
      paxSummary: `${dg(passengers)} ${dict.unit.pax} · ${returnTrip ? t.returnW : t.oneWay}`,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, passengers, tier, returnTrip, isRtl, dict]);

  const book = () => {
    if (from === to) return;
    setBooked(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setBooked(false), 3500);
  };

  const clearBooked = () => setBooked(false);
  const swap = () => {
    setFrom(to);
    setTo(from);
    clearBooked();
  };

  return (
    <div id="estimate" style={{ flex: "1 1 400px", minWidth: "300px", maxWidth: "460px" }}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: "24px",
          boxShadow: "0 40px 80px -34px var(--shadow)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "var(--accent)",
            color: "var(--on-accent)",
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "19px" }}>{t.title}</div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "12px",
              fontWeight: 700,
              background: "rgba(255,255,255,.18)",
              padding: "5px 11px",
              borderRadius: "99px",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#fff" }} />
            {t.live}
          </span>
        </div>

        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Route */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ display: "block" }}>
              <span style={labelStyle}>{t.from}</span>
              <span style={{ position: "relative", display: "block" }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    insetInlineStart: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#1f9d57",
                    boxShadow: "0 0 0 3px color-mix(in oklab, #1f9d57 25%, transparent)",
                    pointerEvents: "none",
                  }}
                />
                <select
                  aria-label={t.from}
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    clearBooked();
                  }}
                  style={selectStyle}
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {cityName(c, locale)}
                    </option>
                  ))}
                </select>
                <span style={chevron} aria-hidden="true">▾</span>
              </span>
            </label>

            <label style={{ display: "block" }}>
              <span style={labelStyle}>{t.to}</span>
              <span style={{ position: "relative", display: "block" }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    insetInlineStart: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent) 25%, transparent)",
                    pointerEvents: "none",
                  }}
                />
                <select
                  aria-label={t.to}
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    clearBooked();
                  }}
                  style={selectStyle}
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {cityName(c, locale)}
                    </option>
                  ))}
                </select>
                <span style={chevron} aria-hidden="true">▾</span>
              </span>
            </label>

            <button
              onClick={swap}
              aria-label="Swap pickup and drop-off"
              className="vc-swap"
              style={{
                position: "absolute",
                insetInlineEnd: "48px",
                top: "calc(50% - 17px)",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--ink)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px -4px var(--shadow)",
                fontSize: "15px",
              }}
            >
              ⇅
            </button>
          </div>

          {/* Passengers + trip type */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 150px" }}>
              <span style={labelStyle}>{t.passengers}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid var(--line)",
                  background: "var(--surface2)",
                  borderRadius: "13px",
                  padding: "7px 10px",
                }}
              >
                <button
                  onClick={() => {
                    setPassengers((p) => Math.max(1, p - 1));
                    clearBooked();
                  }}
                  aria-label="Fewer passengers"
                  style={stepBtn}
                >
                  −
                </button>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", minWidth: "24px", textAlign: "center" }}>
                  {dg(passengers)}
                </span>
                <button
                  onClick={() => {
                    setPassengers((p) => Math.min(8, p + 1));
                    clearBooked();
                  }}
                  aria-label="More passengers"
                  style={stepBtn}
                >
                  +
                </button>
              </div>
            </div>
            <div style={{ flex: "1 1 150px" }}>
              <span style={labelStyle}>{t.returnLabel}</span>
              <button
                onClick={() => {
                  setReturnTrip((r) => !r);
                  clearBooked();
                }}
                aria-pressed={returnTrip}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  border: "1px solid var(--line)",
                  background: "var(--surface2)",
                  borderRadius: "13px",
                  padding: "11px 12px",
                  cursor: "pointer",
                  color: "var(--ink)",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "14px" }}>{returnTrip ? t.returnW : t.oneWay}</span>
                <span
                  style={{
                    position: "relative",
                    width: "46px",
                    height: "26px",
                    borderRadius: "99px",
                    border: "1px solid var(--line)",
                    background: "var(--bg2)",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: returnTrip ? "flex-end" : "flex-start",
                    flex: "none",
                  }}
                >
                  {returnTrip && (
                    <span style={{ position: "absolute", inset: 0, borderRadius: "99px", background: "var(--accent)" }} />
                  )}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,.35)",
                      display: "block",
                    }}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Vehicle tiers */}
          <div>
            <span style={labelStyle}>{t.vehicle}</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {view.tierCards.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setTier(v.id);
                    clearBooked();
                  }}
                  aria-pressed={v.isSelected}
                  className="vc-lift-sm"
                  style={{
                    position: "relative",
                    textAlign: "start",
                    border: "1px solid var(--line)",
                    background: "var(--surface2)",
                    borderRadius: "13px",
                    padding: "11px 12px",
                    cursor: "pointer",
                    color: "var(--ink)",
                  }}
                >
                  {v.isSelected && (
                    <>
                      <span style={{ position: "absolute", inset: 0, border: "2px solid var(--accent)", borderRadius: "13px", pointerEvents: "none" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: "9px",
                          insetInlineEnd: "9px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "var(--accent)",
                          color: "#fff",
                          fontSize: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ✓
                      </span>
                    </>
                  )}
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px" }}>{v.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--ink2)", fontWeight: 600, marginTop: "1px" }}>{v.seatsLabel}</div>
                  <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--accent)", marginTop: "7px" }}>{v.priceLabel}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Estimate */}
          <div
            style={{
              background: "color-mix(in oklab, var(--accent) 7%, var(--surface))",
              border: "1px solid color-mix(in oklab, var(--accent) 22%, var(--line))",
              borderRadius: "16px",
              padding: "16px 18px",
            }}
          >
            {view.sameError ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--accent)", fontWeight: 700, fontSize: "14px" }}>
                <span
                  aria-hidden="true"
                  style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}
                >
                  !
                </span>
                {t.samePlace}
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink2)", textTransform: "uppercase", letterSpacing: ".05em" }}>{t.estimate}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "46px", lineHeight: 1, letterSpacing: "-.03em", marginTop: "4px" }}>{view.fareLabel}</div>
                  <div style={{ fontSize: "12px", color: "var(--ink2)", fontWeight: 600, marginTop: "5px" }}>{view.paxSummary}</div>
                </div>
                <div style={{ display: "flex", gap: "18px", paddingBottom: "4px" }}>
                  <Metric label={t.distance} value={view.distLabel} />
                  <Metric label={t.eta} value={view.etaLabel} />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={book}
            style={{
              width: "100%",
              border: "none",
              background: "var(--accent)",
              color: "var(--on-accent)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "16px",
              padding: "15px",
              borderRadius: "14px",
              cursor: "pointer",
              boxShadow: "0 14px 30px -12px var(--accent)",
            }}
            className="vc-lift"
          >
            {t.book}
          </button>
        </div>
      </div>

      <Toast show={booked} message={t.booked} />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: "11px", color: "var(--ink2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", marginTop: "2px" }}>{value}</div>
    </div>
  );
}

const chevron: React.CSSProperties = {
  position: "absolute",
  insetInlineEnd: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "var(--ink2)",
  pointerEvents: "none",
  fontSize: "12px",
};

const stepBtn: React.CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "9px",
  border: "none",
  background: "var(--bg2)",
  color: "var(--ink)",
  fontSize: "20px",
  fontWeight: 700,
  cursor: "pointer",
  lineHeight: 1,
};
