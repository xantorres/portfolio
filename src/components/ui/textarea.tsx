import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-[var(--radius-md)] border border-input bg-background px-3 py-2 text-sm leading-relaxed transition-colors placeholder:text-muted-foreground aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
