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
      className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center gap-4 px-4 sm:px-6 lg:px-8"
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        Unexpected error
      </p>
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Something went sideways.</h1>
      <p className="max-w-prose text-muted-foreground">
        Sorry, that wasn&apos;t supposed to happen. Try again, or head home.
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
