import { DestinationId, HeroCategoryId, Language, ServiceId } from './assets/destinations';

export const LANGUAGES: { code: Language; name: string; flag: string; label: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'FR' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', label: 'عربي' },
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', label: 'ES' }
];

export interface LocalizedService {
  id: ServiceId;
  label: string;
  headline: string;
  description: string;
  includedDetails: string[];
}

export interface LocalizedDestination {
  id: DestinationId;
  title: string;
  region: string;
  season: string;
  altitudeOrCoast: string;
  summary: string;
  highlights: string[];
  imageAlt: string;
}

export interface TranslationPack {
  dir: 'ltr' | 'rtl';
  hero: {
    headlineTop: string;
    headlineGold: string;
    subtitle: string;
    discoverTags: string[];
    extraordinaryNote: string;
    domesticNote: string;
    exploreCta: string;
    worldHorizonsLabel: string;
    omraBottomLabel: string;
    categories: Record<HeroCategoryId, string>;
  };
  nav: {
    horizons: string;
    services: string;
    planner: string;
    contact: string;
    curateCta: string;
  };
  horizonsSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    selectDest: string;
    omraBadge: string;
    omraTalbiyah: string;
    omraTapHint: string;
    omraBookCta: string;
    destinations: Record<DestinationId, LocalizedDestination>;
  };
  servicesSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    provisionTag: string;
    configurePrefix: string;
    services: Record<ServiceId, LocalizedService>;
  };
  plannerSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    serviceLabel: string;
    destLabel: string;
    destPlaceholder: string;
    hotelLabel: string;
    hotelPlaceholder: string;
    departureCityLabel: string;
    departureCityPlaceholder: string;
    visaPurposeLabel: string;
    visaPurposePlaceholder: string;
    insurancePlanLabel: string;
    insurancePlanOptions: string[];
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    departureDateLabel: string;
    returnDateLabel: string;
    timeLabel: string;
    travelersLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    dossierReady: string;
    adjustBtn: string;
    selectedServiceLabel: string;
    scheduleLabel: string;
    locationSummaryLabel: string;
    hotelSummaryLabel: string;
    sendWhatsapp: string;
    callBtn: string;
    beautifulStories: string;
    returnBtn: string;
    guestOptions: string[];
    mapTitleHotel: string;
    mapTitleCity: string;
    mapTitleVisa: string;
    mapHotelHint: string;
    mapCityHint: string;
    mapVisaHint: string;
    visaCenterLabel: string;
    visaCenterPlaceholder: string;
    agencyMapCardTitle: string;
    agencyMapBtn: string;
    mapSearchBtn: string;
    mapSearching: string;
    mapResultsTitle: string;
    mapSelectPin: string;
    mapSelectedTag: string;
    mapEmptyNote: string;
    mapKeyMissing: string;
  };
  footer: {
    servicesTitle: string;
    agencyTitle: string;
    conciergeTitle: string;
    phoneDesc: string;
    whatsappDesc: string;
    mapsCta: string;
    rights: string;
    discoverLine: string;
  };
}

