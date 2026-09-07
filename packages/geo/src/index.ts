export interface Coordinates {
  lat: number
  lon: number
}

export function haversineKm(a: Coordinates, b: Coordinates): number {
  const R = 6371
  const dLat = deg2rad(b.lat - a.lat)
  const dLon = deg2rad(b.lon - a.lon)
  const sLat1 = deg2rad(a.lat)
  const sLat2 = deg2rad(b.lat)

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(sLat1) * Math.cos(sLat2)

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
  return R * c
}

function deg2rad(v: number) {
  return (v * Math.PI) / 180
}
