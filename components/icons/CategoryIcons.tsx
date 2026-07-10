// Category icons for the homepage "Wherever You're Headed" section.
// Solid black silhouettes (not thin line icons) -- reads bolder and more
// graphic at small sizes, matching the site's bold Bebas Neue/black-yellow
// brand better than a delicate stroke-based icon set would.
// No icon library dependency -- plain inline SVG.

type IconProps = {
  className?: string
}

export function StadiumIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.48 3 2 5.79 2 9.5S6.48 16 12 16s10-2.79 10-6.5S17.52 3 12 3zm0 11c-4.42 0-8-1.79-8-4.5S7.58 5 12 5s8 1.79 8 4.5-3.58 4.5-8 4.5z" />
      <path d="M7 16h10v5H7z" />
    </svg>
  )
}

export function ArenaIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 21V11C4 6.58 7.58 3 12 3s8 3.58 8 8v10h-4v-7H8v7H4z" />
    </svg>
  )
}

export function ConcertIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 3v10.55A4 4 0 1 0 11 17V7h6V3H9z" />
    </svg>
  )
}

export function AirportIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
  )
}
