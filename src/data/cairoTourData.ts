import cairoPyramidsHeroImg from '../assets/images/cairo_pyramids_hero_1795449231042.jpg';
import cairoKhanAlMuizzImg from '../assets/images/cairo_khan_almuizz_1795449251028.jpg';
import { Language } from '../assets/destinations';

export const CAIRO_TOUR_IMAGES = {
  hero: cairoPyramidsHeroImg,
  heritage: cairoKhanAlMuizzImg,
  fallbackGradient: 'linear-gradient(135deg, #071429 0%, #1c3557 52%, #d1a847 100%)'
} as const;

export const CAIRO_TOUR_ROUTE = '/circuits-activites/le-pouls-charmant-du-caire';
export const CAIRO_TOUR_TOURS_ROUTE = '/circuits-activites';

export type CairoPricingPeriodId = 'regular' | 'special';
export type CairoHotelId = 'pyramisa' | 'triumph' | 'steigenberger';
export type CairoOccupancyId = 'triple' | 'double';

export type CairoDateClassification =
  | 'unset'
  | 'regular'
  | 'special'
  | 'mixed_special'
  | 'outside';

export interface CairoDateEvaluation {
  classification: CairoDateClassification;
  pricingPeriodToApply: CairoPricingPeriodId | null;
  requiresGalaCheck: boolean;
  isRangeInvalid: boolean;
}

export interface CairoHotelRateRow {
  id: CairoHotelId;
  name: Record<Language, string>;
  categoryLabel: Record<Language, string>;
  regular: {
    double: number;
    triple: number;
    singleSupplement: number;
  };
  special: {
    double: number;
    triple: number;
    singleSupplement: number;
  };
}

export const CAIRO_TOUR_PRICING = {
  currency: 'USD' as const,
  startingPriceUsd: 665,
  regularWindowStart: '2026-12-01',
  regularWindowEnd: '2027-04-30',
  specialWindows: [
    { id: 'year-end', start: '2026-12-17', end: '2027-01-04' },
    { id: 'spring', start: '2027-03-15', end: '2027-04-03' }
  ] as const,
  minGroupPaxForBaseRates: 20,
  smallGroupMinPax: 2,
  smallGroupMaxPax: 19,
  smallGroupSupplementUsd: 200
} as const;

export const CAIRO_HOTELS: readonly CairoHotelRateRow[] = [
  {
    id: 'pyramisa',
    name: {
      fr: 'Pyramisa Cairo ou similaire',
      ar: 'بيراميزا القاهرة (Pyramisa Cairo) أو ما يماثله',
      en: 'Pyramisa Cairo or similar',
      es: 'Pyramisa Cairo o similar'
    },
    categoryLabel: {
      fr: 'Catégorie Confort',
      ar: 'الفئة الأولى',
      en: 'Comfort Tier',
      es: 'Categoría Confort'
    },
    regular: {
      double: 670,
      triple: 665,
      singleSupplement: 500
    },
    special: {
      double: 800,
      triple: 795,
      singleSupplement: 610
    }
  },
  {
    id: 'triumph',
    name: {
      fr: 'Triumph Luxury ou similaire',
      ar: 'تريومف لاكجري (Triumph Luxury) أو ما يماثله',
      en: 'Triumph Luxury or similar',
      es: 'Triumph Luxury o similar'
    },
    categoryLabel: {
      fr: 'Catégorie Supérieure',
      ar: 'الفئة الممتازة',
      en: 'Superior Tier',
      es: 'Categoría Superior'
    },
    regular: {
      double: 755,
      triple: 750,
      singleSupplement: 575
    },
    special: {
      double: 840,
      triple: 835,
      singleSupplement: 645
    }
  },
  {
    id: 'steigenberger',
    name: {
      fr: 'Steigenberger Tahrir ou similaire',
      ar: 'شتايجنبرجر التحرير (Steigenberger Tahrir) أو ما يماثله',
      en: 'Steigenberger Tahrir or similar',
      es: 'Steigenberger Tahrir o similar'
    },
    categoryLabel: {
      fr: 'Catégorie Prestige',
      ar: 'فئة البريستيج',
      en: 'Prestige Tier',
      es: 'Categoría Prestige'
    },
    regular: {
      double: 890,
      triple: 885,
      singleSupplement: 690
    },
    special: {
      double: 975,
      triple: 970,
      singleSupplement: 760
    }
  }
] as const;

function dateOverlapsWindow(
  startIso: string,
  endIso: string,
  windowStart: string,
  windowEnd: string
): boolean {
  return startIso <= windowEnd && endIso >= windowStart;
}

function dateRangeIncludesMonthDay(
  startIso: string,
  endIso: string,
  targetMonthDay: string
): boolean {
  const candidate = `2026-${targetMonthDay}`;
  return startIso <= candidate && endIso >= candidate;
}

/**
 * Classifies preferred Cairo tour dates strictly against the agency's published windows:
 * - Regular: 2026-12-01 .. 2027-04-30 (excluding special windows)
 * - Special: 2026-12-17 .. 2027-01-04 OR 2027-03-15 .. 2027-04-03
 * - Outside: anything outside 2026-12-01 .. 2027-04-30 (no estimated fare computed)
 */
export function evaluateCairoTravelDates(
  departIso: string,
  returnIso?: string
): CairoDateEvaluation {
  if (!departIso) {
    return {
      classification: 'unset',
      pricingPeriodToApply: null,
      requiresGalaCheck: false,
      isRangeInvalid: false
    };
  }

  const effectiveEnd = returnIso && returnIso.trim() ? returnIso : departIso;
  if (effectiveEnd < departIso) {
    return {
      classification: 'unset',
      pricingPeriodToApply: null,
      requiresGalaCheck: false,
      isRangeInvalid: true
    };
  }

  const withinOverallSeason =
    departIso >= CAIRO_TOUR_PRICING.regularWindowStart &&
    effectiveEnd <= CAIRO_TOUR_PRICING.regularWindowEnd;

  if (!withinOverallSeason) {
    return {
      classification: 'outside',
      pricingPeriodToApply: null,
      requiresGalaCheck:
        dateRangeIncludesMonthDay(departIso, effectiveEnd, '12-24') ||
        dateRangeIncludesMonthDay(departIso, effectiveEnd, '12-31'),
      isRangeInvalid: false
    };
  }

  const overlapsSpecial = CAIRO_TOUR_PRICING.specialWindows.some((win) =>
    dateOverlapsWindow(departIso, effectiveEnd, win.start, win.end)
  );

  const completelyInsideOneSpecial = CAIRO_TOUR_PRICING.specialWindows.some(
    (win) => departIso >= win.start && effectiveEnd <= win.end
  );

  const requiresGalaCheck =
    dateRangeIncludesMonthDay(departIso, effectiveEnd, '12-24') ||
    dateRangeIncludesMonthDay(departIso, effectiveEnd, '12-31');

  if (completelyInsideOneSpecial) {
    return {
      classification: 'special',
      pricingPeriodToApply: 'special',
      requiresGalaCheck,
      isRangeInvalid: false
    };
  }

  if (overlapsSpecial) {
    return {
      classification: 'mixed_special',
      pricingPeriodToApply: 'special',
      requiresGalaCheck,
      isRangeInvalid: false
    };
  }

  return {
    classification: 'regular',
    pricingPeriodToApply: 'regular',
    requiresGalaCheck,
    isRangeInvalid: false
  };
}

export interface CairoInclusionItem {
  key:
    | 'visa'
    | 'hotel'
    | 'pyramids'
    | 'islamicCairo'
    | 'cruise'
    | 'arrivalBreakfast'
    | 'transfers'
    | 'tips'
    | 'guide';
  title: string;
  detail: string;
}

export interface CairoExclusionItem {
  key: 'flights' | 'beverages' | 'insidePyramids';
  title: string;
  detail: string;
  highlightFlights?: boolean;
}

