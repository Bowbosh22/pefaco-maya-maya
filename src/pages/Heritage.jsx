import { useHotel } from '../context/HotelContext'
import Footer from '../components/Footer'

// Page « héritage / à propos » — redessinée le 01/10/2026 (demande explicite, référence :
// belmond.com/en/stories puis belmond.com/en/stories/quite-the-site) dans un esprit « magazine » :
// un bloc « Destination » (photo verticale + texte) aligné avec la photo de l'hôtel et l'accroche
// « Histoire », une grille de « story cards » (Culture, Boutiques, Suivez-nous), puis le plein texte
// « Notre histoire » accompagné d'une photo verticale, les chiffres clés juste en dessous, et enfin
// Culture / Boutiques / Suivez-nous. Le site étant en une seule page par onglet (pas d'articles
// séparés), les blocs renvoient vers leur contenu complet plus bas sur la même page par défilement
// (scrollIntoView) plutôt que par une ancre d'URL classique — le routeur du site utilise déjà le "#"
// pour ses propres routes (HashRouter), donc un lien <a href="#id"> casserait la navigation. Le texte
// officiel « À propos de nous » / chiffres / vie culturelle / boutiques / présence en ligne de la
// plaquette Pefaco reste repris tel quel, simplement réorganisé. La petite galerie de 3 photos
// similaires (façade/entrée/lobby) qui suivait autrefois le texte « Notre histoire » a été retirée le
// 01/10/2026 à la demande de Mr. Mbemba (remplacée par le bloc Destination + la photo verticale ci-
// dessous, et les chiffres clés repositionnés juste après).
//
// NB : les photos « Destination » (gorille) et « Notre histoire » (toile de street-art) ont été
// fournies par Mr. Mbemba uniquement pour montrer le format souhaité (portrait, 2/3) et ne sont pas
// des photos de l'hôtel — à remplacer par de vraies photos avant mise en ligne si elles ne sont pas
// validées telles quelles.
function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const capLabelStyle = { color: 'var(--terracotta)', marginBottom: 10 }
const capTitleStyle = { fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(22px,2.6vw,30px)', color: 'var(--espresso)', margin: '0 0 12px' }
const capDescStyle = { fontSize: 14, color: 'var(--soft)', lineHeight: 1.75, margin: '0 0 12px', maxWidth: 420 }
const linkStyle = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--espresso)' }

function StoryCard({ image, category, title, excerpt, targetId }) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(targetId)}
      style={{ textAlign: 'left', display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      {image && (
        <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginBottom: 18 }}>
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <p className="t-label" style={{ color: 'var(--terracotta)', marginBottom: 8 }}>
        {category}
      </p>
      <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 21, color: 'var(--espresso)', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: 'var(--soft)', lineHeight: 1.7, margin: '0 0 10px' }}>{excerpt}</p>
      <span
        className="link-underline"
        style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--espresso)' }}
      >
        Lire la suite →
      </span>
    </button>
  )
}

