import React, { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BedDouble,
  Building2,
  Bus,
  Calendar,
  Check,
  Compass,
  ExternalLink,
  Eye,
  FileCheck2,
  Info,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Ship,
  Users
} from 'lucide-react';
import { Language, istanbulBosphorusImg, makkahHaramImg } from '../assets/destinations';

gsap.registerPlugin(ScrollTrigger);

interface UmrahPackageSectionProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToPlanner?: () => void;
}

type UmrahPackageId = 'rajab' | 'istanbul';
type RoomOccupancyId = 'double' | 'triple' | 'quadruple' | 'quintuple';
type IstanbulHotelOptionId = 'opt1' | 'opt2' | 'opt3';

const ROOM_ORDER: RoomOccupancyId[] = ['double', 'triple', 'quadruple', 'quintuple'];
const ISTANBUL_HOTEL_ORDER: IstanbulHotelOptionId[] = ['opt1', 'opt2', 'opt3'];

/** Authoritative official starting fares per person from agency advertisements */
export const OFFICIAL_UMRAH_STARTING_PRICES = {
  rajab: {
    amountMad: 14500,
    frEs: '14 500 MAD',
    en: '14,500 MAD',
    ar: '14,500 درهم'
  },
  istanbul: {
    amountMad: 18500,
    frEs: '18 500 MAD',
    en: '18,500 MAD',
    ar: '18,500 درهم'
  }
} as const;

/** Verified per-person MAD prices from the official Omra Istanbul advertisement */
const ISTANBUL_PRICE_MATRIX: Record<RoomOccupancyId, Record<IstanbulHotelOptionId, string>> = {
  double: { opt1: '26 500 MAD', opt2: '28 500 MAD', opt3: '35 500 MAD' },
  triple: { opt1: '21 500 MAD', opt2: '23 500 MAD', opt3: '27 000 MAD' },
  quadruple: { opt1: '20 000 MAD', opt2: '22 000 MAD', opt3: '25 800 MAD' },
  quintuple: { opt1: OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs, opt2: '20 000 MAD', opt3: '24 000 MAD' }
};

interface ExcursionGroup {
  id: string;
  dayTitle: string;
  sourceArabicLabel: string;
  confirmBadge?: string;
  items: string[];
}

interface InclusionItem {
  key: 'ziyarat' | 'accommodation' | 'transport' | 'flights' | 'guidance' | 'visa';
  title: string;
  detail: string;
}

interface UmrahMultiPackageCopy {
  topSectionEyebrow: string;
  topSectionTitle: string;
  topSectionSubtitle: string;
  viewDetailsCta: string;
  activeDetailsBadge: string;
  reserveRequestCta: string;
  selectedPriceNote: string;
  perPersonLabel: string;
  durationLabel: string;
  datesLabel: string;
  startingFromLabel: string;
  rooms: Record<RoomOccupancyId, { label: string; capacity: string }>;
  rajab: {
    badge: string;
    title: string;
    arabicTitle: string;
    startingPrice: string;
    startingPriceBanner: string;
    startingPriceNote: string;
    duration: string;
    travelDates: string;
    datesNotice: string;
    summary: string;
    comparisonEyebrow: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
    colRoomType: string;
    colMadinahHotel: string;
    colMakkahHotel: string;
    colPrice: string;
    colAction: string;
    hotelConfirmNotice: string;
    priceConfirmNotice: string;
    selectRoomBtn: string;
    selectedRoomBtn: string;
    inclusionsEyebrow: string;
    inclusionsTitle: string;
    inclusions: InclusionItem[];
    conditionsTitle: string;
    conditionsBadge: string;
    conditions: string[];
    importantTitle: string;
    importantBadge: string;
    importantNotes: string[];
  };
  istanbul: {
    badge: string;
    title: string;
    arabicTitle: string;
    startingPrice: string;
    startingPriceBanner: string;
    startingPriceNote: string;
    duration: string;
    travelDates: string;
    departureDate: string;
    returnDate: string;
    summary: string;
    comparisonEyebrow: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
    hotelNamesBannerTitle: string;
    hotelNamesBannerText: string;
    colRoomType: string;
    hotelOptions: Record<
      IstanbulHotelOptionId,
      { label: string; startingHint: string; confirmNote: string }
    >;
    excursionsEyebrow: string;
    excursionsTitle: string;
    excursionsSubtitle: string;
    excursionsSourceNote: string;
    excursionGroups: ExcursionGroup[];
    inclusionsEyebrow: string;
    inclusionsTitle: string;
    inclusions: InclusionItem[];
    conditionsTitle: string;
    conditionsBadge: string;
    conditions: string[];
    importantTitle: string;
    importantBadge: string;
    importantNotes: string[];
  };
  formEyebrow: string;
  formTitlePrefix: string;
  formSubtitle: string;
  selectedPackageLabel: string;
  hotelOptionLabel: string;
  roomPrefLabel: string;
  selectedFareLabel: string;
  advertisedDatesLabel: string;
  departureCityLabel: string;
  departureCityPlaceholder: string;
  adultsLabel: string;
  childrenLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  submitBtn: string;
  summaryTitle: string;
  editBtn: string;
  whatsappSummaryBtn: string;
  noUploadNotice: string;
  advisorLabel: string;
  advisorTitle: string;
  advisorDisclaimer: string;
  advisorCallLabel: string;
  errors: {
    cityRequired: string;
    adultsMin: string;
    contactRequired: string;
  };
}

