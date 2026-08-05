# plan.md — HOMEWORK Platform (Coach Samrat Aryan)

## 1) Objectives
- Convert `/app/frontend` into a **Next.js 15 (App Router) + React 19 + TypeScript** app runnable via supervisor on **0.0.0.0:3000**.
- Establish **Phase 1 foundation**: feature-based structure, global layout, Tailwind 3 design tokens (exact palette), reusable Header/Footer.
- Prove core risks early via POC:
  - Next dev server boots and is reachable from preview URL.
  - Prisma connects to **local Postgres (DB: homework)** and can migrate + read/write.
  - Determine whether **Next Route Handlers under `/api/*` are shadowed** by the existing FastAPI ingress; decide final API namespace.

## 2) Implementation Steps

### Phase 1 — Core POC (isolation; do not proceed until passing)
**User stories**
1. As a visitor, I can load the HOMEWORK website from the public preview URL without errors.
2. As a developer, I can run `next dev` via supervisor and keep it stable after restarts.
3. As a developer, I can run Prisma migrations against local Postgres and verify the schema is applied.
4. As a developer, I can insert and read back a record using Prisma to confirm DB connectivity.
5. As a developer, I can call a route endpoint and confirm whether `/api/*` is reachable from Next or intercepted by FastAPI.

**Steps**
1. **Websearch / best-practice check (short):** confirm Next.js 15 + React 19 + Tailwind 3 setup patterns and Prisma on App Router (migrate dev + generate).
2. **Replace CRA in `/app/frontend` with Next.js 15 app skeleton**
   - Update `package.json` to use **npm-installed deps** but keep supervisor compatibility:
     - Keep `yarn start` working by setting `"start": "next dev -H 0.0.0.0 -p 3000"`.
   - Add `next`, `react`, `react-dom`, `typescript`, `@types/*`, `eslint` (Next), `tailwindcss@3`, `postcss`, `autoprefixer`, `framer-motion`.
3. **Boot test**
   - Verify `supervisorctl status frontend` and load preview URL.
   - Ensure no hydration errors and no runtime exceptions.
4. **Prisma + Postgres POC**
   - Add `.env` with `DATABASE_URL=postgresql://postgres@127.0.0.1:5432/homework`.
   - Create minimal `prisma/schema.prisma` with one model (e.g., `Probe` with `id`, `createdAt`, `note`).
   - Run `prisma generate` + `prisma migrate dev`.
   - Add a Node script (or `tsx` script) that creates and reads a `Probe` row; assert results.
5. **Ingress routing POC for Route Handlers**
   - Create a Next Route Handler at `/api/ping` returning JSON.
   - Call `GET https://<preview>/api/ping` and inspect response.
   - Decision:
     - If intercepted by FastAPI: move Next endpoints to `/next-api/*` and scaffold `app/next-api/...`.
     - If not intercepted: keep `/api/*` for Next route handlers.

**Exit gate (must pass)**
- Next dev reachable publicly.
- Prisma migrate + CRUD probe succeeds.
- Clear decision on API namespace (`/api` vs `/next-api`).

---

### Phase 2 — V1 App Development (Phase 1 requirements + clickable routes)
**User stories**
1. As a visitor, I see a sticky Header with HOMEWORK branding and clear navigation on mobile and desktop.
2. As a visitor, I can click every nav link and land on a page with correct title/description metadata.
3. As a visitor, I can quickly find a “Book Free Consultation” CTA that is visually consistent across the site.
4. As a visitor, I can scroll to a trustworthy Footer with policy links and Coach Samrat’s socials.
5. As a visitor, the site feels “healthcare clean” (light background, subtle borders, cyan only for CTAs) and loads fast.

**Steps**
1. **Folder structure (feature-based)**
   - Create required directories:
     - `app/(routes)/about-coach`, `programs`, `free-resources`, `transformations`, `contact`
     - Route handlers per POC decision: `app/api/lead`, `app/api/contact` or `app/next-api/...`
     - `components/ui`, `components/home`, `components/about`, `components/programs`, `components/testimonials`, `components/resources`, `components/contact`, `components/layout`
     - `lib/prisma.ts`, `lib/data.ts`, `lib/utils.ts`, `lib/actions.ts`, `types/`, `public/images`, `public/icons`
2. **Design system (Tailwind 3 + CSS variables)**
   - Configure `tailwind.config.js` and `globals.css` with exact tokens:
     - Text `#1F2D3D`, Accent `#22B8CF`, BG `#F8FCFD`, Surface `#FFFFFF`, Border `#E6F2F5`, Hover `#179DB3`.
   - Enforce constraints: no dark backgrounds; accent reserved for CTA/active/icon badges.
3. **Global layout**
   - Implement `app/layout.tsx` (Server Component), font setup, metadata defaults.
   - Add `components/layout/Header.tsx` (sticky nav, mobile menu if needed as client component only).
   - Add `components/layout/Footer.tsx` with:
     - Privacy/Terms/Refund links (routes or external placeholders if not yet implemented)
     - Social links: Instagram `@homework_samrat`, YouTube `@samrataryan`
     - Contact: `contact@homework.fit`
4. **Pages + metadata (clickable placeholders)**
   - Implement each route page with its own `export const metadata` and a simple hero section component:
     - `/about-coach`, `/programs`, `/free-resources`, `/transformations`, `/contact`
   - Ensure each page is built from reusable section components (no monolithic page files).
5. **API stubs (env-gated)**
   - Create route handlers for lead/contact that validate payload with Zod and return safe responses.
   - Keep Resend/UploadThing wiring **disabled by default** unless env keys exist.
6. **Testing checkpoint**
   - Run `npm run lint` + `npm run typecheck` (add scripts) and fix all warnings/errors.
   - Manual UX pass: responsive header/footer, accessible nav, focus states, SEO metadata.

---

### Phase 3 — Add more features (post-Phase-1 backlog; only after Phase 2 is stable)
**User stories**
1. As a visitor, I can submit a consultation request and receive a confirmation message.
2. As a visitor, I can upload transformation images/resources when enabled.
3. As an admin/coach, I can view captured leads in the database.
4. As a visitor, I can browse structured programs/resources with clear pricing and inclusions.
5. As a visitor, I can trust the site because policies and contact flows work end-to-end.

**Steps**
- Implement DB models for leads/contact submissions.
- Enable Resend integration (env-gated) and send transactional emails.
- Enable UploadThing (env-gated) for uploads.
- Add content-rich sections and program cards, transformations gallery, resources list.
- Add basic admin view (no auth yet) behind a simple env-guarded route for internal review.
- End-to-end testing + regressions.

## 3) Next Actions
1. Run Phase 1 POC: replace CRA with Next, boot under supervisor, verify preview URL.
2. Add Prisma minimal schema + migrate + probe CRUD script.
3. Test route handler reachability and lock API namespace decision.
4. Implement Phase 2 scaffold: tokens, layout, header/footer, route pages with metadata.

## 4) Success Criteria
- **POC:** Next app loads from preview URL; Prisma migrate + CRUD works against local Postgres; confirmed API routing strategy.
- **Phase 1 deliverable:** exact color palette via Tailwind tokens/CSS vars; feature-based folders exist; global layout + sticky header/footer; all route pages clickable with page-specific metadata.
- **Quality:** zero TypeScript errors, zero ESLint warnings, no hydration mismatch, mobile-first responsive, accessible navigation and focus states.
