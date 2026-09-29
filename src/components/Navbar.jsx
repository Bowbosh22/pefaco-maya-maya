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
      <Link to={base} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
        <span style={{ fontFamily: 'var(--serif)', fontSize: 17, letterSpacing: '0.02em', color: navText }}>
          Pefaco <span style={{ fontStyle: 'italic', color: solid ? 'var(--terracotta)' : 'var(--gold-2)' }}>{hotel.shortName}</span>
        </span>
      </Link>

      <nav
        className="nav-desktop"
        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 32 }}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: navText,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: navTextSoft,
            borderBottom: `1px solid ${solid ? 'var(--line)' : 'rgba(248,243,234,0.35)'}`,
            paddingBottom: 2,
          }}
        >
          Changer d'hôtel
        </Link>
        <Link to={reservationLink} className="btn-solid">
          Réserver
        </Link>
      </nav>

      <button
        aria-label="Menu"
        onClick={() => setMenuOpen((open) => !open)}
        className="nav-burger"
        style={{ marginLeft: 'auto', display: 'none', flexDirection: 'column', gap: 5, padding: 8 }}
      >
        <span style={{ width: 22, height: 1.4, background: navText }} />
        <span style={{ width: 22, height: 1.4, background: navText }} />
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-h)',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--ivory)',
            zIndex: 99,
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          {links.map((link) => (
            <Link key={link.to} to={link.to} style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--espresso)' }}>
              {link.label}
            </Link>
          ))}
          <Link
            to="/"
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--soft)' }}
          >
            Changer d'hôtel
          </Link>
          <Link to={reservationLink} className="btn-solid" style={{ marginTop: 12 }}>
            Réserver
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
