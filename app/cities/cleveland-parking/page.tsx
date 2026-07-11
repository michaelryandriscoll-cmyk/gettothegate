import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Cleveland Event Parking — Every Major Venue',
  description: 'Find and book parking near every major Cleveland venue. Progressive Field, Rocket Mortgage FieldHouse, Jacobs Pavilion and more.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/cleveland-parking/',
  },
}

export default function ClevelandParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v => v.city === 'Cleveland')

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Cleveland Event Parking</h1>
          <p>Find and book parking near every major Cleveland venue. Compare prices across {venues.length} stadiums, arenas, and concert venues.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 24px 16px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)', maxWidth: '800px' }}>
          Cleveland's Gateway District is one of the most concentrated sports venue clusters in the country. Progressive Field and Rocket Mortgage FieldHouse sit side by side sharing the same downtown parking ecosystem. Ontario St and Huron Rd garages serve both venues. On nights when both the Guardians and Cavaliers are home, book early as shared lot inventory tightens significantly.
        </p>
      </div>

      <div className="container" style={{ padding: '16px 24px 80px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Cleveland Venues</h2>
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Cleveland Parking Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏟️ Gateway District</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Progressive Field and Rocket Mortgage FieldHouse share parking. Ontario St and Huron Rd lots serve both. Book early on nights when both teams are home.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🚇 RTA Red Line</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Cleveland Clinic Courts station is adjacent to Rocket Mortgage FieldHouse. Tower City/Public Square is a 5-minute walk to Progressive Field.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🎵 The Flats</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Jacobs Pavilion waterfront lots on Sycamore St and Old River Rd are the best options for concerts. Book online for sold-out summer shows.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
