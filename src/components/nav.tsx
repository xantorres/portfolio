"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AvailabilityPill } from "@/components/availability-pill";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.08em]"
        >
          <span className="inline-block h-5 w-px bg-signal" aria-hidden />
          {profile.name.toUpperCase()}
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-signal"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AvailabilityPill className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "overflow-hidden border-t border-border transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="flex flex-col divide-y divide-border/60" aria-label="Mobile">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground hover:text-signal"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
