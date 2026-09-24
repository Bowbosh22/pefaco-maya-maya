import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

export default function CTASection() {
  const hotel = useHotel()
  const base = `/${hotel.slug}`
  const whatsappLink = hotel.whatsapp
    ? `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(hotel.whatsappMessage)}`
    : null

  return (
    <section
      style={{
        padding: 'clamp(72px,10vw,140px) clamp(20px,4vw,56px)',
        background: 'var(--espresso)',
        color: 'var(--ivory)',
        textAlign: 'center',
      }}
    >
      <p className="eyebrow" style={{ justifyContent: 'center' }}>
        <span className="t-label">Réservation</span>
      </p>
      <h2
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(28px,4vw,48px)',
          maxWidth: 720,
          margin: '0 auto 24px',
          lineHeight: 1.15,
        }}
      >
        {hotel.heroTagline}
      </h2>
      <p className="t-body" style={{ color: 'rgba(248,243,234,0.7)', maxWidth: 520, margin: '0 auto 40px' }}>
        Par téléphone ou via les plateformes de réservation habituelles — l'équipe de l'hôtel répond directement.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        {hotel.phoneHref ? (
          <a href={hotel.phoneHref} className="btn-solid btn-gold">
            Appeler l'hôtel
          </a>
        ) : (
          <Link to={`${base}/contact`} className="btn-solid btn-gold">
            Demander une réservation
          </Link>
        )}
        {whatsappLink && (
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline btn-outline-light">
            WhatsApp
          </a>
        )}
        <Link to={`${base}/contact`} className="btn-outline btn-outline-light">
          Voir les coordonnées
        </Link>
      </div>
    </section>
  )
}
