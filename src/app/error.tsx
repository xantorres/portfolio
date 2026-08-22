"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="container-editorial flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-4"
    >
      <p className="meta-label">Fault</p>
      <h1 className="headline-type">This page failed to render.</h1>
      <p className="max-w-prose text-muted-foreground">
        Retry first. If it happens again, the work index and the contact form both still work.
      </p>
      <div className="mt-4 flex gap-2">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">← Home</Link>
        </Button>
      </div>
    </main>
  );
}
