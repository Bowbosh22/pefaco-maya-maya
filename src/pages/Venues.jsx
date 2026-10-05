import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

const cellStyle = {
  padding: '16px 20px',
  fontSize: 13,
  color: 'var(--espresso)',
  borderBottom: '1px solid var(--line)',
}

const headCellStyle = {
  ...cellStyle,
  fontFamily: 'var(--serif)',
  fontSize: 14,
  fontWeight: 400,
  color: 'var(--soft)',
  borderBottom: '1px solid var(--espresso)',
  whiteSpace: 'nowrap',
}

// Page « Salles & Événements » — grille tarifaire officielle de la plaquette
// Pefaco (28/09/2026), reprise telle quelle. Page propre à Maya-Maya :
// n'apparaît que si l'hôtel a un champ `venues` (voir Navbar.jsx). Les photos
// de salles de la plaquette étaient fondues en transparence sous le tableau
// de prix (choix de mise en page du document), donc inutilisables telles
// quelles — comblé le 29/09/2026 par une galerie (`venuesGallery`) de vraies
// photos de salles de réception/conférence, sélectionnées par Mr. Mbemba
// depuis la fiche Expedia officielle de l'hôtel.
export default function Venues() {
  const hotel = useHotel()
  const venues = hotel.venues || []
  const heroPhoto = hotel.venuesHeroImage || hotel.venuesGallery?.[0] || hotel.heroImage
  // La grille tarifaire reste masquée tant qu'on n'a pas cliqué sur "Découvrir"
  // (demande du 05/10/2026), bouton placé juste au-dessus des deux photos.
  const [showGrid, setShowGrid] = useState(false)
  const gridRef = useRef(null)

  const handleDiscover = () => {
    setShowGrid(true)
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <main>
      {/* En-tête redessiné le 05/10/2026 (demande explicite, inspirée de
          oneandonlyresorts.com/events) : un grand titre centré suivi d'une phrase, sur fond clair,
          puis une grande photo pleine largeur — plutôt que le bandeau sable aligné à gauche
          utilisé jusqu'ici. */}
      <section
        style={{
          padding: 'calc(var(--nav-h) + clamp(48px,7vw,88px)) clamp(20px,4vw,56px) clamp(40px,6vw,56px)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(34px,5.6vw,64px)',
            color: 'var(--espresso)',
            maxWidth: 820,
            lineHeight: 1.15,
            margin: '0 auto 20px',
          }}
        >
          Célébrez à Pefaco Hotel <span style={{ whiteSpace: 'nowrap' }}>{hotel.shortName}</span>
        </h1>
        <p className="t-body" style={{ maxWidth: 580, margin: '0 auto', fontSize: 16 }}>
          Neuf espaces modulables à Brazzaville, des réunions d'affaires aux mariages de 1 000 invités, avec une équipe dédiée à chaque détail.
        </p>
      </section>

      {/* Photo sous le titre, avec marge de chaque côté (demande du 05/10/2026, après retour :
          la version bord à bord collait trop aux bords de page) et format panoramique court
          (appliqué aussi à la page Héritage pour rester cohérent entre les deux). */}
      {heroPhoto && (
        <section style={{ padding: '0 clamp(16px,2.5vw,40px) clamp(40px,6vw,56px)' }}>
          <div style={{ maxWidth: 1600, margin: '0 auto', aspectRatio: '21 / 10', overflow: 'hidden' }}>
            <img
              src={heroPhoto}
              alt={`${hotel.name} — événements`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </section>
      )}

      {hotel.venuesIntro && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(40px,6vw,56px)' }}>
          <p className="t-body" style={{ maxWidth: 760, margin: '0 auto', fontSize: 15, lineHeight: 1.85, whiteSpace: 'pre-line' }}>
            {hotel.venuesIntro}
          </p>
        </section>
      )}

      {!showGrid && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(32px,4.5vw,40px)', textAlign: 'center' }}>
          <button type="button" onClick={handleDiscover} className="btn-outline">
            Découvrir
          </button>
        </section>
      )}

      {hotel.venuesGallery && hotel.venuesGallery.length > 0 && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(40px,6vw,56px)' }}>
          <div
            className="venues-gallery"
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: `repeat(${hotel.venuesGallery.length}, 1fr)`,
              gap: 20,
            }}
          >
            {hotel.venuesGallery.map((img, i) => (
              <div key={i} style={{ aspectRatio: '3/2', overflow: 'hidden' }}>
                <img src={img} alt={`${hotel.name} — salle de réception`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {showGrid && (
      <section ref={gridRef} style={{ padding: 'clamp(48px,7vw,80px) clamp(20px,4vw,56px)' }}>
        <div className="venues-table" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...headCellStyle, textAlign: 'left' }}>Espace</th>
                <th style={{ ...headCellStyle, textAlign: 'left' }}>Cérémonie — capacité</th>
                <th style={{ ...headCellStyle, textAlign: 'left' }}>Cérémonie — tarif</th>
                <th style={{ ...headCellStyle, textAlign: 'left' }}>Conférence — capacité</th>
                <th style={{ ...headCellStyle, textAlign: 'left' }}>Conférence — tarif</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((v) => (
                <tr key={v.name}>
                  <td style={{ ...cellStyle, fontFamily: 'var(--serif)', fontSize: 16 }}>{v.name}</td>
                  <td style={cellStyle}>{v.ceremonyCapacity || '—'}</td>
                  <td style={cellStyle}>{v.ceremonyPrice || '—'}</td>
                  <td style={cellStyle}>{v.conferenceCapacity || '—'}</td>
                  <td style={cellStyle}>{v.conferencePrice || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Version mobile : une carte par salle plutôt qu'un tableau à 5
            colonnes illisible sur petit écran (voir .venues-table / .venues-cards
            ci-dessous). */}
        <div className="venues-cards" style={{ maxWidth: 1100, margin: '0 auto', display: 'none', flexDirection: 'column', gap: 16 }}>
          {venues.map((v) => (
            <div key={v.name} style={{ border: '1px solid var(--line)', padding: '18px 20px' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--espresso)', marginBottom: 12 }}>{v.name}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
                <div>
                  <p className="t-label" style={{ fontSize: 10, marginBottom: 4 }}>Cérémonie</p>
                  <p style={{ color: 'var(--espresso)' }}>{v.ceremonyCapacity || '—'}{v.ceremonyPrice ? ` · ${v.ceremonyPrice}` : ''}</p>
                </div>
                <div>
                  <p className="t-label" style={{ fontSize: 10, marginBottom: 4 }}>Conférence</p>
                  <p style={{ color: 'var(--espresso)' }}>{v.conferenceCapacity || '—'}{v.conferencePrice ? ` · ${v.conferencePrice}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ maxWidth: 1100, margin: '20px auto 0', fontSize: 11, color: 'var(--soft)' }}>
          Tarifs communiqués par Pefaco, hors restauration sauf mention contraire. « — » : formule non proposée pour cet espace.
        </p>
        <div style={{ maxWidth: 1100, margin: '32px auto 0' }}>
          <Link to={`/${hotel.slug}/contact`} className="btn-outline">
            Demander un devis
          </Link>
        </div>
      </section>
      )}

      <style>{`
        @media (max-width: 700px) {
          .venues-table { display: none !important; }
          .venues-cards { display: flex !important; }
          .venues-gallery { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  )
}
