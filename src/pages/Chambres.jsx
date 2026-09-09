import RoomCard from '../components/RoomCard'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import { rooms } from '../data/rooms'

export default function Chambres() {
  return (
    <main>
      <section style={{
        padding: 'calc(var(--nav-h) + clamp(48px,7vw,96px)) clamp(20px,4vw,56px) clamp(56px,8vw,88px)',
        background: 'var(--sand)',
      }}>
        <p className="eyebrow"><span className="t-label">Hébergement</span></p>
        <h1 style={{
          fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px,5vw,60px)',
          color: 'var(--espresso)', maxWidth: 780, lineHeight: 1.1,
        }}>
          Chambres & suites
        </h1>
        <p className="t-body" style={{ maxWidth: 560, marginTop: 20 }}>
          Quatre catégories, du séjour d'une nuit à l'étape prolongée. Toutes climatisées,
          toutes à quelques minutes de l'aéroport international de Maya-Maya.
        </p>
      </section>

      <section style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)' }}>
        <div style={{ display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {rooms.map((r) => <RoomCard key={r.id} room={r} />)}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
