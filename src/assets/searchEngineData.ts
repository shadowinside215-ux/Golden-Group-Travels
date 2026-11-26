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
      all: { label: string; sub: string };
      car_rentals: { label: string; sub: string };
      airport_transfers: { label: string; sub: string };
    };
    carRentalsTitle: string;
    carRentalsSubtitle: string;
    promoBannerEyebrow: string;
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
    hubEyebrow: 'Recherche de Voyage · Golden Group Travels',
    hubTitle: 'Planifiez & Recherchez Votre Prochain Départ',
    hubSubtitle:
      'Sélectionnez une catégorie pour accéder aux options adaptées : vols internationaux, hôtels Expedia, El Omra sur mesure, séjours, circuits ou location de voitures.',
    servicesHubEyebrow: 'Conciergerie & Réservation Directe · Golden Group Travels',
    servicesHubTitle: 'Découvrez Nos Services de Voyage',
    servicesHubSubtitle: 'Tout ce dont vous avez besoin pour votre prochain voyage, réuni au même endroit.',
    openDedicatedPage: 'Voir les détails',
    categories: {
      flights: { tabLabel: 'Vols', shortSub: 'Comparateur Vols' },
      hotels: { tabLabel: 'Hôtels', shortSub: 'Hébergements Monde' },
      umrah: { tabLabel: 'Hajj & Omra', shortSub: 'Pèlerinages Sacrés' },
      holidays: { tabLabel: 'Séjours', shortSub: 'Vacances Sur Mesure' },
      tours: { tabLabel: 'Circuits & Activités', shortSub: 'Excursions & Billets' },
      'car-transfers': { tabLabel: 'Voitures & Transferts Aéroport', shortSub: 'Location & Chauffeurs' }
    },
    flights: {
      providerSelectorLabel: 'Comparer les vols',
      providers: {
        aviasales: { label: 'Recherche Vols 1', sub: 'Comparateur · EUR' },
        expedia: { label: 'Recherche Vols 2', sub: 'Comparateur 2' }
      },
      expediaBadge: 'Comparateur de Vols',
      expediaTitle: 'Comparer d’Autres Offres de Vols en Direct',
      expediaSubtitle:
        'Saisissez votre ville de départ, votre destination, vos dates et vos voyageurs ci-dessous.',
      expediaNote:
        'Les horaires, disponibilités et tarifs aériens s’ouvrent directement sur le site du partenaire de réservation.',
      liveBadge: 'Recherche de Vols en Direct',
      liveTitle: 'Rechercher Vos Billets d’Avion en Direct',
      liveSubtitle:
        'Sélectionnez vos aéroports, dates et passagers ci-dessous pour consulter les offres en temps réel en EUR.',
      loadingLabel: 'Chargement de la recherche de vols…',
      loadErrorFallback:
        'La recherche n’a pas pu s’afficher ici. Vous pouvez réessayer ou ouvrir directement la recherche partenaire :',
      offersBadge: 'Offres Complémentaires · Itinéraires Sélectionnés',
      offersTitle: 'Recherche Rapide & Suggestions d’Itinéraires Aériens',
      offersSubtitle:
        'Complétez votre comparaison avec ces suggestions d’itinéraires et de tarifs aériens en direct.',
      offersLoadingLabel: 'Chargement des offres d’itinéraires…',
      offersLoadErrorFallback:
        'Ces offres aériennes n’ont pas pu se charger pour le moment. Vous pouvez réessayer ou contacter notre agence.',
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
        'Le lien partenaire vous redirige vers le portail officiel Aviasales dans un nouvel onglet.',
      continueAviasalesBtn: 'Continuer vers Aviasales',
      agencyFlightQuoteBtn: 'Demander un devis vol via WhatsApp',
      futureWidgetBadge: 'Recherche de Vols · Aviasales',
      futureWidgetNote:
        'Consultez les vols disponibles directement via notre partenaire officiel Aviasales.',
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
      badge: 'Recherche Hôtelière en Direct',
      title: 'Rechercher Votre Hôtel en Direct',
      subtitle:
        'Indiquez votre destination, vos dates d’arrivée et de départ, ainsi que le nombre de chambres et de voyageurs.',
      includesLabel: 'Critères de recherche disponibles',
      includesItems: [
        'Recherche par ville, quartier ou hôtel',
        'Dates d’arrivée et de départ en temps réel',
        'Nombre de chambres, adultes et enfants',
        'Ouverture sécurisée des disponibilités chez notre partenaire'
      ],
      widgetNote:
        'Les tarifs, disponibilités et confirmations proviennent directement de notre partenaire hôtelier externe.',
      agencyHotelTitle: 'Besoin d’un bon hôtelier ou d’un devis agence à Salé ?',
      agencyHotelDesc:
        'Vous pouvez aussi localiser n’importe quel hôtel sur Google Maps et recevoir une prise en charge directe de notre équipe.',
      agencyHotelBtn: 'Ouvrir le Planificateur Google Maps'
    },
    tours: {
      badge: 'Circuits, Excursions & Billets',
      title: 'Explorer les Circuits & Activités dans le Monde',
      subtitle:
        'Accédez directement aux catalogues complets de nos partenaires ou demandez un circuit privé sur mesure, puis découvrez nos sélections promotionnelles ci-dessous.',
      destinationLabel: 'Destination pour votre demande de circuit privé (WhatsApp)',
      destinationPlaceholder: 'Ex : Marrakech, Istanbul, Dubaï, Paris, Suisse...',
      quickDestinationsLabel: 'Suggestions rapides',
      selectedDestinationLabel: 'Destination incluse dans votre message WhatsApp :',
      transparencyNote:
        'Les cartes ci-dessous sont des vitrines promotionnelles partenaires en complément des portails complets ci-dessus.',
      widgetsHeader: 'Sélections de Nos Partenaires',
      widgetsSubtitle:
        'Idées d’excursions, billets coupe-file et audioguides proposés par nos partenaires de voyage.',
      widgetLoadingLabel: 'Chargement de la sélection…',
      widgetLoadErrorFallback:
        'Cette sélection partenaire est temporairement indisponible ici. Utilisez les portails directs ci-dessus ou réessayez.',
      widgets: {
        'tours-klook-dynamic': {
          badge: 'Sélection Partenaire · Activités & Pass',
          title: 'Activités & Excursions Sélectionnées',
          subtitle: 'Idées de billets d’attractions, expériences urbaines et sorties recommandées.'
        },
        'tours-tiqets-discovery': {
          badge: 'Sélection Partenaire · Musées & Monuments',
          title: 'Découverte Culturelle & Billets Coupe-File',
          subtitle: 'Sélection d’entrées musées, monuments et visites culturelles.'
        },
        'tours-wegotrip-audio': {
          badge: 'Sélection Partenaire · Audioguides',
          title: 'Visites Audio Autoguidées',
          subtitle: 'Parcours audio immersifs et billets d’entrée partenaires.'
        }
      },
      klookTitle: 'Portail Activités, Billets & Excursions',
      klookDesc:
        'Explorez le catalogue complet de notre partenaire Klook pour parcs, visites guidées et sorties.',
      klookCta: 'Ouvrir le portail Klook',
      kkdayTitle: 'Portail Circuits Guidés & Découvertes',
      kkdayDesc:
        'Accédez au catalogue complet de notre partenaire KKday pour circuits culturels et excursions organisées.',
      kkdayCta: 'Ouvrir le portail KKday',
      customTourBtn: 'Envoyer ma demande sur WhatsApp',
      architectureNote:
        'Indiquez une destination ci-dessous pour préparer votre demande de circuit privé avec notre agence de Salé :'
    },
    carTransfers: {
      badge: 'Mobilité & Chauffeurs',
      title: 'Location de Voitures & Transferts Aéroport',
      subtitle:
        'Comparez les véhicules disponibles auprès de réseaux mondiaux et locaux ou réservez votre transfert privé depuis l’aéroport.',
      tabSelectorLabel: 'Filtrer l’espace mobilité',
      tabs: {
        all: { label: 'Tous les Services', sub: 'Voitures & Transferts' },
        car_rentals: { label: 'Location de Voitures', sub: 'Location & Tarifs' },
        airport_transfers: { label: 'Transferts Aéroport', sub: 'Recherche & Trajets' }
      },
      carRentalsTitle: 'Location de Voitures',
      carRentalsSubtitle:
        'Recherchez et comparez votre véhicule directement auprès de nos partenaires de location.',
      promoBannerEyebrow: 'Offre Partenaire',
      transfersTitle: 'Transferts Aéroport Privés & Navettes',
      transfersSubtitle:
        'Recherchez votre transfert privé porte-à-porte puis consultez les trajets populaires ci-dessous.',
      loadingLabel: 'Chargement des offres…',
      loadErrorFallback:
        'Les offres n’ont pas pu s’afficher ici. Réessayez ou contactez notre agence sur WhatsApp.',
      transparencyNote:
        'Tous les tarifs, conditions de caution et disponibilités proviennent directement de chaque partenaire externe.',
      widgets: {
        'car-localrent': {
          badge: 'Partenaire · Flottes Locales',
          title: 'Location Locale Vérifiée',
          subtitle: 'Recherchez des véhicules sélectionnés auprès d’agences locales avec conditions transparentes.'
        },
        'car-getrentacar': {
          badge: 'Partenaire · Comparateur Véhicules',
          title: 'Véhicules avec ou sans Chauffeur',
          subtitle: 'Comparez les offres disponibles directement par ville et dates.'
        },
        'car-economybookings-banner': {
          badge: 'Offre Partenaire',
          title: 'Offre Spéciale Location de Voitures',
          subtitle: 'Bannière promotionnelle donnant accès aux offres partenaires de location.'
        },
        'car-autoeurope': {
          badge: 'Partenaire · Réseau Mondial',
          title: 'Réseau International de Location Automobile',
          subtitle: 'Recherchez votre véhicule dans plus de 24 000 agences partenaires.'
        },
        'transfer-intui': {
          badge: 'Trajets Populaires',
          title: 'Itinéraires de Transferts Aéroport Populaires',
          subtitle: 'Sélection promotionnelle de trajets et navettes aéroport populaires.'
        },
        'transfer-kiwitaxi': {
          badge: 'Partenaire · Transferts Privés',
          title: 'Réservation de Chauffeur Privé à l’Arrivée',
          subtitle: 'Saisissez votre aéroport et destination pour réserver un transfert porte-à-porte.'
        }
      },
      conciergeTitle: 'Assistance Mobilité Golden Group :',
      conciergeDesc:
        'Besoin d’un van familial à Salé, Rabat, Casablanca ou d’un transfert VIP pendant votre séjour ?',
      conciergeCta: 'Contacter sur WhatsApp'
    },
    umrah: {
      badge: 'Pèlerinages Sacrés · Accompagnement Golden Group',
      title: 'Demande de Programme Hajj & Omra',
      subtitle:
        'Renseignez vos préférences pour votre programme Hajj & Omra. Notre bureau prépare votre proposition personnalisée sans frais cachés via WhatsApp.',
      departureCityLabel: 'Ville de départ',
      departureCityPlaceholder: 'Ex : Casablanca, Rabat-Salé, Tanger...',
      departureDateLabel: 'Date de départ souhaitée',
      returnDateLabel: 'Date de retour souhaitée',
      travelersLabel: 'Voyageurs',
      hotelPrefLabel: 'Préférence d’hébergement',
      hotelOptions: [
        'Hôtel 5★ Vue Haram / Clock Tower',
        'Hôtel 4★ Proche Masjid al-Haram',
        'Formule Hajj & Omra Confort',
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
        'Les disponibilités et tarifs exacts sont vérifiés en temps réel par nos conseillers.',
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
    hubEyebrow: 'البحث عن الرحلات · جولدن جروب',
    hubTitle: 'ابحث وخطّط لرحلتك القادمة بسهولة',
    hubSubtitle:
      'اختر الفئة المناسبة لاستعراض خيارات الطيران أو الفنادق أو العمرة أو العطلات أو الجولات أو تأجير السيارات.',
    servicesHubEyebrow: 'منصة الحجز الشاملة · جولدن جروب ترافيلز',
    servicesHubTitle: 'استكشف خدمات السفر لدينا',
    servicesHubSubtitle: 'كل ما تحتاجه لرحلتك القادمة في مكان واحد.',
    openDedicatedPage: 'عرض التفاصيل',
    categories: {
      flights: { tabLabel: 'الطيران', shortSub: 'مقارنة الرحلات' },
      hotels: { tabLabel: 'الفنادق', shortSub: 'حجوزات عالمية' },
      umrah: { tabLabel: 'الحج والعمرة', shortSub: 'رحلات روحانية' },
      holidays: { tabLabel: 'العطلات', shortSub: 'باقات مخصصة' },
      tours: { tabLabel: 'الجولات والأنشطة', shortSub: 'تذاكر وتجارب' },
      'car-transfers': { tabLabel: 'تأجير السيارات والنقل من المطار', shortSub: 'سيارات وسائقون' }
    },
    flights: {
      providerSelectorLabel: 'مقارنة رحلات الطيران',
      providers: {
        aviasales: { label: 'البحث عن الطيران 1', sub: 'مقارنة · EUR' },
        expedia: { label: 'البحث عن الطيران 2', sub: 'خيار إضافي' }
      },
      expediaBadge: 'خيار إضافي للبحث عن الطيران',
      expediaTitle: 'قارن خيارات إضافية لتذاكر الطيران',
      expediaSubtitle:
        'أدخل مدينة المغادرة والوجهة وتواريخ السفر وعدد المسافرين أدناه.',
      expediaNote: 'تُعرض الأسعار والرحلات الحقيقية مباشرة عبر بوابة شريك الحجز الخارجي.',
      liveBadge: 'البحث المباشر عن تذاكر الطيران',
      liveTitle: 'ابحث عن تذاكر الطيران مباشرة',
      liveSubtitle:
        'اختر مطار الانطلاق والوصول وتواريخ السفر وعدد المسافرين أدناه باليورو.',
      loadingLabel: 'جاري تحميل رحلات الطيران…',
      loadErrorFallback: 'تعذر عرض البحث هنا. يمكنك إعادة المحاولة أو المتابعة مباشرة إلى بوابة الشريك:',
      offersBadge: 'عروض إضافية · أبرز المسارات',
      offersTitle: 'بحث سريع واقتراحات مسارات الطيران',
      offersSubtitle:
        'استعرض مقارنة إضافية للرحلات وأبرز المسارات المقترحة.',
      offersLoadingLabel: 'جاري تحميل عروض المسارات…',
      offersLoadErrorFallback: 'تعذر تحميل عروض الرحلات حالياً. يمكنك إعادة المحاولة أو التواصل معنا.',
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
        'يفتح الرابط موقع Aviasales الرسمي في علامة تبويب جديدة للاطلاع على الرحلات المتاحة.',
      continueAviasalesBtn: 'المتابعة إلى Aviasales',
      agencyFlightQuoteBtn: 'طلب عرض سعر طيران عبر واتساب',
      futureWidgetBadge: 'البحث عن الطيران · Aviasales',
      futureWidgetNote: 'استعرض الرحلات المتوفرة مباشرة عبر شريكنا الرسمي Aviasales.',
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
      badge: 'البحث الفندقي المباشر',
      title: 'ابحث عن الفنادق مباشرة حول العالم',
      subtitle:
        'اختر وجهتك وتواريخ الوصول والمغادرة وعدد الغرف والمسافرين للاطلاع على الفنادق المتوفرة.',
      includesLabel: 'خيارات البحث المتاحة',
      includesItems: [
        'اختيار الوجهة أو المدينة أو الفندق',
        'تحديد تواريخ الوصول والمغادرة',
        'عدد الغرف والبالغين والأطفال',
        'عرض النتائج المباشرة لدى شريك الحجز'
      ],
      widgetNote: 'جميع النتائج والتوافر تُعرض مباشرة من شريك الحجز الفندقي الخارجي.',
      agencyHotelTitle: 'تفضل حجزاً مخصصاً عبر وكالتنا بسلا؟',
      agencyHotelDesc: 'يمكنك أيضاً تحديد أي فندق على خرائط جوجل والتواصل مباشرة مع مستشارينا.',
      agencyHotelBtn: 'الانتقال إلى خرائط جوجل والحجز'
    },
    tours: {
      badge: 'الجولات والأنشطة السياحية',
      title: 'استكشف الجولات والأنشطة حول العالم',
      subtitle:
        'افتح بوابات البحث الكاملة لشركائنا أو اطلب جولة خاصة عبر واتساب، وتصفح العروض الترويجية المختارة أدناه.',
      destinationLabel: 'الوجهة المطلوبة لطلب جولة خاصة عبر واتساب',
      destinationPlaceholder: 'مثال: مراكش، إسطنبول، دبي، باريس، سويسرا...',
      quickDestinationsLabel: 'وجهات شائعة',
      selectedDestinationLabel: 'الوجهة المضافة لرسالة واتساب:',
      transparencyNote: 'البطاقات أدناه هي عروض ترويجية مختارة من الشركاء بالإضافة إلى بوابات البحث أعلاه.',
      widgetsHeader: 'مختارات شركائنا',
      widgetsSubtitle: 'أفكار للتذاكر والجولات الثقافية والأدلة الصوتية عبر شركائنا.',
      widgetLoadingLabel: 'جاري تحميل العروض…',
      widgetLoadErrorFallback: 'تعذر تحميل هذا العرض حالياً. استخدم البوابات المباشرة أعلاه أو أعد المحاولة.',
      widgets: {
        'tours-klook-dynamic': {
          badge: 'اختيارات الشركاء · التذاكر والأنشطة',
          title: 'تجارب وجولات مختارة',
          subtitle: 'أبرز الأنشطة وتذاكر المعالم والرحلات الحضرية.'
        },
        'tours-tiqets-discovery': {
          badge: 'اختيارات الشركاء · المتاحف والمعالم',
          title: 'تذاكر المتاحف والمعالم السياحية',
          subtitle: 'بطاقات دخول مباشرة وجولات ثقافية مختارة.'
        },
        'tours-wegotrip-audio': {
          badge: 'اختيارات الشركاء · الجولات الصوتية',
          title: 'جولات صوتية إرشادية وتذاكر',
          subtitle: 'استكشف أشهر المعالم مع أدلة صوتية وتذاكر دخول.'
        }
      },
      klookTitle: 'بوابة التذاكر والأنشطة السياحية',
      klookDesc: 'تصفح العروض الكاملة لدى Klook لتذاكر المعالم والجولات والرحلات.',
      klookCta: 'فتح بوابة Klook',
      kkdayTitle: 'بوابة الجولات والرحلات اليومية',
      kkdayDesc: 'انتقل إلى الكتالوج الكامل لدى KKday للرحلات اليومية المنظمة والتجارب الثقافية.',
      kkdayCta: 'فتح بوابة KKday',
      customTourBtn: 'إرسال طلب جولة خاصة عبر واتساب',
      architectureNote: 'أدخل الوجهة أدناه لتجهيز طلب جولة خاصة مع فريق وكالتنا بسلا:'
    },
    carTransfers: {
      badge: 'التنقل والنقل الخاص',
      title: 'تأجير السيارات والنقل من المطار',
      subtitle:
        'قارن عروض تأجير السيارات العالمية والمحلية أو احجز خدمة الاستقبال والنقل الخاص من المطار.',
      tabSelectorLabel: 'تصفية خدمات التنقل',
      tabs: {
        all: { label: 'جميع الخدمات', sub: 'سيارات ونقل' },
        car_rentals: { label: 'تأجير السيارات', sub: 'تأجير ومقارنة' },
        airport_transfers: { label: 'النقل من المطار', sub: 'بحث ومسارات' }
      },
      carRentalsTitle: 'تأجير السيارات',
      carRentalsSubtitle: 'قارن واحجز سيارتك مباشرة عبر شركاء تأجير السيارات أدناه.',
      promoBannerEyebrow: 'عرض خاص',
      transfersTitle: 'خدمات النقل والاستقبال من المطار',
      transfersSubtitle: 'احجز توصيلك الخاص من المطار ثم استعرض أبرز المسارات المقترحة أدناه.',
      loadingLabel: 'جاري تحميل العروض…',
      loadErrorFallback: 'تعذر عرض الخيارات حالياً. أعد المحاولة أو تواصل معنا عبر واتساب.',
      transparencyNote: 'تُعرض الأسعار والتوافر والشروط مباشرة من كل شريك خارجي أدناه.',
      widgets: {
        'car-localrent': {
          badge: 'شريك معتمد · مزوّدون محليون',
          title: 'تأجير سيارات من مزوّدين محليين',
          subtitle: 'سيارات مختارة بشروط واضحة وعربون مناسب.'
        },
        'car-getrentacar': {
          badge: 'شريك معتمد · مقارنة المركبات',
          title: 'مقارنة عروض السيارات المباشرة',
          subtitle: 'استكشف خيارات الاستئجار المباشر ومع سائق حسب المدينة والتواريخ.'
        },
        'car-economybookings-banner': {
          badge: 'عرض خاص',
          title: 'عرض ترويجي لتأجير السيارات',
          subtitle: 'عرض يتيح الوصول إلى خيارات تأجير السيارات الدولية.'
        },
        'car-autoeurope': {
          badge: 'شريك معتمد · شبكة عالمية',
          title: 'تأجير السيارات في أكثر من 24,000 محطة',
          subtitle: 'قارن عروض تأجير السيارات في المطارات والمدن حول العالم.'
        },
        'transfer-intui': {
          badge: 'أبرز المسارات',
          title: 'مسارات شائعة للنقل من المطار',
          subtitle: 'عروض مختارة لأبرز مسارات التوصيل من المطارات العالمية.'
        },
        'transfer-kiwitaxi': {
          badge: 'شريك معتمد · النقل الخاص',
          title: 'خدمة سائق خاص واستقبال بالمطار',
          subtitle: 'أدخل المطار والوجهة لحجز توصيل خاص من الباب إلى الباب.'
        }
      },
      conciergeTitle: 'مساعدة النقل من جولدن جروب:',
      conciergeDesc: 'هل تحتاج إلى سيارة عائلية أو استقبال خاص في سلا أو الرباط أو الدار البيضاء؟',
      conciergeCta: 'تواصل عبر واتساب'
    },
    umrah: {
      badge: 'العمرة والحج · جولدن جروب',
      title: 'طلب برنامج الحج والعمرة',
      subtitle:
        'شاركنا تفاصيل رحلتك المباركة للحج والعمرة ليقوم فريقنا بإعداد عرض دقيق ومناسب عبر واتساب.',
      departureCityLabel: 'مدينة المغادرة',
      departureCityPlaceholder: 'مثال: الدار البيضاء، الرباط-سلا، طنجة...',
      departureDateLabel: 'تاريخ السفر المفضل',
      returnDateLabel: 'تاريخ العودة المفضل',
      travelersLabel: 'عدد المسافرين',
      hotelPrefLabel: 'تفضيل الفندق',
      hotelOptions: [
        'فندق 5 نجوم مطل على الحرم / أبراج الساعة',
        'فندق 4 نجوم قريب من المسجد الحرام',
        'باقة الحج والعمرة المريحة',
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
      noFakePackagesNote: 'يتم التأكيد المباشر للأسعار والتوافر عبر مستشاري وكالتنا.',
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
    hubEyebrow: 'Travel Search · Golden Group Travels',
    hubTitle: 'Search & Plan Your Next Journey',
    hubSubtitle:
      'Choose a travel category below to access tailored options for Flights, Expedia Hotels, Umrah, Holidays, Tours, or Car Rentals & Transfers.',
    servicesHubEyebrow: 'Complete Travel Booking Hub · Golden Group Travels',
    servicesHubTitle: 'Explore Our Travel Services',
    servicesHubSubtitle: 'Everything you need for your next journey, all in one place.',
    openDedicatedPage: 'View Details',
    categories: {
      flights: { tabLabel: 'Flights', shortSub: 'Flight Search' },
      hotels: { tabLabel: 'Hotels', shortSub: 'Global Stays' },
      umrah: { tabLabel: 'Hajj & Omra', shortSub: 'Sacred Journeys' },
      holidays: { tabLabel: 'Holidays', shortSub: 'Bespoke Stays' },
      tours: { tabLabel: 'Tours & Activities', shortSub: 'Excursions & Tickets' },
      'car-transfers': { tabLabel: 'Car Rentals & Airport Transfers', shortSub: 'Cars & Chauffeurs' }
    },
    flights: {
      providerSelectorLabel: 'Flight Comparison',
      providers: {
        aviasales: { label: 'Flight Search 1', sub: 'Live Fares · EUR' },
        expedia: { label: 'Flight Search 2', sub: 'Expedia Option' }
      },
      expediaBadge: 'Flight Comparison Option',
      expediaTitle: 'Compare Additional Live Flight Fares',
      expediaSubtitle:
        'Enter your departure, destination, travel dates, and passengers below.',
      expediaNote:
        'Live flight schedules and fares open directly on the external booking partner’s website.',
      liveBadge: 'Live Flight Search',
      liveTitle: 'Search Live Airline Fares',
      liveSubtitle:
        'Pick your origin, destination, travel dates, and passengers below to check live fares in EUR.',
      loadingLabel: 'Loading live flight search…',
      loadErrorFallback:
        'The flight search could not load here. You can retry or continue directly to the partner search page:',
      offersBadge: 'Supplementary Search & Route Offers',
      offersTitle: 'Quick Flight Search & Featured Route Suggestions',
      offersSubtitle:
        'Compare additional airfare options and featured route offers below.',
      offersLoadingLabel: 'Loading supplementary flight offers…',
      offersLoadErrorFallback:
        'These flight offers could not load right now. Retry below or message our desk on WhatsApp.',
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
        'Opens the official Aviasales partner portal in a new tab for live flight availability.',
      continueAviasalesBtn: 'Continue to Aviasales',
      agencyFlightQuoteBtn: 'Request Flight Quote via WhatsApp',
      futureWidgetBadge: 'Flight Search · Aviasales',
      futureWidgetNote:
        'Continue to our official Aviasales partner portal to explore live flight itineraries.',
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
      badge: 'Live Hotel Search',
      title: 'Search Hotels & Stays Worldwide',
      subtitle:
        'Enter your destination, check-in and check-out dates, rooms, adults, and children to browse live hotel availability.',
      includesLabel: 'Available Search Options',
      includesItems: [
        'Destination city or property search',
        'Check-in & check-out calendar dates',
        'Number of rooms, adults, and children',
        'Direct live results on our external partner site'
      ],
      widgetNote:
        'Live hotel availability and pricing are served directly by our external booking partner.',
      agencyHotelTitle: 'Prefer bespoke hotel assistance from our Salé desk?',
      agencyHotelDesc:
        'Locate any hotel worldwide on Google Maps and request tailored agency booking support via WhatsApp.',
      agencyHotelBtn: 'Open Google Maps Hotel Planner'
    },
    tours: {
      badge: 'Tours & Activities',
      title: 'Explore Tours & Activities Worldwide',
      subtitle:
        'Open our partner booking portals to search full global activity catalogs, request a private tour via WhatsApp, or browse curated partner showcases below.',
      destinationLabel: 'Destination for your private tour inquiry (WhatsApp)',
      destinationPlaceholder: 'e.g. Marrakech, Istanbul, Dubai, Paris, Swiss Alps...',
      quickDestinationsLabel: 'Quick suggestions',
      selectedDestinationLabel: 'Destination included in your WhatsApp request:',
      transparencyNote:
        'The cards below are supplementary promotional partner showcases placed beneath the main portals above.',
      widgetsHeader: 'Curated Partner Picks',
      widgetsSubtitle:
        'Featured attraction ideas, museum passes, and self-guided audio tours from travel partners.',
      widgetLoadingLabel: 'Loading partner selection…',
      widgetLoadErrorFallback:
        'This partner showcase could not load right now. Use the direct partner portals above or retry.',
      widgets: {
        'tours-klook-dynamic': {
          badge: 'Partner Showcase · Activities & Passes',
          title: 'Featured Tours & Day Activities',
          subtitle: 'Handpicked attraction tickets and city experiences.'
        },
        'tours-tiqets-discovery': {
          badge: 'Partner Showcase · Museums & Landmarks',
          title: 'Cultural Landmarks & Museum Entry',
          subtitle: 'Instant-entry museum tickets and curated cultural highlights.'
        },
        'tours-wegotrip-audio': {
          badge: 'Partner Showcase · Audio Tours',
          title: 'Self-Guided Audio Tours & Tickets',
          subtitle: 'Curated self-guided audio routes and attraction tickets.'
        }
      },
      klookTitle: 'Global Activities, Tickets & Day Trips Portal',
      klookDesc:
        'Search Klook’s full catalog of attraction passes, guided tours, and city experiences worldwide.',
      klookCta: 'Search activities on Klook',
      kkdayTitle: 'Guided Tours & Cultural Experiences Portal',
      kkdayDesc:
        'Search KKday’s full catalog of sightseeing tours, day excursions, and local activities.',
      kkdayCta: 'Search tours on KKday',
      customTourBtn: 'Send Private Tour Inquiry on WhatsApp',
      architectureNote:
        'Enter a destination below to prepare a custom private excursion request for our Salé desk:'
    },
    carTransfers: {
      badge: 'Mobility & Chauffeurs',
      title: 'Car Rentals & Airport Transfers',
      subtitle:
        'Compare global and local car rental options or book door-to-door airport transfers in one organized space.',
      tabSelectorLabel: 'Filter mobility section',
      tabs: {
        all: { label: 'All Services', sub: 'Cars & Transfers' },
        car_rentals: { label: 'Car Rentals', sub: 'Cars & Rates' },
        airport_transfers: { label: 'Airport Transfers', sub: 'Search & Routes' }
      },
      carRentalsTitle: 'Car Rentals',
      carRentalsSubtitle:
        'Search and compare available vehicles directly with our car rental partners.',
      promoBannerEyebrow: 'Partner Offer',
      transfersTitle: 'Private Airport Transfers & Shuttles',
      transfersSubtitle:
        'Search door-to-door private airport transfers first, with popular transfer routes below.',
      loadingLabel: 'Loading partner options…',
      loadErrorFallback:
        'These options could not load right now. Retry below or message our Salé desk on WhatsApp.',
      transparencyNote:
        'All vehicle availability, deposits, and transfer rates come directly from each external partner.',
      widgets: {
        'car-localrent': {
          badge: 'Partner · Local Fleets',
          title: 'Verified Local Car Rentals',
          subtitle: 'Search local fleet bookings with clear terms and transparent deposits.'
        },
        'car-getrentacar': {
          badge: 'Partner · Vehicle Marketplace',
          title: 'Global Rental & Chauffeur Marketplace',
          subtitle: 'Search direct rental offers and driver options by city and dates.'
        },
        'car-economybookings-banner': {
          badge: 'Partner Offer',
          title: 'Featured Car Rental Partner Offer',
          subtitle: 'Supplementary promotional offer linking to international car hire options.'
        },
        'car-autoeurope': {
          badge: 'Partner · Worldwide Network',
          title: 'Worldwide Rental Network',
          subtitle: 'Compare pickup locations across 24,000+ international rental stations.'
        },
        'transfer-intui': {
          badge: 'Popular Routes',
          title: 'Popular Airport Transfer Routes',
          subtitle: 'Browse featured airport shuttle and private transfer routes.'
        },
        'transfer-kiwitaxi': {
          badge: 'Partner · Private Transfers',
          title: 'Private Meet & Greet Airport Transfers',
          subtitle: 'Enter your airport and destination to search door-to-door private transfers.'
        }
      },
      conciergeTitle: 'Golden Group Mobility Assistance:',
      conciergeDesc:
        'Need a private chauffeur, family van, or executive pickup in Salé, Rabat, or Casablanca?',
      conciergeCta: 'Message on WhatsApp'
    },
    umrah: {
      badge: 'Sacred Pilgrimages · Golden Group Concierge',
      title: 'Hajj & Omra Package Inquiry',
      subtitle:
        'Share your departure city, preferred dates, and hotel preferences for your Hajj & Omra journey. Our advisors prepare your tailored quote directly on WhatsApp.',
      departureCityLabel: 'Departure city',
      departureCityPlaceholder: 'e.g. Casablanca, Rabat-Salé, Tangier...',
      departureDateLabel: 'Preferred departure date',
      returnDateLabel: 'Preferred return date',
      travelersLabel: 'Travelers',
      hotelPrefLabel: 'Hotel preference',
      hotelOptions: [
        '5★ Haram-View / Clock Tower',
        '4★ Close to Masjid al-Haram',
        'Hajj & Omra Comfort Package',
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
        'Exact availability and rates are verified directly by our travel advisors.',
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
    hubEyebrow: 'Búsqueda de Viajes · Golden Group Travels',
    hubTitle: 'Busca y Planifica Tu Próximo Viaje',
    hubSubtitle:
      'Elige una categoría para consultar opciones de Vuelos, Hoteles Expedia, El Omra, Vacaciones, Tours o Alquiler de Coches.',
    servicesHubEyebrow: 'Centro Integral de Reservas · Golden Group Travels',
    servicesHubTitle: 'Explora Nuestros Servicios de Viaje',
    servicesHubSubtitle: 'Todo lo que necesitas para tu próximo viaje, en un solo lugar.',
    openDedicatedPage: 'Ver Detalles',
    categories: {
      flights: { tabLabel: 'Vuelos', shortSub: 'Buscador Vuelos' },
      hotels: { tabLabel: 'Hoteles', shortSub: 'Alojamientos' },
      umrah: { tabLabel: 'Hajj y Omra', shortSub: 'Viajes Sagrados' },
      holidays: { tabLabel: 'Vacaciones', shortSub: 'Paquetes a Medida' },
      tours: { tabLabel: 'Tours y Actividades', shortSub: 'Excursiones y Entradas' },
      'car-transfers': { tabLabel: 'Coches y Traslados Aeropuerto', shortSub: 'Alquiler y Traslados' }
    },
    flights: {
      providerSelectorLabel: 'Comparador de vuelos',
      providers: {
        aviasales: { label: 'Buscador 1', sub: 'Tarifas · EUR' },
        expedia: { label: 'Buscador 2', sub: 'Opción Alternativa' }
      },
      expediaBadge: 'Opción Alternativa de Vuelos',
      expediaTitle: 'Comparar Opciones Adicionales de Vuelos',
      expediaSubtitle:
        'Introduce origen, destino, fechas y pasajeros a continuación.',
      expediaNote:
        'Los horarios y tarifas reales se abren directamente en el sitio del socio de reservas.',
      liveBadge: 'Buscador de Vuelos en Directo',
      liveTitle: 'Buscar Vuelos en Tiempo Real',
      liveSubtitle:
        'Elige origen, destino, fechas y pasajeros a continuación para consultar tarifas en EUR.',
      loadingLabel: 'Cargando buscador de vuelos…',
      loadErrorFallback:
        'No se pudo cargar el buscador aquí. Puedes reintentar o continuar directamente al portal del socio:',
      offersBadge: 'Búsqueda Adicional y Ofertas de Rutas',
      offersTitle: 'Buscador Rápido y Rutas Aéreas Destacadas',
      offersSubtitle:
        'Complementa tu comparación con estas rutas y tarifas aéreas destacadas.',
      offersLoadingLabel: 'Cargando ofertas de rutas…',
      offersLoadErrorFallback:
        'No se pudieron cargar estas ofertas ahora. Puedes reintentar o escribirnos por WhatsApp.',
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
        'Abre el portal oficial de Aviasales en una nueva pestaña para consultar vuelos disponibles.',
      continueAviasalesBtn: 'Continuar a Aviasales',
      agencyFlightQuoteBtn: 'Solicitar cotización por WhatsApp',
      futureWidgetBadge: 'Búsqueda de Vuelos · Aviasales',
      futureWidgetNote: 'Consulta los vuelos disponibles directamente a través de nuestro socio oficial Aviasales.',
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
      badge: 'Buscador de Hoteles en Directo',
      title: 'Buscar Hoteles en Vivo en Todo el Mundo',
      subtitle:
        'Indica tu destino, fechas de entrada y salida, habitaciones, adultos y niños para consultar disponibilidad.',
      includesLabel: 'Opciones de búsqueda disponibles',
      includesItems: [
        'Ciudad o alojamiento de destino',
        'Fechas de entrada y salida',
        'Número de habitaciones, adultos y niños',
        'Resultados en directo en el sitio de nuestro socio'
      ],
      widgetNote: 'La disponibilidad y tarifas reales provienen directamente de nuestro socio hotelero.',
      agencyHotelTitle: '¿Prefieres atención personalizada en nuestra agencia de Salé?',
      agencyHotelDesc:
        'Ubica cualquier hotel en Google Maps y solicita confirmación asistida por WhatsApp.',
      agencyHotelBtn: 'Abrir Planificador Google Maps'
    },
    tours: {
      badge: 'Tours y Actividades',
      title: 'Explorar Tours y Actividades en el Mundo',
      subtitle:
        'Accede a los portales completos de búsqueda de nuestros socios, solicita un tour privado por WhatsApp o explora las selecciones promocionales abajo.',
      destinationLabel: 'Destino para tu solicitud de tour privado (WhatsApp)',
      destinationPlaceholder: 'Ej.: Marrakech, Estambul, Dubái, París, Suiza...',
      quickDestinationsLabel: 'Sugerencias rápidas',
      selectedDestinationLabel: 'Destino incluido en tu mensaje de WhatsApp:',
      transparencyNote:
        'Las tarjetas siguientes son escaparates promocionales complementarios de socios debajo de los portales principales.',
      widgetsHeader: 'Selecciones de Socios',
      widgetsSubtitle: 'Ideas de entradas, museos y audioguías propuestas por socios de viaje.',
      widgetLoadingLabel: 'Cargando selección…',
      widgetLoadErrorFallback:
        'No se pudo cargar esta selección ahora. Utiliza los portales directos de arriba o reintenta.',
      widgets: {
        'tours-klook-dynamic': {
          badge: 'Selección de Socio · Actividades y Pases',
          title: 'Actividades y Excursiones Destacadas',
          subtitle: 'Entradas a atracciones y experiencias urbanas seleccionadas.'
        },
        'tours-tiqets-discovery': {
          badge: 'Selección de Socio · Museos y Monumentos',
          title: 'Cultura y Entradas Sin Colas',
          subtitle: 'Selección de museos, monumentos y atracciones culturales.'
        },
        'tours-wegotrip-audio': {
          badge: 'Selección de Socio · Audioguías',
          title: 'Tours Autoguiados con Audio',
          subtitle: 'Recorridos en audio y entradas seleccionadas.'
        }
      },
      klookTitle: 'Portal de Actividades, Entradas y Excursiones',
      klookDesc: 'Busca en el catálogo completo de Klook entradas, visitas guiadas y traslados.',
      klookCta: 'Abrir portal Klook',
      kkdayTitle: 'Portal de Tours Guiados y Experiencias',
      kkdayDesc: 'Busca en el catálogo completo de KKday circuitos culturales y excursiones organizadas.',
      kkdayCta: 'Abrir portal KKday',
      customTourBtn: 'Enviar solicitud privada por WhatsApp',
      architectureNote:
        'Indica un destino abajo para preparar tu solicitud de excursión privada con nuestra agencia de Salé:'
    },
    carTransfers: {
      badge: 'Movilidad y Traslados',
      title: 'Alquiler de Coches y Traslados al Aeropuerto',
      subtitle:
        'Compara vehículos en redes globales y locales o reserva traslados privados puerta a puerta desde el aeropuerto.',
      tabSelectorLabel: 'Filtrar sección de movilidad',
      tabs: {
        all: { label: 'Todos los Servicios', sub: 'Coches y Traslados' },
        car_rentals: { label: 'Alquiler de Coches', sub: 'Alquiler y Tarifas' },
        airport_transfers: { label: 'Traslados Aeropuerto', sub: 'Buscador y Rutas' }
      },
      carRentalsTitle: 'Alquiler de Coches',
      carRentalsSubtitle:
        'Busca y compara vehículos directamente con nuestros socios de alquiler.',
      promoBannerEyebrow: 'Oferta de Socio',
      transfersTitle: 'Traslados Privados y Lanzaderas de Aeropuerto',
      transfersSubtitle:
        'Busca tu traslado privado desde el aeropuerto y consulta las rutas destacadas abajo.',
      loadingLabel: 'Cargando opciones…',
      loadErrorFallback:
        'No se pudieron mostrar las opciones ahora. Reintenta o escríbenos por WhatsApp.',
      transparencyNote:
        'Disponibilidad, depósitos y tarifas provienen directamente de cada proveedor externo.',
      widgets: {
        'car-localrent': {
          badge: 'Socio · Flotas Locales',
          title: 'Alquiler Local Verificado',
          subtitle: 'Busca vehículos seleccionados en agencias locales con condiciones transparentes.'
        },
        'car-getrentacar': {
          badge: 'Socio · Comparador de Vehículos',
          title: 'Mercado Global de Vehículos',
          subtitle: 'Explora opciones de alquiler directo y con conductor por ciudad y fechas.'
        },
        'car-economybookings-banner': {
          badge: 'Oferta de Socio',
          title: 'Oferta Destacada de Alquiler de Coches',
          subtitle: 'Oferta promocional con acceso a tarifas internacionales de alquiler.'
        },
        'car-autoeurope': {
          badge: 'Socio · Red Mundial',
          title: 'Red Mundial de Alquiler de Coches',
          subtitle: 'Busca vehículos en más de 24 000 oficinas internacionales.'
        },
        'transfer-intui': {
          badge: 'Rutas Populares',
          title: 'Rutas Populares de Traslados al Aeropuerto',
          subtitle: 'Selección promocional de traslados y lanzaderas populares.'
        },
        'transfer-kiwitaxi': {
          badge: 'Socio · Traslados Privados',
          title: 'Chófer Privado a Tu Llegada',
          subtitle: 'Introduce aeropuerto y destino para reservar traslados puerta a puerta.'
        }
      },
      conciergeTitle: 'Asistencia de Movilidad Golden Group:',
      conciergeDesc:
        '¿Necesitas un traslado privado o furgoneta familiar en Salé, Rabat o Casablanca?',
      conciergeCta: 'Escribir por WhatsApp'
    },
    umrah: {
      badge: 'Peregrinación Sagrada · Golden Group',
      title: 'Solicitud de Programa Hajj y Omra',
      subtitle:
        'Indícanos tu ciudad de salida, fechas y preferencias de hotel para tu viaje de Hajj y Omra y recibirás una propuesta personalizada por WhatsApp.',
      departureCityLabel: 'Ciudad de salida',
      departureCityPlaceholder: 'Ej.: Casablanca, Rabat-Salé, Tánger...',
      departureDateLabel: 'Fecha de salida deseada',
      returnDateLabel: 'Fecha de regreso deseada',
      travelersLabel: 'Viajeros',
      hotelPrefLabel: 'Preferencia de hotel',
      hotelOptions: [
        'Hotel 5★ Vista al Haram / Clock Tower',
        'Hotel 4★ Cerca de Masjid al-Haram',
        'Paquete Hajj y Omra Confort',
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
        'La disponibilidad y tarifas exactas son verificadas directamente por nuestros asesores.',
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
