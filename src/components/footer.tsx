export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-10 lg:px-8">
        <span className="font-sans text-3xl font-black tracking-tighter text-muted-foreground">
          XT
        </span>
        <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:items-end">
          <span>© 2026 Xan Torres</span>
          <span>Built with Next.js 16 · Tailwind v4</span>
        </div>
      </div>
    </footer>
  );
}
