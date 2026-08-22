export type CaseStat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  company: string;
  url?: string; // live product or company site; omitted for anonymized engagements
  role: string;
  period: string;
  sector: string;
  scope: string;
  title: string; // short punchy label on the home card (≤7 words)
  headline: string; // long headline shown on the detail page
  summary: string;
  whyItMatters: string;
  problem: string;
  systemMove: string;
  artifact: string;
  timeline: string[];
  proofTheme: "blueprint" | "signal" | "oxide" | "circuit";
  featuredMetrics: CaseStat[];
  highlights: string[];
  outcomes: string[];
  tags: string[];
  stack: string[];
};

// First professional role: 2010-12-09 (IGM / Hotusa Group), stored as UTC.
const CAREER_START = new Date("2010-12-09T00:00:00Z");

export function yearsOfExperience(date = new Date()): number {
  const years = date.getUTCFullYear() - CAREER_START.getUTCFullYear();
  const hasHadAnniversary =
    date.getUTCMonth() > CAREER_START.getUTCMonth() ||
    (date.getUTCMonth() === CAREER_START.getUTCMonth() &&
      date.getUTCDate() >= CAREER_START.getUTCDate());
  return hasHadAnniversary ? years : years - 1;
}

export function getSubhead(): string {
  return "I take product work end to end: system design, deep React and TypeScript, enough backend to close the feature, and AI shipped under human review. Design-system work on mongodb.com, and RepoKernel, my agent orchestrator, on npm.";
}

export const profile = {
  name: "Xan Torres",
  tagline: "Senior Product",
  accentWord: "Engineer",
  location: "Cyprus (EU) · Remote · CET/EET",
  availability: {
    short: "Available",
    long: "Booking new engagements",
  },
  business: {
    legalName: "EdgeCoding LTD",
    country: "Cyprus",
  },
  email: "xan.torres@gmail.com",
  links: {
    github: "https://github.com/xantorres",
    linkedin: "https://linkedin.com/in/xan-torres",
    toptal: "https://www.toptal.com/developers/resume/xan-torres#XM6Epk",
  },};

export const socialTitle = "Xan Torres · Senior Product Engineer (React/TypeScript)";
export const socialDescription =
  "Senior product engineer. React and TypeScript depth, full-stack delivery, and AI shipped in production for dev-tools, AI-product, and B2B teams.";

type HeroCta = { label: string; href: string };

export const hero = {
  eyebrow: "React · TypeScript · Next.js · End to end",
  headline: "Senior product engineer. AI-native products and agentic workflows.",
  primaryCta: { label: "View case studies", href: "/#work" } satisfies HeroCta,
  secondaryCta: { label: "Get in touch", href: "/#contact" } satisfies HeroCta,
  clientsLabel: "Shipped for",
  clients: ["MongoDB", "Platform9", "FeatherShark", "Sunflower Games"],
};

