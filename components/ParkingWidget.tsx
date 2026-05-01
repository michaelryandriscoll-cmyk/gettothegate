'use client'

import { useEffect, useState } from 'react'

type ParkingQuote = {
  id: string
  price?: { USD?: number }
  _embedded?: {
    'pw:location'?: {
      name?: string
      distance?: { walking?: number }
    }
  }
  _links?: {
    'pw:purchase_url'?: { href?: string }
  }
}

type Props = {
  slug: string
  venueName: string
  spotheroUrl: string
  parkwhizUrl: string
}

export default function ParkingWidget({ slug, venueName, spotheroUrl, parkwhizUrl }: Props) {
  const [quotes, setQuotes] = useState<ParkingQuote[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'fallback'>('loading')

  useEffect(() => {
    fetch(`/api/parking?slug=${encodeURIComponent(slug)}`)
      .then(res => res.json())
      .then(body => {
        const items: ParkingQuote[] =
          body?.data?._embedded?.['pw:quote'] ?? []
        if (items.length > 0) {
          setQuotes(items)
          setStatus('ok')
        } else {
          setStatus('fallback')
        }
      })
      .catch(() => setStatus('fallback'))
  }, [slug])

  if (status === 'loading') {
    return (
      <div className="parking-widget">
        <div className="parking-widget-loading">
          <div className="parking-widget-spinner" />
          Searching for parking near {venueName}…
        </div>
      </div>
    )
  }

  if (status === 'fallback') {
    return (
      <div className="parking-widget">
        <div className="parking-widget-fallback">
          <strong>Search for parking near {venueName}</strong> — compare prices and book before you leave the house.
          <div className="parking-widget-fallback-links">
            <a href={spotheroUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Search SpotHero →
            </a>
            <a href={parkwhizUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Search ParkWhiz →
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="parking-widget">
      <div className="parking-result-grid">
        {quotes.map(quote => {
          const location = quote._embedded?.['pw:location']
          const price = quote.price?.USD
          const bookUrl = quote._links?.['pw:purchase_url']?.href
          const distance = location?.distance?.walking

          return (
            <div key={quote.id} className="parking-result-card">
              <div className="parking-result-card-name">
                {location?.name ?? 'Parking Lot'}
              </div>
              <div className="parking-result-card-meta">
                {distance != null && <span>{distance.toFixed(1)} mi walk</span>}
              </div>
              {price != null && (
                <div className="parking-result-card-price">${price.toFixed(2)}</div>
              )}
              {bookUrl && (
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-full"
                  style={{ marginTop: 'auto', textAlign: 'center' }}
                >
                  Book Now →
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
