'use client'

import { useState } from 'react'
import { getAllVenues, getParkingMarketBadge } from '@/lib/venues'

export default function ParkingListingPage() {
  const venues = getAllVenues()
  
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'venue' | 'event'>('venue')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'stadium', label: 'Stadiums' },
    { key: 'arena', label: 'Arenas' },
    { key: 'amphitheater', label: 'Amphitheaters' },
    { key: 'theater', label: 'Theaters' },
  ]

  const filtered = venues
    .filter(v => activeFilter === 'all' || v.type === activeFilter)
    .filter(v => {
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return (
        v.name.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.sport.toLowerCase().includes(q) ||
        v.teams.some(t => t.toLowerCase().includes(q))
      )
    })

  const VenueCard = ({ venue }: { venue: ReturnType<typeof getAllVenues>[0] }) => {
    const badge = getParkingMarketBadge(venue.parking_market)
    return (
      <a href={`/parking/${venue.slug}/`} className="venue-card">
        <div className="venue-card-name">{venue.name}</div>
        <div className="venue-card-city">{venue.city}, {venue.state}</div>
        <div className="venue-card-sport">{venue.sport} · {venue.teams.join(', ')}</div>
        <span className={`badge badge-${badge.color}`} style={{ marginTop: '8px', width: 'fit-content' }}>
          {badge.label}
        </span>
        <div className="venue-card-arrow">Find parking →</div>
      </a>
    )
  }

  const pillStyle = (active: boolean) => ({
    display: 'inline-block',
    padding: '10px 18px',
    fontSize: '13px',
    fontWeight: '700' as const,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
    borderRadius: '24px',
    border: active ? '2px solid #FFE600' : '2px solid #444',
    backgroundColor: active ? '#FFE600' : 'transparent',
    color: active ? '#0a0a0a' : '#ffffff',
    cursor: 'pointer',
    minHeight: '44px',
    lineHeight: '24px',
    userSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
  })

  const tabStyle = (active: boolean) => ({
    padding: '14px 24px',
    fontSize: '14px',
    fontWeight: '700' as const,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: active ? '#FFE600' : '#ffffff',
    background: 'none',
    border: 'none',
    borderBottom: active ? '2px solid #FFE600' : '2px solid transparent',
    cursor: 'pointer',
    display: 'inline-block',
    userSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
  })

  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>Event Parking<br />Near Every Venue</h1>
          <p>Find and book parking near {venues.length}+ major stadiums, arenas, amphitheaters, and theaters across the US.</p>
        </div>
      </section>

      <div style={{ backgroundColor: '#111', borderBottom: '1px solid #222' }}>
        <div className="container">

          <div style={{ display: 'flex', borderBottom: '1px solid #222' }}>
            <span
              style={tabStyle(activeTab === 'venue')}
              onTouchEnd={e => { e.preventDefault(); setActiveTab('venue') }}
              onClick={() => setActiveTab('venue')}
            >
              🏟️ Find a Venue
            </span>
            <span
              style={tabStyle(activeTab === 'event')}
              onTouchEnd={e => { e.preventDefault(); setActiveTab('event') }}
              onClick={() => setActiveTab('event')}
            >
              🎟️ Find an Event
            </span>
          </div>

          {activeTab === 'venue' && (
            <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="Search by venue, team, city, or sport..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '15px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#ffffff',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingBottom: '4px' }}>
                {filters.map(({ key, label }) => (
                  <span
                    key={key}
                    style={pillStyle(activeFilter === key)}
                    onTouchEnd={e => { e.preventDefault(); setActiveFilter(key) }}
                    onClick={() => setActiveFilter(key)}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'event' && (
            <div style={{ padding: '24px 0' }}>
              {!emailSubmitted ? (
                <div style={{ maxWidth: '520px' }}>
                  <p style={{ color: '#cccccc', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
                    Event search with live ticket + parking bundles is coming soon. Enter your email and we'll notify you the moment it goes live.
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '11px 16px',
                        fontSize: '14px',
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#ffffff',
                        outline: 'none',
                      }}
                    />
                    <span
                      style={{
                        padding: '11px 20px',
                        fontSize: '13px',
                        fontWeight: '700',
                        backgroundColor: '#FFE600',
                        color: '#0a0a0a',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                      }}
                      onTouchEnd={e => { e.preventDefault(); if (email) setEmailSubmitted(true) }}
                      onClick={() => { if (email) setEmailSubmitted(true) }}
                    >
                      Notify Me →
                    </span>
                  </div>
                </div>
              ) : (
                <p style={{ color: '#FFE600', fontSize: '14px', fontWeight: '600' }}>
                  ✓ You're on the list — we'll email you when event search goes live.
                </p>
              )}
            </div>
          )}

        </div>
      </div>

      {activeTab === 'venue' && (
        <div className="container">
          {filtered.length > 0 ? (
            <div className="venue-grid" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
              {filtered.map(venue => <VenueCard key={venue.slug} venue={venue} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#f5f2ee' }}>No venues found</div>
              <div style={{ fontSize: '14px' }}>Try searching for a city, team name, or sport</div>
            </div>
          )}
        </div>
      )}

    </main>
  )
}