export default function Heritage() {
  const hotel = useHotel()
  const gallery = hotel.heritageGallery || []
  const heritageTitle = hotel.heritageTitle || `L'Héritage ${hotel.shortName}`
  const heroPhoto = gallery[0] || hotel.heritageImage

  return (
    <main>
      {/* En-tête redessiné le 05/10/2026 (demande explicite, inspirée de
          oneandonlyresorts.com/our-story) : eyebrow + grand titre centrés suivis d'une phrase, sur
          fond clair, puis une grande photo pleine largeur — même gabarit que la page Salles &
          Événements — plutôt que le bandeau sable aligné à gauche utilisé jusqu'ici. */}
      <section
        style={{
          padding: 'calc(var(--nav-h) + clamp(48px,7vw,88px)) clamp(20px,4vw,56px) clamp(40px,6vw,56px)',
          textAlign: 'center',
        }}
      >
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          <span className="t-label">À propos de nous</span>
        </p>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(34px,5.6vw,64px)',
            color: 'var(--espresso)',
            maxWidth: 820,
            lineHeight: 1.15,
            margin: '0 auto',
          }}
        >
          {heritageTitle}
        </h1>
        <p className="t-body" style={{ maxWidth: 580, margin: '20px auto 0', fontSize: 16 }}>
          Un havre de luxe au cœur de Brazzaville, entre histoire riche, architecture moderne et décorations culturelles.
        </p>
      </section>

      {heroPhoto && (
        <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(40px,6vw,56px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', aspectRatio: '16 / 9', overflow: 'hidden' }}>
            <img src={heroPhoto} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </section>
      )}

      {/* Bloc « Destination » (photo verticale + texte) aligné avec la photo de l'hôtel, elle-même
          suivie de l'accroche « Histoire » qui renvoie vers le texte complet plus bas. L'alignement
          du haut des deux photos, malgré un texte de hauteur différente au-dessus de chacune, est
          obtenu via un bloc de texte « fantôme » (même markup, visibility: hidden) dans la colonne
          de droite : il réserve exactement la même hauteur que le texte réel de la colonne de gauche,
          de façon responsive, sans mesure JS. */}
      {hotel.destinationImage && hotel.heritageImage && (
        <section style={{ padding: 'clamp(56px,8vw,88px) clamp(20px,4vw,56px) clamp(32px,5vw,48px)' }}>
          <div
            className="duo-grid"
            style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px,4vw,48px)', alignItems: 'start' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <p className="t-label" style={capLabelStyle}>
                  {hotel.destinationLabel || 'Destination'}
                </p>
                <h2 style={capTitleStyle}>{hotel.destinationTitle}</h2>
                <p style={capDescStyle}>{hotel.destinationText}</p>
              </div>
              <div style={{ aspectRatio: '2/3', overflow: 'hidden' }}>
                <img src={hotel.destinationImage} alt={hotel.destinationTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <div className="duo-col-ghost" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="duo-ghost" aria-hidden="true" style={{ visibility: 'hidden' }}>
                <p className="t-label" style={capLabelStyle}>
                  {hotel.destinationLabel || 'Destination'}
                </p>
                <h2 style={capTitleStyle}>{hotel.destinationTitle}</h2>
                <p style={capDescStyle}>{hotel.destinationText}</p>
              </div>
              <button
                type="button"
                onClick={() => scrollToId('histoire')}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, aspectRatio: '16/10', overflow: 'hidden' }}
              >
                <img src={hotel.heritageImage} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </button>
              <button
                type="button"
                onClick={() => scrollToId('histoire')}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 20 }}
              >
                <p className="t-label" style={capLabelStyle}>
                  Histoire
                </p>
                <h2 style={capTitleStyle}>{heritageTitle}</h2>
                <p style={capDescStyle}>
                  Un havre de luxe au cœur de Brazzaville, entre histoire riche, architecture moderne et décorations
                  culturelles.
                </p>
                <span className="link-underline" style={linkStyle}>
                  Lire la suite →
                </span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- Contenu complet de chaque story, atteint par défilement depuis les blocs ci-dessus ---- */}

      {/* « Notre histoire » — plein texte à gauche, photo verticale à droite (même format 2/3 que la
          photo « Destination », agrandie le 01/10/2026). La petite galerie de 3 photos qui suivait ce
          bloc a été retirée : les chiffres clés suivent directement. */}
      <section id="histoire" style={{ padding: 'clamp(40px,6vw,64px) clamp(20px,4vw,56px)', background: 'var(--sand)', scrollMarginTop: 'var(--nav-h)' }}>
        <div
          className="histoire-grid"
          style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(32px,5vw,56px)', alignItems: 'center' }}
        >
          <p className="t-body" style={{ fontSize: 16, lineHeight: 1.85, whiteSpace: 'pre-line', margin: 0 }}>
            {hotel.heritageText}
          </p>
          {hotel.heritageStoryImage && (
            <div style={{ aspectRatio: '2/3', overflow: 'hidden' }}>
              <img src={hotel.heritageStoryImage} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          )}
        </div>
      </section>

      {hotel.heritageStats && hotel.heritageStats.length > 0 && (
        <section style={{ padding: 'clamp(40px,6vw,64px) clamp(20px,4vw,56px)' }}>
          <div
            className="heritage-stats"
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: `repeat(${hotel.heritageStats.length}, 1fr)`,
              gap: 24,
              textAlign: 'center',
            }}
          >
            {hotel.heritageStats.map((s, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,48px)', color: 'var(--espresso)', margin: '0 0 6px' }}>
                  {s.value}
                </p>
                <p style={{ fontSize: 12.5, color: 'var(--soft)', lineHeight: 1.5, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grille de story cards — Culture / Boutiques / Suivez-nous — déplacée le 05/10/2026
          (demande explicite) sous la ligne de chiffres clés, au lieu d'entre le bloc Destination
          et le texte complet « Notre histoire ». */}
      <section style={{ padding: '0 clamp(20px,4vw,56px) clamp(64px,9vw,104px)' }}>
        <div className="stories-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(28px,4vw,48px)' }}>
          {hotel.heritageCulture && (
            <StoryCard
              image={gallery[2] || hotel.heritageImage}
              category="Culture"
              title="La vie culturelle de l'hôtel"
              excerpt="Surnommé « l'Art Hôtel », 6 à 8 vernissages par an et partenaire de la RIAC depuis 6 ans."
              targetId="culture"
            />
          )}
          {hotel.boutiques && hotel.boutiques.length > 0 && (
            <StoryCard
              image={gallery[1] || hotel.heritageImage}
              category="Boutiques"
              title="Boutiques de l'hôtel"
              excerpt="Nandjika, corner Maxim's et produits italiens — la mode et la gastronomie s'invitent à l'hôtel."
              targetId="boutiques"
            />
          )}
          {hotel.socialProof && (
            <StoryCard
              image={gallery[0] || hotel.heritageImage}
              category="Communauté"
              title="Suivez-nous"
              excerpt={`${hotel.socialProof.facebookFans} fans sur Facebook et nos films officiels sur YouTube.`}
              targetId="suivez-nous"
            />
          )}
        </div>
      </section>

      {hotel.heritageCulture && (
        <section id="culture" style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)', background: 'var(--sand)', scrollMarginTop: 'var(--nav-h)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <p className="t-label" style={{ marginBottom: 16, textAlign: 'center', color: 'var(--terracotta)' }}>
              La vie culturelle de l'hôtel
            </p>
            <p className="t-body" style={{ fontSize: 16, lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {hotel.heritageCulture}
            </p>
          </div>
        </section>
      )}

      {hotel.boutiques && hotel.boutiques.length > 0 && (
        <section id="boutiques" style={{ padding: 'clamp(56px,8vw,96px) clamp(20px,4vw,56px)', scrollMarginTop: 'var(--nav-h)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="t-label" style={{ marginBottom: 24, textAlign: 'center', color: 'var(--terracotta)' }}>
              Boutiques de l'hôtel
            </p>
            <div className="boutiques-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {hotel.boutiques.map((b) => (
                <div key={b.name} style={{ textAlign: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 19, color: 'var(--espresso)', marginBottom: 10 }}>
                    {b.name}
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--soft)', lineHeight: 1.7, margin: 0 }}>{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hotel.socialProof && (
        <section
          id="suivez-nous"
          style={{
            padding: 'clamp(40px,6vw,64px) clamp(20px,4vw,56px)',
            background: 'var(--espresso)',
            color: 'var(--ivory)',
            textAlign: 'center',
            scrollMarginTop: 'var(--nav-h)',
          }}
        >
          <p className="t-label" style={{ color: 'var(--gold-2)', marginBottom: 14 }}>
            Suivez-nous
          </p>
          <p style={{ fontSize: 14, marginBottom: 18 }}>
            {hotel.socialProof.facebookFans} fans sur Facebook — {hotel.socialProof.facebookName}
          </p>
          {hotel.socialProof.youtube && hotel.socialProof.youtube.length > 0 && (
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              {hotel.socialProof.youtube.map((v) => (
                <a
                  key={v.url}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: 'var(--ivory)', textDecoration: 'underline', textUnderlineOffset: 4 }}
                >
                  {v.label}
                </a>
              ))}
            </div>
          )}
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .duo-grid { grid-template-columns: 1fr !important; row-gap: 40px !important; }
          .duo-ghost { display: none !important; }
          .stories-grid { grid-template-columns: 1fr !important; row-gap: 48px !important; }
          .histoire-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .heritage-stats { grid-template-columns: repeat(2, 1fr) !important; row-gap: 32px !important; }
          .boutiques-grid { grid-template-columns: 1fr !important; row-gap: 32px !important; }
        }
      `}</style>
    </main>
  )
}
