export function SiteFooter() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container-editorial flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:py-10">
        <span
          aria-label="Xan Torres"
          className="font-display text-3xl font-medium leading-none tracking-normal text-muted-foreground"
        >
          XT
        </span>
        <div className="meta-label flex flex-col gap-1 sm:items-end">
          <span>© {year} Xan Torres</span>
          <span>Hand-built · Editorial system</span>
        </div>
      </div>
    </footer>
  );
}
