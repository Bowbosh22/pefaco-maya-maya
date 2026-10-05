import { useHotel } from '../../context/HotelContext'
import RoomSearchBar from '../RoomSearchBar'

// Hero repensé le 29/09/2026 dans l'esprit de larkhotels.com/california/carmel-by-the-sea/tradewinds :
// une photo épurée (plus de rail d'expériences ni de bandeau prix superposés), la carte
// "Vérifier la disponibilité" existante conservée telle quelle, puis le nom de l'hôtel + le
// tagline + les 2 CTA en dessous, sur fond clair (comme le nom d'hôtel + description chez Lark).
// Ajustement du 29/09 (demande explicite) : la photo couvre tout l'écran (100svh). Le filigrane
// "PEFACO HOTEL ..." en bas de la photo source a été recadré directement dans le fichier image
// (un recadrage objectPosition seul ne suffisait pas à l'exclure de façon fiable sur tous les
// ratios d'écran, notamment mobile portrait, où object-fit: cover ne rogne pas la hauteur).
// Mise à jour du 30/09/2026 (demande explicite) : la carte "Vérifier la disponibilité" maison
// (desktop) et la pastille mobile qui l'accompagnait ont été remplacées par le composant
// <RoomSearchBar />, la barre "QUAND / VOYAGEURS" façon larkhotels.com déjà utilisée en haut de
// la page Chambres. Un seul composant, déjà responsive (la valeur des puces se tronque et les
// popovers se recentrent en plein écran sous 720px), couvre donc desktop et mobile — plus besoin
// de deux widgets distincts. Posée en position absolute, centrée en bas de la photo ; son
// comportement "sticky" interne (IntersectionObserver + position fixed) continue de fonctionner
// une fois qu'on scrolle sous le hero, comme sur la page Chambres.
export default function ImmersiveArrival() {
  const hotel = useHotel()

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
          className="hexp-search"
          style={{
            position: 'absolute',
            zIndex: 20,
            left: 0,
            right: 0,
            bottom: 'clamp(20px,4vw,40px)',
            display: 'flex',
            justifyContent: 'center',
            padding: '0 clamp(16px,3vw,40px)',
          }}
        >
          <RoomSearchBar />
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          maxWidth: 640,
          margin: '0 auto',
          padding: 'clamp(56px,8vw,88px) clamp(20px,4vw,32px)',
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
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hexp-image { height: 62vh !important; min-height: 420px; }
          .hexp-search { padding: 0 12px !important; }
        }
      `}</style>
    </section>
  )
}
