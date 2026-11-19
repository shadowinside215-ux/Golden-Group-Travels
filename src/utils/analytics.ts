import type { ServiceId } from '../assets/destinations';

export const GA4_MEASUREMENT_ID = 'G-453M4XZZCQ';
export const GOOGLE_TAG_ID = 'GTM-NLJ83W9F';

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

const CONSENT_STORAGE_KEY = 'ggt_analytics_consent';

const SERVICE_CANONICAL_TITLES: Record<ServiceId, string> = {
  'flight-bookings': 'Flight Bookings | Golden Group Travels',
  'hotel-reservations': 'Hotel Reservations | Golden Group Travels',
  'hajj-umrah': 'El Omra & Makkah | Golden Group Travels',
  'holiday-packages': 'Holiday Packages | Golden Group Travels',
  'visa-assistance': 'Tours & Visa Assistance | Golden Group Travels',
  'travel-insurance': 'Travel Insurance | Golden Group Travels'
};

let lastSelectionEventName: ServiceSelectionEventName | null = null;
let lastSelectionTimestamp = 0;

export function hasPrivacyOptOut(): boolean {
  if (typeof window === 'undefined') return false;
  const gpc =
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  const dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1';
  let storedDenied = false;
  try {
    storedDenied = window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'denied';
  } catch {
    storedDenied = false;
  }
  return gpc || dnt || storedDenied || window['ga-disable-G-453M4XZZCQ'] === true;
}

export function updateAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;
  window['ga-disable-G-453M4XZZCQ'] = !granted;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
  } catch {
    // Ignore storage errors in restricted browsing modes
  }
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: granted ? 'granted' : 'denied'
    });
  }
}

export function trackPageView(page: 'home' | ServiceId): void {
  if (
    typeof window === 'undefined' ||
    typeof window.gtag !== 'function' ||
    hasPrivacyOptOut()
  ) {
    return;
  }

  const pagePath = page === 'home' ? '/' : `/#service/${page}`;
  const pageTitle =
    page === 'home'
      ? 'Golden Group Travels | Your Next Journey Starts Here'
      : SERVICE_CANONICAL_TITLES[page];

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