const UMRAH_PACKS: Record<Language, UmrahMultiPackageCopy> = {
  fr: {
    topSectionEyebrow: 'Programmes Officiels · Golden Group Travels',
    topSectionTitle: 'Nos Offres Omra Actuelles',
    topSectionSubtitle:
      'Deux programmes distincts avec leurs propres dates, itinéraires et grilles tarifaires par personne. Sélectionnez une offre pour afficher uniquement ses détails.',
    viewDetailsCta: 'Voir les détails',
    activeDetailsBadge: 'Détails affichés ci-dessous',
    reserveRequestCta: 'Demander une réservation',
    selectedPriceNote: 'Tarif sélectionné par personne',
    perPersonLabel: 'par personne',
    durationLabel: 'Durée & étapes',
    datesLabel: 'Dates annoncées',
    startingFromLabel: 'À partir de',
    rooms: {
      double: { label: 'Chambre Double', capacity: '2 personnes' },
      triple: { label: 'Chambre Triple', capacity: '3 personnes' },
      quadruple: { label: 'Chambre Quadruple', capacity: '4 personnes' },
      quintuple: { label: 'Chambre Quintuple', capacity: '5 personnes' }
    },
    rajab: {
      badge: 'Offre A · Programme Séparé',
      title: 'Omra Rajab · 2026 / 1448',
      arabicTitle: 'عمرة رجب · 2026 / 1448',
      startingPrice: OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs,
      startingPriceBanner: `Omra Rajab — À partir de ${OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs} / personne`,
      startingPriceNote: `Tarif officiel par personne annoncé sur l’affiche Omra Rajab (${OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs})`,
      duration: '4 nuits à Médine · 10 nuits à Makkah (14 nuits)',
      travelDates: 'Janvier 2027 (dates exactes à confirmer)',
      datesNotice:
        'Les visuels originaux Omra Rajab n’ayant pas été transmis dans cette session, les dates exactes, noms d’hôtels et tarifs détaillés par catégorie sont confirmés directement par notre agence à Salé.',
      summary:
        'Programme spirituel consacré à Médine (4 nuits) et Makkah (10 nuits), distinct de l’offre Omra Istanbul.',
      comparisonEyebrow: 'Omra Rajab · Catégories de Chambres',
      comparisonTitle: 'Tarifs & Hôtels · Omra Rajab',
      comparisonSubtitle:
        'Les tarifs par occupation et les noms exacts des hôtels à Médine et Makkah doivent être confirmés directement d’après l’affiche Omra Rajab.',
      colRoomType: 'Catégorie',
      colMadinahHotel: 'Hôtel à Médine (4 nuits)',
      colMakkahHotel: 'Hôtel à Makkah (10 nuits)',
      colPrice: 'Tarif par personne',
      colAction: 'Sélection',
      hotelConfirmNotice: 'Nom exact à confirmer avec l’agence (visuel Omra Rajab)',
      priceConfirmNotice: 'À confirmer (tarif d’appel dès 14 500 MAD)',
      selectRoomBtn: 'Choisir',
      selectedRoomBtn: 'Sélectionnée',
      inclusionsEyebrow: 'Omra Rajab · Prestations Annoncées',
      inclusionsTitle: 'Services Inclus',
      inclusions: [
        { key: 'ziyarat', title: 'Visites religieuses', detail: 'Visites guidées à Médine et à Makkah.' },
        { key: 'accommodation', title: 'Hôtels / Hébergement', detail: '4 nuits à Médine et 10 nuits à Makkah.' },
        { key: 'transport', title: 'Transport', detail: 'Transferts terrestres entre aéroports et Villes Saintes.' },
        { key: 'flights', title: 'Vols', detail: 'Billets d’avion aller-retour.' },
        { key: 'guidance', title: 'Encadrement', detail: 'Accompagnement par l’équipe Golden Group Travels.' },
        { key: 'visa', title: 'Visa', detail: 'Traitement du dossier de visa Omra (sans garantie automatique de délivrance).' }
      ],
      conditionsTitle: 'Conditions d’inscription',
      conditionsBadge: 'Omra Rajab · Formalités',
      conditions: [
        'Passeport valide au minimum 6 mois.',
        'Photographie d’identité récente sur fond blanc.',
        'Modalités de dépôt du passeport et d’inscription à confirmer directement auprès de notre bureau à Salé.'
      ],
      importantTitle: 'Informations importantes',
      importantBadge: 'Omra Rajab · Mentions',
      importantNotes: [
        'L’agence n’est pas responsable des bagages ni de l’excédent de poids.',
        'Les horaires de vol sont soumis à disponibilité.',
        'Disponibilité réelle des places et tarifs définitifs confirmés uniquement par l’agence.'
      ]
    },
    istanbul: {
      badge: 'Offre B · Combiné Istanbul & Lieux Saints',
      title: 'Omra Istanbul',
      arabicTitle: 'عمرة إسطنبول',
      startingPrice: OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs,
      startingPriceBanner: `Omra Istanbul — À partir de ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs} / personne`,
      startingPriceNote: `Tarif officiel le plus bas par personne (Chambre Quintuple · Option Hôtel 1 · ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs})`,
      duration: '4 nuits à Istanbul · 4 nuits à Médine · 5 nuits à Makkah (13 nuits)',
      travelDates: '3 – 16 décembre 2026',
      departureDate: 'Départ annoncé : 3 décembre 2026',
      returnDate: 'Retour annoncé : 16 décembre 2026',
      summary:
        'Séjour combiné comprenant 4 nuits à Istanbul avec excursions listées, 4 nuits à Médine et 5 nuits à Makkah, du 3 au 16 décembre 2026.',
      comparisonEyebrow: 'Omra Istanbul · Grille Tarifaire Officielle',
      comparisonTitle: 'Tarifs par Personne et par Combinaison Hôtelière',
      comparisonSubtitle:
        'Les tarifs ci-dessous s’appliquent par personne selon l’occupation de la chambre et l’option hôtelière choisie. Cliquez sur une cellule pour sélectionner l’option correspondante.',
      hotelNamesBannerTitle: 'Noms exacts des hôtels à confirmer sur la fiche officielle',
      hotelNamesBannerText:
        'Les trois combinaisons (Istanbul · Médine · Makkah) correspondent exactement aux trois colonnes de prix de l’annonce. Les visuels détaillés des hôtels n’étant pas joints à cette session, chaque colonne porte sa référence tarifaire exacte et les noms précis d’hôtels restent à confirmer par nos conseillers sans estimation.',
      colRoomType: 'Catégorie de chambre',
      hotelOptions: {
        opt1: {
          label: 'Option Hôtel 1',
          startingHint: 'Dès 18 500 MAD',
          confirmNote: 'Istanbul · Médine · Makkah (noms à confirmer)'
        },
        opt2: {
          label: 'Option Hôtel 2',
          startingHint: 'Dès 20 000 MAD',
          confirmNote: 'Istanbul · Médine · Makkah (noms à confirmer)'
        },
        opt3: {
          label: 'Option Hôtel 3',
          startingHint: 'Dès 24 000 MAD',
          confirmNote: 'Istanbul · Médine · Makkah (noms à confirmer)'
        }
      },
      excursionsEyebrow: 'Omra Istanbul · 4 nuits à Istanbul',
      excursionsTitle: 'Programme des excursions à Istanbul',
      excursionsSubtitle:
        'Activités et visites telles qu’elles figurent dans l’annonce officielle de l’agence, sans horaires ni suppléments inventés.',
      excursionsSourceNote:
        'Note d’exactitude : l’annonce source répète le libellé arabe « اليوم الثاني » sur le troisième bloc d’excursions ; ce groupe est présenté ci-dessous tel quel avec mention à confirmer auprès de l’agence.',
      excursionGroups: [
        {
          id: 'day-1',
          dayTitle: 'Premier jour listé',
          sourceArabicLabel: 'اليوم الأول',
          items: [
            'Croisière sur le Bosphore.',
            'Visite de la Mosquée Sultan Ahmed et du quartier Sainte-Sophie (Hagia Sophia).',
            'Visite de Venezia Mall.'
          ]
        },
        {
          id: 'day-2',
          dayTitle: 'Deuxième jour listé',
          sourceArabicLabel: 'اليوم الثاني',
          items: [
            'Visite de la Mosquée Eyüp Sultan / Abou Ayyub al-Ansari.',
            'Visite de Balat.',
            'Visite de la Mosquée Süleymaniye.',
            'Visite du Bazar Égyptien.',
            'Visite de Venezia Mall.'
          ]
        },
        {
          id: 'day-3-source-repeat',
          dayTitle: 'Troisième groupe d’excursions listé',
          sourceArabicLabel: 'اليوم الثاني',
          confirmBadge: 'Libellé « اليوم الثاني » répété dans l’annonce — ordre à confirmer',
          items: [
            'Visite d’Istanbul asiatique.',
            'Visite de la Mosquée de Çamlıca et de la colline d’Arus (tel qu’indiqué dans l’annonce).',
            'Visite du secteur de la Tour de Léandre (Maiden’s Tower).',
            'Visite de la place d’Üsküdar.',
            'Visite de la zone côtière de Çamlıca.'
          ]
        }
      ],
      inclusionsEyebrow: 'Omra Istanbul · Prestations Annoncées',
      inclusionsTitle: 'Services Inclus',
      inclusions: [
        { key: 'ziyarat', title: 'Visites religieuses', detail: 'Visites religieuses et culturelles incluses au programme.' },
        { key: 'accommodation', title: 'Hôtels / Hébergement', detail: '4 nuits à Istanbul, 4 nuits à Médine et 5 nuits à Makkah.' },
        { key: 'transport', title: 'Transport', detail: 'Transports terrestres assurés sur place selon le programme.' },
        { key: 'flights', title: 'Vols', detail: 'Billets d’avion aller-retour.' },
        { key: 'guidance', title: 'Encadrement', detail: 'Encadrement et accompagnement durant le voyage.' },
        { key: 'visa', title: 'Visa', detail: 'Démarches de visa incluses au forfait (sous réserve des autorités).' }
      ],
      conditionsTitle: 'Conditions d’inscription',
      conditionsBadge: 'Documents requis à l’inscription',
      conditions: [
        'Passeport d’une validité d’au moins six (6) mois.',
        'Photographie d’identité sur fond blanc.',
        'Dépôt du passeport sans paiement du montant de la réservation (condition telle qu’annoncée dans le visuel officiel).'
      ],
      importantTitle: 'Informations importantes',
      importantBadge: 'Mentions officielles de l’annonce',
      importantNotes: [
        'L’agence n’est pas responsable des bagages ni de l’excédent de poids.',
        'Les horaires de vol sont soumis à disponibilité.',
        'Les places et tarifs s’entendent sous réserve de confirmation en direct par l’agence.'
      ]
    },
    formEyebrow: 'Demande Directe Agence · Sans Widget Affilié',
    formTitlePrefix: 'Demander une réservation',
    formSubtitle:
      'Aucun téléchargement de passeport ni paiement en ligne n’est collecté ici. Préparez votre message avec le programme, l’option choisie et les dates pour confirmer en direct via WhatsApp.',
    selectedPackageLabel: 'Programme sélectionné',
    hotelOptionLabel: 'Option hôtelière',
    roomPrefLabel: 'Catégorie de chambre',
    selectedFareLabel: 'Tarif indicatif sélectionné',
    advertisedDatesLabel: 'Dates annoncées',
    departureCityLabel: 'Ville de départ',
    departureCityPlaceholder: 'Ex : Casablanca, Rabat-Salé, Tanger...',
    adultsLabel: 'Adultes',
    childrenLabel: 'Enfants',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Votre nom et prénom',
    phoneLabel: 'Téléphone / WhatsApp',
    phonePlaceholder: 'Ex : +212 6XX-XXXXXX',
    notesLabel: 'Précisions (optionnel)',
    notesPlaceholder: 'Questions sur les hôtels, chambres familiales ou disponibilités...',
    submitBtn: 'Préparer ma demande WhatsApp',
    summaryTitle: 'Récapitulatif de Votre Demande',
    editBtn: 'Modifier',
    whatsappSummaryBtn: 'Envoyer sur WhatsApp (0666-484815)',
    noUploadNotice:
      'Confirmation directe avec notre bureau à Salé. Aucune pièce d’identité demandée sur le site.',
    advisorLabel: 'Bureau Dédié · Salé',
    advisorTitle: 'Conseiller Golden Group',
    advisorDisclaimer:
      'Les deux programmes restent soumis à la vérification des disponibilités en direct avec notre équipe avant toute validation définitive.',
    advisorCallLabel: 'Appeler l’agence',
    errors: {
      cityRequired: 'Veuillez indiquer votre ville de départ.',
      adultsMin: 'Au moins 1 voyageur adulte est requis.',
      contactRequired: 'Veuillez renseigner votre nom complet et votre numéro WhatsApp/téléphone.'
    }
  },
  ar: {
    topSectionEyebrow: 'البرامج الرسمية · جولدن جروب للسفر',
    topSectionTitle: 'برامج العمرة الرسمية الحالية',
    topSectionSubtitle:
      'برنامجان منفصلان تماماً ولكل منهما تواريخه وأسعاره وفنادقه الخاصة. اختر أحد العرضين لعرض تفاصيله المستقلة فقط.',
    viewDetailsCta: 'عرض التفاصيل',
    activeDetailsBadge: 'التفاصيل معروضة أدناه',
    reserveRequestCta: 'طلب حجز',
    selectedPriceNote: 'السعر المختار للشخص',
    perPersonLabel: 'للشخص الواحد',
    durationLabel: 'المدة والبرنامج',
    datesLabel: 'التواريخ المعلنة',
    startingFromLabel: 'ابتداءً من',
    rooms: {
      double: { label: 'غرفة ثنائية (Double)', capacity: 'شخصان' },
      triple: { label: 'غرفة ثلاثية (Triple)', capacity: '3 أشخاص' },
      quadruple: { label: 'غرفة رباعية (Quadruple)', capacity: '4 أشخاص' },
      quintuple: { label: 'غرفة خماسية (Quintuple)', capacity: '5 أشخاص' }
    },
    rajab: {
      badge: 'العرض أ · برنامج مستقل',
      title: 'عمرة رجب · 2026 / 1448',
      arabicTitle: 'عمرة رجب · 2026 / 1448',
      startingPrice: OFFICIAL_UMRAH_STARTING_PRICES.rajab.ar,
      startingPriceBanner: `عمرة رجب — ابتداءً من ${OFFICIAL_UMRAH_STARTING_PRICES.rajab.ar} / للشخص`,
      startingPriceNote: `السعر الابتدائي المعلن للشخص في إعلان عمرة رجب (${OFFICIAL_UMRAH_STARTING_PRICES.rajab.ar})`,
      duration: '4 ليالٍ بالمدينة المنورة · 10 ليالٍ بمكة المكرمة (14 ليلة)',
      travelDates: 'يناير 2027 (التواريخ الدقيقة قيد التأكيد)',
      datesNotice:
        'نظراً لعدم إرفاق صور إعلان عمرة رجب الأصلية في هذه الجلسة، يتم تأكيد التواريخ الدقيقة وأسماء الفنادق وأسعار كل غرفة مباشرة عبر وكالتنا بسلا.',
      summary: 'برنامج عمرة مخصص للمدينة المنورة (4 ليالٍ) ومكة المكرمة (10 ليالٍ)، منفصل عن برنامج عمرة إسطنبول.',
      comparisonEyebrow: 'عمرة رجب · فئات الغرف',
      comparisonTitle: 'الأسعار والفنادق · عمرة رجب',
      comparisonSubtitle:
        'تُؤكد أسماء الفنادق بالمدينة ومكة والأسعار التفصيلية لكل فئة مباشرة وفق منشورات عمرة رجب الرسمية.',
      colRoomType: 'فئة الغرفة',
      colMadinahHotel: 'فندق المدينة (4 ليالٍ)',
      colMakkahHotel: 'فندق مكة (10 ليالٍ)',
      colPrice: 'السعر للشخص',
      colAction: 'الاختيار',
      hotelConfirmNotice: 'اسم الفندق قيد التأكيد من الوكالة',
      priceConfirmNotice: 'قيد التأكيد (يبدأ من 14,500 درهم)',
      selectRoomBtn: 'اختيار',
      selectedRoomBtn: 'مختارة',
      inclusionsEyebrow: 'عمرة رجب · الخدمات',
      inclusionsTitle: 'الخدمات المشمولة',
      inclusions: [
        { key: 'ziyarat', title: 'المزارات الدينية', detail: 'زيارات إرشادية بالمدينة المنورة ومكة المكرمة.' },
        { key: 'accommodation', title: 'الفنادق / الإقامة', detail: '4 ليالٍ بالمدينة المنورة و10 ليالٍ بمكة المكرمة.' },
        { key: 'transport', title: 'النقل', detail: 'التنقلات بين المطارات والمدينتين المقدستين.' },
        { key: 'flights', title: 'الطيران', detail: 'تذاكر الطيران ذهاباً وإياباً.' },
        { key: 'guidance', title: 'المرافقة والتأطير', detail: 'مرافقة وإشراف من فريق جولدن جروب.' },
        { key: 'visa', title: 'التأشيرة', detail: 'إجراءات تأشيرة العمرة (حسب ضوابط الجهات المختصة).' }
      ],
      conditionsTitle: 'شروط التسجيل',
      conditionsBadge: 'عمرة رجب · الوثائق',
      conditions: [
        'جواز سفر ساري المفعول لمدة لا تقل عن 6 أشهر.',
        'صورة شخصية بخلفية بيضاء.',
        'تُؤكد تفاصيل إيداع الجواز ومواعيد التسجيل مباشرة مع وكالتنا بسلا.'
      ],
      importantTitle: 'معلومات هامة',
      importantBadge: 'عمرة رجب · تنبيهات',
      importantNotes: [
        'الوكالة غير مسؤولة عن الأمتعة والوزن الزائد.',
        'مواقيت الرحلات تخضع للتوفر.',
        'تأكيد المقاعد والأسعار النهائية يتم حصرياً لدى فريق الوكالة.'
      ]
    },
    istanbul: {
      badge: 'العرض ب · عمرة إسطنبول والأماكن المقدسة',
      title: 'عمرة إسطنبول',
      arabicTitle: 'عمرة إسطنبول',
      startingPrice: OFFICIAL_UMRAH_STARTING_PRICES.istanbul.ar,
      startingPriceBanner: `عمرة إسطنبول — ابتداءً من ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.ar} / للشخص`,
      startingPriceNote: `أقل سعر معلن للشخص الواحد (الغرفة الخماسية · خيار الفنادق 1 · ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.ar})`,
      duration: '4 ليالٍ بإسطنبول · 4 ليالٍ بالمدينة المنورة · 5 ليالٍ بمكة المكرمة (13 ليلة)',
      travelDates: 'من 3 إلى 16 ديسمبر 2026',
      departureDate: 'تاريخ الذهاب المعلن: 3 ديسمبر 2026',
      returnDate: 'تاريخ العودة المعلن: 16 ديسمبر 2026',
      summary:
        'برنامج يجمع بين 4 ليالٍ في إسطنبول مع برنامج الجولات المعلن، و4 ليالٍ بالمدينة المنورة و5 ليالٍ بمكة المكرمة، من 3 إلى 16 ديسمبر 2026.',
      comparisonEyebrow: 'عمرة إسطنبول · جدول الأسعار المعتمد',
      comparisonTitle: 'الأسعار للشخص الواحد حسب الغرفة وخيار الفنادق',
      comparisonSubtitle:
        'الأسعار الموضحة أدناه هي أسعار الشخص الواحد حسب نوع الغرفة. اضغط على الخانة لاختيار خيار الفنادق ونوع الغرفة.',
      hotelNamesBannerTitle: 'أسماء الفنادق الدقيقة قيد التأكيد من الملصق الرسمي',
      hotelNamesBannerText:
        'تمثل الأعمدة الثلاثة خيارات الفنادق الثلاثة (إسطنبول · المدينة · مكة) المطابقة لجدول الأسعار المعلن. وبما أن صورة أسماء الفنادق التفصيلية لم تُرفق في هذه الجلسة، تظل أسماء الفنادق قيد التأكيد مع الوكالة دون أي تخمين.',
      colRoomType: 'فئة الغرفة',
      hotelOptions: {
        opt1: {
          label: 'خيار الفنادق 1',
          startingHint: 'ابتداءً من 18,500 درهم',
          confirmNote: 'إسطنبول · المدينة · مكة (الأسماء قيد التأكيد)'
        },
        opt2: {
          label: 'خيار الفنادق 2',
          startingHint: 'ابتداءً من 20,000 درهم',
          confirmNote: 'إسطنبول · المدينة · مكة (الأسماء قيد التأكيد)'
        },
        opt3: {
          label: 'خيار الفنادق 3',
          startingHint: 'ابتداءً من 24,000 درهم',
          confirmNote: 'إسطنبول · المدينة · مكة (الأسماء قيد التأكيد)'
        }
      },
      excursionsEyebrow: 'عمرة إسطنبول · 4 ليالٍ بإسطنبول',
      excursionsTitle: 'برنامج الجولات السياحية في إسطنبول',
      excursionsSubtitle:
        'الأنشطة والزيارات كما وردت في الإعلان الرسمي دون إضافة مواقيت أو تفاصيل غير معلنة.',
      excursionsSourceNote:
        'ملاحظة دقة المصدر: يكرر الإعلان الأصلي عبارة «اليوم الثاني» في المجموعة الثالثة من الجولات؛ لذلك تُعرض أدناه مع التنبيه إلى تأكيد الترتيب من الوكالة.',
      excursionGroups: [
        {
          id: 'day-1',
          dayTitle: 'اليوم الأول',
          sourceArabicLabel: 'اليوم الأول',
          items: [
            'رحلة بحرية في مضيق البوسفور.',
            'زيارة جامع السلطان أحمد ومنطقة آيا صوفيا.',
            'زيارة فينيسيا مول (Venezia Mall).'
          ]
        },
        {
          id: 'day-2',
          dayTitle: 'اليوم الثاني',
          sourceArabicLabel: 'اليوم الثاني',
          items: [
            'زيارة مسجد الصحابي الجليل أبي أيوب الأنصاري (أيوب سلطان).',
            'زيارة حي بلاط (Balat).',
            'زيارة جامع السليمانية.',
            'زيارة السوق المصري.',
            'زيارة فينيسيا مول (Venezia Mall).'
          ]
        },
        {
          id: 'day-3-source-repeat',
          dayTitle: 'المجموعة الثالثة المدرجة',
          sourceArabicLabel: 'اليوم الثاني',
          confirmBadge: 'وردت في الإعلان بعنوان «اليوم الثاني» — يرجى تأكيد الترقيم',
          items: [
            'زيارة إسطنبول الآسيوية.',
            'زيارة جامع تشامليجا وتلة العرائس كما ورد في الإعلان.',
            'زيارة محيط برج الفتاة (Maiden’s Tower).',
            'زيارة ساحة أوسكودار (Üsküdar).',
            'زيارة المنطقة الساحلية تشامليجا.'
          ]
        }
      ],
      inclusionsEyebrow: 'عمرة إسطنبول · الخدمات',
      inclusionsTitle: 'الخدمات المشمولة',
      inclusions: [
        { key: 'ziyarat', title: 'المزارات الدينية', detail: 'المزارات الدينية والجولات المدرجة في البرنامج.' },
        { key: 'accommodation', title: 'الفنادق / الإقامة', detail: '4 ليالٍ بإسطنبول و4 ليالٍ بالمدينة و5 ليالٍ بمكة.' },
        { key: 'transport', title: 'النقل', detail: 'النقل البري المشمول طوال مراحل البرنامج.' },
        { key: 'flights', title: 'الطيران', detail: 'تذاكر السفر بالطائرة ذهاباً وإياباً.' },
        { key: 'guidance', title: 'المرافقة والتأطير', detail: 'مرافقة وإرشاد من فريق الوكالة طوال الرحلة.' },
        { key: 'visa', title: 'التأشيرة', detail: 'إجراءات التأشيرة المشمولة بالعرض.' }
      ],
      conditionsTitle: 'شروط التسجيل',
      conditionsBadge: 'الوثائق المطلوبة للتسجيل',
      conditions: [
        'جواز سفر لا تقل صلاحيته عن 6 أشهر.',
        'صورة شمسية بخلفية بيضاء.',
        'إيداع جواز السفر بدون دفع مبلغ الحجز (وفق الشرط المعلن في الإعلان الرسمي).'
      ],
      importantTitle: 'معلومات هامة',
      importantBadge: 'تنبيهات الإعلان الرسمي',
      importantNotes: [
        'الوكالة غير مسؤولة عن الأمتعة والوزن الزائد.',
        'مواقيت الطيران رهينة بالتوفر.',
        'التوافر الفعلي للمقاعد يُؤكَّد مباشرة لدى الوكالة.'
      ]
    },
    formEyebrow: 'حجز واستفسار مباشر · الوكالة',
    formTitlePrefix: 'طلب حجز',
    formSubtitle:
      'لا يتم رفع جوازات السفر أو الدفع عبر الموقع. أرسل اختيارك للبرنامج والغرفة والتواريخ عبر واتساب للتأكيد المباشر.',
    selectedPackageLabel: 'البرنامج المختار',
    hotelOptionLabel: 'خيار الفنادق',
    roomPrefLabel: 'فئة الغرفة',
    selectedFareLabel: 'السعر المحدد للشخص',
    advertisedDatesLabel: 'التواريخ المعلنة',
    departureCityLabel: 'مدينة المغادرة',
    departureCityPlaceholder: 'مثال: الدار البيضاء، الرباط - سلا، طنجة...',
    adultsLabel: 'البالغون',
    childrenLabel: 'الأطفال',
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'الاسم والنسب',
    phoneLabel: 'الهاتف / واتساب',
    phonePlaceholder: 'مثال: +212 6XX-XXXXXX',
    notesLabel: 'ملاحظات إضافية (اختياري)',
    notesPlaceholder: 'استفسار عن الفنادق أو الغرف العائلية...',
    submitBtn: 'تجهيز طلب الواتساب',
    summaryTitle: 'ملخص طلب الحجز',
    editBtn: 'تعديل',
    whatsappSummaryBtn: 'إرسال عبر واتساب (0666-484815)',
    noUploadNotice: 'تأكيد مباشر عبر وكالتنا بسلا دون جمع وثائق أو مدفوعات إلكترونية.',
    advisorLabel: 'مكتب سلا',
    advisorTitle: 'مستشار جولدن جروب',
    advisorDisclaimer: 'يخضع التوفر الفعلي للتحقق المباشر مع فريقنا قبل التثبيت النهائي.',
    advisorCallLabel: 'الاتصال بالوكالة',
    errors: {
      cityRequired: 'يرجى إدخال مدينة المغادرة.',
      adultsMin: 'يجب تحديد مسافر بالغ واحد على الأقل.',
      contactRequired: 'يرجى إدخال الاسم الكامل ورقم الهاتف / واتساب.'
    }
  },
  en: {
    topSectionEyebrow: 'Official Programs · Golden Group Travels',
    topSectionTitle: 'Our Official Umrah Packages',
    topSectionSubtitle:
      'Two separate programs with their own schedules, hotel tiers, and per-person pricing. Select either card to view its dedicated details only.',
    viewDetailsCta: 'View Details',
    activeDetailsBadge: 'Details shown below',
    reserveRequestCta: 'Request Reservation',
    selectedPriceNote: 'Selected fare per person',
    perPersonLabel: 'per person',
    durationLabel: 'Duration & stays',
    datesLabel: 'Advertised dates',
    startingFromLabel: 'Starting at',
    rooms: {
      double: { label: 'Double Room', capacity: '2 guests' },
      triple: { label: 'Triple Room', capacity: '3 guests' },
      quadruple: { label: 'Quadruple Room', capacity: '4 guests' },
      quintuple: { label: 'Quintuple Room', capacity: '5 guests' }
    },
    rajab: {
      badge: 'Package A · Separate Program',
      title: 'Omra Rajab · 2026 / 1448',
      arabicTitle: 'عمرة رجب · 2026 / 1448',
      startingPrice: OFFICIAL_UMRAH_STARTING_PRICES.rajab.en,
      startingPriceBanner: `Omra Rajab — From ${OFFICIAL_UMRAH_STARTING_PRICES.rajab.en} / person`,
      startingPriceNote: `Official per-person starting fare on the Omra Rajab advertisement (${OFFICIAL_UMRAH_STARTING_PRICES.rajab.en})`,
      duration: '4 nights in Madinah · 10 nights in Makkah (14 nights)',
      travelDates: 'January 2027 (exact dates to confirm)',
      datesNotice:
        'Since the original Omra Rajab screenshots were not uploaded in this session, exact departure dates, hotel names, and per-room rates are confirmed directly by our Salé office.',
      summary:
        'Dedicated Madinah (4 nights) and Makkah (10 nights) spiritual program, kept separate from Omra Istanbul.',
      comparisonEyebrow: 'Omra Rajab · Room Tiers',
      comparisonTitle: 'Rooms & Hotels · Omra Rajab',
      comparisonSubtitle:
        'Exact hotel names and individual room-category rates must be confirmed directly from the official Omra Rajab flyer.',
      colRoomType: 'Room Category',
      colMadinahHotel: 'Madinah Hotel (4 nights)',
      colMakkahHotel: 'Makkah Hotel (10 nights)',
      colPrice: 'Price per person',
      colAction: 'Select',
      hotelConfirmNotice: 'Exact hotel name pending agency confirmation',
      priceConfirmNotice: 'To be confirmed (starting from 14,500 MAD)',
      selectRoomBtn: 'Select',
      selectedRoomBtn: 'Selected',
      inclusionsEyebrow: 'Omra Rajab · Included Services',
      inclusionsTitle: 'Package Inclusions',
      inclusions: [
        { key: 'ziyarat', title: 'Religious Visits', detail: 'Guided religious visits in Madinah and Makkah.' },
        { key: 'accommodation', title: 'Hotels / Accommodation', detail: '4 nights in Madinah and 10 nights in Makkah.' },
        { key: 'transport', title: 'Transportation', detail: 'Ground transfers between airports and the Holy Cities.' },
        { key: 'flights', title: 'Flights', detail: 'Round-trip airline tickets.' },
        { key: 'guidance', title: 'Guidance', detail: 'Dedicated guidance from Golden Group Travels.' },
        { key: 'visa', title: 'Visa', detail: 'Umrah visa application handling.' }
      ],
      conditionsTitle: 'Registration Conditions',
      conditionsBadge: 'Omra Rajab · Requirements',
      conditions: [
        'Passport with at least six months of validity.',
        'Recent passport photograph with a white background.',
        'Passport submission and booking registration terms confirmed directly with our Salé office.'
      ],
      importantTitle: 'Important Information',
      importantBadge: 'Omra Rajab · Notices',
      importantNotes: [
        'The agency is not responsible for luggage and excess weight.',
        'Flight timing is subject to availability.',
        'Actual availability and final pricing are confirmed only by the agency.'
      ]
    },
    istanbul: {
      badge: 'Package B · Istanbul & Holy Cities',
      title: 'Omra Istanbul',
      arabicTitle: 'عمرة إسطنبول',
      startingPrice: OFFICIAL_UMRAH_STARTING_PRICES.istanbul.en,
      startingPriceBanner: `Omra Istanbul — From ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.en} / person`,
      startingPriceNote: `Lowest advertised rate per person (Quintuple Room · Hotel Option 1 · ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.en})`,
      duration: '4 nights in Istanbul · 4 nights in Madinah · 5 nights in Makkah (13 nights)',
      travelDates: 'December 3 – December 16, 2026',
      departureDate: 'Advertised departure: December 3, 2026',
      returnDate: 'Advertised return: December 16, 2026',
      summary:
        'Combined itinerary featuring 4 nights in Istanbul with excursions, 4 nights in Madinah, and 5 nights in Makkah from December 3 to December 16, 2026.',
      comparisonEyebrow: 'Omra Istanbul · Verified Pricing Matrix',
      comparisonTitle: 'Per-Person Rates by Room & Hotel Combination',
      comparisonSubtitle:
        'All prices are per person according to room occupancy and hotel combination. Click any price cell to pre-select that option.',
      hotelNamesBannerTitle: 'Exact hotel names pending visual confirmation',
      hotelNamesBannerText:
        'The three columns match the three official Istanbul · Madinah · Makkah hotel combinations on the advertisement. Because the hotel-names image was not attached in this session, exact property names remain flagged for advisor confirmation without guessing.',
      colRoomType: 'Room Category',
      hotelOptions: {
        opt1: {
          label: 'Hotel Option 1',
          startingHint: 'From 18,500 MAD',
          confirmNote: 'Istanbul · Madinah · Makkah (names to confirm)'
        },
        opt2: {
          label: 'Hotel Option 2',
          startingHint: 'From 20,000 MAD',
          confirmNote: 'Istanbul · Madinah · Makkah (names to confirm)'
        },
        opt3: {
          label: 'Hotel Option 3',
          startingHint: 'From 24,000 MAD',
          confirmNote: 'Istanbul · Madinah · Makkah (names to confirm)'
        }
      },
      excursionsEyebrow: 'Omra Istanbul · 4 Nights in Istanbul',
      excursionsTitle: 'Istanbul Excursion Program',
      excursionsSubtitle:
        'Activities listed exactly as advertised, without invented schedules, ticket prices, or extra stops.',
      excursionsSourceNote:
        'Source accuracy note: the advertisement repeats the Arabic label «اليوم الثاني» for the third excursion block; it is shown below as an additional listed group pending confirmation.',
      excursionGroups: [
        {
          id: 'day-1',
          dayTitle: 'First Listed Day',
          sourceArabicLabel: 'اليوم الأول',
          items: [
            'Bosphorus cruise.',
            'Visit to Sultan Ahmed Mosque and Hagia Sophia area.',
            'Visit to Venezia Mall.'
          ]
        },
        {
          id: 'day-2',
          dayTitle: 'Second Listed Day',
          sourceArabicLabel: 'اليوم الثاني',
          items: [
            'Visit to Eyüp Sultan / Abu Ayyub al-Ansari Mosque.',
            'Visit to Balat.',
            'Visit to Süleymaniye Mosque.',
            'Visit to the Egyptian Bazaar.',
            'Visit to Venezia Mall.'
          ]
        },
        {
          id: 'day-3-source-repeat',
          dayTitle: 'Additional Listed Excursion Group',
          sourceArabicLabel: 'اليوم الثاني',
          confirmBadge: 'Source repeats «اليوم الثاني» — day numbering to confirm',
          items: [
            'Visit to Asian Istanbul.',
            'Visit to Çamlıca Mosque and Arus Hill as written in the advertisement.',
            'Visit to the Maiden’s Tower area.',
            'Visit to Üsküdar Square.',
            'Visit to the Çamlıca coastal area.'
          ]
        }
      ],
      inclusionsEyebrow: 'Omra Istanbul · Included Services',
      inclusionsTitle: 'Package Inclusions',
      inclusions: [
        { key: 'ziyarat', title: 'Religious Visits', detail: 'Included religious visits and listed excursions.' },
        { key: 'accommodation', title: 'Hotels / Accommodation', detail: '4 nights in Istanbul, 4 nights in Madinah, and 5 nights in Makkah.' },
        { key: 'transport', title: 'Transportation', detail: 'Scheduled ground transfers throughout the itinerary.' },
        { key: 'flights', title: 'Flights', detail: 'Round-trip flight tickets.' },
        { key: 'guidance', title: 'Guidance', detail: 'Dedicated accompaniment throughout the journey.' },
        { key: 'visa', title: 'Visa', detail: 'Visa processing included in the package.' }
      ],
      conditionsTitle: 'Registration Conditions',
      conditionsBadge: 'Required Documents & Terms',
      conditions: [
        'A passport with at least six months of validity.',
        'A passport-style photograph with a white background.',
        'Passport submission without payment of the booking amount, as stated in the official advertisement.'
      ],
      importantTitle: 'Important Information',
      importantBadge: 'Official Notices',
      importantNotes: [
        'The agency is not responsible for luggage and excess weight.',
        'Flight timing is subject to availability.',
        'Availability is verified directly with our team before confirmation.'
      ]
    },
    formEyebrow: 'Direct Agency Inquiry · No Affiliate Widgets',
    formTitlePrefix: 'Request Reservation',
    formSubtitle:
      'No passport uploads or online payments are collected here. Submit your selected package, option, and travel details to message our Salé desk directly on WhatsApp.',
    selectedPackageLabel: 'Selected Package',
    hotelOptionLabel: 'Hotel Option',
    roomPrefLabel: 'Room Category',
    selectedFareLabel: 'Selected Per-Person Fare',
    advertisedDatesLabel: 'Advertised Dates',
    departureCityLabel: 'Departure City',
    departureCityPlaceholder: 'e.g., Casablanca, Rabat-Salé, Tangier...',
    adultsLabel: 'Adults',
    childrenLabel: 'Children',
    nameLabel: 'Full Name',
    namePlaceholder: 'Your full name',
    phoneLabel: 'Phone / WhatsApp',
    phonePlaceholder: 'e.g., +212 6XX-XXXXXX',
    notesLabel: 'Additional Notes (optional)',
    notesPlaceholder: 'Questions on hotels, connecting rooms, or departure airport...',
    submitBtn: 'Prepare WhatsApp Inquiry',
    summaryTitle: 'Your Inquiry Summary',
    editBtn: 'Edit',
    whatsappSummaryBtn: 'Send via WhatsApp (0666-484815)',
    noUploadNotice:
      'Direct agency confirmation in Salé. No sensitive ID files or payment card details are collected online.',
    advisorLabel: 'Salé Desk',
    advisorTitle: 'Golden Group Advisor',
    advisorDisclaimer:
      'Availability for both Umrah programs is confirmed directly with our advisors prior to final booking.',
    advisorCallLabel: 'Call Agency',
    errors: {
      cityRequired: 'Please enter your departure city.',
      adultsMin: 'At least 1 adult traveler is required.',
      contactRequired: 'Please enter your full name and phone/WhatsApp number.'
    }
  },
  es: {
    topSectionEyebrow: 'Programas Oficiales · Golden Group Travels',
    topSectionTitle: 'Nuestras Ofertas Oficiales de Omra',
    topSectionSubtitle:
      'Dos programas separados con sus propias fechas, hoteles y tarifas por persona. Elige una tarjeta para consultar únicamente sus detalles.',
    viewDetailsCta: 'Ver detalles',
    activeDetailsBadge: 'Detalles mostrados abajo',
    reserveRequestCta: 'Solicitar reserva',
    selectedPriceNote: 'Tarifa seleccionada por persona',
    perPersonLabel: 'por persona',
    durationLabel: 'Duración y etapas',
    datesLabel: 'Fechas anunciadas',
    startingFromLabel: 'Desde',
    rooms: {
      double: { label: 'Habitación Doble', capacity: '2 personas' },
      triple: { label: 'Habitación Triple', capacity: '3 personas' },
      quadruple: { label: 'Habitación Cuádruple', capacity: '4 personas' },
      quintuple: { label: 'Habitación Quíntuple', capacity: '5 personas' }
    },
    rajab: {
      badge: 'Programa A · Oferta Independiente',
      title: 'Omra Rajab · 2026 / 1448',
      arabicTitle: 'عمرة رجب · 2026 / 1448',
      startingPrice: OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs,
      startingPriceBanner: `Omra Rajab — Desde ${OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs} / persona`,
      startingPriceNote: `Tarifa oficial por persona anunciada en Omra Rajab (${OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs})`,
      duration: '4 noches en Medina · 10 noches en La Meca (14 noches)',
      travelDates: 'Enero 2027 (fechas exactas por confirmar)',
      datesNotice:
        'Al no haberse adjuntado las imágenes originales de Omra Rajab en esta sesión, las fechas exactas, nombres de hoteles y tarifas por categoría se confirman directamente con nuestra agencia en Salé.',
      summary:
        'Programa espiritual dedicado a Medina (4 noches) y La Meca (10 noches), independiente de Omra Istanbul.',
      comparisonEyebrow: 'Omra Rajab · Tipos de Habitación',
      comparisonTitle: 'Tarifas y Hoteles · Omra Rajab',
      comparisonSubtitle:
        'Los nombres exactos de los hoteles y tarifas por ocupación se confirman según el cartel oficial de Omra Rajab.',
      colRoomType: 'Categoría',
      colMadinahHotel: 'Hotel en Medina (4 noches)',
      colMakkahHotel: 'Hotel en La Meca (10 noches)',
      colPrice: 'Tarifa por persona',
      colAction: 'Elegir',
      hotelConfirmNotice: 'Nombre exacto del hotel por confirmar con la agencia',
      priceConfirmNotice: 'Por confirmar (base desde 14 500 MAD)',
      selectRoomBtn: 'Elegir',
      selectedRoomBtn: 'Seleccionada',
      inclusionsEyebrow: 'Omra Rajab · Servicios Incluidos',
      inclusionsTitle: 'Servicios del Programa',
      inclusions: [
        { key: 'ziyarat', title: 'Visitas religiosas', detail: 'Visitas guiadas en Medina y La Meca.' },
        { key: 'accommodation', title: 'Hoteles / Alojamiento', detail: '4 noches en Medina y 10 noches en La Meca.' },
        { key: 'transport', title: 'Transporte', detail: 'Traslados terrestres entre aeropuertos y Ciudades Santas.' },
        { key: 'flights', title: 'Vuelos', detail: 'Billetes de avión ida y vuelta.' },
        { key: 'guidance', title: 'Acompañamiento', detail: 'Guías de Golden Group Travels.' },
        { key: 'visa', title: 'Visado', detail: 'Tramitación de visado Omra.' }
      ],
      conditionsTitle: 'Condiciones de inscripción',
      conditionsBadge: 'Omra Rajab · Requisitos',
      conditions: [
        'Pasaporte con validez mínima de 6 meses.',
        'Fotografía tamaño pasaporte sobre fondo blanco.',
        'Condiciones de entrega del pasaporte e inscripción confirmadas directamente en nuestra oficina en Salé.'
      ],
      importantTitle: 'Información importante',
      importantBadge: 'Omra Rajab · Avisos',
      importantNotes: [
        'La agencia no se hace responsable del equipaje ni del exceso de peso.',
        'Los horarios de vuelo están sujetos a disponibilidad.',
        'Disponibilidad y tarifas finales confirmadas directamente por la agencia.'
      ]
    },
    istanbul: {
      badge: 'Programa B · Estambul y Ciudades Santas',
      title: 'Omra Istanbul',
      arabicTitle: 'عمرة إسطنبول',
      startingPrice: OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs,
      startingPriceBanner: `Omra Istanbul — Desde ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs} / persona`,
      startingPriceNote: `Tarifa mínima anunciada por persona (Habitación Quíntuple · Opción Hotel 1 · ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs})`,
      duration: '4 noches en Estambul · 4 noches en Medina · 5 noches en La Meca (13 noches)',
      travelDates: '3 – 16 de diciembre de 2026',
      departureDate: 'Salida anunciada: 3 de diciembre de 2026',
      returnDate: 'Regreso anunciado: 16 de diciembre de 2026',
      summary:
        'Itinerario combinado de 4 noches en Estambul con excursiones, 4 noches en Medina y 5 noches en La Meca, del 3 al 16 de diciembre de 2026.',
      comparisonEyebrow: 'Omra Istanbul · Tabla Oficial de Tarifas',
      comparisonTitle: 'Tarifas por Persona según Habitación y Opción Hotelera',
      comparisonSubtitle:
        'Precios por persona según ocupación. Selecciona cualquier tarifa para elegir esa combinación de hotel y habitación.',
      hotelNamesBannerTitle: 'Nombres exactos de hoteles pendientes de confirmación visual',
      hotelNamesBannerText:
        'Las tres columnas corresponden exactamente a las tres combinaciones hoteleras (Estambul · Medina · La Meca) del anuncio. Al no haberse adjuntado la imagen de hoteles, los nombres exactos quedan pendientes de confirmación directa sin suposiciones.',
      colRoomType: 'Habitación',
      hotelOptions: {
        opt1: {
          label: 'Opción Hotel 1',
          startingHint: 'Desde 18 500 MAD',
          confirmNote: 'Estambul · Medina · La Meca (nombres por confirmar)'
        },
        opt2: {
          label: 'Opción Hotel 2',
          startingHint: 'Desde 20 000 MAD',
          confirmNote: 'Estambul · Medina · La Meca (nombres por confirmar)'
        },
        opt3: {
          label: 'Opción Hotel 3',
          startingHint: 'Desde 24 000 MAD',
          confirmNote: 'Estambul · Medina · La Meca (nombres por confirmar)'
        }
      },
      excursionsEyebrow: 'Omra Istanbul · 4 noches en Estambul',
      excursionsTitle: 'Programa de excursiones en Estambul',
      excursionsSubtitle:
        'Actividades exactamente como aparecen en el anuncio oficial, sin horarios ni paradas inventadas.',
      excursionsSourceNote:
        'Nota de fidelidad: el anuncio original repite la etiqueta árabe «اليوم الثاني» en el tercer grupo; se muestra aquí como grupo adicional pendiente de confirmación.',
      excursionGroups: [
        {
          id: 'day-1',
          dayTitle: 'Primer día listado',
          sourceArabicLabel: 'اليوم الأول',
          items: [
            'Crucero por el Bósforo.',
            'Visita a la Mezquita del Sultán Ahmed y zona de Santa Sofía.',
            'Visita a Venezia Mall.'
          ]
        },
        {
          id: 'day-2',
          dayTitle: 'Segundo día listado',
          sourceArabicLabel: 'اليوم الثاني',
          items: [
            'Visita a la Mezquita de Eyüp Sultan / Abu Ayyub al-Ansari.',
            'Visita a Balat.',
            'Visita a la Mezquita de Süleymaniye.',
            'Visita al Bazar Egipcio.',
            'Visita a Venezia Mall.'
          ]
        },
        {
          id: 'day-3-source-repeat',
          dayTitle: 'Grupo adicional de excursiones',
          sourceArabicLabel: 'اليوم الثاني',
          confirmBadge: 'Etiqueta «اليوم الثاني» repetida en el anuncio — orden por confirmar',
          items: [
            'Visita al Estambul asiático.',
            'Visita a la Mezquita de Çamlıca y colina de Arus (según el anuncio).',
            'Visita a la zona de la Torre de la Doncella.',
            'Visita a la plaza de Üsküdar.',
            'Visita a la zona costera de Çamlıca.'
          ]
        }
      ],
      inclusionsEyebrow: 'Omra Istanbul · Servicios Incluidos',
      inclusionsTitle: 'Servicios del Programa',
      inclusions: [
        { key: 'ziyarat', title: 'Visitas religiosas', detail: 'Visitas religiosas y excursiones incluidas.' },
        { key: 'accommodation', title: 'Hoteles / Alojamiento', detail: '4 noches en Estambul, 4 noches en Medina y 5 noches en La Meca.' },
        { key: 'transport', title: 'Transporte', detail: 'Traslados terrestres incluidos según programa.' },
        { key: 'flights', title: 'Vuelos', detail: 'Billetes de avión ida y vuelta.' },
        { key: 'guidance', title: 'Acompañamiento', detail: 'Acompañamiento durante todo el viaje.' },
        { key: 'visa', title: 'Visado', detail: 'Gestión de visado incluida.' }
      ],
      conditionsTitle: 'Condiciones de inscripción',
      conditionsBadge: 'Requisitos Oficiales',
      conditions: [
        'Pasaporte con validez mínima de seis meses.',
        'Fotografía tamaño pasaporte con fondo blanco.',
        'Entrega del pasaporte sin pago del importe de la reserva, tal como indica el anuncio oficial.'
      ],
      importantTitle: 'Información importante',
      importantBadge: 'Avisos Oficiales',
      importantNotes: [
        'La agencia no es responsable del equipaje ni del exceso de peso.',
        'Los horarios de vuelo están sujetos a disponibilidad.',
        'Disponibilidad verificada directamente con nuestra oficina.'
      ]
    },
    formEyebrow: 'Solicitud Directa · Sin Widgets de Afiliación',
    formTitlePrefix: 'Solicitar reserva',
    formSubtitle:
      'No se solicitan pasaportes ni pagos aquí. Prepara tu consulta con el programa, opción elegida y fechas por WhatsApp.',
    selectedPackageLabel: 'Programa seleccionado',
    hotelOptionLabel: 'Opción hotelera',
    roomPrefLabel: 'Tipo de habitación',
    selectedFareLabel: 'Tarifa por persona seleccionada',
    advertisedDatesLabel: 'Fechas anunciadas',
    departureCityLabel: 'Ciudad de salida',
    departureCityPlaceholder: 'Ej: Casablanca, Rabat-Salé, Tánger...',
    adultsLabel: 'Adultos',
    childrenLabel: 'Niños',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Tu nombre completo',
    phoneLabel: 'Teléfono / WhatsApp',
    phonePlaceholder: 'Ej: +212 6XX-XXXXXX',
    notesLabel: 'Notas adicionales (opcional)',
    notesPlaceholder: 'Dudas sobre hoteles o habitaciones...',
    submitBtn: 'Preparar solicitud WhatsApp',
    summaryTitle: 'Resumen de Tu Solicitud',
    editBtn: 'Editar',
    whatsappSummaryBtn: 'Enviar por WhatsApp (0666-484815)',
    noUploadNotice:
      'Confirmación directa con nuestra agencia en Salé. Sin subida de pasaportes ni cobros en línea.',
    advisorLabel: 'Oficina en Salé',
    advisorTitle: 'Asesor Golden Group',
    advisorDisclaimer:
      'La disponibilidad real de ambos programas se confirma directamente con nuestro equipo antes de formalizar.',
    advisorCallLabel: 'Llamar a la agencia',
    errors: {
      cityRequired: 'Indica tu ciudad de salida.',
      adultsMin: 'Se requiere al menos 1 viajero adulto.',
      contactRequired: 'Introduce tu nombre completo y teléfono/WhatsApp.'
    }
  }
};

