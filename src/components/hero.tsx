import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AvailabilityPill } from "@/components/availability-pill";
import { InstrumentSchematic } from "@/components/instrument-schematic";
import { Button } from "@/components/ui/button";
import { getSubhead, hero, heroProofStrip, profile } from "@/lib/data";

// Two-tone headline: the claim at full ink, its continuation quieter on the same
// size and baseline, so the hero gets hierarchy without a second weight or size.
function splitHeadline(headline: string): [string, string] {
  const end = headline.indexOf(". ");
  if (end === -1) return [headline, ""];
  return [headline.slice(0, end + 1), headline.slice(end + 2)];
}

export function Hero() {
  const [lead, rest] = splitHeadline(hero.headline);

  return (
    <section id="top" className="container-editorial pb-12 pt-14 sm:pt-20 lg:pb-18 lg:pt-24">
      <div className="grid min-w-0 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-7">
          <AvailabilityPill className="mb-8 sm:hidden" />
          <p className="meta-label mb-6">{hero.eyebrow}</p>

          <h1 className="display-type max-w-[18ch] text-balance">
            {lead}
            {rest && <span className="text-muted-foreground"> {rest}</span>}
          </h1>

          <p className="body-measure mt-8 text-base text-muted-foreground sm:text-lg">
            <span className="font-medium text-foreground">{profile.name}.</span> {getSubhead()}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>

        <figure className="min-w-0 self-center rounded-[var(--radius-md)] bg-wash p-8 lg:col-span-5">
          <InstrumentSchematic className="h-auto w-full" />
        </figure>

        <div className="grid gap-4 border-t border-border pt-8 lg:col-span-12">
          <ul className="flex flex-wrap gap-x-10 gap-y-2">
            {heroProofStrip().map((item) => (
              <li key={item} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
          <p className="meta-label">
            {hero.clientsLabel}: {hero.clients.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
