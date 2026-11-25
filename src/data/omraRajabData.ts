import { Language, makkahHaramImg } from '../assets/destinations';

export const OMRA_RAJAB_ROUTE = '/hajj-omra/rajab';
export const OMRA_RAJAB_BACK_ROUTE = '/hajj-omra';

export const OMRA_RAJAB_IMAGES = {
  hero: makkahHaramImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const OMRA_RAJAB_META = {
  coverYearPrinted: '2026 / 1448',
  startingPriceMad: 14500,
  nightsMadinah: 4,
  nightsMakkah: 10,
  totalNights: 14
} as const;

export type OmraRajabOptionId = 'option-standard';
export type OmraRajabRoomType = 'double' | 'triple' | 'quadruple' | 'quintuple';

export const OMRA_RAJAB_ROOM_ORDER: readonly OmraRajabRoomType[] = [
  'double',
  'triple',
  'quadruple',
  'quintuple'
] as const;

export interface OmraRajabOption {
  id: OmraRajabOptionId;
  code: Record<Language, string>;
  title: Record<Language, string>;
  madinahHotel: Record<Language, string>;
  makkahHotel: Record<Language, string>;
  pricesMad: Record<OmraRajabRoomType, number | null>;
}

export const OMRA_RAJAB_OPTIONS: readonly OmraRajabOption[] = [
  {
    id: 'option-standard',
    code: {
      fr: 'Programme Omra Rajab',
      ar: 'برنامج عمرة رجب',
      en: 'Omra Rajab Program',
      es: 'Programa Omra Rajab'
    },
    title: {
      fr: 'Médine (4 nuits) & Makkah (10 nuits) · Hôtels à confirmer',
      ar: 'المدينة المنورة (4 ليالٍ) ومكة المكرمة (10 ليالٍ) · الفنادق قيد التأكيد',
      en: 'Madinah (4 nights) & Makkah (10 nights) · Hotels pending confirmation',
      es: 'Medina (4 noches) y La Meca (10 noches) · Hoteles por confirmar'
    },
    madinahHotel: {
      fr: 'Hôtel à Médine — 4 nuits (nom exact à confirmer avec l’agence)',
      ar: 'فندق بالمدينة المنورة — 4 ليالٍ (الاسم الدقيق قيد التأكيد لدى الوكالة)',
      en: 'Madinah hotel — 4 nights (exact name pending agency confirmation)',
      es: 'Hotel en Medina — 4 noches (nombre exacto por confirmar)'
    },
    makkahHotel: {
      fr: 'Hôtel à Makkah — 10 nuits (nom exact à confirmer avec l’agence)',
      ar: 'فندق بمكة المكرمة — 10 ليالٍ (الاسم الدقيق قيد التأكيد لدى الوكالة)',
      en: 'Makkah hotel — 10 nights (exact name pending agency confirmation)',
      es: 'Hotel en La Meca — 10 noches (nombre exacto por confirmar)'
    },
    pricesMad: {
      double: null,
      triple: null,
      quadruple: null,
      quintuple: null
    }
  }
] as const;

export interface OmraRajabInclusionItem {
  key: 'ziyarat' | 'accommodation' | 'transport' | 'flights' | 'guidance' | 'visa';
  title: string;
  detail: string;
}

export interface OmraRajabLocaleCopy {
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
  datesConfirmTag: string;
  cardSummary: string;
  viewDetailsBtn: string;
  reserveBtn: string;

  backToUmrahLabel: string;
  backToHomeLabel: string;
  heroEyebrow: string;
  durationLabel: string;
  datesLabel: string;

  confirmBannerHeading: string;
  confirmBannerExplanation: string;

  tableEyebrow: string;
  tableTitle: string;
  tableSubtitle: string;
  colOptionHotels: string;
  madinahCityLabel: string;
  makkahCityLabel: string;
  priceConfirmLabel: string;
  priceStartingHint: string;

  optionsEyebrow: string;
  optionsTitle: string;
  optionsSubtitle: string;
  roomLabels: Record<OmraRajabRoomType, { name: string; capacity: string }>;
  selectRoomBtn: string;
  selectedRoomBtn: string;
  roomRatesNotice: string;

  inclusionsEyebrow: string;
  inclusionsTitle: string;
  inclusionsSubtitle: string;
  inclusions: OmraRajabInclusionItem[];
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
  quoteBaseRateValue: string;
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

export const OMRA_RAJAB_COPY: Record<Language, OmraRajabLocaleCopy> = {
  fr: {
    cardBadge: 'Offre A · Omra Rajab 2026 / 1448',
    title: 'Omra Rajab',
    arabicTitle: 'عمرة رجب',
    coverYearBadge: 'Programme 2026 / 1448',
    startingFromLabel: 'À partir de',
    startingPriceDisplay: '14 500 MAD',
    startingPriceBanner: 'Omra Rajab — À partir de 14 500 MAD / personne',
    startingPriceScopeNote:
      'Tarif d’appel officiel annoncé sur l’affiche Omra Rajab. Grille complète par chambre à confirmer auprès de l’agence.',
    durationSummary: '4 nuits à Médine · 10 nuits à Makkah (14 nuits)',
    datesSummary: 'Janvier 2027 (dates exactes à confirmer)',
    datesConfirmTag: 'Dates exactes, hôtels & grille par chambre à confirmer',
    cardSummary:
      'Programme spirituel consacré à Médine (4 nuits) et Makkah (10 nuits), distinct des autres offres Omra, à partir de 14 500 MAD par personne.',
    viewDetailsBtn: 'Voir le programme & conditions',
    reserveBtn: 'Demander une réservation',

    backToUmrahLabel: 'Retour aux offres Hajj & Omra',
    backToHomeLabel: 'Retour à l’accueil',
    heroEyebrow: 'Offre Officielle Golden Group Travels · Omra Rajab',
    durationLabel: 'Durée & séjour',
    datesLabel: 'Période annoncée',

    confirmBannerHeading: 'Informations soumises à confirmation auprès de l’agence',
    confirmBannerExplanation:
      'Les visuels originaux complets de l’offre Omra Rajab n’ayant pas été joints lors de la mise en ligne, les dates exactes de départ/retour (Janvier 2027 vs mention 2026 / 1448), les noms précis des hôtels à Médine et Makkah ainsi que les tarifs individuels par occupation (Double, Triple, Quadruple, Quintuple) restent à confirmer directement avec notre agence à Salé sans aucune estimation inventée.',

    tableEyebrow: 'Grille Tarifaire Officielle (MAD / personne)',
    tableTitle: 'Catégories de chambres & hébergement Omra Rajab',
    tableSubtitle:
      'Le tarif d’appel officiel démarre à 14 500 MAD par personne. Sélectionnez la catégorie souhaitée pour demander le tarif détaillé.',
    colOptionHotels: 'Programme & Hôtels',
    madinahCityLabel: 'Médine (4 nuits)',
    makkahCityLabel: 'Makkah (10 nuits)',
    priceConfirmLabel: 'Tarif à confirmer',
    priceStartingHint: 'Dès 14 500 MAD / pers.',

    optionsEyebrow: 'Sélection Interactive',
    optionsTitle: 'Hébergement & choix de la chambre',
    optionsSubtitle:
      'Choisissez votre catégorie de chambre afin de préparer votre demande de confirmation directe auprès de notre équipe à Salé.',
    roomLabels: {
      double: { name: 'Chambre Double', capacity: '2 personnes' },
      triple: { name: 'Chambre Triple', capacity: '3 personnes' },
      quadruple: { name: 'Chambre Quadruple', capacity: '4 personnes' },
      quintuple: { name: 'Chambre Quintuple', capacity: '5 personnes' }
    },
    selectRoomBtn: 'Sélectionner',
    selectedRoomBtn: 'Sélectionnée',
    roomRatesNotice: 'Tarif exact par chambre à confirmer par l’agence (dès 14 500 MAD)',

    inclusionsEyebrow: 'Prestations Officiellement Annoncées',
    inclusionsTitle: 'Le prix comprend',
    inclusionsSubtitle:
      'Les six prestations annoncées sur le programme Omra Rajab, sans ajout d’avantages non confirmés.',
    inclusions: [
      { key: 'ziyarat', title: 'Visites religieuses', detail: 'Visites guidées à Médine et à Makkah.' },
      { key: 'accommodation', title: 'Hôtels / Hébergement', detail: '4 nuits à Médine et 10 nuits à Makkah.' },
      { key: 'transport', title: 'Transport', detail: 'Transferts terrestres entre aéroports et Villes Saintes.' },
      { key: 'flights', title: 'Vols', detail: 'Billets d’avion aller-retour.' },
      { key: 'guidance', title: 'Encadrement', detail: 'Accompagnement par l’équipe Golden Group Travels.' },
      { key: 'visa', title: 'Visa', detail: 'Traitement du dossier de visa Omra (sous réserve des autorités).' }
    ],
    unprintedTitle: 'Éléments non précisés · À confirmer par l’agence',
    unprintedItems: [
      'Formule de repas / petits-déjeuners à Médine et à Makkah : à confirmer.',
      'Noms exacts et catégories d’étoiles des hôtels : à confirmer.',
      'Tarifs détaillés par type de chambre (Double, Triple, Quadruple, Quintuple) : à confirmer.',
      'Dates exactes de départ et de retour (Janvier 2027 / 2026-1448) : à confirmer.'
    ],

    conditionsEyebrow: 'Conditions d’inscription',
    conditionsTitle: 'Documents requis & formalités',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passeport valide au moins 6 mois',
        detail: 'Le passeport du pèlerin doit disposer d’une validité minimale de six (6) mois.'
      },
      {
        key: 'photo',
        title: 'Photo d’identité sur fond blanc',
        detail: 'Une photographie d’identité récente format passeport sur fond blanc.'
      },
      {
        key: 'deposit',
        title: 'Modalités d’inscription & avance',
        detail:
          'Les conditions de dépôt du passeport et d’acompte sont confirmées directement auprès de notre bureau à Salé.'
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
        title: 'Disponibilités & horaires de vol',
        detail:
          'Les horaires de vol, places disponibles et tarifs définitifs sont confirmés en direct par l’agence.'
      }
    ],

    inquiryEyebrow: 'Demande directe · Golden Group Travels Salé',
    inquiryTitle: 'Demander une réservation — Omra Rajab',
    inquirySubtitle:
      'Sélectionnez votre préférence de chambre et le nombre de voyageurs pour transmettre votre demande sur WhatsApp.',
    formRoomLabel: 'Catégorie de chambre souhaitée',
    formTravelersLabel: 'Nombre de voyageurs',
    formNameLabel: 'Nom complet',
    formNamePlaceholder: 'Votre nom et prénom',
    formPhoneLabel: 'Téléphone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Précisions complémentaires',
    formNotesPlaceholder: 'Demande de confirmation des dates, hôtels et tarifs par chambre…',
    formSubmitBtn: 'Préparer ma demande WhatsApp',
    formNoAutoConfirm:
      'Aucune confirmation automatique ni disponibilité en direct ; votre demande est vérifiée directement par notre agence.',
    errNameRequired: 'Veuillez saisir votre nom complet.',
    errPhoneRequired: 'Veuillez indiquer votre numéro de téléphone ou WhatsApp.',

    quoteEyebrow: 'Tarif Annoncé (MAD)',
    quoteTitle: 'Récapitulatif indicatif',
    quotePerPersonLabel: 'Tarif d’appel officiel',
    quoteBaseRateValue: 'À partir de 14 500 MAD / pers.',
    quoteHotelsRecapLabel: 'Séjour prévu',
    quoteDatesNotice:
      'Janvier 2027 (brochure 2026 / 1448) — dates exactes, hôtels et tarifs par catégorie à confirmer avec l’agence.',

    readyTitle: 'Demande prête pour envoi WhatsApp',
    readySubtitle:
      'Appuyez ci-dessous pour envoyer votre sélection à Golden Group Travels Salé.',
    readyEditBtn: 'Modifier ma sélection',
    readyWhatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Conseiller Omra Rajab',
    advisorCallLabel: 'Appeler l’agence',
    advisorMapsLabel: 'Localiser sur Google Maps'
  },

  ar: {
    cardBadge: 'العرض أ · عمرة رجب 2026 / 1448',
    title: 'عمرة رجب',
    arabicTitle: 'عمرة رجب',
    coverYearBadge: 'برنامج 2026 / 1448',
    startingFromLabel: 'ابتداءً من',
    startingPriceDisplay: '14,500 درهم',
    startingPriceBanner: 'عمرة رجب — ابتداءً من 14,500 درهم / للشخص',
    startingPriceScopeNote:
      'السعر الابتدائي المعلن في إعلان عمرة رجب. تفاصيل الغرف والفنادق قيد التأكيد لدى الوكالة.',
    durationSummary: '4 ليالٍ بالمدينة المنورة · 10 ليالٍ بمكة المكرمة (14 ليلة)',
    datesSummary: 'يناير 2027 (التواريخ الدقيقة قيد التأكيد)',
    datesConfirmTag: 'التواريخ الدقيقة والفنادق وأسعار الغرف قيد التأكيد',
    cardSummary:
      'برنامج عمرة مخصص للمدينة المنورة (4 ليالٍ) ومكة المكرمة (10 ليالٍ)، منفصل عن باقي العروض، ابتداءً من 14,500 درهم للشخص.',
    viewDetailsBtn: 'عرض البرنامج والشروط',
    reserveBtn: 'طلب حجز',

    backToUmrahLabel: 'العودة إلى عروض الحج والعمرة',
    backToHomeLabel: 'العودة إلى الرئيسية',
    heroEyebrow: 'البرنامج الرسمي لدى Golden Group Travels · عمرة رجب',
    durationLabel: 'المدة والإقامة',
    datesLabel: 'الفترة المعلنة',

    confirmBannerHeading: 'معلومات قيد التأكيد الرسمي لدى الوكالة',
    confirmBannerExplanation:
      'نظراً لعدم إرفاق كامل صور إعلان عمرة رجب الأصلية، تبقى التواريخ الدقيقة للذهاب والعودة (يناير 2027 مقابل إشارة 2026 / 1448)، وأسماء الفنادق الدقيقة في المدينة ومكة، وأسعار كل نوع غرفة قيد التأكيد المباشر مع وكالتنا بسلا دون أي تخمين.',

    tableEyebrow: 'جدول الأسعار المعلن (درهم / للشخص)',
    tableTitle: 'فئات الغرف والإقامة · عمرة رجب',
    tableSubtitle:
      'يبدأ السعر الرسمي المعلن من 14,500 درهم للشخص الواحد. اختر فئة الغرفة المطلوبة للاستعلام عن التسعيرة التفصيلية.',
    colOptionHotels: 'البرنامج والفنادق',
    madinahCityLabel: 'المدينة المنورة (4 ليالٍ)',
    makkahCityLabel: 'مكة المكرمة (10 ليالٍ)',
    priceConfirmLabel: 'السعر قيد التأكيد',
    priceStartingHint: 'ابتداءً من 14,500 درهم',

    optionsEyebrow: 'الاختيار التفاعلي',
    optionsTitle: 'الإقامة واختيار فئة الغرفة',
    optionsSubtitle: 'حدد نوع الغرفة المطلوب لإرسال طلب التأكيد مباشرة إلى وكالة سلا.',
    roomLabels: {
      double: { name: 'غرفة ثنائية', capacity: 'شخصان' },
      triple: { name: 'غرفة ثلاثية', capacity: '3 أشخاص' },
      quadruple: { name: 'غرفة رباعية', capacity: '4 أشخاص' },
      quintuple: { name: 'غرفة خماسية', capacity: '5 أشخاص' }
    },
    selectRoomBtn: 'اختيار',
    selectedRoomBtn: 'محددة',
    roomRatesNotice: 'السعر الدقيق لكل غرفة قيد التأكيد (يبدأ من 14,500 درهم)',

    inclusionsEyebrow: 'الخدمات المعلنة في البرنامج',
    inclusionsTitle: 'السعر الأساسي يشمل',
    inclusionsSubtitle: 'الخدمات الست المعلنة رسمياً في برنامج عمرة رجب دون إضافة أي وعود غير مؤكدة.',
    inclusions: [
      { key: 'ziyarat', title: 'المزارات الدينية', detail: 'زيارات إرشادية بالمدينة المنورة ومكة المكرمة.' },
      { key: 'accommodation', title: 'الفنادق / الإقامة', detail: '4 ليالٍ بالمدينة المنورة و10 ليالٍ بمكة المكرمة.' },
      { key: 'transport', title: 'النقل', detail: 'التنقلات البريّة بين المطارات والمدينتين المقدستين.' },
      { key: 'flights', title: 'الطيران', detail: 'تذاكر السفر ذهاباً وإياباً.' },
      { key: 'guidance', title: 'المرافقة والتأطير', detail: 'مرافقة وإشراف من فريق Golden Group Travels.' },
      { key: 'visa', title: 'التأشيرة', detail: 'إجراءات تأشيرة العمرة (حسب ضوابط الجهات المختصة).' }
    ],
    unprintedTitle: 'عناصر غير محددة · قيد التأكيد لدى الوكالة',
    unprintedItems: [
      'نظام الوجبات / الإفطار في المدينة المنورة ومكة المكرمة: قيد التأكيد.',
      'الأسماء الدقيقة وتصنيف الفنادق: قيد التأكيد.',
      'التسعيرة التفصيلية حسب كل فئة غرفة (ثنائية، ثلاثية، رباعية، خماسية): قيد التأكيد.',
      'تواريخ الذهاب والعودة الدقيقة (يناير 2027 / 2026-1448): قيد التأكيد.'
    ],

    conditionsEyebrow: 'شروط التسجيل',
    conditionsTitle: 'الوثائق المطلوبة والتسجيل',
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
        title: 'شروط إيداع الجواز والتسبيق',
        detail: 'تُؤكَّد تفاصيل إيداع الجواز ومواعيد التسجيل مباشرة مع مكتبنا بسلا.'
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
        title: 'توافر المقاعد ومواقيت الطيران',
        detail: 'مواقيت الرحلات وتوافر المقاعد والأسعار النهائية تُؤكَّد حصرياً لدى الوكالة.'
      }
    ],

    inquiryEyebrow: 'طلب مباشر · وكالة سلا',
    inquiryTitle: 'طلب حجز — عمرة رجب',
    inquirySubtitle: 'اختر فئة الغرفة وعدد المسافرين لإرسال طلبك عبر واتساب.',
    formRoomLabel: 'نوع الغرفة المطلوب',
    formTravelersLabel: 'عدد المسافرين',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'الاسم والنسب',
    formPhoneLabel: 'رقم الهاتف / واتساب',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'ملاحظات إضافية',
    formNotesPlaceholder: 'طلب تأكيد التواريخ وأسماء الفنادق وأسعار الغرف...',
    formSubmitBtn: 'تجهيز طلب الواتساب',
    formNoAutoConfirm: 'لا يتم تأكيد الحجز تلقائياً عبر الموقع؛ يتولى فريق الوكالة المراجعة مباشرة.',
    errNameRequired: 'يرجى إدخال الاسم الكامل.',
    errPhoneRequired: 'يرجى إدخال رقم الهاتف أو الواتساب.',

    quoteEyebrow: 'ملخص السعر (درهم)',
    quoteTitle: 'المرجع السعري',
    quotePerPersonLabel: 'السعر الابتدائي المعلن',
    quoteBaseRateValue: 'ابتداءً من 14,500 درهم / للشخص',
    quoteHotelsRecapLabel: 'الإقامة المبرمجة',
    quoteDatesNotice:
      'يناير 2027 (2026 / 1448) — التواريخ الدقيقة والفنادق والأسعار التفصيلية قيد التأكيد لدى الوكالة.',

    readyTitle: 'الطلب جاهز للإرسال عبر واتساب',
    readySubtitle: 'اضغط أدناه لإرسال اختيارك إلى فريق Golden Group Travels بسلا.',
    readyEditBtn: 'تعديل الاختيار',
    readyWhatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    advisorLabel: 'Golden Group Travels · سلا',
    advisorTitle: 'مستشار عمرة رجب',
    advisorCallLabel: 'الاتصال بالوكالة',
    advisorMapsLabel: 'الموقع على خرائط Google'
  },

  en: {
    cardBadge: 'Offer A · Omra Rajab 2026 / 1448',
    title: 'Omra Rajab',
    arabicTitle: 'عمرة رجب',
    coverYearBadge: 'Program 2026 / 1448',
    startingFromLabel: 'Starting from',
    startingPriceDisplay: '14,500 MAD',
    startingPriceBanner: 'Omra Rajab — From 14,500 MAD / person',
    startingPriceScopeNote:
      'Official starting rate advertised on the Omra Rajab flyer. Full per-room tariff requires agency confirmation.',
    durationSummary: '4 nights in Madinah · 10 nights in Makkah (14 nights)',
    datesSummary: 'January 2027 (exact dates to confirm)',
    datesConfirmTag: 'Exact dates, hotels & per-room fares subject to confirmation',
    cardSummary:
      'Dedicated Madinah (4 nights) and Makkah (10 nights) spiritual program, kept separate from all other Umrah offers, starting from 14,500 MAD per person.',
    viewDetailsBtn: 'View details & terms',
    reserveBtn: 'Request booking',

    backToUmrahLabel: 'Back to Hajj & Omra offers',
    backToHomeLabel: 'Back to Home',
    heroEyebrow: 'Official Golden Group Travels Offer · Omra Rajab',
    durationLabel: 'Duration & stay',
    datesLabel: 'Advertised period',

    confirmBannerHeading: 'Details Subject to Direct Agency Confirmation',
    confirmBannerExplanation:
      'Because complete high-resolution source sheets for Omra Rajab were not supplied in this session, exact departure/return dates (January 2027 vs printed 2026 / 1448), exact Madinah & Makkah hotel names, and individual Double/Triple/Quadruple/Quintuple fares remain pending confirmation with our Salé office—no estimates are fabricated.',

    tableEyebrow: 'Official Rate Overview (MAD / person)',
    tableTitle: 'Room categories & stay overview · Omra Rajab',
    tableSubtitle:
      'Official starting fare begins at 14,500 MAD per person. Select any room category to inquire for its exact rate.',
    colOptionHotels: 'Program & Hotels',
    madinahCityLabel: 'Madinah (4 nights)',
    makkahCityLabel: 'Makkah (10 nights)',
    priceConfirmLabel: 'Rate to confirm',
    priceStartingHint: 'Starting from 14,500 MAD / pers.',

    optionsEyebrow: 'Interactive Selection',
    optionsTitle: 'Stay & room preference',
    optionsSubtitle:
      'Pick your preferred room category to prepare a direct WhatsApp confirmation request with our Salé team.',
    roomLabels: {
      double: { name: 'Double Room', capacity: '2 travelers' },
      triple: { name: 'Triple Room', capacity: '3 travelers' },
      quadruple: { name: 'Quadruple Room', capacity: '4 travelers' },
      quintuple: { name: 'Quintuple Room', capacity: '5 travelers' }
    },
    selectRoomBtn: 'Select',
    selectedRoomBtn: 'Selected',
    roomRatesNotice: 'Exact per-room rate pending agency confirmation (from 14,500 MAD)',

    inclusionsEyebrow: 'Official Program Inclusions',
    inclusionsTitle: 'The price includes',
    inclusionsSubtitle:
      'The six core categories announced on the Omra Rajab program, without unverified extras.',
    inclusions: [
      { key: 'ziyarat', title: 'Religious Visits', detail: 'Guided religious visits in Madinah and Makkah.' },
      { key: 'accommodation', title: 'Hotels / Accommodation', detail: '4 nights in Madinah and 10 nights in Makkah.' },
      { key: 'transport', title: 'Transportation', detail: 'Ground transfers between airports and the Holy Cities.' },
      { key: 'flights', title: 'Flights', detail: 'Round-trip airline tickets.' },
      { key: 'guidance', title: 'Guidance', detail: 'Dedicated accompaniment by Golden Group Travels.' },
      { key: 'visa', title: 'Visa', detail: 'Umrah visa application handling (subject to authority approval).' }
    ],
    unprintedTitle: 'Unspecified Items · Pending Agency Confirmation',
    unprintedItems: [
      'Meal plans / breakfast in Madinah and Makkah: to confirm.',
      'Exact hotel property names and star ratings: to confirm.',
      'Per-room rates (Double, Triple, Quadruple, Quintuple): to confirm.',
      'Exact departure and return dates (Jan 2027 / 2026-1448): to confirm.'
    ],

    conditionsEyebrow: 'Registration Conditions',
    conditionsTitle: 'Required documents & deposit rules',
    conditionsList: [
      {
        key: 'passport',
        title: 'Passport valid for at least 6 months',
        detail: 'Pilgrim passports must remain valid for a minimum of six months.'
      },
      {
        key: 'photo',
        title: 'Passport photograph with white background',
        detail: 'Recent official passport photo on a plain white background.'
      },
      {
        key: 'deposit',
        title: 'Submission & deposit confirmation',
        detail:
          'Passport deposit schedule and advance booking terms are confirmed directly with our Salé desk.'
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
        detail: 'Flight timings, seat availability, and final pricing are confirmed only by the agency.'
      }
    ],

    inquiryEyebrow: 'Direct Desk · Golden Group Travels Salé',
    inquiryTitle: 'Request a booking — Omra Rajab',
    inquirySubtitle:
      'Choose your preferred room occupancy and number of travelers to send a direct WhatsApp inquiry.',
    formRoomLabel: 'Preferred room type',
    formTravelersLabel: 'Number of travelers',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'Your full name',
    formPhoneLabel: 'Phone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Additional notes',
    formNotesPlaceholder: 'Requests on exact dates, hotel names, or room pricing…',
    formSubmitBtn: 'Prepare WhatsApp inquiry',
    formNoAutoConfirm:
      'Reservations are not automatically confirmed and live availability is not claimed online.',
    errNameRequired: 'Please enter your full name.',
    errPhoneRequired: 'Please enter your phone or WhatsApp number.',

    quoteEyebrow: 'Advertised Rate (MAD)',
    quoteTitle: 'Reference summary',
    quotePerPersonLabel: 'Advertised starting rate',
    quoteBaseRateValue: 'From 14,500 MAD / person',
    quoteHotelsRecapLabel: 'Planned itinerary',
    quoteDatesNotice:
      'January 2027 (brochure 2026 / 1448) — exact dates, hotel names, and room rates subject to agency confirmation.',

    readyTitle: 'Inquiry ready for WhatsApp',
    readySubtitle: 'Click below to send your selection to Golden Group Travels in Salé.',
    readyEditBtn: 'Edit selection',
    readyWhatsappBtn: 'Send via WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Omra Rajab desk',
    advisorCallLabel: 'Call agency',
    advisorMapsLabel: 'Locate on Google Maps'
  },

  es: {
    cardBadge: 'Oferta A · Omra Rajab 2026 / 1448',
    title: 'Omra Rajab',
    arabicTitle: 'عمرة رجب',
    coverYearBadge: 'Programa 2026 / 1448',
    startingFromLabel: 'Desde',
    startingPriceDisplay: '14 500 MAD',
    startingPriceBanner: 'Omra Rajab — Desde 14 500 MAD / persona',
    startingPriceScopeNote:
      'Tarifa inicial anunciada en el folleto Omra Rajab. Detalle por habitación pendiente de confirmación.',
    durationSummary: '4 noches en Medina · 10 noches en La Meca (14 noches)',
    datesSummary: 'Enero 2027 (fechas exactas por confirmar)',
    datesConfirmTag: 'Fechas exactas, hoteles y tarifas por confirmar',
    cardSummary:
      'Programa espiritual en Medina (4 noches) y La Meca (10 noches), independiente de las demás ofertas, desde 14 500 MAD por persona.',
    viewDetailsBtn: 'Ver programa y condiciones',
    reserveBtn: 'Solicitar reserva',

    backToUmrahLabel: 'Volver a Hajj & Omra',
    backToHomeLabel: 'Volver al inicio',
    heroEyebrow: 'Oferta Oficial Golden Group Travels · Omra Rajab',
    durationLabel: 'Duración y estancia',
    datesLabel: 'Periodo anunciado',

    confirmBannerHeading: 'Detalles sujetos a confirmación de la agencia',
    confirmBannerExplanation:
      'Al no disponerse del detalle completo impreso del folleto Omra Rajab, las fechas exactas (enero 2027 frente a 2026 / 1448), nombres exactos de hoteles en Medina y La Meca y precios individuales por habitación quedan pendientes de confirmación directa en Salé.',

    tableEyebrow: 'Referencia Tarifaria Oficial (MAD / persona)',
    tableTitle: 'Categorías de habitación y estancia · Omra Rajab',
    tableSubtitle:
      'Tarifa inicial anunciada desde 14 500 MAD por persona. Seleccione su habitación para solicitar confirmación.',
    colOptionHotels: 'Programa y Hoteles',
    madinahCityLabel: 'Medina (4 noches)',
    makkahCityLabel: 'La Meca (10 noches)',
    priceConfirmLabel: 'Por confirmar',
    priceStartingHint: 'Desde 14 500 MAD / pers.',

    optionsEyebrow: 'Selección Interactiva',
    optionsTitle: 'Alojamiento y tipo de habitación',
    optionsSubtitle:
      'Elija la ocupación deseada para preparar su solicitud directa por WhatsApp.',
    roomLabels: {
      double: { name: 'Habitación Doble', capacity: '2 personas' },
      triple: { name: 'Habitación Triple', capacity: '3 personas' },
      quadruple: { name: 'Habitación Cuádruple', capacity: '4 personas' },
      quintuple: { name: 'Habitación Quíntuple', capacity: '5 personas' }
    },
    selectRoomBtn: 'Elegir',
    selectedRoomBtn: 'Seleccionada',
    roomRatesNotice: 'Tarifa exacta por habitación por confirmar (desde 14 500 MAD)',

    inclusionsEyebrow: 'Servicios Anunciados',
    inclusionsTitle: 'El precio incluye',
    inclusionsSubtitle:
      'Los seis apartados incluidos en el programa oficial Omra Rajab.',
    inclusions: [
      { key: 'ziyarat', title: 'Visitas religiosas', detail: 'Visitas guiadas en Medina y La Meca.' },
      { key: 'accommodation', title: 'Hoteles / Alojamiento', detail: '4 noches en Medina y 10 noches en La Meca.' },
      { key: 'transport', title: 'Transporte', detail: 'Traslados terrestres entre aeropuertos y Ciudades Santas.' },
      { key: 'flights', title: 'Vuelos', detail: 'Billetes de avión ida y vuelta.' },
      { key: 'guidance', title: 'Acompañamiento', detail: 'Asistencia del equipo de Golden Group Travels.' },
      { key: 'visa', title: 'Visado', detail: 'Tramitación del visado de Omra.' }
    ],
    unprintedTitle: 'Conceptos por confirmar con la agencia',
    unprintedItems: [
      'Régimen de comidas / desayunos en Medina y La Meca: por confirmar.',
      'Nombres exactos de los hoteles: por confirmar.',
      'Tarifas específicas por habitación (Doble, Triple, Cuádruple, Quíntuple): por confirmar.',
      'Fechas exactas de salida y regreso (ene 2027 / 2026-1448): por confirmar.'
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
        title: 'Entrega de pasaporte y anticipo',
        detail: 'Los plazos y condiciones del anticipo se confirman en nuestra oficina de Salé.'
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
        detail: 'Los horarios de vuelo y plazas quedan sujetos a confirmación por la agencia.'
      }
    ],

    inquiryEyebrow: 'Consulta directa · Salé',
    inquiryTitle: 'Solicitar reserva — Omra Rajab',
    inquirySubtitle:
      'Seleccione el tipo de habitación y número de viajeros para enviar su consulta por WhatsApp.',
    formRoomLabel: 'Tipo de habitación',
    formTravelersLabel: 'Viajeros',
    formNameLabel: 'Nombre completo',
    formNamePlaceholder: 'Su nombre completo',
    formPhoneLabel: 'Teléfono / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Notas adicionales',
    formNotesPlaceholder: 'Consulta sobre fechas, hoteles y tarifa exacta…',
    formSubmitBtn: 'Preparar solicitud WhatsApp',
    formNoAutoConfirm: 'Sin confirmación automática en línea.',
    errNameRequired: 'Por favor ingrese su nombre.',
    errPhoneRequired: 'Por favor ingrese su teléfono.',

    quoteEyebrow: 'Tarifa Referencial (MAD)',
    quoteTitle: 'Resumen indicativo',
    quotePerPersonLabel: 'Tarifa inicial oficial',
    quoteBaseRateValue: 'Desde 14 500 MAD / persona',
    quoteHotelsRecapLabel: 'Estancia prevista',
    quoteDatesNotice:
      'Enero 2027 (2026 / 1448) — fechas exactas, hoteles y tarifas sujetos a confirmación.',

    readyTitle: 'Solicitud lista para WhatsApp',
    readySubtitle: 'Envíe su selección directamente a Golden Group Travels.',
    readyEditBtn: 'Modificar selección',
    readyWhatsappBtn: 'Enviar por WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Asistencia Omra Rajab',
    advisorCallLabel: 'Llamar a la agencia',
    advisorMapsLabel: 'Ver en Google Maps'
  }
};
