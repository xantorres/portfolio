"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          fontFamily: "'Spline Sans', sans-serif",
          background: "#070B0F",
          color: "#EEE7DB",
        }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.72 }}>
          Unrecoverable error
        </p>
        <h1 style={{ fontSize: 44, fontWeight: 700, lineHeight: 1, margin: 0 }}>Something went sideways.</h1>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: 8,
            padding: "0.5rem 1rem",
            borderRadius: 4,
            border: "1px solid #293139",
            background: "#EEE7DB",
            color: "#070B0F",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
