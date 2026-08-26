import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import { posts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Engineering notes from building agent tooling and production frontends.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing",
    description:
      "Engineering notes from building agent tooling and production frontends.",
    url: "/writing",
  },
};

export default function WritingIndex() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="container-editorial section-pad">
          <header className="mb-12 grid gap-4 sm:mb-16">
            <p className="meta-label">Writing</p>
            <h1 className="headline-type max-w-[20ch] text-balance">
              Engineering notes, published as I learn them.
            </h1>
            <p className="meta-label">Agent tooling · Git plumbing · Production frontends</p>
          </header>

          <ul className="border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link
                  href={`/writing/${post.slug}`}
                  className="row-link group -mx-4 grid grid-cols-1 gap-4 px-4 py-10 md:grid-cols-12 md:gap-8"
                >
                  <div className="flex flex-col gap-2 md:col-span-3">
                    <span className="meta-label">{post.date}</span>
                    <span className="meta-label">{post.readingTime}</span>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      Read post
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="title-type max-w-[30ch] text-balance">{post.title}</h2>
                    <p className="body-measure mt-3 text-sm text-muted-foreground sm:text-base">
                      {post.dek}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
