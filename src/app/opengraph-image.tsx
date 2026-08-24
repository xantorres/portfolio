import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { currentQuarter, getSubhead, profile } from "@/lib/data";

export const alt = `${profile.name} · ${profile.tagline} ${profile.accentWord}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Daily ISR so the availability quarter baked into the image stays current, matching page.tsx.
export const revalidate = 86_400;

// Server-side font loading from @fontsource/archivo.
// vercel/og accepts ttf/otf/woff; we ship the WOFF static weights.
async function loadArchivo(weight: 400 | 500 | 600): Promise<ArrayBuffer> {
  const file = path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "archivo",
    "files",
    `archivo-latin-${weight}-normal.woff`,
  );
  const buf = await readFile(file);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

const CANVAS = "#0A0A0A";
const INK = "#FFFFFF";
const SIGNAL = "#F2703F";
const INK_SECONDARY = "rgb(255 255 255 / 56%)";
const INK_TERTIARY = "rgb(255 255 255 / 48%)";

export default async function OpengraphImage() {
  const [regular, medium, semibold] = await Promise.all([
    loadArchivo(400),
    loadArchivo(500),
    loadArchivo(600),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: CANVAS,
          color: INK,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ fontSize: 22, color: INK_TERTIARY, display: "flex", fontWeight: 500 }}>
          {profile.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.022em",
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {profile.tagline}&nbsp;
            <span style={{ color: SIGNAL }}>{profile.accentWord}</span>.
          </div>
          <div
            style={{
              fontSize: 27,
              color: INK_SECONDARY,
              maxWidth: 940,
              display: "flex",
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {getSubhead()}
          </div>
        </div>

        <div
          style={{
            fontSize: 20,
            color: INK_TERTIARY,
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 500,
          }}
        >
          <span>Toptal Verified Expert since 2017</span>
          <span>
            {profile.availability.short} · {currentQuarter()}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: medium, weight: 500, style: "normal" },
        { name: "Archivo", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
