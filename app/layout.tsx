import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GetToTheGate — Event & Airport Parking',
  description: 'Find and reserve parking near any stadium, arena, amphitheater, or airport before you leave the house.',
  metadataBase: new URL('https://gettothegate.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="verify-admitad" content="d00fbbf0f6" />
      </head>
      <body>
        <nav className="site-nav">
          <div className="container nav-inner">
            <a href="/" className="nav-logo">Get<span>To</span>TheGate</a>
            <div className="nav-links">
              <a href="/parking/">Venues</a>
              <a href="/airports/">Airports</a>
              <a href="/parking/" className="nav-cta">Find Parking</a>
            </div>
          </div>
        </nav>

        {children}

        <footer className="site-footer">
          <div className="container footer-inner">
            <a href="/" className="footer-logo">Get<span>To</span>TheGate</a>
            <div className="footer-links">
              <a href="/parking/">Venues</a>
              <a href="/airports/">Airports</a>
              <a href="/cities/">Cities</a>
            </div>
            <div className="footer-copy">© 2026 GetToTheGate.com</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
