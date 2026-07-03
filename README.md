# portfolio

Personal site for Xan Torres, senior product engineer shipping production software since 2010, React and TypeScript for most of it. Built as a working piece of the portfolio itself: the stack on display is the stack I use day-to-day.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** with ref-as-prop throughout and `useTransition` for mutations
- **TypeScript** (strict)
- **Tailwind CSS v4** with OKLCH editorial tokens and CSS-variable theme bridge
- **shadcn/ui** primitives (new-york, zinc)
- **react-hook-form + Zod 4** form validation
- **Server Actions** for the contact endpoint
- **next-themes** dark/light toggle
- **Playwright + axe** for visual, overflow, and accessibility gates
- **Google DESIGN.md + Vizzly** for design-system linting and optional visual TDD review

## Contact form: layered anti-spam

The `/contact` form runs five checks in order, all fail-safe and all (except the first) env-gated so the site works locally without any credentials:

1. **Origin check.** Next.js built-in Server Action CSRF protection.
2. **Honeypot.** An invisible field bots fill; trips silently return success.
3. **Minimum fill time.** Submissions under 2s silently return success.
4. **Cloudflare Turnstile.** Invisible captcha verified server-side. Disabled when the env vars are missing.
5. **Upstash Redis rate limit.** 5 requests / 10 min sliding window per IP. Disabled when the env vars are missing.

Delivery uses **Resend**, falling back to a server-side log in development.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in what you want to test
npm run dev
```

Opens on http://localhost:3000. Everything in `.env.example` is optional; the site and contact form work with zero config.

## Environment

See [.env.example](.env.example). Summary:

| var | required | purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for metadata + sitemap. Defaults to the Vercel preview URL. |
| `CONTACT_TOKEN_SECRET` | recommended | HMAC secret for the contact form's per-visit fill-time token. Falls back to a non-secret default in dev. |
| `RESEND_API_KEY` | optional | Enables real email delivery via Resend. Without it, submissions are logged server-side. |
| `RESEND_FROM_EMAIL` | required *if `RESEND_API_KEY` is set* | Verified sender on your Resend account. |
| `CONTACT_TO_EMAIL` | required *if `RESEND_API_KEY` is set* | Recipient inbox. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` · `TURNSTILE_SECRET_KEY` | optional | Enables captcha. Both required together. |
| `UPSTASH_REDIS_REST_URL` · `UPSTASH_REDIS_REST_TOKEN` | optional | Enables per-IP rate limiting. Both required together. |

## Scripts

```
npm run dev         Next dev server (Turbopack)
npm run build       Production build
npm run start       Serve the production build
npm run lint        next lint (eslint-config-next flat config)
npm run typecheck   tsc --noEmit
npm run design:lint Validate DESIGN.md
npm run test:design Static anti-pattern checks
npm run test:visual Playwright visual + overflow checks
npm run test:a11y   Playwright axe checks
npm run vizzly:tdd  Start local visual TDD review loop
```

## Design system

The visual contract lives in [DESIGN.md](DESIGN.md). It defines the editorial direction, palette, typography, component rules, and anti-patterns.

The implemented system is dark-first and uses:

- `Geologica` for display type
- `Spline Sans` for body/UI
- `Spline Sans Mono` for metadata
- OKLCH CSS variables in `src/app/globals.css`, with muted trust-blue as the primary signal
- evidence plates generated from real case-study data

## Structure

```
src/
  app/
    layout.tsx            Root shell, fonts, theme provider, skip link
    page.tsx              Home, composes sections
    work/[slug]/page.tsx  SSG case-study detail (dynamicParams: false)
    error.tsx             Route-level error boundary
    global-error.tsx      Last-resort boundary
    not-found.tsx
    opengraph-image.tsx   Generated 1200×630 OG card
    icon.tsx              Favicon
    robots.ts / sitemap.ts
    globals.css           Tailwind v4 + OKLCH tokens
  components/
    ui/*                  shadcn primitives
    nav · hero · selected-work · approach · skills · contact · footer
    contact-form         Client form (RHF + Zod + honeypot + Turnstile)
    turnstile            Script loader with failure recovery
    theme-provider · theme-toggle
    section-header · icons
    proof-plate           Abstract evidence plates generated from case data
  lib/
    data.ts               Single source of profile + case studies + skills
    contact-action.ts     Server Action
    rate-limit.ts         Upstash wrapper
    utils.ts              `cn` helper
```

## Deploy

Vercel:

```bash
npx vercel         # deploy preview
npx vercel --prod  # promote
```

Add env vars in project settings. Custom domain in Domains tab.

## License

MIT. See [LICENSE](LICENSE).
