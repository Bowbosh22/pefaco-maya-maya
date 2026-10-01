import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

// Bloc "chambre signature" — calqué précisément sur belmond.com/en/hotels/europe/italy/
// splendido-mare-portofino/accommodation (01/10/2026, demande explicite de Mr. Mbemba, mesures
// prises directement sur une capture d'écran de cette page) : une grande photo à 60% de la largeur
// en pleine hauteur, et à droite deux photos empilées de hauteur quasi égale — mais celle du bas
// est volontairement plus étroite que celle du haut (elle ne va pas jusqu'au bord droit), ce qui
// crée un espace négatif irrégulier plutôt qu'une grille de rectangles tous identiques. Le même
// gabarit est utilisé pour les 4 chambres "signature" de l'hôtel, simplement inversé une fois sur
// deux (prop `reversed`) pour l'alternance.
export default function SignatureRoom({ room, reversed }) {
  const hotel = useHotel()
  const imgs = room.images && room.images.length >= 3 ? room.images : [room.coverImage, room.coverImage, room.coverImage]
  const [a, b, c] = imgs

  return (
    <section className="feat-room">
      <div className="belmond-grid" style={{ flexDirection: reversed ? 'row-reverse' : 'row' }}>
        <div className="bg-main ph">
          <img src={a} alt={room.name} />
          {room.photoIndicative && (
            <span
              style={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                background: 'rgba(29,38,32,0.75)',
                color: 'var(--ivory)',
                padding: '5px 12px',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Photo à titre indicatif
            </span>
          )}
        </div>
        <div className="bg-side">
          <div className="bg-top ph">
            <img src={b} alt={room.name} />
          </div>
          <div className="bg-bottom-row">
            <div className="bg-bottom ph">
              <img src={c} alt={room.name} />
            </div>
            <div className="bg-gap" />
          </div>
        </div>
      </div>

      <div className="feat-info">
        <p className="t-label" style={{ color: 'var(--terracotta)' }}>
          {room.category}
        </p>
        <h2>{room.name}</h2>
        {room.tagline && <p className="tagline">{room.tagline}</p>}
        <p className="desc">{room.description}</p>
        <p className="price">
          {room.price}
          {room.priceUnit ? ` / ${room.priceUnit}` : ''}
        </p>
        {room.pricePreferentialLabel && <p className="pref">Tarif préférentiel : {room.pricePreferentialLabel}</p>}
        <div className="cta-row">
          <Link to={`/${hotel.slug}/chambres/${room.slug}`} className="btn-outline">
            Voir la fiche
          </Link>
          <Link to={`/${hotel.slug}/reservation?room=${room.slug}`} className="btn-solid">
            Réserver
          </Link>
        </div>
      </div>
    </section>
  )
}
