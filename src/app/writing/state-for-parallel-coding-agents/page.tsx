import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import { siteUrl } from "@/lib/site-url";
import { posts } from "@/lib/writing";

const post = posts.find((p) => p.slug === "state-for-parallel-coding-agents")!;

type Section = {
  heading?: string;
  paragraphs: string[];
  code?: string;
};

const sections: Section[] = [
  {
    paragraphs: [
      "One coding agent working a repository is a solved problem. The moment I ran two or three in parallel on the same repo, everything broke in the same four ways.",
      "Two agents edited the same file on different branches, and the merge needed me to untangle it. I had four terminal tabs open and no idea which agent was doing what. Two dispatch runs picked up the same task, and one of them threw away hours of work. And agents drift: you hand one a task, it touches files that were never part of it, and you find out while reviewing the PR.",
      "None of this is exotic. It is what any distributed system does when workers share mutable state without coordination. The workers happen to be coding agents now, and the shared state happens to be your repository.",
      "I built RepoKernel to fix it. The part worth writing about is not the tool. It is that every fix turned out to be Git plumbing that has existed for years.",
    ],
  },
  {
    heading: "The repo is the source of truth",
    paragraphs: [
      "The first decision was where coordination state lives. The reflex answer is a service: a daemon that tracks tasks, a database of claims, a dashboard on a port. I did not want the tool that guards my repository to be another process that can crash, drift, or need an update, so I took the opposite constraint: plain files and Git, nothing else. Tasks, sprints, reviews, and claims are files in the repo, versioned with the code they orchestrate.",
      "That constraint forced the three mechanisms below. If state lives in files, then isolation, mutual exclusion, and conflict resolution all have to come from things Git and the filesystem already do.",
    ],
  },
  {
    heading: "One worktree per task",
    paragraphs: [
      "git worktree is old, boring, and exactly right for this. Every task runs in its own worktree, an isolated checkout of the repository on its own branch. Two agents can now edit the same file at the same time without touching each other, because each one works a physically separate copy. Main stays clean until something earns a merge.",
      "Isolation alone does not stop drift, though. An agent inside its own worktree can still wander into files that were never part of the task. So every sprint declares the paths it owns up front, and the diff classifier marks anything committed outside that scope as out of scope, which holds it at the review gate. Not a filesystem lock, a declared boundary with an enforcement point. The agent can technically type anywhere; the work cannot land outside its lane.",
    ],
  },
  {
    heading: "Claims, not checks",
    paragraphs: [
      "The double-claim bug is a textbook race. Dispatch loop A reads the sprint list, sees S-12 unclaimed, and starts it. Loop B did the same read a moment earlier. Both spend an hour on S-12, one merge wins, and the other hour is garbage.",
      "Check-then-act does not work on shared state, so claiming had to become atomic. Claiming a sprint means creating a claim file keyed by the sprint id, and file creation is the atomic primitive: whoever creates claims/<sprint-id>.json first owns the sprint, and the loser gets a clean refusal instead of a wasted hour. There is a retrying lock around the edges, but the principle is the whole fix: turn look-then-take into a single operation that can only succeed once.",
    ],
  },
  {
    heading: "A merge driver for state",
    paragraphs: [
      "The nastiest failure was the state registry itself. RepoKernel keeps a JSON registry of tasks and their statuses inside the repo, which means two concurrent branches both update it, and a textual merge produces conflict markers in the middle of a machine-read JSON file. The orchestrator chokes on its own state, and a human ends up hand-editing JSON, which is exactly the babysitting the tool exists to remove.",
      "Git has had the answer for a long time: a custom merge driver. A .gitattributes line routes merges of that one file through a command instead of the textual algorithm.",
    ],
    code: `# .gitattributes, installed by rk init
.repokernel/registry.json merge=repokernel-registry

# per-clone Git config, also installed by rk init
[merge "repokernel-registry"]
    driver = rk registry-merge-driver --current %A --other %B --base %O`,
  },
  {
    paragraphs: [
      "The driver merges the registry semantically. Entries union by id. When both sides carry the same entry, the more progressed status wins, and ties break lexicographically, so the result is deterministic and order-independent: merging a into b gives the same registry as merging b into a. No conflict markers, no hand-editing, no divergence between two merge orders.",
      "One honest caveat, because it changed how I run the tool. Merge drivers are local configuration. A clone that has not run rk init does not have the driver, and the merge buttons on GitHub and GitLab never execute it, because hosted merges do not run your local Git config. So the deterministic guarantee holds for local merges, and CI validation backstops everything else, catching a registry that a hosted merge let drift.",
    ],
  },
  {
    heading: "The gate",
    paragraphs: [
      "Isolation and claims control how work runs. The gate controls what lands. Nothing merges until the configured check command passes and a review verdict is recorded. A failed check leaves the sprint active rather than merged, so a half-done task stays visibly half-done until I retry it or discard it on purpose.",
      "The same idea shapes how runs stop. A crashed or paused run records a structured halt reason, a specific well-known state, instead of leaving a stack trace to interpret. Resuming means reading state, not doing archaeology on logs.",
    ],
  },
  {
    heading: "What changed, and what I will not claim",
    paragraphs: [
      "My role changed shape. Running agents used to mean babysitting each one; now I define tasks and boundaries, agents execute in parallel, and I review what comes out. The judgment stays mine. The typing does not.",
      "What I will not claim: adoption. I built RepoKernel for my own daily use and published it on npm under MIT, and I am not going to pretend there is a community around it. The harnesses have also been catching up; worktree isolation, for example, has been appearing natively in the platforms since I built mine. The parts that are still distinct are declared path ownership, dependency sequencing between tasks, and the review gate before merge. Watching the platforms move in the direction I built toward reads, to me, as evidence the problem was real.",
      "It is also deliberately narrow, and the wrong tool for plenty of situations. A one-off script, a throwaway prototype, a non-Git workflow, or a team that already gates everything through CI and branch protection does not need this layer, and the README says so.",
      "The memory half of this story, engram, a local-first store that agents share over MCP with consent gates on sensitive facts, deserves its own write-up. The short version of both: agents supply the speed, and Git plumbing keeps the state honest.",
    ],
  },
];

