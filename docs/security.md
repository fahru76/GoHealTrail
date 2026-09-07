# GoHealTrail Security and Privacy

## Principles
- Collect the least data necessary.
- Keep raw location data scoped to requested features.
- Never expose emergency contacts publicly.
- Default to safer defaults: location sharing off until active trip begins.

## Auth and permissions
- JWT access tokens with short TTL for app sessions
- Refresh token rotation
- RBAC roles:
  - `user` (normal explorer)
  - `guide` (verified content/guide)
  - `admin` (moderation/ops)

## Data handling rules
- Encrypt sensitive fields at rest in DB (e.g., emergency contacts).
- Store location pings in event logs with retention policy defined in repo policy.
- Provide user deletion and data export flow.

## Incident flow
- Report severe hazards quickly with confidence and source.
- Auto-escalate severe safety events to admin queue.
- Add review status and audit metadata (`reported_by`, `verified_by`, timestamps).

## External API handling
- Never hardcode provider keys in client bundles.
- Use per-environment secrets.
- Retry with backoff; rate-limit protection for external weather APIs.
