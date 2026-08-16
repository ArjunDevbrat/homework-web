# plan.md — HOMEWORK Platform (Coach Samrat Aryan)

## 1) Objectives
- Deliver and maintain a **production-grade Next.js 15 (App Router) + React 19 + TypeScript** application in `/app/frontend`, runnable under supervisor on **0.0.0.0:3000**.
- Provide a clean, scalable architecture:
  - **Feature-based structure** (UI, domain, services, repositories separated; Prisma isolated).
  - **Tailwind 3 design system** using the exact palette and constraints (light-only backgrounds; cyan reserved for CTAs/active/icons/badges).
  - **Global layout shell** (sticky header + footer, SEO metadata, JSON-LD, sitemap/robots, a11y baseline).
- Establish a complete **Phase 2 centralized data + schema layer**:
  - Centralized content store in `lib/data.ts` with strict readonly domain types in `types/index.ts`.
  - **Consultation lead capture** using a 7-field consultation form (Server Actions + Route Handlers), Zod validation, Prisma/Postgres persistence, and a WhatsApp handoff link.
  - **Contact submissions** captured and persisted to Postgres.
  - Seed + migration system that is repeatable and idempotent.
- Ensure preview-environment reliability:
  - Keep `/api/*` Route Handlers reachable even when preview ingress forwards `/api/*` to another backend.
  - Ensure Server Actions work behind the preview proxy (allowedOrigins configured).
  - Keep local Postgres stable across pod restarts (self-healing start script + bootstrap script).

**Current status:** Phase 1 POC and Phase 2 (Centralized Data Store, Types & DB Schemas) are complete and tested at **100%** (see `/app/test_reports/iteration_2.json`: backend 11/11, frontend 100%, database 100%, mobile 100%). Next work begins in Phase 3 with “PROMPT 3A: Upper Homepage Sections (Hero to Coach)” and production integrations.

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
1. Replaced the CRA frontend with **Next.js 15** app scaffold in `/app/frontend` (npm-only dependencies).
2. Set local Postgres connectivity via `.env` and confirmed Prisma generate/migrate.
3. Added `/app/frontend/scripts/test-core.ts` to verify Prisma CRUD, Zod pipeline, local/public reachability, and route handler reachability.
4. Confirmed preview ingress shadowed `/api/*` to port 8001 and fixed it by converting `/app/backend/server.py` into a **transparent reverse proxy** forwarding `/api/*` to Next.js (no business logic).

**Exit gate (passed)**
- Next dev reachable publicly.
- Prisma migrate + CRUD succeeds.
- API namespace decision: **Keep Next Route Handlers at `/api/*`** and proxy `/api/*` to Next in preview.

---

### Phase 2 — V1 App Development + Centralized Data Store, Types & DB Schemas
**User stories**
1. As a visitor, I see a sticky Header with HOMEWORK branding and clear navigation on mobile and desktop.
2. As a visitor, I can click every nav link and land on a page with correct title/description metadata.
3. As a visitor, I can quickly find a “Book Free Consultation” CTA consistent across the site.
4. As a visitor, I can scroll to a trustworthy Footer with policy links, contact email, socials, and credentials.
5. As a visitor, I can submit a free consultation request; it persists to Postgres and offers a WhatsApp handoff.
6. As a visitor, I can submit a general enquiry; it persists to Postgres.
7. As a developer, I have a single source of truth for content and strict types for all UI surfaces.

**Steps (completed)**
1. **Folder structure (feature-based)**
   - Implemented:
     - `app/(routes)/{about-coach,programs,free-resources,transformations,contact,privacy-policy,terms,refund-policy}`
     - `app/api/{lead,contact}`
     - `components/{ui,layout,home,about,programs,resources,testimonials,contact}`
     - `lib/{prisma,data,utils,validations,actions,metadata,repositories,services,placeholders}`
     - `types/`, `prisma/schema.prisma`, `public/{images,icons}`

2. **Design system (Tailwind 3 + CSS variables)**
   - Tailwind tokens + CSS variables configured with the exact palette:
     - Text `#1F2D3D`, Accent `#22B8CF`, BG `#F8FCFD`, Surface `#FFFFFF`, Border `#E6F2F5`, Hover `#179DB3`.
   - Enforced constraints: light-only backgrounds; cyan reserved for CTAs/active/icons/badges.

