import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] border text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:opacity-90",
        outline: "border-border-strong bg-transparent text-foreground hover:bg-hover-fill",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-hover-fill",
        ghost: "border-transparent bg-transparent text-muted-foreground hover:bg-hover-fill hover:text-foreground",
        link: "border-transparent bg-transparent px-0 text-foreground underline underline-offset-4 active:scale-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3.5",
        lg: "h-11 px-5",
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