export function heroProofStrip(date = new Date()): string[] {
  return [
    `${yearsOfExperience(date)}+ years shipping production software`,
    "Toptal Verified Expert since 2017",
    profile.location,
  ];
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

export function currentQuarter(date = new Date()): string {
  const quarter = Math.floor(date.getUTCMonth() / 3) + 1;
  return `Q${quarter} ${date.getUTCFullYear()}`;
}

export const cases: CaseStudy[] = [
  {
    slug: "repokernel",
    company: "RepoKernel",
    url: "https://www.npmjs.com/package/repokernel",
    role: "Creator & Maintainer",
    period: "2026 – Present",
    sector: "Developer Tools · AI Agent Orchestration",
    scope: "Solo, open source, in daily use",
    title: "State layer that keeps agents honest.",
    headline:
      "Built the state layer that stops coding agents from losing repo state and double-claiming work.",
    summary:
      "I built RepoKernel after watching coding agents lose track of what they were doing mid-task: forgetting state between runs, asking me what to do next instead of reading it off the repo, and occasionally claiming the same unit of work twice when I ran more than one in parallel. It runs every agent task in its own Git worktree, locks it to a declared file scope, sequences work by dependency, and blocks the merge until a review verdict and a configured check command both pass. No daemon, no database, no cloud service: the repo is the source of truth.",
    whyItMatters:
      "It's a real state machine (task, sprint, epic; queue, lane; review, gate), a Git merge driver that resolves concurrent state edits deterministically instead of leaving conflict markers, and atomic per-sprint claims that stop two dispatch loops from grabbing the same work. I run my own multi-agent sprints through it, and every failure mode it handles is one I hit first.",
    problem:
      "Coding agents share a repo but not a memory. Left alone they lose track of state between tasks, ask what to do next instead of reading it off the repo, edit outside their intended scope, and can double-claim the same unit of work when more than one runs in parallel.",
    systemMove:
      "Pulled worktree isolation, atomic sprint claims, and a merge-safe state registry into one CLI that gates every merge on a recorded review and a passing check command.",
    artifact: "State layer + CLI",
    timeline: [
      "Worktree isolation per task",
      "Atomic sprint claims",
      "Merge-safe state registry",
      "Tracker and PR bridges",
    ],
    proofTheme: "blueprint",
    featuredMetrics: [
      { value: "v1.33.x", label: "current release, published on npm" },
      { value: "7 verbs", label: "the whole task lifecycle, CLI-only state writes" },
      { value: "4 bridges", label: "Linear, Jira, GitHub Issues, GitHub PRs" },
    ],
    highlights: [
      "Defined a small vocabulary (task to sprint to epic, queue to lane, review to gate) and a seven-verb lifecycle so an agent reads and writes state through the CLI instead of inferring it from markdown tables. A bundled hook intercepts any tool call that targets state files directly and denies it, routing the agent back through the CLI verbs.",
      "Every task runs in its own Git worktree, locked to the file paths declared in its sprint. Parallel agents never collide on files, branches, or commits, and main stays clean until something actually merges.",
      "Wrote a custom Git merge driver that unions the state registry by id instead of leaving JSON conflict markers: merging a then b produces the same result as merging b then a, and the more-progressed status wins. The guarantee only holds for merges run locally on a clone with the driver installed; GitHub's and GitLab's web merge buttons don't execute it, so I still run validation in CI to catch anything a hosted merge might let drift.",
      "Gated concurrent dispatch with an atomic per-sprint claim, a lock file per sprint id, so two dispatch loops can never both pick up the same sprint. That, plus the merge driver, are the two fixes for the failure modes I actually hit running agents in parallel.",
      "Nothing reaches main without a recorded human review verdict and a passing check command. A failed check leaves the sprint active, not merged, so I retry it or discard it on purpose instead of it landing half-done.",
      "Modeled stopped runs as a structured halt reason instead of a stack trace, so resuming a crashed or paused run means reading a specific, well-known state rather than guessing from logs.",
      "Added tracker and PR bridges (Linear, Jira, GitHub Issues, GitHub PRs) as explicit, adapter-gated writes, not silent auto-sync: pulling a ticket into an epic never writes back, and every comment or transition is a command I run on purpose.",
      "Built a local, user-owned trust file so a repo's own config can declare it wants to run a check command or an agent, but nothing executes on my machine until I grant it there myself. Default is closed.",
    ],
    outcomes: [
      "Open source under MIT, published on npm as repokernel, currently at v1.33.x.",
      "The state model holds up under real parallel dispatch: worktrees, atomic claims, and a merge-safe registry that survives concurrent branches without me hand-editing JSON.",
      "It's deliberately narrow. For a one-off script, a throwaway prototype, a non-Git workflow, or a team that already gates on CI and branch protection, RepoKernel is overhead you don't need, and the README says so.",
      "Schema and CLI are still evolving between releases, so anyone embedding it in CI should pin a version instead of tracking latest.",
    ],
    tags: ["AI agent orchestration", "Git worktrees", "State machines", "Developer tools"],
    stack: [
      "TypeScript",
      "Node.js",
      "Git worktrees",
      "Commander.js",
      "Zod",
      "execa",
      "pnpm workspaces",
      "GitHub Actions",
      "Vitest",
      "npm",
    ],
  },
  {
    slug: "diagnostics-platform",
    company: "Diagnostics platform",
    role: "Senior Product Engineer",
    period: "2025 – Present",
    sector: "Animal-health diagnostics · Enterprise SaaS",
    scope: "Ongoing · Shared platform libraries",
    title: "Cross-microfrontend style leaks, eliminated.",
    headline:
      "Removed cross-microfrontend style leaks and made one schema the contract between services.",
    summary:
      "A global animal-health diagnostics platform runs its web surface as independently deployed microfrontends composed at runtime. I work on the shared layer: the React component library those teams build on, a two-layer CSS isolation system that stops one microfrontend's styles from reaching another, and a templating monorepo I scaffolded from zero where Zod schemas emit JSON Schema as the contract between services.",
    whyItMatters:
      "Platform work at enterprise scale, where one change to a shared package reaches every team at once. The isolation system removed a recurring failure mode instead of patching instances of it, and the schema layer replaced hand-kept API assumptions with a generated contract both sides validate against.",
    problem:
      "Independently deployed microfrontends shared one page, so one team's CSS could reach another team's UI, and services kept re-describing the same payload shapes by hand.",
    systemMove:
      "Made isolation and contracts structural: prefixed selectors plus design-token variables at two layers, and Zod schemas that emit the JSON Schema both services validate against.",
    artifact: "Isolation + contracts",
    timeline: [
      "Two-layer style isolation",
      "Schema contracts across services",
      "Dual-runtime email renderer",
      "Changesets release pipeline",
    ],
    proofTheme: "circuit",
    featuredMetrics: [
      { value: "108+", label: "commits to the shared component library" },
      { value: "2 layers", label: "prefixed selectors plus token variables, isolation by construction" },
      { value: "0", label: "cross-microfrontend style leaks after the isolation rollout" },
    ],
    highlights: [
      "Built a two-layer CSS isolation system: postcss-prefix-selector scoping every rule a microfrontend emits, plus design-token CSS variables so themes resolve per host instead of leaking globally. Style bleed stopped being a recurring bug and became a property of the build.",
      "Scaffolded a templating monorepo from zero on pnpm workspaces, with Zod 4 schemas emitting JSON Schema, so the payload a service sends and the shape the renderer expects are one generated artifact instead of two hand-written assumptions.",
      "Built a dual-runtime email renderer: one React component tree and a Handlebars build that run identically in Node and in the browser, so the preview a reviewer approves is the output the service actually sends.",
      "Wired Changesets into CI so shared packages version and publish on merge, and every consuming team upgrades against a changelog instead of a message in chat.",
      "Contributed 108+ commits to the shared React component library that product teams render. Library-first: add a prop, do not fork the component.",
    ],
    outcomes: [
      "Cross-microfrontend style leaks stopped being a class of bug. Isolation is enforced by the build, not by a review checklist.",
      "Two services validate against the same generated JSON Schema, so a payload change breaks CI instead of production.",
      "Shared packages version and publish on merge, and consuming teams upgrade against a readable changelog.",
      "The shared library grew by props rather than forks across multiple product teams.",
    ],
    tags: ["Module Federation", "Design system", "Schema contracts", "Monorepo"],
    stack: [
      "React",
      "TypeScript",
      "Module Federation",
      "pnpm workspaces",
      "Zod 4",
      "JSON Schema",
      "Handlebars",
      "PostCSS",
      "Changesets",
      "Node.js",
    ],
  },
  {
    slug: "sunflower-games",
    company: "Sunflower Games",
    url: "https://crowncoinscasino.com/",
    role: "Senior Full-Stack Engineer",
    period: "2025 – 2026",
    sector: "Social Casino",
    scope: "7 months · concurrent engagement",
    title: "Roulette mini-game, missions, and ops tooling.",
    headline:
      "Built a roulette mini-game and ops tooling across game UI, admin, and Node services.",
    summary:
      "I worked across a live dual-currency social-casino product: NestJS services, Prisma migrations, React admin dashboards, and a Rive-driven game surface. The work ranged from a full roulette mini-game and mission system to bulk imports, jackpot sharing, free-rounds, and i18n.",
    whyItMatters:
      "Full-stack ownership under a live economy. I shipped across admin UI, gameplay UI, NestJS services, validation, and cache invalidation, on features where a wrong number costs real money.",
    problem:
      "Ops and gameplay teams needed better tools while a live dual-currency economy kept moving underneath them.",
    systemMove:
      "Pulled validation, services, animation identity, and cache invalidation into the same delivery path.",
    artifact:
      "Game and ops map",
    timeline: ["Roulette mini-game", "Missions system", "Bulk import pipeline", "Free-rounds wallet path"],
    proofTheme: "signal",
    featuredMetrics: [
      { value: "294", label: "commits across four repos in seven months" },
      { value: "3", label: "architecture iterations before the chip-identity model held" },
      { value: "4 repos", label: "admin, game UI, and two Node services in one delivery path" },
    ],
    highlights: [
      "Built a full-featured roulette mini-game from scratch: drag-and-drop chip placement, Rive state-machine animation, and a chip-identity model that stopped merge/split jitter.",
      "Shipped missions across backend CRUD, admin UI, nested rewards, goals, conditions, and post-creation locks on economy-critical identifiers.",
      "Built a spreadsheet import flow for ops with schema checks, business rules, asset-ratio validation, currency validation, and per-row errors mapped back to the source cells.",
      "Added jackpot image generation and social sharing with the Web Share API, clipboard fallback, Redis TTL based on amount, and locale-aware currency formatting.",
      "Wired free-rounds from wallet API through mission-start cache invalidation to the UI, including auto-play support and an explicit state model.",
      "Built assignment management with server-side overlap checks and conflict detection, keeping the authoritative date on the server.",
      "Added AWS SSO shell helpers and database utilities the team kept using after the feature work was done.",
    ],
    outcomes: [
      "Delivered missions, roulette, free-rounds, jackpot sharing, and the bulk-import flow across admin, game UI, and backend services.",
      "It took three architecture iterations for chip identity to hold: the final unique-ID model survived merges, splits, and undo without jitter.",
      "Bulk import replaced a manual one-by-one configuration workflow with validated batch upload, checked on both client and server.",
    ],
    tags: ["Full-stack", "Real-time UI", "State machines"],
    stack: [
      "TypeScript",
      "React 18",
      "Vite",
      "TanStack Query",
      "NestJS",
      "Prisma",
      "Sequelize",
      "PostgreSQL",
      "Redis",
      "Rive",
      "AWS",
      "Turborepo",
    ],
  },
  {
    slug: "feathershark-fireops",
    company: "FeatherShark",
    url: "https://www.feathershark.com/codefinal-fire-inspection-software/",
    role: "Senior Frontend Engineer (Primary)",
    period: "2023 – 2024",
    sector: "Govtech · Multi-tenant SaaS",
    scope: "20 months · 2-person team",
    title: "Live govtech migration, no release gaps.",
    headline:
      "Migrated a live govtech SaaS while fire departments kept using it.",
    summary:
      "FeatherShark was a two-person product used by US municipal fire departments and building-inspection offices. I owned the frontend while moving the app from CRA/JavaScript to Vite/TypeScript, replacing ad-hoc fetching with RTK Query, and shipping new modules for maps, tenant config, 2FA, guided inspection drafting, and contractor workflows.",
    whyItMatters:
      "For 20 months I was the sole frontend engineer on a two-person product team: multiple stack migrations and weekly releases to municipal fire departments that never stopped shipping.",
    problem:
      "The app needed a new frontend foundation, but municipal users depended on weekly releases that could not pause.",
    systemMove:
      "Moved one layer at a time: runtime, language, data fetching, forms, maps, auth, and tenant configuration.",
    artifact:
      "Migration plan",
    timeline: ["CRA to Vite", "JS to TypeScript", "Ad-hoc fetch to RTK Query", "Runtime tenant settings"],
    proofTheme: "oxide",
    featuredMetrics: [
      { value: "5", label: "migrations on a live product: runtime, language, data, forms, tooling" },
      { value: "456", label: "commits as sole frontend owner over 20 months" },
      { value: "0", label: "release gaps across all five migrations" },
    ],
    highlights: [
      "Moved the whole frontend off JavaScript on CRA onto TypeScript on Vite without blocking a release. Leaned on the allowJs flag to convert module by module, starting with forms and data hooks where types kept catching real bugs.",
      "Replaced hand-rolled fetch hooks with RTK Query. Tag-based cache invalidation removed a long tail of stale-data bugs and loading states that disagreed with each other.",
      "Made Zod schemas the shared contract for forms and API edges. The same schema drove validation, component state, and DTO typing through react-hook-form.",
      "Built autocomplete across server records, ArcGIS suggestions, and tenant-defined locations. Each source could fail without killing the typeahead.",
      "Shipped ArcGIS occupancy maps with drag-and-drop safety markers, persistent zoom and pan, and staged marker updates that stopped flicker during edits.",
      "Modeled 2FA as an explicit state machine: credentials submitted, awaiting code, hydrating session, recovery code, and refresh mid-flow all had named transitions.",
      "Moved tenant config from build-time .env to a server-driven settings endpoint for theme tokens, default map coordinates, and admin UI shape. New municipalities no longer required a redeploy.",
      "Built AI-assisted inspection drafting in 2023: backoff, deterministic fallback, editable output, and human review before save.",
      "Built the checklist-template admin: drag-and-drop sections and items, fee-type fields, and cascading deletes for the authoring surface the product depends on.",
      "Built the contractor portal as its own routing tree with role-scoped permit lists, activities, invoices, and document uploads.",
    ],
    outcomes: [
      "For 20 months I was the sole frontend engineer on a two-engineer team. All five migrations shipped without creating a deploy gap.",
      "Frontend stopped being the scary part of the roadmap. Feature work and migration work moved together instead of competing.",
      "New municipalities could be configured by settings instead of redeploying.",
      "The platform was live with US municipal fire departments and building-inspection offices before my engagement ended.",
    ],
    tags: ["Multi-tenant", "Maps", "State machines", "AI-assisted drafting"],
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Redux Toolkit",
      "RTK Query",
      "react-hook-form",
      "Zod",
      "ArcGIS Maps SDK",
      "MUI",
      "MUI DataGrid Pro",
      "Mobiscroll",
      "OpenAI API",
      "Biome",
      "Yarn 4 PnP",
    ],
  },
  {
    slug: "mongodb-web-platform",
    company: "MongoDB",
    url: "https://www.mongodb.com/",
    role: "Senior Frontend Engineer",
    period: "2023 – 2024",
    sector: "Developer Platform",
    scope: "18 months · concurrent engagement",
    title: "Design-system fixes on mongodb.com.",
    headline:
      "Improved mongodb.com component libraries without breaking downstream teams.",
    summary:
      "At MongoDB I worked on the shared packages behind mongodb.com: design tokens, component library code, and navigation. The work was mostly semver-safe API changes, release sequencing, performance fixes, and debugging style precedence in a Tailwind + theme-ui stack.",
    whyItMatters:
      "Design-system change at mongodb.com traffic levels: semver-safe API evolution, releases sequenced across three package layers, a Pardot-to-Eloqua migration across hundreds of marketing forms with zero production incidents, and performance work measured in Core Web Vitals.",
    problem:
      "High-traffic marketing pages needed library improvements, but dozens of consumers depended on those packages.",
    systemMove:
      "Kept changes semver-safe, sequenced package releases, and made style-precedence fixes local instead of global.",
    artifact:
      "Release plan",
    timeline: ["Token layer", "Component API", "Navigation package", "Consumer rollout"],
    proofTheme: "circuit",
    featuredMetrics: [
      { value: "2 lines", label: "the fetchPriority change that moved LCP on the top landing pages" },
      { value: "0", label: "incidents migrating hundreds of marketing forms" },
      { value: "3", label: "package layers released in sequence, no consumer broke" },
    ],
    highlights: [
      "Built a multi-promo announcement bar across tokens, component library code, and the shared navigation package: a three-month cross-repo epic whose release chain shipped without breaking consumers.",
      "Set fetchPriority=\"high\" on hero images across high-traffic landing pages: two lines, with the LCP movement showing up in Core Web Vitals.",
      "Worked through the Pardot-to-Eloqua migration across hundreds of marketing forms with zero production incidents: field mapping, post-submit rich text, and defensive handling for incomplete CMS payloads.",
      "Revamped card grids with variant sizing, hover treatments, inverse-theme fixes, and graceful deprecation of legacy props.",
      "Introduced a scoped override pattern for style-precedence bugs in the Tailwind + theme-ui stack, then documented it as a team practice.",
      "Unified image, video, and embed handling behind one media component API so rich-text JSON embeds had a single path.",
      "Hardened components against CMS drift with null checks and type exports, avoiding build failures when payloads were incomplete.",
    ],
    outcomes: [
      "Contributed across design tokens, high-level components, and shared navigation with semver discipline and snapshot-test coordination.",
      "Improved Core Web Vitals on mongodb.com landing pages.",
      "Migrated hundreds of marketing forms from Pardot to Eloqua with zero production incidents.",
      "Shipped the multi-promo banner without breaking downstream consumers.",
    ],
    tags: ["Design system", "Performance", "Semver"],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "theme-ui",
      "Jest",
      "React Testing Library",
      "Storybook",
      "Contentstack",
      "API Extractor",
    ],
  },
  {
    slug: "platform9-console",
    company: "Platform9",
    url: "https://platform9.com/",
    role: "Senior Frontend Engineer",
    period: "2018 – 2023",
    sector: "Private Cloud · SaaS",
    scope: "4+ years",
    title: "Shared UI for a private-cloud console.",
    headline:
      "Built reusable UI components and a cached Redux store for a private-cloud console.",
    summary:
      "Platform9 runs a private-cloud platform for managing Kubernetes and OpenStack. Over four years I built reusable UI for the console: a data grid with sort, filter, and pagination, and a multi-select dropdown among them. I added a Redux store that cached server data and persisted it across refreshes, fed components through Reselect selectors, and moved the build from Webpack to Vite while keeping Storybook and Jest as the baseline.",
    whyItMatters:
      "Four years on one product is its own signal. The grid, dropdown, and cached store I built became the building blocks the console's React surfaces drew on instead of re-solving each problem case by case.",
    problem:
      "The console needed reusable UI building blocks and a predictable way to cache and persist server data, instead of components and fetch logic re-solved case by case.",
    systemMove:
      "Pulled shared components, a cached Redux store, and memoized selectors into one frontend foundation the console's React surfaces built on.",
    artifact:
      "Component library",
    timeline: ["Grid + dropdown primitives", "Redux + redux-persist cache", "Reselect selectors", "Webpack to Vite"],
    proofTheme: "blueprint",
    featuredMetrics: [
      { value: "4+ years", label: "one product, one console, one component set" },
      { value: "Webpack → Vite", label: "build migrated, HMR and config simplified" },
      { value: "Cached", label: "server data deduped and persisted across refreshes" },
    ],
    highlights: [
      "Built reusable UI components for the console, including a data grid that displayed tabular data with sort, filter, and pagination, and a dropdown for selecting one or many options from a list.",
      "Added Redux for global application state and cached server data to stop redundant API requests, with redux-persist keeping that data across page refreshes.",
      "Created reselect selectors that pulled data from the store into React components efficiently, backed by memoized helpers for filtering, finding, and mapping server data.",
      "Wrote classes that parsed server data and handled events end to end: API calls, store updates, error handling, and notifications.",
      "Configured Storybook with stories across the component set and added Jest unit tests for the utilities and helpers, then migrated the build from Webpack to Vite to improve HMR and simplify config.",
    ],
    outcomes: [
      "The grid, dropdown, and cached store became reusable building blocks the console's React surfaces drew on instead of re-solving each one.",
      "Caching server data and persisting it across refreshes cut redundant API calls and kept the UI consistent between sessions.",
      "The Webpack-to-Vite migration improved HMR and simplified the build configuration.",
    ],
    tags: ["Component library", "State management", "Build migration", "Private cloud"],
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "redux-persist",
      "Reselect",
      "Material UI",
      "Storybook",
      "Jest",
      "React Testing Library",
      "Webpack",
      "Vite",
      "AWS",
    ],
  },
];

