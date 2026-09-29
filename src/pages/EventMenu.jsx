import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

function CompactSections({ sections }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
      {sections.map((s) => (
        <div key={s.title}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
            {s.title}
          </p>
          <p style={{ fontSize: 12.5, color: 'var(--espresso)', lineHeight: 1.6 }}>{s.items.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}

// Page « Menu événementiel » — contenu officiel de la plaquette Pefaco
// (28/09/2026), repris tel quel. Page propre à Maya-Maya : n'apparaît que si
// l'hôtel a un champ `eventMenu` (voir Navbar.jsx).
//
// Présentation inspirée d'une référence transmise par Mr. Mbemba
// (tympanus.net/Tutorials/3DRestaurantMenu) : une carte fermée avec un bouton
// « Voir le menu », qui s'ouvre au clic sur une répartition en colonnes par
// catégorie. Adapté à l'identité Pefaco (ivoire/or plutôt que le décor en
// pierre du site de référence) et avec les tarifs conservés (absents de la
// référence, mais indispensables ici). Photo d'ambiance en arrière-plan de la
// carte fermée ajoutée le 29/09/2026 (`menu.gateImage`, source : fiche
// Expedia officielle de l'hôtel, sélectionnée par Mr. Mbemba).
const CARD_MS = 380 // durée de la sortie de la carte / de la fermeture du contenu

export default function EventMenu() {
  const hotel = useHotel()
  const menu = hotel.eventMenu
  // Machine à 4 états pour animer l'ouverture ET la fermeture (pas seulement
  // un fondu instantané) : la carte se rétracte d'abord, puis les colonnes
  // apparaissent en cascade ; à la fermeture, les colonnes disparaissent puis
  // la carte revient.
  const [phase, setPhase] = useState('closed') // 'closed' | 'card-out' | 'open' | 'content-out'
  const [visible, setVisible] = useState(false)
  const [openBuffet, setOpenBuffet] = useState(null)

  const showGate = phase === 'closed' || phase === 'card-out'
  const showContent = phase === 'open' || phase === 'content-out'
  const gateLeaving = phase === 'card-out'

  useEffect(() => {
    if (phase === 'open') {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    }
    if (phase === 'content-out') {
      setVisible(false)
    }
  }, [phase])

  function handleOpen() {
    setPhase('card-out')
    setTimeout(() => setPhase('open'), CARD_MS)
  }

  function handleClose() {
    setPhase('content-out')
    setOpenBuffet(null)
    setTimeout(() => setPhase('closed'), CARD_MS)
  }

  if (!menu) return null

  return (
    <main>
      {showGate && (
        <section
          style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'calc(var(--nav-h) + 40px) clamp(20px,4vw,56px) 60px',
            background: menu.gateImage
              ? `linear-gradient(rgba(29,38,32,0.55), rgba(29,38,32,0.55)), url(${menu.gateImage}) center / cover`
              : 'var(--sand)',
          }}
        >
          <div
            style={{
              maxWidth: 440,
              width: '100%',
              border: '1px solid var(--gold)',
              padding: 'clamp(36px,6vw,56px) clamp(28px,5vw,44px)',
              textAlign: 'center',
              background: 'var(--ivory)',
              opacity: gateLeaving ? 0 : 1,
              transform: gateLeaving ? 'scale(0.94)' : 'scale(1)',
              transition: `opacity ${CARD_MS}ms ease, transform ${CARD_MS}ms ease`,
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1.4px solid var(--gold)',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 20px',
              }}
            >
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--gold)' }} />
            </span>
            <p className="t-label" style={{ marginBottom: 10 }}>
              Réunions & événements
            </p>
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 30, color: 'var(--espresso)', marginBottom: 14 }}>
              Menu événementiel
            </h1>
            <p style={{ fontSize: 13, color: 'var(--soft)', lineHeight: 1.7, marginBottom: 28 }}>
              Menus servis à table et formules buffet pour vos réceptions et séminaires — compositions et tarifs communiqués par Pefaco.
            </p>
            <div style={{ height: 1, background: 'var(--line)', margin: '0 0 28px' }} />
            <button
              type="button"
              onClick={handleOpen}
              disabled={gateLeaving}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 20,
                color: 'var(--espresso)',
              }}
            >
              Voir le menu <span style={{ color: 'var(--gold)' }}>→</span>
            </button>
            <div style={{ height: 1, background: 'var(--line)', margin: '28px 0 20px' }} />
            <p style={{ fontSize: 12, color: 'var(--soft)', lineHeight: 1.7 }}>
              Pefaco Hotel {hotel.shortName}
              <br />
              {hotel.address}
              <br />
              {hotel.phone}
            </p>
          </div>
        </section>
      )}

      {showContent && (
        <section
          style={{
            padding: 'calc(var(--nav-h) + 32px) clamp(20px,4vw,56px) clamp(56px,8vw,88px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: 1200,
              margin: '0 auto 32px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: 'opacity .45s ease, transform .45s ease',
            }}
          >
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,4vw,38px)', color: 'var(--espresso)' }}>
              Menu événementiel
            </h1>
            <button
              type="button"
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--soft)',
              }}
            >
              Fermer ✕
            </button>
          </div>

          <div
            className="menu-columns"
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gap: 40,
              gridTemplateColumns: 'repeat(3, 1fr)',
              alignItems: 'start',
            }}
          >
            {/* Colonne 1 — Menus servis à table */}
            <div
              style={{
                border: '1px solid var(--line)',
                padding: '28px 24px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity .45s ease .05s, transform .45s ease .05s',
              }}
            >
              <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 4 }}>
                Menus servis à table
              </p>
              <div style={{ height: 1, background: 'var(--gold)', width: 32, margin: '0 0 20px' }} />
              {menu.tableMenus.map((m) => (
                <div key={m.label} style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--espresso)', marginBottom: 2 }}>{m.label}</p>
                  <CompactSections sections={m.sections} />
                </div>
              ))}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                {menu.tableMenuPricing.map((p) => (
                  <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--espresso)', padding: '4px 0' }}>
                    <span>{p.label}</span>
                    <span>{p.price}</span>
                  </div>
                ))}
                <p style={{ fontSize: 10, color: 'var(--soft)', marginTop: 6 }}>Par personne, hors boisson.</p>
              </div>
            </div>

            {/* Colonne 2 — Buffets */}
            <div
              style={{
                border: '1px solid var(--line)',
                padding: '28px 24px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity .45s ease .13s, transform .45s ease .13s',
              }}
            >
              <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 4 }}>
                Buffets
              </p>
              <div style={{ height: 1, background: 'var(--gold)', width: 32, margin: '0 0 20px' }} />
              {menu.buffets.map((b, i) => {
                const isOpen = openBuffet === i
                return (
                  <div key={b.label} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
                    <button
                      type="button"
                      onClick={() => setOpenBuffet(isOpen ? null : i)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--espresso)' }}>{b.label}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
                        <span style={{ fontSize: 12, color: 'var(--soft)', whiteSpace: 'nowrap' }}>{b.price}</span>
                        <span
                          style={{
                            fontSize: 10,
                            color: 'var(--gold)',
                            display: 'inline-block',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform .3s ease',
                          }}
                        >
                          ▾
                        </span>
                      </span>
                    </button>
                    {/* grid-template-rows 0fr→1fr anime une hauteur "auto" sans mesurer le contenu en JS */}
                    <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows .35s ease' }}>
                      <div style={{ overflow: 'hidden' }}>
                        <CompactSections sections={b.sections} />
                      </div>
                    </div>
                  </div>
                )
              })}
              <p style={{ fontSize: 10, color: 'var(--soft)', marginTop: 4 }}>Par personne, hors boisson — cliquer un buffet pour le détail.</p>
            </div>

            {/* Colonne 3 — Pause-café, Open Bar & Cocktails */}
            <div
              style={{
                border: '1px solid var(--line)',
                padding: '28px 24px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity .45s ease .21s, transform .45s ease .21s',
              }}
            >
              <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 4 }}>
                Pause-café, Open Bar & Cocktails
              </p>
              <div style={{ height: 1, background: 'var(--gold)', width: 32, margin: '0 0 20px' }} />
              {menu.extras.map((e) => (
                <div key={e.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--espresso)' }}>{e.label}</span>
                    <span style={{ fontSize: 12.5, color: 'var(--espresso)', whiteSpace: 'nowrap' }}>{e.price}</span>
                  </div>
                  <p style={{ fontSize: 10.5, color: 'var(--soft)' }}>{e.unit}</p>
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <Link to={`/${hotel.slug}/contact`} className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 980px) {
          .menu-columns { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
