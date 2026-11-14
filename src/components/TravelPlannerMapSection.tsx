import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import {
  Building2,
  Calendar,
  Clock,
  Compass,
  MapPin,
  Phone,
  Plane,
  RotateCcw,
  Search,
  ShieldCheck,
  FileCheck2,
  Palmtree,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Language, SERVICE_ORDER, ServiceId } from '../assets/destinations';
import { TranslationPack } from '../i18n';

const GOOGLE_MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

export const SERVICE_ICONS: Record<ServiceId, React.ComponentType<{ className?: string }>> = {
  'flight-bookings': Plane,
  'hotel-reservations': Building2,
  'visa-assistance': FileCheck2,
  'travel-insurance': ShieldCheck,
  'holiday-packages': Palmtree
};

interface MapPlaceItem {
  id: string;
  name: string;
  address: string;
  location: google.maps.LatLngLiteral;
  rating?: number | null;
  ratingCount?: number | null;
}

interface TravelPlannerMapSectionProps {
  t: TranslationPack;
  lang: Language;
  isRtl: boolean;
  activeService: ServiceId;
  onSelectService: (service: ServiceId) => void;
  destinationLocation: string;
  onDestinationLocationChange: (val: string) => void;
  hotelName: string;
  onHotelNameChange: (val: string) => void;
  mapFocusCoords: google.maps.LatLngLiteral;
  onMapFocusCoordsChange: (coords: google.maps.LatLngLiteral) => void;
  onReturnToHero: () => void;
  whatsappInternational: string;
  displayPhone: string;
  agencyMapsUrl: string;
}

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

function dispatchQuotaWarningIfNeeded(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err ?? '');
  if (
    msg.includes('OVER_QUERY_LIMIT') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('429') ||
    msg.includes('Quota')
  ) {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  }
}

interface PlaceMarkerPinProps {
  place: MapPlaceItem;
  isSelected: boolean;
  isOpen: boolean;
  isHotelMode: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChoose: (place: MapPlaceItem) => void;
  selectBtnLabel: string;
  selectedBadgeLabel: string;
}

