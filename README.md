# GoHealTrail

GoHealTrail is a web + mobile platform for **planning, tracking, and safely enjoying outdoor trips in Malaysia**.

It focuses on:
- trail discovery
- trip planning and packing
- offline-ready map and route support
- weather/safety alerts
- community trail updates
- monetizable premium + partner ecosystem

## Repository status

This repository currently contains the **planning and repo scaffolding** for a full-stack implementation. Core product code has not been written yet.

## MVP target (first release)

1. Trail discovery + filters
2. Trail detail and condition page
3. Trip planner with checklist
4. Offline trail cache (selected routes)
5. Weather and safety alert cards
6. SOS / shared emergency flow
7. Community trail updates

## Monorepo layout

```text
GoHealTrail/
  apps/
    web/                # Next.js web app
    mobile/             # Expo mobile app
    api/                # API service
  packages/
    design-system/      # design tokens + reusable primitives
    shared-types/       # shared domain types
    shared-ui/          # reusable components
    geo/                # geospatial helpers
  infra/
    docker/
    iac/
  docs/
  .github/
```

## Quick setup

### 1) install deps

```bash
npm install
```

### 2) run web app (dev)

```bash
npm run dev --workspace @gohealt/web
```

### 3) run API (dev)

```bash
npm run dev --workspace @gohealt/api
```

## Branching

- `main`: production-ready state
- `dev`: integration branch

## Development rules

- API-first by default: define contracts before UI work.
- Every feature must have clear acceptance criteria.
- Safety and privacy checks are mandatory for map/location flows.
- Accessibility and offline behavior are part of the DoD.

## Next actions

- Scaffold full app implementation in `apps/` and `packages/`
- Generate UI kit and onboarding flows
- Wire location services and weather integration
- Add CI and PR templates in `.github/`
