export default function CTASection() {
  return (
    <section style={{
      padding: 'clamp(72px,10vw,140px) clamp(20px,4vw,56px)',
      background: 'var(--espresso)', color: 'var(--ivory)', textAlign: 'center',
    }}>
      <p className="eyebrow" style={{ justifyContent: 'center' }}>
        <span className="t-label">Réservation</span>
      </p>
      <h2 style={{
        fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(28px,4vw,48px)',
        maxWidth: 720, margin: '0 auto 24px', lineHeight: 1.15,
      }}>
        À deux minutes de l'aéroport, votre chambre vous attend.
      </h2>
      <p className="t-body" style={{ color: 'rgba(248,243,234,0.7)', maxWidth: 520, margin: '0 auto 40px' }}>
        Par téléphone ou via les plateformes de réservation habituelles — l'équipe de l'hôtel répond directement.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="tel:+242056048030" className="btn-solid btn-gold">Appeler l'hôtel</a>
        <a
          href="https://wa.me/242056048030?text=Bonjour%2C%20je%20souhaite%20réserver%20une%20chambre%20à%20l'hôtel%20Pefaco%20Maya-Maya."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline btn-outline-light"
        >
          WhatsApp
        </a>
        <a href="/contact" className="btn-outline btn-outline-light">Voir les coordonnées</a>
      </div>
    </section>
  )
}
