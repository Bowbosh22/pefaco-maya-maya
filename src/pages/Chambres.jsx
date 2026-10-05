import { useHotel } from '../context/HotelContext'
import RoomSearchBar from '../components/RoomSearchBar'
import SignatureRoom from '../components/SignatureRoom'
import OtherRoomCard from '../components/OtherRoomCard'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

// Page Chambres redessinée le 01/10/2026 (demande explicite, référence : belmond.com/en/hotels/
// europe/italy/splendido-mare-portofino/accommodation pour les 4 chambres "signature", et
// belmond.com/.../la-samanna-st-martin pour la grille des autres catégories). Les 4 chambres les
// plus représentatives de l'hôtel (Chambre standard Maya-Maya, Master Suite, Deluxe Suite,
// Panoramic Suite) sont identifiées par leur slug dans `SIGNATURE_SLUGS` ci-dessous ; les 5 autres
// catégories suivent dans une grille à 3 colonnes avec carrousel. La barre de recherche (QUAND /
// VOYAGEURS) reste juste sous le hero, comme sur l'ancienne version de cette page — à ne pas
// retirer (demande explicite de Mr. Mbemba).
const SIGNATURE_SLUGS = ['standard-maya-maya', 'master-suite', 'suite-luxe', 'suite-panoramique']

export default function Chambres() {
  const hotel = useHotel()
  const hasPreferentialPricing = hotel.rooms.some((room) => room.pricePreferentialLabel)

  const signatureRooms = SIGNATURE_SLUGS.map((slug) => hotel.rooms.find((r) => r.slug === slug)).filter(Boolean)
  const otherRooms = hotel.rooms.filter((r) => !SIGNATURE_SLUGS.includes(r.slug))

  // Si l'hôtel n'a pas (ou pas assez) de chambres reconnues dans SIGNATURE_SLUGS (cas de l'hôtel
  // Oyo, dont les chambres portent d'autres noms), on retombe sur l'ancienne présentation simple
  // plutôt que d'afficher une page à moitié vide.
  const useSignatureLayout = signatureRooms.length >= 2

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

      <section style={{ padding: 'clamp(32px,5vw,48px) clamp(20px,4vw,56px) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <RoomSearchBar />
        </div>
      </section>

      {useSignatureLayout ? (
        <>
          <div className="section-intro">
            <p className="t-label" style={{ color: 'var(--terracotta)' }}>
              Nos chambres signature
            </p>
            <p className="lead">
              Offrez-vous une étape d'exception au cœur de {hotel.city}, dans l'hôtel qui incarne depuis toujours l'art de
              recevoir à la congolaise. Nos chambres et suites signature marient l'architecture moderne et les
              décorations culturelles qui font la réputation du {hotel.shortName}, pour un séjour à la hauteur de chaque
              occasion.
            </p>
          </div>

          {signatureRooms.map((room, i) => (
            <SignatureRoom key={room.id} room={room} reversed={i % 2 === 1} />
          ))}

          {otherRooms.length > 0 && (
            <>
              <div className="section-title">
                <p className="t-label" style={{ color: 'var(--terracotta)' }}>
                  Et aussi
                </p>
                <h2>Les autres catégories</h2>
              </div>
              <section className="others">
                <div className="others-grid">
                  {otherRooms.map((room) => (
                    <OtherRoomCard key={room.id} room={room} />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        <section style={{ padding: 'clamp(16px,3vw,24px) clamp(20px,4vw,56px) clamp(56px,8vw,96px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="others-grid others-grid-3">
              {hotel.rooms.map((room) => (
                <OtherRoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />

      <style>{`
        .section-intro { max-width: 1100px; margin: 0 auto; padding: clamp(40px,6vw,56px) clamp(20px,4vw,56px) 8px; }
        .section-intro p.lead {
          font-family: var(--serif); font-weight: 400; font-style: italic;
          font-size: clamp(18px,2vw,22px); color: var(--espresso); line-height: 1.6;
          max-width: 1020px; margin: 14px 0 0;
        }
        .section-title { max-width: 1100px; margin: 0 auto; padding: clamp(40px,6vw,56px) clamp(20px,4vw,56px) 8px; }
        .section-title h2 {
          font-family: var(--serif); font-weight: 400; font-size: clamp(24px,3vw,34px); color: var(--espresso); margin: 10px 0 0;
        }

        /* Bloc chambre signature, façon belmond.com/.../accommodation (voir SignatureRoom.jsx). */
        .feat-room { padding: clamp(40px,6vw,64px) clamp(14px,2.2vw,28px); border-bottom: 1px solid var(--line); }
        .ph { position: relative; overflow: hidden; background: var(--sand); }
        .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .belmond-grid { display: flex; gap: 10px; height: clamp(380px, 52vw, 660px); }
        .bg-main { flex: 0 0 60%; }
        .bg-side { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .bg-top { flex: 1; }
        .bg-bottom-row { flex: 1; display: flex; gap: 10px; }
        .bg-bottom { flex: 0 0 66%; }
        .bg-gap { flex: 1; }

        .feat-info { max-width: 640px; margin: 32px auto 0; text-align: center; padding: 0 24px; }
        .feat-info h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(24px,3vw,34px); color: var(--espresso); margin: 6px 0 6px; }
        .feat-info .tagline { font-family: var(--serif); font-style: italic; color: var(--terracotta); margin: 0 0 14px; font-size: 15px; }
        .feat-info .desc { font-size: 14.5px; color: var(--soft); line-height: 1.8; margin: 0 0 16px; }
        .feat-info .price { font-size: 14px; font-weight: 700; color: var(--terracotta); margin: 0; font-family: var(--sans); }
        .feat-info .pref { font-size: 11.5px; color: var(--soft); margin: 4px 0 18px; }
        .feat-info .cta-row { display: flex; gap: 12px; justify-content: center; }

        /* Grille "Et aussi", façon la grille de réservation la-samanna-st-martin. */
        .others { max-width: 1100px; margin: 0 auto; padding: 16px 24px clamp(56px,8vw,96px); }
        .others-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 28px; }
        .other-card .other-info { padding-top: 16px; }
        .other-card h3 { font-family: var(--serif); font-weight: 400; font-size: 19px; color: var(--espresso); margin: 6px 0 6px; }
        .other-card .size-sleeps { font-size: 11.5px; color: var(--soft); margin: 0 0 8px; }
        .other-card .price2 { font-size: 12.5px; font-weight: 700; color: var(--terracotta); margin: 0 0 4px; font-family: var(--sans); }
        .other-card .pref2 { font-size: 10.5px; color: var(--soft); margin: 0 0 14px; }
        .other-card .cta-row { display: flex; gap: 10px; }
        .btn-outline.small, .btn-solid.small { padding: 10px 16px; font-size: 9px; }

        @media (max-width: 860px) {
          .belmond-grid { flex-direction: column !important; height: auto; }
          .bg-main { flex: none; aspect-ratio: 4/3; }
          .bg-side { flex-direction: row; height: 160px; }
          .bg-bottom-row { flex: 1; }
          .others-grid { grid-template-columns: 1fr 1fr !important; gap: 24px 18px; }
        }
        @media (max-width: 600px) {
          .others-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
