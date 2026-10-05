import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const hotel = useHotel()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

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
    { to: `${base}/contact`, label: 'Contact' },
  ]
  const reservationLink = `${base}/reservation`
  const solid = scrolled || menuOpen
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
        background: solid
          ? 'var(--ivory)'
          : 'linear-gradient(180deg, rgba(29,38,32,0.55) 0%, rgba(29,38,32,0.15) 70%, rgba(29,38,32,0) 100%)',
        borderBottom: solid ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background 0.4s var(--ease), border-color 0.4s var(--ease)',
      }}
    >
      {/* Bouton menu (demande du 05/10/2026, inspirée de oneandonlyresorts.com) : sur toutes les
          tailles d'écran, la navbar n'affiche plus la liste des onglets — seulement ce bouton
          burger, le logo/titre, et "Changer d'hôtel" (comme leur sélecteur "One&Only Global" en
          haut de page). Les onglets passent dans le panneau plein écran ci-dessous, révélés un par
          un (animation en cascade) à l'ouverture. */}
      <button
        aria-label="Menu"
        onClick={() => setMenuOpen((open) => !open)}
        className="nav-burger"
        style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 8, marginRight: 'clamp(14px,2.4vw,28px)', flexShrink: 0 }}
      >
        <span style={{ width: 22, height: 1.4, background: navText, transition: 'background 0.3s ease' }} />
        <span style={{ width: 22, height: 1.4, background: navText, transition: 'background 0.3s ease' }} />
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

      {menuOpen && (
        <>
          <div
            className="nav-menu-backdrop"
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(29,38,32,0.45)', backdropFilter: 'blur(2px)', zIndex: 98 }}
          />
          <div
            className="nav-menu-panel"
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
              onClick={() => setMenuOpen(false)}
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
                    animationDelay: `${90 + i * 70}ms`,
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
              style={{ justifyContent: 'center', animationDelay: `${90 + links.length * 70}ms` }}
            >
              Réserver
            </Link>
          </div>
        </>
      )}

      <style>{`
        @keyframes navMenuItemIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-menu-item { opacity: 0; animation: navMenuItemIn 0.55s var(--ease) forwards; }

        @keyframes navMenuPanelIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .nav-menu-panel { width: min(440px, 86vw); animation: navMenuPanelIn 0.4s var(--ease) forwards; }

        @keyframes navMenuBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        .nav-menu-backdrop { animation: navMenuBackdropIn 0.3s ease forwards; }

        @media (max-width: 560px) {
          .nav-menu-panel { width: 100vw; }
        }
      `}</style>
    </header>
  )
}
