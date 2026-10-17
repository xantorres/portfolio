// An empty string sends every CTA to email instead.
const bookingUrl: string = "https://cal.com/xan-torres-1koupw/intro-call";
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
  eyebrow: "Frontend modernization studio",
  headline: "We upgrade old React apps without breaking them.",
  subhead:
    "Stuck on Create React App or an old Webpack setup? Red First moves your React app to Vite in a fixed 10-day sprint: fixed scope, a tested migration and measured results. It starts with a $2,500 audit.",
  cta: "Book a call (20 minutes)",
};

export const steps = {
  headline: "How it works",
  items: [
    { title: "Audit", body: "We find what could break." },
    { title: "Sprint", body: "We fix it in 10 days, at a fixed price." },
    { title: "Handover", body: "You get the code, the checks and the numbers." },
  ],
};

export const problem = {
  headline: "A green build is not a working app",
  intro: "Upgrading an old Webpack or Create React App setup is where things quietly break.",
  bullets: [
    "Builds that pass, then ship a blank page.",
    "Security warnings nobody wants to touch.",
    "Thousands of dependencies nobody can explain.",
    "Slow builds and a slow dev server.",
  ],
};

export const method = {
  eyebrow: "Why Red First",
  headline: "Agent speed. Engineer accountability. Verified results.",
  lead: "Most migrations aim for a green build. We go further.",
  body: "Coding agents accelerate the repetitive work. An engineer reviews the changes. Automated checks catch regressions, and a review built to find faults looks for the failures a successful build can hide.",
  closing: "You get a migration backed by evidence, not just a passing build.",
  pillars: [
    { title: "Agent-powered execution", body: "Agents handle repetitive work. Engineers make the decisions." },
    {
      title: "Red-first verification",
      body: "Every fix starts with a check that fails before the fix and passes after it.",
    },
    { title: "We look for hidden failures", body: "We test what a successful build cannot prove." },
    { title: "Proof you can inspect", body: "See the changes, the checks, and the before-and-after results." },
  ],
};

