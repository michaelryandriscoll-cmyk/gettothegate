import { Metadata } from 'next'
import { getVenuesBySport, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 Parking — Every Host Stadium | GetToTheGate',
  description: 'Find and book parking near every FIFA World Cup 2026 host stadium. Mercedes-Benz Stadium Atlanta, Lumen Field Seattle, Soldier Field Chicago, Gillette Stadium Boston and more.',
  alternates: {
    canonical: 'https://gettothegate.com/parking/world-cup-2026/',
  },
}

export default function WorldCupParkingPage() {
  const venues = getVenuesBySport('World Cup')
  const sorted = [...venues].sort((a, b) => a.city.localeCompare(b.city))

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>FIFA World Cup 2026 Parking</h1>
          <p>Parking guides for all {venues.length} FIFA World Cup 2026 host stadiums across the US and Canada. Book early — World Cup parking sells out months in advance.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '24px 24px 16px' }}>
        <div style={{
          backgroundColor: '#FFE600',
          borderRadius: '8px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '24px' }}>⚽</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: '#0a0a0a' }}>World Cup 2026 kicks off June 11, 2026</div>
            <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>Pages indexed now will rank for match-day parking searches. Book parking early — these markets sell out.</div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '24px 24px 80px' }}>
        <div className="venue-grid" style={{ paddingTop: 0 }}>
          {sorted.map(venue => {
            const badge = getParkingMarketBadge(venue.parking_market)
            return (
              <a key={venue.slug} href={`/parking/${venue.slug}/`} className="venue-card">
                <div className="venue-card-name">{venue.name}</div>
                <div className="venue-card-city">{venue.city}, {venue.state}</div>
                <div className="venue-card-sport">{venue.teams.join(', ')}</div>
                <span className={`badge badge-${badge.color}`} style={{ marginTop: '8px', width: 'fit-content' }}>
                  {badge.label}
                </span>
                <div className="venue-card-arrow">Find parking →</div>
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}
