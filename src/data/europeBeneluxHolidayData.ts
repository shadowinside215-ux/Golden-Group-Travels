import { Language } from '../assets/destinations';
import heroCoverImg from '../assets/images/europe_paris_benelux_hero_1795608551621.jpg';
import parisTwilightImg from '../assets/images/city_paris_twilight_1794664979599.jpg';
import brugesCanalsImg from '../assets/images/europe_bruges_canals_1795608550769.jpg';
import amsterdamWindmillsImg from '../assets/images/europe_amsterdam_windmills_1795608552845.jpg';
import brusselsGrandPlaceImg from '../assets/images/europe_brussels_grand_place_1795608552556.jpg';

export const EUROPE_BENELUX_HOLIDAY_ROUTE = '/sejours/paris-belgique-pays-bas';
export const EUROPE_BENELUX_BACK_ROUTE = '/sejours';

export const EUROPE_BENELUX_IMAGES = {
  hero: heroCoverImg,
  paris: parisTwilightImg,
  bruges: brugesCanalsImg,
  amsterdam: amsterdamWindmillsImg,
  brussels: brusselsGrandPlaceImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #102a4e 52%, #8e6c24 100%)'
};

export type EuropeRoomType = 'triple' | 'double' | 'single';
export type EuropeDepartureId = 'dec-05' | 'dec-27' | 'jan-23';

export interface EuropeDepartureOption {
  id: EuropeDepartureId;
  departureDate: string;
  returnDate: string;
  label: Record<Language, string>;
  pricesMad: {
    triple: number;
    double: number;
    single: number;
  };
  isStartingPricePeriod?: boolean;
}

export const EUROPE_BENELUX_DEPARTURES: EuropeDepartureOption[] = [
  {
    id: 'dec-05',
    departureDate: '05/12/2026',
    returnDate: '11/12/2026',
    label: {
      fr: 'Départ 05 Décembre 2026',
      ar: 'الانطلاق 05 دجنبر 2026',
      en: 'Departure 05 December 2026',
      es: 'Salida 05 de diciembre de 2026'
    },
    pricesMad: {
      triple: 13200,
      double: 13900,
      single: 17800
    },
    isStartingPricePeriod: true
  },
  {
    id: 'dec-27',
    departureDate: '27/12/2026',
    returnDate: '02/01/2027',
    label: {
      fr: 'Départ 27 Décembre 2026 (Fin d’année)',
      ar: 'الانطلاق 27 دجنبر 2026 (نهاية السنة)',
      en: 'Departure 27 December 2026 (New Year)',
      es: 'Salida 27 de diciembre de 2026 (Fin de año)'
    },
    pricesMad: {
      triple: 13900,
      double: 14700,
      single: 18500
    }
  },
  {
    id: 'jan-23',
    departureDate: '23/01/2027',
    returnDate: '29/01/2027',
    label: {
      fr: 'Départ 23 Janvier 2027',
      ar: 'الانطلاق 23 يناير 2027',
      en: 'Departure 23 January 2027',
      es: 'Salida 23 de enero de 2027'
    },
    pricesMad: {
      triple: 13400,
      double: 13900,
      single: 17800
    }
  }
];

export interface EuropeHotelStay {
  id: string;
  city: Record<Language, string>;
  hotelName: string;
  nights: number;
  nightsLabel: Record<Language, string>;
  image: string;
}

export const EUROPE_BENELUX_HOTELS: EuropeHotelStay[] = [
  {
    id: 'paris-novotel',
    city: {
      fr: 'Paris',
      ar: 'باريس',
      en: 'Paris',
      es: 'París'
    },
    hotelName: 'Novotel Marne-la-Vallée Noisy-le-Grand',
    nights: 2,
    nightsLabel: {
      fr: '2 nuits',
      ar: 'ليلتان',
      en: '2 nights',
      es: '2 noches'
    },
    image: parisTwilightImg
  },
  {
    id: 'brussels-parkinn',
    city: {
      fr: 'Bruxelles',
      ar: 'بروكسل',
      en: 'Brussels',
      es: 'Bruselas'
    },
    hotelName: 'Park Inn by Radisson Brussels Airport',
    nights: 2,
    nightsLabel: {
      fr: '2 nuits',
      ar: 'ليلتان',
      en: '2 nights',
      es: '2 noches'
    },
    image: brusselsGrandPlaceImg
  },
  {
    id: 'amsterdam-artemis',
    city: {
      fr: 'Amsterdam',
      ar: 'أمستردام',
      en: 'Amsterdam',
      es: 'Ámsterdam'
    },
    hotelName: 'Hotel Artemis Amsterdam',
    nights: 2,
    nightsLabel: {
      fr: '2 nuits',
      ar: 'ليلتان',
      en: '2 nights',
      es: '2 noches'
    },
    image: amsterdamWindmillsImg
  }
];

export interface EuropeFlightLeg {
  id: 'outbound' | 'return';
  direction: Record<Language, string>;
  fromCode: string;
  fromCity: Record<Language, string>;
  departureTime: string;
  toCode: string;
  toCity: Record<Language, string>;
  arrivalTime: string;
}

export const EUROPE_BENELUX_FLIGHTS: EuropeFlightLeg[] = [
  {
    id: 'outbound',
    direction: {
      fr: 'Vol Aller (Sous réserve de confirmation)',
      ar: 'رحلة الذهاب (رهن التأكيد النهائي)',
      en: 'Outbound Flight (Subject to confirmation)',
      es: 'Vuelo de Ida (Sujeto a confirmación)'
    },
    fromCode: 'CMN',
    fromCity: {
      fr: 'Casablanca',
      ar: 'الدار البيضاء',
      en: 'Casablanca',
      es: 'Casablanca'
    },
    departureTime: '12h20',
    toCode: 'CDG',
    toCity: {
      fr: 'Paris',
      ar: 'باريس',
      en: 'Paris',
      es: 'París'
    },
    arrivalTime: '16h25'
  },
  {
    id: 'return',
    direction: {
      fr: 'Vol Retour (Sous réserve de confirmation)',
      ar: 'رحلة العودة (رهن التأكيد النهائي)',
      en: 'Return Flight (Subject to confirmation)',
      es: 'Vuelo de Regreso (Sujeto a confirmación)'
    },
    fromCode: 'BRU',
    fromCity: {
      fr: 'Bruxelles',
      ar: 'بروكسل',
      en: 'Brussels',
      es: 'Bruselas'
    },
    departureTime: '17h35',
    toCode: 'CMN',
    toCity: {
      fr: 'Casablanca',
      ar: 'الدار البيضاء',
      en: 'Casablanca',
      es: 'Casablanca'
    },
    arrivalTime: '19h35'
  }
];

export interface EuropeItineraryDay {
  day: number;
  image: string;
  routeBadge: Record<Language, string>;
  title: Record<Language, string>;
  highlights: Record<Language, string[]>;
  notice?: Record<Language, string>;
}