const description = post.dek;

export const metadata: Metadata = {
  title: post.title,
  description,
  alternates: { canonical: `/writing/${post.slug}` },
  openGraph: {
    title: post.title,
    description,
    url: `/writing/${post.slug}`,
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
  mainEntityOfPage: `${siteUrl}/writing/${post.slug}`,
} as const;

export default function PostPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <article className="container-editorial py-12 sm:py-16 lg:py-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
            }}
          />
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            All writing
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

          <div className="mt-14 grid max-w-[68ch] gap-10 border-t border-border pt-10">
            {sections.map((section, index) => (
              <section key={section.heading ?? `section-${index}`} className="grid gap-5">
                {section.heading && (
                  <h2 className="title-type max-w-[32ch]">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="body-measure text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.code && (
                  <pre
                    tabIndex={0}
                    role="region"
                    aria-label="Configuration example"
                    className="whitespace-pre-wrap break-words rounded-[var(--radius-md)] bg-wash p-5 font-mono text-[0.8125rem] leading-relaxed"
                  >
                    <code>{section.code}</code>
                  </pre>
                )}
              </section>
            ))}
          </div>

          <footer className="mt-14 grid max-w-[68ch] gap-3 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">Code and docs:</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <a
                href="https://github.com/xantorres/repokernel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
              >
                xantorres/repokernel
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
              <a
                href="https://www.npmjs.com/package/repokernel"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
              >
                repokernel on npm
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
              <a
                href="https://github.com/xantorres/engram"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
              >
                xantorres/engram
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Case studies
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 transition-colors hover:underline"
              >
                Get in touch
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
