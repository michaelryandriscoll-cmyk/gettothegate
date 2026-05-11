import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Charlotte Event Parking — Every Major Venue | GetToTheGate',
  description: 'Find and book parking near every major Charlotte venue. Bank of America Stadium, Spectrum Center, Truist Field, PNC Music Pavilion and more.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/charlotte-parking/',
  },
}

export default function CharlotteParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v => v.city === 'Charlotte')

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Charlotte Event Parking</h1>
          <p>Find and book parking near every major Charlotte venue. Compare prices across {venues.length} stadiums, arenas, and concert venues.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 24px 16px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)', maxWidth: '800px' }}>
          Charlotte's Uptown district is one of the fastest-growing event parking markets in the Southeast. Bank of America Stadium, Spectrum Center, and Truist Field all share the same Third Ward parking ecosystem — dozens of surface lots and garages within easy walking distance. The CATS Blue Line light rail with Carson station adjacent to both Bank of America Stadium and Truist Field is one of the best transit options at any NFL stadium in the country.
        </p>
      </div>

      <div className="container" style={{ padding: '16px 24px 80px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Charlotte Venues</h2>
        <div className="venue-grid" style={{ paddingTop: 0 }}>
          {venues.map(venue => {
            const badge = getParkingMarketBadge(venue.parking_market)
            return (
              <a key={venue.slug} href={`/parking/${venue.slug}/`} className="venue-card">
                <div className="venue-card-name">{venue.name}</div>
                <div className="venue-card-city">{venue.city}, {venue.state}</div>
                <div className="venue-card-sport">{venue.sport}</div>
                <span className={`badge badge-${badge.color}`} style={{ marginTop: '8px', width: 'fit-content' }}>
                  {badge.label}
                </span>
                <div className="venue-card-arrow">Find parking →</div>
              </a>
            )
          })}
        </div>

        <div style={{ marginTop: '48px', padding: '32px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Charlotte Parking Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏈 Uptown Charlotte</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Third Ward surface lots on Mint St and Graham St are closest to both Bank of America Stadium and Truist Field. Book online — Uptown fills fast on Panthers and Hornets game days.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🚇 CATS Blue Line</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Carson station is steps from both Bank of America Stadium and Truist Field. One of the best transit options at any NFL stadium — strongly recommended for Panthers sellouts.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🎵 PNC Music Pavilion</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Suburban north Charlotte venue with on-site lots as the primary option. Book early for major tours — the single-road approach backs up badly for sold-out shows.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
