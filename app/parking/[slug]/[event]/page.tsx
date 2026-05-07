import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllVenues, getVenueBySlug, getParkingMarketBadge } from '@/lib/venues'
import { getVenueEvents, getEventBySlug, formatEventDate, formatEventTime } from '@/lib/stubhub'

type Props = {
  params: Promise<{ slug: string; event: string }>
}

export async function generateStaticParams() {
  if (!process.env.STUBHUB_CLIENT_ID) return []

  const venues = getAllVenues()
  const paths: { slug: string; event: string }[] = []

  for (const venue of venues) {
    if (!venue.stubhub_venue_id) continue
    try {
      const events = await getVenueEvents(venue.stubhub_venue_id)
      for (const event of events) {
        paths.push({ slug: venue.slug, event: event.slug })
      }
    } catch {
      continue
    }
  }

  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, event: eventSlug } = await params
  const venue = getVenueBySlug(slug)
  if (!venue) return { title: 'Event Not Found' }

  const event = await getEventBySlug(venue.stubhub_venue_id, eventSlug)
  if (!event) return { title: 'Event Not Found' }

  const formattedDate = formatEventDate(event.dateLocal, event.timeLocal)
  const title = `${event.name} Parking — ${venue.name} ${formattedDate} | GetToTheGate`
  const description = `Find and book parking near ${venue.name} for ${event.name} on ${formattedDate}. Compare prices and reserve your spot before you leave the house.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://gettothegate.com/parking/${slug}/${eventSlug}/`,
      siteName: 'GetToTheGate',
      type: 'website',
    },
    alternates: {
      canonical: `https://gettothegate.com/parking/${slug}/${eventSlug}/`,
    },
  }
}

export default async function EventParkingPage({ params }: Props) {
  const { slug, event: eventSlug } = await params
  const venue = getVenueBySlug(slug)
  if (!venue) notFound()

  const event = await getEventBySlug(venue.stubhub_venue_id, eventSlug)
  if (!event) notFound()

  const badge = getParkingMarketBadge(venue.parking_market)
  const formattedDate = formatEventDate(event.dateLocal, event.timeLocal)
  const formattedTime = formatEventTime(event.timeLocal)

  const spotheroUrl = `https://spothero.com/search?latitude=${venue.lat}&longitude=${venue.lng}&query=${encodeURIComponent(event.name + ' ' + venue.name)}`
  const parkwhizUrl = `https://www.parkwhiz.com/s/?q=${encodeURIComponent(venue.parkwhiz_search)}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': event.name,
    'startDate': `${event.dateLocal}T${event.timeLocal}`,
    'location': {
      '@type': 'Place',
      'name': venue.name,
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
    },
    'description': `Parking guide for ${event.name} at ${venue.name}`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `Where should I park for ${event.name} at ${venue.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': venue.best_lots,
        },
      },
      {
        '@type': 'Question',
        'name': `How early should I arrive for ${event.name} parking?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': venue.arrive_recommendation,
        },
      },
      {
        '@type': 'Question',
        'name': `How much does parking cost for ${event.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Parking near ${venue.name} varies by event. Book online through SpotHero or ParkWhiz to lock in the best available rate — online booking saves 20-40% versus walk-up pricing.`,
        },
      },
    ],
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
                <a href={`/parking/${venue.slug}/`}>{venue.name}</a>
                <span> / </span>
                <span>{event.name}</span>
              </div>
              <h1 className="venue-title">{event.name} Parking</h1>
              <p className="venue-subtitle">
                {venue.name} · {venue.city}, {venue.state} · {formattedDate} · {formattedTime}
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

        <section className="venue-info-bar">
          <div className="container">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Event</span>
                <span className="info-value">{event.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value">{formattedDate}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time</span>
                <span className="info-value">{formattedTime}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Venue</span>
                <span className="info-value">{venue.name}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container venue-body">
          <div className="venue-main">

            <section className="venue-section">
              <h2>Parking for {event.name} at {venue.name}</h2>
              <p>{venue.parking_tips}</p>
            </section>

            <section className="venue-section">
              <h2>Best Parking Options for This Event</h2>
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
              <h2>Parking FAQ — {event.name}</h2>
              <div className="faq-list">
                <div className="faq-item">
                  <h3>Where should I park for {event.name} at {venue.name}?</h3>
                  <p>{venue.best_lots}</p>
                </div>
                <div className="faq-item">
                  <h3>How early should I arrive for {event.name} parking?</h3>
                  <p>{venue.arrive_recommendation}. For high-demand events, consider arriving even earlier.</p>
                </div>
                <div className="faq-item">
                  <h3>How much does parking cost for {event.name}?</h3>
                  <p>Parking near {venue.name} varies by event demand. Book online through SpotHero or ParkWhiz to lock in the best available rate — online booking typically saves 20-40% versus walk-up pricing on event days.</p>
                </div>
                <div className="faq-item">
                  <h3>Can I get transit to {venue.name} for {event.name}?</h3>
                  <p>{venue.transit}</p>
                </div>
                {venue.faq.slice(0, 2).map((item, i) => (
                  <div key={i} className="faq-item">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <aside className="venue-sidebar">
            <div className="sidebar-card" style={{ borderTop: '3px solid var(--yellow)' }}>
              <h3>Book Parking for {event.name}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {formattedDate} · {formattedTime}
              </p>
              <a href={spotheroUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-full">
                Search SpotHero →
              </a>
              <a href={parkwhizUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-full" style={{ marginTop: '8px' }}>
                Search ParkWhiz →
              </a>
            </div>

            {event.ticketUrl && (
              <div className="sidebar-card">
                <h3>Need Tickets?</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {event.minPrice && `From $${event.minPrice}`}
                </p>
                <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-full">
                  Buy Tickets on StubHub →
                </a>
              </div>
            )}

            <div className="sidebar-card">
              <h3>More {venue.name} Parking</h3>
              <a href={`/parking/${venue.slug}/`} className="btn-outline btn-full">
                View All {venue.name} Parking →
              </a>
            </div>

            <div className="sidebar-card sidebar-tips">
              <h3>Event Day Tips</h3>
              <ul>
                <li>📅 Book at least 24-48 hours in advance</li>
                <li>💰 Online booking saves 20-40% vs walk-up</li>
                <li>🕐 {venue.arrive_recommendation}</li>
                <li>📱 Save your parking pass to your phone</li>
                <li>🎟️ Have your tickets ready at the gate</li>
              </ul>
            </div>
          </aside>
        </div>

      </main>
    </>
  )
}
