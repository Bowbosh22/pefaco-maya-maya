import { findRoomBySlug } from '../data/hotels'

export const RESERVATION_STEPS = [
  { n: 1, label: 'Dates & voyageurs' },
  { n: 2, label: 'Chambre' },
  { n: 3, label: 'Vos coordonnées' },
]

export const PREFERENTIAL_DISCOUNT_RATE = 0.1

// Interprète le paramètre d'URL "guests" (ex. "2 adultes, 1 enfant", "Groupe (5+)")
export function parseGuestsParam(value) {
  if (!value) return { adults: 2, children: 0 }
  if (/groupe/i.test(value)) return { adults: 5, children: 0 }
  const adultsMatch = value.match(/(\d+)\s*adulte/i)
  const childrenMatch = value.match(/(\d+)\s*enfant/i)
  return {
    adults: adultsMatch ? parseInt(adultsMatch[1], 10) : 2,
    children: childrenMatch ? parseInt(childrenMatch[1], 10) : 0,
  }
}

// Construit l'état initial du formulaire de réservation à partir des
// paramètres d'URL (arrivés depuis le widget "Vérifier la disponibilité" du hero,
// ou depuis un lien "Réserver" sur une fiche chambre).
export function buildInitialReservationForm(hotel, searchParams) {
  const roomParam = searchParams.get('room')
  const room = findRoomBySlug(hotel, roomParam) ? roomParam : ''
  const { adults, children } = parseGuestsParam(searchParams.get('guests'))
  return {
    room,
    arrival: searchParams.get('arrival') || '',
    departure: searchParams.get('departure') || '',
    adults,
    children,
    name: '',
    phone: '',
    email: '',
    message: '',
  }
}

export function formatGuestsSummary(adults, children) {
  const parts = [`${adults} adulte${adults > 1 ? 's' : ''}`]
  if (children > 0) parts.push(`${children} enfant${children > 1 ? 's' : ''}`)
  return parts.join(', ')
}

export function formatDateFr(value) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function nightsBetween(arrival, departure) {
  if (!arrival || !departure) return null
  const start = new Date(`${arrival}T00:00:00`)
  const end = new Date(`${departure}T00:00:00`)
  const nights = Math.round((end - start) / 86400000)
  return nights > 0 ? nights : null
}

export function extractPriceNumber(price) {
  const match = (price || '').replace(/\s/g, '').match(/(\d[\d]*)/)
  return match ? parseInt(match[1], 10) : null
}

export function formatFcfa(amount) {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}

// Tarif "préférentiel/membre" affiché en étape 2 : utilise le vrai tarif
// préférentiel Pefaco quand il existe (Maya-Maya), sinon calcule une remise
// indicative de 10% (Oyo, dont la grille préférentielle n'est pas encore connue).
export function computeMemberPrice(room) {
  if (room.pricePreferentialLabel) return room.pricePreferentialLabel
  const base = extractPriceNumber(room.price)
  if (!base) return null
  const discounted = Math.round((base * (1 - PREFERENTIAL_DISCOUNT_RATE)) / 1000) * 1000
  const prefix = room.price.match(/^[^\d]*/)?.[0] || ''
  return `${prefix}${formatFcfa(discounted)}`
}
