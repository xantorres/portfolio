import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] border text-sm font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-editorial)] disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-signal hover:text-signal-foreground",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive",
        outline:
          "border-border bg-background text-foreground hover:border-signal hover:text-signal",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:border-signal hover:bg-card",
        ghost: "border-transparent bg-transparent text-muted-foreground hover:bg-card hover:text-foreground",
        link: "border-transparent bg-transparent px-0 text-primary underline-offset-4 hover:translate-y-0 hover:text-signal hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
