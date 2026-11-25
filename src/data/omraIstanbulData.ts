import {
  Language,
  istanbulBosphorusImg,
  makkahHaramImg
} from '../assets/destinations';

export const OMRA_ISTANBUL_ROUTE = '/hajj-omra/istanbul';
export const OMRA_ISTANBUL_BACK_ROUTE = '/hajj-omra';

export const OMRA_ISTANBUL_IMAGES = {
  hero: istanbulBosphorusImg,
  makkah: makkahHaramImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const OMRA_ISTANBUL_META = {
  coverBadgePrinted: '3 – 16 Décembre 2026',
  startingPriceMad: 18500,
  nightsIstanbul: 4,
  nightsMadinah: 4,
  nightsMakkah: 5,
  totalNights: 13,
  printedDates: {
    departure: {
      fr: '3 décembre 2026',
      ar: '3 ديسمبر 2026',
      en: 'December 3, 2026',
      es: '3 de diciembre de 2026'
    },
    return: {
      fr: '16 décembre 2026',
      ar: '16 ديسمبر 2026',
      en: 'December 16, 2026',
      es: '16 de diciembre de 2026'
    }
  }
} as const;

export type OmraIstanbulOptionId = 'opt1' | 'opt2' | 'opt3';
export type OmraIstanbulRoomType = 'double' | 'triple' | 'quadruple' | 'quintuple';

export const OMRA_ISTANBUL_ROOM_ORDER: readonly OmraIstanbulRoomType[] = [
  'double',
  'triple',
  'quadruple',
  'quintuple'
] as const;

export interface OmraIstanbulOption {
  id: OmraIstanbulOptionId;
  code: Record<Language, string>;
  title: Record<Language, string>;
  istanbulHotelNote: Record<Language, string>;
  holyCitiesHotelNote: Record<Language, string>;
  pricesMad: Record<OmraIstanbulRoomType, number>;
}

export const OMRA_ISTANBUL_OPTIONS: readonly OmraIstanbulOption[] = [
  {
    id: 'opt1',
    code: {
      fr: 'Option Hôtel 1',
      ar: 'خيار الفنادق 1',
      en: 'Hotel Option 1',
      es: 'Opción Hotel 1'
    },
    title: {
      fr: 'Combinaison Hôtelière 1 · Dès 18 500 MAD (Istanbul · Médine · Makkah)',
      ar: 'المستوى الفندقي 1 · ابتداءً من 18,500 درهم (إسطنبول · المدينة · مكة)',
      en: 'Hotel Combination 1 · From 18,500 MAD (Istanbul · Madinah · Makkah)',
      es: 'Combinación Hotelera 1 · Desde 18 500 MAD (Estambul · Medina · La Meca)'
    },
    istanbulHotelNote: {
      fr: 'Hôtel à Istanbul · 4 nuits (nom exact à confirmer avec l’agence)',
      ar: 'فندق بإسطنبول · 4 ليالٍ (الاسم الدقيق قيد التأكيد لدى الوكالة)',
      en: 'Istanbul hotel · 4 nights (exact name pending agency confirmation)',
      es: 'Hotel en Estambul · 4 noches (nombre exacto por confirmar)'
    },
    holyCitiesHotelNote: {
      fr: 'Hôtels à Médine (4N) & Makkah (5N) — noms exacts à confirmer',
      ar: 'فندقا المدينة المنورة (4 ليالٍ) ومكة (5 ليالٍ) — الأسماء قيد التأكيد',
      en: 'Madinah (4N) & Makkah (5N) hotels — exact names pending confirmation',
      es: 'Hoteles en Medina (4N) y La Meca (5N) — nombres por confirmar'
    },
    pricesMad: {
      double: 26500,
      triple: 21500,
      quadruple: 20000,
      quintuple: 18500
    }
  },
  {
    id: 'opt2',
    code: {
      fr: 'Option Hôtel 2',
      ar: 'خيار الفنادق 2',
      en: 'Hotel Option 2',
      es: 'Opción Hotel 2'
    },
    title: {
      fr: 'Combinaison Hôtelière 2 · Dès 20 000 MAD (Istanbul · Médine · Makkah)',
      ar: 'المستوى الفندقي 2 · ابتداءً من 20,000 درهم (إسطنبول · المدينة · مكة)',
      en: 'Hotel Combination 2 · From 20,000 MAD (Istanbul · Madinah · Makkah)',
      es: 'Combinación Hotelera 2 · Desde 20 000 MAD (Estambul · Medina · La Meca)'
    },
    istanbulHotelNote: {
      fr: 'Hôtel à Istanbul · 4 nuits (nom exact à confirmer avec l’agence)',
      ar: 'فندق بإسطنبول · 4 ليالٍ (الاسم الدقيق قيد التأكيد لدى الوكالة)',
      en: 'Istanbul hotel · 4 nights (exact name pending agency confirmation)',
      es: 'Hotel en Estambul · 4 noches (nombre exacto por confirmar)'
    },
    holyCitiesHotelNote: {
      fr: 'Hôtels à Médine (4N) & Makkah (5N) — noms exacts à confirmer',
      ar: 'فندقا المدينة المنورة (4 ليالٍ) ومكة (5 ليالٍ) — الأسماء قيد التأكيد',
      en: 'Madinah (4N) & Makkah (5N) hotels — exact names pending confirmation',
      es: 'Hoteles en Medina (4N) y La Meca (5N) — nombres por confirmar'
    },
    pricesMad: {
      double: 28500,
      triple: 23500,
      quadruple: 22000,
      quintuple: 20000
    }
  },
  {
    id: 'opt3',
    code: {
      fr: 'Option Hôtel 3',
      ar: 'خيار الفنادق 3',
      en: 'Hotel Option 3',
      es: 'Opción Hotel 3'
    },
    title: {
      fr: 'Combinaison Hôtelière 3 · Dès 24 000 MAD (Istanbul · Médine · Makkah)',
      ar: 'المستوى الفندقي 3 · ابتداءً من 24,000 درهم (إسطنبول · المدينة · مكة)',
      en: 'Hotel Combination 3 · From 24,000 MAD (Istanbul · Madinah · Makkah)',
      es: 'Combinación Hotelera 3 · Desde 24 000 MAD (Estambul · Medina · La Meca)'
    },
    istanbulHotelNote: {
      fr: 'Hôtel à Istanbul · 4 nuits (nom exact à confirmer avec l’agence)',
      ar: 'فندق بإسطنبول · 4 ليالٍ (الاسم الدقيق قيد التأكيد لدى الوكالة)',
      en: 'Istanbul hotel · 4 nights (exact name pending agency confirmation)',
      es: 'Hotel en Estambul · 4 noches (nombre exacto por confirmar)'
    },
    holyCitiesHotelNote: {
      fr: 'Hôtels à Médine (4N) & Makkah (5N) — noms exacts à confirmer',
      ar: 'فندقا المدينة المنورة (4 ليالٍ) ومكة (5 ليالٍ) — الأسماء قيد التأكيد',
      en: 'Madinah (4N) & Makkah (5N) hotels — exact names pending confirmation',
      es: 'Hoteles en Medina (4N) y La Meca (5N) — nombres por confirmar'
    },
    pricesMad: {
      double: 35500,
      triple: 27000,
      quadruple: 25800,
      quintuple: 24000
    }
  }
] as const;

export interface OmraIstanbulExcursionGroup {
  id: string;
  dayTitle: string;
  sourceArabicLabel: string;
  confirmBadge?: string;
  items: string[];
}

export interface OmraIstanbulInclusionItem {
  key: 'ziyarat' | 'accommodation' | 'transport' | 'flights' | 'guidance' | 'visa';
  title: string;
  detail: string;
}

export interface OmraIstanbulLocaleCopy {
  cardBadge: string;
  title: string;
  arabicTitle: string;
  coverYearBadge: string;
  startingFromLabel: string;
  startingPriceDisplay: string;
  startingPriceBanner: string;
  startingPriceScopeNote: string;
  durationSummary: string;
  datesSummary: string;
  cardSummary: string;
  viewDetailsBtn: string;
  reserveBtn: string;

  backToUmrahLabel: string;
  backToHomeLabel: string;
  heroEyebrow: string;
  departureLabel: string;
  returnLabel: string;
  datesConfirmTag: string;

  hotelConfirmHeading: string;
  hotelConfirmExplanation: string;

  tableEyebrow: string;
  tableTitle: string;
  tableSubtitle: string;
  colOptionHotels: string;
  istanbulLabel: string;
  holyCitiesLabel: string;

  optionsEyebrow: string;
  optionsTitle: string;
  optionsSubtitle: string;
  roomLabels: Record<OmraIstanbulRoomType, { name: string; capacity: string }>;
  selectRoomBtn: string;
  selectedRoomBtn: string;

  excursionsEyebrow: string;
  excursionsTitle: string;
  excursionsSubtitle: string;
  excursionsSourceNote: string;
  excursionGroups: OmraIstanbulExcursionGroup[];

  inclusionsEyebrow: string;
  inclusionsTitle: string;
  inclusionsSubtitle: string;
  inclusions: OmraIstanbulInclusionItem[];
  unprintedTitle: string;
  unprintedItems: string[];

  conditionsEyebrow: string;
  conditionsTitle: string;
  conditionsList: { key: 'passport' | 'photo' | 'deposit'; title: string; detail: string }[];

  notesEyebrow: string;
  notesTitle: string;
  notesList: { key: 'baggage' | 'flights'; title: string; detail: string }[];

  inquiryEyebrow: string;
  inquiryTitle: string;
  inquirySubtitle: string;
  formOptionLabel: string;
  formRoomLabel: string;
  formTravelersLabel: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formNotesLabel: string;
  formNotesPlaceholder: string;
  formSubmitBtn: string;
  formNoAutoConfirm: string;
  errNameRequired: string;
  errPhoneRequired: string;

  quoteEyebrow: string;
  quoteTitle: string;
  quotePerPersonLabel: string;
  quoteGroupSubtotalLabel: string;
  quoteHotelsRecapLabel: string;
  quoteDatesNotice: string;

  readyTitle: string;
  readySubtitle: string;
  readyEditBtn: string;
  readyWhatsappBtn: string;
  advisorLabel: string;
  advisorTitle: string;
  advisorCallLabel: string;
  advisorMapsLabel: string;
}

export const OMRA_ISTANBUL_COPY: Record<Language, OmraIstanbulLocaleCopy> = {
  fr: {
    cardBadge: 'Offre B · Combiné Istanbul & Lieux Saints',
    title: 'Omra Istanbul',
    arabicTitle: 'عمرة إسطنبول',
    coverYearBadge: '3 – 16 Décembre 2026',
    startingFromLabel: 'À partir de',
    startingPriceDisplay: '18 500 MAD',
    startingPriceBanner: 'Omra Istanbul — À partir de 18 500 MAD / personne',
    startingPriceScopeNote:
      'Tarif officiel le plus bas par personne applicable à la chambre Quintuple (Option Hôtel 1).',
    durationSummary: '4 nuits Istanbul · 4 nuits Médine · 5 nuits Makkah (13 nuits)',
    datesSummary: '3 – 16 décembre 2026',
    cardSummary:
      'Séjour combiné comprenant 4 nuits à Istanbul avec excursions listées, 4 nuits à Médine et 5 nuits à Makkah, du 3 au 16 décembre 2026.',
    viewDetailsBtn: 'Voir les 3 options & tarifs',
    reserveBtn: 'Demander une réservation',

    backToUmrahLabel: 'Retour aux offres Hajj & Omra',
    backToHomeLabel: 'Retour à l’accueil',
    heroEyebrow: 'Offre Officielle Golden Group Travels · Omra Istanbul',
    departureLabel: 'Départ annoncé',
    returnLabel: 'Retour annoncé',
    datesConfirmTag: 'Noms précis d’hôtels à confirmer auprès de l’agence',

    hotelConfirmHeading:
      'Noms précis des hôtels & ordre du 3e groupe d’excursions — À confirmer auprès de l’agence',
    hotelConfirmExplanation:
      'Les trois colonnes tarifaires (Options Hôtel 1, 2 et 3) correspondent exactement à la grille officielle d’Omra Istanbul. Les noms exacts des hôtels à Istanbul, Médine et Makkah n’ayant pas été transmis sur un visuel lisible, ils restent soumis à confirmation directe auprès de notre équipe à Salé sans aucune estimation inventée.',

    tableEyebrow: 'Grille Tarifaire Officielle (MAD / personne)',
    tableTitle: 'Tableau comparatif des 3 combinaisons hôtelières',
    tableSubtitle:
      'Cliquez sur n’importe quel tarif du tableau pour sélectionner la combinaison hôtelière et la catégorie de chambre correspondante.',
    colOptionHotels: 'Option & Étapes',
    istanbulLabel: 'Istanbul (4 nuits)',
    holyCitiesLabel: 'Médine (4N) & Makkah (5N)',

    optionsEyebrow: 'Sélection Interactive (Options 1 à 3)',
    optionsTitle: 'Détails par option hôtelière & choix de la chambre',
    optionsSubtitle:
      'Choisissez votre niveau d’hébergement (Option 1, 2 ou 3) et votre occupation pour calculer votre estimation et préparer votre demande WhatsApp.',
    roomLabels: {
      double: { name: 'Chambre Double', capacity: '2 personnes' },
      triple: { name: 'Chambre Triple', capacity: '3 personnes' },
      quadruple: { name: 'Chambre Quadruple', capacity: '4 personnes' },
      quintuple: { name: 'Chambre Quintuple', capacity: '5 personnes' }
    },
    selectRoomBtn: 'Choisir',
    selectedRoomBtn: 'Sélectionnée',

    excursionsEyebrow: '4 Nuits à Istanbul · Programme Officiel',
    excursionsTitle: 'Programme des excursions à Istanbul',
    excursionsSubtitle:
      'Activités et visites telles qu’elles figurent dans l’annonce officielle, sans horaires ni suppléments inventés.',
    excursionsSourceNote:
      'Note d’exactitude : l’annonce source répète le libellé arabe « اليوم الثاني » sur le troisième bloc d’excursions ; ce groupe est affiché ci-dessous tel quel avec mention à confirmer auprès de l’agence.',
    excursionGroups: [
      {
        id: 'day-1',
        dayTitle: 'Premier jour listé',
        sourceArabicLabel: 'اليوم الأول',
        items: [
          'Croisière sur le Bosphore.',
          'Visite de la Mosquée Sultan Ahmed et du quartier Sainte-Sophie (Hagia Sophia).',
          'Visite de Venezia Mall.'
        ]
      },
      {
        id: 'day-2',
        dayTitle: 'Deuxième jour listé',
        sourceArabicLabel: 'اليوم الثاني',
        items: [
          'Visite de la Mosquée Eyüp Sultan / Abou Ayyub al-Ansari.',
          'Visite de Balat.',
          'Visite de la Mosquée Süleymaniye.',
          'Visite du Bazar Égyptien.',
          'Visite de Venezia Mall.'
        ]
      },
      {
        id: 'day-3-source-repeat',
        dayTitle: 'Troisième groupe d’excursions listé',
        sourceArabicLabel: 'اليوم الثاني',
        confirmBadge: 'Libellé « اليوم الثاني » répété dans l’annonce — ordre à confirmer',
        items: [
          'Visite d’Istanbul asiatique.',
          'Visite de la Mosquée de Çamlıca et de la colline d’Arus (tel qu’indiqué dans l’annonce).',
          'Visite du secteur de la Tour de Léandre (Maiden’s Tower).',
          'Visite de la place d’Üsküdar.',
          'Visite de la zone côtière de Çamlıca.'
        ]
      }
    ],

    inclusionsEyebrow: 'Prestations Officiellement Annoncées',
    inclusionsTitle: 'Le prix comprend',
    inclusionsSubtitle:
      'Les six prestations officielles du forfait combiné Omra Istanbul.',
    inclusions: [
      { key: 'ziyarat', title: 'Visites religieuses', detail: 'Visites religieuses et excursions à Istanbul incluses au programme.' },
      { key: 'accommodation', title: 'Hôtels / Hébergement', detail: '4 nuits à Istanbul, 4 nuits à Médine et 5 nuits à Makkah.' },
      { key: 'transport', title: 'Transport', detail: 'Transports terrestres assurés sur place selon le programme.' },
      { key: 'flights', title: 'Vols', detail: 'Billets d’avion aller-retour.' },
      { key: 'guidance', title: 'Encadrement', detail: 'Encadrement et accompagnement durant tout le voyage.' },
      { key: 'visa', title: 'Visa', detail: 'Démarches de visa incluses au forfait (sous réserve des autorités).' }
    ],
    unprintedTitle: 'Éléments non précisés · À confirmer par l’agence',
    unprintedItems: [
      'Formule de repas / petits-déjeuners à Istanbul, Médine et Makkah : à confirmer.',
      'Noms précis des établissements hôteliers pour Options 1, 2 et 3 : à confirmer.',
      'Dépenses personnelles, excédents de bagages et visites optionnelles hors programme.'
    ],

    conditionsEyebrow: 'Conditions d’inscription',
    conditionsTitle: 'Documents requis & conditions d’engagement',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passeport valide au moins 6 mois',
        detail: 'Le passeport doit disposer d’une validité d’au moins six (6) mois.'
      },
      {
        key: 'photo',
        title: 'Photo d’identité sur fond blanc',
        detail: 'Une photographie d’identité récente format passeport sur fond blanc.'
      },
      {
        key: 'deposit',
        title: 'Condition spéciale d’inscription',
        detail:
          'Dépôt du passeport sans paiement du montant de la réservation (condition telle qu’énoncée dans le visuel officiel).'
      }
    ],

    notesEyebrow: 'Mentions importantes',
    notesTitle: 'Notes aux voyageurs',
    notesList: [
      {
        key: 'baggage',
        title: 'Excédent de bagages',
        detail: 'L’agence n’est pas responsable des bagages ni de l’excédent de poids.'
      },
      {
        key: 'flights',
        title: 'Horaires de vol & disponibilités',
        detail:
          'Les horaires de vol sont soumis à disponibilité et chaque place est confirmée en direct par notre agence.'
      }
    ],

    inquiryEyebrow: 'Demande directe · Golden Group Travels Salé',
    inquiryTitle: 'Demander une réservation — Omra Istanbul',
    inquirySubtitle:
      'Sélectionnez votre option hôtelière, la catégorie de chambre et le nombre de voyageurs pour envoyer votre demande WhatsApp.',
    formOptionLabel: 'Option hôtelière',
    formRoomLabel: 'Type de chambre',
    formTravelersLabel: 'Nombre de voyageurs',
    formNameLabel: 'Nom complet',
    formNamePlaceholder: 'Votre nom et prénom',
    formPhoneLabel: 'Téléphone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Précisions complémentaires',
    formNotesPlaceholder: 'Demande de confirmation des noms d’hôtels ou précisions sur le séjour…',
    formSubmitBtn: 'Préparer ma demande WhatsApp',
    formNoAutoConfirm:
      'Aucune confirmation automatique ni disponibilité en direct ; votre demande est vérifiée directement par notre agence.',
    errNameRequired: 'Veuillez saisir votre nom complet.',
    errPhoneRequired: 'Veuillez indiquer votre numéro de téléphone ou WhatsApp.',

    quoteEyebrow: 'Tarif Sélectionné (MAD)',
    quoteTitle: 'Récapitulatif par personne',
    quotePerPersonLabel: 'Tarif officiel / personne',
    quoteGroupSubtotalLabel: 'Total estimé du groupe',
    quoteHotelsRecapLabel: 'Étapes de l’option choisie',
    quoteDatesNotice:
      'Départ annoncé : 3 décembre 2026 — Retour annoncé : 16 décembre 2026 (noms exacts des hôtels à confirmer).',

    readyTitle: 'Demande prête pour envoi WhatsApp',
    readySubtitle:
      'Appuyez ci-dessous pour envoyer votre sélection à Golden Group Travels Salé.',
    readyEditBtn: 'Modifier ma sélection',
    readyWhatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Conseiller Omra Istanbul',
    advisorCallLabel: 'Appeler l’agence',
    advisorMapsLabel: 'Localiser sur Google Maps'
  },

  ar: {
    cardBadge: 'العرض ب · عمرة إسطنبول والأماكن المقدسة',
    title: 'عمرة إسطنبول',
    arabicTitle: 'عمرة إسطنبول',
    coverYearBadge: 'من 3 إلى 16 ديسمبر 2026',
    startingFromLabel: 'ابتداءً من',
    startingPriceDisplay: '18,500 درهم',
    startingPriceBanner: 'عمرة إسطنبول — ابتداءً من 18,500 درهم / للشخص',
    startingPriceScopeNote:
      'أقل سعر معلن للشخص الواحد في الغرفة الخماسية (خيار الفنادق 1).',
    durationSummary: '4 ليالٍ إسطنبول · 4 ليالٍ المدينة · 5 ليالٍ مكة (13 ليلة)',
    datesSummary: '3 – 16 ديسمبر 2026',
    cardSummary:
      'برنامج يجمع بين 4 ليالٍ في إسطنبول مع الجولات المعلنة، و4 ليالٍ بالمدينة المنورة و5 ليالٍ بمكة المكرمة من 3 إلى 16 ديسمبر 2026.',
    viewDetailsBtn: 'عرض الخيارات الـ 3 والأسعار',
    reserveBtn: 'طلب حجز',

    backToUmrahLabel: 'العودة إلى عروض الحج والعمرة',
    backToHomeLabel: 'العودة إلى الرئيسية',
    heroEyebrow: 'البرنامج الرسمي لدى Golden Group Travels · عمرة إسطنبول',
    departureLabel: 'الذهاب المعلن',
    returnLabel: 'العودة المعلنة',
    datesConfirmTag: 'أسماء الفنادق الدقيقة قيد التأكيد لدى الوكالة',

    hotelConfirmHeading:
      'أسماء الفنادق الدقيقة وترتيب المجموعة الثالثة من الجولات — قيد تأكيد الوكالة',
    hotelConfirmExplanation:
      'تمثل الأعمدة الثلاثة خيارات الفنادق الثلاثة المطابقة لجدول الأسعار الرسمي لعمرة إسطنبول. وبما أن أسماء الفنادق التفصيلية في إسطنبول والمدينة ومكة لم تُرفق في صورة مقروءة، تبقى قيد التأكيد المباشر من طرف وكالتنا بسلا دون أي تخمين.',

    tableEyebrow: 'جدول الأسعار الرسمي (درهم / للشخص)',
    tableTitle: 'مقارنة خيارات الفنادق الثلاثة',
    tableSubtitle: 'اضغط على أي سعر في الجدول لاختيار خيار الفنادق ونوع الغرفة مباشرة.',
    colOptionHotels: 'الخيار والمراحل',
    istanbulLabel: 'إسطنبول (4 ليالٍ)',
    holyCitiesLabel: 'المدينة (4 ليالٍ) ومكة (5 ليالٍ)',

    optionsEyebrow: 'الاختيار التفاعلي (الخيارات 1 إلى 3)',
    optionsTitle: 'تفاصيل كل خيار واختيار الغرفة',
    optionsSubtitle: 'حدد خيار الفنادق ونوع الغرفة لحساب التكلفة وإعداد رسالة الواتساب.',
    roomLabels: {
      double: { name: 'غرفة ثنائية', capacity: 'شخصان' },
      triple: { name: 'غرفة ثلاثية', capacity: '3 أشخاص' },
      quadruple: { name: 'غرفة رباعية', capacity: '4 أشخاص' },
      quintuple: { name: 'غرفة خماسية', capacity: '5 أشخاص' }
    },
    selectRoomBtn: 'اختيار',
    selectedRoomBtn: 'محددة',

    excursionsEyebrow: '4 ليالٍ في إسطنبول · البرنامج الرسمي',
    excursionsTitle: 'برنامج الجولات السياحية في إسطنبول',
    excursionsSubtitle: 'الأنشطة والزيارات كما وردت في الإعلان الرسمي دون إضافة مواقيت أو رسوم غير معلنة.',
    excursionsSourceNote:
      'ملاحظة دقة المصدر: يكرر الإعلان الأصلي عبارة «اليوم الثاني» في المجموعة الثالثة من الجولات؛ لذلك تُعرض أدناه مع التنبيه إلى تأكيد الترتيب لدى الوكالة.',
    excursionGroups: [
      {
        id: 'day-1',
        dayTitle: 'اليوم الأول',
        sourceArabicLabel: 'اليوم الأول',
        items: [
          'رحلة بحرية في مضيق البوسفور.',
          'زيارة جامع السلطان أحمد ومنطقة آيا صوفيا.',
          'زيارة فينيسيا مول (Venezia Mall).'
        ]
      },
      {
        id: 'day-2',
        dayTitle: 'اليوم الثاني',
        sourceArabicLabel: 'اليوم الثاني',
        items: [
          'زيارة مسجد الصحابي الجليل أبي أيوب الأنصاري (أيوب سلطان).',
          'زيارة حي بلاط (Balat).',
          'زيارة جامع السليمانية.',
          'زيارة السوق المصري.',
          'زيارة فينيسيا مول (Venezia Mall).'
        ]
      },
      {
        id: 'day-3-source-repeat',
        dayTitle: 'المجموعة الثالثة المدرجة',
        sourceArabicLabel: 'اليوم الثاني',
        confirmBadge: 'وردت في الإعلان بعنوان «اليوم الثاني» — يرجى تأكيد الترقيم',
        items: [
          'زيارة إسطنبول الآسيوية.',
          'زيارة جامع تشامليجا وتلة العرائس كما ورد في الإعلان.',
          'زيارة محيط برج الفتاة (Maiden’s Tower).',
          'زيارة ساحة أوسكودار (Üsküdar).',
          'زيارة المنطقة الساحلية تشامليجا.'
        ]
      }
    ],

    inclusionsEyebrow: 'الخدمات المعلنة في البرنامج',
    inclusionsTitle: 'السعر الأساسي يشمل',
    inclusionsSubtitle: 'الخدمات الست الرسمية في برنامج عمرة إسطنبول.',
    inclusions: [
      { key: 'ziyarat', title: 'المزارات الدينية والجولات', detail: 'المزارات الدينية والجولات السياحية المدرجة بإسطنبول.' },
      { key: 'accommodation', title: 'الفنادق / الإقامة', detail: '4 ليالٍ بإسطنبول و4 ليالٍ بالمدينة و5 ليالٍ بمكة.' },
      { key: 'transport', title: 'النقل', detail: 'النقل البري المشمول طوال مراحل البرنامج.' },
      { key: 'flights', title: 'الطيران', detail: 'تذاكر السفر بالطائرة ذهاباً وإياباً.' },
      { key: 'guidance', title: 'المرافقة والتأطير', detail: 'مرافقة وإرشاد من فريق الوكالة طوال الرحلة.' },
      { key: 'visa', title: 'التأشيرة', detail: 'إجراءات التأشيرة المشمولة بالعرض.' }
    ],
    unprintedTitle: 'عناصر غير محددة · قيد التأكيد لدى الوكالة',
    unprintedItems: [
      'نظام الوجبات / الإفطار في إسطنبول والمدينة ومكة: قيد التأكيد.',
      'الأسماء الدقيقة للفنادق في الخيارات 1 و2 و3: قيد التأكيد.',
      'المصاريف الشخصية، الوزن الزائد للأمتعة والأنشطة الاختيارية الإضافية.'
    ],

    conditionsEyebrow: 'شروط التسجيل',
    conditionsTitle: 'الوثائق المطلوبة وشروط الحجز',
    conditionsList: [
      {
        key: 'passport',
        title: 'جواز سفر صالح لمدة 6 أشهر على الأقل',
        detail: 'يجب ألا تقل صلاحية الجواز عن ستة (6) أشهر.'
      },
      {
        key: 'photo',
        title: 'صورة شمسية بخلفية بيضاء',
        detail: 'مطلوب صورة شخصية حديثة بخلفية بيضاء.'
      },
      {
        key: 'deposit',
        title: 'شرط التسجيل المعلن',
        detail: 'إيداع جواز السفر بدون دفع مبلغ الحجز (وفق الشرط المعلن في الإعلان الرسمي).'
      }
    ],

    notesEyebrow: 'ملاحظات هامة',
    notesTitle: 'تنبيهات للمعتمرين',
    notesList: [
      {
        key: 'baggage',
        title: 'الوزن الزائد للأمتعة',
        detail: 'الوكالة غير مسؤولة عن الأمتعة والوزن الزائد.'
      },
      {
        key: 'flights',
        title: 'مواقيت الطيران والتوفر',
        detail: 'مواقيت الطيران رهينة بالتوفر ويُؤكَّد التوافر الفعلي مباشرة لدى الوكالة.'
      }
    ],

    inquiryEyebrow: 'طلب مباشر · وكالة سلا',
    inquiryTitle: 'طلب حجز — عمرة إسطنبول',
    inquirySubtitle: 'اختر الفندق والغرفة وعدد المسافرين لإرسال طلبك عبر واتساب.',
    formOptionLabel: 'خيار الفنادق',
    formRoomLabel: 'نوع الغرفة',
    formTravelersLabel: 'عدد المسافرين',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'الاسم والنسب',
    formPhoneLabel: 'رقم الهاتف / واتساب',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'ملاحظات إضافية',
    formNotesPlaceholder: 'طلب تأكيد أسماء الفنادق أو أي استفسار إضافي...',
    formSubmitBtn: 'تجهيز طلب الواتساب',
    formNoAutoConfirm: 'لا يتم تأكيد الحجز تلقائياً عبر الموقع؛ يتولى فريق الوكالة المراجعة مباشرة.',
    errNameRequired: 'يرجى إدخال الاسم الكامل.',
    errPhoneRequired: 'يرجى إدخال رقم الهاتف أو الواتساب.',

    quoteEyebrow: 'ملخص السعر (درهم)',
    quoteTitle: 'السعر للشخص',
    quotePerPersonLabel: 'السعر الرسمي / للشخص',
    quoteGroupSubtotalLabel: 'التقدير الإجمالي للمجموعة',
    quoteHotelsRecapLabel: 'مراحل الخيار المحدد',
    quoteDatesNotice:
      'الذهاب المعلن: 3 ديسمبر 2026 — العودة: 16 ديسمبر 2026 (أسماء الفنادق قيد التأكيد).',

    readyTitle: 'الطلب جاهز للإرسال عبر واتساب',
    readySubtitle: 'اضغط أدناه لإرسال اختيارك إلى فريق Golden Group Travels بسلا.',
    readyEditBtn: 'تعديل الاختيار',
    readyWhatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    advisorLabel: 'Golden Group Travels · سلا',
    advisorTitle: 'مستشار عمرة إسطنبول',
    advisorCallLabel: 'الاتصال بالوكالة',
    advisorMapsLabel: 'الموقع على خرائط Google'
  },

  en: {
    cardBadge: 'Offer B · Istanbul & Holy Cities',
    title: 'Omra Istanbul',
    arabicTitle: 'عمرة إسطنبول',
    coverYearBadge: 'Dec 3 – Dec 16, 2026',
    startingFromLabel: 'Starting from',
    startingPriceDisplay: '18,500 MAD',
    startingPriceBanner: 'Omra Istanbul — From 18,500 MAD / person',
    startingPriceScopeNote:
      'Lowest official advertised rate per person applies to Quintuple Room (Hotel Option 1).',
    durationSummary: '4 nights Istanbul · 4 nights Madinah · 5 nights Makkah (13 nights)',
    datesSummary: 'December 3 – December 16, 2026',
    cardSummary:
      'Combined itinerary featuring 4 nights in Istanbul with listed excursions, 4 nights in Madinah, and 5 nights in Makkah from December 3 to 16, 2026.',
    viewDetailsBtn: 'View 3 options & prices',
    reserveBtn: 'Request booking',

    backToUmrahLabel: 'Back to Hajj & Omra offers',
    backToHomeLabel: 'Back to Home',
    heroEyebrow: 'Official Golden Group Travels Offer · Omra Istanbul',
    departureLabel: 'Printed departure',
    returnLabel: 'Printed return',
    datesConfirmTag: 'Exact hotel property names subject to confirmation',

    hotelConfirmHeading:
      'Exact Hotel Names & 3rd Excursion Group Numbering — Subject to Confirmation',
    hotelConfirmExplanation:
      'The three columns match the official Istanbul · Madinah · Makkah hotel tiers from the agency rate table. Because exact hotel names were not provided in legible attachment views, they remain flagged for direct confirmation from our Salé office without guessing.',

    tableEyebrow: 'Official Fare Matrix (MAD / person)',
    tableTitle: 'Comparison across all 3 hotel combinations',
    tableSubtitle:
      'Click any rate cell or choose an option card below to update your room quote.',
    colOptionHotels: 'Option & Itinerary',
    istanbulLabel: 'Istanbul (4 nights)',
    holyCitiesLabel: 'Madinah (4N) & Makkah (5N)',

    optionsEyebrow: 'Interactive Selection (Options 1 to 3)',
    optionsTitle: 'Option breakdown & room selection',
    optionsSubtitle:
      'Choose a hotel tier (Option 1, 2, or 3) and room occupancy to calculate your quote and prepare your WhatsApp inquiry.',
    roomLabels: {
      double: { name: 'Double Room', capacity: '2 travelers' },
      triple: { name: 'Triple Room', capacity: '3 travelers' },
      quadruple: { name: 'Quadruple Room', capacity: '4 travelers' },
      quintuple: { name: 'Quintuple Room', capacity: '5 travelers' }
    },
    selectRoomBtn: 'Select',
    selectedRoomBtn: 'Selected',

    excursionsEyebrow: '4 Nights in Istanbul · Official Program',
    excursionsTitle: 'Istanbul Excursion Program',
    excursionsSubtitle:
      'Activities listed exactly as advertised, without invented schedules, ticket prices, or extra stops.',
    excursionsSourceNote:
      'Source accuracy note: the advertisement repeats the Arabic label «اليوم الثاني» for the third excursion block; it is shown below as an additional listed group pending confirmation.',
    excursionGroups: [
      {
        id: 'day-1',
        dayTitle: 'First Listed Day',
        sourceArabicLabel: 'اليوم الأول',
        items: [
          'Bosphorus cruise.',
          'Visit to Sultan Ahmed Mosque and Hagia Sophia area.',
          'Visit to Venezia Mall.'
        ]
      },
      {
        id: 'day-2',
        dayTitle: 'Second Listed Day',
        sourceArabicLabel: 'اليوم الثاني',
        items: [
          'Visit to Eyüp Sultan / Abu Ayyub al-Ansari Mosque.',
          'Visit to Balat.',
          'Visit to Süleymaniye Mosque.',
          'Visit to the Egyptian Bazaar.',
          'Visit to Venezia Mall.'
        ]
      },
      {
        id: 'day-3-source-repeat',
        dayTitle: 'Additional Listed Excursion Group',
        sourceArabicLabel: 'اليوم الثاني',
        confirmBadge: 'Source repeats «اليوم الثاني» — day numbering to confirm',
        items: [
          'Visit to Asian Istanbul.',
          'Visit to Çamlıca Mosque and Arus Hill as written in the advertisement.',
          'Visit to the Maiden’s Tower area.',
          'Visit to Üsküdar Square.',
          'Visit to the Çamlıca coastal area.'
        ]
      }
    ],

    inclusionsEyebrow: 'Official Program Inclusions',
    inclusionsTitle: 'The price includes',
    inclusionsSubtitle:
      'The six core categories announced on the Omra Istanbul combined package.',
    inclusions: [
      { key: 'ziyarat', title: 'Religious Visits & Excursions', detail: 'Included religious visits and listed Istanbul excursions.' },
      { key: 'accommodation', title: 'Hotels / Accommodation', detail: '4 nights in Istanbul, 4 nights in Madinah, and 5 nights in Makkah.' },
      { key: 'transport', title: 'Transportation', detail: 'Scheduled ground transfers throughout the itinerary.' },
      { key: 'flights', title: 'Flights', detail: 'Round-trip flight tickets.' },
      { key: 'guidance', title: 'Guidance', detail: 'Dedicated accompaniment throughout the journey.' },
      { key: 'visa', title: 'Visa', detail: 'Visa processing included in the package (subject to authorities).' }
    ],
    unprintedTitle: 'Unspecified Items · Pending Agency Confirmation',
    unprintedItems: [
      'Meal plans / breakfast in Istanbul, Madinah, and Makkah: to confirm.',
      'Exact hotel property names for Hotel Options 1, 2, and 3: to confirm.',
      'Personal expenses, excess baggage, and non-listed optional tours.'
    ],

    conditionsEyebrow: 'Registration Conditions',
    conditionsTitle: 'Required documents & special condition',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passport valid for at least 6 months',
        detail: 'Pilgrim passports must carry a minimum six-month validity.'
      },
      {
        key: 'photo',
        title: 'Passport photograph with white background',
        detail: 'Official passport photograph on a plain white background.'
      },
      {
        key: 'deposit',
        title: 'Printed booking deposit condition',
        detail:
          'Passport submission without payment of the booking amount, as stated in the official advertisement.'
      }
    ],

    notesEyebrow: 'Important Notes',
    notesTitle: 'Pilgrim advisories',
    notesList: [
      {
        key: 'baggage',
        title: 'Excess baggage policy',
        detail: 'The agency is not responsible for luggage or excess baggage weight.'
      },
      {
        key: 'flights',
        title: 'Flight schedules & seat availability',
        detail: 'Flight timing is subject to availability and confirmed directly by our team.'
      }
    ],

    inquiryEyebrow: 'Direct Desk · Golden Group Travels Salé',
    inquiryTitle: 'Request a booking — Omra Istanbul',
    inquirySubtitle:
      'Select your hotel tier, room occupancy, and traveler count to prepare your direct WhatsApp inquiry.',
    formOptionLabel: 'Hotel option',
    formRoomLabel: 'Room type',
    formTravelersLabel: 'Travelers',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'Your full name',
    formPhoneLabel: 'Phone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Additional notes',
    formNotesPlaceholder: 'Requests for exact hotel names or family room availability…',
    formSubmitBtn: 'Prepare WhatsApp inquiry',
    formNoAutoConfirm:
      'Reservations are not automatically confirmed and live availability is not claimed online.',
    errNameRequired: 'Please enter your full name.',
    errPhoneRequired: 'Please enter your phone or WhatsApp number.',

    quoteEyebrow: 'Selected Rate (MAD)',
    quoteTitle: 'Verified per-person fare',
    quotePerPersonLabel: 'Official rate / person',
    quoteGroupSubtotalLabel: 'Estimated group subtotal',
    quoteHotelsRecapLabel: 'Selected option stages',
    quoteDatesNotice:
      'Printed dates: Dec 3 – Dec 16, 2026 (exact hotel property names subject to agency confirmation).',

    readyTitle: 'Inquiry ready for WhatsApp',
    readySubtitle: 'Click below to send your selection to Golden Group Travels in Salé.',
    readyEditBtn: 'Edit selection',
    readyWhatsappBtn: 'Send via WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Omra Istanbul desk',
    advisorCallLabel: 'Call agency',
    advisorMapsLabel: 'Locate on Google Maps'
  },

  es: {
    cardBadge: 'Oferta B · Estambul y Ciudades Santas',
    title: 'Omra Istanbul',
    arabicTitle: 'عمرة إسطنبول',
    coverYearBadge: '3 – 16 Diciembre 2026',
    startingFromLabel: 'Desde',
    startingPriceDisplay: '18 500 MAD',
    startingPriceBanner: 'Omra Istanbul — Desde 18 500 MAD / persona',
    startingPriceScopeNote:
      'Tarifa mínima anunciada por persona correspondiente a habitación Quíntuple (Opción Hotel 1).',
    durationSummary: '4 noches Estambul · 4 noches Medina · 5 noches La Meca (13 noches)',
    datesSummary: '3 – 16 de diciembre de 2026',
    cardSummary:
      'Viaje combinado con 4 noches en Estambul y excursiones listadas, 4 noches en Medina y 5 noches en La Meca del 3 al 16 de diciembre de 2026.',
    viewDetailsBtn: 'Ver las 3 opciones y precios',
    reserveBtn: 'Solicitar reserva',

    backToUmrahLabel: 'Volver a Hajj & Omra',
    backToHomeLabel: 'Volver al inicio',
    heroEyebrow: 'Oferta Oficial Golden Group Travels · Omra Istanbul',
    departureLabel: 'Salida anunciada',
    returnLabel: 'Regreso anunciado',
    datesConfirmTag: 'Nombres exactos de hoteles por confirmar',

    hotelConfirmHeading:
      'Nombres exactos de hoteles y orden del tercer bloque — Por confirmar',
    hotelConfirmExplanation:
      'Las tres columnas coinciden exactamente con las opciones de hotel del cartel oficial de Omra Istanbul. Al no figurar legibles los nombres individuales de cada hotel en Estambul, Medina y La Meca, permanecen sujetos a confirmación directa en Salé.',

    tableEyebrow: 'Tarifario Oficial (MAD / persona)',
    tableTitle: 'Tabla comparativa de las 3 opciones hoteleras',
    tableSubtitle:
      'Haga clic en cualquier celda disponible para preseleccionar opción y habitación.',
    colOptionHotels: 'Opción y Etapas',
    istanbulLabel: 'Estambul (4 noches)',
    holyCitiesLabel: 'Medina (4N) y La Meca (5N)',

    optionsEyebrow: 'Selección Interactiva (Opciones 1 a 3)',
    optionsTitle: 'Detalle por opción y habitación',
    optionsSubtitle:
      'Elija una categoría hotelera y tipo de habitación para preparar su consulta por WhatsApp.',
    roomLabels: {
      double: { name: 'Habitación Doble', capacity: '2 personas' },
      triple: { name: 'Habitación Triple', capacity: '3 personas' },
      quadruple: { name: 'Habitación Cuádruple', capacity: '4 personas' },
      quintuple: { name: 'Habitación Quíntuple', capacity: '5 personas' }
    },
    selectRoomBtn: 'Elegir',
    selectedRoomBtn: 'Seleccionada',

    excursionsEyebrow: '4 Noches en Estambul · Programa Oficial',
    excursionsTitle: 'Programa de excursiones en Estambul',
    excursionsSubtitle:
      'Visitas tal y como aparecen en el folleto oficial sin horarios ni suplementos inventados.',
    excursionsSourceNote:
      'Nota de fidelidad: el anuncio original repite «اليوم الثاني» en el tercer grupo; se muestra aquí sujeto a confirmación de orden por la agencia.',
    excursionGroups: [
      {
        id: 'day-1',
        dayTitle: 'Primer día listado',
        sourceArabicLabel: 'اليوم الأول',
        items: [
          'Crucero por el Bósforo.',
          'Visita a la Mezquita Azul (Sultan Ahmed) y entorno de Santa Sofía.',
          'Visita a Venezia Mall.'
        ]
      },
      {
        id: 'day-2',
        dayTitle: 'Segundo día listado',
        sourceArabicLabel: 'اليوم الثاني',
        items: [
          'Visita a la Mezquita Eyüp Sultan / Abu Ayyub al-Ansari.',
          'Visita a Balat.',
          'Visita a la Mezquita de Süleymaniye.',
          'Visita al Bazar Egipcio.',
          'Visita a Venezia Mall.'
        ]
      },
      {
        id: 'day-3-source-repeat',
        dayTitle: 'Tercer grupo de excursiones listado',
        sourceArabicLabel: 'اليوم الثاني',
        confirmBadge: 'Repite «اليوم الثاني» en el origen — orden por confirmar',
        items: [
          'Visita al lado asiático de Estambul.',
          'Visita a la Mezquita de Çamlıca y colina de Arus según texto original.',
          'Visita al entorno de la Torre de la Doncella.',
          'Visita a la plaza de Üsküdar.',
          'Visita a la zona costera de Çamlıca.'
        ]
      }
    ],

    inclusionsEyebrow: 'Servicios Anunciados',
    inclusionsTitle: 'El precio incluye',
    inclusionsSubtitle:
      'Los seis apartados oficiales incluidos en el paquete combinado Omra Istanbul.',
    inclusions: [
      { key: 'ziyarat', title: 'Visitas religiosas y excursiones', detail: 'Visitas religiosas y excursiones listadas en Estambul.' },
      { key: 'accommodation', title: 'Hoteles / Alojamiento', detail: '4 noches en Estambul, 4 noches en Medina y 5 noches en La Meca.' },
      { key: 'transport', title: 'Transporte', detail: 'Traslados terrestres previstos en el itinerario.' },
      { key: 'flights', title: 'Vuelos', detail: 'Billetes de avión ida y vuelta.' },
      { key: 'guidance', title: 'Acompañamiento', detail: 'Asistencia durante todo el viaje.' },
      { key: 'visa', title: 'Visado', detail: 'Tramitación de visado incluida (sujeto a autoridades).' }
    ],
    unprintedTitle: 'Conceptos no especificados · Por confirmar',
    unprintedItems: [
      'Régimen de comidas / desayunos en Estambul, Medina y La Meca: por confirmar.',
      'Nombres exactos de los hoteles de Opciones 1, 2 y 3: por confirmar.',
      'Gastos personales, exceso de equipaje y excursiones no incluidas.'
    ],

    conditionsEyebrow: 'Requisitos',
    conditionsTitle: 'Condiciones de inscripción',
    conditionsList: [
      {
        key: 'passport',
        title: 'Pasaporte con validez mínima de 6 meses',
        detail: 'El pasaporte debe tener al menos seis meses de vigencia.'
      },
      {
        key: 'photo',
        title: 'Fotografía con fondo blanco',
        detail: 'Se requiere fotografía tipo pasaporte con fondo blanco.'
      },
      {
        key: 'deposit',
        title: 'Condición especial de inscripción',
        detail:
          'Entrega del pasaporte sin abono previo del importe de la reserva, según texto oficial.'
      }
    ],

    notesEyebrow: 'Avisos',
    notesTitle: 'Notas importantes',
    notesList: [
      {
        key: 'baggage',
        title: 'Exceso de equipaje',
        detail: 'La agencia no es responsable del equipaje ni del exceso de peso.'
      },
      {
        key: 'flights',
        title: 'Horarios y disponibilidad',
        detail: 'Los horarios de vuelo y plazas quedan sujetos a confirmación directa.'
      }
    ],

    inquiryEyebrow: 'Consulta directa · Salé',
    inquiryTitle: 'Solicitar reserva — Omra Istanbul',
    inquirySubtitle:
      'Seleccione opción, habitación y viajeros para enviar su solicitud por WhatsApp.',
    formOptionLabel: 'Opción hotelera',
    formRoomLabel: 'Tipo de habitación',
    formTravelersLabel: 'Viajeros',
    formNameLabel: 'Nombre completo',
    formNamePlaceholder: 'Su nombre completo',
    formPhoneLabel: 'Teléfono / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Notas adicionales',
    formNotesPlaceholder: 'Solicitud de nombres exactos de hoteles…',
    formSubmitBtn: 'Preparar solicitud WhatsApp',
    formNoAutoConfirm: 'Sin confirmación automática en línea.',
    errNameRequired: 'Por favor ingrese su nombre.',
    errPhoneRequired: 'Por favor ingrese su teléfono.',

    quoteEyebrow: 'Resumen Tarifario (MAD)',
    quoteTitle: 'Tarifa por persona',
    quotePerPersonLabel: 'Tarifa oficial / persona',
    quoteGroupSubtotalLabel: 'Subtotal estimado grupo',
    quoteHotelsRecapLabel: 'Etapas de la opción',
    quoteDatesNotice:
      'Fechas anunciadas: 3 – 16 dic 2026 (nombres exactos de hoteles por confirmar).',

    readyTitle: 'Solicitud lista para WhatsApp',
    readySubtitle: 'Envíe su selección directamente a Golden Group Travels.',
    readyEditBtn: 'Modificar selección',
    readyWhatsappBtn: 'Enviar por WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Asistencia Omra Istanbul',
    advisorCallLabel: 'Llamar a la agencia',
    advisorMapsLabel: 'Ver en Google Maps'
  }
};
