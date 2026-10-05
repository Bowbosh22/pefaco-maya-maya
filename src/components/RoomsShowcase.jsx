import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

// Section "affiche" pleine largeur utilisée sur la page d'accueil (section Chambres & suites).
// Remplace l'ancienne version (bandeau + grille de toutes les chambres en dessous, demande du
// 05/10/2026 : trop redondant avec la page Chambres, on garde une seule grande image incitant à
// "découvrir" les chambres, dans l'esprit d'une page d'hôtel de luxe type Kempinski).
export default function RoomsShowcase() {
  const hotel = useHotel()
  const base = `/${hotel.slug}`

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'clamp(480px,70vw,760px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <img
        src={hotel.roomsBannerImage || hotel.heroImage}
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(29,38,32,0.25) 0%, rgba(29,38,32,0.6) 100%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding: '0 24px', maxWidth: 700 }}>
        <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 18, justifyContent: 'center' }}>
          Hébergement
        </p>
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(28px,4vw,46px)',
            color: 'var(--ivory)',
            marginBottom: 20,
            lineHeight: 1.2,
          }}
        >
          Chambres & suites
        </h2>
        <p style={{ color: 'rgba(248,243,234,0.85)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
          {hotel.rooms.length} catégories, du séjour d'une nuit à l'étape prolongée. Toutes climatisées, à {hotel.city}.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to={`${base}/chambres`} className="btn-solid rooms-banner-cta">
            Découvrir nos chambres
          </Link>
        </div>
      </div>

      <style>{`
        /* Bouton doré semi-transparent (demande du 05/10/2026) : on garde la structure de
           .btn-solid (padding, lettrage) mais le fond laisse deviner la photo derrière, au lieu
           d'un aplat doré opaque. Le double sélecteur l'emporte sur .btn-solid quel que soit
           l'ordre des règles dans la feuille de style globale. */
        .rooms-banner-cta.btn-solid {
          background: rgba(185, 148, 86, 0.38);
          border-color: rgba(185, 148, 86, 0.75);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }
        .rooms-banner-cta.btn-solid:hover {
          background: rgba(205, 173, 117, 0.55);
          border-color: rgba(205, 173, 117, 0.9);
        }
      `}</style>
    </section>
  )
}
