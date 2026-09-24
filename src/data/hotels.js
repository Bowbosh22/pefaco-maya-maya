// Modèle de données des hôtels — reconstruit à l'identique depuis la plaquette
// officielle Pefaco Maya-Maya et depuis les informations disponibles pour Oyo.
// Toutes les valeurs (tarifs, textes, coordonnées) proviennent de la version
// précédemment publiée du site ; voir claude/PEFACO-MAYA-MAYA-SUIVI.md pour
// l'historique des sources.

import oyoHero from '../assets/images/oyo-hero.jpg'
import mayaMayaHero from '../assets/images/maya-maya-hero.jpg'
import oyoClassique1 from '../assets/images/oyo-chambre-classique-1.jpg'
import oyoClassique2 from '../assets/images/oyo-chambre-classique-2.jpg'
import oyoKitchenette1 from '../assets/images/oyo-chambre-kitchenette-1.jpg'
import oyoKitchenette2 from '../assets/images/oyo-chambre-kitchenette-2.jpg'
import oyoSuiteMaster2 from '../assets/images/oyo-suite-master-2.jpg'
import oyoSuiteMaster1 from '../assets/images/oyo-suite-master-1.jpg'
import oyoSuiteMinisterial1 from '../assets/images/oyo-suite-ministerial-1.jpg'
import mmStandardMayaMaya from '../assets/images/maya-maya-standard-maya-maya.jpg'
import mmExecutive from '../assets/images/maya-maya-executive.jpg'
import mmMasterSuite from '../assets/images/maya-maya-master-suite.jpg'
import mmSuitePanoramiquePresidentielle from '../assets/images/maya-maya-suite-panoramique-presidentielle.jpg'
import mmRestaurant1 from '../assets/images/maya-maya-restaurant-1.jpg'
import mmDetente from '../assets/images/maya-maya-detente.jpg'
import mmRestaurant2 from '../assets/images/maya-maya-restaurant-2.jpg'
import mmRestaurant3 from '../assets/images/maya-maya-restaurant-3.jpg'
import oyoRestaurant from '../assets/images/oyo-restaurant.jpg'
import mmStandardMbote from '../assets/images/maya-maya-standard-mbote.jpg'
import mmSuiteLuxeMinisterielle from '../assets/images/maya-maya-suite-luxe-ministerielle.jpg'
import mmBilangaTwin from '../assets/images/maya-maya-bilanga-twin.jpg'

