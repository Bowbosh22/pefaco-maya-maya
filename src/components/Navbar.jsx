import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/chambres', label: 'Chambres & Suites' },
    { to: '/#restaurant', label: 'Restaurant' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
      padding: '0 clamp(20px, 4vw, 56px)',
      background: scrolled || open ? 'var(--ivory)' : 'transparent',
      borderBottom: scrolled || open ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'background 0.4s var(--ease), border-color 0.4s var(--ease)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 30, height: 30, borderRadius: '50%', border: '1.4px solid var(--gold)',
          display: 'grid', placeItems: 'center', flexShrink: 0,
        }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)' }} />
        </span>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 17, letterSpacing: '0.02em', color: 'var(--espresso)' }}>
          Pefaco <span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>Maya-Maya</span>
        </span>
      </Link>

      <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 36 }} className="nav-desktop">
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--espresso)',
          }}>{l.label}</Link>
        ))}
        <a href="tel:+242056048030" className="btn-solid">Réserver</a>
      </nav>

      <button aria-label="Menu" onClick={() => setOpen(o => !o)} className="nav-burger" style={{
        marginLeft: 'auto', display: 'none', flexDirection: 'column', gap: 5, padding: 8,
      }}>
        <span style={{ width: 22, height: 1.4, background: 'var(--espresso)' }} />
        <span style={{ width: 22, height: 1.4, background: 'var(--espresso)' }} />
      </button>

      {open && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, bottom: 0,
          background: 'var(--ivory)', zIndex: 99, padding: '32px 24px',
          display: 'flex', flexDirection: 'column', gap: 28,
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--espresso)',
            }}>{l.label}</Link>
          ))}
          <a href="tel:+242056048030" className="btn-solid" style={{ marginTop: 12 }}>Réserver par téléphone</a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop { display: none; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
