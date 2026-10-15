import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RedFirstFooter } from "@/components/red-first/footer";
import { RedFirstHeader } from "@/components/red-first/header";
import { siteUrl, studioUrl } from "@/lib/site-url";
import { posts } from "@/lib/writing";

const post = posts.find((p) => p.slug === "three-silent-failures")!;

const source = readFileSync(join(process.cwd(), "src/content/three-silent-failures.md"), "utf8");

const postUrl = `${studioUrl}/writing/${post.slug}`;
const description = post.dek;

export const metadata: Metadata = {
  title: { absolute: `${post.title} · Red First` },
  description,
  alternates: { canonical: postUrl },
  openGraph: {
    title: post.title,
    description,
    url: postUrl,
    type: "article",
    publishedTime: post.datetime,
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description,
  datePublished: post.datetime,
  author: { "@type": "Person", name: "Xan Torres", url: siteUrl },
  mainEntityOfPage: postUrl,
} as const;

const linkClass =
  "text-foreground underline underline-offset-4 [overflow-wrap:anywhere] hover:decoration-2";

const components: Components = {
  h1: () => null,
  h2: ({ children }) => (
    <h2 className="title-type mt-8 max-w-[32ch] first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-3 max-w-[40ch] font-display text-base font-semibold leading-snug tracking-[-0.01em]">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="body-measure text-base leading-relaxed">{children}</p>,
  ul: ({ children }) => (
    <ul className="body-measure list-disc space-y-3 pl-5 text-base leading-relaxed">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="body-measure list-decimal space-y-3 pl-5 text-base leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  hr: () => null,
  table: ({ children }) => (
    <div
      tabIndex={0}
      role="region"
      aria-label="The numbers"
      className="overflow-x-auto rounded-[var(--radius-xs)]"
    >
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm tabular-nums">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th
      scope="col"
      className="border-b border-border-strong px-3 py-2 align-bottom font-medium text-foreground"
    >
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-b border-border px-3 py-2 align-top">{children}</td>,
  code: ({ children }) => (
    <code className="rounded-[var(--radius-xs)] bg-wash px-1.5 py-0.5 font-mono text-[0.875em] [overflow-wrap:anywhere]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre
      tabIndex={0}
      role="region"
      aria-label="Code example"
      className="whitespace-pre-wrap break-words rounded-[var(--radius-md)] bg-wash p-5 font-mono text-[0.8125rem] leading-relaxed [&>code]:rounded-none [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em]"
    >
      {children}
    </pre>
  ),
  a: ({ href, children }) => {
    if (href && /^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener" className={linkClass}>
          {children}
        </a>
      );
    }
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={linkClass}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={linkClass}>
        {children}
      </a>
    );
  },
};

export default function PostPage() {
  return (
    <>
      <RedFirstHeader sectionBase="/modernize" />
      <main id="main-content">
        <article className="container-editorial py-12 sm:py-16 lg:py-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
            }}
          />
          <Link
            href="/modernize"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            Red First
          </Link>

          <header className="mt-10 max-w-[68ch]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="meta-label text-foreground">{post.date}</span>
              <span className="meta-label">{post.readingTime}</span>
              <span className="meta-label">{post.tags.join(" · ")}</span>
            </div>
            <h1 className="headline-type mt-6 max-w-[24ch] text-balance">{post.title}</h1>
            <p className="body-measure mt-6 text-base text-muted-foreground sm:text-lg">
              {post.dek}
            </p>
          </header>

          <div className="mt-14 flex max-w-[68ch] flex-col gap-5 border-t border-border pt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {source}
            </ReactMarkdown>
          </div>

          <footer className="mt-14 flex max-w-[68ch] items-center justify-between gap-6 border-t border-border pt-8">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              All writing
            </Link>
            <Link
              href="/modernize"
              className="inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 transition-colors hover:underline"
            >
              Work with Red First
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </footer>
        </article>
      </main>
      <RedFirstFooter sectionBase="/modernize" />
    </>
  );
}
