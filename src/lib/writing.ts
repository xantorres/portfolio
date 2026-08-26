export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string; // human-readable, e.g. "August 26, 2026"
  datetime: string; // ISO date for metadata and JSON-LD
  readingTime: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "state-for-parallel-coding-agents",
    title: "State for parallel coding agents",
    dek: "Two coding agents in one repository fail in predictable ways. The fixes are old Git plumbing: worktrees, atomic claims, and a merge driver.",
    date: "August 26, 2026",
    datetime: "2026-08-26",
    readingTime: "5 min read",
    tags: ["AI agents", "Git", "Developer tools"],
  },
];