export const EUROPE_BENELUX_ITINERARY_DAYS: EuropeItineraryDay[] = [
  {
    day: 1,
    image: heroCoverImg,
    routeBadge: {
      fr: 'Casablanca → Paris',
      ar: 'الدار البيضاء ← باريس',
      en: 'Casablanca → Paris',
      es: 'Casablanca → París'
    },
    title: {
      fr: 'Jour 1 — Paris : première rencontre avec la Ville Lumière',
      ar: 'اليوم الأول — باريس: اللقاء الأول مع مدينة الأنوار',
      en: 'Day 1 — Paris: First Encounter with the City of Light',
      es: 'Día 1 — París: primer encuentro con la Ciudad de la Luz'
    },
    highlights: {
      fr: [
        'Arrivée à Paris, accueil par notre guide et transfert en autocar privé.',
        'Tour panoramique guidé en autocar des principaux quartiers, grandes places, avenues emblématiques et monuments majeurs.',
        'Découverte des ponts sur la Seine et du patrimoine culturel et architectural parisien.',
        'Installation à l’hôtel (Novotel Marne-la-Vallée Noisy-le-Grand) et nuitée.'
      ],
      ar: [
        'الوصول إلى باريس، الاستقبال من طرف المرشد المرافق والنقل بحافلة خاصة مريحة.',
        'جولة بانورامية بالحافلة عبر أهم الأحياء والساحات الكبرى والشوارع الشهيرة والمعالم البارزة.',
        'اكتشاف جسور نهر السين والتعرف على الإرث الثقافي والمعماري الباريسي.',
        'التسجيل في الفندق (نوفوتيل مارن لا فالي نوازي لو غران) والمبيت.'
      ],
      en: [
        'Arrival in Paris, welcome by your Moroccan tour guide, and private coach transfer.',
        'Guided panoramic coach tour covering the main districts, grand squares, iconic avenues, and major landmarks.',
        'Discovery of the Seine bridges and Parisian cultural and architectural heritage.',
        'Hotel check-in (Novotel Marne-la-Vallée Noisy-le-Grand) and overnight stay.'
      ],
      es: [
        'Llegada a París, bienvenida por nuestro guía acompañante y traslado en autocar privado.',
        'Visita panorámica en autocar por los principales barrios, grandes plazas, avenidas emblemáticas y monumentos.',
        'Descubrimiento de los puentes sobre el Sena y del patrimonio cultural y arquitectónico parisino.',
        'Registro en el hotel (Novotel Marne-la-Vallée Noisy-le-Grand) y alojamiento.'
      ]
    }
  },
  {
    day: 2,
    image: parisTwilightImg,
    routeBadge: {
      fr: 'Paris Historique',
      ar: 'باريس التاريخية',
      en: 'Historic Paris',
      es: 'París Histórico'
    },
    title: {
      fr: 'Jour 2 — Paris historique : entre icônes et quartiers mythiques',
      ar: 'اليوم الثاني — باريس التاريخية: بين الأيقونات والأحياء الأسطورية',
      en: 'Day 2 — Historic Paris: Icons & Mythic Quarters',
      es: 'Día 2 — París histórico: entre iconos y barrios míticos'
    },
    highlights: {
      fr: [
        'Petit-déjeuner à l’hôtel, puis départ vers les environs de la Tour Eiffel.',
        'Visite extérieure du Musée du Louvre et visite extérieure de la Cathédrale Notre-Dame de Paris.',
        'Déjeuner libre.',
        'Découverte du quartier mythique de Montmartre, puis passage par l’Arc de Triomphe et la Place de l’Étoile.',
        'Retour à l’hôtel et nuitée.'
      ],
      ar: [
        'إفطار في الفندق، ثم الانطلاق نحو محيط برج إيفل.',
        'زيارة خارجية لمتحف اللوفر وزيارة خارجية لكاتدرائية نوتردام دو باريس.',
        'غداء حر.',
        'جولة لاكتشاف حي مونمارتر الشهير، ثم التوجه نحو قوس النصر وساحة النجمة (Place de l’Étoile).',
        'العودة إلى الفندق والمبيت.'
      ],
      en: [
        'Breakfast at the hotel, then departure toward the Eiffel Tower area.',
        'Exterior visit of the Louvre Museum and exterior visit of Notre-Dame de Paris Cathedral.',
        'Free time for lunch.',
        'Visit to the iconic Montmartre district, followed by the Arc de Triomphe and Place de l’Étoile.',
        'Return to the hotel and overnight stay.'
      ],
      es: [
        'Desayuno en el hotel y salida hacia los alrededores de la Torre Eiffel.',
        'Visita exterior del Museo del Louvre y visita exterior de la Catedral de Notre-Dame de París.',
        'Almuerzo libre.',
        'Visita al emblemático barrio de Montmartre, seguida del Arco de Triunfo y la Plaza de la Estrella.',
        'Regreso al hotel y noche.'
      ]
    },
    notice: {
      fr: 'Visites extérieures uniquement pour le Louvre et Notre-Dame ; l’accès intérieur aux monuments (Tour Eiffel, Louvre) n’est pas inclus.',
      ar: 'الزيارة خارجية فقط لمتحف اللوفر وكاتدرائية نوتردام؛ تذاكر الدخول الداخلي إلى المعالم (برج إيفل، اللوفر) غير مشمولة.',
      en: 'Exterior visits only for the Louvre and Notre-Dame; interior entrance tickets (Eiffel Tower, Louvre) are not included.',
      es: 'Visitas únicamente exteriores para el Louvre y Notre-Dame; no incluye entradas interiores.'
    }
  },
  {
    day: 3,
    image: brugesCanalsImg,
    routeBadge: {
      fr: 'Paris → Bruges → Amsterdam',
      ar: 'باريس ← بروج ← أمستردام',
      en: 'Paris → Bruges → Amsterdam',
      es: 'París → Brujas → Ámsterdam'
    },
    title: {
      fr: 'Jour 3 — Paris, Bruges et Amsterdam',
      ar: 'اليوم الثالث — باريس، بروج وأمستردام',
      en: 'Day 3 — Paris, Bruges & Amsterdam',
      es: 'Día 3 — París, Brujas y Ámsterdam'
    },
    highlights: {
      fr: [
        'Petit-déjeuner à l’hôtel, puis départ vers Bruges (environ 3h30 de route).',
        'Visite guidée de Bruges (« la Venise du Nord ») : Grand-Place (Markt) et Beffroi, Béguinage, Cathédrale Saint-Sauveur, Place Jan van Eyck, Place du Burg, Hôtel de Ville et Basilique du Saint-Sang.',
        'Balade pittoresque le long des canaux en passant par le Marché aux Poissons, la Place des Tanneurs, l’Église Notre-Dame et l’Ancien Hôpital Saint-Jean, jusqu’au Lac d’Amour (Minnewater).',
        'Déjeuner libre, puis route vers Amsterdam (environ 3h).',
        'Arrivée à Amsterdam : temps libre pour flâner le long des canaux, explorer les ruelles animées ou vous détendre dans un café local. Nuitée à l’hôtel.'
      ],
      ar: [
        'إفطار في الفندق، ثم الانطلاق نحو مدينة بروج البلجيكية (حوالي 3 ساعات و30 دقيقة).',
        'جولة سياحية مصحوبة في بروج («بندقية الشمال»): الساحة الكبرى (Markt) وبرج الجرس (Belfry)، الدير التاريخي (Béguinage)، كاتدرائية القديس سالفادور، ساحة يان فان إيك، ساحة بورغ، دار البلدية وكنيسة الدم المقدس.',
        'نزهة ممتعة على ضفاف القنوات المائية مروراً بسوق السمك (Fish Market)، ساحة الدباغين (Place des Tanneurs)، كنيسة السيدة العذراء، ومستشفى القديس يوحنا القديم وصولاً إلى بحيرة الحب (Lac d’Amour / Minnewater).',
        'غداء حر، ثم مواصلة الطريق نحو أمستردام (حوالي 3 ساعات).',
        'الوصول إلى أمستردام: وقت حر لاستكشاف القنوات المائية والأزقة الحيوية أو الاسترخاء في أحد المقاهي المحلية، ثم المبيت في الفندق.'
      ],
      en: [
        'Breakfast at the hotel, then departure for Bruges (approx. 3h30 drive).',
        'Guided tour of Bruges ("Venice of the North"): Market Square & Belfry, Beguinage, Saint-Salvador Cathedral, Jan van Eyck Square, Burg Square, Town Hall, and Basilica of the Holy Blood.',
        'Scenic stroll along the canals passing the Fish Market, Tanners Square (Place des Tanneurs), Church of Our Lady, and Old St. John’s Hospital up to the Lake of Love (Minnewater).',
        'Free lunch, then continue toward Amsterdam (approx. 3h drive).',
        'Arrival in Amsterdam: free time to explore the canals, wander lively alleys, or relax at a local café. Overnight at the hotel.'
      ],
      es: [
        'Desayuno y salida hacia Brujas (aprox. 3h30).',
        'Visita guiada de Brujas («la Venecia del Norte»): Plaza Mayor (Markt) y Campanario, Beaterio, Catedral de San Salvador, Plaza Jan van Eyck, Plaza Burg, Ayuntamiento y Basílica de la Santa Sangre.',
        'Paseo pintoresco por los canales pasando por la Lonja del Pescado, Plaza de los Curtidores, Iglesia de Nuestra Señora y Antiguo Hospital de San Juan hasta el Lago del Amor (Minnewater).',
        'Almuerzo libre y continuación hacia Ámsterdam (aprox. 3h).',
        'Llegada a Ámsterdam: tiempo libre para recorrer sus canales y callejuelas animadas o descansar en un café local. Alojamiento.'
      ]
    }
  },
  {
    day: 4,
    image: amsterdamWindmillsImg,
    routeBadge: {
      fr: 'Amsterdam & Zaanse Schans',
      ar: 'أمستردام وزانسي شانس',
      en: 'Amsterdam & Zaanse Schans',
      es: 'Ámsterdam y Zaanse Schans'
    },
    title: {
      fr: 'Jour 4 — Amsterdam et Zaanse Schans',
      ar: 'اليوم الرابع — أمستردام وقرية الطواحين زانسي شانس',
      en: 'Day 4 — Amsterdam & Zaanse Schans',
      es: 'Día 4 — Ámsterdam y Zaanse Schans'
    },
    highlights: {
      fr: [
        'Petit-déjeuner à l’hôtel, puis découverte de la Place du Dam (cœur historique et culturel) : Palais Royal, Nieuwe Kerk et Monument National.',
        'Passage par le quartier des musées (Museumplein) à proximité des célèbres musées Van Gogh, Rijksmuseum, Stedelijk et du Diamant.',
        'Excursion au village traditionnel de Zaanse Schans : moulins à vent historiques, visite de la fromagerie Catharina Hoeve et de l’atelier traditionnel de sabots en bois Kooijman Souvenirs & Clogs.',
        'Retour à Amsterdam (Hotel Artemis Amsterdam) et nuitée.'
      ],
      ar: [
        'إفطار في الفندق، ثم التوجه إلى ساحة دام (Dam Square، القلب التاريخي والثقافي): القصر الملكي، الكنيسة الجديدة (Nieuwe Kerk) والنصب التذكاري الوطني.',
        'الانتقال إلى ساحة المتاحف (Museumplein) بالقرب من متاحف فان غوخ، ريكسموزيوم، ستيديليك ومتحف الألماس.',
        'رحلة إلى قرية الطواحين التقليدية زانسي شانس (Zaanse Schans): الطواحين الهوائية التقليدية، مصنع الجبن كاتارينا هوف (Catharina Hoeve)، وورشة صناعة الأحذية الخشبية التقليدية كويجمان (Kooijman).',
        'العودة إلى الفندق في أمستردام والمبيت.'
      ],
      en: [
        'Breakfast at the hotel, then discover Dam Square (historic & cultural heart): Royal Palace, Nieuwe Kerk, and National Monument.',
        'Head to Museumplein near the Van Gogh Museum, Rijksmuseum, Stedelijk Museum, and Diamond Museum.',
        'Excursion to the traditional village of Zaanse Schans: iconic windmills, Catharina Hoeve cheese farm, and Kooijman Souvenirs & Clogs wooden clog workshop.',
        'Return to Amsterdam (Hotel Artemis Amsterdam) and overnight stay.'
      ],
      es: [
        'Desayuno y visita a la Plaza Dam (corazón histórico y cultural): Palacio Real, Nieuwe Kerk y Monumento Nacional.',
        'Recorrido por Museumplein junto a los museos Van Gogh, Rijksmuseum, Stedelijk y del Diamante.',
        'Excursión a Zaanse Schans: molinos de viento tradicionales, granja de quesos Catharina Hoeve y taller de zuecos de madera Kooijman Souvenirs & Clogs.',
        'Regreso al hotel en Ámsterdam y alojamiento.'
      ]
    },
    notice: {
      fr: 'La mention des musées sur Museumplein situe le quartier ; les billets d’entrée aux musées (Van Gogh, Rijksmuseum, Stedelijk, Diamant) ne sont pas inclus.',
      ar: 'ذكر المتاحف في ساحة المتاحف يحدد الموقع فقط؛ تذاكر الدخول إلى المتاحف (فان غوخ، ريكسموزيوم، ستيديليك، الألماس) غير مشمولة.',
      en: 'Naming the museums at Museumplein refers to the surroundings; museum admission tickets are not implied or included.',
      es: 'La mención de los museos en Museumplein es de referencia de zona; las entradas a los museos no están incluidas.'
    }
  },
  {
    day: 5,
    image: amsterdamWindmillsImg,
    routeBadge: {
      fr: 'Amsterdam → La Haye → Rotterdam → Bruxelles',
      ar: 'أمستردام ← لاهاي ← روتردام ← بروكسل',
      en: 'Amsterdam → The Hague → Rotterdam → Brussels',
      es: 'Ámsterdam → La Haya → Róterdam → Bruselas'
    },
    title: {
      fr: 'Jour 5 — Amsterdam, La Haye, Rotterdam et Bruxelles',
      ar: 'اليوم الخامس — أمستردام، لاهاي، روتردام وبروكسل',
      en: 'Day 5 — Amsterdam, The Hague, Rotterdam & Brussels',
      es: 'Día 5 — Ámsterdam, La Haya, Róterdam y Bruselas'
    },
    highlights: {
      fr: [
        'Petit-déjeuner à l’hôtel, puis départ vers La Haye (Den Haag).',
        'Découverte extérieure de la Cour pénale internationale (CPI / ICC) et de la Cour internationale de justice (CIJ / ICJ), sous réserve des disponibilités et conditions d’accès.',
        'Route vers Rotterdam, ville à l’architecture moderne et innovante, avec arrêt photo aux célèbres Maisons Cubiques inclinées à 45°.',
        'Déjeuner libre, puis départ vers Bruxelles (environ 2h de route). Temps libre à Bruxelles et nuitée à l’hôtel (Park Inn by Radisson Brussels Airport).'
      ],
      ar: [
        'إفطار في الفندق، ثم الانطلاق نحو مدينة لاهاي (Den Haag).',
        'زيارة خارجية للمحكمة الجنائية الدولية (CPI/ICC) ومحكمة العدل الدولية (CIJ/ICJ)، رهناً بتوفر إمكانية الزيارة وشروط الولوج.',
        'مواصلة المسار نحو روتردام، المدينة ذات الهندسة المعمارية الحديثة والمبتكرة، مع زيارة وتوقف للتصوير أمام المنازل المكعبة المصممة بزاوية 45 درجة.',
        'غداء حر، ثم التوجه نحو بروكسل (حوالي ساعتين). وقت حر في بروكسل والمبيت في الفندق.'
      ],
      en: [
        'Breakfast at the hotel, then depart for The Hague.',
        'Exterior visit of the International Criminal Court (ICC) and the International Court of Justice (ICJ), subject to visiting availability and access rules.',
        'Continue to Rotterdam, famed for its modern innovative architecture, with photo stops at the famous 45°-tilted Cube Houses.',
        'Free lunch, then drive to Brussels (approx. 2h). Free time in Brussels and overnight at the hotel (Park Inn by Radisson Brussels Airport).'
      ],
      es: [
        'Desayuno y salida hacia La Haya.',
        'Visita exterior de la Corte Penal Internacional (CPI/ICC) y la Corte Internacional de Justicia (CIJ/ICJ), sujeta a disponibilidad de visita.',
        'Salida hacia Róterdam, de arquitectura moderna e innovadora, con visita y fotos en las Casas Cúbicas inclinadas a 45°.',
        'Almuerzo libre y continuación a Bruselas (aprox. 2h). Tiempo libre en Bruselas y alojamiento.'
      ]
    },
    notice: {
      fr: 'La visite de la CPI et de la CIJ à La Haye s’effectue en extérieur et/ou selon les disponibilités officielles d’ouverture.',
      ar: 'زيارة المحكمة الجنائية الدولية ومحكمة العدل الدولية في لاهاي تكون خارجية و/أو حسب توفر مواعيد الزيارة الرسمية.',
      en: 'Visits to the ICC and ICJ in The Hague are exterior / subject to official visiting availability.',
      es: 'La visita a la CPI y la CIJ en La Haya es exterior y sujeta a disponibilidad oficial de apertura.'
    }
  },
  {
    day: 6,
    image: brusselsGrandPlaceImg,
    routeBadge: {
      fr: 'Bruxelles',
      ar: 'بروكسل',
      en: 'Brussels',
      es: 'Bruselas'
    },
    title: {
      fr: 'Jour 6 — Bruxelles : institutions européennes, Atomium et Grand-Place',
      ar: 'اليوم السادس — بروكسل: البرلمان الأوروبي، الأتوميوم والساحة الكبرى',
      en: 'Day 6 — Brussels: European Parliament, Atomium & Grand-Place',
      es: 'Día 6 — Bruselas: Parlamento Europeo, Atomium y Grand-Place'
    },
    highlights: {
      fr: [
        'Petit-déjeuner à l’hôtel, puis visite du Parlement européen (espaces pédagogiques et interactifs multilingues sur l’histoire, le rôle et l’avenir de l’institution).',
        'Visite extérieure de l’Atomium, édifice emblématique construit en 1958 pour l’Exposition universelle de Bruxelles, haut de 102 mètres.',
        'Découverte de la Grand-Place de Bruxelles (maisons de corporations, Hôtel de Ville et Maison du Roi), classée au patrimoine mondial de l’UNESCO depuis 1998.',
        'Temps libre pour la découverte personnelle et le shopping, puis nuitée à l’hôtel.'
      ],
      ar: [
        'إفطار في الفندق، ثم زيارة البرلمان الأوروبي (فضاءات تعليمية تفاعلية متعددة اللغات حول تاريخ ودور ومستقبل البرلمان).',
        'زيارة خارجية لمعلمة الأتوميوم (Atomium) التي شُيّدت سنة 1958 بمناسبة المعرض العالمي لبروكسل بارتفاع 102 متر.',
        'جولة في الساحة الكبرى لبروكسل (Grand-Place) بمباني النقابات ودار البلدية وبيت الملك، المصنفة ضمن التراث العالمي لليونسكو منذ 1998.',
        'وقت حر للاستكشاف والتسوق، ثم المبيت في الفندق.'
      ],
      en: [
        'Breakfast at the hotel, then visit the European Parliament (interactive multilingual educational spaces covering its history, role, and future).',
        'Exterior visit of the Atomium, built in 1958 for the Brussels World’s Fair and standing 102 meters tall.',
        'Explore the Grand-Place of Brussels (guildhalls, Town Hall, King’s House / Maison du Roi), a UNESCO World Heritage Site since 1998.',
        'Free time for personal exploration and shopping, then overnight at the hotel.'
      ],
      es: [
        'Desayuno y visita al Parlamento Europeo (espacios educativos interactivos multilingües sobre su historia, función y futuro).',
        'Visita exterior del Atomium, construido en 1958 para la Exposición Universal de Bruselas con 102 metros de altura.',
        'Visita a la Grand-Place de Bruselas (casas gremiales, Ayuntamiento y Casa del Rey), Patrimonio de la Humanidad de la UNESCO desde 1998.',
        'Tiempo libre para pasear y realizar compras, y última noche en el hotel.'
      ]
    },
    notice: {
      fr: 'Visite extérieure uniquement pour l’Atomium (accès intérieur non inclus).',
      ar: 'الزيارة خارجية فقط لمعلمة الأتوميوم.',
      en: 'Exterior visit only at the Atomium.',
      es: 'Visita únicamente exterior al Atomium.'
    }
  },
  {
    day: 7,
    image: brusselsGrandPlaceImg,
    routeBadge: {
      fr: 'Bruxelles → Casablanca',
      ar: 'بروكسل ← الدار البيضاء',
      en: 'Brussels → Casablanca',
      es: 'Bruselas → Casablanca'
    },
    title: {
      fr: 'Jour 7 — Bruxelles, retour au Maroc',
      ar: 'اليوم السابع — بروكسل، العودة إلى المغرب',
      en: 'Day 7 — Brussels, Return to Morocco',
      es: 'Día 7 — Bruselas, regreso a Marruecos'
    },
    highlights: {
      fr: [
        'Petit-déjeuner à l’hôtel, puis transfert privé vers l’aéroport de Bruxelles (BRU).',
        'Formalités d’enregistrement et d’embarquement.',
        'Vol retour à destination de Casablanca (Maroc).'
      ],
      ar: [
        'إفطار في الفندق، ثم النقل الخاص إلى مطار بروكسل (BRU).',
        'إجراءات التسجيل والركوب في المطار.',
        'رحلة العودة إلى الدار البيضاء (المغرب).'
      ],
      en: [
        'Breakfast at the hotel, followed by private transfer to Brussels Airport (BRU).',
        'Check-in and boarding formalities.',
        'Return flight to Casablanca, Morocco.'
      ],
      es: [
        'Desayuno en el hotel y traslado privado al aeropuerto de Bruselas (BRU).',
        'Trámites de facturación y embarque.',
        'Vuelo de regreso hacia Casablanca, Marruecos.'
      ]
    }
  }
];

