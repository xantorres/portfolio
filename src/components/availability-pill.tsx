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
      className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground", className)}
      title={`${profile.availability.long}${suffix}`}
    >
      <span aria-hidden className="inline-block size-1.5 shrink-0 rounded-full bg-foreground" />
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
