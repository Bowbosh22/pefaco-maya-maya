import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

// Carte "aperçu" utilisée sur la page d'accueil (section Chambres & suites).
function RoomShowcaseCard({ hotel, room }) {
  const base = `/${hotel.slug}`
  return (
    <div>
      <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginBottom: 20 }}>
        <img src={room.coverImage} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <p className="t-label" style={{ marginBottom: 10 }}>
        {room.category}
      </p>
      <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 22, marginBottom: 10, color: 'var(--espresso)' }}>
        {room.name}
      </h3>
      <p className="t-body" style={{ marginBottom: 24 }}>
        {room.tagline}
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to={`${base}/chambres/${room.slug}`} className="btn-outline" style={{ padding: '12px 24px' }}>
          Découvrir
        </Link>
        <Link
          to={`${base}/reservation?room=${room.slug}`}
          className="link-underline"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--espresso)',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Réserver →
        </Link>
      </div>
    </div>
  )
}

// Section pleine page (hero + grille) utilisée sur la page d'accueil.
export default function RoomsShowcase() {
  const hotel = useHotel()
  const base = `/${hotel.slug}`

  return (
    <section>
      <div
        style={{
          position: 'relative',
          minHeight: 'clamp(420px,58vw,620px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={hotel.heroImage}
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(29,38,32,0.25) 0%, rgba(29,38,32,0.6) 100%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 24px', maxWidth: 700 }}>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 18, justifyContent: 'center' }}>
            Hébergement
          </p>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(28px,4vw,46px)',
              color: 'var(--ivory)',
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Chambres & suites
          </h2>
          <p style={{ color: 'rgba(248,243,234,0.85)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            {hotel.rooms.length} catégories, du séjour d'une nuit à l'étape prolongée. Toutes climatisées, à {hotel.city}.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`${base}/chambres`} className="btn-gold">
              Voir toutes les chambres
            </Link>
            <Link to={`${base}/reservation`} className="btn-outline-light">
              Réserver
            </Link>
          </div>
        </div>
      </div>

      <div style={{ padding: 'clamp(64px,9vw,120px) clamp(20px,4vw,56px)', background: 'var(--ivory)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {hotel.rooms.map((room) => (
            <RoomShowcaseCard key={room.id} hotel={hotel} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}
