import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="container-editorial flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4"
    >
      <p className="meta-label">404 · No route</p>
      <h1 className="headline-type">Nothing at this path.</h1>
      <p className="text-muted-foreground">This page does not exist, or it moved. The case index is the best place to restart.</p>
      <Link
        href="/"
        className="mt-4 inline-flex text-sm text-foreground underline-offset-4 hover:underline"
      >
        ← Back home
      </Link>
    </main>
  );
}
