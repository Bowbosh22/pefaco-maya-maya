import Footer from '../components/Footer'
import { useHotel } from '../context/HotelContext'

// Page « héritage / à propos » — texte officiel « À propos de nous » de la
// plaquette commerciale Pefaco (reçue le 28/09/2026), repris tel quel plutôt
// que reformulé. Photos (façade + galerie façade/entrée/lobby)
// mises à jour le 29/09/2026 avec de vraies photos de l'hôtel, sélectionnées
// par Mr. Mbemba depuis la fiche Expedia officielle de l'hôtel (remplacent
// une première version extraite de la plaquette PDF). Page propre à
// Maya-Maya : n'apparaît que si l'hôtel a un champ `heritageText` (voir
// Navbar.jsx).
export default function Heritage() {
  const hotel = useHotel()

  return (
    <main>
      <section
        style={{
          padding: 'calc(var(--nav-h) + clamp(48px,7vw,96px)) clamp(20px,4vw,56px) clamp(40px,6vw,64px)',
          background: 'var(--sand)',
        }}
      >
        <p className="eyebrow">
          <span className="t-label">Notre histoire</span>
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
          {hotel.heritageTitle || `L'Héritage ${hotel.shortName}`}
        </h1>
      </section>

      <section
        className="heritage-grid"
        style={{
          padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)',
          display: 'grid',
          gap: 56,
          gridTemplateColumns: '1.1fr 0.9fr',
          maxWidth: 1100,
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        <div>
          <p className="t-body" style={{ fontSize: 17, lineHeight: 1.85, whiteSpace: 'pre-line' }}>
            {hotel.heritageText}
          </p>
        </div>
        {hotel.heritageImage && (
          <div style={{ aspectRatio: '2/3', overflow: 'hidden' }}>
            <img
              src={hotel.heritageImage}
              alt={hotel.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
      </section>

      {hotel.heritageGallery && hotel.heritageGallery.length > 0 && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(56px,8vw,96px)' }}>
          <div
            className="heritage-gallery"
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: `repeat(${hotel.heritageGallery.length}, 1fr)`,
              gap: 20,
            }}
          >
            {hotel.heritageGallery.map((img, i) => (
              <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={img} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .heritage-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .heritage-gallery { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
