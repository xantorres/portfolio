import { SectionHeader } from "@/components/section-header";
import { strengths } from "@/lib/data";

export function CoreStrengths() {
  return (
    <section id="strengths">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="04"
          eyebrow="Core strengths"
          title="What you get in the first month."
        />

        <ul className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {strengths.map((s, index) => (
            <li key={s.title} className="grid content-start gap-3">
              <span className="meta-label tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="title-type max-w-[18ch]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
