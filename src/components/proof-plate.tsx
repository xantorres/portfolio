import type { CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";

const themeClass: Record<
  CaseStudy["proofTheme"],
  {
    block: string;
    ink: string;
    rule: string;
    dot: string;
  }
> = {
  blueprint: {
    block: "bg-blueprint text-blueprint-foreground",
    ink: "text-blueprint",
    rule: "border-blueprint",
    dot: "bg-blueprint",
  },
  signal: {
    block: "bg-signal text-signal-foreground",
    ink: "text-signal",
    rule: "border-signal",
    dot: "bg-signal",
  },
  oxide: {
    block: "bg-oxide text-oxide-foreground",
    ink: "text-oxide",
    rule: "border-oxide",
    dot: "bg-oxide",
  },
  circuit: {
    block: "bg-circuit text-circuit-foreground",
    ink: "text-circuit",
    rule: "border-circuit",
    dot: "bg-circuit",
  },
};

type Props = {
  caseStudy: CaseStudy;
  compact?: boolean;
  className?: string;
};

export function ProofPlate({ caseStudy, compact = false, className }: Props) {
  const theme = themeClass[caseStudy.proofTheme];

  return (
    <aside
      className={cn(
        "proof-plate relative overflow-hidden rounded-[var(--radius-md)] border border-border bg-card text-card-foreground",
        className,
      )}
      aria-label={`${caseStudy.company} proof plate`}
    >
      <div className="proof-plate__grid absolute inset-0 opacity-20 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative grid gap-5 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="meta-label">{caseStudy.artifact}</p>
            <h3 className="mt-2 max-w-[18ch] font-display text-xl font-medium leading-tight tracking-normal sm:text-2xl">
              {caseStudy.company}
            </h3>
          </div>
          <span
            aria-hidden
            className={cn("proof-plate__dot mt-1 block size-3 shrink-0 rounded-full", theme.dot)}
          />
        </div>

        <div className={cn("proof-plate__rule h-2 w-20 border-t-2", theme.rule)} aria-hidden />

        <dl className="grid grid-cols-3 gap-2">
          {caseStudy.featuredMetrics.map((metric) => (
            <div key={metric.label} className="proof-plate__metric min-w-0 border-l border-border pl-2">
              <dt className="meta-label">{metric.label}</dt>
              <dd className={cn("proof-plate__metric-value mt-1 font-display text-xl font-medium leading-none", theme.ink)}>
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>

        {!compact && (
          <div className="grid gap-3">
            <p className="text-sm leading-relaxed text-muted-foreground">{caseStudy.systemMove}</p>
            <ol className="grid gap-2">
              {caseStudy.timeline.map((item, index) => (
                <li key={item} className="grid grid-cols-[2rem_1fr] items-center gap-3">
                  <span className={cn("rounded-[var(--radius-xs)] px-1.5 py-1 text-center font-mono text-[0.65rem] font-semibold", theme.block)}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </aside>
  );
}
