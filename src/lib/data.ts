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
  highlights: string[];
  outcomes: string[];
  tags: string[];
  stack: string[];
  stats: CaseStat[];
};

export const profile = {
  name: "Xan Torres",
  tagline: "Senior Frontend Engineer & Product",
  accentWord: "Architect",
  subhead:
    "14+ years building production web applications in TypeScript and React. I solve hard UI problems at scale and own features end-to-end, from data model through to pixel.",
  location: "Cyprus (EU) · Remote · CET/EET",
  availability: {
    short: "Available · Q3 2026",
    long: "Booking new engagements · Q3 2026",
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

export const cases: CaseStudy[] = [
  {
    slug: "sunflower-games",
    company: "Sunflower Games",
    role: "Senior Full-Stack Engineer",
    period: "Aug 2025 – Jan 2026",
    sector: "Social Casino",
    scope: "5.5 months",
    title: "Real-time admin, missions, and ops tooling.",
    stats: [
      { value: "Zero → prod", label: "roulette admin built from scratch" },
      { value: "Hours → mins", label: "ops onboarding via bulk import" },
    ],
    headline:
      "Full-stack delivery across admin surfaces, animated game UI, and Node services for a dual-currency social-casino platform.",
    summary:
      "Primary contributor on several parts of a live social-casino product: NestJS services, Prisma schema and migrations, React admin dashboards, and a Rive-driven game surface. Shipped missions and assignment systems, a bulk ops-import pipeline, a zero-to-production roulette admin, and cross-layer features (jackpot sharing, free-rounds, i18n) that required touching data layer, API, and UI in the same pull request.",
    highlights: [
      "Built a real-time roulette admin from zero: drag-and-drop chip placement, Rive state-machine animation, and a diff-driven chip-identity model (unique IDs in a map, reconciled against the state machine) that eliminated animation jitter during merge and split.",
      "Shipped a missions system end-to-end: backend CRUD, admin UI, nested rewards/goals/conditions, and immutability constraints on economy-critical identifiers post-creation. Prevented a whole class of data-corruption bugs across the player lifecycle.",
      "Bulk spreadsheet-import pipeline for ops with layered validation (schema, business rules, asset ratios, currency classes) and per-row error mapping back to source cells, turning a multi-hour manual onboarding flow into minutes.",
      "Jackpot image generation + social sharing: Web Share API with clipboard fallback, dynamic Redis TTL based on amount, and locale-aware currency formatting across markets.",
      "Free-rounds feature wired from wallet API through cache invalidation on mission start to the UI layer with auto-play support; replaced a class of ad-hoc timing bugs with an explicit state model.",
      "Assignment management with server-side overlap validation and conflict detection; centralized the authoritative date for assignments server-side to eliminate cache-vs-derivation drift.",
      "Paved path work the rest of the team still uses: AWS SSO shell helpers with credential caching and database utilities, reducing multi-step ops workflows to single-line commands.",
    ],
    outcomes: [
      "Primary contributor across admin, game UI, and several backend services. Delivered missions, roulette, free-rounds, jackpot sharing, and the bulk-import pipeline end-to-end.",
      "Three iterations on chip-identity handling converged on a pattern the team has re-used for subsequent animated game components.",
      "Bulk-import pipeline turned an ops workflow measured in hours into one measured in minutes, validated both client- and server-side.",
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
    slug: "choco-quoting",
    company: "Choco",
    role: "Senior Frontend Engineer",
    period: "Mar 2026 – Apr 2026",
    sector: "B2B Ordering & AI",
    scope: "7 weeks",
    title: "AI quoting surface and shared-package extraction.",
    stats: [
      { value: "6–8/day", label: "commit cadence across a 7-week sprint" },
      { value: "0", label: "pricing-drift support tickets post-launch" },
    ],
    headline: "Quoting module for an AI-powered document-to-quote tool.",
    summary:
      "Built the quoting surface for an AI-assisted sales workflow on a B2B food-ordering platform. Combined a dual-panel PDF viewer with a live-editable product table, AI conflict-resolution flows for duplicates and unmatched catalogue items, and a deliberate architectural move from client-side pricing calculations to a server-authoritative model. Staged the module into a shared package across four phases so adjacent product surfaces could consume it.",
    highlights: [
      "Dual-panel editor: PDF preview with programmatic zoom, drag-to-pan, fit-to-container sizing via react-pdf, paired with an editable product table, resizable divider, and height-stable multi-tab attachment viewer.",
      "Removed client-side price computation and made the backend pricing endpoint authoritative for totals; skeleton loaders replaced spinners on derived cells, closing a recurring 'my screen says one total, yours says another' support pattern.",
      "AI conflict resolution for extracted documents: merged-product groups walked through one at a time, unmatched catalogue items resolved inline. All driven by backend validation results, so new server rules surface in the UI automatically.",
      "Quote list and detail: GraphQL codegen-driven data, mapper-layer domain models, adaptive polling while AI jobs are in flight, polymorphic subject types, optimistic archive/restore with rollback, and context-scoped selection state to avoid prop-drilling.",
      "Multi-currency + decimal-place handling: a single money domain model (amount + currency + decimal places) honoured across every price-surfacing component; multi-currency modals driven by backend validation rather than frontend rules.",
      "Four-phase extraction into an internal shared package (skeleton, data layer, first consumer integration, full extraction with concurrent-edit warnings), backed by re-export shims that kept old call sites working during migration.",
      "Document upload and job tracking: per-upload file limits, post-submit navigation so reps land on the results table, remove/retry on failed jobs, URL-threaded quote subject replacing fragile ref patterns.",
    ],
    outcomes: [
      "Eliminated an entire class of currency-drift support incidents tied to client-side recomputation.",
      "280+ personal commits at 6–8 per day across seven weeks, balancing feature work, refactors, and cross-team package extraction without blocking adjacent squads.",
      "Shared package now consumable by adjacent surfaces. The architectural bet paid off before the engagement ended.",
    ],
    tags: ["GraphQL", "AI UX", "Shared packages", "Client/server authority"],
    stack: [
      "React 17",
      "TypeScript",
      "Apollo Client",
      "GraphQL",
      "NX",
      "TanStack Table",
      "react-pdf",
      "react-hook-form",
      "Zod",
      "Playwright",
      "LaunchDarkly",
      "Biome",
    ],
  },
  {
    slug: "feathershark-fireops",
    company: "Feathershark",
    role: "Senior Frontend Engineer (Primary)",
    period: "Feb 2023 – Oct 2024",
    sector: "Municipal · FireOps",
    scope: "20 months · 2-person team",
    title: "Fire-department inspection SaaS.",
    stats: [
      { value: "30 min", label: "saved per inspection via AI-assisted reports" },
      { value: "6 migrations", label: "shipped without a deployability gap" },
    ],
    headline:
      "Primary frontend on a municipal fire-department SaaS: six foundational migrations plus seven domain modules, shipped continuously.",
    summary:
      "Sole frontend engineer on a 2-person team building and shipping a fire-department inspection platform to US municipalities. Owned the entire frontend surface and the integration contract with the backend. Delivered six foundational migrations (CRA → Vite, JavaScript → TypeScript, ad-hoc fetch → RTK Query, manual forms → react-hook-form + Zod, Google Maps → ArcGIS, ESLint + Prettier → Biome) without breaking deployability, then shipped seven domain modules: buildings, permits, inspections, emergency-response plans, a scheduling calendar, admin templates, and an external contractor portal.",
    highlights: [
      "Migrated 229 frontend files from JavaScript on CRA to TypeScript on Vite in the first three months, maintaining continuous deployability through the transition.",
      "Established RTK Query as the data layer with tag-based cache invalidation; became the load-bearing abstraction for every module shipped afterwards.",
      "Interactive GIS map with drag-and-drop safety markers (hydrants, extinguishers, hazmat, exits), persistent zoom/pan, and staged marker updates that eliminated re-render flicker.",
      "Address field handling three distinct cases cleanly: GIS autocomplete hit, custom coordinates, or manual entry. The quirks of US municipal GIS data made this non-trivial.",
      "Hierarchical checklist-template admin with drag-and-drop section and item reordering, fee-type fields, and cascading deletes. This is the authoring surface the product depends on.",
      "Full 2FA flow: setup, verify, and recovery states with a proper auth state machine integrated into the login lifecycle.",
      "Contractor-facing portal with role-based access, separate routing and component hierarchy, permit listing, activities, invoices, and document uploads. A distinct surface on the same platform.",
      "Multi-tenant branding and runtime configuration shifted from `.env` to a server-driven settings endpoint, eliminating redeploy cycles when onboarding a new customer.",
      "OpenAI 'improve with AI' action on rich-text fields, tuned temperature and prompts for professional fire-inspection language. Saves inspectors ~30 minutes per report.",
    ],
    outcomes: [
      "Sole frontend engineer for 20 months. Every architectural decision, migration, and module shipped under single ownership.",
      "Codebase shipped through six major migrations without a deployability gap; every change followed a strangler-pattern incremental path.",
      "Platform went live across US municipal fire departments and building-permit offices before engagement close.",
      "Multi-tenant runtime config ended the 'deploy to onboard' pattern. New customers onboarded via settings, not releases.",
    ],
    tags: ["Maps", "AI", "Multi-tenant", "Primary FE"],
    stack: [
      "React 18",
      "TypeScript 5",
      "Vite",
      "Redux Toolkit",
      "RTK Query",
      "react-hook-form",
      "Zod",
      "MUI",
      "MUI DataGrid Pro",
      "ArcGIS Maps SDK",
      "Mobiscroll",
      "OpenAI",
      "Biome",
      "Yarn 4 PnP",
    ],
  },
  {
    slug: "mongodb-web-platform",
    company: "MongoDB",
    role: "Senior Frontend Engineer",
    period: "Apr 2023 – Oct 2024",
    sector: "Developer Platform",
    scope: "18 months",
    title: "Design-system and performance work on mongodb.com.",
    stats: [
      { value: "LCP win", label: "on mongodb.com landing pages" },
      { value: "Hundreds", label: "of marketing forms migrated without regressions" },
    ],
    headline:
      "Cross-library design-system work on mongodb.com: token layer, shared components, and coordinated multi-package releases.",
    summary:
      "Shipped component-library features powering mongodb.com: a design-token layer, a high-level component library, and a unified navigation package consumed across properties. Owned backward-compatible API design for code used by dozens of engineers, coordinated multi-package release chains, and debugged style-precedence in a hybrid Tailwind + theme-ui stack.",
    highlights: [
      "Architected a multi-promo announcement bar spanning the token layer, the component library, and the shared navigation package. Coordinated release chain shipped without breaking downstream consumers.",
      "Added `fetchPriority=\"high\"` on hero images for a measurable LCP improvement on the highest-traffic marketing pages. Tiny diff, real Core Web Vitals win.",
      "Led a large marketing-form migration from Pardot to Eloqua across hundreds of forms: field mapping, post-submission rich-text rendering, defensive handling of incomplete CMS payloads.",
      "Card-grid revamp with variant sizing, hover treatments, inverse-theme fix, and graceful deprecation of legacy props. Backward-compatible consumer adoption across landing pages.",
      "Systematized style-precedence debugging by introducing a scoped override pattern in the hybrid Tailwind + theme-ui codebase; pattern became team practice.",
      "Unified image/video/embed handling behind a single media component API, reducing surface area and enabling rich-text JSON embeds.",
      "Hardened components against CMS drift with defensive null-checks and type exports, preventing build failures when the CMS returned incomplete payloads.",
    ],
    outcomes: [
      "Contributed across the full library set (design tokens, high-level components, unified navigation) with strict semver discipline and snapshot-test coordination.",
      "Measurable Core Web Vitals improvement on mongodb.com landing pages.",
      "Multi-promo banner rollout shipped without breaking changes for downstream consumers.",
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
    title: "Live game formats and routing backbone.",
    stats: [
      { value: "2 formats", label: "game types shipped end-to-end" },
      { value: "Real-time", label: "Socket.io leaderboards and live state machines" },
    ],
    headline:
      "Two full feature suites, navigation infrastructure, and full pt-BR localization for a Brazilian fantasy-sports platform.",
    summary:
      "Shipped two complete game-format suites end-to-end (a timed live-prediction format and a 1v1 head-to-head format), plus the navigation backbone and localization pipeline the rest of the team now relies on. Established Storybook as the primary development environment for complex game-state variants and built the real-time leaderboard path on Socket.io.",
    highlights: [
      "Timed live-prediction format from entry point through in-round questions, results, and real-time leaderboards; image preloading and question prefetching removed a class of perceived-latency bugs before launch.",
      "1v1 head-to-head format with prize calculation, play-next auto-proposal, multi-round carousel, and fifteen-plus documented state variants modeled in Storybook for isolated testing.",
      "Next.js router wrapper with explicit navigation history, scroll restoration on back-navigation, and section-anchor handling. Became the infrastructure every subsequent navigation touched.",
      "Storybook as the primary dev environment: 34 stories covering complex state mocks (auth, games, leagues, teams, Firebase) and accelerating card-based feature work across the team.",
      "Portuguese localization pipeline: 800+ translation keys compiled into TypeScript with zero fallback strings; each feature shipped with its pt-BR coverage validated before merge.",
      "Real-time leaderboards over Socket.io with explicit join/leave lifecycle and update subscriptions.",
      "Component consolidation: extracted a shared page-header component and carousel primitives that replaced duplicated variants across several surfaces.",
    ],
    outcomes: [
      "Owned two full feature suites plus the navigation backbone. Every subsequent team touchpoint ran through the router wrapper shipped during the engagement.",
      "Both feature suites live in the Brazilian market by engagement close.",
      "Storybook setup became a velocity force-multiplier for subsequent feature work. State variants prototyped in isolation before integration.",
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
      "Socket.io",
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
    title: "System Design & Architecture",
    body: "I map data flows, state boundaries, and primary interactions before the first component is written. Architecture that survives scale, team rotation, and the second rewrite.",
  },
  {
    icon: "layers",
    title: "Frontend Craft",
    body: "Interaction design, Core Web Vitals performance, and accessibility treated as a first-class constraint, not a final pass. The surface is where the work becomes visible.",
  },
  {
    icon: "lightbulb",
    title: "Product Mindset",
    body: "I ship the thing that moves the business metric, not the thing that's easiest to specify. Comfortable with ambiguous requirements, stakeholder exposure, and scoping under pressure.",
  },
  {
    icon: "code",
    title: "Scalable Codebases",
    body: "Typed boundaries between layers, migrations that don't block shipping, CI that catches regressions before they reach main. I've joined codebases at every lifecycle stage and left them healthier.",
  },
];

export type ApproachStatement = { title: string; body: string };

export const approach: ApproachStatement[] = [
  {
    title: "Systems, not screens.",
    body: "A small set of typographic, spatial, and motion primitives. Easier to extend, and easier to argue with, than a folder of one-off components.",
  },
  {
    title: "Solid foundations, sharp surfaces.",
    body: "Boring primitives at the core: a router, a form, a table. The considered work lives at the seams a user actually touches.",
  },
  {
    title: "Single source of truth wins.",
    body: "Client mirrors of backend calculations drift and create support tickets. The UI is a rendering layer over honest data, never a second authority.",
  },
  {
    title: "Ship beats debate.",
    body: "Async-remote native. A coherent choice I can defend beats a committee-driven compromise nobody owns.",
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
  { href: "#strengths", label: "Strengths" },
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
