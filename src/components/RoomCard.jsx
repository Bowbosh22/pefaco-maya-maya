import { Link } from 'react-router-dom'

export default function RoomCard({ room }) {
  return (
    <Link to={`/chambres/${room.slug}`} className="room-card" style={{ display: 'block' }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', marginBottom: 20, background: 'var(--sand)' }}>
        <img
          src={room.coverImage}
          alt={room.name}
          className="room-card-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span style={{
          position: 'absolute', top: 16, left: 16, background: 'var(--ivory)',
          padding: '6px 14px', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--espresso)',
        }}>{room.category}</span>
      </div>
      <p className="t-label" style={{ marginBottom: 8 }}>{room.surface} m² · {room.guests} pers.</p>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, marginBottom: 8 }}>{room.name}</h3>
      <p className="t-body" style={{ marginBottom: 14 }}>{room.tagline}</p>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--terracotta)' }}>
        {room.price}{room.priceUnit ? ` / ${room.priceUnit}` : ''}
      </p>
    </Link>
  )
}
