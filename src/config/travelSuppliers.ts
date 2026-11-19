import { HeroCategoryId, ServiceId } from '../assets/destinations';

export type SearchCategoryId = 'flights' | 'hotels' | 'umrah' | 'holidays' | 'tours';

export const SEARCH_CATEGORY_ORDER: SearchCategoryId[] = [
  'flights',
  'hotels',
  'umrah',
  'holidays',
  'tours'
];

export const HERO_TO_SEARCH_CATEGORY: Record<HeroCategoryId, SearchCategoryId> = {
  flights: 'flights',
  hotels: 'hotels',
  holidays: 'holidays',
  tours: 'tours'
};

export const SEARCH_CATEGORY_TO_SERVICE: Record<SearchCategoryId, ServiceId> = {
  flights: 'flight-bookings',
  hotels: 'hotel-reservations',
  umrah: 'hajj-umrah',
  holidays: 'holiday-packages',
  tours: 'holiday-packages'
};

export const SERVICE_TO_SEARCH_CATEGORY: Partial<Record<ServiceId, SearchCategoryId>> = {
  'flight-bookings': 'flights',
  'hotel-reservations': 'hotels',
  'hajj-umrah': 'umrah',
  'holiday-packages': 'holidays'
};

export type FlightProviderId = 'aviasales' | 'expedia';

/**
 * Modular Affiliate & Partner Configuration (Phase 1)
 * Keep all supplied tracking URLs and attributes intact and separate from Travelpayouts Drive.
 */
export const AVIASALES_PARTNER = {
  id: 'aviasales',
  name: 'Aviasales',
  /** Official self-contained Travelpayouts / Aviasales Cascoon flight search widget script URL (French, EUR) */
  widgetScriptSrc:
    'https://tpemb.com/content?currency=eur&trs=603176&shmarker=808002&show_hotels=true&powered_by=true&locale=fr&searchUrl=www.aviasales.fr%2Fsearch&primary_override=%230b2369&color_button=%230b2369&color_icons=%230b2369&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=true&promo_id=7879&campaign_id=100',
  /** Direct Travelpayouts Aviasales partner fallback link */
  affiliateUrl:
    'https://tp.media/r?campaign_id=100&marker=808002&p=4114&trs=603176&u=https%3A%2F%2Faviasales.com',
  widgetContainerId: 'aviasales-official-widget'
} as const;

export const EXPEDIA_FLIGHTS_WIDGET_CONFIG = {
  widget: 'search',
  program: 'fr-expedia',
  lobs: 'flights',
  network: 'pz',
  camref: '1110lTryc',
  pubref: 'golden_main_search',
  scriptSrc: 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js',
  styleSrc: 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.css',
  origin: 'https://creator.expediagroup.com',
  widgetsBaseUrl: 'https://creator.expediagroup.com/products/widgets'
} as const;

export const EXPEDIA_HOTELS_WIDGET_CONFIG = {
  widget: 'search',
  program: 'fr-expedia',
  lobs: 'stays,flights',
  network: 'pz',
  camref: '1110lTryc',
  pubref: 'golden_main_search',
  scriptSrc: 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js',
  styleSrc: 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.css',
  origin: 'https://creator.expediagroup.com',
  widgetsBaseUrl: 'https://creator.expediagroup.com/products/widgets'
} as const;

export interface ToursAffiliatePartner {
  id: 'klook' | 'kkday';
  name: string;
  affiliateUrl: string;
}

export const TOURS_AFFILIATE_PARTNERS: readonly ToursAffiliatePartner[] = [
  {
    id: 'klook',
    name: 'Klook',
    affiliateUrl: 'https://klook.tpk.lu/puCtiVkN'
  },
  {
    id: 'kkday',
    name: 'KKday',
    affiliateUrl: 'https://kkday.tpk.lu/wb2MzuCE'
  }
] as const;

export const POPULAR_FLIGHT_ORIGINS = [
  'Casablanca (CMN)',
  'Rabat-Salé (RBA)',
  'Marrakech (RAK)',
  'Tanger (TNG)',
  'Paris (CDG / ORY)'
] as const;

export const POPULAR_FLIGHT_DESTINATIONS = [
  'Paris (CDG)',
  'Istanbul (IST)',
  'Dubaï (DXB)',
  'Jeddah (JED)',
  'Madrid (MAD)',
  'Londres (LHR)'
] as const;

export const POPULAR_TOUR_DESTINATIONS = [
  'Marrakech',
  'Istanbul',
  'Dubaï',
  'Paris',
  'Alpes Suisses',
  'Barcelone',
  'Le Caire'
] as const;
