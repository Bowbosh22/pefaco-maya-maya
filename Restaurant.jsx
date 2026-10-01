import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

// Page « Restaurant » redessinée le 01/10/2026 (demande explicite) dans l'esprit éditorial de
// aman.com/resorts/amanjena/dining : un chapeau de présentation, puis un grand bloc photo + texte
// par restaurant (alternés gauche/droite), et un établissement — le bar — en clôture plein cadre,
// plutôt qu'une simple grille de texte à 3 colonnes. Les 4 photos générales du restaurant
// (maya-maya-restaurant-1 à 4) ont été réparties une par établissement (Bistro Parisien, Bochelli,
// Moringa, Essengo Bar) à la demande de Mr. Mbemba, à titre indicatif tant que l'hôtel n'a pas
// transmis de photo propre à chaque salle.
function PhotoBadge() {
  return (
    <span
      style={{
        position: 'absolute',
        bottom: 14,
        left: 14,
        background: 'rgba(29,38,32,0.75)',
        color: 'var(--ivory)',
        padding: '5px 12px',
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      Photo à titre indicatif
    </span>
  )
}

export default function Restaurant() {
  const hotel = useHotel()
  const fallbackImage = hotel.rooms[0]?.coverImage
  const heroImage = hotel.heroImage || hotel.restaurantImage || fallbackImage
  const restaurants = hotel.restaurantsDetail || []

  return (
    <main>
      <section style={{ position: 'relative', height: '60vh', minHeight: 380, overflow: 'hidden', background: 'var(--espresso)' }}>
        <img src={heroImage} alt={hotel.restaurantName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(29,38,32,0.15) 0%, rgba(29,38,32,0.65) 100%)' }} />
        <div style={{ position: 'absolute', left: 'clamp(20px,4vw,56px)', bottom: 40, color: 'var(--ivory)', maxWidth: 640 }}>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 12 }}>
            Restaurant
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px,5vw,58px)' }}>{hotel.restaurantName}</h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px) clamp(40px,6vw,64px)', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <p className="t-body" style={{ fontSize: 17, lineHeight: 1.8 }}>
          {hotel.restaurantText}
        </p>
        <div style={{ marginTop: 32 }}>
          <Link to={`/${hotel.slug}/contact`} className="btn-outline">
            Nous contacter
          </Link>
        </div>
      </section>

      {/* Un bloc alterné photo + texte par restaurant, façon amanjena.com/dining. */}
      {restaurants.map((r, i) => {
        const reversed = i % 2 === 1
        return (
          <section key={r.name} style={{ padding: 'clamp(40px,6vw,64px) clamp(20px,4vw,56px)' }}>
            <div
              className="rest-row"
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                gap: 'clamp(32px,5vw,64px)',
                alignItems: 'center',
                direction: reversed ? 'rtl' : 'ltr',
              }}
            >
              <div style={{ direction: 'ltr', position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                {r.image && <img src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                {r.photoIndicative && <PhotoBadge />}
              </div>
              <div style={{ direction: 'ltr' }}>
                <p className="t-label" style={{ color: 'var(--terracotta)', marginBottom: 14 }}>
                  {r.cuisine}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--serif)',
                    fontWeight: 400,
                    fontSize: 'clamp(26px,3.2vw,38px)',
                    color: 'var(--espresso)',
                    marginBottom: 16,
                  }}
                >
                  {r.name}
                </h2>
                <div style={{ height: 1, width: 40, background: 'var(--gold)', marginBottom: 16 }} />
                <p style={{ fontSize: 14.5, color: 'var(--soft)', lineHeight: 1.8, maxWidth: 460, margin: 0 }}>{r.description}</p>
              </div>
            </div>
          </section>
        )
      })}

      {/* Le bar, en clôture plein cadre — comme les expériences de fin de page chez Aman. */}
      {hotel.barDetail && (
        <section
          style={{
            position: 'relative',
            minHeight: '56vh',
            display: 'flex',
            alignItems: 'center',
            padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)',
            marginTop: 'clamp(24px,4vw,40px)',
            backgroundImage: hotel.barDetail.image
              ? `linear-gradient(90deg, rgba(29,38,32,0.88) 0%, rgba(29,38,32,0.55) 55%, rgba(29,38,32,0.25) 100%), url(${hotel.barDetail.image})`
              : undefined,
            backgroundColor: hotel.barDetail.image ? undefined : 'var(--espresso)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 12 }}>
              {hotel.barDetail.tagline}
            </p>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(34px,4.5vw,54px)',
                color: 'var(--ivory)',
                marginBottom: 20,
                lineHeight: 1,
              }}
            >
              {hotel.barDetail.name}
            </h2>
            <p style={{ fontSize: 14.5, color: 'rgba(248,243,234,0.85)', lineHeight: 1.8, margin: 0 }}>{hotel.barDetail.description}</p>
            {hotel.barDetail.photoIndicative && (
              <p style={{ fontSize: 10, color: 'rgba(248,243,234,0.55)', marginTop: 18, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Photo à titre indicatif
              </p>
            )}
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .rest-row { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </main>
  )
}
