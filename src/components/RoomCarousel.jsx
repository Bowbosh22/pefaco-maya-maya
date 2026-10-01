import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

// Icônes flèches / plein écran / fermeture, en SVG inline (pas de dépendance supplémentaire).
function IconArrow({ direction = 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconExpand() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

// Carrousel photo réel pour une chambre : flèches, pastilles de pagination, plein écran.
// Inspiré de l'arborescence de la page "Rooms" de larkhotels.com (photo + infos + 2 CTA, empilés par chambre).
// Exporté (en plus de RoomCarouselList par défaut) pour être réutilisé par les cartes de la grille
// "Et aussi" de la page Chambres (01/10/2026), qui reprend la même mécanique de carrousel/lightbox
// mais avec un gabarit de carte différent (façon la-samanna.com).
export function PhotoCarousel({ images, alt, indicative, onOpenLightbox }) {
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1

  const go = (delta, e) => {
    e.preventDefault()
    e.stopPropagation()
    setIndex((i) => (i + delta + images.length) % images.length)
  }

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        background: 'var(--sand)',
        cursor: 'zoom-in',
      }}
      onClick={() => onOpenLightbox(index)}
    >
      <img
        src={images[index]}
        alt={`${alt} — photo ${index + 1} sur ${images.length}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {indicative && (
        <span
          style={{
            position: 'absolute',
            bottom: 14,
            left: 16,
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

      <button
        type="button"
        aria-label="Voir en plein écran"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onOpenLightbox(index)
        }}
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(29,38,32,0.55)',
          color: 'var(--ivory)',
        }}
      >
        <IconExpand />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={(e) => go(-1, e)}
            className="carousel-arrow"
            style={{ left: 10 }}
          >
            <IconArrow direction="left" />
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={(e) => go(1, e)}
            className="carousel-arrow"
            style={{ right: 10 }}
          >
            <IconArrow direction="right" />
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 7,
            }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Aller à la photo ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIndex(i)
                }}
                style={{
                  width: i === index ? 18 : 7,
                  height: 7,
                  borderRadius: 4,
                  background: i === index ? 'var(--ivory)' : 'rgba(248,243,234,0.55)',
                  transition: 'width .3s var(--ease), background .3s var(--ease)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Visionneuse plein écran (lightbox) : mêmes flèches + pastilles, sur fond sombre.
export function Lightbox({ images, alt, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const hasMultiple = images.length > 1

  const go = (delta) => setIndex((i) => (i + delta + images.length) % images.length)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie photo — ${alt}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(15,18,16,0.94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px,4vw,48px)',
      }}
    >
      <button
        type="button"
        aria-label="Fermer la galerie"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ivory)',
          background: 'rgba(248,243,234,0.1)',
        }}
      >
        <IconClose />
      </button>

      <div
        style={{ position: 'relative', maxWidth: 1100, width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index]}
          alt={`${alt} — photo ${index + 1} sur ${images.length}`}
          style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={() => go(-1)}
              className="carousel-arrow"
              style={{ left: -8 }}
            >
              <IconArrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Photo suivante"
              onClick={() => go(1)}
              className="carousel-arrow"
              style={{ right: -8 }}
            >
              <IconArrow direction="right" />
            </button>
          </>
        )}

        <p
          style={{
            textAlign: 'center',
            marginTop: 18,
            color: 'var(--ivory)',
            fontFamily: 'var(--sans)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}

// Une chambre = une carte verticale : carrousel photo en haut, puis nom, caractéristiques,
// description et 2 CTA en bas — les cartes sont rangées 2 par 2 (grille), comme sur
// larkhotels.com, et non plus empilées les unes sous les autres en pleine largeur.
function RoomCard({ room }) {
  const hotel = useHotel()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const images = room.images && room.images.length > 0 ? room.images : [room.coverImage]

  return (
    <article>
      <PhotoCarousel
        images={images}
        alt={room.name}
        indicative={room.photoIndicative}
        onOpenLightbox={(i) => setLightboxIndex(i)}
      />

      <div style={{ paddingTop: 22 }}>
        <p className="t-label" style={{ marginBottom: 10 }}>
          {room.category}
        </p>
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(22px,2vw,28px)',
            color: 'var(--espresso)',
            marginBottom: 12,
            lineHeight: 1.15,
          }}
        >
          {room.name}
        </h2>

        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 12,
            color: 'var(--soft)',
            marginBottom: 14,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 22px',
          }}
        >
          {room.guests || room.bed || room.surface ? (
            <>
              {room.guests && (
                <span>
                  <span style={{ fontWeight: 700, letterSpacing: '0.06em', color: 'var(--espresso)' }}>PERSONNES</span> {room.guests}
                </span>
              )}
              {room.bed && (
                <span>
                  <span style={{ fontWeight: 700, letterSpacing: '0.06em', color: 'var(--espresso)' }}>LIT(S)</span> {room.bed}
                </span>
              )}
              {room.surface && (
                <span>
                  <span style={{ fontWeight: 700, letterSpacing: '0.06em', color: 'var(--espresso)' }}>SURFACE</span> {room.surface} m²
                </span>
              )}
            </>
          ) : (
            <span>Surface et capacité à confirmer</span>
          )}
        </p>

        <p className="t-body" style={{ marginBottom: 18 }}>
          {room.description}
        </p>

        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--terracotta)', marginBottom: 20 }}>
          {room.price}
          {room.priceUnit ? ` / ${room.priceUnit}` : ''}
          {room.priceEstimated && <span style={{ fontWeight: 400, color: 'var(--soft)' }}> (estimé)</span>}
          {room.pricePreferentialLabel && (
            <span style={{ display: 'block', fontWeight: 400, color: 'var(--soft)', fontSize: 11, marginTop: 4 }}>
              Tarif préférentiel : {room.pricePreferentialLabel}
            </span>
          )}
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link to={`/${hotel.slug}/chambres/${room.slug}`} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
            Voir la fiche
          </Link>
          <Link to={`/${hotel.slug}/reservation?room=${room.slug}`} className="btn-solid" style={{ flex: 1, justifyContent: 'center' }}>
            Réserver
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} alt={room.name} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </article>
  )
}

// Grille de toutes les chambres d'un hôtel, 2 par ligne (comme larkhotels.com/.../rooms),
// chacune avec son propre carrousel photo réel.
export default function RoomCarouselList({ rooms }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
        gap: 'clamp(32px,4vw,56px) clamp(24px,3vw,40px)',
      }}
      className="room-grid"
    >
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}
