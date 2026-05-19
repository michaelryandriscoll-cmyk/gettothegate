import { readFileSync } from 'fs';

const venues = JSON.parse(readFileSync('./data/venues.json', 'utf8'));
const API_KEY = 'DSUW9hb2lCG0BA6SDFkpkDoj91Jc5Rqr';

for (const venue of venues) {
  const url = `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${API_KEY}&keyword=${encodeURIComponent(venue.name)}&countryCode=US`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const items = data._embedded?.venues || [];
    const match = items.find(v => v.upcomingEvents?._total > 0) || items[0];
    
    if (match) {
      console.log(`${venue.slug} → ${match.id} (${match.name}, ${match.upcomingEvents?._total || 0} events)`);
    } else {
      console.log(`${venue.slug} → NOT FOUND`);
    }
    
    await new Promise(r => setTimeout(r, 200));
  } catch (e) {
    console.log(`${venue.slug} → ERROR: ${e.message}`);
  }
}
