import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useHotel } from './HotelContext'

const ReservationDraftContext = createContext(null)

// Mémorise, le temps de la visite en cours (pas de persistance au-delà), la
// dernière réservation entamée par le visiteur — pour pouvoir la lui rappeler
// s'il quitte le parcours de réservation sans avoir envoyé sa demande.
export function ReservationDraftProvider({ children }) {
  const [draft, setDraft] = useState(null)

  const saveDraft = useCallback((hotelSlug, fields) => {
    setDraft({ hotelSlug, ...fields })
  }, [])

  const clearDraft = useCallback(() => setDraft(null), [])

  const value = useMemo(() => ({ draft, saveDraft, clearDraft }), [draft, saveDraft, clearDraft])

  return <ReservationDraftContext.Provider value={value}>{children}</ReservationDraftContext.Provider>
}

export function useReservationDraft() {
  const ctx = useContext(ReservationDraftContext)
  if (!ctx) {
    throw new Error("useReservationDraft doit être utilisé à l'intérieur d'un ReservationDraftProvider")
  }
  return ctx
}

// Un brouillon ne vaut la peine d'être rappelé que s'il contient déjà des
// dates ou une chambre choisie (pas juste un formulaire vide entrouvert).
function isMeaningfulDraft(draft) {
  return !!draft && (!!(draft.arrival && draft.departure) || !!draft.roomSlug)
}

// Hook partagé par la bannière de rappel et le bouton WhatsApp flottant (qui
// doit lui laisser la place) : la bannière n'apparaît que hors du parcours de
// réservation lui-même, et seulement pour l'hôtel auquel appartient le brouillon.
export function useReservationReminder() {
  const { draft } = useReservationDraft()
  const hotel = useHotel()
  const location = useLocation()
  const onReservationPage = location.pathname.endsWith('/reservation')
  const show = !onReservationPage && isMeaningfulDraft(draft) && draft.hotelSlug === hotel.slug
  return { show, draft: show ? draft : null }
}
