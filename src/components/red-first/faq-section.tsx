import { Plus } from "lucide-react";
import { faq } from "@/lib/red-first";

export function FaqSection() {
  return (
    <section id="faq" className="section-pad">
      <div className="container-editorial grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <h2 className="headline-type">{faq.headline}</h2>
        <div className="min-w-0 border-t border-border">
          {faq.items.map((item) => (
            <details key={item.question} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-[var(--radius-sm)] py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-medium sm:text-lg">{item.question}</h3>
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="body-measure pb-6 text-base text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
