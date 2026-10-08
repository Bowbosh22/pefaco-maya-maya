import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

// Page « Actualités » (demande du 08/10/2026) — articles et événements de l'hôtel.
// Propre aux hôtels ayant un champ `news` (voir Navbar.jsx et hotels.js).
// Pour publier : ajouter un objet dans `news.items` de hotels.js (le plus récent en premier).

export function PhotoBadge() {
  return (
    <span
      style={{
        position: 'absolute',
        left: 10,
        bottom: 10,
        background: 'rgba(29,38,32,0.75)',
        color: 'var(--ivory)',
        fontSize: 9,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 600,
        padding: '5px 9px',
      }}
    >
      Photo à titre indicatif
    </span>
  )
}

export default function Actualites() {
  const hotel = useHotel()
  const news = hotel.news
  const [filter, setFilter] = useState('Tout')

  if (!news) return null

  const base = `/${hotel.slug}/actualites`
  const featured = news.items.find((n) => n.featured) || news.items[0]
  const rest = news.items.filter((n) => n.slug !== featured.slug)
  const visible = filter === 'Tout' ? rest : rest.filter((n) => n.category === filter)
  const chips = ['Tout', ...news.categories]

  return (
    <main>
      {/* Hero : article à la une */}
      <section
        style={{
          position: 'relative',
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'calc(var(--nav-h) + 40px) clamp(20px,4vw,56px) clamp(48px,7vw,88px)',
          backgroundImage: `linear-gradient(180deg, rgba(29,38,32,0.35) 0%, rgba(29,38,32,0.55) 55%, rgba(29,38,32,0.92) 100%), url(${featured.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            <span className="t-label" style={{ color: 'var(--ivory)' }}>
              Actualités · À la une
            </span>
          </p>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(34px,6vw,64px)',
              color: 'var(--ivory)',
              lineHeight: 1.08,
              marginBottom: 18,
            }}
          >
            {featured.title}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(248,243,234,0.82)', lineHeight: 1.7, maxWidth: 560, margin: '0 0 28px' }}>
            {featured.summary}
          </p>
          <Link to={`${base}/${featured.slug}`} className="btn-outline" style={{ color: 'var(--ivory)', borderColor: 'rgba(248,243,234,0.6)' }}>
            Lire l'article
          </Link>
        </div>
      </section>

      {/* Filtres + cartes */}
      <section style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 10 }}>
            La vie de l'hôtel
          </p>
          <h2
            style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(28px,4vw,44px)', color: 'var(--espresso)', marginBottom: 28 }}
          >
            Articles &amp; événements
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }} role="tablist" aria-label="Catégories">
            {chips.map((c) => {
              const active = c === filter
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c)}
                  style={{
                    padding: '9px 18px',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    border: '1px solid var(--line)',
                    background: active ? 'var(--espresso)' : 'transparent',
                    color: active ? 'var(--ivory)' : 'var(--espresso)',
                    cursor: 'pointer',
                    transition: 'background 0.25s ease, color 0.25s ease',
                  }}
                >
                  {c}
                </button>
              )
            })}
          </div>

          {visible.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--soft)' }}>Aucune actualité dans cette catégorie pour le moment.</p>
          ) : (
            <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px,3vw,40px)' }}>
              {visible.map((n) => (
                <Link key={n.slug} to={`${base}/${n.slug}`} className="news-card" style={{ display: 'block' }}>
                  <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', marginBottom: 18 }}>
                    <img
                      src={n.image}
                      alt={n.title}
                      className="news-card-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {n.photoIndicative && <PhotoBadge />}
                  </div>
                  <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 8 }}>
                    {n.category} · {n.dateLabel}
                  </p>
                  <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(20px,2vw,24px)', color: 'var(--espresso)', lineHeight: 1.25, marginBottom: 10 }}>
                    {n.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--soft)', lineHeight: 1.7, margin: 0 }}>{n.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Agenda — rendez-vous réguliers */}
      <section style={{ padding: 'clamp(64px,9vw,110px) clamp(20px,4vw,56px)', background: 'var(--espresso)', color: 'var(--ivory)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 10 }}>
            Chaque semaine
          </p>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(30px,4.2vw,48px)', marginBottom: 44 }}>
            L'agenda de l'hôtel
          </h2>
          <div className="agenda-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {news.agenda.map((a, i) => (
              <div
                key={`${a.day}-${a.label}`}
                style={{ padding: '0 clamp(14px,2vw,28px)', borderLeft: i === 0 ? 'none' : '1px solid rgba(248,243,234,0.15)' }}
              >
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px,3vw,34px)', margin: '0 0 6px' }}>{a.day}</p>
                <p style={{ fontSize: 13, color: 'var(--gold-2)', fontWeight: 600, marginBottom: 14 }}>{a.time}</p>
                <p style={{ fontSize: 13.5, color: 'rgba(248,243,234,0.78)', lineHeight: 1.6, margin: 0 }}>{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .news-card-img { transition: transform 0.8s var(--ease); }
        .news-card:hover .news-card-img { transform: scale(1.04); }
        @media (max-width: 960px) {
          .news-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .agenda-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 36px; }
          .agenda-grid > div:nth-child(odd) { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 600px) {
          .news-grid { grid-template-columns: 1fr !important; }
          .agenda-grid { grid-template-columns: 1fr !important; }
          .agenda-grid > div { border-left: none !important; padding: 0 !important; }
        }
      `}</style>

      <Footer />
    </main>
  )
}
