# plan.md — HOMEWORK Platform (Coach Samrat Aryan)

## 1) Objectives
- Deliver a **production-grade Next.js 15 (App Router) + React 19 + TypeScript** application in `/app/frontend`, runnable under supervisor on **0.0.0.0:3000**.
- Establish Phase 1–2 foundations:
  - **Feature-based architecture** (UI, domain, data access separated).
  - **Tailwind 3 design system** with the exact palette and constraints (light-only backgrounds; cyan reserved for CTAs/active/icons/badges).
  - **Global layout shell** (sticky header + footer, SEO metadata, JSON-LD, sitemap/robots).
  - **Lead capture** via **Server Actions** + **Route Handlers** with Zod validation and Prisma/Postgres persistence.
- Ensure preview-environment reliability:
  - Confirm `/api/*` routing works even when ingress forwards `/api/*` to a separate backend.
  - Ensure Server Actions work behind the preview proxy without origin mismatch failures.
  - Keep local Postgres stable across pod restarts (self-healing start script + bootstrap script).

**Current status:** Phase 1 POC and Phase 2 main build are complete. Remaining work is to re-run the testing agent to confirm all fixes and close out Phase 2.

---

## 2) Implementation Steps

### Phase 1 — Core POC (isolation; do not proceed until passing)
**User stories**
1. As a visitor, I can load the HOMEWORK website from the public preview URL without errors.
2. As a developer, I can run `next dev` via supervisor and keep it stable after restarts.
3. As a developer, I can run Prisma migrations against local Postgres and verify the schema is applied.
4. As a developer, I can insert and read back a record using Prisma to confirm DB connectivity.
5. As a developer, I can call a route endpoint and confirm whether `/api/*` is reachable from Next or intercepted by FastAPI.

**Steps (completed)**
1. Replace CRA in `/app/frontend` with Next.js 15 app scaffold; run using npm-installed dependencies; supervisor runs via `yarn start` → `next dev`.
2. Set local Postgres connectivity via `.env` and confirm Prisma generates/migrates.
3. Create and run `/app/frontend/scripts/test-core.ts` to verify:
   - Prisma CRUD round-trip
   - Zod pipeline
   - local + public reachability
   - Route handler reachability
4. Determine ingress routing behavior:
   - Found that preview ingress routes `/api/*` to FastAPI (shadowing Next).
   - Resolved by converting `/app/backend/server.py` into a transparent reverse proxy forwarding `/api/*` to Next.js.

**Exit gate (passed)**
- Next dev reachable publicly.
- Prisma migrate + CRUD succeeds.
- API namespace decision: **Keep Next Route Handlers at `/api/*`** and proxy `/api/*` to Next in preview.

---

### Phase 2 — V1 App Development (Phase 1 requirements + clickable routes)
**User stories**
1. As a visitor, I see a sticky Header with HOMEWORK branding and clear navigation on mobile and desktop.
2. As a visitor, I can click every nav link and land on a page with correct title/description metadata.
3. As a visitor, I can quickly find a “Book Free Consultation” CTA that is visually consistent across the site.
4. As a visitor, I can scroll to a trustworthy Footer with policy links and Coach Samrat’s socials.
5. As a visitor, I can submit a consultation request and a general message; submissions persist to Postgres.
6. As a visitor, the site feels “healthcare clean” (light background, subtle borders, cyan only for CTAs) and loads fast.

**Steps (completed)**
1. **Folder structure (feature-based)**
   - Implemented:
     - `app/(routes)/{about-coach,programs,free-resources,transformations,contact,privacy-policy,terms,refund-policy}`
     - `app/api/{lead,contact}`
     - `components/{ui,layout,home,about,programs,resources,testimonials,contact}`
     - `lib/{prisma,data,utils,validations,actions,metadata,repositories,services}`
     - `types/`, `prisma/schema.prisma`, `public/{images,icons}`

2. **Design system (Tailwind 3 + CSS variables)**
   - Tailwind tokens + CSS variables configured with the exact palette:
     - Text `#1F2D3D`, Accent `#22B8CF`, BG `#F8FCFD`, Surface `#FFFFFF`, Border `#E6F2F5`, Hover `#179DB3`.
   - Enforced constraints: light-only backgrounds; cyan reserved for CTAs/active/icons/badges.

