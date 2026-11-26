import { Language, ServiceId } from './destinations';

export interface ServiceFeatureDetail {
  title: string;
  detail: string;
}

export interface ServiceStepDetail {
  title: string;
  detail: string;
}

export interface ServicePageContent {
  tagline: string;
  overview: string;
  highlights: ServiceFeatureDetail[];
  steps: ServiceStepDetail[];
}

export interface ServicePageChrome {
  backToHome: string;
  openPageCta: string;
  highlightsTitle: string;
  processTitle: string;
  bookNowCta: string;
  omraToggleHint: string;
  allServicesNavLabel: string;
  homeNavLabel: string;
}

export const SERVICE_PAGE_CHROME: Record<Language, ServicePageChrome> = {
  fr: {
    backToHome: 'Retour à l’Accueil',
    openPageCta: 'Découvrir',
    highlightsTitle: 'Prestations & Avantages Inclus',
    processTitle: 'Comment Nous Organisons Votre Demande',
    bookNowCta: 'Planifier sur Google Maps',
    omraToggleHint: 'Afficher / Masquer la Calligraphie',
    allServicesNavLabel: 'Nos Services',
    homeNavLabel: 'Accueil'
  },
  ar: {
    backToHome: 'العودة إلى الرئيسية',
    openPageCta: 'استكشاف',
    highlightsTitle: 'المميزات والخدمات المشمولة',
    processTitle: 'كيف ننظّم رحلتك خطوة بخطوة',
    bookNowCta: 'احجز عبر خرائط جوجل',
    omraToggleHint: 'إظهار / إخفاء التلبية بالخط الذهبي',
    allServicesNavLabel: 'خدماتنا',
    homeNavLabel: 'الرئيسية'
  },
  en: {
    backToHome: 'Back to Home',
    openPageCta: 'Explore',
    highlightsTitle: 'Included Privileges & Details',
    processTitle: 'How Our Desk Coordinates Your Service',
    bookNowCta: 'Plan on Google Maps',
    omraToggleHint: 'Toggle Gold Calligraphy',
    allServicesNavLabel: 'Services',
    homeNavLabel: 'Home'
  },
  es: {
    backToHome: 'Volver al Inicio',
    openPageCta: 'Explorar',
    highlightsTitle: 'Servicios y Ventajas Incluidas',
    processTitle: 'Cómo Organizamos Tu Solicitud',
    bookNowCta: 'Planificar en Google Maps',
    omraToggleHint: 'Mostrar / Ocultar Caligrafía',
    allServicesNavLabel: 'Servicios',
    homeNavLabel: 'Inicio'
  }
};

export const SERVICE_PAGE_DETAILS: Record<
  Language,
  Record<ServiceId, ServicePageContent>
