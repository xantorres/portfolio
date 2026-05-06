import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { cases } from "@/lib/data";

export function SelectedWork() {
  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeader
          index="02"
          eyebrow="Case studies"
          title="Selected work."
          aside="2023 – 2026"
        />

        <ul className="flex flex-col">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/work/${c.slug}`}
                className="group grid grid-cols-1 items-start gap-6 border-t border-border py-10 transition-colors hover:bg-muted/30 md:grid-cols-12 md:gap-6 md:py-12"
              >
                <div className="flex flex-col gap-2 md:col-span-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {c.period.match(/\d{4}/)?.[0] ?? ""}
                  </span>
                  <span className="font-mono text-sm uppercase tracking-wide text-foreground">
                    {c.company}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {c.sector}
                  </span>
                </div>

                <div className="flex flex-col gap-5 md:col-span-5">
                  <h3 className="max-w-[22ch] text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    {c.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                    Read case
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <dl className="grid grid-cols-1 gap-6 md:col-span-4 sm:grid-cols-2">
                  {c.stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-2">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {s.label}
                      </dt>
                      <dd className="font-sans text-xl font-black leading-tight tracking-tight text-balance sm:text-2xl lg:text-3xl">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
