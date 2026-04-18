import { ImageResponse } from "next/og";
import { currentQuarter, profile } from "@/lib/data";

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
          background: "#0a0a0b",
          color: "#edeae4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b6860",
            display: "flex",
          }}
        >
          {profile.name.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              maxWidth: 1050,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {profile.tagline}&nbsp;<span style={{ color: "#8fa8ff" }}>{profile.accentWord}</span>.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#b8b5ae",
              maxWidth: 960,
              display: "flex",
            }}
          >
            {profile.subhead}
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#6b6860",
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
