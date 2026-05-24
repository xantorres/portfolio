import { ImageResponse } from "next/og";
import { currentQuarter, getSubhead, profile } from "@/lib/data";

export const alt = `${profile.name} · Senior Frontend Engineer & Product Architect`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: "#070B0F",
          color: "#EEE7DB",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#293139 1px, transparent 1px), linear-gradient(90deg, #293139 1px, transparent 1px)",
            backgroundSize: "96px 96px",
            opacity: 0.22,
          }}
        />
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#61AFDA",
            display: "flex",
          }}
        >
          {profile.name.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
            fontSize: 112,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "0",
              maxWidth: 1050,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Senior Frontend Engineer &amp;&nbsp;<span style={{ color: "#61AFDA" }}>Product Architect</span>.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#939CA6",
              maxWidth: 960,
              display: "flex",
            }}
          >
            {getSubhead()}
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#939CA6",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{profile.location}</span>
          <span>{profile.availability.short} · {currentQuarter()}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
