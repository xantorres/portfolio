import { Network, Layers, Lightbulb, Code } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { strengths } from "@/lib/data";
import type { ComponentType, SVGProps } from "react";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  network: Network,
  layers: Layers,
  lightbulb: Lightbulb,
  code: Code,
};

export function CoreStrengths() {
  return (
    <section id="strengths" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeader
          index="01"
          eyebrow="Core strengths"
          title="Engineering excellence."
        />

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {strengths.map((s) => {
            const Icon = iconMap[s.icon] ?? Network;
            return (
              <li key={s.title} className="flex flex-col gap-5 border-l border-border pl-6 lg:border-l lg:pl-6">
                <span
                  aria-hidden
                  className="inline-flex size-10 items-center justify-center rounded-md bg-blue-500/15 text-blue-400"
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-bold leading-tight tracking-tight sm:text-xl">
                  {s.title}
                </h3>
                <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {s.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
