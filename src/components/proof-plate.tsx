import type { CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = {
  caseStudy: CaseStudy;
  compact?: boolean;
  className?: string;
};

export function ProofPlate({ caseStudy, compact = false, className }: Props) {
  return (
    <aside
      className={cn("rounded-[var(--radius-md)] bg-wash p-6 sm:p-7", className)}
      aria-label={`Outcomes for ${caseStudy.company}`}
    >
      <div className="grid gap-6">
        <div>
          <p className="meta-label">{caseStudy.artifact}</p>
          <h3 className="title-type mt-2 max-w-[18ch]">{caseStudy.company}</h3>
        </div>

        <dl className="grid gap-5">
          {caseStudy.featuredMetrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="meta-label">{metric.label}</dt>
              <dd className="title-type mt-1 break-words">{metric.value}</dd>
            </div>
          ))}
        </dl>

        {!compact && (
          <div className="grid gap-4">
            <p className="text-sm leading-relaxed text-muted-foreground">{caseStudy.systemMove}</p>
            <ol className="grid gap-3">
              {caseStudy.timeline.map((item, index) => (
                <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-3">
                  <span className="meta-label tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </aside>
  );
}
