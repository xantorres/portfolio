import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

export function SiteFooter() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container-editorial flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <span aria-label="Xan Torres" className="text-xl font-semibold tracking-[-0.01em]">
          XT
        </span>
        <div className="flex flex-col items-start gap-3">
          <a
            href={profile.links.toptal}
            target="_blank"
            rel="noreferrer nofollow sponsored"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Hire me on Toptal
            <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
          <div className="meta-label flex flex-col gap-1">
            <span>© {year} Xan Torres</span>
            <span>
              {profile.business.legalName} ({profile.business.country})
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
