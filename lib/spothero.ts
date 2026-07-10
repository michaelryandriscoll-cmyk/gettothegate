// SpotHero link helper
//
// STATUS: Tracked affiliate links are DISABLED as of July 10, 2026.
//
// CONFIRMED BROKEN: the Branch.io tracking link
// (spothero.app.link/ts1p2NqSe1) sends every desktop/web click to a generic
// Chicago location, regardless of the correct $deeplink_path/$fallback_url
// destination. Tested live against United Center (Chicago itself!) and it
// still landed on a generic/wrong spot -- so this isn't even a
// wrong-city-only bug, the redirect just doesn't work for web clicks at all.
// Confirmed reproducible on 2026-07-10.
//
// Real conversions DID appear on the SpotHero dashboard while this link was
// live, so $deeplink_path likely works inside SpotHero's own mobile app --
// the failure is specific to plain browser/web clicks, which is most of
// GetToTheGate's traffic. Sending people to the wrong location is worse
// than losing tracking, so linking directly and correctly takes priority
// until SpotHero confirms a real fix (see notes on Impression Pixel as a
// possible alternative tracking method that doesn't touch the destination).
//
// TO RE-ENABLE: change getSpotHeroLink()'s final line from
// `return rawDestination` to `return buildSpotHeroAffiliateLink(rawDestination)`.

const SPOTHERO_TRACKING_BASE = 'https://spothero.app.link/ts1p2NqSe1'
const SPOTHERO_AFFILIATE_JSON =
  'http://tracking.spothero.com/aff_c?offer_id=1&aff_id=2403&format=json'

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
  starts?: string
  ends?: string
}

export function getSpotHeroLink({ latitude, longitude, query, starts, ends }: SpotHeroSearchParams): string {
  const parts: string[] = []
  if (latitude !== undefined) parts.push(`latitude=${latitude}`)
  if (longitude !== undefined) parts.push(`longitude=${longitude}`)
  if (starts) parts.push(`starts=${starts}`)
  if (ends) parts.push(`ends=${ends}`)
  parts.push(`query=${query}`)

  const rawDestination = `https://spothero.com/search?${parts.join('&')}`
  return rawDestination // Reverted -- see status note above
}
