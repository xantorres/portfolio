import { ClipboardList, Ruler } from "lucide-react";
import { measured } from "@/lib/red-first";

export function MeasuredSection() {
  return (
    <section id="measured" className="section-pad">
      <div className="container-editorial">
        <h2 className="headline-type max-w-[28ch] text-balance">{measured.headline}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="min-w-0 rounded-[var(--radius-md)] border border-border p-6 sm:p-8">
            <Ruler aria-hidden className="size-5 text-muted-foreground" />
            <h3 className="title-type mt-5">{measured.measureTitle}</h3>
            <p className="body-measure mt-4 text-base">{measured.measure}</p>
            <p className="body-measure mt-4 text-sm italic text-muted-foreground">
              {measured.measureNote}
            </p>
          </div>
          <div className="min-w-0 rounded-[var(--radius-md)] border border-border p-6 sm:p-8">
            <ClipboardList aria-hidden className="size-5 text-muted-foreground" />
            <h3 className="title-type mt-5">{measured.reportTitle}</h3>
            <p className="body-measure mt-4 text-base">{measured.report}</p>
          </div>
        </div>
        <p className="mt-12 text-center text-2xl font-bold text-balance sm:text-3xl">
          {measured.closing}
        </p>
      </div>
    </section>
  );
}
