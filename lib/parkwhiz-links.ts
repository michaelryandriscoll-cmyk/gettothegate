// ParkWhiz web link helper
//
// Reference: https://partners.parkwhiz.com/docs/integration-guides/web-links/search-page
//
// The site was previously linking to `https://www.parkwhiz.com/s/?q=...`,
// which is NOT a real ParkWhiz URL pattern -- every one of those links
// 404'd. ParkWhiz's actual documented search-page format is:
//
//   https://www.parkwhiz.com/destination/{Destination-Title}/?lat={lat}&lng={lng}&start={ISO8601}&end={ISO8601}
//
// Two important gotchas from their docs:
// 1. The destination title MUST NOT be entirely lowercase, or the page
//    redirects to a 404 (their own documented warning). It needs to be a
//    dash-separated, capitalized phrase, e.g. "Crypto-Com-Arena".
// 2. start/end must be ISO 8601 timestamps "with offset" -- a plain
//    UTC ISO string (ending in Z) satisfies this, same approach already
//    used for the SpotHero links elsewhere on the site.
//
// No `pwa` (affiliate code) parameter is included yet -- ParkWhiz partner
// approval is still pending. Once approved, add `pwa=YOUR_CODE` to the
// params below to start tracking bookings.

/**
 * Converts a venue/airport name into ParkWhiz's required destination-title
 * format: strip anything that isn't a letter/number/space, then join words
 * with dashes, capitalizing each word (so it's never all-lowercase, which
 * ParkWhiz's docs warn will 404).
 */
function toParkWhizDestinationTitle(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9\s-]/g, '').trim()
  const words = cleaned.split(/[\s-]+/).filter(Boolean)
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-')
}

type ParkWhizLinkParams = {
  latitude: number
  longitude: number
  name: string
  start?: Date
  end?: Date
}

/**
 * Builds a correct ParkWhiz destination search link. Use this everywhere a
 * ParkWhiz link is rendered instead of hand-building the parkwhiz.com URL.
 */
export function getParkWhizLink({ latitude, longitude, name, start, end }: ParkWhizLinkParams): string {
  const title = toParkWhizDestinationTitle(name)
  const params = new URLSearchParams()
  params.set('lat', String(latitude))
  params.set('lng', String(longitude))
  if (start) params.set('start', start.toISOString())
  if (end) params.set('end', end.toISOString())
  return `https://www.parkwhiz.com/destination/${encodeURIComponent(title)}/?${params.toString()}`
}
