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
    slug: "three-silent-failures",
    title: "Three Silent Failures a Green Build Hid: apache/answer, CRA to Vite",
    dek: "Migrating apache/answer from Create React App to Vite went green early. Three silent failures shipped anyway, and the honest numbers came out worse than the first ones.",
    date: "October 17, 2026",
    datetime: "2026-10-17",
    readingTime: "15 min read",
    tags: ["Migration", "Vite", "React"],
  },
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
