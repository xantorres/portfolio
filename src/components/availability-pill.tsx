"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { currentQuarter, profile } from "@/lib/data";

// Always returns the same no-op subscription; useSyncExternalStore is used purely
// to distinguish server snapshot ("") from the post-hydration client snapshot.
// This avoids a setState-in-effect pattern and keeps the SSR/hydration markup identical
// (the live quarter only appears after the React hydration commit).
const noopSubscribe = (): (() => void) => () => {};
const getClientQuarter = () => currentQuarter();
const getServerQuarter = () => "";

function useCurrentQuarter(): string {
  return useSyncExternalStore(noopSubscribe, getClientQuarter, getServerQuarter);
}

export function AvailabilityPill({ className }: { className?: string }) {
  const quarter = useCurrentQuarter();
  const suffix = quarter ? ` · ${quarter}` : "";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-border bg-card px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground",
        className,
      )}
      title={`${profile.availability.long}${suffix}`}
    >
      <span
        className="pulse-ring relative inline-block size-1.5 rounded-full bg-signal"
        aria-hidden
      />
      <span className="inline-flex items-baseline gap-[0.35em]">
        {profile.availability.short}
        {/* Reserve fixed width so the post-hydration quarter swap does not cause CLS. */}
        <span className="inline-block min-w-[5.25em] text-left" suppressHydrationWarning>
          {suffix}
        </span>
      </span>
    </div>
  );
}
