# portfolio

Personal site for Xan Torres — senior frontend engineer, 14+ years on production TypeScript/React. Built as a working piece of the portfolio itself: the stack on display is the stack I use day-to-day.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** — ref-as-prop throughout, `useTransition` for mutations
- **TypeScript** (strict)
- **Tailwind CSS v4** with OKLCH tokens and CSS-variable theme bridge
- **shadcn/ui** primitives (new-york, zinc)
- **react-hook-form + Zod 4** form validation
- **Server Actions** for the contact endpoint
- **next-themes** dark/light toggle
- **sonner** toasts · **lucide-react** icons

## Contact form — layered anti-spam

The `/contact` form runs five checks in order, all fail-safe and all (except the first) env-gated so the site works locally without any credentials:

1. **Origin check** — Next.js built-in Server Action CSRF protection.
2. **Honeypot** — an invisible field bots fill; trips silently return success.
3. **Minimum fill time** — submissions under 2s silently return success.
4. **Cloudflare Turnstile** — invisible captcha verified server-side. Disabled when the env vars are missing.
5. **Upstash Redis rate limit** — 5 requests / 10 min sliding window per IP. Disabled when the env vars are missing.

Delivery uses **Resend**, falling back to a server-side log in development.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in what you want to test
npm run dev
```

Opens on http://localhost:3000. Everything in `.env.example` is optional — the site and contact form work with zero config.

## Environment

See [.env.example](.env.example). Summary:

| var | purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata + sitemap |
| `RESEND_API_KEY` | Enables real email delivery via Resend |
| `RESEND_FROM_EMAIL` | Verified sender on your Resend account (default: `onboarding@resend.dev`) |
| `CONTACT_TO_EMAIL` | Recipient — required when `RESEND_API_KEY` is set |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` · `TURNSTILE_SECRET_KEY` | Enables captcha |
| `UPSTASH_REDIS_REST_URL` · `UPSTASH_REDIS_REST_TOKEN` | Enables per-IP rate limiting |

## Scripts

```
npm run dev         Next dev server (Turbopack)
npm run build       Production build
npm run start       Serve the production build
npm run lint        next lint (eslint-config-next flat config)
npm run typecheck   tsc --noEmit
```

## Structure

```
src/
  app/
    layout.tsx            Root shell, fonts, theme provider, skip link
    page.tsx              Home — composes sections
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

MIT — see [LICENSE](LICENSE).
