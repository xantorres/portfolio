import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeader
          index="04"
          eyebrow="Stack"
          title="Tools in daily use."
          aside={
            <>
              Strict TS
              <br />
              first
            </>
          }
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group} className="flex flex-col gap-4">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {g.group}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li key={item}>
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
