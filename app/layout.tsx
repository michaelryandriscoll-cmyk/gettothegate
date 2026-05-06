import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://gettothegate.com'),
  title: {
    default: 'GetToTheGate — Event & Airport Parking',
    template: '%s | GetToTheGate',
  },
  description: 'Find and reserve parking near any stadium, arena, amphitheater, or airport before you leave the house. Compare prices, book online, and get to the gate stress-free.',
  keywords: [
    'event parking',
    'stadium parking',
    'arena parking',
    'airport parking',
    'concert parking',
    'game day parking',
    'park near stadium',
    'book parking online',
    'sports parking',
    'theater parking',
  ],
  authors: [{ name: 'GetToTheGate', url: 'https://gettothegate.com' }],
  creator: 'GetToTheGate',
  publisher: 'GetToTheGate',
  openGraph: {
    type: 'website',
    siteName: 'GetToTheGate',
    url: 'https://gettothegate.com',
    title: 'GetToTheGate — Event & Airport Parking',
    description: 'Find and reserve parking near any stadium, arena, amphitheater, or airport before you leave the house. Compare prices and book before you go.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GetToTheGate — Find Parking. Get To The Gate.',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetToTheGate — Event & Airport Parking',
    description: 'Find and reserve parking near any stadium, arena, or airport before you leave the house.',
    images: ['/og-image.jpg'],
    site: '@gettothegate',
    creator: '@gettothegate',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://gettothegate.com',
  },
  category: 'travel',
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D6XSQSWMKS"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D6XSQSWMKS');
        `}} />
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
              <a href="/privacy/">Privacy Policy</a>
            </div>
            <div className="footer-copy">© 2026 GetToTheGate.com</div>
          </div>
        </footer>
      </body>
    </html>
  )
}