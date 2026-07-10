// SpotHero link helper
//
// STATUS: Tracked affiliate links are RE-ENABLED as of July 2026.
//
// We're partnered with SpotHero (aff_id=2403, offer_id=1) via a Branch.io
// tracking link. Earlier testing found that desktop/web clicks were landing
// on a generic Chicago search instead of the real venue -- even after adding
// $fallback_url, which is supposed to handle exactly that case. We briefly
// reverted to plain untracked links because of this.
//
// However, the SpotHero partner dashboard showed real conversions/payout
// accruing during the period tracked links were live, which means
// $deeplink_path (read by SpotHero's own mobile app) IS working correctly
// for at least some segment of users -- likely anyone with the SpotHero app
// installed. The web-fallback bug appears to only affect users WITHOUT the
// app, who get sent to a generic Chicago page instead of the right city.
//
// Decision: re-enable tracking for everyone. The revenue upside for
// app-installed users outweighs the UX cost for the affected web-only
// segment, especially since a fix from SpotHero may arrive at any time.
// If SpotHero confirms the web-fallback issue is fixed, no further code
// change is needed -- it'll just start working correctly for everyone.
// If it turns out the wrong-city problem is hurting conversion rate more
// than expected, this is a one-line revert: change getSpotHeroLink()'s
// final line back to `return rawDestination`.
//
// ---- Reference: the tracked link format ----
// https://spothero.app.link/ts1p2NqSe1
//   ?$3p=a_hasoffers
//   &$deeplink_path={encoded destination URL}   -- used by the SpotHero MOBILE APP (confirmed working)
//   &$fallback_url={encoded destination URL}    -- meant for desktop/web browsers (confirmed NOT working as of July 2026)
//   &$affiliate_json={encoded http://tracking.spothero.com/aff_c?offer_id=1&aff_id=2403&format=json}

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
  return buildSpotHeroAffiliateLink(rawDestination)
}
