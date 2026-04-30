import { MetadataRoute } from 'next'
import { getAllVenues } from '@/lib/venues'

export default function sitemap(): MetadataRoute.Sitemap {
  const venues = getAllVenues()
  const baseUrl = 'https://gettothegate.com'
  const now = new Date()

  const venueUrls = venues.map(venue => ({
    url: `${baseUrl}/parking/${venue.slug}/`,
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
  ]
}