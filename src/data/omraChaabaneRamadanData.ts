import umrahChaabaneHeroImg from '../assets/images/umrah_chaabane_ramadan_hero_1795459727214.jpg';
import madinahNabawiCourtyardImg from '../assets/images/madinah_nabawi_courtyard_1795459726098.jpg';
import { Language } from '../assets/destinations';

export const OMRA_CHAABANE_RAMADAN_ROUTE = '/hajj-omra/chaabane-ramadan';
export const OMRA_CHAABANE_RAMADAN_BACK_ROUTE = '/hajj-omra';

export const OMRA_CHAABANE_IMAGES = {
  hero: umrahChaabaneHeroImg,
  madinah: madinahNabawiCourtyardImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const OMRA_CHAABANE_META = {
  hijriYear: '1448',
  gregorianCoverYear: '2027',
  startingPriceMad: 18500, // Strictly Option A Quintuple room per person
  startingOptionId: 'option-a' as OmraChaabaneOptionId,
  startingRoomType: 'quintuple' as OmraChaabaneRoomType,
  nightsChaabane: 12,
  nightsRamadan: 9,
  totalNights: 21,
  conflictingSecondaryDatesDisplay: {
    fr: '26 janvier au 16 février 2026 (affiche secondaire) vs 2027 / 1448 (couverture) — Dates exactes à confirmer',
    ar: '26 يناير إلى 16 فبراير 2026 (ملصق ثانوي) مقابل 2027 / 1448 (الغلاف) — التواريخ تحتاج لتأكيد الوكالة',
    en: '26 January to 16 February 2026 (secondary poster) vs 2027 / 1448 (cover) — Travel dates require confirmation',
    es: '26 de enero al 16 de febrero de 2026 (cartel secundario) vs 2027 / 1448 (portada) — Fechas por confirmar'
  }
} as const;

export type OmraChaabaneOptionId = 'option-a' | 'option-b';
export type OmraChaabaneRoomType = 'double' | 'triple' | 'quadruple' | 'quintuple';

export const OMRA_CHAABANE_ROOM_ORDER: readonly OmraChaabaneRoomType[] = [
  'double',
  'triple',
  'quadruple',
  'quintuple'
] as const;

export interface OmraChaabaneAccommodationOption {
  id: OmraChaabaneOptionId;
  code: Record<Language, string>;
  title: Record<Language, string>;
  madinahHotel: Record<Language, string>;
  madinahBreakfastIncluded: boolean;
  madinahMealNote: Record<Language, string>;
  makkahHotel: Record<Language, string>;
  makkahBreakfastIncluded: boolean;
  makkahMealNote: Record<Language, string>;
  pricesMad: Record<OmraChaabaneRoomType, number | null>;
}

export const OMRA_CHAABANE_OPTIONS: readonly OmraChaabaneAccommodationOption[] = [
  {
    id: 'option-a',
    code: {
      fr: 'Option d’Hébergement A',
      ar: 'خيار الإقامة أ',
      en: 'Accommodation Option A',
      es: 'Opción de Alojamiento A'
    },
    title: {
      fr: 'Groupe Al Mokhtara (Médine) & Abraj Al Tayseer (Makkah)',
      ar: 'مجموعة المختارة (المدينة) وأبراج التيسير (مكة)',
      en: 'Groupe Al Mokhtara (Madinah) & Abraj Al Tayseer (Makkah)',
      es: 'Groupe Al Mokhtara (Medina) y Abraj Al Tayseer (La Meca)'
    },
    madinahHotel: {
      fr: 'Groupe Al Mokhtara',
      ar: 'فندق مجموعة المختارة (Groupe Al Mokhtara)',
      en: 'Groupe Al Mokhtara',
      es: 'Groupe Al Mokhtara'
    },
    madinahBreakfastIncluded: false,
    madinahMealNote: {
      fr: 'Sans petit-déjeuner',
      ar: 'بدون إفطار',
      en: 'Without breakfast',
      es: 'Sin desayuno'
    },
    makkahHotel: {
      fr: 'Abraj Al Tayseer',
      ar: 'أبراج التيسير (Abraj Al Tayseer)',
      en: 'Abraj Al Tayseer',
      es: 'Abraj Al Tayseer'
    },
    makkahBreakfastIncluded: true,
    makkahMealNote: {
      fr: 'Avec petit-déjeuner',
      ar: 'مع وجبة الإفطار',
      en: 'With breakfast',
      es: 'Con desayuno'
    },
    pricesMad: {
      double: 22500,
      triple: 20000,
      quadruple: 19000,
      quintuple: 18500
    }
  },
  {
    id: 'option-b',
    code: {
      fr: 'Option d’Hébergement B',
      ar: 'خيار الإقامة ب',
      en: 'Accommodation Option B',
      es: 'Opción de Alojamiento B'
    },
    title: {
      fr: 'Groupe Al Mokhtara (Médine) & Al Massa Grand (Makkah)',
      ar: 'مجموعة المختارة (المدينة) والماسة جراند (مكة)',
      en: 'Groupe Al Mokhtara (Madinah) & Al Massa Grand (Makkah)',
      es: 'Groupe Al Mokhtara (Medina) y Al Massa Grand (La Meca)'
    },
    madinahHotel: {
      fr: 'Groupe Al Mokhtara',
      ar: 'فندق مجموعة المختارة (Groupe Al Mokhtara)',
      en: 'Groupe Al Mokhtara',
      es: 'Groupe Al Mokhtara'
    },
    madinahBreakfastIncluded: true,
    madinahMealNote: {
      fr: 'Avec petit-déjeuner',
      ar: 'مع وجبة الإفطار',
      en: 'With breakfast',
      es: 'Con desayuno'
    },
    makkahHotel: {
      fr: 'Al Massa Grand',
      ar: 'الماسة جراند (Al Massa Grand)',
      en: 'Al Massa Grand',
      es: 'Al Massa Grand'
    },
    makkahBreakfastIncluded: true,
    makkahMealNote: {
      fr: 'Avec petit-déjeuner',
      ar: 'مع وجبة الإفطار',
      en: 'With breakfast',
      es: 'Con desayuno'
    },
    pricesMad: {
      double: 32000,
      triple: 26000,
      quadruple: 24000,
      quintuple: null // Strictly NOT offered in the supplied pricing table
    }
  }
] as const;

export interface OmraChaabaneLocaleCopy {
  cardBadge: string;
  title: string;
  arabicTitle: string;
  coverYearBadge: string;
  startingFromLabel: string;
  startingPriceDisplay: string;
  startingPriceBanner: string;
  startingPriceScopeNote: string;
  durationSummary: string;
  durationBreakdown: { label: string; value: string }[];
  dateConflictBadge: string;
  dateConflictHeading: string;
  dateConflictExplanation: string;
  cardSummary: string;
  viewDetailsBtn: string;
  reserveBtn: string;

  backToUmrahLabel: string;
  backToHomeLabel: string;
  heroEyebrow: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overviewText: string;

  optionsEyebrow: string;
  optionsTitle: string;
  optionsSubtitle: string;
  madinahCityLabel: string;
  makkahCityLabel: string;
  colRoomType: string;
  colPricePerPerson: string;
  colAction: string;
  roomLabels: Record<OmraChaabaneRoomType, { name: string; capacity: string }>;
  unavailableQuintupleLabel: string;
  unavailableQuintupleDetail: string;
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
  quoteHotelsRecapLabel: string;
  quoteDatesPendingTag: string;

  readyTitle: string;
  readySubtitle: string;
  readyEditBtn: string;
  readyWhatsappBtn: string;
  advisorLabel: string;
  advisorTitle: string;
  advisorCallLabel: string;
  advisorMapsLabel: string;
}

export const OMRA_CHAABANE_COPY: Record<Language, OmraChaabaneLocaleCopy> = {
  fr: {
    cardBadge: 'Offre C · Programme Séparé 2027 / 1448',
    title: 'Omra Chaâbane & Ramadan',
    arabicTitle: 'عمرة شعبان ورمضان',
    coverYearBadge: '2027 / 1448 H',
    startingFromLabel: 'À partir de',
    startingPriceDisplay: '18 500 MAD',
    startingPriceBanner: 'Omra Chaâbane & Ramadan — À partir de 18 500 MAD / personne',
    startingPriceScopeNote: 'Tarif d’appel exclusivement pour la chambre Quintuple (Option A)',
    durationSummary: '12 nuits en Chaâbane · 9 nuits en Ramadan · Total : 21 nuits',
    durationBreakdown: [
      { label: 'Chaâbane', value: '12 nuits' },
      { label: 'Ramadan', value: '9 nuits' },
      { label: 'Séjour total', value: '21 nuits' },
      { label: 'Année annoncée', value: '2027 / 1448 H' }
    ],
    dateConflictBadge: 'Dates grégoriennes à confirmer (2026 vs 2027)',
    dateConflictHeading: 'Anomalie de dates entre les supports — Confirmation requise',
    dateConflictExplanation:
      'La couverture annonce l’année 2027 / 1448 H, tandis que la seconde affiche indique « 26 janvier au 16 février 2026 ». Ces dates contradictoires ne sont pas affichées comme des dates de départ confirmées et nécessitent une validation officielle de Golden Group Travels.',
    cardSummary:
      'Programme spirituel combinant 12 nuits en Chaâbane et 9 nuits en Ramadan (21 nuits au total), avec deux formules d’hébergement distinctes à Médine et Makkah.',
    viewDetailsBtn: 'Voir le programme & tarifs',
    reserveBtn: 'Demander une réservation',

    backToUmrahLabel: 'Retour aux offres Hajj & Omra',
    backToHomeLabel: 'Retour à l’accueil',
    heroEyebrow: 'Programme Officiel Golden Group Travels · 2027 / 1448 H',
    overviewEyebrow: 'Durée & Présentation du Programme',
    overviewTitle: '21 nuits entre Chaâbane et Ramadan (2027 / 1448 H)',
    overviewText:
      'Offre distincte de Omra Rajab et Omra Istanbul. Choisissez ci-dessous entre l’Option A (à partir de 18 500 MAD en Quintuple) et l’Option B (sans Quintuple) selon le niveau hôtelier et la formule de petit-déjeuner souhaitée à Médine et à Makkah.',

    optionsEyebrow: 'Deux Formules d’Hébergement Séparées',
    optionsTitle: 'Sélectionnez votre option d’hébergement et type de chambre',
    optionsSubtitle:
      'Les tarifs sont strictement séparés entre l’Option A et l’Option B. La chambre Quintuple n’est pas proposée dans l’Option B.',
    madinahCityLabel: 'Médine (Al-Madinah)',
    makkahCityLabel: 'Makkah Al-Mukarramah',
    colRoomType: 'Type de chambre',
    colPricePerPerson: 'Tarif / personne (MAD)',
    colAction: 'Sélection',
    roomLabels: {
      double: { name: 'Chambre Double', capacity: '2 personnes' },
      triple: { name: 'Chambre Triple', capacity: '3 personnes' },
      quadruple: { name: 'Chambre Quadruple', capacity: '4 personnes' },
      quintuple: { name: 'Chambre Quintuple', capacity: '5 personnes' }
    },
    unavailableQuintupleLabel: 'Non proposée',
    unavailableQuintupleDetail: 'Non disponible sur la grille officielle de l’Option B',
    selectRoomBtn: 'Choisir',
    selectedRoomBtn: 'Sélectionnée',

    conditionsEyebrow: 'Pièces & Engagements',
    conditionsTitle: 'Conditions d’inscription officielles',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passeport valide au moins 6 mois',
        detail: 'Le passeport doit disposer d’une validité minimale de six (6) mois.'
      },
      {
        key: 'photo',
        title: 'Photo d’identité sur fond blanc',
        detail: 'Une photo d’identité récente (format passeport) sur fond blanc est exigée pour le dossier.'
      },
      {
        key: 'deposit',
        title: 'Versement obligatoire de l’acompte',
        detail: 'En cas de dépôt du passeport sans paiement de l’avance requise, la réservation peut être considérée comme annulée.'
      }
    ],

    notesEyebrow: 'Mentions Réglementaires',
    notesTitle: 'Notes importantes',
    notesList: [
      {
        key: 'baggage',
        title: 'Responsabilité bagages',
        detail: 'L’agence n’est pas responsable des excédents de bagages ou du poids supplémentaire.'
      },
      {
        key: 'rawdah',
        title: 'Visite de la Rawdah (Al-Rawdah Al-Sharifah)',
        detail: 'Les réservations pour la visite de la Rawdah sont soumises aux disponibilités officielles (aucune garantie systématique).'
      }
    ],

    inquiryEyebrow: 'Réservation Accompagnée · Salé',
    inquiryTitle: 'Demander une réservation — Omra Chaâbane & Ramadan',
    inquirySubtitle:
      'Sélectionnez votre option d’hébergement, la catégorie de chambre et le nombre de voyageurs pour transmettre votre demande via WhatsApp.',
    formOptionLabel: 'Option d’hébergement',
    formRoomLabel: 'Type de chambre disponible',
    formTravelersLabel: 'Nombre de voyageurs',
    formNameLabel: 'Nom complet',
    formNamePlaceholder: 'Votre nom et prénom',
    formPhoneLabel: 'Téléphone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Remarques complémentaires',
    formNotesPlaceholder: 'Demande de précision sur les dates exactes 2027 / 1448 ou besoins particuliers...',
    formSubmitBtn: 'Préparer ma demande WhatsApp',
    formNoAutoConfirm:
      'Aucune disponibilité ni réservation n’est confirmée automatiquement en ligne ; nos conseillers vérifient chaque dossier en direct.',
    errNameRequired: 'Veuillez saisir votre nom complet.',
    errPhoneRequired: 'Veuillez indiquer votre numéro de téléphone ou WhatsApp.',

    quoteEyebrow: 'Tarification Vérifiée',
    quoteTitle: 'Récapitulatif par personne',
    quotePerPersonLabel: 'Tarif officiel / personne',
    quoteGroupSubtotalLabel: 'Estimation pour le groupe',
    quoteHotelsRecapLabel: 'Hôtels & petits-déjeuners inclus',
    quoteDatesPendingTag: 'Dates grégoriennes exactes : à confirmer avec l’agence (affiche 2026 vs 2027/1448)',

    readyTitle: 'Demande prête à être envoyée',
    readySubtitle: 'Cliquez ci-dessous pour envoyer votre demande pré-remplie à Golden Group Travels sur WhatsApp.',
    readyEditBtn: 'Modifier ma sélection',
    readyWhatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Assistance Omra directe',
    advisorCallLabel: 'Appeler l’agence',
    advisorMapsLabel: 'Localiser sur Google Maps'
  },

  ar: {
    cardBadge: 'العرض ج · برنامج مستقل 2027 / 1448 هـ',
    title: 'عمرة شعبان ورمضان',
    arabicTitle: 'عمرة شعبان ورمضان',
    coverYearBadge: '2027 / 1448 هـ',
    startingFromLabel: 'ابتداءً من',
    startingPriceDisplay: '18,500 درهم',
    startingPriceBanner: 'عمرة شعبان ورمضان — ابتداءً من 18,500 درهم / للشخص',
    startingPriceScopeNote: 'السعر الابتدائي يخص حصرياً الغرفة الخماسية في خيار الإقامة أ',
    durationSummary: '12 ليلة في شعبان · 9 ليالٍ في رمضان · المجموع: 21 ليلة',
    durationBreakdown: [
      { label: 'شعبان', value: '12 ليلة' },
      { label: 'رمضان', value: '9 ليالٍ' },
      { label: 'المدة الإجمالية', value: '21 ليلة' },
      { label: 'السنة المعلنة', value: '2027 / 1448 هـ' }
    ],
    dateConflictBadge: 'التواريخ الميلادية قيد التأكيد (2026 مقابل 2027)',
    dateConflictHeading: 'تعارض في التواريخ بين الملصقات — يحتاج إلى تأكيد الوكالة',
    dateConflictExplanation:
      'يُظهر الغلاف سنة 2027 / 1448 هـ، بينما يظهر الملصق الثاني «26 يناير إلى 16 فبراير 2026». لا نعتمد هذه التواريخ المتعارضة كتواريخ سفر مؤكدة، وتحتاج إلى تأكيد رسمي من Golden Group Travels.',
    cardSummary:
      'برنامج عمرة يجمع بين 12 ليلة في شعبان و9 ليالٍ في رمضان (21 ليلة إجمالاً) مع خيارين مستقلين للفنادق والوجبات.',
    viewDetailsBtn: 'عرض التفاصيل والأسعار',
    reserveBtn: 'طلب حجز',

    backToUmrahLabel: 'العودة إلى عروض الحج والعمرة',
    backToHomeLabel: 'العودة إلى الرئيسية',
    heroEyebrow: 'البرنامج الرسمي لدى Golden Group Travels · 2027 / 1448 هـ',
    overviewEyebrow: 'المدة وتفاصيل البرنامج',
    overviewTitle: '21 ليلة في رحاب شعبان ورمضان (2027 / 1448 هـ)',
    overviewText:
      'عرض مستقل عن عمرة رجب وعمرة إسطنبول. اختر بين خيار الإقامة أ (يبدأ من 18,500 درهم في الخماسية) أو خيار الإقامة ب (لا تتوفر فيه الغرفة الخماسية) حسب الفندق ونظام الإفطار.',

    optionsEyebrow: 'خياران منفصلان للإقامة',
    optionsTitle: 'اختر باقة الإقامة ونوع الغرفة',
    optionsSubtitle:
      'الأسعار منفصلة تماماً بين الخيار أ والخيار ب. الغرفة الخماسية غير مدرجة في جدول أسعار الخيار ب.',
    madinahCityLabel: 'المدينة المنورة',
    makkahCityLabel: 'مكة المكرمة',
    colRoomType: 'نوع الغرفة',
    colPricePerPerson: 'السعر / للشخص (درهم)',
    colAction: 'الاختيار',
    roomLabels: {
      double: { name: 'غرفة ثنائية (Double)', capacity: 'شخصان' },
      triple: { name: 'غرفة ثلاثية (Triple)', capacity: '3 أشخاص' },
      quadruple: { name: 'غرفة رباعية (Quadruple)', capacity: '4 أشخاص' },
      quintuple: { name: 'غرفة خماسية (Quintuple)', capacity: '5 أشخاص' }
    },
    unavailableQuintupleLabel: 'غير متوفرة',
    unavailableQuintupleDetail: 'غير مدرجة في جدول أسعار خيار الإقامة ب',
    selectRoomBtn: 'اختيار',
    selectedRoomBtn: 'محددة',

    conditionsEyebrow: 'الوثائق والالتزامات',
    conditionsTitle: 'شروط التسجيل الرسمية',
    conditionsList: [
      {
        key: 'passport',
        title: 'جواز سفر صالح لمدة 6 أشهر على الأقل',
        detail: 'يجب أن يكون جواز السفر ساري المفعول لمدة لا تقل عن ستة (6) أشهر.'
      },
      {
        key: 'photo',
        title: 'صورة شمسية بخلفية بيضاء',
        detail: 'تقديم صورة شخصية مطابقة لمعايير جواز السفر بخلفية بيضاء.'
      },
      {
        key: 'deposit',
        title: 'دفع التسبيق لتأكيد الحجز',
        detail: 'في حال دفع جواز السفر دون أداء مبلغ التسبيق، يُعتبر الحجز لاغياً.'
      }
    ],

    notesEyebrow: 'ملاحظات هامة',
    notesTitle: 'تنبيهات للعملاء',
    notesList: [
      {
        key: 'baggage',
        title: 'مسؤولية الأمتعة الإضافية',
        detail: 'الوكالة غير مسؤولة عن الوزن الزائد أو الأمتعة الإضافية.'
      },
      {
        key: 'rawdah',
        title: 'حجز زيارة الروضة الشريفة',
        detail: 'تخضع حجوزات زيارة الروضة الشريفة للتوفر فقط دون ضمان مسبق.'
      }
    ],

    inquiryEyebrow: 'طلب الحجز · وكالة سلا',
    inquiryTitle: 'اطلب حجز عمرة شعبان ورمضان',
    inquirySubtitle:
      'حدد خيار الإقامة ونوع الغرفة المتاح وعدد المسافرين لإعداد رسالتك مباشرة عبر واتساب.',
    formOptionLabel: 'خيار الإقامة',
    formRoomLabel: 'نوع الغرفة المتاح',
    formTravelersLabel: 'عدد المسافرين',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'الاسم والنسب',
    formPhoneLabel: 'رقم الهاتف / واتساب',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'ملاحظات إضافية',
    formNotesPlaceholder: 'استفسار حول التواريخ الدقيقة 2027 / 1448 هـ أو ملاحظات أخرى...',
    formSubmitBtn: 'تجهيز طلب الواتساب',
    formNoAutoConfirm: 'لا يتم تأكيد الحجز أو التوفر آلياً؛ يتولى فريقنا التأكد من كل طلب مباشرة.',
    errNameRequired: 'يرجى إدخال الاسم الكامل.',
    errPhoneRequired: 'يرجى إدخال رقم الهاتف أو الواتساب.',

    quoteEyebrow: 'ملخص السعر المعتمد',
    quoteTitle: 'التسعيرة للشخص الواحد',
    quotePerPersonLabel: 'السعر الرسمي / للشخص',
    quoteGroupSubtotalLabel: 'التقدير للمجموعة',
    quoteHotelsRecapLabel: 'الفنادق ونظام الإفطار',
    quoteDatesPendingTag: 'التواريخ الميلادية الدقيقة: قيد التأكيد لدى الوكالة (2026 مقابل 2027/1448)',

    readyTitle: 'الطلب جاهز للإرسال',
    readySubtitle: 'اضغط على زر واتساب لإرسال تفاصيل اختيارك إلى مستشاري Golden Group Travels.',
    readyEditBtn: 'تعديل الاختيار',
    readyWhatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    advisorLabel: 'وكالة Golden Group Travels · سلا',
    advisorTitle: 'دعم واستفسار مباشر',
    advisorCallLabel: 'الاتصال بالوكالة',
    advisorMapsLabel: 'الموقع على خرائط Google'
  },

  en: {
    cardBadge: 'Offer C · Separate Program 2027 / 1448 AH',
    title: 'Omra Chaâbane & Ramadan',
    arabicTitle: 'عمرة شعبان ورمضان',
    coverYearBadge: '2027 / 1448 AH',
    startingFromLabel: 'Starting from',
    startingPriceDisplay: '18,500 MAD',
    startingPriceBanner: 'Omra Chaâbane & Ramadan — From 18,500 MAD / person',
    startingPriceScopeNote: 'Starting rate corresponds strictly to Option A Quintuple room',
    durationSummary: '12 nights in Chaâbane · 9 nights in Ramadan · Total: 21 nights',
    durationBreakdown: [
      { label: 'Chaâbane', value: '12 nights' },
      { label: 'Ramadan', value: '9 nights' },
      { label: 'Total stay', value: '21 nights' },
      { label: 'Cover year', value: '2027 / 1448 AH' }
    ],
    dateConflictBadge: 'Gregorian dates need confirmation (2026 vs 2027)',
    dateConflictHeading: 'Date Conflict Flagged — Agency Confirmation Required',
    dateConflictExplanation:
      'The package cover identifies 2027 / 1448 AH, whereas the second screenshot shows "26 January to 16 February 2026". Because these details conflict, the 2026 dates are not presented as verified departure dates until confirmed by Golden Group Travels.',
    cardSummary:
      'Dedicated 21-night Umrah program (12 nights in Chaâbane + 9 nights in Ramadan) with two distinct hotel and meal packages.',
    viewDetailsBtn: 'View details & prices',
    reserveBtn: 'Request booking',

    backToUmrahLabel: 'Back to Hajj & Omra offers',
    backToHomeLabel: 'Back to Home',
    heroEyebrow: 'Official Golden Group Travels Offer · 2027 / 1448 AH',
    overviewEyebrow: 'Duration & Overview',
    overviewTitle: '21-night Chaâbane & Ramadan pilgrimage (2027 / 1448 AH)',
    overviewText:
      'This offer is completely separate from Omra Rajab and Omra Istanbul. Compare Accommodation Option A (from 18,500 MAD Quintuple) and Option B (no Quintuple tier) with exact Madinah/Makkah hotel and breakfast conditions.',

    optionsEyebrow: 'Two Separate Accommodation Options',
    optionsTitle: 'Choose accommodation package & room type',
    optionsSubtitle:
      'Rates are never mixed between Option A and Option B. Quintuple occupancy is not offered under Option B.',
    madinahCityLabel: 'Madinah',
    makkahCityLabel: 'Makkah',
    colRoomType: 'Room type',
    colPricePerPerson: 'Price / person (MAD)',
    colAction: 'Select',
    roomLabels: {
      double: { name: 'Double Room', capacity: '2 travelers' },
      triple: { name: 'Triple Room', capacity: '3 travelers' },
      quadruple: { name: 'Quadruple Room', capacity: '4 travelers' },
      quintuple: { name: 'Quintuple Room', capacity: '5 travelers' }
    },
    unavailableQuintupleLabel: 'Not offered',
    unavailableQuintupleDetail: 'Not offered in Option B pricing table',
    selectRoomBtn: 'Select',
    selectedRoomBtn: 'Selected',

    conditionsEyebrow: 'Requirements',
    conditionsTitle: 'Official registration conditions',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passport valid for at least 6 months',
        detail: 'Your passport must remain valid for a minimum of six months.'
      },
      {
        key: 'photo',
        title: 'Passport photograph with white background',
        detail: 'Recent official passport photo on a plain white background.'
      },
      {
        key: 'deposit',
        title: 'Advance payment condition',
        detail: 'If the passport is submitted without payment of the required advance amount, the reservation may be considered canceled.'
      }
    ],

    notesEyebrow: 'Advisory',
    notesTitle: 'Important notes',
    notesList: [
      {
        key: 'baggage',
        title: 'Excess baggage policy',
        detail: 'The agency is not responsible for excess baggage or additional weight.'
      },
      {
        key: 'rawdah',
        title: 'Rawdah visit reservations',
        detail: 'Rawdah visit reservations are subject to availability (no guaranteed permit is promised).'
      }
    ],

    inquiryEyebrow: 'Company-Managed Inquiry · Salé',
    inquiryTitle: 'Request a booking — Omra Chaâbane & Ramadan',
    inquirySubtitle:
      'Select Option A or B, an available room category, and traveler count to prepare a direct WhatsApp inquiry.',
    formOptionLabel: 'Accommodation option',
    formRoomLabel: 'Available room type',
    formTravelersLabel: 'Number of travelers',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'Your full name',
    formPhoneLabel: 'Phone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Additional notes',
    formNotesPlaceholder: 'Questions on exact 2027 / 1448 Gregorian dates or special requests…',
    formSubmitBtn: 'Prepare WhatsApp inquiry',
    formNoAutoConfirm:
      'Live availability is not invented and bookings are never confirmed automatically online; Golden Group Travels verifies every inquiry.',
    errNameRequired: 'Please enter your full name.',
    errPhoneRequired: 'Please enter your phone or WhatsApp number.',

    quoteEyebrow: 'Verified Rate',
    quoteTitle: 'Selected fare breakdown',
    quotePerPersonLabel: 'Official rate / person',
    quoteGroupSubtotalLabel: 'Estimated group subtotal',
    quoteHotelsRecapLabel: 'Hotels & breakfast scope',
    quoteDatesPendingTag: 'Exact Gregorian departure dates require agency confirmation (2026 vs 2027/1448)',

    readyTitle: 'Inquiry ready for WhatsApp',
    readySubtitle: 'Click below to send your prefilled Umrah inquiry directly to Golden Group Travels.',
    readyEditBtn: 'Edit selection',
    readyWhatsappBtn: 'Send via WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Direct Umrah desk',
    advisorCallLabel: 'Call agency',
    advisorMapsLabel: 'Locate on Google Maps'
  },

  es: {
    cardBadge: 'Oferta C · Programa Separado 2027 / 1448 H',
    title: 'Omra Chaâbane & Ramadan',
    arabicTitle: 'عمرة شعبان ورمضان',
    coverYearBadge: '2027 / 1448 H',
    startingFromLabel: 'Desde',
    startingPriceDisplay: '18 500 MAD',
    startingPriceBanner: 'Omra Chaâbane & Ramadan — Desde 18 500 MAD / persona',
    startingPriceScopeNote: 'Tarifa inicial específica para habitación Quíntuple en Opción A',
    durationSummary: '12 noches en Chaâbane · 9 noches en Ramadan · Total: 21 noches',
    durationBreakdown: [
      { label: 'Chaâbane', value: '12 noches' },
      { label: 'Ramadán', value: '9 noches' },
      { label: 'Estancia total', value: '21 noches' },
      { label: 'Año portada', value: '2027 / 1448 H' }
    ],
    dateConflictBadge: 'Fechas gregorianas por confirmar (2026 vs 2027)',
    dateConflictHeading: 'Conflicto de fechas detectado — Requiere confirmación',
    dateConflictExplanation:
      'La portada indica el año 2027 / 1448 H, mientras el segundo cartel muestra «26 de enero al 16 de febrero de 2026». Por ello, dichas fechas no se muestran como confirmadas hasta validación de Golden Group Travels.',
    cardSummary:
      'Programa de 21 noches (12 en Chaâbane y 9 en Ramadán) con dos opciones separadas de alojamiento.',
    viewDetailsBtn: 'Ver detalles y precios',
    reserveBtn: 'Solicitar reserva',

    backToUmrahLabel: 'Volver a Hajj & Omra',
    backToHomeLabel: 'Volver al inicio',
    heroEyebrow: 'Oferta Oficial Golden Group Travels · 2027 / 1448 H',
    overviewEyebrow: 'Duración y Resumen',
    overviewTitle: '21 noches entre Chaâbane y Ramadán (2027 / 1448 H)',
    overviewText:
      'Programa independiente de Omra Rajab y Omra Istanbul. Compare las Opciones A y B con sus hoteles y regímenes exactos en Medina y La Meca.',

    optionsEyebrow: 'Dos Opciones de Alojamiento Separadas',
    optionsTitle: 'Seleccione opción y tipo de habitación',
    optionsSubtitle:
      'Nunca mezclamos precios entre la Opción A y la B. La habitación Quíntuple no se ofrece en la Opción B.',
    madinahCityLabel: 'Medina',
    makkahCityLabel: 'La Meca',
    colRoomType: 'Habitación',
    colPricePerPerson: 'Precio / persona (MAD)',
    colAction: 'Selección',
    roomLabels: {
      double: { name: 'Habitación Doble', capacity: '2 personas' },
      triple: { name: 'Habitación Triple', capacity: '3 personas' },
      quadruple: { name: 'Habitación Cuádruple', capacity: '4 personas' },
      quintuple: { name: 'Habitación Quíntuple', capacity: '5 personas' }
    },
    unavailableQuintupleLabel: 'No disponible',
    unavailableQuintupleDetail: 'No incluida en la tabla de la Opción B',
    selectRoomBtn: 'Elegir',
    selectedRoomBtn: 'Seleccionada',

    conditionsEyebrow: 'Requisitos',
    conditionsTitle: 'Condiciones oficiales de inscripción',
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
        title: 'Pago del anticipo obligatorio',
        detail: 'Si se entrega el pasaporte sin abonar el anticipo, la reserva podrá considerarse cancelada.'
      }
    ],

    notesEyebrow: 'Avisos',
    notesTitle: 'Notas importantes',
    notesList: [
      {
        key: 'baggage',
        title: 'Exceso de equipaje',
        detail: 'La agencia no es responsable del exceso de equipaje o peso adicional.'
      },
      {
        key: 'rawdah',
        title: 'Visita a la Rawdah',
        detail: 'Las reservas para visitar la Rawdah están sujetas a disponibilidad.'
      }
    ],

    inquiryEyebrow: 'Consulta directa · Salé',
    inquiryTitle: 'Solicitar reserva — Omra Chaâbane & Ramadan',
    inquirySubtitle:
      'Elija Opción A o B, habitación disponible y número de viajeros para enviar su consulta por WhatsApp.',
    formOptionLabel: 'Opción de alojamiento',
    formRoomLabel: 'Habitación disponible',
    formTravelersLabel: 'Viajeros',
    formNameLabel: 'Nombre completo',
    formNamePlaceholder: 'Su nombre completo',
    formPhoneLabel: 'Teléfono / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Notas adicionales',
    formNotesPlaceholder: 'Consultas sobre fechas exactas 2027 / 1448…',
    formSubmitBtn: 'Preparar solicitud WhatsApp',
    formNoAutoConfirm: 'Sin confirmación automática en línea; verificamos cada solicitud manualmente.',
    errNameRequired: 'Por favor ingrese su nombre.',
    errPhoneRequired: 'Por favor ingrese su teléfono.',

    quoteEyebrow: 'Tarifa Verificada',
    quoteTitle: 'Resumen por persona',
    quotePerPersonLabel: 'Tarifa oficial / persona',
    quoteGroupSubtotalLabel: 'Subtotal estimado grupo',
    quoteHotelsRecapLabel: 'Hoteles y desayunos',
    quoteDatesPendingTag: 'Fechas gregorianas pendientes de confirmación (2026 vs 2027/1448)',

    readyTitle: 'Solicitud lista para WhatsApp',
    readySubtitle: 'Envíe su selección directamente a Golden Group Travels.',
    readyEditBtn: 'Modificar selección',
    readyWhatsappBtn: 'Enviar por WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Asistencia directa',
    advisorCallLabel: 'Llamar a la agencia',
    advisorMapsLabel: 'Ver en Google Maps'
  }
};
