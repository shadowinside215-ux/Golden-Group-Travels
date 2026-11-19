import { Language } from '../assets/destinations';
import { SearchCategoryId } from '../config/travelSuppliers';

export interface SearchEngineLocalePack {
  hubEyebrow: string;
  hubTitle: string;
  hubSubtitle: string;
  servicesHubEyebrow: string;
  servicesHubTitle: string;
  servicesHubSubtitle: string;
  openDedicatedPage: string;
  categories: Record<
    SearchCategoryId,
    {
      tabLabel: string;
      shortSub: string;
    }
  >;
  flights: {
    providerSelectorLabel: string;
    providers: {
      aviasales: { label: string; sub: string };
      expedia: { label: string; sub: string };
    };
    expediaBadge: string;
    expediaTitle: string;
    expediaSubtitle: string;
    expediaNote: string;
    liveBadge: string;
    liveTitle: string;
    liveSubtitle: string;
    loadingLabel: string;
    loadErrorFallback: string;
    offersBadge: string;
    offersTitle: string;
    offersSubtitle: string;
    offersLoadingLabel: string;
    offersLoadErrorFallback: string;
    conciergeTitle: string;
    conciergeDesc: string;
    tripRoundTrip: string;
    tripOneWay: string;
    originLabel: string;
    originPlaceholder: string;
    destinationLabel: string;
    destinationPlaceholder: string;
    swapAria: string;
    departureDateLabel: string;
    returnDateLabel: string;
    travelersLabel: string;
    adultsLabel: string;
    adultsHint: string;
    childrenLabel: string;
    childrenHint: string;
    infantsLabel: string;
    infantsHint: string;
    cabinLabel: string;
    cabins: {
      economy: string;
      premium: string;
      business: string;
      first: string;
    };
    searchBtn: string;
    resetBtn: string;
    summaryTitle: string;
    summarySubtitle: string;
    aviasalesNotice: string;
    continueAviasalesBtn: string;
    agencyFlightQuoteBtn: string;
    futureWidgetBadge: string;
    futureWidgetNote: string;
    errors: {
      originRequired: string;
      destinationRequired: string;
      sameRoute: string;
      departureRequired: string;
      departurePast: string;
      returnRequired: string;
      returnBeforeDeparture: string;
      adultsMin: string;
      infantsExceedAdults: string;
      maxPassengers: string;
    };
  };
  hotels: {
    badge: string;
    title: string;
    subtitle: string;
    includesLabel: string;
    includesItems: string[];
    widgetNote: string;
    agencyHotelTitle: string;
    agencyHotelDesc: string;
    agencyHotelBtn: string;
  };
  tours: {
    badge: string;
    title: string;
    subtitle: string;
    destinationLabel: string;
    destinationPlaceholder: string;
    quickDestinationsLabel: string;
    selectedDestinationLabel: string;
    transparencyNote: string;
    widgetsHeader: string;
    widgetsSubtitle: string;
    widgetLoadingLabel: string;
    widgetLoadErrorFallback: string;
    widgets: {
      'tours-klook-dynamic': { badge: string; title: string; subtitle: string };
      'tours-tiqets-discovery': { badge: string; title: string; subtitle: string };
      'tours-wegotrip-audio': { badge: string; title: string; subtitle: string };
    };
    klookTitle: string;
    klookDesc: string;
    klookCta: string;
    kkdayTitle: string;
    kkdayDesc: string;
    kkdayCta: string;
    customTourBtn: string;
    architectureNote: string;
  };
  carTransfers: {
    badge: string;
    title: string;
    subtitle: string;
    tabSelectorLabel: string;
    tabs: {
      car_rentals: { label: string; sub: string };
      airport_transfers: { label: string; sub: string };
    };
    carRentalsTitle: string;
    carRentalsSubtitle: string;
    transfersTitle: string;
    transfersSubtitle: string;
    loadingLabel: string;
    loadErrorFallback: string;
    transparencyNote: string;
    widgets: {
      'car-localrent': { badge: string; title: string; subtitle: string };
      'car-getrentacar': { badge: string; title: string; subtitle: string };
      'car-economybookings-banner': { badge: string; title: string; subtitle: string };
      'car-autoeurope': { badge: string; title: string; subtitle: string };
      'transfer-intui': { badge: string; title: string; subtitle: string };
      'transfer-kiwitaxi': { badge: string; title: string; subtitle: string };
    };
    conciergeTitle: string;
    conciergeDesc: string;
    conciergeCta: string;
  };
  umrah: {
    badge: string;
    title: string;
    subtitle: string;
    departureCityLabel: string;
    departureCityPlaceholder: string;
    departureDateLabel: string;
    returnDateLabel: string;
    travelersLabel: string;
    hotelPrefLabel: string;
    hotelOptions: string[];
    packagePrefLabel: string;
    packageOptions: string[];
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    submitBtn: string;
    summaryTitle: string;
    whatsappBtn: string;
    editBtn: string;
    noFakePackagesNote: string;
    errors: {
      departureCityRequired: string;
      dateRequired: string;
      datePast: string;
      returnBeforeDeparture: string;
      contactRequired: string;
      adultsMin: string;
    };
  };
  holidays: {
    badge: string;
    title: string;
    subtitle: string;
    destinationLabel: string;
    destinationPlaceholder: string;
    departureDateLabel: string;
    returnDateLabel: string;
    travelersLabel: string;
    budgetLabel: string;
    budgetOptions: string[];
    packageTypeLabel: string;
    packageTypeOptions: string[];
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    submitBtn: string;
    summaryTitle: string;
    whatsappBtn: string;
    editBtn: string;
    noFakePackagesNote: string;
    errors: {
      destinationRequired: string;
      dateRequired: string;
      datePast: string;
      returnBeforeDeparture: string;
      contactRequired: string;
      adultsMin: string;
    };
  };
}

