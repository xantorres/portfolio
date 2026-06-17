import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

export function SiteFooter() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container-editorial flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:py-10">
        <span
          aria-label="Xan Torres"
          className="font-display text-3xl font-medium leading-none tracking-normal text-muted-foreground"
        >
          XT
        </span>
        <div className="meta-label flex flex-col items-start gap-3 sm:items-end">
          <a
            href={profile.links.toptal}
            target="_blank"
            rel="noreferrer nofollow sponsored"
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-xs)] border border-border px-2 py-1 transition-colors hover:border-signal hover:text-signal"
          >
            Hire me on Toptal
            <ArrowUpRight aria-hidden className="size-3" />
          </a>
          <div className="flex flex-col gap-1 sm:items-end">
            <span>© {year} Xan Torres</span>
            <span>Hand-built · Editorial system</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
