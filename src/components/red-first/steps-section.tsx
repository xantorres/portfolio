import { steps } from "@/lib/red-first";

export function StepsSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="pb-4 sm:pb-8">
      <div className="container-editorial">
        <h2 id="how-it-works-heading" className="meta-label">
          {steps.headline}
        </h2>
        <ol className="mt-4 grid gap-8 border-t border-border pt-8 sm:grid-cols-3 sm:gap-10">
          {steps.items.map((step, index) => (
            <li key={step.title} className="grid content-start gap-2">
              <span aria-hidden className="meta-label tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="title-type">{step.title}</h3>
              <p className="text-base text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
