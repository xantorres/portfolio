import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ctaHref, hero, heroProof } from "@/lib/red-first";
import { keepCompounds } from "./keep-compounds";

export function HeroSection() {
  return (
    <section id="top" className="py-16 sm:py-24">
      <div className="container-editorial grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div className="min-w-0">
          <p className="meta-label">{hero.eyebrow}</p>
          <h1 className="display-type mt-6 max-w-[18ch] text-balance">{hero.headline}</h1>
          <p className="body-measure mt-6 text-base text-muted-foreground sm:text-lg">
            {keepCompounds(hero.subhead)}
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href={ctaHref}>{hero.cta}</a>
          </Button>
        </div>

        <a
          href="#proof"
          aria-label="See the full apache/answer proof"
          className="block min-w-0 rounded-[var(--radius-md)] bg-wash p-6 transition-colors hover:bg-hover-fill sm:p-8"
        >
          <p className="meta-label">{heroProof.label}</p>
          <dl className="mt-4">
            {heroProof.rows.map(([metric, before, after, change]) => (
              <div key={metric} className="border-b border-border py-4 last:border-b-0 last:pb-0">
                <dt className="meta-label">{metric}</dt>
                <dd className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="title-type tabular-nums">{before}</span>
                  <ArrowRight aria-hidden className="size-4 self-center text-muted-foreground" />
                  <span className="sr-only">to</span>
                  <span className="title-type tabular-nums">{after}</span>
                  <span className="ml-auto text-sm font-medium tabular-nums">{change}</span>
                </dd>
              </div>
            ))}
          </dl>
        </a>
      </div>
    </section>
  );
}
