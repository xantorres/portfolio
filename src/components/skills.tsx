import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="05"
          eyebrow="Stack"
          title="Depth first, breadth where the product needs it."
          aside="Strict TypeScript first"
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {skills.map((g, i) => (
            <section
              key={g.group}
              className={cn("min-w-0", i === 0 && "sm:col-span-2 lg:col-span-3")}
            >
              <h3 className="title-type">{g.group}</h3>
              <p className="body-measure mt-2 text-sm leading-relaxed text-muted-foreground">
                {g.blurb}
              </p>
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