export interface CairoConditionCard {
  id: string;
  title: string;
  emphasisValue: string;
  detail: string;
}

export interface CairoTourLocaleCopy {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionSubtitle: string;
  badgeDirectAgency: string;
  frenchTitle: string;
  arabicTitle: string;
  destination: string;
  duration: string;
  startingFromLabel: string;
  startingPriceDisplay: string;
  perPersonUsdNote: string;
  flightsExcludedHeadline: string;
  flightsExcludedShort: string;
  cardSummary: string;
  cardHighlights: string[];
  viewProgramCta: string;
  requestReservationCta: string;
  backToToursLabel: string;
  backToHomeLabel: string;
  heroEyebrow: string;
  heroTagline: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overviewLead: string;
  overviewNote: string;
  overviewFacts: { label: string; value: string }[];
  pricingEyebrow: string;
  pricingTitle: string;
  pricingSubtitle: string;
  periodRegularTab: string;
  periodRegularDates: string;
  periodRegularNote: string;
  periodSpecialTab: string;
  periodSpecialDates: string;
  periodSpecialNote: string;
  hotelColLabel: string;
  doubleColLabel: string;
  tripleColLabel: string;
  singleSuppColLabel: string;
  singleSuppExplain: string;
  selectHotelBtn: string;
  selectedHotelBtn: string;
  usdCurrencyNotice: string;
  inclusionsEyebrow: string;
  inclusionsTitle: string;
  inclusionsSubtitle: string;
  inclusions: CairoInclusionItem[];
  exclusionsEyebrow: string;
  exclusionsTitle: string;
  exclusionsSubtitle: string;
  exclusions: CairoExclusionItem[];
  conditionsEyebrow: string;
  conditionsTitle: string;
  conditionsSubtitle: string;
  conditions: CairoConditionCard[];
  formEyebrow: string;
  formTitle: string;
  formSubtitle: string;
  travelDatesHeading: string;
  departDateLabel: string;
  returnDateLabel: string;
  hotelChoiceLabel: string;
  occupancyChoiceLabel: string;
  occupancyDoubleLabel: string;
  occupancyTripleLabel: string;
  singleSupplementToggleLabel: string;
  singleSupplementToggleHint: string;
  travelersCountLabel: string;
  groupTierMin20Badge: string;
  groupTierSmallBadge: string;
  groupTierSoloNote: string;
  dateStatusMessages: {
    unset: string;
    regular: string;
    special: string;
    mixed_special: string;
    outside: string;
    invalidRange: string;
  };
  galaWarningText: string;
  estimateSummaryHeading: string;
  baseRateLineLabel: string;
  singleSupplementLineLabel: string;
  smallGroupLineLabel: string;
  unpricedFeesLineLabel: string;
  unpricedFeesValue: string;
  outsideConfirmPriceLabel: string;
  indicativePerPersonLabel: string;
  indicativeGroupTotalLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  submitBtn: string;
  whatsappBtn: string;
  summaryReadyTitle: string;
  editBtn: string;
  noAutoConfirmDisclaimer: string;
  advisorCardLabel: string;
  advisorCardTitle: string;
  advisorCallLabel: string;
  errors: {
    departRequired: string;
    returnInvalid: string;
    contactRequired: string;
  };
}

