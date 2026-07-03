import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { AvailabilityPill } from "@/components/availability-pill";
import { Button } from "@/components/ui/button";
import { getSubhead, hero, heroProofStrip, profile } from "@/lib/data";

export function Hero() {
  return (
    <section id="top" className="container-editorial pb-14 pt-14 sm:pt-20 lg:pb-20 lg:pt-28">
      <div className="grid min-w-0 gap-10">
        <div className="min-w-0 max-w-4xl">
          <AvailabilityPill className="mb-8 sm:hidden" />
          <p className="meta-label mb-4 text-signal">{hero.eyebrow}</p>
          <h1 className="display-type max-w-[20ch] text-balance">{hero.headline}</h1>
          <p className="mt-8 body-measure text-base text-muted-foreground sm:text-lg">
            <span className="font-semibold text-foreground">{profile.name}.</span> {getSubhead()}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
                <Mail className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-3 border-t border-border pt-6">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {heroProofStrip().map((item, i) => (
              <li key={item} className="flex items-center gap-x-3">
                {i > 0 && (
                  <span className="meta-label" aria-hidden>
                    ·
                  </span>
                )}
                <span className="meta-label">{item}</span>
              </li>
            ))}
          </ul>
          <p className="meta-label">
            <span className="text-signal">{hero.clientsLabel}:</span> {hero.clients.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
