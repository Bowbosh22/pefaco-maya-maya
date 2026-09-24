import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useHotel } from '../../context/HotelContext'
import { buildRailTabs } from './railContent'

export default function ImmersiveArrival() {
  const hotel = useHotel()
  const navigate = useNavigate()
  const tabs = buildRailTabs(hotel)
  const [active, setActive] = useState(0)
  const current = tabs[active]

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
  const pillRooms = hotel.rooms.slice(0, 3)

  return (
    <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', background: 'var(--espresso)' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${current.image})`,
          transition: 'opacity 0.5s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(29,38,32,.55) 0%, rgba(29,38,32,.25) 35%, rgba(29,38,32,.55) 78%, rgba(29,38,32,.85) 100%)',
        }}
      />

      <div
        className="hexp-rail"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 20,
          background: 'rgba(248,243,234,.94)',
          backdropFilter: 'blur(6px)',
          borderRadius: '0 10px 10px 0',
          overflow: 'hidden',
          boxShadow: '0 20px 50px -20px rgba(0,0,0,.4)',
        }}
      >
        <div
          className="hexp-rail-label"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--sans)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--soft)',
            padding: '14px 8px',
            borderBottom: '1px solid rgba(29,38,32,.1)',
            textAlign: 'center',
          }}
        >
          Sélectionner une expérience
        </div>
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            type="button"
            aria-label={tab.label}
            onClick={() => setActive(i)}
            className="hexp-btn"
            style={{
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid rgba(29,38,32,.08)',
              position: 'relative',
              background: i === active ? 'var(--espresso)' : 'transparent',
            }}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke={i === active ? 'var(--gold-2)' : 'var(--terracotta-2)'}
              strokeWidth="1.6"
              viewBox="0 0 24 24"
            >
              {tab.icon}
            </svg>
          </button>
        ))}
      </div>

      <div
        className="hexp-inner"
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 'clamp(96px,10vw,140px)',
          paddingRight: 'clamp(24px,4vw,56px)',
          paddingTop: 120,
          paddingBottom: 120,
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 11,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(248,243,234,.75)',
              marginBottom: 20,
            }}
          >
            {current.tag}
          </p>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 300,
              lineHeight: 1.04,
              fontSize: 'clamp(2.4rem,6.2vw,5.2rem)',
              color: 'var(--ivory)',
            }}
          >
            {current.top}
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold-2)' }}>{current.bot}</em>
          </h1>
          <p
            style={{
              color: 'rgba(248,243,234,.7)',
              marginTop: 24,
              maxWidth: 520,
              lineHeight: 1.7,
              fontSize: 'clamp(.95rem,1.6vw,1.05rem)',
            }}
          >
            {current.sub}
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link
              to={`/${hotel.slug}/chambres`}
              className="btn-solid"
              style={{ background: 'var(--ivory)', color: 'var(--espresso)', borderColor: 'var(--ivory)' }}
            >
              Découvrir les chambres
            </Link>
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 32px',
                  border: '1px solid rgba(248,243,234,.5)',
                  fontFamily: 'var(--sans)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--ivory)',
                }}
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="hexp-book-wrap" style={{ position: 'absolute', zIndex: 20, top: 110, right: 'clamp(20px,4vw,56px)' }}>
        <div
          className="hexp-book"
          style={{
            background: 'var(--ivory)',
            borderRadius: 8,
            padding: '20px 22px',
            boxShadow: '0 24px 60px -18px rgba(0,0,0,.5)',
            width: 'min(310px, 86vw)',
          }}
        >
          <p className="t-label" style={{ marginBottom: 12 }}>
            Vérifier la disponibilité
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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
      </div>

      <div
        className="hexp-pills"
        style={{
          position: 'absolute',
          zIndex: 20,
          left: 'clamp(96px,10vw,140px)',
          right: 'clamp(24px,4vw,56px)',
          bottom: 36,
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          gap: 20,
        }}
      >
        {pillRooms.map((room) => (
          <Link
            key={room.slug}
            to={`/${hotel.slug}/chambres/${room.slug}`}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 13,
              color: 'var(--ivory)',
              whiteSpace: 'nowrap',
              paddingRight: 20,
              borderRight: '1px solid rgba(248,243,234,.25)',
            }}
          >
            <span style={{ fontWeight: 600 }}>{room.name}</span> ·{' '}
            <span style={{ color: 'rgba(248,243,234,.6)' }}>
              {room.price}
              {room.priceEstimated ? ' (estimé)' : ''}
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hexp-rail { position: static !important; transform: none !important; flex-direction: row !important; border-radius: 0 !important; width: 100%; overflow-x: auto; box-shadow: none !important; margin-top: var(--nav-h); }
          .hexp-rail-label { display: none; }
          .hexp-btn { flex: 0 0 auto; width: 56px !important; height: 56px !important; border-bottom: 0 !important; border-right: 1px solid rgba(29,38,32,.08); }
          .hexp-inner { padding: 24px 20px 100px !important; }
          .hexp-book-wrap { position: static !important; margin: 20px !important; width: auto !important; }
          .hexp-book { width: 100% !important; }
          .hexp-pills { position: static !important; margin: 0 20px 20px !important; flex-wrap: wrap; }
        }
      `}</style>
    </section>
  )
}
