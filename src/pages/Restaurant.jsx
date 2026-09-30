import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

export default function Restaurant() {
  const hotel = useHotel()
  const fallbackImage = hotel.rooms[0]?.coverImage
  const heroImage = hotel.restaurantImage || fallbackImage
  const gallery = hotel.restaurantGallery && hotel.restaurantGallery.length > 0 ? hotel.restaurantGallery : [heroImage]

  return (
    <main>
      <section style={{ position: 'relative', height: '60vh', minHeight: 380, overflow: 'hidden', background: 'var(--espresso)' }}>
        <img src={heroImage} alt={hotel.restaurantName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(29,38,32,0.15) 0%, rgba(29,38,32,0.65) 100%)' }} />
        <div style={{ position: 'absolute', left: 'clamp(20px,4vw,56px)', bottom: 40, color: 'var(--ivory)', maxWidth: 640 }}>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 12 }}>
            Restaurant
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px,5vw,58px)' }}>{hotel.restaurantName}</h1>
        </div>
      </section>

      <section style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <p className="t-body" style={{ fontSize: 17, lineHeight: 1.8 }}>
          {hotel.restaurantText}
        </p>
        <div style={{ marginTop: 32 }}>
          <Link to={`/${hotel.slug}/contact`} className="btn-outline">
            Nous contacter
          </Link>
        </div>
      </section>

      {gallery.length > 1 && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(72px,10vw,120px)' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {gallery.map((image, i) => (
              <div key={image} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={image} alt={`${hotel.restaurantName} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {hotel.restaurantsDetail && hotel.restaurantsDetail.length > 0 && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(72px,10vw,120px)', background: 'var(--sand)', paddingTop: 'clamp(56px,8vw,96px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="t-label" style={{ marginBottom: 32, textAlign: 'center' }}>
              Nos adresses
            </p>
            <div className="restaurants-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
              {hotel.restaurantsDetail.map((r) => (
                <div key={r.name}>
                  <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 22, color: 'var(--espresso)', marginBottom: 6 }}>
                    {r.name}
                  </h3>
                  <p className="t-label" style={{ color: 'var(--terracotta)', marginBottom: 12 }}>
                    {r.cuisine}
                  </p>
                  <p style={{ fontSize: 13.5, color: 'var(--soft)', lineHeight: 1.75, margin: 0 }}>{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hotel.barDetail && (
        <section style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <p className="t-label" style={{ marginBottom: 10 }}>
              {hotel.barDetail.tagline}
            </p>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,3.2vw,36px)', color: 'var(--espresso)', marginBottom: 16 }}>
              {hotel.barDetail.name}
            </h2>
            <p style={{ fontSize: 14.5, color: 'var(--soft)', lineHeight: 1.8 }}>{hotel.barDetail.description}</p>
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .restaurants-grid { grid-template-columns: 1fr !important; row-gap: 32px !important; }
        }
      `}</style>
    </main>
  )
}
