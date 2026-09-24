import { Link } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'

// Carte utilisée sur la page listant toutes les chambres d'un hôtel.
export default function RoomCard({ room }) {
  const hotel = useHotel()
  return (
    <Link to={`/${hotel.slug}/chambres/${room.slug}`} className="room-card" style={{ display: 'block' }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', marginBottom: 20, background: 'var(--sand)' }}>
        <img src={room.coverImage} alt={room.name} className="room-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            background: 'var(--ivory)',
            padding: '6px 14px',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--espresso)',
          }}
        >
          {room.category}
        </span>
        {room.photoIndicative && (
          <span
            style={{
              position: 'absolute',
              bottom: 12,
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
      </div>
      <p className="t-label" style={{ marginBottom: 8 }}>
        {room.surface ? `${room.surface} m² · ${room.guests} pers.` : 'Surface et capacité à confirmer'}
      </p>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, marginBottom: 8 }}>{room.name}</h3>
      <p className="t-body" style={{ marginBottom: 14 }}>
        {room.tagline || room.description}
      </p>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--terracotta)' }}>
        {room.price}
        {room.priceUnit ? ` / ${room.priceUnit}` : ''}
        {room.priceEstimated && <span style={{ fontWeight: 400, color: 'var(--soft)' }}> (estimé)</span>}
      </p>
      {room.pricePreferentialLabel && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--soft)', marginTop: 2 }}>
          Tarif préférentiel : {room.pricePreferentialLabel}
        </p>
      )}
    </Link>
  )
}