export const CAIRO_TOUR_COPY: Record<Language, CairoTourLocaleCopy> = {
  fr: {
    sectionEyebrow: 'Offre Officielle Golden Group Travels · En USD',
    sectionTitle: 'Nos Circuits Organisés',
    sectionSubtitle:
      'Programme officiel organisé directement par Golden Group Travels au Caire (Égypte).',
    badgeDirectAgency: 'Circuit Organisé Officiel · Golden Group Travels',
    frenchTitle: 'Le Pouls Charmant du Caire',
    arabicTitle: 'نبض القاهرة الساحرة',
    destination: 'Le Caire, Égypte',
    duration: '5 jours / 4 nuits',
    startingFromLabel: 'À partir de',
    startingPriceDisplay: '665 USD',
    perPersonUsdNote: 'À partir de 665 USD / personne',
    flightsExcludedHeadline: 'Vols internationaux NON inclus (hors forfait)',
    flightsExcludedShort: 'Vols internationaux non inclus',
    cardSummary:
      'Séjour culturel de 5 jours / 4 nuits au Caire avec hébergement B&B, visa d’entrée, visites des Pyramides et du Caire islamique, dîner-croisière sur le Nil, transferts aéroport et guide francophone ou arabophone.',
    cardHighlights: [
      '4 nuits au Caire (B&B) · 3 hôtels au choix',
      'Pyramides, Khan El Khalili, rue Al-Muizz & grandes mosquées',
      'Dîner-croisière, visa d’entrée & transferts aéroport inclus'
    ],
    viewProgramCta: 'Voir le programme',
    requestReservationCta: 'Demander une réservation',
    backToToursLabel: 'Retour aux circuits',
    backToHomeLabel: 'Retour à l’accueil',
    heroEyebrow: 'Circuit Organisé Officiel · Le Caire, Égypte',
    heroTagline:
      'Découvrez les merveilles millénaires des Pyramides et le cœur historique d’Al-Muizz & Khan El Khalili lors d’un séjour de 5 jours / 4 nuits en USD.',
    overviewEyebrow: 'Présentation Vérifiée',
    overviewTitle: 'L’Essentiel de Votre Séjour au Caire',
    overviewLead:
      'Ce circuit officiel de 5 jours / 4 nuits au Caire réunit les visites emblématiques de la capitale égyptienne, le visa d’entrée, les transferts aéroport, un dîner-croisière et l’accompagnement d’un guide local francophone ou arabophone.',
    overviewNote:
      'Exactitude garantie : Golden Group Travels publie uniquement les prestations, périodes tarifaires et conditions figurant sur son programme officiel, sans horaire journalier inventé ni vol inclus par erreur.',
    overviewFacts: [
      { label: 'Destination', value: 'Le Caire, Égypte' },
      { label: 'Durée du séjour', value: '5 jours / 4 nuits' },
      { label: 'Formule hôtelière', value: 'Logement & petit-déjeuner (B&B)' },
      { label: 'Tarif d’appel (base 20+ pers.)', value: 'À partir de 665 USD / pers.' }
    ],
    pricingEyebrow: 'Grille Tarifaire Officielle en USD',
    pricingTitle: 'Options Hôtelières & Tarifs par Période',
    pricingSubtitle:
      'Tous les tarifs ci-dessous sont exprimés par personne en dollars américains (USD) sur la base d’un groupe d’au moins 20 personnes. Cliquez sur une période ou un hôtel pour pré-remplir votre demande.',
    periodRegularTab: 'Tarifs standards',
    periodRegularDates: '1 décembre 2026 – 30 avril 2027 (hors périodes spéciales)',
    periodRegularNote:
      'Valable sur toute la saison du 1er décembre 2026 au 30 avril 2027, en dehors des deux périodes festives ci-contre.',
    periodSpecialTab: 'Tarifs périodes spéciales',
    periodSpecialDates: '17 déc. 2026 – 4 janv. 2027 & 15 mars – 3 avr. 2027',
    periodSpecialNote:
      'Périodes Noël, Nouvel An (17 déc. 2026 – 4 janv. 2027) et Pâques (15 mars – 3 avril 2027).',
    hotelColLabel: 'Hôtel proposé',
    doubleColLabel: 'Chambre Double',
    tripleColLabel: 'Chambre Triple',
    singleSuppColLabel: 'Supplément single',
    singleSuppExplain:
      'Le montant indiqué en « Supplément single » s’ajoute au forfait (il ne constitue pas le prix total d’une chambre individuelle).',
    selectHotelBtn: 'Sélectionner cet hôtel',
    selectedHotelBtn: 'Hôtel sélectionné',
    usdCurrencyNotice:
      'Tarifs officiels maintenus exclusivement en USD (aucune conversion en MAD). Hors vols internationaux.',
    inclusionsEyebrow: 'Prestations Officielles',
    inclusionsTitle: 'Le prix comprend',
    inclusionsSubtitle:
      'Les 9 prestations officielles intégrées au forfait « Le Pouls Charmant du Caire » :',
    inclusions: [
      {
        key: 'visa',
        title: 'Visa d’entrée',
        detail: 'Prise en charge du visa d’entrée en Égypte selon les conditions en vigueur.'
      },
      {
        key: 'hotel',
        title: '4 nuits au Caire (B&B)',
        detail: 'Hébergement de 4 nuits au Caire en formule logement et petit-déjeuner (Bed & Breakfast).'
      },
      {
        key: 'pyramids',
        title: 'Visite demi-journée aux Pyramides',
        detail: 'Excursion guidée d’une demi-journée au plateau des Pyramides.'
      },
      {
        key: 'islamicCairo',
        title: 'Journée complète Caire Historique',
        detail:
          'Visite complète : Khan El Khalili, rue Al-Muizz, Mosquée Al-Azhar, Mosquée Al-Hussein et Mosquée Amr Ibn Al-As.'
      },
      {
        key: 'cruise',
        title: 'Dîner-croisière',
        detail: 'Soirée dîner-croisière incluse au programme officiel.'
      },
      {
        key: 'arrivalBreakfast',
        title: 'Petit-déjeuner à l’arrivée',
        detail: 'Petit-déjeuner servi dans un restaurant local le jour de votre arrivée.'
      },
      {
        key: 'transfers',
        title: 'Transferts aéroport',
        detail: 'Transferts aéroport accueil et retour inclus au Caire.'
      },
      {
        key: 'tips',
        title: 'Pourboires (hors guides)',
        detail: 'Pourboires de service inclus au forfait, à l’exclusion des guides.'
      },
      {
        key: 'guide',
        title: 'Guide local FR / AR',
        detail: 'Accompagnement par un guide touristique local francophone ou arabophone.'
      }
    ],
    exclusionsEyebrow: 'À Prévoir en Supplément',
    exclusionsTitle: 'Le prix ne comprend pas',
    exclusionsSubtitle:
      'Vérifiez ces trois éléments exclus avant de valider votre demande — en particulier les billets d’avion internationaux.',
    exclusions: [
      {
        key: 'flights',
        title: 'Vols internationaux NON inclus',
        detail:
          'Les billets d’avion aller-retour vers Le Caire ne sont pas compris dans le forfait terrestre (bien qu’un avion apparaisse sur le visuel). Notre agence peut toutefois établir un devis aérien séparé sur demande.',
        highlightFlights: true
      },
      {
        key: 'beverages',
        title: 'Boissons',
        detail: 'Les boissons durant les repas et le dîner-croisière restent à la charge des voyageurs.'
      },
      {
        key: 'insidePyramids',
        title: 'Entrée intérieure des Pyramides',
        detail:
          'Les billets d’accès à l’intérieur des chambres des pyramides ne sont pas inclus.'
      }
    ],
    conditionsEyebrow: 'Règles de Tarification & Mentions Légales du Programme',
    conditionsTitle: 'Conditions et suppléments',
    conditionsSubtitle:
      'Conditions officielles applicables à ce séjour. Les suppléments variables (hausse des monuments, dîners de gala) sont vérifiés en direct avant confirmation.',
    conditions: [
      {
        id: 'min-group',
        title: 'Base groupe minimum',
        emphasisValue: 'Minimum 20 personnes',
        detail:
          'Les tarifs publiés dans la grille (à partir de 665 USD) s’appliquent pour un groupe d’au moins 20 participants.'
      },
      {
        id: 'small-group',
        title: 'Supplément petit groupe',
        emphasisValue: '+200 USD / personne (2 à 19 pers.)',
        detail:
          'Pour les groupes de 2 à 19 personnes, un supplément officiel de +200 USD par personne s’ajoute au tarif publié.'
      },
      {
        id: 'monument-fees',
        title: 'Entrées aux monuments',
        emphasisValue: 'Révision possible des droits d’entrée',
        detail:
          'Golden se réserve le droit d’appliquer un supplément en cas d’augmentation officielle des tarifs d’entrée aux monuments.'
      },
      {
        id: 'gala-dinners',
        title: 'Dîners de gala obligatoires',
        emphasisValue: '24 décembre & 31 décembre',
        detail:
          'Des dîners de gala obligatoires peuvent être exigés par les hôtels les 24 et 31 décembre (tarif vérifié lors de la réservation).'
      }
    ],
    formEyebrow: 'Réservation & Disponibilités · Bureau de Salé',
    formTitle: 'Demander une réservation — Le Pouls Charmant du Caire',
    formSubtitle:
      'Aucune confirmation automatique ni paiement en ligne n’est effectué ici. Préparez votre demande complète pour vérifier les places et recevoir un devis définitif sur WhatsApp.',
    travelDatesHeading: '1. Vos dates souhaitées (Saison 1 déc. 2026 – 30 avr. 2027)',
    departDateLabel: 'Date de départ souhaitée',
    returnDateLabel: 'Date de retour souhaitée',
    hotelChoiceLabel: '2. Hôtel souhaité au Caire',
    occupancyChoiceLabel: '3. Occupation de chambre',
    occupancyDoubleLabel: 'Chambre Double',
    occupancyTripleLabel: 'Chambre Triple',
    singleSupplementToggleLabel: 'Ajouter l’option Supplément single (occupation individuelle)',
    singleSupplementToggleHint:
      'Le supplément single indiqué dans la grille s’ajoute séparément selon la confirmation de l’hôtel.',
    travelersCountLabel: '4. Nombre de voyageurs',
    groupTierMin20Badge: 'Tarif base groupe (20+ pers.)',
    groupTierSmallBadge: 'Petit groupe (2–19 pers.) : +200 USD / pers.',
    groupTierSoloNote: '1 voyageur : tarif individuel + supplément single à confirmer par l’agence',
    dateStatusMessages: {
      unset: 'Sélectionnez une date de départ pour identifier la période tarifaire applicable.',
      regular: 'Dates comprises dans la période des Tarifs standards (1 déc. 2026 – 30 avr. 2027).',
      special: 'Dates comprises dans les Périodes spéciales (Noël / Nouvel An ou Pâques).',
      mixed_special:
        'Votre séjour recoupe une période spéciale (17 déc.–4 janv. ou 15 mars–3 avr.) : la grille Périodes spéciales ou un calcul mixte s’applique sur confirmation agence.',
      outside:
        'Dates en dehors de la fenêtre publiée (1 déc. 2026 – 30 avr. 2027) : tarif sur confirmation directe de l’agence.',
      invalidRange: 'La date de retour doit être postérieure ou égale à la date de départ.'
    },
    galaWarningText:
      'Votre sélection inclut le 24 et/ou le 31 décembre : un dîner de gala obligatoire peut être facturé par l’hôtel (à confirmer avant émission).',
    estimateSummaryHeading: 'Détail transparent du tarif indicatif',
    baseRateLineLabel: 'Tarif de base par personne',
    singleSupplementLineLabel: 'Supplément single',
    smallGroupLineLabel: 'Supplément petit groupe (2–19 pers.)',
    unpricedFeesLineLabel: 'Frais variables / hors forfait',
    unpricedFeesValue: 'Vols int. non inclus · Gala 24/31 déc. & hausses monuments à vérifier',
    outsideConfirmPriceLabel: 'Sur devis agence (dates hors grille publiée)',
    indicativePerPersonLabel: 'Sous-total indicatif publié / pers.',
    indicativeGroupTotalLabel: 'Total indicatif groupe',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Votre nom et prénom',
    phoneLabel: 'Téléphone / WhatsApp',
    phonePlaceholder: 'Ex : +212 6XX-XXXXXX',
    notesLabel: 'Précisions (optionnel — ex : demande de devis vol aller-retour)',
    notesPlaceholder:
      'Ville de départ souhaitée si vous voulez un devis aérien séparé, questions sur les hôtels...',
    submitBtn: 'Préparer ma demande WhatsApp',
    whatsappBtn: 'Envoyer sur WhatsApp (0666-484815)',
    summaryReadyTitle: 'Récapitulatif prêt à envoyer à Golden Group Travels',
    editBtn: 'Modifier',
    noAutoConfirmDisclaimer:
      'Demande sans engagement ni paiement en ligne. Disponibilité réelle et devis final confirmés par notre agence (Salé).',
    advisorCardLabel: 'Agence Golden Group · Salé',
    advisorCardTitle: 'Besoin des vols internationaux en plus ?',
    advisorCallLabel: 'Appeler le bureau',
    errors: {
      departRequired: 'Veuillez sélectionner une date de départ souhaitée.',
      returnInvalid: 'La date de retour ne peut pas précéder la date de départ.',
      contactRequired: 'Veuillez renseigner votre nom complet et votre numéro de téléphone / WhatsApp.'
    }
  },
  ar: {
    sectionEyebrow: 'برنامج رسمي من جولدن جروب · بالدولار الأمريكي (USD)',
    sectionTitle: 'جولاتنا المنظمة',
    sectionSubtitle:
      'رحلة منظمة مباشرة من وكالة جولدن جروب للسفر إلى القاهرة (مصر).',
    badgeDirectAgency: 'رحلة منظمة رسمية · جولدن جروب',
    frenchTitle: 'Le Pouls Charmant du Caire',
    arabicTitle: 'نبض القاهرة الساحرة',
    destination: 'القاهرة، مصر',
    duration: '5 أيام / 4 ليالٍ',
    startingFromLabel: 'ابتداءً من',
    startingPriceDisplay: '665 USD',
    perPersonUsdNote: 'ابتداءً من 665 دولار أمريكي / للشخص',
    flightsExcludedHeadline: 'تذاكر الطيران الدولية غير مشمولة في السعر',
    flightsExcludedShort: 'الطيران الدولي غير مشمول',
    cardSummary:
      'برنامج لمدة 5 أيام / 4 ليالٍ في القاهرة يشمل الإقامة مع الإفطار (B&B)، تأشيرة الدخول، زيارة الأهرامات والقاهرة التاريخية، عشاء كروز على النيل، المواصلات من المطار ومرشد سياحي ناطق بالعربية أو الفرنسية.',
    cardHighlights: [
      '4 ليالٍ بالقاهرة (إقامة وإفطار) · 3 فنادق مختارة',
      'الأهرامات، خان الخليلي، شارع المعز والأزهر والحسين وعمرو بن العاص',
      'عشاء كروز، تأشيرة الدخول ومواصلات المطار مشمولة'
    ],
    viewProgramCta: 'عرض البرنامج الكامل',
    requestReservationCta: 'طلب حجز',
    backToToursLabel: 'العودة إلى الجولات والأنشطة',
    backToHomeLabel: 'العودة إلى الرئيسية',
    heroEyebrow: 'برنامج رسمي منظم · القاهرة، مصر',
    heroTagline:
      'استمتع بسحر الأهرامات والقاهرة الفاطمية خلال 5 أيام / 4 ليالٍ مع خيارات فندقية مميزة وأسعار واضحة بالدولار الأمريكي.',
    overviewEyebrow: 'تفاصيل العرض الموثقة',
    overviewTitle: 'ملخص برنامج نبض القاهرة الساحرة',
    overviewLead:
      'يجمع هذا البرنامج بين الإقامة الفندقية مع الإفطار، تأشيرة الدخول إلى مصر، الجولات الأساسية في الأهرامات والقاهرة الإسلامية، رحلة عشاء بحرية في النيل، والاستقبال والتوصيل من وإلى المطار.',
    overviewNote:
      'دقة المعلومات: تعرض الوكالة فقط البنود والأسعار والشروط المعلنة رسمياً دون اختلاق جدول يومي غير منشور أو إدراج تذاكر طيران غير مشمولة.',
    overviewFacts: [
      { label: 'الوجهة', value: 'القاهرة، مصر' },
      { label: 'المدة', value: '5 أيام / 4 ليالٍ' },
      { label: 'نظام الإقامة', value: 'غرفة وإفطار (B&B)' },
      { label: 'السعر الابتدائي (مجموعة 20+)', value: 'ابتداءً من 665 USD / شخص' }
    ],
    pricingEyebrow: 'جدول الأسعار الرسمي بالدولار الأمريكي (USD)',
    pricingTitle: 'خيارات الفنادق والأسعار حسب الفترة',
    pricingSubtitle:
      'الأسعار المعلنة أدناه للشخص الواحد بالدولار الأمريكي (USD) لمجموعة لا تقل عن 20 شخصاً. اضغط لاختيار الفندق أو الفترة.',
    periodRegularTab: 'الأسعار العادية',
    periodRegularDates: '1 ديسمبر 2026 – 30 أبريل 2027 (باستثناء الفترات الخاصة)',
    periodRegularNote:
      'ساري من 1 ديسمبر 2026 إلى 30 أبريل 2027 خارج فترتي الأعياد الموضحتين.',
    periodSpecialTab: 'أسعار الفترات الخاصة',
    periodSpecialDates: '17 دجنبر 2026 – 4 يناير 2027 و 15 مارس – 3 أبريل 2027',
    periodSpecialNote:
      'تُطبق في فترتي أعياد الميلاد ورأس السنة (17 دجنبر – 4 يناير) وعيد الفصح (15 مارس – 3 أبريل).',
    hotelColLabel: 'الفندق المقترح',
    doubleColLabel: 'غرفة ثنائية (Double)',
    tripleColLabel: 'غرفة ثلاثية (Triple)',
    singleSuppColLabel: 'مكمل الغرفة الفردية (Supplément single)',
    singleSuppExplain:
      'المبلغ المدرج في خانة «مكمل الغرفة الفردية» يُضاف إلى الباقة وليس السعر الإجمالي المستقل للغرفة.',
    selectHotelBtn: 'اختيار هذا الفندق',
    selectedHotelBtn: 'الفندق المختار',
    usdCurrencyNotice:
      'الأسعار الرسمية معتمدة حصرياً بالدولار الأمريكي (USD) وغير محولة إلى الدرهم. لا تشمل الطيران الدولي.',
    inclusionsEyebrow: 'الخدمات المعلنة',
    inclusionsTitle: 'السعر الأساسي يشمل',
    inclusionsSubtitle: 'البنود التسعة المشمولة رسمياً في باقة «نبض القاهرة الساحرة»:',
    inclusions: [
      { key: 'visa', title: 'تأشيرة الدخول', detail: 'تأشيرة الدخول إلى مصر وفق الضوابط المعتمدة.' },
      {
        key: 'hotel',
        title: '4 ليالٍ بالقاهرة (إقامة وإفطار)',
        detail: 'إقامة 4 ليالٍ بأحد الفنادق المختارة بنظام الغرفة والإفطار (B&B).'
      },
      { key: 'pyramids', title: 'نصف يوم لزيارة الأهرامات', detail: 'جولة سياحية لنصف يوم في منطقة الأهرامات.' },
      {
        key: 'islamicCairo',
        title: 'يوم كامل للقاهرة التاريخية',
        detail: 'زيارة خان الخليلي، شارع المعز، جامع الأزهر، مسجد الحسين ومسجد عمرو بن العاص.'
      },
      { key: 'cruise', title: 'عشاء كروز', detail: 'رحلة عشاء نيلية مشمولة في البرنامج.' },
      {
        key: 'arrivalBreakfast',
        title: 'وجبة إفطار عند الوصول',
        detail: 'إفطار في مطعم محلي عند الوصول إلى القاهرة.'
      },
      { key: 'transfers', title: 'مواصلات المطار', detail: 'خدمة الاستقبال والتوصيل من وإلى المطار.' },
      { key: 'tips', title: 'الإكراميات (باستثناء المرشدين)', detail: 'الإكراميات مشمولة، عدا إكرامية المرشد السياحي.' },
      {
        key: 'guide',
        title: 'مرشد سياحي محلي',
        detail: 'مرشد سياحي محلي ناطق بالفرنسية أو العربية.'
      }
    ],
    exclusionsEyebrow: 'بنود خارج الباقة',
    exclusionsTitle: 'السعر لا يشمل',
    exclusionsSubtitle: 'يرجى الانتباه إلى البنود غير المشمولة، وعلى رأسها تذاكر الطيران الدولية.',
    exclusions: [
      {
        key: 'flights',
        title: 'تذاكر الطيران الدولية غير مشمولة',
        detail:
          'الرحلات الجوية الدولية ذهاباً وإياباً غير مشمولة في سعر الباقة (رغم وجود رمز طائرة في التصميم الدعائي). يمكن للوكالة إعداد عرض طيران منفصل عند الطلب.',
        highlightFlights: true
      },
      { key: 'beverages', title: 'المشروبات', detail: 'المشروبات خلال الوجبات وعشاء الكروز غير مشمولة.' },
      {
        key: 'insidePyramids',
        title: 'تذاكر دخول الأهرامات من الداخل',
        detail: 'رسوم الدخول إلى داخل الأهرامات غير مشمولة.'
      }
    ],
    conditionsEyebrow: 'ضوابط الحجز والإضافات',
    conditionsTitle: 'الشروط والمكملات',
    conditionsSubtitle: 'تُؤكد جميع الإضافات الموسمية والتوافر الفعلي مباشرة مع مستشارينا.',
    conditions: [
      {
        id: 'min-group',
        title: 'الحد الأدنى للمجموعة',
        emphasisValue: '20 شخصاً على الأقل',
        detail: 'الأسعار المنشورة تسري على المجموعات المكونة من 20 مسافراً فأكثر.'
      },
      {
        id: 'small-group',
        title: 'مكمل المجموعات الصغيرة',
        emphasisValue: '+200 USD / للشخص (من 2 إلى 19 شخصاً)',
        detail: 'في حال كان العدد من 2 إلى 19 شخصاً يُضاف مكمل قدره 200 دولار أمريكي للشخص.'
      },
      {
        id: 'monument-fees',
        title: 'تعديل رسوم المعالم',
        emphasisValue: 'وفق التسعيرة الرسمية للمتاحف والمعالم',
        detail: 'تحتفظ الوكالة بحق إضافة مكمل في حال طرأ ارتفاع على رسوم دخول المعالم السياحية.'
      },
      {
        id: 'gala-dinners',
        title: 'حفلات العشاء الإلزامية',
        emphasisValue: '24 ديسمبر و 31 ديسمبر',
        detail: 'قد تُفرض وجبات عشاء احتفالية إلزامية ليلة 24 و 31 ديسمبر وتُراجع قيمتها عند الحجز.'
      }
    ],
    formEyebrow: 'استفسار وحجز مباشر · مكتب سلا',
    formTitle: 'طلب حجز — نبض القاهرة الساحرة',
    formSubtitle:
      'لا يتم تأكيد الحجز آلياً أو الدفع عبر الموقع. أرسل تفضيلاتك عبر واتساب للتحقق المباشر من التوافر وتقديم العرض النهائي.',
    travelDatesHeading: '1. التواريخ المرغوبة (الموسم: 1 دجنبر 2026 – 30 أبريل 2027)',
    departDateLabel: 'تاريخ المغادرة المفضل',
    returnDateLabel: 'تاريخ العودة المفضل',
    hotelChoiceLabel: '2. الفندق المطلوب',
    occupancyChoiceLabel: '3. نوع الغرفة',
    occupancyDoubleLabel: 'غرفة ثنائية (Double)',
    occupancyTripleLabel: 'غرفة ثلاثية (Triple)',
    singleSupplementToggleLabel: 'إضافة خيار مكمل الغرفة الفردية (Supplément single)',
    singleSupplementToggleHint: 'يُضاف المكمل المعلن في الجدول بشكل منفصل حسب توفر الفندق.',
    travelersCountLabel: '4. عدد المسافرين',
    groupTierMin20Badge: 'سعر المجموعة (20+ شخصاً)',
    groupTierSmallBadge: 'مجموعة صغيرة (2–19 شخصاً): +200 USD / للشخص',
    groupTierSoloNote: 'مسافر واحد: السعر والمكمل الفردي يُؤكدان عبر الوكالة',
    dateStatusMessages: {
      unset: 'حدد تاريخ المغادرة لمعرفة الفترة السعرية المطبقة.',
      regular: 'التواريخ تقع ضمن فترة الأسعار العادية (1 ديسمبر 2026 – 30 أبريل 2027).',
      special: 'التواريخ تقع ضمن الفترات الخاصة (رأس السنة أو عيد الفصح).',
      mixed_special:
        'تتقاطع رحلتك مع الفترة الخاصة (17 دجنبر–4 يناير أو 15 مارس–3 أبريل): يتم تطبيق أسعار الفترة الخاصة أو احتساب تفصيلي مع الوكالة.',
      outside: 'تواريخ خارج الفترة المعلنة (1 دجنبر 2026 – 30 أبريل 2027): يتطلب السعر تأكيداً مباشراً من الوكالة.',
      invalidRange: 'يجب أن يكون تاريخ العودة بعد تاريخ المغادرة أو مطابقاً له.'
    },
    galaWarningText:
      'تشمل تواريخك يوم 24 أو 31 ديسمبر: قد يطلب الفندق عشاء غالا إلزامياً يتم تأكيد قيمته عند الحجز.',
    estimateSummaryHeading: 'تفصيل السعر التوضيحي المعلن',
    baseRateLineLabel: 'السعر الأساسي للشخص',
    singleSupplementLineLabel: 'مكمل الغرفة الفردية',
    smallGroupLineLabel: 'مكمل المجموعة الصغيرة (2–19)',
    unpricedFeesLineLabel: 'رسوم غير محتسبة آلياً',
    unpricedFeesValue: 'الطيران الدولي غير مشمول · عشاء 24/31 دجنبر ورسوم المعالم عند التأكيد',
    outsideConfirmPriceLabel: 'يُؤكد السعر مباشرة من الوكالة (خارج التواريخ المنشورة)',
    indicativePerPersonLabel: 'المجموع التوضيحي للشخص',
    indicativeGroupTotalLabel: 'التقدير الإجمالي للمجموعة',
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'الاسم والنسب',
    phoneLabel: 'الهاتف / واتساب',
    phonePlaceholder: 'مثال: +212 6XX-XXXXXX',
    notesLabel: 'ملاحظات (اختياري — مثلاً طلب عرض تذاكر الطيران)',
    notesPlaceholder: 'اذكر مطار المغادرة إذا كنت ترغب في عرض منفصل لتذاكر الطيران...',
    submitBtn: 'تجهيز طلب الواتساب',
    whatsappBtn: 'إرسال عبر واتساب (0666-484815)',
    summaryReadyTitle: 'ملخص الطلب جاهز للإرسال إلى جولدن جروب',
    editBtn: 'تعديل',
    noAutoConfirmDisclaimer: 'لا يوجد حجز تلقائي أو دفع إلكتروني؛ يتم التأكيد المباشر عبر مكتبنا بسلا.',
    advisorCardLabel: 'مكتب جولدن جروب · سلا',
    advisorCardTitle: 'هل تحتاج إلى تذاكر الطيران الدولية أيضاً؟',
    advisorCallLabel: 'الاتصال بالوكالة',
    errors: {
      departRequired: 'يرجى تحديد تاريخ المغادرة المفضل.',
      returnInvalid: 'لا يمكن أن يسبق تاريخ العودة تاريخ المغادرة.',
      contactRequired: 'يرجى إدخال الاسم الكامل ورقم الهاتف / واتساب.'
    }
  },
  en: {
    sectionEyebrow: 'Official Golden Group Travels Tour · USD Pricing',
    sectionTitle: 'Our Organized Tours',
    sectionSubtitle:
      'Official land package organized directly by Golden Group Travels in Cairo, Egypt.',
    badgeDirectAgency: 'Official Organized Tour · Golden Group Travels',
    frenchTitle: 'Le Pouls Charmant du Caire',
    arabicTitle: 'نبض القاهرة الساحرة',
    destination: 'Cairo, Egypt',
    duration: '5 days / 4 nights',
    startingFromLabel: 'Starting from',
    startingPriceDisplay: '665 USD',
    perPersonUsdNote: 'From 665 USD / person',
    flightsExcludedHeadline: 'International flights NOT included',
    flightsExcludedShort: 'International flights excluded',
    cardSummary:
      '5 days / 4 nights Cairo land program including entry visa, 4 nights B&B accommodation, Pyramids half-day tour, full-day Khan El Khalili & Islamic Cairo tour, dinner cruise, airport transfers, and French- or Arabic-speaking local guide.',
    cardHighlights: [
      '4 nights in Cairo (B&B) · 3 hotel tiers available',
      'Pyramids, Khan El Khalili, Al-Muizz Street & historic mosques',
      'Dinner cruise, entry visa & airport transfers included'
    ],
    viewProgramCta: 'View Program',
    requestReservationCta: 'Request Reservation',
    backToToursLabel: 'Back to Tours & Activities',
    backToHomeLabel: 'Back to Home',
    heroEyebrow: 'Official Organized Tour · Cairo, Egypt',
    heroTagline:
      'Experience the Pyramids of Giza and the living heritage of Al-Muizz Street & Khan El Khalili on a curated 5-day / 4-night Cairo stay in USD.',
    overviewEyebrow: 'Verified Package Summary',
    overviewTitle: 'Cairo Tour Highlights & Format',
    overviewLead:
      'This 5-day / 4-night Cairo program combines 4 nights of B&B hotel accommodation, Egypt entry visa, guided visits to the Pyramids and Islamic Cairo, a Nile dinner cruise, arrival local breakfast, airport transfers, and a French- or Arabic-speaking local guide.',
    overviewNote:
      'Accuracy commitment: Only official published inclusions, date periods, USD rates, and supplement conditions are displayed—with zero invented daily schedules or bundled flights.',
    overviewFacts: [
      { label: 'Destination', value: 'Cairo, Egypt' },
      { label: 'Duration', value: '5 days / 4 nights' },
      { label: 'Meal Basis', value: 'Bed & Breakfast (B&B)' },
      { label: 'Starting Fare (20+ pax)', value: 'From 665 USD / person' }
    ],
    pricingEyebrow: 'Official USD Pricing Matrix',
    pricingTitle: 'Hotel Tiers & Seasonal Date Pricing',
    pricingSubtitle:
      'All fares below are per person in US Dollars (USD) based on a minimum group of 20 travelers. Click a seasonal tab or hotel row to pre-fill your inquiry.',
    periodRegularTab: 'Regular Period Rates',
    periodRegularDates: 'December 1, 2026 – April 30, 2027 (excl. special periods)',
    periodRegularNote:
      'Applicable across December 1, 2026 – April 30, 2027 outside the Christmas/New Year and Easter special windows.',
    periodSpecialTab: 'Special Period Rates',
    periodSpecialDates: 'Dec 17, 2026 – Jan 4, 2027 & Mar 15 – Apr 3, 2027',
    periodSpecialNote:
      'Christmas & New Year (Dec 17, 2026 – Jan 4, 2027) and Easter holiday window (Mar 15 – Apr 3, 2027).',
    hotelColLabel: 'Hotel Option',
    doubleColLabel: 'Double Room',
    tripleColLabel: 'Triple Room',
    singleSuppColLabel: 'Single Supplement',
    singleSuppExplain:
      'Figures in the "Single Supplement" column are extra supplements per traveler—never standalone single-room total package prices.',
    selectHotelBtn: 'Select Hotel',
    selectedHotelBtn: 'Selected Hotel',
    usdCurrencyNotice:
      'Published official rates are strictly in USD (never converted to MAD). International flights are excluded.',
    inclusionsEyebrow: 'What Is Included',
    inclusionsTitle: 'The price includes',
    inclusionsSubtitle: 'All 9 official items covered in "Le Pouls Charmant du Caire":',
    inclusions: [
      { key: 'visa', title: 'Entry Visa', detail: 'Egypt entry visa included in the package.' },
      { key: 'hotel', title: '4 Nights in Cairo (B&B)', detail: '4 nights hotel stay in Cairo on Bed & Breakfast basis.' },
      { key: 'pyramids', title: 'Half-Day Pyramids Tour', detail: 'Guided half-day excursion to the Pyramids.' },
      {
        key: 'islamicCairo',
        title: 'Full-Day Historic Cairo Tour',
        detail:
          'Full-day guided visit: Khan El Khalili, Al-Muizz Street, Al-Azhar Mosque, Al-Hussein Mosque & Amr Ibn Al-As Mosque.'
      },
      { key: 'cruise', title: 'Dinner Cruise', detail: 'Dinner cruise evening included.' },
      {
        key: 'arrivalBreakfast',
        title: 'Arrival Breakfast',
        detail: 'Breakfast at a local restaurant upon arrival.'
      },
      { key: 'transfers', title: 'Airport Transfers', detail: 'Arrival and departure Cairo airport transfers.' },
      { key: 'tips', title: 'Tips (excluding guides)', detail: 'Standard service tips included, excluding tour guides.' },
      { key: 'guide', title: 'Local FR / AR Guide', detail: 'French- or Arabic-speaking local tourist guide.' }
    ],
    exclusionsEyebrow: 'What Is Excluded',
    exclusionsTitle: 'Not Included in the Price',
    exclusionsSubtitle: 'Review these 3 exclusions carefully—international flights are NOT included in the advertised price.',
    exclusions: [
      {
        key: 'flights',
        title: 'International Flights NOT Included',
        detail:
          'Round-trip flights to Cairo are excluded from this land package price (even though the promotional artwork includes a plane icon). Our Salé desk can quote flights separately on request.',
        highlightFlights: true
      },
      { key: 'beverages', title: 'Beverages', detail: 'Drinks during meals and the dinner cruise are not included.' },
      {
        key: 'insidePyramids',
        title: 'Interior Pyramid Tickets',
        detail: 'Tickets to enter inside the pyramids are not included.'
      }
    ],
    conditionsEyebrow: 'Published Rules & Surcharges',
    conditionsTitle: 'Conditions & Supplements',
    conditionsSubtitle:
      'Published agency conditions. Variable monument increases and December gala fees cannot be estimated online and are confirmed directly.',
    conditions: [
      {
        id: 'min-group',
        title: 'Minimum Group Basis',
        emphasisValue: 'Minimum 20 travelers',
        detail: 'Published double and triple fares apply to groups of at least 20 participants.'
      },
      {
        id: 'small-group',
        title: 'Small Group Supplement',
        emphasisValue: '+200 USD / person (2–19 travelers)',
        detail: 'Groups of 2 to 19 travelers incur a mandatory +200 USD per person supplement.'
      },
      {
        id: 'monument-fees',
        title: 'Monument Fee Clause',
        emphasisValue: 'Subject to official fee updates',
        detail: 'Golden reserves the right to apply a supplement in the event of an increase in monument entrance fees.'
      },
      {
        id: 'gala-dinners',
        title: 'Mandatory Gala Dinners',
        emphasisValue: 'December 24 & December 31',
        detail: 'Mandatory gala dinners may apply on December 24 and December 31 and must be verified at booking.'
      }
    ],
    formEyebrow: 'Direct Agency Inquiry · Salé Desk',
    formTitle: 'Request Reservation — Le Pouls Charmant du Caire',
    formSubtitle:
      'No instant payment or automated confirmation is processed online. Submit your travel dates, hotel preference, and group size to confirm availability with our advisors via WhatsApp.',
    travelDatesHeading: '1. Preferred Travel Dates (Published season: Dec 1, 2026 – Apr 30, 2027)',
    departDateLabel: 'Preferred Departure Date',
    returnDateLabel: 'Preferred Return Date',
    hotelChoiceLabel: '2. Preferred Hotel',
    occupancyChoiceLabel: '3. Room Occupancy',
    occupancyDoubleLabel: 'Double Room',
    occupancyTripleLabel: 'Triple Room',
    singleSupplementToggleLabel: 'Add Single Supplement option (individual occupancy)',
    singleSupplementToggleHint:
      'Listed separately as an additional supplement rather than replacing the base package rate.',
    travelersCountLabel: '4. Number of Travelers',
    groupTierMin20Badge: 'Published group base rate (20+ pax)',
    groupTierSmallBadge: 'Small group tier (2–19 pax): +200 USD / person',
    groupTierSoloNote: '1 traveler: individual rate & single supplement confirmed by our desk',
    dateStatusMessages: {
      unset: 'Select a departure date to check whether Regular or Special period rates apply.',
      regular: 'Selected dates fall inside the Regular Period (Dec 1, 2026 – Apr 30, 2027).',
      special: 'Selected dates fall inside the Special Period (Christmas/New Year or Easter).',
      mixed_special:
        'Your dates touch a Special Period window (Dec 17–Jan 4 or Mar 15–Apr 3); Special Period rates or split-night confirmation applies.',
      outside:
        'Selected dates fall outside Dec 1, 2026 – Apr 30, 2027: pricing requires direct agency confirmation.',
      invalidRange: 'Return date must be on or after the departure date.'
    },
    galaWarningText:
      'Your selected dates cover December 24 and/or December 31: mandatory hotel gala dinners may apply and require advisor confirmation.',
    estimateSummaryHeading: 'Published Rate Breakdown',
    baseRateLineLabel: 'Base rate per person',
    singleSupplementLineLabel: 'Single supplement',
    smallGroupLineLabel: 'Small group supplement (2–19 pax)',
    unpricedFeesLineLabel: 'Excluded / variable items',
    unpricedFeesValue: 'Flights excluded · Dec 24/31 gala & monument updates verified on quote',
    outsideConfirmPriceLabel: 'Agency confirmation required (outside published season)',
    indicativePerPersonLabel: 'Published indicative fare / person',
    indicativeGroupTotalLabel: 'Indicative total for group',
    nameLabel: 'Full Name',
    namePlaceholder: 'Your full name',
    phoneLabel: 'Phone / WhatsApp',
    phonePlaceholder: 'e.g., +212 6XX-XXXXXX',
    notesLabel: 'Notes (optional — e.g., request a separate flight quote)',
    notesPlaceholder: 'Departure city if you would like a separate flight quote, hotel questions...',
    submitBtn: 'Prepare WhatsApp Inquiry',
    whatsappBtn: 'Send via WhatsApp (0666-484815)',
    summaryReadyTitle: 'Inquiry Summary Ready for Golden Group Travels',
    editBtn: 'Edit',
    noAutoConfirmDisclaimer:
      'No online card payment or instant booking. Real availability and final quote are confirmed by our Salé office.',
    advisorCardLabel: 'Golden Group Desk · Salé',
    advisorCardTitle: 'Need international flights quoted separately?',
    advisorCallLabel: 'Call Agency',
    errors: {
      departRequired: 'Please select a preferred departure date.',
      returnInvalid: 'Return date cannot be earlier than departure date.',
      contactRequired: 'Please enter your full name and phone/WhatsApp number.'
    }
  },
  es: {
    sectionEyebrow: 'Circuito Oficial Golden Group Travels · En USD',
    sectionTitle: 'Nuestros Circuitos Organizados',
    sectionSubtitle:
      'Programa oficial organizado directamente por Golden Group Travels en El Cairo (Egipto).',
    badgeDirectAgency: 'Circuito Organizado Oficial · Golden Group Travels',
    frenchTitle: 'Le Pouls Charmant du Caire',
    arabicTitle: 'نبض القاهرة الساحرة',
    destination: 'El Cairo, Egipto',
    duration: '5 días / 4 noches',
    startingFromLabel: 'Desde',
    startingPriceDisplay: '665 USD',
    perPersonUsdNote: 'Desde 665 USD / persona',
    flightsExcludedHeadline: 'Vuelos internacionales NO incluidos',
    flightsExcludedShort: 'Vuelos internacionales excluidos',
    cardSummary:
      'Estancia de 5 días / 4 noches en El Cairo en régimen B&B, visado de entrada, visita a las Pirámides y El Cairo histórico, cena-crucero, traslados al aeropuerto y guía local francófono o arabófono.',
    cardHighlights: [
      '4 noches en El Cairo (B&B) · 3 hoteles disponibles',
      'Pirámides, Khan El Khalili, calle Al-Muizz y mezquitas históricas',
      'Cena-crucero, visado de entrada y traslados aeropuerto incluidos'
    ],
    viewProgramCta: 'Ver el programa',
    requestReservationCta: 'Solicitar reserva',
    backToToursLabel: 'Volver a circuitos y actividades',
    backToHomeLabel: 'Volver al inicio',
    heroEyebrow: 'Circuito Oficial · El Cairo, Egipto',
    heroTagline:
      'Explora las Pirámides y el corazón histórico de Khan El Khalili y la calle Al-Muizz en un circuito de 5 días / 4 noches en dólares (USD).',
    overviewEyebrow: 'Resumen Verificado',
    overviewTitle: 'Esencia de Tu Viaje a El Cairo',
    overviewLead:
      'Este programa oficial de 5 días / 4 noches incluye 4 noches en El Cairo en régimen B&B, visado de entrada, excursiones a las Pirámides y El Cairo islámico, cena-crucero, desayuno a la llegada, traslados y guía local.',
    overviewNote:
      'Compromiso de exactitud: solo mostramos los servicios, fechas, precios en USD y condiciones oficiales publicadas, sin inventar horarios diarios ni incluir vuelos no incluidos.',
    overviewFacts: [
      { label: 'Destino', value: 'El Cairo, Egipto' },
      { label: 'Duración', value: '5 días / 4 noches' },
      { label: 'Régimen hotelero', value: 'Alojamiento y desayuno (B&B)' },
      { label: 'Tarifa inicial (20+ pers.)', value: 'Desde 665 USD / pers.' }
    ],
    pricingEyebrow: 'Tarifas Oficiales en USD',
    pricingTitle: 'Opciones de Hotel y Tarifas por Temporada',
    pricingSubtitle:
      'Todos los precios se muestran por persona en USD para un grupo mínimo de 20 personas. Haz clic para preseleccionar hotel o temporada.',
    periodRegularTab: 'Tarifas estándar',
    periodRegularDates: '1 diciembre 2026 – 30 abril 2027 (salvo períodos especiales)',
    periodRegularNote: 'Válido del 1 de diciembre de 2026 al 30 de abril de 2027 fuera de períodos festivos.',
    periodSpecialTab: 'Tarifas períodos especiales',
    periodSpecialDates: '17 dic. 2026 – 4 ene. 2027 y 15 mar. – 3 abr. 2027',
    periodSpecialNote: 'Navidad, Año Nuevo (17 dic.–4 ene.) y Semana Santa (15 mar.–3 abr.).',
    hotelColLabel: 'Hotel propuesto',
    doubleColLabel: 'Habitación Doble',
    tripleColLabel: 'Habitación Triple',
    singleSuppColLabel: 'Suplemento individual',
    singleSuppExplain:
      'Los importes de "Suplemento individual" se añaden al paquete y no representan un precio total independiente.',
    selectHotelBtn: 'Seleccionar hotel',
    selectedHotelBtn: 'Hotel seleccionado',
    usdCurrencyNotice:
      'Tarifas oficiales mantenidas estrictamente en USD (sin conversión a MAD). Vuelos internacionales excluidos.',
    inclusionsEyebrow: 'Servicios Incluidos',
    inclusionsTitle: 'El precio incluye',
    inclusionsSubtitle: 'Los 9 servicios oficiales incluidos en "Le Pouls Charmant du Caire":',
    inclusions: [
      { key: 'visa', title: 'Visado de entrada', detail: 'Tramitación del visado de entrada a Egipto.' },
      { key: 'hotel', title: '4 noches en El Cairo (B&B)', detail: 'Alojamiento de 4 noches con desayuno incluido.' },
      { key: 'pyramids', title: 'Medio día en las Pirámides', detail: 'Visita guiada de medio día a las Pirámides.' },
      {
        key: 'islamicCairo',
        title: 'Día completo El Cairo Histórico',
        detail: 'Khan El Khalili, calle Al-Muizz, Mezquita Al-Azhar, Al-Hussein y Amr Ibn Al-As.'
      },
      { key: 'cruise', title: 'Cena-crucero', detail: 'Cena-crucero incluida en el programa.' },
      { key: 'arrivalBreakfast', title: 'Desayuno a la llegada', detail: 'Desayuno en restaurante local a la llegada.' },
      { key: 'transfers', title: 'Traslados aeropuerto', detail: 'Traslados de llegada y salida en El Cairo.' },
      { key: 'tips', title: 'Propinas (excepto guías)', detail: 'Propinas generales incluidas, salvo guías.' },
      { key: 'guide', title: 'Guía local FR / AR', detail: 'Guía local de habla francesa o árabe.' }
    ],
    exclusionsEyebrow: 'No Incluido',
    exclusionsTitle: 'El precio no incluye',
    exclusionsSubtitle: 'Revisa estos tres puntos excluidos antes de solicitar reserva.',
    exclusions: [
      {
        key: 'flights',
        title: 'Vuelos internacionales NO incluidos',
        detail:
          'Los vuelos internacionales de ida y vuelta no están incluidos en este circuito terrestre. Nuestra agencia puede cotizar vuelos aparte.',
        highlightFlights: true
      },
      { key: 'beverages', title: 'Bebidas', detail: 'Las bebidas durante las comidas y la cena-crucero no están incluidas.' },
      { key: 'insidePyramids', title: 'Entrada interior Pirámides', detail: 'Entradas al interior de las pirámides no incluidas.' }
    ],
    conditionsEyebrow: 'Normas y Suplementos',
    conditionsTitle: 'Condiciones y suplementos',
    conditionsSubtitle: 'Condiciones oficiales de reserva publicadas por Golden Group Travels.',
    conditions: [
      {
        id: 'min-group',
        title: 'Mínimo de grupo',
        emphasisValue: 'Mínimo 20 personas',
        detail: 'Las tarifas publicadas aplican a un grupo mínimo de 20 participantes.'
      },
      {
        id: 'small-group',
        title: 'Suplemento grupo reducido',
        emphasisValue: '+200 USD / persona (2 a 19 pers.)',
        detail: 'Para grupos de 2 a 19 personas se aplica un suplemento de +200 USD por persona.'
      },
      {
        id: 'monument-fees',
        title: 'Entradas a monumentos',
        emphasisValue: 'Sujeto a subida oficial',
        detail: 'Golden se reserva el derecho de aplicar un suplemento si aumentan las tarifas de entrada a monumentos.'
      },
      {
        id: 'gala-dinners',
        title: 'Cenas de gala obligatorias',
        emphasisValue: '24 de diciembre y 31 de diciembre',
        detail: 'Pueden exigirse cenas de gala obligatorias el 24 y 31 de diciembre (a verificar al reservar).'
      }
    ],
    formEyebrow: 'Solicitud Directa · Oficina Salé',
    formTitle: 'Solicitar reserva — Le Pouls Charmant du Caire',
    formSubtitle:
      'No realizamos cobros ni confirmaciones automáticas online. Prepara tu solicitud para verificar disponibilidad por WhatsApp.',
    travelDatesHeading: '1. Fechas preferidas (Temporada 1 dic. 2026 – 30 abr. 2027)',
    departDateLabel: 'Fecha de salida deseada',
    returnDateLabel: 'Fecha de regreso deseada',
    hotelChoiceLabel: '2. Hotel preferido',
    occupancyChoiceLabel: '3. Ocupación',
    occupancyDoubleLabel: 'Habitación Doble',
    occupancyTripleLabel: 'Habitación Triple',
    singleSupplementToggleLabel: 'Añadir Suplemento individual (uso individual)',
    singleSupplementToggleHint: 'Se muestra aparte del importe base del circuito.',
    travelersCountLabel: '4. Número de viajeros',
    groupTierMin20Badge: 'Tarifa base grupo (20+ pers.)',
    groupTierSmallBadge: 'Grupo reducido (2–19 pers.): +200 USD / pers.',
    groupTierSoloNote: '1 viajero: tarifa y suplemento individual a confirmar con la agencia',
    dateStatusMessages: {
      unset: 'Elige una fecha de salida para comprobar qué temporada aplica.',
      regular: 'Fechas dentro de Tarifas estándar (1 dic. 2026 – 30 abr. 2027).',
      special: 'Fechas dentro de Períodos especiales (Navidad/Año Nuevo o Semana Santa).',
      mixed_special:
        'Tus fechas tocan un período especial (17 dic.–4 ene. o 15 mar.–3 abr.): requiere verificación de tarifa especial.',
      outside: 'Fechas fuera del calendario publicado (1 dic. 2026 – 30 abr. 2027): tarifa bajo confirmación.',
      invalidRange: 'La fecha de regreso debe ser posterior o igual a la salida.'
    },
    galaWarningText:
      'Tus fechas incluyen el 24 o 31 de diciembre: pueden existir cenas de gala obligatorias a confirmar al reservar.',
    estimateSummaryHeading: 'Desglose orientativo publicado',
    baseRateLineLabel: 'Tarifa base por persona',
    singleSupplementLineLabel: 'Suplemento individual',
    smallGroupLineLabel: 'Suplemento grupo 2–19 pers.',
    unpricedFeesLineLabel: 'Conceptos no incluidos / variables',
    unpricedFeesValue: 'Vuelos excluidos · Gala 24/31 dic. y monumentos a verificar',
    outsideConfirmPriceLabel: 'Confirmación directa de agencia (fuera de temporada publicada)',
    indicativePerPersonLabel: 'Subtotal orientativo / pers.',
    indicativeGroupTotalLabel: 'Total orientativo grupo',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Tu nombre y apellidos',
    phoneLabel: 'Teléfono / WhatsApp',
    phonePlaceholder: 'Ej: +212 6XX-XXXXXX',
    notesLabel: 'Notas (opcional — ej. presupuesto de vuelo aparte)',
    notesPlaceholder: 'Ciudad de salida si deseas presupuesto de vuelos aparte...',
    submitBtn: 'Preparar consulta WhatsApp',
    whatsappBtn: 'Enviar por WhatsApp (0666-484815)',
    summaryReadyTitle: 'Resumen listo para Golden Group Travels',
    editBtn: 'Editar',
    noAutoConfirmDisclaimer: 'Sin pagos ni confirmaciones automáticas online. Confirmación real en nuestra agencia de Salé.',
    advisorCardLabel: 'Oficina Golden Group · Salé',
    advisorCardTitle: '¿Necesitas cotizar vuelos internacionales aparte?',
    advisorCallLabel: 'Llamar a la agencia',
    errors: {
      departRequired: 'Por favor, selecciona una fecha de salida.',
      returnInvalid: 'La fecha de regreso no puede ser anterior a la salida.',
      contactRequired: 'Introduce tu nombre completo y número de teléfono / WhatsApp.'
    }
  }
};
