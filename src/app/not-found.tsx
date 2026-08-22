import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="container-editorial flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4"
    >
      <p className="meta-label text-signal">404 · No route</p>
      <h1 className="font-display text-3xl font-medium leading-tight tracking-normal sm:text-4xl">
        Nothing at this path.
      </h1>
      <p className="text-muted-foreground">This page does not exist, or it moved. The case index is the best place to restart.</p>
      <Link
        href="/"
        className="mt-4 inline-flex font-mono text-[0.68rem] uppercase tracking-[0.08em] text-foreground hover:text-signal"
      >
        ← Back home
      </Link>
    </main>
  );
}
