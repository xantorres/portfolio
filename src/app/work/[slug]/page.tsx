import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import { cases } from "@/lib/data";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `${c.company} · ${c.headline}`,
    description: c.summary,
  };
}

export default async function WorkDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-12 sm:px-6 sm:pb-32 sm:pt-16 lg:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to work
        </Link>

        <header className="mt-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="text-foreground">{c.company}</span>
            <span aria-hidden>·</span>
            <span>{c.sector}</span>
            <span aria-hidden>·</span>
            <span>{c.period}</span>
          </div>

          <h1 className="max-w-[24ch] text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {c.headline}
          </h1>

          <p className="max-w-prose text-base text-muted-foreground sm:text-lg">{c.summary}</p>

          <div className="flex flex-wrap gap-1.5">
            {c.tags.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
                {t}
              </Badge>
            ))}
          </div>
        </header>

        <Separator className="my-12" />

        <section className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Role
            </h2>
            <p className="mt-2 text-sm">{c.role}</p>
            <h2 className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Scope
            </h2>
            <p className="mt-2 text-sm">{c.scope}</p>
          </div>

          <div className="md:col-span-8">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Highlights
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {c.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm sm:text-base">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" aria-hidden />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Outcomes
            </h2>
          </div>
          <ul className="flex flex-col gap-4 md:col-span-8">
            {c.outcomes.map((o) => (
              <li key={o} className="border-l-2 border-blue-500 pl-4 text-base sm:text-lg">
                {o}
              </li>
            ))}
          </ul>
        </section>

        <Separator className="my-12" />

        <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Stack
            </h2>
          </div>
          <div className="md:col-span-8">
            <ul className="flex flex-wrap gap-1.5">
              {c.stack.map((s) => (
                <li key={s}>
                  <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
                    {s}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            All work
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-foreground hover:text-blue-500"
          >
            Start a project →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
