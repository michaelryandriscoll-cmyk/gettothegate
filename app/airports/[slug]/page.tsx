import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllAirports, getAirportBySlug, formatPassengers, getParkingMarketBadge } from '@/lib/airports'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const airports = getAllAirports()
  return airports.map(airport => ({ slug: airport.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const airport = getAirportBySlug(slug)
  if (!airport) return { title: 'Airport Not Found' }

  return {
    title: airport.meta_title,
    description: airport.meta_description,
    openGraph: {
      title: airport.meta_title,
      description: airport.meta_description,
      url: `https://gettothegate.com/airports/${airport.slug}/`,
      siteName: 'GetToTheGate',
      type: 'website',
    },
    alternates: {
      canonical: `https://gettothegate.com/airports/${airport.slug}/`,
    },
  }
}

export default async function AirportParkingPage({ params }: Props) {
  const { slug } = await params
  const airport = getAirportBySlug(slug)
  if (!airport) notFound()

  const badge = getParkingMarketBadge(airport.parking_market)
  const spotheroUrl = `https://spothero.com/search?query=${encodeURIComponent(airport.name + ' ' + airport.city)}`
  const parkwhizUrl = `https://www.parkwhiz.com/s/?q=${encodeURIComponent(airport.parkwhiz_search)}`
  const parkingAccessUrl = `https://parkingaccess.com/go/${airport.iata_code}?rfid=FNlRtJgyId`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `Parking near ${airport.name}`,
    'description': airport.meta_description,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': airport.address,
      'addressLocality': airport.city,
      'addressRegion': airport.state,
      'postalCode': airport.zip,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': airport.lat,
      'longitude': airport.lng,
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': airport.faq.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="venue-page">

        <section className="venue-hero">
          <div className="container">
            <div className="venue-hero-content">
              <div className="venue-breadcrumb">
                <a href="/">GetToTheGate</a>
                <span> / </span>
                <a href="/airports/">Airport Parking</a>
                <span> / </span>
                <span>{airport.iata_code}</span>
              </div>
              <h1 className="venue-title">{airport.name} Parking</h1>
              <p className="venue-subtitle">
                {airport.city}, {airport.state} · {airport.iata_code} · {formatPassengers(airport.annual_passengers)} passengers/year
              </p>
              <div className="venue-badges">
                <span className={`badge badge-${badge.color}`}>{badge.label}</span>
                <span className="badge badge-neutral">Avg stay: {airport.avg_days_parked} days</span>
              </div>
              <div className="hero-cta-group">
                <a href={spotheroUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Find Parking on SpotHero →
                </a>
                <a href={parkwhizUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Search ParkWhiz
                </a>
                <a href={parkingAccessUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Search Parking Access
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="venue-info-bar">
          <div className="container">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{airport.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Terminals</span>
                <span className="info-value">{airport.terminals.length} terminal{airport.terminals.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Arrive</span>
                <span className="info-value">{airport.arrive_recommendation}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Avg Trip Length</span>
                <span className="info-value">{airport.avg_days_parked} days</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container venue-body">
          <div className="venue-main">

            <section className="venue-section">
              <h2>Parking Near {airport.name}</h2>
              <p>{airport.parking_tips}</p>
            </section>

            <section className="venue-section">
              <h2>Short-Term vs Long-Term Parking at {airport.iata_code}</h2>
              <div className="lots-grid">
                <div className="lot-card lot-card-good">
                  <h3>Short-Term Parking</h3>
                  <p>{airport.short_term_info}</p>
                </div>
                <div className="lot-card lot-card-neutral">
                  <h3>Long-Term &amp; Economy Parking</h3>
                  <p>{airport.long_term_info}</p>
                </div>
              </div>
            </section>

            <section className="venue-section">
              <h2>Best &amp; Worst Parking at {airport.iata_code}</h2>
              <div className="lots-grid">
                <div className="lot-card lot-card-good">
                  <h3>✅ Best Options</h3>
                  <p>{airport.best_lots}</p>
                </div>
                <div className="lot-card lot-card-bad">
                  <h3>⚠️ Avoid</h3>
                  <p>{airport.worst_lots}</p>
                </div>
              </div>
            </section>

            <section className="venue-section">
              <h2>Getting to {airport.name} Without a Car</h2>
              <div className="transit-card">
                <span className="transit-icon">🚇</span>
                <p>{airport.transit}</p>
              </div>
            </section>

            <section className="venue-section">
              <h2>{airport.name} Terminals</h2>
              <ul className="gates-list">
                {airport.terminals.map((terminal, i) => (
                  <li key={i}>{terminal}</li>
                ))}
              </ul>
            </section>

            <section className="venue-section venue-faq">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {airport.faq.map((item, i) => (
                  <div key={i} className="faq-item">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <aside className="venue-sidebar">
            <div className="sidebar-card">
              <h3>Book Airport Parking</h3>
              <p>Reserve your spot before you leave the house. Guaranteed availability.</p>
              <a href={spotheroUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-full">
                Search SpotHero →
              </a>
              <a href={parkwhizUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-full" style={{marginTop: '8px'}}>
                Search ParkWhiz →
              </a>
              <a href={parkingAccessUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-full" style={{marginTop: '8px'}}>
                Search Parking Access →
              </a>
            </div>

            <div className="sidebar-card sidebar-tips">
              <h3>Airport Parking Tips</h3>
              <ul>
                <li>📅 Book 48–72 hours in advance</li>
                <li>💰 Off-airport lots save 30–50%</li>
                <li>🕐 {airport.arrive_recommendation}</li>
                <li>🚌 Budget 20 min for shuttle to terminal</li>
                <li>📱 Save confirmation to your phone</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Average Stay</h3>
              <p>
                Travelers at {airport.iata_code} park for an average of <strong>{airport.avg_days_parked} days</strong>.
                Every dollar saved per day adds up — book off-airport when possible.
              </p>
            </div>
          </aside>
        </div>

      </main>
    </>
  )
}
