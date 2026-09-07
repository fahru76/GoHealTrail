# Monorepo Setup Checklist

## Immediate setup (Day 1)

- [ ] Create app skeleton for `apps/web`, `apps/mobile`, `apps/api`
- [ ] Initialize shared package workspace config
- [ ] Add code style/lint/format baseline
- [ ] Add CI workflow template
- [ ] Create `docs/` process folders

## Workflow baseline

- Branch model: `main` + `dev` + feature branches
- PR requirements:
  - at least one functional review
  - at least one design + one QA check
  - tests for changed code (or approved reason if impossible)
- Versioning: SemVer for APIs and app releases

## Security and privacy baseline

- Data minimization: collect only required fields
- Location permission rationale per feature
- Encryption for stored sensitive user and incident data
- Role matrix and endpoint guardrails

## Offline-ready strategy (mandatory for mobile)

- Local cache for selected route, trail details, and checklists
- Sync queue with retry and conflict resolution
- Warning state if data is stale beyond threshold

## Delivery milestones template

### Milestone 1 (2 weeks)
- Project scaffolding + map baseline + auth + trail cards

### Milestone 2 (4 weeks)
- Trip planner + weather + trip checklist + family sharing

### Milestone 3 (6 weeks)
- Offline mode + SOS flow + user reports + moderation queue

### Milestone 4 (8 weeks)
- Monetization layer: premium + featured listings + basic admin dashboard
