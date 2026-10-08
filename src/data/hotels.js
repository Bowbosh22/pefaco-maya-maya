// Modèle de données des hôtels — reconstruit à l'identique depuis la plaquette
// officielle Pefaco Maya-Maya et depuis les informations disponibles pour Oyo.
// Toutes les valeurs (tarifs, textes, coordonnées) proviennent de la version
// précédemment publiée du site ; voir claude/PEFACO-MAYA-MAYA-SUIVI.md pour
// l'historique des sources.

import oyoHero from '../assets/images/oyo-hero.jpg'
import mayaMayaHero from '../assets/images/maya-maya-hero.jpg'
// Photo fournie par Mr. Mbemba (05/10/2026) pour la bannière "Chambres & suites" de l'accueil
// uniquement — ne remplace pas heroImage (hero plein écran + fond du carrousel "Trois façons
// d'y séjourner", qui restent sur la photo de la terrasse).
import mayaMayaChambresBanner from '../assets/images/maya-maya-chambres-banner.jpg'
import oyoClassique1 from '../assets/images/oyo-chambre-classique-1.jpg'
import oyoClassique2 from '../assets/images/oyo-chambre-classique-2.jpg'
import oyoKitchenette1 from '../assets/images/oyo-chambre-kitchenette-1.jpg'
import oyoKitchenette2 from '../assets/images/oyo-chambre-kitchenette-2.jpg'
import oyoSuiteMaster2 from '../assets/images/oyo-suite-master-2.jpg'
import oyoSuiteMaster1 from '../assets/images/oyo-suite-master-1.jpg'
import oyoSuiteMinisterial1 from '../assets/images/oyo-suite-ministerial-1.jpg'
import mmStandardV2Chambre from '../assets/images/maya-maya-standard-room-v2-chambre.jpg'
import mmStandardV2Lit from '../assets/images/maya-maya-standard-room-v2-lit.jpg'
import mmStandardV2LitBlanc from '../assets/images/maya-maya-standard-room-v2-lit-blanc.jpg'
import mmStandardV2Bureau from '../assets/images/maya-maya-standard-room-v2-bureau.jpg'
import mmStandardV2Sdb from '../assets/images/maya-maya-standard-room-v2-sdb.jpg'
import mmMasterSuiteV2Chambre from '../assets/images/maya-maya-master-suite-v2-chambre.jpg'
import mmMasterSuiteV2Salon from '../assets/images/maya-maya-master-suite-v2-salon.jpg'
import mmMasterSuiteV2SalleAManger from '../assets/images/maya-maya-master-suite-v2-salle-a-manger.jpg'
import mmMasterSuiteV2VueEnsemble from '../assets/images/maya-maya-master-suite-v2-vue-ensemble.jpg'
import mmRestaurant1 from '../assets/images/maya-maya-restaurant-1.jpg'
import mmDetente from '../assets/images/maya-maya-detente.jpg'
import mmRestaurant2 from '../assets/images/maya-maya-restaurant-2.jpg'
import mmHeroVideo1 from '../assets/videos/hero-1.mp4'
import mmHeroVideo2 from '../assets/videos/hero-2.mp4'
import mmHeroVideo3 from '../assets/videos/hero-3.mp4'
import mmRestaurant3 from '../assets/images/maya-maya-restaurant-3.jpg'
import oyoRestaurant from '../assets/images/oyo-restaurant.jpg'
// Les 3 lignes suivantes remplacent, le 29/09/2026, les 3 photos "à titre
// indicatif" signalées lors de l'intégration de la plaquette du 22/09 (Bilanga
// Twin pax, Suite Ministérielle, Suite Présidentielle). Source : fiche Expedia
// officielle de l'hôtel, section "Rooms" de la page de réservation — chaque
// photo vient du type de chambre Expedia le plus proche de la catégorie du
// site (validé avec Mr. Mbemba sur planche de comparaison) : Chambre Bilanga
// Twin pax ↔ "Standard Twin Room" (vrais lits jumeaux, correspondance sûre) ;
// Suite Ministérielle ↔ "Junior Suite" (salon séparé) ; Suite Présidentielle
// ↔ "Superior Suite" (lustre, mur à motif) — ces deux dernières sont les
// candidates les plus vraisemblables mais Expedia ne nomme pas ses catégories
// comme la plaquette Pefaco, donc la certitude est moyenne (à confirmer par
// Pefaco si possible).
import mmBilangaTwin from '../assets/images/maya-maya-bilanga-twin-v2.jpg'
import mmSuitePresidentielleDediee from '../assets/images/maya-maya-suite-presidentielle.jpg'
// Les 3 lignes suivantes remplacent, également le 29/09/2026, les photos de
// Chambre Exécutive / Suite de luxe / Suite panoramique. Contrairement aux 3
// ci-dessus, ces 3 catégories ont un nom Pefaco qui est la traduction exacte
// d'une catégorie Expedia ("Executive Room", "Deluxe Suite", "Panoramic
// Suite") : la photo vient donc directement de la fiche Expedia du même nom,
// sans devinette de correspondance — confiance haute, pas de badge indicatif.
// Remplace aussi une confusion repérée à cette occasion : l'ancienne photo de
// Chambre Exécutive (mur à motifs losange) ne montrait aucun bureau alors que
// la fiche affiche "Bureau" comme équipement ; la nouvelle photo Expedia
// "Executive Room" est la bonne référence pour cette catégorie.
import mmExecutiveV2 from '../assets/images/maya-maya-executive-v2.jpg'
// Photos supplémentaires (minimum 3 par chambre), ajoutées le 29/09/2026.
// MBOTE / Maya-Maya standard / Master Suite : photos génériques de la fiche Expedia
// (catégorie "Standard Room" et ambiances hôtel), choix validé par Mr. Mbemba — "à titre indicatif".
// Bilanga Twin pax : 2 photos supplémentaires de la même catégorie Expedia "Standard Twin Room" déjà confirmée.
import mmBilangaExtra1 from '../assets/images/maya-maya-bilanga-extra1.jpg'
import mmBilangaExtra2 from '../assets/images/maya-maya-bilanga-extra2.jpg'
// Chambre Exécutive : 2 photos supplémentaires de la catégorie Expedia "Executive Room" (même nom, confiance haute).
import mmExecutiveBathroom from '../assets/images/maya-maya-executive-bathroom.jpg'
import mmExecutiveExtra2 from '../assets/images/maya-maya-executive-extra2.jpg'
import mmExecutiveV3BureauLit from '../assets/images/maya-maya-executive-v3-bureau-lit.jpg'
import mmExecutiveV3ChambreSdb from '../assets/images/maya-maya-executive-v3-chambre-sdb.jpg'
import mmExecutiveV3Salon from '../assets/images/maya-maya-executive-v3-salon.jpg'
// Suite de luxe : 5 nouvelles photos fournies par Mr. Mbemba le 29/09/2026, remplaçant les précédentes.
import mmSuiteLuxeV3Chambre from '../assets/images/maya-maya-suite-luxe-v3-chambre.jpg'
import mmSuiteLuxeV3Bureau from '../assets/images/maya-maya-suite-luxe-v3-bureau.jpg'
import mmSuiteLuxeV3Lit from '../assets/images/maya-maya-suite-luxe-v3-lit.jpg'
import mmSuiteLuxeV3Canape from '../assets/images/maya-maya-suite-luxe-v3-canape.jpg'
import mmSuiteLuxeV3Salon from '../assets/images/maya-maya-suite-luxe-v3-salon.jpg'
// Suite panoramique : 5 nouvelles photos fournies par Mr. Mbemba le 29/09/2026, remplaçant les précédentes.
import mmSuitePanoramiqueV3ChambreLarge from '../assets/images/maya-maya-suite-panoramique-v3-chambre-large.jpg'
import mmSuitePanoramiqueV3Lit from '../assets/images/maya-maya-suite-panoramique-v3-lit.jpg'
import mmSuitePanoramiqueV3Jacuzzi from '../assets/images/maya-maya-suite-panoramique-v3-jacuzzi.jpg'
import mmSuitePanoramiqueV3TerrasseJacuzzi from '../assets/images/maya-maya-suite-panoramique-v3-terrasse-jacuzzi.jpg'
import mmSuitePanoramiqueV3TerrasseSalon from '../assets/images/maya-maya-suite-panoramique-v3-terrasse-salon.jpg'
// Suite Ministérielle : 4 nouvelles photos fournies par Mr. Mbemba le 29/09/2026 ("suite junior"),
// cohérent avec l'estimation Expedia "Junior Suite" déjà retenue — remplace les précédentes.
import mmSuiteMinisterielleV2ChambreSalon from '../assets/images/maya-maya-suite-ministerielle-v2-chambre-salon.jpg'
import mmSuiteMinisterielleV2Bureau from '../assets/images/maya-maya-suite-ministerielle-v2-bureau.jpg'
import mmSuiteMinisterielleV2Salon from '../assets/images/maya-maya-suite-ministerielle-v2-salon.jpg'
import mmSuiteMinisterielleV2Lit from '../assets/images/maya-maya-suite-ministerielle-v2-lit.jpg'
// Suite Présidentielle : 3 photos supplémentaires de la catégorie Expedia "Superior Suite" (meilleure estimation, indicatif).
import mmSuitePresidentielleChambre from '../assets/images/maya-maya-suite-presidentielle-chambre.jpg'
import mmSuitePresidentielleSdb from '../assets/images/maya-maya-suite-presidentielle-sdb.jpg'
import mmSuitePresidentielleExtra from '../assets/images/maya-maya-suite-presidentielle-extra.jpg'
import mmActivitesExpositions from '../assets/images/maya-maya-activites-expositions.jpg'
import mmActivitesTennis from '../assets/images/maya-maya-activites-tennis.jpg'
import mmActivitesSoirees from '../assets/images/maya-maya-activites-soirees.jpg'
// Photo distincte pour la carte "Soirées privées" (01/10/2026) : extraite de la plaquette
// officielle Pefaco (page "Autres activités"), une vraie photo d'événement privé en intérieur à
// l'hôtel — jusqu'ici cette carte et le hero de la page Activités partageaient la même photo
// (terrasse de nuit), ce qui répétait deux fois la même image sur la page.
import mmActivitesSoireesCard from '../assets/images/maya-maya-activites-soirees-privees.jpg'
import mmActivitesGym from '../assets/images/maya-maya-activites-gym-2.jpg'
import mmActivitesPiscine from '../assets/images/maya-maya-activites-piscine.jpg'
import mmActivitesSpa from '../assets/images/maya-maya-activites-spa.jpg'
import mmHeritageFacadeSignage from '../assets/images/maya-maya-heritage-facade-signage.jpg'
import mmHeritageFacadeJour from '../assets/images/maya-maya-heritage-facade-jour.jpg'
import mmHeritageEntree from '../assets/images/maya-maya-heritage-entree.jpg'
import mmHeritageLobby from '../assets/images/maya-maya-heritage-lobby.jpg'
import mmDestinationCongo from '../assets/images/maya-maya-destination-congo.jpg'
import mmHeritageArt from '../assets/images/maya-maya-heritage-art.jpg'
import mmVenuesBanquet from '../assets/images/maya-maya-venues-banquet.jpg'
import mmVenuesConference from '../assets/images/maya-maya-venues-conference.jpg'
// Photo de mariage fournie par Mr. Mbemba (05/10/2026), utilisée en grande photo d'ouverture
// de la page Salles & Événements, sous le titre "Célébrez à Pefaco Hotel Maya-Maya".
import mmVenuesWeddingDance from '../assets/images/maya-maya-venues-wedding-dance.jpg'
// Photo de piscine fournie par Mr. Mbemba (05/10/2026), utilisée en grande photo d'ouverture
// de la page Héritage, sous le titre "L'Héritage Maya-Maya".
import mmHeritageHeroPool from '../assets/images/maya-maya-heritage-hero-pool.jpg'
import mmMenuChef from '../assets/images/maya-maya-menu-chef.jpg'
import mmRestaurant4 from '../assets/images/maya-maya-restaurant-4.jpg'
// Logo officiel Pefaco Hotel Maya Maya transmis par Mr. Mbemba le 29/09/2026.
// `logoIcon` = juste le pictogramme (rogné depuis le logo complet) pour la
// barre de navigation ; `logoFull` = le lockup complet (icône + nom + tagline
// aéroport), conservé pour un usage futur éventuel (écran de sélection, pied
// de page...). Uniquement Maya-Maya pour l'instant, Oyo n'a pas transmis de
// logo — la Navbar retombe sur son pictogramme générique tant qu'il n'y en a pas.
import mmLogoIcon from '../assets/images/maya-maya-logo-icon.png'
import mmLogoFull from '../assets/images/maya-maya-logo-full.png'

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
    logoIcon: mmLogoIcon,
    logoFull: mmLogoFull,
    heroImage: mayaMayaHero,
    // Boucle vidéo du hero (08/10/2026, 3 clips Pexels fournis par Mr. Mbemba, compressés en
    // 1080p sans son). La photo ci-dessus reste le repli / l'image de chargement.
    heroVideos: [mmHeroVideo1, mmHeroVideo2, mmHeroVideo3],
    // Bannière "Chambres & suites" de l'accueil (section RoomsShowcase) uniquement.
    roomsBannerImage: mayaMayaChambresBanner,
    restaurantImage: mmRestaurant1,
    restaurantGallery: [mmRestaurant1, mmRestaurant2, mmRestaurant3, mmRestaurant4],
    detenteImage: mmDetente,
    phone: '+242 05 604 8030 / +242 05 604 8035',
    phoneHref: 'tel:+242056048030',
    // Détail des lignes affiché sur la page Contact (chaque ligne garde son propre lien d'appel).
    phoneLines: [
      { display: '+242 05 604 8030-31', href: 'tel:+242056048030' },
      { display: '+242 05 604 8035-03', href: 'tel:+242056048035' },
    ],
    whatsapp: '242056048030',
    whatsappMessage: 'Bonjour, je souhaite réserver une chambre à l\'hôtel Pefaco Maya-Maya.',
    bookingEmail: 'infos@pefacohotels.com',
    website: 'https://www.pefacohotelmayamaya.com',
    address: "Avenue de l'aéroport, à proximité de l'aéroport international Maya-Maya, Brazzaville",
    // Nom utilisé pour centrer la carte Google Maps intégrée sur la page Contact
    // (l'hôtel est déjà référencé sur Google/Booking/TripAdvisor sous ce nom).
    mapQuery: 'Pefaco Hotel Maya Maya, Brazzaville, Congo',
    reception: '24h/24, 7j/7',
    // practicalInfo confirmé le 06/10/2026 directement par la réception Maya-Maya (rendez-vous
    // avec le directeur informatique) : annulation, parking, animaux, petit-déjeuner, navette et
    // wifi sont désormais des informations officielles, plus des valeurs standards à confirmer.
    // Check-in/check-out restent la valeur recoupée le 01/10/2026 via Expedia/Booking.com.
    practicalInfo: {
      checkIn: 'À partir de 13h00',
      checkOut: 'Avant 12h00',
      cancellation: "Annulation gratuite jusqu'à 24h avant l'arrivée.",
      parking: 'Parking gratuit sur place, accessible 24h/24.',
      pets: 'Animaux non acceptés.',
      breakfast: 'Petit-déjeuner inclus.',
      shuttle: "Navette aéroport gratuite ; navette vers la plage disponible en option payante.",
      wifi: 'Wifi gratuit pour les clients de l\'hôtel.',
      confirmed: true,
    },
    restaurantName: "Le restaurant de l'hôtel",
    restaurantText:
      "Un buffet international pensé pour les horaires de vol — service continu en journée, carte du soir pour les clients en étape comme pour les habitués de Brazzaville.",
    // Détail des 3 restaurants + 1 bar de l'hôtel — contenu officiel du
    // « Dossier de Presse PEFACO HOTEL MAYA MAYA 5 » transmis par Mr. Mbemba
    // (30/09/2026), repris tel quel (noms, chefs, récompenses, capacités).
    restaurantsDetail: [
      {
        name: 'Le Bistro Parisien',
        cuisine: 'Cuisine française traditionnelle',
        description:
          "Cuisine française traditionnelle et plats bistronomiques, revisités par Rey Ouafi, notre Chef Exécutif, plusieurs fois récompensé. Restaurant climatisé, jusqu'à 250 personnes en banquet.",
        image: mmRestaurant1,
        photoIndicative: true,
      },
      {
        name: 'Restaurant Bochelli',
        cuisine: 'Cuisine italienne traditionnelle',
        description:
          "Pizzas au four traditionnel, pâtes maison et plats typiques italiens, par notre chef sicilien, lauréat du prix de l'Associazione Professionale Cuochi Italiani en 2011. Restaurant climatisé, jusqu'à 50 personnes.",
        image: mmRestaurant2,
        photoIndicative: true,
      },
      {
        name: 'Le Moringa',
        cuisine: "Cuisine congolaise et d'Afrique Centrale",
        description:
          "Décor africain-chic où se prennent les petits-déjeuners. Cet espace modulable a déjà accueilli défilés, vernissages, lancements de produits, l'Élection Miss Congo 2016 et des congrès présidentiels et ministériels — jusqu'à 250 personnes assises, 350 en cocktail.",
        image: mmRestaurant3,
        photoIndicative: true,
      },
    ],
    barDetail: {
      name: 'Essengo Bar',
      tagline: 'Bar à cocktails',
      description:
        "Tous les vendredis soir, concert live gratuit du groupe WAKASSA de 19h30 à 22h30. Les vendredis et samedis, DJ Patchy anime la soirée de 18h à 23h, avec un Happy Hour de 18h à 20h.",
      image: mmRestaurant4,
      photoIndicative: true,
    },
    amenitiesText:
      "Piscine extérieure et bar, pour souffler avant ou après le vol — ou simplement prendre le temps, entre deux rendez-vous à Brazzaville.",
    meetingsText:
      "Pour les séjours en équipe : espaces de réception et navette aéroport, avec un accès prioritaire pour les groupes en Suite Executive.",
    locationTitle: 'L\'étape aérienne, sans stress.',
    locationText:
      "À deux minutes de l'aéroport international de Maya-Maya. Le vol atterrit, la navette attend, la chambre est déjà prête.",
    // Chaque carte du carrousel "Trois façons d'y séjourner" (accueil) redirige vers l'onglet
    // correspondant (demande du 05/10/2026) — "L'étape d'affaires" devient "Histoire" et pointe
    // vers L'Héritage Maya-Maya plutôt que de dupliquer un thème déjà couvert par le hero.
    experiences: [
      {
        title: 'Histoire',
        text: "Architecture moderne, décorations culturelles et un riche passé — l'âme du Maya-Maya à découvrir.",
        link: '/heritage',
        linkLabel: "Explorez l'héritage",
      },
      {
        title: 'La détente',
        text: "Piscine extérieure et bar, pour souffler avant ou après le vol.",
        link: '/activites',
        linkLabel: 'Explorez les activités',
      },
      {
        title: 'Réunions & groupes',
        text: "Espaces de réception et navette aéroport, pour les séjours en équipe.",
        link: '/salles-evenements',
        linkLabel: 'Explorez les salles',
      },
    ],
    testimonial:
      "Un accueil chaleureux et un emplacement idéal pour ceux qui arrivent ou repartent par l'aéroport — exactement ce qu'on attend d'un hôtel d'affaires à Brazzaville.",
    // Onglet « L'Héritage Maya-Maya » — texte officiel « À propos de nous »
    // de la plaquette Pefaco (28/09/2026), repris tel quel. Champ propre à
    // Maya-Maya : sa seule présence détermine l'affichage du lien dans la
    // barre de navigation (voir Navbar.jsx).
    heritageText:
      "Le Pefaco hôtel Maya-Maya est un véritable havre de luxe, situé en plein cœur de Brazzaville, en République du Congo. Alliant histoire riche, architecture moderne, décorations culturelles et services incomparables, nous offrons à nos clients un havre de paix exclusif.\n\nGrâce à des installations modernes et à notre engagement envers l'excellence, nous offrons une expérience inoubliable à chacun de nos visiteurs.",
    // Photo remplacée le 29/09/2026 par une vraie photo de la façade avec les
    // enseignes « PEFACO HOTEL » / « MAYA MAYA » (source : fiche Expedia
    // officielle de l'hôtel, sélectionnée par Mr. Mbemba) — l'ancienne version
    // extraite de la plaquette PDF (maya-maya-heritage-night.jpg) n'est plus
    // utilisée.
    heritageImage: mmHeritageFacadeSignage,
    // Petite galerie ajoutée le 29/09/2026, même source — façade (enseigne
    // « PEFACO HOTEL »), entrée/parking, lobby. N'est plus affichée sur la page
    // Héritage depuis le 01/10/2026 (remplacée par le bloc Destination +
    // Histoire ci-dessous), conservée ici au cas où.
    heritageGallery: [mmHeritageFacadeJour, mmHeritageEntree, mmHeritageLobby],
    // Grande photo d'ouverture de la page Héritage, sous le titre (demande du
    // 05/10/2026) — distincte de `heritageGallery` (toujours utilisée pour les
    // 3 photos sous la ligne de chiffres et le bloc Destination).
    heritageHeroImage: mmHeritageHeroPool,
    // Bloc « Destination » + photo d'art en tête de la page Héritage, ajoutés
    // le 01/10/2026 (demande explicite, référence : belmond.com/en/stories).
    // Photos fournies par Mr. Mbemba à titre de démonstration de mise en page
    // (gorille / toile de street-art représentant un singe) — PAS des photos
    // de l'hôtel : à remplacer par de vraies photos avant mise en ligne si
    // Pefaco ne valide pas ces visuels tels quels.
    destinationLabel: 'Destination',
    destinationTitle: "Au cœur de l'Afrique Centrale",
    destinationText:
      "Entre fleuve Congo et forêts tropicales, Brazzaville ouvre la porte à l'une des régions les plus riches en biodiversité du continent.",
    destinationImage: mmDestinationCongo,
    heritageStoryImage: mmHeritageArt,
    // Chiffres clés + vie culturelle + boutiques + présence en ligne — contenu
    // officiel du « Dossier de Presse PEFACO HOTEL MAYA MAYA 5 » transmis par
    // Mr. Mbemba (30/09/2026), repris tel quel (chiffres, noms, récompenses).
    heritageStats: [
      { value: '158', label: 'chambres et suites' },
      { value: '74', label: 'Chambres Standard' },
      { value: '42', label: 'Chambres Exécutive' },
      { value: '42', label: 'Suites (38 Suites, 2 Ministérielles, 2 Présidentielles)' },
    ],
    heritageCulture:
      "Surnommé « l'Art Hôtel » par ses habitués, le Pefaco Hotel Maya-Maya organise en moyenne 6 à 8 cocktails et vernissages par an, exposant les toiles d'artistes locaux et internationaux pendant environ un mois à chaque fois — des rendez-vous où se croisent le corps diplomatique et les autorités culturelles du pays.\n\nL'hôtel est aussi partenaire depuis 6 ans de la RIAC (Rencontre Internationale d'Art Contemporain), organisée par le collectif d'artistes « Les Ateliers SAHM », et offre à cette occasion 10 chambres pendant 3 semaines. Il a également accueilli le tournage de la télé-réalité « Qui veut devenir Star de Cinéma » (diffusée sur DRTV et TOP TV), en mettant une salle de séminaire à disposition des candidats.",
    boutiques: [
      {
        name: "Boutique Hôtel « Nandjika »",
        description:
          "La marque d'une jeune créatrice congolaise, lauréate du prix de la Fashion Night de Brazzaville en 2015 (vêtements, sacs à main, accessoires). L'hôtel a été partenaire et sponsor du défilé de lancement de sa collection en mai 2017.",
      },
      {
        name: "Corner Maxim's",
        description: "Un corner Maxim's installé au Bistro Parisien.",
      },
      {
        name: 'Corner produits italiens',
        description: 'Une sélection de produits italiens au restaurant Le Bochelli.',
      },
    ],
    socialProof: {
      facebookFans: '30 170',
      facebookName: 'Pefaco Hotel Maya Maya . Brazzaville . République du Congo',
      youtube: [
        { label: 'Film institutionnel (2 min 35)', url: 'https://youtu.be/ykL1RQjhS80' },
        { label: 'Film long format (52 min)', url: 'https://youtu.be/ZasDtkrkQlg' },
      ],
    },
    // Onglet « Salles & Événements » — grille tarifaire officielle de la
    // plaquette Pefaco (28/09/2026), reprise telle quelle (« XAF » renommé
    // « FCFA » pour rester cohérent avec le reste du site — même monnaie).
    // Champ propre à Maya-Maya : sa seule présence détermine l'affichage du
    // lien dans la barre de navigation (voir Navbar.jsx).
    // Galerie ajoutée le 29/09/2026 (source : fiche Expedia officielle de
    // l'hôtel, sélectionnée par Mr. Mbemba) — comble l'absence de photo
    // signalée initialement (les photos de salles de la plaquette étaient
    // fondues sous le tableau de prix, inutilisables telles quelles).
    venuesGallery: [mmVenuesBanquet, mmVenuesConference],
    // Grande photo sous le titre de la page Salles & Événements (demande du 05/10/2026) —
    // distincte de venuesGallery, qui reste les 2 photos de salles plus bas sur la page.
    venuesHeroImage: mmVenuesWeddingDance,
    // Paragraphe d'intro complémentaire — contenu officiel du « Dossier de
    // Presse PEFACO HOTEL MAYA MAYA 5 » transmis par Mr. Mbemba (30/09/2026) :
    // vue d'ensemble des salles de réunion et de l'équipe dédiée aux mariages,
    // en complément (non en remplacement) du tableau de capacités/tarifs
    // ci-dessous, issu de la grille tarifaire officielle.
    venuesIntro:
      "5 salles de réunion, dont une transformable, pouvant accueillir jusqu'à 160 personnes en table ronde ou 200 personnes en format théâtre — l'endroit idéal pour réunions d'affaires, conférences de presse et lancements de produits.\n\nPour les mariages, l'Espace MBONGUI peut accueillir jusqu'à 1 000 personnes : le Groupe Pefaco Hotels est l'un des rares groupes hôteliers à s'être doté d'un Directeur Artistique & Relations Publiques, entouré d'une brigade formée à la décoration florale et événementielle.",
    venues: [
      { name: 'Moringa', ceremonyCapacity: '220 pers.', ceremonyPrice: '1 300 000 FCFA', conferenceCapacity: '300 pers.', conferencePrice: '1 300 000 FCFA' },
      { name: 'Bistro parisien', ceremonyCapacity: '180 pers.', ceremonyPrice: '1 500 000 FCFA', conferenceCapacity: null, conferencePrice: null },
      { name: 'Sangha', ceremonyCapacity: null, ceremonyPrice: null, conferenceCapacity: '10 pers.', conferencePrice: '100 000 FCFA' },
      { name: 'Kongo', ceremonyCapacity: null, ceremonyPrice: null, conferenceCapacity: '30 pers.', conferencePrice: '250 000 FCFA' },
      { name: 'Alima', ceremonyCapacity: null, ceremonyPrice: null, conferenceCapacity: '24 pers.', conferencePrice: '250 000 FCFA' },
      { name: 'Oubangui-Djoué', ceremonyCapacity: '100/130 pers.', ceremonyPrice: '300 000 FCFA', conferenceCapacity: '100/130 pers.', conferencePrice: '300 000 FCFA' },
      { name: 'Terrasse Piscine MBONGUI', ceremonyCapacity: '500 pers.', ceremonyPrice: '1 500 000 FCFA', conferenceCapacity: '500 pers.', conferencePrice: null },
      { name: 'Terrasse Moringa', ceremonyCapacity: '80 pers.', ceremonyPrice: '150 000 FCFA', conferenceCapacity: null, conferencePrice: null },
      { name: 'Restaurant Bochelli', ceremonyCapacity: '30 pers.', ceremonyPrice: 'À définir', conferenceCapacity: null, conferencePrice: null },
    ],
    // Onglet « Menu événementiel » — contenu officiel de la plaquette Pefaco
    // (28/09/2026), repris tel quel. Champ propre à Maya-Maya : sa seule
    // présence détermine l'affichage du lien dans la barre de navigation
    // (voir Navbar.jsx).
    // Point de vigilance : la section « Plats Chauds » du Menu A est reprise
    // telle qu'imprimée dans la plaquette (retour à la ligne visiblement
    // fusionné entre plusieurs plats — ex. « Gamberie Filet de Bar » /
    // « encroute Missalas du Chef ») — à faire confirmer par Pefaco plutôt
    // que deviné.
    eventMenu: {
      // Photo d'ambiance ajoutée le 29/09/2026 pour l'arrière-plan de la carte
      // fermée (source : fiche Expedia officielle de l'hôtel).
      gateImage: mmMenuChef,
      tableMenus: [
        {
          label: 'Menu A',
          sections: [
            { title: 'Entrées', items: ['Carpaccio de Bar', 'Poulpe à la pomme de terre', 'Poulpe grillé', "Parmegiana d'aubergine", 'Soupes de légume', 'Salade de tomates, œufs, laitue', 'Salade de crudités (concombres, tomates, poivrons, maïs, œufs durs, carotte et huile d\'olive)'] },
            { title: 'Plats chauds', items: ['Pizza végétarienne', 'Linguine', 'Gamberie', 'Filet de Bar en croûte', 'Missalas du Chef', 'Côte de porc', "Filet de Bœuf d'Alima", "Gigot d'agneau"] },
            { title: 'Desserts', items: ['Glaces', "Tiramisu à l'italienne", 'Assiette de fruits'] },
            { title: 'Accompagnements', items: ['Riz', 'Manioc', 'Banane plantain ou vapeur', 'Banane frite ou frite de pomme de terre', 'Foufou ou légumes vapeur'] },
            { title: 'Boissons', items: ['Café Expresso', 'Café au lait', 'Tonic', 'Coca / Coca Zéro', 'Cristal', 'Eau minérale'] },
          ],
        },
        {
          label: 'Menu B',
          sections: [
            { title: 'Entrées', items: ['Salade César', 'ou Salade mixte au thon (laitue, tomate, choux, maïs, poivron)'] },
            { title: 'Plats chauds', items: ['Poisson sole grillé, ou poisson salé aux aubergines', 'ou Blanc de poulet avec sauce aux champignons', 'ou Émincé de bœuf avec sauce tomate'] },
            { title: 'Desserts', items: ['Assiette de fruits'] },
            { title: 'Accompagnements', items: ['Riz', 'Manioc', 'Banane plantain ou vapeur', 'Banane frite ou frite de pomme de terre', 'Foufou ou légumes vapeur'] },
          ],
        },
      ],
      tableMenuPricing: [
        { label: 'Menu n°1 (2 propositions)', price: '26 000 FCFA' },
        { label: 'Menu n°2 (2 propositions)', price: '31 000 FCFA' },
        { label: 'Menu n°3 (2 propositions)', price: '36 000 FCFA' },
        { label: 'Menu n°4 (2 propositions)', price: '41 000 FCFA' },
        { label: 'Menu n°5 (2 propositions)', price: '51 000 FCFA' },
      ],
      buffets: [
        {
          label: 'Buffet n°1',
          price: '20 000 FCFA',
          sections: [
            { title: 'Entrées', items: ['Assortiment de crudités (carottes râpées, tomates, concombres, poivrons) avec leurs sauces', 'Salade de pommes de terre au thon et œufs durs', 'Salade de poulet au curry, raisins secs et ananas'] },
            { title: 'Plats chauds', items: ['Cuisses de poulet frit', 'Poisson salé aux aubergines', 'Saka saka au poisson fumé'] },
            { title: 'Desserts', items: ['Assiette de fruits coupés', 'Assortiment de pâtisseries'] },
            { title: 'Accompagnements', items: ['Banane plantain', 'Riz blanc parfumé à la coriandre', 'Patate douce rôtie avec une touche de piment doux', 'Pain de manioc ou moungouélé'] },
          ],
        },
        {
          label: 'Buffet n°2',
          price: '26 000 FCFA',
          sections: [
            { title: 'Entrées', items: ['Assortiment de crudités (carottes râpées, concombres, tomates, poivrons) avec leurs sauces', 'Salade de pommes de terre au thon et œufs durs', 'Salade de poulet au curry, raisins secs et ananas', 'Salade de méchoui façon tunisienne'] },
            { title: 'Plats chauds', items: ['Cuisses de poulet frit', 'Bœuf Bourguignon', 'Poisson salé aux aubergines', 'Saka saka au poisson fumé'] },
            { title: 'Desserts', items: ['Assiette de fruits coupés', 'Assortiment de pâtisseries'] },
            { title: 'Accompagnements', items: ['Banane plantain', 'Riz blanc parfumé à la coriandre', 'Patate douce rôtie avec une touche de piment doux', 'Pain de manioc ou moungouélé'] },
          ],
        },
        {
          label: 'Buffet n°3',
          price: '29 000 FCFA',
          sections: [
            { title: 'Entrées', items: ['Assortiment de crudités (carottes râpées, tomates, concombres, poivrons) avec leurs sauces', 'Salade de pommes de terre au thon et œufs durs', 'Salade de poulet au curry, raisins secs et ananas', 'Salade de méchoui façon tunisienne', 'Accras de patate douce et plantains épicés'] },
            { title: 'Plats chauds', items: ['Cuisses de poulet frit', 'Poisson salé aux aubergines', 'Bœuf Bourguignon', 'Maboké aux Mabongo', 'Saka saka au poisson fumé'] },
            { title: 'Desserts', items: ['Assiette de fruits coupés', 'Assortiment de pâtisseries', 'Tiramisu maison'] },
            { title: 'Accompagnements', items: ['Banane plantain', 'Riz blanc parfumé à la coriandre', 'Patate douce rôtie avec une touche de piment doux', 'Pain de manioc ou moungouélé'] },
          ],
        },
        {
          label: 'Buffet n°4',
          price: '32 000 FCFA',
          sections: [
            { title: 'Entrées', items: ['Assortiment de crudités (carottes râpées, concombres, tomates, poivrons) avec leurs sauces', 'Salade niçoise', 'Salade de poulet au curry, raisins secs et ananas', 'Gazpacho (soupe froide à la tomate)', 'Accras de patate douce et plantains épicés', 'Assortiment de charcuterie'] },
            { title: 'Plats chauds', items: ['Lasagne bolognaise', 'Bœuf Bourguignon', 'Mouton rôti', 'Maboké aux Mabongo', 'Poisson salé aux aubergines', 'Saka saka au poisson fumé'] },
            { title: 'Desserts', items: ['Assiette de fruits coupés', 'Assortiment de pâtisseries', 'Tiramisu maison', 'Variété de mousses, cheese-cake aux fruits rouges'] },
            { title: 'Accompagnements', items: ['Riz blanc parfumé à la coriandre', 'Patate douce rôtie avec une touche de piment doux', 'Banane plantain', 'Pain de manioc ou moungouélé', 'Semoule à la vapeur et ses légumes', "Pommes de terre sautées à l'ail"] },
          ],
        },
        {
          label: 'Buffet n°5',
          price: '49 000 FCFA',
          sections: [
            { title: 'Entrées', items: ['Assortiment de crudités (carottes râpées, tomates, concombres, poivrons) avec leurs sauces', 'Foie gras et ses toasts', 'Salade de poulet au curry, raisins secs et ananas', 'Salade papayes vertes à la langouste et aux crevettes', 'Saumon fumé', 'Assortiment de charcuterie française et italienne'] },
            { title: 'Plats chauds', items: ['Lasagnes aux fruits de mer', 'Filet de bœuf sauce au parfum des sous-bois', 'Fricassée de poulet à la crème d\'ail', 'Mouton rôti', "Gambas flambées à l'anis", 'Filet de Capitaine avec sa sauce provençale'] },
            { title: 'Desserts', items: ['Assiette de fruits coupés', 'Assortiment de pâtisseries', 'Tiramisu maison', 'Variété de mousses, cheese-cake aux fruits rouges', 'Crêpes Suzette'] },
            { title: 'Accompagnements', items: ['Riz blanc parfumé à la coriandre', 'Légumes variés à la vapeur', 'Gratin de patates douces', 'Semoule à la vapeur et ses légumes', "Pommes de terre sautées à l'ardéchoise"] },
          ],
        },
      ],
      extras: [
        { label: 'Pause-café Gourmande (matin ou après-midi)', unit: 'par personne, par pause café', price: '8 000 FCFA' },
        { label: 'Pause-café Maya Maya (matin ou après-midi)', unit: 'par personne, par pause café', price: '10 000 FCFA' },
        { label: 'Open Bar — Option 1 : boissons locales non alcoolisées (eau, sodas, jus)', unit: 'par personne, pour 90 min', price: '8 000 FCFA' },
        { label: 'Open Bar — Option 2 : canapés salés + boissons non alcoolisées + bière locale', unit: 'par personne, pour 90 min', price: '15 000 FCFA' },
        { label: 'Open Bar — Option 3 : Option 2 + alcools importés (whisky, gin, pastis, martini...)', unit: 'par personne, pour 90 min', price: '18 000 FCFA' },
        { label: 'Cocktail déjeunatoire', unit: 'par personne, hors boisson', price: '25 000 FCFA' },
        { label: 'Cocktail dînatoire', unit: 'par personne, hors boisson', price: '30 000 FCFA' },
        { label: 'Goûter n°1', unit: 'par personne, boisson incluse', price: '20 000 FCFA' },
        { label: 'Goûter n°2', unit: 'par personne, boisson incluse', price: '30 000 FCFA' },
      ],
    },
    // Onglet « Activités » — contenu et visuels repris de la plaquette
    // officielle Pefaco (28/09/2026), page « 05 Autres activités ».
    activities: {
      // Photo d'ambiance pour l'en-tête éditorial de la page (voir Activites.jsx) —
      // même image que « Soirées privées » ci-dessous, recadrée différemment.
      heroImage: mmActivitesSoirees,
      amenities: [
        {
          label: "Expositions d'art",
          image: mmActivitesExpositions,
          description: "Le lobby accueille régulièrement artistes et collectionneurs, le temps d'un vernissage ou d'une exposition éphémère.",
        },
        {
          label: 'Terrain de tennis',
          image: mmActivitesTennis,
          description: "Le Pefaco Hotel Maya-Maya est le seul hôtel de Brazzaville à disposer d'un terrain de tennis en quick — raquettes et balles fournies à la réception.",
        },
        {
          label: 'Soirées privées',
          image: mmActivitesSoireesCard,
          description: "Terrasses dressées et éclairage d'ambiance : l'hôtel se transforme, le temps d'un événement, en décor sur mesure.",
        },
        {
          label: 'Salle de gym',
          image: mmActivitesGym,
          description: "15 appareils de cardio et musculation, avec un coach sportif présent tous les jours de 18h30 à 20h30, et le dimanche de 12h30 à 14h30.",
        },
        // Deux cartes ajoutées le 29/09/2026 (source : fiche Expedia officielle
        // de l'hôtel, sélectionnées par Mr. Mbemba) — la piscine et le
        // spa/jacuzzi n'avaient pas encore de carte dédiée sur cette page.
        {
          label: 'Piscine',
          image: mmActivitesPiscine,
          description: "L'Espace MBONGUI : grand bassin et bassin enfant, bains de soleil, beds chillout et lits à baldaquin. Tous les dimanches, le Pool Jazz Brunch réunit un orchestre live et un buffet à volonté de 12h à 16h.",
        },
        {
          label: 'Spa & bien-être',
          image: mmActivitesSpa,
          description: "Un bain à remous pour prolonger la détente, entre deux visites à la salle de sport ou à la piscine.",
        },
      ],
      happyHours: [
        {
          day: 'Jeudis',
          hours: '18h – 20h',
          music: 'DJ Peter',
          perks: ['2 cocktails achetés, 1 cocktail offert', '1 Beaufort acheté, 1 Beaufort offert', 'Tombola — plusieurs lots à gagner'],
        },
        {
          day: 'Vendredis',
          hours: null,
          music: 'Music Live Performance',
          perks: ['2 cocktails achetés, 1 cocktail offert', '1 Beaufort acheté, 1 Beaufort offert', 'Tombola — plusieurs lots à gagner'],
        },
        {
          day: 'Samedis',
          hours: '18h – 22h',
          music: 'DJ Peter',
          perks: ['2 cocktails achetés, 1 cocktail offert', '1 Beaufort acheté, 1 Beaufort offert', 'Tombola — plusieurs lots à gagner'],
        },
      ],
    },
    // Page « Actualités » (demande du 08/10/2026, suite à la réunion avec la direction).
    // Contenus pré-remplis UNIQUEMENT à partir d'informations déjà officielles (dossier de
    // presse et plaquette Pefaco) : aucune date inventée — `dateLabel` décrit un rythme
    // (« Tous les dimanches ») ou une période, jamais un jour précis non communiqué.
    // Pour publier une actualité : ajouter un objet dans `items` (le plus récent en premier),
    // avec un `slug` unique, une `category` parmi `categories`, un résumé et un `body`
    // (tableau de paragraphes). Le premier item `featured: true` ouvre la page.
    news: {
      categories: ['Culture', 'Événements', 'Soirées', 'Bien-être'],
      agenda: [
        { day: 'Dimanches', label: 'Pool Jazz Brunch', time: '12h – 16h' },
        { day: 'Jeudis', label: 'Happy Hour', time: '18h – 20h' },
        { day: 'Vendredis', label: 'Concert live WAKASSA', time: '19h30 – 22h30' },
        { day: 'Samedis', label: 'Happy Hour', time: '18h – 22h' },
      ],
      items: [
        {
          slug: 'art-hotel-vernissages',
          category: 'Culture',
          featured: true,
          dateLabel: "Toute l'année",
          title: "L'Art Hôtel : 6 à 8 vernissages par an",
          summary:
            "Cocktails et vernissages exposent les toiles d'artistes locaux et internationaux, environ un mois à chaque fois.",
          body: [
            "Surnommé « l'Art Hôtel » par ses habitués, le Pefaco Hotel Maya-Maya organise en moyenne 6 à 8 cocktails et vernissages par an, exposant les toiles d'artistes locaux et internationaux pendant environ un mois à chaque fois.",
            "Ces rendez-vous réunissent le corps diplomatique et les autorités culturelles du pays. Le lobby accueille régulièrement artistes et collectionneurs, le temps d'un vernissage ou d'une exposition éphémère.",
          ],
          image: mmActivitesExpositions,
        },
        {
          slug: 'pool-jazz-brunch',
          category: 'Événements',
          dateLabel: 'Tous les dimanches · 12h – 16h',
          title: 'Pool Jazz Brunch',
          summary: "Orchestre live et buffet à volonté au bord de l'Espace MBONGUI.",
          body: [
            "Tous les dimanches, le Pool Jazz Brunch réunit un orchestre live et un buffet à volonté de 12h à 16h.",
            "L'Espace MBONGUI offre un grand bassin et un bassin enfant, des bains de soleil, des beds chillout et des lits à baldaquin.",
          ],
          image: mmActivitesPiscine,
        },
        {
          slug: 'wakassa-essengo-bar',
          category: 'Soirées',
          dateLabel: 'Tous les vendredis · 19h30 – 22h30',
          title: "Concert live WAKASSA à l'Essengo Bar",
          summary: 'Un concert live gratuit chaque vendredi soir, dans le bar à cocktails de l’hôtel.',
          body: [
            "Tous les vendredis soir, le groupe WAKASSA joue en concert live gratuit de 19h30 à 22h30 à l'Essengo Bar.",
            "Les vendredis et samedis, un DJ anime la soirée de 18h à 23h, avec un Happy Hour de 18h à 20h.",
          ],
          image: mmRestaurant4,
          photoIndicative: true,
        },
        {
          slug: 'happy-hours',
          category: 'Soirées',
          dateLabel: 'Jeudis, vendredis et samedis',
          title: 'Happy Hours de la semaine',
          summary: '2 cocktails achetés, 1 offert, et une tombola à chaque rendez-vous.',
          body: [
            "Les jeudis de 18h à 20h et les samedis de 18h à 22h, l'hôtel propose ses Happy Hours avec DJ ; les vendredis sont animés en musique live.",
            "À chaque rendez-vous : 2 cocktails achetés, 1 cocktail offert ; 1 Beaufort acheté, 1 Beaufort offert ; et une tombola avec plusieurs lots à gagner.",
          ],
          image: mmActivitesSoirees,
        },
        {
          slug: 'riac-ateliers-sahm',
          category: 'Culture',
          dateLabel: 'Partenariat depuis 6 ans',
          title: "Partenaire de la RIAC depuis 6 ans",
          summary: "L'hôtel soutient la Rencontre Internationale d'Art Contemporain en offrant 10 chambres pendant 3 semaines.",
          body: [
            "Le Pefaco Hotel Maya-Maya est partenaire depuis 6 ans de la RIAC (Rencontre Internationale d'Art Contemporain), organisée par le collectif d'artistes « Les Ateliers SAHM ».",
            "À cette occasion, l'hôtel offre 10 chambres pendant 3 semaines. Il a également accueilli le tournage de la télé-réalité « Qui veut devenir Star de Cinéma » (diffusée sur DRTV et TOP TV), en mettant une salle de séminaire à disposition des candidats.",
          ],
          image: mmHeritageLobby,
        },
        {
          slug: 'moringa-miss-congo-2016',
          category: 'Événements',
          dateLabel: 'Le Moringa, jusqu’à 350 invités',
          title: "Le Moringa, scène de l'Élection Miss Congo 2016",
          summary: 'Défilés, vernissages, lancements de produits et congrès : un espace modulable qui a tout accueilli.',
          body: [
            "Décor africain-chic où se prennent les petits-déjeuners, Le Moringa est un espace modulable qui a déjà accueilli défilés, vernissages, lancements de produits, l'Élection Miss Congo 2016 et des congrès présidentiels et ministériels.",
            "Il peut recevoir jusqu'à 250 personnes assises et 350 en cocktail.",
          ],
          image: mmRestaurant3,
          photoIndicative: true,
        },
        {
          slug: 'coach-salle-de-gym',
          category: 'Bien-être',
          dateLabel: 'Tous les jours · 18h30 – 20h30',
          title: 'Un coach sportif à la salle de gym',
          summary: '15 appareils de cardio et de musculation, et un coach présent chaque jour.',
          body: [
            "La salle de gym compte 15 appareils de cardio et de musculation, avec un coach sportif présent tous les jours de 18h30 à 20h30, et le dimanche de 12h30 à 14h30.",
          ],
          image: mmActivitesGym,
        },
      ],
    },
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
        photoIndicative: true,
        coverImage: mmStandardV2Chambre,
        images: [mmStandardV2Chambre, mmStandardV2Lit, mmStandardV2LitBlanc, mmStandardV2Bureau, mmStandardV2Sdb],
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
        photoIndicative: true,
        coverImage: mmStandardV2Chambre,
        images: [mmStandardV2Chambre, mmStandardV2Lit, mmStandardV2LitBlanc, mmStandardV2Bureau, mmStandardV2Sdb],
      },
      {
        id: 3,
        slug: 'bilanga-twin',
        name: 'Standard Twin Room',
        tagline: 'Deux lits, pour voyager à deux.',
        category: 'Chambre',
        surface: null,
        guests: null,
        bed: null,
        price: '195 000 FCFA',
        priceUnit: 'la nuit',
        pricePreferential: 125000,
        pricePreferentialLabel: '125 000 FCFA',
        description:
          "Pensée pour les voyageurs en duo ou les collègues en déplacement professionnel. Climatisation, minibar et tout le confort Pefaco.",
        features: ['Climatisation', 'Wi-Fi haut débit', 'Minibar', 'Télévision écran plat'],
        coverImage: mmBilangaTwin,
        images: [mmBilangaTwin, mmBilangaExtra1, mmBilangaExtra2],
      },
      {
        id: 4,
        slug: 'executive',
        name: 'Executive Room',
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
        coverImage: mmExecutiveV2,
        images: [
          mmExecutiveV2,
          mmExecutiveExtra2,
          mmExecutiveBathroom,
          mmExecutiveV3BureauLit,
          mmExecutiveV3ChambreSdb,
          mmExecutiveV3Salon,
        ],
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
        photoIndicative: true,
        coverImage: mmMasterSuiteV2Chambre,
        images: [
          mmMasterSuiteV2Chambre,
          mmMasterSuiteV2Salon,
          mmMasterSuiteV2SalleAManger,
          mmMasterSuiteV2VueEnsemble,
        ],
      },
      {
        id: 6,
        slug: 'suite-luxe',
        name: 'Deluxe Suite',
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
        coverImage: mmSuiteLuxeV3Chambre,
        images: [
          mmSuiteLuxeV3Chambre,
          mmSuiteLuxeV3Bureau,
          mmSuiteLuxeV3Lit,
          mmSuiteLuxeV3Canape,
          mmSuiteLuxeV3Salon,
        ],
      },
      {
        id: 7,
        slug: 'suite-panoramique',
        name: 'Panoramic Suite',
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
        coverImage: mmSuitePanoramiqueV3ChambreLarge,
        images: [
          mmSuitePanoramiqueV3ChambreLarge,
          mmSuitePanoramiqueV3Lit,
          mmSuitePanoramiqueV3Jacuzzi,
          mmSuitePanoramiqueV3TerrasseJacuzzi,
          mmSuitePanoramiqueV3TerrasseSalon,
        ],
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
        coverImage: mmSuiteMinisterielleV2ChambreSalon,
        images: [
          mmSuiteMinisterielleV2ChambreSalon,
          mmSuiteMinisterielleV2Bureau,
          mmSuiteMinisterielleV2Salon,
          mmSuiteMinisterielleV2Lit,
        ],
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
        coverImage: mmSuitePresidentielleDediee,
        images: [
          mmSuitePresidentielleDediee,
          mmSuitePresidentielleChambre,
          mmSuitePresidentielleSdb,
          mmSuitePresidentielleExtra,
        ],
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
    // Nom utilisé pour centrer la carte Google Maps intégrée sur la page Contact
    // (l'hôtel est déjà référencé sur Google/TripAdvisor sous ce nom).
    mapQuery: 'Pefaco Hotel Alima Palace, Oyo, Congo',
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
    // Oyo n'a pas de pages Héritage / Activités / Salles & Événements dédiées (voir Navbar.jsx) :
    // les cartes sans page propre renvoient vers Contact plutôt qu'un onglet inexistant.
    experiences: [
      {
        title: "L'étape d'affaires",
        text: "Wi-Fi haut débit gratuit, climatisation, espaces de réunion pour les séminaires.",
        link: '/contact',
      },
      {
        title: 'La détente',
        text: "Piscine, salle de sport et court de tennis, au bord de la rivière.",
        link: '/contact',
      },
      {
        title: 'Restaurant & bar',
        text: "Restaurant Libongo et bar lounge, pour les repas comme pour les soirées.",
        link: '/restaurant',
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
