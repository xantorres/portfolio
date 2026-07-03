import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { AvailabilityPill } from "@/components/availability-pill";
import { InstrumentSchematic } from "@/components/instrument-schematic";
import { Button } from "@/components/ui/button";
import { getSubhead, hero, heroProofStrip, profile } from "@/lib/data";

export function Hero() {
  return (
    <section id="top" className="boot container-editorial pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-24">
      <div className="grid min-w-0 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <div data-boot="0">
            <AvailabilityPill className="mb-8 sm:hidden" />
            <p className="meta-label mb-5 text-signal">{hero.eyebrow}</p>
          </div>
          <h1 data-boot="1" className="display-type max-w-[20ch] text-balance">
            {hero.headline}
          </h1>
          <p data-boot="2" className="mt-8 body-measure text-base text-muted-foreground sm:text-lg">
            <span className="font-semibold text-foreground">{profile.name}.</span> {getSubhead()}
          </p>
          <div data-boot="3" className="mt-10 flex flex-wrap items-center gap-3">
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

        <div data-boot="2" className="min-w-0 self-center lg:col-span-5">
          <InstrumentSchematic className="mx-auto h-auto w-full max-w-[32rem] text-foreground" />
        </div>

        <div data-boot="4" className="grid gap-3 border-t border-border pt-6 lg:col-span-12">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {heroProofStrip().map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span aria-hidden className="h-3.5 w-px bg-signal/70" />
                <span className="meta-label text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
          <p data-boot="5" className="meta-label">
            <span className="text-signal">{hero.clientsLabel}:</span> {hero.clients.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
