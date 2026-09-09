import { Link } from 'react-router-dom'
import ImmersiveArrival from '../components/ImmersiveArrival'
import RoomCard from '../components/RoomCard'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import { rooms } from '../data/rooms'

const AMENITIES = [
  { label: 'Piscine extérieure' },
  { label: 'Restaurant & bar' },
  { label: 'Salle de sport' },
  { label: 'Salles de réunion' },
  { label: 'Navette aéroport' },
  { label: 'Wi-Fi haut débit' },
  { label: 'Parking sécurisé' },
  { label: 'Réception 24h/24' },
]

export default function Home() {
  const featured = rooms.slice(0, 3)

  return (
    <main>
      <ImmersiveArrival />

      {/* Intro */}
      <section style={{ padding: 'clamp(72px,10vw,140px) clamp(20px,4vw,56px) clamp(56px,8vw,96px)', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          <span className="t-label">Bienvenue</span>
        </p>
        <h2 style={{
          fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,3.6vw,42px)',
          lineHeight: 1.25, marginBottom: 24, color: 'var(--espresso)',
        }}>
          Un 5 étoiles pensé pour les voyageurs pressés — et pour ceux qui veulent prendre leur temps.
        </h2>
        <p className="t-body" style={{ maxWidth: 640, margin: '0 auto' }}>
          À quelques minutes de l'aéroport international de Maya-Maya, l'hôtel accueille aussi bien
          l'étape d'affaires d'une nuit que le séjour prolongé — avec le même niveau d'attention :
          chambres climatisées, restaurant, piscine, et une équipe habituée aux horaires de vol.
        </p>
      </section>

      {/* Rooms teaser */}
      <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(72px,10vw,120px)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
          <div>
            <p className="t-label" style={{ marginBottom: 14 }}>Hébergement</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,3.4vw,40px)', color: 'var(--espresso)' }}>
              Chambres & suites
            </h2>
          </div>
          <Link to="/chambres" className="btn-outline">Toutes les chambres</Link>
        </div>
        <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {featured.map((r) => <RoomCard key={r.id} room={r} />)}
        </div>
      </section>

      {/* Amenities */}
      <section style={{ padding: 'clamp(72px,10vw,120px) clamp(20px,4vw,56px)', background: 'var(--sand)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p className="eyebrow"><span className="t-label">L'établissement</span></p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,3.4vw,40px)',
            marginBottom: 48, color: 'var(--espresso)', maxWidth: 600,
          }}>
            Tout ce qu'il faut, sans détour.
          </h2>
          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {AMENITIES.map((a) => (
              <div key={a.label} style={{
                padding: '20px 22px', background: 'var(--ivory)', border: '1px solid var(--line)',
                fontSize: 13, fontWeight: 500, color: 'var(--espresso)',
              }}>
                {a.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant */}
      <section id="restaurant" style={{ padding: 'clamp(72px,10vw,120px) clamp(20px,4vw,56px)' }}>
        <div style={{
          display: 'grid', gap: 56, gridTemplateColumns: '1fr 1fr', alignItems: 'center',
          maxWidth: 1200, margin: '0 auto',
        }} className="restaurant-grid">
          <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1722477936580-84aa10762b0b?w=1400&q=80"
              alt="Petit-déjeuner buffet"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <p className="eyebrow"><span className="t-label">Restaurant</span></p>
            <h2 style={{
              fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,3.4vw,40px)',
              marginBottom: 20, color: 'var(--espresso)',
            }}>
              Petit-déjeuner tôt, dîner tard.
            </h2>
            <p className="t-body" style={{ marginBottom: 20 }}>
              Le restaurant de l'hôtel sert un buffet international pensé pour les horaires de vol —
              petit-déjeuner dès l'aube, service continu en journée, et une carte du soir pour les
              clients en étape comme pour les habitués de Brazzaville.
            </p>
          </div>
        </div>
      </section>

      {/* Review */}
      <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(72px,10vw,120px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="stars" style={{ marginBottom: 20, textAlign: 'center' }}>★★★★★</div>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(20px,2.4vw,28px)',
            lineHeight: 1.5, color: 'var(--espresso)', marginBottom: 20,
          }}>
            « Un accueil chaleureux et un emplacement idéal pour ceux qui arrivent ou repartent par
            l'aéroport — exactement ce qu'on attend d'un hôtel d'affaires à Brazzaville. »
          </p>
          <p className="t-label">Avis client — Google</p>
        </div>
      </section>

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .restaurant-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
