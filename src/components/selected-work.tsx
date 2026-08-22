import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { cases } from "@/lib/data";

export function SelectedWork() {
  return (
    <section id="work">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="01"
          eyebrow="Selected work"
          title="What I shipped, and what it took."
          aside={`2018 / ${new Date().getUTCFullYear()}`}
        />

        <ul className="border-t border-border">
          {cases.map((c) => (
            <li key={c.slug} className="border-b border-border">
              <Link
                href={`/work/${c.slug}`}
                aria-label={`${c.company} · ${c.title}`}
                className="row-link group -mx-4 grid grid-cols-1 gap-6 px-4 py-10 md:grid-cols-12 md:gap-8 md:py-12"
              >
                <div className="flex flex-col gap-2 md:col-span-3">
                  <span className="title-type">{c.company}</span>
                  <span className="meta-label">{c.period}</span>
                  <span className="meta-label">{c.scope}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    Read case
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="headline-type max-w-[22ch] text-balance text-[1.5rem] sm:text-[1.75rem]">
                    {c.title}
                  </h3>
                  <p className="body-measure mt-4 text-sm text-muted-foreground sm:text-base">
                    {c.problem}
                  </p>
                </div>

                <dl className="grid gap-5 self-start md:col-span-4">
                  {c.featuredMetrics.map((metric) => (
                    <div key={metric.label} className="min-w-0">
                      <dt className="meta-label">{metric.label}</dt>
                      <dd className="title-type mt-1 break-words">{metric.value}</dd>
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
