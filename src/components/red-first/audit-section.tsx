import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { audit, ctaHref } from "@/lib/red-first";

export function AuditSection() {
  return (
    <section id="audit" className="section-pad">
      <div className="container-editorial">
        <div className="grid gap-10 rounded-[var(--radius-md)] border border-border-strong p-6 sm:p-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
          <div className="min-w-0">
            <h2 className="headline-type">{audit.headline}</h2>
            <p className="body-measure mt-6 text-base sm:text-lg">{audit.body}</p>
            <p className="body-measure mt-4 text-base">{audit.credit}</p>
            <Button asChild size="lg" className="mt-8">
              <a href={ctaHref}>{audit.cta}</a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">{audit.note}</p>
          </div>

          <div className="min-w-0 border-t border-border pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-12">
            <h3 className="title-type">{audit.deliverablesLabel}</h3>
            <ul className="mt-5 grid gap-3">
              {audit.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
