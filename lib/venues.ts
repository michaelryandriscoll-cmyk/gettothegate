import venues from '@/data/venues.json'

export type FAQ = {
  q: string
  a: string
}

export type Venue = {
  slug: string
  name: string
  city: string
  state: string
  zip: string
  address: string
  lat: number
  lng: number
  capacity: number
  type: string
  sport: string
  teams: string[]
  event_frequency: string
  home_games_per_year: number
  parking_market: string
  neighborhoods: string[]
  transit: string
  parking_tips: string
  best_lots: string
  worst_lots: string
  gates: string[]
  arrive_recommendation: string
  faq: FAQ[]
  meta_title: string
  meta_description: string
  stubhub_venue_id: string
  parkwhiz_search: string
}

export function getAllVenues(): Venue[] {
  return venues as Venue[]
}

export function getVenueBySlug(slug: string): Venue | undefined {
  return (venues as Venue[]).find(v => v.slug === slug)
}

export function getVenuesByCity(city: string): Venue[] {
  return (venues as Venue[]).filter(v => v.city.toLowerCase() === city.toLowerCase())
}

export function getVenuesByType(type: string): Venue[] {
  return (venues as Venue[]).filter(v => v.type === type)
}

export function getTopVenues(limit: number = 6): Venue[] {
  return (venues as Venue[])
    .sort((a, b) => b.home_games_per_year - a.home_games_per_year)
    .slice(0, limit)
}

export function formatCapacity(capacity: number): string {
  return capacity.toLocaleString()
}

export function getVenueTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    stadium: 'Stadium',
    arena: 'Arena',
    amphitheater: 'Amphitheater',
    racetrack: 'Racetrack',
    convention_center: 'Convention Center',
  }
  return labels[type] || type
}

export function getParkingMarketBadge(market: string): { label: string; color: string } {
  const badges: Record<string, { label: string; color: string }> = {
    excellent: { label: 'Excellent Availability', color: 'green' },
    good: { label: 'Good Availability', color: 'blue' },
    limited: { label: 'Limited Availability', color: 'amber' },
    poor: { label: 'Book Early', color: 'red' },
  }
  return badges[market] || { label: 'Check Availability', color: 'gray' }
}

export function getVenuesBySport(keyword: string): Venue[] {
  return (venues as Venue[]).filter(v =>
    v.sport.toLowerCase().includes(keyword.toLowerCase())
  )
}

export function getVenuesByTypeAndSport(type: string, keyword: string): Venue[] {
  return (venues as Venue[]).filter(v =>
    v.type === type && v.sport.toLowerCase().includes(keyword.toLowerCase())
  )
}