export const SEARCH_ENGINE_PACKS: Record<Language, SearchEngineLocalePack> = {
  fr: {
    hubEyebrow: 'Moteur de Recherche Voyage · Golden Group Travels',
    hubTitle: 'Planifiez & Recherchez Votre Prochain Départ',
    hubSubtitle:
      'Sélectionnez une catégorie pour accéder aux critères dédiés : vols internationaux, hôtels Expedia, El Omra sur mesure, séjours, circuits ou location de voitures.',
    servicesHubEyebrow: 'Conciergerie & Réservation Directe · Golden Group Travels',
    servicesHubTitle: 'Découvrez Nos Services de Voyage',
    servicesHubSubtitle: 'Tout ce dont vous avez besoin pour votre prochain voyage, réuni au même endroit.',
    openDedicatedPage: 'Ouvrir la page complète du service',
    categories: {
      flights: { tabLabel: 'Vols', shortSub: 'Aviasales & Kiwi' },
      hotels: { tabLabel: 'Hôtels', shortSub: 'Expedia Stays' },
      umrah: { tabLabel: 'El Omra / La Mecque', shortSub: 'Pèlerinages Sacrés' },
      holidays: { tabLabel: 'Séjours', shortSub: 'Vacances Sur Mesure' },
      tours: { tabLabel: 'Circuits & Activités', shortSub: 'Klook, Tiqets & WeGoTrip' },
      'car-transfers': { tabLabel: 'Voitures & Transferts Aéroport', shortSub: 'Location & Chauffeurs' }
    },
    flights: {
      providerSelectorLabel: 'Fournisseur de recherche de vols',
      providers: {
        aviasales: { label: 'Aviasales', sub: 'Comparateur Vols · EUR' },
        expedia: { label: 'Expedia', sub: 'Expedia France · Vols' }
      },
      expediaBadge: 'Recherche Aérienne Officielle · Expedia France',
      expediaTitle: 'Rechercher Vos Billets d’Avion via Expedia',
      expediaSubtitle:
        'Saisissez votre ville de départ, votre destination, vos dates et vos voyageurs dans le moteur officiel Expedia.fr ci-dessous.',
      expediaNote:
        'Les horaires, disponibilités et tarifs aériens proviennent directement d’Expedia Group dans un nouvel onglet.',
      liveBadge: 'Recherche Aérienne Officielle · Aviasales',
      liveTitle: 'Rechercher Vos Billets d’Avion en Direct',
      liveSubtitle:
        'Sélectionnez vos aéroports, dates et passagers directement dans le moteur Aviasales ci-dessous pour consulter les offres en temps réel en EUR.',
      loadingLabel: 'Chargement du moteur de recherche Aviasales…',
      loadErrorFallback:
        'Le widget intégré n’a pas pu s’afficher ici. Ouvrez directement la recherche sur Aviasales :',
      offersBadge: 'Recherche & Offres Aériennes · Kiwi.com',
      offersTitle: 'Recherche Rapide & Top 4 des Itinéraires Vols via Kiwi.com',
      offersSubtitle:
        'Complétez votre comparaison avec le moteur officiel Kiwi.com et ses 4 meilleures suggestions d’itinéraires.',
      offersLoadingLabel: 'Chargement du module Kiwi.com…',
      offersLoadErrorFallback:
        'Le module Kiwi.com n’a pas pu se charger pour le moment. Vous pouvez réessayer ou contacter notre agence.',
      conciergeTitle: 'Accompagnement Agence Golden Group :',
      conciergeDesc:
        'Billets multi-destinations, bagages spéciaux ou règlement à notre agence de Salé.',
      tripRoundTrip: 'Aller-retour',
      tripOneWay: 'Aller simple',
      originLabel: 'Ville ou aéroport de départ',
      originPlaceholder: 'Ex : Casablanca (CMN), Rabat-Salé (RBA)...',
      destinationLabel: 'Ville ou aéroport d’arrivée',
      destinationPlaceholder: 'Ex : Paris (CDG), Istanbul (IST), Dubaï (DXB)...',
      swapAria: 'Inverser départ et destination',
      departureDateLabel: 'Date de départ',
      returnDateLabel: 'Date de retour',
      travelersLabel: 'Passagers',
      adultsLabel: 'Adultes',
      adultsHint: '12 ans et +',
      childrenLabel: 'Enfants',
      childrenHint: '2 à 11 ans',
      infantsLabel: 'Bébés',
      infantsHint: 'Moins de 2 ans',
      cabinLabel: 'Classe cabine',
      cabins: {
        economy: 'Économique',
        premium: 'Économique Premium',
        business: 'Affaires',
        first: 'Première Classe'
      },
      searchBtn: 'Valider & Rechercher des Vols',
      resetBtn: 'Modifier les critères',
      summaryTitle: 'Itinéraire Prêt pour Recherche Partenaire',
      summarySubtitle:
        'Vos critères de vol ont été vérifiés. Pour consulter les tarifs et horaires en direct, poursuivez sur notre partenaire Aviasales ou demandez un devis à notre agence.',
      aviasalesNotice:
        'Le lien partenaire vous redirige vers le portail officiel Aviasales dans un nouvel onglet (aucun tarif estimatif n’est affiché localement sans flux fournisseur).',
      continueAviasalesBtn: 'Continuer vers Aviasales',
      agencyFlightQuoteBtn: 'Demander un devis vol via WhatsApp',
      futureWidgetBadge: 'Architecture Prête · Intégration Widget Aviasales',
      futureWidgetNote:
        'Emplacement modulaire préparé pour accueillir le widget de recherche officiel Aviasales dès réception du script fournisseur.',
      errors: {
        originRequired: 'Veuillez saisir une ville ou un aéroport de départ.',
        destinationRequired: 'Veuillez saisir une destination d’arrivée.',
        sameRoute: 'La ville de départ et la destination doivent être différentes.',
        departureRequired: 'Veuillez choisir une date de départ.',
        departurePast: 'La date de départ ne peut pas être antérieure à aujourd’hui.',
        returnRequired: 'Veuillez choisir une date de retour pour un vol aller-retour.',
        returnBeforeDeparture: 'La date de retour doit être égale ou postérieure au départ.',
        adultsMin: 'Au moins 1 adulte est requis pour réserver un vol.',
        infantsExceedAdults: 'Le nombre de bébés ne peut pas dépasser le nombre d’adultes.',
        maxPassengers: 'La recherche est limitée à 9 passagers maximum par dossier.'
      }
    },
    hotels: {
      badge: 'Recherche Hôtelière Officielle · Expedia',
      title: 'Rechercher Votre Hôtel en Direct avec Expedia',
      subtitle:
        'Utilisez directement les champs officiels ci-contre (destination, arrivée, départ, chambres, adultes, enfants) pour lancer une recherche hôtelière réelle sur Expedia.',
      includesLabel: 'Contrôles disponibles dans le moteur Hôtels Expedia',
      includesItems: [
        'Recherche dédiée aux hébergements et hôtels',
        'Dates d’arrivée et de départ en temps réel',
        'Nombre de chambres, adultes et enfants',
        'Ouverture sécurisée des disponibilités sur Expedia.fr'
      ],
      widgetNote:
        'Les tarifs, disponibilités et confirmations proviennent exclusivement d’Expedia Group via ce widget officiel.',
      agencyHotelTitle: 'Besoin d’un bon hôtelier ou d’un devis agence à Salé ?',
      agencyHotelDesc:
        'Vous pouvez aussi localiser n’importe quel hôtel sur Google Maps et recevoir une prise en charge directe de notre équipe.',
      agencyHotelBtn: 'Ouvrir le Planificateur Google Maps'
    },
    tours: {
      badge: 'Circuits, Excursions & Billets · Partenaires Officiels',
      title: 'Explorer les Circuits & Activités dans le Monde',
      subtitle:
        'Parcourez les sélections en direct de nos partenaires Klook, Tiqets et WeGoTrip ou ouvrez les portails partenaires Klook et KKday.',
      destinationLabel: 'Destination souhaitée (repère personnel)',
      destinationPlaceholder: 'Ex : Marrakech, Istanbul, Dubaï, Paris, Suisse...',
      quickDestinationsLabel: 'Destinations populaires',
      selectedDestinationLabel: 'Destination notée :',
      transparencyNote:
        'Les sélections ci-dessous proviennent directement des widgets officiels de nos partenaires.',
      widgetsHeader: 'Sélections Partenaires en Direct',
      widgetsSubtitle:
        'Comparez des visites guidées, billets coupe-file et expériences audio dans le monde entier.',
      widgetLoadingLabel: 'Chargement de l’expérience partenaire…',
      widgetLoadErrorFallback:
        'Ce module partenaire est temporairement indisponible ici. Utilisez les liens directs ci-dessous.',
      widgets: {
        'tours-klook-dynamic': {
          badge: 'Klook · Activités & Pass',
          title: 'Activités & Excursions Sélectionnées',
          subtitle: 'Billets d’attractions, expériences urbaines et sorties recommandées via Klook.'
        },
        'tours-tiqets-discovery': {
          badge: 'Tiqets · Musées & Monuments',
          title: 'Découverte Culturelle & Billets Coupe-File',
          subtitle: 'Sélection horizontale d’entrées musées, monuments et visites avec Tiqets.'
        },
        'tours-wegotrip-audio': {
          badge: 'WeGoTrip · Audioguides & Billets',
          title: 'Visites Audio Autoguidées',
          subtitle: 'Parcours audio immersifs et billets d’entrée proposés par WeGoTrip.'
        }
      },
      klookTitle: 'Klook · Activités, Billets & Excursions',
      klookDesc:
        'Parcs, visites guidées, transferts et expériences urbaines dans les grandes destinations.',
      klookCta: 'Explorer les activités avec Klook',
      kkdayTitle: 'KKday · Circuits Guidés & Découvertes',
      kkdayDesc:
        'Circuits culturels, excursions d’une journée et expériences locales organisées.',
      kkdayCta: 'Explorer les circuits avec KKday',
      customTourBtn: 'Organiser un circuit privé via WhatsApp',
      architectureNote:
        'Besoin d’un itinéraire privé ou d’un groupe organisé depuis Salé / Rabat ?'
    },
    carTransfers: {
      badge: 'Mobilité & Chauffeurs · Partenaires Officiels',
      title: 'Location de Voitures & Transferts Aéroport',
      subtitle:
        'Choisissez entre la location de véhicules auprès de loueurs internationaux et les transferts privés depuis votre aéroport d’arrivée.',
      tabSelectorLabel: 'Choisir le service de mobilité',
      tabs: {
        car_rentals: { label: 'Location de Voitures', sub: '4 Partenaires' },
        airport_transfers: { label: 'Transferts Aéroport', sub: '2 Partenaires' }
      },
      carRentalsTitle: 'Comparateurs & Loueurs Partenaires',
      carRentalsSubtitle:
        'Recherchez et comparez votre véhicule directement sur Localrent, GetRentacar, EconomyBookings et AutoEurope.',
      transfersTitle: 'Transferts Aéroport Privés & Navettes',
      transfersSubtitle:
        'Réservez votre accueil aéroport avec Intui.travel ou Kiwitaxi vers votre hôtel ou domicile.',
      loadingLabel: 'Chargement du module partenaire…',
      loadErrorFallback:
        'Le module partenaire n’a pas pu s’afficher ici. Contactez notre agence sur WhatsApp pour organiser votre trajet.',
      transparencyNote:
        'Tous les tarifs, conditions de caution et disponibilités proviennent directement de chaque partenaire ci-dessous.',
      widgets: {
        'car-localrent': {
          badge: 'Localrent',
          title: 'Location Locale Vérifiée',
          subtitle: 'Véhicules sélectionnés auprès d’agences locales avec conditions transparentes.'
        },
        'car-getrentacar': {
          badge: 'GetRentacar',
          title: 'Places de Marché & Véhicules avec ou sans Chauffeur',
          subtitle: 'Comparez les offres disponibles directement sur GetRentacar.'
        },
        'car-economybookings-banner': {
          badge: 'EconomyBookings',
          title: 'Recherche Rapide Multi-Loueurs',
          subtitle: 'Accès direct aux offres de location internationale via EconomyBookings.'
        },
        'car-autoeurope': {
          badge: 'AutoEurope',
          title: 'Réseau Mondial de Location Automobile',
          subtitle: 'Recherchez votre véhicule dans plus de 24 000 agences partenaires.'
        },
        'transfer-intui': {
          badge: 'Intui.travel',
          title: 'Transferts & Navettes Aéroport Mondiales',
          subtitle: 'Découvrez les trajets populaires et tarifs transferts avec Intui.travel.'
        },
        'transfer-kiwitaxi': {
          badge: 'Kiwitaxi',
          title: 'Réservation de Chauffeur Privé à l’Arrivée',
          subtitle: 'Planifiez votre transfert aéroport porte-à-porte avec accueil personnalisé.'
        }
      },
      conciergeTitle: 'Assistance Mobilité Golden Group :',
      conciergeDesc:
        'Besoin d’un van familial à Salé, Rabat, Casablanca ou d’un transfert VIP pendant votre séjour ?',
      conciergeCta: 'Contacter sur WhatsApp'
    },
    umrah: {
      badge: 'Pèlerinages Sacrés · Accompagnement Golden Group',
      title: 'Demande de Programme El Omra / La Mecque',
      subtitle:
        'Renseignez vos préférences de voyage vers La Mecque et Médine. Notre bureau prépare votre proposition personnalisée sans frais cachés via WhatsApp.',
      departureCityLabel: 'Ville de départ',
      departureCityPlaceholder: 'Ex : Casablanca, Rabat-Salé, Tanger...',
      departureDateLabel: 'Date de départ souhaitée',
      returnDateLabel: 'Date de retour souhaitée',
      travelersLabel: 'Voyageurs',
      hotelPrefLabel: 'Préférence d’hébergement',
      hotelOptions: [
        'Hôtel 5★ Vue Haram / Clock Tower',
        'Hôtel 4★ Proche Masjid al-Haram',
        'Combiné La Mecque + Médine Confort',
        'Selon conseil de l’agence'
      ],
      packagePrefLabel: 'Type de programme souhaité',
      packageOptions: [
        'El Omra Confort (Vol + Hôtel + Visa)',
        'El Omra Prestige VIP',
        'El Omra Économique',
        'Ramadan / Chaabane',
        'Sur Mesure Famille'
      ],
      nameLabel: 'Nom complet',
      namePlaceholder: 'Votre nom et prénom',
      phoneLabel: 'Téléphone / WhatsApp',
      phonePlaceholder: 'Ex : +212 6XX-XXXXXX',
      submitBtn: 'Préparer ma Demande El Omra',
      summaryTitle: 'Récapitulatif de Votre Demande El Omra',
      whatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
      editBtn: 'Modifier la demande',
      noFakePackagesNote:
        'Les tarifs et disponibilités exacts sont confirmés par nos conseillers selon les dates et passeports.',
      errors: {
        departureCityRequired: 'Veuillez indiquer votre ville de départ.',
        dateRequired: 'Veuillez sélectionner votre date de départ souhaitée.',
        datePast: 'La date de départ ne peut pas être dans le passé.',
        returnBeforeDeparture: 'La date de retour doit être postérieure ou égale au départ.',
        contactRequired: 'Veuillez indiquer votre nom complet et votre numéro WhatsApp/téléphone.',
        adultsMin: 'Au moins 1 voyageur adulte est requis.'
      }
    },
    holidays: {
      badge: 'Voyages Organisés · Sur Mesure',
      title: 'Demande de Séjour & Vacances Clés en Main',
      subtitle:
        'Décrivez votre destination, vos dates et votre style de séjour. Nos conseillers assemblent votre devis complet vol + hôtel + transferts.',
      destinationLabel: 'Destination souhaitée',
      destinationPlaceholder: 'Ex : Turquie, Dubaï, Suisse, Paris, Maldives, Maroc...',
      departureDateLabel: 'Date de départ',
      returnDateLabel: 'Date de retour',
      travelersLabel: 'Voyageurs',
      budgetLabel: 'Préférence de budget',
      budgetOptions: [
        'Économique / Optimisé',
        'Confort 4★ Équilibré',
        'Supérieur & Luxe 5★',
        'Prestige Sur Mesure'
      ],
      packageTypeLabel: 'Type de séjour',
      packageTypeOptions: [
        'Forfait Vol + Hôtel + Transferts',
        'Tout Compris / All-Inclusive',
        'Séjour en Famille',
        'Voyage de Noces / Couple',
        'Circuit Découverte'
      ],
      nameLabel: 'Nom complet',
      namePlaceholder: 'Votre nom et prénom',
      phoneLabel: 'Téléphone / WhatsApp',
      phonePlaceholder: 'Ex : +212 6XX-XXXXXX',
      submitBtn: 'Préparer ma Demande de Séjour',
      summaryTitle: 'Récapitulatif de Votre Projet de Séjour',
      whatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
      editBtn: 'Modifier la demande',
      noFakePackagesNote:
        'Aucune disponibilité n’est simulée localement : chaque offre est vérifiée en temps réel par votre conseiller.',
      errors: {
        destinationRequired: 'Veuillez indiquer la destination souhaitée.',
        dateRequired: 'Veuillez sélectionner vos dates de voyage.',
        datePast: 'La date de départ ne peut pas être dans le passé.',
        returnBeforeDeparture: 'La date de retour doit être postérieure ou égale au départ.',
        contactRequired: 'Veuillez saisir votre nom complet et votre numéro de téléphone.',
        adultsMin: 'Au moins 1 voyageur adulte est requis.'
      }
    }
  },
  ar: {
    hubEyebrow: 'محرك البحث عن السفر · جولدن جروب',
    hubTitle: 'ابحث وخطّط لرحلتك القادمة بسهولة',
    hubSubtitle:
      'اختر الفئة المناسبة لعرض الأدوات الخاصة بها فقط: الطيران، الفنادق، العمرة، العطلات، الجولات أو تأجير السيارات.',
    servicesHubEyebrow: 'منصة الحجز الشاملة · جولدن جروب ترافيلز',
    servicesHubTitle: 'استكشف خدمات السفر لدينا',
    servicesHubSubtitle: 'كل ما تحتاجه لرحلتك القادمة في مكان واحد.',
    openDedicatedPage: 'فتح الصفحة الكاملة للخدمة',
    categories: {
      flights: { tabLabel: 'الطيران', shortSub: 'Aviasales و Kiwi' },
      hotels: { tabLabel: 'الفنادق', shortSub: 'فنادق Expedia' },
      umrah: { tabLabel: 'العمرة / مكة', shortSub: 'رحلات روحانية' },
      holidays: { tabLabel: 'العطلات', shortSub: 'باقات مخصصة' },
      tours: { tabLabel: 'الجولات والأنشطة', shortSub: 'Klook و Tiqets و WeGoTrip' },
      'car-transfers': { tabLabel: 'تأجير السيارات والنقل من المطار', shortSub: 'سيارات وسائقون' }
    },
    flights: {
      providerSelectorLabel: 'مزوّد البحث عن رحلات الطيران',
      providers: {
        aviasales: { label: 'Aviasales', sub: 'مقارنة الرحلات · EUR' },
        expedia: { label: 'Expedia', sub: 'Expedia France · طيران' }
      },
      expediaBadge: 'محرك البحث الرسمي عن الطيران · Expedia France',
      expediaTitle: 'ابحث عن تذاكر الطيران عبر Expedia',
      expediaSubtitle:
        'أدخل مدينة المغادرة والوجهة وتواريخ السفر وعدد المسافرين مباشرة في أداة Expedia الرسمية أدناه.',
      expediaNote: 'تُعرض الأسعار والرحلات الحقيقية مباشرة عبر بوابة Expedia.fr الرسمية.',
      liveBadge: 'محرك البحث الرسمي عن الطيران · Aviasales',
      liveTitle: 'ابحث عن تذاكر الطيران مباشرة',
      liveSubtitle:
        'اختر مطار الانطلاق والوصول وتواريخ السفر وعدد المسافرين مباشرة عبر أداة Aviasales المعتمدة باليورو.',
      loadingLabel: 'جاري تحميل محرك البحث Aviasales…',
      loadErrorFallback: 'تعذر عرض الأداة المدمجة هنا. يمكنك المتابعة مباشرة إلى منصة Aviasales:',
      offersBadge: 'بحث وعروض الطيران · Kiwi.com',
      offersTitle: 'بحث سريع وأبرز 4 عروض رحلات عبر Kiwi.com',
      offersSubtitle:
        'استعرض مقارنة إضافية للرحلات وأبرز 4 مسارات مقترحة مباشرة عبر أداة Kiwi.com.',
      offersLoadingLabel: 'جاري تحميل أداة Kiwi.com…',
      offersLoadErrorFallback: 'تعذر تحميل أداة Kiwi.com حالياً. يمكنك المحاولة لاحقاً أو التواصل معنا.',
      conciergeTitle: 'خدمة وكالة جولدن جروب:',
      conciergeDesc: 'لحجوزات الوجهات المتعددة أو المساعدة المباشرة من فريقنا بسلا.',
      tripRoundTrip: 'ذهاب وعودة',
      tripOneWay: 'ذهاب فقط',
      originLabel: 'مدينة أو مطار المغادرة',
      originPlaceholder: 'مثال: الدار البيضاء (CMN)، الرباط-سلا (RBA)...',
      destinationLabel: 'مدينة أو مطار الوصول',
      destinationPlaceholder: 'مثال: باريس (CDG)، إسطنبول (IST)، دبي (DXB)...',
      swapAria: 'تبديل المغادرة والوجهة',
      departureDateLabel: 'تاريخ المغادرة',
      returnDateLabel: 'تاريخ العودة',
      travelersLabel: 'المسافرون',
      adultsLabel: 'البالغون',
      adultsHint: '12 سنة فأكثر',
      childrenLabel: 'الأطفال',
      childrenHint: '2 إلى 11 سنة',
      infantsLabel: 'الرضّع',
      infantsHint: 'أقل من سنتين',
      cabinLabel: 'درجة السفر',
      cabins: {
        economy: 'الدرجة الاقتصادية',
        premium: 'الاقتصادية المميزة',
        business: 'درجة الأعمال',
        first: 'الدرجة الأولى'
      },
      searchBtn: 'تحقق وابحث عن الرحلات',
      resetBtn: 'تعديل البحث',
      summaryTitle: 'مسار الرحلة جاهز للبحث لدى الشريك',
      summarySubtitle:
        'تم التحقق من بيانات رحلتك. لعرض الأسعار والرحلات المباشرة، تابع إلى منصة Aviasales أو اطلب عرض سعر من وكالتنا.',
      aviasalesNotice:
        'يفتح الرابط موقع Aviasales الرسمي في علامة تبويب جديدة ولا يتم عرض أسعار وهمية داخل الموقع.',
      continueAviasalesBtn: 'المتابعة إلى Aviasales',
      agencyFlightQuoteBtn: 'طلب عرض سعر طيران عبر واتساب',
      futureWidgetBadge: 'بنية جاهزة · أداة Aviasales الرسمية',
      futureWidgetNote: 'مساحة مهيأة لإدراج أداة البحث الرسمية من Aviasales فور استلام الكود الخاص بها.',
      errors: {
        originRequired: 'يرجى إدخال مدينة أو مطار المغادرة.',
        destinationRequired: 'يرجى إدخال وجهة الوصول.',
        sameRoute: 'يجب أن تختلف مدينة المغادرة عن وجهة الوصول.',
        departureRequired: 'يرجى اختيار تاريخ المغادرة.',
        departurePast: 'لا يمكن أن يكون تاريخ المغادرة في الماضي.',
        returnRequired: 'يرجى اختيار تاريخ العودة لرحلة الذهاب والعودة.',
        returnBeforeDeparture: 'يجب أن يكون تاريخ العودة بعد تاريخ المغادرة أو في نفس اليوم.',
        adultsMin: 'يجب وجود مسافر بالغ واحد على الأقل.',
        infantsExceedAdults: 'لا يمكن أن يتجاوز عدد الرضّع عدد البالغين.',
        maxPassengers: 'الحد الأقصى هو 9 مسافرين في البحث الواحد.'
      }
    },
    hotels: {
      badge: 'البحث الفندقي الرسمي · Expedia',
      title: 'ابحث عن الفنادق مباشرة عبر Expedia',
      subtitle:
        'استخدم حقول البحث الرسمية في أداة Expedia (الوجهة، تسجيل الدخول، المغادرة، الغرف، البالغون والأطفال) لإجراء بحث حقيقي عن الفنادق.',
      includesLabel: 'عناصر البحث المتوفرة في أداة الفنادق',
      includesItems: [
        'اختيار الوجهة أو المدينة أو الفندق',
        'تحديد تواريخ الوصول والمغادرة',
        'عدد الغرف والبالغين والأطفال',
        'عرض النتائج المباشرة على Expedia.fr'
      ],
      widgetNote: 'جميع النتائج والتوافر تُعرض مباشرة من Expedia عبر هذه الأداة الرسمية.',
      agencyHotelTitle: 'تفضل حجزاً مخصصاً عبر وكالتنا بسلا؟',
      agencyHotelDesc: 'يمكنك أيضاً تحديد أي فندق على خرائط جوجل والتواصل مباشرة مع مستشارينا.',
      agencyHotelBtn: 'الانتقال إلى خرائط جوجل والحجز'
    },
    tours: {
      badge: 'الجولات والأنشطة السياحية · شركاء رسميون',
      title: 'استكشف الجولات والأنشطة حول العالم',
      subtitle:
        'تصفح العروض المباشرة من شركائنا Klook و Tiqets و WeGoTrip أو انتقل إلى منصتي Klook و KKday.',
      destinationLabel: 'الوجهة المرغوبة',
      destinationPlaceholder: 'مثال: مراكش، إسطنبول، دبي، باريس، سويسرا...',
      quickDestinationsLabel: 'وجهات شائعة',
      selectedDestinationLabel: 'الوجهة المختارة:',
      transparencyNote: 'تُعرض الأنشطة التالية مباشرة عبر الأدوات الرسمية لكل شريك.',
      widgetsHeader: 'عروض وتجارب الشركاء المباشرة',
      widgetsSubtitle: 'قارن التذاكر، الجولات الثقافية والأدلة الصوتية عبر مزوّدين عالميين.',
      widgetLoadingLabel: 'جاري تحميل أداة الشريك…',
      widgetLoadErrorFallback: 'تعذر تحميل هذه الأداة حالياً. استخدم روابط الشركاء المباشرة أدناه.',
      widgets: {
        'tours-klook-dynamic': {
          badge: 'Klook · التذاكر والأنشطة',
          title: 'تجارب وجولات مختارة عبر Klook',
          subtitle: 'أبرز الأنشطة وتذاكر المعالم والرحلات الحضرية من Klook.'
        },
        'tours-tiqets-discovery': {
          badge: 'Tiqets · المتاحف والمعالم',
          title: 'تذاكر المتاحف والمعالم السياحية',
          subtitle: 'بطاقات دخول مباشرة وجولات ثقافية عبر Tiqets.'
        },
        'tours-wegotrip-audio': {
          badge: 'WeGoTrip · الجولات الصوتية',
          title: 'جولات صوتية إرشادية وتذاكر',
          subtitle: 'استكشف أشهر المعالم مع أدلة صوتية عبر WeGoTrip.'
        }
      },
      klookTitle: 'Klook · التذاكر والأنشطة السياحية',
      klookDesc: 'تذاكر المعالم، الجولات الإرشادية وتجارب المدن حول العالم.',
      klookCta: 'استكشف الأنشطة مع Klook',
      kkdayTitle: 'KKday · الجولات والرحلات اليومية',
      kkdayDesc: 'رحلات يومية منظمة وتجارب ثقافية وسياحية مختارة.',
      kkdayCta: 'استكشف الجولات مع KKday',
      customTourBtn: 'طلب جولة خاصة عبر واتساب',
      architectureNote: 'هل تبحث عن برنامج جولات خاص انطلاقاً من سلا أو الرباط؟'
    },
    carTransfers: {
      badge: 'التنقل والنقل الخاص · شركاء رسميون',
      title: 'تأجير السيارات والنقل من المطار',
      subtitle:
        'اختر بين استئجار السيارات من شركات عالمية ومحلية موثوقة أو حجز خدمة الاستقبال والنقل من المطار.',
      tabSelectorLabel: 'اختر خدمة التنقل',
      tabs: {
        car_rentals: { label: 'تأجير السيارات', sub: '4 شركاء' },
        airport_transfers: { label: 'النقل من المطار', sub: 'شريكان' }
      },
      carRentalsTitle: 'محركات تأجير السيارات المعتمدة',
      carRentalsSubtitle:
        'قارن واحجز سيارتك مباشرة عبر Localrent و GetRentacar و EconomyBookings و AutoEurope.',
      transfersTitle: 'خدمات النقل والاستقبال من المطار',
      transfersSubtitle:
        'احجز سيارة خاصة أو خدمة توصيل مريحة عند الوصول عبر Intui.travel أو Kiwitaxi.',
      loadingLabel: 'جاري تحميل أداة الشريك…',
      loadErrorFallback: 'تعذر عرض الأداة حالياً. تواصل معنا عبر واتساب لتنظيم تنقلك.',
      transparencyNote: 'تُعرض الأسعار والتوافر والشروط مباشرة من كل شريك أدناه.',
      widgets: {
        'car-localrent': {
          badge: 'Localrent',
          title: 'تأجير سيارات من مزوّدين محليين',
          subtitle: 'سيارات مختارة بشروط واضحة وعربون مناسب عبر Localrent.'
        },
        'car-getrentacar': {
          badge: 'GetRentacar',
          title: 'مقارنة عروض السيارات المباشرة',
          subtitle: 'استكشف خيارات الاستئجار المتاحة مباشرة عبر GetRentacar.'
        },
        'car-economybookings-banner': {
          badge: 'EconomyBookings',
          title: 'بحث سريع عن أفضل الأسعار',
          subtitle: 'ابحث عبر شبكة واسعة من شركات التأجير العالمية مع EconomyBookings.'
        },
        'car-autoeurope': {
          badge: 'AutoEurope',
          title: 'تأجير السيارات في أكثر من 24,000 محطة',
          subtitle: 'محرك البحث العالمي لتأجير السيارات من AutoEurope.'
        },
        'transfer-intui': {
          badge: 'Intui.travel',
          title: 'النقل من المطار في الوجهات العالمية',
          subtitle: 'استكشف أبرز مسارات التوصيل من المطارات عبر Intui.travel.'
        },
        'transfer-kiwitaxi': {
          badge: 'Kiwitaxi',
          title: 'خدمة سائق خاص واستقبال بالمطار',
          subtitle: 'احجز توصيلك الخاص من المطار إلى الفندق مباشرة عبر Kiwitaxi.'
        }
      },
      conciergeTitle: 'مساعدة النقل من جولدن جروب:',
      conciergeDesc: 'هل تحتاج إلى سيارة عائلية أو استقبال خاص في سلا أو الرباط أو الدار البيضاء؟',
      conciergeCta: 'تواصل عبر واتساب'
    },
    umrah: {
      badge: 'العمرة والحج · جولدن جروب',
      title: 'طلب برنامج العمرة / مكة المكرمة',
      subtitle:
        'شاركنا تفاصيل رحلتك المباركة إلى مكة والمدينة المنورة ليقوم فريقنا بإعداد عرض دقيق ومناسب عبر واتساب.',
      departureCityLabel: 'مدينة المغادرة',
      departureCityPlaceholder: 'مثال: الدار البيضاء، الرباط-سلا، طنجة...',
      departureDateLabel: 'تاريخ السفر المفضل',
      returnDateLabel: 'تاريخ العودة المفضل',
      travelersLabel: 'عدد المسافرين',
      hotelPrefLabel: 'تفضيل الفندق',
      hotelOptions: [
        'فندق 5 نجوم مطل على الحرم / أبراج الساعة',
        'فندق 4 نجوم قريب من المسجد الحرام',
        'باقة مكة + المدينة مريحة',
        'حسب اقتراح الوكالة'
      ],
      packagePrefLabel: 'تفضيل الباقة',
      packageOptions: [
        'عمرة مريحة (طيران + فندق + تأشيرة)',
        'عمرة VIP فاخرة',
        'عمرة اقتصادية',
        'عمرة رمضان / شعبان',
        'برنامج عائلي خاص'
      ],
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'الاسم والنسب',
      phoneLabel: 'رقم الهاتف / واتساب',
      phonePlaceholder: 'مثال: 0666-XXXXXX',
      submitBtn: 'تجهيز طلب العمرة',
      summaryTitle: 'ملخص طلب العمرة الخاص بك',
      whatsappBtn: 'إرسال عبر واتساب (0666-484815)',
      editBtn: 'تعديل الطلب',
      noFakePackagesNote: 'يتم تأكيد الأسعار والتوافر الفعلي من قِبل مستشاري الوكالة.',
      errors: {
        departureCityRequired: 'يرجى إدخال مدينة المغادرة.',
        dateRequired: 'يرجى تحديد تاريخ السفر المفضل.',
        datePast: 'لا يمكن اختيار تاريخ في الماضي.',
        returnBeforeDeparture: 'يجب أن يكون تاريخ العودة بعد تاريخ المغادرة.',
        contactRequired: 'يرجى إدخال الاسم الكامل ورقم الهاتف.',
        adultsMin: 'يجب وجود مسافر بالغ واحد على الأقل.'
      }
    },
    holidays: {
      badge: 'عطلات منظمة · حسب الطلب',
      title: 'طلب باقة عطلة شاملة',
      subtitle:
        'حدد الوجهة وتواريخ السفر والميزانية المفضلة، وسيتولى مستشارونا تنسيق العرض المناسب عبر واتساب.',
      destinationLabel: 'الوجهة المرغوبة',
      destinationPlaceholder: 'مثال: إسطنبول، دبي، سويسرا، باريس، المالديف...',
      departureDateLabel: 'تاريخ الذهاب',
      returnDateLabel: 'تاريخ العودة',
      travelersLabel: 'المسافرون',
      budgetLabel: 'تفضيل الميزانية',
      budgetOptions: ['اقتصادية', 'متوسطة 4 نجوم', 'فاخرة 5 نجوم', 'باقة VIP مخصصة'],
      packageTypeLabel: 'نوع الباقة',
      packageTypeOptions: [
        'طيران + فندق + مواصلات',
        'إقامة شاملة كلياً (All-Inclusive)',
        'عطلة عائلية',
        'رحلة شهر العسل',
        'جولة سياحية متعددة المدن'
      ],
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'الاسم والنسب',
      phoneLabel: 'رقم الهاتف / واتساب',
      phonePlaceholder: 'مثال: 0666-XXXXXX',
      submitBtn: 'تجهيز طلب العطلة',
      summaryTitle: 'ملخص طلب العطلة الخاص بك',
      whatsappBtn: 'إرسال عبر واتساب (0666-484815)',
      editBtn: 'تعديل الطلب',
      noFakePackagesNote: 'لا يتم عرض أسعار أو توافر وهمي: يتم التأكيد مباشرة عبر فريقنا.',
      errors: {
        destinationRequired: 'يرجى إدخال الوجهة المرغوبة.',
        dateRequired: 'يرجى اختيار تواريخ السفر.',
        datePast: 'لا يمكن اختيار تاريخ في الماضي.',
        returnBeforeDeparture: 'يجب أن يكون تاريخ العودة بعد تاريخ الذهاب.',
        contactRequired: 'يرجى إدخال الاسم ورقم الهاتف.',
        adultsMin: 'يجب وجود مسافر بالغ واحد على الأقل.'
      }
    }
  },
  en: {
    hubEyebrow: 'Travel Search Engine · Golden Group Travels',
    hubTitle: 'Search & Plan Your Next Journey',
    hubSubtitle:
      'Choose a travel category below to display only the relevant search or inquiry tools: Flights, Expedia Hotels, Umrah, Holidays, Tours, or Car Rentals & Transfers.',
    servicesHubEyebrow: 'Complete Travel Booking Hub · Golden Group Travels',
    servicesHubTitle: 'Explore Our Travel Services',
    servicesHubSubtitle: 'Everything you need for your next journey, all in one place.',
    openDedicatedPage: 'Open Full Service Page',
    categories: {
      flights: { tabLabel: 'Flights', shortSub: 'Aviasales & Kiwi' },
      hotels: { tabLabel: 'Hotels', shortSub: 'Expedia Stays' },
      umrah: { tabLabel: 'El Omra / Makkah', shortSub: 'Sacred Journeys' },
      holidays: { tabLabel: 'Holidays', shortSub: 'Bespoke Stays' },
      tours: { tabLabel: 'Tours & Activities', shortSub: 'Klook, Tiqets & WeGoTrip' },
      'car-transfers': { tabLabel: 'Car Rentals & Airport Transfers', shortSub: 'Cars & Chauffeurs' }
    },
    flights: {
      providerSelectorLabel: 'Flight Search Provider',
      providers: {
        aviasales: { label: 'Aviasales', sub: 'Fare Search · EUR' },
        expedia: { label: 'Expedia', sub: 'Expedia France · Flights' }
      },
      expediaBadge: 'Official Flight Search · Expedia France',
      expediaTitle: 'Search Flights Directly with Expedia',
      expediaSubtitle:
        'Enter your departure, destination, travel dates, and passengers inside the official Expedia.fr flight search controls below.',
      expediaNote:
        'Live flight schedules and fares are served directly by Expedia Group in a new tab.',
      liveBadge: 'Official Flight Search · Aviasales',
      liveTitle: 'Search Live Airline Fares',
      liveSubtitle:
        'Pick your origin, destination, travel dates, and passengers directly inside the official Aviasales search widget below (EUR).',
      loadingLabel: 'Loading official Aviasales flight widget…',
      loadErrorFallback:
        'The embedded widget could not load here. Continue directly to Aviasales search:',
      offersBadge: 'Flight Search & Route Offers · Kiwi.com',
      offersTitle: 'Additional Flight Search & Featured Route Offers via Kiwi.com',
      offersSubtitle:
        'Compare additional airfare options and up to 4 live flight route offers powered by Kiwi.com.',
      offersLoadingLabel: 'Loading official Kiwi.com flight offers widget…',
      offersLoadErrorFallback:
        'The Kiwi.com widget could not load here right now. Try again shortly or message our desk on WhatsApp.',
      conciergeTitle: 'Golden Group Concierge Desk:',
      conciergeDesc: 'Need multi-city routing or personal assistance from our Salé office?',
      tripRoundTrip: 'Round-trip',
      tripOneWay: 'One-way',
      originLabel: 'Origin airport or city',
      originPlaceholder: 'e.g. Casablanca (CMN), Rabat-Salé (RBA)...',
      destinationLabel: 'Destination airport or city',
      destinationPlaceholder: 'e.g. Paris (CDG), Istanbul (IST), Dubai (DXB)...',
      swapAria: 'Swap origin and destination',
      departureDateLabel: 'Departure date',
      returnDateLabel: 'Return date',
      travelersLabel: 'Passengers',
      adultsLabel: 'Adults',
      adultsHint: '12+ yrs',
      childrenLabel: 'Children',
      childrenHint: '2–11 yrs',
      infantsLabel: 'Infants',
      infantsHint: 'Under 2 yrs',
      cabinLabel: 'Cabin class',
      cabins: {
        economy: 'Economy',
        premium: 'Premium Economy',
        business: 'Business',
        first: 'First Class'
      },
      searchBtn: 'Validate & Search Flights',
      resetBtn: 'Edit flight criteria',
      summaryTitle: 'Flight Criteria Ready for Partner Search',
      summarySubtitle:
        'Your dates and passenger details are validated. Continue directly to Aviasales for live flight search results, or request an agency quote below.',
      aviasalesNotice:
        'Opens the official Aviasales partner portal in a new tab. No simulated fares are displayed inside Golden Group Travels.',
      continueAviasalesBtn: 'Continue to Aviasales',
      agencyFlightQuoteBtn: 'Request Flight Quote via WhatsApp',
      futureWidgetBadge: 'Architecture Ready · Official Aviasales Widget Slot',
      futureWidgetNote:
        'Dedicated modular container prepared to mount the official Aviasales search widget once supplied.',
      errors: {
        originRequired: 'Please enter an origin airport or city.',
        destinationRequired: 'Please enter a destination airport or city.',
        sameRoute: 'Origin and destination must be different.',
        departureRequired: 'Please select a departure date.',
        departurePast: 'Departure date cannot be in the past.',
        returnRequired: 'Please select a return date for a round-trip flight.',
        returnBeforeDeparture: 'Return date must be on or after the departure date.',
        adultsMin: 'At least 1 adult passenger is required.',
        infantsExceedAdults: 'Number of infants cannot exceed number of adults.',
        maxPassengers: 'Maximum 9 total passengers per search.'
      }
    },
    hotels: {
      badge: 'Official Hotel Search · Expedia Stays',
      title: 'Search Live Hotels Directly with Expedia',
      subtitle:
        'Use the official Expedia stays widget controls (destination, check-in, check-out, rooms, adults, children, search) for live Expedia hotel searches.',
      includesLabel: 'Included inside the official Expedia Hotels controls',
      includesItems: [
        'Destination city or property search',
        'Check-in & check-out calendar dates',
        'Number of rooms, adults, and children',
        'Direct live search on Expedia.fr'
      ],
      widgetNote:
        'Live hotel availability and pricing are served exclusively by Expedia Group inside this widget.',
      agencyHotelTitle: 'Prefer bespoke hotel assistance from our Salé desk?',
      agencyHotelDesc:
        'Locate any hotel worldwide on Google Maps and request tailored agency booking support via WhatsApp.',
      agencyHotelBtn: 'Open Google Maps Hotel Planner'
    },
    tours: {
      badge: 'Tours & Activities · Official Partners',
      title: 'Explore Tours & Activities Worldwide',
      subtitle:
        'Browse live curated activities from Klook, Tiqets, and WeGoTrip below, or open partner portals for full global catalogs.',
      destinationLabel: 'Destination of interest',
      destinationPlaceholder: 'e.g. Marrakech, Istanbul, Dubai, Paris, Swiss Alps...',
      quickDestinationsLabel: 'Popular destinations',
      selectedDestinationLabel: 'Noted destination:',
      transparencyNote:
        'Live experiences and prices below are served directly inside each partner’s official widget.',
      widgetsHeader: 'Live Partner Experiences',
      widgetsSubtitle:
        'Browse attractions, skip-the-line museum passes, and audio tours across trusted providers.',
      widgetLoadingLabel: 'Loading official partner widget…',
      widgetLoadErrorFallback:
        'This partner widget could not load right now. You can use the direct partner portals below.',
      widgets: {
        'tours-klook-dynamic': {
          badge: 'Klook · Activities & Passes',
          title: 'Featured Tours & Day Activities',
          subtitle: 'Handpicked attraction tickets and city experiences powered by Klook.'
        },
        'tours-tiqets-discovery': {
          badge: 'Tiqets · Museums & Landmarks',
          title: 'Cultural Landmarks & Museum Entry',
          subtitle: 'Instant-entry tickets and curated cultural highlights powered by Tiqets.'
        },
        'tours-wegotrip-audio': {
          badge: 'WeGoTrip · Audio Tours',
          title: 'Self-Guided Audio Tours & Tickets',
          subtitle: 'Curated self-guided audio routes and attraction tickets by WeGoTrip.'
        }
      },
      klookTitle: 'Klook · Activities, Tickets & Day Trips',
      klookDesc: 'Attraction passes, guided tours, transfers, and city experiences worldwide.',
      klookCta: 'Explore activities with Klook',
      kkdayTitle: 'KKday · Guided Tours & Cultural Experiences',
      kkdayDesc: 'Curated sightseeing tours, day excursions, and local activity bookings.',
      kkdayCta: 'Explore tours with KKday',
      customTourBtn: 'Request Custom Tour via WhatsApp',
      architectureNote: 'Looking for a custom private excursion or group itinerary from Morocco?'
    },
    carTransfers: {
      badge: 'Mobility & Chauffeurs · Official Partners',
      title: 'Car Rentals & Airport Transfers',
      subtitle:
        'Switch between trusted car rental providers and door-to-door airport transfer bookings in one organized space.',
      tabSelectorLabel: 'Select mobility service',
      tabs: {
        car_rentals: { label: 'Car Rentals', sub: '4 Providers' },
        airport_transfers: { label: 'Airport Transfers', sub: '2 Providers' }
      },
      carRentalsTitle: 'Official Car Rental Search Partners',
      carRentalsSubtitle:
        'Compare rental vehicles across Localrent, GetRentacar, EconomyBookings, and AutoEurope.',
      transfersTitle: 'Private Airport Transfers & Shuttles',
      transfersSubtitle:
        'Book door-to-door airport pickups and private transfers with Intui.travel or Kiwitaxi.',
      loadingLabel: 'Loading official partner widget…',
      loadErrorFallback:
        'This partner widget could not load right now. Contact our Salé desk on WhatsApp for direct arrangements.',
      transparencyNote:
        'All vehicle availability, deposits, and transfer rates come directly from the official partner widgets below.',
      widgets: {
        'car-localrent': {
          badge: 'Localrent',
          title: 'Verified Local Car Rentals',
          subtitle: 'Transparent local fleet bookings with clear terms powered by Localrent.'
        },
        'car-getrentacar': {
          badge: 'GetRentacar',
          title: 'Global Rental Marketplace',
          subtitle: 'Search direct rental offers and driver options through GetRentacar.'
        },
        'car-economybookings-banner': {
          badge: 'EconomyBookings',
          title: 'Multi-Supplier Rate Search',
          subtitle: 'Quick access to global car hire comparison powered by EconomyBookings.'
        },
        'car-autoeurope': {
          badge: 'AutoEurope',
          title: 'Worldwide Rental Network',
          subtitle: 'Compare rental locations across 24,000+ pickup points via AutoEurope.'
        },
        'transfer-intui': {
          badge: 'Intui.travel',
          title: 'Worldwide Airport Transfer Routes',
          subtitle: 'Browse popular airport shuttle and private car transfers on Intui.travel.'
        },
        'transfer-kiwitaxi': {
          badge: 'Kiwitaxi',
          title: 'Private Meet & Greet Transfers',
          subtitle: 'Search door-to-door private airport transfers with Kiwitaxi.'
        }
      },
      conciergeTitle: 'Golden Group Mobility Assistance:',
      conciergeDesc:
        'Need a private chauffeur, family van, or executive pickup in Salé, Rabat, or Casablanca?',
      conciergeCta: 'Message on WhatsApp'
    },
    umrah: {
      badge: 'Sacred Pilgrimages · Golden Group Concierge',
      title: 'El Omra / Makkah Package Inquiry',
      subtitle:
        'Share your departure city, preferred dates, and hotel preferences for Makkah & Madinah. Our advisors prepare your tailored quote directly on WhatsApp.',
      departureCityLabel: 'Departure city',
      departureCityPlaceholder: 'e.g. Casablanca, Rabat-Salé, Tangier...',
      departureDateLabel: 'Preferred departure date',
      returnDateLabel: 'Preferred return date',
      travelersLabel: 'Travelers',
      hotelPrefLabel: 'Hotel preference',
      hotelOptions: [
        '5★ Haram-View / Clock Tower',
        '4★ Close to Masjid al-Haram',
        'Makkah + Madinah Comfort Pair',
        'Agency Recommendation'
      ],
      packagePrefLabel: 'Package preference',
      packageOptions: [
        'El Omra Comfort (Flights + Hotel + Visa)',
        'El Omra VIP Prestige',
        'El Omra Economy',
        'Ramadan / Shaaban',
        'Custom Family Pilgrimage'
      ],
      nameLabel: 'Full name',
      namePlaceholder: 'Your full name',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: 'e.g. +212 6XX-XXXXXX',
      submitBtn: 'Prepare El Omra Inquiry',
      summaryTitle: 'El Omra Inquiry Summary',
      whatsappBtn: 'Send on WhatsApp (0666-484815)',
      editBtn: 'Edit inquiry',
      noFakePackagesNote:
        'Exact availability and pricing are verified live by our Salé pilgrimage advisors.',
      errors: {
        departureCityRequired: 'Please enter your departure city.',
        dateRequired: 'Please select a preferred departure date.',
        datePast: 'Departure date cannot be in the past.',
        returnBeforeDeparture: 'Return date must be on or after the departure date.',
        contactRequired: 'Please provide your full name and phone/WhatsApp number.',
        adultsMin: 'At least 1 adult traveler is required.'
      }
    },
    holidays: {
      badge: 'Curated Getaways · Tailor-Made',
      title: 'Holiday Package Inquiry',
      subtitle:
        'Tell us your destination, travel dates, budget tier, and package style. Our travel specialists respond via WhatsApp with real verified options.',
      destinationLabel: 'Destination',
      destinationPlaceholder: 'e.g. Turkey, Dubai, Switzerland, Paris, Maldives...',
      departureDateLabel: 'Departure date',
      returnDateLabel: 'Return date',
      travelersLabel: 'Travelers',
      budgetLabel: 'Budget preference',
      budgetOptions: ['Value / Economy', 'Comfort 4★', 'Luxury 5★', 'Bespoke Prestige'],
      packageTypeLabel: 'Package type',
      packageTypeOptions: [
        'Flight + Hotel + Transfers',
        'All-Inclusive Resort',
        'Family Holiday',
        'Honeymoon / Couples',
        'Multi-City Discovery Tour'
      ],
      nameLabel: 'Full name',
      namePlaceholder: 'Your full name',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: 'e.g. +212 6XX-XXXXXX',
      submitBtn: 'Prepare Holiday Inquiry',
      summaryTitle: 'Holiday Inquiry Summary',
      whatsappBtn: 'Send on WhatsApp (0666-484815)',
      editBtn: 'Edit inquiry',
      noFakePackagesNote:
        'No simulated availability or prices shown: all options are checked directly by our advisors.',
      errors: {
        destinationRequired: 'Please enter a holiday destination.',
        dateRequired: 'Please select your travel dates.',
        datePast: 'Departure date cannot be in the past.',
        returnBeforeDeparture: 'Return date must be on or after the departure date.',
        contactRequired: 'Please enter your full name and phone/WhatsApp number.',
        adultsMin: 'At least 1 adult traveler is required.'
      }
    }
  },
  es: {
    hubEyebrow: 'Buscador de Viajes · Golden Group Travels',
    hubTitle: 'Busca y Planifica Tu Próximo Viaje',
    hubSubtitle:
      'Elige una categoría para mostrar solo los campos necesarios: Vuelos, Hoteles Expedia, El Omra, Vacaciones, Tours o Alquiler de Coches.',
    servicesHubEyebrow: 'Centro Integral de Reservas · Golden Group Travels',
    servicesHubTitle: 'Explora Nuestros Servicios de Viaje',
    servicesHubSubtitle: 'Todo lo que necesitas para tu próximo viaje, en un solo lugar.',
    openDedicatedPage: 'Abrir Página Completa',
    categories: {
      flights: { tabLabel: 'Vuelos', shortSub: 'Aviasales y Kiwi' },
      hotels: { tabLabel: 'Hoteles', shortSub: 'Expedia Stays' },
      umrah: { tabLabel: 'El Omra / La Meca', shortSub: 'Viajes Sagrados' },
      holidays: { tabLabel: 'Vacaciones', shortSub: 'Paquetes a Medida' },
      tours: { tabLabel: 'Tours y Actividades', shortSub: 'Klook, Tiqets y WeGoTrip' },
      'car-transfers': { tabLabel: 'Coches y Traslados Aeropuerto', shortSub: 'Alquiler y Traslados' }
    },
    flights: {
      providerSelectorLabel: 'Proveedor de búsqueda de vuelos',
      providers: {
        aviasales: { label: 'Aviasales', sub: 'Buscador · EUR' },
        expedia: { label: 'Expedia', sub: 'Expedia France · Vuelos' }
      },
      expediaBadge: 'Buscador Oficial de Vuelos · Expedia France',
      expediaTitle: 'Buscar Vuelos Directamente con Expedia',
      expediaSubtitle:
        'Introduce origen, destino, fechas y pasajeros directamente en el buscador oficial de Expedia.fr.',
      expediaNote:
        'Los horarios y tarifas reales se muestran directamente en Expedia Group en una nueva pestaña.',
      liveBadge: 'Buscador Oficial de Vuelos · Aviasales',
      liveTitle: 'Buscar Vuelos en Tiempo Real',
      liveSubtitle:
        'Elige origen, destino, fechas y pasajeros directamente en el buscador oficial de Aviasales (EUR).',
      loadingLabel: 'Cargando el buscador oficial de Aviasales…',
      loadErrorFallback:
        'No se pudo cargar el widget aquí. Continúa directamente al buscador de Aviasales:',
      offersBadge: 'Búsqueda y Ofertas de Vuelos · Kiwi.com',
      offersTitle: 'Buscador Adicional y 4 Ofertas Destacadas con Kiwi.com',
      offersSubtitle:
        'Complementa tu comparación con el buscador de Kiwi.com y hasta 4 propuestas de rutas.',
      offersLoadingLabel: 'Cargando el módulo oficial de Kiwi.com…',
      offersLoadErrorFallback:
        'No se pudo cargar el widget de Kiwi.com ahora. Puedes intentarlo de nuevo o escribirnos por WhatsApp.',
      conciergeTitle: 'Asistencia Golden Group:',
      conciergeDesc: '¿Necesitas itinerarios multidestino o atención personalizada en Salé?',
      tripRoundTrip: 'Ida y vuelta',
      tripOneWay: 'Solo ida',
      originLabel: 'Aeropuerto o ciudad de origen',
      originPlaceholder: 'Ej.: Casablanca (CMN), Rabat-Salé (RBA)...',
      destinationLabel: 'Aeropuerto o ciudad de destino',
      destinationPlaceholder: 'Ej.: París (CDG), Estambul (IST), Dubái (DXB)...',
      swapAria: 'Intercambiar origen y destino',
      departureDateLabel: 'Fecha de salida',
      returnDateLabel: 'Fecha de regreso',
      travelersLabel: 'Pasajeros',
      adultsLabel: 'Adultos',
      adultsHint: '12+ años',
      childrenLabel: 'Niños',
      childrenHint: '2–11 años',
      infantsLabel: 'Bebés',
      infantsHint: 'Menores de 2 años',
      cabinLabel: 'Clase de cabina',
      cabins: {
        economy: 'Turista',
        premium: 'Turista Premium',
        business: 'Business',
        first: 'Primera Clase'
      },
      searchBtn: 'Validar y Buscar Vuelos',
      resetBtn: 'Editar búsqueda',
      summaryTitle: 'Ruta Lista para Búsqueda Asociada',
      summarySubtitle:
        'Tus datos han sido validados. Continúa a Aviasales para consultar vuelos en directo o solicita asistencia a nuestra agencia.',
      aviasalesNotice:
        'Abre el portal oficial de Aviasales en una nueva pestaña. No se muestran tarifas ficticias.',
      continueAviasalesBtn: 'Continuar a Aviasales',
      agencyFlightQuoteBtn: 'Solicitar cotización por WhatsApp',
      futureWidgetBadge: 'Arquitectura Preparada · Espacio Widget Aviasales',
      futureWidgetNote: 'Contenedor modular listo para insertar el widget oficial de Aviasales.',
      errors: {
        originRequired: 'Introduce una ciudad o aeropuerto de origen.',
        destinationRequired: 'Introduce una ciudad o aeropuerto de destino.',
        sameRoute: 'El origen y el destino deben ser diferentes.',
        departureRequired: 'Selecciona una fecha de salida.',
        departurePast: 'La fecha de salida no puede ser anterior a hoy.',
        returnRequired: 'Selecciona una fecha de regreso para ida y vuelta.',
        returnBeforeDeparture: 'La fecha de regreso debe ser igual o posterior a la salida.',
        adultsMin: 'Se requiere al menos 1 pasajero adulto.',
        infantsExceedAdults: 'El número de bebés no puede superar al de adultos.',
        maxPassengers: 'Máximo 9 pasajeros por búsqueda.'
      }
    },
    hotels: {
      badge: 'Buscador Oficial de Hoteles · Expedia Stays',
      title: 'Buscar Hoteles en Vivo con Expedia',
      subtitle:
        'Usa directamente los controles oficiales de Expedia (destino, entrada, salida, habitaciones, adultos y niños) para realizar búsquedas reales de hoteles.',
      includesLabel: 'Controles oficiales incluidos en el widget de Expedia',
      includesItems: [
        'Ciudad o alojamiento de destino',
        'Fechas de entrada y salida',
        'Número de habitaciones, adultos y niños',
        'Resultados en directo en Expedia.fr'
      ],
      widgetNote: 'La disponibilidad y tarifas reales se muestran dentro del widget de Expedia.',
      agencyHotelTitle: '¿Prefieres atención personalizada en nuestra agencia de Salé?',
      agencyHotelDesc:
        'Ubica cualquier hotel en Google Maps y solicita confirmación asistida por WhatsApp.',
      agencyHotelBtn: 'Abrir Planificador Google Maps'
    },
    tours: {
      badge: 'Tours y Actividades · Socios Oficiales',
      title: 'Explorar Tours y Actividades en el Mundo',
      subtitle:
        'Explora selecciones en directo de Klook, Tiqets y WeGoTrip o abre los portales de Klook y KKday.',
      destinationLabel: 'Destino de interés',
      destinationPlaceholder: 'Ej.: Marrakech, Estambul, Dubái, París, Suiza...',
      quickDestinationsLabel: 'Destinos populares',
      selectedDestinationLabel: 'Destino anotado:',
      transparencyNote:
        'Las actividades mostradas provienen directamente de los widgets oficiales de cada socio.',
      widgetsHeader: 'Experiencias en Vivo de Socios',
      widgetsSubtitle: 'Compara entradas, visitas culturales y audioguías en destinos de todo el mundo.',
      widgetLoadingLabel: 'Cargando módulo del socio…',
      widgetLoadErrorFallback:
        'No se pudo cargar este módulo ahora. Utiliza los enlaces directos de abajo.',
      widgets: {
        'tours-klook-dynamic': {
          badge: 'Klook · Actividades y Pases',
          title: 'Actividades y Excursiones Destacadas',
          subtitle: 'Entradas a atracciones y experiencias urbanas con Klook.'
        },
        'tours-tiqets-discovery': {
          badge: 'Tiqets · Museos y Monumentos',
          title: 'Cultura y Entradas Sin Colas',
          subtitle: 'Selección de museos, monumentos y atracciones con Tiqets.'
        },
        'tours-wegotrip-audio': {
          badge: 'WeGoTrip · Audioguías y Entradas',
          title: 'Tours Autoguiados con Audio',
          subtitle: 'Recorridos en audio y entradas seleccionadas por WeGoTrip.'
        }
      },
      klookTitle: 'Klook · Actividades, Entradas y Excursiones',
      klookDesc: 'Entradas a atracciones, visitas guiadas y traslados en todo el mundo.',
      klookCta: 'Explorar actividades con Klook',
      kkdayTitle: 'KKday · Tours Guiados y Experiencias',
      kkdayDesc: 'Circuitos culturales y excursiones organizadas de día completo.',
      kkdayCta: 'Explorar tours con KKday',
      customTourBtn: 'Solicitar tour privado por WhatsApp',
      architectureNote: '¿Buscas una excursión privada o un circuito a medida desde Marruecos?'
    },
    carTransfers: {
      badge: 'Movilidad y Traslados · Socios Oficiales',
      title: 'Alquiler de Coches y Traslados al Aeropuerto',
      subtitle:
        'Elige entre comparadores oficiales de alquiler de vehículos o traslados privados puerta a puerta desde el aeropuerto.',
      tabSelectorLabel: 'Seleccionar servicio de movilidad',
      tabs: {
        car_rentals: { label: 'Alquiler de Coches', sub: '4 Proveedores' },
        airport_transfers: { label: 'Traslados Aeropuerto', sub: '2 Proveedores' }
      },
      carRentalsTitle: 'Buscadores Oficiales de Alquiler de Coches',
      carRentalsSubtitle:
        'Compara vehículos directamente con Localrent, GetRentacar, EconomyBookings y AutoEurope.',
      transfersTitle: 'Traslados Privados y Lanzaderas de Aeropuerto',
      transfersSubtitle:
        'Reserva tu recogida privada en el aeropuerto con Intui.travel o Kiwitaxi.',
      loadingLabel: 'Cargando módulo del socio…',
      loadErrorFallback:
        'No se pudo mostrar el módulo ahora. Escríbenos por WhatsApp para coordinar tu traslado.',
      transparencyNote:
        'Disponibilidad, depósitos y tarifas provienen directamente de cada proveedor oficial.',
      widgets: {
        'car-localrent': {
          badge: 'Localrent',
          title: 'Alquiler Local Verificado',
          subtitle: 'Vehículos seleccionados con condiciones transparentes vía Localrent.'
        },
        'car-getrentacar': {
          badge: 'GetRentacar',
          title: 'Mercado Global de Vehículos',
          subtitle: 'Explora opciones de alquiler directo y con conductor en GetRentacar.'
        },
        'car-economybookings-banner': {
          badge: 'EconomyBookings',
          title: 'Comparativa Rápida Multi-Flota',
          subtitle: 'Acceso directo a ofertas de alquiler de coches con EconomyBookings.'
        },
        'car-autoeurope': {
          badge: 'AutoEurope',
          title: 'Red Mundial de Alquiler de Coches',
          subtitle: 'Busca vehículos en más de 24 000 oficinas asociadas con AutoEurope.'
        },
        'transfer-intui': {
          badge: 'Intui.travel',
          title: 'Traslados Mundiales desde Aeropuerto',
          subtitle: 'Descubre rutas populares de traslado en aeropuerto con Intui.travel.'
        },
        'transfer-kiwitaxi': {
          badge: 'Kiwitaxi',
          title: 'Chófer Privado a Tu Llegada',
          subtitle: 'Reserva traslados privados puerta a puerta con Kiwitaxi.'
        }
      },
      conciergeTitle: 'Asistencia de Movilidad Golden Group:',
      conciergeDesc:
        '¿Necesitas un traslado privado o furgoneta familiar en Salé, Rabat o Casablanca?',
      conciergeCta: 'Escribir por WhatsApp'
    },
    umrah: {
      badge: 'Peregrinación Sagrada · Golden Group',
      title: 'Solicitud de Programa El Omra / La Meca',
      subtitle:
        'Indícanos tu ciudad de salida, fechas y preferencias de hotel en La Meca y Medina para recibir una propuesta personalizada por WhatsApp.',
      departureCityLabel: 'Ciudad de salida',
      departureCityPlaceholder: 'Ej.: Casablanca, Rabat-Salé, Tánger...',
      departureDateLabel: 'Fecha de salida deseada',
      returnDateLabel: 'Fecha de regreso deseada',
      travelersLabel: 'Viajeros',
      hotelPrefLabel: 'Preferencia de hotel',
      hotelOptions: [
        'Hotel 5★ Vista al Haram / Clock Tower',
        'Hotel 4★ Cerca de Masjid al-Haram',
        'Combinado La Meca + Medina Confort',
        'Recomendación de la agencia'
      ],
      packagePrefLabel: 'Preferencia de programa',
      packageOptions: [
        'El Omra Confort (Vuelo + Hotel + Visado)',
        'El Omra VIP Prestige',
        'El Omra Económico',
        'Ramadán / Shaabán',
        'A Medida en Familia'
      ],
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Tu nombre y apellidos',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: 'Ej.: +212 6XX-XXXXXX',
      submitBtn: 'Preparar Solicitud El Omra',
      summaryTitle: 'Resumen de Tu Solicitud El Omra',
      whatsappBtn: 'Enviar por WhatsApp (0666-484815)',
      editBtn: 'Editar solicitud',
      noFakePackagesNote:
        'Las tarifas y plazas exactas son confirmadas directamente por nuestros asesores.',
      errors: {
        departureCityRequired: 'Introduce tu ciudad de salida.',
        dateRequired: 'Selecciona una fecha de salida.',
        datePast: 'La fecha de salida no puede ser pasada.',
        returnBeforeDeparture: 'La fecha de regreso debe ser igual o posterior a la salida.',
        contactRequired: 'Introduce tu nombre completo y número de teléfono.',
        adultsMin: 'Se requiere al menos 1 viajero adulto.'
      }
    },
    holidays: {
      badge: 'Vacaciones Organizadas · A Medida',
      title: 'Solicitud de Paquete Vacacional',
      subtitle:
        'Indica tu destino, fechas y preferencia de presupuesto para recibir opciones reales de nuestros asesores por WhatsApp.',
      destinationLabel: 'Destino deseado',
      destinationPlaceholder: 'Ej.: Turquía, Dubái, Suiza, París, Maldivas...',
      departureDateLabel: 'Fecha de salida',
      returnDateLabel: 'Fecha de regreso',
      travelersLabel: 'Viajeros',
      budgetLabel: 'Preferencia de presupuesto',
      budgetOptions: ['Económico', 'Confort 4★', 'Superior 5★', 'Prestige a Medida'],
      packageTypeLabel: 'Tipo de paquete',
      packageTypeOptions: [
        'Vuelo + Hotel + Traslados',
        'Todo Incluido',
        'Vacaciones en Familia',
        'Luna de Miel / Parejas',
        'Circuito Descubrimiento'
      ],
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Tu nombre y apellidos',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: 'Ej.: +212 6XX-XXXXXX',
      submitBtn: 'Preparar Solicitud de Vacaciones',
      summaryTitle: 'Resumen de Tu Solicitud Vacacional',
      whatsappBtn: 'Enviar por WhatsApp (0666-484815)',
      editBtn: 'Editar solicitud',
      noFakePackagesNote:
        'No se muestra disponibilidad ficticia; nuestros asesores verifican cada solicitud.',
      errors: {
        destinationRequired: 'Introduce el destino deseado.',
        dateRequired: 'Selecciona tus fechas de viaje.',
        datePast: 'La fecha de salida no puede ser pasada.',
        returnBeforeDeparture: 'La fecha de regreso debe ser igual o posterior a la salida.',
        contactRequired: 'Introduce tu nombre completo y teléfono.',
        adultsMin: 'Se requiere al menos 1 viajero adulto.'
      }
    }
  }
};
