import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

// Page « Restaurant » — section des établissements redessinée le 05/10/2026 (demande explicite,
// captures d'écran de oneandonlyresorts.com/dining à l'appui) : un grand bloc photo + texte par
// restaurant, alterné gauche/droite comme leur section "Garden-to-Plate Dining" (ex. Atria / Le
// jardin du chef / Botanique) — label du type de cuisine, nom en grand serif, description, puis un
// bouton bordé "En savoir plus" menant au contact (pas de page dédiée par restaurant sur ce site).
// Le bar reste en clôture plein cadre, dans l'esprit de leur expérience phare mise en avant en fin
// de page. Les 4 photos générales du restaurant (maya-maya-restaurant-1 à 4) ont été réparties une
// par établissement (Bistro Parisien, Bochelli, Moringa, Essengo Bar) à la demande de Mr. Mbemba, à
// titre indicatif tant que l'hôtel n'a pas transmis de photo propre à chaque salle.
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

      {/* Un grand bloc photo + texte par restaurant, alterné gauche/droite, façon la section
          "Garden-to-Plate Dining" de oneandonlyresorts.com/dining. */}
      {restaurants.map((r, i) => {
        const textFirst = i % 2 === 0
        return (
          <section key={r.name} style={{ padding: 'clamp(40px,6vw,64px) clamp(20px,4vw,56px)' }}>
            <div
              className="dine-row"
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1fr 1.1fr',
                gap: 'clamp(32px,5vw,64px)',
                alignItems: 'center',
              }}
            >
              <div className="dine-text" style={{ order: textFirst ? 1 : 2 }}>
                <p className="t-label" style={{ color: 'var(--terracotta)', marginBottom: 14 }}>
                  {r.cuisine}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--serif)',
                    fontWeight: 400,
                    fontSize: 'clamp(28px,3.6vw,46px)',
                    color: 'var(--espresso)',
                    marginBottom: 18,
                    lineHeight: 1.15,
                  }}
                >
                  {r.name}
                </h2>
                <p style={{ fontSize: 15, color: 'var(--soft)', lineHeight: 1.8, maxWidth: 440, margin: '0 0 28px' }}>{r.description}</p>
                <Link to={`/${hotel.slug}/contact`} className="dine-cta">
                  En savoir plus
                </Link>
              </div>
              <div className="dine-image" style={{ order: textFirst ? 2 : 1, position: 'relative', aspectRatio: '6 / 5', overflow: 'hidden' }}>
                {r.image && <img src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                {r.photoIndicative && <PhotoBadge />}
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
        /* Bouton bordé "En savoir plus", sans la casse majuscule/l'espacement serré des CTA
           habituels du site — pour coller au style des boutons observés sur
           oneandonlyresorts.com/dining (texte en casse normale, lettrage détendu). */
        .dine-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 15px 30px;
          border: 1px solid var(--espresso);
          font-family: var(--sans);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--espresso);
          transition: background 0.3s ease, color 0.3s ease;
        }
        .dine-cta:hover {
          background: var(--espresso);
          color: var(--ivory);
        }
        @media (max-width: 760px) {
          .dine-row { grid-template-columns: 1fr !important; }
          .dine-row .dine-text,
          .dine-row .dine-image { order: initial !important; }
          .dine-row .dine-image { order: 1 !important; margin-bottom: 28px; }
          .dine-row .dine-text { order: 2 !important; }
        }
      `}</style>
    </main>
  )
}
