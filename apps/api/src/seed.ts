import { supabase } from './lib/supabase.js'
import { demoTrails, demoAlerts } from './data/trails.js'

export async function seedDatabase() {
  console.log('Seeding database...')

  // Insert trails
  const { error: trailsError } = await supabase
    .from('trails')
    .upsert(demoTrails, { onConflict: 'id' })
  if (trailsError) {
    console.error('Error seeding trails:', trailsError)
    throw trailsError
  }
  console.log(`Inserted/updated ${demoTrails.length} trails`)

  // Insert alerts
  const { error: alertsError } = await supabase
    .from('alerts')
    .upsert(demoAlerts.map(a => ({ ...a, id: undefined })), { onConflict: 'id' })
  if (alertsError) {
    console.error('Error seeding alerts:', alertsError)
    throw alertsError
  }
  console.log(`Inserted/updated ${demoAlerts.length} alerts`)

  console.log('Seeding complete')
}