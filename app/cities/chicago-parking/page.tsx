import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Chicago Event Parking — Every Major Venue',
  description: 'Find and book parking near every major Chicago venue. Wrigley Field, United Center, Guaranteed Rate Field, Soldier Field, CIBC Theatre and more. Compare prices and book before you go.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/chicago-parking/',
  },
}

export default function ChicagoParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v => v.city === 'Chicago')

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Chicago Event Parking</h1>
          <p>Find and book parking near every major Chicago venue. Compare prices across {venues.length} stadiums, arenas, theaters and concert venues.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 24px 16px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)', maxWidth: '800px' }}>
          Chicago is one of the best urban parking markets in the country. The Loop, Wrigleyville, the South Side, and the lakefront all have dense private lot inventory with excellent coverage on SpotHero and ParkWhiz. Whether you're heading to a Cubs game at Wrigley, a Bulls or Blackhawks game at the United Center, or a Broadway show in the Loop — book online at least 24 hours in advance and you'll save 20-40% versus walk-up prices.
        </p>
      </div>

      <div className="container" style={{ padding: '16px 24px 80px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Chicago Venues</h2>
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Chicago Parking Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏟️ Wrigleyville</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>20+ private lots within 4 blocks of Wrigley Field. Seminary Ave and Racine Ave are cheaper than Clark St lots. Book 48 hours out for weekend games.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏀 United Center</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Warren Blvd and Damen Ave lots offer the best value. Avoid unattended lots on side streets on big game nights.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>⚾ South Side</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Guaranteed Rate Field has more parking supply than Wrigley. Shields Ave and 33rd St lots offer the best price-to-distance ratio.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🎭 Loop Theater District</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Hundreds of garages within walking distance. Arrive before 6pm for early-bird flat rates that save significantly versus event pricing.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🚇 Take the L</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Red Line to Addison for Wrigley. Red Line to Sox-35th for Guaranteed Rate. Pink/Green to Medical/Halsted for United Center. Best option on sellout nights.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🌊 Lakefront Venues</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Soldier Field and Huntington Bank Pavilion share Museum Campus and Grant Park lots. Book early — lakefront road access is limited on big event nights.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
