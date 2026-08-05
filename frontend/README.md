# HOMEWORK — Coach Samrat Aryan

Production-grade coaching platform built with **Next.js 15 (App Router)**, **React 19**,
**TypeScript**, **Tailwind CSS 3**, **Framer Motion**, **React Hook Form + Zod**,
**Prisma ORM** and **PostgreSQL**.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15.1.6 (App Router, Server Components by default) |
| Language | TypeScript (strict, zero errors) |
| Styling | Tailwind CSS 3 (`tailwind.config.ts`) + CSS design tokens |
| Motion | Framer Motion 11, isolated in tiny client wrappers |
| Forms | React Hook Form + Zod (shared schema, re-validated server-side) |
| Data | Prisma + PostgreSQL |
| Mutations | Server Actions (`lib/actions.ts`) + Route Handlers (`app/api/*`) |
| Email | Resend (env-gated — optional) |
| Package manager | npm only |

## Architecture

```
app/
  (routes)/            about-coach, programs, free-resources, transformations,
                       contact, privacy-policy, terms, refund-policy
  api/lead             POST route handler (Zod validated)
  api/contact          POST route handler (Zod validated)
  layout.tsx           global shell: fonts, metadata, header, footer, JSON-LD
  page.tsx             home page composed of section components
  sitemap.ts robots.ts not-found.tsx error.tsx
components/
  ui/                  hand-built primitives (button, card, badge, input, accordion...)
  layout/              header, desktop-nav, mobile-nav, footer, cta-band, section...
  home/ about/ programs/ resources/ testimonials/ contact/   feature sections
lib/
  prisma.ts            singleton Prisma client
  data.ts              typed site content (nav, programs, resources, FAQs...)
  validations.ts       Zod schemas shared by actions and route handlers
  actions.ts           Server Actions
  metadata.ts          per-page metadata builder
  utils.ts             cn(), absoluteUrl(), formatDate(), isActiveRoute()
  repositories/        data access (Prisma only lives here)
  services/            lead-service (orchestration), email-service (Resend)
types/                 shared domain types
prisma/schema.prisma   Lead, ContactMessage, HealthProbe models
scripts/test-core.ts   isolation test for DB + validation + routing
```

Business logic never lives in UI components: components render, `lib/services` orchestrate,
`lib/repositories` persist.

## Design system

Exact palette, enforced through Tailwind tokens and CSS variables:

| Token | Hex |
| --- | --- |
| Primary text / slate | `#1F2D3D` |
| Accent / primary CTA | `#22B8CF` |
| Background | `#F8FCFD` |
| Surface / cards | `#FFFFFF` |
| Border / dividers | `#E6F2F5` |
| Hover | `#179DB3` |

Cyan is reserved for primary CTAs, active states, key icons and metric badges. Backgrounds
are always light. Section rhythm is `py-20 → py-28` with 1px `#E6F2F5` hairlines.

## Local development

```bash
npm install
npx prisma migrate deploy   # or: npx prisma migrate dev
npm run dev                 # http://localhost:3000
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string (swap in the Neon URL for production) |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical site origin, used by metadata + sitemap |
| `ADDITIONAL_ALLOWED_ORIGINS` | no | Extra hosts allowed to invoke Server Actions behind a proxy |
| `RESEND_API_KEY` | no | Enables coach notification emails |
| `RESEND_FROM_EMAIL` | no | Verified sender address |
| `LEAD_NOTIFICATION_EMAIL` | no | Where lead notifications are delivered |
| `UPLOADTHING_TOKEN` | no | Reserved for media uploads |

When the Resend variables are absent, submissions still persist and simply report
`emailDelivered: false`.

## Quality gates

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # production build
npx tsx scripts/test-core.ts   # DB + validation + route reachability
```

## Preview environment notes

In this preview container the ingress routes `/api/*` to a FastAPI process on port 8001.
`/app/backend/server.py` is therefore a **transparent reverse proxy** that forwards `/api/*`
to Next.js so the Route Handlers stay exactly where Vercel expects them. It contains no
business logic and is not deployed.

PostgreSQL runs under supervisor with its data directory at `/app/pgdata`. If a pod restart
removes the supervisor program definition, run:

```bash
sh /app/scripts/bootstrap_env.sh
```
