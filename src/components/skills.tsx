import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="section-band">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="04"
          eyebrow="Stack"
          title="Tools I use."
          aside={
            <>
              Strict TS
              <br />
              first
            </>
          }
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <section key={g.group} className="bg-card p-5">
              <h3 className="meta-label text-signal">{g.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-1.5">
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