export const EUROPE_BENELUX_INCLUSIONS: Record<Language, string[]> = {
  fr: [
    'Billets d’avion aller-retour (Casablanca → Paris / Bruxelles → Casablanca)',
    'Transferts aéroport – hôtel – aéroport',
    'Transport confortable et climatisé tout au long du circuit',
    'Hébergement à l’hôtel pendant 6 nuits (Paris 2 nuits, Bruxelles 2 nuits, Amsterdam 2 nuits)',
    'Petits-déjeuners mentionnés dans le programme',
    'Toutes les visites et entrées mentionnées dans le programme',
    'Accompagnement par un guide marocain tout au long du voyage',
    'Bagages (23 kg en soute aller/retour + 10 kg en cabine) : sous réserve de confirmation de la compagnie aérienne finale'
  ],
  ar: [
    'تذاكر الطيران ذهاباً وإياباً (الدار البيضاء ← باريس / بروكسل ← الدار البيضاء)',
    'النقل من المطار إلى الفندق ومن الفندق إلى المطار',
    'نقل بري مريح ومكيف طوال الرحلة',
    'الإقامة الفندقية لمدة 6 ليالٍ (باريس ليلتان، بروكسل ليلتان، أمستردام ليلتان)',
    'وجبات الإفطار المذكورة في البرنامج',
    'جميع الزيارات والدخوليات المذكورة في البرنامج',
    'مرافقة مرشد مغربي طوال مدة الرحلة',
    'الأمتعة (23 كغ في الشحن ذهاباً وإياباً + 10 كغ في المقصورة): قيد التأكيد بناءً على شركة الطيران النهائية'
  ],
  en: [
    'Round-trip flight tickets (Casablanca → Paris / Brussels → Casablanca)',
    'Airport – hotel – airport transfers',
    'Comfortable air-conditioned coach transport throughout the tour',
    '6 nights hotel accommodation (Paris 2 nights, Brussels 2 nights, Amsterdam 2 nights)',
    'Breakfasts mentioned in the program',
    'All visits and entries explicitly mentioned in the program',
    'Accompaniment by a Moroccan tour guide throughout the journey',
    'Baggage allowance (23 kg checked outbound/return + 10 kg cabin): pending confirmation depending on the final airline'
  ],
  es: [
    'Billetes de avión ida y vuelta (Casablanca → París / Bruselas → Casablanca)',
    'Traslados aeropuerto – hotel – aeropuerto',
    'Transporte cómodo y climatizado durante todo el circuito',
    'Alojamiento en hotel durante 6 noches (París 2 noches, Bruselas 2 noches, Ámsterdam 2 noches)',
    'Desayunos mencionados en el programa',
    'Todas las visitas y entradas mencionadas en el programa',
    'Acompañamiento de un guía marroquí durante todo el viaje',
    'Equipaje (23 kg facturado ida/vuelta + 10 kg de mano): pendiente de confirmación según la aerolínea final'
  ]
};

