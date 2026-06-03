'use client'

import { useState } from 'react'
import { TicketmasterEvent } from '@/lib/ticketmaster'

type Props = {
  events: TicketmasterEvent[]
  venueName: string
  venueLat: number
  venueLng: number
  ticketmasterUrl: string
}

export default function EventsList({ events, venueName, venueLat, venueLng, ticketmasterUrl }: Props) {
  const [page, setPage] = useState(0)
  const perPage = 10
  const totalPages = Math.ceil(events.length / perPage)
  const visible = events.slice(page * perPage, (page + 1) * perPage)

  const getTicketNetworkUrl = (event: TicketmasterEvent) => {
    const cleanName = event.name
      .split(' - ')[0]
      .split(': ')[0]
      .split(' presented by')[0]
      .split(' Presented by')[0]
      .trim()
    const dest = `https://www.ticketnetwork.com/search?q=${encodeURIComponent(cleanName)}`
    return `https://ticketnetwork.lusg.net/c/7321305/3890519/2322?u=${encodeURIComponent(dest)}`
  }

  const getParkWhizUrl = (event: TicketmasterEvent) => {
    return `https://www.parkwhiz.com/s/?q=${encodeURIComponent(venueName)}&date=${event.dateLocal}`
  }

  const getSpotHeroUrl = (event: TicketmasterEvent) => {
    const start = new Date(`${event.dateLocal}T${event.timeLocal}`)
    start.setHours(start.getHours() - 2)
    const end = new Date(`${event.dateLocal}T${event.timeLocal}`)
    end.setHours(end.getHours() + 4)
    return `https://spothero.com/search?latitude=${venueLat}&longitude=${venueLng}&starts=${start.toISOString().slice(0,16)}&ends=${end.toISOString().slice(0,16)}&query=${encodeURIComponent(venueName)}`
  }

  const getVenueTicketNetworkUrl = () => {
    const dest = `https://www.ticketnetwork.com/search?q=${encodeURIComponent(venueName)}`
    return `https://ticketnetwork.lusg.net/c/7321305/3890519/2322?u=${encodeURIComponent(dest)}`
  }

  return (
    <>
      <div className="events-list">
        {visible.map(event => {
          const eventDate = new Date(`${event.dateLocal}T${event.timeLocal}`)
          const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()
          const day = eventDate.getDate()
          const hours = eventDate.getHours()
          const minutes = eventDate.getMinutes()
          const period = hours >= 12 ? 'PM' : 'AM'
          const displayHours = hours % 12 || 12
          const time = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`

          return (
            <div key={event.id} className="event-list-item">
              <div className="event-date-block">
                <span className="event-month">{month}</span>
                <span className="event-day">{day}</span>
              </div>
              <div className="event-info">
                <div className="event-name">{event.name}</div>
                <div className="event-time">{time} · {venueName}</div>
              </div>
              <div className="event-action">
                <a href={getTicketNetworkUrl(event)} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{fontSize:'13px',padding:'6px 12px'}}>Get Tickets →</a>
                <a href={getSpotHeroUrl(event)} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{fontSize:'13px',padding:'6px 12px',marginLeft:'6px'}}>SpotHero →</a>
                <a href={getParkWhizUrl(event)} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{fontSize:'13px',padding:'6px 12px',marginLeft:'6px'}}>ParkWhiz →</a>
              </div>
            </div>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          {page > 0 && (
            <button onClick={() => setPage(page - 1)} className="btn-outline">
              ← Previous
            </button>
          )}
          <span style={{ padding: '8px 16px', fontSize: '14px', color: '#666' }}>
            Page {page + 1} of {totalPages}
          </span>
          {page < totalPages - 1 && (
            <button onClick={() => setPage(page + 1)} className="btn-outline">
              Next →
            </button>
          )}
        </div>
      )}

      {events.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <a href={getVenueTicketNetworkUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
            View All Tickets on TicketNetwork →
          </a>
        </div>
      )}
    </>
  )
}
