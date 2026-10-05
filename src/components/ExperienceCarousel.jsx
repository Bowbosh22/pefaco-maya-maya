import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

// Carrousel "une carte à la fois" pour la section "L'établissement" de l'accueil, inspiré de
// la présentation oneandonlyresorts.com (grande image centrale + aperçus partiels de part et
// d'autre, légende dessous, barre de défilement + flèches en bas). Remplace l'ancienne grille à
// 3 cartes (demande du 05/10/2026).
const CHEVRON_LEFT = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 6l-6 6 6 6" />
  </svg>
)
const CHEVRON_RIGHT = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export default function ExperienceCarousel() {
  const hotel = useHotel()
  const base = `/${hotel.slug}`
  const items = hotel.experiences
  const roomImages = hotel.rooms.map((room) => room.coverImage)
  const cycleImage = (n) => roomImages[((n % roomImages.length) + roomImages.length) % roomImages.length]
  const [active, setActive] = useState(0)

  const count = items.length
  const prevIndex = (active - 1 + count) % count
  const nextIndex = (active + 1) % count
  const current = items[active]
  const currentLink = current.link ? `${base}${current.link}` : null

  const goPrev = () => setActive(prevIndex)
  const goNext = () => setActive(nextIndex)

  return (
    <div className="exp-carousel">
      <div className="exp-track">
        <button type="button" className="exp-peek exp-peek-prev" onClick={goPrev} aria-label="Expérience précédente">
          <img src={cycleImage(prevIndex)} alt="" aria-hidden="true" />
        </button>

        <div className="exp-main">
          {currentLink ? (
            <Link to={currentLink} aria-label={`Découvrir : ${current.title}`}>
              <img src={cycleImage(active)} alt={current.title} />
            </Link>
          ) : (
            <img src={cycleImage(active)} alt={current.title} />
          )}
        </div>

        <button type="button" className="exp-peek exp-peek-next" onClick={goNext} aria-label="Expérience suivante">
          <img src={cycleImage(nextIndex)} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="exp-caption">
        <h3>{current.title}</h3>
        <p className="t-body" style={{ marginBottom: currentLink ? 18 : 0 }}>
          {current.text}
        </p>
        {currentLink && (
          <Link
            to={currentLink}
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
            {current.linkLabel || 'Découvrir'} →
          </Link>
        )}
      </div>

      <div className="exp-nav">
        <button type="button" className="exp-arrow" onClick={goPrev} aria-label="Expérience précédente">
          {CHEVRON_LEFT}
        </button>
        <div className="exp-progress">
          <div className="exp-progress-thumb" style={{ width: `${100 / count}%`, transform: `translateX(${active * 100}%)` }} />
        </div>
        <button type="button" className="exp-arrow" onClick={goNext} aria-label="Expérience suivante">
          {CHEVRON_RIGHT}
        </button>
      </div>

      <style>{`
        /* Proportions fixes (indépendantes de la largeur de la fenêtre) : la carte centrale garde
           un ratio 16/9 façon oneandonlyresorts.com — plus large que haute — et les aperçus
           latéraux s'étirent automatiquement à la même hauteur (align-items: stretch). */
        .exp-track {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: clamp(10px, 1.6vw, 22px);
        }
        .exp-main { flex: 4 1 0; max-width: 900px; aspect-ratio: 16 / 9; overflow: hidden; }
        .exp-main a { display: block; width: 100%; height: 100%; }
        .exp-main img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
        .exp-main a:hover img { transform: scale(1.03); }
        .exp-peek {
          flex: 1 1 0; max-width: 230px;
          padding: 0; border: 0; cursor: pointer; overflow: hidden;
          opacity: 0.55; transition: opacity 0.25s ease;
        }
        .exp-peek:hover { opacity: 0.85; }
        .exp-peek img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .exp-caption { max-width: 640px; margin: clamp(28px,4vw,40px) auto 0; text-align: center; }
        .exp-caption h3 {
          font-family: var(--serif); font-weight: 400; font-size: clamp(22px,2.6vw,30px);
          color: var(--espresso); margin: 0 0 14px;
        }
        .exp-caption p { margin: 0; }

        .exp-nav { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: clamp(28px,4vw,40px); }
        .exp-arrow {
          display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 0;
          background: none; color: var(--espresso); cursor: pointer; flex-shrink: 0;
        }
        .exp-progress { position: relative; width: clamp(160px, 20vw, 280px); height: 2px; background: var(--line); overflow: hidden; }
        .exp-progress-thumb { position: absolute; inset: 0; background: var(--espresso); transition: transform 0.35s var(--ease); }

        @media (max-width: 760px) {
          .exp-peek { flex: 0 0 24px; max-width: 24px; }
          .exp-main { max-width: none; }
        }
      `}</style>
    </div>
  )
}