export const EUROPE_BENELUX_EXCLUSIONS: Record<Language, string[]> = {
  fr: [
    'Les repas : déjeuners et dîners',
    'Les pourboires : prévoir 5 € par personne pour le chauffeur',
    'Toutes les dépenses personnelles et prestations non mentionnées au programme'
  ],
  ar: [
    'الوجبات: وجبتا الغداء والعشاء',
    'الإكراميات: يُرجى احتساب 5 يورو للشخص الواحد للسائق',
    'جميع المصاريف الشخصية والخدمات غير المذكورة في البرنامج'
  ],
  en: [
    'Meals: lunches and dinners',
    'Gratuities / tips: allow €5 per person for the driver',
    'All personal expenses and services not mentioned in the program'
  ],
  es: [
    'Comidas: almuerzos y cenas',
    'Propinas: prever 5 € por persona para el conductor',
    'Todos los gastos personales y servicios no mencionados en el programa'
  ]
};

export interface EuropeChildPolicyItem {
  id: 'under2' | 'from2to5' | 'from5to12' | 'family4';
  ageBracket: Record<Language, string>;
  rateBadge: Record<Language, string>;
  details: Record<Language, string>;
}

export const EUROPE_BENELUX_CHILD_POLICIES: EuropeChildPolicyItem[] = [
  {
    id: 'under2',
    ageBracket: {
      fr: 'Enfant < 2 ans',
      ar: 'أقل من سنتين',
      en: 'Infant under 2 years',
      es: 'Menor de 2 años'
    },
    rateBadge: {
      fr: '2 700 MAD',
      ar: '2 700 درهم',
      en: '2,700 MAD',
      es: '2 700 MAD'
    },
    details: {
      fr: 'Sans siège dédié dans l’autocar.',
      ar: 'بدون مقعد مخصص في الحافلة.',
      en: 'Provided no separate bus seat is needed.',
      es: 'Sin asiento independiente en el autocar.'
    }
  },
  {
    id: 'from2to5',
    ageBracket: {
      fr: 'Enfant de 2 à < 5 ans',
      ar: 'من سنتين إلى أقل من 5 سنوات',
      en: 'Child 2 to under 5 years',
      es: 'Niño de 2 a menos de 5 años'
    },
    rateBadge: {
      fr: '7 700 MAD',
      ar: '7 700 درهم',
      en: '7,700 MAD',
      es: '7 700 MAD'
    },
    details: {
      fr: 'En partageant le lit des parents. Si un lit séparé est demandé, réservation en chambre Triple facturée en conséquence.',
      ar: 'مع مشاركة سرير الوالدين. في حال طلب سرير مستقل، يتم الحجز في غرفة ثلاثية وتُطبَّق تعريفتها.',
      en: 'Sharing parents’ bed. If a separate bed is required, booking is made as a Triple room and billed accordingly.',
      es: 'Compartiendo la cama de los padres. Si se solicita cama separada, se reserva en habitación Triple con su tarifa correspondiente.'
    }
  },
  {
    id: 'from5to12',
    ageBracket: {
      fr: 'Enfant de 5 à 12 ans',
      ar: 'من 5 إلى 12 سنة',
      en: 'Child 5 to 12 years',
      es: 'Niño de 5 a 12 años'
    },
    rateBadge: {
      fr: 'Réduction de 1 500 MAD',
      ar: 'تخفيض 1 500 درهم',
      en: '1,500 MAD reduction',
      es: 'Descuento de 1 500 MAD'
    },
    details: {
      fr: 'Réduction conditionnelle applicable sur le tarif adulte régulier après validation par l’agence (non déduite automatiquement).',
      ar: 'تخفيض مشروط يُطبَّق على التعرفة العادية بعد التحقق من الوكالة (لا يُخصم تلقائياً).',
      en: 'Conditional reduction applicable to the standard adult fare subject to agency confirmation (not auto-deducted).',
      es: 'Reducción condicional aplicable sobre la tarifa estándar tras validación de la agencia (no descontada automáticamente).'
    }
  },
  {
    id: 'family4',
    ageBracket: {
      fr: 'Chambre familiale (4 pers.)',
      ar: 'غرفة عائلية (4 أشخاص)',
      en: 'Family Room (4 persons)',
      es: 'Habitación familiar (4 pers.)'
    },
    rateBadge: {
      fr: 'Sur demande',
      ar: 'حسب الطلب',
      en: 'On request',
      es: 'Bajo petición'
    },
    details: {
      fr: 'Disponible sur demande selon les disponibilités hôtelières ; tarif exact communiqué par nos conseillers lors de la demande.',
      ar: 'متوفرة حسب الطلب وتوافر الفنادق؛ يُقدَّم السعر الفعلي عند الاستفسار.',
      en: 'Available on request subject to hotel availability; exact rate quoted upon inquiry.',
      es: 'Disponible bajo petición según disponibilidad hotelera; tarifa comunicada al consultar.'
    }
  }
];

