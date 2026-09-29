import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import GuestCounterRow from './GuestCounterRow'
import { formatGuestsSummary } from '../utils/reservation'
import { toISODate, getMonthGrid, monthLabel, formatDateShort, addMonths } from '../utils/calendar'

function IconCalendar() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 8.5a3 3 0 1 0 0-6M21.5 19c0-2.6-1.9-4.8-4.5-5.4" strokeLinecap="round" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  )
}

// Un mois du calendrier (grille de jours cliquables), utilisé 2x côte à côte dans DatePopover.
function MonthGrid({ year, month, pendingArrival, pendingDeparture, todayIso, onPick }) {
  const cells = getMonthGrid(year, month)
  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <p
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 12,
          textTransform: 'capitalize',
          color: 'var(--espresso)',
        }}
      >
        {monthLabel(year, month)}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
          <span
            key={i}
            style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--soft)', paddingBottom: 4 }}
          >
            {d}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={i} />
          const iso = toISODate(date)
          const disabled = iso < todayIso
          const isArrival = iso === pendingArrival
          const isDeparture = iso === pendingDeparture
          const inRange = pendingArrival && pendingDeparture && iso > pendingArrival && iso < pendingDeparture
          let background = 'transparent'
          let color = 'var(--espresso)'
          if (isArrival || isDeparture) {
            background = 'var(--espresso)'
            color = 'var(--ivory)'
          } else if (inRange) {
            background = 'var(--sand)'
          }
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onPick(iso)}
              className="cal-day"
              style={{
                aspectRatio: '1',
                fontSize: 12,
                fontFamily: 'var(--sans)',
                background,
                color: disabled ? 'rgba(29,38,32,0.25)' : color,
                cursor: disabled ? 'default' : 'pointer',
                borderRadius: isArrival || isDeparture ? '50%' : 0,
              }}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DatePopover({ arrival, departure, onApply, onClear }) {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [pendingArrival, setPendingArrival] = useState(arrival || '')
  const [pendingDeparture, setPendingDeparture] = useState(departure || '')
  const todayIso = toISODate(today)
  const next = addMonths(view, 1)

  const handlePick = (iso) => {
    if (!pendingArrival || (pendingArrival && pendingDeparture)) {
      setPendingArrival(iso)
      setPendingDeparture('')
    } else if (iso <= pendingArrival) {
      setPendingArrival(iso)
      setPendingDeparture('')
    } else {
      setPendingDeparture(iso)
    }
  }

  return (
    <div className="search-popover" style={{ width: 'min(560px, 88vw)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <button type="button" aria-label="Mois précédent" onClick={() => setView((v) => addMonths(v, -1))} className="cal-nav">
          ‹
        </button>
        <div className="cal-months" style={{ display: 'flex', gap: 24, flex: 1 }}>
          <MonthGrid
            year={view.year}
            month={view.month}
            pendingArrival={pendingArrival}
            pendingDeparture={pendingDeparture}
            todayIso={todayIso}
            onPick={handlePick}
          />
          <MonthGrid
            year={next.year}
            month={next.month}
            pendingArrival={pendingArrival}
            pendingDeparture={pendingDeparture}
            todayIso={todayIso}
            onPick={handlePick}
          />
        </div>
        <button type="button" aria-label="Mois suivant" onClick={() => setView((v) => addMonths(v, 1))} className="cal-nav">
          ›
        </button>
      </div>
      <p style={{ fontSize: 11, color: 'var(--soft)', marginTop: 8, textAlign: 'center' }}>
        Aucune disponibilité en temps réel — sélectionnez vos dates souhaitées, l'hôtel confirme ensuite par téléphone,
        WhatsApp ou e-mail.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
        <button
          type="button"
          className="link-underline"
          style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--espresso)' }}
          onClick={() => {
            setPendingArrival('')
            setPendingDeparture('')
            onClear()
          }}
        >
          Effacer
        </button>
        <button
          type="button"
          className="btn-solid"
          disabled={!pendingArrival || !pendingDeparture}
          onClick={() => onApply(pendingArrival, pendingDeparture)}
        >
          Appliquer
        </button>
      </div>
    </div>
  )
}

function GuestsPopover({ adults, children, onChangeAdults, onChangeChildren, onDone }) {
  return (
    <div className="search-popover" style={{ width: 'min(320px, 86vw)' }}>
      <GuestCounterRow label="Adultes" sublabel="13 ans et plus" min={1} value={adults} onChange={onChangeAdults} />
      <GuestCounterRow label="Enfants" sublabel="0 à 12 ans" min={0} value={children} onChange={onChangeChildren} />
      <button type="button" className="btn-solid" style={{ width: '100%', justifyContent: 'center', marginTop: 14 }} onClick={onDone}>
        Terminé
      </button>
    </div>
  )
}

// Barre de recherche compacte (dates + voyageurs), inspirée de la barre "QUAND / LES INVITÉS"
// de larkhotels.com — affichée en haut de la page Chambres, puis reste accessible en bas de
// l'écran une fois qu'on a scrollé au-delà de sa position d'origine.
export default function RoomSearchBar() {
  const hotel = useHotel()
  const navigate = useNavigate()
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [openPanel, setOpenPanel] = useState(null)

  const sentinelRef = useRef(null)
  const barRef = useRef(null)
  const [stuck, setStuck] = useState(false)
  const [barHeight, setBarHeight] = useState(64)

  useEffect(() => {
    if (barRef.current) setBarHeight(barRef.current.offsetHeight)
  }, [])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hasDates = arrival && departure
  const dateLabel = hasDates ? `${formatDateShort(arrival)} → ${formatDateShort(departure)}` : 'Ajouter des dates'
  const guestsLabel = formatGuestsSummary(adults, children)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (arrival) params.set('arrival', arrival)
    if (departure) params.set('departure', departure)
    params.set('guests', formatGuestsSummary(adults, children))
    setOpenPanel(null)
    navigate(`/${hotel.slug}/reservation?${params}`)
  }

  return (
    <>
      <div ref={sentinelRef} />
      {stuck && <div style={{ height: barHeight }} />}

      {openPanel && (
        <div
          onClick={() => setOpenPanel(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 490, background: 'transparent' }}
        />
      )}

      <div
        ref={barRef}
        style={
          stuck
            ? {
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 20,
                zIndex: 500,
                display: 'flex',
                justifyContent: 'center',
                padding: '0 20px',
              }
            : { display: 'flex', justifyContent: 'center', margin: '0 0 clamp(32px,5vw,48px)' }
        }
      >
        <div className="search-bar-wrap" style={{ position: 'relative' }}>
          <div className="search-bar">
            <button type="button" className="search-chip" onClick={() => setOpenPanel((p) => (p === 'dates' ? null : 'dates'))}>
              <IconCalendar />
              <span>
                <span className="search-chip-label">Quand</span>
                <span className="search-chip-value">{dateLabel}</span>
              </span>
            </button>
            <span className="search-divider" />
            <button type="button" className="search-chip" onClick={() => setOpenPanel((p) => (p === 'guests' ? null : 'guests'))}>
              <IconUsers />
              <span>
                <span className="search-chip-label">Voyageurs</span>
                <span className="search-chip-value">{guestsLabel}</span>
              </span>
            </button>
            <button type="button" aria-label="Rechercher" onClick={handleSearch} className="search-submit">
              <IconSearch />
            </button>
          </div>

          {openPanel === 'dates' && (
            <div className="search-popover-anchor">
              <DatePopover
                arrival={arrival}
                departure={departure}
                onClear={() => {
                  setArrival('')
                  setDeparture('')
                }}
                onApply={(a, d) => {
                  setArrival(a)
                  setDeparture(d)
                  setOpenPanel(null)
                }}
              />
            </div>
          )}

          {openPanel === 'guests' && (
            <div className="search-popover-anchor">
              <GuestsPopover
                adults={adults}
                children={children}
                onChangeAdults={setAdults}
                onChangeChildren={setChildren}
                onDone={() => setOpenPanel(null)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
