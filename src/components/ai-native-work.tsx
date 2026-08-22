import { SectionHeader } from "@/components/section-header";
import { aiNativeWork } from "@/lib/data";

export function AiNativeWork() {
  return (
    <section id="ai-work" className="section-band">
      <div className="container-editorial section-pad">
        <SectionHeader index="02" eyebrow="AI-native work" title="AI in the path that ships." />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <p className="body-measure text-base text-muted-foreground sm:text-lg lg:col-span-4">
            {aiNativeWork.intro}
          </p>

          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-8">
            {aiNativeWork.cards.map((card, i) => (
              <li key={card.title} className="grid content-start gap-4 border-t border-border pt-6">
                <span className="meta-label text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="max-w-[18ch] font-display text-xl font-medium leading-tight tracking-normal sm:text-2xl">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{card.body}</p>
                <p className="meta-label text-muted-foreground">{card.proof}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
