// SpotHero link helper
//
// STATUS: Links are untracked (plain, correct destination). Tracking is now
// handled separately via an impression pixel -- see lib/spothero-pixel.tsx.
//
// BACKGROUND: SpotHero's Branch.io tracking link (spothero.app.link) was
// tested repeatedly and confirmed broken for desktop/web clicks -- it sends
// visitors to a generic wrong location regardless of the destination
// parameters passed in ($deeplink_path / $fallback_url), even when the
// correct destination was Chicago itself. Confirmed reproducible 2026-07-10.
//
// THE REAL FIX: SpotHero's dashboard has a separate "Impression Pixel"
// tracking method (endpoint: tracking.spothero.com/aff_i, vs. the broken
// click-based aff_c flow). This works differently -- it doesn't require
// routing the visible link through any tracking domain at all. The pixel
// just needs to load once on a page where we're promoting SpotHero; their
// server handles attribution from there (matches the "Server Postback w/
// Transaction ID" protocol on the offer details page). This means every
// SpotHero link can stay a plain, correct, direct destination URL -- no
// redirect chain, no wrong-city risk -- while tracking happens via the
// separate <SpotHeroTrackingPixel /> component rendered on the same pages.
//
// The buildSpotHeroAffiliateLink() function below is kept for reference /
// in case Branch tracking is ever fixed on SpotHero's end, but is not
// currently used by getSpotHeroLink().

const SPOTHERO_TRACKING_BASE = 'https://spothero.app.link/ts1p2NqSe1'
const SPOTHERO_AFFILIATE_JSON =
  'http://tracking.spothero.com/aff_c?offer_id=1&aff_id=2403&format=json'

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
    `$fallback_url=${encodedDestination}`,
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
 * Builds a correct spothero.com/search destination URL for a venue, wraps it
 * in the tracked affiliate link (aff_id=2403), and returns that. Every
 * SpotHero link on the site should be built with this function instead of
 * hand-building the spothero.com URL directly.
 */
export function getSpotHeroLink({ latitude, longitude, query, starts, ends }: SpotHeroSearchParams): string {
  const parts: string[] = []
  if (latitude !== undefined) parts.push(`latitude=${latitude}`)
  if (longitude !== undefined) parts.push(`longitude=${longitude}`)
  if (starts) parts.push(`starts=${starts}`)
  if (ends) parts.push(`ends=${ends}`)
  parts.push(`query=${query}`)

  const rawDestination = `https://spothero.com/search?${parts.join('&')}`
  return rawDestination // tracking now handled via impression pixel, see lib/spothero-pixel.tsx
}
