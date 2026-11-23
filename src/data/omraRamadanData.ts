import umrahRamadanHeroImg from '../assets/images/umrah_ramadan_2027_hero_1795459921953.jpg';
import madinahNabawiCourtyardImg from '../assets/images/madinah_nabawi_courtyard_1795459726098.jpg';
import { Language } from '../assets/destinations';

export const OMRA_RAMADAN_ROUTE = '/hajj-omra/ramadan-2027';
export const OMRA_RAMADAN_BACK_ROUTE = '/hajj-omra';

export const OMRA_RAMADAN_IMAGES = {
  hero: umrahRamadanHeroImg,
  madinah: madinahNabawiCourtyardImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const OMRA_RAMADAN_META = {
  hijriYear: '1448',
  gregorianCoverYear: '2027',
  advertisedStartingPriceMad: 26000,
  durationDisplay: {
    fr: '34 à 40 jours (annoncé sur la couverture)',
    ar: '34 إلى 40 يوماً (كما ورد في الغلاف)',
    en: '34 to 40 days (advertised on cover)',
    es: '34 a 40 días (anunciado en portada)'
  },
  datesDisplay: {
    fr: 'Dates exactes à confirmer auprès de l’agence',
    ar: 'التواريخ الدقيقة قيد التأكيد لدى الوكالة',
    en: 'Dates exactes à confirmer auprès de l’agence (Exact dates to confirm with agency)',
    es: 'Dates exactes à confirmer auprès de l’agence (Fechas exactas por confirmar)'
  }
} as const;

export type OmraRamadanOptionId = 'option-a' | 'option-b' | 'option-c';
export type OmraRamadanRoomType =
  | 'double'
  | 'triple'
  | 'quadruple'
  | 'quintuple'
  | 'sextuple';

export const OMRA_RAMADAN_ROOM_ORDER: readonly OmraRamadanRoomType[] = [
  'double',
  'triple',
  'quadruple',
  'quintuple',
  'sextuple'
] as const;

export type RoomPricingState =
  | { kind: 'priced'; amountMad: number }
  | { kind: 'needs_confirmation'; flagReason: Record<Language, string> }
  | { kind: 'not_offered' };

export interface OmraRamadanAccommodationOption {
  id: OmraRamadanOptionId;
  code: Record<Language, string>;
  title: Record<Language, string>;
  madinahHotel: Record<Language, string>;
  madinahMealNote: Record<Language, string>;
  makkahHotel: Record<Language, string>;
  makkahDistanceNote?: Record<Language, string>;
  rooms: Record<OmraRamadanRoomType, RoomPricingState>;
}

const SIX_PERSON_FLAG_REASON: Record<Language, string> = {
  fr: 'Écart source : la grille affiche « 126 000 » alors que la couverture annonce des tarifs à partir de 26 000 MAD. Tarif retenu en attente de confirmation officielle.',
  ar: 'تعارض في المصدر: يظهر في جدول الأسعار رقم «126,000» بينما يذكر الغلاف ابتداءً من 26,000 درهم. السعر موقوف لحين التأكيد الرسمي.',
  en: 'Source discrepancy: pricing sheet appears to read 126,000 while cover states starting at 26,000 MAD. Rate withheld pending confirmation.',
  es: 'Discrepancia en cartel: muestra 126 000 frente a portada desde 26 000 MAD. Tarifa retenida hasta confirmación oficial.'
};

export const OMRA_RAMADAN_OPTIONS: readonly OmraRamadanAccommodationOption[] = [
  {
    id: 'option-a',
    code: {
      fr: 'Option A',
      ar: 'الخيار أ',
      en: 'Option A',
      es: 'Opción A'
    },
    title: {
      fr: 'Groupe Al Mokhtara (Médine) & Marjan Al Shaer (Makkah)',
      ar: 'مجموعة المختارة (المدينة) ومرجان الشعائر (مكة)',
      en: 'Groupe Al Mokhtara (Madinah) & Marjan Al Shaer (Makkah)',
      es: 'Groupe Al Mokhtara (Medina) y Marjan Al Shaer (La Meca)'
    },
    madinahHotel: {
      fr: 'Groupe Al Mokhtara',
      ar: 'مجموعة المختارة (Groupe Al Mokhtara)',
      en: 'Groupe Al Mokhtara',
      es: 'Groupe Al Mokhtara'
    },
    madinahMealNote: {
      fr: 'Sans petit-déjeuner',
      ar: 'بدون إفطار',
      en: 'Without breakfast',
      es: 'Sin desayuno'
    },
    makkahHotel: {
      fr: 'Marjan Al Shaer',
      ar: 'مرجان الشعائر (Marjan Al Shaer)',
      en: 'Marjan Al Shaer',
      es: 'Marjan Al Shaer'
    },
    makkahDistanceNote: {
      fr: 'Environ 1 400 mètres du Haram',
      ar: 'حوالي 1,400 متر عن الحرم المكي',
      en: 'Approximately 1,400 meters from the Haram',
      es: 'Aproximadamente a 1 400 metros del Haram'
    },
    rooms: {
      double: { kind: 'priced', amountMad: 35000 },
      triple: { kind: 'priced', amountMad: 32500 },
      quadruple: { kind: 'priced', amountMad: 29000 },
      quintuple: { kind: 'priced', amountMad: 27000 },
      sextuple: { kind: 'needs_confirmation', flagReason: SIX_PERSON_FLAG_REASON }
    }
  },
  {
    id: 'option-b',
    code: {
      fr: 'Option B',
      ar: 'الخيار ب',
      en: 'Option B',
      es: 'Opción B'
    },
    title: {
      fr: 'Groupe Al Mokhtara (Médine) & Al Farabi (Makkah)',
      ar: 'مجموعة المختارة (المدينة) والفارابي (مكة)',
      en: 'Groupe Al Mokhtara (Madinah) & Al Farabi (Makkah)',
      es: 'Groupe Al Mokhtara (Medina) y Al Farabi (La Meca)'
    },
    madinahHotel: {
      fr: 'Groupe Al Mokhtara',
      ar: 'مجموعة المختارة (Groupe Al Mokhtara)',
      en: 'Groupe Al Mokhtara',
      es: 'Groupe Al Mokhtara'
    },
    madinahMealNote: {
      fr: 'Sans petit-déjeuner',
      ar: 'بدون إفطار',
      en: 'Without breakfast',
      es: 'Sin desayuno'
    },
    makkahHotel: {
      fr: 'Al Farabi',
      ar: 'الفارابي (Al Farabi)',
      en: 'Al Farabi',
      es: 'Al Farabi'
    },
    makkahDistanceNote: {
      fr: 'Environ 900 mètres du Haram',
      ar: 'حوالي 900 متر عن الحرم المكي',
      en: 'Approximately 900 meters from the Haram',
      es: 'Aproximadamente a 900 metros del Haram'
    },
    rooms: {
      double: { kind: 'priced', amountMad: 39000 },
      triple: { kind: 'priced', amountMad: 33500 },
      quadruple: { kind: 'priced', amountMad: 30500 },
      quintuple: { kind: 'priced', amountMad: 28500 },
      sextuple: { kind: 'not_offered' }
    }
  },
  {
    id: 'option-c',
    code: {
      fr: 'Option C',
      ar: 'الخيار ج',
      en: 'Option C',
      es: 'Opción C'
    },
    title: {
      fr: 'Groupe Al Mokhtara (Médine) & Al Massa Grand (Makkah)',
      ar: 'مجموعة المختارة (المدينة) والماسة جراند (مكة)',
      en: 'Groupe Al Mokhtara (Madinah) & Al Massa Grand (Makkah)',
      es: 'Groupe Al Mokhtara (Medina) y Al Massa Grand (La Meca)'
    },
    madinahHotel: {
      fr: 'Groupe Al Mokhtara',
      ar: 'مجموعة المختارة (Groupe Al Mokhtara)',
      en: 'Groupe Al Mokhtara',
      es: 'Groupe Al Mokhtara'
    },
    madinahMealNote: {
      fr: 'Sans petit-déjeuner',
      ar: 'بدون إفطار',
      en: 'Without breakfast',
      es: 'Sin desayuno'
    },
    makkahHotel: {
      fr: 'Al Massa Grand',
      ar: 'الماسة جراند (Al Massa Grand)',
      en: 'Al Massa Grand',
      es: 'Al Massa Grand'
    },
    rooms: {
      double: { kind: 'priced', amountMad: 65900 },
      triple: { kind: 'priced', amountMad: 51000 },
      quadruple: { kind: 'priced', amountMad: 43500 },
      quintuple: { kind: 'not_offered' },
      sextuple: { kind: 'not_offered' }
    }
  }
] as const;

export interface OmraRamadanLocaleCopy {
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
  durationBadgeLabel: string;
  datesBadgeLabel: string;

  discrepancyHeading: string;
  discrepancyBullets: string[];

  optionsEyebrow: string;
  optionsTitle: string;
  optionsSubtitle: string;
  madinahCityLabel: string;
  makkahCityLabel: string;
  roomLabels: Record<OmraRamadanRoomType, { name: string; capacity: string }>;
  rateToConfirmLabel: string;
  notOfferedLabel: string;
  notOfferedDetail: string;
  selectRoomBtn: string;
  selectedRoomBtn: string;

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
  quotePendingRoomTitle: string;
  quoteHotelsRecapLabel: string;

  readyTitle: string;
  readySubtitle: string;
  readyEditBtn: string;
  readyWhatsappBtn: string;
  advisorLabel: string;
  advisorTitle: string;
  advisorCallLabel: string;
  advisorMapsLabel: string;
}

export const OMRA_RAMADAN_COPY: Record<Language, OmraRamadanLocaleCopy> = {
  fr: {
    cardBadge: 'Offre D · Omra Ramadan 1448 / 2027',
    title: 'Omra Ramadan',
    arabicTitle: 'عمرة رمضان',
    coverYearBadge: '1448 / 2027',
    startingFromLabel: 'À partir de (annoncé)',
    startingPriceDisplay: '26 000 MAD',
    startingPriceBanner: 'Omra Ramadan — À partir de 26 000 MAD* (chambre 6 pers. à confirmer)',
    startingPriceScopeNote:
      'Tarif d’appel annoncé sur la couverture. Écart relevé sur la chambre 6 pers. Option A (« 126 000 ») — à confirmer auprès de l’agence.',
    cardSummary:
      'Programme dédié au mois sacré de Ramadan (durée annoncée de 34 à 40 jours), distinct de Omra Chaâbane & Ramadan, avec trois options d’hébergement à Médine et Makkah.',
    viewDetailsBtn: 'Voir le programme & tarifs',
    reserveBtn: 'Demander une réservation',

    backToUmrahLabel: 'Retour aux offres Hajj & Omra',
    backToHomeLabel: 'Retour à l’accueil',
    heroEyebrow: 'Programme Officiel Golden Group Travels · Hors Chaâbane & Ramadan',
    durationBadgeLabel: 'Durée annoncée : 34 à 40 jours',
    datesBadgeLabel: 'Dates exactes à confirmer auprès de l’agence',

    discrepancyHeading: 'Incohérences relevées sur les supports officiels — À confirmer',
    discrepancyBullets: [
      'Conflit de dates et de durée : la couverture indique « 2027 / 1448 » et « 34 à 40 jours », tandis que le visuel des tarifs mentionne « 26 janvier au 16 février 2026 » (intervalle incompatible tant avec 2027 qu’avec 34 à 40 jours). Aucune date n’est modifiée ni garantie : Dates exactes à confirmer auprès de l’agence.',
      'Chambre 6 personnes (Option A — Marjan Al Shaer) : la grille tarifaire affiche « 126 000 », alors que la couverture annonce des tarifs à partir de 26 000 MAD. Ce tarif spécifique affiche « Tarif à confirmer » jusqu’à clarification officielle.'
    ],

    optionsEyebrow: 'Trois Options d’Hébergement Distinctes (MAD / pers.)',
    optionsTitle: 'Comparer les options d’hébergement et types de chambres',
    optionsSubtitle:
      'Sélectionnez Option A, B ou C puis choisissez une occupation disponible. Aucun tarif n’est inventé pour les chambres non proposées.',
    madinahCityLabel: 'Médine',
    makkahCityLabel: 'Makkah',
    roomLabels: {
      double: { name: 'Chambre Double', capacity: '2 personnes' },
      triple: { name: 'Chambre Triple', capacity: '3 personnes' },
      quadruple: { name: 'Chambre Quadruple', capacity: '4 personnes' },
      quintuple: { name: 'Chambre Quintuple', capacity: '5 personnes' },
      sextuple: { name: 'Chambre 6 personnes', capacity: '6 personnes' }
    },
    rateToConfirmLabel: 'Tarif à confirmer',
    notOfferedLabel: 'Non proposée',
    notOfferedDetail: 'Non incluse dans cette option d’hébergement',
    selectRoomBtn: 'Choisir',
    selectedRoomBtn: 'Sélectionnée',

    conditionsEyebrow: 'Conditions d’inscription',
    conditionsTitle: 'Pièces requises & règles d’acompte',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passeport valide au moins 6 mois',
        detail: 'Le passeport du pèlerin doit être valable au minimum six (6) mois.'
      },
      {
        key: 'photo',
        title: 'Photo d’identité sur fond blanc',
        detail: 'Une photo format passeport sur fond blanc est exigée.'
      },
      {
        key: 'deposit',
        title: 'Versement de l’avance obligatoire',
        detail: 'Le dépôt du passeport sans paiement de l’avance requise peut entraîner l’annulation de la réservation.'
      }
    ],

    notesEyebrow: 'Mentions importantes',
    notesTitle: 'Notes aux pèlerins',
    notesList: [
      {
        key: 'baggage',
        title: 'Excédent de bagages',
        detail: 'L’agence n’est pas responsable des excédents de bagages.'
      },
      {
        key: 'rawdah',
        title: 'Visite de la Rawdah',
        detail: 'Les réservations pour la visite de la Rawdah sont soumises aux disponibilités (accès non garanti).'
      }
    ],

    inquiryEyebrow: 'Demande directe · Golden Group Travels Salé',
    inquiryTitle: 'Demander une réservation — Omra Ramadan',
    inquirySubtitle:
      'Choisissez votre option d’hébergement, la catégorie de chambre et le nombre de voyageurs pour transmettre votre demande sur WhatsApp.',
    formOptionLabel: 'Option d’hébergement',
    formRoomLabel: 'Type de chambre',
    formTravelersLabel: 'Nombre de voyageurs',
    formNameLabel: 'Nom complet',
    formNamePlaceholder: 'Votre nom et prénom',
    formPhoneLabel: 'Téléphone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Remarques complémentaires',
    formNotesPlaceholder: 'Demande de confirmation des dates exactes ou du tarif 6 pers...',
    formSubmitBtn: 'Préparer ma demande WhatsApp',
    formNoAutoConfirm:
      'Aucune confirmation automatique ni disponibilité en direct ; Golden Group Travels traite chaque demande manuellement.',
    errNameRequired: 'Veuillez saisir votre nom complet.',
    errPhoneRequired: 'Veuillez indiquer votre numéro de téléphone ou WhatsApp.',

    quoteEyebrow: 'Récapitulatif Tarifaire (MAD)',
    quoteTitle: 'Tarif vérifié par personne',
    quotePerPersonLabel: 'Tarif officiel / personne',
    quoteGroupSubtotalLabel: 'Sous-total estimé du groupe',
    quotePendingRoomTitle: 'Tarif à confirmer (Option A · 6 personnes)',
    quoteHotelsRecapLabel: 'Hôtels de l’option sélectionnée',

    readyTitle: 'Demande prête pour envoi WhatsApp',
    readySubtitle:
      'Cliquez ci-dessous pour envoyer les détails de votre sélection à notre agence à Salé (sans dates contradictoires).',
    readyEditBtn: 'Modifier ma sélection',
    readyWhatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Assistance Omra Ramadan',
    advisorCallLabel: 'Appeler l’agence',
    advisorMapsLabel: 'Localiser sur Google Maps'
  },

  ar: {
    cardBadge: 'العرض د · عمرة رمضان 1448 / 2027',
    title: 'عمرة رمضان',
    arabicTitle: 'عمرة رمضان',
    coverYearBadge: '1448 / 2027',
    startingFromLabel: 'ابتداءً من (المعلن)',
    startingPriceDisplay: '26,000 درهم',
    startingPriceBanner: 'عمرة رمضان — ابتداءً من 26,000 درهم* (غرفة 6 أشخاص قيد التأكيد)',
    startingPriceScopeNote:
      'السعر الابتدائي المعلن على الغلاف. يوجد تضارب في رقم غرفة 6 أشخاص في الخيار أ («126,000») — قيد التأكيد.',
    cardSummary:
      'برنامج مخصص لشهر رمضان المبارك (مدة معلنة من 34 إلى 40 يوماً)، مستقل عن عمرة شعبان ورمضان، مع ثلاثة خيارات فندقية في المدينة ومكة.',
    viewDetailsBtn: 'عرض التفاصيل والأسعار',
    reserveBtn: 'طلب حجز',

    backToUmrahLabel: 'العودة إلى عروض الحج والعمرة',
    backToHomeLabel: 'العودة إلى الرئيسية',
    heroEyebrow: 'البرنامج الرسمي لدى Golden Group Travels · مستقل عن شعبان ورمضان',
    durationBadgeLabel: 'المدة المعلنة: 34 إلى 40 يوماً',
    datesBadgeLabel: 'التواريخ الدقيقة قيد التأكيد لدى الوكالة',

    discrepancyHeading: 'تعارضات في الملصقات الأصلية — تتطلب تأكيد الوكالة',
    discrepancyBullets: [
      'تعارض التواريخ والمدة: الغلاف يعلن «2027 / 1448» ومدة «34 إلى 40 يوماً»، بينما يذكر ملصق الأسعار «26 يناير إلى 16 فبراير 2026». لا نعدل التواريخ ولا نعتمدها: التواريخ الدقيقة قيد التأكيد لدى الوكالة.',
      'غرفة 6 أشخاص (الخيار أ — مرجان الشعائر): يظهر الرقم «126,000» في الجدول مقابل «ابتداءً من 26,000 درهم» على الغلاف. تم تعليق عرض السعر وتصنيفه «Tarif à confirmer / قيد التأكيد» لحين توضيح الوكالة.'
    ],

    optionsEyebrow: 'ثلاثة خيارات إقامة منفصلة (درهم / للشخص)',
    optionsTitle: 'مقارنة خيارات الفنادق وأنواع الغرف',
    optionsSubtitle:
      'اختر الخيار أ أو ب أو ج ثم حدد نوع الغرفة المتاح دون افتراض أي أسعار للغرف غير المدرجة.',
    madinahCityLabel: 'المدينة المنورة',
    makkahCityLabel: 'مكة المكرمة',
    roomLabels: {
      double: { name: 'غرفة ثنائية', capacity: 'شخصان' },
      triple: { name: 'غرفة ثلاثية', capacity: '3 أشخاص' },
      quadruple: { name: 'غرفة رباعية', capacity: '4 أشخاص' },
      quintuple: { name: 'غرفة خماسية', capacity: '5 أشخاص' },
      sextuple: { name: 'غرفة سداسية (6 أشخاص)', capacity: '6 أشخاص' }
    },
    rateToConfirmLabel: 'السعر قيد التأكيد',
    notOfferedLabel: 'غير متوفرة',
    notOfferedDetail: 'غير مدرجة في هذا الخيار',
    selectRoomBtn: 'اختيار',
    selectedRoomBtn: 'محددة',

    conditionsEyebrow: 'شروط التسجيل',
    conditionsTitle: 'الوثائق المطلوبة والتسبيق',
    conditionsList: [
      {
        key: 'passport',
        title: 'جواز سفر صالح لمدة 6 أشهر على الأقل',
        detail: 'صلاحية جواز السفر لا تقل عن ستة (6) أشهر.'
      },
      {
        key: 'photo',
        title: 'صورة شمسية بخلفية بيضاء',
        detail: 'صورة مطابقة لمعايير جواز السفر بخلفية بيضاء.'
      },
      {
        key: 'deposit',
        title: 'أداء التسبيق المطلوب',
        detail: 'تقديم جواز السفر دون دفع مبلغ التسبيق المطلوب قد يؤدي إلى إلغاء الحجز.'
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
        detail: 'تخضع حجوزات زيارة الروضة الشريفة للتوفر دون ضمان مسبق.'
      }
    ],

    inquiryEyebrow: 'طلب مباشر · وكالة سلا',
    inquiryTitle: 'طلب حجز — عمرة رمضان',
    inquirySubtitle:
      'حدد خيار الإقامة ونوع الغرفة وعدد المسافرين لإعداد طلب الحجز عبر واتساب.',
    formOptionLabel: 'خيار الإقامة',
    formRoomLabel: 'نوع الغرفة',
    formTravelersLabel: 'عدد المسافرين',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'الاسم والنسب',
    formPhoneLabel: 'رقم الهاتف / واتساب',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'ملاحظات إضافية',
    formNotesPlaceholder: 'طلب تأكيد التواريخ الدقيقة أو تسعيرة 6 أشخاص...',
    formSubmitBtn: 'تجهيز طلب الواتساب',
    formNoAutoConfirm: 'لا يتم تأكيد أي حجز تلقائياً عبر الموقع؛ يتولى فريقنا المراجعة والتأكيد مباشرة.',
    errNameRequired: 'يرجى إدخال الاسم الكامل.',
    errPhoneRequired: 'يرجى إدخال رقم الهاتف أو الواتساب.',

    quoteEyebrow: 'ملخص السعر (درهم)',
    quoteTitle: 'السعر المؤكد للشخص',
    quotePerPersonLabel: 'السعر الرسمي / للشخص',
    quoteGroupSubtotalLabel: 'التقدير الإجمالي للمجموعة',
    quotePendingRoomTitle: 'السعر قيد التأكيد (الخيار أ · 6 أشخاص)',
    quoteHotelsRecapLabel: 'فنادق الخيار المحدد',

    readyTitle: 'الطلب جاهز للإرسال عبر واتساب',
    readySubtitle: 'اضغط أدناه لإرسال اختيارك إلى مستشاري الوكالة بسلا.',
    readyEditBtn: 'تعديل الاختيار',
    readyWhatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    advisorLabel: 'Golden Group Travels · سلا',
    advisorTitle: 'دعم عمرة رمضان',
    advisorCallLabel: 'الاتصال بالوكالة',
    advisorMapsLabel: 'الموقع على خرائط Google'
  },

  en: {
    cardBadge: 'Offer D · Omra Ramadan 1448 / 2027',
    title: 'Omra Ramadan',
    arabicTitle: 'عمرة رمضان',
    coverYearBadge: '1448 / 2027',
    startingFromLabel: 'Advertised from',
    startingPriceDisplay: '26,000 MAD',
    startingPriceBanner: 'Omra Ramadan — From 26,000 MAD* (6-person room pending confirmation)',
    startingPriceScopeNote:
      'Advertised cover starting rate. Source sheet shows 126,000 for Option A 6-person room — withheld pending agency confirmation.',
    cardSummary:
      'Dedicated Ramadan Umrah offer (34 to 40 days advertised duration), completely separate from Omra Chaâbane & Ramadan, with three distinct Makkah/Madinah options.',
    viewDetailsBtn: 'View details & prices',
    reserveBtn: 'Request booking',

    backToUmrahLabel: 'Back to Hajj & Omra offers',
    backToHomeLabel: 'Back to Home',
    heroEyebrow: 'Official Golden Group Travels Offer · Separate from Chaâbane & Ramadan',
    durationBadgeLabel: 'Advertised duration: 34 to 40 days',
    datesBadgeLabel: 'Dates exactes à confirmer auprès de l’agence',

    discrepancyHeading: 'Unresolved Poster Discrepancies — Requires Confirmation',
    discrepancyBullets: [
      'Date & Duration Conflict: Cover reads "2027 / 1448" and "34 to 40 days", whereas pricing sheet reads "January 26 to February 16, 2026". Rather than inventing dates, exact Gregorian dates are flagged as: Dates exactes à confirmer auprès de l’agence.',
      'Six-Person Room (Option A — Marjan Al Shaer): Pricing sheet appears to show 126,000 while cover states starting at 26,000 MAD. This specific room figure is withheld and displayed as "Tarif à confirmer".'
    ],

    optionsEyebrow: 'Three Separate Accommodation Options (MAD / pers.)',
    optionsTitle: 'Compare hotels, distances & verified room fares',
    optionsSubtitle:
      'Select Option A, B, or C and an available room category. Unavailable rooms are clearly marked and never assigned fabricated prices.',
    madinahCityLabel: 'Madinah',
    makkahCityLabel: 'Makkah',
    roomLabels: {
      double: { name: 'Double Room', capacity: '2 travelers' },
      triple: { name: 'Triple Room', capacity: '3 travelers' },
      quadruple: { name: 'Quadruple Room', capacity: '4 travelers' },
      quintuple: { name: 'Quintuple Room', capacity: '5 travelers' },
      sextuple: { name: 'Six-person room', capacity: '6 travelers' }
    },
    rateToConfirmLabel: 'Tarif à confirmer',
    notOfferedLabel: 'Not offered',
    notOfferedDetail: 'Not offered in this accommodation option',
    selectRoomBtn: 'Select',
    selectedRoomBtn: 'Selected',

    conditionsEyebrow: 'Registration Requirements',
    conditionsTitle: 'Documents & advance deposit policy',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passport valid for at least 6 months',
        detail: 'Passport must carry a minimum six-month validity.'
      },
      {
        key: 'photo',
        title: 'Passport photograph with white background',
        detail: 'Official passport photo on a plain white background.'
      },
      {
        key: 'deposit',
        title: 'Advance payment requirement',
        detail: 'Submitting a passport without paying the required advance may result in cancellation of the reservation.'
      }
    ],

    notesEyebrow: 'Important Notes',
    notesTitle: 'Pilgrim advisories',
    notesList: [
      {
        key: 'baggage',
        title: 'Excess baggage policy',
        detail: 'The agency is not responsible for excess baggage.'
      },
      {
        key: 'rawdah',
        title: 'Rawdah visit reservations',
        detail: 'Rawdah visit reservations are subject to availability (no guaranteed access is promised).'
      }
    ],

    inquiryEyebrow: 'Company-Managed Inquiry · Salé',
    inquiryTitle: 'Request a booking — Omra Ramadan',
    inquirySubtitle:
      'Choose an accommodation option, room type, and traveler count to prepare a direct WhatsApp inquiry.',
    formOptionLabel: 'Accommodation option',
    formRoomLabel: 'Room type',
    formTravelersLabel: 'Number of travelers',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'Your full name',
    formPhoneLabel: 'Phone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Additional notes',
    formNotesPlaceholder: 'Requests regarding exact travel dates or Option A 6-person rate confirmation…',
    formSubmitBtn: 'Prepare WhatsApp inquiry',
    formNoAutoConfirm:
      'Reservations are not automatically confirmed and live availability is not claimed online.',
    errNameRequired: 'Please enter your full name.',
    errPhoneRequired: 'Please enter your phone or WhatsApp number.',

    quoteEyebrow: 'Rate Breakdown (MAD)',
    quoteTitle: 'Verified per-person fare',
    quotePerPersonLabel: 'Official rate / person',
    quoteGroupSubtotalLabel: 'Estimated group subtotal',
    quotePendingRoomTitle: 'Tarif à confirmer (Option A · Six-person room)',
    quoteHotelsRecapLabel: 'Selected option hotels',

    readyTitle: 'Inquiry ready for WhatsApp',
    readySubtitle:
      'Send your selected package, hotel, and room details directly to Golden Group Travels (contradictory dates omitted).',
    readyEditBtn: 'Edit selection',
    readyWhatsappBtn: 'Send via WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Omra Ramadan desk',
    advisorCallLabel: 'Call agency',
    advisorMapsLabel: 'Locate on Google Maps'
  },

  es: {
    cardBadge: 'Oferta D · Omra Ramadan 1448 / 2027',
    title: 'Omra Ramadan',
    arabicTitle: 'عمرة رمضان',
    coverYearBadge: '1448 / 2027',
    startingFromLabel: 'Desde (anunciado)',
    startingPriceDisplay: '26 000 MAD',
    startingPriceBanner: 'Omra Ramadan — Desde 26 000 MAD* (hab. 6 pers. por confirmar)',
    startingPriceScopeNote:
      'Tarifa inicial anunciada. El cartel de precios indica 126 000 en Opción A (6 pers.) — pendiente de confirmación.',
    cardSummary:
      'Oferta de Ramadán (34 a 40 días anunciados), separada de Omra Chaâbane & Ramadan, con tres opciones de alojamiento.',
    viewDetailsBtn: 'Ver detalles y precios',
    reserveBtn: 'Solicitar reserva',

    backToUmrahLabel: 'Volver a Hajj & Omra',
    backToHomeLabel: 'Volver al inicio',
    heroEyebrow: 'Oferta Oficial Golden Group Travels · Independiente de Chaâbane & Ramadan',
    durationBadgeLabel: 'Duración anunciada: 34 a 40 días',
    datesBadgeLabel: 'Dates exactes à confirmer auprès de l’agence',

    discrepancyHeading: 'Discrepancias detectadas — Requiere confirmación',
    discrepancyBullets: [
      'Conflicto de fechas y duración: la portada indica «2027 / 1448» y «34 a 40 días», mientras el cartel tarifario indica «26 de enero al 16 de febrero de 2026». Por ello mostramos: Dates exactes à confirmer auprès de l’agence.',
      'Habitación de 6 personas (Opción A): el cartel muestra 126 000 frente a portada desde 26 000 MAD. Se retiene la cifra como «Tarif à confirmer».'
    ],

    optionsEyebrow: 'Tres Opciones de Alojamiento (MAD / pers.)',
    optionsTitle: 'Comparativa de hoteles y tipos de habitación',
    optionsSubtitle:
      'Seleccione Opción A, B o C y una habitación disponible sin inventar tarifas para opciones no ofertadas.',
    madinahCityLabel: 'Medina',
    makkahCityLabel: 'La Meca',
    roomLabels: {
      double: { name: 'Habitación Doble', capacity: '2 personas' },
      triple: { name: 'Habitación Triple', capacity: '3 personas' },
      quadruple: { name: 'Habitación Cuádruple', capacity: '4 personas' },
      quintuple: { name: 'Habitación Quíntuple', capacity: '5 personas' },
      sextuple: { name: 'Habitación 6 personas', capacity: '6 personas' }
    },
    rateToConfirmLabel: 'Tarif à confirmer',
    notOfferedLabel: 'No disponible',
    notOfferedDetail: 'No incluida en esta opción',
    selectRoomBtn: 'Elegir',
    selectedRoomBtn: 'Seleccionada',

    conditionsEyebrow: 'Requisitos',
    conditionsTitle: 'Condiciones de inscripción',
    conditionsList: [
      {
        key: 'passport',
        title: 'Pasaporte con validez mínima de 6 meses',
        detail: 'El pasaporte debe tener al menos seis meses de validez.'
      },
      {
        key: 'photo',
        title: 'Fotografía tipo pasaporte con fondo blanco',
        detail: 'Se requiere fotografía reciente sobre fondo blanco.'
      },
      {
        key: 'deposit',
        title: 'Pago del anticipo',
        detail: 'Entregar el pasaporte sin abonar el anticipo requerido puede ocasionar la cancelación de la reserva.'
      }
    ],

    notesEyebrow: 'Avisos',
    notesTitle: 'Notas importantes',
    notesList: [
      {
        key: 'baggage',
        title: 'Exceso de equipaje',
        detail: 'La agencia no es responsable del exceso de equipaje.'
      },
      {
        key: 'rawdah',
        title: 'Visita a la Rawdah',
        detail: 'Las reservas para visitar la Rawdah están sujetas a disponibilidad.'
      }
    ],

    inquiryEyebrow: 'Consulta directa · Salé',
    inquiryTitle: 'Solicitar reserva — Omra Ramadan',
    inquirySubtitle:
      'Seleccione opción de alojamiento, habitación y viajeros para enviar su consulta por WhatsApp.',
    formOptionLabel: 'Opción de alojamiento',
    formRoomLabel: 'Tipo de habitación',
    formTravelersLabel: 'Viajeros',
    formNameLabel: 'Nombre completo',
    formNamePlaceholder: 'Su nombre completo',
    formPhoneLabel: 'Teléfono / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Notas adicionales',
    formNotesPlaceholder: 'Consultas sobre fechas exactas o tarifa 6 pers...',
    formSubmitBtn: 'Preparar solicitud WhatsApp',
    formNoAutoConfirm: 'Sin confirmación automática en línea.',
    errNameRequired: 'Por favor ingrese su nombre.',
    errPhoneRequired: 'Por favor ingrese su teléfono.',

    quoteEyebrow: 'Resumen Tarifario (MAD)',
    quoteTitle: 'Tarifa por persona',
    quotePerPersonLabel: 'Tarifa oficial / persona',
    quoteGroupSubtotalLabel: 'Subtotal estimado grupo',
    quotePendingRoomTitle: 'Tarif à confirmer (Opción A · 6 personas)',
    quoteHotelsRecapLabel: 'Hoteles de la opción',

    readyTitle: 'Solicitud lista para WhatsApp',
    readySubtitle: 'Envíe su selección directamente a Golden Group Travels.',
    readyEditBtn: 'Modificar selección',
    readyWhatsappBtn: 'Enviar por WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Asistencia Omra Ramadan',
    advisorCallLabel: 'Llamar a la agencia',
    advisorMapsLabel: 'Ver en Google Maps'
  }
};
