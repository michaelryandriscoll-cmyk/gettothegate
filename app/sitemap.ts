import { MetadataRoute } from 'next'
import { getAllVenues } from '@/lib/venues'
import { getAllAirports } from '@/lib/airports'

export default function sitemap(): MetadataRoute.Sitemap {
  const venues = getAllVenues()
  const airports = getAllAirports()
  const baseUrl = 'https://gettothegate.com'
  const now = new Date()

  const venueUrls = venues.map(venue => ({
    url: `${baseUrl}/parking/${venue.slug}/`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const airportUrls = airports.map(airport => ({
    url: `${baseUrl}/airports/${airport.slug}/`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/parking/`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/airports/`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...venueUrls,
    ...airportUrls,
  ]
}