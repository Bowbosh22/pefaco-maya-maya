import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// NOTE — pas de vidéo réelle de l'hôtel disponible pour l'instant. Cette section
// reprend la STRUCTURE narrative des démos vidéo (Maison Verte / Beyond the Address :
// scroll qui pilote la progression, chapitres qui s'enchaînent, grands titres serif,
// barre de progression, navigation latérale) mais l'anime avec des photos fixes —
// fondu enchaîné + léger effet Ken Burns (zoom lent) au lieu d'une vidéo qui défile.
// Dès qu'un tournage existe pour cet hôtel, les images peuvent être remplacées par
// une vraie vidéo sans changer la structure de la page.

const CHAPTERS = [
  {
    id: 'arrival',
    navLabel: null,
    image: 'https://images.unsplash.com/photo-1784411641863-d163d776ed55?w=1800&q=80',
    content: { type: 'split', tag: 'I — ARRIVÉE', top: 'À DEUX MINUTES', bot: "DE L'AÉROPORT", italic: true, pos: 'bottom-left' },
  },
  {
    id: 'chambres',
    navLabel: '01 CHAMBRES',
    image: '/assets/chambre-lit.jpg',
    content: {
      type: 'split-details', tag: 'II — CHAMBRES', top: 'LE CALME', bot: 'APRÈS LA PISTE',
      details: ['Climatisation', 'Literie soignée', 'Vue dégagée'], pos: 'top-left',
    },
  },
  {
    id: 'restaurant',
    navLabel: '02 RESTAURANT',
    image: 'https://images.unsplash.com/photo-1722477936580-84aa10762b0b?w=1800&q=80',
    content: {
      type: 'right-tags', tag: 'III — RESTAURANT', top: 'PETIT-DÉJEUNER', bot: 'TÔT, DÎNER TARD',
      sub: 'Buffet international, service continu.', tags: ['BUFFET', 'CARTE DU SOIR'], pos: 'right',
    },
  },
  {
    id: 'detente',
    navLabel: '03 DÉTENTE',
    image: 'https://images.unsplash.com/photo-1776763255480-014a64ee137d?w=1800&q=80',
    content: {
      type: 'split-sub', tag: 'IV — DÉTENTE', top: 'UNE PAUSE', bot: 'ENTRE DEUX VOLS',
      sub: 'Piscine extérieure et bar.', pos: 'bottom-right',
    },
  },
  {
    id: 'final',
    navLabel: null,
    image: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=1800&q=80',
    content: {
      type: 'cta', tag: 'V — RÉSERVATION', top: 'VOTRE CHAMBRE', bot: 'VOUS ATTEND', pos: 'center',
    },
  },
]

function pos(p) {
  const base = { position: 'absolute', padding: 'clamp(24px, 5vw, 72px)', maxWidth: 'min(640px, 90vw)' }
  if (p === 'center') return { ...base, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', maxWidth: '100%' }
  if (p === 'bottom-left') return { ...base, bottom: 0, left: 0 }
  if (p === 'bottom-right') return { ...base, bottom: 0, right: 0, textAlign: 'right' }
  if (p === 'top-left') return { ...base, top: 'calc(var(--nav-h) + 20px)', left: 0 }
  if (p === 'right') return { ...base, top: '50%', right: 0, transform: 'translateY(-50%)', textAlign: 'right' }
  return base
}

const TIT = {
  fontFamily: 'var(--serif)', fontSize: 'clamp(38px, 7vw, 96px)', fontWeight: 300,
  lineHeight: 0.92, letterSpacing: '-0.01em', margin: 0,
  textShadow: '0 2px 30px rgba(0,0,0,0.55)',
}
const TAG = {
  fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.26em',
  textTransform: 'uppercase', color: 'var(--gold-2)', marginBottom: 16,
  textShadow: '0 1px 8px rgba(0,0,0,0.7)',
}

function ChapterText({ chapter, isActive }) {
  const c = chapter.content
  const wrapStyle = { ...pos(c.pos), opacity: isActive ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: isActive ? 'auto' : 'none' }

  if (c.type === 'split') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <p style={{ ...TIT, color: 'var(--ivory)' }}>{c.top}</p>
      <p style={{ ...TIT, color: c.italic ? 'var(--gold-2)' : 'var(--ivory)', fontStyle: c.italic ? 'italic' : 'normal' }}>{c.bot}</p>
    </div>
  )
  if (c.type === 'split-details') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(16px, 3vw, 44px)', flexWrap: 'wrap' }}>
        <div>
          <p style={{ ...TIT, color: 'var(--ivory)' }}>{c.top}</p>
          <p style={{ ...TIT, color: 'var(--gold-2)' }}>{c.bot}</p>
        </div>
        <div style={{ paddingBottom: 8 }}>
          {c.details.map((d) => <p key={d} style={{ ...TAG, marginBottom: 10 }}>{d}</p>)}
        </div>
      </div>
    </div>
  )
  if (c.type === 'right-tags') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <p style={{ ...TIT, color: 'var(--ivory)' }}>{c.top}</p>
      <p style={{ ...TIT, color: 'var(--gold-2)' }}>{c.bot}</p>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(15px, 1.6vw, 20px)', fontStyle: 'italic', color: 'var(--gold-2)', marginTop: 14, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>{c.sub}</p>
      <div style={{ display: 'flex', gap: 18, marginTop: 18, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {c.tags.map((t) => <span key={t} style={{ ...TAG, marginBottom: 0 }}>{t}</span>)}
      </div>
    </div>
  )
  if (c.type === 'split-sub') return (
    <div style={wrapStyle}>
      <p style={{ ...TIT, color: 'var(--ivory)' }}>{c.top}</p>
      <p style={{ ...TIT, color: 'var(--gold-2)', fontStyle: 'italic' }}>{c.bot}</p>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(15px, 1.6vw, 20px)', fontStyle: 'italic', color: 'var(--gold-2)', marginTop: 14, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>{c.sub}</p>
      <p style={{ ...TAG, marginTop: 10, marginBottom: 0 }}>{c.tag}</p>
    </div>
  )
  if (c.type === 'cta') return (
    <div style={wrapStyle}>
      <p style={{ ...TAG, marginBottom: 24 }}>{c.tag}</p>
      <p style={{ ...TIT, color: 'var(--ivory)' }}>{c.top}</p>
      <p style={{ ...TIT, color: 'var(--gold-2)', fontStyle: 'italic' }}>{c.bot}</p>
      <div style={{ marginTop: 36 }}>
        <Link to="/chambres" className="btn-solid btn-gold">Découvrir les chambres →</Link>
      </div>
    </div>
  )
  return null
}

