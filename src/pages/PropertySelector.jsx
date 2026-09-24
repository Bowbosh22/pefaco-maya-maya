import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hotels, selectorTheme as t, DOOR_NAVIGATE_DELAY_MS } from '../data/hotels'
import DoorPanel from '../components/DoorPanel'

export default function PropertySelector() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)
  const [reveal, setReveal] = useState(null)

  const choose = (hotel, side) => {
    if (reveal) return
    setReveal({ hotel, side })
    window.setTimeout(() => navigate(`/${hotel.slug}`), DOOR_NAVIGATE_DELAY_MS)
  }

  return (
    <main
      style={{
        minHeight: '100svh',
        background: t.bg,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <header
        style={{
          padding: 'clamp(32px,5.5vw,56px) clamp(20px,4vw,56px) 0',
          textAlign: 'center',
          opacity: reveal ? 0 : 1,
          transition: 'opacity 0.6s ease',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: `1px solid ${t.gold}`,
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.gold }} />
          </span>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 17, color: t.ivory, letterSpacing: '0.02em' }}>
            Pefaco
          </span>
        </div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: t.goldSoft,
            marginBottom: 18,
          }}
        >
          République du Congo
        </p>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: t.ivory,
            fontSize: 'clamp(26px,4vw,44px)',
            lineHeight: 1.35,
            maxWidth: 640,
            margin: '0 auto',
          }}
        >
          Où souhaitez-vous poser vos valises ?
        </h1>
      </header>

      {reveal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1, overflow: 'hidden' }}>
          <img
            src={reveal.hotel.heroImage}
            alt={reveal.hotel.name}
            className="reveal-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(18,24,15,0.2) 0%, rgba(18,24,15,0.72) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: t.ivory,
              opacity: 0,
              animation: 'fadeInReveal 0.7s ease 0.4s forwards',
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: t.goldSoft,
                marginBottom: 16,
              }}
            >
              {reveal.hotel.city}
            </p>
            <h2 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px,4.5vw,48px)' }}>
              {reveal.hotel.name}
            </h2>
          </div>
        </div>
      )}

      <div
        className={reveal ? 'doors-stage opening' : 'doors-stage'}
        style={{ flex: 1, position: 'relative', zIndex: 2, margin: 'clamp(32px,5.5vw,60px) clamp(20px,4vw,56px)' }}
      >
        <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 1, perspective: 2400 }}>
          {hotels.map((hotel, i) => {
            const side = i === 0 ? 'left' : 'right'
            return (
              <DoorPanel
                key={hotel.slug}
                hotel={hotel}
                side={side}
                isOpening={reveal?.hotel.slug === hotel.slug}
                isFadingOut={!!reveal && reveal.hotel.slug !== hotel.slug}
                isHovered={hovered === hotel.slug}
                disabled={!!reveal}
                onChoose={choose}
                onHoverStart={setHovered}
                onHoverEnd={() => setHovered(null)}
              />
            )
          })}
        </div>
      </div>

      <footer
        style={{
          textAlign: 'center',
          padding: '0 20px clamp(28px,5vw,48px)',
          position: 'relative',
          zIndex: 3,
          opacity: reveal ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        <p style={{ fontSize: 11, color: 'rgba(245,240,230,0.4)', fontWeight: 300, letterSpacing: '0.02em' }}>
          Site de démonstration réalisé par l'Atelier KPM — contenu et visuels à confirmer avec Pefaco.
        </p>
      </footer>

      <style>{`
        .door-panel:hover:not(:disabled) .door-image { filter: saturate(0.9) sepia(0.06) brightness(1.06); }
        .doors-stage { transition: transform 1.6s cubic-bezier(.22,.61,.36,1); transform: scale(1); }
        .doors-stage.opening { transform: scale(1.05); }
        .reveal-image {
          animation: cameraPush 1.6s cubic-bezier(.22,.61,.36,1) forwards;
          filter: saturate(0.85) sepia(0.06) blur(3px) brightness(0.82);
        }
        @keyframes cameraPush {
          from { transform: scale(1); filter: saturate(0.85) sepia(0.06) blur(3px) brightness(0.82); }
          to { transform: scale(1.26); filter: saturate(0.9) sepia(0.04) blur(0) brightness(1); }
        }
        @keyframes fadeInReveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
