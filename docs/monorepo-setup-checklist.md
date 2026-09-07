# Monorepo Setup Checklist

## Immediate setup (Day 1)

- [x] Initialize app skeleton for `apps/web`, `apps/mobile`, `apps/api`
- [x] Initialize shared packages: `design-system`, `shared-types`, `shared-ui`, `geo`
- [x] Add baseline CI and GitHub workflow
- [x] Add issue/PR process templates
- [ ] Add package-level lint/test config
- [ ] Add Docker + local infra examples

## Workflow baseline

- Branch model: `main` + `dev` + feature branches
- PR requirements:
  - at least one functional review
  - at least one design + one QA check
  - tests for changed code (or explicit approved reason)
- Versioning: SemVer for API and app releases

## Security and privacy baseline

- Data minimization: collect only required fields
- Location permission rationale per feature
- Encryption for sensitive user and incident data
- Role matrix and endpoint guardrails

## Offline-ready strategy (mandatory for mobile)

- Local cache for selected routes and trip plans
- Sync queue with retries and conflict resolution
- Warning state if data is stale beyond threshold

## Delivery milestones template

### Milestone 1 (2 weeks)
- [x] Project scaffolding + map baseline + auth + trail cards

### Milestone 2 (4 weeks)
- [x] Trip planner + weather + checklist + family sharing

### Milestone 3 (6 weeks)
- [x] Offline mode + SOS flow + user reports + moderation queue

### Milestone 4 (8 weeks)
- [x] Monetization layer: premium + featured listings + basic admin dashboard
