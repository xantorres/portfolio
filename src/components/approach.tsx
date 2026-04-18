import { SectionHeader } from "@/components/section-header";
import { approach } from "@/lib/data";

export function Approach() {
  return (
    <section id="approach" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeader index="03" eyebrow="Approach" title="Approach." />

        <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-14">
          {approach.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[auto_1fr] gap-5">
              <span className="pt-2 font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="max-w-[22ch] text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                  {s.title}
                </h3>
                <p className="max-w-prose text-sm text-muted-foreground sm:text-base">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