3. **Global layout**
   - `app/layout.tsx` with:
     - `next/font` (Bricolage Grotesque + Instrument Sans)
     - SEO defaults + JSON-LD
     - skip-to-content accessibility link
     - Sticky header + footer
   - Header: logo, desktop nav with active underline, CTA, Radix Dialog mobile menu.
   - Footer: legal links, email, socials, credentials and medical disclaimer.

4. **Pages + metadata**
   - Implemented 9 routes, each with its own metadata:
     - `/`, `/about-coach`, `/programs`, `/free-resources`, `/transformations`, `/contact`, `/privacy-policy`, `/terms`, `/refund-policy`.
   - Added `sitemap.ts`, `robots.ts`, `not-found.tsx`, `error.tsx`.

5. **Centralized types and data store (Phase 2 deliverable)**
   - `types/index.ts` rewritten with strict readonly domain types:
     - HeroMetrics/HeroMetric, CoachProfile (+ Qualification + CoachPrinciple), ConditionTreated (+ ConditionCategory), ProgramPackage,
       WorkflowStep, ClientJourneyStep, FAQItem (+ FAQCategory), FreeResource, TestimonialItem, ConsultationFormData,
       ContactSubmissionData, Gender, PrimaryGoal, SelectOption, ActionState, IconName (38 icons).
   - `lib/data.ts` is now the single centralized content store:
     - 3 hero metrics (1500+ Clients Counselled, Certified Coach & Dietitian, Science-Based Approach)
     - full coach profile (4-paragraph thin-physique-to-coach story, degrees/certs)
     - exactly 16 conditions treated grouped into 5 categories
     - exactly 3 programs (Holistic Health, Diet Plans, Exercise Only with 3-day free trial)
     - 5-step workflow
     - 7-step client journey
     - exactly 10 detailed FAQs (5 on home, 5 on /programs)
     - exactly 8 free guides
     - 4 testimonials
     - goal/gender options + consultation steps

6. **Utility helpers & validation**
   - `lib/placeholders.ts`: fallback portrait/testimonial/resource images and safe resolvers.
   - `lib/validations.ts`: `consultationSchema` + `contactSchema` + `toFieldErrors()`.
   - `lib/utils.ts`: `cn`, `absoluteUrl`, `formatDate`, `normalisePhone`, `isActiveRoute`, label helpers,
     `buildWhatsAppMessage` and `generateWhatsAppLink(formData)` producing a `wa.me` URI.
   - WhatsApp behavior: when `NEXT_PUBLIC_WHATSAPP_NUMBER` is unset, a number-less `https://wa.me/?text=...` link is generated (documented fallback).

7. **Prisma & database setup**
   - Prisma models and enums:
     - `Lead` (fullName, phone, email?, age, gender, goal, healthIssue, profession, programSlug?, status, source, whatsappSent, timestamps + indexes)
     - `ContactSubmission` (renamed from ContactMessage)
     - `HealthProbe` (for smoke connectivity tests)
     - enums: `LeadStatus`, `Gender`, `PrimaryGoal`
   - Migration: single clean migration `*_init_data_architecture` applied.
   - Seed: `prisma/seed.ts` idempotently inserts 4 demo leads + 2 demo enquiries; does not touch real submissions.
   - npm scripts:
     - `db:seed`, `db:reset` and Prisma seed configured to `tsx prisma/seed.ts`.

8. **Service layer and UI rewiring**
   - Repositories/services/actions/route handlers updated:
     - `lead-repository`: createLead, markLeadWhatsAppSent, createContactSubmission, countLeads, listRecentLeads
     - `lead-service`: submitConsultation (returns whatsappUrl), submitContactMessage
     - `actions.ts`: submitConsultationAction, submitContactAction
     - Route handlers: `POST /api/lead`, `POST /api/contact`
   - Frontend rewired to use new content/types:
     - ConsultationForm (7 required fields + consent + WhatsApp handoff)
     - FocusAreas (4 featured conditions)
     - ConditionsTreated (16 conditions, 5 groups)
     - ClientJourney (7 steps)
     - WorkflowSteps (5 steps)
     - ProgramCard (deliverables + free-trial badge)
     - ResourceCard (format/pages/highlights)
     - TestimonialCard (quote + metric badges + optional image)
     - Category-labeled FAQ accordion
     - About page and footer now driven by coach profile

