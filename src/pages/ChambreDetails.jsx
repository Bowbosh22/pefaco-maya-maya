import { useParams, Link, Navigate } from 'react-router-dom'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import { getRoomBySlug, rooms } from '../data/rooms'

export default function ChambreDetails() {
  const { slug } = useParams()
  const room = getRoomBySlug(slug)

  if (!room) return <Navigate to="/chambres" replace />

  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3)

  return (
    <main>
      <section style={{ position: 'relative', height: '70vh', minHeight: 420, overflow: 'hidden', background: 'var(--espresso)' }}>
        <img
          src={room.images[0]}
          alt={room.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(36,28,21,0.1) 0%, rgba(36,28,21,0.65) 100%)',
        }} />
        <div style={{ position: 'absolute', left: 'clamp(20px,4vw,56px)', bottom: 40, color: 'var(--ivory)' }}>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 12 }}>{room.category}</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px,5vw,60px)' }}>{room.name}</h1>
        </div>
      </section>

      <section style={{
        padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)',
        display: 'grid', gap: 56, gridTemplateColumns: '1.4fr 1fr', maxWidth: 1200, margin: '0 auto',
      }} className="details-grid">
        <div>
          <p className="t-serif-sm" style={{ color: 'var(--terracotta)', marginBottom: 20 }}>{room.tagline}</p>
          <p className="t-body" style={{ marginBottom: 32, fontSize: 16 }}>{room.description}</p>

          <p className="t-label" style={{ marginBottom: 16 }}>Équipements</p>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {room.features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--espresso)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>

          {room.images.length > 1 && (
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 40 }}>
              {room.images.slice(1).map((img, i) => (
                <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={img} alt={`${room.name} ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside style={{ background: 'var(--sand)', padding: 32, alignSelf: 'start', position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
          <p className="t-label" style={{ marginBottom: 10 }}>Tarif indicatif</p>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 28, marginBottom: 4, color: 'var(--espresso)' }}>{room.price}</p>
          {room.priceUnit && <p className="t-body" style={{ marginBottom: 24 }}>{room.priceUnit}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, fontSize: 14, color: 'var(--soft)' }}>
            <span>{room.surface} m² · jusqu'à {room.guests} personnes</span>
            <span>{room.bed}</span>
          </div>
          <a href="tel:+242056048030" className="btn-solid" style={{ width: '100%', justifyContent: 'center' }}>Réserver par téléphone</a>
        </aside>
      </section>

      {others.length > 0 && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(72px,10vw,120px)' }}>
          <p className="t-label" style={{ marginBottom: 20 }}>Autres chambres</p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {others.map((r) => (
              <Link key={r.id} to={`/chambres/${r.slug}`} className="link-underline" style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--espresso)' }}>
                {r.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