> = {
  fr: {
    'flight-bookings': {
      tagline: 'Billetterie Aérienne Internationale & Correspondances Optimisées',
      overview:
        'Golden Group Travels émet vos billets sur l’ensemble des compagnies aériennes régulières et low-cost au départ du Maroc et de l’étranger. Nous optimisons vos temps d’escale, vos franchises bagages et vos options de modification pour voyager l’esprit libre.',
      highlights: [
        {
          title: 'Toutes Compagnies & Classes',
          detail:
            'Tarifs négociés en Économique, Affaires et Première Classe vers l’Europe, le Golfe, l’Amérique et l’Asie.'
        },
        {
          title: 'Itinéraires Multi-Destinations',
          detail:
            'Combinaison intelligente de vols aller-retour, open-jaw ou multi-escales adaptés à vos rendez-vous.'
        },
        {
          title: 'Bagages & Sièges Préférentiels',
          detail:
            'Réservation anticipée de vos sièges côte à côte, options repas spéciaux et bagages supplémentaires.'
        },
        {
          title: 'Suivi & Modifications 7j/7',
          detail:
            'Accompagnement réactif en cas d’imprévu horaire, report de date ou réémission d’urgence.'
        }
      ],
      steps: [
        {
          title: 'Définissez Votre Trajet',
          detail:
            'Indiquez votre ville de départ, votre destination et vos dates flexibles ou fixes.'
        },
        {
          title: 'Comparaison & Option Tarifs',
          detail:
            'Notre équipe sélectionne les meilleures correspondances avec bagages inclus et transparence totale.'
        },
        {
          title: 'Émission & Suivi Embarquement',
          detail:
            'Réception immédiate de votre e-billet et assistance continue jusqu’à votre arrivée.'
        }
      ]
    },
    'hotel-reservations': {
      tagline: 'Sélection Mondiale d’Hôtels, Riads & Suites de Prestige',
      overview:
        'Choisissez librement n’importe quel hôtel dans le monde ou repérez-le directement sur Google Maps. Nous sécurisons la catégorie de chambre souhaitée, les vues demandées et vos conditions d’arrivée au meilleur tarif contractuel.',
      highlights: [
        {
          title: 'Liberté Totale d’Établissement',
          detail:
            'Écrivez le nom de n’importe quel hôtel 3★, 4★, 5★ ou boutique-hôtel : nous vérifions sa disponibilité réelle.'
        },
        {
          title: 'Repérage Direct sur Google Maps',
          detail:
            'Visualisez l’emplacement exact près des transports, plages ou quartiers d’affaires avant de confirmer.'
        },
        {
          title: 'Chambres Famille & Formules',
          detail:
            'Suites communicantes, demi-pension, tout-compris ou petit-déjeuner gastronomique inclus.'
        },
        {
          title: 'Attestations Conformes Visa',
          detail:
            'Bons d’échange officiels et confirmations nominatives prêts pour vos démarches consulaires.'
        }
      ],
      steps: [
        {
          title: 'Choisissez l’Hôtel ou le Quartier',
          detail:
            'Saisissez l’établissement désiré ou cliquez directement sur les marqueurs Google Maps.'
        },
        {
          title: 'Validation Chambre & Pension',
          detail:
            'Précisez le nombre de voyageurs, dates d’arrivée/départ et demandes particulières.'
        },
        {
          title: 'Confirmation Officielle',
          detail:
            'Nous finalisons votre voucher hôtelier garanti avec notre équipe de Salé.'
        }
      ]
    },
    'visa-assistance': {
      tagline: 'Montage Rigoureux de Dossiers Schengen, Omra, UK, EAU & Monde',
      overview:
        'Préparer un dossier de visa exige précision et conformité. Nos conseillers vous accompagnent de la vérification initiale de vos justificatifs jusqu’à la prise de rendez-vous auprès des centres VFS Global, TLScontact ou consulats.',
      highlights: [
        {
          title: 'Audit Complet des Justificatifs',
          detail:
            'Contrôle détaillé de chaque pièce financière, professionnelle et familiale selon le pays visé.'
        },
        {
          title: 'Formulaires & Lettres Explicatives',
          detail:
            'Saisie soignée des formulaires consulaires officiels et rédaction claire de votre projet de voyage.'
        },
        {
          title: 'Réservations Conformes au Dossier',
          detail:
            'Émission d’itinéraires de vol et vouchers d’hôtel répondant aux critères d’ambassade.'
        },
        {
          title: 'Localisation Consulats & Agence',
          detail:
            'Repérez VFS Global / TLScontact sur Google Maps ou passez directement à notre agence à Salé.'
        }
      ],
      steps: [
        {
          title: 'Diagnostic du Type de Visa',
          detail:
            'Analyse personnalisée selon votre motif (tourisme, affaires, famille, pèlerinage ou études).'
        },
        {
          title: 'Constitution & Vérification',
          detail:
            'Montage complet du dossier, réservations associées et prise de rendez-vous.'
        },
        {
          title: 'Dépôt & Suivi Jusqu’au Retour',
          detail:
            'Vous déposez un dossier ordonné et prêt en toute sérénité.'
        }
      ]
    },
    'hajj-umrah': {
      tagline: 'Accompagnement Spirituel & Séjours Privilégiés Hajj & Omra',
      overview:
        'Vivez votre Hajj & Omra dans la quiétude et la dignité. Nous organisons l’ensemble du pèlerinage : hôtels à deux pas de Masjid al-Haram et Masjid an-Nabawi, visas saoudiens officiels, vols directs, train Haramain et encadrement attentionné.',
      highlights: [
        {
          title: 'Hôtels Face à Masjid al-Haram',
          detail:
            'Séjours en hôtels 4★ et 5★ (Clock Tower, Jabal Omar, Anjum) avec accès piéton direct à l’esplanade et vue Kaaba.'
        },
        {
          title: 'Visa El Omra & Formalités Nusuk',
          detail:
            'Prise en charge intégrale du visa Omra saoudien et conformité santé et permis sur plateforme officielle.'
        },
        {
          title: 'Transferts VIP & Train Haramain',
          detail:
            'Accueil à l’aéroport de Djeddah ou Médine, transferts climatisés privés et liaison rapide entre les deux Villes Saintes.'
        },
        {
          title: 'Encadrement & Ziyarat Guidées',
          detail:
            'Visites spirituelles des lieux saints pendant votre Hajj & Omra avec accompagnateurs bilingues Arabe / Français.'
        }
      ],
      steps: [
        {
          title: 'Choisissez Votre Période & Hôtel Haram',
          detail:
            'Sélectionnez vos dates (hors saison, vacances, Chaabane, Ramadan) et votre hôtel proche du Haram sur Google Maps.'
        },
        {
          title: 'Visa & Vols Dédiés',
          detail:
            'Nous validons vos passeports, émettons le visa El Omra et confirmons vos vols aller-retour.'
        },
        {
          title: 'Départ Serein Vers les Lieux Saints',
          detail:
            'Assistance complète au départ, accueil sur place et coordination continue jusqu’au retour.'
        }
      ]
    },
    'travel-insurance': {
      tagline: 'Protection Médicale & Assistance Internationale Certifiée Ambassade',
      overview:
        'Voyagez couvert contre les imprévus médicaux, hospitalisations, retards de vol ou pertes de bagages. Nos attestations sont immédiatement reconnues par tous les consulats Schengen et compagnies internationales.',
      highlights: [
        {
          title: 'Attestation Schengen ≥ 30 000 €',
          detail:
            'Document nominatif immédiat conforme aux normes des consulats européens et espaces Schengen.'
        },
        {
          title: 'Frais Médicaux & Rapatriement',
          detail:
            'Couverture des soins d’urgence, hospitalisation et rapatriement sanitaire 24h/24 dans le monde entier.'
        },
        {
          title: 'Bagages, Retards & Annulation',
          detail:
            'Indemnisation en cas de perte de bagages, retard aérien important ou annulation justifiée.'
        },
        {
          title: 'Individuel, Famille & Annuel',
          detail:
            'Formules flexibles adaptées à un voyage ponctuel ou à vos déplacements professionnels annuels.'
        }
      ],
      steps: [
        {
          title: 'Sélectionnez la Zone & Formule',
          detail:
            'Schengen, Monde Entier ou Famille selon la destination et la durée du séjour.'
        },
        {
          title: 'Renseignez Vos Dates de Voyage',
          detail:
            'La couverture s’ajuste jour pour jour à votre billet aller-retour.'
        },
        {
          title: 'Réception Rapide de l’Attestation',
          detail:
            'Votre certificat officiel prêt à être présenté à l’ambassade ou emporté en voyage.'
        }
      ]
    },
    'holiday-packages': {
      tagline: 'Séjours Sur Mesure, Escapades Alpines, Côtières & Grands Circuits',
      overview:
        'Des vacances clés en main pensées pour votre rythme : vols aller-retour, l’hôtel de votre choix sélectionné sur Google Maps, transferts aéroport privés et découvertes culturelles ou balnéaires sur mesure.',
      highlights: [
        {
          title: 'Forfaits Complets Vol + Hôtel',
          detail:
            'Une réservation unique et coordonnée combinant billets d’avion, hébergement et petits-déjeuners.'
        },
        {
          title: 'Liberté Totale de Destination',
          detail:
            'Turquie, Dubaï, Suisse, Côte Méditerranéenne, Paris, Maldives ou circuits au Maroc — vous choisissez.'
        },
        {
          title: 'Transferts & Excursions Privées',
          detail:
            'Chauffeur à l’arrivée, croisières, billets coupe-file et guides francophones ou arabophones.'
        },
        {
          title: 'Couples, Familles & Groupes',
          detail:
            'Voyages de noces, vacances scolaires familiales et séjours d’entreprise personnalisés.'
        }
      ],
      steps: [
        {
          title: 'Choisissez Ville & Hôtel Souhaités',
          detail:
            'Écrivez librement la destination et repérez votre hôtel ou plage idéale directement sur Google Maps.'
        },
        {
          title: 'Proposition Sur Mesure',
          detail:
            'Nous assemblons vols, nuits d’hôtel, transferts et options d’activités selon votre budget.'
        },
        {
          title: 'Carnet de Voyage Complet',
          detail:
            'Vous partez avec tous vos billets, vouchers et contacts concierge sur WhatsApp.'
        }
      ]
    }
  },
  ar: {
    'flight-bookings': {
      tagline: 'حجز تذاكر الطيران الدولية والرحلات المباشرة بأفضل الأسعار',
      overview:
        'توفر لكم وكالة جولدن جروب حجوزات تذاكر الطيران مع جميع شركات الطيران العالمية انطلاقاً من المغرب أو أي مطار دولي، مع اختيار المسارات الأسرع والدرجة المناسبة ومرونة تعديل المواعيد.',
      highlights: [
        {
          title: 'جميع شركات الطيران والدرجات',
          detail:
            'تذاكر في الدرجة الاقتصادية، درجة الأعمال، والدرجة الأولى نحو أوروبا، الخليج، آسيا والأمريكتين.'
        },
        {
          title: 'رحلات مباشرة ومتعددة الوجهات',
          detail:
            'تنسيق ذكي للرحلات المترابطة والوجهات المتعددة لتقليل أوقات الانتظار في المطارات.'
        },
        {
          title: 'اختيار المقاعد والأمتعة',
          detail:
            'تأكيد المقاعد المفضلة وإضافة الأمتعة الإضافية قبل السفر بكل سهولة.'
        },
        {
          title: 'دعم وتعديل مستمر 7/7',
          detail:
            'متابعة فورية لأي تغيير في جدول الرحلة أو طلب إعادة جدولة طارئة.'
        }
      ],
      steps: [
        {
          title: 'حدّد مسار رحلتك',
          detail:
            'أدخل مدينة الانطلاق والوجهة المرغوبة وتواريخ السفر عبر النموذج.'
        },
        {
          title: 'مقارنة أفضل الخيارات',
          detail:
            'نقدم لك أسرع الرحلات وأفضل الأسعار شاملة الأمتعة دون رسوم خفية.'
        },
        {
          title: 'إصدار التذكرة الفوري',
          detail:
            'استلم تذكرتك الإلكترونية عبر واتساب مع مرافقة تامة حتى موعد الصعود.'
        }
      ]
    },
    'hotel-reservations': {
      tagline: 'حرية اختيار أي فندق في العالم وتأكيده مباشرة عبر خرائط جوجل',
      overview:
        'اكتب اسم أي فندق ترغب بالإقامة فيه أو ابحث عنه مباشرة على خرائط جوجل، ونحن نتكفل بتأكيد الغرف والأجنحة والوجبات وإطلالات الحرم أو البحر بأفضل الشروط التعاقدية.',
      highlights: [
        {
          title: 'حرية كاملة في اختيار الفندق',
          detail:
            'سواء كان فندق 5 نجوم، منتجعاً عائلياً أو إقامة بوتيك، يمكنك كتابة اسمه أو تحديده على الخريطة.'
        },
        {
          title: 'معاينة الموقع عبر خرائط جوجل',
          detail:
            'تأكد من المسافة الحقيقية عن المعالم، المطار، أو الساحات قبل اعتماد الحجز.'
        },
        {
          title: 'أجنحة عائلية وخيارات الوجبات',
          detail:
            'خيارات الإفطار، نصف إقامة، أو إقامة شاملة مع غرف متصلة للعائلات.'
        },
        {
          title: 'تأكيدات معتمدة لملفات التأشيرة',
          detail:
            'وصولات حجز فندقية رسمية وموثقة جاهزة للتقديم القنصلي.'
        }
      ],
      steps: [
        {
          title: 'ابحث عن الفندق على الخريطة',
          detail:
            'اكتب اسم الفندق والمدينة لتظهر لك النتائج على خرائط جوجل وتختار فندقك.'
        },
        {
          title: 'تحديد التواريخ وعدد الأفراد',
          detail:
            'اختر تواريخ الوصول والمغادرة ونوع الغرفة المطلوبة.'
        },
        {
          title: 'استلام تأكيد الحجز الرسمي',
          detail:
            'نُصدر لك تأكيد الإقامة المضمون مع متابعة شخصية من فريقنا بسلا.'
        }
      ]
    },
    'visa-assistance': {
      tagline: 'مرافقة متخصصة لتجهيز ملفات تأشيرات شنغن، العمرة، بريطانيا، الإمارات وأمريكا',
      overview:
        'نُعدّ ملف التأشيرة الخاص بك بدقة واحترافية عالية لتفادي أي نقص في الوثائق: مراجعة كاملة للأوراق، تعبئة الاستمارات، حجز المواعيد في TLScontact أو VFS Global، وتجهيز حجوزات الفنادق والطيران المطابقة.',
      highlights: [
        {
          title: 'مراجعة دقيقة لقائمة الوثائق',
          detail:
            'فحص شامل لكل وثيقة مهنية ومالية وعائلية حسب متطلبات سفارة البلد المطلوب.'
        },
        {
          title: 'حجز المواعيد وتعبئة الاستمارات',
          detail:
            'تعبئة الاستمارات القنصلية وتنسيق مواعيد الإيداع في المراكز المعتمدة.'
        },
        {
          title: 'إرفاق الحجوزات المطابقة للملف',
          detail:
            'تجهيز حجوزات الطيران والفنادق المعتمدة للملف القنصلي.'
        },
        {
          title: 'موقع المراكز ووكالتنا على الخريطة',
          detail:
            'ابحث عن أقرب قنصلية أو مركز تأشيرات أو قم بزيارة مقر جولدن جروب بسلا عبر خرائط جوجل.'
        }
      ],
      steps: [
        {
          title: 'تحديد نوع التأشيرة والوجهة',
          detail:
            'دراسة وضعك والغرض من السفر (سياحة، أعمال، زيارة عائلية أو عمرة).'
        },
        {
          title: 'تجهيز وتنسيق الملف بالكامل',
          detail:
            'ترتيب كافة الوثائق الرسمية وحجز الموعد مع متابعة دقيقة لكل تفصيل.'
        },
        {
          title: 'استلام ملف جاهز للإيداع',
          detail:
            'تتوجه إلى مركز التأشيرات بملف منظم ومكتمل يرفع فرص القبول.'
        }
      ]
    },
    'hajj-umrah': {
      tagline: 'برامج عمرة وحج متكاملة وإقامة فاخرة في رحاب المسجد الحرام والمسجد النبوي',
      overview:
        'انعم برحلة روحانية مطمئنة في برنامج الحج والعمرة. نوفر لك فنادق مطلة مباشرة على الحرم المكي والنبوي، إصدار التأشيرة، الطيران المريح، قطار الحرمين، والتنقلات الخاصة مع إرشاد ديني ولوجستي طوال الرحلة.',
      highlights: [
        {
          title: 'فنادق مطلة مباشرة على الحرم',
          detail:
            'اختيار أرقى فنادق 4 و5 نجوم في أبراج الساعة وجبل عمر بالقرب المباشر من صحن الكعبة المشرفة.'
        },
        {
          title: 'تأشيرة العمرة وتصاريح نسك',
          detail:
            'إنهاء كافة إجراءات تأشيرة العمرة السعودية وتنسيق مواعيد الروضة الشريفة عبر المنصات المعتمدة.'
        },
        {
          title: 'مواصلات خاصة وقطار الحرمين',
          detail:
            'استقبال خاص في مطار جدة أو المدينة وتنقلات مريحة عبر الحافلات الحديثة أو قطار الحرمين السريع.'
        },
        {
          title: 'مزارات وإرشاد روحي مستمر',
          detail:
            'جولات للمزارات التاريخية ضمن رحلات الحج والعمرة مع مرافقين متحدثين بالعربية والفرنسية.'
        }
      ],
      steps: [
        {
          title: 'اختر موسم العمرة والفندق المفضل',
          detail:
            'حدّد تواريخ السفر والفندق المطلوب لرحلة الحج والعمرة مباشرة على خرائط جوجل.'
        },
        {
          title: 'إصدار التأشيرة وتذاكر الطيران',
          detail:
            'نتولى استخراج التأشيرة وتأكيد مقاعد الطيران والغرف الفندقية المطلوبة.'
        },
        {
          title: 'رحلة مباركة ومرافقة شاملة',
          detail:
            'توديع وتوجيه قبل السفر، واستقبال ومرافقة حتى أداء المناسك والعودة سالمين.'
        }
      ]
    },
    'travel-insurance': {
      tagline: 'تأمين سفر دولي معتمد للسفارات وتغطية شاملة طوال رحلتك',
      overview:
        'سافر باطمئنان مع بوليصة تأمين سفر دولية معتمدة لدى جميع القنصليات والسفارات: تغطية الطوارئ الطبية، الإجلاء الصحي، فقدان الأمتعة، وتأخر الرحلات لك ولعائلتك.',
      highlights: [
        {
          title: 'بوليصة معتمدة لشنغن (30,000 يورو)',
          detail:
            'شهادة تأمين فورية ومقبولة بالكامل في جميع ملفات فيزا شنغن والتأشيرات الأوروبية.'
        },
        {
          title: 'رعاية طبية ومستشفيات 24/24',
          detail:
            'تغطية مصاريف العلاج، العمليات الطارئة والإجلاء الطبي في مختلف دول العالم.'
        },
        {
          title: 'حماية الأمتعة وإلغاء الرحلات',
          detail:
            'تعويض عن ضياع الأمتعة أو التأخر المفاجئ في مواعيد الطيران.'
        },
        {
          title: 'باقات للأفراد والعائلات',
          detail:
            'خطط مرنة لرحلة واحدة أو سنوية للمسافرين الدائمين والعائلات.'
        }
      ],
      steps: [
        {
          title: 'اختر نوع التغطية المطلوبة',
          detail:
            'تغطية شنغن، تغطية عالمية شاملة، أو خطة عائلية متكاملة.'
        },
        {
          title: 'أدخل تواريخ الذهاب والعودة',
          detail:
            'يتم ضبط مدة البوليصة بدقة لتطابق تذاكر سفرك وملف التأشيرة.'
        },
        {
          title: 'استلام شهادة التأمين الرسمية',
          detail:
            'وثيقة معتمدة جاهزة للطباعة أو التقديم المباشر عبر واتساب.'
        }
      ]
    },
    'holiday-packages': {
      tagline: 'باقات عطلات شاملة صُمّمت خصيصاً وفق مدينتك وفندقك المفضل',
      overview:
        'اكتشف أجمل الوجهات العالمية مع باقات عطلات متكاملة تشمل الطيران ذهاباً وإياباً، الفندق الذي تختاره، الاستقبال الخاص في المطار، وبرنامجاً سياحياً متوازناً للعائلات والأزواج والمجموعات.',
      highlights: [
        {
          title: 'باقات شاملة: طيران + فندق + تنقلات',
          detail:
            'تنظيم موحّد لكل تفاصيل رحلتك لتستمتع بإجازتك دون عناء البحث والتنسيق.'
        },
        {
          title: 'تحديد أي وجهة وفندق تريده',
          detail:
            'إسطنبول، دبي، سويسرا، باريس، الساحل المتوسطي أو مدن المغرب — اكتب وجهتك وفندقك بحرية.'
        },
        {
          title: 'جولات خاصة وتجارب مميزة',
          detail:
            'رحلات بحرية، قطارات جبلية، تذاكر معالم وجولات سياحية مرشدة.'
        },
        {
          title: 'برامج شهر العسل والعائلات',
          detail:
            'تجهيزات خاصة للرحلات العائلية والأزواج والمجموعات الخاصة حسب الميزانية.'
        }
      ],
      steps: [
        {
          title: 'شاركنا وجهتك وفندقك المفضل',
          detail:
            'اكتب المدينة أو الفندق في النموذج أو اختره مباشرة على خرائط جوجل.'
        },
        {
          title: 'تصميم البرنامج الكامل',
          detail:
            'نعدّ لك عرضاً مفصلاً يشمل الطيران والإقامة والتنقلات والمقترحات السياحية.'
        },
        {
          title: 'انطلق واستمتع برحلتك',
          detail:
            'تسليم جميع التذاكر والحجوزات مع تواصل مباشر مع مستشار السفر الخاص بك.'
        }
      ]
    }
  },
  en: {
    'flight-bookings': {
      tagline: 'Global Commercial Airfare, Optimal Connections & 24/7 Ticketing Care',
      overview:
        'Golden Group Travels issues direct and multi-leg tickets across major international and regional carriers departing Morocco or worldwide. Every itinerary balances flight duration, baggage allowance, and schedule flexibility.',
      highlights: [
        {
          title: 'All Major Airlines & Cabins',
          detail:
            'Competitive fares across Economy, Business, and First Class cabins connecting Europe, the Gulf, Asia, and the Americas.'
        },
        {
          title: 'Direct & Multi-City Routing',
          detail:
            'Thoughtfully timed layovers, open-jaw tickets, and multi-destination itineraries tailored to your schedule.'
        },
        {
          title: 'Priority Seating & Baggage',
          detail:
            'Advance assignment of adjacent family seats, extra checked luggage, and special cabin requests.'
        },
        {
          title: 'Proactive Rebooking Desk',
          detail:
            'Fast human assistance whenever flight times shift or emergency date changes are needed.'
        }
      ],
      steps: [
        {
          title: 'Specify Route & Dates',
          detail:
            'Enter your departure airport, destination city, and preferred flight window below.'
        },
        {
          title: 'Curated Airline Options',
          detail:
            'Receive the clearest routes with transparent baggage rules and zero hidden fees.'
        },
        {
          title: 'Instant Ticket Issuance',
          detail:
            'Your confirmed e-tickets delivered smoothly with boarding and follow-up support.'
        }
      ]
    },
    'hotel-reservations': {
      tagline: 'Choose Any Hotel Worldwide & Verify Its Exact Location on Google Maps',
      overview:
        'Type any hotel name or browse directly on our connected Google Maps panel. Whether seeking Haram-view suites, lakeside alpine chalets, or boutique city palaces, our desk secures the room category and meal plan you prefer.',
      highlights: [
        {
          title: 'Write or Pick Any Hotel',
          detail:
            'Not limited to a fixed catalog—name any international chain, resort, or riad you wish to stay in.'
        },
        {
          title: 'Live Google Maps Verification',
          detail:
            'Inspect proximity to airports, sanctuaries, coastlines, and landmarks directly on the map.'
        },
        {
          title: 'Family Suites & Meal Plans',
          detail:
            'Connecting rooms, bed & breakfast, half-board, and luxury all-inclusive packages arranged seamlessly.'
        },
        {
          title: 'Embassy-Compliant Vouchers',
          detail:
            'Official named hotel confirmation documents prepared for international visa files when required.'
        }
      ],
      steps: [
        {
          title: 'Search Any City or Hotel on Maps',
          detail:
            'Type the hotel name in the form or click hotel pins directly inside the Google Maps view.'
        },
        {
          title: 'Select Dates & Room Setup',
          detail:
            'Add check-in, check-out, guest count, and view or bedding preferences.'
        },
        {
          title: 'Guaranteed Confirmation',
          detail:
            'Our Salé reservations desk locks in your booking and dispatches your official voucher.'
        }
      ]
    },
    'visa-assistance': {
      tagline: 'Structured Preparation for Schengen, El Omra, Turkey, UAE, UK & US Visas',
      overview:
        'Navigating embassy checklists demands precision. Our specialists audit your supporting documents, prepare consular forms, arrange appointments with VFS Global or TLScontact, and assemble compliant flight and hotel reservations.',
      highlights: [
        {
          title: 'Complete Document Audit',
          detail:
            'Line-by-line review of employment, financial, civil, and invitation records for your target consulate.'
        },
        {
          title: 'Application Forms & Appointments',
          detail:
            'Careful completion of official embassy forms and scheduling at authorized visa centers.'
        },
        {
          title: 'Compliant Itinerary & Reservations',
          detail:
            'Matched flight itineraries and hotel vouchers aligned with embassy visa checklist requirements.'
        },
        {
          title: 'Maps Center & Agency Locator',
          detail:
            'Locate VFS Global, TLScontact, or embassies on Google Maps—or visit our Salé office directly.'
        }
      ],
      steps: [
        {
          title: 'Share Destination & Visa Purpose',
          detail:
            'Tell us the country and category (tourist, business, family visit, study, or El Omra).'
        },
        {
          title: 'Checklist & Reservation Assembly',
          detail:
            'We verify each document, prepare forms, and generate matching travel confirmations.'
        },
        {
          title: 'Confident Consulate Submission',
          detail:
            'Arrive at your appointment with an organized, complete dossier ready for review.'
        }
      ]
    },
    'hajj-umrah': {
      tagline: 'Reverent Hajj & Omra Pilgrimages & Sacred Hospitality',
      overview:
        'Embark on your sacred journey with complete peace of mind. Golden Group Travels coordinates Haram-facing 4★ and 5★ hotels for your Hajj & Omra, official Saudi visas, direct flights, Haramain high-speed rail, and attentive multilingual ground hospitality.',
      highlights: [
        {
          title: 'Steps From Masjid al-Haram & Kaaba',
          detail:
            'Curated suites in Clock Tower, Jabal Omar, and Madinah central hotels for effortless prayer access.'
        },
        {
          title: 'Saudi Umra Visa & Nusuk Guidance',
          detail:
            'End-to-end visa processing, health requirements, and Rawdah permit guidance.'
        },
        {
          title: 'VIP Airport & Haramain Transfers',
          detail:
            'Private arrivals from Jeddah or Madinah airports plus comfortable intercity transport.'
        },
        {
          title: 'Guided Ziyarat & Ground Support',
          detail:
            'Guided historical visits during your Hajj & Omra led by Arabic, French, and English coordinators.'
        }
      ],
      steps: [
        {
          title: 'Choose Season & Haram Hotel',
          detail:
            'Pick your preferred travel window and explore Hajj & Omra hotels near Masjid al-Haram on Google Maps.'
        },
        {
          title: 'Visa & Flight Coordination',
          detail:
            'We validate passports, process your Umra visa, and lock in direct flights.'
        },
        {
          title: 'Serene Sacred Departure',
          detail:
            'Pre-departure orientation, Jeddah/Madinah meet-and-greet, and 24/7 assistance.'
        }
      ]
    },
    'travel-insurance': {
      tagline: 'Embassy-Approved Worldwide Medical, Baggage & Emergency Travel Protection',
      overview:
        'Travel safeguarded against unexpected medical emergencies, hospitalization, flight disruption, or luggage loss. Certificates are tailored for immediate acceptance at Schengen and global consulates.',
      highlights: [
        {
          title: 'Schengen Compliant (€30,000+)',
          detail:
            'Instant embassy-recognized coverage meeting European and Schengen consulate rules.'
        },
        {
          title: '24/7 Worldwide Medical Assistance',
          detail:
            'Round-the-clock emergency hospital care, evacuation, and medical repatriation worldwide.'
        },
        {
          title: 'Baggage & Disruption Cover',
          detail:
            'Financial protection for delayed flights, lost luggage, and unforeseen trip interruptions.'
        },
        {
          title: 'Solo, Family & Annual Options',
          detail:
            'Flexible single-trip or annual multi-trip policies covering individuals and entire families.'
        }
      ],
      steps: [
        {
          title: 'Pick Destination Zone & Tier',
          detail:
            'Choose between Schengen-compliant, global comprehensive, or family coverage.'
        },
        {
          title: 'Match Exact Travel Dates',
          detail:
            'Your coverage dates align cleanly with your flight itinerary and visa application.'
        },
        {
          title: 'Receive Official Certificate',
          detail:
            'Print-ready and embassy-accepted certificate delivered swiftly via our agency.'
        }
      ]
    },
    'holiday-packages': {
      tagline: 'Bespoke Getaways Pairing Flights, Chosen Hotels, Transfers & Excursions',
      overview:
        'Enjoy seamless vacations designed entirely around your wishes: international round-trip airfare, any hotel you choose on Google Maps, private airport transfers, and curated alpine, coastal, or historic city experiences.',
      highlights: [
        {
          title: 'Complete Flight + Hotel Bundles',
          detail:
            'Unified itineraries balancing comfort, central stays, breakfast, and private transfers.'
        },
        {
          title: 'Every Destination Open to You',
          detail:
            'Swiss Alps, Mediterranean Coast, Istanbul, Dubai, Paris, or Moroccan retreats—pick your dream city.'
        },
        {
          title: 'Private Drivers & Guided Tours',
          detail:
            'Smooth meet-and-greet airport pickups, scenic rail rides, boat charters, and local guides.'
        },
        {
          title: 'Honeymoons, Families & Groups',
          detail:
            'Custom-paced holiday planning adapted to couples, school holidays, and group celebrations.'
        }
      ],
      steps: [
        {
          title: 'Select Destination & Preferred Hotel',
          detail:
            'Type any destination and select your ideal hotel right on the Google Maps panel.'
        },
        {
          title: 'Custom Package Proposal',
          detail:
            'Our advisors tailor flight options, hotel categories, and sightseeing highlights.'
        },
        {
          title: 'Depart with Complete Peace of Mind',
          detail:
            'Carry a full digital travel dossier backed by WhatsApp concierge access.'
        }
      ]
    }
  },
  es: {
    'flight-bookings': {
      tagline: 'Billetes Aéreos Internacionales, Escalas Eficientes y Asistencia Continua',
      overview:
        'Golden Group Travels emite billetes directos y con conexión en todas las aerolíneas internacionales. Optimizamos tarifas, equipaje incluido y flexibilidad para viajar sin contratiempos.',
      highlights: [
        {
          title: 'Todas las Aerolíneas y Cabinas',
          detail:
            'Tarifas en clase Turista, Business y Primera hacia Europa, Oriente Medio, Asia y América.'
        },
        {
          title: 'Rutas Directas y Multidestino',
          detail:
            'Conexiones eficientes e itinerarios abiertos ajustados exactamente a tus planes.'
        },
        {
          title: 'Asientos y Equipaje Prioritario',
          detail:
            'Asignación anticipada de asientos juntos, maletas extra y solicitudes especiales a bordo.'
        },
        {
          title: 'Asistencia ante Cambios 7/7',
          detail:
            'Respuesta ágil ante reprogramaciones de horarios o cambios de última hora.'
        }
      ],
      steps: [
        {
          title: 'Indica Ruta y Fechas',
          detail:
            'Introduce tu ciudad de salida, destino deseado y fechas estimadas.'
        },
        {
          title: 'Selección de Mejores Vuelos',
          detail:
            'Comparamos opciones claras con equipaje transparente y escalas cómodas.'
        },
        {
          title: 'Emisión Inmediata',
          detail:
            'Recibe tu billete electrónico con seguimiento completo hasta el embarque.'
        }
      ]
    },
    'hotel-reservations': {
      tagline: 'Elige Cualquier Hotel del Mundo y Verifícalo en Google Maps',
      overview:
        'Escribe el nombre de cualquier hotel o búscalo directamente en Google Maps. Aseguramos el tipo de habitación, vistas y régimen de comidas que desees con confirmación garantizada.',
      highlights: [
        {
          title: 'Libertad Total de Alojamiento',
          detail:
            'Cualquier cadena internacional, resort frente al mar o riad boutique elegido por ti.'
        },
        {
          title: 'Ubicación en Google Maps',
          detail:
            'Comprueba en tiempo real la cercanía al centro, playas, aeropuertos o santuarios.'
        },
        {
          title: 'Suites Familiares y Regímenes',
          detail:
            'Desayuno, media pensión o todo incluido con habitaciones conectadas para familias.'
        },
        {
          title: 'Confirmaciones para Visado',
          detail:
            'Reservas nominales oficiales válidas para presentar en expedientes consulares.'
        }
      ],
      steps: [
        {
          title: 'Busca Tu Ciudad u Hotel',
          detail:
            'Escribe el hotel deseado o selecciona un marcador directamente en Google Maps.'
        },
        {
          title: 'Elige Fechas y Huéspedes',
          detail:
            'Indica entrada, salida y número de viajeros en el formulario.'
        },
        {
          title: 'Confirmación Oficial',
          detail:
            'Nuestro equipo en Salé emite tu bono hotelero garantizado.'
        }
      ]
    },
    'visa-assistance': {
      tagline: 'Preparación Integral para Visados Schengen, El Omra, EAU, Reino Unido y EE. UU.',
      overview:
        'Revisamos cada requisito documental, cumplimentamos los formularios consulares, gestionamos citas en TLScontact o VFS Global y preparamos reservas de vuelo y hotel conformes a cada embajada.',
      highlights: [
        {
          title: 'Revisión Completa de Documentos',
          detail:
            'Verificación meticulosa de justificantes laborales, financieros y familiares.'
        },
        {
          title: 'Formularios y Citas Oficiales',
          detail:
            'Tramitación de citas y preparación ordenada de formularios consulares.'
        },
        {
          title: 'Reservas Conformes al Expediente',
          detail:
            'Itinerarios de vuelo y confirmaciones hoteleras válidos para la embajada.'
        },
        {
          title: 'Mapa de Centros y Agencia',
          detail:
            'Ubica VFS Global, TLScontact o nuestra agencia en Salé directamente en Google Maps.'
        }
      ],
      steps: [
        {
          title: 'Define Destino y Tipo de Visado',
          detail:
            'Analizamos tu solicitud según turismo, negocios, familia o peregrinación.'
        },
        {
          title: 'Armado y Auditoría',
          detail:
            'Organizamos cada documento y adjuntamos reservas verificadas.'
        },
        {
          title: 'Presentación Segura',
          detail:
            'Acudes a tu cita consular con un expediente claro, completo y ordenado.'
        }
      ]
    },
    'hajj-umrah': {
      tagline: 'Viajes Espirituales de Hajj y Omra en los Santos Lugares',
      overview:
        'Vive una peregrinación serena y organizada hacia los Santos Lugares. Coordinamos hoteles 4★ y 5★ frente a Masjid al-Haram y Masjid an-Nabawi, visado saudí, vuelos directos, tren Haramain y asistencia continua.',
      highlights: [
        {
          title: 'Hoteles Frente a Masjid al-Haram',
          detail:
            'Suites seleccionadas en Clock Tower y Jabal Omar a pocos pasos de la Sagrada Kaaba.'
        },
        {
          title: 'Visado Umrah y Gestión Nusuk',
          detail:
            'Tramitación completa del visado saudí y orientación para permisos en Medina.'
        },
        {
          title: 'Traslados Privados y Tren Haramain',
          detail:
            'Recepción en aeropuerto de Yeda o Medina y conexión rápida entre ciudades.'
        },
        {
          title: 'Visitas Históricas y Guía Multilingüe',
          detail:
            'Ziyarat guiadas en árabe, francés y español durante toda la estancia.'
        }
      ],
      steps: [
        {
          title: 'Elige Fechas y Hotel de Hajj y Omra',
          detail:
            'Selecciona temporada y ubica hoteles cercanos al Haram en Google Maps.'
        },
        {
          title: 'Visado y Vuelos Coordinados',
          detail:
            'Preparamos tu visado El Omra y confirmamos billetes de ida y vuelta.'
        },
        {
          title: 'Viaje con Plena Tranquilidad',
          detail:
            'Acompañamiento desde la salida hasta el regreso a casa.'
        }
      ]
    },
    'travel-insurance': {
      tagline: 'Cobertura Médica, Equipaje y Asistencia Global Certificada',
      overview:
        'Viaja protegido frente a imprevistos médicos, hospitalización, retrasos aéreos o pérdida de equipaje con certificados válidos ante consulados Schengen e internacionales.',
      highlights: [
        {
          title: 'Conforme Visado Schengen (30.000 €)',
          detail:
            'Certificado oficial aceptado inmediatamente en embajadas europeas.'
        },
        {
          title: 'Asistencia Médica 24/7',
          detail:
            'Atención médica urgente, hospitalización y repatriación en todo el mundo.'
        },
        {
          title: 'Equipaje y Cancelación',
          detail:
            'Respaldo ante pérdida de maletas o incidencias justificadas en el viaje.'
        },
        {
          title: 'Planes Individuales y Familiares',
          detail:
            'Coberturas por viaje puntual o pólizas anuales multiviaje.'
        }
      ],
      steps: [
        {
          title: 'Selecciona Zona y Plan',
          detail:
            'Elige cobertura Schengen, mundial completa o plan familiar.'
        },
        {
          title: 'Ajusta Tus Fechas',
          detail:
            'Cobertura exacta coincidente con tu salida y regreso.'
        },
        {
          title: 'Entrega del Certificado',
          detail:
            'Documento oficial listo para tu visado y viaje.'
        }
      ]
    },
    'holiday-packages': {
      tagline: 'Escapadas Completas a Medida con Vuelos, Hotel Elegido y Traslados',
      overview:
        'Vacaciones diseñadas a tu ritmo: vuelos de ida y vuelta, el hotel que tú elijas en Google Maps, traslados privados desde el aeropuerto y excursiones por destinos alpinos, costeros o culturales.',
      highlights: [
        {
          title: 'Paquetes Vuelo + Hotel + Traslados',
          detail:
            'Todo coordinado en una única reserva clara y sin complicaciones.'
        },
        {
          title: 'Cualquier Destino y Hotel',
          detail:
            'Alpes Suizos, Costa Mediterránea, Estambul, Dubái, París o escapadas en Marruecos.'
        },
        {
          title: 'Traslados y Tours Privados',
          detail:
            'Chofer privado en destino, travesías panorámicas y visitas guiadas.'
        },
        {
          title: 'Parejas, Familias y Grupos',
          detail:
            'Programas personalizados para lunas de miel, vacaciones escolares y viajes en grupo.'
        }
      ],
      steps: [
        {
          title: 'Escribe Ciudad y Hotel Ideal',
          detail:
            'Indica tu destino soñado y selecciona el establecimiento directamente en Google Maps.'
        },
        {
          title: 'Propuesta a Tu Medida',
          detail:
            'Preparamos la combinación óptima de vuelos, alojamiento y traslados.'
        },
        {
          title: 'Disfruta Sin Preocupaciones',
          detail:
            'Viaja con todo confirmado y contacto directo en WhatsApp.'
        }
      ]
    }
  }
};