3. **Global layout**
   - Implemented `app/layout.tsx` with:
     - `next/font` (Bricolage Grotesque + Instrument Sans)
     - SEO defaults + JSON-LD
     - skip-to-content accessibility link
     - Sticky header + footer
   - Header: logo, desktop nav with active underline, CTA, Radix Dialog mobile menu.
   - Footer: legal links, email, socials, credentials and medical disclaimer.

4. **Pages + metadata (clickable, real content placeholders)**
   - Implemented 9 routes, each with its own metadata:
     - `/`, `/about-coach`, `/programs`, `/free-resources`, `/transformations`, `/contact`, `/privacy-policy`, `/terms`, `/refund-policy`.
   - Added `sitemap.ts`, `robots.ts`, `not-found.tsx`, `error.tsx`.

5. **Lead/Contact submission (Server Actions + Route Handlers)**
   - Server Actions:
     - `submitLeadAction`, `submitContactAction` (Zod re-validated server-side).
   - Route Handlers:
     - `POST /api/lead`, `POST /api/contact` (Zod validated, Prisma persistence).
   - Resend transport is **env-gated** (email delivery optional; returns `emailDelivered:false` when unconfigured).

6. **Quality gates (green)**
   - `tsc --noEmit` clean
   - `next lint --max-warnings=0` clean
   - `npm run build` succeeds
   - `/app/frontend/scripts/test-core.ts` passes 6/6.

**Testing iteration 1 (result + fixes)**
- All backend API tests passed; UI/nav/SEO/a11y/design passed.
- **Critical issue found:** Server Actions blocked in preview due to Next.js origin check mismatch (`x-forwarded-host` vs `origin`).
- **Fix applied:** configured `experimental.serverActions.allowedOrigins` in `next.config.mjs`, driven by:
  - `NEXT_PUBLIC_SITE_URL`
  - `ADDITIONAL_ALLOWED_ORIGINS`
- **Additional reliability fix:** Postgres supervisor process became unavailable after a pod restart.
  - Updated `/app/scripts/start_postgres.sh` to be self-healing (ensure postgres user exists, ensure binaries installed, clear stale `postmaster.pid`).
  - Added `/app/scripts/bootstrap_env.sh` to re-register the supervisor `postgres` program (since `/etc/supervisor/conf.d` is not persistent) and redeploy migrations.
- **Manual browser verification:** lead and contact forms submit successfully via Server Actions; forms reset; `/contact?program=strength-recomp` prefill works.

**Exit gate (remaining)**
- Re-run testing agent to confirm Server Actions fix in the preview environment and close out Phase 2.

---

### Phase 3 — Add more features (post-Phase-2 backlog; only after Phase 2 is stable)
**User stories**
1. As a visitor, I can upload transformation photos/resources when enabled.
2. As a visitor, I receive transactional emails when Resend is configured.
3. As an admin/coach, I can view leads/contact messages in a basic admin view.
4. As a visitor, I can browse richer program details and transformation case studies.
5. As a developer, I can deploy to Vercel using Neon Postgres (`DATABASE_URL` swap) with zero code changes.

**Steps (future backlog)**
- Enable Resend end-to-end (env keys + verified sender), add coach notification templates.
- Enable UploadThing (env-gated) for transformation uploads.
- Add admin leads/messages view (env-guarded; add auth later).
- Add per-program detail pages and richer transformation pages (case study templates).
- Swap `DATABASE_URL` to Neon for Vercel deployment.
- Expand automated testing (Playwright/Cypress) and add regression suite.

---

## 3) Next Actions
1. **Re-run Testing Agent** to confirm Server Actions now work through the preview ingress.
2. Ensure Postgres resilience:
   - If a pod restart occurs and Postgres supervisor program disappears, run `sh /app/scripts/bootstrap_env.sh`.
3. Once testing is green, tag Phase 2 as complete and proceed only with Phase 3 items as needed.

---

## 4) Success Criteria
- **Phase 1:** Next app loads from preview URL; Prisma migrates and performs CRUD; `/api/*` Route Handlers reachable despite preview ingress.
- **Phase 2:**
  - Exact palette + constraints enforced.
  - Feature-based structure implemented.
  - Sticky header/footer, accessible mobile nav, SEO metadata per page.
  - Lead + contact flows persist data via Prisma/Postgres.
  - `tsc`, `eslint`, and `build` all pass.
  - Testing agent confirms no Server Action failures.
- **Quality:** zero TypeScript errors, zero ESLint warnings, no hydration mismatches, mobile-first responsive, accessibility-compliant focus states.
