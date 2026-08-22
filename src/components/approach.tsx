import { SectionHeader } from "@/components/section-header";
import { approach } from "@/lib/data";

export function Approach() {
  return (
    <section id="approach" className="section-wash">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="06"
          eyebrow="Approach"
          title="Decisions I make the same way every time."
        />

        <ol className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {approach.map((s, i) => (
            <li key={s.title} className="grid content-start gap-3">
              <span className="meta-label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="title-type max-w-[18ch]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
