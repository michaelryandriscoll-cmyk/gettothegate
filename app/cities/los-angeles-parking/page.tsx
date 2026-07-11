import { Metadata } from 'next'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'Los Angeles Event Parking — Every Major Venue',
  description: 'Find and book parking near every major LA venue. Dodger Stadium, Crypto.com Arena, SoFi Stadium, Rose Bowl, Hollywood Bowl and more. Olympics 2028 parking guide included.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/los-angeles-parking/',
  },
}

export default function LosAngelesParkingPage() {
  const all = getAllVenues()
  const venues = all.filter(v =>
    v.city === 'Los Angeles' ||
    v.city === 'Inglewood' ||
    v.city === 'Pasadena' ||
    v.city === 'Hollywood' ||
    v.city === 'Anaheim'
  )

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Los Angeles Event Parking</h1>
          <p>Find and book parking near every major LA venue. Compare prices across {venues.length} stadiums, arenas, and concert venues — including 2028 Olympics sites.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '32px 24px 16px' }}>
        <div style={{ backgroundColor: '#111', border: '1px solid #FFE600', borderRadius: '8px', padding: '16px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🏅</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: '#FFE600' }}>LA hosts the 2028 Olympics</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>SoFi Stadium, Rose Bowl, Crypto.com Arena and Dodger Stadium are confirmed venues. Book parking early.</div>
          </div>
        </div>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)', maxWidth: '800px' }}>
          Los Angeles is the largest event parking market in the country. From Dodger Stadium in Chavez Ravine to SoFi Stadium in Inglewood to the Hollywood Bowl in the Hills, LA venues span a massive geographic area. Traffic is the defining challenge — give yourself 90 minutes minimum from most parts of the city and book parking online well in advance. Metro rail options are improving but LA remains primarily a driving market.
        </p>
      </div>

      <div className="container" style={{ padding: '16px 24px 80px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>LA Area Venues</h2>
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>LA Parking Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>⚾ Dodger Stadium</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Private lots on Academy Rd and Stadium Way are 30-50% cheaper than official lots. Dodger Stadium Express from Union Station is $8 round trip and avoids all traffic.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏀 Crypto.com Arena</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Metro Blue/Expo Line to Pico station is 3 blocks away. Figueroa Corridor garages have the best parking inventory downtown.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🎵 Hollywood Bowl</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Most-searched parking venue in the country. Official Park & Ride shuttle is the only stress-free option. Book 90-120 minutes before showtime if driving.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏈 SoFi Stadium</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Official Hollywood Park lots run $50-100+. Private Inglewood lots on Prairie Ave and Century Blvd are significantly cheaper. Metro Green Line shuttle from Hawthorne/Lennox.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>🏟️ Rose Bowl</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Official lots are well-priced at $20-40. Metro Gold Line to Memorial Park with event shuttle. Single-road Arroyo Seco approach — arrive 90 minutes early.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>⚾ Angel Stadium</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>Metrolink from LA Union Station stops right at the stadium. Katella Ave private lots are cheaper than official stadium parking.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
