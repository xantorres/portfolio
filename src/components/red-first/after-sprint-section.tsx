import { CalendarClock } from "lucide-react";
import { afterSprint } from "@/lib/red-first";

export function AfterSprintSection() {
  return (
    <section id="after-sprint" className="section-pad">
      <div className="container-editorial">
        <div className="grid items-start gap-4 rounded-[var(--radius-md)] border border-border p-6 sm:p-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
          <div className="flex items-center gap-3">
            <CalendarClock aria-hidden className="size-5 shrink-0 text-muted-foreground" />
            <h2 className="title-type">{afterSprint.headline}</h2>
          </div>
          <p className="body-measure text-base">{afterSprint.body}</p>
        </div>
      </div>
    </section>
  );
}
