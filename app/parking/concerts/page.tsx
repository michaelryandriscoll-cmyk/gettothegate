import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Concert Venue Parking — Amphitheaters & Concert Arenas | GetToTheGate',
  description: 'Find and book parking near concert venues, amphitheaters, and arenas across the US. Hollywood Bowl, Red Rocks, PNC Music Pavilion and more.',
  alternates: {
    canonical: 'https://gettothegate.com/parking/concerts/',
  },
}

export default function ConcertsParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v =>
    v.type === 'amphitheater' ||
    v.sport.toLowerCase().includes('concert')
  )
  const sorted = [...venues].sort((a, b) => a.city.localeCompare(b.city))

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Concert Venue Parking</h1>
          <p>Find and book parking near {venues.length}+ concert venues and amphitheaters across the US. Never miss the opening act hunting for parking.</p>
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