export const proof = {
  headline: "Proof: a real migration on a public open-source project",
  body: [
    {
      kind: "text",
      text: "We moved the frontend of apache/answer, an Apache Software Foundation project, from Create React App to Vite. The build passed, yet a review built to find faults caught three hidden bugs. The switch to Vite is merged into the project and ships in the v2.0.3-RC1 pre-release: ",
    },
    {
      kind: "link",
      text: "https://github.com/apache/answer/releases/tag/v2.0.3-RC1",
      href: "https://github.com/apache/answer/releases/tag/v2.0.3-RC1",
      external: true,
    },
    {
      kind: "text",
      text: ". Coding agents did the repetitive work and every change was reviewed by hand. Full write-up: ",
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
    "Measured on the original single pull request, before it was split into smaller ones upstream; HMR latency comes from an earlier commit.",
  callout:
    "Two of these numbers are worse on purpose. The first pass quietly dropped the production type check and left out the icon fonts. We put both back and published the slower, heavier numbers. Honest numbers beat flattering, broken ones.",
};

const heroProofMetrics = ["Cold production build", "Dev server time-to-ready", "Dependency count, total"];

export const heroProof = {
  label: "Real result: apache/answer, Create React App to Vite",
  rows: proof.table.rows.filter(([metric]) => heroProofMetrics.includes(metric)),
};

export const audit = {
  headline: "Start with the audit",
  body: "The Modernization Audit is $2,500, delivered inside 3 calendar days. It shows where your frontend could pass the build and still break. The report is yours to keep, whether you migrate with us, with your own team or not at all.",
  deliverablesLabel: "What you get",
  deliverables: ["diagnosis", "baseline metrics", "risk map", "prioritized roadmap", "sprint estimate"],
  credit: "Book a sprint within 30 days and the full audit fee comes off its price.",
  cta: "Book the audit",
  note: "Booking starts with a free 20-minute call to check your stack is a fit.",
};

export const sprint = {
  headline: "After the audit: a fixed-scope migration to Vite",
  doors: [
    {
      name: "Webpack to Vite migration",
      body: "Replace an aging Webpack setup with Vite.",
    },
    {
      name: "Create React App to Vite migration",
      body: "Move off Create React App, now deprecated, to Vite.",
    },
  ],
  details: [
    {
      label: "Every migration includes",
      body: "Config, scripts and compatible plugins moved over, CI updated, tests verified, and a before and after build comparison.",
    },
    {
      label: "Done means",
      body: "The app behaves the same, the checks we agreed on pass, and you have a way to roll back. We measure the gains but never promise a percentage before we know your project.",
    },
    {
      label: "Optional add-ons",
      body: "npm or Yarn to pnpm, ESLint and Prettier to Biome, Jest to Vitest. Scoped in the audit.",
    },
    {
      label: "Coming next",
      body: "JavaScript to TypeScript, and legacy React to modern React. Not on sale yet.",
    },
  ],
  price: "Founding engagement: $7,500. Standard engagement value: $12,500.",
  terms: [
    "50% upfront.",
    "Scope and exclusions agreed in writing.",
    "10 working days.",
    "Complex setups quoted separately.",
  ],
  cta: "Book a call",
  provide:
    "As a founding client you provide repository access, one named contact from day 0, rights to an anonymized case study, and a testimonial if satisfied. Founding pricing covers only the first three engagements booked; after that, every engagement is the standard $12,500.",
};

export const sprintPlan = {
  headline: "The 10-day sprint",
  tableLabel: "Day-by-day plan for the 10-day sprint",
  days: [
    ["0", "Kickoff: access, plus current build and CI numbers"],
    ["1-2", "Map the risks. Plan review call, scope locked."],
    ["3-6", "The work: coding agents make the changes, we review each one"],
    ["7", "Tests and CI pass"],
    ["8", "Before and after numbers, and docs"],
    ["9", "Call to walk you through the pull requests"],
    ["10", "Report, 90-day roadmap, wrap-up call"],
  ] satisfies [day: string, work: string][],
  note: "From day 3, pull requests land in your repository every day. No big merge at the end.",
};

export const measured = {
  headline: "Measured before and after, every sprint",
  measureTitle: "What we measure",
  measure:
    "cold build, warm build, dev server start time, HMR latency, bundle size, CI run time, dependencies and audit findings, test time and pass rate.",
  measureNote:
    "The proof table shows five of the eight: warm builds matched cold ones, and the project had no tests or CI.",
  reportTitle: "What we report",
  report:
    "hours of human review, what the agents did, and every mistake caught before it reached you, including the agents' own.",
  closing: "You see the mistakes, not just the wins.",
};

export const afterSprint = {
  headline: "After the sprint",
  body: "Want help after the sprint? Ask about the monthly modernization retainer once you have your sprint report.",
};

export const about = {
  headline: "About",
  name: "Xan Torres",
  body: "I'm a senior frontend and product engineer with 15+ years of frontend work, mostly React and TypeScript. I move frontends from Create React App and Webpack to Vite. Coding agents do the repetitive work, run through RepoKernel, a tool I built for it, and I review every change myself. I'm based in Cyprus and work remotely.",
};

export const faq = {
  headline: "FAQ",
  items: [
    {
      question: "What if the work turns out bigger than planned?",
      answer:
        "Scope, exclusions and acceptance criteria are agreed in writing at the plan review call on day 1 or 2. Anything bigger becomes a separately scoped follow-on, never a surprise overrun.",
    },
    {
      question: "How do you use coding agents, and who checks their work?",
      answer:
        "Agents do the repetitive work and a person reviews every change. Every fix comes with an automated check that failed before the fix and passes after it.",
    },
    {
      question: "What access do you need?",
      answer: "Repository read and write access, CI visibility, and one named contact.",
    },
    {
      question: "What if you become unavailable mid-sprint?",
      answer:
        "Nothing lives only on my machine: pull requests land in your repository from day 3, and you keep every merged change if the sprint stops.",
    },
    {
      question: "Is my stack a fit?",
      answer:
        "Best fit is a React single-page app in JavaScript or TypeScript on Webpack or Create React App, with a reasonably maintained repository and a reproducible build, at a company with 5 to 50 engineers. Complex server rendering, Module Federation and heavily customized loaders get a separate quote. Not sure? Start with the audit.",
    },
  ],
};

export const finalCta = {
  headline: "Find out what could break before you upgrade",
  cta: "Book a call",
  secondaryLead: "Or email",
  footer: "Red First | redfirst.dev",
};

export const meta = {
  title: "Red First · React and frontend modernization studio",
  description:
    "Red First moves React apps off Webpack or Create React App to Vite without breaking them. It starts with a $2,500 audit, then a fixed-price 10-day sprint.",
};
