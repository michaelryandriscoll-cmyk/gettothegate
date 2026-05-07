import { Metadata } from 'next'
import { getVenuesBySport, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'NBA Arena Parking — Every NBA Basketball Arena | GetToTheGate',
  description: 'Find and book parking near every NBA arena. Compare prices at Madison Square Garden, Crypto.com Arena, Chase Center, United Center and more.',
  alternates: {
    canonical: 'https://gettothegate.com/parking/nba/',
  },
}

export default function NBAParkingPage() {
  const venues = getVenuesBySport('NBA')
  const sorted = [...venues].sort((a, b) => a.city.localeCompare(b.city))

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>NBA Arena Parking</h1>
          <p>Find and book parking near all {venues.length} NBA arenas. Compare prices and reserve your spot before tip-off.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '48px 24px 80px' }}>
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
