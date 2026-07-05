// SpotHero affiliate link helper
//
// Partner: HasOffers/TUNE via Branch.io, offer_id=1, aff_id=2403
// Every click should route through the tracked Branch link so SpotHero's
// server-side postback can attribute installs/purchases back to GetToTheGate.
//
// Pattern (confirmed working via the partner dashboard's "Add Deep Link" tool,
// tested against https://spothero.com/search?latitude=41.9484&longitude=-87.6553&query=Wrigley+Field):
//
// https://spothero.app.link/ts1p2NqSe1
//   ?$3p=a_hasoffers
//   &$deeplink_path={encoded destination URL}
//   &$affiliate_json={encoded http://tracking.spothero.com/aff_c?offer_id=1&aff_id=2403&format=json}

const SPOTHERO_TRACKING_BASE = 'https://spothero.app.link/ts1p2NqSe1'
const SPOTHERO_AFFILIATE_JSON =
  'http://tracking.spothero.com/aff_c?offer_id=1&aff_id=2403&format=json'

/**
 * Wraps a plain spothero.com destination URL (e.g. a lat/lng/query search
 * link, optionally with starts/ends) in the tracked affiliate deep link.
 * Every SpotHero button/link on the site should pass its destination
 * through this before rendering the href.
 */
/**
 * Wraps a RAW (not pre-encoded) spothero.com destination URL in the tracked
 * affiliate deep link. "Raw" means plain text like
 * `https://spothero.com/search?latitude=41.9484&longitude=-87.6553&query=M&T Bank Stadium`
 * with venue names embedded literally, unencoded spaces/ampersands and all.
 *
 * It's encoded exactly once here, as a single opaque unit. This matters:
 * if a venue name contains a literal "&" (e.g. "M&T Bank Stadium") and it had
 * already been encodeURIComponent'd on its own before being embedded into the
 * raw destination string, encoding the whole destination again here would
 * double-encode it (%26 -> %2526) and corrupt the round-trip. Keeping the
 * destination fully raw until this single encoding pass avoids that.
 *
 * %20 is swapped for a literal "+" afterward purely to match the exact byte
 * format confirmed working via the SpotHero/HasOffers dashboard's own
 * "Add Deep Link" tool (tested against a real Wrigley Field link) — both are
 * valid, but matching removes any doubt about partner-side parsing quirks.
 */
export function buildSpotHeroAffiliateLink(rawDestinationUrl: string): string {
  const encodedDestination = encodeURIComponent(rawDestinationUrl).replace(/%20/g, '+')
  const query = [
    `$3p=a_hasoffers`,
    `$deeplink_path=${encodedDestination}`,
    `$affiliate_json=${encodeURIComponent(SPOTHERO_AFFILIATE_JSON)}`,
  ].join('&')
  return `${SPOTHERO_TRACKING_BASE}?${query}`
}

type SpotHeroSearchParams = {
  latitude?: number
  longitude?: number
  query: string
  starts?: string // ISO-ish, e.g. start.toISOString().slice(0,16)
  ends?: string
}

/**
 * Builds the plain (untracked) spothero.com/search destination URL as raw
 * text, then wraps it in the affiliate link with a single encoding pass.
 * Use this everywhere a SpotHero link is rendered instead of hand-building
 * the spothero.com URL directly.
 */
export function getSpotHeroLink({ latitude, longitude, query, starts, ends }: SpotHeroSearchParams): string {
  const parts: string[] = []
  if (latitude !== undefined) parts.push(`latitude=${latitude}`)
  if (longitude !== undefined) parts.push(`longitude=${longitude}`)
  if (starts) parts.push(`starts=${starts}`)
  if (ends) parts.push(`ends=${ends}`)
  parts.push(`query=${query}`)

  const rawDestination = `https://spothero.com/search?${parts.join('&')}`
  return buildSpotHeroAffiliateLink(rawDestination)
}
