import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Seattle Event Parking — Every Major Venue',
  description: 'Find and book parking near every major Seattle venue. T-Mobile Park, Lumen Field, Climate Pledge Arena and more. World Cup 2026 parking guide included.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/seattle-parking/',
  },
}

export default function SeattleParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v => v.city === 'Seattle')

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Seattle Event Parking</h1>
          <p>Find and book parking near every major Seattle venue. Compare prices across {venues.length} stadiums and arenas — including World Cup 2026 at Lumen Field.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 24px 16px' }}>
        <div style={{ backgroundColor: '#FFE600', borderRadius: '8px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>⚽</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: '#0a0a0a' }}>Lumen Field hosts FIFA World Cup 2026</div>
            <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>Book parking for World Cup matches early — SoDo lots will sell out months in advance.</div>
          </div>
        </div>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)', maxWidth: '800px' }}>
          Seattle's SoDo district is one of the best urban sports parking markets in the Pacific Northwest. T-Mobile Park and Lumen Field sit side by side with dozens of private surface lots throughout SoDo. Link Light Rail is exceptional here — Stadium station is steps from both venues and connects directly from Sea-Tac Airport, Capitol Hill, and the University District.
        </p>
      </div>

      <div className="container" style={{ padding: '16px 24px 80px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Seattle Venues</h2>
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Seattle Parking Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🚇 Link Light Rail</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Stadium station is steps from both T-Mobile Park and Lumen Field. Direct from Sea-Tac, Capitol Hill, and UW. Best option on Seahawks and Mariners sellout nights.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🅿️ SoDo Lots</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>1st Ave S surface lots between the two stadiums offer the best price and proximity. Book online — SoDo lots fill 2 hours before Seahawks kickoff.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>⚽ World Cup 2026</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Lumen Field hosts World Cup 2026 matches. Book parking months in advance — Link Light Rail from any station is strongly recommended for international match days.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
