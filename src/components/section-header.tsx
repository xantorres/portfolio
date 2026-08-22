import { cn } from "@/lib/utils";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
};

export function SectionHeader({ index, eyebrow, title, aside, className }: Props) {
  return (
    <header className={cn("mb-12 grid gap-4 sm:mb-16", className)}>
      <p className="meta-label flex items-center gap-3">
        <span className="tabular-nums">{index}</span>
        <span>{eyebrow}</span>
      </p>

      <h2 className="headline-type max-w-[20ch] text-balance">{title}</h2>

      {aside && <p className="meta-label">{aside}</p>}
    </header>
  );
}
