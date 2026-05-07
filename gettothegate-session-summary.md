# GetToTheGate.com — Full Build Session Summary

## Business Overview
GetToTheGate.com is an event and airport parking discovery platform targeting ticket buyers and travelers. Revenue via affiliate commissions. Long-term goal: direct lot owner relationships. Mike has insider knowledge from working as independent contractor for a parking reseller doing $70k/month profit via StubHub spec-listing arbitrage with ParkWhiz/SpotHero fulfillment.

## Infrastructure
- **Domain:** gettothegate.com (Namecheap, $11.48/yr)
- **Email:** michael@gettothegate.com (Namecheap Private Email, $7.44/yr) — SPF/DKIM/DMARC all configured, 10/10 mail-tester score
- **Hosting:** Vercel (free tier)
- **GitHub:** michaelryandriscoll-cmyk/gettothegate (main branch)
- **DNS:** Cloudflare (nameservers: cris.ns.cloudflare.com, margot.ns.cloudflare.com)
- **Cloudflare:** Active — Full (strict) SSL, Always HTTPS, Bot Fight Mode, Auto Minify
- **Google Search Console:** Verified, sitemap submitted, pages being indexed
- **Google Analytics:** GA4, Measurement ID: G-D6XSQSWMKS
- **GitHub Actions:** Nightly rebuild workflow at midnight CST via VERCEL_DEPLOY_HOOK secret

## Tech Stack
Next.js 15 (App Router, TypeScript, no ESLint, no Tailwind) deployed on Vercel. No WordPress/headless CMS — all data in JSON files.

## Site Structure

### Files:
- `data/venues.json` — 86 venues (MLB, NBA/NHL arenas, minor league, theaters, amphitheaters, NFL/World Cup, Olympics 2028, college)
- `data/airports.json` — 20 airports with SEO slugs like `lax-airport-parking`
- `lib/venues.ts` — venue utility functions with TypeScript types
- `lib/airports.ts` — airport utility functions
- `lib/parkwhiz.ts` — ParkWhiz API v4 integration (sandbox, awaiting credentials)
- `lib/stubhub.ts` — StubHub API integration (awaiting credentials) — getVenueEvents, getEventBySlug, formatEventDate, formatEventTime
- `app/parking/[slug]/page.tsx` — venue parking pages with events list (shows events when StubHub live, fallback when not)
- `app/parking/[slug]/[event]/page.tsx` — event-specific parking pages (auto-generated from StubHub API)
- `app/parking/page.tsx` — venue listing page with search + filter tabs (Find a Venue / Find an Event)
- `app/airports/[slug]/page.tsx` — airport parking pages
- `app/airports/page.tsx` — airport listing grouped by region
- `app/privacy/page.tsx` — Privacy Policy page
- `app/page.tsx` — homepage
- `app/api/parking/route.ts` — API proxy for ParkWhiz quotes
- `app/sitemap.ts` — auto-generates sitemap for all pages
- `app/globals.css` — full styling (Bebas Neue + DM Sans fonts, black/yellow brand) + event list CSS
- `app/layout.tsx` — full SEO metadata, GA4, OpenGraph, Twitter cards, favicons
- `components/ParkingWidget.tsx` — client-side parking results widget with fallback
- `.github/workflows/nightly-rebuild.yml` — GitHub Actions nightly Vercel rebuild
- `next.config.mjs` — trailingSlash: true, allowedDevOrigins

### Page count: ~110 indexed pages
- 86 venue pages
- 20 airport pages
- Listing pages + homepage + privacy policy

### Public folder:
- favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
- android-chrome-192x192.png, android-chrome-512x512.png
- site.webmanifest, favicon.svg
- og-image.jpg (1200x630, black/yellow brand)

### Affiliate links on pages:
- SpotHero: lat/lng deep links
- ParkWhiz: search deep links using parkwhiz_search field
- Parking Access: deep links using IATA code — https://parkingaccess.com/go/{IATA}?rfid=FNlRtJgyId
- StubHub: search URLs — https://www.stubhub.com/search/?q={venue+city}

## Affiliate Programs Status

### ACTIVE:
- ✅ Parking Access — 5% commission, live on all 20 airport pages, affiliate code: FNlRtJgyId

### PENDING:
- ⏳ ParkWhiz Partner Portal — applied, support ticket #1473013, also emailed dev@parkwhiz.com
- ⏳ StubHub NORAM via Partnerize — "1 Pending request" status, day 5+
- ⏳ viagogo via Partnerize — "1 Pending request" status
- ⏳ CJ Affiliate — Publisher account issue being resolved. Target: Airport Parking Reservations (20% commission, $61.77 EPC) and AboutAirportParking.com (50% revenue share)
- ⏳ SpotHero direct — emailed partner.support@spothero.com

