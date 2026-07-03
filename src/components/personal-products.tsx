import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { personalProducts, stripProtocol } from "@/lib/data";

export function PersonalProducts() {
  return (
    <section id="products" className="section-band">
      <div className="container-editorial section-pad">
        <SectionHeader index="04" eyebrow="Personal products" title="Personal products." aside="Open source" />

        <p className="body-measure mb-10 text-base text-muted-foreground sm:mb-12 sm:text-lg">
          {personalProducts.intro}
        </p>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border md:grid-cols-3">
          {personalProducts.items.map((p) => (
            <li key={p.name} className="min-w-0">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col gap-5 bg-card p-6 transition-colors hover:bg-background sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                    {p.name}
                  </h3>
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-signal"
                  />
                </div>
                <div className="grid gap-3">
                  <p className="meta-label text-signal">{p.subtitle}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
                <div className="mt-auto grid gap-4">
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t}>
                        <Badge variant="secondary">{t}</Badge>
                      </li>
                    ))}
                  </ul>
                  <span className="meta-label transition-colors group-hover:text-signal">
                    {stripProtocol(p.github)}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