9. **Preview reliability fixes (completed)**
   - Next Server Actions allowed origins: configured `experimental.serverActions.allowedOrigins` in `next.config.mjs` using `NEXT_PUBLIC_SITE_URL` + `ADDITIONAL_ALLOWED_ORIGINS`.
   - Local Postgres resilience:
     - `/app/scripts/start_postgres.sh` self-heals postgres OS user and binaries and clears stale locks.
     - `/app/scripts/bootstrap_env.sh` can restore supervisor program definitions after pod recycle and redeploy migrations.

10. **Quality gates + testing (completed)**
   - `tsc --noEmit` clean
   - `next lint --max-warnings=0` clean
   - `npm run build` succeeds
   - `/app/frontend/scripts/test-core.ts` passes 6/6
   - Testing agent: `/app/test_reports/iteration_2.json` is 100% green (backend, frontend, database, mobile)

**Exit gate (passed)**
- Phase 2 is fully complete and verified.

---

### Phase 3 — Expand upper homepage sections + production integrations (next backlog)
**User stories**
1. As a visitor, I see a richer top-of-homepage narrative (Hero → Coach intro) aligned to the new data store.
2. As a visitor, WhatsApp handoff opens a direct chat to the business number once configured.
3. As a visitor, the coach receives lead notifications by email once Resend keys are provided.
4. As a visitor, free guides can be downloaded and transformation media can be uploaded once UploadThing is enabled.
5. As an admin/coach, I can view and manage leads/contact submissions.
6. As a developer, I can deploy to Vercel using Neon Postgres (`DATABASE_URL` swap) with no code changes.

**Steps (planned / pending)**
1. **PROMPT 3A — Upper Homepage Sections (Hero to Coach)**
   - Rebuild/expand the top homepage experience using the centralized content primitives.
   - Add richer Coach intro section (video when available) and improved above-the-fold conversion flow.

2. **WhatsApp number**
   - Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (business number in international digits). Verify `generateWhatsAppLink` now targets `https://wa.me/<number>?text=...`.

3. **Resend integration (env-gated → live)**
   - Add verified sender + template refinements.
   - Confirm `emailDelivered:true` with real credentials.

4. **UploadThing integration**
   - Enable transformation photo uploads.
   - Enable downloadable PDFs for FreeResource.fileUrl.

5. **Admin view (internal)**
   - Create a simple, env-guarded admin route to list leads and contact submissions using `listRecentLeads`.

6. **Vercel + Neon**
   - Swap `DATABASE_URL` to Neon.
   - Validate migrations + seed behavior and remove preview-only proxy assumptions for production.

---

## 3) Next Actions
1. Start **PROMPT 3A** implementation: Upper homepage sections (Hero → Coach).
2. When available, set:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (business WhatsApp)
   - Resend env vars (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL`)
3. When ready, enable UploadThing and wire guide downloads + transformation media.
4. Build an env-guarded admin view for leads/contact submissions.
5. Prepare for Vercel deployment: swap `DATABASE_URL` to Neon.

---

## 4) Success Criteria
- **Phase 1:** Next app loads from preview URL; Prisma migrates and performs CRUD; `/api/*` Route Handlers reachable despite preview ingress.
- **Phase 2 (complete):**
  - Centralized content store + strict domain typing in place.
  - Exact palette + constraints enforced.
  - 9 routes with unique metadata, sitemap/robots, and accessibility baseline.
  - Consultation + contact flows persist to Postgres; WhatsApp link generated.
  - Seed is idempotent; migration is clean.
  - `tsc`, `eslint`, `build`, and `scripts/test-core.ts` are green.
  - Testing agent confirms 100% pass rate.
- **Phase 3 (target):**
  - Upper homepage improved for conversions.
  - WhatsApp business number and Resend notifications live.
  - UploadThing downloads/uploads live.
  - Admin view implemented.
  - Vercel + Neon deployment validated.
