import { useNavigate } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import { useReservationDraft, useReservationReminder } from '../context/ReservationDraftContext'
import { formatDateFr, formatGuestsSummary, nightsBetween } from '../utils/reservation'

export default function ReservationReminderBanner() {
  const { show, draft } = useReservationReminder()
  const { clearDraft } = useReservationDraft()
  const hotel = useHotel()
  const navigate = useNavigate()

  if (!show) return null

  const nights = nightsBetween(draft.arrival, draft.departure)

  const resume = () => {
    const params = new URLSearchParams()
    if (draft.arrival) params.set('arrival', draft.arrival)
    if (draft.departure) params.set('departure', draft.departure)
    if (draft.adults) params.set('guests', formatGuestsSummary(draft.adults, draft.children || 0))
    if (draft.roomSlug) params.set('room', draft.roomSlug)
    navigate(`/${hotel.slug}/reservation${params.toString() ? `?${params}` : ''}`)
  }

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 500,
        background: 'var(--espresso)',
        color: 'var(--ivory)',
        borderTop: '1px solid rgba(248,243,234,0.15)',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.18)',
        padding: '14px clamp(16px,4vw,32px)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold-2)',
          flexShrink: 0,
        }}
      >
        Réservation en cours
      </span>
      <span style={{ fontSize: 13, flex: '1 1 240px', minWidth: 0, color: 'rgba(248,243,234,0.9)' }}>
        {draft.arrival && draft.departure && (
          <>
            {formatDateFr(draft.arrival)} → {formatDateFr(draft.departure)}
            {nights ? ` (${nights} nuit${nights > 1 ? 's' : ''})` : ''}
            {' · '}
          </>
        )}
        {draft.adults ? formatGuestsSummary(draft.adults, draft.children || 0) : null}
        {draft.roomName ? ` · ${draft.roomName}` : ''}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <button
          type="button"
          onClick={resume}
          className="btn-solid"
          style={{ background: 'var(--gold)', borderColor: 'var(--gold)', color: 'var(--espresso)' }}
        >
          Reprendre
        </button>
        <button
          type="button"
          onClick={clearDraft}
          aria-label="Annuler cette réservation en cours"
          className="link-underline"
          style={{ fontSize: 11, color: 'rgba(248,243,234,0.7)' }}
        >
          Annuler
        </button>
      </div>
    </div>
  )
}
