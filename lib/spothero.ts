// SpotHero link helper
//
// STATUS: Tracked affiliate links are DISABLED as of July 2026.
//
// We're partnered with SpotHero (aff_id=2403, offer_id=1) via a Branch.io
// tracking link, but it's broken for web traffic: every click -- regardless
// of the venue -- lands on a generic Chicago search instead of the real
// destination. This happens even after adding both $deeplink_path (read by
// SpotHero's mobile app) AND $fallback_url (supposed to handle plain browser
// clicks). Since desktop/web is the vast majority of GetToTheGate's traffic,
// a broken tracked link is worse than an untracked-but-working one, so we've
// reverted to sending people straight to the correct venue via a plain,
// untracked spothero.com search URL.
//
// TO RE-ENABLE TRACKING (once SpotHero/Branch confirms a fix):
// change getSpotHeroLink()'s final line from `return rawDestination` to
// `return buildSpotHeroAffiliateLink(rawDestination)`. Everything else
// (the Branch link format, encoding logic) is unchanged and already tested.
//
// ---- Reference: the (currently unused) tracked link format ----
// https://spothero.app.link/ts1p2NqSe1
//   ?$3p=a_hasoffers
//   &$deeplink_path={encoded destination URL}   -- used by the SpotHero MOBILE APP
//   &$fallback_url={encoded destination URL}    -- meant for desktop/web browsers, but didn't fix it
//   &$affiliate_json={encoded http://tracking.spothero.com/aff_c?offer_id=1&aff_id=2403&format=json}

const SPOTHERO_TRACKING_BASE = 'https://spothero.app.link/ts1p2NqSe1'
const SPOTHERO_AFFILIATE_JSON =
  'http://tracking.spothero.com/aff_c?offer_id=1&aff_id=2403&format=json'

/**
 * Wraps a RAW (not pre-encoded) spothero.com destination URL in the
 * (currently unused, see status note above) tracked affiliate deep link.
 * "Raw" means plain text like
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
 * Builds a correct spothero.com/search destination URL for a venue. This is
 * currently sent DIRECTLY (untracked) -- see the status note at the top of
 * this file for why. Every SpotHero link on the site should be built with
 * this function instead of hand-building the spothero.com URL directly, so
 * re-enabling tracking later is a one-line change.
 */
export function getSpotHeroLink({ latitude, longitude, query, starts, ends }: SpotHeroSearchParams): string {
  const parts: string[] = []
  if (latitude !== undefined) parts.push(`latitude=${latitude}`)
  if (longitude !== undefined) parts.push(`longitude=${longitude}`)
  if (starts) parts.push(`starts=${starts}`)
  if (ends) parts.push(`ends=${ends}`)
  parts.push(`query=${query}`)

  const rawDestination = `https://spothero.com/search?${parts.join('&')}`
  return rawDestination // TODO: swap to buildSpotHeroAffiliateLink(rawDestination) once tracking is confirmed fixed
}
