import istanbulSultanahmetImg from '../assets/images/istanbul_sultanahmet_skyline_1795459426302.jpg';
import istanbulBosphorusOrtakoyImg from '../assets/images/istanbul_bosphorus_ortakoy_1795459426829.jpg';
import istanbulCityHeroImg from '../assets/images/city_istanbul_bosphorus_1794664980250.jpg';
import { Language } from '../assets/destinations';

export const ISTANBUL_HOLIDAY_ROUTE = '/sejours/turquie-istanbul';
export const ISTANBUL_HOLIDAY_BACK_ROUTE = '/sejours';

export const ISTANBUL_HOLIDAY_IMAGES = {
  hero: istanbulSultanahmetImg,
  bosphorus: istanbulBosphorusOrtakoyImg,
  overview: istanbulCityHeroImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const ISTANBUL_HOLIDAY_PRICING_META = {
  currencyLabel: 'DH' as const,
  startingPriceMad: 7300, // Strictly Hotel Delta 3★, Triple room, per person
  startingHotelId: 'delta-3' as IstanbulHotelId,
  startingRoomType: 'triple' as IstanbulRoomType,
  vipPackPriceMad: 1480, // Per-person vs per-group basis NOT clarified on poster
  cabinBaggageKg: 10
} as const;

export type IstanbulHotelId = 'delta-3' | 'zagreb-4' | 'ilkbal-deluxe-4';
export type IstanbulRoomType = 'triple' | 'double' | 'single';
export type IstanbulDepartureOptionId = 'dec-05' | 'dec-26';
export type IstanbulBaggageOptionId =
  | 'cabin-only'
  | 'bag-20-outbound'
  | 'bag-20-return'
  | 'bag-20-roundtrip'
  | 'bag-30-ambiguous'
  | 'bag-40-ambiguous';

export interface IstanbulHotelOption {
  id: IstanbulHotelId;
  stars: 3 | 4;
  departureOptionId: IstanbulDepartureOptionId;
  departureDateDisplay: string;
  returnDateConfirmed: boolean;
  returnDateDisplay: Record<Language, string>;
  returnDateDiscrepancyNote?: Record<Language, string>;
  pricesMad: Record<IstanbulRoomType, number>;
  name: Record<Language, string>;
  badge: Record<Language, string>;
}

export const ISTANBUL_HOTELS: readonly IstanbulHotelOption[] = [
  {
    id: 'delta-3',
    stars: 3,
    departureOptionId: 'dec-05',
    departureDateDisplay: '05/12/2026',
    returnDateConfirmed: true,
    returnDateDisplay: {
      fr: '13/12/2026',
      ar: '13/12/2026',
      en: '13/12/2026',
      es: '13/12/2026'
    },
    pricesMad: {
      triple: 7300,
      double: 7700,
      single: 9700
    },
    name: {
      fr: 'Hotel Delta 3★',
      ar: 'فندق دلتا 3★ (Hotel Delta)',
      en: 'Hotel Delta 3★',
      es: 'Hotel Delta 3★'
    },
    badge: {
      fr: 'Tarif d’appel : 7 300 DH (Triple)',
      ar: 'السعر الابتدائي: 7,300 درهم (ثلاثية)',
      en: 'Starting rate: 7,300 DH (Triple)',
      es: 'Tarifa inicial: 7 300 DH (Triple)'
    }
  },
  {
    id: 'zagreb-4',
    stars: 4,
    departureOptionId: 'dec-05',
    departureDateDisplay: '05/12/2026',
    returnDateConfirmed: true,
    returnDateDisplay: {
      fr: '13/12/2026',
      ar: '13/12/2026',
      en: '13/12/2026',
      es: '13/12/2026'
    },
    pricesMad: {
      triple: 7800,
      double: 8200,
      single: 10500
    },
    name: {
      fr: 'Hotel Zagreb 4★',
      ar: 'فندق زغرب 4★ (Hotel Zagreb)',
      en: 'Hotel Zagreb 4★',
      es: 'Hotel Zagreb 4★'
    },
    badge: {
      fr: 'Confort 4★ · Départ 05/12/2026',
      ar: 'فئة 4★ · الذهاب 05/12/2026',
      en: '4★ Comfort · Dep. 05/12/2026',
      es: 'Confort 4★ · Salida 05/12/2026'
    }
  },
  {
    id: 'ilkbal-deluxe-4',
    stars: 4,
    departureOptionId: 'dec-26',
    departureDateDisplay: '26/12/2026',
    returnDateConfirmed: false,
    returnDateDisplay: {
      fr: 'À CONFIRMER (affiche : 01/01/2026)',
      ar: 'يحتاج إلى تأكيد (المطبوع: 01/01/2026)',
      en: 'NEEDS CONFIRMATION (poster: 01/01/2026)',
      es: 'POR CONFIRMAR (cartel: 01/01/2026)'
    },
    returnDateDiscrepancyNote: {
      fr: 'Anomalie détectée sur l’affiche source : la date de retour indiquée est 01/01/2026, antérieure au départ du 26/12/2026. Date de retour réelle à confirmer auprès de l’agence avant publication définitive.',
      ar: 'ملاحظة على الإعلان الأصلي: تاريخ العودة الظاهر هو 01/01/2026 وهو يسبق تاريخ الذهاب 26/12/2026. يجب تأكيد تاريخ العودة الفعلي لدى الوكالة.',
      en: 'Source poster discrepancy: return date appears as 01/01/2026, earlier than the 26/12/2026 departure. Confirm actual return date with the agency.',
      es: 'Inconsistencia en el cartel fuente: muestra regreso 01/01/2026, anterior a la salida 26/12/2026. Requiere confirmación de la agencia.'
    },
    pricesMad: {
      triple: 7800,
      double: 8200,
      single: 10100
    },
    name: {
      fr: 'Hotel Ilkbal Deluxe 4★',
      ar: 'فندق إقبال ديلوكس 4★ (Hotel Ilkbal Deluxe)',
      en: 'Hotel Ilkbal Deluxe 4★',
      es: 'Hotel Ilkbal Deluxe 4★'
    },
    badge: {
      fr: 'Départ 26/12/2026 · Retour à confirmer',
      ar: 'الذهاب 26/12/2026 · العودة قيد التأكيد',
      en: 'Dep. 26/12/2026 · Return needs confirmation',
      es: 'Salida 26/12/2026 · Regreso por confirmar'
    }
  }
] as const;

export interface IstanbulBaggageOption {
  id: IstanbulBaggageOptionId;
  weightKg: number;
  priceMad: number;
  coverageConfirmed: boolean;
  label: Record<Language, string>;
  coverageNote: Record<Language, string>;
}

export const ISTANBUL_BAGGAGE_OPTIONS: readonly IstanbulBaggageOption[] = [
  {
    id: 'cabin-only',
    weightKg: 10,
    priceMad: 0,
    coverageConfirmed: true,
    label: {
      fr: 'Bagage cabine Air Arabia 10 kg aller-retour (inclus dans la base)',
      ar: 'حقيبة مقصورة Air Arabia وزن 10 كغ ذهاباً وإياباً (مشمولة)',
      en: 'Air Arabia 10 kg round-trip cabin baggage (included in base)',
      es: 'Equipaje de cabina Air Arabia 10 kg ida y vuelta (incluido)'
    },
    coverageNote: {
      fr: 'Inclus sans supplément',
      ar: 'مشمول دون تكلفة إضافية',
      en: 'Included at no extra charge',
      es: 'Incluido sin costo adicional'
    }
  },
  {
    id: 'bag-20-outbound',
    weightKg: 20,
    priceMad: 320,
    coverageConfirmed: true,
    label: {
      fr: 'Bagage en soute 20 kg — Aller uniquement',
      ar: 'أمتعة مشحونة 20 كغ — الذهاب فقط',
      en: '20 kg checked baggage — Outbound only',
      es: 'Equipaje facturado 20 kg — Solo ida'
    },
    coverageNote: {
      fr: '320 DH (trajet aller confirmé)',
      ar: '320 درهم (الذهاب محدد)',
      en: '320 DH (outbound leg)',
      es: '320 DH (solo trayecto de ida)'
    }
  },
  {
    id: 'bag-20-return',
    weightKg: 20,
    priceMad: 320,
    coverageConfirmed: true,
    label: {
      fr: 'Bagage en soute 20 kg — Retour uniquement',
      ar: 'أمتعة مشحونة 20 كغ — العودة فقط',
      en: '20 kg checked baggage — Return only',
      es: 'Equipaje facturado 20 kg — Solo regreso'
    },
    coverageNote: {
      fr: '320 DH (trajet retour confirmé)',
      ar: '320 درهم (العودة محددة)',
      en: '320 DH (return leg)',
      es: '320 DH (solo trayecto de vuelta)'
    }
  },
  {
    id: 'bag-20-roundtrip',
    weightKg: 20,
    priceMad: 640,
    coverageConfirmed: true,
    label: {
      fr: 'Bagage en soute 20 kg — Aller-retour',
      ar: 'أمتعة مشحونة 20 كغ — ذهاباً وإياباً',
      en: '20 kg checked baggage — Round trip',
      es: 'Equipaje facturado 20 kg — Ida y vuelta'
    },
    coverageNote: {
      fr: '640 DH (aller-retour confirmé)',
      ar: '640 درهم (ذهاب وعودة)',
      en: '640 DH (round trip)',
      es: '640 DH (ida y vuelta)'
    }
  },
  {
    id: 'bag-30-ambiguous',
    weightKg: 30,
    priceMad: 550,
    coverageConfirmed: false,
    label: {
      fr: 'Bagage en soute 30 kg — 550 DH (couverture trajet à confirmer)',
      ar: 'أمتعة مشحونة 30 كغ — 550 درهم (تغطية المسار قيد التأكيد)',
      en: '30 kg checked baggage — 550 DH (journey coverage unconfirmed)',
      es: 'Equipaje facturado 30 kg — 550 DH (cobertura por confirmar)'
    },
    coverageNote: {
      fr: 'L’affiche indique 550 DH sans préciser aller simple ou aller-retour — à confirmer',
      ar: 'الإعلان يذكر 550 درهم دون تحديد الذهاب فقط أو الذهاب والعودة — يحتاج تأكيداً',
      en: 'Poster states 550 DH without specifying one-way vs round-trip — needs confirmation',
      es: 'El cartel indica 550 DH sin precisar trayecto — pendiente de confirmación'
    }
  },
  {
    id: 'bag-40-ambiguous',
    weightKg: 40,
    priceMad: 720,
    coverageConfirmed: false,
    label: {
      fr: 'Bagage en soute 40 kg — 720 DH (couverture trajet à confirmer)',
      ar: 'أمتعة مشحونة 40 كغ — 720 درهم (تغطية المسار قيد التأكيد)',
      en: '40 kg checked baggage — 720 DH (journey coverage unconfirmed)',
      es: 'Equipaje facturado 40 kg — 720 DH (cobertura por confirmar)'
    },
    coverageNote: {
      fr: 'L’affiche indique 720 DH sans préciser aller simple ou aller-retour — à confirmer',
      ar: 'الإعلان يذكر 720 درهم دون تحديد الذهاب فقط أو الذهاب والعودة — يحتاج تأكيداً',
      en: 'Poster states 720 DH without specifying one-way vs round-trip — needs confirmation',
      es: 'El cartel indica 720 DH sin precisar trayecto — pendiente de confirmación'
    }
  }
] as const;

export interface IstanbulItineraryDay {
  dayNumber: number;
  image: string;
  dayCode: Record<Language, string>;
  title: Record<Language, string>;
  scheduleNote: Record<Language, string>;
  activities: Record<Language, string[]>;
}

export const ISTANBUL_ITINERARY_DAYS: readonly IstanbulItineraryDay[] = [
  {
    dayNumber: 1,
    image: istanbulBosphorusOrtakoyImg,
    dayCode: { fr: 'Jour 1', ar: 'اليوم 1', en: 'Day 1', es: 'Día 1' },
    title: {
      fr: 'Bosphore et Üsküdar',
      ar: 'البوسفور ومنطقة أوسكودار',
      en: 'Bosphorus and Üsküdar',
      es: 'Bósforo y Üsküdar'
    },
    scheduleNote: {
      fr: 'Départ vers 11h00 · Parc Nakkaştepe, Çamlıca, Croisière & Üsküdar',
      ar: 'الانطلاق حوالي الساعة 11:00 · حديقة نقاش تبه، تشامليجا، جولة البوسفور وأوسكودار',
      en: 'Departure around 11:00 · Nakkaştepe Park, Çamlıca, Cruise & Üsküdar',
      es: 'Salida aprox. 11:00 · Parque Nakkaştepe, Çamlıca, Crucero y Üsküdar'
    },
    activities: {
      fr: [
        'Départ vers 11h00 vers le parc panoramique de Nakkaştepe.',
        'Visite de la mosquée de Çamlıca et de la colline de Çamlıca.',
        'Croisière sur le détroit du Bosphore.',
        'Découverte du quartier traditionnel d’Üsküdar.',
        'Temps libre en fin d’après-midi.'
      ],
      ar: [
        'الانطلاق حوالي الساعة 11:00 نحو منتزه نقاش تبه البانورامي.',
        'زيارة جامع تشامليجا وتلة تشامليجا.',
        'جولة بحرية في مضيق البوسفور.',
        'اكتشاف حي أوسكودار التاريخي.',
        'وقت حر.'
      ],
      en: [
        'Departure around 11:00 to Nakkaştepe panoramic park.',
        'Visit to Çamlıca Mosque and Çamlıca Hill.',
        'Bosphorus cruise.',
        'Discovery of the Üsküdar neighborhood.',
        'Free time.'
      ],
      es: [
        'Salida alrededor de las 11:00 hacia el parque Nakkaştepe.',
        'Visita a la Mezquita de Çamlıca y Colina de Çamlıca.',
        'Crucero por el Bósforo.',
        'Recorrido por el barrio de Üsküdar.',
        'Tiempo libre.'
      ]
    }
  },
  {
    dayNumber: 2,
    image: istanbulSultanahmetImg,
    dayCode: { fr: 'Jour 2', ar: 'اليوم 2', en: 'Day 2', es: 'Día 2' },
    title: {
      fr: 'Istanbul Historique et Balat',
      ar: 'إسطنبول التاريخية وحي بلاط',
      en: 'Historic Istanbul and Balat',
      es: 'Estambul Histórico y Balat'
    },
    scheduleNote: {
      fr: 'Départ vers 10h00 · Rive historique, quartiers colorés & Florya',
      ar: 'الانطلاق حوالي الساعة 10:00 · المعالم التاريخية، بلاط وساحل فلوريا',
      en: 'Departure around 10:00 · Old City landmarks, Balat & Florya coast',
      es: 'Salida aprox. 10:00 · Centro histórico, Balat y costa de Florya'
    },
    activities: {
      fr: [
        'Départ vers 10h00.',
        'Visite de la mosquée Süleymaniye.',
        'Place Sultanahmet et Mosquée Bleue.',
        'Parc de Gülhane et quartier d’Eminönü.',
        'Promenade dans le quartier historique de Balat.',
        'Côte de Florya, avec possibilité de visite de l’aquarium ou du centre commercial.'
      ],
      ar: [
        'الانطلاق حوالي الساعة 10:00 صباحاً.',
        'زيارة جامع السليمانية.',
        'ساحة السلطان أحمد والجامع الأزرق.',
        'حديقة جولهانة ومنطقة أمينونو.',
        'جولة في حي بلاط الملون.',
        'ساحل فلوريا مع إمكانية زيارة الأكواريوم أو المركز التجاري.'
      ],
      en: [
        'Departure around 10:00.',
        'Süleymaniye Mosque.',
        'Sultanahmet Square and Blue Mosque.',
        'Gülhane Park and Eminönü.',
        'Balat historic quarter.',
        'Florya coast, with possible aquarium or shopping-center visit.'
      ],
      es: [
        'Salida alrededor de las 10:00.',
        'Mezquita de Süleymaniye.',
        'Plaza Sultanahmet y Mezquita Azul.',
        'Parque Gülhane y zona de Eminönü.',
        'Paseo por el barrio histórico de Balat.',
        'Costa de Florya, con posible visita al acuario o centro comercial.'
      ]
    }
  },
  {
    dayNumber: 3,
    image: istanbulBosphorusOrtakoyImg,
    dayCode: { fr: 'Jour 3', ar: 'اليوم 3', en: 'Day 3', es: 'Día 3' },
    title: {
      fr: 'Îles des Princes et incontournables d’Istanbul',
      ar: 'جزر الأميرات وأبرز معالم إسطنبول',
      en: 'Princes’ Islands and Istanbul highlights',
      es: 'Islas de los Príncipes y lugares icónicos'
    },
    scheduleNote: {
      fr: 'Départ vers 10h00 · Îles des Princes, Ortaköy, Taksim & Galata',
      ar: 'الانطلاق حوالي الساعة 10:00 · جزر الأميرات، أورتاكوي، تقسيم وغلاطة',
      en: 'Departure around 10:00 · Princes’ Islands, Ortaköy, Taksim & Galata',
      es: 'Salida aprox. 10:00 · Islas de los Príncipes, Ortaköy, Taksim y Gálata'
    },
    activities: {
      fr: [
        'Départ vers 10h00 vers les Îles des Princes.',
        'Temps libre pour profiter de l’île.',
        'Quartier animé d’Ortaköy au bord du Bosphore.',
        'Place Taksim.',
        'Avenue commerçante d’Istiklal.',
        'Tour de Galata.'
      ],
      ar: [
        'الانطلاق حوالي الساعة 10:00 نحو جزر الأميرات.',
        'وقت حر للاستمتاع بأجواء الجزيرة.',
        'زيارة حي أورتاكوي.',
        'ساحة تقسيم.',
        'شارع الاستقلال.',
        'برج غلاطة.'
      ],
      en: [
        'Departure around 10:00 to the Princes’ Islands.',
        'Free time on the island.',
        'Ortaköy waterfront neighborhood.',
        'Taksim Square.',
        'Istiklal Avenue.',
        'Galata Tower.'
      ],
      es: [
        'Salida alrededor de las 10:00 hacia las Islas de los Príncipes.',
        'Tiempo libre en la isla.',
        'Barrio costero de Ortaköy.',
        'Plaza Taksim.',
        'Avenida Istiklal.',
        'Torre de Gálata.'
      ]
    }
  },
  {
    dayNumber: 4,
    image: istanbulCityHeroImg,
    dayCode: { fr: 'Jour 4', ar: 'اليوم 4', en: 'Day 4', es: 'Día 4' },
    title: {
      fr: 'Bazar Égyptien et Mahmutpaşa',
      ar: 'السوق المصري ومحمود باشا',
      en: 'Egyptian Bazaar and Mahmutpaşa',
      es: 'Bazar Egipcio y Mahmutpaşa'
    },
    scheduleNote: {
      fr: 'Marchés traditionnels · Retour à l’hôtel vers 18h00',
      ar: 'الأسواق التقليدية · العودة إلى الفندق حوالي الساعة 18:00',
      en: 'Historic bazaars · Return to hotel around 18:00',
      es: 'Mercados históricos · Regreso al hotel aprox. 18:00'
    },
    activities: {
      fr: [
        'Découverte du Bazar Égyptien (marché aux épices et spécialités turques).',
        'Exploration du marché animé de Mahmutpaşa.',
        'Retour à l’hôtel prévu vers 18h00.'
      ],
      ar: [
        'زيارة السوق المصري (سوق التوابل والحلويات التقليدية).',
        'جولة في سوق محمود باشا الشعبي.',
        'العودة إلى الفندق حوالي الساعة 18:00.'
      ],
      en: [
        'Visit to the historic Egyptian Bazaar (Spice Market).',
        'Mahmutpaşa Market exploration.',
        'Return to the hotel around 18:00.'
      ],
      es: [
        'Visita al Bazar Egipcio (Mercado de las Especias).',
        'Recorrido por el mercado de Mahmutpaşa.',
        'Regreso al hotel alrededor de las 18:00.'
      ]
    }
  },
  {
    dayNumber: 5,
    image: istanbulSultanahmetImg,
    dayCode: { fr: 'Jour 5', ar: 'اليوم 5', en: 'Day 5', es: 'Día 5' },
    title: {
      fr: 'Miniatürk, Pierre Loti et shopping',
      ar: 'مينياتورك، بيير لوتي والتسوق',
      en: 'Miniatürk, Pierre Loti and shopping',
      es: 'Miniatürk, Pierre Loti y compras'
    },
    scheduleNote: {
      fr: 'Départ vers 10h00 · Miniatürk, Téléphérique, Eyüp Sultan & Venezia',
      ar: 'الانطلاق حوالي الساعة 10:00 · مينياتورك، التلفريك، أيوب سلطان وفينيسيا',
      en: 'Departure around 10:00 · Miniatürk, Cable Car, Eyüp Sultan & Venezia',
      es: 'Salida aprox. 10:00 · Miniatürk, Teleférico, Eyüp Sultan y Venezia'
    },
    activities: {
      fr: [
        'Départ vers 10h00.',
        'Visite du parc miniature Miniatürk.',
        'Colline Pierre Loti et montée en téléphérique.',
        'Visite de la mosquée Eyüp Sultan.',
        'Temps shopping au centre Venezia Mega Outlet.',
        'Retour à l’hôtel.'
      ],
      ar: [
        'الانطلاق حوالي الساعة 10:00.',
        'زيارة حديقة مينياتورك للمجسمات.',
        'تلة بيير لوتي وصعود بالتلفريك.',
        'زيارة جامع السلطان أيوب.',
        'جولة تسوق في فينيسيا ميجا أوتليت (Venezia Mega Outlet).',
        'العودة إلى الفندق.'
      ],
      en: [
        'Departure around 10:00.',
        'Miniatürk miniature park.',
        'Pierre Loti Hill and cable car ride.',
        'Eyüp Sultan Mosque.',
        'Venezia Mega Outlet shopping center.',
        'Return to the hotel.'
      ],
      es: [
        'Salida alrededor de las 10:00.',
        'Parque en miniatura Miniatürk.',
        'Colina Pierre Loti y paseo en teleférico.',
        'Mezquita Eyüp Sultan.',
        'Centro comercial Venezia Mega Outlet.',
        'Regreso al hotel.'
      ]
    }
  },
  {
    dayNumber: 6,
    image: istanbulBosphorusOrtakoyImg,
    dayCode: { fr: 'Jour 6', ar: 'اليوم 6', en: 'Day 6', es: 'Día 6' },
    title: {
      fr: 'Journée libre',
      ar: 'يوم حر',
      en: 'Free day',
      es: 'Día libre'
    },
    scheduleNote: {
      fr: 'Shopping, détente et découverte personnelle · Aucune excursion obligatoire',
      ar: 'تسوق واسترخاء · دون أي جولة إجبارية',
      en: 'Shopping and relaxation · No compulsory excursion',
      es: 'Compras y relajación · Sin excursión obligatoria'
    },
    activities: {
      fr: [
        'Journée dédiée au shopping et à la détente à votre rythme.',
        'Aucune excursion obligatoire au programme.'
      ],
      ar: [
        'يوم مخصص للتسوق والاسترخاء حسب رغبتكم.',
        'لا توجد أي رحلة إجبارية في هذا اليوم.'
      ],
      en: [
        'Free time dedicated to personal shopping and relaxation.',
        'No compulsory excursion scheduled.'
      ],
      es: [
        'Jornada dedicada a compras y descanso a su ritmo.',
        'Sin excursión obligatoria.'
      ]
    }
  },
  {
    dayNumber: 7,
    image: istanbulCityHeroImg,
    dayCode: { fr: 'Jour 7', ar: 'اليوم 7', en: 'Day 7', es: 'Día 7' },
    title: {
      fr: 'Départ',
      ar: 'المغادرة والعودة',
      en: 'Departure',
      es: 'Regreso'
    },
    scheduleNote: {
      fr: 'Check-out hôtel à 12h00 · Transfert aéroport prévu vers 20h00',
      ar: 'تسجيل المغادرة من الفندق 12:00 · التوجه نحو المطار حوالي الساعة 20:00',
      en: 'Hotel checkout at 12:00 · Airport departure scheduled around 20:00',
      es: 'Check-out a las 12:00 · Traslado al aeropuerto aprox. 20:00'
    },
    activities: {
      fr: [
        'Libération des chambres (check-out hôtel) à 12h00.',
        'Temps libre avant le rendez-vous de transfert.',
        'Départ prévu vers l’aéroport aux alentours de 20h00 pour le vol retour.'
      ],
      ar: [
        'تسجيل الخروج من الفندق (Check-out) على الساعة 12:00.',
        'وقت حر قبل موعد النقل.',
        'التوجه إلى المطار المقرر حوالي الساعة 20:00 لرحلة العودة.'
      ],
      en: [
        'Hotel checkout at 12:00.',
        'Free time.',
        'Airport departure scheduled around 20:00.'
      ],
      es: [
        'Check-out del hotel a las 12:00.',
        'Tiempo libre.',
        'Salida programada hacia el aeropuerto alrededor de las 20:00.'
      ]
    }
  }
] as const;

export const ISTANBUL_VIP_PACK_ITEMS: Record<Language, string[]> = {
  fr: [
    'Transport vers tous les lieux inclus dans le pack VIP',
    'Place Sultanahmet',
    'Visite extérieure de la Mosquée Bleue',
    'Sainte-Sophie (Hagia Sophia)',
    'Grand Bazar',
    'Bazar Égyptien',
    'Marché de Mahmutpaşa',
    'Venezia Mall',
    'Billet d’entrée à Miniatürk (explicitement inclus)',
    'Quartier de Balat',
    'Mosquée Süleymaniye',
    'Îles des Princes (Büyükada)',
    'Mosquée Sultan Eyüp',
    'Montée en téléphérique vers la colline Pierre Loti',
    'Place Taksim',
    'Avenue Istiklal',
    'Visite de la Tour de Galata',
    'Ortaköy',
    'Côte de Florya',
    'Accompagnement durant les excursions listées'
  ],
  ar: [
    'النقل إلى جميع الأماكن المشمولة في الباقة VIP',
    'ساحة السلطان أحمد',
    'زيارة خارجية للجامع الأزرق',
    'آيا صوفيا (Hagia Sophia)',
    'البازار الكبير (Grand Bazaar)',
    'السوق المصري',
    'سوق محمود باشا',
    'فينيسيا مول (Venezia Mall)',
    'تذكرة الدخول إلى مينياتورك (مذكورة صراحة في الإعلان)',
    'حي بلاط',
    'جامع السليمانية',
    'جزر الأميرات (بويوك أدا)',
    'جامع السلطان أيوب',
    'ركوب التلفريك نحو تلة بيير لوتي',
    'ساحة تقسيم',
    'شارع الاستقلال',
    'زيارة برج غلاطة',
    'أورتاكوي',
    'ساحل فلوريا',
    'مرافقة طوال الجولات المذكورة'
  ],
  en: [
    'Transportation to all places included in the VIP package',
    'Sultanahmet Square',
    'Exterior visit to the Blue Mosque',
    'Hagia Sophia',
    'Grand Bazaar',
    'Egyptian Bazaar',
    'Mahmutpaşa Market',
    'Venezia Mall',
    'Miniatürk admission ticket (explicitly stated as included)',
    'Balat',
    'Süleymaniye Mosque',
    'Princes’ Islands (Büyükada)',
    'Sultan Eyüp Mosque',
    'Cable car ride toward Pierre Loti Hill',
    'Taksim Square',
    'Istiklal Avenue',
    'Galata Tower visit',
    'Ortaköy',
    'Florya coast',
    'Accompaniment during the listed excursions'
  ],
  es: [
    'Transporte a todos los lugares incluidos en el paquete VIP',
    'Plaza Sultanahmet',
    'Visita exterior a la Mezquita Azul',
    'Santa Sofía (Hagia Sophia)',
    'Gran Bazar',
    'Bazar Egipcio',
    'Mercado de Mahmutpaşa',
    'Venezia Mall',
    'Entrada a Miniatürk (indicada explícitamente como incluida)',
    'Balat',
    'Mezquita de Süleymaniye',
    'Islas de los Príncipes (Büyükada)',
    'Mezquita Eyüp Sultan',
    'Teleférico hacia la colina Pierre Loti',
    'Plaza Taksim',
    'Avenida Istiklal',
    'Visita a la Torre de Galata',
    'Ortaköy',
    'Costa de Florya',
    'Acompañamiento durante las excursiones mencionadas'
  ]
};

export const ISTANBUL_BASE_INCLUSIONS: Record<Language, string[]> = {
  fr: [
    'Billet d’avion aller-retour au départ de Casablanca',
    'Hébergement hôtelier de 7 nuits (voir note de confirmation vs couverture "6 nuits")',
    'Petit-déjeuner quotidien à l’hôtel',
    'Transferts aéroport – hôtel – aéroport',
    'Visite de la colline de Çamlıca',
    'Visite de la mosquée de Çamlıca',
    'Visite du parc panoramique de Nakkaştepe',
    'Découverte du quartier d’Üsküdar',
    'Croisière sur le Bosphore',
    'Visite extérieure de la Tour de Léandre (Maiden’s Tower)',
    'Bagage cabine Air Arabia : 10 kg aller-retour'
  ],
  ar: [
    'تذكرة الطيران ذهاباً وإياباً من الدار البيضاء',
    'إقامة فندقية لمدة 7 ليالٍ (يُرجى مراجعة التنبيه مقارنةً بذكر "6 ليالٍ" في الغلاف)',
    'وجبة إفطار يومية في الفندق',
    'النقل المطار – الفندق – المطار',
    'زيارة تلة تشامليجا',
    'زيارة جامع تشامليجا',
    'زيارة منتزه نقاش تبه البانورامي',
    'اكتشاف حي أوسكودار',
    'جولة بحرية في البوسفور',
    'زيارة خارجية لبرج الفتاة (Maiden’s Tower)',
    'أمتعة المقصورة على طيران العربية (Air Arabia): 10 كغ ذهاباً وإياباً'
  ],
  en: [
    'Round-trip flight ticket departing Casablanca',
    'Hotel accommodation for 7 nights (see verification notice vs "6 nights" cover label)',
    'Daily hotel breakfast',
    'Airport–hotel–airport transfers',
    'Visit to Çamlıca Hill',
    'Visit to Çamlıca Mosque',
    'Visit to Nakkaştepe panoramic park',
    'Discovery of Üsküdar',
    'Bosphorus cruise',
    'Exterior visit to Maiden’s Tower',
    'Air Arabia cabin baggage: 10 kg round trip'
  ],
  es: [
    'Billete de avión ida y vuelta desde Casablanca',
    'Alojamiento en hotel de 7 noches (ver aviso de confirmación vs portada "6 noches")',
    'Desayuno diario en el hotel',
    'Traslados aeropuerto – hotel – aeropuerto',
    'Visita a la colina de Çamlıca',
    'Visita a la mezquita de Çamlıca',
    'Visita al parque panorámico Nakkaştepe',
    'Descubrimiento de Üsküdar',
    'Crucero por el Bósforo',
    'Visita exterior a la Torre de la Doncella (Maiden’s Tower)',
    'Equipaje de cabina Air Arabia: 10 kg ida y vuelta'
  ]
};

export const ISTANBUL_BASE_EXCLUSIONS: Record<Language, string[]> = {
  fr: [
    'Excursions et visites non incluses dans l’itinéraire de base (y compris le Pack d’Istanbul VIP optionnel à 1 480 DH)',
    'Bagages en soute optionnels (20 kg, 30 kg ou 40 kg)',
    'Prestations non spécifiquement mentionnées dans la liste des inclusions de base'
  ],
  ar: [
    'الجولات والزيارات غير المدرجة في البرنامج الأساسي (بما فيها باقة إسطنبول VIP الاختيارية بسعر 1,480 درهم)',
    'الأمتعة المشحونة الاختيارية (20 كغ أو 30 كغ أو 40 كغ)',
    'الخدمات غير المذكورة صراحةً ضمن قائمة الخدمات المشمولة'
  ],
  en: [
    'Excursions and visits not included in the base itinerary (including optional 1,480 DH Pack d’Istanbul VIP)',
    'Optional checked baggage (20 kg, 30 kg, or 40 kg)',
    'Services not specifically listed under base package inclusions'
  ],
  es: [
    'Excursiones y visitas no incluidas en el itinerario base (incluido el Pack d’Istanbul VIP opcional de 1 480 DH)',
    'Equipaje facturado opcional (20 kg, 30 kg o 40 kg)',
    'Servicios no mencionados específicamente en las inclusiones base'
  ]
};

export interface IstanbulHolidayLocaleCopy {
  showcaseEyebrow: string;
  showcaseTitle: string;
  showcaseArabicTitle: string;
  showcaseSubtitle: string;
  showcaseDepartureLabel: string;
  showcaseStartingFromLabel: string;
  showcaseStartingPrice: string;
  showcaseStartingScopeNote: string;
  showcaseDescription: string;
  showcaseHighlights: string[];
  showcaseViewPackageBtn: string;
  showcaseReserveBtn: string;

  backToSejours: string;
  backToHome: string;
  heroEyebrow: string;
  heroTitle: string;
  heroArabicTitle: string;
  heroSubtitle: string;
  heroDepartureCity: string;
  heroStartingScope: string;
  heroInspectHotelsBtn: string;
  heroReserveBtn: string;

  overviewEyebrow: string;
  overviewTitle: string;
  overviewText: string;
  overviewStats: { label: string; value: string }[];
  discrepanciesTitle: string;
  discrepanciesList: string[];

  hotelsEyebrow: string;
  hotelsTitle: string;
  hotelsSubtitle: string;
  roomTypeTriple: string;
  roomTypeDouble: string;
  roomTypeSingle: string;
  departureColLabel: string;
  returnColLabel: string;
  selectHotelAction: string;
  selectedHotelBadge: string;

  itineraryEyebrow: string;
  itineraryTitle: string;
  itinerarySubtitle: string;
  itineraryWeatherNote: string;

  inclusionsEyebrow: string;
  inclusionsTitle: string;
  inclusionsBaseHeading: string;
  exclusionsBaseHeading: string;

  vipEyebrow: string;
  vipTitle: string;
  vipPriceDisplay: string;
  vipUnconfirmedBasisWarning: string;
  vipTicketsWarning: string;

  baggageEyebrow: string;
  baggageTitle: string;
  baggageSubtitle: string;
  baggageNotIncludedBadge: string;
  baggageAmbiguityWarning: string;

  inquiryEyebrow: string;
  inquiryTitle: string;
  inquirySubtitle: string;
  formHotelLabel: string;
  formRoomLabel: string;
  formDepartureLabel: string;
  formTravelersLabel: string;
  formVipCheckboxLabel: string;
  formVipCheckboxHint: string;
  formBaggageLabel: string;
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

  quoteBoxEyebrow: string;
  quoteBoxTitle: string;
  quoteVerifiedPerPerson: string;
  quoteVerifiedBaseGroup: string;
  quotePendingConfirmationTitle: string;
  quoteVipPendingLine: string;
  quoteBaggageLine: string;
  quoteNoUnconfirmedSumNote: string;

  readyTitle: string;
  readySubtitle: string;
  readyEditBtn: string;
  readyWhatsappBtn: string;
  advisorLabel: string;
  advisorTitle: string;
  advisorCallLabel: string;
  advisorMapsLabel: string;
}

export const ISTANBUL_HOLIDAY_COPY: Record<Language, IstanbulHolidayLocaleCopy> = {
  fr: {
    showcaseEyebrow: 'Séjour Organisé Golden Group Travels · Départ Casablanca',
    showcaseTitle: 'Turquie – Istanbul',
    showcaseArabicTitle: 'تركيا – إسطنبول',
    showcaseSubtitle: '7 jours / 6 nuits · Départs 05/12/2026 & 26/12/2026',
    showcaseDepartureLabel: 'Départ : Casablanca, Maroc',
    showcaseStartingFromLabel: 'À partir de',
    showcaseStartingPrice: '7 300 DH / pers.',
    showcaseStartingScopeNote: 'Tarif d’appel exclusivement pour Hotel Delta 3★ en chambre Triple',
    showcaseDescription: 'Vol aller-retour au départ de Casablanca, hébergement, petits-déjeuners, transferts aéroport, Çamlıca, croisière sur le Bosphore, Üsküdar & bagage cabine 10 kg Air Arabia.',
    showcaseHighlights: [
      '3 hôtels vérifiés : Delta 3★ (dès 7 300 DH), Zagreb 4★ (dès 7 800 DH), Ilkbal Deluxe 4★ (dès 7 800 DH)',
      'Programme de base inclus + itinéraire jour par jour sur 7 jours',
      'Pack d’Istanbul VIP optionnel (1 480 DH — base tarifaire à confirmer) non inclus par défaut',
      'Bagages en soute optionnels (20 / 30 / 40 kg) non inclus dans les 7 300 DH'
    ],
    showcaseViewPackageBtn: 'Voir le séjour & tarifs',
    showcaseReserveBtn: 'Demander une réservation',

    backToSejours: 'Retour aux Séjours',
    backToHome: 'Retour à l’accueil',
    heroEyebrow: 'Séjour Organisé Officiel · Hors Omra Istanbul',
    heroTitle: 'Turquie – Istanbul',
    heroArabicTitle: 'تركيا – إسطنبول',
    heroSubtitle: '7 jours / 6 nuits · Départ de Casablanca, Maroc (Vol Air Arabia, hébergement, transferts & visites incluses)',
    heroDepartureCity: 'Casablanca, Maroc',
    heroStartingScope: 'À partir de 7 300 DH / personne — correspond exclusivement au tarif chambre Triple à l’Hotel Delta 3★.',
    heroInspectHotelsBtn: 'Comparer les 3 hôtels',
    heroReserveBtn: 'Demander une réservation',

    overviewEyebrow: 'Présentation du séjour & transparence',
    overviewTitle: 'Un séjour complet à Istanbul opéré directement par Golden Group Travels',
    overviewText: 'Découvrez Istanbul entre Europe et Asie grâce à un séjour organisé clé en main au départ de Casablanca. Pour une transparence totale avant réservation, les éventuelles incohérences relevées sur les supports officiels (durée en nuits et date retour du 26/12) sont signalées ci-dessous afin d’être confirmées directement par notre agence.',
    overviewStats: [
      { label: 'Ville de départ', value: 'Casablanca, Maroc' },
      { label: 'Durée affichée', value: '7 jours / 6 nuits*' },
      { label: 'Compagnie / Cabine', value: 'Air Arabia (10 kg A/R)' },
      { label: 'Tarif d’appel', value: '7 300 DH / pers. (Delta 3★ Triple)' }
    ],
    discrepanciesTitle: 'Points nécessitant confirmation officielle de l’agence',
    discrepanciesList: [
      'Durée nuits / dates : la couverture indique « 7 jours / 6 nuits », la fiche d’inclusions mentionne « 7 nuits d’hôtel », et la période du 05/12/2026 au 13/12/2026 couvre un intervalle plus long. À confirmer avec Golden Group Travels sans modification arbitraire.',
      'Date de retour Hotel Ilkbal Deluxe 4★ (départ 26/12/2026) : l’affiche source indique « 01/01/2026 », date antérieure au départ. Date de retour exacte à confirmer avant validation.',
      'Pack d’Istanbul VIP (1 480 DH) : l’affiche ne précise pas s’il s’agit d’un tarif par personne ou global. Billets d’entrée non garantis sauf Miniatürk qui est explicitement mentionné.',
      'Bagages supplémentaires 30 kg (550 DH) et 40 kg (720 DH) : la couverture aller simple vs aller-retour n’est pas précisée sur l’affiche.'
    ],

    hotelsEyebrow: 'Grille tarifaire vérifiée en DH / MAD',
    hotelsTitle: 'Hôtels, dates & tarifs exacts par personne',
    hotelsSubtitle: 'Cliquez sur un hôtel pour sélectionner votre hébergement et comparer les chambres Triple, Double et Single en dirhams marocains (DH / MAD).',
    roomTypeTriple: 'Triple',
    roomTypeDouble: 'Double',
    roomTypeSingle: 'Single',
    departureColLabel: 'Départ',
    returnColLabel: 'Retour',
    selectHotelAction: 'Sélectionner cet hôtel',
    selectedHotelBadge: 'Hôtel sélectionné',

    itineraryEyebrow: 'Programme jour par jour',
    itineraryTitle: 'Itinéraire complet sur 7 jours à Istanbul',
    itinerarySubtitle: 'Sélectionnez chaque journée pour consulter le déroulement des visites et horaires indicatifs issus des supports officiels.',
    itineraryWeatherNote: 'Note opérationnelle : l’ordre des visites peut être modifié en fonction des conditions météorologiques, jours fériés ou contraintes opérationnelles.',

    inclusionsEyebrow: 'Prestations incluses & non incluses',
    inclusionsTitle: 'Ce que comprend le forfait de base',
    inclusionsBaseHeading: 'Inclus dans le séjour de base',
    exclusionsBaseHeading: 'Non inclus dans le séjour de base',

    vipEyebrow: 'Option facultative non incluse dans la base',
    vipTitle: 'Pack d’Istanbul VIP',
    vipPriceDisplay: '1 480 DH',
    vipUnconfirmedBasisWarning: 'Important : l’affiche promotionnelle n’indique pas explicitement si le montant de 1 480 DH est par personne. Ce supplément n’est jamais ajouté automatiquement au prix du séjour de base tant que sa base tarifaire n’est pas confirmée.',
    vipTicketsWarning: 'Droits d’entrée : aucun billet d’entrée n’est inclus sauf mention explicite — seul Miniatürk mentionne un billet d’entrée inclus ; la visite de la Mosquée Bleue est extérieure.',

    baggageEyebrow: 'Franchise & bagages en soute optionnels',
    baggageTitle: 'Tarifs des bagages supplémentaires',
    baggageSubtitle: 'La base inclut uniquement 10 kg en cabine aller-retour avec Air Arabia. Les bagages en soute sont strictement optionnels et exclus du tarif d’appel à 7 300 DH.',
    baggageNotIncludedBadge: 'Hors forfait 7 300 DH',
    baggageAmbiguityWarning: 'Note : pour les options 30 kg (550 DH) et 40 kg (720 DH), l’affiche ne précise pas si le tarif couvre un aller simple ou un aller-retour.',

    inquiryEyebrow: 'Demande de réservation directe (Salé)',
    inquiryTitle: 'Préparer votre demande pour Turquie – Istanbul',
    inquirySubtitle: 'Sélectionnez votre hôtel, type de chambre, date de départ et options souhaitées. Nos conseillers vérifient les disponibilités et confirment les points ouverts avant tout règlement.',
    formHotelLabel: 'Hôtel souhaité',
    formRoomLabel: 'Type de chambre',
    formDepartureLabel: 'Option de départ (liée à l’hôtel choisi)',
    formTravelersLabel: 'Nombre de voyageurs',
    formVipCheckboxLabel: 'Intéressé(e) par l’option Pack d’Istanbul VIP (1 480 DH — base tarifaire à confirmer)',
    formVipCheckboxHint: 'N’augmente pas le total calculé automatiquement tant que l’agence n’a pas confirmé s’il s’applique par personne ou par dossier.',
    formBaggageLabel: 'Option bagage en soute (facultative)',
    formNameLabel: 'Nom complet',
    formNamePlaceholder: 'Votre nom et prénom',
    formPhoneLabel: 'Téléphone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Remarques complémentaires',
    formNotesPlaceholder: 'Précisions sur les chambres, passeports, bagages ou demande de confirmation...',
    formSubmitBtn: 'Préparer ma demande WhatsApp',
    formNoAutoConfirm: 'Aucune réservation ni aucun paiement n’est confirmé automatiquement sur le site ; Golden Group Travels valide chaque dossier en direct.',
    errNameRequired: 'Veuillez indiquer votre nom complet.',
    errPhoneRequired: 'Veuillez indiquer votre numéro de téléphone ou WhatsApp.',

    quoteBoxEyebrow: 'Récapitulatif tarifaire vérifié',
    quoteBoxTitle: 'Base DH / personne confirmée',
    quoteVerifiedPerPerson: 'Tarif hôtel vérifié / personne',
    quoteVerifiedBaseGroup: 'Sous-total séjour de base',
    quotePendingConfirmationTitle: 'Options à confirmer avec l’agence',
    quoteVipPendingLine: 'Pack d’Istanbul VIP : 1 480 DH (base par pers. / dossier à confirmer)',
    quoteBaggageLine: 'Bagage sélectionné',
    quoteNoUnconfirmedSumNote: 'Conformément à nos engagements de transparence, aucun total global n’additionne automatiquement des options au périmètre non confirmé (Pack VIP ou bagages 30/40 kg).',

    readyTitle: 'Demande prête pour envoi WhatsApp',
    readySubtitle: 'Vérifiez votre sélection puis cliquez sur le bouton vert pour envoyer votre demande à l’agence Golden Group Travels.',
    readyEditBtn: 'Modifier les options',
    readyWhatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    advisorLabel: 'Agence Golden Group Travels · Salé',
    advisorTitle: 'Confirmation & assistance directe',
    advisorCallLabel: 'Appeler l’agence',
    advisorMapsLabel: 'Localiser sur Google Maps'
  },

  ar: {
    showcaseEyebrow: 'عطلة منظمة لدى جولدن جروب · الانطلاق من الدار البيضاء',
    showcaseTitle: 'تركيا – إسطنبول',
    showcaseArabicTitle: 'تركيا – إسطنبول',
    showcaseSubtitle: '7 أيام / 6 ليالٍ · رحلات 05/12/2026 و 26/12/2026',
    showcaseDepartureLabel: 'مدينة المغادرة: الدار البيضاء، المغرب',
    showcaseStartingFromLabel: 'ابتداءً من',
    showcaseStartingPrice: '7,300 درهم / للشخص',
    showcaseStartingScopeNote: 'السعر الابتدائي ينطبق حصرياً على فندق Delta 3★ في غرفة ثلاثية',
    showcaseDescription: 'تذكرة الطيران ذهاباً وإياباً من الدار البيضاء، إقامة فندقية، إفطار يومي، تنقلات المطار، تشامليجا، جولة البوسفور، أوسكودار وحقيبة مقصورة 10 كغ Air Arabia.',
    showcaseHighlights: [
      '3 فنادق معتمدة: Delta 3★ (ابتداءً من 7,300 درهم)، Zagreb 4★ (من 7,800 درهم)، Ilkbal Deluxe 4★ (من 7,800 درهم)',
      'البرنامج الأساسي الشامل + برنامج تفاعلي مفصّل لـ 7 أيام',
      'باقة إسطنبول VIP الاختيارية (1,480 درهم — أساس التسعير قيد التأكيد) غير مدمجة تلقائياً',
      'أمتعة شحن اختيارية (20 / 30 / 40 كغ) غير مشمولة في سعر 7,300 درهم'
    ],
    showcaseViewPackageBtn: 'عرض تفاصيل العطلة والأسعار',
    showcaseReserveBtn: 'طلب حجز',

    backToSejours: 'العودة إلى العطلات والرحلات',
    backToHome: 'العودة إلى الرئيسية',
    heroEyebrow: 'عطلة سياحية رسمية · منفصلة عن عمرة إسطنبول',
    heroTitle: 'تركيا – إسطنبول',
    heroArabicTitle: 'تركيا – إسطنبول',
    heroSubtitle: '7 أيام / 6 ليالٍ · انطلاقاً من الدار البيضاء، المغرب (طيران Air Arabia، فندق، تنقلات وزيارات)',
    heroDepartureCity: 'الدار البيضاء، المغرب',
    heroStartingScope: 'ابتداءً من 7,300 درهم للشخص — ينطبق حصرياً على الغرفة الثلاثية في فندق Delta 3★.',
    heroInspectHotelsBtn: 'مقارنة الفنادق الثلاثة',
    heroReserveBtn: 'طلب حجز',

    overviewEyebrow: 'نظرة عامة وشفافية البيانات',
    overviewTitle: 'عطلة منظمة في إسطنبول بإشراف مباشر من Golden Group Travels',
    overviewText: 'اكتشف إسطنبول برحلة متكاملة انطلاقاً من الدار البيضاء. حرصاً على الدقة التامة، نُبرز أدناه الملاحظات التي تحتاج إلى تأكيد من الوكالة في الإعلان الأصلي دون تعديلها تلقائياً.',
    overviewStats: [
      { label: 'مدينة الانطلاق', value: 'الدار البيضاء، المغرب' },
      { label: 'المدة المعلنة', value: '7 أيام / 6 ليالٍ*' },
      { label: 'الطيران / الأمتعة', value: 'Air Arabia (10 كغ مقصورة)' },
      { label: 'السعر الابتدائي', value: '7,300 درهم (Delta 3★ ثلاثية)' }
    ],
    discrepanciesTitle: 'نقاط تتطلب تأكيداً رسمياً من الوكالة',
    discrepanciesList: [
      'تفاوت عدد الليالي والتواريخ: الغلاف يذكر «7 أيام / 6 ليالٍ»، بينما قائمة المشمولات تذكر «7 ليالٍ فندقية»، وفترة 05/12/2026 إلى 13/12/2026 تبدو أطول — قيد التأكيد.',
      'تاريخ عودة فندق Ilkbal Deluxe 4★ (انطلاق 26/12/2026): الإعلان الأصلي يظهر 01/01/2026 وهو تاريخ يسبق المغادرة، ويتطلب تأكيد الوكالة.',
      'باقة إسطنبول VIP (1,480 درهم): لم يوضح الإعلان ما إذا كان السعر للشخص أم للمجموعة، ولا تتضمن تذاكر دخول إلا في مينياتورك كما هو مذكور صراحة.',
      'الأمتعة الإضافية 30 كغ (550 درهم) و40 كغ (720 درهم): لم يُذكر هل تشمل اتجاهاً واحداً أم ذهاباً وإياباً.'
    ],

    hotelsEyebrow: 'أسعار الفنادق الرسمية بالدرهم المغربي',
    hotelsTitle: 'الفنادق، التواريخ والأسعار الدقيقة للشخص',
    hotelsSubtitle: 'اختر الفندق لمقارنة أسعار الغرف الثلاثية والمزدوجة والفردية بالدرهم المغربي.',
    roomTypeTriple: 'ثلاثية (Triple)',
    roomTypeDouble: 'مزدوجة (Double)',
    roomTypeSingle: 'فردية (Single)',
    departureColLabel: 'الذهاب',
    returnColLabel: 'العودة',
    selectHotelAction: 'اختيار هذا الفندق',
    selectedHotelBadge: 'الفندق المختار',

    itineraryEyebrow: 'البرنامج اليومي المفصل',
    itineraryTitle: 'برنامج 7 أيام تفاعلي في إسطنبول',
    itinerarySubtitle: 'اضغط على كل يوم لاستعراض الأنشطة والتوقيت التقريبي كما وردت في الإعلانات الرسمية.',
    itineraryWeatherNote: 'ملاحظة تشغيلية: قد يتغير ترتيب الزيارات حسب الأحوال الجوية أو العطل الرسمية أو الظروف التنظيمية.',

    inclusionsEyebrow: 'ما يشمله العرض وما لا يشمله',
    inclusionsTitle: 'تفاصيل الباقة الأساسية',
    inclusionsBaseHeading: 'يشمله السعر الأساسي',
    exclusionsBaseHeading: 'لا يشمله السعر الأساسي',

    vipEyebrow: 'خيار إضافي غير مشمول في السعر الأساسي',
    vipTitle: 'باقة إسطنبول VIP (Pack d’Istanbul VIP)',
    vipPriceDisplay: '1,480 درهم',
    vipUnconfirmedBasisWarning: 'تنبيه هام: لا يوضح الإعلان ما إذا كان مبلغ 1,480 درهم مخصصاً للشخص الواحد. لا يُضاف هذا المبلغ تلقائياً إلى المجموع قبل تأكيد أساس التسعير من الوكالة.',
    vipTicketsWarning: 'تذاكر الدخول: لا تُضمن تذاكر المعالم ما لم يُذكر ذلك صراحة — فقط مينياتورك يذكر شمول تذكرة الدخول، وزيارة الجامع الأزرق خارجية.',

    baggageEyebrow: 'أوزان الأمتعة الإضافية الاختيارية',
    baggageTitle: 'أسعار الأمتعة المشحونة الاختيارية',
    baggageSubtitle: 'السعر الأساسي (7,300 درهم) يشمل فقط 10 كغ في المقصورة ذهاباً وإياباً على طيران العربية.',
    baggageNotIncludedBadge: 'خارج سعر 7,300 درهم',
    baggageAmbiguityWarning: 'ملاحظة: بالنسبة لخياري 30 كغ (550 درهم) و40 كغ (720 درهم)، لم يحدد الإعلان ما إذا كان السعر لاتجاه واحد أو للذهاب والعودة.',

    inquiryEyebrow: 'طلب حجز وتأكيد عبر واتساب',
    inquiryTitle: 'جهّز طلب رحلتك إلى إسطنبول',
    inquirySubtitle: 'حدد الفندق ونوع الغرفة وتاريخ المغادرة والخيارات الإضافية للتواصل مباشرة مع مستشارينا بسلا.',
    formHotelLabel: 'الفندق المختار',
    formRoomLabel: 'نوع الغرفة',
    formDepartureLabel: 'موعد الانطلاق',
    formTravelersLabel: 'عدد المسافرين',
    formVipCheckboxLabel: 'مهتم بباقة إسطنبول VIP الاختيارية (1,480 درهم — أساس السعر قيد التأكيد)',
    formVipCheckboxHint: 'لا يُحتسب تلقائياً في المجموع الإجمالي قبل تأكيد الوكالة.',
    formBaggageLabel: 'خيار الأمتعة المشحونة (اختياري)',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'الاسم والنسب',
    formPhoneLabel: 'رقم الهاتف / واتساب',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'ملاحظات إضافية',
    formNotesPlaceholder: 'تفاصيل الغرف أو أسئلة حول تاريخ العودة أو الأمتعة...',
    formSubmitBtn: 'تجهيز طلب الواتساب',
    formNoAutoConfirm: 'لا يتم تأكيد أي حجز أو دفع إلكترونياً؛ يتولى مستشارو الوكالة التحقق من التوفر وتأكيده مباشرة.',
    errNameRequired: 'يرجى إدخال الاسم الكامل.',
    errPhoneRequired: 'يرجى إدخال رقم الهاتف أو واتساب.',

    quoteBoxEyebrow: 'ملخص السعر الموثّق',
    quoteBoxTitle: 'التكلفة المعتمدة بالدرهم المغربي',
    quoteVerifiedPerPerson: 'سعر الفندق المؤكد / للشخص',
    quoteVerifiedBaseGroup: 'المجموع الفرعي الأساسي للمجموعة',
    quotePendingConfirmationTitle: 'خيارات قيد التأكيد لدى الوكالة',
    quoteVipPendingLine: 'باقة إسطنبول VIP: 1,480 درهم (قيد التأكيد)',
    quoteBaggageLine: 'الأمتعة المختارة',
    quoteNoUnconfirmedSumNote: 'التزاماً بالدقة، لا نجمع تلقائياً أي خيارات ذات شروط غير مؤكدة في المجموع النهائي.',

    readyTitle: 'الطلب جاهز للإرسال عبر واتساب',
    readySubtitle: 'اضغط على الزر أدناه لإرسال تفاصيل اختيارك إلى فريق Golden Group Travels.',
    readyEditBtn: 'تعديل الاختيار',
    readyWhatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    advisorLabel: 'وكالة Golden Group Travels · سلا',
    advisorTitle: 'التأكيد والدعم المباشر',
    advisorCallLabel: 'الاتصال بالوكالة',
    advisorMapsLabel: 'الموقع على خرائط Google'
  },

  en: {
    showcaseEyebrow: 'Company-Operated Holiday · Departing Casablanca',
    showcaseTitle: 'Turquie – Istanbul',
    showcaseArabicTitle: 'تركيا – إسطنبول',
    showcaseSubtitle: '7 days / 6 nights · Departures 05/12/2026 & 26/12/2026',
    showcaseDepartureLabel: 'Departure: Casablanca, Morocco',
    showcaseStartingFromLabel: 'Starting from',
    showcaseStartingPrice: '7,300 DH / pers.',
    showcaseStartingScopeNote: 'Starting price corresponds strictly to Hotel Delta 3★ (Triple room)',
    showcaseDescription: 'Round-trip Casablanca flights, hotel stay, daily breakfast, airport transfers, Çamlıca, Bosphorus cruise, Üsküdar & 10 kg Air Arabia cabin baggage.',
    showcaseHighlights: [
      '3 hotels: Delta 3★ (from 7,300 DH), Zagreb 4★ (from 7,800 DH), Ilkbal Deluxe 4★ (from 7,800 DH)',
      'Base sightseeing inclusions + interactive 7-day itinerary',
      'Optional Pack d’Istanbul VIP (1,480 DH — per-person basis unconfirmed) never auto-added',
      'Optional checked baggage (20 / 30 / 40 kg) excluded from the 7,300 DH base fare'
    ],
    showcaseViewPackageBtn: 'View holiday & prices',
    showcaseReserveBtn: 'Request booking',

    backToSejours: 'Back to Holidays',
    backToHome: 'Back to Home',
    heroEyebrow: 'Official Holiday Package · Distinct from Omra Istanbul',
    heroTitle: 'Turquie – Istanbul',
    heroArabicTitle: 'تركيا – إسطنبول',
    heroSubtitle: '7 days / 6 nights · Departing Casablanca, Morocco (Air Arabia flights, hotel stay, transfers & listed tours)',
    heroDepartureCity: 'Casablanca, Morocco',
    heroStartingScope: 'Starting at 7,300 DH per person — applies specifically to Hotel Delta 3★ Triple room.',
    heroInspectHotelsBtn: 'Compare 3 hotels',
    heroReserveBtn: 'Request booking',

    overviewEyebrow: 'Package Overview & Verification Transparency',
    overviewTitle: 'Company-operated Istanbul holiday departing Casablanca',
    overviewText: 'Every hotel rate, base inclusion, itinerary highlight, optional VIP activity, and baggage supplement below matches Golden Group Travels’ official posters. Items requiring agency clarification are flagged explicitly rather than guessed.',
    overviewStats: [
      { label: 'Departure city', value: 'Casablanca, Morocco' },
      { label: 'Advertised duration', value: '7 days / 6 nights*' },
      { label: 'Airline / Cabin', value: 'Air Arabia (10 kg RT)' },
      { label: 'Starting rate', value: '7,300 DH / pax (Delta 3★ Triple)' }
    ],
    discrepanciesTitle: 'Items Flagged for Company Confirmation',
    discrepanciesList: [
      'Nights & Date Range Discrepancy: Cover advertises "7 days / 6 nights", inclusion notes state "7 hotel nights", while Dec 5–13 spans longer. Needs confirmation before final ticketing.',
      'Hotel Ilkbal Deluxe 4★ Return Date (Dep. 26/12/2026): Source poster reads 01/01/2026 (earlier than departure). Needs confirmation rather than silently altering to 2027.',
      'Optional Pack d’Istanbul VIP (1,480 DH): Poster does not clarify whether this rate is per person. No entrance tickets are claimed except Miniatürk, which is explicitly stated.',
      '30 kg (550 DH) & 40 kg (720 DH) baggage: Poster does not specify outbound, return, or round-trip coverage.'
    ],

    hotelsEyebrow: 'Verified Hotel Rates in MAD / DH',
    hotelsTitle: 'Exact per-person hotel pricing & departures',
    hotelsSubtitle: 'Select any hotel below to inspect exact Triple, Double, and Single occupancy fares in Moroccan dirhams.',
    roomTypeTriple: 'Triple',
    roomTypeDouble: 'Double',
    roomTypeSingle: 'Single',
    departureColLabel: 'Departure',
    returnColLabel: 'Return',
    selectHotelAction: 'Select hotel',
    selectedHotelBadge: 'Selected',

    itineraryEyebrow: 'Day-by-Day Program',
    itineraryTitle: 'Complete 7-day interactive Istanbul itinerary',
    itinerarySubtitle: 'Select any day to inspect scheduled sights and indicative timings from the official French & Arabic posters.',
    itineraryWeatherNote: 'Operational notice: Activity order may change depending on weather, public holidays, or operational circumstances.',

    inclusionsEyebrow: 'Base Package Scope',
    inclusionsTitle: 'Included vs. Excluded in Base Rate',
    inclusionsBaseHeading: 'Included in Base Package',
    exclusionsBaseHeading: 'Not Included in Base Package',

    vipEyebrow: 'Optional Excursion Add-On',
    vipTitle: 'Pack d’Istanbul VIP',
    vipPriceDisplay: '1,480 DH',
    vipUnconfirmedBasisWarning: 'Important: The poster does not clarify whether 1,480 DH is per person. We do not add this fee automatically or label it per person pending agency confirmation.',
    vipTicketsWarning: 'Admission tickets notice: Do not assume entrance fees are included unless stated — only Miniatürk explicitly includes an admission ticket, and the Blue Mosque visit is exterior.',

    baggageEyebrow: 'Optional Checked Baggage Fees',
    baggageTitle: 'Additional baggage pricing',
    baggageSubtitle: 'Base package includes 10 kg Air Arabia cabin baggage round trip only. Checked baggage options are extra and excluded from 7,300 DH.',
    baggageNotIncludedBadge: 'Excluded from 7,300 DH',
    baggageAmbiguityWarning: 'Notice: Journey leg coverage for 30 kg (550 DH) and 40 kg (720 DH) is not clearly specified on the official poster.',

    inquiryEyebrow: 'Direct WhatsApp Reservation Inquiry',
    inquiryTitle: 'Request a booking for Turquie – Istanbul',
    inquirySubtitle: 'Choose your hotel, room type, departure, and optional interests. Golden Group Travels verifies availability manually before any booking confirmation.',
    formHotelLabel: 'Preferred hotel',
    formRoomLabel: 'Room occupancy',
    formDepartureLabel: 'Departure date option',
    formTravelersLabel: 'Number of travelers',
    formVipCheckboxLabel: 'Interested in optional Pack d’Istanbul VIP (1,480 DH — pricing basis to confirm)',
    formVipCheckboxHint: 'Not added automatically to your total until confirmed by the agency.',
    formBaggageLabel: 'Optional checked baggage',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'Your full name',
    formPhoneLabel: 'Phone / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Additional notes',
    formNotesPlaceholder: 'Room notes, return date check, baggage question…',
    formSubmitBtn: 'Prepare WhatsApp inquiry',
    formNoAutoConfirm: 'No booking or payment is confirmed online; our Salé desk verifies every request directly.',
    errNameRequired: 'Please enter your full name.',
    errPhoneRequired: 'Please enter your phone or WhatsApp number.',

    quoteBoxEyebrow: 'Verified Rate Summary',
    quoteBoxTitle: 'Confirmed hotel rate (DH / MAD)',
    quoteVerifiedPerPerson: 'Verified hotel rate / person',
    quoteVerifiedBaseGroup: 'Verified base group subtotal',
    quotePendingConfirmationTitle: 'Unconfirmed options noted separately',
    quoteVipPendingLine: 'Pack d’Istanbul VIP: 1,480 DH (basis to confirm)',
    quoteBaggageLine: 'Selected baggage option',
    quoteNoUnconfirmedSumNote: 'Final combined total is NOT auto-calculated with unconfirmed VIP pricing or unclear baggage coverage.',

    readyTitle: 'Inquiry ready for WhatsApp',
    readySubtitle: 'Send your selected options directly to Golden Group Travels via WhatsApp below.',
    readyEditBtn: 'Edit selection',
    readyWhatsappBtn: 'Send via WhatsApp (0666-484815)',
    advisorLabel: 'Golden Group Travels · Salé',
    advisorTitle: 'Direct confirmation desk',
    advisorCallLabel: 'Call agency',
    advisorMapsLabel: 'Locate on Google Maps'
  },

  es: {
    showcaseEyebrow: 'Paquete Organizado · Salida desde Casablanca',
    showcaseTitle: 'Turquie – Istanbul',
    showcaseArabicTitle: 'تركيا – إسطنبول',
    showcaseSubtitle: '7 días / 6 noches · Salidas 05/12/2026 y 26/12/2026',
    showcaseDepartureLabel: 'Salida: Casablanca, Marruecos',
    showcaseStartingFromLabel: 'Desde',
    showcaseStartingPrice: '7 300 DH / pers.',
    showcaseStartingScopeNote: 'Tarifa inicial válida únicamente para Hotel Delta 3★ en habitación Triple',
    showcaseDescription: 'Vuelo ida y vuelta desde Casablanca, alojamiento, desayuno diario, traslados, Çamlıca, crucero por el Bósforo, Üsküdar y equipaje de cabina 10 kg Air Arabia.',
    showcaseHighlights: [
      '3 hoteles: Delta 3★ (desde 7 300 DH), Zagreb 4★ (desde 7 800 DH), Ilkbal Deluxe 4★ (desde 7 800 DH)',
      'Inclusiones base + itinerario interactivo de 7 días',
      'Pack d’Istanbul VIP opcional (1 480 DH — base tarifaria por confirmar) nunca incluido por defecto',
      'Equipaje facturado opcional (20 / 30 / 40 kg) excluido del precio base de 7 300 DH'
    ],
    showcaseViewPackageBtn: 'Ver paquete y precios',
    showcaseReserveBtn: 'Solicitar reserva',

    backToSejours: 'Volver a Estancias',
    backToHome: 'Volver al inicio',
    heroEyebrow: 'Paquete Vacacional Oficial · Distinto de Omra Istanbul',
    heroTitle: 'Turquie – Istanbul',
    heroArabicTitle: 'تركيا – إسطنبول',
    heroSubtitle: '7 días / 6 noches · Salida desde Casablanca, Marruecos (Vuelo Air Arabia, hotel, traslados y visitas)',
    heroDepartureCity: 'Casablanca, Marruecos',
    heroStartingScope: 'Desde 7 300 DH por persona — corresponde específicamente al Hotel Delta 3★ en habitación Triple.',
    heroInspectHotelsBtn: 'Comparar los 3 hoteles',
    heroReserveBtn: 'Solicitar reserva',

    overviewEyebrow: 'Resumen y Transparencia',
    overviewTitle: 'Paquete completo a Estambul operado por Golden Group Travels',
    overviewText: 'Todos los precios en DH, inclusiones y actividades reflejan fielmente los carteles oficiales. Las discrepancias detectadas se señalan abiertamente para su confirmación con la agencia.',
    overviewStats: [
      { label: 'Ciudad de salida', value: 'Casablanca, Marruecos' },
      { label: 'Duración anunciada', value: '7 días / 6 noches*' },
      { label: 'Vuelo / Cabina', value: 'Air Arabia (10 kg I/V)' },
      { label: 'Precio base', value: '7 300 DH / pers. (Delta 3★ Triple)' }
    ],
    discrepanciesTitle: 'Puntos pendientes de confirmación oficial',
    discrepanciesList: [
      'Discrepancia noches / fechas: portada indica "7 días / 6 noches", inclusiones indican "7 noches de hotel" y el rango 05/12–13/12 es mayor. Requiere confirmación.',
      'Hotel Ilkbal Deluxe 4★ (salida 26/12/2026): el cartel muestra regreso 01/01/2026, anterior a la salida. Debe confirmarse con la agencia.',
      'Pack d’Istanbul VIP (1 480 DH): no se aclara si el precio es por persona. Solo Miniatürk indica entrada incluida.',
      'Equipaje 30 kg (550 DH) y 40 kg (720 DH): cobertura por trayecto no especificada en el cartel.'
    ],

    hotelsEyebrow: 'Tarifas verificadas en DH / MAD',
    hotelsTitle: 'Precios exactos por persona según hotel y habitación',
    hotelsSubtitle: 'Seleccione un hotel para comparar tarifas Triple, Doble e Individual en dirhams marroquíes.',
    roomTypeTriple: 'Triple',
    roomTypeDouble: 'Doble',
    roomTypeSingle: 'Individual',
    departureColLabel: 'Salida',
    returnColLabel: 'Regreso',
    selectHotelAction: 'Seleccionar hotel',
    selectedHotelBadge: 'Seleccionado',

    itineraryEyebrow: 'Itinerario día a día',
    itineraryTitle: 'Programa interactivo de 7 días en Estambul',
    itinerarySubtitle: 'Explore cada jornada según los carteles oficiales en francés y árabe.',
    itineraryWeatherNote: 'Nota operativa: el orden de actividades puede cambiar según clima, festivos o circunstancias operativas.',

    inclusionsEyebrow: 'Alcance del paquete base',
    inclusionsTitle: 'Incluido vs. No incluido en la tarifa base',
    inclusionsBaseHeading: 'Incluido en el paquete base',
    exclusionsBaseHeading: 'No incluido en el paquete base',

    vipEyebrow: 'Opción facultativa',
    vipTitle: 'Pack d’Istanbul VIP',
    vipPriceDisplay: '1 480 DH',
    vipUnconfirmedBasisWarning: 'Aviso: el cartel no precisa si 1 480 DH es por persona. No se suma automáticamente hasta confirmación.',
    vipTicketsWarning: 'Entradas: solo Miniatürk indica ticket incluido; Mezquita Azul es visita exterior.',

    baggageEyebrow: 'Equipaje adicional opcional',
    baggageTitle: 'Tarifas de equipaje facturado',
    baggageSubtitle: 'La base incluye 10 kg en cabina con Air Arabia I/V. El equipaje facturado no forma parte de los 7 300 DH.',
    baggageNotIncludedBadge: 'No incluido en 7 300 DH',
    baggageAmbiguityWarning: 'Nota: la cobertura de trayecto para 30 kg (550 DH) y 40 kg (720 DH) no está especificada en el cartel.',

    inquiryEyebrow: 'Solicitud por WhatsApp',
    inquiryTitle: 'Solicitar reserva para Turquie – Istanbul',
    inquirySubtitle: 'Elija hotel, habitación y opciones; nuestro equipo verificará disponibilidad y puntos por confirmar.',
    formHotelLabel: 'Hotel preferido',
    formRoomLabel: 'Tipo de habitación',
    formDepartureLabel: 'Opción de salida',
    formTravelersLabel: 'Viajeros',
    formVipCheckboxLabel: 'Interesado en Pack d’Istanbul VIP (1 480 DH — base por confirmar)',
    formVipCheckboxHint: 'No se suma automáticamente al total.',
    formBaggageLabel: 'Equipaje facturado opcional',
    formNameLabel: 'Nombre completo',
    formNamePlaceholder: 'Su nombre completo',
    formPhoneLabel: 'Teléfono / WhatsApp',
    formPhonePlaceholder: '+212 6XX-XXXXXX',
    formNotesLabel: 'Notas adicionales',
    formNotesPlaceholder: 'Comentarios o consultas...',
    formSubmitBtn: 'Preparar solicitud WhatsApp',
    formNoAutoConfirm: 'Sin confirmación automática ni pago en línea.',
    errNameRequired: 'Por favor ingrese su nombre.',
    errPhoneRequired: 'Por favor ingrese su teléfono.',

    quoteBoxEyebrow: 'Resumen verificado',
    quoteBoxTitle: 'Tarifa hotel confirmada (DH / MAD)',
    quoteVerifiedPerPerson: 'Tarifa verificada / persona',
    quoteVerifiedBaseGroup: 'Subtotal base del grupo',
    quotePendingConfirmationTitle: 'Opciones pendientes de confirmación',
    quoteVipPendingLine: 'Pack d’Istanbul VIP: 1 480 DH (por confirmar)',
    quoteBaggageLine: 'Equipaje seleccionado',
    quoteNoUnconfirmedSumNote: 'No se suman totales combinados con opciones no confirmadas.',

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