const INCLUSION_ICONS = {
  ziyarat: Compass,
  accommodation: Building2,
  transport: Bus,
  flights: Plane,
  guidance: Users,
  visa: FileCheck2
} as const;

export const UmrahPackageSection: React.FC<UmrahPackageSectionProps> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToPlanner
}) => {
  const copy = UMRAH_PACKS[lang];
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);

  const [activePackage, setActivePackage] = useState<UmrahPackageId>('istanbul');
  const [selectedRoom, setSelectedRoom] = useState<RoomOccupancyId>('quintuple');
  const [selectedIstanbulHotel, setSelectedIstanbulHotel] =
    useState<IstanbulHotelOptionId>('opt1');

  const [departureCity, setDepartureCity] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setErrors([]);
  }, [lang, activePackage]);

  // Bidirectional ScrollTrigger animations on native HTML editorial blocks (zero once: true)
  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)'
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.isDesktop);

        container.querySelectorAll<HTMLElement>('.ggt-umrah-reveal-left').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.25, x: isDesktop ? -26 : -10 },
            {
              opacity: 1,
              x: 0,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 93%', end: 'top 66%', scrub: 0.5 }
            }
          );
        });

        container.querySelectorAll<HTMLElement>('.ggt-umrah-reveal-right').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.25, x: isDesktop ? 26 : 10 },
            {
              opacity: 1,
              x: 0,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 93%', end: 'top 66%', scrub: 0.5 }
            }
          );
        });

        container.querySelectorAll<HTMLElement>('.ggt-umrah-card-3d').forEach((card) => {
          gsap.fromTo(
            card,
            isDesktop
              ? { opacity: 0.35, y: 24, scale: 0.96, rotateX: 4, transformPerspective: 1100 }
              : { opacity: 0.4, y: 14, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top 94%', end: 'top 68%', scrub: 0.5 }
            }
          );
        });
      }
    );

    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [activePackage]);

  const scrollToElement = (el: HTMLElement | null) => {
    if (!el) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headerEl = document.querySelector('header');
    const offset = headerEl ? headerEl.getBoundingClientRect().height + 16 : 112;
    const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  };

  const openPackageDetails = (pkg: UmrahPackageId) => {
    setActivePackage(pkg);
    setReady(false);
    setErrors([]);
    window.requestAnimationFrame(() => scrollToElement(detailsRef.current));
  };

  const selectPackageAndScrollToForm = (
    pkg: UmrahPackageId,
    roomId?: RoomOccupancyId,
    hotelOptId?: IstanbulHotelOptionId
  ) => {
    setActivePackage(pkg);
    if (roomId) setSelectedRoom(roomId);
    if (hotelOptId) setSelectedIstanbulHotel(hotelOptId);
    setReady(false);
    setErrors([]);
    window.requestAnimationFrame(() => scrollToElement(formSectionRef.current));
  };

  const buildDirectWhatsappUrl = (pkg: UmrahPackageId) => {
    const roomLabel = copy.rooms[selectedRoom].label;
    if (pkg === 'istanbul') {
      const hotelLabel = copy.istanbul.hotelOptions[selectedIstanbulHotel].label;
      const fare = ISTANBUL_PRICE_MATRIX[selectedRoom][selectedIstanbulHotel];
      const lines = [
        'Bonjour Golden Group Travels,',
        'Je souhaite demander une réservation / disponibilité pour :',
        `• Programme : Omra Istanbul — À partir de ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs} / personne (عمرة إسطنبول · 4 nuits Istanbul · 4 nuits Médine · 5 nuits Makkah)`,
        `• Option hôtelière : ${hotelLabel} (noms exacts des hôtels à confirmer)`,
        `• Catégorie de chambre : ${roomLabel} (${fare} / personne)`,
        `• Dates annoncées : ${copy.istanbul.travelDates}`
      ];
      return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
    }

    const lines = [
      'Bonjour Golden Group Travels,',
      'Je souhaite demander une réservation / disponibilité pour :',
      `• Programme : Omra Rajab — À partir de ${OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs} / personne (عمرة رجب · 4 nuits Médine · 10 nuits Makkah)`,
      `• Catégorie de chambre : ${roomLabel} (tarif de base : ${OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs} / personne, détails par catégorie à confirmer)`,
      `• Dates annoncées : ${copy.rajab.travelDates}`
    ];
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildSubmittedWhatsappUrl = () => {
    const roomLabel = copy.rooms[selectedRoom].label;
    const isIstanbul = activePackage === 'istanbul';
    const programLine = isIstanbul
      ? `Omra Istanbul — À partir de ${OFFICIAL_UMRAH_STARTING_PRICES.istanbul.frEs} / personne (4N Istanbul · 4N Médine · 5N Makkah)`
      : `Omra Rajab — À partir de ${OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs} / personne (4N Médine · 10N Makkah)`;

    const lines = [
      'Bonjour Golden Group Travels,',
      'Je souhaite obtenir une confirmation directe pour :',
      `• Programme : ${programLine}`,
      isIstanbul
        ? `• Option hôtelière : ${copy.istanbul.hotelOptions[selectedIstanbulHotel].label} (${ISTANBUL_PRICE_MATRIX[selectedRoom][selectedIstanbulHotel]} / personne)`
        : `• Tarif de référence : À partir de ${OFFICIAL_UMRAH_STARTING_PRICES.rajab.frEs} / personne (noms d’hôtels et grille par chambre à confirmer)`,
      `• Catégorie de chambre : ${roomLabel}`,
      `• Dates annoncées : ${isIstanbul ? copy.istanbul.travelDates : copy.rajab.travelDates}`,
      `• Ville de départ : ${departureCity.trim()}`,
      `• Voyageurs : ${adults} ${copy.adultsLabel}${
        children > 0 ? `, ${children} ${copy.childrenLabel}` : ''
      }`,
      `• Nom complet : ${fullName.trim()}`,
      `• Téléphone / WhatsApp : ${phone.trim()}`,
      notes.trim() ? `• Précisions : ${notes.trim()}` : ''
    ].filter(Boolean);

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!departureCity.trim()) errs.push(copy.errors.cityRequired);
    if (adults < 1) errs.push(copy.errors.adultsMin);
    if (!fullName.trim() || !phone.trim()) errs.push(copy.errors.contactRequired);
    setErrors(errs);
    setReady(errs.length === 0);
  };

  const currentIstanbulFare = ISTANBUL_PRICE_MATRIX[selectedRoom][selectedIstanbulHotel];

  return (
    <div ref={rootRef} className="space-y-12 sm:space-y-16">
      {/* 1. TOP TWO SEPARATE PACKAGE CARDS: Omra Rajab (14 500 MAD) & Omra Istanbul (18 500 MAD) */}
      <section className="space-y-6">
        <div className="ggt-umrah-reveal-left space-y-2 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
            {copy.topSectionEyebrow}
          </div>
          <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
            {copy.topSectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {copy.topSectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* PACKAGE CARD A — OMRA RAJAB */}
          <article
            className={`ggt-umrah-card-3d rounded-3xl overflow-hidden flex flex-col bg-[#071429] text-[#f5ede0] transition-all ${
              activePackage === 'rajab'
                ? 'border-2 border-[#d1a847] shadow-[0_24px_60px_rgba(4,12,28,0.34)]'
                : 'border border-[#d1a847]/45 shadow-[0_16px_42px_rgba(4,12,28,0.2)]'
            }`}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={makkahHaramImg}
                alt={copy.rajab.title}
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent"
              />
              <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{copy.rajab.badge}</span>
                </span>
                {activePackage === 'rajab' && (
                  <span className="px-3 py-1 rounded-lg bg-[#d1a847] text-[#0b1d3a] text-[10px] font-bold uppercase tracking-[0.14em]">
                    {copy.activeDetailsBadge}
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
                <div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                  >
                    {copy.rajab.arabicTitle}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-white">
                    {copy.rajab.title}
                  </h3>
                </div>
                <div className="text-end shrink-0 bg-[#0b1d3a]/95 border border-[#d1a847]/65 rounded-xl px-3.5 py-2">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                    {copy.startingFromLabel}
                  </div>
                  <div className="font-serif-crest text-lg sm:text-xl font-bold text-[#fceda2] tabular-nums">
                    {copy.rajab.startingPrice}
                  </div>
                  <div className="text-[10px] text-slate-300">/ {copy.perPersonLabel}</div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 px-3.5 py-2 text-xs font-bold text-[#fceda2] tracking-wide">
                  {copy.rajab.startingPriceBanner}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {copy.rajab.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {copy.durationLabel}
                    </div>
                    <div className="font-semibold text-white mt-0.5">{copy.rajab.duration}</div>
                  </div>
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {copy.datesLabel}
                    </div>
                    <div className="font-semibold text-white mt-0.5">{copy.rajab.travelDates}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openPackageDetails('rajab')}
                  className={`flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 min-h-[46px] rounded-xl text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                    activePackage === 'rajab'
                      ? 'bg-[#d1a847] text-[#0b1d3a] hover:bg-[#fceda2]'
                      : 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/70 hover:bg-[#132d56]'
                  }`}
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>{copy.viewDetailsCta}</span>
                </button>

                <a
                  href={buildDirectWhatsappUrl('rajab')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-4 min-h-[46px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <span>{copy.reserveRequestCta}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </article>

          {/* PACKAGE CARD B — OMRA ISTANBUL */}
          <article
            className={`ggt-umrah-card-3d rounded-3xl overflow-hidden flex flex-col bg-[#071429] text-[#f5ede0] transition-all ${
              activePackage === 'istanbul'
                ? 'border-2 border-[#d1a847] shadow-[0_24px_60px_rgba(4,12,28,0.34)]'
                : 'border border-[#d1a847]/45 shadow-[0_16px_42px_rgba(4,12,28,0.2)]'
            }`}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={istanbulBosphorusImg}
                alt={copy.istanbul.title}
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent"
              />
              <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{copy.istanbul.badge}</span>
                </span>
                {activePackage === 'istanbul' && (
                  <span className="px-3 py-1 rounded-lg bg-[#d1a847] text-[#0b1d3a] text-[10px] font-bold uppercase tracking-[0.14em]">
                    {copy.activeDetailsBadge}
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
                <div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                  >
                    {copy.istanbul.arabicTitle}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-white">
                    {copy.istanbul.title}
                  </h3>
                </div>
                <div className="text-end shrink-0 bg-[#0b1d3a]/95 border border-[#d1a847]/65 rounded-xl px-3.5 py-2">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                    {copy.startingFromLabel}
                  </div>
                  <div className="font-serif-crest text-lg sm:text-xl font-bold text-[#fceda2] tabular-nums">
                    {copy.istanbul.startingPrice}
                  </div>
                  <div className="text-[10px] text-slate-300">/ {copy.perPersonLabel}</div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 px-3.5 py-2 text-xs font-bold text-[#fceda2] tracking-wide">
                  {copy.istanbul.startingPriceBanner}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {copy.istanbul.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {copy.durationLabel}
                    </div>
                    <div className="font-semibold text-white mt-0.5">{copy.istanbul.duration}</div>
                  </div>
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {copy.datesLabel}
                    </div>
                    <div className="font-semibold text-[#fceda2] mt-0.5">
                      {copy.istanbul.travelDates}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openPackageDetails('istanbul')}
                  className={`flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 min-h-[46px] rounded-xl text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                    activePackage === 'istanbul'
                      ? 'bg-[#d1a847] text-[#0b1d3a] hover:bg-[#fceda2]'
                      : 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/70 hover:bg-[#132d56]'
                  }`}
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>{copy.viewDetailsCta}</span>
                </button>

                <a
                  href={buildDirectWhatsappUrl('istanbul')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-4 min-h-[46px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <span>{copy.reserveRequestCta}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 2. DEDICATED SINGLE-PACKAGE DETAIL CONTAINER (STRICTLY NEVER MIXED) */}
      <div id="umrah-package-details" ref={detailsRef} className="scroll-mt-28 space-y-12">
        {/* Clean Package View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-[#ede1ce] border border-[#d1a847]/55">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActivePackage('rajab')}
              className={`flex-1 sm:flex-initial px-5 min-h-[44px] rounded-xl text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                activePackage === 'rajab'
                  ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] shadow-sm'
                  : 'text-[#0b1d3a] hover:bg-[#fcf9f2]'
              }`}
            >
              {copy.rajab.startingPriceBanner}
            </button>
            <button
              type="button"
              onClick={() => setActivePackage('istanbul')}
              className={`flex-1 sm:flex-initial px-5 min-h-[44px] rounded-xl text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                activePackage === 'istanbul'
                  ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] shadow-sm'
                  : 'text-[#0b1d3a] hover:bg-[#fcf9f2]'
              }`}
            >
              {copy.istanbul.startingPriceBanner}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 text-[11px] font-semibold text-[#2c405e]">
            <Info className="w-3.5 h-3.5 text-[#9a7220]" />
            <span>
              {activePackage === 'istanbul'
                ? `${copy.istanbul.title} · ${copy.istanbul.travelDates}`
                : `${copy.rajab.title} · ${copy.rajab.travelDates}`}
            </span>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* PACKAGE B DETAILS: OMRA ISTANBUL ONLY                                */}
        {/* ==================================================================== */}
        {activePackage === 'istanbul' ? (
          <div key="pkg-istanbul" className="space-y-12">
            {/* Hero Detail Header for Omra Istanbul */}
            <section className="rounded-3xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847]/70 overflow-hidden shadow-[0_22px_54px_rgba(4,12,28,0.28)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-0.5 bg-[#0b1d3a] min-h-[240px]">
                  <div className="relative overflow-hidden min-h-[150px]">
                    <img
                      src={istanbulBosphorusImg}
                      alt="Istanbul — Omra Istanbul"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2.5 start-3 px-2.5 py-1 rounded-md bg-[#071429]/85 border border-[#d1a847]/60 text-[10px] font-semibold uppercase tracking-wider text-[#fceda2]">
                      Istanbul · 4 nuits
                    </div>
                  </div>
                  <div className="relative overflow-hidden min-h-[150px]">
                    <img
                      src={makkahHaramImg}
                      alt="Makkah & Madinah — Omra Istanbul"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2.5 start-3 px-2.5 py-1 rounded-md bg-[#071429]/85 border border-[#d1a847]/60 text-[10px] font-semibold uppercase tracking-wider text-[#fceda2]">
                      Médine 4N · Makkah 5N
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d1a847]">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>{copy.istanbul.badge}</span>
                      </span>
                      <span
                        lang="ar"
                        dir="rtl"
                        className="font-arabic-calligraphy text-2xl text-[#fceda2]"
                      >
                        {copy.istanbul.arabicTitle}
                      </span>
                    </div>

                    <h3 className="font-serif-crest text-3xl sm:text-4xl font-semibold text-white">
                      {copy.istanbul.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {copy.istanbul.summary}
                    </p>

                    <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/65 text-xs font-bold text-[#fceda2]">
                      {copy.istanbul.startingPriceBanner}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/50 p-4">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                          {copy.startingFromLabel}
                        </div>
                        <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                          {copy.istanbul.startingPrice}
                        </div>
                        <div className="text-[11px] font-semibold text-[#d1a847] mt-0.5">
                          / {copy.perPersonLabel}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          {copy.istanbul.startingPriceNote}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/50 p-4">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                          {copy.durationLabel}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white mt-1 leading-snug">
                          {copy.istanbul.duration}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/50 p-4">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                          {copy.datesLabel}
                        </div>
                        <div className="text-xs font-semibold text-[#fceda2] mt-1 flex items-start gap-1.5">
                          <Calendar className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                          <span>
                            {copy.istanbul.departureDate}
                            <br />
                            {copy.istanbul.returnDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => selectPackageAndScrollToForm('istanbul')}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                    >
                      <span>{copy.reserveRequestCta}</span>
                      <ArrowRight className={`w-4 h-4 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                    <a
                      href={buildDirectWhatsappUrl('istanbul')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors"
                    >
                      <span>WhatsApp · {displayPhone}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Exact 12-Cell Hotel & Room Price Table for Omra Istanbul */}
            <section className="space-y-5">
              <div className="ggt-umrah-reveal-left space-y-1.5 max-w-3xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                  {copy.istanbul.comparisonEyebrow}
                </div>
                <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
                  {copy.istanbul.comparisonTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#2c405e]">
                  {copy.istanbul.comparisonSubtitle}
                </p>
              </div>

              {/* Transparent Hotel Combination Notice */}
              <div className="rounded-2xl bg-[#ede1ce]/80 border border-[#d1a847]/65 p-4 sm:p-5 flex items-start gap-3 text-xs text-[#0b1d3a]">
                <AlertTriangle className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">{copy.istanbul.hotelNamesBannerTitle}</div>
                  <p className="text-[#2c405e] leading-relaxed">
                    {copy.istanbul.hotelNamesBannerText}
                  </p>
                </div>
              </div>

              {/* Desktop Responsive 3-Option x 4-Room Price Table */}
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#d1a847]/60 bg-[#fcf9f2] shadow-[0_14px_34px_rgba(11,29,58,0.08)]">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                      <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                        {copy.istanbul.colRoomType}
                      </th>
                      {ISTANBUL_HOTEL_ORDER.map((optId) => {
                        const opt = copy.istanbul.hotelOptions[optId];
                        return (
                          <th key={optId} className="py-4 px-5 text-center font-semibold">
                            <div className="uppercase tracking-[0.14em] text-[#fceda2]">
                              {opt.label}
                            </div>
                            <div className="text-[11px] font-normal text-slate-300 mt-0.5">
                              {opt.confirmNote}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d1a847]/25">
                    {ROOM_ORDER.map((roomId) => {
                      const room = copy.rooms[roomId];
                      return (
                        <tr key={roomId} className="hover:bg-[#f5ede0]/55 transition-colors">
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-2.5">
                              <BedDouble className="w-4 h-4 text-[#c59b38] shrink-0" />
                              <div>
                                <div className="font-semibold text-[#0b1d3a]">{room.label}</div>
                                <div className="text-[11px] text-[#2c405e]">{room.capacity}</div>
                              </div>
                            </div>
                          </td>
                          {ISTANBUL_HOTEL_ORDER.map((optId) => {
                            const price = ISTANBUL_PRICE_MATRIX[roomId][optId];
                            const isCellSelected =
                              selectedRoom === roomId && selectedIstanbulHotel === optId;
                            return (
                              <td key={optId} className="py-3 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedRoom(roomId);
                                    setSelectedIstanbulHotel(optId);
                                  }}
                                  className={`w-full py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                                    isCellSelected
                                      ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                                      : 'bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border-[#d1a847]/45 font-semibold'
                                  }`}
                                >
                                  <div className="font-serif-crest text-base sm:text-lg tabular-nums">
                                    {price}
                                  </div>
                                  <div
                                    className={`text-[10px] uppercase tracking-wider mt-0.5 ${
                                      isCellSelected ? 'text-[#d1a847]' : 'text-[#2c405e]'
                                    }`}
                                  >
                                    {copy.perPersonLabel}
                                  </div>
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Price Cards */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {ROOM_ORDER.map((roomId) => {
                  const room = copy.rooms[roomId];
                  return (
                    <div
                      key={roomId}
                      className="ggt-umrah-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/50 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25">
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-4 h-4 text-[#c59b38]" />
                          <span className="font-serif-crest text-base font-semibold text-[#0b1d3a]">
                            {room.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-[#9a7220]">
                          {room.capacity}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {ISTANBUL_HOTEL_ORDER.map((optId) => {
                          const opt = copy.istanbul.hotelOptions[optId];
                          const price = ISTANBUL_PRICE_MATRIX[roomId][optId];
                          const isCellSelected =
                            selectedRoom === roomId && selectedIstanbulHotel === optId;
                          return (
                            <button
                              key={optId}
                              type="button"
                              onClick={() =>
                                selectPackageAndScrollToForm('istanbul', roomId, optId)
                              }
                              className={`flex items-center justify-between gap-3 px-3.5 min-h-[46px] rounded-xl border text-start transition-colors cursor-pointer ${
                                isCellSelected
                                  ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847]'
                                  : 'bg-[#f5ede0]/75 text-[#0b1d3a] border-[#d1a847]/50'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-bold">{opt.label}</div>
                                <div
                                  className={`text-[10px] truncate ${
                                    isCellSelected ? 'text-slate-300' : 'text-[#2c405e]'
                                  }`}
                                >
                                  {opt.confirmNote}
                                </div>
                              </div>
                              <div className="font-serif-crest text-base font-bold tabular-nums shrink-0">
                                {price}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Selection Summary Bar */}
              <div className="rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5 text-xs">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                    {copy.selectedPriceNote}
                  </div>
                  <div className="font-semibold text-white text-sm sm:text-base">
                    {copy.istanbul.hotelOptions[selectedIstanbulHotel].label} ·{' '}
                    {copy.rooms[selectedRoom].label} —{' '}
                    <span className="text-[#fceda2] font-serif-crest text-lg tabular-nums">
                      {currentIstanbulFare}
                    </span>{' '}
                    ({copy.perPersonLabel})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => selectPackageAndScrollToForm('istanbul')}
                  className="inline-flex items-center justify-center gap-2 px-5 min-h-[44px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors shrink-0 cursor-pointer"
                >
                  <span>{copy.reserveRequestCta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </section>

            {/* Programme des excursions à Istanbul (Screenshot 4) */}
            <section className="space-y-6">
              <div className="ggt-umrah-reveal-left space-y-2 max-w-3xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                  {copy.istanbul.excursionsEyebrow}
                </div>
                <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
                  {copy.istanbul.excursionsTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#2c405e]">
                  {copy.istanbul.excursionsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                {copy.istanbul.excursionGroups.map((grp, idx) => (
                  <article
                    key={grp.id}
                    className="ggt-umrah-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-6 shadow-[0_12px_30px_rgba(11,29,58,0.06)] flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#d1a847]/30">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                            0{idx + 1} · Istanbul
                          </div>
                          <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a] mt-0.5">
                            {grp.dayTitle}
                          </h4>
                        </div>
                        <span
                          lang="ar"
                          dir="rtl"
                          className="px-3 py-1 rounded-lg bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/60 font-arabic-calligraphy text-base shrink-0"
                        >
                          {grp.sourceArabicLabel}
                        </span>
                      </div>

                      {grp.confirmBadge && (
                        <div className="rounded-xl bg-amber-50 border border-amber-300 px-3 py-2 flex items-start gap-2 text-[11px] text-amber-950 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>{grp.confirmBadge}</span>
                        </div>
                      )}

                      <ul className="space-y-2.5">
                        {grp.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0b1d3a] leading-relaxed"
                          >
                            {idx === 0 && i === 0 ? (
                              <Ship className="w-4 h-4 text-[#c59b38] shrink-0 mt-0.5" />
                            ) : (
                              <Check className="w-4 h-4 text-[#c59b38] shrink-0 mt-0.5" />
                            )}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>

              <div className="rounded-xl bg-[#ede1ce]/70 border border-[#d1a847]/50 px-4 py-3 flex items-start gap-2.5 text-xs text-[#2c405e]">
                <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                <span>{copy.istanbul.excursionsSourceNote}</span>
              </div>
            </section>

            {/* Inclusions (6 Official Categories) */}
            <section className="space-y-6">
              <div className="ggt-umrah-reveal-left space-y-1.5 max-w-3xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                  {copy.istanbul.inclusionsEyebrow}
                </div>
                <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
                  {copy.istanbul.inclusionsTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {copy.istanbul.inclusions.map((item) => {
                  const ItemIcon = INCLUSION_ICONS[item.key];
                  return (
                    <div
                      key={item.key}
                      className="ggt-umrah-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/45 p-5 shadow-[0_10px_28px_rgba(11,29,58,0.06)] flex items-start gap-4"
                    >
                      <span className="w-11 h-11 rounded-xl bg-[#071429] border border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0">
                        <ItemIcon className="w-5 h-5" />
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-serif-crest text-base sm:text-lg font-semibold text-[#0b1d3a]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#2c405e] leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Conditions d'inscription & Informations importantes */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="ggt-umrah-reveal-left rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-6 sm:p-7 shadow-[0_12px_30px_rgba(11,29,58,0.06)] space-y-4">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {copy.istanbul.conditionsBadge}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a]">
                    {copy.istanbul.conditionsTitle}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {copy.istanbul.conditions.map((cond, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#2c405e] leading-relaxed"
                    >
                      <Check className="w-4 h-4 text-[#c59b38] shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ggt-umrah-reveal-right rounded-2xl bg-[#ede1ce]/75 border border-[#d1a847]/60 p-6 sm:p-7 shadow-[0_12px_30px_rgba(11,29,58,0.06)] space-y-4">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {copy.istanbul.importantBadge}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a]">
                    {copy.istanbul.importantTitle}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {copy.istanbul.importantNotes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#0b1d3a] leading-relaxed"
                    >
                      <AlertTriangle className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        ) : (
          /* ================================================================== */
          /* PACKAGE A DETAILS: OMRA RAJAB ONLY                                 */
          /* ================================================================== */
          <div key="pkg-rajab" className="space-y-12">
            {/* Hero Detail Header for Omra Rajab */}
            <section className="rounded-3xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847]/70 overflow-hidden shadow-[0_22px_54px_rgba(4,12,28,0.28)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 relative min-h-[250px] overflow-hidden">
                  <img
                    src={makkahHaramImg}
                    alt={copy.rajab.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/35 lg:to-[#071429]"
                  />
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8">
                    <span className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fceda2]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847]" />
                      <span>{copy.rajab.badge}</span>
                    </span>
                    <div
                      lang="ar"
                      dir="rtl"
                      className="font-arabic-calligraphy text-3xl sm:text-4xl text-[#fceda2] pt-10"
                    >
                      {copy.rajab.arabicTitle}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif-crest text-3xl sm:text-4xl font-semibold text-white">
                      {copy.rajab.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {copy.rajab.summary}
                    </p>

                    <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/65 text-xs font-bold text-[#fceda2]">
                      {copy.rajab.startingPriceBanner}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/50 p-4">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                          {copy.startingFromLabel}
                        </div>
                        <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                          {copy.rajab.startingPrice}
                        </div>
                        <div className="text-[11px] font-semibold text-[#d1a847] mt-0.5">
                          / {copy.perPersonLabel}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          {copy.rajab.startingPriceNote}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/50 p-4">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                          {copy.durationLabel}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-white mt-1 leading-snug">
                          {copy.rajab.duration}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/50 p-4">
                        <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                          {copy.datesLabel}
                        </div>
                        <div className="text-xs font-semibold text-[#fceda2] mt-1 flex items-start gap-1.5">
                          <Calendar className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                          <span>{copy.rajab.travelDates}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#0b1d3a]/90 border border-[#d1a847]/50 p-3.5 flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                      <AlertTriangle className="w-4 h-4 text-[#fceda2] shrink-0 mt-0.5" />
                      <span>{copy.rajab.datesNotice}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => selectPackageAndScrollToForm('rajab')}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                    >
                      <span>{copy.reserveRequestCta}</span>
                      <ArrowRight className={`w-4 h-4 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                    <a
                      href={buildDirectWhatsappUrl('rajab')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors"
                    >
                      <span>WhatsApp · {displayPhone}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Omra Rajab Room Table (Strict Accuracy: Flagged Pending Agency Confirmation) */}
            <section className="space-y-5">
              <div className="ggt-umrah-reveal-left space-y-1.5 max-w-3xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                  {copy.rajab.comparisonEyebrow}
                </div>
                <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
                  {copy.rajab.comparisonTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#2c405e]">
                  {copy.rajab.comparisonSubtitle}
                </p>
              </div>

              <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#d1a847]/55 bg-[#fcf9f2] shadow-[0_14px_34px_rgba(11,29,58,0.07)]">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs uppercase tracking-[0.14em]">
                      <th className="py-4 px-5 text-start font-semibold">
                        {copy.rajab.colRoomType}
                      </th>
                      <th className="py-4 px-5 text-start font-semibold">
                        {copy.rajab.colMadinahHotel}
                      </th>
                      <th className="py-4 px-5 text-start font-semibold">
                        {copy.rajab.colMakkahHotel}
                      </th>
                      <th className="py-4 px-5 text-start font-semibold">
                        {copy.rajab.colPrice}
                      </th>
                      <th className="py-4 px-5 text-end font-semibold">{copy.rajab.colAction}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d1a847]/25">
                    {ROOM_ORDER.map((roomId) => {
                      const room = copy.rooms[roomId];
                      const isSelected = selectedRoom === roomId;
                      return (
                        <tr
                          key={roomId}
                          className={isSelected ? 'bg-[#ede1ce]/70' : 'hover:bg-[#f5ede0]/60'}
                        >
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-2.5">
                              <BedDouble className="w-4 h-4 text-[#c59b38] shrink-0" />
                              <div>
                                <div className="font-semibold text-[#0b1d3a]">{room.label}</div>
                                <div className="text-[11px] text-[#2c405e]">{room.capacity}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-5 text-xs text-[#2c405e] italic">
                            {copy.rajab.hotelConfirmNotice}
                          </td>
                          <td className="py-4 px-5 text-xs text-[#2c405e] italic">
                            {copy.rajab.hotelConfirmNotice}
                          </td>
                          <td className="py-4 px-5 text-xs font-semibold text-[#9a7220]">
                            {copy.rajab.priceConfirmNotice}
                          </td>
                          <td className="py-4 px-5 text-end">
                            <button
                              type="button"
                              onClick={() => selectPackageAndScrollToForm('rajab', roomId)}
                              className={`inline-flex items-center justify-center px-4 min-h-[40px] rounded-xl text-xs font-bold uppercase tracking-[0.12em] cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]'
                                  : 'bg-[#f5ede0] text-[#0b1d3a] border border-[#d1a847]/65'
                              }`}
                            >
                              {isSelected ? copy.rajab.selectedRoomBtn : copy.rajab.selectRoomBtn}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Cards */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {ROOM_ORDER.map((roomId) => {
                  const room = copy.rooms[roomId];
                  const isSelected = selectedRoom === roomId;
                  return (
                    <div
                      key={roomId}
                      className="ggt-umrah-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/50 p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between border-b border-[#d1a847]/25 pb-2">
                        <span className="font-serif-crest text-base font-semibold text-[#0b1d3a]">
                          {room.label}
                        </span>
                        <span className="text-[11px] text-[#9a7220] font-semibold">
                          {room.capacity}
                        </span>
                      </div>
                      <p className="text-xs text-[#2c405e] italic">
                        {copy.rajab.hotelConfirmNotice}
                      </p>
                      <p className="text-xs font-semibold text-[#9a7220]">
                        {copy.rajab.priceConfirmNotice}
                      </p>
                      <button
                        type="button"
                        onClick={() => selectPackageAndScrollToForm('rajab', roomId)}
                        className={`w-full min-h-[44px] rounded-xl text-xs font-bold uppercase tracking-[0.12em] cursor-pointer ${
                          isSelected
                            ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]'
                            : 'bg-[#f5ede0] text-[#0b1d3a] border border-[#d1a847]/65'
                        }`}
                      >
                        {isSelected ? copy.rajab.selectedRoomBtn : copy.rajab.selectRoomBtn}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Inclusions */}
            <section className="space-y-6">
              <div className="ggt-umrah-reveal-left space-y-1.5 max-w-3xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                  {copy.rajab.inclusionsEyebrow}
                </div>
                <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
                  {copy.rajab.inclusionsTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {copy.rajab.inclusions.map((item) => {
                  const ItemIcon = INCLUSION_ICONS[item.key];
                  return (
                    <div
                      key={item.key}
                      className="ggt-umrah-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/45 p-5 shadow-[0_10px_28px_rgba(11,29,58,0.06)] flex items-start gap-4"
                    >
                      <span className="w-11 h-11 rounded-xl bg-[#071429] border border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0">
                        <ItemIcon className="w-5 h-5" />
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-serif-crest text-base sm:text-lg font-semibold text-[#0b1d3a]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#2c405e] leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Conditions & Important Notes */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="ggt-umrah-reveal-left rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-6 sm:p-7 space-y-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {copy.rajab.conditionsBadge}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a]">
                    {copy.rajab.conditionsTitle}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {copy.rajab.conditions.map((cond, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#2c405e] leading-relaxed"
                    >
                      <Check className="w-4 h-4 text-[#c59b38] shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ggt-umrah-reveal-right rounded-2xl bg-[#ede1ce]/75 border border-[#d1a847]/60 p-6 sm:p-7 space-y-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {copy.rajab.importantBadge}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a]">
                    {copy.rajab.importantTitle}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {copy.rajab.importantNotes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[#0b1d3a] leading-relaxed"
                    >
                      <AlertTriangle className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* 3. DIRECT AGENCY RESERVATION INQUIRY FORM (DYNAMIC TO ACTIVE PACKAGE ONLY) */}
      <section ref={formSectionRef} id="umrah-inquiry-form" className="scroll-mt-28 space-y-6">
        <div className="space-y-1.5 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
            {copy.formEyebrow}
          </div>
          <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
            {copy.formTitlePrefix} ·{' '}
            {activePackage === 'istanbul' ? copy.istanbul.title : copy.rajab.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#2c405e]">{copy.formSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-8">
            {ready ? (
              <div className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-7 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="font-serif-crest text-xl font-semibold text-[#fceda2]">
                    {copy.summaryTitle}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setReady(false)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#fceda2] hover:underline cursor-pointer"
                  >
                    {copy.editBtn}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                    <div className="text-slate-400">{copy.selectedPackageLabel}</div>
                    <div className="font-semibold text-white mt-0.5">
                      {activePackage === 'istanbul' ? copy.istanbul.title : copy.rajab.title}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                    <div className="text-slate-400">{copy.advertisedDatesLabel}</div>
                    <div className="font-semibold text-[#fceda2] mt-0.5">
                      {activePackage === 'istanbul'
                        ? copy.istanbul.travelDates
                        : copy.rajab.travelDates}
                    </div>
                  </div>
                  {activePackage === 'istanbul' && (
                    <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.hotelOptionLabel}</div>
                      <div className="font-semibold text-white mt-0.5">
                        {copy.istanbul.hotelOptions[selectedIstanbulHotel].label} ·{' '}
                        {currentIstanbulFare}
                      </div>
                    </div>
                  )}
                  <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                    <div className="text-slate-400">{copy.roomPrefLabel}</div>
                    <div className="font-semibold text-white mt-0.5">
                      {copy.rooms[selectedRoom].label}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                    <div className="text-slate-400">{copy.departureCityLabel}</div>
                    <div className="font-semibold text-white mt-0.5">{departureCity}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                    <div className="text-slate-400">{copy.nameLabel}</div>
                    <div className="font-semibold text-white mt-0.5">
                      {fullName} · {phone}
                    </div>
                  </div>
                </div>

                <a
                  href={buildSubmittedWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
                >
                  <span>{copy.whatsappSummaryBtn}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-5 sm:p-7 space-y-4 shadow-[0_14px_34px_rgba(11,29,58,0.06)]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${uid}-pkg`}
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.selectedPackageLabel}
                    </label>
                    <select
                      id={`${uid}-pkg`}
                      value={activePackage}
                      onChange={(e) => setActivePackage(e.target.value as UmrahPackageId)}
                      className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    >
                      <option value="rajab">{copy.rajab.startingPriceBanner}</option>
                      <option value="istanbul">
                        {copy.istanbul.startingPriceBanner} · {copy.istanbul.travelDates}
                      </option>
                    </select>
                  </div>

                  {activePackage === 'istanbul' ? (
                    <div>
                      <label
                        htmlFor={`${uid}-hotelopt`}
                        className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.hotelOptionLabel}
                      </label>
                      <select
                        id={`${uid}-hotelopt`}
                        value={selectedIstanbulHotel}
                        onChange={(e) =>
                          setSelectedIstanbulHotel(e.target.value as IstanbulHotelOptionId)
                        }
                        className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        {ISTANBUL_HOTEL_ORDER.map((optId) => (
                          <option key={optId} value={optId}>
                            {copy.istanbul.hotelOptions[optId].label} —{' '}
                            {ISTANBUL_PRICE_MATRIX[selectedRoom][optId]}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-[#f5ede0]/70 border border-[#d1a847]/45 px-3.5 py-2.5 flex flex-col justify-center">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a7220]">
                        {copy.advertisedDatesLabel}
                      </span>
                      <span className="text-xs font-semibold text-[#0b1d3a] mt-0.5">
                        {copy.rajab.travelDates}
                      </span>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor={`${uid}-room`}
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.roomPrefLabel}
                    </label>
                    <select
                      id={`${uid}-room`}
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value as RoomOccupancyId)}
                      className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    >
                      {ROOM_ORDER.map((rId) => (
                        <option key={rId} value={rId}>
                          {copy.rooms[rId].label} ({copy.rooms[rId].capacity})
                          {activePackage === 'istanbul'
                            ? ` — ${ISTANBUL_PRICE_MATRIX[rId][selectedIstanbulHotel]}`
                            : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`${uid}-city`}
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.departureCityLabel}
                    </label>
                    <input
                      id={`${uid}-city`}
                      type="text"
                      maxLength={120}
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      placeholder={copy.departureCityPlaceholder}
                      className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label
                        htmlFor={`${uid}-adults`}
                        className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.adultsLabel}
                      </label>
                      <input
                        id={`${uid}-adults`}
                        type="number"
                        min={1}
                        max={30}
                        value={adults}
                        onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${uid}-children`}
                        className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.childrenLabel}
                      </label>
                      <input
                        id={`${uid}-children`}
                        type="number"
                        min={0}
                        max={20}
                        value={children}
                        onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${uid}-name`}
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.nameLabel}
                    </label>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      maxLength={120}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={copy.namePlaceholder}
                      className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`${uid}-phone`}
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.phoneLabel}
                    </label>
                    <input
                      id={`${uid}-phone`}
                      type="tel"
                      maxLength={40}
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={copy.phonePlaceholder}
                      className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${uid}-notes`}
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.notesLabel}
                  </label>
                  <textarea
                    id={`${uid}-notes`}
                    rows={2}
                    maxLength={400}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={copy.notesPlaceholder}
                    className="w-full bg-[#f5ede0]/60 border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>

                {errors.length > 0 && (
                  <div
                    role="alert"
                    className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-xs text-amber-950 space-y-1"
                  >
                    {errors.map((err, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>{err}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.15em] shadow-md transition-colors cursor-pointer"
                  >
                    <span>{copy.submitBtn}</span>
                    <ArrowRight className={`w-4 h-4 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                  <span className="text-[11px] text-[#2c405e]/85">{copy.noUploadNotice}</span>
                </div>
              </form>
            )}
          </div>

          {/* Salé Agency Direct Desk Card */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/60 p-5 sm:p-6 space-y-5 shadow-[0_18px_42px_rgba(4,12,28,0.28)]">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                  {copy.advisorLabel}
                </div>
                <h4 className="font-serif-crest text-xl font-semibold text-[#fceda2]">
                  {copy.advisorTitle}
                </h4>
              </div>

              <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/40 p-3.5 text-xs space-y-1">
                <div className="text-[#d1a847] font-semibold uppercase tracking-wider text-[10px]">
                  {copy.selectedPackageLabel}
                </div>
                <div className="font-semibold text-white">
                  {activePackage === 'istanbul' ? copy.istanbul.title : copy.rajab.title}
                </div>
                <div className="text-[#fceda2] font-semibold">
                  {activePackage === 'istanbul'
                    ? `${copy.istanbul.startingPriceBanner} · ${copy.istanbul.hotelOptions[selectedIstanbulHotel].label} (${currentIstanbulFare})`
                    : copy.rajab.startingPriceBanner}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{copy.advisorDisclaimer}</p>

              <div className="space-y-2.5">
                <a
                  href={buildDirectWhatsappUrl(activePackage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[46px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <span>{copy.reserveRequestCta}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>

                <a
                  href="tel:0666484815"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/55 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  <span dir="ltr">{displayPhone}</span>
                </a>

                {onJumpToPlanner && (
                  <button
                    type="button"
                    onClick={onJumpToPlanner}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-transparent hover:bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/40 text-xs font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                    <span>Google Maps</span>
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
