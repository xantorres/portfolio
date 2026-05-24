import { SectionHeader } from "@/components/section-header";
import { strengths } from "@/lib/data";

export function CoreStrengths() {
  return (
    <section id="strengths" className="section-band">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="01"
          eyebrow="Core strengths"
          title="What I'm good at."
        />

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((s, index) => (
            <li key={s.title} className="bg-background p-6 sm:p-7">
              <span className="meta-label text-signal">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 max-w-[18ch] font-display text-xl font-medium leading-tight tracking-normal sm:text-2xl">
                {s.title}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {s.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
