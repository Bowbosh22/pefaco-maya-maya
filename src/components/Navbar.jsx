import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  // `menuMounted` garde le panneau dans le DOM le temps de l'animation de fermeture
  // (sinon il disparaissait d'un coup, ce qui donnait une impression de saccade).
  const [menuMounted, setMenuMounted] = useState(false)
  const closeTimer = useRef(null)
  const { pathname } = useLocation()
  const hotel = useHotel()

  const openMenu = useCallback(() => {
    clearTimeout(closeTimer.current)
    setMenuMounted(true)
    setMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenuMounted(false), 320)
  }, [])

  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Fige le défilement de la page derrière le menu : évite que la page « bouge »
  // (et se repeigne) pendant l'animation.
  useEffect(() => {
    if (!menuMounted) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuMounted])

  const base = `/${hotel.slug}`
  const links = [
    { to: base, label: 'Accueil' },
    { to: `${base}/chambres`, label: 'Chambres & Suites' },
    { to: `${base}/restaurant`, label: 'Restaurant' },
    // N'apparaît que pour les hôtels ayant reçu ce contenu (Maya-Maya, via sa
    // plaquette officielle du 28/09/2026) — voir hotels.js.
    ...(hotel.heritageText ? [{ to: `${base}/heritage`, label: hotel.heritageTitle || `L'Héritage ${hotel.shortName}` }] : []),
    ...(hotel.venues ? [{ to: `${base}/salles-evenements`, label: 'Salles & Événements' }] : []),
    ...(hotel.eventMenu ? [{ to: `${base}/menu-evenementiel`, label: 'Menu événementiel' }] : []),
    ...(hotel.activities ? [{ to: `${base}/activites`, label: 'Activités' }] : []),
    ...(hotel.news ? [{ to: `${base}/actualites`, label: 'Actualités' }] : []),
    { to: `${base}/contact`, label: 'Contact' },
  ]
  const reservationLink = `${base}/reservation`
  // Demande du 08/10/2026 : la navbar garde le même aspect (fond ivoire plein) dès le haut de page,
  // sans transition au défilement.
  const solid = true
  // Sur le hero, la navbar est transparente et se superpose à une photo dont la
  // luminosité varie selon l'hôtel/la page — un texte espresso y devenait peu
  // lisible (ex. hall clair d'Oyo). Un voile dégradé + un texte clair réglent
  // la lisibilité dans tous les cas ; une fois la page défilée (fond ivoire plein),
  // on repasse au texte espresso habituel.
  const navText = solid ? 'var(--espresso)' : 'var(--ivory)'
  const navTextSoft = solid ? 'var(--soft)' : 'rgba(248,243,234,0.78)'

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(20px, 4vw, 56px)',
        background: 'var(--ivory)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {/* Bouton menu (demande du 05/10/2026, inspirée de oneandonlyresorts.com) : sur toutes les
          tailles d'écran, la navbar n'affiche plus la liste des onglets — seulement ce bouton
          burger, le logo/titre, et "Changer d'hôtel" (comme leur sélecteur "One&Only Global" en
          haut de page). Les onglets passent dans le panneau plein écran ci-dessous, révélés un par
          un (animation en cascade) à l'ouverture. */}
      <button
        aria-label="Menu"
        onClick={() => (menuOpen ? closeMenu() : openMenu())}
        className="nav-burger"
        style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 8, marginRight: 'clamp(14px,2.4vw,28px)', flexShrink: 0 }}
      >
        <span style={{ width: 22, height: 1.4, background: navText, }} />
        <span style={{ width: 22, height: 1.4, background: navText, }} />
      </button>

      <Link to={base} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {hotel.logoIcon ? (
          <img
            src={hotel.logoIcon}
            alt={hotel.name}
            style={{ width: 32, height: 32, objectFit: 'contain', flexShrink: 0 }}
          />
        ) : (
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              border: '1.4px solid var(--gold)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)' }} />
          </span>
        )}
        {/* Typographie alignée sur le logo officiel (demande du 05/10/2026) : sans-serif
            gras et majuscule, comme "PEFACO HOTEL MAYA MAYA" sur l'emblème, au lieu du
            serif italique utilisé jusqu'ici. */}
        <span
          className="nav-brand-text"
          style={{
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: navText,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Pefaco <span style={{ color: solid ? 'var(--terracotta)' : 'var(--gold-2)' }}>{hotel.shortName}</span>
        </span>
      </Link>

      <Link
        to="/"
        className="nav-switch"
        style={{
          marginLeft: 'auto',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: navTextSoft,
          borderBottom: `1px solid ${solid ? 'var(--line)' : 'rgba(248,243,234,0.35)'}`,
          paddingBottom: 2,
          whiteSpace: 'nowrap',
        }}
      >
        Changer d'hôtel
      </Link>

      {menuMounted && (
        <>
          <div
            className={`nav-menu-backdrop${menuOpen ? '' : ' is-closing'}`}
            onClick={closeMenu}
            style={{ position: 'fixed', inset: 0, background: 'rgba(29,38,32,0.5)', zIndex: 98 }}
          />
          <div
            className={`nav-menu-panel${menuOpen ? '' : ' is-closing'}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              background: 'var(--ivory)',
              zIndex: 99,
              padding: '28px 32px 32px',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              boxShadow: '12px 0 40px rgba(29,38,32,0.18)',
            }}
          >
            <button
              aria-label="Fermer le menu"
              onClick={closeMenu}
              style={{ alignSelf: 'flex-start', fontSize: 22, color: 'var(--espresso)', padding: 8, marginLeft: -8, marginBottom: 'clamp(24px,5vh,48px)' }}
            >
              ✕
            </button>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 36 }}>
              {links.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-menu-item"
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(22px,3vw,28px)',
                    color: 'var(--espresso)',
                    animationDelay: `${60 + Math.min(i, 7) * 40}ms`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div style={{ height: 1, background: 'var(--line)', marginBottom: 28 }} />
            <Link
              to={reservationLink}
              className="btn-solid nav-menu-item"
              style={{ justifyContent: 'center', animationDelay: `${60 + Math.min(links.length, 8) * 40}ms` }}
            >
              Réserver
            </Link>
          </div>
        </>
      )}

      <style>{`
        @keyframes navMenuItemIn {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .nav-menu-item { opacity: 0; animation: navMenuItemIn 0.4s cubic-bezier(0.22, 0.8, 0.2, 1) forwards; }

        @keyframes navMenuPanelIn { from { transform: translate3d(-100%, 0, 0); } to { transform: translate3d(0, 0, 0); } }
        @keyframes navMenuPanelOut { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-100%, 0, 0); } }
        .nav-menu-panel {
          width: min(440px, 86vw);
          will-change: transform;
          animation: navMenuPanelIn 0.36s cubic-bezier(0.22, 0.8, 0.2, 1) forwards;
        }
        .nav-menu-panel.is-closing { animation: navMenuPanelOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards; }

        @keyframes navMenuBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes navMenuBackdropOut { from { opacity: 1; } to { opacity: 0; } }
        .nav-menu-backdrop { animation: navMenuBackdropIn 0.3s ease forwards; }
        .nav-menu-backdrop.is-closing { animation: navMenuBackdropOut 0.3s ease forwards; }

        @media (max-width: 560px) {
          .nav-menu-panel { width: 100vw; }
        }
        /* Petits écrans : la navbar pleine doit tout contenir (logo + nom + « Changer d'hôtel »). */
        @media (max-width: 480px) {
          .nav-brand-text { font-size: 12px !important; letter-spacing: 0.04em !important; }
          .nav-switch { font-size: 9.5px !important; letter-spacing: 0.06em !important; }
          .nav-burger { margin-right: 8px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-menu-panel, .nav-menu-panel.is-closing, .nav-menu-backdrop, .nav-menu-backdrop.is-closing { animation-duration: 0.01s; }
          .nav-menu-item { animation-duration: 0.01s; animation-delay: 0s !important; }
        }
      `}</style>
    </header>
  )
}