export const translations: Record<Language, TranslationPack> = {
  fr: {
    dir: 'ltr',
    hero: {
      headlineTop: 'YOUR NEXT',
      headlineGold: 'JOURNEY STARTS HERE.',
      subtitle: 'Curated travel. Seamless planning. Unforgettable places.',
      discoverTags: ['Découvrir', 'Explorer', 'Vivre', 'Recommencer'],
      extraordinaryNote: 'Destinations Extraordinaires · Un Avenir Lumineux',
      domesticNote: 'Voyages Nationaux & Internationaux',
      exploreCta: 'Explorer nos Voyages',
      worldHorizonsLabel: 'Horizons du Monde',
      omraBottomLabel: 'El Omra · La Mecque',
      categories: {
        flights: 'Vols',
        hotels: 'Hôtels',
        holidays: 'Séjours',
        tours: 'Circuits'
      }
    },
    nav: {
      horizons: 'Horizons',
      services: 'Nos Services',
      planner: 'Réservation & Carte',
      contact: 'Contact',
      curateCta: 'Planifier'
    },
    horizonsSection: {
      eyebrow: 'Découvrir · Explorer · Vivre · Recommencer',
      title: 'Trois Horizons d’Exception',
      subtitle: 'Voyages sur mesure. Planification fluide. Lieux inoubliables.',
      selectDest: 'Choisir cette Destination',
      omraBadge: 'El Omra · La Mecque',
      omraTalbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْك',
      omraTapHint: 'Cliquer sur l’icône La Mecque pour afficher la calligraphie',
      omraBookCta: 'Demander un Forfait El Omra',
      destinations: {
        'swiss-alps': {
          id: 'swiss-alps',
          title: 'Les Alpes Suisses',
          region: 'Oberland Bernois & Engadine',
          season: 'Toute l’année · Juin–Sept & Déc–Mars',
          altitudeOrCoast: 'Sommets Alpins & Lacs Glaciaires',
          summary:
            'Des lacs turquoise cristallins nichés sous des cimes enneigées, des chalets en bois au cœur des forêts de sapins et des trains panoramiques.',
          highlights: [
            'Chalets privés au bord du lac et hôtels 5 étoiles',
            'Trains alpins panoramiques et excursions sur glacier',
            'Randonnées guidées en altitude et spas thermaux'
          ],
          imageAlt:
            'Vue aérienne des sommets enneigés des Alpes suisses reflétés dans un lac turquoise entouré de forêts alpines'
        },
        makkah: {
          id: 'makkah',
          title: 'La Mecque, Arabie Saoudite',
          region: 'Sanctuaire de Masjid al-Haram',
          season: 'Toute l’année · El Omra & Saisons Spirituelles',
          altitudeOrCoast: 'Esplanade Sacrée & Vue Haram',
          summary:
            'Proximité sereine de la Sainte Kaaba et de Masjid al-Haram avec gestion complète des visas, transferts privés et suites donnant sur l’esplanade.',
          highlights: [
            'Suites avec vue directe sur Masjid al-Haram et la Kaaba',
            'Organisation fluide de El Omra et transferts VIP',
            'Accompagnement dédié multilingue du départ au retour'
          ],
          imageAlt:
            'Vue panoramique de la Sainte Kaaba au cœur du Masjid al-Haram et de ses minarets illuminés à La Mecque'
        },
        mediterranean: {
          id: 'mediterranean',
          title: 'Côte Méditerranéenne',
          region: 'Baies Ensoleillées & Ports Historiques',
          season: 'Mai–Octobre · Saison Dorée Maritime',
          altitudeOrCoast: 'Criques Turquoise & Falaises Calcaires',
          summary:
            'Villages perchés aux façades ivoire dominant des eaux turquoise limpides, croisières privées le long des criques secrètes et couchers de soleil.',
          highlights: [
            'Suites boutique en bord de falaise avec terrasse vue mer',
            'Sorties en mer vers les criques turquoise isolées',
            'Transferts côtiers privés et visites patrimoniales'
          ],
          imageAlt:
            'Village côtier méditerranéen baigné de soleil face à une mer turquoise et des voiliers'
        }
      }
    },
    servicesSection: {
      eyebrow: 'Golden Group · Services Principaux',
      title: 'Nos Services',
      subtitle:
        'Nos cinq pôles d’expertise essentiels pour orchestrer vos voyages d’affaires, séjours en famille et déplacements internationaux.',
      provisionTag: 'Service Officiel',
      configurePrefix: 'Sélectionner',
      services: {
        'flight-bookings': {
          id: 'flight-bookings',
          label: 'Flight Bookings',
          headline: 'Réservation de Billets d’Avion',
          description:
            'Émission de billets toutes compagnies, tarifs optimisés en Première, Affaires ou Économique et assistance en cas de modification.',
          includedDetails: [
            'Vols directs et multi-destinations monde entier',
            'Sélection prioritaire des sièges et bagages',
            'Suivi continu et support modifications 7j/7'
          ]
        },
        'hotel-reservations': {
          id: 'hotel-reservations',
          label: 'Hotel Reservations',
          headline: 'Réservation d’Hôtels Sélectionnés',
          description:
            'Accès direct à n’importe quel hôtel dans le monde — trouvez votre établissement sur Google Maps et confiez-nous la confirmation.',
          includedDetails: [
            'Chambres et suites dans l’hôtel de votre choix',
            'Confirmation rapide avec options petit-déjeuner ou demi-pension',
            'Localisation vérifiée sur Google Maps'
          ]
        },
        'visa-assistance': {
          id: 'visa-assistance',
          label: 'Visa Assistance',
          headline: 'Assistance & Préparation de Visa',
          description:
            'Accompagnement complet dans la constitution de vos dossiers de visa Schengen, Omra, Turquie, Émirats, Royaume-Uni et États-Unis.',
          includedDetails: [
            'Vérification rigoureuse des pièces justificatives',
            'Prise de rendez-vous et préparation des formulaires',
            'Réservations hôtels & vols conformes au dossier'
          ]
        },
        'travel-insurance': {
          id: 'travel-insurance',
          label: 'Travel Insurance',
          headline: 'Assurance Voyage Internationale',
          description:
            'Couverture médicale, rapatriement, bagages et annulation conforme aux exigences des ambassades et voyages internationaux.',
          includedDetails: [
            'Attestation conforme pour dossiers Schengen et internationaux',
            'Couverture frais médicaux et assistance 24h/24',
            'Formules individuelles, familiales ou multi-voyages'
          ]
        },
        'holiday-packages': {
          id: 'holiday-packages',
          label: 'Holiday Packages',
          headline: 'Forfaits Vacances & Voyages Organisés',
          description:
            'Séjours clés en main incluant vol aller-retour, hôtel choisi, transferts privés et programme sur mesure selon vos dates.',
          includedDetails: [
            'Forfaits combinés Vol + Hôtel + Transferts',
            'Circuits personnalisés et séjours balnéaires ou alpins',
            'Programmes adaptés aux couples, familles et groupes'
          ]
        }
      }
    },
    plannerSection: {
      eyebrow: 'Formulaire Connecté à Google Maps',
      title: 'Demande de Voyage & Carte Interactive',
      subtitle:
        'Sélectionnez un service ci-dessous : le formulaire et la carte Google Maps s’adaptent automatiquement à votre besoin (hôtels, vols, visa, assurance ou séjour).',
      serviceLabel: 'Service Sélectionné',
      destLabel: 'Destination Horizon / Ville (Saisie Libre)',
      destPlaceholder: 'Ex : Paris, Marrakech, La Mecque, Istanbul, Zurich...',
      hotelLabel: 'Nom de l’Hôtel Souhaité (Saisie Libre ou via Carte)',
      hotelPlaceholder: 'Écrivez le nom de n’importe quel hôtel (ex : Fairmont Makkah, Ritz Paris)...',
      departureCityLabel: 'Ville de Départ',
      departureCityPlaceholder: 'Ex : Casablanca (CMN), Rabat-Salé (RBA), Paris...',
      visaPurposeLabel: 'Type de Visa / Consulat',
      visaPurposePlaceholder: 'Ex : Tourisme Schengen, Affaires, Omra, Royaume-Uni...',
      insurancePlanLabel: 'Formule d’Assurance',
      insurancePlanOptions: [
        'Schengen Conforme (30 000 €)',
        'Couverture Monde Entier',
        'Famille & Multi-Risques'
      ],
      nameLabel: 'Nom Complet',
      namePlaceholder: 'Votre nom complet',
      phoneLabel: 'Téléphone / WhatsApp',
      departureDateLabel: 'Date de Départ',
      returnDateLabel: 'Date de Retour',
      timeLabel: 'Heure Souhaitée',
      travelersLabel: 'Voyageurs',
      notesLabel: 'Précisions Complémentaires',
      notesPlaceholder: 'Type de chambre, compagnie préférée, budget ou demande spéciale...',
      submitBtn: 'Préparer ma Demande WhatsApp',
      dossierReady: 'Demande Prête à Envoyer',
      adjustBtn: 'Modifier',
      selectedServiceLabel: 'Service Choisi',
      scheduleLabel: 'Dates & Heure',
      locationSummaryLabel: 'Ville / Destination',
      hotelSummaryLabel: 'Hôtel Choisi',
      sendWhatsapp: 'Envoyer sur WhatsApp',
      callBtn: 'Appeler',
      beautifulStories: 'Golden Group Travels · Salé',
      returnBtn: 'Revoir l’Ouverture 3D',
      guestOptions: ['1 Voyageur', '2 Voyageurs', '3–5 Famille', '6+ Groupe'],
      mapTitleHotel: 'Recherche d’Hôtels sur Google Maps',
      mapTitleCity: 'Localisation Destination sur Google Maps',
      mapTitleVisa: 'Centres Visa, Consulats & Agence sur Google Maps',
      mapHotelHint: 'Tapez un nom d’hôtel ou cliquez sur « Rechercher » pour voir les marqueurs d’hôtels et sélectionner votre établissement.',
      mapCityHint: 'Saisissez la ville ou le lieu souhaité pour le centrer et le confirmer sur Google Maps.',
      mapVisaHint: 'Recherchez votre destination, consulat ou centre de visa (VFS Global, TLScontact) sur Google Maps, ou ouvrez la localisation de notre agence à Salé.',
      visaCenterLabel: 'Consulat / Centre de Visa (Recherche Google Maps)',
      visaCenterPlaceholder: 'Ex : TLScontact Rabat, VFS Global, Consulat de France...',
      agencyMapCardTitle: 'Agence Golden Group · Salé',
      agencyMapBtn: 'Localisation Google Maps',
      mapSearchBtn: 'Chercher sur Maps',
      mapSearching: 'Recherche...',
      mapResultsTitle: 'Résultats Google Maps',
      mapSelectPin: 'Sélectionner pour le formulaire',
      mapSelectedTag: 'Sélectionné',
      mapEmptyNote: 'Aucun lieu trouvé pour cette recherche. Vous pouvez tout de même saisir votre choix manuellement.',
      mapKeyMissing: 'Clé Google Maps en attente — vous pouvez saisir librement votre ville et hôtel dans le formulaire.'
    },
    footer: {
      servicesTitle: 'Nos Services',
      agencyTitle: 'Agence Salé',
      conciergeTitle: 'Contact Direct',
      phoneDesc: 'Ligne Directe Agence',
      whatsappDesc: 'WhatsApp Direct',
      mapsCta: 'Voir sur Google Maps',
      rights: 'Tous droits réservés.',
      discoverLine: 'Découvrir · Explorer · Vivre · Recommencer'
    }
  },
  ar: {
    dir: 'rtl',
    hero: {
      headlineTop: 'رحلتك القادمة',
      headlineGold: 'تبدأ من هنا.',
      subtitle: 'سفر مُصمَّم بعناية. تخطيط سلس. وجهات لا تُنسى.',
      discoverTags: ['اكتشف', 'استكشف', 'عِش التجربة', 'تجدّد'],
      extraordinaryNote: 'وجهات استثنائية · آفاق مشرقة',
      domesticNote: 'رحلات داخلية ودولية',
      exploreCta: 'استكشف رحلاتنا',
      worldHorizonsLabel: 'آفاق العالم',
      omraBottomLabel: 'العمرة · مكة المكرمة',
      categories: {
        flights: 'الطيران',
        hotels: 'الفنادق',
        holidays: 'العطلات',
        tours: 'الجولات'
      }
    },
    nav: {
      horizons: 'الوجهات',
      services: 'خدماتنا',
      planner: 'الحجز والخريطة',
      contact: 'اتصل بنا',
      curateCta: 'احجز الآن'
    },
    horizonsSection: {
      eyebrow: 'اكتشف · استكشف · عِش التجربة',
      title: 'ثلاث وجهات استثنائية',
      subtitle: 'سفر مُصمَّم بعناية. تخطيط سلس. وجهات لا تُنسى.',
      selectDest: 'اختر هذه الوجهة',
      omraBadge: 'العمرة · مكة المكرمة',
      omraTalbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْك',
      omraTapHint: 'اضغط على أيقونة مكة لإظهار الخط العربي الذهبي',
      omraBookCta: 'حجز برنامج العمرة',
      destinations: {
        'swiss-alps': {
          id: 'swiss-alps',
          title: 'جبال الألب السويسرية',
          region: 'برنيز أوبرلاند وإنغادين',
          season: 'طوال العام · الصيف والشتاء',
          altitudeOrCoast: 'قمم ثلجية وبحيرات فيروزية',
          summary:
            'بحيرات جليدية فيروزية تعكس قمم الألب المغطاة بالثلوج، وأكواخ جبلية فاخرة وسط غابات الصنوبر، ورحلات قطار بانورامية.',
          highlights: [
            'إقامة في شاليهات ومنتجعات 5 نجوم مطلة على البحيرات',
            'رحلات قطارات جبلية بانورامية وتجارب ثلجية',
            'جولات جبلية مرشدة ومنتجعات استشفائية'
          ],
          imageAlt: 'مشهد جوي لجبال الألب السويسرية المغطاة بالثلوج وبحيرة فيروزية'
        },
        makkah: {
          id: 'makkah',
          title: 'مكة المكرمة، المملكة العربية السعودية',
          region: 'رحاب المسجد الحرام',
          season: 'طوال العام · رحلات العمرة والمواسم المباركة',
          altitudeOrCoast: 'ساحات الحرم وإطلالة الكعبة',
          summary:
            'إقامة روحانية مطمئنة بالقرب من الكعبة المشرفة والمسجد الحرام، مع إنهاء إجراءات التأشيرة، تنقلات خاصة، وأجنحة مطلة على الحرم.',
          highlights: [
            'فنادق وأجنحة فاخرة مطلة مباشرة على المسجد الحرام والكعبة',
            'تنظيم متكامل لرحلات العمرة مع تنقلات مريحة',
            'مرافقة وإرشاد متعدد اللغات من لحظة الوصول حتى المغادرة'
          ],
          imageAlt: 'منظر واسع للكعبة المشرفة في قلب المسجد الحرام في مكة المكرمة'
        },
        mediterranean: {
          id: 'mediterranean',
          title: 'ساحل البحر الأبيض المتوسط',
          region: 'خلجان مشمسة ومرافئ تاريخية',
          season: 'مايو – أكتوبر · الموسم البحري الذهبي',
          altitudeOrCoast: 'خلجان فيروزية ومنحدرات ساحرة',
          summary:
            'قرى ساحلية عريقة تطل على مياه فيروزية صافية، ورحلات بحرية خاصة عبر الخلجان الهادئة مع أمسيات ساحرة على الشواطئ.',
          highlights: [
            'أجنحة بوتيك مطلة على البحر مع شرفات خاصة',
            'جولات بحرية لاستكشاف الخلجان الفيروزية',
            'تنقلات خاصة وجولات ثقافية في المدن الساحلية'
          ],
          imageAlt: 'مدينة ساحلية متوسطية مشمسة تطل على مياه فيروزية'
        }
      }
    },
    servicesSection: {
      eyebrow: 'جولدن جروب · خدماتنا الأساسية',
      title: 'خدماتنا',
      subtitle: 'خدماتنا الخمس الرئيسية لتنظيم رحلاتكم السياحية والمهنية بأعلى درجات الاحترافية.',
      provisionTag: 'خدمة رئيسية',
      configurePrefix: 'اختيار',
      services: {
        'flight-bookings': {
          id: 'flight-bookings',
          label: 'حجز تذاكر الطيران',
          headline: 'Flight Bookings · حجز تذاكر الطيران',
          description:
            'حجوزات تذاكر طيران دولية وداخلية مع جميع شركات الطيران، بأفضل المسارات والأسعار مع مرونة التعديل.',
          includedDetails: [
            'رحلات مباشرة ومتعددة الوجهات حول العالم',
            'اختيار المقاعد والمقصورة المناسبة',
            'متابعة مستمرة ودعم لتعديلات الرحلات'
          ]
        },
        'hotel-reservations': {
          id: 'hotel-reservations',
          label: 'حجوزات الفنادق',
          headline: 'Hotel Reservations · حجوزات الفنادق',
          description:
            'احجز أي فندق تريده حول العالم — ابحث عن اسم الفندق مباشرة على خرائط جوجل وأرسل طلبك لتأكيد الحجز.',
          includedDetails: [
            'حرية اختيار أي فندق أو منتجع في أي مدينة',
            'تأكيد الغرف والأجنحة العائلية مع خيارات الإقامة',
            'التحقق من موقع الفندق عبر خرائط جوجل'
          ]
        },
        'visa-assistance': {
          id: 'visa-assistance',
          label: 'المساعدة في التأشيرة',
          headline: 'Visa Assistance · المساعدة في التأشيرات',
          description:
            'مرافقة شاملة لإعداد وتقديم ملفات التأشيرات (شنغن، العمرة، تركيا، الإمارات، بريطانيا والولايات المتحدة).',
          includedDetails: [
            'مراجعة دقيقة للوثائق وتجهيز الملف القنصلي',
            'حجز المواعيد وتعبئة الاستمارات الرسمية',
            'إرفاق حجوزات الطيران والفنادق المطابقة'
          ]
        },
        'travel-insurance': {
          id: 'travel-insurance',
          label: 'تأمين السفر',
          headline: 'Travel Insurance · تأمين السفر الدولي',
          description:
            'بوليصة تأمين سفر معتمدة لدى السفارات تغطي الرعاية الطبية والطوارئ والأمتعة طوال فترة رحلتك.',
          includedDetails: [
            'تغطية معتمدة لملفات تأشيرة شنغن والدولية',
            'رعاية طبية وطوارئ ومساعدة على مدار الساعة',
            'باقات للأفراد والعائلات والرحلات المتكررة'
          ]
        },
        'holiday-packages': {
          id: 'holiday-packages',
          label: 'باقات العطلات',
          headline: 'Holiday Packages · باقات العطلات والرحلات',
          description:
            'برامج عطلات متكاملة تشمل الطيران والفندق الذي تختاره والتنقلات الخاصة والجولات السياحية.',
          includedDetails: [
            'باقات شاملة: تذاكر الطيران + الفندق + التنقلات',
            'تنظيم رحلات فردية وعائلية حسب الميزانية والتواريخ',
            'إمكانية تحديد أي مدينة وأي فندق مفضل'
          ]
        }
      }
    },
    plannerSection: {
      eyebrow: 'نموذج متصل بخرائط جوجل',
      title: 'صمّم رحلتك واختر موقعك على الخريطة',
      subtitle:
        'اختر الخدمة المطلوبة، وسيتم تكييف الحقول وخرائط جوجل تلقائياً للبحث عن أي فندق أو مدينة ترغب بها.',
      serviceLabel: 'الخدمة المختارة',
      destLabel: 'الوجهة / المدينة (حرية الكتابة)',
      destPlaceholder: 'اكتب أي مدينة أو دولة (مثال: مكة المكرمة، باريس، إسطنبول، دبي...)',
      hotelLabel: 'اسم الفندق المطلوب (حرية الكتابة أو من الخريطة)',
      hotelPlaceholder: 'اكتب اسم أي فندق ترغب بالإقامة فيه...',
      departureCityLabel: 'مدينة المغادرة',
      departureCityPlaceholder: 'مثال: الدار البيضاء، الرباط - سلا، مراكش...',
      visaPurposeLabel: 'نوع التأشيرة المطلوبة',
      visaPurposePlaceholder: 'مثال: تأشيرة شنغن سياحية، عمرة، أعمال...',
      insurancePlanLabel: 'خطة التأمين',
      insurancePlanOptions: [
        'تأمين شنغن معتمد (30,000 يورو)',
        'تغطية عالمية شاملة',
        'تأمين عائلي متكامل'
      ],
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'اكتب اسمك الكامل',
      phoneLabel: 'رقم الهاتف / واتساب',
      departureDateLabel: 'تاريخ الذهاب',
      returnDateLabel: 'تاريخ العودة',
      timeLabel: 'الوقت المفضل',
      travelersLabel: 'عدد المسافرين',
      notesLabel: 'ملاحظات إضافية',
      notesPlaceholder: 'تفاصيل الغرفة، الخطوط المفضلة، أو أي طلب خاص...',
      submitBtn: 'تجهيز الطلب وإرساله عبر واتساب',
      dossierReady: 'ملف الطلب جاهز للإرسال',
      adjustBtn: 'تعديل',
      selectedServiceLabel: 'الخدمة',
      scheduleLabel: 'التاريخ والوقت',
      locationSummaryLabel: 'الوجهة / المدينة',
      hotelSummaryLabel: 'الفندق المختار',
      sendWhatsapp: 'إرسال عبر واتساب',
      callBtn: 'اتصال',
      beautifulStories: 'جولدن جروب للسفر والسياحة · سلا',
      returnBtn: 'العودة للعرض ثلاثي الأبعاد',
      guestOptions: ['مسافر واحد', 'مسافران', 'عائلة (3–5 أفراد)', 'مجموعة (+6)'],
      mapTitleHotel: 'البحث عن الفنادق على خرائط جوجل',
      mapTitleCity: 'تحديد الوجهة على خرائط جوجل',
      mapTitleVisa: 'تحديد مركز التأشيرات، القنصلية والوكالة على خرائط جوجل',
      mapHotelHint: 'اكتب اسم أي فندق أو مدينة واضغط بحث لتظهر الفنادق على الخريطة وتختار منها.',
      mapCityHint: 'اكتب أي مدينة أو وجهة لتحديد موقعها مباشرة على خرائط جوجل.',
      mapVisaHint: 'ابحث عن القنصلية أو مركز التأشيرات (مثل VFS أو TLScontact) أو الوجهة على خرائط جوجل، أو افتح موقع وكالتنا بسلا لإيداع ملفك.',
      visaCenterLabel: 'القنصلية / مركز التأشيرات (بحث على خرائط جوجل)',
      visaCenterPlaceholder: 'مثال: VFS Global الرباط، TLScontact، القنصلية...',
      agencyMapCardTitle: 'مقر وكالة جولدن جروب · سلا',
      agencyMapBtn: 'فتح موقع الوكالة على خرائط جوجل',
      mapSearchBtn: 'بحث على الخريطة',
      mapSearching: 'جاري البحث...',
      mapResultsTitle: 'نتائج خرائط جوجل',
      mapSelectPin: 'اعتماد هذا الاختيار',
      mapSelectedTag: 'مُختار',
      mapEmptyNote: 'لم يتم العثور على نتائج مطابقة — يمكنك إكمال الطلب بكتابة الاسم يدوياً.',
      mapKeyMissing: 'الخريطة قيد التفعيل — يمكنك كتابة اسم المدينة والفندق بحرية في النموذج.'
    },
    footer: {
      servicesTitle: 'خدماتنا',
      agencyTitle: 'مقر الوكالة بسلا',
      conciergeTitle: 'التواصل المباشر',
      phoneDesc: 'الهاتف المباشر للوكالة',
      whatsappDesc: 'خط الواتساب المباشر',
      mapsCta: 'الموقع على خرائط جوجل',
      rights: 'جميع الحقوق محفوظة.',
      discoverLine: 'اكتشف · استكشف · عِش التجربة'
    }
  },
  en: {
    dir: 'ltr',
    hero: {
      headlineTop: 'YOUR NEXT',
      headlineGold: 'JOURNEY STARTS HERE.',
      subtitle: 'Curated travel. Seamless planning. Unforgettable places.',
      discoverTags: ['Discover', 'Explore', 'Experience', 'Repeat'],
      extraordinaryNote: 'Extraordinary Destinations · A Brighter Tomorrow',
      domesticNote: 'Domestic & International Travel',
      exploreCta: 'Explore Journeys',
      worldHorizonsLabel: 'World Horizons',
      omraBottomLabel: 'El Omra · Makkah',
      categories: {
        flights: 'Flights',
        hotels: 'Hotels',
        holidays: 'Holidays',
        tours: 'Tours'
      }
    },
    nav: {
      horizons: 'Horizons',
      services: 'Our Services',
      planner: 'Booking & Maps',
      contact: 'Contact',
      curateCta: 'Plan Trip'
    },
    horizonsSection: {
      eyebrow: 'Discover · Explore · Experience · Repeat',
      title: 'Three Extraordinary Horizons',
      subtitle: 'Curated travel. Seamless planning. Unforgettable places.',
      selectDest: 'Choose This Destination',
      omraBadge: 'El Omra · Makkah',
      omraTalbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْك',
      omraTapHint: 'Click the Makkah icon to reveal the Arabic calligraphy',
      omraBookCta: 'Request El Omra Package',
      destinations: {
        'swiss-alps': {
          id: 'swiss-alps',
          title: 'The Swiss Alps',
          region: 'Bernese Oberland & Engadin',
          season: 'Year-Round · June–Sept & Dec–March',
          altitudeOrCoast: 'Alpine Peaks & Glacial Lakes',
          summary:
            'Glacial turquoise lakes mirrored beneath granite summits, timbered alpine chalets perched among pine forests, and panoramic rail routes.',
          highlights: [
            'Private lakeside chalet and five-star sanctuary stays',
            'Scenic alpine rail transfers and glacier excursions',
            'Guided high-altitude ridge trails and wellness spas'
          ],
          imageAlt:
            'Aerial view of snow-dusted Swiss Alps mountain peaks reflecting over a turquoise glacial lake surrounded by emerald pine forests'
        },
        makkah: {
          id: 'makkah',
          title: 'Makkah, Saudi Arabia',
          region: 'Masjid al-Haram Sanctuary',
          season: 'Year-Round · El Omra & Spiritual Seasons',
          altitudeOrCoast: 'Sacred Courtyard & Haram Views',
          summary:
            'Reverent proximity to the Sacred Mosque and the Kaaba, curated with seamless visa coordination, private airport transfers, and Haram-facing suites.',
          highlights: [
            'Direct-access suites framing Masjid al-Haram and the Kaaba',
            'Seamless El Omra & pilgrimage travel planning with VIP transfers',
            'Dedicated multilingual ground coordination from arrival to departure'
          ],
          imageAlt:
            'Wide view of the sacred Kaaba in black and gold kiswah at the center of Masjid al-Haram marble courtyard and illuminated minarets at twilight'
        },
        mediterranean: {
          id: 'mediterranean',
          title: 'Mediterranean Coast',
          region: 'Sunlit Cliffside Bays & Historic Harbors',
          season: 'May–October · Golden Maritime Season',
          altitudeOrCoast: 'Turquoise Coves & Limestone Cliffs',
          summary:
            'Terraced ivory cliffside villages overlooking crystalline turquoise waters, private boat charters across secluded coves, and golden harbors.',
          highlights: [
            'Cliffside boutique suites with private sea-view terraces',
            'Day charters across hidden turquoise coves and island harbors',
            'Private coastal transfers and heritage architectural walks'
          ],
          imageAlt:
            'Sunlit Mediterranean coastal town with ivory architecture nestled into emerald cliffs overlooking a turquoise sea dotted with sailboats'
        }
      }
    },
    servicesSection: {
      eyebrow: 'Golden Group · Core Offerings',
      title: 'Our Services',
      subtitle:
        'Our five dedicated core services crafted to manage every detail of your international and domestic travel plans.',
      provisionTag: 'Main Service',
      configurePrefix: 'Select',
      services: {
        'flight-bookings': {
          id: 'flight-bookings',
          label: 'Flight Bookings',
          headline: 'Global Flight Bookings & Ticketing',
          description:
            'Direct and multi-city airfare across all major carriers in First, Business, or Economy cabins with flexible schedule support.',
          includedDetails: [
            'Direct & multi-leg international route coordination',
            'Preferred seat and baggage class selection',
            'Real-time flight monitoring and rebooking care'
          ]
        },
        'hotel-reservations': {
          id: 'hotel-reservations',
          label: 'Hotel Reservations',
          headline: 'Worldwide Hotel Reservations',
          description:
            'Choose any hotel or resort anywhere in the world — locate it live on Google Maps and let our desk handle confirmation and room requests.',
          includedDetails: [
            'Book any hotel you write or pick directly on Google Maps',
            'Verified room categories, suites & meal-plan options',
            'Early check-in & late check-out coordination'
          ]
        },
        'visa-assistance': {
          id: 'visa-assistance',
          label: 'Visa Assistance',
          headline: 'End-to-End Visa Assistance',
          description:
            'Complete preparation and guidance for Schengen, El Omra, Turkey, UAE, UK, and US visa applications without stress.',
          includedDetails: [
            'Thorough document review and checklist compliance',
            'Consulate appointment & application form handling',
            'Embassy-ready flight and hotel reservation support'
          ]
        },
        'travel-insurance': {
          id: 'travel-insurance',
          label: 'Travel Insurance',
          headline: 'International Travel Insurance',
          description:
            'Comprehensive medical, emergency repatriation, baggage, and cancellation policies compliant with international and Schengen visa requirements.',
          includedDetails: [
            'Schengen & global embassy-compliant certificates',
            '24/7 worldwide medical & emergency assistance',
            'Individual, family, and annual multi-trip plans'
          ]
        },
        'holiday-packages': {
          id: 'holiday-packages',
          label: 'Holiday Packages',
          headline: 'Curated Holiday Packages',
          description:
            'Seamless getaway packages pairing flights, your chosen hotel, private airport transfers, and tailored sightseeing itineraries.',
          includedDetails: [
            'Complete Flight + Hotel + Private Transfer packages',
            'Custom itineraries built around your city and hotel choice',
            'Seasonal packages for couples, families, and groups'
          ]
        }
      }
    },
    plannerSection: {
      eyebrow: 'Google Maps Connected Request',
      title: 'Plan Your Trip & Explore on Maps',
      subtitle:
        'Select any service below — the contact form and Google Maps panel dynamically adapt so you can write any city or search any hotel directly on the map.',
      serviceLabel: 'Selected Service',
      destLabel: 'Horizon Destination / City (Write Any Location)',
      destPlaceholder: 'Write any city or country (e.g., Makkah, Paris, Istanbul, Swiss Alps)...',
      hotelLabel: 'Hotel Name (Write Any Hotel or Pick on Maps)',
      hotelPlaceholder: 'Write any hotel name (e.g., Swissotel Makkah, Four Seasons, Burj Al Arab)...',
      departureCityLabel: 'Departure City / Airport',
      departureCityPlaceholder: 'e.g., Casablanca (CMN), Rabat-Salé (RBA), London...',
      visaPurposeLabel: 'Visa Type & Consulate',
      visaPurposePlaceholder: 'e.g., Schengen Tourist, El Omra, Business, UK Visitor...',
      insurancePlanLabel: 'Coverage Plan',
      insurancePlanOptions: [
        'Schengen Compliant (€30,000+)',
        'Worldwide Comprehensive',
        'Family Multi-Risk Coverage'
      ],
      nameLabel: 'Full Name',
      namePlaceholder: 'Your full name',
      phoneLabel: 'Phone / WhatsApp',
      departureDateLabel: 'Departure Date',
      returnDateLabel: 'Return Date',
      timeLabel: 'Preferred Time',
      travelersLabel: 'Travelers',
      notesLabel: 'Additional Notes',
      notesPlaceholder: 'Room type, airline preference, budget, or custom requests...',
      submitBtn: 'Prepare WhatsApp Request',
      dossierReady: 'Travel Request Ready',
      adjustBtn: 'Adjust Details',
      selectedServiceLabel: 'Service',
      scheduleLabel: 'Date & Time',
      locationSummaryLabel: 'Destination / City',
      hotelSummaryLabel: 'Hotel',
      sendWhatsapp: 'Send via WhatsApp',
      callBtn: 'Call',
      beautifulStories: 'Golden Group Travels · Salé',
      returnBtn: 'Return to 3D Horizon',
      guestOptions: ['1 Solo Traveler', '2 Travelers', '3–5 Family Group', '6+ Private Party'],
      mapTitleHotel: 'Search Hotels on Google Maps',
      mapTitleCity: 'Explore Destination on Google Maps',
      mapTitleVisa: 'Visa Center, Consulate & Agency on Google Maps',
      mapHotelHint: 'Write any hotel name or city and click Search to drop hotel markers and select your preferred stay.',
      mapCityHint: 'Enter any destination city or landmark to preview and pin its exact location on Google Maps.',
      mapVisaHint: 'Search your destination, consulate, or visa application center (VFS Global, TLScontact) on Google Maps, or open our Salé agency location.',
      visaCenterLabel: 'Consulate / Visa Center (Google Maps Search)',
      visaCenterPlaceholder: 'e.g., TLScontact Rabat, VFS Global, Consulate...',
      agencyMapCardTitle: 'Golden Group Agency · Salé',
      agencyMapBtn: 'Open Agency in Google Maps',
      mapSearchBtn: 'Search Maps',
      mapSearching: 'Searching...',
      mapResultsTitle: 'Google Maps Results',
      mapSelectPin: 'Use This Place',
      mapSelectedTag: 'Selected',
      mapEmptyNote: 'No places returned for that search — you can still submit any hotel or city typed in the form.',
      mapKeyMissing: 'Google Maps preview is initializing — you can freely type any city and hotel name in the form.'
    },
    footer: {
      servicesTitle: 'Our Services',
      agencyTitle: 'Salé Agency',
      conciergeTitle: 'Direct Concierge',
      phoneDesc: 'Direct Agency Phone',
      whatsappDesc: 'WhatsApp Direct Line',
      mapsCta: 'Open in Google Maps',
      rights: 'All rights reserved.',
      discoverLine: 'Discover · Explore · Experience · Repeat'
    }
  },
  es: {
    dir: 'ltr',
    hero: {
      headlineTop: 'YOUR NEXT',
      headlineGold: 'JOURNEY STARTS HERE.',
      subtitle: 'Viajes a medida. Planificación fluida. Lugares inolvidables.',
      discoverTags: ['Descubrir', 'Explorar', 'Vivir', 'Repetir'],
      extraordinaryNote: 'Destinos Extraordinarios · Un Mañana Luminoso',
      domesticNote: 'Viajes Nacionales e Internacionales',
      exploreCta: 'Explorar Viajes',
      worldHorizonsLabel: 'Horizontes del Mundo',
      omraBottomLabel: 'El Omra · La Meca',
      categories: {
        flights: 'Vuelos',
        hotels: 'Hoteles',
        holidays: 'Vacaciones',
        tours: 'Circuitos'
      }
    },
    nav: {
      horizons: 'Horizontes',
      services: 'Servicios',
      planner: 'Reservas y Mapa',
      contact: 'Contacto',
      curateCta: 'Planificar'
    },
    horizonsSection: {
      eyebrow: 'Descubrir · Explorar · Vivir · Repetir',
      title: 'Tres Horizontes Extraordinarios',
      subtitle: 'Viajes a medida. Planificación fluida. Lugares inolvidables.',
      selectDest: 'Elegir este Destino',
      omraBadge: 'El Omra · La Meca',
      omraTalbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْك',
      omraTapHint: 'Haz clic en el icono de La Meca para ver la caligrafía árabe',
      omraBookCta: 'Solicitar Paquete El Omra',
      destinations: {
        'swiss-alps': {
          id: 'swiss-alps',
          title: 'Los Alpes Suizos',
          region: 'Oberland Bernés y Engadina',
          season: 'Todo el año · Jun–Sep y Dic–Mar',
          altitudeOrCoast: 'Cumbres Alpinas y Lagos Glaciares',
          summary:
            'Lagos glaciares de color turquesa bajo cumbres nevadas, chalés alpinos entre bosques de pinos y rutas ferroviarias panorámicas.',
          highlights: [
            'Chalés privados frente al lago y hoteles cinco estrellas',
            'Trenes alpinos panorámicos y excursiones glaciares',
            'Rutas guiadas de alta montaña y spas termales'
          ],
          imageAlt:
            'Vista aérea de los Alpes Suizos con picos nevados sobre un lago turquesa rodeado de pinos'
        },
        makkah: {
          id: 'makkah',
          title: 'La Meca, Arabia Saudita',
          region: 'Santuario de Masjid al-Haram',
          season: 'Todo el año · El Omra y Temporadas Espirituales',
          altitudeOrCoast: 'Patio Sagrado y Vistas al Haram',
          summary:
            'Cercanía reverente a la Sagrada Kaaba y Masjid al-Haram con gestión integral de visados, traslados privados y suites con vistas al santuario.',
          highlights: [
            'Suites de acceso directo con vistas a Masjid al-Haram y la Kaaba',
            'Planificación integral de El Omra con traslados privados',
            'Asistencia multilingüe dedicada de llegada a salida'
          ],
          imageAlt:
            'Vista de la Sagrada Kaaba en el centro de Masjid al-Haram y sus minaretes iluminados en La Meca'
        },
        mediterranean: {
          id: 'mediterranean',
          title: 'Costa Mediterránea',
          region: 'Bahías Soleadas y Puertos Históricos',
          season: 'Mayo–Octubre · Temporada Marítima Dorada',
          altitudeOrCoast: 'Calas Turquesa y Acantilados',
          summary:
            'Pueblos en terrazas sobre aguas cristalinas color turquesa, travesías privadas en velero por calas escondidas y atardeceres dorados.',
          highlights: [
            'Suites boutique en acantilados con terraza privada al mar',
            'Travesías de día por calas turquesa e islas costeras',
            'Traslados costeros privados y paseos históricos'
          ],
          imageAlt:
            'Ciudad costera mediterránea soleada sobre el mar turquesa con veleros'
        }
      }
    },
    servicesSection: {
      eyebrow: 'Golden Group · Servicios Principales',
      title: 'Nuestros Servicios',
      subtitle:
        'Nuestros cinco servicios esenciales para organizar con excelencia cada vuelo, hotel, visado, seguro y viaje.',
      provisionTag: 'Servicio Principal',
      configurePrefix: 'Seleccionar',
      services: {
        'flight-bookings': {
          id: 'flight-bookings',
          label: 'Flight Bookings',
          headline: 'Reserva de Vuelos Internacionales',
          description:
            'Emisión de billetes en Primera, Business o Turista con rutas optimizadas y asistencia ante cualquier cambio.',
          includedDetails: [
            'Vuelos directos y multidestino en todo el mundo',
            'Selección preferente de asiento y equipaje',
            'Seguimiento continuo y soporte en cambios'
          ]
        },
        'hotel-reservations': {
          id: 'hotel-reservations',
          label: 'Hotel Reservations',
          headline: 'Reserva de Hoteles a Tu Elección',
          description:
            'Elige cualquier hotel en cualquier ciudad del mundo, búscalo directamente en Google Maps y gestionamos tu reserva.',
          includedDetails: [
            'Libertad para escribir cualquier hotel o seleccionarlo en el mapa',
            'Categorías de habitación y suites verificadas',
            'Coordinación de check-in anticipado y salida tardía'
          ]
        },
        'visa-assistance': {
          id: 'visa-assistance',
          label: 'Visa Assistance',
          headline: 'Asistencia Integral de Visados',
          description:
            'Acompañamiento completo para visados Schengen, El Omra, Turquía, EAU, Reino Unido y EE. UU.',
          includedDetails: [
            'Revisión exhaustiva de documentos requeridos',
            'Gestión de citas y formularios consulares',
            'Reservas de vuelo y hotel válidas para tu expediente'
          ]
        },
        'travel-insurance': {
          id: 'travel-insurance',
          label: 'Travel Insurance',
          headline: 'Seguro de Viaje Internacional',
          description:
            'Pólizas médicas, repatriación, equipaje y cancelación conformes a los requisitos de embajadas y visado Schengen.',
          includedDetails: [
            'Certificados válidos para visado Schengen e internacional',
            'Asistencia médica global 24 horas',
            'Opciones individuales, familiares y multiviaje'
          ]
        },
        'holiday-packages': {
          id: 'holiday-packages',
          label: 'Holiday Packages',
          headline: 'Paquetes Vacacionales a Medida',
          description:
            'Escapadas completas con vuelo, el hotel que tú elijas, traslados privados e itinerarios personalizados.',
          includedDetails: [
            'Paquetes completos de Vuelo + Hotel + Traslados',
            'Rutas diseñadas según la ciudad y hotel que escribas',
            'Programas para parejas, familias y grupos'
          ]
        }
      }
    },
    plannerSection: {
      eyebrow: 'Formulario Conectado a Google Maps',
      title: 'Diseña Tu Viaje en el Mapa',
      subtitle:
        'Elige un servicio: el formulario y Google Maps se adaptan automáticamente para escribir cualquier ciudad o buscar el hotel deseado.',
      serviceLabel: 'Servicio Seleccionado',
      destLabel: 'Destino Horizonte / Ciudad (Texto Libre)',
      destPlaceholder: 'Escribe cualquier ciudad o país (ej. París, La Meca, Estambul)...',
      hotelLabel: 'Nombre del Hotel (Texto Libre o en el Mapa)',
      hotelPlaceholder: 'Escribe el nombre de cualquier hotel...',
      departureCityLabel: 'Ciudad de Salida',
      departureCityPlaceholder: 'Ej. Casablanca (CMN), Rabat-Salé (RBA), Madrid...',
      visaPurposeLabel: 'Tipo de Visado',
      visaPurposePlaceholder: 'Ej. Turismo Schengen, El Omra, Negocios...',
      insurancePlanLabel: 'Plan de Cobertura',
      insurancePlanOptions: [
        'Schengen Conforme (30.000 €)',
        'Cobertura Mundial Completa',
        'Plan Familiar Multirriesgo'
      ],
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'Tu nombre completo',
      phoneLabel: 'Teléfono / WhatsApp',
      departureDateLabel: 'Fecha de Salida',
      returnDateLabel: 'Fecha de Regreso',
      timeLabel: 'Hora Preferida',
      travelersLabel: 'Viajeros',
      notesLabel: 'Notas Adicionales',
      notesPlaceholder: 'Tipo de habitación, aerolínea preferida o solicitudes especiales...',
      submitBtn: 'Preparar Solicitud WhatsApp',
      dossierReady: 'Solicitud Lista para Enviar',
      adjustBtn: 'Editar',
      selectedServiceLabel: 'Servicio',
      scheduleLabel: 'Fechas y Hora',
      locationSummaryLabel: 'Destino / Ciudad',
      hotelSummaryLabel: 'Hotel',
      sendWhatsapp: 'Enviar por WhatsApp',
      callBtn: 'Llamar',
      beautifulStories: 'Golden Group Travels · Salé',
      returnBtn: 'Volver al Horizonte 3D',
      guestOptions: ['1 Viajero', '2 Viajeros', '3–5 Familia', '6+ Grupo'],
      mapTitleHotel: 'Buscar Hoteles en Google Maps',
      mapTitleCity: 'Explorar Destino en Google Maps',
      mapTitleVisa: 'Centros de Visado, Consulado y Agencia en Google Maps',
      mapHotelHint: 'Escribe un hotel o ciudad y pulsa Buscar para ver marcadores en el mapa.',
      mapCityHint: 'Escribe cualquier ciudad o destino para centrarlo en Google Maps.',
      mapVisaHint: 'Busca tu destino, consulado o centro de visados (VFS Global, TLScontact) en Google Maps, o abre la ubicación de nuestra agencia en Salé.',
      visaCenterLabel: 'Consulado / Centro de Visados (Búsqueda en Google Maps)',
      visaCenterPlaceholder: 'Ej. TLScontact Rabat, VFS Global, Consulado...',
      agencyMapCardTitle: 'Agencia Golden Group · Salé',
      agencyMapBtn: 'Abrir Agencia en Google Maps',
      mapSearchBtn: 'Buscar en Mapa',
      mapSearching: 'Buscando...',
      mapResultsTitle: 'Resultados de Google Maps',
      mapSelectPin: 'Seleccionar este lugar',
      mapSelectedTag: 'Seleccionado',
      mapEmptyNote: 'Sin resultados para esta búsqueda — igualmente puedes enviar cualquier hotel o ciudad escrita manualmente.',
      mapKeyMissing: 'Mapa inicializándose — puedes escribir libremente tu ciudad y hotel en el formulario.'
    },
    footer: {
      servicesTitle: 'Nuestros Servicios',
      agencyTitle: 'Agencia Salé',
      conciergeTitle: 'Contacto Directo',
      phoneDesc: 'Teléfono Directo',
      whatsappDesc: 'Línea Directa WhatsApp',
      mapsCta: 'Abrir en Google Maps',
      rights: 'Todos los derechos reservados.',
      discoverLine: 'Descubrir · Explorar · Vivir · Repetir'
    }
  }
};
