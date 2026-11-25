import cairoPyramidsHeroImg from '../assets/images/cairo_pyramids_hero_1795449231042.jpg';
import egyptNileCruiseHeroImg from '../assets/images/egypt_nile_cruise_hero_1795450588619.jpg';
import egyptHurghadaRedSeaImg from '../assets/images/egypt_hurghada_redsea_1795450589905.jpg';
import { Language } from '../assets/destinations';

export const GRAND_EGYPT_TOUR_IMAGES = {
  hero: egyptNileCruiseHeroImg,
  cairo: cairoPyramidsHeroImg,
  cruise: egyptNileCruiseHeroImg,
  hurghada: egyptHurghadaRedSeaImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const GRAND_EGYPT_TOUR_ROUTE = '/circuits-activites/epopee-egyptienne';
export const GRAND_EGYPT_TOURS_BACK_ROUTE = '/circuits-activites';

export type GrandEgyptHotelId =
  | 'triumph-plaza'
  | 'pyramisa-cairo'
  | 'triumph-luxury'
  | 'steigenberger-tahrir';

export type GrandEgyptOccupancyId = 'triple' | 'double';

export type GrandEgyptDateStatus =
  | 'unset'
  | 'regular'
  | 'excluded_special'
  | 'outside'
  | 'invalid_range';

export interface GrandEgyptDateEvaluation {
  status: GrandEgyptDateStatus;
  isArrivalSaturdayOrMonday: boolean | null;
  requiresGalaCheck: boolean;
}

export interface GrandEgyptHotelRateRow {
  id: GrandEgyptHotelId;
  name: Record<Language, string>;
  tierLabel: Record<Language, string>;
  doubleUsd: number;
  tripleUsd: number;
  singleSupplementUsd: number;
}

export const GRAND_EGYPT_PRICING_META = {
  currency: 'USD' as const,
  startingPriceUsd: 1690,
  startingHotelId: 'triumph-plaza' as GrandEgyptHotelId,
  startingOccupancy: 'triple' as GrandEgyptOccupancyId,
  regularStart: '2026-12-05',
  regularEnd: '2027-04-26',
  excludedSpecialPeriods: [
    { id: 'year-end', start: '2026-12-14', end: '2027-01-02' },
    { id: 'spring', start: '2027-03-15', end: '2027-04-03' }
  ] as const,
  minGroupPax: 20
} as const;

export const GRAND_EGYPT_HOTELS: readonly GrandEgyptHotelRateRow[] = [
  {
    id: 'triumph-plaza',
    name: {
      fr: 'Triumph Plaza ou similaire',
      ar: 'تريومف بلازا (Triumph Plaza) أو ما يماثله',
      en: 'Triumph Plaza or similar',
      es: 'Triumph Plaza o similar'
    },
    tierLabel: {
      fr: 'Tarif d’appel (Triple : 1 690 USD)',
      ar: 'السعر الابتدائي (ثلاثية: 1,690 USD)',
      en: 'Entry Tier (Triple: 1,690 USD)',
      es: 'Nivel inicial (Triple: 1 690 USD)'
    },
    doubleUsd: 1699,
    tripleUsd: 1690,
    singleSupplementUsd: 815
  },
  {
    id: 'pyramisa-cairo',
    name: {
      fr: 'Pyramisa Cairo ou similaire',
      ar: 'بيراميزا القاهرة (Pyramisa Cairo) أو ما يماثله',
      en: 'Pyramisa Cairo or similar',
      es: 'Pyramisa Cairo o similar'
    },
    tierLabel: {
      fr: 'Catégorie Confort',
      ar: 'الفئة المميزة',
      en: 'Comfort Tier',
      es: 'Categoría Confort'
    },
    doubleUsd: 1799,
    tripleUsd: 1790,
    singleSupplementUsd: 899
  },
  {
    id: 'triumph-luxury',
    name: {
      fr: 'Triumph Luxury ou similaire',
      ar: 'تريومف لاكجري (Triumph Luxury) أو ما يماثله',
      en: 'Triumph Luxury or similar',
      es: 'Triumph Luxury o similar'
    },
    tierLabel: {
      fr: 'Catégorie Supérieure',
      ar: 'الفئة العليا',
      en: 'Superior Tier',
      es: 'Categoría Superior'
    },
    doubleUsd: 1915,
    tripleUsd: 1910,
    singleSupplementUsd: 999
  },
  {
    id: 'steigenberger-tahrir',
    name: {
      fr: 'Steigenberger Tahrir ou similaire',
      ar: 'شتايجنبرجر التحرير (Steigenberger Tahrir) أو ما يماثله',
      en: 'Steigenberger Tahrir or similar',
      es: 'Steigenberger Tahrir o similar'
    },
    tierLabel: {
      fr: 'Catégorie Prestige',
      ar: 'فئة البريستيج',
      en: 'Prestige Tier',
      es: 'Categoría Prestige'
    },
    doubleUsd: 1999,
    tripleUsd: 1990,
    singleSupplementUsd: 1140
  }
] as const;

function dateOverlapsWindow(
  startIso: string,
  endIso: string,
  winStart: string,
  winEnd: string
): boolean {
  return startIso <= winEnd && endIso >= winStart;
}

function dateRangeIncludesMonthDay(
  startIso: string,
  endIso: string,
  monthDay: string
): boolean {
  const target = `2026-${monthDay}`;
  return startIso <= target && endIso >= target;
}

/**
 * Evaluates dates strictly against the Grand Egypt Tour published calendar:
 * - Regular advertised window: 2026-12-05 .. 2027-04-26 (Saturday or Monday arrivals)
 * - Excluded special periods (Tarif sur demande): 2026-12-14 .. 2027-01-02 and 2027-03-15 .. 2027-04-03
 */
export function evaluateGrandEgyptDates(
  departIso: string,
  returnIso?: string
): GrandEgyptDateEvaluation {
  if (!departIso) {
    return {
      status: 'unset',
      isArrivalSaturdayOrMonday: null,
      requiresGalaCheck: false
    };
  }

  const effectiveEnd = returnIso && returnIso.trim() ? returnIso : departIso;
  if (effectiveEnd < departIso) {
    return {
      status: 'invalid_range',
      isArrivalSaturdayOrMonday: null,
      requiresGalaCheck: false
    };
  }

  // Day of week in UTC (6 = Saturday, 1 = Monday)
  const utcDay = new Date(`${departIso}T12:00:00Z`).getUTCDay();
  const isArrivalSaturdayOrMonday = utcDay === 6 || utcDay === 1;

  const requiresGalaCheck =
    dateRangeIncludesMonthDay(departIso, effectiveEnd, '12-24') ||
    dateRangeIncludesMonthDay(departIso, effectiveEnd, '12-31');

  const touchesSpecialExcluded = GRAND_EGYPT_PRICING_META.excludedSpecialPeriods.some((win) =>
    dateOverlapsWindow(departIso, effectiveEnd, win.start, win.end)
  );

  if (touchesSpecialExcluded) {
    return {
      status: 'excluded_special',
      isArrivalSaturdayOrMonday,
      requiresGalaCheck
    };
  }

  const withinRegular =
    departIso >= GRAND_EGYPT_PRICING_META.regularStart &&
    effectiveEnd <= GRAND_EGYPT_PRICING_META.regularEnd;

  if (!withinRegular) {
    return {
      status: 'outside',
      isArrivalSaturdayOrMonday,
      requiresGalaCheck
    };
  }

  return {
    status: 'regular',
    isArrivalSaturdayOrMonday,
    requiresGalaCheck
  };
}

export interface GrandEgyptStage {
  id: 'cairo' | 'nile-cruise' | 'hurghada';
  stepNumber: string;
  nightsBadge: string;
  destinationTitle: string;
  hotelOrShip: string;
  boardBasis: string;
  summary: string;
  image: string;
}

export interface GrandEgyptInclusionItem {
  key:
    | 'visa'
    | 'cairoStay'
    | 'nileCruise'
    | 'hurghadaStay'
    | 'pyramidsGem'
    | 'islamicCairo'
    | 'dinnerCruise'
    | 'arrivalBreakfast'
    | 'cruiseExcursions'
    | 'luxorHurghadaTransfer'
    | 'airportAssistance'
    | 'tips'
    | 'domesticFlights'
    | 'guide';
  title: string;
  detail: string;
  highlightBadge?: string;
  pendingSourceNote?: boolean;
}

export interface GrandEgyptExclusionItem {
  key: 'internationalFlights' | 'beverages' | 'insidePyramids';
  title: string;
  detail: string;
  highlightFlights?: boolean;
}

export interface GrandEgyptConditionItem {
  id: string;
  title: string;
  emphasis: string;
  detail: string;
}

export interface GrandEgyptTourCopy {
  cardShortTitle: string;
  frenchFullTitle: string;
  arabicTitle: string;
  destinationLine: string;
  routeStopsLine: string;
  durationLabel: string;
  startingFromLabel: string;
  startingPriceDisplay: string;
  startingBasisNote: string;
  cardSummary: string;
  cardFlightDistinction: string;
  discoverBtn: string;
  reserveBtn: string;
  backToTours: string;
  backToHome: string;
  heroEyebrow: string;
  heroLead: string;
  heroFlightIncludedShort: string;
  heroFlightExcludedShort: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overviewSubtitle: string;
  stages: GrandEgyptStage[];
  breakdownEyebrow: string;
  breakdownTitle: string;
  breakdownTotalBadge: string;
  breakdownSummaryNote: string;
  pricingEyebrow: string;
  pricingTitle: string;
  pricingSubtitle: string;
  regularPeriodLabel: string;
  regularPeriodValue: string;
  arrivalDaysLabel: string;
  arrivalDaysValue: string;
  excludedPeriodsLabel: string;
  excludedPeriodsValue: string;
  excludedPeriodsActionValue: string;
  usdDisclaimer: string;
  hotelCol: string;
  doubleCol: string;
  tripleCol: string;
  singleSuppCol: string;
  singleSuppDisclaimer: string;
  selectBtn: string;
  selectedBtn: string;
  onRequestBadge: string;
  inclusionsEyebrow: string;
  inclusionsTitle: string;
  inclusionsSubtitle: string;
  inclusions: GrandEgyptInclusionItem[];
  exclusionsEyebrow: string;
  exclusionsTitle: string;
  exclusionsSubtitle: string;
  domesticVsIntlBannerTitle: string;
  domesticSideTitle: string;
  domesticSideDetail: string;
  internationalSideTitle: string;
  internationalSideDetail: string;
  exclusions: GrandEgyptExclusionItem[];
  conditionsEyebrow: string;
  conditionsTitle: string;
  conditionsSubtitle: string;
  conditions: GrandEgyptConditionItem[];
  formEyebrow: string;
  formTitle: string;
  formSubtitle: string;
  departDateLabel: string;
  returnDateLabel: string;
  hotelChoiceLabel: string;
  occupancyLabel: string;
  doubleOptionLabel: string;
  tripleOptionLabel: string;
  singleSupplementCheckLabel: string;
  singleSupplementCheckHint: string;
  travelersLabel: string;
  groupMin20Ok: string;
  groupUnder20Notice: string;
  dateMessages: {
    unset: string;
    regular: string;
    excluded_special: string;
    outside: string;
    invalid_range: string;
  };
  arrivalDayOkNote: string;
  arrivalDayWarningNote: string;
  galaWarningNote: string;
  quoteBoxTitle: string;
  baseFareLine: string;
  singleSuppLine: string;
  onRequestLine: string;
  under20UnpricedLine: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  submitBtn: string;
  whatsappBtn: string;
  readyTitle: string;
  editBtn: string;
  noAutoConfirmNote: string;
  advisorLabel: string;
  advisorTitle: string;
  callAgencyBtn: string;
  errors: {
    departRequired: string;
    returnInvalid: string;
    contactRequired: string;
  };
}

export const GRAND_EGYPT_COPY: Record<Language, GrandEgyptTourCopy> = {
  fr: {
    cardShortTitle: "L'Épopée Égyptienne",
    frenchFullTitle: "L'Épopée Égyptienne : 12 Jours Inoubliables",
    arabicTitle: 'حكاية مصر الكبرى',
    destinationLine: 'Égypte',
    routeStopsLine: 'Le Caire • Croisière sur le Nil • Hurghada',
    durationLabel: '12 jours / 11 nuits',
    startingFromLabel: 'À partir de',
    startingPriceDisplay: '1 690 USD',
    startingBasisNote: 'Base Triumph Plaza (ou sim.) · Chambre Triple · Période standard',
    cardSummary:
      'Grand circuit complet de 12 jours / 11 nuits combinant 5 nuits au Caire (B&B), 3 nuits de croisière Assouan–Louxor en pension complète et 3 nuits à Hurghada tout compris (hors alcool), vols intérieurs inclus.',
    cardFlightDistinction: 'Vols intérieurs inclus · Vols internationaux NON inclus',
    discoverBtn: 'Découvrir le circuit',
    reserveBtn: 'Demander une réservation',
    backToTours: 'Retour aux circuits',
    backToHome: 'Retour à l’accueil',
    heroEyebrow: 'Grand Circuit Officiel · Golden Group Travels',
    heroLead:
      'Un itinéraire emblématique en trois étapes — Le Caire, la croisière sur le Nil d’Assouan à Louxor et les rives de la mer Rouge à Hurghada — incluant les vols intérieurs Le Caire–Assouan et Hurghada–Le Caire.',
    heroFlightIncludedShort: 'Vols intérieurs inclus (Le Caire–Assouan & Hurghada–Le Caire)',
    heroFlightExcludedShort: 'Vols internationaux NON inclus',
    overviewEyebrow: 'Parcours en Trois Étapes Connectées',
    overviewTitle: 'Le Caire • Croisière sur le Nil • Hurghada',
    overviewSubtitle:
      '11 nuits / 12 jours structurés exactement selon l’annonce officielle de Golden Group Travels, sans étape ajoutée ni horaire journalier inventé.',
    stages: [
      {
        id: 'cairo',
        stepNumber: '01',
        nightsBadge: '5 nuits · Logement & petit-déjeuner (B&B)',
        destinationTitle: 'Le Caire',
        hotelOrShip: '4 catégories d’hôtels au choix (ou similaire)',
        boardBasis: 'Bed & Breakfast (B&B)',
        summary:
          'Découverte des Pyramides & Grand Musée Égyptien, journée complète au Caire islamique (Khan El Khalili, Al-Muizz, Al-Azhar, Al-Hussein, Amr Ibn Al-As), dîner-croisière et petit-déjeuner d’arrivée.',
        image: GRAND_EGYPT_TOUR_IMAGES.cairo
      },
      {
        id: 'nile-cruise',
        stepNumber: '02',
        nightsBadge: '3 nuits · Pension complète',
        destinationTitle: 'Croisière sur le Nil (Assouan – Louxor)',
        hotelOrShip: 'À bord du Paradise ou similaire',
        boardBasis: 'Pension complète (Full Board)',
        summary:
          'Liaison aérienne intérieure Le Caire–Assouan, embarquement pour 3 nuits de navigation entre Assouan et Louxor et transfert terrestre Louxor–Hurghada inclus.',
        image: GRAND_EGYPT_TOUR_IMAGES.cruise
      },
      {
        id: 'hurghada',
        stepNumber: '03',
        nightsBadge: '3 nuits · Tout compris (sans alcool)',
        destinationTitle: 'Hurghada · Mer Rouge',
        hotelOrShip: 'Swiss Inn Hurghada ou similaire',
        boardBasis: 'All-Inclusive hors boissons alcoolisées',
        summary:
          'Séjour balnéaire de 3 nuits au Swiss Inn Hurghada ou similaire en formule tout compris sans alcool, suivi du vol intérieur retour Hurghada–Le Caire.',
        image: GRAND_EGYPT_TOUR_IMAGES.hurghada
      }
    ],
    breakdownEyebrow: 'Répartition Officielle des Nuits',
    breakdownTitle: 'Durée & Hébergements du Programme',
    breakdownTotalBadge: 'Total : 11 nuits / 12 jours',
    breakdownSummaryNote:
      'Les 5 nuits au Caire varient selon les 4 catégories d’hôtels ci-dessous ; la croisière (Paradise ou similaire) et le séjour à Hurghada (Swiss Inn Hurghada ou similaire) restent identiques.',
    pricingEyebrow: 'Grille Tarifaire Officielle en USD',
    pricingTitle: 'Tarifs par Hôtel au Caire (Période Standard)',
    pricingSubtitle:
      'Tarifs par personne en USD valables uniquement sur la période standard ci-dessous (groupe minimum de 20 voyageurs). Le tarif d’appel de 1 690 USD correspond uniquement au Triumph Plaza en chambre triple.',
    regularPeriodLabel: 'Période standard annoncée',
    regularPeriodValue: '5 décembre 2026 – 26 avril 2027',
    arrivalDaysLabel: 'Jours d’arrivée prévus',
    arrivalDaysValue: 'Arrivée le samedi ou le lundi',
    excludedPeriodsLabel: 'Périodes spéciales exclues de cette grille',
    excludedPeriodsValue: '14 déc. 2026 – 2 janv. 2027 et 15 mars – 3 avr. 2027',
    excludedPeriodsActionValue: 'Tarif sur demande — Confirmation directe requise auprès de Golden',
    usdDisclaimer: 'Tous les tarifs sont publiés exclusivement en USD (aucune conversion en MAD). Hors vols internationaux.',
    hotelCol: 'Hôtel au Caire ou similaire',
    doubleCol: 'Chambre Double',
    tripleCol: 'Chambre Triple',
    singleSuppCol: 'Supplément single',
    singleSuppDisclaimer:
      'Important : la colonne « Supplément single » indique uniquement un supplément à ajouter au tarif — jamais le prix total d’une chambre individuelle.',
    selectBtn: 'Choisir',
    selectedBtn: 'Sélectionné',
    onRequestBadge: 'Tarif sur demande',
    inclusionsEyebrow: 'Prestations Officielles Annoncées',
    inclusionsTitle: 'Le prix comprend',
    inclusionsSubtitle:
      'Liste exacte des prestations incluses dans « L’Épopée Égyptienne : 12 Jours Inoubliables » :',
    inclusions: [
      { key: 'visa', title: 'Visa d’entrée', detail: 'Visa d’entrée en Égypte inclus au programme.' },
      {
        key: 'cairoStay',
        title: '5 nuits au Caire (B&B)',
        detail: 'Hébergement de 5 nuits au Caire en formule logement et petit-déjeuner dans la catégorie choisie.'
      },
      {
        key: 'nileCruise',
        title: '3 nuits Croisière sur le Nil (PC)',
        detail: 'Navigation Assouan–Louxor de 3 nuits en pension complète à bord du Paradise ou similaire.'
      },
      {
        key: 'hurghadaStay',
        title: '3 nuits à Hurghada (Tout compris sans alcool)',
        detail:
          'Séjour de 3 nuits au Swiss Inn Hurghada ou similaire en formule tout compris hors boissons alcoolisées.'
      },
      {
        key: 'pyramidsGem',
        title: 'Pyramides & Grand Musée Égyptien',
        detail: 'Excursion d’une journée complète aux Pyramides et au Grand Musée Égyptien.'
      },
      {
        key: 'islamicCairo',
        title: 'Journée complète Caire Historique',
        detail:
          'Visite complète : Khan El Khalili, rue Al-Muizz, Mosquée Al-Azhar, Mosquée Al-Hussein et Mosquée Amr Ibn Al-As.'
      },
      { key: 'dinnerCruise', title: 'Dîner-croisière', detail: 'Dîner-croisière inclus durant votre étape au Caire.' },
      {
        key: 'arrivalBreakfast',
        title: 'Petit-déjeuner à l’arrivée',
        detail: 'Petit-déjeuner servi dans un restaurant local à votre arrivée.'
      },
      {
        key: 'cruiseExcursions',
        title: 'Excursions de la croisière sur le Nil (Assouan – Louxor)',
        detail:
          'Les visites de la croisière sont incluses selon l’affiche arabe officielle. Les visuels sources n’ayant pas été transmis dans cette session, la liste exacte des sites est confirmée directement par Golden Group Travels sans ajout supposé.',
        pendingSourceNote: true,
        highlightBadge: 'Sites exacts à confirmer d’après l’affiche arabe'
      },
      {
        key: 'luxorHurghadaTransfer',
        title: 'Transfert Louxor → Hurghada',
        detail: 'Transfert terrestre en véhicule de Louxor vers Hurghada.'
      },
      {
        key: 'airportAssistance',
        title: 'Transferts aéroport FR / AR',
        detail: 'Transferts aéroport avec assistance francophone ou arabophone.'
      },
      { key: 'tips', title: 'Pourboires (hors guides)', detail: 'Pourboires inclus, à l’exclusion des guides.' },
      {
        key: 'domesticFlights',
        title: 'Vols intérieurs inclus (Le Caire–Assouan & Hurghada–Le Caire)',
        detail:
          'Les deux vols domestiques sur l’itinéraire annoncé Le Caire–Assouan et Hurghada–Le Caire sont compris dans le forfait.',
        highlightBadge: 'Vols domestiques inclus'
      },
      {
        key: 'guide',
        title: 'Guide local francophone ou arabophone',
        detail: 'Accompagnement par un guide touristique local parlant français ou arabe.'
      }
    ],
    exclusionsEyebrow: 'Hors Forfait · À Prévoir Séparément',
    exclusionsTitle: 'Le prix ne comprend pas',
    exclusionsSubtitle:
      'Vérifiez attentivement la séparation entre les vols intérieurs (inclus) et les vols internationaux (non inclus) :',
    domesticVsIntlBannerTitle: 'Distinction importante sur l’aérien',
    domesticSideTitle: 'Vols intérieurs INCLUS',
    domesticSideDetail: 'Trajets domestiques Le Caire → Assouan et Hurghada → Le Caire inclus au programme.',
    internationalSideTitle: 'Vols internationaux NON INCLUS',
    internationalSideDetail:
      'Les vols internationaux aller-retour (ex. Maroc ↔ Le Caire) ne sont jamais inclus dans le tarif dès 1 690 USD.',
    exclusions: [
      {
        key: 'internationalFlights',
        title: 'Vols internationaux NON inclus',
        detail:
          'Votre billet international vers et depuis Le Caire reste hors forfait (devis aérien séparé possible auprès de notre bureau à Salé).',
        highlightFlights: true
      },
      {
        key: 'beverages',
        title: 'Boissons',
        detail: 'Les boissons (et toutes boissons alcoolisées à Hurghada) ne sont pas incluses.'
      },
      {
        key: 'insidePyramids',
        title: 'Entrée à l’intérieur des pyramides',
        detail: 'Les billets d’accès à l’intérieur des pyramides ne sont pas compris.'
      }
    ],
    conditionsEyebrow: 'Règles de Réservation & Mentions Officielles',
    conditionsTitle: 'Conditions et informations importantes',
    conditionsSubtitle:
      'Conditions officielles de l’offre. Golden Group Travels confirme chaque demande en direct avant toute validation.',
    conditions: [
      {
        id: 'min-20',
        title: 'Taille minimale de groupe',
        emphasis: 'Minimum 20 voyageurs',
        detail:
          'Les tarifs publiés (dès 1 690 USD) s’appliquent pour un minimum de 20 personnes. Aucun tarif n’est publié pour moins de 20 voyageurs (devis spécifique sur demande).'
      },
      {
        id: 'monuments',
        title: 'Tarifs des monuments',
        emphasis: 'Révision possible en cas de hausse',
        detail:
          'L’agence se réserve le droit d’appliquer un supplément en cas d’augmentation officielle des billets d’entrée aux monuments.'
      },
      {
        id: 'gala',
        title: 'Dîners de gala obligatoires',
        emphasis: '24 décembre & 31 décembre',
        detail:
          'Des dîners de gala obligatoires peuvent parfois être exigés les 24 et 31 décembre ; leurs modalités et tarifs sont à vérifier au moment de la réservation.'
      },
      {
        id: 'excluded-dates',
        title: 'Périodes spéciales exclues',
        emphasis: 'Tarif sur demande (14 déc.–2 janv. & 15 mars–3 avr.)',
        detail:
          'Les prix de la grille standard excluent ces deux fenêtres festives. Pour ces dates, demandez une tarification directe à notre agence.'
      },
      {
        id: 'arrival-days',
        title: 'Jours d’arrivée & confirmation',
        emphasis: 'Arrivée samedi ou lundi · Devis final agence',
        detail:
          'La période régulière (5 déc. 2026 – 26 avr. 2027) prévoit une arrivée le samedi ou le lundi. Disponibilité réelle et prix total confirmés par Golden Group Travels.'
      }
    ],
    formEyebrow: 'Demande Directe Agence · Bureau de Salé',
    formTitle: "Demander une réservation — L'Épopée Égyptienne",
    formSubtitle:
      'Aucune confirmation automatique ni paiement en ligne. Transmettez vos dates, votre hôtel préféré et le nombre de voyageurs sur WhatsApp pour recevoir votre devis final.',
    departDateLabel: 'Date de départ souhaitée *',
    returnDateLabel: 'Date de retour souhaitée',
    hotelChoiceLabel: 'Catégorie d’hôtel au Caire (5 nuits)',
    occupancyLabel: 'Type d’occupation',
    doubleOptionLabel: 'Chambre Double',
    tripleOptionLabel: 'Chambre Triple',
    singleSupplementCheckLabel: 'Ajouter l’option Supplément single (occupation individuelle)',
    singleSupplementCheckHint:
      'Montant indiqué à titre de supplément individuel additionnel, soumis à confirmation hôtelière.',
    travelersLabel: 'Nombre de voyageurs',
    groupMin20Ok: 'Éligible à la grille base groupe (20+ voyageurs)',
    groupUnder20Notice:
      'Moins de 20 voyageurs : tarif groupe réduit non publié dans la grille — chiffrage sur confirmation directe Golden Group Travels.',
    dateMessages: {
      unset: 'Choisissez une date de départ (5 déc. 2026 – 26 avr. 2027, arrivée samedi ou lundi).',
      regular: 'Dates comprises dans la période standard publiée (5 déc. 2026 – 26 avr. 2027).',
      excluded_special:
        'Période spéciale exclue (14 déc. 2026 – 2 janv. 2027 ou 15 mars – 3 avr. 2027) : Tarif sur demande uniquement — aucun tarif standard ne s’applique automatiquement.',
      outside:
        'Dates en dehors de la fenêtre publiée (5 déc. 2026 – 26 avr. 2027) : Tarif sur demande auprès de l’agence.',
      invalid_range: 'La date de retour doit être postérieure ou égale à la date de départ.'
    },
    arrivalDayOkNote: 'Votre date de départ sélectionnée correspond bien à un samedi ou un lundi.',
    arrivalDayWarningNote:
      'Remarque : les départs standard annoncés prévoient une arrivée le samedi ou le lundi (vérification de faisabilité à l’étape WhatsApp).',
    galaWarningNote:
      'Dates incluant le 24 et/ou le 31 décembre : veuillez vérifier auprès de notre équipe si un dîner de gala obligatoire s’applique.',
    quoteBoxTitle: 'Tarif de base publié (USD)',
    baseFareLine: 'Base publiée / personne (20+ pers.)',
    singleSuppLine: 'Supplément single',
    onRequestLine: 'Tarif sur demande (confirmation Golden Group requise)',
    under20UnpricedLine: 'Moins de 20 pers. : devis personnalisé sur confirmation',
    nameLabel: 'Nom complet *',
    namePlaceholder: 'Votre nom et prénom',
    phoneLabel: 'Téléphone / WhatsApp *',
    phonePlaceholder: 'Ex : +212 6XX-XXXXXX',
    notesLabel: 'Précisions (optionnel — ex : demande de devis vol international)',
    notesPlaceholder: 'Aéroport de départ souhaité pour les vols internationaux, questions sur la croisière...',
    submitBtn: 'Préparer ma demande WhatsApp',
    whatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    readyTitle: 'Récapitulatif prêt à envoyer à Golden Group Travels',
    editBtn: 'Modifier',
    noAutoConfirmNote:
      'Demande sans paiement ni confirmation automatique. Notre bureau de Salé vérifie la disponibilité réelle avant toute réservation.',
    advisorLabel: 'Bureau Golden Group · Salé',
    advisorTitle: 'Besoin des vols internationaux en plus ?',
    callAgencyBtn: 'Appeler l’agence',
    errors: {
      departRequired: 'Veuillez sélectionner votre date de départ souhaitée.',
      returnInvalid: 'La date de retour ne peut pas précéder la date de départ.',
      contactRequired: 'Veuillez saisir votre nom complet et votre numéro WhatsApp/téléphone.'
    }
  },
  ar: {
    cardShortTitle: 'حكاية مصر الكبرى',
    frenchFullTitle: "L'Épopée Égyptienne : 12 Jours Inoubliables",
    arabicTitle: 'حكاية مصر الكبرى',
    destinationLine: 'مصر',
    routeStopsLine: 'القاهرة • كروز النيل • الغردقة',
    durationLabel: '12 يوماً / 11 ليلة',
    startingFromLabel: 'ابتداءً من',
    startingPriceDisplay: '1,690 USD',
    startingBasisNote: 'فندق تريومف بلازا (أو ما يماثله) · غرفة ثلاثية · الفترة العادية',
    cardSummary:
      'برنامج متكامل لمدة 12 يوماً / 11 ليلة يجمع 5 ليالٍ بالقاهرة مع الإفطار، 3 ليالٍ على باخرة نيلية بين أسوان والأقصر بإقامة كاملة و3 ليالٍ بالغردقة إقامة شاملة بدون كحوليات، شامل الطيران الداخلي.',
    cardFlightDistinction: 'الطيران الداخلي مشمول · الطيران الدولي غير مشمول',
    discoverBtn: 'اكتشف البرنامج',
    reserveBtn: 'طلب حجز',
    backToTours: 'العودة إلى الجولات والأنشطة',
    backToHome: 'العودة إلى الرئيسية',
    heroEyebrow: 'برنامج مصر الكبير الرسمي · جولدن جروب',
    heroLead:
      'رحلة عبر ثلاث محطات متصلة — القاهرة، كروز النيل من أسوان إلى الأقصر، والغردقة على البحر الأحمر — شاملة الطيران الداخلي القاهرة–أسوان والغردقة–القاهرة.',
    heroFlightIncludedShort: 'الطيران الداخلي مشمول (القاهرة–أسوان والغردقة–القاهرة)',
    heroFlightExcludedShort: 'الطيران الدولي غير مشمول',
    overviewEyebrow: 'ثلاث مراحل مترابطة للرحلة',
    overviewTitle: 'القاهرة • كروز النيل • الغردقة',
    overviewSubtitle:
      '11 ليلة / 12 يوماً مطابقة تماماً للإعلان الرسمي دون أي اختلاق لجدول يومي أو مدن إضافية.',
    stages: [
      {
        id: 'cairo',
        stepNumber: '01',
        nightsBadge: '5 ليالٍ · غرفة وإفطار (B&B)',
        destinationTitle: 'القاهرة',
        hotelOrShip: '4 خيارات فندقية (أو ما يماثلها)',
        boardBasis: 'إقامة وإفطار (B&B)',
        summary:
          'جولة يوم كامل للأهرامات والمتحف المصري الكبير، يوم كامل للقاهرة التاريخية (خان الخليلي، المعز، الأزهر، الحسين، عمرو بن العاص)، عشاء كروز وإفطار عند الوصول.',
        image: GRAND_EGYPT_TOUR_IMAGES.cairo
      },
      {
        id: 'nile-cruise',
        stepNumber: '02',
        nightsBadge: '3 ليالٍ · إقامة كاملة (Full Board)',
        destinationTitle: 'كروز النيل (أسوان – الأقصر)',
        hotelOrShip: 'على متن باخرة Paradise أو ما يماثلها',
        boardBasis: 'إقامة كاملة (Full Board)',
        summary:
          'رحلة طيران داخلي القاهرة–أسوان، إبحار 3 ليالٍ بين أسوان والأقصر بإقامة كاملة، ونقل بري من الأقصر إلى الغردقة.',
        image: GRAND_EGYPT_TOUR_IMAGES.cruise
      },
      {
        id: 'hurghada',
        stepNumber: '03',
        nightsBadge: '3 ليالٍ · شاملة (بدون كحوليات)',
        destinationTitle: 'الغردقة · البحر الأحمر',
        hotelOrShip: 'فندق Swiss Inn Hurghada أو ما يماثله',
        boardBasis: 'شامل كلياً باستثناء المشروبات الكحولية',
        summary:
          '3 ليالٍ في منتجع Swiss Inn Hurghada أو ما يماثله بنظام الإقامة الشاملة بدون مشروبات كحولية، يليها طيران داخلي الغردقة–القاهرة.',
        image: GRAND_EGYPT_TOUR_IMAGES.hurghada
      }
    ],
    breakdownEyebrow: 'توزيع الليالي المعتمد',
    breakdownTitle: 'مدة الرحلة ومستوى الإقامة',
    breakdownTotalBadge: 'الإجمالي: 11 ليلة / 12 يوماً',
    breakdownSummaryNote:
      'تتغير فئة الفندق في ليالي القاهرة الخمس حسب الجدول أدناه، بينما تبقى الباخرة (Paradise أو ما يماثلها) وفندق الغردقة (Swiss Inn Hurghada أو ما يماثله) موحدين.',
    pricingEyebrow: 'الجدول الرسمي للأسعار بالدولار (USD)',
    pricingTitle: 'الأسعار حسب فندق القاهرة (الفترة العادية)',
    pricingSubtitle:
      'الأسعار للشخص بالدولار الأمريكي (USD) لمجموعة لا تقل عن 20 شخصاً. السعر الابتدائي 1,690 USD يخص غرفة ثلاثية بفندق Triumph Plaza خلال الفترة العادية فقط.',
    regularPeriodLabel: 'الفترة العادية المعلنة',
    regularPeriodValue: '5 ديسمبر 2026 – 26 أبريل 2027',
    arrivalDaysLabel: 'أيام الوصول',
    arrivalDaysValue: 'الوصول يوم السبت أو الإثنين',
    excludedPeriodsLabel: 'الفترات الخاصة المستثناة من هذا الجدول',
    excludedPeriodsValue: '14 دجنبر 2026 – 2 يناير 2027 و 15 مارس – 3 أبريل 2027',
    excludedPeriodsActionValue: 'السعر عند الطلب (Tarif sur demande) — يتطلب تأكيد جولدن جروب',
    usdDisclaimer: 'الأسعار بالدولار الأمريكي (USD) حصراً دون تحويل للدرهم، ولا تشمل الطيران الدولي.',
    hotelCol: 'فندق القاهرة أو ما يماثله',
    doubleCol: 'غرفة ثنائية (Double)',
    tripleCol: 'غرفة ثلاثية (Triple)',
    singleSuppCol: 'مكمل الغرفة الفردية',
    singleSuppDisclaimer:
      'تنبيه: أرقام «مكمل الغرفة الفردية» هي إضافات على الباقة وليست أسعاراً مستقلة للرحلة.',
    selectBtn: 'اختيار',
    selectedBtn: 'مختار',
    onRequestBadge: 'السعر عند الطلب',
    inclusionsEyebrow: 'الخدمات المعلنة في العرض',
    inclusionsTitle: 'السعر الأساسي يشمل',
    inclusionsSubtitle: 'كافة البنود المشمولة رسمياً في برنامج «حكاية مصر الكبرى»:',
    inclusions: [
      { key: 'visa', title: 'تأشيرة الدخول', detail: 'تأشيرة الدخول إلى مصر مشمولة.' },
      { key: 'cairoStay', title: '5 ليالٍ بالقاهرة (B&B)', detail: '5 ليالٍ بفندق القاهرة المختار مع الإفطار.' },
      {
        key: 'nileCruise',
        title: '3 ليالٍ كروز النيل (إقامة كاملة)',
        detail: 'إقامة كاملة بين أسوان والأقصر على متن باخرة Paradise أو ما يماثلها.'
      },
      {
        key: 'hurghadaStay',
        title: '3 ليالٍ بالغردقة (شامل بدون كحوليات)',
        detail: 'فندق Swiss Inn Hurghada أو ما يماثله بنظام الإقامة الشاملة باستثناء المشروبات الكحولية.'
      },
      {
        key: 'pyramidsGem',
        title: 'الأهرامات والمتحف المصري الكبير',
        detail: 'جولة يوم كامل لزيارة الأهرامات والمتحف المصري الكبير.'
      },
      {
        key: 'islamicCairo',
        title: 'يوم كامل للقاهرة التاريخية',
        detail: 'خان الخليلي، شارع المعز، جامع الأزهر، مسجد الحسين ومسجد عمرو بن العاص.'
      },
      { key: 'dinnerCruise', title: 'عشاء كروز', detail: 'رحلة عشاء نيلية مشمولة.' },
      { key: 'arrivalBreakfast', title: 'إفطار عند الوصول', detail: 'وجبة إفطار في مطعم محلي عند الوصول.' },
      {
        key: 'cruiseExcursions',
        title: 'مزارات وجولات كروز النيل (أسوان – الأقصر)',
        detail:
          'الجولات النيلية مشمولة وفق الملصق العربي الرسمي؛ ونظراً لعدم إرفاق صور المطبوعة العربية في هذه الجلسة، تُؤكد قائمة المعابد والمواقع الدقيقة مباشرة عبر الوكالة دون افتراض.',
        pendingSourceNote: true,
        highlightBadge: 'المواقع الدقيقة تُؤكد من الوكالة'
      },
      { key: 'luxorHurghadaTransfer', title: 'النقل الأقصر ← الغردقة', detail: 'نقل بري بالسيارة من الأقصر إلى الغردقة.' },
      { key: 'airportAssistance', title: 'مواصلات المطار ومساعدة', detail: 'توصيلات المطار مع مساعدة بالفرنسية أو العربية.' },
      { key: 'tips', title: 'الإكراميات (باستثناء المرشد)', detail: 'الإكراميات مشمولة عدا إكرامية المرشد السياحي.' },
      {
        key: 'domesticFlights',
        title: 'الطيران الداخلي مشمول (القاهرة–أسوان والغردقة–القاهرة)',
        detail: 'رحلتا الطيران الداخلي على المسار المعلن القاهرة–أسوان والغردقة–القاهرة مشمولتان في السعر.',
        highlightBadge: 'طيران داخلي مشمول'
      },
      { key: 'guide', title: 'مرشد سياحي محلي', detail: 'مرشد سياحي ناطق بالفرنسية أو العربية.' }
    ],
    exclusionsEyebrow: 'بنود خارج السعر',
    exclusionsTitle: 'السعر لا يشمل',
    exclusionsSubtitle: 'تأكد من التمييز التام بين الطيران الداخلي المشمول والطيران الدولي غير المشمول:',
    domesticVsIntlBannerTitle: 'توضيح جوهري حول تذاكر الطيران',
    domesticSideTitle: 'الطيران الداخلي مشمول',
    domesticSideDetail: 'القاهرة → أسوان والغردقة → القاهرة مشمولان ضمن البرنامج.',
    internationalSideTitle: 'الطيران الدولي غير مشمول',
    internationalSideDetail: 'تذاكر السفر الدولية ذهاباً وإياباً غير مشمولة نهائياً في سعر 1,690 USD.',
    exclusions: [
      {
        key: 'internationalFlights',
        title: 'تذاكر الطيران الدولية غير مشمولة',
        detail: 'الرحلات الدولية غير مشمولة في الباقة، ويمكن تسعيرها بشكل مستقل عبر مكتبنا بسلا.',
        highlightFlights: true
      },
      { key: 'beverages', title: 'المشروبات', detail: 'المشروبات غير مشمولة (وكذلك الكحوليات بالغردقة).' },
      { key: 'insidePyramids', title: 'تذاكر دخول الأهرامات من الداخل', detail: 'الدخول لداخل الأهرامات غير مشمول.' }
    ],
    conditionsEyebrow: 'الضوابط والتنبيهات الرسمية',
    conditionsTitle: 'الشروط والمعلومات الهامة',
    conditionsSubtitle: 'تخضع كافة الطلبات للتحقق المباشر وتأكيد التوافر والسعر النهائي من جولدن جروب.',
    conditions: [
      {
        id: 'min-20',
        title: 'الحد الأدنى للمجموعة',
        emphasis: '20 مسافراً على الأقل',
        detail: 'الأسعار المعلنة تسري على مجموعات لا تقل عن 20 شخصاً. أقل من 20 شخصاً يخضع لعرض سعر خاص عند التأكيد.'
      },
      {
        id: 'monuments',
        title: 'رسوم دخول المعالم',
        emphasis: 'قابل للتعديل عند الزيادة الرسمية',
        detail: 'تحتفظ الوكالة بحق تطبيق زيادة في حال ارتفاع أسعار تذاكر دخول المعالم الأثرية.'
      },
      {
        id: 'gala',
        title: 'حفلات العشاء الإلزامية',
        emphasis: '24 ديسمبر و 31 ديسمبر',
        detail: 'قد تُفرض وجبات عشاء غالا إلزامية ليلتي 24 و 31 دجنبر ويجب التحقق منها عند الحجز.'
      },
      {
        id: 'excluded-dates',
        title: 'الفترات الخاصة المستثناة',
        emphasis: 'السعر عند الطلب (14 دجنبر–2 يناير و 15 مارس–3 أبريل)',
        detail: 'الأسعار العادية تستثني الفترتين المذكورتين ويُطلب تسعيرهما مباشرة من الوكالة.'
      },
      {
        id: 'arrival-days',
        title: 'أيام الوصول والتأكيد',
        emphasis: 'السبت أو الإثنين · تأكيد نهائي من الوكالة',
        detail: 'الوصول خلال الفترة العادية يكون يوم السبت أو الإثنين، والتأكيد النهائي يتم فقط عبر جولدن جروب.'
      }
    ],
    formEyebrow: 'طلب حجز مباشر · مكتب سلا',
    formTitle: 'طلب حجز — حكاية مصر الكبرى',
    formSubtitle: 'لا يوجد دفع إلكتروني أو تأكيد آلي. أرسل طلبك عبر واتساب لتأكيد المقاعد والسعر النهائي.',
    departDateLabel: 'تاريخ المغادرة المفضل *',
    returnDateLabel: 'تاريخ العودة المفضل',
    hotelChoiceLabel: 'فندق القاهرة (5 ليالٍ)',
    occupancyLabel: 'نوع الغرفة',
    doubleOptionLabel: 'غرفة ثنائية (Double)',
    tripleOptionLabel: 'غرفة ثلاثية (Triple)',
    singleSupplementCheckLabel: 'إضافة خيار مكمل الغرفة الفردية',
    singleSupplementCheckHint: 'يُحسب كمكمل إضافي عند التأكيد الفعلي من الفندق.',
    travelersLabel: 'عدد المسافرين',
    groupMin20Ok: 'مؤهل لجدول سعر المجموعة (20+ شخصاً)',
    groupUnder20Notice: 'أقل من 20 مسافراً: لم يُنشر سعر ثابت لهذه الفئة — يُؤكد السعر مباشرة مع الوكالة.',
    dateMessages: {
      unset: 'حدد تاريخ المغادرة (5 ديسمبر 2026 – 26 أبريل 2027، وصول السبت أو الإثنين).',
      regular: 'التاريخ ضمن الفترة العادية المعلنة (5 ديسمبر 2026 – 26 أبريل 2027).',
      excluded_special:
        'فترة خاصة مستثناة (14 دجنبر 2026 – 2 يناير 2027 أو 15 مارس – 3 أبريل 2027): السعر عند الطلب فقط.',
      outside: 'تاريخ خارج الفترة المعلنة (5 ديسمبر 2026 – 26 أبريل 2027): السعر عند الطلب.',
      invalid_range: 'يجب أن يكون تاريخ العودة بعد المغادرة أو مطابقاً لها.'
    },
    arrivalDayOkNote: 'يوم المغادرة المختار يوافق السبت أو الإثنين وفق المواعيد المعلنة.',
    arrivalDayWarningNote: 'ملاحظة: الوصول في الفترة العادية محدد يوم السبت أو الإثنين؛ يُتحقق من الموعد عبر واتساب.',
    galaWarningNote: 'تشمل تواريخك 24 أو 31 ديسمبر: يرجى التأكد من متطلبات عشاء الغالا الإلزامي عند الحجز.',
    quoteBoxTitle: 'السعر المعلن (USD)',
    baseFareLine: 'السعر الأساسي للشخص (20+)',
    singleSuppLine: 'مكمل الغرفة الفردية',
    onRequestLine: 'السعر عند الطلب (يتطلب تأكيد الوكالة)',
    under20UnpricedLine: 'أقل من 20 مسافراً: السعر حسب تأكيد الوكالة',
    nameLabel: 'الاسم الكامل *',
    namePlaceholder: 'الاسم والنسب',
    phoneLabel: 'الهاتف / واتساب *',
    phonePlaceholder: 'مثال: +212 6XX-XXXXXX',
    notesLabel: 'ملاحظات إضافية (اختياري)',
    notesPlaceholder: 'مدينة المغادرة لطلب عرض الطيران الدولي المنفصل...',
    submitBtn: 'تجهيز طلب الواتساب',
    whatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    readyTitle: 'ملخص الطلب جاهز للإرسال إلى جولدن جروب',
    editBtn: 'تعديل',
    noAutoConfirmNote: 'لا يتم تأكيد أي حجز تلقائياً؛ التوافر والسعر النهائي عبر مكتبنا بسلا.',
    advisorLabel: 'مكتب جولدن جروب · سلا',
    advisorTitle: 'تحتاج تذاكر الطيران الدولية؟',
    callAgencyBtn: 'الاتصال بالوكالة',
    errors: {
      departRequired: 'يرجى تحديد تاريخ المغادرة.',
      returnInvalid: 'لا يمكن أن يسبق تاريخ العودة تاريخ المغادرة.',
      contactRequired: 'يرجى إدخال الاسم الكامل ورقم الهاتف / واتساب.'
    }
  },
  en: {
    cardShortTitle: "L'Épopée Égyptienne",
    frenchFullTitle: "L'Épopée Égyptienne : 12 Jours Inoubliables",
    arabicTitle: 'حكاية مصر الكبرى',
    destinationLine: 'Egypt',
    routeStopsLine: 'Cairo • Nile Cruise • Hurghada',
    durationLabel: '12 days / 11 nights',
    startingFromLabel: 'Starting from',
    startingPriceDisplay: '1,690 USD',
    startingBasisNote: 'Triumph Plaza (or similar) · Triple Room · Regular Season',
    cardSummary:
      'Complete 12-day / 11-night Egypt itinerary pairing 5 nights in Cairo (B&B), a 3-night Aswan–Luxor Nile cruise (full board, Paradise or similar), and 3 nights at Swiss Inn Hurghada (all-inclusive non-alcoholic), with domestic flights included.',
    cardFlightDistinction: 'Domestic flights included · International flights NOT included',
    discoverBtn: 'Discover Tour',
    reserveBtn: 'Request Reservation',
    backToTours: 'Back to Tours & Activities',
    backToHome: 'Back to Home',
    heroEyebrow: 'Grand Official Tour · Golden Group Travels',
    heroLead:
      'Three connected Egyptian stages — Cairo, an Aswan–Luxor Nile cruise, and the Red Sea coast in Hurghada — with domestic flights Cairo–Aswan and Hurghada–Cairo included.',
    heroFlightIncludedShort: 'Domestic flights included (Cairo–Aswan & Hurghada–Cairo)',
    heroFlightExcludedShort: 'International flights NOT included',
    overviewEyebrow: 'Three Connected Stages of the Journey',
    overviewTitle: 'Cairo • Nile Cruise • Hurghada',
    overviewSubtitle:
      '11 nights / 12 days structured strictly according to Golden Group Travels’ official announcement—zero invented daily schedules or extra destinations.',
    stages: [
      {
        id: 'cairo',
        stepNumber: '01',
        nightsBadge: '5 nights · Bed & Breakfast (B&B)',
        destinationTitle: 'Cairo',
        hotelOrShip: 'Choice of 4 Cairo hotel categories (or similar)',
        boardBasis: 'Bed & Breakfast (B&B)',
        summary:
          'Full-day tour of the Pyramids & Grand Egyptian Museum, full-day Historic Cairo tour (Khan El Khalili, Al-Muizz Street, Al-Azhar, Al-Hussein & Amr Ibn Al-As Mosques), dinner cruise, and arrival breakfast.',
        image: GRAND_EGYPT_TOUR_IMAGES.cairo
      },
      {
        id: 'nile-cruise',
        stepNumber: '02',
        nightsBadge: '3 nights · Full Board',
        destinationTitle: 'Nile Cruise (Aswan – Luxor)',
        hotelOrShip: 'Aboard Paradise or similar',
        boardBasis: 'Full Board',
        summary:
          'Domestic Cairo–Aswan flight, 3 nights sailing between Aswan and Luxor on full board aboard Paradise or similar, plus ground vehicle transfer from Luxor to Hurghada.',
        image: GRAND_EGYPT_TOUR_IMAGES.cruise
      },
      {
        id: 'hurghada',
        stepNumber: '03',
        nightsBadge: '3 nights · All-Inclusive (no alcohol)',
        destinationTitle: 'Hurghada · Red Sea',
        hotelOrShip: 'Swiss Inn Hurghada or similar',
        boardBasis: 'All-Inclusive excluding alcoholic beverages',
        summary:
          '3 nights beachfront stay at Swiss Inn Hurghada or similar on a non-alcoholic all-inclusive basis, followed by the return domestic flight Hurghada–Cairo.',
        image: GRAND_EGYPT_TOUR_IMAGES.hurghada
      }
    ],
    breakdownEyebrow: 'Official Nights Breakdown',
    breakdownTitle: 'Duration & Accommodation Standards',
    breakdownTotalBadge: 'Total: 11 nights / 12 days',
    breakdownSummaryNote:
      'Only your 5 Cairo nights change across the 4 hotel categories below; the Nile cruise (Paradise or similar) and Hurghada stay (Swiss Inn Hurghada or similar) apply to every option.',
    pricingEyebrow: 'Official USD Pricing Matrix',
    pricingTitle: 'Cairo Hotel Options & Regular Season Rates',
    pricingSubtitle:
      'Per-person USD rates for groups of at least 20 travelers during the regular season. The 1,690 USD headline rate applies solely to Triumph Plaza (or similar) in triple occupancy.',
    regularPeriodLabel: 'Advertised regular period',
    regularPeriodValue: 'December 5, 2026 – April 26, 2027',
    arrivalDaysLabel: 'Arrival days',
    arrivalDaysValue: 'Saturday or Monday arrival',
    excludedPeriodsLabel: 'Special periods excluded from regular pricing',
    excludedPeriodsValue: 'Dec 14, 2026 – Jan 2, 2027 & Mar 15 – Apr 3, 2027',
    excludedPeriodsActionValue: 'Tarif sur demande — Direct Golden Group confirmation required',
    usdDisclaimer: 'Official rates are strictly in USD (never converted to MAD). International flights excluded.',
    hotelCol: 'Cairo hotel or similar',
    doubleCol: 'Double Room',
    tripleCol: 'Triple Room',
    singleSuppCol: 'Single Supplement',
    singleSuppDisclaimer:
      'Note: Single-room amounts are SUPPLEMENTS added to a package rate—never standalone total tour prices.',
    selectBtn: 'Select',
    selectedBtn: 'Selected',
    onRequestBadge: 'Tarif sur demande',
    inclusionsEyebrow: 'Advertised Package Inclusions',
    inclusionsTitle: 'The price includes',
    inclusionsSubtitle: 'All official services covered in "L\'Épopée Égyptienne : 12 Jours Inoubliables":',
    inclusions: [
      { key: 'visa', title: 'Entry Visa', detail: 'Egypt entry visa included.' },
      { key: 'cairoStay', title: '5 Nights in Cairo (B&B)', detail: '5 nights at your selected Cairo hotel with bed & breakfast.' },
      {
        key: 'nileCruise',
        title: '3 Nights Nile Cruise (Full Board)',
        detail: '3 nights Aswan–Luxor Nile cruise, full board, aboard Paradise or similar.'
      },
      {
        key: 'hurghadaStay',
        title: '3 Nights in Hurghada (All-Inclusive excl. alcohol)',
        detail: '3 nights at Swiss Inn Hurghada or similar, all-inclusive excluding alcoholic beverages.'
      },
      {
        key: 'pyramidsGem',
        title: 'Pyramids & Grand Egyptian Museum',
        detail: 'Full-day guided visit to the Pyramids and Grand Egyptian Museum.'
      },
      {
        key: 'islamicCairo',
        title: 'Full-Day Historic Cairo',
        detail: 'Khan El Khalili, Al-Muizz Street, Al-Azhar Mosque, Al-Hussein Mosque & Amr Ibn Al-As Mosque.'
      },
      { key: 'dinnerCruise', title: 'Dinner Cruise', detail: 'Dinner cruise evening included.' },
      { key: 'arrivalBreakfast', title: 'Arrival Breakfast', detail: 'Breakfast at a local restaurant upon arrival.' },
      {
        key: 'cruiseExcursions',
        title: 'Nile Cruise Excursions (Aswan – Luxor)',
        detail:
          'Included per the official Arabic advertisement. Because the 7 source screenshots were not attached in this session, exact cruise excursion sites remain pending confirmation with Golden Group Travels without guessing.',
        pendingSourceNote: true,
        highlightBadge: 'Exact sites pending Arabic flyer confirmation'
      },
      {
        key: 'luxorHurghadaTransfer',
        title: 'Luxor → Hurghada Vehicle Transfer',
        detail: 'Ground transfer by vehicle from Luxor to Hurghada.'
      },
      {
        key: 'airportAssistance',
        title: 'Airport Transfers with FR / AR Assistance',
        detail: 'Airport transfers assisted by French- or Arabic-speaking representatives.'
      },
      { key: 'tips', title: 'Tips (excluding guides)', detail: 'Service tips included, excluding tour guides.' },
      {
        key: 'domesticFlights',
        title: 'Domestic Flights Included (Cairo–Aswan & Hurghada–Cairo)',
        detail: 'Internal flights on the advertised Cairo–Aswan and Hurghada–Cairo legs are included.',
        highlightBadge: 'Domestic flights included'
      },
      { key: 'guide', title: 'Local FR / AR Guide', detail: 'French- or Arabic-speaking local tourist guide.' }
    ],
    exclusionsEyebrow: 'Excluded Services',
    exclusionsTitle: 'Not included in the price',
    exclusionsSubtitle:
      'Domestic flights are included in this tour, whereas international flights are strictly NOT included:',
    domesticVsIntlBannerTitle: 'Critical Flight Scope Distinction',
    domesticSideTitle: 'Domestic Flights INCLUDED',
    domesticSideDetail: 'Cairo → Aswan and Hurghada → Cairo domestic sectors are built into the tour.',
    internationalSideTitle: 'International Flights EXCLUDED',
    internationalSideDetail:
      'International return airfare is NOT part of the 1,690 USD package price (quoted separately on request).',
    exclusions: [
      {
        key: 'internationalFlights',
        title: 'International Flights NOT Included',
        detail: 'Round-trip international air tickets to/from Egypt are excluded.',
        highlightFlights: true
      },
      { key: 'beverages', title: 'Beverages', detail: 'Drinks and alcoholic beverages are excluded.' },
      { key: 'insidePyramids', title: 'Interior Pyramid Tickets', detail: 'Entry tickets to go inside any pyramid are excluded.' }
    ],
    conditionsEyebrow: 'Official Booking Terms',
    conditionsTitle: 'Conditions et informations importantes',
    conditionsSubtitle:
      'Published rules. All bookings require final availability and quotation confirmation from Golden Group Travels.',
    conditions: [
      {
        id: 'min-20',
        title: 'Minimum Group Size',
        emphasis: 'Minimum 20 travelers',
        detail: 'Advertised USD rates apply to groups of at least 20 participants. Smaller groups are quoted separately on request.'
      },
      {
        id: 'monuments',
        title: 'Monument Entrance Fees',
        emphasis: 'Subject to official price increases',
        detail: 'The agency reserves the right to apply a supplement if monument entrance ticket prices increase.'
      },
      {
        id: 'gala',
        title: 'Mandatory Gala Dinners',
        emphasis: 'December 24 & December 31',
        detail: 'Mandatory gala dinners may sometimes be required on Dec 24 & Dec 31 and must be verified at booking.'
      },
      {
        id: 'excluded-dates',
        title: 'Excluded Special Windows',
        emphasis: 'Tarif sur demande (Dec 14–Jan 2 & Mar 15–Apr 3)',
        detail: 'Regular rates exclude these two special windows; request direct confirmation from Golden Group Travels.'
      },
      {
        id: 'arrival-days',
        title: 'Arrival Schedule & Confirmation',
        emphasis: 'Saturday or Monday · Direct Agency Confirmation',
        detail: 'Regular departures (Dec 5, 2026 – Apr 26, 2027) arrive Saturday or Monday. Final price & spaces confirmed by Golden.'
      }
    ],
    formEyebrow: 'Direct Agency Request · Salé Desk',
    formTitle: "Request Reservation — L'Épopée Égyptienne",
    formSubtitle:
      'Bookings are never auto-confirmed online. Send your departure date, hotel tier, and occupancy to check live availability via WhatsApp.',
    departDateLabel: 'Preferred Departure Date *',
    returnDateLabel: 'Preferred Return Date',
    hotelChoiceLabel: 'Preferred Cairo Hotel (5 nights)',
    occupancyLabel: 'Room Occupancy',
    doubleOptionLabel: 'Double Room',
    tripleOptionLabel: 'Triple Room',
    singleSupplementCheckLabel: 'Add Single Supplement request',
    singleSupplementCheckHint: 'Added separately as a single-room supplement subject to availability.',
    travelersLabel: 'Number of Travelers',
    groupMin20Ok: 'Qualifies for published 20+ group base rates',
    groupUnder20Notice:
      'Under 20 travelers: no sub-20 group rate is published — request direct custom quotation from Golden Group Travels.',
    dateMessages: {
      unset: 'Select a departure date (Dec 5, 2026 – Apr 26, 2027, Saturday or Monday arrival).',
      regular: 'Dates fall within the published Regular Period (Dec 5, 2026 – Apr 26, 2027).',
      excluded_special:
        'Excluded Special Period (Dec 14, 2026 – Jan 2, 2027 or Mar 15 – Apr 3, 2027): Tarif sur demande — direct confirmation required.',
      outside: 'Dates outside Dec 5, 2026 – Apr 26, 2027: Tarif sur demande from Golden Group Travels.',
      invalid_range: 'Return date must be on or after departure date.'
    },
    arrivalDayOkNote: 'Departure date matches an advertised Saturday or Monday arrival window.',
    arrivalDayWarningNote:
      'Advisory: regular season arrivals operate on Saturday or Monday; our desk will verify options on WhatsApp.',
    galaWarningNote:
      'Dates cover Dec 24 and/or Dec 31: verify mandatory hotel gala dinner rules directly at booking.',
    quoteBoxTitle: 'Published Base Rate (USD)',
    baseFareLine: 'Published base fare / person (20+ pax)',
    singleSuppLine: 'Single supplement',
    onRequestLine: 'Tarif sur demande (Golden Group confirmation required)',
    under20UnpricedLine: 'Under 20 travelers: custom quote upon confirmation',
    nameLabel: 'Full Name *',
    namePlaceholder: 'Your full name',
    phoneLabel: 'Phone / WhatsApp *',
    phonePlaceholder: 'e.g., +212 6XX-XXXXXX',
    notesLabel: 'Notes (optional — e.g., international flight quote request)',
    notesPlaceholder: 'Departure city if requesting international airfare separately...',
    submitBtn: 'Prepare WhatsApp Inquiry',
    whatsappBtn: 'Send via WhatsApp (0666-484815)',
    readyTitle: 'Inquiry Summary Ready for Golden Group Travels',
    editBtn: 'Edit',
    noAutoConfirmNote: 'No card charge or auto-confirmation online. Final space & pricing confirmed by our Salé desk.',
    advisorLabel: 'Golden Group Desk · Salé',
    advisorTitle: 'Need international flights separately?',
    callAgencyBtn: 'Call Agency',
    errors: {
      departRequired: 'Please select a preferred departure date.',
      returnInvalid: 'Return date cannot precede departure date.',
      contactRequired: 'Please enter your full name and phone/WhatsApp number.'
    }
  },
  es: {
    cardShortTitle: "L'Épopée Égyptienne",
    frenchFullTitle: "L'Épopée Égyptienne : 12 Jours Inoubliables",
    arabicTitle: 'حكاية مصر الكبرى',
    destinationLine: 'Egipto',
    routeStopsLine: 'El Cairo • Crucero por el Nilo • Hurghada',
    durationLabel: '12 días / 11 noches',
    startingFromLabel: 'Desde',
    startingPriceDisplay: '1 690 USD',
    startingBasisNote: 'Triumph Plaza (o similar) · Habitación Triple · Temporada estándar',
    cardSummary:
      'Gran circuito de 12 días / 11 noches: 5 noches en El Cairo (B&B), 3 noches de crucero Asuán–Lúxor en pensión completa y 3 noches en Hurghada todo incluido sin alcohol, con vuelos internos incluidos.',
    cardFlightDistinction: 'Vuelos internos incluidos · Vuelos internacionales NO incluidos',
    discoverBtn: 'Descubrir el circuito',
    reserveBtn: 'Solicitar reserva',
    backToTours: 'Volver a circuitos y actividades',
    backToHome: 'Volver al inicio',
    heroEyebrow: 'Gran Circuito Oficial · Golden Group Travels',
    heroLead:
      'Tres etapas conectadas — El Cairo, crucero por el Nilo entre Asuán y Lúxor, y Hurghada en el Mar Rojo — con vuelos internos El Cairo–Asuán y Hurghada–El Cairo incluidos.',
    heroFlightIncludedShort: 'Vuelos internos incluidos (El Cairo–Asuán y Hurghada–El Cairo)',
    heroFlightExcludedShort: 'Vuelos internacionales NO incluidos',
    overviewEyebrow: 'Tres Etapas Conectadas del Viaje',
    overviewTitle: 'El Cairo • Crucero por el Nilo • Hurghada',
    overviewSubtitle:
      '11 noches / 12 días presentados exactamente según el programa oficial de Golden Group Travels.',
    stages: [
      {
        id: 'cairo',
        stepNumber: '01',
        nightsBadge: '5 noches · Alojamiento y desayuno (B&B)',
        destinationTitle: 'El Cairo',
        hotelOrShip: '4 categorías de hotel a elegir (o similar)',
        boardBasis: 'Bed & Breakfast (B&B)',
        summary:
          'Día completo en las Pirámides y Gran Museo Egipcio, día completo en El Cairo histórico (Khan El Khalili, Al-Muizz, Al-Azhar, Al-Hussein y Amr Ibn Al-As), cena-crucero y desayuno de llegada.',
        image: GRAND_EGYPT_TOUR_IMAGES.cairo
      },
      {
        id: 'nile-cruise',
        stepNumber: '02',
        nightsBadge: '3 noches · Pensión completa',
        destinationTitle: 'Crucero por el Nilo (Asuán – Lúxor)',
        hotelOrShip: 'A bordo del Paradise o similar',
        boardBasis: 'Pensión completa (Full Board)',
        summary:
          'Vuelo doméstico El Cairo–Asuán, 3 noches navegando entre Asuán y Lúxor en pensión completa y traslado terrestre Lúxor–Hurghada incluido.',
        image: GRAND_EGYPT_TOUR_IMAGES.cruise
      },
      {
        id: 'hurghada',
        stepNumber: '03',
        nightsBadge: '3 noches · Todo incluido sin alcohol',
        destinationTitle: 'Hurghada · Mar Rojo',
        hotelOrShip: 'Swiss Inn Hurghada o similar',
        boardBasis: 'Todo incluido sin bebidas alcohólicas',
        summary:
          '3 noches en Swiss Inn Hurghada o similar en régimen todo incluido sin bebidas alcohólicas, más vuelo interno de regreso Hurghada–El Cairo.',
        image: GRAND_EGYPT_TOUR_IMAGES.hurghada
      }
    ],
    breakdownEyebrow: 'Distribución Oficial de Noches',
    breakdownTitle: 'Duración y Alojamientos',
    breakdownTotalBadge: 'Total: 11 noches / 12 días',
    breakdownSummaryNote:
      'Las 5 noches en El Cairo dependen de la categoría seleccionada; el crucero (Paradise o similar) y Hurghada (Swiss Inn Hurghada o similar) son comunes.',
    pricingEyebrow: 'Tarifas Oficiales en USD',
    pricingTitle: 'Hoteles en El Cairo y Tarifas Temporada Estándar',
    pricingSubtitle:
      'Tarifas por persona en USD para mínimo 20 viajeros en temporada estándar. El precio inicial de 1 690 USD corresponde únicamente a Triumph Plaza en triple.',
    regularPeriodLabel: 'Período estándar anunciado',
    regularPeriodValue: '5 diciembre 2026 – 26 abril 2027',
    arrivalDaysLabel: 'Días de llegada',
    arrivalDaysValue: 'Llegada en sábado o lunes',
    excludedPeriodsLabel: 'Períodos especiales excluidos',
    excludedPeriodsValue: '14 dic. 2026 – 2 ene. 2027 y 15 mar. – 3 abr. 2027',
    excludedPeriodsActionValue: 'Tarif sur demande — Confirmación directa con Golden',
    usdDisclaimer: 'Tarifas publicadas exclusivamente en USD. Vuelos internacionales no incluidos.',
    hotelCol: 'Hotel en El Cairo o similar',
    doubleCol: 'Habitación Doble',
    tripleCol: 'Habitación Triple',
    singleSuppCol: 'Suplemento individual',
    singleSuppDisclaimer:
      'Nota: las cifras de «Suplemento individual» son suplementos adicionales y no el precio total de una habitación individual.',
    selectBtn: 'Elegir',
    selectedBtn: 'Seleccionado',
    onRequestBadge: 'Tarif sur demande',
    inclusionsEyebrow: 'Servicios Oficiales',
    inclusionsTitle: 'El precio incluye',
    inclusionsSubtitle: 'Prestaciones oficiales incluidas en «L\'Épopée Égyptienne : 12 Jours Inoubliables»:',
    inclusions: [
      { key: 'visa', title: 'Visado de entrada', detail: 'Visado de entrada a Egipto incluido.' },
      { key: 'cairoStay', title: '5 noches en El Cairo (B&B)', detail: '5 noches en el hotel seleccionado con desayuno.' },
      {
        key: 'nileCruise',
        title: '3 noches Crucero Nilo (PC)',
        detail: 'Pensión completa entre Asuán y Lúxor en Paradise o similar.'
      },
      {
        key: 'hurghadaStay',
        title: '3 noches en Hurghada (Todo incluido sin alcohol)',
        detail: 'Swiss Inn Hurghada o similar en régimen todo incluido sin bebidas alcohólicas.'
      },
      { key: 'pyramidsGem', title: 'Pirámides y Gran Museo Egipcio', detail: 'Visita de día completo.' },
      {
        key: 'islamicCairo',
        title: 'Día completo El Cairo Histórico',
        detail: 'Khan El Khalili, Al-Muizz, Al-Azhar, Al-Hussein y Amr Ibn Al-As.'
      },
      { key: 'dinnerCruise', title: 'Cena-crucero', detail: 'Cena-crucero incluida.' },
      { key: 'arrivalBreakfast', title: 'Desayuno de llegada', detail: 'En restaurante local al llegar.' },
      {
        key: 'cruiseExcursions',
        title: 'Excursiones del crucero por el Nilo (Asuán – Lúxor)',
        detail:
          'Incluidas según la publicidad oficial en árabe; al no haberse adjuntado los archivos originales, los sitios exactos se confirman directamente con Golden Group Travels.',
        pendingSourceNote: true,
        highlightBadge: 'Sitios exactos por confirmar'
      },
      { key: 'luxorHurghadaTransfer', title: 'Traslado Lúxor → Hurghada', detail: 'En vehículo privado o turístico.' },
      { key: 'airportAssistance', title: 'Traslados aeropuerto FR / AR', detail: 'Con asistencia en francés o árabe.' },
      { key: 'tips', title: 'Propinas (excepto guías)', detail: 'Propinas incluidas salvo guías.' },
      {
        key: 'domesticFlights',
        title: 'Vuelos internos incluidos (El Cairo–Asuán y Hurghada–El Cairo)',
        detail: 'Incluidos en el itinerario publicado.',
        highlightBadge: 'Vuelos domésticos incluidos'
      },
      { key: 'guide', title: 'Guía local FR / AR', detail: 'Guía local francófono o arabófono.' }
    ],
    exclusionsEyebrow: 'No Incluido',
    exclusionsTitle: 'El precio no incluye',
    exclusionsSubtitle: 'Vuelos domésticos incluidos frente a vuelos internacionales NO incluidos:',
    domesticVsIntlBannerTitle: 'Distinción clave de vuelos',
    domesticSideTitle: 'Vuelos internos INCLUIDOS',
    domesticSideDetail: 'El Cairo → Asuán y Hurghada → El Cairo incluidos en el circuito.',
    internationalSideTitle: 'Vuelos internacionales NO INCLUIDOS',
    internationalSideDetail: 'Los vuelos internacionales de ida y vuelta no están incluidos en los 1 690 USD.',
    exclusions: [
      {
        key: 'internationalFlights',
        title: 'Vuelos internacionales NO incluidos',
        detail: 'Billetes internacionales excluidos; cotizables aparte con nuestra agencia.',
        highlightFlights: true
      },
      { key: 'beverages', title: 'Bebidas', detail: 'Bebidas y bebidas alcohólicas no incluidas.' },
      { key: 'insidePyramids', title: 'Entrada interior pirámides', detail: 'Acceso interior a cualquier pirámide no incluido.' }
    ],
    conditionsEyebrow: 'Normas y Condiciones',
    conditionsTitle: 'Conditions et informations importantes',
    conditionsSubtitle: 'Disponibilidad y precio total confirmados directamente por Golden Group Travels.',
    conditions: [
      {
        id: 'min-20',
        title: 'Grupo mínimo',
        emphasis: 'Mínimo 20 viajeros',
        detail: 'Las tarifas aplican a grupos mínimos de 20 personas. Grupos menores bajo presupuesto directo.'
      },
      {
        id: 'monuments',
        title: 'Entradas a monumentos',
        emphasis: 'Posible suplemento por subida oficial',
        detail: 'La agencia puede aplicar un suplemento si aumentan las tarifas oficiales de monumentos.'
      },
      {
        id: 'gala',
        title: 'Cenas de gala obligatorias',
        emphasis: '24 de diciembre y 31 de diciembre',
        detail: 'Pueden requerirse cenas de gala obligatorias los días 24 y 31 de diciembre (verificar al reservar).'
      },
      {
        id: 'excluded-dates',
        title: 'Períodos especiales excluidos',
        emphasis: 'Tarif sur demande (14 dic.–2 ene. y 15 mar.–3 abr.)',
        detail: 'Las tarifas regulares excluyen esas fechas especiales; solicita cotización a Golden.'
      },
      {
        id: 'arrival-days',
        title: 'Llegadas y confirmación',
        emphasis: 'Sábado o lunes · Confirmación directa',
        detail: 'Temporada regular (5 dic. 2026 – 26 abr. 2027) con llegada sábado o lunes.'
      }
    ],
    formEyebrow: 'Consulta Directa · Oficina Salé',
    formTitle: "Solicitar reserva — L'Épopée Égyptienne",
    formSubtitle: 'Sin pagos ni confirmaciones automáticas online. Prepara tu mensaje WhatsApp para confirmar.',
    departDateLabel: 'Fecha de salida preferida *',
    returnDateLabel: 'Fecha de regreso preferida',
    hotelChoiceLabel: 'Hotel en El Cairo (5 noches)',
    occupancyLabel: 'Ocupación',
    doubleOptionLabel: 'Habitación Doble',
    tripleOptionLabel: 'Habitación Triple',
    singleSupplementCheckLabel: 'Añadir solicitud de suplemento individual',
    singleSupplementCheckHint: 'Suplemento adicional sujeto a confirmación.',
    travelersLabel: 'Número de viajeros',
    groupMin20Ok: 'Aplica tarifa publicada para grupo de 20+',
    groupUnder20Notice: 'Menos de 20 viajeros: tarifa no publicada en tabla — cotización bajo confirmación.',
    dateMessages: {
      unset: 'Elige fecha de salida (5 dic. 2026 – 26 abr. 2027, llegada sábado o lunes).',
      regular: 'Fechas dentro de la temporada estándar (5 dic. 2026 – 26 abr. 2027).',
      excluded_special:
        'Período especial excluido (14 dic. 2026 – 2 ene. 2027 o 15 mar.–3 abr. 2027): Tarif sur demande.',
      outside: 'Fechas fuera del calendario publicado: Tarif sur demande.',
      invalid_range: 'La fecha de regreso debe ser posterior o igual a la salida.'
    },
    arrivalDayOkNote: 'Tu salida coincide con llegada en sábado o lunes.',
    arrivalDayWarningNote: 'Aviso: las salidas estándar operan con llegada en sábado o lunes.',
    galaWarningNote: 'Incluye el 24 o 31 de diciembre: verifica si aplica cena de gala obligatoria.',
    quoteBoxTitle: 'Tarifa base publicada (USD)',
    baseFareLine: 'Tarifa base / persona (20+ pers.)',
    singleSuppLine: 'Suplemento individual',
    onRequestLine: 'Tarif sur demande (requiere confirmación)',
    under20UnpricedLine: 'Menos de 20 pers.: cotización a medida',
    nameLabel: 'Nombre completo *',
    namePlaceholder: 'Tu nombre y apellidos',
    phoneLabel: 'Teléfono / WhatsApp *',
    phonePlaceholder: 'Ej: +212 6XX-XXXXXX',
    notesLabel: 'Notas (opcional)',
    notesPlaceholder: 'Ciudad de salida para cotizar vuelos internacionales aparte...',
    submitBtn: 'Preparar consulta WhatsApp',
    whatsappBtn: 'Enviar por WhatsApp (0666-484815)',
    readyTitle: 'Resumen listo para Golden Group Travels',
    editBtn: 'Editar',
    noAutoConfirmNote: 'Confirmación real con nuestra agencia en Salé sin pagos online.',
    advisorLabel: 'Oficina Golden Group · Salé',
    advisorTitle: '¿Necesitas vuelos internacionales aparte?',
    callAgencyBtn: 'Llamar a la agencia',
    errors: {
      departRequired: 'Selecciona una fecha de salida.',
      returnInvalid: 'La fecha de regreso no puede ser anterior a la salida.',
      contactRequired: 'Introduce tu nombre completo y teléfono / WhatsApp.'
    }
  }
};
