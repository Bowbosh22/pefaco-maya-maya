import { Link, Navigate, useParams } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import { findRoomBySlug } from '../data/hotels'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function ChambreDetails() {
  const { slug } = useParams()
  const hotel = useHotel()
  const room = findRoomBySlug(hotel, slug)

  if (!room) return <Navigate to={`/${hotel.slug}/chambres`} replace />

  const otherRooms = hotel.rooms.filter((r) => r.slug !== room.slug).slice(0, 3)

  return (
    <main>
      <section style={{ position: 'relative', height: '70vh', minHeight: 420, overflow: 'hidden', background: 'var(--espresso)' }}>
        <img src={room.images[0]} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(29,38,32,0.1) 0%, rgba(29,38,32,0.65) 100%)' }} />
        <div style={{ position: 'absolute', left: 'clamp(20px,4vw,56px)', bottom: 40, color: 'var(--ivory)' }}>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 12 }}>
            {room.category}
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px,5vw,60px)' }}>{room.name}</h1>
        </div>
        {room.photoIndicative && (
          <div
            style={{
              position: 'absolute',
              right: 'clamp(20px,4vw,56px)',
              bottom: 40,
              background: 'rgba(29,38,32,0.75)',
              color: 'var(--ivory)',
              padding: '7px 16px',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Photo à titre indicatif
          </div>
        )}
      </section>

      <section
        className="details-grid"
        style={{
          padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)',
          display: 'grid',
          gap: 56,
          gridTemplateColumns: '1.4fr 1fr',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div>
          <p className="t-serif-sm" style={{ color: 'var(--terracotta)', marginBottom: 20 }}>
            {room.tagline}
          </p>
          <p className="t-body" style={{ marginBottom: 32, fontSize: 16 }}>
            {room.description}
          </p>
          <p className="t-label" style={{ marginBottom: 16 }}>
            Équipements
          </p>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {room.features.map((feature) => (
              <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--espresso)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                {feature}
              </div>
            ))}
          </div>
          {room.images.length > 1 && (
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 40 }}>
              {room.images.slice(1).map((image, i) => (
                <div key={image} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={image} alt={`${room.name} ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside style={{ background: 'var(--sand)', padding: 32, alignSelf: 'start', position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
          <p className="t-label" style={{ marginBottom: 10 }}>
            Tarif indicatif
          </p>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 28, marginBottom: 4, color: 'var(--espresso)' }}>{room.price}</p>
          {room.priceUnit && (
            <p className="t-body" style={{ marginBottom: room.priceEstimated || room.pricePreferentialLabel ? 4 : 24 }}>
              {room.priceUnit}
            </p>
          )}
          {room.priceEstimated && (
            <p style={{ fontSize: 11, color: 'var(--soft)', marginBottom: 24 }}>Tarif estimé, à confirmer avec Pefaco</p>
          )}
          {room.pricePreferentialLabel && (
            <p style={{ fontSize: 13, color: 'var(--terracotta)', marginBottom: 24 }}>
              Tarif préférentiel : {room.pricePreferentialLabel}
            </p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, fontSize: 14, color: 'var(--soft)' }}>
            <span>{room.surface ? `${room.surface} m² · jusqu'à ${room.guests} personnes` : 'Surface et capacité à confirmer'}</span>
            {room.bed && <span>{room.bed}</span>}
          </div>
          <Link to={`/${hotel.slug}/reservation?room=${room.slug}`} className="btn-solid" style={{ width: '100%', justifyContent: 'center' }}>
            Réserver cette chambre
          </Link>
        </aside>
      </section>

      {otherRooms.length > 0 && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(72px,10vw,120px)' }}>
          <p className="t-label" style={{ marginBottom: 20 }}>
            Autres chambres
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {otherRooms.map((r) => (
              <Link
                key={r.id}
                to={`/${hotel.slug}/chambres/${r.slug}`}
                className="link-underline"
                style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--espresso)' }}
              >
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
