import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-4 px-4 sm:px-6 lg:px-8"
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">404</p>
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Not here.</h1>
      <p className="text-muted-foreground">The page you were looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-4 inline-flex font-mono text-[11px] uppercase tracking-wider text-foreground hover:text-blue-500"
      >
        ← Back home
      </Link>
    </main>
  );
}
