import type { Trail, TripPlan } from '@gohealt/shared-types'

export const meta = {
  name: 'GoHealTrail Mobile',
  description: 'Nature and trail planning MVP shell',
  offlineFirst: true
}

export const trails: Trail[] = [
  {
    id: 't-001',
    name: 'Trekking to Bukit Broga Skywalk',
    state: 'Selangor',
    difficulty: 'moderate',
    distanceKm: 6.5,
    durationMinutes: 240,
    hasWater: true
  },
  {
    id: 't-002',
    name: 'Gunung Stong Sunset Loop',
    state: 'Kelantan',
    difficulty: 'hard',
    distanceKm: 11,
    durationMinutes: 360,
    hasWater: true
  },
  {
    id: 't-004',
    name: 'FRIM River Trail',
    state: 'Selangor',
    difficulty: 'easy',
    distanceKm: 5,
    durationMinutes: 120,
    hasWater: false
  }
]

export const alerts = [
  {
    trailId: 't-002',
    level: 'warning' as const,
    title: 'Heavy rain expected',
    message: 'Wear anti-slip shoes, avoid rocky shortcuts.'
  }
]

export const starterChecklist = ['Water', 'Food', 'Torch', 'Rain jacket', 'First aid kit']

export function buildPlan(title: string, userId: string, selectedTrailId: string): TripPlan {
  return {
    id: `plan-${Date.now()}`,
    title,
    userId,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    itinerary: [
      {
        day: 1,
        trailId: selectedTrailId,
        notes: 'Start early and keep offline map enabled.'
      }
    ],
    checklist: [...starterChecklist]
  }
}