export interface EuropeBeneluxCopy {
  showcaseEyebrow: string;
  showcaseTitle: string;
  showcaseArabicTitle: string;
  showcaseSubtitle: string;
  showcaseCollaboration: string;
  showcaseDepartureLabel: string;
  showcaseStartingFromLabel: string;
  showcaseStartingPrice: string;
  showcaseStartingScopeNote: string;
  showcaseDescription: string;
  showcaseHighlights: string[];
  showcaseAirlineNotice: string;
  showcaseViewPackageBtn: string;
  showcaseReserveBtn: string;
  backToSejours: string;
  backToHome: string;
  heroEyebrow: string;
  heroDurationBadge: string;
  heroCollaborationBadge: string;
  heroStartingScope: string;
  heroCtaReserve: string;
  heroCtaItinerary: string;
  destinationsStripLabel: string;
  airlineDiscrepancyTitle: string;
  airlineDiscrepancyBody: string;
  pricingEyebrow: string;
  pricingTitle: string;
  pricingSubtitle: string;
  colDeparture: string;
  colReturn: string;
  colTriple: string;
  colDouble: string;
  colSingle: string;
  roomTypeTriple: string;
  roomTypeDouble: string;
  roomTypeSingle: string;
  selectRoomHint: string;
  hotelsFlightsEyebrow: string;
  hotelsFlightsTitle: string;
  hotelsColTitle: string;
  totalSixNightsBadge: string;
  flightsColTitle: string;
  flightsSubjectNotice: string;
  flightsAirlinePendingLine: string;
  flightsBaggagePendingLine: string;
  itineraryEyebrow: string;
  itineraryTitle: string;
  itinerarySubtitle: string;
  expandAllLabel: string;
  collapseAllLabel: string;
  dayPrefix: string;
  inclusionsEyebrow: string;
  inclusionsTitle: string;
  priceIncludesHeading: string;
  priceExcludesHeading: string;
  childPolicyEyebrow: string;
  childPolicyTitle: string;
  childPolicyDisclaimer: string;
  inquiryEyebrow: string;
  inquiryTitle: string;
  inquirySubtitle: string;
  formDepartureLabel: string;
  formRoomLabel: string;
  formAdultsLabel: string;
  formChildInquiryLabel: string;
  formChildNone: string;
  formChildUnder2: string;
  formChild2To5: string;
  formChild5To12: string;
  formFamilyRoomCheck: string;
  formFamilyRoomHint: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formNotesLabel: string;
  formNotesPlaceholder: string;
  formSubmitBtn: string;
  formNoAutoConfirm: string;
  quoteBoxEyebrow: string;
  quoteBoxTitle: string;
  quoteVerifiedPerPerson: string;
  quoteVerifiedAdultsTotal: string;
  quoteSelectedDates: string;
  quotePendingBlockTitle: string;
  quoteNoAutoChildDiscountNote: string;
  advisorLabel: string;
  advisorTitle: string;
  advisorCallLabel: string;
  advisorMapsLabel: string;
  submittedTitle: string;
  submittedBody: string;
  submittedNewBtn: string;
  openWhatsappAgain: string;
  errorName: string;
  errorPhone: string;
}

