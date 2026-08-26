import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Nav } from "@/components/nav";
import { ProofPlate } from "@/components/proof-plate";
import { SiteFooter } from "@/components/footer";
import { cases } from "@/lib/data";

type Params = { slug: string };

export const dynamicParams = false;
// Daily ISR keeps any data-driven copy (year counts, quarter labels) accurate.
export const revalidate = 86_400;

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
  const path = `/work/${c.slug}`;
  const title = `${c.company} · ${c.title}`;
  return {
    title,
    description: c.summary,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: c.summary,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: c.summary,
    },
  };
}

export default async function WorkDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <Nav />
      <main id="main-content">
        <article className="container-editorial py-12 sm:py-16 lg:py-20">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            Back to work
          </Link>

          <header className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <span className="meta-label text-foreground">{c.company}</span>
                <span className="meta-label">{c.sector}</span>
                <span className="meta-label">{c.period}</span>
                {(
                  c.links ??
                  (c.url
                    ? [{ label: new URL(c.url).hostname.replace(/^www\./, ""), href: c.url }]
                    : [])
                ).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="meta-label inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden className="size-3" />
                  </a>
                ))}
              </div>

              <h1 className="headline-type mt-6 max-w-[20ch] text-balance">
                {c.headline}
              </h1>

              <p className="mt-8 body-measure text-base text-muted-foreground sm:text-lg">
                {c.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <ProofPlate caseStudy={c} />
            </div>
          </header>

          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="grid gap-8 lg:sticky lg:top-24">
                <div>
                  <h2 className="meta-label">Role</h2>
                  <p className="mt-2 text-sm">{c.role}</p>
                </div>
                <div>
                  <h2 className="meta-label">Scope</h2>
                  <p className="mt-2 text-sm">{c.scope}</p>
                </div>
                <div>
                  <h2 className="meta-label">Problem</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.problem}</p>
                </div>
              </div>
            </aside>

            <div className="grid gap-14 lg:col-span-8">
              <section>
                <h2 className="meta-label">What changed</h2>
                <p className="mt-4 max-w-[62ch] text-xl font-medium leading-snug sm:text-2xl">
                  {c.systemMove}
                </p>
              </section>

              <section>
                <h2 className="meta-label">Why it matters</h2>
                <p className="mt-4 body-measure text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {c.whyItMatters}
                </p>
              </section>

              <section>
                <h2 className="meta-label">Readouts</h2>
                <dl className="mt-5 grid gap-8 sm:grid-cols-3">
                  {c.featuredMetrics.map((metric) => (
                    <div key={metric.label} className="min-w-0">
                      <dt className="meta-label">{metric.label}</dt>
                      <dd className="mt-3 break-words text-3xl font-medium leading-none tracking-[-0.018em]">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section>
                <h2 className="meta-label">Highlights</h2>
                <ul className="mt-5 grid gap-4">
                  {c.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[1.25rem_1fr] gap-4 text-sm leading-relaxed sm:text-base">
                      <span className="mt-3 h-px bg-border-strong" aria-hidden />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="meta-label">Outcomes</h2>
                <ul className="mt-5 grid gap-4">
                  {c.outcomes.map((o) => (
                    <li key={o} className="border-l border-border-strong pl-4 text-base leading-relaxed sm:text-lg">
                      {o}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="meta-label">Stack</h2>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <li key={s}>
                      <Badge variant="outline">{s}</Badge>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              All work
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 transition-colors hover:underline"
            >
              Get in touch
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
