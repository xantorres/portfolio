import { Fragment } from "react";
import { method } from "@/lib/red-first";
import { keepCompounds } from "./keep-compounds";

export function MethodSection() {
  return (
    <section id="why-red-first" aria-labelledby="why-red-first-heading" className="section-pad">
      <div className="container-editorial">
        <p className="meta-label">{method.eyebrow}</p>
        <h2 id="why-red-first-heading" className="headline-type mt-4">
          {method.headline.split(/(?<=\.) /).map((line, index) => (
            <Fragment key={line}>
              {index > 0 && " "}
              <span className="block">{line}</span>
            </Fragment>
          ))}
        </h2>
        <div className="body-measure mt-6 grid gap-4 text-base sm:text-lg">
          <p>{method.lead}</p>
          <p className="text-muted-foreground">{method.body}</p>
          <p className="font-medium">{method.closing}</p>
        </div>
        <ol className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {method.pillars.map((pillar, index) => (
            <li key={pillar.title} className="grid content-start gap-3">
              <span aria-hidden className="meta-label tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="title-type max-w-[18ch]">{keepCompounds(pillar.title)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{keepCompounds(pillar.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