function ChapterNav({ chapters, currentId }) {
  const navChapters = chapters.filter((c) => c.navLabel)
  if (navChapters.length === 0) return null
  return (
    <div style={{
      position: 'absolute', top: '50%', right: 'clamp(16px,3vw,40px)', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end',
    }}>
      {navChapters.map((c) => (
        <span key={c.id} style={{
          fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
          color: c.id === currentId ? 'var(--ivory)' : 'rgba(248,243,234,0.35)',
          transition: 'color 0.4s ease', textShadow: '0 1px 6px rgba(0,0,0,0.6)',
        }}>
          {c.navLabel}
        </span>
      ))}
    </div>
  )
}

export default function ImmersiveArrival() {
  const wrapRef = useRef(null)
  const frameRefs = useRef([])
  const barRef = useRef(null)
  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const N = CHAPTERS.length

    const update = () => {
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.max(0, Math.min(total, -rect.top))
      const p = total > 0 ? scrolled / total : 0

      const raw = p * N
      const idx = Math.min(N - 1, Math.floor(raw))
      const localP = raw - idx // 0 → 1 progress within the active chapter

      frameRefs.current.forEach((el, i) => {
        if (!el) return
        const active = i === idx
        el.style.opacity = active ? '1' : '0'
        // Léger effet Ken Burns : zoom lent piloté par le scroll, pas par le temps
        const scale = active ? 1 + localP * 0.07 : 1
        el.style.transform = `scale(${scale})`
      })

      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      setCurrentIdx((cur) => (cur === idx ? cur : idx))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const current = CHAPTERS[currentIdx]

  return (
    <div ref={wrapRef} style={{ height: `${CHAPTERS.length * 190}vh` }} aria-label="Présentation immersive de l'hôtel">
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--espresso)' }}>

        {CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => (frameRefs.current[i] = el)}
            style={{
              position: 'absolute', inset: 0, opacity: i === 0 ? 1 : 0,
              backgroundImage: `url(${c.image})`, backgroundSize: 'cover', backgroundPosition: 'center',
              transform: 'scale(1)', transformOrigin: 'center center', willChange: 'transform, opacity',
            }}
          />
        ))}

        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(36,28,21,0.25) 0%, rgba(36,28,21,0.15) 40%, rgba(36,28,21,0.65) 100%)',
        }} />

        <div style={{ position: 'absolute', top: 'calc(var(--nav-h) + 24px)', left: 'clamp(20px,4vw,56px)' }}>
          <span className="stars">★★★★★</span>
        </div>

        <div style={{ position: 'absolute', inset: 0 }}>
          {CHAPTERS.map((c, i) => (
            <ChapterText key={c.id} chapter={c} isActive={i === currentIdx} />
          ))}
        </div>

        <ChapterNav chapters={CHAPTERS} currentId={current.id} />

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(248,243,234,0.12)' }}>
          <div ref={barRef} style={{ height: '100%', background: 'var(--gold)', transformOrigin: 'left', transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}