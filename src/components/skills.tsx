import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="section-band">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="05"
          eyebrow="Stack"
          title="Depth first, breadth where the product needs it."
          aside={
            <>
              Strict TS
              <br />
              first
            </>
          }
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <section key={g.group} className={cn("bg-card p-5", i === 0 && "sm:col-span-2 lg:col-span-3")}>
              <h3 className="meta-label text-signal">{g.group}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary">{item}</Badge>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
