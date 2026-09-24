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

      <Footer />
    </main>
  )
}