### DECIDED AGAINST:
- ❌ SpotHero via Admitad/Takeads — $0.02 EPC
- ❌ One Stop Parking via Awin — 1.95% conversion

## ParkWhiz API Integration
lib/parkwhiz.ts implements full v4 API. Currently points to sandbox.

**When credentials arrive:**
1. Add PARKWHIZ_CLIENT_ID and PARKWHIZ_CLIENT_SECRET to .env.local AND Vercel env vars
2. Change BASE_URL in lib/parkwhiz.ts from api-sandbox.parkwhiz.com to api.parkwhiz.com

## StubHub API Integration
lib/stubhub.ts fully built and ready. generateStaticParams returns [] when STUBHUB_CLIENT_ID not set.

**When credentials arrive:**
1. Add STUBHUB_CLIENT_ID and STUBHUB_CLIENT_SECRET to Vercel environment variables
2. Trigger one manual Vercel rebuild
3. Event pages auto-generate for all 86 venues
4. Venue pages show upcoming events calendars automatically
5. Nightly rebuild keeps everything fresh

**Note:** stubhub_venue_id fields in venues.json are placeholder IDs — real IDs will come from StubHub API on first authenticated call.

## Venue Intelligence (Mike's Insider Knowledge)
Best markets = urban venues with surrounding private lots.

### CONFIRMED HIGH VOLUME:
- All Detroit venues, Great American Ball Park Cincinnati (Kentucky lots hack), Busch Stadium St. Louis (Kiener East Garage), BOK Center Tulsa, Xcel Energy Center St. Paul (Kellogg Garage), Yankee Stadium, Toyota Center Houston, Oracle Park SF, Amalie Arena Tampa, Scotiabank Arena Toronto, Rogers Arena Vancouver, Mercedes-Benz Stadium Atlanta (best World Cup venue), Lumen Field Seattle, Hollywood Bowl LA, Coors Field Denver, Minor league: Victory Field Indianapolis, The Diamond Richmond VA, Sahlen Field Buffalo, Theater: CIBC Theatre Chicago, Pantages Hollywood, Kennedy Center DC

### SKIP (bad private lot inventory):
- MetLife Stadium, Hard Rock Stadium, Kauffman Stadium, American Family Field, Tropicana Field, Bell Centre Montreal, Highmark Stadium Buffalo, Levi's Stadium SF, SoFi Stadium LA, Lincoln Financial Field Philadelphia

### World Cup 2026 venues in data:
Mercedes-Benz Atlanta, Lumen Field Seattle, Gillette Stadium Boston, BC Place Vancouver, BMO Field Toronto, Soldier Field Chicago

### Olympics 2028 venues in data:
SoFi Stadium, Rose Bowl Pasadena, Crypto.com Arena, Dodger Stadium, Angel Stadium

## Social Media
- Instagram: @gettothegate
- X: @gettothegate
- TikTok: @gettothegate

## Key Contacts
- ParkWhiz: venues@parkwhiz.com (ticket #1473013), dev@parkwhiz.com
- StubHub affiliates: affiliates@stubhub.com
- SpotHero partner: partner.support@spothero.com
- Parking Access affiliate code: FNlRtJgyId
- CJ account: michael@gettothegate.com
- Partnerize account: gettothegate, Publisher ID: 10111429775

## Next Build Priorities
1. Category pages — /parking/mlb/, /parking/nfl/, /parking/world-cup-2026/, /parking/olympics-2028/, /parking/concerts/, /parking/theaters/, /parking/minor-league/
2. City guide pages — /cities/chicago-parking/ etc — authority builders
3. Homepage search box — put search on hero so people can find venue immediately
4. More venues — target 150+ total
5. Event pages manual population — add 10-20 big upcoming events manually before StubHub approval

## Important Technical Notes
- Next.js 15 requires params to be awaited: const { slug } = await params
- trailingSlash: true in next.config.mjs — fixes Google Search Console redirect errors
- allowedDevOrigins: ['192.168.1.178'] in next.config.mjs — fixes mobile testing
- CORS fixes should NOT be attempted
- .env.local must never be committed to GitHub
- Airport slugs format: lax-airport-parking
- stubhub_venue_id values are placeholders — real IDs needed from API
- GitHub Actions nightly rebuild requires VERCEL_DEPLOY_HOOK secret (already set)
- Cloudflare Bot Fight Mode blocks some third-party SEO scanners (expected behavior)
