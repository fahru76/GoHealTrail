import { Trail } from '@gohealt/shared-types'

export interface Alert {
  trailId: string
  level: 'info' | 'warning' | 'danger'
  title: string
  message: string
}

export const demoTrails: Trail[] = [
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
    id: 't-003',
    name: 'Batu Burok Jungle Route',
    state: 'Pahang',
    difficulty: 'easy',
    distanceKm: 4.2,
    durationMinutes: 150,
    hasWater: false
  },
  {
    id: 't-004',
    name: 'FRIM River Trail',
    state: 'Selangor',
    difficulty: 'easy',
    distanceKm: 5,
    durationMinutes: 120,
    hasWater: false
  },
  {
    id: 't-005',
    name: 'Mount Nuang Camp Ridge',
    state: 'Selangor',
    difficulty: 'hard',
    distanceKm: 9,
    durationMinutes: 320,
    hasWater: true
  }
]

export const demoAlerts: Alert[] = [
  {
    trailId: 't-002',
    level: 'warning',
    title: 'Recent heavy rain',
    message: 'Sections near summit are slippery. Carry anti-slip gear and avoid dusk travel.'
  },
  {
    trailId: 't-004',
    level: 'info',
    title: 'Updated water refill point',
    message: 'Water station at FRIM River Trail checkpoint is open on weekends.'
  }
]

export const offlineManifestVersion = '2026-09-07'
