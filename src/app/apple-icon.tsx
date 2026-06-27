import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Generated Apple touch icon — the brand mark on the dark brand background.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#13100e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* The Apex Ride double-chevron mark. */}
        <svg viewBox="0 0 100 100" width={118} height={118} fill="none">
          <path d="M18 74 L50 42 L82 74" stroke="#FFB300" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 54 L50 22 L82 54" stroke="#F23A2F" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
