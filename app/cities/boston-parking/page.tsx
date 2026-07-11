import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Boston Event Parking — Every Major Venue',
  description: 'Find and book parking near every major Boston venue. Fenway Park, TD Garden, Gillette Stadium and more. World Cup 2026 parking guide included.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/boston-parking/',
  },
}

export default function BostonParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v => v.city === 'Boston' || v.city === 'Foxborough')

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Boston Event Parking</h1>
          <p>Find and book parking near every major Boston area venue. Compare prices across {venues.length} stadiums and arenas.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 24px 16px' }}>
        <div style={{ backgroundColor: '#FFE600', borderRadius: '8px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>⚽</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: '#0a0a0a' }}>Gillette Stadium hosts FIFA World Cup 2026</div>
            <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>MBTA game-day trains from South Station are the best option for World Cup matches.</div>
          </div>
        </div>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)', maxWidth: '800px' }}>
          Boston has two distinct parking markets. In the city, Fenway Park and TD Garden both have excellent transit access. For Gillette Stadium in Foxborough, the MBTA game-day commuter rail from South Station is by far the best option for Patriots games and World Cup 2026.
        </p>
      </div>

      <div className="container" style={{ padding: '16px 24px 80px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Boston Area Venues</h2>
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Boston Parking Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>⚾ Fenway Park</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Green Line to Kenmore is fastest. Landmark Center garage and Boylston St garages offer best value for drivers. Book 24-48 hours ahead for weekend Red Sox games.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏀 TD Garden</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>North Station is built directly into the arena. Bulfinch Triangle garages on Sudbury St offer best value for drivers. Transit is the obvious choice here.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏈 Gillette Stadium</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>MBTA game-day commuter rail from South Station is the best option. Route 1 backs up badly. Book Patriot Place lots well in advance for big games and World Cup 2026.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