export type Strength = { icon: "network" | "layers" | "lightbulb" | "code"; title: string; body: string };

export const strengths: Strength[] = [
  {
    icon: "network",
    title: "Architecture before components",
    body: "I map data flow, state ownership, and failure paths before the first component lands. On a global animal-health diagnostics platform that meant a two-layer CSS isolation system, prefixed selectors plus design-token variables, which removed cross-microfrontend style leaks as a class of bug.",
  },
  {
    icon: "layers",
    title: "Frontend craft at production scale",
    body: "Interaction detail, Core Web Vitals, accessibility, loading states, and the edge cases users find first. On mongodb.com a two-line fetchPriority change produced an LCP win on the highest-traffic landing pages.",
  },
  {
    icon: "lightbulb",
    title: "Product judgment",
    body: "I work from vague requirements and argue for the version users actually need. On a govtech product that meant moving tenant configuration out of build-time env files, so onboarding a new fire department became a settings change instead of a redeploy.",
  },
  {
    icon: "code",
    title: "Codebases teams can live with",
    body: "Typed boundaries, migrations that never freeze feature work, and CI that catches regressions before main. 456 commits over 20 months as the sole frontend engineer on a two-person team, across five migrations on a product that never stopped shipping.",
  },
];

export type ApproachStatement = { title: string; body: string };

