import swissAlpsImg from './images/dest_swiss_alps_1794663630574.jpg';
import makkahHaramImg from './images/dest_makkah_haram_1794663630924.jpg';
import mediterraneanCoastImg from './images/dest_mediterranean_coast_1794663634704.jpg';
import parisTwilightImg from './images/city_paris_twilight_1794664979599.jpg';
import istanbulBosphorusImg from './images/city_istanbul_bosphorus_1794664980250.jpg';
import dubaiSkylineImg from './images/city_dubai_skyline_1794664981040.jpg';

export type DestinationId = 'swiss-alps' | 'makkah' | 'mediterranean';
export type HeroCategoryId = 'flights' | 'hotels' | 'holidays' | 'tours';
export type ServiceId =
  | 'flight-bookings'
  | 'hotel-reservations'
  | 'visa-assistance'
  | 'travel-insurance'
  | 'holiday-packages';
export type Language = 'fr' | 'ar' | 'en' | 'es';

export interface WorldCitySlide {
  id: string;
  image: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
}

export const WORLD_CITY_SLIDES: WorldCitySlide[] = [
  {
    id: 'swiss-alps',
    image: swissAlpsImg,
    title: {
      fr: 'Alpes Suisses, Suisse',
      ar: 'جبال الألب السويسرية',
      en: 'Swiss Alps, Switzerland',
      es: 'Alpes Suizos, Suiza'
    },
    subtitle: {
      fr: 'Lacs turquoise & sommets alpins',
      ar: 'بحيرات فيروزية وقمم ثلجية',
      en: 'Turquoise glacial lakes & peaks',
      es: 'Lagos turquesa y cumbres alpinas'
    }
  },
  {
    id: 'paris',
    image: parisTwilightImg,
    title: {
      fr: 'Paris, France',
      ar: 'باريس، فرنسا',
      en: 'Paris, France',
      es: 'París, Francia'
    },
    subtitle: {
      fr: 'Lumière dorée sur la Seine',
      ar: 'سحر الغروب على نهر السين',
      en: 'Golden twilight above the Seine',
      es: 'Luz dorada sobre el Sena'
    }
  },
  {
    id: 'makkah',
    image: makkahHaramImg,
    title: {
      fr: 'La Mecque, Arabie Saoudite',
      ar: 'مكة المكرمة، المملكة العربية السعودية',
      en: 'Makkah, Saudi Arabia',
      es: 'La Meca, Arabia Saudita'
    },
    subtitle: {
      fr: 'Masjid al-Haram & Sainte Kaaba',
      ar: 'المسجد الحرام والكعبة المشرفة',
      en: 'Masjid al-Haram & The Sacred Kaaba',
      es: 'Masjid al-Haram y la Sagrada Kaaba'
    }
  },
  {
    id: 'istanbul',
    image: istanbulBosphorusImg,
    title: {
      fr: 'Istanbul, Turquie',
      ar: 'إسطنبول، تركيا',
      en: 'Istanbul, Türkiye',
      es: 'Estambul, Turquía'
    },
    subtitle: {
      fr: 'Coupoles & reflets du Bosphore',
      ar: 'إطلالات البوسفور الساحرة',
      en: 'Ottoman domes & the Bosphorus',
      es: 'Cúpulas otomanas y el Bósforo'
    }
  },
  {
    id: 'mediterranean',
    image: mediterraneanCoastImg,
    title: {
      fr: 'Côte Méditerranéenne',
      ar: 'ساحل البحر الأبيض المتوسط',
      en: 'Mediterranean Coast',
      es: 'Costa Mediterránea'
    },
    subtitle: {
      fr: 'Eaux turquoise & falaises ensoleillées',
      ar: 'مياه فيروزية وإطلالات ساحلية',
      en: 'Turquoise coves & cliffside villas',
      es: 'Aguas turquesa y acantilados soleados'
    }
  },
  {
    id: 'dubai',
    image: dubaiSkylineImg,
    title: {
      fr: 'Dubaï, Émirats Arabes Unis',
      ar: 'دبي، الإمارات العربية المتحدة',
      en: 'Dubai, United Arab Emirates',
      es: 'Dubái, Emiratos Árabes Unidos'
    },
    subtitle: {
      fr: 'Horizons dorés & marina turquoise',
      ar: 'أفق ذهبي ومارينا ساحرة',
      en: 'Golden skyline & emerald marina',
      es: 'Horizonte dorado y marina turquesa'
    }
  }
];

export interface DestinationEntry {
  id: DestinationId;
  image: string;
  fallbackGradient: string;
  coordinates: { lat: number; lng: number };
}

// Ordered so Makkah sits directly in the center (second picture) of the 3-horizon layout
export const DESTINATIONS: DestinationEntry[] = [
  {
    id: 'swiss-alps',
    image: swissAlpsImg,
    fallbackGradient: 'linear-gradient(135deg, #0b1d3a 0%, #1c5a7a 52%, #d1a847 100%)',
    coordinates: { lat: 46.6863, lng: 7.8632 } // Interlaken / Swiss Alps
  },
  {
    id: 'makkah',
    image: makkahHaramImg,
    fallbackGradient: 'linear-gradient(135deg, #0b1d3a 0%, #2a3245 55%, #d1a847 100%)',
    coordinates: { lat: 21.4225, lng: 39.8262 } // Masjid al-Haram, Makkah
  },
  {
    id: 'mediterranean',
    image: mediterraneanCoastImg,
    fallbackGradient: 'linear-gradient(135deg, #0b1d3a 0%, #166d8c 54%, #d1a847 100%)',
    coordinates: { lat: 40.634, lng: 14.6027 } // Amalfi / Mediterranean Coast
  }
];

// Original 4 Hero Icons in their original places
export const HERO_CATEGORY_ORDER: HeroCategoryId[] = [
  'flights',
  'hotels',
  'holidays',
  'tours'
];

// Official 5 Main Services (exact match to Golden Group Our Services card)
export const SERVICE_ORDER: ServiceId[] = [
  'flight-bookings',
  'hotel-reservations',
  'visa-assistance',
  'travel-insurance',
  'holiday-packages'
];

export {
  swissAlpsImg,
  makkahHaramImg,
  mediterraneanCoastImg,
  parisTwilightImg,
  istanbulBosphorusImg,
  dubaiSkylineImg
};
