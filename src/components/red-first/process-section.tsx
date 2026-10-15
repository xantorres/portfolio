import { GitPullRequest } from "lucide-react";
import { sprintPlan } from "@/lib/red-first";

export function ProcessSection() {
  return (
    <section id="process" className="section-pad">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16">
          <h2 className="headline-type lg:col-start-1 lg:row-start-1">{sprintPlan.headline}</h2>

          <ol
            aria-label={sprintPlan.tableLabel}
            className="ml-1.5 border-l border-border lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            {sprintPlan.days.map(([day, work]) => (
              <li key={day} className="relative min-w-0 pb-8 pl-8 last:pb-0 sm:pl-10">
                <span
                  aria-hidden
                  className="absolute -left-[6.5px] top-1.5 size-3 rounded-[var(--radius-sm)] border-2 border-foreground bg-background"
                />
                <span className="meta-label inline-block rounded-[var(--radius-sm)] bg-wash px-2 py-0.5 tabular-nums">
                  Day {day}
                </span>
                <p className="mt-2 text-base">{work}</p>
              </li>
            ))}
          </ol>

          <p className="flex items-start gap-3 self-start rounded-[var(--radius-md)] bg-wash p-5 font-medium lg:col-start-1 lg:row-start-2">
            <GitPullRequest aria-hidden className="mt-1 size-5 shrink-0" />
            {sprintPlan.note}
          </p>
        </div>
      </div>
    </section>
  );
}
