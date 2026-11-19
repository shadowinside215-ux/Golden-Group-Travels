import { HeroCategoryId, ServiceId } from '../assets/destinations';

export type SearchCategoryId =
  | 'flights'
  | 'hotels'
  | 'umrah'
  | 'holidays'
  | 'tours'
  | 'car-transfers';

export type CarTransfersFilterId = 'all' | 'car_rentals' | 'airport_transfers';

export const SEARCH_CATEGORY_ORDER: SearchCategoryId[] = [
  'flights',
  'hotels',
  'umrah',
  'holidays',
  'tours',
  'car-transfers'
];

export const SERVICE_SECTION_IDS: Record<SearchCategoryId, string> = {
  flights: 'section-flights',
  hotels: 'section-hotels',
  umrah: 'section-umrah',
  holidays: 'section-holidays',
  tours: 'section-tours',
  'car-transfers': 'section-car-transfers'
};

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
  tours: 'holiday-packages',
  'car-transfers': 'holiday-packages'
};

export const SERVICE_TO_SEARCH_CATEGORY: Partial<Record<ServiceId, SearchCategoryId>> = {
  'flight-bookings': 'flights',
  'hotel-reservations': 'hotels',
  'hajj-umrah': 'umrah',
  'holiday-packages': 'holidays'
};

export interface TravelpayoutsWidgetSpec {
  id: string;
  providerName: string;
  campaignId: string;
  promoId: string;
  scriptSrc: string;
  layoutKind: 'search' | 'cards' | 'banner';
  minHeightClass?: string;
  minHeightPx?: number;
  isolatedFrame?: boolean;
  containerClassName?: string;
  hostClassName?: string;
}

/**
 * Modular Affiliate & Partner Configuration
 * Keep all supplied tracking URLs, campaign IDs, promo IDs, trs=603176, shmarker=808002,
 * Expedia data-camref="1110lTryc" and data-pubref="golden_main_search" intact.
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

export const FLIGHTS_OFFERS_WIDGET: TravelpayoutsWidgetSpec = {
  id: 'kiwi-flight-offers',
  providerName: 'Kiwi.com',
  campaignId: '111',
  promoId: '3411',
  scriptSrc:
    'https://tpemb.com/content?currency=usd&trs=603176&shmarker=808002&locale=en&powered_by=true&limit=4&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=3411',
  layoutKind: 'cards',
  minHeightClass: 'min-h-[340px]',
  minHeightPx: 360,
  isolatedFrame: true
};

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

/**
 * Official Expedia Hotels Search Configuration (Hotels-only via documented lobs="stays")
 */
export const EXPEDIA_HOTELS_WIDGET_CONFIG = {
  widget: 'search',
  program: 'fr-expedia',
  lobs: 'stays',
  network: 'pz',
  camref: '1110lTryc',
  pubref: 'golden_main_search',
  scriptSrc: 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js',
  styleSrc: 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.css',
  origin: 'https://creator.expediagroup.com',
  widgetsBaseUrl: 'https://creator.expediagroup.com/products/widgets'
} as const;

export const TOURS_WIDGETS: readonly TravelpayoutsWidgetSpec[] = [
  {
    id: 'tours-klook-dynamic',
    providerName: 'Klook',
    campaignId: '137',
    promoId: '4497',
    scriptSrc:
      'https://tpemb.com/content?currency=USD&trs=603176&shmarker=808002&locale=en&city_id=4&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497',
    layoutKind: 'cards',
    minHeightClass: 'min-h-[470px]'
  },
  {
    id: 'tours-tiqets-discovery',
    providerName: 'Tiqets',
    campaignId: '89',
    promoId: '3948',
    scriptSrc:
      'https://tpemb.com/content?currency=USD&trs=603176&shmarker=808002&product=&language=en&layout=horizontal&powered_by=true&campaign_id=89&promo_id=3948',
    layoutKind: 'cards',
    minHeightClass: 'min-h-[320px]'
  },
  {
    id: 'tours-wegotrip-audio',
    providerName: 'WeGoTrip',
    campaignId: '150',
    promoId: '4489',
    scriptSrc:
      'https://tpemb.com/content?trs=603176&shmarker=808002&locale=en&tours=3&powered_by=true&campaign_id=150&promo_id=4489',
    layoutKind: 'cards',
    minHeightClass: 'min-h-[480px]',
    minHeightPx: 480,
    isolatedFrame: true,
    hostClassName: 'w-full min-w-0 [&_.js-wegotrip-widget]:!mx-0'
  }
] as const;

