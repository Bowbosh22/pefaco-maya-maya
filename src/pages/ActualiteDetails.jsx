import { Link, Navigate, useParams } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'
import { PhotoBadge } from './Actualites'

// Page de lecture d'une actualité — route `actualites/:slug`.
export default function ActualiteDetails() {
  const hotel = useHotel()
  const { slug } = useParams()
  const news = hotel.news

  if (!news) return null

  const base = `/${hotel.slug}/actualites`
  const item = news.items.find((n) => n.slug === slug)
  if (!item) return <Navigate to={base} replace />

  const others = news.items.filter((n) => n.slug !== item.slug).slice(0, 3)

  return (
    <main>
      <section
        style={{
          position: 'relative',
          minHeight: '66vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'calc(var(--nav-h) + 40px) clamp(20px,4vw,56px) clamp(40px,6vw,72px)',
          backgroundImage: `linear-gradient(180deg, rgba(29,38,32,0.35) 0%, rgba(29,38,32,0.55) 55%, rgba(29,38,32,0.9) 100%), url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div style={{ maxWidth: 780 }}>
          <Link
            to={base}
            className="t-label"
            style={{ color: 'rgba(248,243,234,0.8)', display: 'inline-block', marginBottom: 18, borderBottom: '1px solid rgba(248,243,234,0.35)', paddingBottom: 2 }}
          >
            ← Toutes les actualités
          </Link>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 12 }}>
            {item.category} · {item.dateLabel}
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(30px,5vw,56px)', color: 'var(--ivory)', lineHeight: 1.1, margin: 0 }}>
            {item.title}
          </h1>
        </div>
        {item.photoIndicative && <PhotoBadge />}
      </section>

      <article style={{ padding: 'clamp(48px,7vw,88px) clamp(20px,4vw,56px)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(19px,2.2vw,23px)', color: 'var(--espresso)', lineHeight: 1.5, marginBottom: 28 }}>
            {item.summary}
          </p>
          <div style={{ height: 1, width: 40, background: 'var(--gold)', marginBottom: 28 }} />
          {item.body.map((p, i) => (
            <p key={i} style={{ fontSize: 15, color: 'var(--soft)', lineHeight: 1.85, marginBottom: 20 }}>
              {p}
            </p>
          ))}
          <div style={{ marginTop: 36 }}>
            <Link to={`/${hotel.slug}/reservation`} className="btn-solid">
              Réserver votre séjour
            </Link>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section style={{ padding: 'clamp(48px,7vw,88px) clamp(20px,4vw,56px)', background: 'var(--sand)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,3.4vw,38px)', color: 'var(--espresso)', marginBottom: 32 }}>
              À lire aussi
            </h2>
            <div className="more-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(20px,3vw,36px)' }}>
              {others.map((n) => (
                <Link key={n.slug} to={`${base}/${n.slug}`} style={{ display: 'block' }}>
                  <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', marginBottom: 14 }}>
                    <img src={n.image} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 6 }}>
                    {n.category}
                  </p>
                  <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 20, color: 'var(--espresso)', lineHeight: 1.25, margin: 0 }}>
                    {n.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 860px) {
          .more-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  )
}
