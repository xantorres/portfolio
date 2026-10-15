import { FileX, Network, ShieldAlert, Timer } from "lucide-react";
import { problem } from "@/lib/red-first";

const icons = [FileX, ShieldAlert, Network, Timer];

export function ProblemSection() {
  return (
    <section id="problem" className="section-pad">
      <div className="container-editorial">
        <h2 className="headline-type max-w-[40ch] text-balance">{problem.intro}</h2>
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
