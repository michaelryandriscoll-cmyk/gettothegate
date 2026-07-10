// SpotHero impression tracking pixel
//
// This is SpotHero's real, working tracking mechanism -- see the status
// notes at the top of lib/spothero.ts for the full story on why we're not
// using their Branch.io click-tracking link.
//
// How it works: this invisible 0x0 image loads from SpotHero's tracking
// domain whenever it's rendered. That alone is enough for their server to
// attribute a later booking back to aff_id=2403 -- no special link, no
// redirect chain, no risk of sending anyone to the wrong city. Render this
// once on any page where we're promoting SpotHero (venue pages, event
// pages, airport pages).
//
// Pixel source: SpotHero/HasOffers partner dashboard, "Impression Pixel"
// option under the "SpotHero Revenue Share - Search Experiences" offer.

export default function SpotHeroTrackingPixel() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="http://tracking.spothero.com/aff_i?offer_id=1&aff_id=2403"
      width={0}
      height={0}
      style={{ position: 'absolute', visibility: 'hidden' }}
      alt=""
      aria-hidden="true"
    />
  )
}