export interface ExpediaWidgetCopy {
  eyebrow: string;
  partnerNote: string;
  redirectHint: string;
  conciergeFallback: string;
  loadingLabel: string;
  flights: {
    title: string;
    description: string;
    iframeTitle: string;
  };
  hotels: {
    title: string;
    description: string;
    iframeTitle: string;
  };
}

export const EXPEDIA_WIDGET_COPY: Record<Language, ExpediaWidgetCopy> = {
  fr: {
    eyebrow: 'Disponibilités en Direct · Expedia Group',
    partnerNote:
      'Comparez les tarifs et disponibilités en temps réel avec Expedia Group.',
    redirectHint: 'Ouverture sécurisée des résultats sur Expedia dans un nouvel onglet',
    conciergeFallback: 'Ou demandez un devis personnalisé à notre agence de Salé',
    loadingLabel: 'Chargement des offres Expedia…',
    flights: {
      title: 'Rechercher Vos Vols en Direct',
      description:
        'Explorez immédiatement les itinéraires, horaires et tarifs disponibles pour votre prochain départ, ou confiez votre billet à nos conseillers ci-dessous.',
      iframeTitle: 'Recherche de vols et séjours Expedia Group'
    },
    hotels: {
      title: 'Rechercher Votre Hôtel en Direct',
      description:
        'Consultez les disponibilités hôtelières en temps réel dans le monde entier via Expedia, puis complétez avec notre équipe locale si besoin.',
      iframeTitle: 'Recherche d’hôtels et vols Expedia Group'
    }
  },
  ar: {
    eyebrow: 'توافر مباشر · Expedia Group',
    partnerNote:
      'قارن الأسعار والتوافر الفوري مباشرة عبر شريكنا Expedia Group.',
    redirectHint: 'تُفتح نتائج البحث عبر موقع Expedia في علامة تبويب جديدة',
    conciergeFallback: 'أو اطلب عرض سعر مخصص من وكالتنا بسلا',
    loadingLabel: 'جاري تحميل عروض Expedia…',
    flights: {
      title: 'ابحث عن رحلات الطيران مباشرة',
      description:
        'استعرض مسارات الطيران والتواريخ والأسعار المتاحة فوراً، أو أرسل طلبك لفريقنا في الأسفل لحجز مخصص.',
      iframeTitle: 'أداة البحث عن الطيران والفنادق من Expedia Group'
    },
    hotels: {
      title: 'ابحث عن فندقك مباشرة',
      description:
        'تحقق من توافر الفنادق وأسعارها حول العالم مباشرة عبر Expedia، أو نسّق حجزك عبر مستشاري وكالتنا.',
      iframeTitle: 'أداة البحث عن الفنادق والطيران من Expedia Group'
    }
  },
  en: {
    eyebrow: 'Live Availability · Expedia Group',
    partnerNote:
      'Compare live schedules, fares, and stays directly with Expedia Group.',
    redirectHint: 'Results open securely on Expedia in a new tab',
    conciergeFallback: 'Or request personalized booking assistance from our Salé desk',
    loadingLabel: 'Loading Expedia availability…',
    flights: {
      title: 'Search Live Flight Options',
      description:
        'Check real-time routes, departure dates, and fares directly below, or let our ticketing desk arrange custom multi-city itineraries.',
      iframeTitle: 'Expedia Group Flights & Stays Search'
    },
    hotels: {
      title: 'Search Live Hotel Availability',
      description:
        'Browse real-time hotel availability worldwide through Expedia, or verify locations with our agency concierge and Google Maps planner below.',
      iframeTitle: 'Expedia Group Hotels & Flights Search'
    }
  },
  es: {
    eyebrow: 'Disponibilidad en Tiempo Real · Expedia Group',
    partnerNote:
      'Compara disponibilidad y tarifas en directo a través de Expedia Group.',
    redirectHint: 'Los resultados se abren de forma segura en Expedia en una nueva pestaña',
    conciergeFallback: 'O solicita asistencia personalizada a nuestro equipo en Salé',
    loadingLabel: 'Cargando ofertas de Expedia…',
    flights: {
      title: 'Buscar Vuelos en Tiempo Real',
      description:
        'Explora rutas, horarios y tarifas disponibles al instante, o solicita a nuestro equipo un itinerario a medida más abajo.',
      iframeTitle: 'Buscador de vuelos y hoteles de Expedia Group'
    },
    hotels: {
      title: 'Buscar Hoteles en Tiempo Real',
      description:
        'Consulta la disponibilidad hotelera mundial directamente con Expedia o coordina tu estancia con nuestra agencia.',
      iframeTitle: 'Buscador de hoteles y vuelos de Expedia Group'
    }
  }
};
