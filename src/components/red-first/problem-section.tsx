import { FileX, Network, ShieldAlert, Timer } from "lucide-react";
import { problem } from "@/lib/red-first";

const icons = [FileX, ShieldAlert, Network, Timer];

export function ProblemSection() {
  return (
    <section id="problem" className="section-pad">
      <div className="container-editorial">
        <h2 className="headline-type max-w-[24ch] text-balance">{problem.headline}</h2>
        <p className="body-measure mt-4 text-base text-muted-foreground sm:text-lg">{problem.intro}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {problem.bullets.map((bullet, index) => {
            const Icon = icons[index % icons.length];
            return (
              <li key={bullet} className="rounded-[var(--radius-md)] border border-border p-5 sm:p-6">
                <Icon aria-hidden className="size-5 text-muted-foreground" />
                <p className="mt-4 text-base [overflow-wrap:anywhere]">{bullet}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
