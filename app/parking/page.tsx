import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Event Parking Near Every Major Venue | GetToTheGate',
  description: 'Find and reserve parking near stadiums, arenas, and amphitheaters across the US. Compare prices and book before you leave the house.',
  alternates: {
    canonical: 'https://gettothegate.com/parking/',
  },
}

export default function ParkingListingPage() {
  const venues = getAllVenues()

  const stadiums = venues.filter(v => v.type === 'stadium')
  const arenas = venues.filter(v => v.type === 'arena')

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Event Parking<br />Near Every Venue</h1>
          <p>Find and book parking near {venues.length}+ major stadiums, arenas, and amphitheaters across the US.</p>
        </div>
      </section>

      <div className="container">
        {stadiums.length > 0 && (
          <>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '48px', marginBottom: '20px' }}>
              MLB & NFL Stadiums
            </h2>
            <div className="venue-grid" style={{ paddingTop: 0, paddingBottom: '32px' }}>
              {stadiums.map(venue => {
                const badge = getParkingMarketBadge(venue.parking_market)
                return (
                  <a key={venue.slug} href={`/parking/${venue.slug}/`} className="venue-card">
                    <div className="venue-card-name">{venue.name}</div>
                    <div className="venue-card-city">{venue.city}, {venue.state}</div>
                    <div className="venue-card-sport">{venue.sport} · {venue.teams.join(', ')}</div>
                    <span className={`badge badge-${badge.color}`} style={{ marginTop: '8px', width: 'fit-content' }}>
                      {badge.label}
                    </span>
                    <div className="venue-card-arrow">Find parking →</div>
                  </a>
                )
              })}
            </div>
          </>
        )}

        {arenas.length > 0 && (
          <>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              NBA, NHL & Concert Arenas
            </h2>
            <div className="venue-grid" style={{ paddingTop: 0 }}>
              {arenas.map(venue => {
                const badge = getParkingMarketBadge(venue.parking_market)
                return (
                  <a key={venue.slug} href={`/parking/${venue.slug}/`} className="venue-card">
                    <div className="venue-card-name">{venue.name}</div>
                    <div className="venue-card-city">{venue.city}, {venue.state}</div>
                    <div className="venue-card-sport">{venue.sport} · {venue.teams.join(', ')}</div>
                    <span className={`badge badge-${badge.color}`} style={{ marginTop: '8px', width: 'fit-content' }}>
                      {badge.label}
                    </span>
                    <div className="venue-card-arrow">Find parking →</div>
                  </a>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
