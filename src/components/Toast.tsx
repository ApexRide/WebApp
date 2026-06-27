"use client";

export function Toast({ show, message }: { show: boolean; message: string }) {
  if (!show) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        insetInline: 0,
        bottom: "26px",
        display: "flex",
        justifyContent: "center",
        zIndex: 80,
        pointerEvents: "none",
        animation: "vc-fadeUp .4s ease both",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          background: "var(--ink)",
          color: "var(--bg)",
          fontWeight: 700,
          fontSize: "15px",
          padding: "14px 22px",
          borderRadius: "14px",
          boxShadow: "0 20px 50px -16px rgba(0,0,0,.5)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          maxWidth: "90vw",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#1f9d57",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          ✓
        </span>
        {message}
      </div>
    </div>
  );
}
