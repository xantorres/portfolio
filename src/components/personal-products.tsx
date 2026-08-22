import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { personalProducts, stripProtocol } from "@/lib/data";

export function PersonalProducts() {
  return (
    <section id="products" className="section-wash">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="03"
          eyebrow="Personal products"
          title="Three tools, published and in use."
          aside="Open source"
        />

        <p className="body-measure mb-12 text-base text-muted-foreground sm:text-lg">
          {personalProducts.intro}
        </p>

        <ul className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {personalProducts.items.map((p) => (
            <li key={p.name} className="min-w-0">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="row-link group -mx-4 flex h-full flex-col gap-4 rounded-[var(--radius-md)] px-4 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="title-type">{p.name}</h3>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                </div>
                <p className="meta-label">{p.subtitle}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <div className="mt-auto grid gap-4 pt-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t}>
                        <Badge variant="secondary">{t}</Badge>
                      </li>
                    ))}
                  </ul>
                  <span className="meta-label">{stripProtocol(p.github)}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
