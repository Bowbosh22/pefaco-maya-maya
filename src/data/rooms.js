// ATTENTION — contenu de démonstration pour la prospection.
// Les tarifs sont indicatifs (déduits d'un comparateur en ligne pour une nuit) et DOIVENT
// être confirmés avec l'hôtel avant toute mise en ligne réelle ou communication au client.
// Seules deux photos sont réelles (chambre-lit.jpg, chambre-vue-salon.jpg) ; les autres
// visuels sont des photos libres de droits représentatives, à remplacer par de vraies
// photos de l'établissement dès que possible (voir fiche de collecte de contenus).

export const rooms = [
  {
    id: 1,
    slug: 'classique',
    name: 'Chambre Classique',
    tagline: 'L\'essentiel, avec vue sur la ville.',
    category: 'Chambre',
    surface: 24,
    guests: 2,
    bed: 'Lit Queen ou deux lits simples',
    price: 'à partir de 95 000 FCFA',
    priceUnit: 'la nuit',
    description: "Climatisée, lumineuse, pensée pour l'étape courte comme pour le séjour d'affaires. À deux pas du hall et du restaurant.",
    features: ['Climatisation', 'Wi-Fi haut débit', 'Bureau', 'Coffre-fort', 'Télévision écran plat'],
    coverImage: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=1800&q=80',
    ],
  },
  {
    id: 2,
    slug: 'superieure',
    name: 'Chambre Supérieure',
    tagline: 'Plus d\'espace, un coin salon.',
    category: 'Chambre',
    surface: 30,
    guests: 2,
    bed: 'Lit King',
    price: 'à partir de 115 000 FCFA',
    priceUnit: 'la nuit',
    description: "Un coin salon séparé, un balcon ou une loggia selon l'étage, et les mêmes attentions que partout dans l'hôtel — jusqu'au petit-déjeuner servi tôt pour les vols du matin.",
    features: ['Climatisation', 'Coin salon', 'Balcon ou loggia', 'Wi-Fi haut débit', 'Minibar'],
    coverImage: '/assets/chambre-vue-salon.jpg',
    images: [
      '/assets/chambre-vue-salon.jpg',
    ],
  },
  {
    id: 3,
    slug: 'suite-junior',
    name: 'Suite Junior',
    tagline: 'La suite la plus demandée.',
    category: 'Suite',
    surface: 42,
    guests: 3,
    bed: 'Lit King + canapé',
    price: 'à partir de 140 000 FCFA',
    priceUnit: 'la nuit',
    description: "Un salon distinct derrière une claustra en bois, un vrai canapé, et une vue dégagée. C'est la chambre que l'hôtel montre en premier — et elle le mérite.",
    features: ['Salon séparé', 'Canapé', 'Balcon', 'Climatisation', 'Télévision écran plat', 'Minibar'],
    coverImage: '/assets/chambre-lit.jpg',
    images: [
      '/assets/chambre-lit.jpg',
      '/assets/chambre-vue-salon.jpg',
    ],
  },
  {
    id: 4,
    slug: 'suite-executive',
    name: 'Suite Executive',
    tagline: 'Pour les séjours qui comptent.',
    category: 'Suite',
    surface: 55,
    guests: 3,
    bed: 'Lit King + salon',
    price: 'Tarif sur demande',
    priceUnit: '',
    description: "La plus grande suite de l'hôtel, pour les séjours prolongés ou les visites qui ne laissent pas de place à l'approximation.",
    features: ['Salon séparé', 'Espace bureau', 'Climatisation', 'Accès prioritaire navette aéroport', 'Service en chambre'],
    coverImage: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=1800&q=80',
    ],
  },
]

export const getRoomBySlug = (slug) => rooms.find((r) => r.slug === slug)