export const hotels = [
  {
    slug: 'maya-maya',
    name: 'Pefaco Hotel Maya-Maya',
    shortName: 'Maya-Maya',
    city: 'Brazzaville',
    heroTagline: "À deux minutes de l'aéroport international de Brazzaville.",
    intro: `Un 5 étoiles pensé pour les voyageurs pressés —
et pour ceux qui veulent prendre leur temps.`,
    officialPhotos: false,
    heroImage: mayaMayaHero,
    restaurantImage: mmRestaurant1,
    restaurantGallery: [mmRestaurant1, mmRestaurant2, mmRestaurant3],
    detenteImage: mmDetente,
    phone: '+242 05 604 8030 / +242 05 604 8035',
    phoneHref: 'tel:+242056048030',
    whatsapp: '242056048030',
    whatsappMessage: 'Bonjour, je souhaite réserver une chambre à l\'hôtel Pefaco Maya-Maya.',
    bookingEmail: 'infos@pefacohotels.com',
    website: 'https://www.pefacohotelmayamaya.com',
    address: "Avenue de l'aéroport, à proximité de l'aéroport international Maya-Maya, Brazzaville",
    reception: '24h/24, 7j/7',
    practicalInfo: {
      checkIn: 'À partir de 14h00',
      checkOut: 'Avant 12h00',
      cancellation:
        "Annulation gratuite jusqu'à 48h avant l'arrivée ; au-delà, la première nuit est facturée.",
      parking: 'Parking privé gratuit sur place.',
      pets: "Animaux de compagnie non admis, à l'exception des animaux d'assistance.",
    },
    restaurantName: "Le restaurant de l'hôtel",
    restaurantText:
      "Un buffet international pensé pour les horaires de vol — service continu en journée, carte du soir pour les clients en étape comme pour les habitués de Brazzaville.",
    amenitiesText:
      "Piscine extérieure et bar, pour souffler avant ou après le vol — ou simplement prendre le temps, entre deux rendez-vous à Brazzaville.",
    meetingsText:
      "Pour les séjours en équipe : espaces de réception et navette aéroport, avec un accès prioritaire pour les groupes en Suite Executive.",
    locationTitle: 'L\'étape aérienne, sans stress.',
    locationText:
      "À deux minutes de l'aéroport international de Maya-Maya. Le vol atterrit, la navette attend, la chambre est déjà prête.",
    experiences: [
      {
        title: "L'étape d'affaires",
        text: "Bureau, Wi-Fi haut débit, climatisation — tout pour une nuit efficace entre deux vols.",
      },
      {
        title: 'La détente',
        text: "Piscine extérieure et bar, pour souffler avant ou après le vol.",
      },
      {
        title: 'Réunions & groupes',
        text: "Espaces de réception et navette aéroport, pour les séjours en équipe.",
      },
    ],
    testimonial:
      "Un accueil chaleureux et un emplacement idéal pour ceux qui arrivent ou repartent par l'aéroport — exactement ce qu'on attend d'un hôtel d'affaires à Brazzaville.",
    rooms: [
      {
        id: 1,
        slug: 'standard-mbote',
        name: 'Chambre standard MBOTE',
        tagline: "L'essentiel, à l'accueil chaleureux.",
        category: 'Chambre',
        surface: null,
        guests: null,
        bed: null,
        price: '180 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 110000,
        pricePreferentialLabel: '110 000 FCFA',
        description:
          "Climatisée et lumineuse, pensée pour l'étape courte comme pour le séjour d'affaires. À deux pas du hall et du restaurant.",
        features: ['Climatisation', 'Wi-Fi haut débit', 'Bureau', 'Coffre-fort', 'Télévision écran plat'],
        coverImage: mmStandardMbote,
        images: [mmStandardMbote],
      },
      {
        id: 2,
        slug: 'standard-maya-maya',
        name: 'Chambre standard Maya-Maya',
        tagline: 'La signature de la maison.',
        category: 'Chambre',
        surface: null,
        guests: null,
        bed: null,
        price: '180 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 110000,
        pricePreferentialLabel: '110 000 FCFA',
        description:
          "Même confort que la Chambre standard MBOTE, dans l'aile historique de l'hôtel. Climatisation, bureau et connexion Wi-Fi haut débit pour un séjour efficace.",
        features: ['Climatisation', 'Wi-Fi haut débit', 'Bureau', 'Coffre-fort', 'Télévision écran plat'],
        coverImage: mmStandardMayaMaya,
        images: [mmStandardMayaMaya],
      },
      {
        id: 3,
        slug: 'bilanga-twin',
        name: 'Chambre Bilanga Twin pax',
        tagline: 'Deux lits, pour voyager à deux.',
        category: 'Chambre',
        surface: null,
        guests: null,
        bed: null,
        price: '195 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 125000,
        pricePreferentialLabel: '125 000 FCFA',
        photoIndicative: true,
        description:
          "Pensée pour les voyageurs en duo ou les collègues en déplacement professionnel. Climatisation, minibar et tout le confort Pefaco.",
        features: ['Climatisation', 'Wi-Fi haut débit', 'Minibar', 'Télévision écran plat'],
        coverImage: mmBilangaTwin,
        images: [mmBilangaTwin],
      },
      {
        id: 4,
        slug: 'executive',
        name: 'Chambre Exécutive',
        tagline: 'Plus d\'espace, un coin salon.',
        category: 'Chambre',
        surface: null,
        guests: null,
        bed: null,
        price: '260 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 154000,
        pricePreferentialLabel: '154 000 FCFA',
        description:
          "Un coin salon séparé et les mêmes attentions que partout dans l'hôtel — jusqu'au petit-déjeuner servi tôt pour les vols du matin.",
        features: ['Climatisation', 'Coin salon', 'Wi-Fi haut débit', 'Minibar', 'Bureau'],
        coverImage: mmExecutive,
        images: [mmExecutive],
      },
      {
        id: 5,
        slug: 'master-suite',
        name: 'Master Suite',
        tagline: 'La suite la plus demandée.',
        category: 'Suite',
        surface: null,
        guests: null,
        bed: null,
        price: '350 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 203500,
        pricePreferentialLabel: '203 500 FCFA',
        description:
          "Un salon distinct derrière une claustra en bois, un vrai canapé, et une vue dégagée. C'est la suite que l'hôtel montre en premier — et elle le mérite.",
        features: ['Salon séparé', 'Canapé', 'Climatisation', 'Télévision écran plat', 'Minibar'],
        coverImage: mmMasterSuite,
        images: [mmMasterSuite],
      },
      {
        id: 6,
        slug: 'suite-luxe',
        name: 'Suite de luxe',
        tagline: 'L\'étage supérieur du confort.',
        category: 'Suite',
        surface: null,
        guests: null,
        bed: null,
        price: '450 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 258500,
        pricePreferentialLabel: '258 500 FCFA',
        description:
          "Un espace salon lumineux pensé pour recevoir comme pour se poser, avec le raffinement qui distingue les suites Pefaco.",
        features: ['Salon séparé', 'Climatisation', 'Télévision écran plat', 'Minibar', 'Service en chambre'],
        coverImage: mmSuiteLuxeMinisterielle,
        images: [mmSuiteLuxeMinisterielle],
      },
      {
        id: 7,
        slug: 'suite-panoramique',
        name: 'Suite panoramique',
        tagline: 'Pour les séjours qui comptent.',
        category: 'Suite',
        surface: null,
        guests: null,
        bed: null,
        price: '550 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 313000,
        pricePreferentialLabel: '313 000 FCFA',
        description:
          "Une suite généreuse, pour les séjours prolongés ou les visites qui ne laissent pas de place à l'approximation.",
        features: [
          'Salon séparé',
          'Espace bureau',
          'Climatisation',
          'Accès prioritaire navette aéroport',
          'Service en chambre',
        ],
        coverImage: mmSuitePanoramiquePresidentielle,
        images: [mmSuitePanoramiquePresidentielle],
      },
      {
        id: 8,
        slug: 'suite-ministerielle',
        name: 'Suite Ministérielle',
        tagline: 'Pour les délégations.',
        category: 'Suite',
        surface: null,
        guests: null,
        bed: null,
        price: '780 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 440000,
        pricePreferentialLabel: '440 000 FCFA',
        photoIndicative: true,
        description:
          "L'une des deux suites les plus prestigieuses de l'hôtel, réservée aux délégations et aux séjours qui exigent la plus grande discrétion.",
        features: [
          'Salon séparé',
          'Espace bureau',
          'Climatisation',
          'Service en chambre',
          'Accès prioritaire événements',
        ],
        coverImage: mmSuiteLuxeMinisterielle,
        images: [mmSuiteLuxeMinisterielle],
      },
      {
        id: 9,
        slug: 'suite-presidentielle',
        name: 'Suite Présidentielle',
        tagline: 'Le sommet de l\'hôtel.',
        category: 'Suite',
        surface: null,
        guests: null,
        bed: null,
        price: '980 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 550000,
        pricePreferentialLabel: '550 000 FCFA',
        photoIndicative: true,
        description:
          "La suite la plus prestigieuse de l'hôtel, pour les visites officielles et les occasions qui ne se répètent pas.",
        features: [
          'Salon séparé',
          'Espace bureau',
          'Climatisation',
          'Service en chambre dédié',
          'Accès prioritaire événements',
        ],
        coverImage: mmSuitePanoramiquePresidentielle,
        images: [mmSuitePanoramiquePresidentielle],
      },
    ],
  },
  {
    slug: 'oyo',
    name: 'Pefaco Hotel Alima Palace',
    shortName: 'Alima Palace',
    city: 'Oyo',
    heroTagline: "5 étoiles au bord de l'Alima, à sept minutes de l'aéroport d'Oyo.",
    intro: `116 chambres et suites face à la rivière Alima,
dans le département de la Cuvette.`,
    officialPhotos: false,
    heroImage: oyoHero,
    phone: null,
    phoneHref: null,
    whatsapp: null,
    whatsappMessage:
      "Bonjour, je souhaite réserver une chambre à l'hôtel Pefaco Alima Palace (Oyo).",
    address:
      "Au bord de la rivière Alima, Oyo, Département de la Cuvette — adresse exacte à confirmer avec l'hôtel",
    reception: '24h/24, 7j/7',
    practicalInfo: {
      checkIn: 'À partir de 14h00',
      checkOut: 'Avant 12h00',
      cancellation:
        "Annulation gratuite jusqu'à 48h avant l'arrivée ; au-delà, la première nuit est facturée.",
      parking: 'Parking gratuit sur place.',
      pets: "Animaux de compagnie non admis, à l'exception des animaux d'assistance.",
    },
    restaurantImage: oyoRestaurant,
    restaurantName: 'Restaurant Libongo',
    restaurantText:
      "Restaurant Libongo et bar lounge au bord de l'eau — pensés pour les séjours d'affaires comme pour les escapades le temps d'un week-end.",
    amenitiesText:
      "Piscine, salle de sport et court de tennis : un séjour qui ne se limite pas à la chambre, sur les rives de l'Alima.",
    meetingsText:
      "Espaces de réunion et salons pour séminaires et événements, avec vue sur la rivière.",
    locationTitle: "Sur les rives de l'Alima, à sept minutes de l'aéroport.",
    locationText:
      "Un cadre calme au bord de l'eau, dans le département de la Cuvette — loin de l'agitation, mais jamais loin de l'essentiel.",
    experiences: [
      {
        title: "L'étape d'affaires",
        text: "Wi-Fi haut débit gratuit, climatisation, espaces de réunion pour les séminaires.",
      },
      {
        title: 'La détente',
        text: "Piscine, salle de sport et court de tennis, au bord de la rivière.",
      },
      {
        title: 'Restaurant & bar',
        text: "Restaurant Libongo et bar lounge, pour les repas comme pour les soirées.",
      },
    ],
    testimonial:
      "Un hôtel qui détonne à Oyo — calme, bien tenu, avec une équipe attentive. Idéal pour une étape professionnelle comme pour souffler quelques jours en famille.",
    rooms: [
      {
        id: 1,
        slug: 'classique',
        name: 'Chambre Classique',
        tagline: "Non-fumeur, au bord de l'Alima.",
        category: 'Chambre',
        surface: null,
        guests: null,
        bed: null,
        price: 'à partir de 90 000 FCFA',
        priceUnit: 'la nuit',
        priceEstimated: true,
        description:
          "Chambre non-fumeur climatisée, pensée pour l'étape courte comme pour le séjour d'affaires au bord de l'Alima.",
        features: ['Climatisation', 'Wi-Fi haut débit gratuit', 'Minibar', 'Télévision écran plat'],
        coverImage: oyoClassique1,
        images: [oyoClassique1, oyoClassique2],
      },
      {
        id: 2,
        slug: 'kitchenette',
        name: 'Chambre avec Kitchenette',
        tagline: "Pour les séjours qui s'étirent.",
        category: 'Chambre',
        surface: null,
        guests: null,
        bed: null,
        price: 'à partir de 110 000 FCFA',
        priceUnit: 'la nuit',
        priceEstimated: true,
        description:
          "Équipée d'une kitchenette, pour les séjours prolongés ou les visites professionnelles qui s'étirent dans le temps.",
        features: ['Climatisation', 'Kitchenette', 'Wi-Fi haut débit gratuit', 'Minibar'],
        coverImage: oyoKitchenette1,
        images: [oyoKitchenette1, oyoKitchenette2],
      },
      {
        id: 3,
        slug: 'master-suite',
        name: 'Master Suite',
        tagline: 'Vue dégagée sur la rivière.',
        category: 'Suite',
        surface: null,
        guests: null,
        bed: null,
        price: 'à partir de 150 000 FCFA',
        priceUnit: 'la nuit',
        priceEstimated: true,
        description:
          "Un salon distinct et une vue dégagée sur l'Alima — la suite pensée pour les séjours qui comptent.",
        features: ['Salon séparé', 'Climatisation', 'Minibar', 'Télévision écran plat', 'Service en chambre'],
        coverImage: oyoSuiteMaster1,
        images: [oyoSuiteMaster1, oyoSuiteMaster2],
      },
      {
        id: 4,
        slug: 'ministerial-suite',
        name: 'Ministerial Suite',
        tagline: 'La plus grande suite de l\'hôtel.',
        category: 'Suite',
        surface: null,
        guests: null,
        bed: null,
        price: 'à partir de 190 000 FCFA',
        priceUnit: 'la nuit',
        priceEstimated: true,
        description:
          "La plus grande suite de l'établissement, pour les délégations et les séjours qui ne laissent pas de place à l'approximation.",
        features: [
          'Salon séparé',
          'Espace bureau',
          'Climatisation',
          'Service en chambre',
          'Accès prioritaire événements',
        ],
        coverImage: oyoSuiteMinisterial1,
        images: [oyoSuiteMinisterial1, oyoSuiteMaster2, oyoSuiteMaster1],
      },
    ],
  },
]

export const findHotelBySlug = (slug) => hotels.find((hotel) => hotel.slug === slug)

export const findRoomBySlug = (hotel, slug) => hotel?.rooms.find((room) => room.slug === slug)

// Palette utilisée sur la page de sélection d'hôtel (fond très sombre, avant
// que le thème "ivoire" du reste du site ne prenne le relais).
export const selectorTheme = {
  bg: '#1D2620',
  bgDeep: '#12180F',
  gold: '#B39B74',
  goldSoft: '#D3C6A6',
  ivory: '#F5F0E6',
  line: 'rgba(245,240,230,0.16)',
}

// Durées d'animation de la page de sélection (porte qui pivote, fondu, etc.)
export const DOOR_OPEN_DURATION_MS = 950
export const DOOR_NAVIGATE_DELAY_MS = 1750
export const DOOR_HOVER_ROTATE_DEG = 16
export const DOOR_OPEN_ROTATE_DEG = 100
