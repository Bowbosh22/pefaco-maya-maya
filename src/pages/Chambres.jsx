import { useHotel } from '../context/HotelContext'
import RoomCarouselList from '../components/RoomCarousel'
import RoomSearchBar from '../components/RoomSearchBar'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function Chambres() {
  const hotel = useHotel()
  const hasPreferentialPricing = hotel.rooms.some((room) => room.pricePreferentialLabel)

  return (
    <main>
      <section
        style={{
          padding: 'calc(var(--nav-h) + clamp(48px,7vw,96px)) clamp(20px,4vw,56px) clamp(56px,8vw,88px)',
          background: 'var(--sand)',
        }}
      >
        <p className="eyebrow">
          <span className="t-label">Hébergement</span>
        </p>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(32px,5vw,60px)',
            color: 'var(--espresso)',
            maxWidth: 780,
            lineHeight: 1.1,
          }}
        >
          Chambres & suites
        </h1>
        <p className="t-body" style={{ maxWidth: 560, marginTop: 20 }}>
          {hotel.rooms.length} catégories, du séjour d'une nuit à l'étape prolongée. Toutes climatisées, à {hotel.city}.
        </p>
        {!hotel.officialPhotos && (
          <p style={{ marginTop: 16, fontSize: 12, color: 'var(--terracotta)', maxWidth: 560 }}>
            {hasPreferentialPricing
              ? "Tarifs officiels communiqués par Pefaco. Certaines photos sont à titre indicatif — à confirmer avec l'hôtel avant mise en ligne réelle."
              : "Photos et tarifs provisoires — à confirmer avec l'hôtel avant mise en ligne réelle."}
          </p>
        )}
      </section>

      <section style={{ padding: 'clamp(40px,6vw,64px) clamp(20px,4vw,56px) clamp(56px,8vw,96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <RoomSearchBar />
          <RoomCarouselList rooms={hotel.rooms} />
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
