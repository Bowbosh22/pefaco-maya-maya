import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

// Page « Activités » — contenu et visuels repris de la plaquette officielle
// Pefaco (28/09/2026), page « 05 Autres activités ». Page propre à Maya-Maya :
// n'apparaît que si l'hôtel a un champ `activities` (voir Navbar.jsx).
//
// Mise en page éditoriale (grande photographie, blocs alternés numérotés,
// bandeau sombre, clôture plein cadre) inspirée d'une référence transmise par
// Mr. Mbemba (atlantis.com/dubai/atlantis-the-royal/experiences), adaptée aux
// visuels et au contenu réels de la plaquette Maya-Maya — les descriptions de
// chaque activité sont un texte de présentation écrit pour le site, les
// horaires/tarifs/avantages restent ceux communiqués par Pefaco.
export default function Activites() {
  const hotel = useHotel()
  const activities = hotel.activities

  if (!activities) return null

  const { amenities, happyHours, heroImage } = activities

  return (
    <main>
      {/* Hero plein cadre */}
      <section
        style={{
          position: 'relative',
          minHeight: '86vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'calc(var(--nav-h) + 40px) clamp(20px,4vw,56px) clamp(56px,8vw,96px)',
          backgroundImage: `linear-gradient(180deg, rgba(29,38,32,0.35) 0%, rgba(29,38,32,0.55) 55%, rgba(29,38,32,0.92) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            <span className="t-label" style={{ color: 'var(--ivory)' }}>
              Vie de l'hôtel
            </span>
          </p>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(34px,6vw,68px)',
              color: 'var(--ivory)',
              lineHeight: 1.08,
              marginBottom: 20,
            }}
          >
            Ici, l'expérience commence hors de la chambre.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(248,243,234,0.8)', lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
            Expositions, sport, soirées et rendez-vous réguliers — la vie de l'hôtel au-delà du séjour.
          </p>
        </div>
      </section>

      {/* Blocs alternés — une activité par section, grande photo + numéro */}
      {amenities.map((a, i) => {
        const reversed = i % 2 === 1
        return (
          <section key={a.label} style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)' }}>
            <div
              className="exp-row"
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1.15fr 1fr',
                gap: 'clamp(32px,5vw,64px)',
                alignItems: 'center',
                direction: reversed ? 'rtl' : 'ltr',
              }}
            >
              <div style={{ direction: 'ltr', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                <img src={a.image} alt={a.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ direction: 'ltr' }}>
                <p
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(48px,6vw,72px)',
                    color: 'var(--sand)',
                    lineHeight: 1,
                    margin: '0 0 8px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--serif)',
                    fontWeight: 400,
                    fontSize: 'clamp(26px,3.2vw,38px)',
                    color: 'var(--espresso)',
                    marginBottom: 16,
                  }}
                >
                  {a.label}
                </h2>
                <div style={{ height: 1, width: 40, background: 'var(--gold)', marginBottom: 16 }} />
                <p style={{ fontSize: 14, color: 'var(--soft)', lineHeight: 1.75, maxWidth: 420, margin: 0 }}>{a.description}</p>
              </div>
            </div>
          </section>
        )
      })}

      {/* Happy Hours — bandeau sombre */}
      <section style={{ padding: 'clamp(64px,9vw,110px) clamp(20px,4vw,56px)', background: 'var(--espresso)', color: 'var(--ivory)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 10 }}>
            Rendez-vous réguliers
          </p>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(32px,4.5vw,52px)',
              marginBottom: 48,
            }}
          >
            Happy Hours
          </h2>
          <div className="happy-hours-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {happyHours.map((h, i) => (
              <div
                key={h.day}
                style={{
                  padding: '0 clamp(16px,2.5vw,32px)',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(248,243,234,0.15)',
                }}
              >
                <p className="t-label" style={{ color: 'rgba(248,243,234,0.55)', marginBottom: 10 }}>
                  {h.music}
                </p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px,3.4vw,40px)', margin: '0 0 6px' }}>{h.day}</p>
                <p style={{ fontSize: 13, color: 'var(--gold-2)', fontWeight: 600, marginBottom: 24, minHeight: 18 }}>{h.hours || ' '}</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {h.perks.map((p) => (
                    <li key={p} style={{ fontSize: 12.5, color: 'rgba(248,243,234,0.75)', lineHeight: 1.6 }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .exp-row { grid-template-columns: 1fr !important; direction: ltr !important; }
          .happy-hours-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .happy-hours-grid > div { border-left: none !important; padding: 0 !important; }
        }
      `}</style>

      <Footer />
    </main>
  )
}