export const EUROPE_BENELUX_COPY: Record<Language, EuropeBeneluxCopy> = {
  fr: {
    showcaseEyebrow: 'Voyages organisés · Europe & Benelux',
    showcaseTitle: 'Paris, Belgique et Pays-Bas',
    showcaseArabicTitle: 'باريس، بلجيكا وهولندا',
    showcaseSubtitle: '7 jours / 6 nuits · Au départ de Casablanca',
    showcaseCollaboration: 'En collaboration avec Le Riad Fès',
    showcaseDepartureLabel: 'Départ Casablanca (CMN)',
    showcaseStartingFromLabel: 'À partir de',
    showcaseStartingPrice: '13 200 MAD / pers.',
    showcaseStartingScopeNote: 'Tarif applicable uniquement au départ du 05/12/2026 en chambre Triple.',
    showcaseDescription:
      'Circuit organisé de 7 jours / 6 nuits reliant Paris, Bruges, Amsterdam, Zaanse Schans, La Haye, Rotterdam et Bruxelles avec guide marocain et hôtels 3★/4★ sélectionnés.',
    showcaseHighlights: [
      'Paris (2 nuits), Bruxelles (2 nuits) et Amsterdam (2 nuits)',
      'Bruges, canaux & Lac d’Amour + Zaanse Schans (moulins & fromagerie)',
      'La Haye, Rotterdam (Maisons Cubiques) & Bruxelles (Parlement, Grand-Place)',
      '3 dates : 05/12/2026, 27/12/2026 et 23/01/2027'
    ],
    showcaseAirlineNotice:
      'Compagnie aérienne & franchise bagages en attente de confirmation (Air Arabia vs Royal Air Maroc sur les brochures).',
    showcaseViewPackageBtn: 'Voir le programme complet',
    showcaseReserveBtn: 'Demander une réservation',
    backToSejours: 'Retour aux Séjours & Voyages',
    backToHome: 'Accueil',
    heroEyebrow: 'Voyages Organisés · En collaboration avec Le Riad Fès',
    heroDurationBadge: '7 jours / 6 nuits',
    heroCollaborationBadge: 'En collaboration avec Le Riad Fès',
    heroStartingScope: 'Base chambre Triple — départ du 05/12/2026 uniquement',
    heroCtaReserve: 'Demander un devis / réserver',
    heroCtaItinerary: 'Programme jour par jour',
    destinationsStripLabel:
      'Paris • Bruges • Amsterdam • Zaanse Schans • La Haye • Rotterdam • Bruxelles',
    airlineDiscrepancyTitle:
      'Information importante à confirmer : Compagnie aérienne & bagages',
    airlineDiscrepancyBody:
      'La brochure tarifaire mentionne Air Arabia tandis que la fiche des prestations incluses mentionne Royal Air Maroc. Dans l’attente de la confirmation définitive de l’administration, la compagnie aérienne ainsi que la franchise bagages annoncée (23 kg en soute aller/retour + 10 kg en cabine) restent affichées sous réserve de confirmation.',
    pricingEyebrow: 'Tarifs officiels par personne (MAD / DH)',
    pricingTitle: 'Dates de départ et grille tarifaire',
    pricingSubtitle:
      'Cliquez sur une date et une occupation (Triple, Double ou Single) pour simuler votre tarif adulte exact et pré-remplir votre demande.',
    colDeparture: 'Date aller',
    colReturn: 'Date retour',
    colTriple: 'Triple',
    colDouble: 'Double',
    colSingle: 'Single',
    roomTypeTriple: 'Chambre Triple',
    roomTypeDouble: 'Chambre Double',
    roomTypeSingle: 'Chambre Single',
    selectRoomHint: 'Tarif vérifié en Dirhams Marocains (MAD) par personne.',
    hotelsFlightsEyebrow: 'Hébergement & Aérien',
    hotelsFlightsTitle: 'Hôtels sélectionnés (6 nuits) & Horaires de vol',
    hotelsColTitle: 'Hôtels du circuit',
    totalSixNightsBadge: 'Total : 6 nuits',
    flightsColTitle: 'Horaires de vol annoncés',
    flightsSubjectNotice: 'Horaires communiqués sous réserve de confirmation.',
    flightsAirlinePendingLine:
      'Compagnie aérienne en attente de validation : Air Arabia (brochure tarifs) vs Royal Air Maroc (brochure inclus).',
    flightsBaggagePendingLine:
      'Bagages annoncés : 23 kg en soute A/R + 10 kg en cabine — en attente de confirmation selon la compagnie retenue.',
    itineraryEyebrow: 'Itinéraire complet 7 jours / 6 nuits',
    itineraryTitle: 'Programme détaillé jour par jour',
    itinerarySubtitle:
      'Cliquez sur chaque journée pour déployer ou replier les étapes, visites extérieures et précisions pratiques.',
    expandAllLabel: 'Tout déployer',
    collapseAllLabel: 'Tout replier',
    dayPrefix: 'Jour',
    inclusionsEyebrow: 'Prestations & Conditions',
    inclusionsTitle: 'Le prix comprend / Ne comprend pas',
    priceIncludesHeading: 'Le prix comprend',
    priceExcludesHeading: 'Le prix ne comprend pas',
    childPolicyEyebrow: 'Familles & Enfants',
    childPolicyTitle: 'Conditions tarifaires enfants & chambre familiale',
    childPolicyDisclaimer:
      'Les tarifs enfants et demandes de chambre familiale (4 personnes) sont traités sur validation de nos conseillers selon la date et la disponibilité hôtelière ; aucune remise n’est déduite automatiquement.',
    inquiryEyebrow: 'Demande de réservation personnalisée',
    inquiryTitle: 'Réservez votre départ Paris, Belgique & Pays-Bas',
    inquirySubtitle:
      'Finalisez votre pré-demande via WhatsApp pour vérifier les disponibilités aériennes et hôtelières en temps réel avec notre équipe.',
    formDepartureLabel: 'Date de départ souhaitée',
    formRoomLabel: 'Type de chambre',
    formAdultsLabel: 'Nombre d’adultes',
    formChildInquiryLabel: 'Information enfant à inclure dans la demande (optionnel)',
    formChildNone: 'Aucun enfant / Adultes uniquement',
    formChildUnder2: 'Enfant < 2 ans (2 700 MAD sans siège bus)',
    formChild2To5: 'Enfant 2 à < 5 ans (7 700 MAD lit parents, ou Triple si lit séparé)',
    formChild5To12: 'Enfant 5 à 12 ans (demande de réduction 1 500 MAD sous conditions)',
    formFamilyRoomCheck: 'Demander les disponibilités pour une Chambre Familiale (4 personnes)',
    formFamilyRoomHint:
      'Tarif et disponibilité communiqués directement par l’agence selon l’hôtel et la date.',
    formNameLabel: 'Nom complet',
    formNamePlaceholder: 'Ex : Salma Benali',
    formPhoneLabel: 'Téléphone / WhatsApp',
    formPhonePlaceholder: '+212 6 XX XX XX XX',
    formNotesLabel: 'Précisions complémentaires',
    formNotesPlaceholder: 'Âge exact des enfants, préférences de chambre, questions sur les vols...',
    formSubmitBtn: 'Envoyer la demande sur WhatsApp',
    formNoAutoConfirm:
      'L’envoi de ce formulaire ouvre une demande de devis/réservation auprès d’un conseiller ; il ne constitue ni un paiement ni une confirmation automatique.',
    quoteBoxEyebrow: 'Récapitulatif tarifaire vérifié',
    quoteBoxTitle: 'Votre sélection adulte',
    quoteVerifiedPerPerson: 'Tarif adulte par personne',
    quoteVerifiedAdultsTotal: 'Sous-total adultes',
    quoteSelectedDates: 'Dates sélectionnées',
    quotePendingBlockTitle: 'Éléments soumis à confirmation agence',
    quoteNoAutoChildDiscountNote:
      'Les demandes enfants / chambre familiale et la confirmation de la compagnie aérienne (Air Arabia / RAM) sont confirmées séparément sur devis.',
    advisorLabel: 'Assistance directe',
    advisorTitle: 'Parler à un conseiller Golden Group',
    advisorCallLabel: 'Appeler',
    advisorMapsLabel: 'Localiser l’agence à Salé',
    submittedTitle: 'Demande prête sur WhatsApp',
    submittedBody:
      'Votre récapitulatif complet a été généré. Si la fenêtre WhatsApp ne s’est pas ouverte, utilisez le bouton ci-dessous.',
    submittedNewBtn: 'Modifier ma demande',
    openWhatsappAgain: 'Ouvrir WhatsApp',
    errorName: 'Veuillez saisir votre nom complet.',
    errorPhone: 'Veuillez saisir un numéro de téléphone valide.'
  },
  ar: {
    showcaseEyebrow: 'الرحلات السياحية المنظمة · أوروبا والبنلوكس',
    showcaseTitle: 'Paris, Belgique et Pays-Bas',
    showcaseArabicTitle: 'باريس، بلجيكا وهولندا',
    showcaseSubtitle: '7 أيام / 6 ليالٍ · الانطلاق من الدار البيضاء',
    showcaseCollaboration: 'بالتعاون مع الرياض فاس (Le Riad Fès)',
    showcaseDepartureLabel: 'الانطلاق من الدار البيضاء (CMN)',
    showcaseStartingFromLabel: 'ابتداءً من',
    showcaseStartingPrice: '13 200 درهم / للشخص',
    showcaseStartingScopeNote: 'ينطبق هذا السعر فقط على رحلة 05/12/2026 في الغرفة الثلاثية.',
    showcaseDescription:
      'رحلة منظمة لمدة 7 أيام / 6 ليالٍ تجمع بين باريس، بروج، أمستردام، زانسي شانس، لاهاي، روتردام وبروكسل بمرافقة مرشد مغربي وإقامة في فنادق مختارة.',
    showcaseHighlights: [
      'باريس (ليلتان)، بروكسل (ليلتان) وأمستردام (ليلتان)',
      'بروج والقنوات وبحيرة الحب + قرية الطواحين زانسي شانس ومصنع الجبن',
      'لاهاي، روتردام (المنازل المكعبة) وبروكسل (البرلمان الأوروبي والساحة الكبرى)',
      '3 مواعيد انطلاق: 05/12/2026 و27/12/2026 و23/01/2027'
    ],
    showcaseAirlineNotice:
      'شركة الطيران وحصة الأمتعة قيد التأكيد النهائي (اختلاف بين العربية للطيران والخطوط الملكية المغربية في المنشورات).',
    showcaseViewPackageBtn: 'عرض البرنامج الكامل',
    showcaseReserveBtn: 'طلب الحجز',
    backToSejours: 'العودة إلى الأسفار والرحلات',
    backToHome: 'الرئيسية',
    heroEyebrow: 'الرحلات السياحية · بالتعاون مع Le Riad Fès',
    heroDurationBadge: '7 أيام / 6 ليالٍ',
    heroCollaborationBadge: 'بالتعاون مع Le Riad Fès',
    heroStartingScope: 'سعر الغرفة الثلاثية — تاريخ انطلاق 05/12/2026 فقط',
    heroCtaReserve: 'طلب حجز / استفسار',
    heroCtaItinerary: 'البرنامج اليومي',
    destinationsStripLabel:
      'باريس • بروج • أمستردام • زانسي شانس • لاهاي • روتردام • بروكسل',
    airlineDiscrepancyTitle: 'تنبيه هام قيد التأكيد: شركة الطيران والأمتعة',
    airlineDiscrepancyBody:
      'يذكر منشور الأسعار شركة العربية للطيران (Air Arabia)، بينما يذكر منشور الخدمات المشمولة الخطوط الملكية المغربية (Royal Air Maroc). في انتظار تأكيد الإدارة النهائي، تبقى شركة الطيران وكذلك وزن الأمتعة المعلن (23 كغ في الشحن ذهاباً وإياباً + 10 كغ في المقصورة) قيد التأكيد.',
    pricingEyebrow: 'الأسعار الرسمية للشخص الواحد (بالدرهم المغربي)',
    pricingTitle: 'تواريخ الانطلاق وجدول الأسعار',
    pricingSubtitle:
      'اضغط على التاريخ ونوع الغرفة (ثلاثية، مزدوجة أو فردية) لاختيار السعر الدقيق وتعبئة طلب الحجز.',
    colDeparture: 'تاريخ الذهاب',
    colReturn: 'تاريخ العودة',
    colTriple: 'ثلاثية',
    colDouble: 'مزدوجة',
    colSingle: 'فردية',
    roomTypeTriple: 'غرفة ثلاثية',
    roomTypeDouble: 'غرفة مزدوجة',
    roomTypeSingle: 'غرفة فردية',
    selectRoomHint: 'جميع الأسعار بالدرهم المغربي (MAD) للشخص الواحد.',
    hotelsFlightsEyebrow: 'الإقامة والطيران',
    hotelsFlightsTitle: 'الفنادق المعتمدة (6 ليالٍ) ومواقيت الرحلات',
    hotelsColTitle: 'فنادق البرنامج',
    totalSixNightsBadge: 'المجموع: 6 ليالٍ',
    flightsColTitle: 'مواقيت الرحلات المعلنة',
    flightsSubjectNotice: 'المواقيت المذكورة تبقى رهن التأكيد النهائي.',
    flightsAirlinePendingLine:
      'شركة الطيران قيد التأكيد: Air Arabia (منشور الأسعار) مقابل Royal Air Maroc (منشور الشموليات).',
    flightsBaggagePendingLine:
      'الأمتعة المعلنة: 23 كغ شحن ذهاباً وإياباً + 10 كغ في المقصورة — قيد التأكيد حسب شركة الطيران المعتمدة.',
    itineraryEyebrow: 'البرنامج التفصيلي لـ 7 أيام / 6 ليالٍ',
    itineraryTitle: 'مسار الرحلة يوماً بيوم',
    itinerarySubtitle:
      'اضغط على أي يوم لعرض أو إخفاء تفاصيل الزيارات والمحطات والملاحظات العملية.',
    expandAllLabel: 'توسيع الكل',
    collapseAllLabel: 'طي الكل',
    dayPrefix: 'اليوم',
    inclusionsEyebrow: 'الخدمات والشروط',
    inclusionsTitle: 'السعر الأساسي يشمل / لا يشمل',
    priceIncludesHeading: 'السعر الأساسي يشمل',
    priceExcludesHeading: 'السعر لا يشمل',
    childPolicyEyebrow: 'العائلات والأطفال',
    childPolicyTitle: 'شروط أسعار الأطفال والغرفة العائلية',
    childPolicyDisclaimer:
      'تُعالج طلبات الأطفال والغرفة العائلية (4 أشخاص) بعد التحقق من التوافر مع مستشاري الوكالة؛ لا يتم خصم أي تخفيض بشكل تلقائي.',
    inquiryEyebrow: 'طلب حجز وتأكيد التوافر',
    inquiryTitle: 'احجز رحلتك إلى باريس، بلجيكا وهولندا',
    inquirySubtitle:
      'أرسل تفاصيل طلبك عبر واتساب للتحقق الفوري من توفر المقاعد والغرف مع فريقنا.',
    formDepartureLabel: 'تاريخ الانطلاق المطلوب',
    formRoomLabel: 'نوع الغرفة',
    formAdultsLabel: 'عدد البالغين',
    formChildInquiryLabel: 'معلومات الطفل لإدراجها في الطلب (اختياري)',
    formChildNone: 'بدون أطفال / بالغون فقط',
    formChildUnder2: 'أقل من سنتين (2 700 درهم بدون مقعد حافلة)',
    formChild2To5: 'من سنتين إلى أقل من 5 سنوات (7 700 درهم مع سرير الوالدين، أو ثلاثية لسرير مستقل)',
    formChild5To12: 'من 5 إلى 12 سنة (طلب تخفيض 1 500 درهم وفق الشروط)',
    formFamilyRoomCheck: 'الاستفسار عن توفر غرفة عائلية (4 أشخاص)',
    formFamilyRoomHint: 'يتم تأكيد السعر والتوافر من طرف الوكالة حسب الفندق والتاريخ.',
    formNameLabel: 'الاسم الكامل',
    formNamePlaceholder: 'مثال: سلمى بنعلي',
    formPhoneLabel: 'رقم الهاتف / واتساب',
    formPhonePlaceholder: '+212 6 XX XX XX XX',
    formNotesLabel: 'ملاحظات إضافية',
    formNotesPlaceholder: 'أعمار الأطفال أو استفسارات حول الطيران والغرف...',
    formSubmitBtn: 'إرسال الطلب عبر واتساب',
    formNoAutoConfirm:
      'إرسال هذا النموذج يُنشئ طلب استفسار وحجز ولا يُعد دفعاً أو تأكيداً تلقائياً.',
    quoteBoxEyebrow: 'ملخص التعرفة المعتمدة',
    quoteBoxTitle: 'اختيارك للبالغين',
    quoteVerifiedPerPerson: 'سعر البالغ للشخص الواحد',
    quoteVerifiedAdultsTotal: 'المجموع الفرعي للبالغين',
    quoteSelectedDates: 'التواريخ المختارة',
    quotePendingBlockTitle: 'عناصر خاضعة لتأكيد الوكالة',
    quoteNoAutoChildDiscountNote:
      'طلبات الأطفال والغرفة العائلية وتأكيد شركة الطيران (العربية للطيران / لارام) يتم تأكيدها بشكل منفصل.',
    advisorLabel: 'مساعدة مباشرة',
    advisorTitle: 'تواصل مع مستشار Golden Group',
    advisorCallLabel: 'اتصال هاتفي',
    advisorMapsLabel: 'موقع الوكالة بسلا',
    submittedTitle: 'الطلب جاهز عبر واتساب',
    submittedBody:
      'تم تجهيز ملخص طلبك الكامل. إذا لم تُفتح نافذة واتساب تلقائياً، اضغط على الزر أدناه.',
    submittedNewBtn: 'تعديل الطلب',
    openWhatsappAgain: 'فتح واتساب',
    errorName: 'يرجى إدخال الاسم الكامل.',
    errorPhone: 'يرجى إدخال رقم هاتف صحيح.'
  },
  en: {
    showcaseEyebrow: 'Organized Tours · Europe & Benelux',
    showcaseTitle: 'Paris, Belgique et Pays-Bas',
    showcaseArabicTitle: 'باريس، بلجيكا وهولندا',
    showcaseSubtitle: '7 days / 6 nights · Departing from Casablanca',
    showcaseCollaboration: 'In collaboration with Le Riad Fès',
    showcaseDepartureLabel: 'Casablanca Departure (CMN)',
    showcaseStartingFromLabel: 'Starting from',
    showcaseStartingPrice: '13,200 MAD / person',
    showcaseStartingScopeNote: 'Applies strictly to the 05/12/2026 departure in a Triple room.',
    showcaseDescription:
      'A 7-day / 6-night guided tour visiting Paris, Bruges, Amsterdam, Zaanse Schans, The Hague, Rotterdam, and Brussels with a Moroccan guide and selected hotels.',
    showcaseHighlights: [
      'Paris (2 nights), Brussels (2 nights) & Amsterdam (2 nights)',
      'Bruges, scenic canals & Lake of Love + Zaanse Schans windmills & cheese farm',
      'The Hague, Rotterdam (Cube Houses) & Brussels (EU Parliament, Grand-Place)',
      '3 departure dates: 05/12/2026, 27/12/2026 & 23/01/2027'
    ],
    showcaseAirlineNotice:
      'Airline & baggage allowance pending confirmation (Air Arabia vs Royal Air Maroc noted across brochures).',
    showcaseViewPackageBtn: 'View full package',
    showcaseReserveBtn: 'Request booking',
    backToSejours: 'Back to Holidays & Tours',
    backToHome: 'Home',
    heroEyebrow: 'Organized Tours · In collaboration with Le Riad Fès',
    heroDurationBadge: '7 days / 6 nights',
    heroCollaborationBadge: 'In collaboration with Le Riad Fès',
    heroStartingScope: 'Triple room base rate — 05/12/2026 departure only',
    heroCtaReserve: 'Request quote / booking',
    heroCtaItinerary: 'Day-by-day itinerary',
    destinationsStripLabel:
      'Paris • Bruges • Amsterdam • Zaanse Schans • The Hague • Rotterdam • Brussels',
    airlineDiscrepancyTitle:
      'Important Notice Pending Confirmation: Airline & Baggage',
    airlineDiscrepancyBody:
      'The pricing brochure lists Air Arabia whereas the inclusions brochure lists Royal Air Maroc. Until administration confirms the final carrier, both the airline and the stated baggage allowance (23 kg checked outbound/return + 10 kg cabin) remain marked pending confirmation.',
    pricingEyebrow: 'Official Rates Per Person (MAD / DH)',
    pricingTitle: 'Departure Dates & Exact Pricing',
    pricingSubtitle:
      'Select any departure date and room type (Triple, Double, Single) to inspect the exact adult rate and pre-fill your inquiry.',
    colDeparture: 'Departure date',
    colReturn: 'Return date',
    colTriple: 'Triple',
    colDouble: 'Double',
    colSingle: 'Single',
    roomTypeTriple: 'Triple Room',
    roomTypeDouble: 'Double Room',
    roomTypeSingle: 'Single Room',
    selectRoomHint: 'Verified rates in Moroccan Dirhams (MAD) per person.',
    hotelsFlightsEyebrow: 'Accommodation & Flights',
    hotelsFlightsTitle: 'Selected Hotels (6 Nights) & Flight Schedule',
    hotelsColTitle: 'Circuit Hotels',
    totalSixNightsBadge: 'Total: 6 nights',
    flightsColTitle: 'Published Flight Times',
    flightsSubjectNotice: 'Flight schedules are subject to confirmation.',
    flightsAirlinePendingLine:
      'Airline pending confirmation: Air Arabia (pricing sheet) vs Royal Air Maroc (inclusions sheet).',
    flightsBaggagePendingLine:
      'Stated baggage: 23 kg checked outbound/return + 10 kg cabin — pending confirmation based on final airline.',
    itineraryEyebrow: 'Full 7-Day / 6-Night Program',
    itineraryTitle: 'Interactive Day-by-Day Itinerary',
    itinerarySubtitle:
      'Click any day to expand or collapse sightseeing stops, exterior-only visits, and practical details.',
    expandAllLabel: 'Expand all',
    collapseAllLabel: 'Collapse all',
    dayPrefix: 'Day',
    inclusionsEyebrow: 'Inclusions & Conditions',
    inclusionsTitle: 'What Is Included / Excluded',
    priceIncludesHeading: 'The price includes',
    priceExcludesHeading: 'The price does not include',
    childPolicyEyebrow: 'Families & Children',
    childPolicyTitle: 'Children Policy & Family Room Inquiry',
    childPolicyDisclaimer:
      'Child fares and 4-person family room requests are verified manually by our travel advisors per hotel availability; no conditional discount is deducted automatically.',
    inquiryEyebrow: 'Booking Inquiry',
    inquiryTitle: 'Inquire for Paris, Belgium & The Netherlands',
    inquirySubtitle:
      'Submit your inquiry via WhatsApp so our advisors can confirm real-time flight and hotel availability.',
    formDepartureLabel: 'Preferred departure date',
    formRoomLabel: 'Room occupancy',
    formAdultsLabel: 'Number of adults',
    formChildInquiryLabel: 'Optional child inquiry note',
    formChildNone: 'No children / Adults only',
    formChildUnder2: 'Under 2 years (2,700 MAD without separate bus seat)',
    formChild2To5: '2 to under 5 years (7,700 MAD sharing parents’ bed, or Triple if separate bed)',
    formChild5To12: '5 to 12 years (1,500 MAD reduction inquiry subject to conditions)',
    formFamilyRoomCheck: 'Request availability for a Family Room (4 persons)',
    formFamilyRoomHint: 'Rates and availability are quoted directly by the agency.',
    formNameLabel: 'Full name',
    formNamePlaceholder: 'e.g. Salma Benali',
    formPhoneLabel: 'Phone / WhatsApp',
    formPhonePlaceholder: '+212 6 XX XX XX XX',
    formNotesLabel: 'Additional notes',
    formNotesPlaceholder: 'Child ages, room preferences, or flight questions...',
    formSubmitBtn: 'Send inquiry via WhatsApp',
    formNoAutoConfirm:
      'Submitting this form sends an availability inquiry to an advisor; it is not an automatic payment or confirmed booking.',
    quoteBoxEyebrow: 'Verified Adult Rate Summary',
    quoteBoxTitle: 'Selected Adult Pricing',
    quoteVerifiedPerPerson: 'Adult rate per person',
    quoteVerifiedAdultsTotal: 'Adults subtotal',
    quoteSelectedDates: 'Selected dates',
    quotePendingBlockTitle: 'Items Subject to Agency Confirmation',
    quoteNoAutoChildDiscountNote:
      'Child rates, 4-person family rooms, and the final airline (Air Arabia vs RAM) are confirmed separately upon inquiry.',
    advisorLabel: 'Direct Assistance',
    advisorTitle: 'Speak with a Golden Group Advisor',
    advisorCallLabel: 'Call',
    advisorMapsLabel: 'View Agency Location in Salé',
    submittedTitle: 'Inquiry Ready on WhatsApp',
    submittedBody:
      'Your complete summary is ready. If WhatsApp did not open automatically, use the button below.',
    submittedNewBtn: 'Edit inquiry',
    openWhatsappAgain: 'Open WhatsApp',
    errorName: 'Please enter your full name.',
    errorPhone: 'Please enter a valid phone number.'
  },
  es: {
    showcaseEyebrow: 'Viajes Organizados · Europa y Benelux',
    showcaseTitle: 'Paris, Belgique et Pays-Bas',
    showcaseArabicTitle: 'باريس، بلجيكا وهولندا',
    showcaseSubtitle: '7 días / 6 noches · Salida desde Casablanca',
    showcaseCollaboration: 'En colaboración con Le Riad Fès',
    showcaseDepartureLabel: 'Salida Casablanca (CMN)',
    showcaseStartingFromLabel: 'Desde',
    showcaseStartingPrice: '13 200 MAD / pers.',
    showcaseStartingScopeNote: 'Tarifa válida únicamente para la salida del 05/12/2026 en habitación Triple.',
    showcaseDescription:
      'Circuito organizado de 7 días / 6 noches por París, Brujas, Ámsterdam, Zaanse Schans, La Haya, Róterdam y Bruselas con guía marroquí y hoteles seleccionados.',
    showcaseHighlights: [
      'París (2 noches), Bruselas (2 noches) y Ámsterdam (2 noches)',
      'Brujas, canales y Lago del Amor + Zaanse Schans (molinos y quesería)',
      'La Haya, Róterdam (Casas Cúbicas) y Bruselas (Parlamento, Grand-Place)',
      '3 salidas: 05/12/2026, 27/12/2026 y 23/01/2027'
    ],
    showcaseAirlineNotice:
      'Aerolínea y franquicia de equipaje pendientes de confirmación (Air Arabia vs Royal Air Maroc en los folletos).',
    showcaseViewPackageBtn: 'Ver el programa completo',
    showcaseReserveBtn: 'Solicitar reserva',
    backToSejours: 'Volver a Estancias y Circuitos',
    backToHome: 'Inicio',
    heroEyebrow: 'Viajes Organizados · En colaboración con Le Riad Fès',
    heroDurationBadge: '7 días / 6 noches',
    heroCollaborationBadge: 'En colaboración con Le Riad Fès',
    heroStartingScope: 'Tarifa en habitación Triple — únicamente salida 05/12/2026',
    heroCtaReserve: 'Solicitar presupuesto / reserva',
    heroCtaItinerary: 'Itinerario día por día',
    destinationsStripLabel:
      'París • Brujas • Ámsterdam • Zaanse Schans • La Haya • Róterdam • Bruselas',
    airlineDiscrepancyTitle:
      'Aviso importante pendiente de confirmación: Aerolínea y equipaje',
    airlineDiscrepancyBody:
      'El folleto de tarifas menciona Air Arabia mientras que el folleto de servicios incluidos menciona Royal Air Maroc. Hasta confirmación administrativa final, tanto la aerolínea como el equipaje indicado (23 kg facturado ida/vuelta + 10 kg en cabina) permanecen pendientes de confirmación.',
    pricingEyebrow: 'Tarifas oficiales por persona (MAD / DH)',
    pricingTitle: 'Fechas de salida y tabla de precios',
    pricingSubtitle:
      'Seleccione una fecha y ocupación (Triple, Doble o Individual) para ver el precio exacto por adulto y preparar su solicitud.',
    colDeparture: 'Fecha de ida',
    colReturn: 'Fecha de regreso',
    colTriple: 'Triple',
    colDouble: 'Doble',
    colSingle: 'Individual',
    roomTypeTriple: 'Habitación Triple',
    roomTypeDouble: 'Habitación Doble',
    roomTypeSingle: 'Habitación Individual',
    selectRoomHint: 'Tarifas verificadas en Dírhams Marroquíes (MAD) por persona.',
    hotelsFlightsEyebrow: 'Alojamiento y Vuelos',
    hotelsFlightsTitle: 'Hoteles seleccionados (6 noches) y Horarios de vuelo',
    hotelsColTitle: 'Hoteles del circuito',
    totalSixNightsBadge: 'Total: 6 noches',
    flightsColTitle: 'Horarios previstos de vuelo',
    flightsSubjectNotice: 'Horarios comunicados sujetos a confirmación.',
    flightsAirlinePendingLine:
      'Aerolínea pendiente de confirmación: Air Arabia (tarifas) vs Royal Air Maroc (inclusiones).',
    flightsBaggagePendingLine:
      'Equipaje indicado: 23 kg facturado ida/vuelta + 10 kg en cabina — pendiente de confirmación según aerolínea final.',
    itineraryEyebrow: 'Programa completo 7 días / 6 noches',
    itineraryTitle: 'Itinerario interactivo día por día',
    itinerarySubtitle:
      'Pulse sobre cada jornada para desplegar o contraer las visitas y aclaraciones prácticas.',
    expandAllLabel: 'Desplegar todo',
    collapseAllLabel: 'Contraer todo',
    dayPrefix: 'Día',
    inclusionsEyebrow: 'Servicios y Condiciones',
    inclusionsTitle: 'El precio incluye / No incluye',
    priceIncludesHeading: 'El precio incluye',
    priceExcludesHeading: 'El precio no incluye',
    childPolicyEyebrow: 'Familias y Niños',
    childPolicyTitle: 'Tarifas infantiles y habitación familiar',
    childPolicyDisclaimer:
      'Las tarifas infantiles y habitaciones familiares (4 personas) se confirman manualmente con nuestros asesores según disponibilidad hotelera.',
    inquiryEyebrow: 'Solicitud de reserva',
    inquiryTitle: 'Solicitar plaza para París, Bélgica y Países Bajos',
    inquirySubtitle:
      'Envíe su solicitud por WhatsApp para comprobar disponibilidad aérea y hotelera con nuestro equipo.',
    formDepartureLabel: 'Fecha de salida deseada',
    formRoomLabel: 'Tipo de habitación',
    formAdultsLabel: 'Número de adultos',
    formChildInquiryLabel: 'Nota infantil opcional para incluir en la solicitud',
    formChildNone: 'Sin niños / Solo adultos',
    formChildUnder2: 'Menor de 2 años (2 700 MAD sin asiento en bus)',
    formChild2To5: 'De 2 a menos de 5 años (7 700 MAD cama padres, o Triple si cama separada)',
    formChild5To12: 'De 5 a 12 años (solicitud de reducción 1 500 MAD bajo condiciones)',
    formFamilyRoomCheck: 'Consultar disponibilidad de Habitación Familiar (4 personas)',
    formFamilyRoomHint: 'Tarifa y disponibilidad comunicadas directamente por la agencia.',
    formNameLabel: 'Nombre completo',
    formNamePlaceholder: 'Ej.: Salma Benali',
    formPhoneLabel: 'Teléfono / WhatsApp',
    formPhonePlaceholder: '+212 6 XX XX XX XX',
    formNotesLabel: 'Notas adicionales',
    formNotesPlaceholder: 'Edades de los niños, preferencias de habitación o preguntas sobre vuelos...',
    formSubmitBtn: 'Enviar solicitud por WhatsApp',
    formNoAutoConfirm:
      'El envío de este formulario abre una consulta de disponibilidad; no constituye pago ni reserva automática.',
    quoteBoxEyebrow: 'Resumen de tarifa verificada',
    quoteBoxTitle: 'Su selección de adultos',
    quoteVerifiedPerPerson: 'Tarifa adulto por persona',
    quoteVerifiedAdultsTotal: 'Subtotal adultos',
    quoteSelectedDates: 'Fechas seleccionadas',
    quotePendingBlockTitle: 'Elementos sujetos a confirmación de la agencia',
    quoteNoAutoChildDiscountNote:
      'Las tarifas infantiles, habitaciones familiares y aerolínea final (Air Arabia / RAM) se confirman aparte bajo consulta.',
    advisorLabel: 'Asistencia directa',
    advisorTitle: 'Hablar con un asesor de Golden Group',
    advisorCallLabel: 'Llamar',
    advisorMapsLabel: 'Ver ubicación de la agencia en Salé',
    submittedTitle: 'Solicitud lista en WhatsApp',
    submittedBody:
      'Su resumen completo está listo. Si WhatsApp no se abrió automáticamente, use el botón inferior.',
    submittedNewBtn: 'Modificar solicitud',
    openWhatsappAgain: 'Abrir WhatsApp',
    errorName: 'Por favor, indique su nombre completo.',
    errorPhone: 'Por favor, indique un teléfono válido.'
  }
};
