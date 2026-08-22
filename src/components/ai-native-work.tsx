import { SectionHeader } from "@/components/section-header";
import { aiNativeWork } from "@/lib/data";

export function AiNativeWork() {
  return (
    <section id="ai-work">
      <div className="container-editorial section-pad">
        <SectionHeader index="02" eyebrow="AI-native work" title="AI in the path that ships." />

        <p className="body-measure mb-12 text-base text-muted-foreground sm:text-lg">
          {aiNativeWork.intro}
        </p>

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {aiNativeWork.cards.map((card, i) => (
            <li key={card.title} className="grid content-start gap-3">
              <span className="meta-label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="title-type max-w-[18ch]">{card.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {card.body}
              </p>
              <p className="meta-label mt-1">{card.proof}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
