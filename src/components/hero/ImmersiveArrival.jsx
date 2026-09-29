import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useHotel } from '../../context/HotelContext'

// Hero repensé le 29/09/2026 dans l'esprit de larkhotels.com/california/carmel-by-the-sea/tradewinds :
// une photo épurée (plus de rail d'expériences ni de bandeau prix superposés), la carte
// "Vérifier la disponibilité" existante conservée telle quelle, puis le nom de l'hôtel + le
// tagline + les 2 CTA en dessous, sur fond clair (comme le nom d'hôtel + description chez Lark).
// Ajustement du 29/09 (demande explicite) : la photo couvre tout l'écran (100svh). Le filigrane
// "PEFACO HOTEL ..." en bas de la photo source a été recadré directement dans le fichier image
// (un recadrage objectPosition seul ne suffisait pas à l'exclure de façon fiable sur tous les
// ratios d'écran, notamment mobile portrait, où object-fit: cover ne rogne pas la hauteur).
// La carte de réservation est redevenue un petit médaillon discret dans un coin plutôt qu'un
// grand encart centré à cheval sur la photo.
// Ajustement mobile (29/09, référence : capture DevTools de larkhotels.com en 390px) : sur mobile
// uniquement, la carte détaillée (dates + voyageurs + bouton) est remplacée par une pastille
// compacte façon Lark — libellé + résumé + bouton rond — qui envoie directement vers la page de
// réservation pour le choix précis des dates. Le hero est aussi moins haut sur mobile (moins
// imposant), là où il reste plein écran sur desktop.
function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  )
}

export default function ImmersiveArrival() {
  const hotel = useHotel()
  const navigate = useNavigate()

  const [availability, setAvailability] = useState({ arrival: '', departure: '', guests: '2 adultes' })

  const checkAvailability = () => {
    const params = new URLSearchParams()
    if (availability.arrival) params.set('arrival', availability.arrival)
    if (availability.departure) params.set('departure', availability.departure)
    if (availability.guests) params.set('guests', availability.guests)
    navigate(`/${hotel.slug}/reservation${params.toString() ? `?${params}` : ''}`)
  }

  const whatsappLink = hotel.whatsapp
    ? `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(hotel.whatsappMessage)}`
    : null

  return (
    <section style={{ position: 'relative' }}>
      <div
        className="hexp-image"
        style={{
          position: 'relative',
          height: '100svh',
          overflow: 'hidden',
          background: 'var(--espresso)',
        }}
      >
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(29,38,32,.35) 0%, rgba(29,38,32,0) 24%, rgba(29,38,32,.15) 70%, rgba(29,38,32,.4) 100%)',
          }}
        />

        <div
          className="hexp-book"
          style={{
            position: 'absolute',
            zIndex: 20,
            left: 'clamp(16px,3vw,40px)',
            bottom: 'clamp(20px,4vw,40px)',
            background: 'rgba(248,243,234,.92)',
            backdropFilter: 'blur(4px)',
            borderRadius: 8,
            padding: '16px 18px',
            boxShadow: '0 18px 44px -18px rgba(0,0,0,.5)',
            width: 'min(260px, 78vw)',
          }}
        >
          <p className="t-label" style={{ marginBottom: 10, fontSize: 9 }}>
            Vérifier la disponibilité
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="t-label" style={{ display: 'block', fontSize: 9 }}>
                Arrivée
              </label>
              <input
                type="date"
                value={availability.arrival}
                onChange={(e) => setAvailability((a) => ({ ...a, arrival: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 0,
                  borderBottom: '1px solid rgba(29,38,32,.15)',
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  color: 'var(--espresso)',
                  padding: '6px 0',
                  marginTop: 2,
                }}
              />
            </div>
            <div>
              <label className="t-label" style={{ display: 'block', fontSize: 9 }}>
                Départ
              </label>
              <input
                type="date"
                value={availability.departure}
                onChange={(e) => setAvailability((a) => ({ ...a, departure: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 0,
                  borderBottom: '1px solid rgba(29,38,32,.15)',
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  color: 'var(--espresso)',
                  padding: '6px 0',
                  marginTop: 2,
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <label className="t-label" style={{ display: 'block', fontSize: 9 }}>
              Voyageurs
            </label>
            <select
              value={availability.guests}
              onChange={(e) => setAvailability((a) => ({ ...a, guests: e.target.value }))}
              style={{
                width: '100%',
                background: 'transparent',
                border: 0,
                borderBottom: '1px solid rgba(29,38,32,.15)',
                fontFamily: 'var(--sans)',
                fontSize: 13,
                color: 'var(--espresso)',
                padding: '6px 0',
                marginTop: 2,
                appearance: 'none',
              }}
            >
              <option>1 adulte</option>
              <option>2 adultes</option>
              <option>2 adultes, 1 enfant</option>
              <option>Groupe (5+)</option>
            </select>
          </div>
          <button type="button" onClick={checkAvailability} className="btn-solid" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }}>
            Vérifier la disponibilité
          </button>
        </div>

        <div
          className="hexp-pill"
          style={{
            position: 'absolute',
            zIndex: 20,
            left: 16,
            right: 16,
            bottom: 'clamp(16px,4vw,28px)',
            display: 'none',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(248,243,234,.95)',
            backdropFilter: 'blur(4px)',
            borderRadius: 999,
            boxShadow: '0 14px 36px -14px rgba(0,0,0,.5)',
            padding: '8px 8px 8px 20px',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--espresso)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Planifier votre séjour
            </p>
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                color: 'var(--soft)',
                marginTop: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Dates &bull; {availability.guests}
            </p>
          </div>
          <button
            type="button"
            aria-label="Vérifier la disponibilité"
            onClick={checkAvailability}
            style={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: '50%',
              background: 'var(--espresso)',
              color: 'var(--ivory)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconSearch />
          </button>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          maxWidth: 640,
          margin: '0 auto',
          padding: 'clamp(56px,8vw,88px) clamp(20px,4vw,32px) clamp(64px,8vw,96px)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem,5vw,3.6rem)',
            color: 'var(--espresso)',
            lineHeight: 1.1,
          }}
        >
          {hotel.name}
        </h1>
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--terracotta)',
            marginTop: 14,
          }}
        >
          {hotel.heroTagline}
        </p>

        <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link to={`/${hotel.slug}/chambres`} className="btn-solid">
            Découvrir les chambres
          </Link>
          {whatsappLink && (
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
              WhatsApp
            </a>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hexp-image { height: 62vh !important; min-height: 380px; }
          .hexp-book { display: none !important; }
          .hexp-pill { display: flex !important; }
        }
      `}</style>
    </section>
  )
}
