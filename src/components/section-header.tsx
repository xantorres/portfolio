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
        <span className="meta-label">
          [ {index} ]
        </span>
        <span className="meta-label text-foreground">
          {eyebrow}
        </span>
      </div>

      <h2 className="max-w-[18ch] text-balance font-display text-3xl font-medium leading-[1.05] tracking-normal sm:text-4xl md:col-span-7 lg:text-5xl">
        {title}
      </h2>

      {aside && (
        <div className="meta-label md:col-span-2 md:self-end md:text-right">
          {aside}
        </div>
      )}
    </header>
  );
}
