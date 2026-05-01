import type { NextRequest } from 'next/server'
import { getVenueBySlug } from '@/lib/venues'
import { searchEventParking, searchVenues } from '@/lib/parkwhiz'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  if (!slug) {
    return Response.json({ error: 'slug query param is required' }, { status: 400 })
  }

  const venue = getVenueBySlug(slug)
  if (!venue) {
    return Response.json({ error: 'Venue not found' }, { status: 404 })
  }

  try {
    // Primary: stubhub_venue_id gives direct event parking quotes
    const quotes = await searchEventParking(venue.stubhub_venue_id)
    return Response.json({ venue: venue.slug, source: 'stubhub_venue_id', data: quotes })
  } catch {
    // Fallback: venue name search when stubhub lookup returns no results
    try {
      const venues = await searchVenues(venue.parkwhiz_search)
      return Response.json({ venue: venue.slug, source: 'venue_search', data: venues })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'ParkWhiz request failed'
      return Response.json({ error: message }, { status: 502 })
    }
  }
}
