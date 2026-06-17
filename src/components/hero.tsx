import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { AvailabilityPill } from "@/components/availability-pill";
import { Button } from "@/components/ui/button";
import { getSubhead, profile } from "@/lib/data";

const ledger = [
  { value: "Own", label: "Architecture, data flow, UI states, and the last mile of polish." },
  { value: "Ship", label: "Production features while the product is live and changing." },
  { value: "Untangle", label: "Legacy React, dashboards, forms, maps, and design-system drift." },
  { value: "Partner", label: "Clear decisions with product, design, backend, and founders." },
];

export function Hero() {
  return (
    <section id="top" className="container-editorial min-h-[calc(88svh-4rem)] pb-10 pt-12 sm:pt-16 lg:pt-20">
      <div className="grid min-h-[calc(78svh-8rem)] min-w-0 grid-cols-1 content-between gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-8">
          <AvailabilityPill className="mb-8 sm:hidden" />
          <p className="meta-label mb-4 text-signal">TypeScript · React · Product UI</p>
          <h1 className="display-type max-w-[15ch] text-balance">
            Senior Frontend Engineer & Product Architect.
          </h1>
          <p className="mt-8 body-measure text-base text-muted-foreground sm:text-lg">
            <span className="font-semibold text-foreground">{profile.name}.</span> {getSubhead()}
          </p>
        </div>

        <aside className="min-w-0 grid content-start gap-5 border-l border-border pl-5 lg:col-span-4 lg:mt-28">
          <AvailabilityPill className="hidden w-fit sm:inline-flex" />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border">
            {ledger.map((item) => (
              <div key={item.label} className="min-w-0 bg-card p-4">
                <p className="font-display text-3xl font-medium leading-none tracking-normal text-signal">
                  {item.value}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Best fit: teams that need a senior frontend engineer who can turn messy product work
            into clean TypeScript, reliable UI, and momentum the rest of the team can feel.
          </p>
        </aside>

        <div className="grid gap-8 border-t border-border pt-6 lg:col-span-12 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 lg:col-span-6">
            <span className="h-px w-10 bg-border" aria-hidden />
            <span className="meta-label">{profile.location}</span>
            <span className="meta-label text-signal">Toptal network since 2017</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <Button asChild variant="outline" size="lg">
              <Link href="#work">
                Selected work
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="#contact">
                Work together
                <Mail className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
