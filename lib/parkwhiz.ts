const BASE_URL = 'https://api-sandbox.parkwhiz.com'

// Module-level token cache — valid for the lifetime of the server process.
// In serverless deployments each cold start re-fetches; that's acceptable.
let cachedToken: string | null = null
let tokenExpiresAt = 0

export async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken

  const clientId = process.env.PARKWHIZ_CLIENT_ID
  const clientSecret = process.env.PARKWHIZ_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('PARKWHIZ_CLIENT_ID and PARKWHIZ_CLIENT_SECRET env vars must be set')
  }

  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!res.ok) throw new Error(`ParkWhiz auth failed: ${res.status} ${res.statusText}`)

  const data = await res.json() as { access_token: string; expires_in: number }
  cachedToken = data.access_token
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000 // refresh 60s before expiry
  return cachedToken
}

async function apiFetch(path: string): Promise<unknown> {
  const token = await getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  if (!res.ok) throw new Error(`ParkWhiz API error ${res.status}: ${path}`)
  return res.json()
}

export async function searchVenues(query: string): Promise<unknown> {
  return apiFetch(`/v4/venues?q=${encodeURIComponent(query)}`)
}

export async function getVenueEvents(venueId: string | number): Promise<unknown> {
  return apiFetch(`/v4/events?venue_id=${venueId}`)
}

export async function getParkingQuotes(eventId: string | number): Promise<unknown> {
  return apiFetch(`/v4/quotes?q=event_id:${eventId}&returns=offstreet_bookable`)
}

export async function searchEventParking(stubhubVenueId: string): Promise<unknown> {
  return apiFetch(`/v4/quotes?q=stubhub_venue_id:${stubhubVenueId}`)
}