export type AiNativeCard = ApproachStatement & { proof: string };

export const aiNativeWork: { intro: string; cards: AiNativeCard[] } = {
  intro:
    "Where AI already sits inside shipped systems: client delivery, a production feature from 2023, and the tooling I maintain.",
  cards: [
    {
      title: "Agent workflows",
      body: "Multi-step workflows where an agent reads context, proposes actions, calls tools, and waits for approval before changing anything that matters.",
      proof: "Running in client delivery and in RepoKernel review gates",
    },
    {
      title: "Context engineering",
      body: "Project rules, reusable instructions, decision records, and memory structured so coding agents follow the codebase instead of guessing.",
      proof: "Applied on live client work: rule files restructured, docs lazy-loaded",
    },
    {
      title: "Human-in-the-loop UX",
      body: "Review, approval, fallback, and correction flows so AI output stays useful, traceable, and safe to ship.",
      proof: "Shipped 2023: AI-assisted inspection drafting with human review before save",
    },
  ],
};

export type PersonalProduct = {
  name: string;
  subtitle: string;
  body: string;
  tags: string[];
  github: string;
};

export const personalProducts: { intro: string; items: PersonalProduct[] } = {
  intro:
    "Three tools for agent orchestration, agent memory, and job-search automation. Each exists because I hit the problem in my own work and no existing tool solved it.",
  items: [
    {
      name: "RepoKernel",
      subtitle: "Agent orchestration in isolated Git worktrees.",
      body: "Spec-first sprints for coding agents: isolated worktrees, dependency ordering, and a review gate before anything merges. No daemon, no database, no cloud service: the repo is the source of truth.",
      tags: ["TypeScript", "AI agents", "Git worktrees", "DevTools"],
      github: "https://github.com/xantorres/repokernel",
    },
    {
      name: "Engram",
      subtitle: "Local-first memory for coding agents.",
      body: "Captures facts from any coding agent, gates sensitive writes behind a review queue, and recalls them across tools. Agent-agnostic and MCP-native.",
      tags: ["Python", "MCP", "Local-first", "Agent memory"],
      github: "https://github.com/xantorres/engram",
    },
    {
      name: "Shrike",
      subtitle: "Local-first CRM for serious job search.",
      body: "Ingests, filters, scores, and tracks job opportunities with AI-assisted triage and hard rejection rules. I ran my own search on it.",
      tags: ["TypeScript", "CLI", "AI triage", "Job search"],
      github: "https://github.com/xantorres/shrike",
    },
  ],
};

