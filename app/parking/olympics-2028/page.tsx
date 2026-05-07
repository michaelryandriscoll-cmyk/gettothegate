import { Metadata } from 'next'
import { getVenuesBySport, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'LA Olympics 2028 Parking — Every Olympic Venue | GetToTheGate',
  description: 'Find and book parking near every 2028 LA Olympics venue. SoFi Stadium, Rose Bowl, Crypto.com Arena, Dodger Stadium and more. Book early for the biggest sporting event in LA history.',
  alternates: {
    canonical: 'https://gettothegate.com/parking/olympics-2028/',
  },
}

export default function Olympics2028ParkingPage() {
  const venues = getVenuesBySport('Olympics')
  const sorted = [...venues].sort((a, b) => a.city.localeCompare(b.city))

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>LA Olympics 2028 Parking</h1>
          <p>Parking guides for all {venues.length} confirmed 2028 Los Angeles Olympics venues. Pages aging now — ranked and ready for the biggest sporting event in LA history.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '24px 24px 16px' }}>
        <div style={{
          backgroundColor: '#111',
          border: '1px solid #FFE600',
          borderRadius: '8px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '24px' }}>🏅</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: '#FFE600' }}>LA 2028 Opens July 14, 2028</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Over 2 years away — but parking demand will be historic. Book as early as possible for Olympic events.</div>
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
                <div className="venue-card-sport">{venue.sport}</div>
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
