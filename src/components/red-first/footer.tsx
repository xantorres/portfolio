import { finalCta } from "@/lib/red-first";
import { navItems } from "./nav-items";

interface RedFirstFooterProps {
  sectionBase?: string;
}

export function RedFirstFooter({ sectionBase = "" }: RedFirstFooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="container-editorial flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">{finalCta.footer}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`${sectionBase}${item.href}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