export const approach: ApproachStatement[] = [
  {
    title: "Map the system first.",
    body: "Before touching components I want to know where data comes from, who owns state, and what breaks under failure. On a templating monorepo I scaffolded from zero, that meant Zod schemas emitting JSON Schema, so the shape one service sends and the shape another expects are the same generated artifact.",
  },
  {
    title: "Migration over rewrite.",
    body: "A rewrite freezes the roadmap and rarely lands. I move one layer at a time, runtime, then language, then data fetching, then forms, and the app stays shippable through every transition.",
  },
  {
    title: "One source of truth.",
    body: "More than once I have deleted a client-side recomputation of a backend value and made one endpoint authoritative instead. Backend-authoritative over client-recompute: each time, an entire class of drift bugs left with it.",
  },
  {
    title: "Use AI without losing control.",
    body: "AI speeds up implementation, exploration, and refactors. Architecture, review, and product decisions stay human-owned: in RepoKernel nothing merges without a recorded review verdict and a passing check command.",
  },
];

export type SkillGroup = { group: string; blurb: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    group: "AI / Agentic Systems",
    blurb: "Systems where agents act under gates a human controls.",
    items: [
      "MCP",
      "Agent memory",
      "Context engineering",
      "Structured outputs",
      "Human-in-the-loop flows",
      "Evaluation workflows",
    ],
  },
  {
    group: "Frontend",
    blurb: "The core craft: state, data, forms, and rendering at production scale.",
    items: [
      "React 17/18/19",
      "TypeScript (strict)",
      "Next.js 13+",
      "Redux Toolkit · RTK Query",
      "TanStack Query · Table",
      "React Hook Form · Zod",
    ],
  },
  {
    group: "Design Systems",
    blurb: "Component libraries teams adopt instead of fork.",
    items: [
      "Component library architecture",
      "Design tokens",
      "Module Federation",
      "Style isolation",
      "Tailwind CSS",
      "Accessibility (WCAG)",
    ],
  },
  {
    group: "Backend (supporting)",
    blurb: "Enough backend to close the loop on a feature.",
    items: [
      "Node.js · NestJS",
      "PostgreSQL · Prisma",
      "REST · GraphQL · WebSocket",
      "AWS · Docker",
    ],
  },
];

export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#ai-work", label: "AI work" },
  { href: "/#products", label: "Products" },
  { href: "/#skills", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];
