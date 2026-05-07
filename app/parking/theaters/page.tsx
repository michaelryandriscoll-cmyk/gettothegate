import { Metadata } from 'next'
import { getVenuesByType, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Theater & Broadway Parking — Performing Arts Venues | GetToTheGate',
  description: 'Find and book parking near Broadway theaters and performing arts venues. CIBC Theatre Chicago, Pantages Hollywood, Kennedy Center DC and more.',
  alternates: {
    canonical: 'https://gettothegate.com/parking/theaters/',
  },
}

export default function TheatersParkingPage() {
  const venues = getVenuesByType('theater')
  const sorted = [...venues].sort((a, b) => a.city.localeCompare(b.city))

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Theater & Broadway Parking</h1>
          <p>Find and book parking near {venues.length} Broadway theaters and performing arts venues across the US.</p>
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
