// Icônes SVG (paths uniquement) pour les 6 onglets du rail de la page d'accueil.
export const railIcons = {
  arrival: <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 19.5h19M12 2.5l3 6.5 6 2.5-6 1-2 6-1-6-6-1 6-2.5z" />,
  chambres: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 18v-6a3 3 0 013-3h12a3 3 0 013 3v6M3 18h18M3 18v2M21 18v2M6 9V6a2 2 0 012-2h2a2 2 0 012 2v3"
    />
  ),
  restaurant: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 3v6a2 2 0 002 2v10M7 3v18M11 3v6M4 3v6M17 3c-1.5 0-2.5 1.5-2.5 4s1 4 1 6v8"
    />
  ),
  detente: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 20c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0 3.5 2 5 0" />
    </>
  ),
  reunions: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 20c0-3 3-5 7-5s7 2 7 5M16 5.5a3 3 0 010 6M18 12c3 0 5 2.5 5 5"
      />
    </>
  ),
  reservation: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path strokeLinecap="round" d="M3 9h18M8 2v4M16 2v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14l2 2 4-4" />
    </>
  ),
}

// Copy (titre/sous-titre) du rail, par hôtel et par onglet.
export const railCopyByHotel = {
  'maya-maya': {
    arrival: { tag: 'I — ARRIVÉE', top: 'À deux minutes', bot: "de l'aéroport" },
    chambres: { tag: 'II — CHAMBRES', top: 'Le calme', bot: 'après la piste' },
    restaurant: { tag: 'III — RESTAURANT', top: 'Petit-déjeuner tôt', bot: 'dîner tard' },
    detente: { tag: 'IV — DÉTENTE', top: 'Une pause', bot: 'entre deux vols' },
    reunions: { tag: 'V — RÉUNIONS & GROUPES', top: 'Vos équipes', bot: 'bien reçues' },
    reservation: { tag: 'VI — RÉSERVATION', top: 'Votre chambre', bot: 'vous attend' },
  },
  oyo: {
    arrival: { tag: 'I — ARRIVÉE', top: 'Au bord', bot: "de l'Alima" },
    chambres: { tag: 'II — CHAMBRES & SUITES', top: '116 chambres', bot: 'et suites' },
    restaurant: { tag: 'III — RESTAURANT LIBONGO', top: 'Repas', bot: "au bord de l'eau" },
    detente: { tag: 'IV — DÉTENTE', top: 'Piscine', bot: 'et tennis' },
    reunions: { tag: 'V — RÉUNIONS & GROUPES', top: 'Vos équipes', bot: 'bien reçues' },
    reservation: { tag: 'VI — RÉSERVATION', top: 'Votre chambre', bot: 'vous attend' },
  },
}

// Construit les 6 entrées du rail pour un hôtel donné, avec l'image associée
// (les onglets sans photo dédiée réutilisent une photo de chambre en cycle).
export function buildRailTabs(hotel) {
  const copy = railCopyByHotel[hotel.slug] || railCopyByHotel['maya-maya']
  const roomImage = (n) => hotel.rooms[n % hotel.rooms.length].coverImage

  return [
    { key: 'arrival', icon: railIcons.arrival, label: 'Arrivée', ...copy.arrival, sub: hotel.heroTagline, image: hotel.heroImage },
    {
      key: 'chambres',
      icon: railIcons.chambres,
      label: 'Chambres',
      ...copy.chambres,
      sub: `${hotel.rooms.length} catégories, du séjour d'une nuit à l'étape prolongée.`,
      image: roomImage(2),
    },
    { key: 'restaurant', icon: railIcons.restaurant, label: 'Restaurant', ...copy.restaurant, sub: hotel.restaurantText, image: roomImage(0) },
    { key: 'detente', icon: railIcons.detente, label: 'Détente', ...copy.detente, sub: hotel.amenitiesText, image: roomImage(3) },
    { key: 'reunions', icon: railIcons.reunions, label: 'Réunions & groupes', ...copy.reunions, sub: hotel.meetingsText, image: roomImage(1) },
    {
      key: 'reservation',
      icon: railIcons.reservation,
      label: 'Réserver',
      ...copy.reservation,
      sub: 'Par téléphone, WhatsApp, ou via les plateformes de réservation habituelles.',
      image: hotel.heroImage,
    },
  ]
}
