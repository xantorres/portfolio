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
  stats: CaseStat[];
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
  return `${yearsOfExperience(date)}+ years building production TypeScript/React apps. I help teams ship complex product UI, frontend migrations, design systems, and AI-assisted workflows that survive real users.`;
}

export const profile = {
  name: "Xan Torres",
  tagline: "Senior Frontend Engineer for AI-native",
  accentWord: "Products",
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

export const socialTitle = "Xan Torres · AI-native Frontend Engineer";
export const socialDescription =
  "React, TypeScript, product UI, agent workflows, DevTools, and frontend architecture for complex products.";

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
    scope: "5.5 months",
    title: "Roulette mini-game, missions, and ops tooling.",
    stats: [
      { value: "Zero → prod", label: "roulette mini-game built from scratch" },
      { value: "Hours → mins", label: "ops onboarding via bulk import" },
    ],
    headline:
      "Built a roulette mini-game and ops tooling across game UI, admin, and Node services.",
    summary:
      "I worked across a live dual-currency social-casino product: NestJS services, Prisma migrations, React admin dashboards, and a Rive-driven game surface. The work ranged from a full roulette mini-game and mission system to bulk imports, jackpot sharing, free-rounds, and i18n.",
    whyItMatters:
      "I worked across admin UI, gameplay UI, backend services, validation, cache invalidation, and ops tooling in a live product.",
    problem:
      "Ops and gameplay teams needed better tools while economy and game work kept moving.",
    systemMove:
      "Pulled validation, services, animation identity, and cache invalidation into the same delivery path.",
    artifact:
      "Game and ops map",
    timeline: ["Roulette mini-game", "Missions system", "Bulk import pipeline", "Free-rounds wallet path"],
    proofTheme: "signal",
    featuredMetrics: [
      { value: "Zero → prod", label: "roulette mini-game shipped" },
      { value: "Hours → mins", label: "ops onboarding after bulk import" },
      { value: "4", label: "product surfaces owned across the stack" },
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
    stats: [
      { value: "JS → TS", label: "Whole frontend moved off CRA onto Vite without blocking a release" },
      { value: "20 months", label: "owning the frontend on a two-engineer team" },
    ],
    headline:
      "Migrated a live govtech SaaS while fire departments kept using it.",
    summary:
      "FeatherShark was a two-person product used by US municipal fire departments and building-inspection offices. I owned the frontend while moving the app from CRA/JavaScript to Vite/TypeScript, replacing ad-hoc fetching with RTK Query, and shipping new modules for maps, tenant config, 2FA, guided inspection drafting, and contractor workflows.",
    whyItMatters:
      "I migrated a live product from CRA/JavaScript to Vite/TypeScript while weekly releases continued.",
    problem:
      "The app needed a new frontend foundation, but municipal users still needed releases every week.",
    systemMove:
      "Moved one layer at a time: runtime, language, data fetching, forms, maps, auth, and tenant configuration.",
    artifact:
      "Migration plan",
    timeline: ["CRA to Vite", "JS to TypeScript", "Ad-hoc fetch to RTK Query", "Runtime tenant settings"],
    proofTheme: "oxide",
    featuredMetrics: [
      { value: "JS → TS", label: "Whole frontend migrated, weekly releases preserved" },
      { value: "7", label: "domain modules shipped on the new stack" },
      { value: "0", label: "release gaps during the migration" },
    ],
    highlights: [
      "Moved the whole frontend off JavaScript on CRA onto TypeScript on Vite in roughly three months without blocking a release. Leaned on the allowJs flag to convert module by module, starting with forms and data hooks where types kept catching real bugs.",
      "Replaced hand-rolled fetch hooks with RTK Query. Tag-based cache invalidation removed a long tail of stale-data bugs and loading states that disagreed with each other.",
      "Made Zod schemas the shared contract for forms and API edges. The same schema drove validation, component state, and DTO typing through react-hook-form.",
      "Built autocomplete across server records, ArcGIS suggestions, and tenant-defined locations. Each source could fail without killing the typeahead.",
      "Shipped ArcGIS occupancy maps with drag-and-drop safety markers, persistent zoom and pan, and staged marker updates that stopped flicker during edits.",
      "Modeled 2FA as an explicit state machine: credentials submitted, awaiting code, hydrating session, recovery code, and refresh mid-flow all had named transitions.",
      "Moved tenant config from build-time .env to a server-driven settings endpoint for theme tokens, default map coordinates, and admin UI shape. New municipalities no longer required a redeploy.",
      "Built AI-assisted inspection drafting with backoff, deterministic fallback, editable output, and human review before save.",
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
      "Model API",
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
    stats: [
      { value: "LCP win", label: "on mongodb.com landing pages" },
      { value: "Hundreds", label: "of marketing forms migrated without regressions" },
    ],
    headline:
      "Improved mongodb.com component libraries without breaking downstream teams.",
    summary:
      "At MongoDB I worked on the shared packages behind mongodb.com: design tokens, component library code, and navigation. The work was mostly semver-safe API changes, release sequencing, performance fixes, and debugging style precedence in a Tailwind + theme-ui stack.",
    whyItMatters:
      "I changed shared design-system packages used by high-traffic pages without breaking downstream consumers.",
    problem:
      "High-traffic marketing pages needed library improvements, but dozens of consumers depended on those packages.",
    systemMove:
      "Kept changes semver-safe, sequenced package releases, and made style-precedence fixes local instead of global.",
    artifact:
      "Release plan",
    timeline: ["Token layer", "Component API", "Navigation package", "Consumer rollout"],
    proofTheme: "circuit",
    featuredMetrics: [
      { value: "LCP", label: "hero-image priority win" },
      { value: "Hundreds", label: "marketing forms migrated safely" },
      { value: "3", label: "package layers released together" },
    ],
    highlights: [
      "Built a multi-promo announcement bar across tokens, component library code, and the shared navigation package. The release chain shipped without breaking consumers.",
      "Set fetchPriority=\"high\" on hero images for a measurable LCP improvement on high-traffic landing pages. Small diff, real Core Web Vitals impact.",
      "Worked through the Pardot-to-Eloqua form migration across hundreds of forms: field mapping, post-submit rich text, and defensive handling for incomplete CMS payloads.",
      "Revamped card grids with variant sizing, hover treatments, inverse-theme fixes, and graceful deprecation of legacy props.",
      "Introduced a scoped override pattern for style-precedence bugs in the Tailwind + theme-ui stack, then documented it as a team practice.",
      "Unified image, video, and embed handling behind one media component API so rich-text JSON embeds had a single path.",
      "Hardened components against CMS drift with null checks and type exports, avoiding build failures when payloads were incomplete.",
    ],
    outcomes: [
      "Contributed across design tokens, high-level components, and shared navigation with semver discipline and snapshot-test coordination.",
      "Improved Core Web Vitals on mongodb.com landing pages.",
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
    stats: [
      { value: "4+ years", label: "owning the shared frontend on a private-cloud console" },
      { value: "Webpack → Vite", label: "build migrated for faster HMR" },
    ],
    headline:
      "Built reusable UI components and a cached Redux store for a private-cloud console.",
    summary:
      "Platform9 runs a private-cloud platform for managing Kubernetes and OpenStack. Over four years I built reusable UI for the console, a data grid with sort, filter, and pagination and a multi-select dropdown among them, and added a Redux store that cached server data and persisted it across refreshes. Reselect selectors fed components efficiently, and I moved the build from Webpack to Vite while keeping Storybook and Jest as the baseline for components and utilities.",
    whyItMatters:
      "I built reusable frontend foundations for a private-cloud console: shared UI, cached server data, selectors, Storybook, tests, and build migration.",
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
    body: "I map data flow, state boundaries, and core interactions before the first component lands. The goal is boring in the best way: fewer rewrites, fewer surprises, and code the next engineer can understand.",
  },
  {
    icon: "layers",
    title: "Frontend craft with receipts",
    body: "I care about the visible layer and the numbers behind it: interaction detail, Core Web Vitals, accessibility, loading states, and the awkward edge cases users always find.",
  },
  {
    icon: "lightbulb",
    title: "Product judgment",
    body: "I am comfortable with vague requirements, stakeholder pressure, and incomplete information. I push for the useful version, not the version that only looks tidy in a ticket.",
  },
  {
    icon: "code",
    title: "Codebases teams can live with",
    body: "Typed boundaries, migrations that do not freeze feature work, and CI that catches regressions before they reach main. I have joined codebases at every stage and left them easier to change.",
  },
];

export type ApproachStatement = { title: string; body: string };

export const aiNativeWork: { intro: string; cards: ApproachStatement[] } = {
  intro:
    "Where I'm focused now: practical AI workflows, developer tooling, and product interfaces that keep humans in control.",
  cards: [
    {
      title: "Agent workflows",
      body: "Designing multi-step workflows where AI can read context, suggest actions, call tools, and ask for approval before changing anything important.",
    },
    {
      title: "Context engineering",
      body: "Structuring project rules, reusable instructions, decisions, and memory so coding agents stop guessing and start following the product and codebase.",
    },
    {
      title: "Human-in-the-loop UX",
      body: "Building review, approval, fallback, and correction flows so AI output remains useful, traceable, and safe to ship.",
    },
    {
      title: "AI DevTools",
      body: "Building local-first tools for job search, coding agents, repo memory, review workflows, and engineering automation.",
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
    "Small, focused tools I'm building around AI-assisted development, agent memory, and job-search automation.",
  items: [
    {
      name: "RepoKernel",
      subtitle: "Agent orchestration in isolated Git worktrees.",
      body: "Runs coding agents in isolated worktrees with scoped sprints, dependency ordering, and review gates before anything merges.",
      tags: ["TypeScript", "AI agents", "Git worktrees", "DevTools"],
      github: "https://github.com/xantorres/repokernel",
    },
    {
      name: "Engram",
      subtitle: "Local-first memory for coding agents.",
      body: "Capture facts from any coding agent, review them, and reuse them across tools. Agent-agnostic and MCP-native.",
      tags: ["Python", "MCP", "Local-first", "Agent memory"],
      github: "https://github.com/xantorres/engram",
    },
    {
      name: "Shrike",
      subtitle: "Local-first CRM for serious job search.",
      body: "Ingest, filter, triage, score, and track job opportunities with AI-assisted review and hard rejection rules.",
      tags: ["TypeScript", "CLI", "AI triage", "Job search"],
      github: "https://github.com/xantorres/shrike",
    },
  ],
};

export const approach: ApproachStatement[] = [
  {
    title: "Map the system first.",
    body: "Before touching components, I want to know where the data comes from, who owns state, and what can break. That saves time later.",
  },
  {
    title: "Design the workflow, not just the screen.",
    body: "For AI-assisted products, the interface is only one layer. I define the states, approvals, fallbacks, context, and failure paths that make the workflow reliable.",
  },
  {
    title: "Trust one source of truth.",
    body: "Client mirrors of backend calculations drift and create support tickets. The UI should render the truth, not become a second version of it.",
  },
  {
    title: "Ship the useful version.",
    body: "I work well async and remote. I make clear calls, explain the tradeoffs, and keep momentum when perfect consensus would stall the work.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI / Agentic Systems",
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
  { href: "/#strengths", label: "Strengths" },
  { href: "/#ai-work", label: "AI work" },
  { href: "/#work", label: "Work" },
  { href: "/#products", label: "Products" },
  { href: "/#approach", label: "Approach" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];
