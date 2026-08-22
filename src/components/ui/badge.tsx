import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-sm)] border px-2.5 py-1 text-[0.8125rem] font-normal leading-none transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-wash text-muted-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-border-strong bg-transparent text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = ComponentProps<"div"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
