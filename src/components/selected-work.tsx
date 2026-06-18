import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProofPlate } from "@/components/proof-plate";
import { SectionHeader } from "@/components/section-header";
import { cases, type CaseStudy } from "@/lib/data";

type WorkCardStyle = CSSProperties & {
  "--work-accent": string;
  "--work-accent-foreground": string;
};

function workCardStyle(proofTheme: CaseStudy["proofTheme"]): WorkCardStyle {
  return {
    "--work-accent": `var(--${proofTheme})`,
    "--work-accent-foreground": `var(--${proofTheme}-foreground)`,
  };
}

export function SelectedWork() {
  return (
    <section id="work" className="section-band">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="02"
          eyebrow="Selected work"
          title="Latest projects."
          aside="2020 / 2026"
        />

        <ul className="grid gap-6">
          {cases.map((c, index) => (
            <li key={c.slug}>
              <Link
                href={`/work/${c.slug}`}
                aria-label={`${c.company} — ${c.title}`}
                style={workCardStyle(c.proofTheme)}
                className="work-card group grid grid-cols-1 gap-6 overflow-hidden rounded-[var(--radius-md)] border-t border-border px-3 py-8 md:grid-cols-12 md:items-stretch md:px-5 md:py-10 md:pl-16"
              >
                <span className="work-card__ruler work-card__ruler--top" aria-hidden />
                <span className="work-card__ruler work-card__ruler--bottom" aria-hidden />
                <span className="work-card__index-rail" aria-hidden>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </span>

                <div className="work-card__meta flex flex-col justify-between gap-6 md:col-span-3">
                  <div className="grid gap-2">
                    <span className="work-card__case-chip meta-label">
                      Case {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                      {c.company}
                    </span>
                    <span className="meta-label">{c.period}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors group-hover:text-signal">
                    Read case
                    <ArrowUpRight className="work-card__arrow size-3.5" />
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="work-card__title max-w-[22ch] text-balance font-display text-2xl font-medium leading-[1.05] tracking-normal sm:text-3xl">
                    {c.title}
                  </h3>
                  <p className="work-card__problem mt-5 body-measure text-sm text-muted-foreground sm:text-base">
                    {c.problem}
                  </p>
                </div>

                <ProofPlate caseStudy={c} compact className="md:col-span-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