const PlaceMarkerPin: React.FC<PlaceMarkerPinProps> = ({
  place,
  isSelected,
  isOpen,
  isHotelMode,
  onOpen,
  onClose,
  onChoose,
  selectBtnLabel,
  selectedBadgeLabel
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={place.location}
        title={place.name}
        onClick={onOpen}
      >
        <Pin
          background={isSelected ? '#d1a847' : isHotelMode ? '#0b1d3a' : '#132d56'}
          borderColor={isSelected ? '#0b1d3a' : '#d1a847'}
          glyphColor={isSelected ? '#0b1d3a' : '#fceda2'}
          scale={isSelected ? 1.25 : 1.05}
        />
      </AdvancedMarker>

      {isOpen && marker && (
        <InfoWindow anchor={marker} maxWidth={260} onCloseClick={onClose}>
          <div className="p-1 text-[#0b1d3a] space-y-1.5">
            <div className="font-semibold text-sm leading-snug">{place.name}</div>
            {place.address && (
              <div className="text-xs text-[#2c405e] leading-relaxed">{place.address}</div>
            )}
            {typeof place.rating === 'number' && (
              <div className="flex items-center gap-1 text-xs font-semibold text-[#9a7220]">
                <Star className="w-3.5 h-3.5 fill-[#d1a847] text-[#d1a847]" />
                <span>{place.rating.toFixed(1)}</span>
                {place.ratingCount ? (
                  <span className="text-[#2c405e] font-normal">({place.ratingCount})</span>
                ) : null}
              </div>
            )}
            <button
              type="button"
              onClick={() => onChoose(place)}
              className="mt-1.5 w-full py-1.5 px-3 rounded bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] text-[11px] font-semibold uppercase tracking-wider cursor-pointer"
            >
              {isSelected ? selectedBadgeLabel : selectBtnLabel}
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

interface MapCameraSyncProps {
  center: google.maps.LatLngLiteral;
  places: MapPlaceItem[];
}

const MapCameraSync: React.FC<MapCameraSyncProps> = ({ center, places }) => {
  const map = useMap();
  const coreLib = useMapsLibrary('core');

  useEffect(() => {
    if (!map) return;
    if (places.length > 1 && coreLib) {
      const bounds = new coreLib.LatLngBounds();
      places.forEach((p) => bounds.extend(p.location));
      map.fitBounds(bounds, 48);
    } else if (places.length === 1) {
      map.panTo(places[0].location);
      map.setZoom(14);
    } else {
      map.panTo(center);
      map.setZoom(11);
    }
  }, [map, coreLib, center, places]);

  return null;
};

interface PlannerInnerProps extends TravelPlannerMapSectionProps {
  mapsEnabled: boolean;
}

const PlannerMapInner: React.FC<PlannerInnerProps> = ({
  t,
  lang,
  isRtl,
  activeService,
  onSelectService,
  destinationLocation,
  onDestinationLocationChange,
  hotelName,
  onHotelNameChange,
  mapFocusCoords,
  onMapFocusCoordsChange,
  onReturnToHero,
  whatsappInternational,
  displayPhone,
  agencyMapsUrl,
  mapsEnabled
}) => {
  const placesLib = useMapsLibrary('places');
  const apiStatus = useApiLoadingStatus();

  const [departureCity, setDepartureCity] = useState('');
  const [visaPurpose, setVisaPurpose] = useState('');
  const [visaCenter, setVisaCenter] = useState('');
  const [insurancePlanIdx, setInsurancePlanIdx] = useState(0);
  const [travelerName, setTravelerName] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00');
  const [guestIdx, setGuestIdx] = useState(1);
  const [preferences, setPreferences] = useState('');
  const [itineraryBuilt, setItineraryBuilt] = useState(false);

  // Maps Search & Autocomplete State
  const [citySuggestions, setCitySuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [hotelSuggestions, setHotelSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [visaSuggestions, setVisaSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showHotelDropdown, setShowHotelDropdown] = useState(false);
  const [showVisaDropdown, setShowVisaDropdown] = useState(false);

  const [mapResults, setMapResults] = useState<MapPlaceItem[]>([]);
  const [selectedMapPlace, setSelectedMapPlace] = useState<MapPlaceItem | null>(null);
  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);
  const [isSearchingMap, setIsSearchingMap] = useState(false);
  const [mapEmptyMsg, setMapEmptyMsg] = useState(false);

  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const isHotelService = activeService === 'hotel-reservations';
  const isVisaService = activeService === 'visa-assistance';
  const showHotelField =
    activeService === 'hotel-reservations' ||
    activeService === 'holiday-packages' ||
    activeService === 'flight-bookings';

  const resetSession = useCallback(() => {
    sessionTokenRef.current = null;
    setCitySuggestions([]);
    setHotelSuggestions([]);
    setVisaSuggestions([]);
  }, []);

  // Autocomplete predictions for City / Destination
  useEffect(() => {
    if (!mapsEnabled || !placesLib || !showCityDropdown || destinationLocation.trim().length < 2) {
      setCitySuggestions([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
        }
        const res = await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: destinationLocation.trim(),
          language: lang,
          sessionToken: sessionTokenRef.current
        });
        setCitySuggestions(res.suggestions.slice(0, 5));
      } catch (err) {
        dispatchQuotaWarningIfNeeded(err);
      }
    }, 280);

    return () => window.clearTimeout(timer);
  }, [mapsEnabled, placesLib, destinationLocation, showCityDropdown, lang]);

  // Autocomplete predictions specifically biased to Lodging/Hotels when typing Hotel Name
  useEffect(() => {
    if (!mapsEnabled || !placesLib || !showHotelDropdown || hotelName.trim().length < 2) {
      setHotelSuggestions([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
        }
        const queryInput = destinationLocation.trim()
          ? `${hotelName.trim()} ${destinationLocation.trim()}`
          : hotelName.trim();

        const res = await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: queryInput,
          includedPrimaryTypes: ['lodging'],
          language: lang,
          sessionToken: sessionTokenRef.current
        });
        setHotelSuggestions(res.suggestions.slice(0, 5));
      } catch (err) {
        dispatchQuotaWarningIfNeeded(err);
      }
    }, 280);

    return () => window.clearTimeout(timer);
  }, [mapsEnabled, placesLib, hotelName, destinationLocation, showHotelDropdown, lang]);

  // Autocomplete predictions for Visa Center / Consulate / Embassy when Visa Assistance is selected
  useEffect(() => {
    if (!mapsEnabled || !placesLib || !showVisaDropdown || visaCenter.trim().length < 2) {
      setVisaSuggestions([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
        }
        const queryInput = destinationLocation.trim()
          ? `${visaCenter.trim()} ${destinationLocation.trim()}`
          : visaCenter.trim();

        const res = await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: queryInput,
          language: lang,
          sessionToken: sessionTokenRef.current
        });
        setVisaSuggestions(res.suggestions.slice(0, 5));
      } catch (err) {
        dispatchQuotaWarningIfNeeded(err);
      }
    }, 280);

    return () => window.clearTimeout(timer);
  }, [mapsEnabled, placesLib, visaCenter, destinationLocation, showVisaDropdown, lang]);

  const handleSearchOnMap = useCallback(
    async (explicitQuery?: string, forceHotelMode?: boolean) => {
      if (!mapsEnabled || !placesLib) return;

      const hotelMode = forceHotelMode ?? isHotelService;
      const rawQuery =
        explicitQuery ??
        (hotelMode
          ? [hotelName.trim(), destinationLocation.trim()].filter(Boolean).join(' ')
          : isVisaService
          ? [visaCenter.trim(), destinationLocation.trim()].filter(Boolean).join(' ')
          : [destinationLocation.trim(), hotelName.trim()].filter(Boolean).join(' '));

      if (!rawQuery) return;

      setIsSearchingMap(true);
      setMapEmptyMsg(false);

      try {
        const request: google.maps.places.SearchByTextRequest = {
          textQuery:
            hotelMode && !rawQuery.toLowerCase().includes('hotel') && !hotelName.trim()
              ? `hotels in ${rawQuery}`
              : rawQuery,
          fields: ['displayName', 'formattedAddress', 'location', 'rating', 'userRatingCount'],
          maxResultCount: 6,
          language: lang
        };

        if (hotelMode) {
          request.includedType = 'lodging';
        }

        const { places } = await placesLib.Place.searchByText(request);
        const mapped: MapPlaceItem[] = (places || [])
          .filter((p) => p.location != null)
          .map((p, idx) => ({
            id: p.id || `place-${idx}`,
            name: p.displayName || rawQuery,
            address: p.formattedAddress || '',
            location: {
              lat: p.location!.lat(),
              lng: p.location!.lng()
            },
            rating: p.rating,
            ratingCount: p.userRatingCount
          }));

        setMapResults(mapped);
        if (mapped.length > 0) {
          onMapFocusCoordsChange(mapped[0].location);
          setActiveInfoId(mapped[0].id);
          setMapEmptyMsg(false);
        } else {
          setMapEmptyMsg(true);
        }
      } catch (err) {
        dispatchQuotaWarningIfNeeded(err);
        setMapEmptyMsg(true);
      } finally {
        setIsSearchingMap(false);
      }
    },
    [
      mapsEnabled,
      placesLib,
      isHotelService,
      isVisaService,
      hotelName,
      visaCenter,
      destinationLocation,
      lang,
      onMapFocusCoordsChange
    ]
  );

  // Trigger initial hotel/visa/destination focus smoothly when switching services
  useEffect(() => {
    if (!mapsEnabled || !placesLib) return;
    if (isHotelService && (hotelName.trim() || destinationLocation.trim())) {
      void handleSearchOnMap(undefined, true);
    } else if (isVisaService) {
      if (visaCenter.trim() || destinationLocation.trim()) {
        void handleSearchOnMap(
          [visaCenter.trim(), destinationLocation.trim()].filter(Boolean).join(' '),
          false
        );
      } else {
        setMapResults([]);
        onMapFocusCoordsChange({ lat: 34.0331, lng: -6.7985 });
      }
    }
    // Only run on service change or places library load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeService, placesLib]);

  const handlePickSuggestion = async (
    suggestion: google.maps.places.AutocompleteSuggestion,
    target: 'city' | 'hotel' | 'visa'
  ) => {
    if (!suggestion.placePrediction) return;

    const predictedLabel =
      suggestion.placePrediction.mainText?.text ||
      suggestion.placePrediction.text.text;

    if (target === 'city') {
      onDestinationLocationChange(suggestion.placePrediction.text.text);
      setShowCityDropdown(false);
    } else if (target === 'hotel') {
      onHotelNameChange(predictedLabel);
      setShowHotelDropdown(false);
    } else {
      setVisaCenter(predictedLabel);
      setShowVisaDropdown(false);
    }

    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({
        fields: ['displayName', 'formattedAddress', 'location', 'rating', 'userRatingCount']
      });
      resetSession();

      if (place.location) {
        const picked: MapPlaceItem = {
          id: place.id || `picked-${Date.now()}`,
          name: place.displayName || predictedLabel,
          address: place.formattedAddress || '',
          location: {
            lat: place.location.lat(),
            lng: place.location.lng()
          },
          rating: place.rating,
          ratingCount: place.userRatingCount
        };
        setSelectedMapPlace(picked);
        setMapResults([picked]);
        setActiveInfoId(picked.id);
        onMapFocusCoordsChange(picked.location);

        if (target === 'hotel') {
          onHotelNameChange(picked.name);
        } else if (target === 'visa') {
          setVisaCenter(picked.name);
        } else {
          onDestinationLocationChange(picked.name || picked.address);
        }
      }
    } catch (err) {
      dispatchQuotaWarningIfNeeded(err);
    }
  };

  const handleChooseMapResult = (place: MapPlaceItem) => {
    setSelectedMapPlace(place);
    setActiveInfoId(place.id);
    onMapFocusCoordsChange(place.location);
    if (isHotelService || hotelName.trim().length > 0) {
      onHotelNameChange(place.name);
      if (!destinationLocation.trim() && place.address) {
        onDestinationLocationChange(place.address);
      }
    } else if (isVisaService) {
      setVisaCenter(place.name);
      if (!destinationLocation.trim() && place.address) {
        onDestinationLocationChange(place.address);
      }
    } else {
      onDestinationLocationChange(place.name || place.address);
    }
  };

  const currentServiceObj = t.servicesSection.services[activeService];
  const guestsLabel = t.plannerSection.guestOptions[guestIdx] ?? '';
  const insuranceLabel = t.plannerSection.insurancePlanOptions[insurancePlanIdx] ?? '';

  const buildWhatsAppMessageUrl = () => {
    const mapPinLink = selectedMapPlace
      ? `https://www.google.com/maps/search/?api=1&query=${selectedMapPlace.location.lat},${selectedMapPlace.location.lng}`
      : '';

    const scheduleParts = [
      departureDate ? `${t.plannerSection.departureDateLabel}: ${departureDate}` : '',
      returnDate ? `${t.plannerSection.returnDateLabel}: ${returnDate}` : '',
      preferredTime ? `${t.plannerSection.timeLabel}: ${preferredTime}` : ''
    ].filter(Boolean);

    const lines = [
      `Hello Golden Group Travels,`,
      `I would like to request assistance for:`,
      `• Service: ${currentServiceObj.label}`,
      activeService === 'flight-bookings' && departureCity.trim()
        ? `• Departure City: ${departureCity.trim()}`
        : '',
      destinationLocation.trim()
        ? `• Destination / City: ${destinationLocation.trim()}`
        : '',
      hotelName.trim() ? `• Hotel Name: ${hotelName.trim()}` : '',
      isVisaService && visaPurpose.trim()
        ? `• Visa Type: ${visaPurpose.trim()}`
        : '',
      isVisaService && visaCenter.trim()
        ? `• Consulate / Visa Center: ${visaCenter.trim()}`
        : '',
      activeService === 'travel-insurance' ? `• Insurance Plan: ${insuranceLabel}` : '',
      scheduleParts.length > 0 ? `• Schedule: ${scheduleParts.join(' | ')}` : '',
      `• Travelers: ${guestsLabel}`,
      travelerName.trim() ? `• Full Name: ${travelerName.trim()}` : '',
      travelerPhone.trim() ? `• Phone: ${travelerPhone.trim()}` : '',
      selectedMapPlace
        ? `• Selected on Maps: ${selectedMapPlace.name}${
            selectedMapPlace.address ? ` (${selectedMapPlace.address})` : ''
          }`
        : '',
      mapPinLink ? `• Google Maps Location: ${mapPinLink}` : '',
      preferences.trim() ? `• Notes: ${preferences.trim()}` : ''
    ].filter(Boolean);

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleBuildItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    setItineraryBuilt(true);
  };

  const mapHealthy =
    mapsEnabled &&
    apiStatus !== APILoadingStatus.FAILED &&
    apiStatus !== APILoadingStatus.AUTH_FAILURE;

  return (
    <section id="planner" className="py-20 md:py-28 max-w-7xl mx-auto px-5 sm:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 reveal-init">
        <p className="text-xs uppercase tracking-[0.26em] text-[#9a7220] font-semibold mb-3">
          {t.plannerSection.eyebrow}
        </p>
        <h2 className="font-serif-crest text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0b1d3a]">
          {t.plannerSection.title}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#2c405e]">{t.plannerSection.subtitle}</p>
      </div>

      {/* Main Dynamic Service-Aware Form + Google Maps Connected Layout */}
      <div className="bg-[#fcf9f2] border border-[#d1a847]/45 rounded-2xl p-6 sm:p-9 lg:p-10 shadow-[0_22px_54px_rgba(11,29,58,0.1)] reveal-init">
        {/* Service Selector Row (5 Main Services Only) */}
        <div className="mb-8">
          <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#0b1d3a] mb-3">
            {t.plannerSection.serviceLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {SERVICE_ORDER.map((srvId) => {
              const srv = t.servicesSection.services[srvId];
              const Icon = SERVICE_ICONS[srvId];
              const active = activeService === srvId;
              return (
                <button
                  key={srvId}
                  type="button"
                  onClick={() => {
                    onSelectService(srvId);
                    setItineraryBuilt(false);
                  }}
                  className={`py-3 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-md'
                      : 'bg-[#f5ede0] text-[#0b1d3a] border-[#d1a847]/40 hover:border-[#0b1d3a]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{srv.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Dynamic Contact / Booking Form (7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {itineraryBuilt ? (
              <div className="space-y-6 bg-[#f5ede0]/70 border border-[#d1a847]/40 rounded-xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
                      {t.plannerSection.dossierReady}
                    </div>
                    <h3 className="font-serif-crest text-2xl font-semibold text-[#0b1d3a] mt-1">
                      {currentServiceObj.label}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setItineraryBuilt(false)}
                    className="px-4 py-2 rounded-lg border border-[#d1a847]/50 text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] hover:bg-[#0b1d3a] hover:text-[#fceda2] transition-colors cursor-pointer"
                  >
                    {t.plannerSection.adjustBtn}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-[#fcf9f2] border border-[#d1a847]/30">
                    <div className="text-[11px] uppercase tracking-wider text-[#2c405e]">
                      {t.plannerSection.locationSummaryLabel}
                    </div>
                    <div className="font-serif-crest text-lg font-semibold text-[#0b1d3a] mt-1">
                      {destinationLocation.trim() || '—'}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#fcf9f2] border border-[#d1a847]/30">
                    <div className="text-[11px] uppercase tracking-wider text-[#2c405e]">
                      {isVisaService
                        ? t.plannerSection.visaPurposeLabel
                        : t.plannerSection.hotelSummaryLabel}
                    </div>
                    <div className="font-serif-crest text-lg font-semibold text-[#0b1d3a] mt-1">
                      {isVisaService
                        ? [visaPurpose.trim(), visaCenter.trim() || selectedMapPlace?.name]
                            .filter(Boolean)
                            .join(' · ') || '—'
                        : hotelName.trim() || selectedMapPlace?.name || '—'}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#fcf9f2] border border-[#d1a847]/30">
                    <div className="text-[11px] uppercase tracking-wider text-[#2c405e]">
                      {t.plannerSection.scheduleLabel}
                    </div>
                    <div className="font-serif-crest text-base font-semibold text-[#0b1d3a] mt-1" dir="ltr">
                      {departureDate || '—'} {returnDate ? `→ ${returnDate}` : ''}{' '}
                      {preferredTime ? `· ${preferredTime}` : ''}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#fcf9f2] border border-[#d1a847]/30">
                    <div className="text-[11px] uppercase tracking-wider text-[#2c405e]">
                      {t.plannerSection.travelersLabel}
                    </div>
                    <div className="font-serif-crest text-base font-semibold text-[#0b1d3a] mt-1">
                      {guestsLabel}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={buildWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_6px_20px_rgba(16,185,129,0.28)] transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>
                      {t.plannerSection.sendWhatsapp} ({displayPhone})
                    </span>
                  </a>

                  <a
                    href="tel:0666484815"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] bg-[#ede1ce] border border-[#d1a847]/60 hover:bg-[#0b1d3a] hover:text-[#fceda2] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c59b38]" />
                    <span>
                      {t.plannerSection.callBtn} {displayPhone}
                    </span>
                  </a>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[#d1a847]/25">
                  <span className="text-xs text-[#2c405e]">{t.plannerSection.beautifulStories}</span>
                  <button
                    type="button"
                    onClick={onReturnToHero}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] hover:text-[#9a7220] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#c59b38]" />
                    <span>{t.plannerSection.returnBtn}</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBuildItinerary} className="space-y-5">
                {/* Service-Dynamic Primary Focus Order:
                    When Visa Assistance is selected, highlight Visa Type + Consulate/Visa Center connected to Google Maps! */}
                {isVisaService && (
                  <div className="space-y-4 p-4 rounded-xl bg-[#ede1ce]/55 border border-[#d1a847]/70">
                    <div>
                      <label
                        htmlFor="visa-purpose-input"
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0b1d3a] mb-2"
                      >
                        <FileCheck2 className="w-4 h-4 text-[#9a7220]" />
                        <span>{t.plannerSection.visaPurposeLabel}</span>
                      </label>
                      <input
                        id="visa-purpose-input"
                        type="text"
                        value={visaPurpose}
                        onChange={(e) => setVisaPurpose(e.target.value)}
                        placeholder={t.plannerSection.visaPurposePlaceholder}
                        className="w-full bg-[#fcf9f2] border border-[#d1a847]/65 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="visa-center-input"
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0b1d3a] mb-2"
                      >
                        <MapPin className="w-4 h-4 text-[#9a7220]" />
                        <span>{t.plannerSection.visaCenterLabel}</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="visa-center-input"
                          type="text"
                          value={visaCenter}
                          onFocus={() => setShowVisaDropdown(true)}
                          onBlur={() => window.setTimeout(() => setShowVisaDropdown(false), 180)}
                          onChange={(e) => {
                            setVisaCenter(e.target.value);
                            setShowVisaDropdown(true);
                          }}
                          placeholder={t.plannerSection.visaCenterPlaceholder}
                          className="flex-1 bg-[#fcf9f2] border border-[#d1a847]/65 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            void handleSearchOnMap(
                              visaCenter.trim() || destinationLocation.trim(),
                              false
                            )
                          }
                          disabled={!mapHealthy || isSearchingMap}
                          className="px-3.5 py-2.5 rounded-lg bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
                        >
                          <Search className="w-3.5 h-3.5 text-[#d1a847]" />
                          <span className="hidden sm:inline">
                            {isSearchingMap
                              ? t.plannerSection.mapSearching
                              : t.plannerSection.mapSearchBtn}
                          </span>
                        </button>
                      </div>

                      {showVisaDropdown && visaSuggestions.length > 0 && (
                        <ul className="absolute left-0 right-0 z-30 mt-1.5 bg-[#fcf9f2] border border-[#d1a847]/70 rounded-xl shadow-xl overflow-hidden divide-y divide-[#d1a847]/20">
                          {visaSuggestions.map((s, idx) => (
                            <li key={idx}>
                              <button
                                type="button"
                                onMouseDown={() => void handlePickSuggestion(s, 'visa')}
                                className="w-full px-3.5 py-2.5 text-left rtl:text-right hover:bg-[#ede1ce] flex items-center gap-2.5 text-xs text-[#0b1d3a] cursor-pointer"
                              >
                                <MapPin className="w-3.5 h-3.5 text-[#9a7220] shrink-0" />
                                <span className="truncate">{s.placePrediction?.text.text}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

                {/* When Hotel Reservations is selected, Hotel Name comes FIRST & highlighted for Google Maps! */}
                {isHotelService && (
                  <div className="relative p-4 rounded-xl bg-[#ede1ce]/55 border border-[#d1a847]/70">
                    <label
                      htmlFor="hotel-name-input"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0b1d3a] mb-2"
                    >
                      <Building2 className="w-4 h-4 text-[#9a7220]" />
                      <span>{t.plannerSection.hotelLabel}</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="hotel-name-input"
                        type="text"
                        value={hotelName}
                        onFocus={() => setShowHotelDropdown(true)}
                        onBlur={() => window.setTimeout(() => setShowHotelDropdown(false), 180)}
                        onChange={(e) => {
                          onHotelNameChange(e.target.value);
                          setShowHotelDropdown(true);
                        }}
                        placeholder={t.plannerSection.hotelPlaceholder}
                        className="flex-1 bg-[#fcf9f2] border border-[#d1a847]/65 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                      />
                      <button
                        type="button"
                        onClick={() => void handleSearchOnMap(undefined, true)}
                        disabled={!mapHealthy || isSearchingMap}
                        className="px-3.5 py-2.5 rounded-lg bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
                      >
                        <Search className="w-3.5 h-3.5 text-[#d1a847]" />
                        <span className="hidden sm:inline">
                          {isSearchingMap
                            ? t.plannerSection.mapSearching
                            : t.plannerSection.mapSearchBtn}
                        </span>
                      </button>
                    </div>

                    {showHotelDropdown && hotelSuggestions.length > 0 && (
                      <ul className="absolute left-4 right-4 z-30 mt-1.5 bg-[#fcf9f2] border border-[#d1a847]/70 rounded-xl shadow-xl overflow-hidden divide-y divide-[#d1a847]/20">
                        {hotelSuggestions.map((s, idx) => (
                          <li key={idx}>
                            <button
                              type="button"
                              onMouseDown={() => void handlePickSuggestion(s, 'hotel')}
                              className="w-full px-3.5 py-2.5 text-left rtl:text-right hover:bg-[#ede1ce] flex items-center gap-2.5 text-xs text-[#0b1d3a] cursor-pointer"
                            >
                              <Building2 className="w-3.5 h-3.5 text-[#9a7220] shrink-0" />
                              <span className="truncate">{s.placePrediction?.text.text}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Flight Bookings Departure City */}
                {activeService === 'flight-bookings' && (
                  <div>
                    <label
                      htmlFor="departure-city-input"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0b1d3a] mb-1.5"
                    >
                      <Plane className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{t.plannerSection.departureCityLabel}</span>
                    </label>
                    <input
                      id="departure-city-input"
                      type="text"
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      placeholder={t.plannerSection.departureCityPlaceholder}
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/50 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>
                )}

                {/* Free-Text Horizon Destination / City (Any City Client Wants) */}
                <div className="relative">
                  <label
                    htmlFor="horizon-destination-input"
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0b1d3a] mb-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#c59b38]" />
                    <span>{t.plannerSection.destLabel}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="horizon-destination-input"
                      type="text"
                      value={destinationLocation}
                      onFocus={() => setShowCityDropdown(true)}
                      onBlur={() => window.setTimeout(() => setShowCityDropdown(false), 180)}
                      onChange={(e) => {
                        onDestinationLocationChange(e.target.value);
                        setShowCityDropdown(true);
                      }}
                      placeholder={t.plannerSection.destPlaceholder}
                      className="flex-1 bg-[#f8f2e7] border border-[#d1a847]/50 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                    />
                    {!isHotelService && (
                      <button
                        type="button"
                        onClick={() => void handleSearchOnMap(destinationLocation, false)}
                        disabled={!mapHealthy || isSearchingMap}
                        className="px-3.5 py-2.5 rounded-lg bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
                      >
                        <Search className="w-3.5 h-3.5 text-[#d1a847]" />
                        <span className="hidden sm:inline">
                          {isSearchingMap
                            ? t.plannerSection.mapSearching
                            : t.plannerSection.mapSearchBtn}
                        </span>
                      </button>
                    )}
                  </div>

                  {showCityDropdown && citySuggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 z-30 mt-1.5 bg-[#fcf9f2] border border-[#d1a847]/70 rounded-xl shadow-xl overflow-hidden divide-y divide-[#d1a847]/20">
                      {citySuggestions.map((s, idx) => (
                        <li key={idx}>
                          <button
                            type="button"
                            onMouseDown={() => void handlePickSuggestion(s, 'city')}
                            className="w-full px-3.5 py-2.5 text-left rtl:text-right hover:bg-[#ede1ce] flex items-center gap-2.5 text-xs text-[#0b1d3a] cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#9a7220] shrink-0" />
                            <span className="truncate">{s.placePrediction?.text.text}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Hotel Name Input for Holiday Packages & Flights (Client can write ANY hotel!) */}
                {!isHotelService && showHotelField && (
                  <div className="relative">
                    <label
                      htmlFor="optional-hotel-input"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0b1d3a] mb-1.5"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{t.plannerSection.hotelLabel}</span>
                    </label>
                    <input
                      id="optional-hotel-input"
                      type="text"
                      value={hotelName}
                      onFocus={() => setShowHotelDropdown(true)}
                      onBlur={() => window.setTimeout(() => setShowHotelDropdown(false), 180)}
                      onChange={(e) => {
                        onHotelNameChange(e.target.value);
                        setShowHotelDropdown(true);
                      }}
                      placeholder={t.plannerSection.hotelPlaceholder}
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/50 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                    />
                    {showHotelDropdown && hotelSuggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 z-30 mt-1.5 bg-[#fcf9f2] border border-[#d1a847]/70 rounded-xl shadow-xl overflow-hidden divide-y divide-[#d1a847]/20">
                        {hotelSuggestions.map((s, idx) => (
                          <li key={idx}>
                            <button
                              type="button"
                              onMouseDown={() => void handlePickSuggestion(s, 'hotel')}
                              className="w-full px-3.5 py-2.5 text-left rtl:text-right hover:bg-[#ede1ce] flex items-center gap-2.5 text-xs text-[#0b1d3a] cursor-pointer"
                            >
                              <Building2 className="w-3.5 h-3.5 text-[#9a7220] shrink-0" />
                              <span className="truncate">{s.placePrediction?.text.text}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Travel Insurance Specific Plan Field */}
                {activeService === 'travel-insurance' && (
                  <div>
                    <label
                      htmlFor="insurance-plan-select"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0b1d3a] mb-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{t.plannerSection.insurancePlanLabel}</span>
                    </label>
                    <select
                      id="insurance-plan-select"
                      value={insurancePlanIdx}
                      onChange={(e) => setInsurancePlanIdx(Number(e.target.value))}
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/50 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    >
                      {t.plannerSection.insurancePlanOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Re-added Old Date & Time Inputs + Travelers (Experience Pace Removed!) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div>
                    <label
                      htmlFor="departure-date"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] mb-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{t.plannerSection.departureDateLabel}</span>
                    </label>
                    <input
                      id="departure-date"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/45 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="return-date"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] mb-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{t.plannerSection.returnDateLabel}</span>
                    </label>
                    <input
                      id="return-date"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/45 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="preferred-time"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] mb-1.5"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{t.plannerSection.timeLabel}</span>
                    </label>
                    <input
                      id="preferred-time"
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/45 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="travel-guests"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] mb-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{t.plannerSection.travelersLabel}</span>
                    </label>
                    <select
                      id="travel-guests"
                      value={guestIdx}
                      onChange={(e) => setGuestIdx(Number(e.target.value))}
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/45 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    >
                      {t.plannerSection.guestOptions.map((opt, idx) => (
                        <option key={idx} value={idx}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Traveler Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="traveler-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] mb-1.5"
                    >
                      {t.plannerSection.nameLabel}
                    </label>
                    <input
                      id="traveler-name"
                      type="text"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      placeholder={t.plannerSection.namePlaceholder}
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/45 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="traveler-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] mb-1.5"
                    >
                      {t.plannerSection.phoneLabel}
                    </label>
                    <input
                      id="traveler-phone"
                      type="tel"
                      value={travelerPhone}
                      onChange={(e) => setTravelerPhone(e.target.value)}
                      placeholder={displayPhone}
                      dir="ltr"
                      className="w-full bg-[#f8f2e7] border border-[#d1a847]/45 rounded-lg px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="travel-notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] mb-1.5"
                  >
                    {t.plannerSection.notesLabel}
                  </label>
                  <textarea
                    id="travel-notes"
                    rows={2}
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder={t.plannerSection.notesPlaceholder}
                    className="w-full bg-[#f8f2e7] border border-[#d1a847]/45 rounded-lg p-3 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>{t.plannerSection.submitBtn}</span>
                  <ArrowRight className={`w-4 h-4 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Live Google Maps Interactive Panel (5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-4 rounded-xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/45">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#fceda2]">
                {isHotelService ? (
                  <Building2 className="w-4 h-4 text-[#d1a847] shrink-0" />
                ) : isVisaService ? (
                  <FileCheck2 className="w-4 h-4 text-[#d1a847] shrink-0" />
                ) : (
                  <Compass className="w-4 h-4 text-[#d1a847] shrink-0" />
                )}
                <span>
                  {isHotelService
                    ? t.plannerSection.mapTitleHotel
                    : isVisaService
                    ? t.plannerSection.mapTitleVisa
                    : t.plannerSection.mapTitleCity}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                {isHotelService
                  ? t.plannerSection.mapHotelHint
                  : isVisaService
                  ? t.plannerSection.mapVisaHint
                  : t.plannerSection.mapCityHint}
              </p>
            </div>

            <div className="relative w-full h-[320px] sm:h-[360px] lg:flex-1 lg:min-h-[340px] rounded-xl overflow-hidden border border-[#d1a847]/55 shadow-inner bg-[#ede1ce]">
              {mapHealthy ? (
                <GoogleMap
                  mapId="DEMO_MAP_ID"
                  defaultCenter={mapFocusCoords}
                  defaultZoom={11}
                  gestureHandling="greedy"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                >
                  <MapCameraSync center={mapFocusCoords} places={mapResults} />

                  {mapResults.length > 0 ? (
                    mapResults.map((place) => (
                      <PlaceMarkerPin
                        key={place.id}
                        place={place}
                        isSelected={selectedMapPlace?.id === place.id}
                        isOpen={activeInfoId === place.id}
                        isHotelMode={isHotelService}
                        onOpen={() => setActiveInfoId(place.id)}
                        onClose={() => setActiveInfoId(null)}
                        onChoose={handleChooseMapResult}
                        selectBtnLabel={t.plannerSection.mapSelectPin}
                        selectedBadgeLabel={t.plannerSection.mapSelectedTag}
                      />
                    ))
                  ) : (
                    <AdvancedMarker position={mapFocusCoords}>
                      <Pin background="#0b1d3a" borderColor="#d1a847" glyphColor="#fceda2" />
                    </AdvancedMarker>
                  )}
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#0b1d3a] space-y-3">
                  <MapPin className="w-9 h-9 text-[#9a7220]" />
                  <p className="text-xs sm:text-sm max-w-xs leading-relaxed text-[#2c405e]">
                    {t.plannerSection.mapKeyMissing}
                  </p>
                </div>
              )}
            </div>

            {/* Verified Salé Agency Google Maps Direct Link */}
            <a
              href={agencyMapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#0b1d3a] text-[#fcf9f2] border border-[#d1a847]/55 hover:border-[#fceda2] hover:bg-[#132d56] transition-colors group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin className="w-4 h-4 text-[#d1a847] shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#fceda2] truncate">
                    {t.plannerSection.agencyMapCardTitle}
                  </div>
                  <div className="text-[11px] text-slate-300 truncate">
                    {t.plannerSection.agencyMapBtn}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#d1a847] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {mapEmptyMsg && (
              <div className="text-xs text-[#9a7220] bg-[#ede1ce] border border-[#d1a847]/40 rounded-lg px-3.5 py-2">
                {t.plannerSection.mapEmptyNote}
              </div>
            )}

            {/* Quick Clickable Google Maps Results List */}
            {mapResults.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a7220]">
                  {t.plannerSection.mapResultsTitle}
                </div>
                {mapResults.map((place) => {
                  const chosen = selectedMapPlace?.id === place.id;
                  return (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => handleChooseMapResult(place)}
                      className={`w-full text-left rtl:text-right p-2.5 rounded-lg border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        chosen
                          ? 'bg-[#0b1d3a] text-[#fcf9f2] border-[#d1a847]'
                          : 'bg-[#f5ede0] text-[#0b1d3a] border-[#d1a847]/35 hover:border-[#0b1d3a]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{place.name}</div>
                        {place.address && (
                          <div
                            className={`text-[11px] truncate ${
                              chosen ? 'text-slate-300' : 'text-[#2c405e]'
                            }`}
                          >
                            {place.address}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5">
                        {typeof place.rating === 'number' && (
                          <span className="text-[11px] font-semibold text-[#d1a847]">
                            ★ {place.rating.toFixed(1)}
                          </span>
                        )}
                        {chosen && <CheckCircle2 className="w-4 h-4 text-[#d1a847]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TravelPlannerMapSection: React.FC<TravelPlannerMapSectionProps> = (props) => {
  const mapsEnabled = Boolean(GOOGLE_MAPS_API_KEY);

  if (!mapsEnabled) {
    return <PlannerMapInner {...props} mapsEnabled={false} />;
  }

  return (
    <APIProvider
      apiKey={GOOGLE_MAPS_API_KEY}
      libraries={['places', 'marker', 'core']}
      language={props.lang}
    >
      <PlannerMapInner {...props} mapsEnabled={true} />
    </APIProvider>
  );
};
