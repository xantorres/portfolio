export type CaseStat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  company: string;
  role: string;
  period: string;
  sector: string;
  scope: string;
  title: string; // short punchy label on the home card (≤7 words)
  headline: string; // long headline shown on the detail page
  summary: string;
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
  return `${yearsOfExperience(date)}+ years building production TypeScript/React apps. I take on messy frontend work: migrations, data-heavy UI, design systems, and features that need to survive real users.`;
}

export const profile = {
  name: "Xan Torres",
  tagline: "Senior Frontend Engineer & Product",
  accentWord: "Architect",
  location: "Cyprus (EU) · Remote · CET/EET",
  availability: {
    short: "Available",
    long: "Booking new engagements",
  },
  email: "xan.torres@gmail.com",
  links: {
    github: "https://github.com/xantorres",
    linkedin: "https://linkedin.com/in/xan-torres",
  },
  lastApproachUpdate: "April 2026",
};

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

export function currentQuarter(date = new Date()): string {
  const quarter = Math.floor(date.getUTCMonth() / 3) + 1;
  return `Q${quarter} ${date.getUTCFullYear()}`;
}

export const cases: CaseStudy[] = [
  {
    slug: "feathershark-fireops",
    company: "FeatherShark",
    role: "Senior Frontend Engineer (Primary)",
    period: "Feb 2023 – Oct 2024",
    sector: "Govtech · Multi-tenant SaaS",
    scope: "20 months · 2-person team",
    title: "Live govtech migration, no release gaps.",
    stats: [
      { value: "229 → 0", label: "JS files migrated to TS without blocking a release" },
      { value: "30 min", label: "saved per inspection via assisted report drafts" },
    ],
    headline:
      "Migrated a live govtech SaaS while fire departments kept using it.",
    summary:
      "FeatherShark was a two-person product used by US municipal fire departments and building-inspection offices. I owned the frontend while moving the app from CRA/JavaScript to Vite/TypeScript, replacing ad-hoc fetching with RTK Query, and shipping new modules for maps, tenant config, 2FA, guided inspection drafting, and contractor workflows.",
    problem:
      "The app needed a new frontend foundation, but municipal users still needed releases every week.",
    systemMove:
      "Moved one layer at a time: runtime, language, data fetching, forms, maps, auth, and tenant configuration.",
    artifact:
      "Migration plan",
    timeline: ["CRA to Vite", "JS to TypeScript", "Ad-hoc fetch to RTK Query", "Runtime tenant settings"],
    proofTheme: "blueprint",
    featuredMetrics: [
      { value: "229 → 0", label: "JavaScript files left after migration" },
      { value: "7", label: "domain modules shipped on the new stack" },
      { value: "0", label: "release gaps during the migration" },
    ],
    highlights: [
      "Migrated 229 frontend files from JavaScript on CRA to TypeScript on Vite in three months without blocking a release. The allowJs flag let the team convert module by module, starting with forms and data hooks where types caught real bugs.",
      "Replaced hand-rolled fetch hooks with RTK Query. Tag-based cache invalidation removed a long tail of stale-data bugs and loading states that disagreed with each other.",
      "Made Zod schemas the shared contract for forms and API edges. The same schema drove validation, component state, and DTO typing through react-hook-form.",
      "Built autocomplete across server records, ArcGIS suggestions, and tenant-defined locations. Each source could fail without killing the typeahead.",
      "Shipped ArcGIS occupancy maps with drag-and-drop safety markers, persistent zoom and pan, and staged marker updates that stopped flicker during edits.",
      "Modeled 2FA as an explicit state machine: credentials submitted, awaiting code, hydrating session, recovery code, and refresh mid-flow all had named transitions.",
      "Moved tenant config from build-time .env to a server-driven settings endpoint for theme tokens, default map coordinates, and admin UI shape. New municipalities no longer required a redeploy.",
      "Added guided inspection text with backoff, deterministic fallback, and human review before save. Drafted language stayed editable and never blocked the inspection flow.",
      "Built the checklist-template admin: drag-and-drop sections and items, fee-type fields, and cascading deletes for the authoring surface the product depends on.",
      "Built the contractor portal as its own routing tree with role-scoped permit lists, activities, invoices, and document uploads.",
    ],
    outcomes: [
      "For 20 months I was the sole frontend engineer on a two-engineer team. Six migrations shipped without creating a deploy gap.",
      "Frontend stopped being the scary part of the roadmap. Feature work and migration work moved together instead of competing.",
      "New municipalities could be configured by settings instead of redeploying.",
      "The platform was live with US municipal fire departments and building-inspection offices before my engagement ended.",
    ],
    tags: ["Multi-tenant", "Maps", "State machines", "Inspection drafting"],
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
    slug: "sunflower-games",
    company: "Sunflower Games",
    role: "Senior Full-Stack Engineer",
    period: "Aug 2025 – Jan 2026",
    sector: "Social Casino",
    scope: "5.5 months",
    title: "Roulette admin, missions, and ops tooling.",
    stats: [
      { value: "Zero → prod", label: "roulette admin built from scratch" },
      { value: "Hours → mins", label: "ops onboarding via bulk import" },
    ],
    headline:
      "Built production tooling across admin UI, game UI, and Node services.",
    summary:
      "I worked across a live dual-currency social-casino product: NestJS services, Prisma migrations, React admin dashboards, and a Rive-driven game surface. The work ranged from a new roulette admin and mission system to bulk imports, jackpot sharing, free-rounds, and i18n.",
    problem:
      "Ops and gameplay teams needed better tools while economy and game work kept moving.",
    systemMove:
      "Pulled validation, services, animation identity, and cache invalidation into the same delivery path.",
    artifact:
      "Admin workflow map",
    timeline: ["Roulette admin", "Missions system", "Bulk import pipeline", "Free-rounds wallet path"],
    proofTheme: "signal",
    featuredMetrics: [
      { value: "Zero → prod", label: "roulette admin shipped" },
      { value: "Hours → mins", label: "ops onboarding after bulk import" },
      { value: "4", label: "product surfaces owned across the stack" },
    ],
    highlights: [
      "Built a roulette admin from scratch: drag-and-drop chip placement, Rive state-machine animation, and a chip-identity model that stopped merge/split jitter.",
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
    slug: "mongodb-web-platform",
    company: "MongoDB",
    role: "Senior Frontend Engineer",
    period: "Apr 2023 – Oct 2024",
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
    slug: "inplay-fantasy",
    company: "Inplay",
    role: "Senior Frontend Engineer",
    period: "Jan 2025 – Jun 2025",
    sector: "Fantasy Sports · Live",
    scope: "5 months",
    title: "Live game modes and routing.",
    stats: [
      { value: "2 formats", label: "game types shipped end-to-end" },
      { value: "Real-time", label: "Socket.io leaderboards and live state machines" },
    ],
    headline:
      "Shipped live game modes, routing infrastructure, and pt-BR localization.",
    summary:
      "I built two game formats for a Brazilian fantasy-sports product: timed live predictions and 1v1 head-to-head. I also shipped the router wrapper, Storybook state mocks, real-time leaderboards over Socket.io, and a typed pt-BR localization pipeline.",
    problem:
      "The product needed new game modes, live state, and full localization without forking navigation behavior.",
    systemMove:
      "Modeled game states explicitly, kept socket lifecycles visible, and used Storybook to test states before integration.",
    artifact:
      "Game state map",
    timeline: ["Timed prediction format", "1v1 head-to-head", "Router wrapper", "pt-BR localization"],
    proofTheme: "oxide",
    featuredMetrics: [
      { value: "2", label: "game formats shipped end-to-end" },
      { value: "34", label: "Storybook variants for complex states" },
      { value: "800+", label: "translation keys compiled into TypeScript" },
    ],
    highlights: [
      "Built the timed live-prediction format from entry through in-round questions, results, and real-time leaderboards. Image preloading and question prefetching removed perceived-latency bugs before launch.",
      "Built the 1v1 head-to-head format with prize calculation, play-next auto-proposal, multi-round carousel, and fifteen-plus Storybook states for isolated testing.",
      "Shipped a Next.js router wrapper with explicit history, scroll restoration on back navigation, and section-anchor handling.",
      "Made Storybook the main place to test complex states: 34 stories covering auth, games, leagues, teams, Firebase, and card variants.",
      "Compiled 800+ Portuguese translation keys into TypeScript with zero fallback strings. Each feature shipped with pt-BR coverage checked before merge.",
      "Built real-time leaderboards on Firebase listeners with explicit subscription, teardown, and update lifecycles.",
      "Extracted shared page-header and carousel primitives to replace duplicated variants across the product.",
    ],
    outcomes: [
      "Owned two feature suites plus the navigation layer every later team touchpoint ran through.",
      "Both game formats were live in the Brazilian market before my engagement ended.",
      "Storybook made later feature work faster because state variants could be built before integration.",
    ],
    tags: ["Real-time", "i18n", "Next.js", "Storybook"],
    stack: [
      "Next.js 13",
      "React 18",
      "TypeScript",
      "TanStack Query",
      "Radix UI",
      "Firebase",
      "Sendbird",
      "react-intl",
      "Tailwind",
      "Sentry",
      "Playwright",
      "Storybook",
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

export const approach: ApproachStatement[] = [
  {
    title: "Map the system first.",
    body: "Before touching components, I want to know where the data comes from, who owns state, and what can break. That saves time later.",
  },
  {
    title: "Keep boring things boring.",
    body: "Routing, forms, tables, and data fetching should be predictable. The polish belongs in the interactions users actually touch.",
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
  { href: "/#work", label: "Work" },
  { href: "/#approach", label: "Approach" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];
