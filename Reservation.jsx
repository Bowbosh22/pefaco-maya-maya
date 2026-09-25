import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useHotel } from '../context/HotelContext'
import { useReservationDraft } from '../context/ReservationDraftContext'
import { findRoomBySlug } from '../data/hotels'
import GuestCounterRow from '../components/GuestCounterRow'
import {
  RESERVATION_STEPS,
  buildInitialReservationForm,
  formatGuestsSummary,
  formatDateFr,
  nightsBetween,
  computeMemberPrice,
} from '../utils/reservation'

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid var(--line)',
  background: 'var(--ivory)',
  fontFamily: 'var(--sans)',
  fontSize: 14,
}

export default function Reservation() {
  const hotel = useHotel()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { saveDraft, clearDraft } = useReservationDraft()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => buildInitialReservationForm(hotel, searchParams))
  const [memberView, setMemberView] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    setForm(buildInitialReservationForm(hotel, searchParams))
    setStep(1)
    setConfirmed(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel.slug, searchParams.toString()])

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const selectedRoom = findRoomBySlug(hotel, form.room)
  const nights = nightsBetween(form.arrival, form.departure)
  const closeReservation = () => navigate(`/${hotel.slug}`)
  const hasDates = !!(form.arrival && form.departure)

  // Dès que la demande contient des dates ou une chambre, on la garde en
  // mémoire pour pouvoir la rappeler au visiteur s'il quitte cette page sans
  // avoir envoyé sa demande (bannière de rappel affichée sur les autres pages).
  useEffect(() => {
    if (confirmed) return
    if (!hasDates && !form.room) return
    saveDraft(hotel.slug, {
      arrival: form.arrival,
      departure: form.departure,
      adults: form.adults,
      children: form.children,
      roomSlug: form.room,
      roomName: selectedRoom ? selectedRoom.name : null,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel.slug, form.arrival, form.departure, form.adults, form.children, form.room, confirmed])
  const selectRoom = (slug) => {
    setForm((prev) => ({ ...prev, room: slug }))
    setStep(3)
  }

  const summaryLines = [
    `Établissement : ${hotel.name}`,
    selectedRoom ? `Chambre souhaitée : ${selectedRoom.name}` : null,
    form.arrival ? `Arrivée : ${form.arrival}` : null,
    form.departure ? `Départ : ${form.departure}` : null,
    nights ? `Durée : ${nights} nuit${nights > 1 ? 's' : ''}` : null,
    `Voyageurs : ${formatGuestsSummary(form.adults, form.children)}`,
    `Nom : ${form.name}`,
    `Téléphone : ${form.phone}`,
    form.email ? `Email : ${form.email}` : null,
    form.message ? `Demandes spécifiques : ${form.message}` : null,
  ].filter(Boolean)

  const mailtoHref = `mailto:${hotel.bookingEmail || `contact@pefaco-${hotel.slug}.example`}?subject=${encodeURIComponent(
    `Demande de réservation — Pefaco ${hotel.shortName} — ${form.name || 'Site web'}`
  )}&body=${encodeURIComponent(summaryLines.join('\n'))}`

  const hasPreferentialPricing = hotel.rooms.some((room) => room.pricePreferentialLabel)
  const whatsappHref = hotel.whatsapp
    ? `https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(
        `Bonjour, je souhaite faire une demande de réservation.\n\n${summaryLines.join('\n')}`
      )}`
    : null
  const hasDirectContact = !!(hotel.phoneHref || hotel.whatsapp)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'var(--ivory)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'sticky', top: 0, zIndex: 2, background: 'var(--ivory)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px clamp(20px,4vw,56px) 0' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--espresso)', flexShrink: 0 }}>
            Pefaco <span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>{hotel.shortName}</span>
          </span>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              fontSize: 12,
              color: 'var(--soft)',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {form.arrival && form.departure && (
              <button type="button" onClick={() => setStep(1)} className="link-underline" style={{ color: 'var(--espresso)' }}>
                {formatDateFr(form.arrival)} → {formatDateFr(form.departure)}
                {nights ? ` · ${nights} nuit${nights > 1 ? 's' : ''}` : ''}
              </button>
            )}
            {step >= 1 && (
              <button type="button" onClick={() => setStep(1)} className="link-underline" style={{ color: 'var(--espresso)' }}>
                {formatGuestsSummary(form.adults, form.children)}
              </button>
            )}
            {selectedRoom && (
              <button type="button" onClick={() => setStep(2)} className="link-underline" style={{ color: 'var(--espresso)' }}>
                {selectedRoom.name}
              </button>
            )}
          </div>
          <button
            type="button"
            aria-label="Fermer la réservation"
            onClick={closeReservation}
            style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--espresso)', flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" d="M4 4l16 16M20 4L4 20" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', gap: 'clamp(20px,4vw,40px)', padding: '18px clamp(20px,4vw,56px) 0', overflowX: 'auto' }}>
          {RESERVATION_STEPS.map((s) => {
            const enabled = s.n === 1 || (s.n === 2 && hasDates) || (s.n === 3 && selectedRoom)
            const isActive = step === s.n
            return (
              <button
                key={s.n}
                type="button"
                disabled={!enabled}
                onClick={() => enabled && setStep(s.n)}
                style={{
                  padding: '0 0 16px',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--espresso)' : enabled ? 'var(--soft)' : 'rgba(29,38,32,0.3)',
                  borderBottom: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  cursor: enabled ? 'pointer' : 'default',
                }}
              >
                {s.n}. {s.label}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ flex: 1, padding: 'clamp(32px,6vw,64px) clamp(20px,4vw,56px) clamp(64px,10vw,96px)' }}>
        {step === 1 && (
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <p className="eyebrow">
              <span className="t-label">Étape 1</span>
            </p>
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(28px,4vw,42px)', color: 'var(--espresso)', marginBottom: 32 }}>
              Vos dates de séjour
            </h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 8 }}>
              <div>
                <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
                  Arrivée
                </label>
                <input type="date" value={form.arrival} onChange={handleChange('arrival')} style={inputStyle} />
              </div>
              <div>
                <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
                  Départ
                </label>
                <input type="date" value={form.departure} min={form.arrival || undefined} onChange={handleChange('departure')} style={inputStyle} />
              </div>
            </div>
            {form.arrival && form.departure && !nights && (
              <p style={{ fontSize: 12, color: 'var(--terracotta)', marginBottom: 8 }}>
                La date de départ doit être après la date d'arrivée.
              </p>
            )}
            <div style={{ marginTop: 32 }}>
              <p className="t-label" style={{ marginBottom: 4 }}>
                Voyageurs
              </p>
              <GuestCounterRow
                label="Adultes"
                sublabel="13 ans et plus"
                min={1}
                value={form.adults}
                onChange={(v) => setForm((prev) => ({ ...prev, adults: v }))}
              />
              <GuestCounterRow
                label="Enfants"
                sublabel="0 à 12 ans"
                min={0}
                value={form.children}
                onChange={(v) => setForm((prev) => ({ ...prev, children: v }))}
              />
            </div>
            <button
              type="button"
              className="btn-solid"
              style={{ width: '100%', justifyContent: 'center', marginTop: 32 }}
              disabled={!hasDates || !nights}
              onClick={() => setStep(2)}
            >
              Voir les chambres disponibles
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p className="eyebrow">
              <span className="t-label">Étape 2</span>
            </p>
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(28px,4vw,42px)', color: 'var(--espresso)', marginBottom: 8 }}>
              Choisissez votre chambre
            </h1>
            <p className="t-body" style={{ marginBottom: 24 }}>
              {formatDateFr(form.arrival)} → {formatDateFr(form.departure)} · {formatGuestsSummary(form.adults, form.children)}
            </p>
            <div style={{ display: 'inline-flex', border: '1px solid var(--line)', marginBottom: 8 }}>
              <button
                type="button"
                onClick={() => setMemberView(false)}
                style={{
                  padding: '10px 20px',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: memberView ? 'transparent' : 'var(--espresso)',
                  color: memberView ? 'var(--espresso)' : 'var(--ivory)',
                }}
              >
                {hasPreferentialPricing ? 'Tarif de base' : 'Tarif non-membre'}
              </button>
              <button
                type="button"
                onClick={() => setMemberView(true)}
                style={{
                  padding: '10px 20px',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: memberView ? 'var(--espresso)' : 'transparent',
                  color: memberView ? 'var(--ivory)' : 'var(--espresso)',
                }}
              >
                {hasPreferentialPricing ? 'Tarif préférentiel' : 'Tarif membre (-10%)'}
              </button>
            </div>
            <p style={{ fontSize: 11, color: 'var(--soft)', marginBottom: 32 }}>
              {hasPreferentialPricing
                ? "Tarif préférentiel officiel Pefaco (grille tarifaire communiquée par l'hôtel) — conditions d'éligibilité à confirmer avec Pefaco."
                : "Aperçu illustratif d'un programme fidélité — à activer avec une vraie création de compte si ce module est retenu."}
            </p>
            <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              {hotel.rooms.map((room) => {
                const isSelected = room.slug === form.room
                const memberPrice = memberView ? computeMemberPrice(room) : null
                return (
                  <div key={room.slug} style={{ border: isSelected ? '1px solid var(--gold)' : '1px solid var(--line)', padding: 16, position: 'relative' }}>
                    {isSelected && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          zIndex: 1,
                          background: 'var(--gold)',
                          color: 'var(--ivory)',
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '4px 10px',
                        }}
                      >
                        Présélectionnée
                      </span>
                    )}
                    <div style={{ aspectRatio: '4/3', overflow: 'hidden', marginBottom: 16 }}>
                      <img src={room.coverImage} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {room.photoIndicative && (
                      <p style={{ fontSize: 10, color: 'var(--soft)', marginBottom: 8 }}>Photo à titre indicatif</p>
                    )}
                    <p className="t-label" style={{ marginBottom: 8 }}>
                      {room.category}
                    </p>
                    <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 20, marginBottom: 8, color: 'var(--espresso)' }}>
                      {room.name}
                    </h3>
                    <p style={{ fontSize: 12, color: 'var(--soft)', marginBottom: 12 }}>
                      {room.surface ? `${room.surface} m² · jusqu'à ${room.guests} pers.` : "Surface à confirmer"}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                      {memberPrice ? (
                        <>
                          <span style={{ fontSize: 13, color: 'var(--soft)', textDecoration: 'line-through' }}>{room.price}</span>
                          <span style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--terracotta)' }}>{memberPrice}</span>
                          <span style={{ fontSize: 11, color: 'var(--terracotta)', fontWeight: 600 }}>
                            {room.pricePreferentialLabel ? 'Tarif préférentiel' : 'Tarif membre'}
                          </span>
                        </>
                      ) : (
                        <span style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--espresso)' }}>{room.price}</span>
                      )}
                      {room.priceUnit && <span style={{ fontSize: 11, color: 'var(--soft)' }}>{room.priceUnit}</span>}
                      {room.priceEstimated && <span style={{ fontSize: 11, color: 'var(--soft)' }}>Tarif estimé, à confirmer avec Pefaco</span>}
                    </div>
                    <button type="button" className="btn-solid" style={{ width: '100%', justifyContent: 'center' }} onClick={() => selectRoom(room.slug)}>
                      Sélectionner
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {step === 3 && confirmed && (
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: '1.4px solid var(--gold)',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 28px',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              <span className="t-label">Demande préparée</span>
            </p>
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,4vw,38px)', color: 'var(--espresso)', marginBottom: 20 }}>
              Merci, {form.name || 'votre demande'} !
            </h1>
            <p className="t-body" style={{ marginBottom: 32 }}>
              {hasDirectContact
                ? `Votre messagerie s'est ouverte avec un e-mail déjà rédigé pour Pefaco ${hotel.shortName} — il ne reste qu'à l'envoyer pour transmettre votre demande. Si rien ne s'est ouvert, utilisez WhatsApp ou le téléphone ci-dessous.`
                : "Un e-mail a été préparé dans votre messagerie avec le détail de votre demande — il ne reste qu'à l'envoyer. Les coordonnées directes de cet établissement sont encore en cours de confirmation avec Pefaco."}
            </p>
            <div style={{ background: 'var(--sand)', padding: 24, marginBottom: 28, textAlign: 'left' }}>
              <p className="t-label" style={{ marginBottom: 12 }}>
                Récapitulatif de la demande
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--espresso)' }}>
                <span>{selectedRoom ? selectedRoom.name : 'Chambre à préciser'}</span>
                <span>
                  {formatDateFr(form.arrival)} → {formatDateFr(form.departure)}
                  {nights ? ` (${nights} nuit${nights > 1 ? 's' : ''})` : ''}
                </span>
                <span>{formatGuestsSummary(form.adults, form.children)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {hotel.phoneHref && (
                <a href={hotel.phoneHref} className="btn-outline">
                  Appeler maintenant
                </a>
              )}
              {whatsappHref && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Envoyer par WhatsApp
                </a>
              )}
              <button type="button" className="btn-solid" onClick={closeReservation}>
                Retour à l'accueil
              </button>
            </div>
            <button type="button" onClick={() => setConfirmed(false)} className="link-underline" style={{ fontSize: 11, color: 'var(--soft)', marginTop: 24 }}>
              Modifier ma demande
            </button>
          </div>
        )}

        {step === 3 && !confirmed && (
          <div className="reservation-grid" style={{ display: 'grid', gap: 56, gridTemplateColumns: '0.8fr 1.2fr', maxWidth: 1000, margin: '0 auto' }}>
            <div>
              <p className="eyebrow">
                <span className="t-label">Étape 3</span>
              </p>
              <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(26px,4vw,38px)', color: 'var(--espresso)', marginBottom: 24 }}>
                Vos coordonnées
              </h1>
              <div style={{ background: 'var(--sand)', padding: 24, marginBottom: 24 }}>
                <p className="t-label" style={{ marginBottom: 12 }}>
                  Récapitulatif
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--espresso)' }}>
                  <span>
                    {selectedRoom ? selectedRoom.name : 'Chambre à préciser'}{' '}
                    <button type="button" onClick={() => setStep(2)} className="link-underline" style={{ fontSize: 11, marginLeft: 6, color: 'var(--soft)' }}>
                      Modifier
                    </button>
                  </span>
                  <span>
                    {formatDateFr(form.arrival)} → {formatDateFr(form.departure)}
                    {nights ? ` (${nights} nuit${nights > 1 ? 's' : ''})` : ''}{' '}
                    <button type="button" onClick={() => setStep(1)} className="link-underline" style={{ fontSize: 11, marginLeft: 6, color: 'var(--soft)' }}>
                      Modifier
                    </button>
                  </span>
                  <span>{formatGuestsSummary(form.adults, form.children)}</span>
                </div>
              </div>
              {(hotel.phoneHref || whatsappHref) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {hotel.phoneHref && (
                    <a href={hotel.phoneHref} className="btn-outline" style={{ justifyContent: 'center' }}>
                      Appeler maintenant
                    </a>
                  )}
                  {whatsappHref && (
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center' }}>
                      Envoyer par WhatsApp
                    </a>
                  )}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                window.location.href = mailtoHref
                setConfirmed(true)
                clearDraft()
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
                    Nom complet
                  </label>
                  <input required value={form.name} onChange={handleChange('name')} style={inputStyle} />
                </div>
                <div>
                  <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
                    Téléphone
                  </label>
                  <input type="tel" required value={form.phone} onChange={handleChange('phone')} style={inputStyle} />
                </div>
              </div>
              <div>
                <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
                  Email (facultatif)
                </label>
                <input type="email" value={form.email} onChange={handleChange('email')} style={inputStyle} />
              </div>
              <div>
                <label className="t-label" style={{ display: 'block', marginBottom: 8 }}>
                  Demandes spécifiques
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Lit bébé, étage calme, arrivée tardive après 22h..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
                <button type="submit" className="btn-solid" style={{ alignSelf: 'flex-start' }}>
                  Envoyer la demande
                </button>
                {whatsappHref && form.name && form.phone && (
                  <a
                    href={`https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(
                      `Bonjour, je souhaite faire une demande de réservation.\n\n${summaryLines.join('\n')}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    onClick={() => {
                      setConfirmed(true)
                      clearDraft()
                    }}
                  >
                    Envoyer via WhatsApp
                  </a>
                )}
              </div>
              <p className="t-body" style={{ fontSize: 12, color: 'var(--soft)' }}>
                {hasDirectContact
                  ? '« Envoyer la demande » ouvre votre messagerie avec un e-mail déjà rédigé — il ne reste qu\'à l\'envoyer.'
                  : "Les coordonnées directes de cet établissement sont en cours de confirmation avec Pefaco. « Envoyer la demande » prépare en attendant votre e-mail."}
              </p>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .reservation-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
