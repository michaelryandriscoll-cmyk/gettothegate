import { Metadata } from 'next'
import { getTopVenues } from '@/lib/venues'

export const metadata: Metadata = {
  title: 'GetToTheGate — Event & Airport Parking',
  description: 'Find and reserve parking near any stadium, arena, amphitheater, or airport before you leave the house. No stress, no circling, just get to the gate.',
  alternates: {
    canonical: 'https://gettothegate.com',
  },
}

export default function HomePage() {
  const topVenues = getTopVenues(6)

  return (
    <main>

      <section className="home-hero">
        <div className="home-hero-bg"></div>
        <div className="home-hero-grid"></div>
        <div className="container home-hero-content">
          <div className="home-eyebrow">
            <span className="eyebrow-dot"></span>
            Event &amp; Airport Parking — Sorted
          </div>
          <h1 className="home-headline">
            PARK.<br />
            <span className="accent">GET TO</span><br />
            <span className="outline">THE GATE.</span>
          </h1>
          <p className="home-sub">
            Find and reserve parking near any stadium, arena, amphitheater, or airport — before you leave the house.
          </p>
          <div className="home-actions">
            <a href="/parking/" className="btn-primary">Find Parking Near Me →</a>
            <a href="#how" className="btn-ghost">See how it works ↓</a>
          </div>
        </div>
        <div className="home-stats">
          <div className="home-stat">
            <div className="stat-num">500+</div>
            <div className="stat-label">Venues Covered</div>
          </div>
          <div className="home-stat">
            <div className="stat-num">50+</div>
            <div className="stat-label">Major Cities</div>
          </div>
          <div className="home-stat">
            <div className="stat-num">$0</div>
            <div className="stat-label">Booking Fees</div>
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="marquee-inner">
              <span className="marquee-item"><span>🏟️</span> NFL Games</span>
              <span className="marquee-item"><span>🏀</span> NBA Playoffs</span>
              <span className="marquee-item"><span>🎵</span> Concerts</span>
              <span className="marquee-item"><span>✈️</span> Airport Parking</span>
              <span className="marquee-item"><span>⚾</span> MLB Games</span>
              <span className="marquee-item"><span>🎭</span> Theater Shows</span>
              <span className="marquee-item"><span>🏒</span> NHL Games</span>
              <span className="marquee-item"><span>🎪</span> Festivals</span>
            </span>
          ))}
        </div>
      </div>

      <section className="home-section">
        <div className="container">
          <div className="section-label">Every Event Type</div>
          <h2 className="section-title">WHEREVER YOU&apos;RE HEADED</h2>
          <div className="categories-grid">
            <a href="/parking/" className="cat-card">
              <span className="cat-icon">🏟️</span>
              <div className="cat-name">Stadiums</div>
              <div className="cat-desc">NFL, MLB, college football — every major stadium with parking options at every price point.</div>
              <div className="cat-arrow">→</div>
            </a>
            <a href="/parking/" className="cat-card">
              <span className="cat-icon">🏀</span>
              <div className="cat-name">Arenas</div>
              <div className="cat-desc">NBA, NHL, boxing, concerts — indoor arenas in every major city covered.</div>
              <div className="cat-arrow">→</div>
            </a>
            <a href="/parking/" className="cat-card">
              <span className="cat-icon">🎵</span>
              <div className="cat-name">Concerts</div>
              <div className="cat-desc">Amphitheaters, clubs, outdoor festivals — never miss the opening act hunting for parking.</div>
              <div className="cat-arrow">→</div>
            </a>
            <a href="/airports/" className="cat-card">
              <span className="cat-icon">✈️</span>
              <div className="cat-name">Airports</div>
              <div className="cat-desc">Short-term, long-term, covered, valet — find the right airport parking for every trip.</div>
              <div className="cat-arrow">→</div>
            </a>
          </div>
        </div>
      </section>

      <section className="home-how" id="how">
        <div className="container">
          <div className="section-label">Simple Process</div>
          <h2 className="section-title">HOW IT WORKS</h2>
          <div className="how-grid">
            <div className="how-step">
              <div className="how-num">01</div>
              <div className="how-title">Enter Your Event or Venue</div>
              <div className="how-desc">Search by venue name, team, artist, or airport. We pull up every available parking option nearby with real-time pricing.</div>
            </div>
            <div className="how-step">
              <div className="how-num">02</div>
              <div className="how-title">Pick Your Spot</div>
              <div className="how-desc">Compare lots by price, distance to gate, and amenities. Filter by covered parking, valet, accessible spaces, and more.</div>
            </div>
            <div className="how-step">
              <div className="how-num">03</div>
              <div className="how-title">Get To The Gate</div>
              <div className="how-desc">Your parking pass is emailed instantly. Show it at the lot and walk straight to the gate — no circling, no stress.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="section-label">Popular Venues</div>
          <h2 className="section-title">FIND YOUR VENUE</h2>
          <div className="venue-grid" style={{paddingTop: 0}}>
            {topVenues.map(venue => (
              <a key={venue.slug} href={`/parking/${venue.slug}/`} className="venue-card">
                <div className="venue-card-name">{venue.name}</div>
                <div className="venue-card-city">{venue.city}, {venue.state}</div>
                <div className="venue-card-sport">{venue.sport}</div>
                <div className="venue-card-arrow">Find parking →</div>
              </a>
            ))}
          </div>
          <div style={{textAlign: 'center', marginTop: '32px'}}>
            <a href="/parking/" className="btn-primary">View All Venues →</a>
          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="container">
          <div className="home-cta">
            <div className="home-cta-title">STOP STRESSING.<br />START PARKING.</div>
            <div className="home-cta-right">
              <p>Reserve your spot before you leave the house. Guaranteed.</p>
              <a href="/parking/" className="btn-dark">Find Parking Now →</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
