# GoHealTrail Architecture

## System snapshot
- **Frontend web**: feature dashboard, trail discovery, trip planning
- **Mobile**: expedition-first experience, offline cache, SOS
- **API**: authentication, search, trip CRUD, alerts, moderation, monetization controls
- **Data layer**: PostgreSQL with PostGIS + Redis
- **Shared domain packages**: types, UI primitives, geoutils

## High-level flow
1. User opens web/mobile and authenticates.
2. Client requests trail/trip data from API.
3. API reads PostgreSQL/PostGIS for trail metadata and route geometry.
4. External services:
   - Weather provider for forecast/hazard
   - Map tile provider and geocoding
   - Push notification service for alerts
5. API publishes audit-safe events for incidents and safety actions.
6. Clients render map, plans, and safety cards.

## Data model (minimum)
- `users` (`id`, `name`, `email`, `locale`, `role`)
- `trails` (`id`, `name`, `state`, `difficulty`, `distance_km`, `duration_min`, `geometry`, `source`, `status`)
- `trip_plans` (`id`, `user_id`, `title`, `start`, `end`, `items`, `checklist`, `status`)
- `trip_plan_checkpoints` (`id`, `trip_plan_id`, `trail_id`, `sequence`, `notes`)
- `trail_conditions` (`id`, `trail_id`, `reported_by`, `reported_at`, `severity`, `text`, `media`)
- `emergency_events` (`id`, `trip_plan_id`, `user_id`, `lat`, `lng`, `channel`, `payload`, `created_at`)
- `premium_subscriptions` (`id`, `user_id`, `plan`, `status`, `started_at`, `ends_at`)

## Non-functional requirements
- Offline first behavior for critical trail/plan data
- < 2s for search response under normal network
- Audit trail for safety actions
- Role-based controls for moderation and payouts

## Deployment target
- API on managed container or serverless
- PostgreSQL with PostGIS extension
- CDN for map/static assets
- Secret store for keys and tokens
