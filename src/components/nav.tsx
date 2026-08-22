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
      <div className="container-editorial flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks
            .filter((l) => l.href !== "/#contact")
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          <Button asChild size="sm" variant="outline">
            <Link href="/#contact">Contact</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-3">
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
        <nav className="container-editorial flex flex-col py-2" aria-label="Mobile">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="-mx-2 rounded-[var(--radius-sm)] px-2 py-3 text-base text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
