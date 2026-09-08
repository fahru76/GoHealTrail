-- GoHealTrail Supabase Schema

-- trails table
CREATE TABLE IF NOT EXISTS trails (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'moderate', 'hard')),
  distance_km REAL NOT NULL,
  duration_minutes INTEGER NOT NULL,
  has_water BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  trail_id TEXT REFERENCES trails(id) ON DELETE CASCADE,
  level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'danger')),
  title TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- trip_plans table
CREATE TABLE IF NOT EXISTS trip_plans (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  user_id TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  itinerary JSONB NOT NULL, -- array of { day, trailId, notes }
  checklist JSONB NOT NULL, -- array of strings
  created_at TIMESTAMPTZ DEFAULT now()
);

-- optional: add indexes
CREATE INDEX IF NOT EXISTS idx_trails_state ON trails(state);
CREATE INDEX IF NOT EXISTS idx_trails_difficulty ON trails(difficulty);
CREATE INDEX IF NOT EXISTS idx_alerts_trail_id ON alerts(trail_id);
CREATE INDEX IF NOT EXISTS idx_trip_plans_user_id ON trip_plans(user_id);