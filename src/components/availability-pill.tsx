"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { currentQuarter, profile } from "@/lib/data";

// Renders "Available · Q2 2026" where the quarter is always the current one.
// The quarter fills in on client mount to avoid SSG/hydration mismatch at
// quarter boundaries — first paint shows just "Available".
export function AvailabilityPill({ className }: { className?: string }) {
  const [quarter, setQuarter] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client stamp of wall-clock quarter
    setQuarter(currentQuarter());
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-card px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground",
        className,
      )}
      title={`${profile.availability.long}${quarter ? ` · ${quarter}` : ""}`}
    >
      <span
        className="pulse-ring relative inline-block size-1.5 rounded-full bg-signal"
        aria-hidden
      />
      {profile.availability.short}
      {quarter && ` · ${quarter}`}
    </div>
  );
}