export const CAR_RENTALS_WIDGETS: readonly TravelpayoutsWidgetSpec[] = [
  {
    id: 'car-autoeurope',
    providerName: 'AutoEurope',
    campaignId: '143',
    promoId: '4362',
    scriptSrc:
      'https://tpemb.com/content?trs=603176&shmarker=808002&locale=en&powered_by=true&border_radius=5&plain=true&show_logo=true&color_background=%230b2033&color_button=%23e8b917&promo_id=4362&campaign_id=143',
    layoutKind: 'search',
    minHeightClass: 'min-h-[240px]'
  },
  {
    id: 'car-localrent',
    providerName: 'Localrent',
    campaignId: '87',
    promoId: '2466',
    scriptSrc:
      'https://tpemb.com/content?trs=603176&shmarker=808002&locale=en&country=12&city=53741&powered_by=true&campaign_id=87&promo_id=2466',
    layoutKind: 'search',
    minHeightClass: 'min-h-[680px]'
  },
  {
    id: 'car-getrentacar',
    providerName: 'GetRentacar',
    campaignId: '222',
    promoId: '8813',
    scriptSrc:
      'https://tpemb.com/content?trs=603176&shmarker=808002&locale=en&powered_by=true&campaign_id=222&promo_id=8813',
    layoutKind: 'search',
    minHeightClass: 'min-h-[380px]'
  }
] as const;

/** EconomyBookings (10/2082) renders a responsive promotional iframe banner rather than a multi-field search engine */
export const CAR_RENTALS_PROMO_BANNER: TravelpayoutsWidgetSpec = {
  id: 'car-economybookings-banner',
  providerName: 'EconomyBookings',
  campaignId: '10',
  promoId: '2082',
  scriptSrc:
    'https://tpemb.com/content?trs=603176&shmarker=808002&locale=en&width=100&height=100&powered_by=true&campaign_id=10&promo_id=2082',
  layoutKind: 'banner',
  containerClassName: 'w-full max-w-[600px] mx-auto',
  hostClassName: 'w-full min-w-0 h-[380px] sm:h-[420px]'
};

export const AIRPORT_TRANSFERS_WIDGETS: readonly TravelpayoutsWidgetSpec[] = [
  {
    id: 'transfer-kiwitaxi',
    providerName: 'Kiwitaxi',
    campaignId: '1',
    promoId: '3879',
    scriptSrc:
      'https://tpemb.com/content?currency=USD&trs=603176&shmarker=808002&locale=en&powered_by=true&transfer_options_limit=10&transfer_options=MCR&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879',
    layoutKind: 'search',
    minHeightClass: 'min-h-[340px]'
  },
  {
    id: 'transfer-intui',
    providerName: 'Intui.travel',
    campaignId: '22',
    promoId: '3507',
    scriptSrc:
      'https://tpemb.com/content?trs=603176&shmarker=808002&powered_by=true&locale=en&curr=USD&color=basic&pbi=0&ag=18&ap=34&rid=481&campaign_id=22&promo_id=3507',
    layoutKind: 'cards',
    minHeightClass: 'min-h-[400px]',
    minHeightPx: 400,
    isolatedFrame: true
  }
] as const;

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

export const POPULAR_TOUR_DESTINATIONS = [
  'Marrakech',
  'Istanbul',
  'Dubaï',
  'Paris',
  'Alpes Suisses',
  'Barcelone',
  'Le Caire'
] as const;
