import umrahChaabaneHeroImg from '../assets/images/omra_chaabane_hero_1795460155030.jpg';
import makkahHaramImg from '../assets/images/dest_makkah_haram_1794663630924.jpg';
import { Language } from '../assets/destinations';

export const OMRA_CHAABANE_ONLY_ROUTE = '/hajj-omra/chaabane';
export const OMRA_CHAABANE_ONLY_BACK_ROUTE = '/hajj-omra';

export const OMRA_CHAABANE_ONLY_IMAGES = {
  hero: umrahChaabaneHeroImg,
  makkah: makkahHaramImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const OMRA_CHAABANE_ONLY_META = {
  coverYearPrinted: '2026 / 1448',
  advertisedStartingPriceMad: 14900,
  printedDates: {
    departure: {
      fr: '21 Chaâbane · 13 février',
      ar: '21 شعبان · 13 فبراير',
      en: '21 Chaâbane · 13 February',
      es: '21 Chaâbane · 13 de febrero'
    },
    return: {
      fr: '4 Ramadan · 27 février',
      ar: '4 رمضان · 27 فبراير',
      en: '4 Ramadan · 27 February',
      es: '4 Ramadán · 27 de febrero'
    }
  }
} as const;

export type OmraChaabaneOnlyOptionId = 'option-1' | 'option-2' | 'option-3' | 'option-4';
export type OmraChaabaneOnlyRoomType = 'double' | 'triple' | 'quadruple' | 'quintuple';

export const OMRA_CHAABANE_ONLY_ROOM_ORDER: readonly OmraChaabaneOnlyRoomType[] = [
  'double',
  'triple',
  'quadruple',
  'quintuple'
] as const;

export interface OmraChaabaneOnlyOption {
  id: OmraChaabaneOnlyOptionId;
  code: Record<Language, string>;
  title: Record<Language, string>;
  madinahHotel: Record<Language, string>;
  madinahArabicName: string;
  makkahHotel: Record<Language, string>;
  makkahArabicName: string;
  makkahMealNote?: Record<Language, string>;
  pricesMad: Record<OmraChaabaneOnlyRoomType, number | null>;
}

export const OMRA_CHAABANE_ONLY_OPTIONS: readonly OmraChaabaneOnlyOption[] = [
  {
    id: 'option-1',
    code: {
      fr: 'Option 1',
      ar: 'الخيار 1',
      en: 'Option 1',
      es: 'Opción 1'
    },
    title: {
      fr: 'Al Mokhtara Al Aali (Médine) & Al Multazam (Makkah)',
      ar: 'المختارة العالي (المدينة) والملتزم (مكة)',
      en: 'Al Mokhtara Al Aali (Madinah) & Al Multazam (Makkah)',
      es: 'Al Mokhtara Al Aali (Medina) y Al Multazam (La Meca)'
    },
    madinahHotel: {
      fr: 'Al Mokhtara Al Aali (المختارة العالي)',
      ar: 'المختارة العالي',
      en: 'Al Mokhtara Al Aali (المختارة العالي)',
      es: 'Al Mokhtara Al Aali (المختارة العالي)'
    },
    madinahArabicName: 'المختارة العالي',
    makkahHotel: {
      fr: 'Al Multazam (الملتزم)',
      ar: 'الملتزم',
      en: 'Al Multazam (الملتزم)',
      es: 'Al Multazam (الملتزم)'
    },
    makkahArabicName: 'الملتزم',
    pricesMad: {
      double: 18000,
      triple: 17000,
      quadruple: 16500,
      quintuple: 14900
    }
  },
  {
    id: 'option-2',
    code: {
      fr: 'Option 2',
      ar: 'الخيار 2',
      en: 'Option 2',
      es: 'Opción 2'
    },
    title: {
      fr: 'Al Mokhtara Al Aali (Médine) & Al Multazam · Petit-déjeuner (Makkah)',
      ar: 'المختارة العالي (المدينة) والملتزم مع الإفطار (مكة)',
      en: 'Al Mokhtara Al Aali (Madinah) & Al Multazam with breakfast (Makkah)',
      es: 'Al Mokhtara Al Aali (Medina) y Al Multazam con desayuno (La Meca)'
    },
    madinahHotel: {
      fr: 'Al Mokhtara Al Aali (المختارة العالي)',
      ar: 'المختارة العالي',
      en: 'Al Mokhtara Al Aali (المختارة العالي)',
      es: 'Al Mokhtara Al Aali (المختارة العالي)'
    },
    madinahArabicName: 'المختارة العالي',
    makkahHotel: {
      fr: 'Al Multazam (الملتزم)',
      ar: 'الملتزم',
      en: 'Al Multazam (الملتزم)',
      es: 'Al Multazam (الملتزم)'
    },
    makkahArabicName: 'الملتزم',
    makkahMealNote: {
      fr: 'Avec petit-déjeuner',
      ar: 'مع الإفطار',
      en: 'With breakfast',
      es: 'Con desayuno'
    },
    pricesMad: {
      double: 19500,
      triple: 18500,
      quadruple: 18000,
      quintuple: 16500
    }
  },
  {
    id: 'option-3',
    code: {
      fr: 'Option 3',
      ar: 'الخيار 3',
      en: 'Option 3',
      es: 'Opción 3'
    },
    title: {
      fr: 'Shakri Palace (Médine) & Ammar Grand · Petit-déjeuner (Makkah)',
      ar: 'شكري بالاس (المدينة) وعمار جراند مع الإفطار (مكة)',
      en: 'Shakri Palace (Madinah) & Ammar Grand with breakfast (Makkah)',
      es: 'Shakri Palace (Medina) y Ammar Grand con desayuno (La Meca)'
    },
    madinahHotel: {
      fr: 'Shakri Palace (شكري بالاس)',
      ar: 'شكري بالاس',
      en: 'Shakri Palace (شكري بالاس)',
      es: 'Shakri Palace (شكري بالاس)'
    },
    madinahArabicName: 'شكري بالاس',
    makkahHotel: {
      fr: 'Ammar Grand (عمار جراند)',
      ar: 'عمار جراند',
      en: 'Ammar Grand (عمار جراند)',
      es: 'Ammar Grand (عمار جراند)'
    },
    makkahArabicName: 'عمار جراند',
    makkahMealNote: {
      fr: 'Avec petit-déjeuner',
      ar: 'مع الإفطار',
      en: 'With breakfast',
      es: 'Con desayuno'
    },
    pricesMad: {
      double: 23800,
      triple: 21800,
      quadruple: 20800,
      quintuple: null
    }
  },
  {
    id: 'option-4',
    code: {
      fr: 'Option 4',
      ar: 'الخيار 4',
      en: 'Option 4',
      es: 'Opción 4'
    },
    title: {
      fr: 'Massa Al Iman (Médine) & Al Naeem · Petit-déjeuner (Makkah)',
      ar: 'ماسة الإيمان (المدينة) والنعيم مع الإفطار (مكة)',
      en: 'Massa Al Iman (Madinah) & Al Naeem with breakfast (Makkah)',
      es: 'Massa Al Iman (Medina) y Al Naeem con desayuno (La Meca)'
    },
    madinahHotel: {
      fr: 'Massa Al Iman (ماسة الإيمان)',
      ar: 'ماسة الإيمان',
      en: 'Massa Al Iman (ماسة الإيمان)',
      es: 'Massa Al Iman (ماسة الإيمان)'
    },
    madinahArabicName: 'ماسة الإيمان',
    makkahHotel: {
      fr: 'Al Naeem (النعيم)',
      ar: 'النعيم',
      en: 'Al Naeem (النعيم)',
      es: 'Al Naeem (النعيم)'
    },
    makkahArabicName: 'النعيم',
    makkahMealNote: {
      fr: 'Avec petit-déjeuner',
      ar: 'مع الإفطار',
      en: 'With breakfast',
      es: 'Con desayuno'
    },
    pricesMad: {
      double: 28000,
      triple: 25000,
      quadruple: 23500,
      quintuple: null
    }
  }
] as const;

export interface OmraChaabaneOnlyLocaleCopy {
  cardBadge: string;
  title: string;
  arabicTitle: string;
  coverYearBadge: string;
  startingFromLabel: string;
  startingPriceDisplay: string;
  startingPriceBanner: string;
  startingPriceScopeNote: string;
  cardSummary: string;
  viewDetailsBtn: string;
  reserveBtn: string;

  backToUmrahLabel: string;
  backToHomeLabel: string;
  heroEyebrow: string;
  departureLabel: string;
  returnLabel: string;
  datesConfirmTag: string;

  dateConflictHeading: string;
  dateConflictExplanation: string;

  tableEyebrow: string;
  tableTitle: string;
  tableSubtitle: string;
  colOptionHotels: string;

  optionsEyebrow: string;
  optionsTitle: string;
  optionsSubtitle: string;
  madinahCityLabel: string;
  makkahCityLabel: string;
  roomLabels: Record<OmraChaabaneOnlyRoomType, { name: string; capacity: string }>;
  unavailableLabel: string;
  unavailableDetail: string;
  selectRoomBtn: string;
  selectedRoomBtn: string;

  inclusionsEyebrow: string;
  inclusionsTitle: string;
  inclusionsSubtitle: string;
  inclusions: { key: 'madinah' | 'makkah' | 'breakfast'; title: string; detail: string }[];
  unprintedTitle: string;
  unprintedItems: string[];

  conditionsEyebrow: string;
  conditionsTitle: string;
  conditionsList: { key: 'passport' | 'photo' | 'deposit'; title: string; detail: string }[];

  notesEyebrow: string;
  notesTitle: string;
  notesList: { key: 'baggage' | 'rawdah'; title: string; detail: string }[];

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

export const OMRA_CHAABANE_ONLY_COPY: Record<Language, OmraChaabaneOnlyLocaleCopy> = {
  fr: {
    cardBadge: 'Offre E · Omra Chaâbane 2026 / 1448',
    title: 'Omra Chaâbane',
    arabicTitle: 'عمرة شعبان',
    coverYearBadge: 'Brochure 2026 / 1448',
    startingFromLabel: 'À partir de',
    startingPriceDisplay: '14 900 MAD',
    startingPriceBanner: 'Omra Chaâbane — À partir de 14 900 MAD / personne',
    startingPriceScopeNote:
      'Tarif par personne applicable à la chambre Quintuple (Option 1 : Al Mokhtara Al Aali / Al Multazam).',
    cardSummary:
      'Programme officiel Omra Chaâbane (départ affiché 21 Chaâbane / 13 févr. — retour 4 Ramadan / 27 févr., sous réserve de confirmation d’année par l’agence), avec quatre options hôtelières à Médine et Makkah.',
    viewDetailsBtn: 'Voir les 4 options & tarifs',
    reserveBtn: 'Demander une réservation',

    backToUmrahLabel: 'Retour aux offres Hajj & Omra',
    backToHomeLabel: 'Retour à l’accueil',
    heroEyebrow: 'Offre Officielle Golden Group Travels · Omra Chaâbane',
    departureLabel: 'Départ affiché',
    returnLabel: 'Retour affiché',
    datesConfirmTag: 'Dates soumises à confirmation auprès de l’agence',

    dateConflictHeading: 'Écart relevé sur les années (2026 / 1448 H) — À confirmer auprès de l’agence',
    dateConflictExplanation:
      'La brochure indique un départ le « 21 Chaâbane, 13 février », un retour le « 4 Ramadan, 27 février » et une couverture « 2026 / 1448 ». Les calendriers grégorien (2026) et hégirien (1448) étant incohérents, aucune correction n’est inventée : les dates exactes restent soumises à confirmation auprès de l’agence.',

    tableEyebrow: 'Grille Tarifaire Officielle (MAD / personne)',
    tableTitle: 'Tableau comparatif des 4 options d’hébergement',
    tableSubtitle:
      'Cliquez sur un tarif du tableau ou choisissez une option ci-dessous. La chambre Quintuple est non disponible pour les Options 3 et 4.',
    colOptionHotels: 'Option & Hôtels',

    optionsEyebrow: 'Sélection Interactive (Options 1 à 4)',
    optionsTitle: 'Détails par option & choix de la chambre',
    optionsSubtitle:
      'Sélectionnez votre option hôtelière et votre type de chambre pour calculer votre récapitulatif et préparer votre demande WhatsApp.',
    madinahCityLabel: 'Médine',
    makkahCityLabel: 'Makkah',
    roomLabels: {
      double: { name: 'Chambre Double', capacity: '2 personnes' },
      triple: { name: 'Chambre Triple', capacity: '3 personnes' },
      quadruple: { name: 'Chambre Quadruple', capacity: '4 personnes' },
      quintuple: { name: 'Chambre Quintuple', capacity: '5 personnes' }
    },
    unavailableLabel: 'Non disponible',
    unavailableDetail: 'Non proposée dans cette option',
    selectRoomBtn: 'Choisir',
    selectedRoomBtn: 'Sélectionnée',

    inclusionsEyebrow: 'Prestations Officiellement Confirmées',
    inclusionsTitle: 'Le prix comprend',
    inclusionsSubtitle:
      'Éléments expressément indiqués sur la brochure Omra Chaâbane, par option choisie.',
    inclusions: [
      {
        key: 'madinah',
        title: 'Hébergement à Médine',
        detail:
          'Al Mokhtara Al Aali (Options 1 & 2), Shakri Palace (Option 3) ou Massa Al Iman (Option 4).'
      },
      {
        key: 'makkah',
        title: 'Hébergement à Makkah',
        detail:
          'Al Multazam (Options 1 & 2), Ammar Grand (Option 3) ou Al Naeem (Option 4).'
      },
      {
        key: 'breakfast',
        title: 'Petit-déjeuner à Makkah (Options 2, 3 et 4 uniquement)',
        detail:
          'Inclus à Makkah uniquement pour les Options 2, 3 et 4 (non mentionné pour l’Option 1).'
      }
    ],
    unprintedTitle: 'Éléments non imprimés sur la brochure · À confirmer auprès de l’agence',
    unprintedItems: [
      'Billets d’avion aller-retour : non précisés sur la brochure (à confirmer auprès de l’agence).',
      'Frais et formalités de visa Omra : non précisés sur la brochure (à confirmer).',
      'Transferts terrestres et visites guidées : non précisés sur la brochure (à confirmer).',
      'Petit-déjeuner à Médine et autres repas : non précisés sur la brochure (à confirmer).',
      'Année exacte de départ / retour (brochure 2026 / 1448 · 13 au 27 février) : à confirmer auprès de l’agence.'
    ],

    conditionsEyebrow: 'Conditions d’inscription',
    conditionsTitle: 'Documents requis & versement de l’avance',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passeport valide au moins 6 mois',
        detail: 'Le passeport du pèlerin doit avoir une validité minimale de six (6) mois.'
      },
      {
        key: 'photo',
        title: 'Photo d’identité sur fond blanc',
        detail: 'Une photo récente format passeport sur fond blanc est exigée.'
      },
      {
        key: 'deposit',
        title: 'Règlement de l’avance obligatoire',
        detail:
          'Le dépôt du passeport sans paiement de l’avance requise peut entraîner l’annulation de la réservation.'
      }
    ],

    notesEyebrow: 'Mentions importantes',
    notesTitle: 'Notes aux voyageurs',
    notesList: [
      {
        key: 'baggage',
        title: 'Excédent de bagages',
        detail: 'L’agence n’est pas responsable des excédents de bagages.'
      },
      {
        key: 'rawdah',
        title: 'Visite de la Rawdah',
        detail:
          'Les réservations pour la visite de la Rawdah dépendent des disponibilités (aucune garantie d’accès).'
      }
    ],

    inquiryEyebrow: 'Demande directe · Golden Group Travels Salé',
    inquiryTitle: 'Demander une réservation — Omra Chaâbane',
    inquirySubtitle:
      'Vérifiez votre option hôtelière, la catégorie de chambre et le nombre de pèlerins puis transmettez votre demande sur WhatsApp.',
    formOptionLabel: 'Option d’hébergement',
    formRoomLabel: 'Type de chambre',
    formTravelersLabel: 'Nombre de voyageurs',
    formNameLabel: 'Nom complet',
    formNamePlaceholder: 'Votre nom et prénom',
    formPhoneLabel: 'Téléphone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Précisions complémentaires',
    formNotesPlaceholder: 'Demande de confirmation des dates exactes ou précisions sur le séjour…',
    formSubmitBtn: 'Préparer ma demande WhatsApp',
    formNoAutoConfirm:
      'Aucune confirmation automatique ni disponibilité en direct ; votre demande est vérifiée directement par notre agence.',
    errNameRequired: 'Veuillez saisir votre nom complet.',
    errPhoneRequired: 'Veuillez indiquer votre numéro de téléphone ou WhatsApp.',

    quoteEyebrow: 'Tarif Sélectionné (MAD)',
    quoteTitle: 'Récapitulatif par personne',
    quotePerPersonLabel: 'Tarif officiel / personne',
    quoteGroupSubtotalLabel: 'Total estimé du groupe',
    quoteHotelsRecapLabel: 'Hôtels de l’option choisie',
    quoteDatesNotice:
      'Dates soumises à confirmation auprès de l’agence (brochure : 21 Chaâbane / 13 févr. — 4 Ramadan / 27 févr., 2026 / 1448).',

    readyTitle: 'Demande prête pour envoi WhatsApp',
    readySubtitle:
      'Appuyez ci-dessous pour envoyer votre sélection à Golden Group Travels Salé.',
    readyEditBtn: 'Modifier ma sélection',
    readyWhatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Conseiller Omra Chaâbane',
    advisorCallLabel: 'Appeler l’agence',
    advisorMapsLabel: 'Localiser sur Google Maps'
  },

  ar: {
    cardBadge: 'العرض هـ · عمرة شعبان 2026 / 1448',
    title: 'عمرة شعبان',
    arabicTitle: 'عمرة شعبان',
    coverYearBadge: 'النشرة 2026 / 1448',
    startingFromLabel: 'ابتداءً من',
    startingPriceDisplay: '14,900 درهم',
    startingPriceBanner: 'عمرة شعبان — ابتداءً من 14,900 درهم / للشخص',
    startingPriceScopeNote:
      'السعر للشخص الواحد في الغرفة الخماسية (الخيار 1: المختارة العالي / الملتزم).',
    cardSummary:
      'برنامج عمرة شعبان (الذهاب المعلن 21 شعبان / 13 فبراير — العودة 4 رمضان / 27 فبراير، مع تأكيد السنة لدى الوكالة)، بأربعة خيارات فندقية في المدينة ومكة.',
    viewDetailsBtn: 'عرض الخيارات الأربعة والأسعار',
    reserveBtn: 'طلب حجز',

    backToUmrahLabel: 'العودة إلى عروض الحج والعمرة',
    backToHomeLabel: 'العودة إلى الرئيسية',
    heroEyebrow: 'البرنامج الرسمي لدى Golden Group Travels · عمرة شعبان',
    departureLabel: 'الذهاب المعلن',
    returnLabel: 'العودة المعلنة',
    datesConfirmTag: 'التواريخ خاضعة لتأكيد الوكالة',

    dateConflictHeading: 'تعارض في السنة الميلادية والهجرية (2026 / 1448 هـ) — قيد تأكيد الوكالة',
    dateConflictExplanation:
      'تُظهر النشرة الذهاب يوم «21 شعبان، 13 فبراير» والعودة يوم «4 رمضان، 27 فبراير» وسنة الغلاف «2026 / 1448». نظراً لعدم تطابق التقويمين، لا نعدّل التواريخ وتبقى خاضعة لتأكيد الوكالة الرسمي.',

    tableEyebrow: 'جدول الأسعار الرسمي (درهم / للشخص)',
    tableTitle: 'مقارنة خيارات الإقامة الأربعة',
    tableSubtitle:
      'اضغط على أي سعر متاح لاختياره. الغرفة الخماسية غير متوفرة في الخيارين 3 و4.',
    colOptionHotels: 'الخيار والفنادق',

    optionsEyebrow: 'الاختيار التفاعلي (الخيارات 1 إلى 4)',
    optionsTitle: 'تفاصيل كل خيار واختيار الغرفة',
    optionsSubtitle: 'حدد خيار الفندق ونوع الغرفة لحساب التكلفة وإعداد رسالة الواتساب.',
    madinahCityLabel: 'المدينة المنورة',
    makkahCityLabel: 'مكة المكرمة',
    roomLabels: {
      double: { name: 'غرفة ثنائية', capacity: 'شخصان' },
      triple: { name: 'غرفة ثلاثية', capacity: '3 أشخاص' },
      quadruple: { name: 'غرفة رباعية', capacity: '4 أشخاص' },
      quintuple: { name: 'غرفة خماسية', capacity: '5 أشخاص' }
    },
    unavailableLabel: 'غير متوفرة',
    unavailableDetail: 'غير متاحة في هذا الخيار',
    selectRoomBtn: 'اختيار',
    selectedRoomBtn: 'محددة',

    inclusionsEyebrow: 'الخدمات المصرح بها رسمياً',
    inclusionsTitle: 'السعر الأساسي يشمل',
    inclusionsSubtitle:
      'العناصر المذكورة صراحةً في نشرة عمرة شعبان حسب الخيار الفندقي المحدد.',
    inclusions: [
      {
        key: 'madinah',
        title: 'الإقامة في المدينة المنورة',
        detail:
          'فندق المختارة العالي (الخياران 1 و2)، شكري بالاس (الخيار 3) أو ماسة الإيمان (الخيار 4).'
      },
      {
        key: 'makkah',
        title: 'الإقامة في مكة المكرمة',
        detail:
          'فندق الملتزم (الخياران 1 و2)، عمار جراند (الخيار 3) أو النعيم (الخيار 4).'
      },
      {
        key: 'breakfast',
        title: 'الإفطار في مكة المكرمة (الخيارات 2 و3 و4 فقط)',
        detail:
          'وجبة الإفطار مشمولة في مكة للخيارات 2 و3 و4 فقط، وغير مذكورة في الخيار 1.'
      }
    ],
    unprintedTitle: 'تفاصيل غير مطبوعة في النشرة · قيد التأكيد لدى الوكالة',
    unprintedItems: [
      'تذاكر الطيران ذهاباً وإياباً: غير مذكورة في النشرة (يرجى التأكيد مع الوكالة).',
      'رسوم وإجراءات تأشيرة العمرة: غير مذكورة في النشرة (يرجى التأكيد).',
      'التنقلات الداخلية والمزارات الدينية: غير مذكورة في النشرة (يرجى التأكيد).',
      'الإفطار في المدينة المنورة وباقي الوجبات: غير مذكورة في النشرة (يرجى التأكيد).',
      'السنة الدقيقة للذهاب والعودة (2026 / 1448 · 13 إلى 27 فبراير): خاضعة لتأكيد الوكالة.'
    ],

    conditionsEyebrow: 'شروط التسجيل',
    conditionsTitle: 'الوثائق المطلوبة وأداء التسبيق',
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
        title: 'أداء مبلغ التسبيق',
        detail: 'تسليم الجواز دون دفع التسبيق المطلوب قد يؤدي إلى إلغاء الحجز.'
      }
    ],

    notesEyebrow: 'ملاحظات هامة',
    notesTitle: 'تنبيهات للمعتمرين',
    notesList: [
      {
        key: 'baggage',
        title: 'الوزن الزائد للأمتعة',
        detail: 'الوكالة غير مسؤولة عن أي وزن زائد في الأمتعة.'
      },
      {
        key: 'rawdah',
        title: 'حجز زيارة الروضة الشريفة',
        detail: 'تعتمد حجوزات زيارة الروضة الشريفة على التوفر ولا يوجد ضمان مسبق.'
      }
    ],

    inquiryEyebrow: 'طلب مباشر · وكالة سلا',
    inquiryTitle: 'طلب حجز — عمرة شعبان',
    inquirySubtitle: 'اختر الفندق والغرفة وعدد المسافرين لإرسال طلبك عبر واتساب.',
    formOptionLabel: 'خيار الإقامة',
    formRoomLabel: 'نوع الغرفة',
    formTravelersLabel: 'عدد المسافرين',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'الاسم والنسب',
    formPhoneLabel: 'رقم الهاتف / واتساب',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'ملاحظات إضافية',
    formNotesPlaceholder: 'تأكيد التواريخ أو أي استفسار إضافي...',
    formSubmitBtn: 'تجهيز طلب الواتساب',
    formNoAutoConfirm: 'لا يتم تأكيد الحجز تلقائياً عبر الموقع؛ يتولى فريق الوكالة المراجعة مباشرة.',
    errNameRequired: 'يرجى إدخال الاسم الكامل.',
    errPhoneRequired: 'يرجى إدخال رقم الهاتف أو الواتساب.',

    quoteEyebrow: 'ملخص السعر (درهم)',
    quoteTitle: 'السعر للشخص',
    quotePerPersonLabel: 'السعر الرسمي / للشخص',
    quoteGroupSubtotalLabel: 'التقدير الإجمالي للمجموعة',
    quoteHotelsRecapLabel: 'فنادق الخيار المحدد',
    quoteDatesNotice:
      'التواريخ خاضعة لتأكيد الوكالة (21 شعبان / 13 فبراير — 4 رمضان / 27 فبراير · 2026 / 1448).',

    readyTitle: 'الطلب جاهز للإرسال عبر واتساب',
    readySubtitle: 'اضغط أدناه لإرسال اختيارك إلى فريق Golden Group Travels بسلا.',
    readyEditBtn: 'تعديل الاختيار',
    readyWhatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    advisorLabel: 'Golden Group Travels · سلا',
    advisorTitle: 'مستشار عمرة شعبان',
    advisorCallLabel: 'الاتصال بالوكالة',
    advisorMapsLabel: 'الموقع على خرائط Google'
  },

  en: {
    cardBadge: 'Offer E · Omra Chaâbane 2026 / 1448',
    title: 'Omra Chaâbane',
    arabicTitle: 'عمرة شعبان',
    coverYearBadge: 'Brochure 2026 / 1448',
    startingFromLabel: 'Starting from',
    startingPriceDisplay: '14,900 MAD',
    startingPriceBanner: 'Omra Chaâbane — From 14,900 MAD / person',
    startingPriceScopeNote:
      'Per-person rate for the Quintuple Room in Option 1 (Al Mokhtara Al Aali / Al Multazam).',
    cardSummary:
      'Official Omra Chaâbane package (printed departure 21 Chaâbane / 13 Feb, return 4 Ramadan / 27 Feb — subject to agency year confirmation) with four Makkah & Madinah hotel tiers.',
    viewDetailsBtn: 'View 4 options & prices',
    reserveBtn: 'Request booking',

    backToUmrahLabel: 'Back to Hajj & Omra offers',
    backToHomeLabel: 'Back to Home',
    heroEyebrow: 'Official Golden Group Travels Package · Omra Chaâbane',
    departureLabel: 'Printed departure',
    returnLabel: 'Printed return',
    datesConfirmTag: 'Dates subject to agency confirmation',

    dateConflictHeading: 'Gregorian / Hijri Year Discrepancy (2026 / 1448) — Subject to Confirmation',
    dateConflictExplanation:
      'The brochure prints departure "21 Chaâbane, 13 February", return "4 Ramadan, 27 February", and cover year "2026 / 1448". Because the Gregorian and Hijri years are inconsistent, no date correction is invented—all travel dates remain subject to agency confirmation.',

    tableEyebrow: 'Official Fare Matrix (MAD / person)',
    tableTitle: 'Comparison across all 4 accommodation options',
    tableSubtitle:
      'Click any available price cell or choose an option card below. Quintuple occupancy is unavailable in Options 3 and 4.',
    colOptionHotels: 'Option & Hotels',

    optionsEyebrow: 'Interactive Selection (Options 1 to 4)',
    optionsTitle: 'Option breakdown & room selection',
    optionsSubtitle:
      'Select an accommodation option and room occupancy to update the quote and prepare your WhatsApp inquiry.',
    madinahCityLabel: 'Madinah',
    makkahCityLabel: 'Makkah',
    roomLabels: {
      double: { name: 'Double Room', capacity: '2 travelers' },
      triple: { name: 'Triple Room', capacity: '3 travelers' },
      quadruple: { name: 'Quadruple Room', capacity: '4 travelers' },
      quintuple: { name: 'Quintuple Room', capacity: '5 travelers' }
    },
    unavailableLabel: 'Unavailable',
    unavailableDetail: 'Not offered in this accommodation option',
    selectRoomBtn: 'Select',
    selectedRoomBtn: 'Selected',

    inclusionsEyebrow: 'Brochure-Verified Inclusions',
    inclusionsTitle: 'The price includes',
    inclusionsSubtitle:
      'Elements explicitly printed on the Omra Chaâbane brochure according to the selected option.',
    inclusions: [
      {
        key: 'madinah',
        title: 'Madinah hotel accommodation',
        detail:
          'Al Mokhtara Al Aali (Options 1 & 2), Shakri Palace (Option 3), or Massa Al Iman (Option 4).'
      },
      {
        key: 'makkah',
        title: 'Makkah hotel accommodation',
        detail:
          'Al Multazam (Options 1 & 2), Ammar Grand (Option 3), or Al Naeem (Option 4).'
      },
      {
        key: 'breakfast',
        title: 'Breakfast in Makkah (Options 2, 3 & 4 only)',
        detail:
          'Breakfast in Makkah is expressly included only on Options 2, 3, and 4 (not listed on Option 1).'
      }
    ],
    unprintedTitle: 'Unprinted items · Subject to agency confirmation',
    unprintedItems: [
      'Round-trip flights: not stated on the brochure (confirm directly with the agency).',
      'Umrah visa handling/fees: not stated on the brochure (confirm with agency).',
      'Ground transfers and guided visits: not stated on the brochure (confirm with agency).',
      'Madinah breakfast and other meals: not stated on the brochure (confirm with agency).',
      'Exact departure/return year (2026 / 1448 vs 13–27 February): confirm directly with the agency.'
    ],

    conditionsEyebrow: 'Registration Conditions',
    conditionsTitle: 'Required documents & advance deposit rule',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passport valid for at least 6 months',
        detail: 'Pilgrim passports must remain valid for a minimum of six months.'
      },
      {
        key: 'photo',
        title: 'Photograph with a white background',
        detail: 'Official passport photograph on a plain white background.'
      },
      {
        key: 'deposit',
        title: 'Advance payment requirement',
        detail:
          'Submitting a passport without paying the required advance may result in cancellation of the reservation.'
      }
    ],

    notesEyebrow: 'Important Notes',
    notesTitle: 'Pilgrim advisories',
    notesList: [
      {
        key: 'baggage',
        title: 'Excess baggage disclaimer',
        detail: 'The agency is not responsible for excess baggage.'
      },
      {
        key: 'rawdah',
        title: 'Rawdah visit reservations',
        detail: 'Rawdah visit reservations depend on availability (not guaranteed).'
      }
    ],

    inquiryEyebrow: 'Direct Desk · Golden Group Travels Salé',
    inquiryTitle: 'Request a booking — Omra Chaâbane',
    inquirySubtitle:
      'Choose your preferred accommodation option, room type, and number of travelers to send a WhatsApp inquiry.',
    formOptionLabel: 'Accommodation option',
    formRoomLabel: 'Room type',
    formTravelersLabel: 'Travelers',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'Your full name',
    formPhoneLabel: 'Phone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Additional notes',
    formNotesPlaceholder: 'Requests for exact date confirmation or hotel details…',
    formSubmitBtn: 'Prepare WhatsApp inquiry',
    formNoAutoConfirm:
      'Reservations are not automatically confirmed and live availability or automatic payment is not claimed.',
    errNameRequired: 'Please enter your full name.',
    errPhoneRequired: 'Please enter your phone or WhatsApp number.',

    quoteEyebrow: 'Selected Rate (MAD)',
    quoteTitle: 'Verified per-person fare',
    quotePerPersonLabel: 'Official rate / person',
    quoteGroupSubtotalLabel: 'Estimated group subtotal',
    quoteHotelsRecapLabel: 'Selected option hotels',
    quoteDatesNotice:
      'Dates subject to agency confirmation (printed: 21 Chaâbane / 13 Feb — 4 Ramadan / 27 Feb, 2026 / 1448).',

    readyTitle: 'Inquiry ready for WhatsApp',
    readySubtitle: 'Click below to send your selection to Golden Group Travels in Salé.',
    readyEditBtn: 'Edit selection',
    readyWhatsappBtn: 'Send via WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Omra Chaâbane desk',
    advisorCallLabel: 'Call agency',
    advisorMapsLabel: 'Locate on Google Maps'
  },

  es: {
    cardBadge: 'Oferta E · Omra Chaâbane 2026 / 1448',
    title: 'Omra Chaâbane',
    arabicTitle: 'عمرة شعبان',
    coverYearBadge: 'Folleto 2026 / 1448',
    startingFromLabel: 'Desde',
    startingPriceDisplay: '14 900 MAD',
    startingPriceBanner: 'Omra Chaâbane — Desde 14 900 MAD / persona',
    startingPriceScopeNote:
      'Tarifa por persona correspondiente a habitación Quíntuple en Opción 1 (Al Mokhtara Al Aali / Al Multazam).',
    cardSummary:
      'Paquete oficial Omra Chaâbane (salida impresa 21 Chaâbane / 13 feb — regreso 4 Ramadán / 27 feb, sujeto a confirmación de la agencia), con cuatro opciones de hotel.',
    viewDetailsBtn: 'Ver las 4 opciones y precios',
    reserveBtn: 'Solicitar reserva',

    backToUmrahLabel: 'Volver a Hajj & Omra',
    backToHomeLabel: 'Volver al inicio',
    heroEyebrow: 'Oferta Oficial Golden Group Travels · Omra Chaâbane',
    departureLabel: 'Salida impresa',
    returnLabel: 'Regreso impreso',
    datesConfirmTag: 'Fechas sujetas a confirmación de la agencia',

    dateConflictHeading: 'Inconsistencia de año (2026 / 1448) — Sujeto a confirmación',
    dateConflictExplanation:
      'El folleto indica salida «21 Chaâbane, 13 de febrero», regreso «4 Ramadán, 27 de febrero» y año «2026 / 1448». Al ser inconsistentes, las fechas quedan sujetas a confirmación de la agencia sin inventar correcciones.',

    tableEyebrow: 'Tarifario Oficial (MAD / persona)',
    tableTitle: 'Tabla comparativa de las 4 opciones',
    tableSubtitle:
      'Haga clic en una tarifa disponible. La habitación quíntuple no está disponible en las Opciones 3 y 4.',
    colOptionHotels: 'Opción y Hoteles',

    optionsEyebrow: 'Selección Interactiva (Opciones 1 a 4)',
    optionsTitle: 'Detalle por opción y habitación',
    optionsSubtitle:
      'Elija una opción hotelera y un tipo de habitación para preparar su consulta por WhatsApp.',
    madinahCityLabel: 'Medina',
    makkahCityLabel: 'La Meca',
    roomLabels: {
      double: { name: 'Habitación Doble', capacity: '2 personas' },
      triple: { name: 'Habitación Triple', capacity: '3 personas' },
      quadruple: { name: 'Habitación Cuádruple', capacity: '4 personas' },
      quintuple: { name: 'Habitación Quíntuple', capacity: '5 personas' }
    },
    unavailableLabel: 'No disponible',
    unavailableDetail: 'No disponible en esta opción',
    selectRoomBtn: 'Elegir',
    selectedRoomBtn: 'Seleccionada',

    inclusionsEyebrow: 'Prestaciones Confirmadas en Folleto',
    inclusionsTitle: 'El precio incluye',
    inclusionsSubtitle:
      'Elementos impresos expresamente en el folleto Omra Chaâbane según la opción elegida.',
    inclusions: [
      {
        key: 'madinah',
        title: 'Alojamiento en Medina',
        detail:
          'Al Mokhtara Al Aali (Opciones 1 y 2), Shakri Palace (Opción 3) o Massa Al Iman (Opción 4).'
      },
      {
        key: 'makkah',
        title: 'Alojamiento en La Meca',
        detail:
          'Al Multazam (Opciones 1 y 2), Ammar Grand (Opción 3) o Al Naeem (Opción 4).'
      },
      {
        key: 'breakfast',
        title: 'Desayuno en La Meca (solo Opciones 2, 3 y 4)',
        detail:
          'El desayuno en La Meca figura incluido únicamente en las Opciones 2, 3 y 4 (no figura en la Opción 1).'
      }
    ],
    unprintedTitle: 'Detalles no impresos en el folleto · Por confirmar con la agencia',
    unprintedItems: [
      'Vuelos ida y vuelta: no detallados en el folleto (confirmar con la agencia).',
      'Visado de Umrah: no detallado en el folleto (confirmar con la agencia).',
      'Traslados y visitas guiadas: no detallados en el folleto (confirmar con la agencia).',
      'Desayuno en Medina u otras comidas: no detallados en el folleto (confirmar con la agencia).',
      'Año exacto de salida y regreso (2026 / 1448 · 13 al 27 de febrero): confirmar con la agencia.'
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
        title: 'Pago del anticipo',
        detail:
          'Entregar el pasaporte sin pagar el anticipo requerido puede conllevar la cancelación de la reserva.'
      }
    ],

    notesEyebrow: 'Avisos',
    notesTitle: 'Notas importantes',
    notesList: [
      {
        key: 'baggage',
        title: 'Exceso de equipaje',
        detail: 'La agencia no se hace responsable del exceso de equipaje.'
      },
      {
        key: 'rawdah',
        title: 'Visita a la Rawdah',
        detail: 'Las reservas para visitar la Rawdah dependen de la disponibilidad.'
      }
    ],

    inquiryEyebrow: 'Consulta directa · Salé',
    inquiryTitle: 'Solicitar reserva — Omra Chaâbane',
    inquirySubtitle:
      'Seleccione opción, habitación y número de viajeros para enviar su solicitud por WhatsApp.',
    formOptionLabel: 'Opción de alojamiento',
    formRoomLabel: 'Tipo de habitación',
    formTravelersLabel: 'Viajeros',
    formNameLabel: 'Nombre completo',
    formNamePlaceholder: 'Su nombre completo',
    formPhoneLabel: 'Teléfono / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Notas adicionales',
    formNotesPlaceholder: 'Solicitud de confirmación de fechas exactas…',
    formSubmitBtn: 'Preparar solicitud WhatsApp',
    formNoAutoConfirm: 'Sin confirmación automática en línea.',
    errNameRequired: 'Por favor ingrese su nombre.',
    errPhoneRequired: 'Por favor ingrese su teléfono.',

    quoteEyebrow: 'Resumen Tarifario (MAD)',
    quoteTitle: 'Tarifa por persona',
    quotePerPersonLabel: 'Tarifa oficial / persona',
    quoteGroupSubtotalLabel: 'Subtotal estimado grupo',
    quoteHotelsRecapLabel: 'Hoteles de la opción',
    quoteDatesNotice:
      'Fechas sujetas a confirmación de la agencia (21 Chaâbane / 13 feb — 4 Ramadán / 27 feb · 2026 / 1448).',

    readyTitle: 'Solicitud lista para WhatsApp',
    readySubtitle: 'Envíe su selección directamente a Golden Group Travels.',
    readyEditBtn: 'Modificar selección',
    readyWhatsappBtn: 'Enviar por WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Asistencia Omra Chaâbane',
    advisorCallLabel: 'Llamar a la agencia',
    advisorMapsLabel: 'Ver en Google Maps'
  }
};
