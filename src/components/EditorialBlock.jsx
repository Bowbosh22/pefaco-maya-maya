import { Link } from 'react-router-dom'

// Bloc éditorial générique deux-colonnes (image + texte), réutilisé pour
// "Restaurant" et "Emplacement" sur la page d'accueil.
export default function EditorialBlock({ id, reverse, eyebrow, title, text, image, alt, linkTo, linkLabel }) {
  return (
    <section id={id}>
      <div
        className="editorial-block"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', direction: reverse ? 'rtl' : 'ltr' }}
      >
        <div style={{ aspectRatio: '4/3', overflow: 'hidden', direction: 'ltr' }}>
          <img src={image} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,6vw,96px)' }}>
          <p className="t-label" style={{ marginBottom: 22 }}>
            {eyebrow}
          </p>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(28px,3.4vw,44px)',
              lineHeight: 1.15,
              marginBottom: 24,
              color: 'var(--espresso)',
              maxWidth: 460,
            }}
          >
            {title}
          </h2>
          <p className="t-body" style={{ maxWidth: 420, marginBottom: linkTo ? 28 : 0 }}>
            {text}
          </p>
          {linkTo && (
            <Link
              to={linkTo}
              className="link-underline"
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--espresso)',
                display: 'inline-block',
                width: 'fit-content',
              }}
            >
              {linkLabel} →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
