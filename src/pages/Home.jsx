import { Link } from 'react-router-dom'
import ImmersiveArrival from '../components/ImmersiveArrival'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

// ── Bloc éditorial alterné (image + texte), inspiré de la structure aman.com ──
function EditorialBlock({ id, reverse, eyebrow, title, text, image, alt, linkTo, linkLabel }) {
  return (
    <section id={id} style={{ padding: 'clamp(0px,0vw,0px)' }}>
      <div
        className="editorial-block"
        style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch',
          direction: reverse ? 'rtl' : 'ltr',
        }}
      >
        <div style={{ aspectRatio: '4/3', overflow: 'hidden', direction: 'ltr' }}>
          <img src={image} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{
          direction: 'ltr', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(40px,6vw,96px)',
        }}>
          <p className="t-label" style={{ marginBottom: 22 }}>{eyebrow}</p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(28px,3.4vw,44px)',
            lineHeight: 1.15, marginBottom: 24, color: 'var(--espresso)', maxWidth: 460,
          }}>
            {title}
          </h2>
          <p className="t-body" style={{ maxWidth: 420, marginBottom: linkTo ? 28 : 0 }}>{text}</p>
          {linkTo && (
            <Link to={linkTo} className="link-underline" style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--espresso)', display: 'inline-block', width: 'fit-content',
            }}>
              {linkLabel} →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ image, title, text }) {
  return (
    <div>
      <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: 24 }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 22, marginBottom: 10, color: 'var(--espresso)' }}>
        {title}
      </h3>
      <p className="t-body">{text}</p>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <ImmersiveArrival />

      {/* Intro — statement éditorial, sobre */}
      <section style={{
        padding: 'clamp(96px,14vw,180px) clamp(20px,4vw,56px) clamp(80px,11vw,140px)',
        maxWidth: 760, margin: '0 auto', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(28px,4vw,48px)',
          lineHeight: 1.25, color: 'var(--espresso)',
        }}>
          Un 5 étoiles pensé pour les voyageurs pressés —<br />
          et pour ceux qui veulent prendre leur temps.
        </h2>
      </section>

      {/* Blocs éditoriaux alternés */}
      <EditorialBlock
        eyebrow="Chambres & suites"
        title="Le calme après la piste."
        text="Climatisation, literie soignée, vue dégagée. Quatre catégories, du séjour d'une nuit à l'étape prolongée."
        image="/assets/chambre-lit.jpg"
        alt="Chambre Pefaco Maya-Maya"
        linkTo="/chambres"
        linkLabel="Découvrir les chambres"
      />

      <EditorialBlock
        id="restaurant"
        reverse
        eyebrow="Restaurant"
        title="Petit-déjeuner tôt, dîner tard."
        text="Un buffet international pensé pour les horaires de vol — service continu en journée, carte du soir pour les clients en étape comme pour les habitués de Brazzaville."
        image="https://images.unsplash.com/photo-1722477936580-84aa10762b0b?w=1400&q=80"
        alt="Petit-déjeuner buffet"
      />

      <EditorialBlock
        eyebrow="Emplacement"
        title="L'étape aérienne, sans stress."
        text="À deux minutes de l'aéroport international de Maya-Maya. Le vol atterrit, la navette attend, la chambre est déjà prête."
        image="https://images.unsplash.com/photo-1784411641863-d163d776ed55?w=1400&q=80"
        alt="Hôtel de nuit près de l'aéroport"
        linkTo="/contact"
        linkLabel="Voir les coordonnées"
      />

      {/* Expériences — module curaté, plutôt qu'une liste d'équipements */}
      <section style={{ padding: 'clamp(96px,12vw,160px) clamp(20px,4vw,56px)', background: 'var(--sand)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p className="t-label" style={{ textAlign: 'center', marginBottom: 16 }}>L'établissement</p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(28px,3.4vw,44px)',
            textAlign: 'center', marginBottom: 64, color: 'var(--espresso)',
          }}>
            Trois façons d'y séjourner.
          </h2>
          <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            <ExperienceCard
              image="https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=900&q=80"
              title="L'étape d'affaires"
              text="Bureau, Wi-Fi haut débit, climatisation — tout pour une nuit efficace entre deux vols."
            />
            <ExperienceCard
              image="https://images.unsplash.com/photo-1776763255480-014a64ee137d?w=900&q=80"
              title="La détente"
              text="Piscine extérieure et bar, pour souffler avant ou après le vol."
            />
            <ExperienceCard
              image="/assets/chambre-vue-salon.jpg"
              title="Réunions & groupes"
              text="Espaces de réception et navette aéroport, pour les séjours en équipe."
            />
          </div>
        </div>
      </section>

      {/* Avis */}
      <section style={{ padding: 'clamp(96px,12vw,160px) clamp(20px,4vw,56px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="stars" style={{ marginBottom: 24 }}>★★★★★</div>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(20px,2.4vw,28px)',
            lineHeight: 1.5, color: 'var(--espresso)', marginBottom: 20,
          }}>
            « Un accueil chaleureux et un emplacement idéal pour ceux qui arrivent ou repartent par
            l'aéroport — exactement ce qu'on attend d'un hôtel d'affaires à Brazzaville. »
          </p>
          <p className="t-label">Avis client — Google</p>
        </div>
      </section>

      <CTASection />
      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .editorial-block { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </main>
  )
}