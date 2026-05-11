import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'San Francisco Event Parking — Every Major Venue | GetToTheGate',
  description: 'Find and book parking near every major San Francisco venue. Oracle Park, Chase Center, and more. Transit-first city — compare options before you go.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/san-francisco-parking/',
  },
}

export default function SanFranciscoParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v => v.city === 'San Francisco')

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>San Francisco Event Parking</h1>
          <p>Find and book parking near every major San Francisco venue. Compare prices across {venues.length} stadiums and arenas.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 24px 16px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)', maxWidth: '800px' }}>
          San Francisco is a transit-first city and both major venues were designed with that in mind. Chase Center was built with intentionally limited parking to encourage Muni and ferry use. Oracle Park is best reached by CalTrain or the Muni T and N lines. That said, both venues have solid private lot inventory nearby for drivers — it's just more expensive and competitive than most markets. Book well in advance and consider transit seriously.
        </p>
      </div>

      <div className="container" style={{ padding: '16px 24px 80px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>San Francisco Venues</h2>
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>SF Parking Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>⚾ Oracle Park</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>CalTrain to 4th & King is 3 blocks away. Mission Bay surface lots south of the park offer the best value for drivers. Book online — walk-up rates surge on weekend Giants games.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏀 Chase Center</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Muni T Line stops right at the arena. East Bay fans should take the ferry — it drops you at Chase Center on game nights. Limited parking by design.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>💰 SF Parking Costs</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>San Francisco is one of the most expensive parking markets in the US. Budget $30-60 for event parking. Transit saves both money and stress — seriously consider it.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
