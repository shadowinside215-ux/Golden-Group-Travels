import egyptTransportHeroImg from '../assets/images/egypt_transport_excursions_hero_1795458380896.jpg';
import cairoPyramidsHeroImg from '../assets/images/cairo_pyramids_hero_1795449231042.jpg';
import cairoKhanAlmuizzImg from '../assets/images/cairo_khan_almuizz_1795449251028.jpg';
import alexandriaCitadelCoastImg from '../assets/images/alexandria_citadel_coast_1795458381475.jpg';
import { Language } from '../assets/destinations';

export const EGYPT_EXCURSIONS_ROUTE = '/circuits-activites/transferts-excursions-egypte';
export const EGYPT_EXCURSIONS_BACK_ROUTE = '/circuits-activites';

export const EGYPT_EXCURSIONS_IMAGES = {
  hero: egyptTransportHeroImg,
  pyramids: cairoPyramidsHeroImg,
  islamicCairo: cairoKhanAlmuizzImg,
  alexandria: alexandriaCitadelCoastImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const EGYPT_EXCURSIONS_PRICING_META = {
  currency: 'USD' as const,
  startingPriceUsd: 20, // Strictly applies ONLY to Airport transfer for 6 travelers
  optionalLunchSupplementUsd: 25,
  minGroupSize: 2,
  validUntilIso: '2026-12-31',
  supportedGroupSizes: [2, 4, 6] as const
} as const;

export type EgyptExcursionServiceId =
  | 'airport-transfer'
  | 'pyramids-gem'
  | 'egyptian-museum-citadel'
  | 'nmec-memphis-saqqara'
  | 'mosques-half-day'
  | 'alexandria-full-day';

export type SupportedGroupSize = 2 | 4 | 6;
export type GroupSizeSelection = SupportedGroupSize | 'custom';

export type EgyptExcursionKind = 'transfer' | 'full-day' | 'half-day';

export interface EgyptExcursionServiceItem {
  id: EgyptExcursionServiceId;
  kind: EgyptExcursionKind;
  isTransfer: boolean;
  guideLanguageType: 'en-ar-assistance' | 'fr-guide';
  supportsOptionalLunch: boolean;
  image: string;
  pricesUsd: Record<SupportedGroupSize, number>;
  title: Record<Language, string>;
  durationLabel: Record<Language, string>;
  summary: Record<Language, string>;
  highlights: Record<Language, string[]>;
  guideBadgeLabel: Record<Language, string>;
}

export const EGYPT_EXCURSIONS_SERVICES: readonly EgyptExcursionServiceItem[] = [
  {
    id: 'airport-transfer',
    kind: 'transfer',
    isTransfer: true,
    guideLanguageType: 'en-ar-assistance',
    supportsOptionalLunch: false,
    image: egyptTransportHeroImg,
    pricesUsd: { 2: 35, 4: 25, 6: 20 },
    title: {
      fr: 'Transfert aéroport avec assistance anglophone / arabophone',
      ar: 'خدمة التوصيل من وإلى المطار مع مساعدة باللغتين الإنجليزية والعربية',
      en: 'Airport transfer with English/Arabic assistance',
      es: 'Traslado al aeropuerto con asistencia en inglés o árabe'
    },
    durationLabel: {
      fr: 'Transfert aéroport ↔ hôtel',
      ar: 'نقل المطار ↔ الفندق',
      en: 'Airport ↔ hotel transfer',
      es: 'Traslado aeropuerto ↔ hotel'
    },
    summary: {
      fr: 'Accueil personnalisé à l’aéroport et transfert confortable vers votre hôtel avec assistance anglophone ou arabophone.',
      ar: 'استقبال وتنقل مريح بين المطار والفندق مع مرافق ناطق بالإنجليزية أو العربية.',
      en: 'Meet-and-assist airport welcome and comfortable vehicle transfer with English- or Arabic-speaking assistance.',
      es: 'Recepción en el aeropuerto y traslado cómodo al hotel con asistencia en inglés o árabe.'
    },
    highlights: {
      fr: [
        'Transfert privé aéroport ↔ hôtel',
        'Assistance anglophone ou arabophone dédiée',
        'Tarif d’appel à 20 USD uniquement pour 6 personnes'
      ],
      ar: [
        'نقل خاص بين المطار والفندق',
        'مساعدة مخصصة بالإنجليزية أو العربية',
        'سعر 20 USD ينطبق حصرياً على مجموعة من 6 مسافرين'
      ],
      en: [
        'Private airport ↔ hotel transfer',
        'Dedicated English- or Arabic-speaking assistance',
        '20 USD starting rate applies exclusively to 6 travelers'
      ],
      es: [
        'Traslado privado aeropuerto ↔ hotel',
        'Asistencia dedicada en inglés o árabe',
        'Tarifa base de 20 USD válida únicamente para 6 personas'
      ]
    },
    guideBadgeLabel: {
      fr: 'Assistance anglophone / arabophone',
      ar: 'مساعدة بالإنجليزية / العربية',
      en: 'English / Arabic assistance',
      es: 'Asistencia inglés / árabe'
    }
  },
  {
    id: 'pyramids-gem',
    kind: 'full-day',
    isTransfer: false,
    guideLanguageType: 'fr-guide',
    supportsOptionalLunch: true,
    image: cairoPyramidsHeroImg,
    pricesUsd: { 2: 165, 4: 120, 6: 105 },
    title: {
      fr: 'Journée complète Pyramides et Grand Musée Égyptien',
      ar: 'جولة يوم كامل إلى الأهرامات والمتحف المصري الكبير',
      en: 'Full-day Pyramids and Grand Egyptian Museum',
      es: 'Día completo Pirámides y Gran Museo Egipcio'
    },
    durationLabel: {
      fr: 'Journée complète · Le Caire & Gizeh',
      ar: 'يوم كامل · القاهرة والجيزة',
      en: 'Full day · Cairo & Giza',
      es: 'Día completo · El Cairo y Guiza'
    },
    summary: {
      fr: 'Découverte guidée du plateau des Pyramides de Gizeh et du Grand Musée Égyptien avec droits d’entrée, transport hôtel A/R et guide local francophone.',
      ar: 'زيارة موجهة لهضبة أهرامات الجيزة والمتحف المصري الكبير شاملة التذاكر والنقل من وإلى الفندق ومرشد محلي ناطق بالفرنسية.',
      en: 'Guided excursion to the Giza Pyramids and Grand Egyptian Museum including admission tickets, round-trip hotel transport, and local French-speaking guide.',
      es: 'Excursión guiada a las Pirámides de Guiza y Gran Museo Egipcio con entradas, transporte de hotel y guía local francófono.'
    },
    highlights: {
      fr: [
        'Plateau des Pyramides de Gizeh & Sphinx',
        'Grand Musée Égyptien (GEM)',
        'Billets d’entrée, transport hôtel A/R & guide francophone'
      ],
      ar: [
        'هضبة أهرامات الجيزة وأبو الهول',
        'المتحف المصري الكبير',
        'تذاكر الدخول والنقل الفندقي ومرشد محلي بالفرنسية'
      ],
      en: [
        'Giza Pyramids plateau & Sphinx',
        'Grand Egyptian Museum (GEM)',
        'Admission fees, hotel round-trip & local French-speaking guide'
      ],
      es: [
        'Meseta de las Pirámides de Guiza',
        'Gran Museo Egipcio (GEM)',
        'Entradas, transporte de hotel y guía francófono'
      ]
    },
    guideBadgeLabel: {
      fr: 'Guide local francophone',
      ar: 'مرشد محلي ناطق بالفرنسية',
      en: 'Local French-speaking guide',
      es: 'Guía local francófono'
    }
  },
  {
    id: 'egyptian-museum-citadel',
    kind: 'full-day',
    isTransfer: false,
    guideLanguageType: 'fr-guide',
    supportsOptionalLunch: true,
    image: cairoKhanAlmuizzImg,
    pricesUsd: { 2: 135, 4: 85, 6: 70 },
    title: {
      fr: 'Journée complète Musée Égyptien, Citadelle de Saladin, Caire Copte et Khan El Khalili',
      ar: 'جولة يوم كامل: المتحف المصري، قلعة صلاح الدين، القاهرة القبطية وخان الخليلي',
      en: 'Full-day Egyptian Museum, Saladin Citadel, Coptic Cairo and Khan El Khalili',
      es: 'Día completo Museo Egipcio, Ciudadela de Saladino, Cairo Copto y Khan El Khalili'
    },
    durationLabel: {
      fr: 'Journée complète · Caire Historique',
      ar: 'يوم كامل · القاهرة التاريخية',
      en: 'Full day · Historic Cairo',
      es: 'Día completo · Cairo Histórico'
    },
    summary: {
      fr: 'Itinéraire culturel complet au cœur du Caire : Musée Égyptien, Citadelle de Saladin, quartier du Caire Copte et souk Khan El Khalili.',
      ar: 'جولة ثقافية متكاملة في قلب القاهرة تشمل المتحف المصري وقلعة صلاح الدين والقاهرة القبطية وسوق خان الخليلي.',
      en: 'Comprehensive Cairo heritage itinerary covering the Egyptian Museum, Saladin Citadel, Coptic Cairo, and Khan El Khalili bazaar.',
      es: 'Recorrido cultural por el Museo Egipcio, la Ciudadela de Saladino, el Cairo Copto y el bazar Khan El Khalili.'
    },
    highlights: {
      fr: [
        'Musée Égyptien du Caire',
        'Citadelle de Saladin & Caire Copte',
        'Promenade au bazar historique Khan El Khalili'
      ],
      ar: [
        'المتحف المصري بالقاهرة',
        'قلعة صلاح الدين والقاهرة القبطية',
        'جولة في سوق خان الخليلي التاريخي'
      ],
      en: [
        'The Egyptian Museum in Cairo',
        'Saladin Citadel & Coptic Cairo quarter',
        'Historic Khan El Khalili bazaar visit'
      ],
      es: [
        'Museo Egipcio de El Cairo',
        'Ciudadela de Saladino y Cairo Copto',
        'Bazar histórico de Khan El Khalili'
      ]
    },
    guideBadgeLabel: {
      fr: 'Guide local francophone',
      ar: 'مرشد محلي ناطق بالفرنسية',
      en: 'Local French-speaking guide',
      es: 'Guía local francófono'
    }
  },
  {
    id: 'nmec-memphis-saqqara',
    kind: 'full-day',
    isTransfer: false,
    guideLanguageType: 'fr-guide',
    supportsOptionalLunch: true,
    image: cairoPyramidsHeroImg,
    pricesUsd: { 2: 140, 4: 95, 6: 80 },
    title: {
      fr: 'Journée complète Musée de la Civilisation, Memphis et Saqqara',
      ar: 'جولة يوم كامل: المتحف القومي للحضارة المصرية، ممفيس وسقارة',
      en: 'Full-day Museum of Civilization, Memphis and Saqqara',
      es: 'Día completo Museo de la Civilización, Menfis y Saqqara'
    },
    durationLabel: {
      fr: 'Journée complète · Civilisation & Nécropole',
      ar: 'يوم كامل · الحضارة وممفيس وسقارة',
      en: 'Full day · Civilization & Necropolis',
      es: 'Día completo · Civilización y Necrópolis'
    },
    summary: {
      fr: 'Visite guidée du Musée National de la Civilisation Égyptienne (NMEC), suivie de l’ancienne capitale Memphis et du complexe de Saqqara.',
      ar: 'زيارة المتحف القومي للحضارة المصرية، ثم العاصمة القديمة ممفيس ومنطقة سقارة الأثرية مع النقل ومرشد فرنسي.',
      en: 'Guided tour of the National Museum of Egyptian Civilization, ancient Memphis, and the Saqqara necropolis complex.',
      es: 'Visita guiada al Museo Nacional de la Civilización Egipcia, antigua Menfis y complejo de Saqqara.'
    },
    highlights: {
      fr: [
        'Musée National de la Civilisation Égyptienne',
        'Site antique de Memphis',
        'Nécropole et pyramide à degrés de Saqqara'
      ],
      ar: [
        'المتحف القومي للحضارة المصرية',
        'موقع ممفيس الأثري',
        'منطقة سقارة والهرم المدرج'
      ],
      en: [
        'National Museum of Egyptian Civilization',
        'Ancient capital site of Memphis',
        'Saqqara step pyramid & necropolis'
      ],
      es: [
        'Museo Nacional de la Civilización Egipcia',
        'Sitio histórico de Menfis',
        'Necrópolis y pirámide escalonada de Saqqara'
      ]
    },
    guideBadgeLabel: {
      fr: 'Guide local francophone',
      ar: 'مرشد محلي ناطق بالفرنسية',
      en: 'Local French-speaking guide',
      es: 'Guía local francófono'
    }
  },
  {
    id: 'mosques-half-day',
    kind: 'half-day',
    isTransfer: false,
    guideLanguageType: 'fr-guide',
    supportsOptionalLunch: true,
    image: cairoKhanAlmuizzImg,
    pricesUsd: { 2: 95, 4: 55, 6: 45 },
    title: {
      fr: 'Demi-journée Mosquées Sultan Hassan, Al-Rifa’i et Ibn Tulun',
      ar: 'نصف يوم: مساجد السلطان حسن، الرفاعي وابن طولون',
      en: 'Half-day Sultan Hassan, Al-Rifa’i and Ibn Tulun mosques',
      es: 'Medio día Mezquitas Sultán Hasán, Al-Rifa’i e Ibn Tulun'
    },
    durationLabel: {
      fr: 'Demi-journée · Architecture Islamique',
      ar: 'نصف يوم · العمارة الإسلامية',
      en: 'Half day · Islamic Architecture',
      es: 'Medio día · Arquitectura Islámica'
    },
    summary: {
      fr: 'Exploration architecturale des joyaux islamiques du Caire : la mosquée-madrasa du Sultan Hassan, la mosquée Al-Rifa’i et la mosquée d’Ibn Tulun.',
      ar: 'جولة نصف يوم لاستكشاف روائع العمارة الإسلامية في القاهرة: مسجد السلطان حسن، مسجد الرفاعي ومسجد أحمد بن طولون.',
      en: 'Architectural half-day tour of Cairo’s landmark mosques: Sultan Hassan, Al-Rifa’i, and Ibn Tulun.',
      es: 'Recorrido de medio día por las mezquitas históricas del Sultán Hasán, Al-Rifa’i e Ibn Tulun.'
    },
    highlights: {
      fr: [
        'Mosquée-madrasa du Sultan Hassan',
        'Mosquée Al-Rifa’i',
        'Mosquée historique d’Ibn Tulun'
      ],
      ar: [
        'مسجد ومدرسة السلطان حسن',
        'مسجد الرفاعي',
        'مسجد أحمد بن طولون التاريخي'
      ],
      en: [
        'Sultan Hassan Mosque-Madrasa',
        'Al-Rifa’i Mosque',
        'Historic Ibn Tulun Mosque'
      ],
      es: [
        'Mezquita-madraza del Sultán Hasán',
        'Mezquita de Al-Rifa’i',
        'Mezquita histórica de Ibn Tulun'
      ]
    },
    guideBadgeLabel: {
      fr: 'Guide local francophone',
      ar: 'مرشد محلي ناطق بالفرنسية',
      en: 'Local French-speaking guide',
      es: 'Guía local francófono'
    }
  },
  {
    id: 'alexandria-full-day',
    kind: 'full-day',
    isTransfer: false,
    guideLanguageType: 'fr-guide',
    supportsOptionalLunch: true,
    image: alexandriaCitadelCoastImg,
    pricesUsd: { 2: 205, 4: 125, 6: 100 },
    title: {
      fr: 'Excursion journée complète à Alexandrie',
      ar: 'رحلة يوم كامل إلى الإسكندرية',
      en: 'Full-day Alexandria excursion',
      es: 'Excursión de día completo a Alejandría'
    },
    durationLabel: {
      fr: 'Journée complète · Alexandrie (Méditerranée)',
      ar: 'يوم كامل · الإسكندرية',
      en: 'Full day · Alexandria Coast',
      es: 'Día completo · Costa de Alejandría'
    },
    summary: {
      fr: 'Excursion au départ du Caire vers Alexandrie incluant l’Amphithéâtre romain, la Citadelle de Qaitbay, la Bibliothèque d’Alexandrie et un arrêt déjeuner dans un restaurant local.',
      ar: 'رحلة يوم كامل إلى الإسكندرية تشمل المسرح الروماني، قلعة قايتباي، مكتبة الإسكندرية ومحطة غداء في مطعم محلي.',
      en: 'Full-day excursion to Alexandria featuring the Roman amphitheater, Qaitbay Citadel, Library of Alexandria, and a local restaurant lunch stop.',
      es: 'Excursión de día completo a Alejandría incluyendo el anfiteatro romano, la Ciudadela de Qaitbay, la Biblioteca de Alejandría y parada para almorzar en un restaurante local.'
    },
    highlights: {
      fr: [
        'Amphithéâtre romain d’Alexandrie',
        'Citadelle de Qaitbay sur la Méditerranée',
        'Bibliothèque d’Alexandrie',
        'Arrêt déjeuner dans un restaurant local'
      ],
      ar: [
        'المسرح الروماني بالإسكندرية',
        'قلعة قايتباي المطلة على البحر المتوسط',
        'مكتبة الإسكندرية',
        'محطة غداء في مطعم محلي'
      ],
      en: [
        'Roman amphitheater of Alexandria',
        'Qaitbay Citadel on the Mediterranean coast',
        'Library of Alexandria',
        'Local restaurant lunch stop'
      ],
      es: [
        'Anfiteatro romano de Alejandría',
        'Ciudadela de Qaitbay frente al Mediterráneo',
        'Biblioteca de Alejandría',
        'Parada para almuerzo en restaurante local'
      ]
    },
    guideBadgeLabel: {
      fr: 'Guide local francophone',
      ar: 'مرشد محلي ناطق بالفرنسية',
      en: 'Local French-speaking guide',
      es: 'Guía local francófono'
    }
  }
] as const;

export function getEgyptExcursionPrice(
  serviceId: EgyptExcursionServiceId,
  groupSize: GroupSizeSelection,
  includeOptionalLunch: boolean,
  travelDateIso?: string
): {
  status: 'priced' | 'custom_group' | 'expired_validity';
  baseUsdPerPerson: number | null;
  lunchSupplementUsdPerPerson: number;
  totalUsdPerPerson: number | null;
  estimatedGroupTotalUsd: number | null;
} {
  const service = EGYPT_EXCURSIONS_SERVICES.find((s) => s.id === serviceId);
  if (!service) {
    return {
      status: 'custom_group',
      baseUsdPerPerson: null,
      lunchSupplementUsdPerPerson: 0,
      totalUsdPerPerson: null,
      estimatedGroupTotalUsd: null
    };
  }

  // Never guarantee rates past December 31, 2026
  if (travelDateIso && travelDateIso > EGYPT_EXCURSIONS_PRICING_META.validUntilIso) {
    return {
      status: 'expired_validity',
      baseUsdPerPerson: null,
      lunchSupplementUsdPerPerson: 0,
      totalUsdPerPerson: null,
      estimatedGroupTotalUsd: null
    };
  }

  if (groupSize !== 2 && groupSize !== 4 && groupSize !== 6) {
    return {
      status: 'custom_group',
      baseUsdPerPerson: null,
      lunchSupplementUsdPerPerson: 0,
      totalUsdPerPerson: null,
      estimatedGroupTotalUsd: null
    };
  }

  const baseUsdPerPerson = service.pricesUsd[groupSize];
  const lunchSupplementUsdPerPerson =
    service.supportsOptionalLunch && includeOptionalLunch
      ? EGYPT_EXCURSIONS_PRICING_META.optionalLunchSupplementUsd
      : 0;
  const totalUsdPerPerson = baseUsdPerPerson + lunchSupplementUsdPerPerson;
  const estimatedGroupTotalUsd = totalUsdPerPerson * groupSize;

  return {
    status: 'priced',
    baseUsdPerPerson,
    lunchSupplementUsdPerPerson,
    totalUsdPerPerson,
    estimatedGroupTotalUsd
  };
}

export interface EgyptExcursionsLocaleCopy {
  showcaseCardTitle: string;
  showcaseArabicTitle: string;
  showcaseSubtitle: string;
  showcaseDestination: string;
  showcaseStartingFromLabel: string;
  showcaseStartingPrice: string;
  showcaseStartingScopeNote: string;
  showcaseDescription: string;
  showcaseHighlights: string[];
  showcaseValidityTag: string;
  showcaseViewExcursionsBtn: string;
  showcaseReserveBtn: string;

  backToToursLabel: string;
  backToHomeLabel: string;
  heroEyebrow: string;
  pageTitle: string;
  officialSubtitle: string;
  arabicTitle: string;
  destinationBadge: string;
  validityBadge: string;
  heroStartingScopeHeadline: string;
  heroViewExcursionsBtn: string;
  heroReserveBtn: string;

  servicesSectionEyebrow: string;
  servicesSectionTitle: string;
  servicesSectionSubtitle: string;
  selectServiceAction: string;
  selectedServiceBadge: string;
  serviceCardFromLabel: string;
  serviceCardTransferNote: string;

  pricingSectionEyebrow: string;
  pricingSectionTitle: string;
  pricingSectionSubtitle: string;
  groupSizeSelectorLabel: string;
  groupSizeOptions: {
    id: GroupSizeSelection;
    label: string;
    shortTag: string;
  }[];
  onRequestPriceLabel: string;
  unsupportedGroupNotice: string;
  tableServiceHeader: string;
  tableCol2Pax: string;
  tableCol4Pax: string;
  tableCol6Pax: string;
  tableColCustom: string;
  lunchBannerTitle: string;
  lunchBannerText: string;

  inclusionsSectionEyebrow: string;
  inclusionsSectionTitle: string;
  inclusionsSectionSubtitle: string;
  visitsInclusionsTitle: string;
  visitsInclusionsBadge: string;
  visitsInclusionsList: { key: 'tickets' | 'transport' | 'frGuide'; title: string; detail: string }[];
  transferInclusionsTitle: string;
  transferInclusionsBadge: string;
  transferInclusionsList: { key: 'airportTransport' | 'enArAssist'; title: string; detail: string }[];

  conditionsSectionEyebrow: string;
  conditionsSectionTitle: string;
  conditionsList: { title: string; detail: string }[];

  inquirySectionEyebrow: string;
  inquirySectionTitle: string;
  inquirySectionSubtitle: string;
  formServiceLabel: string;
  formGroupSizeLabel: string;
  formLunchToggleLabel: string;
  formLunchToggleHint: string;
  formLunchTransferNotApplicable: string;
  formPreferredDateLabel: string;
  formDateAfter2026Warning: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formNotesLabel: string;
  formNotesPlaceholder: string;
  formSubmitBtn: string;
  formNoAutoConfirmNote: string;
  validationNameRequired: string;
  validationPhoneRequired: string;

  quoteBoxEyebrow: string;
  quoteBoxTitle: string;
  quoteBasePerPersonLabel: string;
  quoteOptionalLunchLabel: string;
  quoteTotalPerPersonLabel: string;
  quoteEstimatedGroupTotalLabel: string;
  quoteTravelersSuffix: string;
  quoteCustomStatusTitle: string;
  quoteCustomStatusText: string;
  quoteExpiredStatusTitle: string;
  quoteExpiredStatusText: string;
  quoteConditionsFooterNote: string;

  readyTitle: string;
  readySubtitle: string;
  readySummaryService: string;
  readySummaryGroup: string;
  readySummaryLunch: string;
  readySummaryLunchYes: string;
  readySummaryLunchNo: string;
  readySummaryLunchNA: string;
  readySummaryDate: string;
  readySummaryRate: string;
  readyWhatsappBtn: string;
  readyEditBtn: string;

  advisorLabel: string;
  advisorTitle: string;
  advisorWhatsappDirect: string;
  advisorCallBtn: string;
  advisorMapsBtn: string;
}

export const EGYPT_EXCURSIONS_COPY: Record<Language, EgyptExcursionsLocaleCopy> = {
  fr: {
    showcaseCardTitle: 'Transferts et excursions en Égypte',
    showcaseArabicTitle: 'خدمة النقل و المزارات',
    showcaseSubtitle: 'Service de transport et de visites touristiques · Le Caire & Alexandrie',
    showcaseDestination: 'Égypte',
    showcaseStartingFromLabel: 'À partir de',
    showcaseStartingPrice: '20 USD / pers.',
    showcaseStartingScopeNote: 'Tarif à 20 USD valable uniquement pour le transfert aéroport (6 personnes)',
    showcaseDescription: 'Transferts aéroport et excursions touristiques guidées en Égypte',
    showcaseHighlights: [
      '6 prestations tarifées pour 2, 4 ou 6 voyageurs (autres tailles : tarif sur demande)',
      'Visites avec billets d’entrée, transport hôtel A/R & guide local francophone',
      'Transfert aéroport avec assistance anglophone / arabophone',
      'Supplément déjeuner optionnel (+25 USD / pers., non inclus par défaut) · Valable jusqu’au 31/12/2026'
    ],
    showcaseValidityTag: 'Minimum 2 voyageurs · Tarifs USD valables jusqu’au 31 déc. 2026',
    showcaseViewExcursionsBtn: 'Voir les excursions',
    showcaseReserveBtn: 'Demander une réservation',

    backToToursLabel: 'Retour aux Circuits',
    backToHomeLabel: 'Retour à l’accueil',
    heroEyebrow: 'Service de transport et de visites touristiques',
    pageTitle: 'Transferts et excursions en Égypte',
    officialSubtitle: 'Service officiel Golden Group Travels · Transferts aéroport & excursions privées ou en petit groupe',
    arabicTitle: 'خدمة النقل و المزارات',
    destinationBadge: 'Égypte · Le Caire, Gizeh & Alexandrie',
    validityBadge: 'Valable jusqu’au 31 décembre 2026 · Min. 2 voyageurs',
    heroStartingScopeHeadline: 'À partir de 20 USD / pers. — s’applique uniquement au transfert aéroport pour 6 personnes',
    heroViewExcursionsBtn: 'Voir les excursions',
    heroReserveBtn: 'Demander une réservation',

    servicesSectionEyebrow: 'Catalogue officiel · 6 prestations',
    servicesSectionTitle: 'Choisissez votre transfert ou excursion',
    servicesSectionSubtitle: 'Cliquez sur une prestation pour afficher ses tarifs exacts par taille de groupe et préparer votre demande de réservation.',
    selectServiceAction: 'Sélectionner cette prestation',
    selectedServiceBadge: 'Sélectionnée',
    serviceCardFromLabel: 'Dès',
    serviceCardTransferNote: '6 pers.',

    pricingSectionEyebrow: 'Grille tarifaire officielle en USD',
    pricingSectionTitle: 'Comparatif transparent par nombre de voyageurs',
    pricingSectionSubtitle: 'Tous les prix ci-dessous sont exprimés en USD par personne. Pour toute taille de groupe différente de 2, 4 ou 6 voyageurs, le tarif est établi sur demande.',
    groupSizeSelectorLabel: 'Nombre de voyageurs :',
    groupSizeOptions: [
      { id: 2, label: '2 personnes', shortTag: '2 pers.' },
      { id: 4, label: '4 personnes', shortTag: '4 pers.' },
      { id: 6, label: '6 personnes', shortTag: '6 pers.' },
      { id: 'custom', label: 'Autre taille (1, 3, 5, 7+)', shortTag: 'Sur demande' }
    ],
    onRequestPriceLabel: 'Tarif sur demande',
    unsupportedGroupNotice: 'Les tarifs publiés s’appliquent exactement aux groupes de 2, 4 ou 6 voyageurs (minimum 2 voyageurs). Pour un autre effectif, nos conseillers établissent un devis personnalisé — Tarif sur demande.',
    tableServiceHeader: 'Prestation',
    tableCol2Pax: '2 personnes',
    tableCol4Pax: '4 personnes',
    tableCol6Pax: '6 personnes',
    tableColCustom: 'Autre taille',
    lunchBannerTitle: 'Supplément déjeuner optionnel : 25 USD / personne',
    lunchBannerText: 'Le déjeuner reste strictement optionnel (+25 USD / personne) et n’est jamais inclus automatiquement dans les tarifs de base ci-dessus.',

    inclusionsSectionEyebrow: 'Détail des prestations incluses',
    inclusionsSectionTitle: 'Ce qui est inclus selon le type de service',
    inclusionsSectionSubtitle: 'Golden Group Travels distingue clairement l’encadrement des visites guidées et l’assistance dédiée aux transferts aéroport.',
    visitsInclusionsTitle: 'Excursions et visites touristiques',
    visitsInclusionsBadge: '5 circuits de visite',
    visitsInclusionsList: [
      {
        key: 'tickets',
        title: 'Droits d’entrée aux sites mentionnés',
        detail: 'Billets d’accès inclus pour chaque monument ou musée indiqué au programme de l’excursion choisie.'
      },
      {
        key: 'transport',
        title: 'Transport aller-retour depuis et vers l’hôtel',
        detail: 'Prise en charge et retour à votre hôtel dans un véhicule touristique climatisé adapté à la taille de votre groupe.'
      },
      {
        key: 'frGuide',
        title: 'Guide local francophone pendant les visites',
        detail: 'Accompagnement culturel assuré par un guide local francophone durant toutes les excursions.'
      }
    ],
    transferInclusionsTitle: 'Transfert aéroport',
    transferInclusionsBadge: 'Service d’accueil',
    transferInclusionsList: [
      {
        key: 'airportTransport',
        title: 'Transfert privé aéroport ↔ hôtel',
        detail: 'Liaison confortable et ponctuelle entre l’aéroport international du Caire et votre établissement hôtelier.'
      },
      {
        key: 'enArAssist',
        title: 'Assistance anglophone ou arabophone',
        detail: 'Accueil et coordination assurés par notre représentant anglophone ou arabophone (sans guide francophone sur ce transfert).'
      }
    ],

    conditionsSectionEyebrow: 'Conditions officielles d’application',
    conditionsSectionTitle: 'Conditions tarifaires importantes',
    conditionsList: [
      {
        title: 'Tarifs par personne en USD',
        detail: 'Tous les prix affichés sont libellés en dollars américains (USD) par voyageur, hors supplément déjeuner optionnel (+25 USD / pers.).'
      },
      {
        title: 'Minimum 2 voyageurs',
        detail: 'La grille officielle s’applique à partir de 2 voyageurs minimum, avec des paliers publiés pour 2, 4 et 6 personnes.'
      },
      {
        title: 'Validité jusqu’au 31 décembre 2026',
        detail: 'Ces tarifs annoncés sont valables uniquement jusqu’au 31 décembre 2026 et ne sont pas garantis au-delà de cette date.'
      },
      {
        title: 'Clause de révision gouvernementale',
        detail: 'Les tarifs peuvent être révisés en cas de hausse décidée par les autorités concernant les frais de transport, les droits d’entrée des sites, les taxes ou toute charge officielle obligatoire.'
      }
    ],

    inquirySectionEyebrow: 'Devis & Réservation directe',
    inquirySectionTitle: 'Demander une réservation',
    inquirySectionSubtitle: 'Préparez votre demande personnalisée. Nos conseillers à Salé confirment les disponibilités avant toute validation.',
    formServiceLabel: 'Service ou excursion souhaité',
    formGroupSizeLabel: 'Nombre de voyageurs',
    formLunchToggleLabel: 'Ajouter le supplément déjeuner optionnel (+25 USD / personne)',
    formLunchToggleHint: 'Option facultative non incluse dans le prix de base.',
    formLunchTransferNotApplicable: 'Le supplément déjeuner s’applique aux excursions guidées (non applicable au transfert aéroport seul).',
    formPreferredDateLabel: 'Date souhaitée (jusqu’au 31/12/2026 pour tarif publié)',
    formDateAfter2026Warning: 'Date postérieure au 31 décembre 2026 : les tarifs publiés étant valables jusqu’au 31/12/2026, le tarif pour cette date sera confirmé sur demande.',
    formNameLabel: 'Nom complet',
    formNamePlaceholder: 'Votre nom et prénom',
    formPhoneLabel: 'Téléphone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Précisions complémentaires (hôtel, horaire de vol, autre effectif…)',
    formNotesPlaceholder: 'Ex. Nom de l’hôtel au Caire, heure d’arrivée ou précisions groupe…',
    formSubmitBtn: 'Préparer ma demande WhatsApp',
    formNoAutoConfirmNote: 'Aucune réservation ni disponibilité n’est confirmée automatiquement en ligne ; l’équipe Golden Group Travels vérifie chaque demande.',
    validationNameRequired: 'Veuillez saisir votre nom complet.',
    validationPhoneRequired: 'Veuillez indiquer votre numéro de téléphone ou WhatsApp.',

    quoteBoxEyebrow: 'Récapitulatif tarifaire',
    quoteBoxTitle: 'Estimation transparente',
    quoteBasePerPersonLabel: 'Tarif de base / personne',
    quoteOptionalLunchLabel: 'Supplément déjeuner optionnel',
    quoteTotalPerPersonLabel: 'Total estimé / personne',
    quoteEstimatedGroupTotalLabel: 'Total estimé du groupe',
    quoteTravelersSuffix: 'pers.',
    quoteCustomStatusTitle: 'Tarif sur demande',
    quoteCustomStatusText: 'Effectif différent de 2, 4 ou 6 personnes : nos conseillers calculent le tarif exact selon la taille de votre groupe.',
    quoteExpiredStatusTitle: 'Tarif sur demande (après le 31/12/2026)',
    quoteExpiredStatusText: 'Les tarifs publiés expirent le 31 décembre 2026. Demandez une cotation actualisée auprès de notre agence.',
    quoteConditionsFooterNote: 'Validité : 31 déc. 2026 · Sous réserve de révision des taxes, transports ou droits d’entrée gouvernementaux.',

    readyTitle: 'Demande prête à être envoyée',
    readySubtitle: 'Votre sélection est résumée ci-dessous. Cliquez sur le bouton WhatsApp pour la transmettre directement à notre agence à Salé.',
    readySummaryService: 'Prestation',
    readySummaryGroup: 'Voyageurs',
    readySummaryLunch: 'Déjeuner optionnel (+25 USD)',
    readySummaryLunchYes: 'Inclus (+25 USD / pers.)',
    readySummaryLunchNo: 'Non sélectionné',
    readySummaryLunchNA: 'Non applicable (transfert)',
    readySummaryDate: 'Date souhaitée',
    readySummaryRate: 'Tarif indicatif',
    readyWhatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    readyEditBtn: 'Modifier ma sélection',

    advisorLabel: 'Agence Golden Group Travels · Salé',
    advisorTitle: 'Assistance & réservation rapide',
    advisorWhatsappDirect: 'WhatsApp direct',
    advisorCallBtn: 'Appeler l’agence',
    advisorMapsBtn: 'Localiser sur Google Maps'
  },

  ar: {
    showcaseCardTitle: 'التنقلات والجولات السياحية في مصر',
    showcaseArabicTitle: 'خدمة النقل و المزارات',
    showcaseSubtitle: 'خدمة النقل والمزارات السياحية · القاهرة والإسكندرية',
    showcaseDestination: 'مصر',
    showcaseStartingFromLabel: 'ابتداءً من',
    showcaseStartingPrice: '20 USD / للشخص',
    showcaseStartingScopeNote: 'سعر 20 USD ينطبق حصرياً على خدمة النقل من/إلى المطار لـ 6 مسافرين',
    showcaseDescription: 'خدمات النقل من المطار والجولات السياحية المصحوبة بمرشدين في مصر',
    showcaseHighlights: [
      '6 خدمات بأسعار محددة لـ 2 أو 4 أو 6 مسافرين (الأعداد الأخرى: السعر عند الطلب)',
      'المزارات تشمل تذاكر الدخول، النقل الفندقي ومرشد محلي ناطق بالفرنسية',
      'نقل المطار مع مساعدة باللغتين الإنجليزية والعربية',
      'إضافة غداء اختيارية (+25 USD / شخص، غير مشمولة تلقائياً) · صالحة حتى 31 ديسمبر 2026'
    ],
    showcaseValidityTag: 'الحد الأدنى مسافران · الأسعار بالـ USD صالحة حتى 31 ديسمبر 2026',
    showcaseViewExcursionsBtn: 'عرض المزارات',
    showcaseReserveBtn: 'طلب حجز',

    backToToursLabel: 'العودة إلى الجولات',
    backToHomeLabel: 'العودة إلى الرئيسية',
    heroEyebrow: 'خدمة النقل و المزارات السياحية',
    pageTitle: 'خدمة النقل والمزارات في مصر',
    officialSubtitle: 'الخدمة الرسمية لدى Golden Group Travels · تنقلات المطار وجولات خاصة أو لمجموعات صغيرة',
    arabicTitle: 'خدمة النقل و المزارات',
    destinationBadge: 'مصر · القاهرة، الجيزة والإسكندرية',
    validityBadge: 'صالح حتى 31 ديسمبر 2026 · الحد الأدنى 2 مسافرين',
    heroStartingScopeHeadline: 'ابتداءً من 20 USD / للشخص — ينطبق حصرياً على نقل المطار لـ 6 مسافرين',
    heroViewExcursionsBtn: 'عرض المزارات',
    heroReserveBtn: 'طلب حجز',

    servicesSectionEyebrow: 'الخدمات المتوفرة · 6 خيارات',
    servicesSectionTitle: 'اختر خدمة النقل أو الجولة السياحية',
    servicesSectionSubtitle: 'اضغط على أي خدمة لعرض أسعارها الدقيقة حسب عدد المسافرين وإعداد طلب الحجز.',
    selectServiceAction: 'اختيار هذه الخدمة',
    selectedServiceBadge: 'محددة',
    serviceCardFromLabel: 'ابتداءً من',
    serviceCardTransferNote: '6 مسافرين',

    pricingSectionEyebrow: 'جدول الأسعار الرسمي بالدولار الأمريكي',
    pricingSectionTitle: 'مقارنة واضحة حسب عدد المسافرين',
    pricingSectionSubtitle: 'جميع الأسعار بالدولار الأمريكي (USD) للشخص الواحد. لأي عدد مختلف عن 2 أو 4 أو 6 مسافرين، يتم تحديد السعر عند الطلب.',
    groupSizeSelectorLabel: 'عدد المسافرين:',
    groupSizeOptions: [
      { id: 2, label: 'مسافران (2)', shortTag: '2 أشخاص' },
      { id: 4, label: '4 مسافرين', shortTag: '4 أشخاص' },
      { id: 6, label: '6 مسافرين', shortTag: '6 أشخاص' },
      { id: 'custom', label: 'عدد آخر (1، 3، 5، 7+)', shortTag: 'عند الطلب' }
    ],
    onRequestPriceLabel: 'السعر عند الطلب',
    unsupportedGroupNotice: 'الأسعار المنشورة مخصصة لمجموعات 2 أو 4 أو 6 مسافرين (الحد الأدنى مسافران). لأي عدد آخر، يتم تقديم السعر عند الطلب.',
    tableServiceHeader: 'الخدمة',
    tableCol2Pax: 'شخصان (2)',
    tableCol4Pax: '4 أشخاص',
    tableCol6Pax: '6 أشخاص',
    tableColCustom: 'عدد آخر',
    lunchBannerTitle: 'مكمل الغداء الاختياري: 25 USD / للشخص',
    lunchBannerText: 'وجبة الغداء خيار إضافي (+25 USD / شخص) ولا تُضاف تلقائياً إلى الأسعار الأساسية.',

    inclusionsSectionEyebrow: 'تفاصيل الخدمات المشمولة',
    inclusionsSectionTitle: 'ما يشمله السعر حسب نوع الخدمة',
    inclusionsSectionSubtitle: 'توضح Golden Group Travels الفرق بين مرافقة الجولات السياحية والمساعدة الخاصة بنقل المطار.',
    visitsInclusionsTitle: 'الجولات والمزارات السياحية',
    visitsInclusionsBadge: '5 جولات سياحية',
    visitsInclusionsList: [
      {
        key: 'tickets',
        title: 'رسوم الدخول إلى المعالم المذكورة',
        detail: 'تذاكر الدخول مشمولة لجميع المواقع والمتاحف الواردة في برنامج الجولة المختارة.'
      },
      {
        key: 'transport',
        title: 'النقل ذهاباً وإياباً من وإلى الفندق',
        detail: 'تنقل مريح ومكيف من باب الفندق وإليه طوال فترة الجولة.'
      },
      {
        key: 'frGuide',
        title: 'مرشد محلي ناطق بالفرنسية أثناء الزيارات',
        detail: 'مرافقة ثقافية طوال المزارات مع مرشد محلي ناطق بالفرنسية.'
      }
    ],
    transferInclusionsTitle: 'نقل المطار',
    transferInclusionsBadge: 'خدمة الاستقبال',
    transferInclusionsList: [
      {
        key: 'airportTransport',
        title: 'نقل خاص بين المطار والفندق',
        detail: 'تنقل مباشر وموثوق بين مطار القاهرة الدولي وفندق الإقامة.'
      },
      {
        key: 'enArAssist',
        title: 'مساعدة باللغتين الإنجليزية أو العربية',
        detail: 'استقبال ومساعدة عبر مندوب ناطق بالإنجليزية أو العربية (لا يشمل مرشداً فرنسياً).'
      }
    ],

    conditionsSectionEyebrow: 'الشروط التعاقدية الرسمية',
    conditionsSectionTitle: 'شروط مهمة للأسعار',
    conditionsList: [
      {
        title: 'الأسعار للشخص الواحد بعملة USD',
        detail: 'جميع التعريفات المعروضة بالدولار الأمريكي للشخص الواحد ولا تشمل الغداء الاختياري (+25 USD).'
      },
      {
        title: 'الحد الأدنى للمجموعة: مسافران',
        detail: 'يشترط حد أدنى لمسافرين اثنين، وتنطبق الجداول المعلنة على 2 أو 4 أو 6 مسافرين.'
      },
      {
        title: 'الصلاحية حتى 31 ديسمبر 2026',
        detail: 'هذه الأسعار صالحة لغاية 31 ديسمبر 2026 فقط ولا تُضمن بعد هذا التاريخ.'
      },
      {
        title: 'شرط المراجعة عند الزيادات الحكومية',
        detail: 'تخضع الأسعار للمراجعة في حال فرض زيادات حكومية على تكاليف النقل، رسوم دخول المزارات، الضرائب أو أي رسوم إلزامية أخرى.'
      }
    ],

    inquirySectionEyebrow: 'طلب عرض سعر وحجز',
    inquirySectionTitle: 'اطلب حجزك الآن',
    inquirySectionSubtitle: 'جهّز تفاصيل رحلتك للتواصل مباشرة مع مستشارينا في سلا وتأكيد التوفر.',
    formServiceLabel: 'الخدمة المطلوبة',
    formGroupSizeLabel: 'عدد المسافرين',
    formLunchToggleLabel: 'إضافة وجبة الغداء الاختيارية (+25 USD / شخص)',
    formLunchToggleHint: 'إضافة اختيارية غير مدمجة في السعر الأساسي.',
    formLunchTransferNotApplicable: 'خيار الغداء ينطبق على الجولات السياحية وليس على نقل المطار فقط.',
    formPreferredDateLabel: 'التاريخ المفضل (حتى 31/12/2026 للأسعار المعلنة)',
    formDateAfter2026Warning: 'التاريخ بعد 31 ديسمبر 2026: الأسعار المعلنة صالحة حتى 31/12/2026 فقط وسيتم تأكيد السعر عند الطلب.',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'الاسم والنسب',
    formPhoneLabel: 'رقم الهاتف / واتساب',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'ملاحظات إضافية (الفندق، موعد الرحلة...)',
    formNotesPlaceholder: 'اسم الفندق أو تفاصيل إضافية...',
    formSubmitBtn: 'تجهيز طلب الواتساب',
    formNoAutoConfirmNote: 'لا يتم تأكيد الحجز أو التوفر تلقائياً عبر الموقع؛ يتحقق مستشارو الوكالة من كل طلب.',
    validationNameRequired: 'يرجى إدخال الاسم الكامل.',
    validationPhoneRequired: 'يرجى إدخال رقم الهاتف أو الواتساب.',

    quoteBoxEyebrow: 'ملخص التكلفة',
    quoteBoxTitle: 'تقدير شفاف',
    quoteBasePerPersonLabel: 'السعر الأساسي / للشخص',
    quoteOptionalLunchLabel: 'مكمل الغداء الاختياري',
    quoteTotalPerPersonLabel: 'الإجمالي التقديري / للشخص',
    quoteEstimatedGroupTotalLabel: 'الإجمالي التقديري للمجموعة',
    quoteTravelersSuffix: 'أشخاص',
    quoteCustomStatusTitle: 'السعر عند الطلب',
    quoteCustomStatusText: 'العدد مختلف عن 2 أو 4 أو 6 أشخاص: سيقوم فريقنا بإعداد تسعيرة مخصصة لعددكم.',
    quoteExpiredStatusTitle: 'السعر عند الطلب (بعد 31/12/2026)',
    quoteExpiredStatusText: 'تنتهي صلاحية الأسعار المعلنة في 31 ديسمبر 2026. اطلب عرضاً محدثاً.',
    quoteConditionsFooterNote: 'صالح حتى 31 ديسمبر 2026 · خاضع للمراجعة عند أي زيادة حكومية في النقل أو التذاكر أو الضرائب.',

    readyTitle: 'الطلب جاهز للإرسال',
    readySubtitle: 'اضغط على زر واتساب لإرسال تفاصيل اختيارك مباشرة إلى وكالتنا في سلا.',
    readySummaryService: 'الخدمة',
    readySummaryGroup: 'عدد المسافرين',
    readySummaryLunch: 'الغداء الاختياري (+25 USD)',
    readySummaryLunchYes: 'مشمول (+25 USD / شخص)',
    readySummaryLunchNo: 'غير مضاف',
    readySummaryLunchNA: 'غير مطبق (نقل مطار)',
    readySummaryDate: 'التاريخ المفضل',
    readySummaryRate: 'السعر التقديري',
    readyWhatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    readyEditBtn: 'تعديل الاختيار',

    advisorLabel: 'وكالة Golden Group Travels · سلا',
    advisorTitle: 'مساعدة وحجز سريع',
    advisorWhatsappDirect: 'واتساب مباشر',
    advisorCallBtn: 'الاتصال بالوكالة',
    advisorMapsBtn: 'الموقع على الخريطة'
  },

  en: {
    showcaseCardTitle: 'Egypt Transfers & Excursions',
    showcaseArabicTitle: 'خدمة النقل و المزارات',
    showcaseSubtitle: 'Transport and Sightseeing Service · Cairo & Alexandria',
    showcaseDestination: 'Egypt',
    showcaseStartingFromLabel: 'Starting from',
    showcaseStartingPrice: '20 USD / person',
    showcaseStartingScopeNote: '20 USD rate applies ONLY to airport transfer for 6 travelers',
    showcaseDescription: 'Airport transfers and guided tourist excursions in Egypt',
    showcaseHighlights: [
      '6 priced services for 2, 4 or 6 travelers (other group sizes: Price on request)',
      'Sightseeing visits include entrance fees, round-trip hotel transport & local French-speaking guide',
      'Airport transfer includes English- or Arabic-speaking assistance',
      'Optional lunch supplement (+25 USD/person, never auto-included) · Valid until Dec 31, 2026'
    ],
    showcaseValidityTag: 'Minimum 2 travelers · USD rates valid until Dec 31, 2026',
    showcaseViewExcursionsBtn: 'View excursions',
    showcaseReserveBtn: 'Request booking',

    backToToursLabel: 'Back to Tours',
    backToHomeLabel: 'Back to Home',
    heroEyebrow: 'Transport and Sightseeing Service',
    pageTitle: 'Egypt Transfers & Excursions',
    officialSubtitle: 'Official Golden Group Travels Service · Airport transfers & guided sightseeing excursions',
    arabicTitle: 'خدمة النقل و المزارات',
    destinationBadge: 'Egypt · Cairo, Giza & Alexandria',
    validityBadge: 'Valid until December 31, 2026 · Min. 2 travelers',
    heroStartingScopeHeadline: 'From 20 USD / person — applies exclusively to the Airport Transfer for 6 travelers',
    heroViewExcursionsBtn: 'View excursions',
    heroReserveBtn: 'Request booking',

    servicesSectionEyebrow: 'Official Catalog · 6 Services',
    servicesSectionTitle: 'Select your transfer or guided excursion',
    servicesSectionSubtitle: 'Select any option to inspect exact per-person USD rates by group size and prepare your booking request.',
    selectServiceAction: 'Select this service',
    selectedServiceBadge: 'Selected',
    serviceCardFromLabel: 'From',
    serviceCardTransferNote: '6 pax',

    pricingSectionEyebrow: 'Official USD Pricing Matrix',
    pricingSectionTitle: 'Transparent comparison by group size',
    pricingSectionSubtitle: 'All prices are in USD per person. For any group size other than 2, 4, or 6 travelers, rates are confirmed as Price on request.',
    groupSizeSelectorLabel: 'Travelers count:',
    groupSizeOptions: [
      { id: 2, label: '2 people', shortTag: '2 pax' },
      { id: 4, label: '4 people', shortTag: '4 pax' },
      { id: 6, label: '6 people', shortTag: '6 pax' },
      { id: 'custom', label: 'Other size (1, 3, 5, 7+)', shortTag: 'On request' }
    ],
    onRequestPriceLabel: 'Price on request',
    unsupportedGroupNotice: 'Published pricing covers groups of 2, 4, or 6 travelers (minimum 2 travelers). For any other group size, our advisors provide a Price on request.',
    tableServiceHeader: 'Service',
    tableCol2Pax: '2 people',
    tableCol4Pax: '4 people',
    tableCol6Pax: '6 people',
    tableColCustom: 'Other size',
    lunchBannerTitle: 'Optional lunch supplement: 25 USD / person',
    lunchBannerText: 'Lunch is strictly optional (+25 USD / person) and is never automatically included in the base excursion prices.',

    inclusionsSectionEyebrow: 'Service Inclusions',
    inclusionsSectionTitle: 'What is included per service type',
    inclusionsSectionSubtitle: 'We clearly separate sightseeing excursion inclusions from airport transfer assistance.',
    visitsInclusionsTitle: 'Guided Excursions & Visits',
    visitsInclusionsBadge: '5 sightseeing excursions',
    visitsInclusionsList: [
      {
        key: 'tickets',
        title: 'Entrance fees to the mentioned attractions',
        detail: 'Site and museum tickets included for every monument listed in your chosen excursion itinerary.'
      },
      {
        key: 'transport',
        title: 'Round-trip hotel transportation',
        detail: 'Air-conditioned tourist transport with pickup and drop-off at your hotel.'
      },
      {
        key: 'frGuide',
        title: 'Local French-speaking guide during visits',
        detail: 'Dedicated local French-speaking guide accompanying your group during sightseeing visits.'
      }
    ],
    transferInclusionsTitle: 'Airport Transfer',
    transferInclusionsBadge: 'Arrival / Departure',
    transferInclusionsList: [
      {
        key: 'airportTransport',
        title: 'Private airport ↔ hotel transfer',
        detail: 'Direct, punctual transfer between Cairo Airport and your hotel.'
      },
      {
        key: 'enArAssist',
        title: 'English- or Arabic-speaking assistance',
        detail: 'Meet-and-assist provided by English- or Arabic-speaking staff (no French-speaking guide on airport transfers).'
      }
    ],

    conditionsSectionEyebrow: 'Official Conditions',
    conditionsSectionTitle: 'Important terms & pricing validity',
    conditionsList: [
      {
        title: 'Prices per person in USD',
        detail: 'All published prices are per traveler in US Dollars (USD), excluding the optional 25 USD/person lunch supplement.'
      },
      {
        title: 'Minimum 2 travelers',
        detail: 'Minimum group size is 2 travelers, with exact published rates for 2, 4, and 6 travelers.'
      },
      {
        title: 'Valid until December 31, 2026',
        detail: 'Advertised rates remain valid through December 31, 2026 and are not guaranteed past that date.'
      },
      {
        title: 'Government fee & cost revision clause',
        detail: 'Prices may be revised if government-imposed transportation costs, attraction admission fees, taxes, or other mandatory charges increase.'
      }
    ],

    inquirySectionEyebrow: 'Quote & Booking Request',
    inquirySectionTitle: 'Request a booking',
    inquirySectionSubtitle: 'Prepare your reservation details. Our Salé team verifies availability prior to confirming any service.',
    formServiceLabel: 'Selected service',
    formGroupSizeLabel: 'Group size',
    formLunchToggleLabel: 'Add optional lunch supplement (+25 USD / person)',
    formLunchToggleHint: 'Opt-in only — never included by default.',
    formLunchTransferNotApplicable: 'Optional lunch supplement applies to excursion visits only.',
    formPreferredDateLabel: 'Preferred date (published rates valid through Dec 31, 2026)',
    formDateAfter2026Warning: 'Selected date is after December 31, 2026: published rates are valid until Dec 31, 2026 only; pricing will be quoted on request.',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'Your full name',
    formPhoneLabel: 'Phone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Additional notes (hotel name, flight schedule, exact party size…)',
    formNotesPlaceholder: 'Cairo hotel name, arrival flight number, custom group details…',
    formSubmitBtn: 'Prepare WhatsApp inquiry',
    formNoAutoConfirmNote: 'No booking or availability is confirmed automatically online; Golden Group Travels verifies every request manually.',
    validationNameRequired: 'Please enter your full name.',
    validationPhoneRequired: 'Please enter your phone or WhatsApp number.',

    quoteBoxEyebrow: 'Rate Breakdown',
    quoteBoxTitle: 'Transparent estimate',
    quoteBasePerPersonLabel: 'Base rate / person',
    quoteOptionalLunchLabel: 'Optional lunch supplement',
    quoteTotalPerPersonLabel: 'Estimated total / person',
    quoteEstimatedGroupTotalLabel: 'Estimated group total',
    quoteTravelersSuffix: 'pax',
    quoteCustomStatusTitle: 'Price on request',
    quoteCustomStatusText: 'For group sizes other than 2, 4, or 6 travelers, our team provides a tailored quote.',
    quoteExpiredStatusTitle: 'Price on request (after Dec 31, 2026)',
    quoteExpiredStatusText: 'Advertised rates expire December 31, 2026. Request an updated quote.',
    quoteConditionsFooterNote: 'Valid until Dec 31, 2026 · Subject to government-imposed transport, admission or tax revisions.',

    readyTitle: 'Booking inquiry ready',
    readySubtitle: 'Click below to send your complete request via WhatsApp to our Salé travel advisors.',
    readySummaryService: 'Service',
    readySummaryGroup: 'Group size',
    readySummaryLunch: 'Optional lunch (+25 USD)',
    readySummaryLunchYes: 'Added (+25 USD / pers.)',
    readySummaryLunchNo: 'Not selected',
    readySummaryLunchNA: 'N/A (transfer)',
    readySummaryDate: 'Preferred date',
    readySummaryRate: 'Indicative rate',
    readyWhatsappBtn: 'Send via WhatsApp (0666-484815)',
    readyEditBtn: 'Edit selection',

    advisorLabel: 'Golden Group Travels · Salé Agency',
    advisorTitle: 'Direct support & booking',
    advisorWhatsappDirect: 'Direct WhatsApp',
    advisorCallBtn: 'Call agency',
    advisorMapsBtn: 'Locate on Google Maps'
  },

  es: {
    showcaseCardTitle: 'Traslados y excursiones en Egipto',
    showcaseArabicTitle: 'خدمة النقل و المزارات',
    showcaseSubtitle: 'Servicio de transporte y visitas turísticas · El Cairo y Alejandría',
    showcaseDestination: 'Egipto',
    showcaseStartingFromLabel: 'Desde',
    showcaseStartingPrice: '20 USD / pers.',
    showcaseStartingScopeNote: 'Tarifa de 20 USD válida únicamente para traslado aeropuerto (6 viajeros)',
    showcaseDescription: 'Traslados al aeropuerto y excursiones turísticas guiadas en Egipto',
    showcaseHighlights: [
      '6 servicios tarifados para 2, 4 o 6 viajeros (otros tamaños: Precio bajo consulta)',
      'Excursiones con entradas, transporte hotel ida/vuelta y guía local francófono',
      'Traslado al aeropuerto con asistencia en inglés o árabe',
      'Suplemento de almuerzo opcional (+25 USD/pers., no incluido por defecto) · Válido hasta el 31/12/2026'
    ],
    showcaseValidityTag: 'Mínimo 2 viajeros · Tarifas USD válidas hasta el 31 dic. 2026',
    showcaseViewExcursionsBtn: 'Ver excursiones',
    showcaseReserveBtn: 'Solicitar reserva',

    backToToursLabel: 'Volver a Circuitos',
    backToHomeLabel: 'Volver al inicio',
    heroEyebrow: 'Servicio de transporte y visitas turísticas',
    pageTitle: 'Traslados y excursiones en Egipto',
    officialSubtitle: 'Servicio oficial Golden Group Travels · Traslados al aeropuerto y visitas guiadas',
    arabicTitle: 'خدمة النقل و المزارات',
    destinationBadge: 'Egipto · El Cairo, Guiza y Alejandría',
    validityBadge: 'Válido hasta el 31 de diciembre de 2026 · Mín. 2 viajeros',
    heroStartingScopeHeadline: 'Desde 20 USD / pers. — válido únicamente para el traslado aeropuerto de 6 viajeros',
    heroViewExcursionsBtn: 'Ver excursiones',
    heroReserveBtn: 'Solicitar reserva',

    servicesSectionEyebrow: 'Catálogo oficial · 6 servicios',
    servicesSectionTitle: 'Seleccione su traslado o excursión',
    servicesSectionSubtitle: 'Haga clic en un servicio para consultar sus tarifas exactas por grupo y preparar su solicitud.',
    selectServiceAction: 'Seleccionar este servicio',
    selectedServiceBadge: 'Seleccionado',
    serviceCardFromLabel: 'Desde',
    serviceCardTransferNote: '6 pers.',

    pricingSectionEyebrow: 'Matriz oficial de tarifas en USD',
    pricingSectionTitle: 'Comparativa clara por tamaño de grupo',
    pricingSectionSubtitle: 'Todos los precios están expresados en USD por persona. Para grupos distintos de 2, 4 o 6 viajeros: Precio bajo consulta.',
    groupSizeSelectorLabel: 'Número de viajeros:',
    groupSizeOptions: [
      { id: 2, label: '2 personas', shortTag: '2 pers.' },
      { id: 4, label: '4 personas', shortTag: '4 pers.' },
      { id: 6, label: '6 personas', shortTag: '6 pers.' },
      { id: 'custom', label: 'Otro tamaño (1, 3, 5, 7+)', shortTag: 'Bajo consulta' }
    ],
    onRequestPriceLabel: 'Precio bajo consulta',
    unsupportedGroupNotice: 'Las tarifas publicadas corresponden exactamente a grupos de 2, 4 o 6 viajeros (mínimo 2). Para otros tamaños, ofrecemos Precio bajo consulta.',
    tableServiceHeader: 'Servicio',
    tableCol2Pax: '2 personas',
    tableCol4Pax: '4 personas',
    tableCol6Pax: '6 personas',
    tableColCustom: 'Otro tamaño',
    lunchBannerTitle: 'Suplemento de almuerzo opcional: 25 USD / persona',
    lunchBannerText: 'El almuerzo es totalmente opcional (+25 USD / persona) y nunca se incluye automáticamente en los precios base.',

    inclusionsSectionEyebrow: 'Detalles incluidos',
    inclusionsSectionTitle: 'Qué incluye cada tipo de servicio',
    inclusionsSectionSubtitle: 'Distinguimos claramente la asistencia del traslado aeroportuario de los servicios incluidos en excursiones guiadas.',
    visitsInclusionsTitle: 'Excursiones y visitas guiadas',
    visitsInclusionsBadge: '5 excursiones',
    visitsInclusionsList: [
      {
        key: 'tickets',
        title: 'Entradas a las atracciones mencionadas',
        detail: 'Boletos de entrada incluidos para los monumentos y museos señalados.'
      },
      {
        key: 'transport',
        title: 'Transporte ida y vuelta desde y hacia el hotel',
        detail: 'Recogida y regreso directo en vehículo turístico climatizado.'
      },
      {
        key: 'frGuide',
        title: 'Guía local francófono durante las visitas',
        detail: 'Acompañamiento cultural con guía local francófono en las excursiones.'
      }
    ],
    transferInclusionsTitle: 'Traslado al aeropuerto',
    transferInclusionsBadge: 'Recepción aeropuerto',
    transferInclusionsList: [
      {
        key: 'airportTransport',
        title: 'Traslado privado aeropuerto ↔ hotel',
        detail: 'Conexión puntual entre el aeropuerto de El Cairo y su hotel.'
      },
      {
        key: 'enArAssist',
        title: 'Asistencia en inglés o árabe',
        detail: 'Recepción y asistencia por personal de habla inglesa o árabe (sin guía francófono).'
      }
    ],

    conditionsSectionEyebrow: 'Condiciones oficiales',
    conditionsSectionTitle: 'Condiciones tarifarias importantes',
    conditionsList: [
      {
        title: 'Precios por persona en USD',
        detail: 'Todas las tarifas son por viajero en dólares estadounidenses (USD), sin incluir el almuerzo opcional de 25 USD.'
      },
      {
        title: 'Grupo mínimo de 2 viajeros',
        detail: 'Mínimo 2 viajeros, con tarifas publicadas para grupos de 2, 4 y 6 personas.'
      },
      {
        title: 'Válido hasta el 31 de diciembre de 2026',
        detail: 'Las tarifas anunciadas son válidas hasta el 31 de diciembre de 2026.'
      },
      {
        title: 'Cláusula de revisión gubernamental',
        detail: 'Los precios pueden revisarse si aumentan los costos de transporte, entradas, impuestos u otros cargos gubernamentales obligatorios.'
      }
    ],

    inquirySectionEyebrow: 'Solicitud de presupuesto',
    inquirySectionTitle: 'Solicitar una reserva',
    inquirySectionSubtitle: 'Prepare su consulta para que nuestros asesores en Salé verifiquen disponibilidad.',
    formServiceLabel: 'Servicio deseado',
    formGroupSizeLabel: 'Número de viajeros',
    formLunchToggleLabel: 'Añadir suplemento de almuerzo opcional (+25 USD / pers.)',
    formLunchToggleHint: 'Opcional; nunca incluido automáticamente en la tarifa base.',
    formLunchTransferNotApplicable: 'El suplemento de almuerzo aplica solo a las excursiones guiadas.',
    formPreferredDateLabel: 'Fecha deseada (tarifas vigentes hasta 31/12/2026)',
    formDateAfter2026Warning: 'Fecha posterior al 31 de diciembre de 2026: las tarifas publicadas aplican hasta esa fecha; confirmaremos cotización bajo consulta.',
    formNameLabel: 'Nombre completo',
    formNamePlaceholder: 'Su nombre completo',
    formPhoneLabel: 'Teléfono / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Notas adicionales (hotel, horario de vuelo, otro tamaño de grupo…)',
    formNotesPlaceholder: 'Nombre del hotel o detalles del grupo...',
    formSubmitBtn: 'Preparar solicitud por WhatsApp',
    formNoAutoConfirmNote: 'No se confirma disponibilidad automáticamente en línea; nuestro equipo revisa cada solicitud.',
    validationNameRequired: 'Por favor, ingrese su nombre completo.',
    validationPhoneRequired: 'Por favor, ingrese su número de teléfono o WhatsApp.',

    quoteBoxEyebrow: 'Desglose tarifario',
    quoteBoxTitle: 'Estimación transparente',
    quoteBasePerPersonLabel: 'Tarifa base / persona',
    quoteOptionalLunchLabel: 'Almuerzo opcional',
    quoteTotalPerPersonLabel: 'Total estimado / persona',
    quoteEstimatedGroupTotalLabel: 'Total estimado del grupo',
    quoteTravelersSuffix: 'pers.',
    quoteCustomStatusTitle: 'Precio bajo consulta',
    quoteCustomStatusText: 'Para tamaños distintos de 2, 4 o 6 personas, preparamos una cotización personalizada.',
    quoteExpiredStatusTitle: 'Precio bajo consulta (tras 31/12/2026)',
    quoteExpiredStatusText: 'Las tarifas publicadas vencen el 31 de diciembre de 2026.',
    quoteConditionsFooterNote: 'Válido hasta 31 dic. 2026 · Sujeto a cambios gubernamentales en transporte, entradas o impuestos.',

    readyTitle: 'Solicitud lista para enviar',
    readySubtitle: 'Haga clic en el botón de WhatsApp para enviar su consulta a nuestra agencia en Salé.',
    readySummaryService: 'Servicio',
    readySummaryGroup: 'Viajeros',
    readySummaryLunch: 'Almuerzo opcional (+25 USD)',
    readySummaryLunchYes: 'Añadido (+25 USD / pers.)',
    readySummaryLunchNo: 'No seleccionado',
    readySummaryLunchNA: 'No aplica (traslado)',
    readySummaryDate: 'Fecha deseada',
    readySummaryRate: 'Tarifa indicativa',
    readyWhatsappBtn: 'Enviar por WhatsApp (0666-484815)',
    readyEditBtn: 'Editar selección',

    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Asistencia directa',
    advisorWhatsappDirect: 'WhatsApp directo',
    advisorCallBtn: 'Llamar a la agencia',
    advisorMapsBtn: 'Ver en Google Maps'
  }
};
