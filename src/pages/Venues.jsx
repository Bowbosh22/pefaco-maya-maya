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
// n'apparaît que si l'hôtel a un champ `venues` (voir Navbar.jsx). Aucune
// photo : les photos de salles de la plaquette sont fondues en transparence
// sous le tableau de prix lui-même (choix de mise en page du document), donc
// impossibles à extraire proprement sans artefact visuel.
export default function Venues() {
  const hotel = useHotel()
  const venues = hotel.venues || []

  return (
    <main>
      <section
        style={{
          padding: 'calc(var(--nav-h) + clamp(48px,7vw,96px)) clamp(20px,4vw,56px) clamp(40px,6vw,64px)',
          background: 'var(--sand)',
        }}
      >
        <p className="eyebrow">
          <span className="t-label">Réunions & événements</span>
        </p>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(32px,5vw,60px)',
            color: 'var(--espresso)',
            maxWidth: 780,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Salles & Événements
        </h1>
        <p className="t-body" style={{ maxWidth: 640 }}>
          Neuf espaces pour vos cérémonies, conférences et réceptions — capacités et tarifs communiqués par Pefaco.
        </p>
      </section>

      <section style={{ padding: 'clamp(48px,7vw,80px) clamp(20px,4vw,56px)' }}>
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

      <style>{`
        @media (max-width: 700px) {
          .venues-table { display: none !important; }
          .venues-cards { display: flex !important; }
        }
      `}</style>

      <Footer />
    </main>
  )
}
