import Fastify from 'fastify'
import cors from '@fastify/cors'
import { randomUUID } from 'node:crypto'
import 'dotenv/config'
import { supabase } from './lib/supabase.js'
import { seedDatabase } from './seed.js'

const server = Fastify({ logger: true })

async function bootstrap() {
  await server.register(cors, {
    origin: true,
  })

  // Health check
  server.get('/health', async () => ({
    ok: true,
    service: 'gohealttrail-api',
    version: '0.1.0',
  }))

  // Seed endpoint (for development)
  server.post('/seed', async (request, reply) => {
    try {
      await seedDatabase()
      return { success: true }
    } catch (err) {
      await reply.code(500)
      return { error: 'Seed failed', details: String(err) }
    }
  })

  // GET /trails
  server.get('/trails', async (request) => {
    const state = (request.query as { state?: string }).state
    const difficulty = (request.query as { difficulty?: string }).difficulty

    let query = supabase.from('trails').select('*')
    if (state) query = query.ilike('state', `%${state}%`)
    if (difficulty) query = query.eq('difficulty', difficulty)

    const { data, error } = await query
    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return {
      trails: data || [],
      count: data?.length || 0,
    }
  })

  // GET /trails/:id
  server.get('/trails/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const { data: trail, error } = await supabase
      .from('trails')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !trail) {
      await reply.code(404)
      return { error: 'Trail not found' }
    }

    const { data: alerts, error: alertsError } = await supabase
      .from('alerts')
      .select('*')
      .eq('trail_id', id)

    if (alertsError) {
      await reply.code(500)
      return { error: `Database error: ${alertsError.message}` }
    }

    return { trail, alerts: alerts || [] }
  })

  // GET /alerts
  server.get('/alerts', async () => {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return {
      alerts: data || [],
      activeWarnings: (data || []).filter((a) => a.level !== 'info').length,
    }
  })

  // GET /plans
  server.get('/plans', async (request) => {
    const userId = (request.query as { userId?: string }).userId
    let query = supabase.from('trip_plans').select('*')
    if (userId) query = query.eq('user_id', userId)

    const { data, error } = await query
    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return { plans: data || [] }
  })

  // POST /plans
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

    const plan = {
      id: randomUUID(),
      title: payload.title,
      user_id: payload.userId,
      start_date: payload.startDate,
      end_date: payload.endDate,
      itinerary: payload.itinerary,
      checklist: payload.checklist,
    }

    const { data, error } = await supabase.from('trip_plans').insert(plan).select().single()

    if (error) {
      await reply.code(500)
      return { error: `Database error: ${error.message}` }
    }

    await reply.code(201)
    return data
  })

  // GET /offline-manifest
  server.get('/offline-manifest', async () => {
    const { data: trails, error } = await supabase.from('trails').select('*')
    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    return {
      generatedAt: new Date().toISOString(),
      version: `${(trails || []).length}-${new Date().toISOString().slice(0, 10)}`,
      trails: trails || [],
    }
  })

  // POST /sos
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
        longitude: payload.longitude,
      },
      notes: payload.notes ?? 'No extra notes provided',
    }
  })

  await server.listen({ host: '0.0.0.0', port: 8080 })
}

bootstrap().catch((err) => {
  server.log.error(err)
  process.exit(1)
})

export default server