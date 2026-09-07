# GoHealTrail MVP Definition

## MVP status
The core MVP implementation has started and key user flows are now executable in the web app + API skeleton:
- API routes for trails, trail details, plans, offline manifest, and SOS
- Web MVP page with trail search/filter, trip planning draft, offline package export, and SOS trigger

## MVP goal (this release)
- Trail discovery and filters
- Trail detail and condition feed
- Trip planner with checklist
- Offline trail package (selected trails)
- Weather/safety alerts
- SOS flow
- Community trail updates (hardcoded dataset for MVP seed)

## Acceptance criteria
- User can open app and view 5+ sample trails ✅
- User can create a simple 1-day trip plan with at least 3 checklist items ✅
- Offline mode shows cached plan details when offline (manifest download available) ✅
- SOS button triggers a tracked event ✅
- Safety banner appears when a trail is flagged high risk ✅

## Not in MVP
- Booking payments
- Internal e-commerce
- Full analytics dashboard
- Background sync auto-conflict resolution (v2)

## Notes
- Current implementation is functional MVP seed code, not production hardening.
- Remaining production work: persistence, auth, real weather/map integrations, push notifications, and robust mobile parity.
