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
    <header
      className={cn(
        "mb-12 grid grid-cols-1 gap-6 sm:mb-16 md:grid-cols-12 md:gap-6",
        className,
      )}
    >
      <div className="flex flex-col gap-2 md:col-span-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          [ {index} ]
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/80">
          {eyebrow}
        </span>
      </div>

      <h2 className="max-w-[16ch] font-sans text-4xl font-extrabold leading-none tracking-tight sm:text-5xl md:col-span-7 lg:text-6xl xl:text-7xl">
        {title}
      </h2>

      {aside && (
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:col-span-2 md:self-end md:text-right">
          {aside}
        </div>
      )}
    </header>
  );
}
