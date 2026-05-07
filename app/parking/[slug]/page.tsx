import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllVenues, getVenueBySlug, formatCapacity, getParkingMarketBadge } from '@/lib/venues'
import { getVenueEvents, formatEventTime } from '@/lib/stubhub'
import ParkingWidget from '@/components/ParkingWidget'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const venues = getAllVenues()
  return venues.map(venue => ({ slug: venue.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const venue = getVenueBySlug(slug)
  if (!venue) return { title: 'Venue Not Found' }

  return {
    title: venue.meta_title,
    description: venue.meta_description,
    openGraph: {
      title: venue.meta_title,
      description: venue.meta_description,
      url: `https://gettothegate.com/parking/${venue.slug}/`,
      siteName: 'GetToTheGate',
      type: 'website',
    },
    alternates: {
      canonical: `https://gettothegate.com/parking/${venue.slug}/`,
    },
  }
}

export default async function VenueParkingPage({ params }: Props) {
  const { slug } = await params
  const venue = getVenueBySlug(slug)
  if (!venue) notFound()

  const badge = getParkingMarketBadge(venue.parking_market)
  const spotheroUrl = `https://spothero.com/search?latitude=${venue.lat}&longitude=${venue.lng}&query=${encodeURIComponent(venue.name)}`
  const parkwhizUrl = `https://www.parkwhiz.com/s/?q=${encodeURIComponent(venue.parkwhiz_search)}`
  const stubhubUrl = `https://www.stubhub.com/search/?q=${encodeURIComponent(venue.name + ' ' + venue.city)}`

  const events = venue.stubhub_venue_id && process.env.STUBHUB_CLIENT_ID
    ? await getVenueEvents(venue.stubhub_venue_id).catch(() => [])
    : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `Parking near ${venue.name}`,
    'description': venue.meta_description,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': venue.address,
      'addressLocality': venue.city,
      'addressRegion': venue.state,
      'postalCode': venue.zip,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': venue.lat,
      'longitude': venue.lng,
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': venue.faq.map(item => ({
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
                <a href="/parking/">Parking</a>
                <span> / </span>
                <span>{venue.city}</span>
              </div>
              <h1 className="venue-title">{venue.name} Parking</h1>
              <p className="venue-subtitle">
                {venue.city}, {venue.state} · {formatCapacity(venue.capacity)} capacity · {venue.sport}
              </p>
              <div className="venue-badges">
                <span className={`badge badge-${badge.color}`}>{badge.label}</span>
                <span className="badge badge-neutral">{venue.arrive_recommendation}</span>
              </div>
              <div className="hero-cta-group">
                <a href={spotheroUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Find Parking on SpotHero →
                </a>
                <a href={parkwhizUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Search ParkWhiz
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="container" style={{ paddingTop: '24px' }}>
          <ParkingWidget
            slug={venue.slug}
            venueName={venue.name}
            spotheroUrl={spotheroUrl}
            parkwhizUrl={parkwhizUrl}
          />
        </div>

        <section className="venue-info-bar">
          <div className="container">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{venue.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Capacity</span>
                <span className="info-value">{formatCapacity(venue.capacity)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Teams</span>
                <span className="info-value">{venue.teams.join(', ')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Neighborhood</span>
                <span className="info-value">{venue.neighborhoods[0]}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container venue-body">
          <div className="venue-main">

            <section className="venue-section">
              <h2>Parking Near {venue.name}</h2>
              <p>{venue.parking_tips}</p>
            </section>

            {events.length > 0 && (
              <section className="venue-section">
                <h2>Upcoming Events at {venue.name}</h2>
                <div className="events-list">
                  {events.slice(0, 10).map(event => {
                    const eventDate = new Date(`${event.dateLocal}T${event.timeLocal}`)
                    const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
                    const day = eventDate.getDate()
                    const time = formatEventTime(event.timeLocal)
                    return (
                      
                        key={event.id}
                        href={`/parking/${venue.slug}/${event.slug}/`}
                        className="event-list-item"
                      >
                        <div className="event-date-block">
                          <span className="event-month">{month}</span>
                          <span className="event-day">{day}</span>
                        </div>
                        <div className="event-info">
                          <div className="event-name">{event.name}</div>
                          <div className="event-time">{time} · {venue.name}</div>
                        </div>
                        <div className="event-action">
                          {event.minPrice && (
                            <span className="event-price">from ${event.minPrice}</span>
                          )}
                          <span className="event-arrow">Find Parking →</span>
                        </div>
                      </a>
                    )
                  })}
                </div>
                {events.length > 10 && (
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <a href={stubhubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                      View All {events.length} Events on StubHub →
                    </a>
                  </div>
                )}
              </section>
            )}

            <section className="venue-section">
              <h2>Best Lots Near {venue.name}</h2>
              <div className="lots-grid">
                <div className="lot-card lot-card-good">
                  <h3>✅ Best Options</h3>
                  <p>{venue.best_lots}</p>
                </div>
                <div className="lot-card lot-card-bad">
                  <h3>⚠️ Avoid</h3>
                  <p>{venue.worst_lots}</p>
                </div>
              </div>
            </section>

            <section className="venue-section">
              <h2>Getting to {venue.name} Without Driving</h2>
              <div className="transit-card">
                <span className="transit-icon">🚇</span>
                <p>{venue.transit}</p>
              </div>
            </section>

            <section className="venue-section">
              <h2>{venue.name} Gates & Entrances</h2>
              <ul className="gates-list">
                {venue.gates.map((gate, i) => (
                  <li key={i}>{gate}</li>
                ))}
              </ul>
            </section>

            <section className="venue-section venue-faq">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {venue.faq.map((item, i) => (
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
              <h3>Book Parking Now</h3>
              <p>Reserve your spot before you leave the house. Guaranteed availability.</p>
              <a href={spotheroUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-full">
                Search SpotHero →
              </a>
              <a href={parkwhizUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-full" style={{marginTop: '8px'}}>
                Search ParkWhiz →
              </a>
            </div>

            <div className="sidebar-card">
              <h3>Upcoming Events</h3>
              {events.length > 0 ? (
                <div className="sidebar-events">
                  {events.slice(0, 5).map(event => {
                    const eventDate = new Date(`${event.dateLocal}T${event.timeLocal}`)
                    const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
                    const day = eventDate.getDate()
                    return (
                      
                        key={event.id}
                        href={`/parking/${venue.slug}/${event.slug}/`}
                        className="sidebar-event-item"
                      >
                        <div className="sidebar-event-date">
                          <span className="sidebar-event-month">{month}</span>
                          <span className="sidebar-event-day">{day}</span>
                        </div>
                        <div className="sidebar-event-name">{event.name}</div>
                        <span className="sidebar-event-arrow">→</span>
                      </a>
                    )
                  })}
                  {events.length > 5 && (
                    <a href={stubhubUrl} target="_blank" rel="noopener noreferrer" className="sidebar-events-more">
                      +{events.length - 5} more events →
                    </a>
                  )}
                </div>
              ) : (
                <>
                  <p>Have tickets to an upcoming event at {venue.name}?</p>
                  <a href={stubhubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-full" style={{marginTop: '12px'}}>
                    View Events on StubHub →
                  </a>
                </>
              )}
            </div>

            <div className="sidebar-card sidebar-tips">
              <h3>Quick Tips</h3>
              <ul>
                <li>📅 Book at least 24-48 hours in advance</li>
                <li>💰 Online booking saves 20-40% vs walk-up</li>
                <li>🕐 {venue.arrive_recommendation}</li>
                <li>📱 Save your parking pass to your phone</li>
              </ul>
            </div>
          </aside>
        </div>

      </main>
    </>
  )
}
