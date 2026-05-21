const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

export type TicketmasterEvent = {
  id: string
  name: string
  dateLocal: string
  timeLocal: string
  slug: string
  url: string
  image?: string
}

function generateEventSlug(eventName: string, dateLocal: string): string {
  const date = new Date(dateLocal)
  const month = date.toLocaleString('en-US', { month: 'long' }).toLowerCase()
  const day = date.getDate()
  const year = date.getFullYear()
  const nameSlug = eventName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  return `${nameSlug}-${month}-${day}-${year}`
}

export async function getTicketmasterEvents(venueId: string): Promise<TicketmasterEvent[]> {
  try {
    const apiKey = process.env.TICKETMASTER_API_KEY
    if (!apiKey) return []

    const today = new Date().toISOString().split('T')[0]
    const future = new Date()
    future.setMonth(future.getMonth() + 6)
    const endDate = future.toISOString().split('T')[0]

    const params = new URLSearchParams({
      apikey: apiKey,
      venueId,
      startDateTime: `${today}T00:00:00Z`,
      endDateTime: `${endDate}T23:59:59Z`,
      size: '20',
      sort: 'date,asc',
    })

    const response = await fetch(`${BASE_URL}/events.json?${params}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) return []

    const data = await response.json()
    const events = data._embedded?.events || []

    return events.map((event: any) => ({
      id: event.id,
      name: event.name,
      dateLocal: event.dates?.start?.localDate || '',
      timeLocal: event.dates?.start?.localTime || '19:00:00',
      slug: generateEventSlug(event.name, event.dates?.start?.localDate || ''),
      url: event.url || '',
      image: event.images?.find((img: any) => img.ratio === '16_9' && img.width > 500)?.url,
    }))
  } catch (error) {
    console.error(`Error fetching Ticketmaster events for venue ${venueId}:`, error)
    return []
  }
}
