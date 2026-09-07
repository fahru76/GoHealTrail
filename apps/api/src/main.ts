import Fastify from 'fastify'
import cors from '@fastify/cors'
import { randomUUID } from 'node:crypto'
import { demoAlerts, demoTrails } from './data/trails'
import type { Trail, TripPlan } from '@gohealt/shared-types'

const server = Fastify({ logger: true })

await server.register(cors, {
  origin: true
})

const plans: TripPlan[] = [
  {
    id: 'plan-001',
    title: 'Weekend FRIM Escape',
    userId: 'demo-user',
    startDate: '2026-09-14',
    endDate: '2026-09-14',
    itinerary: [
      {
        day: 1,
        trailId: 't-004',
        notes: 'Start early, keep hydration and keep walking pace at moderate tempo.'
      }
    ],
    checklist: ['Power bank', 'Enough water', 'Trekking shoes', 'Torch', 'Emergency contacts']
  }
]

server.get('/health', async () => ({
  ok: true,
  service: 'gohealttrail-api',
  version: '0.1.0'
}))

server.get('/trails', async (request) => {
  const state = (request.query as { state?: string }).state
  const difficulty = (request.query as { difficulty?: string }).difficulty

  const filtered = demoTrails.filter((trail) => {
    const byState = state ? trail.state.toLowerCase() === state.toLowerCase() : true
    const byDifficulty = difficulty ? trail.difficulty === (difficulty as Trail['difficulty']) : true
    return byState && byDifficulty
  })

  return {
    trails: filtered,
    count: filtered.length
  }
})

server.get('/trails/:id', async (request, reply) => {
  const { id } = request.params as { id: string }
  const trail = demoTrails.find((item) => item.id === id)

  if (!trail) {
    await reply.code(404)
    return { error: 'Trail not found' }
  }

  const alerts = demoAlerts.filter((alert) => alert.trailId === id)
  return { trail, alerts }
})

server.get('/alerts', async () => ({
  alerts: demoAlerts,
  activeWarnings: demoAlerts.filter((alert) => alert.level !== 'info').length
}))

server.get('/plans', async (request) => {
  const userId = (request.query as { userId?: string }).userId
  const mine = userId ? plans.filter((plan) => plan.userId === userId) : plans
  return { plans: mine }
})

server.post('/plans', async (request, reply) => {
  const payload = request.body as {
    title?: string
    userId?: string
    startDate?: string
    endDate?: string
    itinerary?: Array<{ day: number; trailId: string; notes: string }>
    checklist?: string[]
  }

  const missing =
    !payload?.title ||
    !payload?.userId ||
    !payload?.startDate ||
    !payload?.endDate ||
    !Array.isArray(payload.itinerary) ||
    !Array.isArray(payload.checklist)

  if (missing) {
    await reply.code(400)
    return { error: 'Invalid plan payload' }
  }

  const plan: TripPlan = {
    id: randomUUID(),
    title: payload.title ?? '',
    userId: payload.userId ?? '',
    startDate: payload.startDate ?? '',
    endDate: payload.endDate ?? '',
    itinerary: payload.itinerary ?? [],
    checklist: payload.checklist ?? []
  }

  plans.push(plan)
  await reply.code(201)
  return plan
})

server.get('/offline-manifest', async () => ({
  generatedAt: new Date().toISOString(),
  version: demoTrails.length + '-' + new Date().toISOString().slice(0, 10),
  trails: demoTrails
}))

server.post('/sos', async (request, reply) => {
  const payload = request.body as {
    userId?: string
    latitude?: number
    longitude?: number
    contacts?: string[]
    notes?: string
  }

  if (!payload?.userId || typeof payload.latitude !== 'number' || typeof payload.longitude !== 'number') {
    await reply.code(400)
    return { error: 'Invalid SOS payload. userId and numeric latitude/longitude required.' }
  }

  const eventId = randomUUID()

  return {
    eventId,
    status: 'accepted',
    sharedLocation: {
      latitude: payload.latitude,
      longitude: payload.longitude
    },
    notes: payload.notes ?? 'No extra notes provided'
  }
})

server.listen({ host: '0.0.0.0', port: 8080 }).catch((err) => {
  server.log.error(err)
  process.exit(1)
})

export default server
