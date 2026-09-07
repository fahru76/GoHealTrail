"use client"

import { useMemo, useState } from 'react'
import type { Trail, TripPlan } from '@gohealt/shared-types'

const demoTrails: Trail[] = [
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

const demoAlerts = [
  {
    trailId: 't-002',
    level: 'warning' as const,
    title: 'Recent heavy rain',
    message: 'Sections near summit are slippery. Carry anti-slip gear and avoid dusk travel.'
  },
  {
    trailId: 't-004',
    level: 'info' as const,
    title: 'Updated water refill point',
    message: 'Water station at FRIM River Trail checkpoint is open on weekends.'
  }
]

const offlineManifestVersion = '2026-09-07'
const defaultChecklist = ['Water', 'Food', 'Power bank', 'First aid kit', 'Rain jacket']

function Checklist({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function FilterSection({
  state,
  difficulty,
  onState,
  onDifficulty,
  onClear
}: {
  state: string
  difficulty: string
  onState: (value: string) => void
  onDifficulty: (value: string) => void
  onClear: () => void
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, marginBottom: 16 }}>
      <select value={state} onChange={(event) => onState(event.target.value)}>
        <option value="">All states</option>
        <option value="Selangor">Selangor</option>
        <option value="Kelantan">Kelantan</option>
        <option value="Pahang">Pahang</option>
      </select>

      <select value={difficulty} onChange={(event) => onDifficulty(event.target.value)}>
        <option value="">Any difficulty</option>
        <option value="easy">Easy</option>
        <option value="moderate">Moderate</option>
        <option value="hard">Hard</option>
      </select>

      <button type="button" onClick={onClear}>Clear</button>
    </div>
  )
}

function TrailListItem({
  trail,
  onPlan
}: {
  trail: Trail
  onPlan: (trail: Trail) => void
}) {
  return (
    <li style={{ marginBottom: 12, border: '1px solid rgba(255,255,255,0.18)', padding: 12, borderRadius: 8 }}>
      <div style={{ fontWeight: 700 }}>{trail.name}</div>
      <div>
        {trail.state} · {trail.difficulty} · {trail.distanceKm} km · {trail.durationMinutes} min ·
        {trail.hasWater ? ' water point' : ' no dedicated water point'}
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="button" onClick={() => onPlan(trail)}>
          Create 1-day plan
        </button>
      </div>
    </li>
  )
}

export default function Home() {
  const [stateFilter, setStateFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [tripName, setTripName] = useState('Weekend Rescue Trail')
  const [selectedTrail, setSelectedTrail] = useState<Trail>(demoTrails[0])
  const [planSaved, setPlanSaved] = useState(false)
  const [checklist, setChecklist] = useState(defaultChecklist)

  const visibleTrails = useMemo(() => {
    return demoTrails.filter((trail) => {
      const byState = !stateFilter || trail.state === stateFilter
      const byDifficulty = !difficultyFilter || trail.difficulty === difficultyFilter
      return byState && byDifficulty
    })
  }, [stateFilter, difficultyFilter])

  const alertsCount = demoAlerts.length

  const lastPlan: TripPlan = {
    id: 'draft',
    title: tripName,
    userId: 'local-user',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    itinerary: [
      {
        day: 1,
        trailId: selectedTrail.id,
        notes: 'Start at 6:30 AM. Check weather and trail closure status.'
      }
    ],
    checklist
  }

  function createPlan() {
    if (typeof window === 'undefined') return

    const plan: TripPlan = {
      ...lastPlan,
      title: `${tripName} - ${selectedTrail.name}`,
      itinerary: [
        {
          day: 1,
          trailId: selectedTrail.id,
          notes: 'Use offline trail package and keep hydration points logged.'
        }
      ]
    }

    localStorage.setItem('gohealttrail:last-plan', JSON.stringify(plan))
    setPlanSaved(true)
  }

  function downloadOffline() {
    const payload = {
      manifestVersion: offlineManifestVersion,
      trails: visibleTrails,
      downloadedAt: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'gohealttrail-offline.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function triggerSOS() {
    alert('SOS request recorded: your location + contacts will be shared with support contacts.')
  }

  return (
    <main style={{
      margin: '0 auto',
      maxWidth: 960,
      padding: 24,
      lineHeight: 1.5,
      color: '#e8ebf1'
    }}>
      <h1>GoHealTrail MVP</h1>
      <p>Trail discovery, planning, and safety-first flow for Malaysia outdoors.</p>

      <section style={{ marginBottom: 22 }}>
        <h2>Safety banner</h2>
        <p>
          Active alerts: {alertsCount} · Offline manifest: {offlineManifestVersion}
        </p>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2>Discover trails</h2>
        <FilterSection
          state={stateFilter}
          difficulty={difficultyFilter}
          onState={setStateFilter}
          onDifficulty={setDifficultyFilter}
          onClear={() => {
            setStateFilter('')
            setDifficultyFilter('')
          }}
        />

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {visibleTrails.map((trail) => (
            <TrailListItem
              key={trail.id}
              trail={trail}
              onPlan={(trailItem) => {
                setSelectedTrail(trailItem)
                setTripName(`${trailItem.name} plan`)
                setPlanSaved(false)
              }}
            />
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 22 }}>
        <h2>Trip planner</h2>
        <label htmlFor="trip-name">Trip title</label>
        <input
          id="trip-name"
          value={tripName}
          onChange={(event) => setTripName(event.target.value)}
          style={{ display: 'block', marginBottom: 8 }}
        />

        <p>
          Plan for: <strong>{selectedTrail.name}</strong>
        </p>
        <Checklist items={lastPlan.checklist} />

        <div style={{ marginTop: 8 }}>
          <button type="button" onClick={createPlan}>
            Save trip plan
          </button>
          <button type="button" onClick={downloadOffline} style={{ marginLeft: 8 }}>
            Download offline trail package
          </button>
        </div>

        {planSaved && <p style={{ color: '#5cf1c3' }}>Saved locally in this browser (localStorage).</p>}
      </section>

      <section>
        <h2>Emergency</h2>
        <p>If conditions worsen, tap SOS to send tracked event.</p>
        <button type="button" onClick={triggerSOS}>Send SOS</button>
      </section>
    </main>
  )
}
