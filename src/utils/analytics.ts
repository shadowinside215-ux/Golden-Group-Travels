import type { ServiceId } from '../assets/destinations';

export const GA4_MEASUREMENT_ID = 'G-453M4XZZCQ';

export type TrackablePage =
  | 'home'
  | ServiceId
  | '/vols'
  | '/hotels'
  | '/hajj-omra'
  | '/sejours'
  | '/circuits-activites'
  | '/circuits-activites/le-pouls-charmant-du-caire'
  | '/voitures-transferts'
  | '/visa'
  | '/assurance'
  | string;

export type ServiceSelectionEventName =
  | 'flights_selected'
  | 'hotels_selected'
  | 'umrah_selected'
  | 'holidays_selected'
  | 'tours_selected'
  | 'car_rentals_selected'
  | 'airport_transfers_selected';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    doNotTrack?: string;
    'ga-disable-G-453M4XZZCQ'?: boolean;
  }
}

const SERVICE_CANONICAL_TITLES: Record<ServiceId, string> = {
  'flight-bookings': 'Vols & Billetterie | Golden Group Travels',
  'hotel-reservations': 'Hôtels | Golden Group Travels',
  'hajj-umrah': 'Hajj & Omra | Golden Group Travels',
  'holiday-packages': 'Séjours Sur Mesure | Golden Group Travels',
  'visa-assistance': 'Accompagnement Visa | Golden Group Travels',
  'travel-insurance': 'Assurance Voyage | Golden Group Travels'
};

const ROUTE_CANONICAL_TITLES: Record<string, string> = {
  '/': 'Golden Group Travels | Your Next Journey Starts Here',
  '/vols': 'Vols & Billetterie | Golden Group Travels',
  '/hotels': 'Hôtels | Golden Group Travels',
  '/hajj-omra': 'Hajj & Omra | Golden Group Travels',
  '/sejours': 'Séjours Sur Mesure | Golden Group Travels',
  '/circuits-activites': 'Circuits & Activités | Golden Group Travels',
  '/circuits-activites/le-pouls-charmant-du-caire':
    'Le Pouls Charmant du Caire — Circuits Organisés | Golden Group Travels',
  '/voitures-transferts': 'Voitures & Transferts Aéroport | Golden Group Travels',
  '/visa': 'Accompagnement Visa | Golden Group Travels',
  '/assurance': 'Assurance Voyage | Golden Group Travels'
};

let lastSelectionEventName: ServiceSelectionEventName | null = null;
let lastSelectionTimestamp = 0;

export function hasPrivacyOptOut(): boolean {
  if (typeof window === 'undefined') return true;
  const gpc =
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  const dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1';
  return gpc || dnt || window['ga-disable-G-453M4XZZCQ'] === true;
}

export function trackPageView(page: TrackablePage): void {
  if (
    typeof window === 'undefined' ||
    typeof window.gtag !== 'function' ||
    hasPrivacyOptOut()
  ) {
    return;
  }

  let pagePath = '/';
  let pageTitle = ROUTE_CANONICAL_TITLES['/'];

  if (page === 'home' || page === '/') {
    pagePath = '/';
    pageTitle = ROUTE_CANONICAL_TITLES['/'];
  } else if (page.startsWith('/')) {
    pagePath = page;
    pageTitle = ROUTE_CANONICAL_TITLES[page] || 'Golden Group Travels';
  } else if (page in SERVICE_CANONICAL_TITLES) {
    const srvId = page as ServiceId;
    const srvRoutes: Record<ServiceId, string> = {
      'flight-bookings': '/vols',
      'hotel-reservations': '/hotels',
      'hajj-umrah': '/hajj-omra',
      'holiday-packages': '/sejours',
      'visa-assistance': '/visa',
      'travel-insurance': '/assurance'
    };
    pagePath = srvRoutes[srvId];
    pageTitle = SERVICE_CANONICAL_TITLES[srvId];
  }

  window.gtag('event', 'page_view', {
    send_to: GA4_MEASUREMENT_ID,
    page_title: pageTitle,
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`
  });
}

export function trackServiceSelection(eventName: ServiceSelectionEventName): void {
  if (
    typeof window === 'undefined' ||
    typeof window.gtag !== 'function' ||
    hasPrivacyOptOut()
  ) {
    return;
  }

  const now = Date.now();
  if (lastSelectionEventName === eventName && now - lastSelectionTimestamp < 500) {
    return;
  }
  lastSelectionEventName = eventName;
  lastSelectionTimestamp = now;

  window.gtag('event', eventName, {
    send_to: GA4_MEASUREMENT_ID
  });
}
