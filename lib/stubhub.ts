const BASE_URL = 'https://api.stubhub.com'

export type StubHubEvent = {
  id: string
  name: string
  dateLocal: string
  timeLocal: string
  slug: string
  performers: string[]
  category: string
  ticketUrl: string
  minPrice?: number
  maxPrice?: number
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

async function getAccessToken(): Promise<string> {
  const clientId = process.env.STUBHUB_CLIENT_ID
  const clientSecret = process.env.STUBHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('StubHub credentials not configured')
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(`${BASE_URL}/sellers/oauth/accesstoken`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=read:events',
  })

  if (!response.ok) {
    throw new Error(`StubHub auth failed: ${response.status}`)
  }

  const data = await response.json()
  return data.access_token
}

export async function getVenueEvents(stubhubVenueId: string): Promise<StubHubEvent[]> {
  try {
    const token = await getAccessToken()

    const today = new Date().toISOString().split('T')[0]
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() + 6)
    const endDate = futureDate.toISOString().split('T')[0]

    const params = new URLSearchParams({
      venueId: stubhubVenueId,
      dateLocal: `${today}TO${endDate}`,
      rows: '50',
      start: '0',
      sort: 'date asc',
    })

    const response = await fetch(`${BASE_URL}/catalog/events/v3?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error(`StubHub events fetch failed for venue ${stubhubVenueId}: ${response.status}`)
      return []
    }

    const data = await response.json()
    const events = data.events || []

    return events.map((event: any) => ({
      id: event.id,
      name: event.name,
      dateLocal: event.dateLocal,
      timeLocal: event.timeLocal || '19:00:00',
      slug: generateEventSlug(event.name, event.dateLocal),
      performers: event.performers?.map((p: any) => p.name) || [],
      category: event.categoryName || '',
      ticketUrl: `https://www.stubhub.com/event/${event.id}/`,
      minPrice: event.ticketInfo?.minListPrice,
      maxPrice: event.ticketInfo?.maxListPrice,
    }))
  } catch (error) {
    console.error(`Error fetching StubHub events for venue ${stubhubVenueId}:`, error)
    return []
  }
}

export async function getEventBySlug(
  stubhubVenueId: string,
  eventSlug: string
): Promise<StubHubEvent | null> {
  const events = await getVenueEvents(stubhubVenueId)
  return events.find(e => e.slug === eventSlug) || null
}

export function formatEventDate(dateLocal: string, timeLocal: string): string {
  const date = new Date(`${dateLocal}T${timeLocal}`)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatEventTime(timeLocal: string): string {
  const [hours, minutes] = timeLocal.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}
