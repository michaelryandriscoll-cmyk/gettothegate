import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'City Parking Guides — Every Major US City | GetToTheGate',
  description: 'Parking guides for every major US city. Find the best lots, garages, and transit options near stadiums, arenas, and concert venues in Chicago, LA, New York, and more.',
  alternates: {
    canonical: 'https://gettothegate.com/cities/',
  },
}

const cities = [
  { name: 'Chicago', slug: 'chicago-parking', venues: 6, highlight: 'Wrigley Field, United Center, Soldier Field' },
  { name: 'Los Angeles', slug: 'los-angeles-parking', venues: 7, highlight: 'Dodger Stadium, SoFi Stadium, Hollywood Bowl' },
  { name: 'Boston', slug: 'boston-parking', venues: 3, highlight: 'Fenway Park, TD Garden, Gillette Stadium' },
  { name: 'Seattle', slug: 'seattle-parking', venues: 3, highlight: 'T-Mobile Park, Lumen Field, Climate Pledge Arena' },
  { name: 'Cleveland', slug: 'cleveland-parking', venues: 3, highlight: 'Progressive Field, Rocket Mortgage FieldHouse' },
  { name: 'San Francisco', slug: 'san-francisco-parking', venues: 3, highlight: 'Oracle Park, Chase Center' },
  { name: 'Washington DC', slug: 'washington-dc-parking', venues: 3, highlight: 'Capital One Arena, Nationals Park, Kennedy Center' },
  { name: 'Charlotte', slug: 'charlotte-parking', venues: 5, highlight: 'Bank of America Stadium, Spectrum Center' },
]

export default function CitiesPage() {
  return (
    <main>
      <section className="parking-listing-hero">
        <div className="container">
          <h1>City Parking Guides</h1>
          <p>Complete parking guides for every major US city. Find the best lots, garages, and transit options near every stadium and arena.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '48px 24px 80px' }}>
        <div className="venue-grid" style={{ paddingTop: 0 }}>
          {cities.map(city => (
            <a key={city.slug} href={`/cities/${city.slug}/`} className="venue-card">
              <div className="venue-card-name">{city.name}</div>
              <div className="venue-card-city">{city.venues} venues covered</div>
              <div className="venue-card-sport" style={{ fontSize: '13px', marginTop: '4px' }}>{city.highlight}</div>
              <div className="venue-card-arrow" style={{ marginTop: '12px' }}>View parking guide →</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
