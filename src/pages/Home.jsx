import { useHotel } from '../context/HotelContext'
import ImmersiveArrival from '../components/hero/ImmersiveArrival'
import SpotlightCarousel from '../components/SpotlightCarousel'
import RoomsShowcase from '../components/RoomsShowcase'
import EditorialBlock from '../components/EditorialBlock'
import ExperienceCard from '../components/ExperienceCard'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function Home() {
  const hotel = useHotel()
  const base = `/${hotel.slug}`
  const roomImages = hotel.rooms.map((room) => room.coverImage)
  const cycleImage = (n) => roomImages[n % roomImages.length]

  return (
    <main>
      <ImmersiveArrival />
      <SpotlightCarousel />
      <RoomsShowcase />

      <section
        style={{
          padding: 'clamp(96px,14vw,180px) clamp(20px,4vw,56px) clamp(80px,11vw,140px)',
          maxWidth: 760,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(28px,4vw,48px)',
            lineHeight: 1.25,
            color: 'var(--espresso)',
            whiteSpace: 'pre-line',
          }}
        >
          {hotel.intro}
        </h2>
      </section>

      <EditorialBlock
        id="restaurant"
        reverse
        eyebrow="Restaurant"
        title={hotel.restaurantName}
        text={hotel.restaurantText}
        image={hotel.restaurantImage || cycleImage(0)}
        alt={hotel.restaurantName}
        linkTo={`${base}/restaurant`}
        linkLabel="Découvrir le restaurant"
      />

      <EditorialBlock
        eyebrow="Emplacement"
        title={hotel.locationTitle}
        text={hotel.locationText}
        image={cycleImage(3)}
        alt={`Hôtel Pefaco ${hotel.shortName}`}
        linkTo={`${base}/contact`}
        linkLabel="Voir les coordonnées"
      />

      <section style={{ padding: 'clamp(96px,12vw,160px) clamp(20px,4vw,56px)', background: 'var(--sand)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p className="t-label" style={{ textAlign: 'center', marginBottom: 16 }}>
            L'établissement
          </p>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(28px,3.4vw,44px)',
              textAlign: 'center',
              marginBottom: 64,
              color: 'var(--espresso)',
            }}
          >
            Trois façons d'y séjourner.
          </h2>
          <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {hotel.experiences.map((exp, i) => (
              <ExperienceCard key={exp.title} image={cycleImage(i)} title={exp.title} text={exp.text} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(96px,12vw,160px) clamp(20px,4vw,56px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="stars" style={{ marginBottom: 24 }}>
            ★★★★★
          </div>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(20px,2.4vw,28px)',
              lineHeight: 1.5,
              color: 'var(--espresso)',
              marginBottom: 20,
            }}
          >
            « {hotel.testimonial} »
          </p>
          <p className="t-label">Avis client — exemple</p>
        </div>
      </section>

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .editorial-block { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </main>
  )
}
