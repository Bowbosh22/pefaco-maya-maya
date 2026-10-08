import { useHotel } from '../../context/HotelContext'
import RoomSearchBar from '../RoomSearchBar'
import HeroMedia from './HeroMedia'

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
  // Un seul <h1> par page : si le hero porte le texte d'accueil, le nom d'hôtel en dessous passe en <h2>.
  const NameTag = hotel.heroIntro ? 'h2' : 'h1'

  return (
    <section style={{ position: 'relative' }}>
      <div
        className="hexp-image"
        style={{
          position: 'relative',
          // La navbar est désormais pleine (ivoire) dès le haut de page : le hero commence
          // juste en dessous au lieu de passer derrière elle.
          marginTop: 'var(--nav-h)',
          height: 'calc(100svh - var(--nav-h))',
          overflow: 'hidden',
          background: 'var(--espresso)',
        }}
      >
        {/* Photo + (optionnel) boucle de vidéos : hotel.heroVideos dans hotels.js */}
        <HeroMedia image={hotel.heroImage} videos={hotel.heroVideos} alt={hotel.name} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
            background: hotel.heroIntro
              ? 'linear-gradient(180deg, rgba(20,24,20,.42) 0%, rgba(20,24,20,.40) 45%, rgba(20,24,20,.58) 100%)'
              : 'linear-gradient(180deg, rgba(29,38,32,.35) 0%, rgba(29,38,32,0) 24%, rgba(29,38,32,.15) 70%, rgba(29,38,32,.4) 100%)',
          }}
        />

        {/* Texte d'accueil centré sur la photo / vidéo (hotel.heroIntro) */}
        {hotel.heroIntro && (
          <div
            className="hexp-intro"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 clamp(20px,5vw,64px) clamp(96px,12vh,140px)',
              color: 'var(--ivory)',
              textShadow: '0 2px 24px rgba(0,0,0,.35)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(11px,1.2vw,13px)',
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                margin: '0 0 clamp(14px,2vw,22px)',
              }}
            >
              {hotel.heroIntro.eyebrow}
            </p>
            <h1
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(2rem,5.4vw,4.6rem)',
                lineHeight: 1.08,
                maxWidth: 940,
                margin: '0 0 clamp(14px,2vw,24px)',
              }}
            >
              {hotel.heroIntro.title}
            </h1>
            <p style={{ fontSize: 'clamp(13.5px,1.35vw,17px)', lineHeight: 1.6, maxWidth: 760, margin: 0, color: 'rgba(248,243,234,.92)' }}>
              {hotel.heroIntro.text}
            </p>
          </div>
        )}

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
        <NameTag
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem,5vw,3.6rem)',
            color: 'var(--espresso)',
            lineHeight: 1.1,
          }}
        >
          {hotel.name}
        </NameTag>
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
          .hexp-image { height: 66vh !important; min-height: 460px; }
          .hexp-search { padding: 0 12px !important; }
        }
      `}</style>
    </section>
  )
}
