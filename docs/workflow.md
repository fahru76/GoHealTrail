# GoHealTrail Planning Workflow (Web + Mobile)

## 0) Scope and product intent (for Malaysia outdoor travelers)
GoHealTrail should be planned as a **Trail Discovery + Planning + Safety platform** for Malaysia:
- hiking / jungle trails / campsites / eco-tourism
- weather + danger awareness
- trip planning + offline navigation support
- user-generated trail intelligence and community trust signals

## 1) Repository planning structure

Recommended folder structure (monorepo-ready):

```
GoHealTrail/
  apps/
    web/                 # React/Next.js frontend (marketing + dashboard + responsive web app)
    mobile/              # React Native / Expo app (offline-first trail mode)
    api/                 # Node/NestJS/FastAPI service layer
  packages/
    design-system/       # Tailwind tokens, reusable UI primitives, accessibility patterns
    shared-types/        # shared TS types (user, trail, checkpoint, booking, weather)
    shared-ui/           # reusable components used by web/mobile when possible
    geo/                 # geo helper utilities (GPX/GeoJSON parsing, distance, elevation)
  infra/
    docker/
    iac/                 # Terraform/Cloud templates
    observability/
  docs/
    workflow/
    api/
    architecture/
  scripts/
  .github/
```

## 2) Workflow phases (mandatory sequence)

### Phase A — Discovery + problem framing
1. Confirm user personas (family, beginner hikers, serious trekkers, guides, campers).
2. Write 5–8 **user jobs** and 10–12 **scenarios**.
3. Define success metrics for MVP.
4. Freeze non-goals (prevent scope drift).

### Phase B — Product planning
1. Prioritize features into:
   - Must-have MVP
   - Should-have v1
   - Nice-to-have v2
2. Define data entities and ownership:
   - Trail, TrailSegment, TrailCondition, CampSite, User, TripPlan, EmergencyContact, Checklist.
3. Define trip safety policy:
   - fallback, location permission rules, data-retention policy, emergency contacts.
4. Define monetization model:
   - Premium features, partner listings, affiliate/referral, in-app booking commissions (phase-wise).

### Phase C — Design system before UI screens
1. Establish design tokens:
   - type scale, color system, radius, spacing, shadows, animation timing.
2. Define interaction patterns:
   - map-first card, map chip filters, checklist progression, emergency button hierarchy.
3. Define accessibility baseline:
   - WCAG 2.1 AA minimum, contrast, focus order, large-touch targets.
4. Build component checklist:
   - bottom sheets, map markers, cards, badges, progress trackers, timeline.

### Phase D — Technical architecture
1. API contract first (OpenAPI/JSON schema) before UI implementation.
2. Define database schema and indexing strategy.
3. Choose integration boundaries:
   - maps/geocoding/weather/cloud storage/auth/push notifications.
4. Define offline strategy:
   - background map cache, queued actions, deferred sync, stale-data warning states.

### Phase E — Delivery pipeline
1. Agile iterations with 1–2 week sprints.
2. Every sprint ends with: coded feature + tests + design review + security check.
3. Weekly risk review:
   - map licensing limits, weather API quotas, data freshness, user privacy.
4. Pre-release gates:
   - regression test, usability smoke test in low-signal scenario, emergency flow test.

## 3) MVP Work Breakdown (minimum viable set)

1. Trail discovery + filter (state, difficulty, distance, weather impact)
2. Trail detail page (route, photos, condition, warnings)
3. Trip planner (day-by-day + checklist)
4. Offline pack (selected trail map + notes)
5. Weather/safety alerts
6. SOS + quick-share location flow
7. Community updates (status notes, closure reports, difficulty confirmations)

## 4) Product roadmap gates

- **Gate 1 – Foundation**: architecture docs, schema, API contract, design tokens.
- **Gate 2 – Core**: authentication, trail search, map rendering, plan builder.
- **Gate 3 – Trust & Safety**: SOS, alerts, moderation, verification flags.
- **Gate 4 – Monetization**: premium layer + featured listing flow.
- **Gate 5 – Scale**: offline analytics, caching, recommendation engine.

## 5) Definition of Done (DoD)
A feature is done only when:
- API contract exists/updated.
- Happy path + error path tested.
- Accessibility checks done on key screens.
- Mobile + web responsive behavior verified.
- Design token usage only (no ad-hoc styling).
- Monitoring and structured logs added for production-relevant actions.
- Security/privacy impact reviewed.

## 6) Team workflow template

- Monday: planning + backlog grooming.
- Tuesday–Thursday: feature development.
- Friday: review + hardening + release candidate test.
- Bi-weekly: design QA + growth/analytics review.
- Monthly: roadmap adjustment using usage/retention/retention-churn signals.

## 7) Decision logs
Create `docs/decisions/` to store ADRs (Architectural Decision Records).
Each decision file should include:
- context
- decision
- alternatives
- risk
- migration/rollback path
