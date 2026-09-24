import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

export default function Footer() {
  const hotel = useHotel()
  const base = `/${hotel.slug}`

  return (
    <footer
      style={{
        background: 'var(--espresso-2)',
        color: 'rgba(248,243,234,0.75)',
        padding: 'clamp(48px,6vw,72px) clamp(20px,4vw,56px) 32px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: 40,
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          paddingBottom: 40,
          borderBottom: '1px solid rgba(248,243,234,0.12)',
          marginBottom: 24,
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ivory)', marginBottom: 12 }}>
            Pefaco <span style={{ fontStyle: 'italic', color: 'var(--gold-2)' }}>{hotel.shortName}</span>
          </p>
          <p className="t-body" style={{ color: 'rgba(248,243,234,0.6)', fontSize: 13 }}>
            Hôtel 5 étoiles — {hotel.city}.
          </p>
        </div>

        <div>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 16 }}>
            Navigation
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to={base} style={{ fontSize: 13 }}>
              Accueil
            </Link>
            <Link to={`${base}/chambres`} style={{ fontSize: 13 }}>
              Chambres & Suites
            </Link>
            <Link to={`${base}/restaurant`} style={{ fontSize: 13 }}>
              Restaurant
            </Link>
            <Link to={`${base}/contact`} style={{ fontSize: 13 }}>
              Contact
            </Link>
            <Link to="/" style={{ fontSize: 13, color: 'rgba(248,243,234,0.5)' }}>
              Changer d'hôtel
            </Link>
          </div>
        </div>

        <div>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 16 }}>
            Contact
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            {hotel.phoneHref ? (
              <a href={hotel.phoneHref}>{hotel.phone}</a>
            ) : (
              <span>Téléphone à confirmer</span>
            )}
            <span>{hotel.address}</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: 'rgba(248,243,234,0.4)', textAlign: 'center' }}>
        © {new Date().getFullYear()} Pefaco Hotel {hotel.shortName} — Site de démonstration réalisé par l'Atelier KPM.
      </p>
    </footer>
  )
}
