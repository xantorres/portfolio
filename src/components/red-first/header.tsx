"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ctaHref } from "@/lib/red-first";
import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

interface RedFirstHeaderProps {
  sectionBase?: string;
}

export function RedFirstHeader({ sectionBase = "" }: RedFirstHeaderProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container-editorial flex h-16 items-center justify-between gap-4">
        <a
          href={sectionBase || "#top"}
          onClick={() => setOpen(false)}
          className="text-[0.9375rem] font-semibold tracking-[-0.01em]"
        >
          Red First
        </a>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Sections">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`${sectionBase}${item.href}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" variant="outline">
            <a href={ctaHref}>Book a call</a>
          </Button>
          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="red-first-mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </Button>
        </div>
      </div>

      <div
        id="red-first-mobile-nav"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full overflow-hidden bg-background transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96 border-b border-border" : "max-h-0",
        )}
      >
        <nav className="container-editorial flex flex-col py-2" aria-label="Sections menu">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`${sectionBase}${item.href}`}
              onClick={() => setOpen(false)}
              className="-mx-2 rounded-[var(--radius-sm)] px-2 py-3 text-base text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
