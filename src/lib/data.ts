export type CaseStat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  company: string;
  url: string; // live product or company site
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

export function getSubhead(date = new Date()): string {
  return `${yearsOfExperience(date)}+ years shipping production software, React and TypeScript for most of it. I combine frontend architecture, product judgment, and AI-native workflows to ship high-quality software faster.`;
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
  email: "xan.torres@gmail.com",
  links: {
    github: "https://github.com/xantorres",
    linkedin: "https://linkedin.com/in/xan-torres",
    toptal: "https://www.toptal.com/developers/resume/xan-torres#XM6Epk",
  },};

export const socialTitle = "Xan Torres · Senior Product Engineer (React/TypeScript)";
export const socialDescription =
  "Frontend architecture, product judgment, and AI-native workflows for complex React and TypeScript products.";

type HeroCta = { label: string; href: string };

export const hero = {
  eyebrow: "React · TypeScript · AI-native delivery",
  headline: "Senior Product Engineer for complex React and TypeScript products.",
  primaryCta: { label: "View case studies", href: "/#work" } satisfies HeroCta,
  secondaryCta: { label: "Work together", href: "/#contact" } satisfies HeroCta,
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
    slug: "sunflower-games",
    company: "Sunflower Games",
    url: "https://crowncoinscasino.com/",
    role: "Senior Full-Stack Engineer",
    period: "2025 – 2026",
    sector: "Social Casino",
    scope: "7 months",
    title: "Roulette mini-game, missions, and ops tooling.",
    headline:
      "Built a roulette mini-game and ops tooling across game UI, admin, and Node services.",
    summary:
      "I worked across a live dual-currency social-casino product: NestJS services, Prisma migrations, React admin dashboards, and a Rive-driven game surface. The work ranged from a full roulette mini-game and mission system to bulk imports, jackpot sharing, free-rounds, and i18n.",
    whyItMatters:
      "Full-stack ownership under a live economy. I shipped across admin UI, gameplay UI, NestJS services, validation, and cache invalidation: 294 commits and 52+ PRs across 4 repos, on features where a wrong number costs real money.",
    problem:
      "Ops and gameplay teams needed better tools while a live dual-currency economy kept moving underneath them.",
    systemMove:
      "Pulled validation, services, animation identity, and cache invalidation into the same delivery path.",
    artifact:
      "Game and ops map",
    timeline: ["Roulette mini-game", "Missions system", "Bulk import pipeline", "Free-rounds wallet path"],
    proofTheme: "signal",
    featuredMetrics: [
      { value: "Zero → prod", label: "roulette mini-game shipped" },
      { value: "Hours → mins", label: "ops onboarding after bulk import" },
      { value: "294", label: "commits · 52+ PRs across 4 repos" },
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
      "Three rounds on chip identity produced a pattern the team could reuse for later animated game components.",
      "Bulk import took an ops workflow from hours to minutes, with validation on both client and server.",
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
      "For 20 months I was the sole frontend engineer on a two-person product team: 456 commits, six stack migrations, and weekly releases to municipal fire departments that never stopped shipping.",
    problem:
      "The app needed a new frontend foundation, but municipal users depended on weekly releases that could not pause.",
    systemMove:
      "Moved one layer at a time: runtime, language, data fetching, forms, maps, auth, and tenant configuration.",
    artifact:
      "Migration plan",
    timeline: ["CRA to Vite", "JS to TypeScript", "Ad-hoc fetch to RTK Query", "Runtime tenant settings"],
    proofTheme: "oxide",
    featuredMetrics: [
      { value: "JS → TS", label: "whole frontend migrated, weekly releases preserved" },
      { value: "456", label: "commits over 20 months as sole frontend engineer" },
      { value: "0", label: "release gaps across six stack migrations" },
    ],
    highlights: [
      "Moved the whole frontend off JavaScript on CRA onto TypeScript on Vite in roughly three months without blocking a release. Leaned on the allowJs flag to convert module by module, starting with forms and data hooks where types kept catching real bugs.",
      "Replaced hand-rolled fetch hooks with RTK Query. Tag-based cache invalidation removed a long tail of stale-data bugs and loading states that disagreed with each other.",
      "Made Zod schemas the shared contract for forms and API edges. The same schema drove validation, component state, and DTO typing through react-hook-form.",
      "Built autocomplete across server records, ArcGIS suggestions, and tenant-defined locations. Each source could fail without killing the typeahead.",
      "Shipped ArcGIS occupancy maps with drag-and-drop safety markers, persistent zoom and pan, and staged marker updates that stopped flicker during edits.",
      "Modeled 2FA as an explicit state machine: credentials submitted, awaiting code, hydrating session, recovery code, and refresh mid-flow all had named transitions.",
      "Moved tenant config from build-time .env to a server-driven settings endpoint for theme tokens, default map coordinates, and admin UI shape. New municipalities no longer required a redeploy.",
      "Built AI-assisted inspection drafting in 2023, before it was standard: backoff, deterministic fallback, editable output, and human review before save.",
      "Built the checklist-template admin: drag-and-drop sections and items, fee-type fields, and cascading deletes for the authoring surface the product depends on.",
      "Built the contractor portal as its own routing tree with role-scoped permit lists, activities, invoices, and document uploads.",
    ],
    outcomes: [
      "For 20 months I was the sole frontend engineer on a two-engineer team. Six migrations shipped without creating a deploy gap.",
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
    scope: "18 months",
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
      { value: "fetchPriority", label: "LCP win on high-traffic landing pages" },
      { value: "0", label: "production incidents migrating hundreds of marketing forms" },
      { value: "3", label: "package layers released together" },
    ],
    highlights: [
      "Built a multi-promo announcement bar across tokens, component library code, and the shared navigation package: a three-month cross-repo epic whose release chain shipped without breaking consumers.",
      "Set fetchPriority=\"high\" on hero images for a measurable LCP improvement on high-traffic landing pages. Small diff, real Core Web Vitals impact.",
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
      { value: "4+ years", label: "owning the console's shared frontend" },
      { value: "Vite", label: "build migrated off Webpack for faster HMR" },
      { value: "Cached", label: "server data deduped to cut redundant API calls" },
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
    title: "Architecture that holds up",
    body: "I map data flow, state ownership, and failure paths before the first component lands. Boring on purpose: fewer rewrites, fewer surprises, and code the next engineer can navigate without a guide.",
  },
  {
    icon: "layers",
    title: "Frontend craft with receipts",
    body: "Interaction detail, Core Web Vitals, accessibility, loading states, and the edge cases users always find. On mongodb.com that meant a two-line fetchPriority change with a measurable LCP win.",
  },
  {
    icon: "lightbulb",
    title: "Product judgment",
    body: "Comfortable with vague requirements, stakeholder pressure, and incomplete information. I argue for the version users need, cut scope honestly, and delete code that duplicates truth owned elsewhere.",
  },
  {
    icon: "code",
    title: "Codebases teams can live with",
    body: "Typed boundaries, migrations that never freeze feature work, and CI that catches regressions before main. Six stack migrations on one live govtech product without a single release gap.",
  },
];

export type ApproachStatement = { title: string; body: string };

export type AiNativeCard = ApproachStatement & { proof: string };

export const aiNativeWork: { intro: string; cards: AiNativeCard[] } = {
  intro:
    "Not a pivot, and not hype. Agent workflows run inside my client delivery today, I shipped in-product AI features back in 2023, and I build the agent tooling I use every day.",
  cards: [
    {
      title: "Agent workflows",
      body: "Multi-step workflows where an agent reads context, proposes actions, calls tools, and waits for approval before changing anything that matters.",
      proof: "Running in real client delivery and in RepoKernel review gates",
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
    {
      title: "AI DevTools",
      body: "Local-first tools for agent orchestration, agent memory, and AI-assisted job search. Built for daily use, not for demos.",
      proof: "RepoKernel, Engram, and Shrike, below",
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
    "Tools I build and run daily for agent orchestration, agent memory, and job-search automation. Each one exists because I hit the problem myself and no existing tool solved it.",
  items: [
    {
      name: "RepoKernel",
      subtitle: "Agent orchestration in isolated Git worktrees.",
      body: "Runs coding agents in isolated worktrees with scoped sprints, dependency ordering, and review gates. Nothing merges without passing a gate.",
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
    body: "Before touching components I want to know where data comes from, who owns state, and what breaks under failure. An hour of mapping saves a week of rework.",
  },
  {
    title: "Design the workflow, not just the screen.",
    body: "For AI-assisted products the interface is one layer. The states, approvals, fallbacks, and failure paths around it decide whether the workflow survives real use.",
  },
  {
    title: "Trust one source of truth.",
    body: "More than once, I have deleted a client-side recomputation of a backend value and made one endpoint authoritative instead. Each time, an entire class of drift bugs disappeared with it.",
  },
  {
    title: "Ship the useful version.",
    body: "I work async and remote by default. I make clear calls, write down the tradeoffs, and keep momentum when waiting for perfect consensus would stall the work.",
  },
];

export type SkillGroup = { group: string; blurb: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    group: "AI / Agentic Systems",
    blurb: "Systems where agents do real work under human control.",
    items: [
      "LLM APIs",
      "Structured outputs",
      "Tool calling patterns",
      "MCP",
      "Agent memory",
      "Context engineering",
      "Human-in-the-loop flows",
      "Evaluation workflows",
      "AI-assisted developer tooling",
    ],
  },
  {
    group: "Frontend",
    blurb: "The core craft: state, data, forms, and rendering at production scale.",
    items: [
      "React 17/18/19",
      "TypeScript (strict)",
      "Next.js 13+",
      "Apollo Client",
      "Redux Toolkit · RTK Query",
      "TanStack Query · Table",
      "React Hook Form · Zod",
      "Storybook",
    ],
  },
  {
    group: "Design Systems",
    blurb: "Component libraries teams adopt instead of fork.",
    items: [
      "Component library architecture",
      "Tailwind CSS",
      "MUI · Radix UI · theme-ui",
      "Design tokens",
      "Module Federation",
      "Style isolation",
      "Accessibility (WCAG)",
      "Rive · Lottie",
    ],
  },
  {
    group: "Backend (supporting)",
    blurb: "Enough backend to own features end to end.",
    items: [
      "Node.js · NestJS · Express",
      "Prisma · Sequelize · TypeORM",
      "PostgreSQL · Redis",
      "WebSocket · REST · GraphQL",
      "AWS (RDS, S3, EKS, SSO)",
      "Docker · Kubernetes",
    ],
  },
  {
    group: "Tooling & Testing",
    blurb: "Fast feedback loops, regressions caught before main.",
    items: [
      "Vite · Rsbuild · Webpack",
      "Turborepo · NX · pnpm workspaces",
      "Biome · ESLint · Prettier",
      "GitHub Actions",
      "Jest · React Testing Library",
      "Playwright · Cypress",
    ],
  },
];

export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#ai-work", label: "AI work" },
  { href: "/#products", label: "Products" },
  { href: "/#strengths", label: "Strengths" },
  { href: "/#approach", label: "Approach" },
  { href: "/#skills", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];
