import { Bot, Check, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ctaHref, sprint } from "@/lib/red-first";

const doorIcons = [Zap, Layers, Bot];

export function SprintSection() {
  return (
    <section id="sprint" className="section-pad">
      <div className="container-editorial">
        <h2 className="headline-type max-w-[28ch] text-balance">{sprint.headline}</h2>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {sprint.doors.map((door, index) => {
            const Icon = doorIcons[index % doorIcons.length];
            return (
              <li
                key={door.name}
                className="flex flex-col justify-between gap-8 rounded-[var(--radius-md)] border border-border p-6"
              >
                <div className="flex items-center justify-between">
                  <span aria-hidden className="meta-label tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="title-type [overflow-wrap:anywhere]">{door.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{door.body}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="min-w-0">
            <div className="rounded-[var(--radius-md)] bg-wash p-6 sm:p-8">
              <p className="text-xl font-medium sm:text-2xl">{sprint.price}</p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {sprint.terms.map((term) => (
                <li key={term} className="flex items-center gap-2 text-base">
                  <Check aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                  {term}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8">
              <a href={ctaHref}>{sprint.cta}</a>
            </Button>
          </div>

          <div className="min-w-0 rounded-[var(--radius-md)] border border-border p-6 sm:p-8">
            <p className="body-measure text-base">{sprint.provide}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
