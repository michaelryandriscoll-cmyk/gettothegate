import { MetadataRoute } from 'next'
import { getAllVenues } from '@/lib/venues'

export default function sitemap(): MetadataRoute.Sitemap {
  const venues = getAllVenues()
  const baseUrl = 'https://gettothegate.com'

  const venueUrls = venues.map(venue => ({
    url: `${baseUrl}/parking/${venue.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/parking/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...venueUrls,
  ]
}
