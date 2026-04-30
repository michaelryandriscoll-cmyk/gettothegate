import airports from '@/data/airports.json'

export type FAQ = {
  q: string
  a: string
}

export type Airport = {
  slug: string
  name: string
  iata_code: string
  city: string
  state: string
  zip: string
  address: string
  lat: number
  lng: number
  annual_passengers: number
  type: string
  terminals: string[]
  avg_days_parked: number
  parking_market: string
  neighborhoods: string[]
  transit: string
  parking_tips: string
  best_lots: string
  worst_lots: string
  short_term_info: string
  long_term_info: string
  arrive_recommendation: string
  faq: FAQ[]
  meta_title: string
  meta_description: string
  parkwhiz_search: string
}

export function getAllAirports(): Airport[] {
  return airports as Airport[]
}

export function getAirportBySlug(slug: string): Airport | undefined {
  return (airports as Airport[]).find(a => a.slug === slug)
}

export function getAirportsByState(state: string): Airport[] {
  return (airports as Airport[]).filter(a => a.state.toLowerCase() === state.toLowerCase())
}

export function formatPassengers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`
  return count.toLocaleString()
}

export function getParkingMarketBadge(market: string): { label: string; color: string } {
  const badges: Record<string, { label: string; color: string }> = {
    excellent: { label: 'Excellent Availability', color: 'green' },
    good: { label: 'Good Availability', color: 'blue' },
    limited: { label: 'Book Early', color: 'amber' },
    poor: { label: 'Very Limited', color: 'red' },
  }
  return badges[market] || { label: 'Check Availability', color: 'gray' }
}
