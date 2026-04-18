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
          fontFamily: "system-ui, sans-serif",
          background: "#0a0a0b",
          color: "#edeae4",
        }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>
          Unrecoverable error
        </p>
        <h1 style={{ fontSize: 40, fontWeight: 900, margin: 0 }}>Something went sideways.</h1>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: 8,
            padding: "0.5rem 1rem",
            borderRadius: 6,
            border: "1px solid #333",
            background: "#edeae4",
            color: "#0a0a0b",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
