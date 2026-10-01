import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import { PhotoCarousel, Lightbox } from './RoomCarousel'

// Carte pour la grille "Et aussi" de la page Chambres (01/10/2026) — les catégories qui ne font pas
// partie des 4 chambres signature. Réutilise le même carrousel photo + lightbox que les autres
// cartes du site (RoomCarousel.jsx), mais avec un gabarit de carte plus compact, façon la grille de
// réservation de belmond.com/.../la-samanna-st-martin (3 colonnes, infos resserrées, "Voir la
// fiche" / "Réserver" en bas).
export default function OtherRoomCard({ room }) {
  const hotel = useHotel()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const images = room.images && room.images.length > 0 ? room.images : [room.coverImage]

  const hasDims = room.guests || room.bed || room.surface
  const dims = hasDims
    ? [room.surface ? `${room.surface} m²` : null, room.guests ? `${room.guests} pers.` : null].filter(Boolean).join(' · ')
    : 'Surface et capacité à confirmer'

  return (
    <div className="other-card">
      <PhotoCarousel images={images} alt={room.name} indicative={room.photoIndicative} onOpenLightbox={(i) => setLightboxIndex(i)} />

      <div className="other-info">
        <p className="t-label" style={{ color: 'var(--terracotta)' }}>
          {room.category}
        </p>
        <h3>{room.name}</h3>
        <p className="size-sleeps">{dims}</p>
        <p className="price2">
          {room.price}
          {room.priceUnit ? ` / ${room.priceUnit}` : ''}
        </p>
        {room.pricePreferentialLabel && (
          <p className="pref2">Tarif préférentiel : {room.pricePreferentialLabel}</p>
        )}
        <div className="cta-row">
          <Link to={`/${hotel.slug}/chambres/${room.slug}`} className="btn-outline small">
            Voir la fiche
          </Link>
          <Link to={`/${hotel.slug}/reservation?room=${room.slug}`} className="btn-solid small">
            Réserver
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} alt={room.name} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  )
}
