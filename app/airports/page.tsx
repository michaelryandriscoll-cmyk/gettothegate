import { Metadata } from 'next'
import { getAllAirports, getParkingMarketBadge, formatPassengers } from '@/lib/airports'

export const metadata: Metadata = {
  title: 'Airport Parking Near Every Major US Airport | GetToTheGate',
  description: 'Find and reserve parking near 20 major US airports. Compare off-airport lots, economy garages, and terminal parking. Book before you leave the house.',
  alternates: {
    canonical: 'https://gettothegate.com/airports/',
  },
}

const REGIONS: Record<string, string[]> = {
  Northeast: ['bos-airport-parking', 'ewr-airport-parking', 'jfk-airport-parking'],
  Southeast: ['atl-airport-parking', 'clt-airport-parking', 'mco-airport-parking', 'mia-airport-parking'],
  Midwest:   ['dtw-airport-parking', 'msp-airport-parking', 'ord-airport-parking'],
  South:     ['dfw-airport-parking', 'iah-airport-parking'],
  West:      ['den-airport-parking', 'las-airport-parking', 'lax-airport-parking', 'pdx-airport-parking', 'phx-airport-parking', 'san-airport-parking', 'sea-airport-parking', 'sfo-airport-parking'],
}

export default function AirportsListingPage() {
  const airports = getAllAirports()
  const bySlug = Object.fromEntries(airports.map(a => [a.slug, a]))

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Airport Parking<br />Near Every Major US Airport</h1>
          <p>Find and book parking near {airports.length} major US airports. Compare off-airport lots, economy garages, and terminal parking — and book before you leave the house.</p>
        </div>
      </section>

      <div className="container">
        {Object.entries(REGIONS).map(([region, slugs], regionIndex) => {
          const regionAirports = slugs.map(s => bySlug[s]).filter(Boolean)
          return (
            <section key={region}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: regionIndex === 0 ? '48px' : '40px', marginBottom: '20px' }}>
                {region}
              </h2>
              <div className="venue-grid" style={{ paddingTop: 0, paddingBottom: '32px' }}>
                {regionAirports.map(airport => {
                  const badge = getParkingMarketBadge(airport.parking_market)
                  return (
                    <a key={airport.slug} href={`/airports/${airport.slug}/`} className="venue-card">
                      <div className="venue-card-name">{airport.name}</div>
                      <div className="venue-card-city">{airport.city}, {airport.state}</div>
                      <div className="venue-card-sport">{airport.iata_code} · {formatPassengers(airport.annual_passengers)} passengers/year</div>
                      <span className={`badge badge-${badge.color}`} style={{ marginTop: '8px', width: 'fit-content' }}>
                        {badge.label}
                      </span>
                      <div className="venue-card-arrow">Find parking →</div>
                    </a>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
