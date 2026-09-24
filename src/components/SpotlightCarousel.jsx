import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

function buildSpotlightItems(hotel) {
  const base = `/${hotel.slug}`
  const roomImage = (n) => hotel.rooms[n % hotel.rooms.length].coverImage
  return [
    {
      label: 'Restaurant',
      title: hotel.restaurantName,
      text: hotel.restaurantText,
      image: hotel.restaurantImage || roomImage(0),
      linkTo: `${base}/restaurant`,
    },
    {
      label: 'Détente',
      title: 'Une pause, sur place',
      text: hotel.amenitiesText,
      image: hotel.detenteImage || roomImage(3),
    },
    {
      label: 'Réunions & groupes',
      title: 'Vos équipes bien reçues',
      text: hotel.meetingsText,
      image: roomImage(hotel.rooms.length - 1),
      linkTo: `${base}/contact`,
    },
  ]
}

function SpotlightCard({ item }) {
  const content = (
    <>
      <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginBottom: 20 }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <p className="t-label" style={{ marginBottom: 10 }}>
        {item.label}
      </p>
      <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 22, marginBottom: 12, color: 'var(--espresso)' }}>
        {item.title}
      </h3>
      <p className="t-body" style={{ marginBottom: item.linkTo ? 18 : 0 }}>
        {item.text}
      </p>
      {item.linkTo && (
        <span
          className="link-underline"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--espresso)',
            display: 'inline-block',
          }}
        >
          Découvrir →
        </span>
      )}
    </>
  )
  const style = { flex: '0 0 clamp(260px, 30vw, 380px)', scrollSnapAlign: 'start' }

  return item.linkTo ? (
    <Link to={item.linkTo} style={style}>
      {content}
    </Link>
  ) : (
    <div style={style}>{content}</div>
  )
}

export default function SpotlightCarousel() {
  const hotel = useHotel()
  const items = buildSpotlightItems(hotel)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const goTo = (index) => {
    const track = trackRef.current
    if (!track) return
    const target = track.children[index]
    if (target) track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' })
    setActive(index)
  }

  const next = () => goTo(Math.min(active + 1, items.length - 1))

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    let closest = 0
    let minDistance = Infinity
    Array.from(track.children).forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - track.offsetLeft - track.scrollLeft)
      if (distance < minDistance) {
        minDistance = distance
        closest = i
      }
    })
    setActive(closest)
  }

  return (
    <section style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,4vw,56px)', background: 'var(--ivory)' }}>
      <div
        className="spotlight-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: 'clamp(32px,5vw,72px)',
          maxWidth: 1400,
          margin: '0 auto',
          alignItems: 'start',
        }}
      >
        <div>
          <p className="t-label" style={{ marginBottom: 16 }}>
            À la une
          </p>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(28px,3vw,38px)',
              lineHeight: 1.2,
              color: 'var(--espresso)',
              marginBottom: 20,
            }}
          >
            En ce moment
          </h2>
          <p className="t-body">
            Restaurant, détente, réunions — un aperçu de ce qui vous attend sur place, à Pefaco {hotel.shortName}.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="spotlight-track"
            style={{ display: 'flex', gap: 28, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 8 }}
          >
            {items.map((item) => (
              <SpotlightCard key={item.label} item={item} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 24 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => goTo(i)}
                  aria-label={`Aller à l'élément ${i + 1}`}
                  style={{
                    width: i === active ? 22 : 8,
                    height: 3,
                    borderRadius: 2,
                    background: i === active ? 'var(--gold)' : 'var(--line)',
                    transition: 'all 0.3s var(--ease)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
            {active < items.length - 1 && (
              <button
                onClick={next}
                aria-label="Suivant"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--line)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--espresso)" strokeWidth="2">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .spotlight-track::-webkit-scrollbar { height: 0; }
        @media (max-width: 860px) {
          .spotlight-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
