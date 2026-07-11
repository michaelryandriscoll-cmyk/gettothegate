import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Washington DC Event Parking — Every Major Venue',
  description: 'Find and book parking near every major Washington DC venue. Capital One Arena, Nationals Park, Kennedy Center and more. Compare prices and book before you go.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/washington-dc-parking/',
  },
}

export default function WashingtonDCParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v => v.city === 'Washington')

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Washington DC Event Parking</h1>
          <p>Find and book parking near every major DC venue. Compare prices across {venues.length} arenas, stadiums, and performing arts venues.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 24px 16px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)', maxWidth: '800px' }}>
          Washington DC has exceptional transit access to its major venues — the Metro is genuinely the best option for most events. Capital One Arena sits directly above Gallery Place/Chinatown Metro, Nationals Park has Navy Yard-Ballpark Green Line stop at the front gate, and the Kennedy Center runs a free shuttle from Foggy Bottom Metro every 15 minutes on show nights. For drivers, DC has solid private garage inventory near all three venues but Metro almost always wins on speed and cost.
        </p>
      </div>

      <div className="container" style={{ padding: '16px 24px 80px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Washington DC Venues</h2>
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>DC Parking Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🚇 Take the Metro</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>DC Metro is genuinely faster than driving to most venues. Gallery Place for Capital One Arena, Navy Yard for Nationals Park, Foggy Bottom shuttle for Kennedy Center.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏀 Penn Quarter</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Garages on 9th St NW and H St NW offer best value near Capital One Arena. Book online for Capitals and Wizards playoff games.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>⚾ Capitol Riverfront</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Half St SE and 1st St SE garages are closest to Nationals Park. Green Line Metro is the easiest option for most DC neighborhoods.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
