// Empty until the booking page exists; every CTA falls back to email.
const bookingUrl: string = "";
export const contactEmail = "hello@redfirst.dev";
export const ctaHref = bookingUrl || `mailto:${contactEmail}`;

type Segment =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string; external: boolean };

export type TableData = {
  columns: string[];
  rows: string[][];
};

export const hero = {
  eyebrow: "Red First",
  headline: "A green build is not a working app",
  subhead:
    "The costliest migration failures pass the build and ship broken. A $2,500 audit finds where yours could, then a fixed-scope sprint fixes it, every fix behind a check proven to fail first.",
  cta: "Book a call (20 minutes)",
};

export const problem = {
  intro: "Migrating a legacy Webpack or CRA setup is where things quietly break.",
  bullets: [
    "Green builds that ship a blank page.",
    "Security findings nobody wants to touch.",
    "Thousands of dependencies, mostly unexplained.",
    "Slow cold builds and dev server restarts.",
  ],
};

export const proof = {
  headline: "The proof: a live migration on a public repository",
  body: [
    {
      kind: "text",
      text: "We migrated the frontend of apache/answer, an Apache Software Foundation project, from Create React App to Vite; an adversarial review found three silent failures behind a green build. The Vite cutover is merged upstream and ships in the v2.0.3-RC1 pre-release: ",
    },
    {
      kind: "link",
      text: "https://github.com/apache/answer/releases/tag/v2.0.3-RC1",
      href: "https://github.com/apache/answer/releases/tag/v2.0.3-RC1",
      external: true,
    },
    {
      kind: "text",
      text: ". Coding agents did the mechanical work and every change was reviewed by hand. Full method and findings: ",
    },
    {
      kind: "link",
      text: "https://redfirst.dev/writing/three-silent-failures",
      href: "/writing/three-silent-failures",
      external: false,
    },
    { kind: "text", text: "." },
  ] satisfies Segment[],
  video: {
    src: "/red-first/apache-answer.mp4",
    poster: "/red-first/apache-answer-poster.jpg",
    captions: "/red-first/apache-answer.vtt",
    label: "Video: three silent failures a green build hid in the apache/answer migration",
  },
  tableLabel: "Before and after metrics for the apache/answer migration",
  table: {
    columns: ["Metric", "Before", "After", "Change"],
    rows: [
      ["Cold production build", "19.87s", "4.77s", "-76.0%"],
      ["Dev server time-to-ready", "7104ms", "359ms", "-94.9%"],
      ["HMR latency (edit to re-render)", "421ms", "139ms", "-67.0%"],
      ["Bundle size, total gzip (sourcemaps excluded)", "1652.24KB", "1474.34KB", "-10.8%"],
      ["Dependency count, total", "1578", "689", "-56.3%"],
      ["Audit findings (critical/high/moderate/low)", "4/78/63/13", "1/50/38/6", "down across all four"],
    ],
  } satisfies TableData,
  footnote:
    "Measured on the original single-PR branch before the upstream split; HMR latency is carried forward from an earlier commit.",
  callout:
    "Two of these numbers are worse on purpose. We restored the production type check the first migration pass dropped, and put back the icon fonts it silently left out, then published the slower, heavier numbers. We would rather ship honest numbers than flattering, broken ones.",
};

const heroProofMetrics = ["Cold production build", "Dev server time-to-ready", "Dependency count, total"];

export const heroProof = {
  label: "apache/answer",
  rows: proof.table.rows.filter(([metric]) => heroProofMetrics.includes(metric)),
};

export const audit = {
  headline: "Start with the audit",
  body: "The Modernization Audit is $2,500, capped at 8 hours, delivered inside 3 calendar days. It shows where your frontend could pass the build and still break.",
  deliverablesLabel: "Deliverables",
  deliverables: ["diagnosis", "baseline metrics", "risk map", "prioritized roadmap", "sprint estimate"],
  credit: "100% of the audit fee credits against a sprint booked within 30 days.",
  cta: "Book the audit",
  note: "Booking starts with a 20-minute call to check stack fit.",
};

export const sprint = {
  headline: "After the audit: pick one door. Ten days. Fixed scope.",
  doors: ["Webpack/CRA to Vite migration", "React architecture rescue", "Agent-ready repository setup"],
  price: "Founding engagement: $7,500. Standard engagement value: $12,500.",
  terms: ["50% upfront.", "Scope cap of 24 to 30 hours.", "10 working days."],
  cta: "Book a call",
  provide:
    "As a founding client you provide repository access, one named person from day 0, rights to an anonymized case study, and a testimonial if satisfied. Founding pricing is capped to the first two engagements booked; every engagement after that runs at the standard $12,500.",
};

export const sprintPlan = {
  headline: "The 10-day sprint",
  tableLabel: "Day-by-day plan for the 10-day sprint",
  days: [
    ["0", "Kickoff: access, CI baseline, metric capture"],
    ["1-2", "Audit and risk map. Plan review call, scope locked."],
    ["3-6", "Execution: agent fleet in worktrees"],
    ["7", "Tests and CI green"],
    ["8", "Benchmarks and docs"],
    ["9", "PR walkthrough call"],
    ["10", "Report, 90-day roadmap, retro call"],
  ] satisfies [day: string, work: string][],
  note: "Pull requests land daily from day 3. No big-bang merge at the end.",
};

export const measured = {
  headline: "Measured before and after, every sprint",
  measureTitle: "What we measure",
  measure:
    "cold build, warm build, dev server time-to-ready, HMR latency, bundle size, CI wall time, dependencies and audit findings, test suite time and pass rate.",
  measureNote:
    "The proof table shows five of the eight; warm build equals cold within noise, and the repository had no tests or CI.",
  reportTitle: "What we report",
  report:
    "human review hours, what the agents did, and every mistake caught before it reached you, the agents' own included.",
  closing: "You see the mistakes, not just the wins.",
};

export const afterSprint = {
  headline: "After the sprint",
  body: "Ask about the ongoing modernization retainer once your sprint report is in hand.",
};

export const about = {
  headline: "About",
  name: "Xan Torres",
  body: "I'm a senior frontend and product engineer with 15+ years of frontend work, mostly React and TypeScript. I move frontends from CRA and Webpack to Vite, using coding agents through RepoKernel and its review gate, and I review every change myself. I'm based in Cyprus and work remotely.",
};

export const faq = {
  headline: "FAQ",
  items: [
    {
      question: "What happens if the work exceeds the scope cap?",
      answer:
        "The 24 to 30 hour cap is set at the day 1 to 2 plan review call; anything larger becomes a separately scoped follow-on, never a silent overrun.",
    },
    {
      question: "How are agents used, and who checks their work?",
      answer:
        "Agents do the mechanical work. Every change is human-reviewed, and every fix lands behind a check proven to fail first.",
    },
    {
      question: "What access do you need?",
      answer: "Repository read and write access, CI visibility, and one named contact.",
    },
    {
      question: "What happens if you are unavailable mid-sprint?",
      answer:
        "Nothing sits only on my machine: you see pull requests in your repository from day 3 and keep every merged change if the sprint halts.",
    },
    {
      question: "Is my stack a fit?",
      answer:
        "Best fit is React and TypeScript on Webpack or CRA, at a company running 5 to 50 engineers. Not sure? Start with the audit.",
    },
  ],
};

export const finalCta = {
  headline: "Want to know what your build is hiding?",
  cta: "Book a call",
  secondaryLead: "Or email",
  footer: "Red First | redfirst.dev",
};
