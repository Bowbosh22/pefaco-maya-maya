import { useState } from 'react'
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
  const items = hotel.experiences
  const roomImages = hotel.rooms.map((room) => room.coverImage)
  const cycleImage = (n) => roomImages[((n % roomImages.length) + roomImages.length) % roomImages.length]
  const [active, setActive] = useState(0)

  const count = items.length
  const prevIndex = (active - 1 + count) % count
  const nextIndex = (active + 1) % count
  const current = items[active]

  const goPrev = () => setActive(prevIndex)
  const goNext = () => setActive(nextIndex)

  return (
    <div className="exp-carousel">
      <div className="exp-track">
        <button type="button" className="exp-peek exp-peek-prev" onClick={goPrev} aria-label="Expérience précédente">
          <img src={cycleImage(prevIndex)} alt="" aria-hidden="true" />
        </button>

        <div className="exp-main">
          <img src={cycleImage(active)} alt={current.title} />
        </div>

        <button type="button" className="exp-peek exp-peek-next" onClick={goNext} aria-label="Expérience suivante">
          <img src={cycleImage(nextIndex)} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="exp-caption">
        <h3>{current.title}</h3>
        <p className="t-body">{current.text}</p>
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
        .exp-track {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: clamp(10px, 1.6vw, 22px);
          height: clamp(320px, 40vw, 580px);
        }
        .exp-main { flex: 0 1 820px; overflow: hidden; }
        .exp-main img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .exp-peek {
          flex: 0 0 clamp(70px, 13vw, 220px);
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
          .exp-peek { flex: 0 0 28px; }
        }
      `}</style>
    </div>
  )
}
