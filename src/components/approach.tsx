import { SectionHeader } from "@/components/section-header";
import { approach } from "@/lib/data";

export function Approach() {
  return (
    <section id="approach" className="section-band">
      <div className="container-editorial section-pad">
        <SectionHeader
          index="06"
          eyebrow="Approach"
          title="Decisions I make the same way every time."
        />

        <ol className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {approach.map((s, i) => (
            <li
              key={s.title}
              className="grid gap-5 border-t border-border pt-6 md:col-span-6 lg:col-span-3"
            >
              <span className="meta-label text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid gap-4">
                <h3 className="max-w-[18ch] font-display text-xl font-medium leading-tight tracking-normal sm:text-2xl">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
