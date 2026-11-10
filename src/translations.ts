/**
 * Translations for Golden Group Travels
 * Languages supported: English (en), French (fr), Spanish (es), Arabic (ar)
 */

export type Language = 'en' | 'fr' | 'es' | 'ar';

export interface TranslationData {
  dir: 'ltr' | 'rtl';
  topStrip: {
    hours: string;
    certified: string;
    directDesk: string;
    email1: string;
    phone: string;
    login: string;
    register: string;
    currency: string;
  };
  nav: {
    accueil: string;
    hajOmra: string;
    voyageOrganise: string;
    circuitsMaroc: string;
    services: string;
    packages: string;
    whyUs: string;
    inquiry: string;
    faq: string;
    contact: string;
    callNow: string;
    tagline: string;
  };
  hero: {
    talbiyah: string;
    talbiyahTranslation: string;
    arabicTitle: string;
    tabTours: string;
    tabHotel: string;
    destinationTitle: string;
    destinationPlaceholder: string;
    datesTitle: string;
    datesPlaceholder: string;
    advancedTitle: string;
    advancedSubtitle: string;
    searchBtn: string;
    headlinePart1: string;
    headlinePart2: string;
    ctaPrimary: string;
    ctaPhone: string;
    selectService: string;
    destinationLabel: string;
    destinationPlaceholderOld: string;
    dateLabel: string;
    travelersLabel: string;
    requestQuote: string;
    paxSolo: string;
    paxCouple: string;
    paxFamily: string;
    paxGroup: string;
    kpiConcierge: string;
    kpiPartners: string;
    kpiVisa: string;
    kpiSupport: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    inquireNow: string;
    viewDetails: string;
    closeDetails: string;
    specializations: string;
    inquireService: string;
    customCardTitle: string;
    customCardTagline: string;
    customCardDesc: string;
    customCardBtn: string;
    customCardSub: string;
    items: {
      id: string;
      name: string;
      tagline: string;
      description: string;
      highlights: string[];
      popularOptions: string[];
    }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    subtitle: string;
    durationLabel: string;
    inclusionsLabel: string;
    ctaQuote: string;
    ctaCall: string;
    items: {
      code: string;
      title: string;
      route: string;
      duration: string;
      tier: string;
      perks: string[];
    }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: {
      title: string;
      desc: string;
    }[];
  };
  consultation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    selectService: string;
    fullName: string;
    phone: string;
    email: string;
    destination: string;
    travelDate: string;
    travelers: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    whatsappCta: string;
    privacyNote: string;
    successTitle: string;
    successDesc: string;
    successRef: string;
    successUrgent: string;
    submitAnother: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  footer: {
    desc: string;
    servicesTitle: string;
    navTitle: string;
    contactTitle: string;
    deskLabel: string;
    hoursWeekday: string;
    hoursSunday: string;
    protection: string;
    protectionSub: string;
    copyright: string;
    privacy: string;
    terms: string;
    conditions: string;
  };
}

export const translations: Record<Language, TranslationData> = {
  en: {
    dir: 'ltr',
    topStrip: {
      hours: 'Mon – Sat: 9:00 AM – 8:00 PM | Sun: On-Call',
      certified: 'Certified Travel & Visa Management',
      directDesk: 'Direct Concierge: 0666-484815',
      email1: 'Info@goldengrouptravels.com',
      phone: '+212 666-484815',
      login: 'Login',
      register: 'Register',
      currency: 'MAD'
    },
    nav: {
      accueil: 'HOME',
      hajOmra: 'HAJJ & UMRAH',
      voyageOrganise: 'ORGANIZED TOURS',
      circuitsMaroc: 'MOROCCO TOURS',
      services: 'SERVICES',
      packages: 'Curated Itineraries',
      whyUs: 'Why Golden Group',
      inquiry: 'Inquiry & Booking',
      faq: 'FAQ',
      contact: 'CONTACT',
      callNow: 'Call Now: 0666-484815',
      tagline: 'Travel Services & Events'
    },
    hero: {
      talbiyah: 'Here I am, O Allah, here I am.',
      talbiyahTranslation: '',
      arabicTitle: 'Golden Group Travel & Tourism Services',
      tabTours: 'Organized Tours',
      tabHotel: 'Hotel',
      destinationTitle: 'Destination',
      destinationPlaceholder: 'Where do you want to go?',
      datesTitle: 'From - To',
      datesPlaceholder: 'dd/mm/yyyy - dd/mm/yyyy',
      advancedTitle: 'Advanced',
      advancedSubtitle: 'More',
      searchBtn: 'Search',
      headlinePart1: 'Discover the World with',
      headlinePart2: 'Golden Group Travels',
      ctaPrimary: 'Plan Your Journey',
      ctaPhone: 'Call 0666-484815',
      selectService: 'Select Service',
      destinationLabel: 'Destination / Country',
      destinationPlaceholderOld: 'e.g. Dubai, London, Makkah',
      dateLabel: 'Estimated Travel Date',
      travelersLabel: 'Travelers / Pax',
      requestQuote: 'Request Quote',
      paxSolo: '1 Adult Solo',
      paxCouple: '2 Adults (Couple)',
      paxFamily: '3–5 (Family / Group)',
      paxGroup: '6+ (Large Delegation)',
      kpiConcierge: 'Bespoke Concierge',
      kpiPartners: 'Global Airlines & Hotels',
      kpiVisa: 'Visa Compliance Rate',
      kpiSupport: 'Dedicated Client Care'
    },
    services: {
      eyebrow: 'Comprehensive Travel Portfolio',
      title: 'Our Premium Services',
      subtitle: 'Every detail handled with precision, confidentiality, and gold-standard professionalism. Select any service to explore offerings or request a personalized quotation.',
      inquireNow: 'Inquire Now',
      viewDetails: 'View Details',
      closeDetails: 'Close',
      specializations: 'Available Specializations:',
      inquireService: 'Inquire For This Service',
      customCardTitle: 'Need Custom Travel Arrangements?',
      customCardTagline: 'Direct Human Agent',
      customCardDesc: 'Have unique flight schedules, multi-country visa needs, or complex group itineraries? Our senior travel consultants are ready to assist you immediately.',
      customCardBtn: 'Call 0666-484815',
      customCardSub: 'Fast response · No automated bots · Dedicated desk',
      items: [
        {
          id: 'flights',
          name: 'Flight Bookings',
          tagline: 'Premium Class & Global Airline Networks',
          description: 'Securing preferred commercial routes, business & first-class privileges, corporate group fares, and seamless multi-city itineraries.',
          highlights: [
            'Preferred airline partner pricing',
            'Flexible date & ticket exchange support',
            'First & Business class upgrade advisory',
            'Baggage allowance & seat optimization'
          ],
          popularOptions: ['First & Business Class', 'Corporate Group Travel', 'Multi-City Global Flights', 'Charter Coordination']
        },
        {
          id: 'hotels',
          name: 'Hotel Reservations',
          tagline: '5-Star Resorts & Curated Boutique Stays',
          description: 'Direct worldwide reservations at premier international hotel chains, bespoke resorts, private villas, and verified luxury hospitality.',
          highlights: [
            'VIP room upgrades upon availability',
            'Complimentary breakfast & late check-outs',
            'Vetted 4-star & 5-star properties worldwide',
            'Negotiated corporate & family group rates'
          ],
          popularOptions: ['Luxury City Suites', 'All-Inclusive Beach Resorts', 'Private Alpine Chalets', 'Executive Airport Hotels']
        },
        {
          id: 'visa',
          name: 'Visa Assistance',
          tagline: 'Expedited & Hassle-Free Embassy Processing',
          description: 'End-to-end visa consultation with rigorous document verification, application submission oversight, and interview readiness guidance.',
          highlights: [
            'Pre-submission document verification',
            'Embassy appointment slot scheduling',
            'Tourist, business, and transit visa expertise',
            'High track record with strict visa jurisdictions'
          ],
          popularOptions: ['Schengen Tourist & Business', 'UK & US Visa Advisory', 'Gulf & Middle East e-Visas', 'Far East & Asian Visas']
        },
        {
          id: 'insurance',
          name: 'Travel Insurance',
          tagline: 'Comprehensive Medical & Luggage Protection',
          description: 'Total peace of mind with tailored coverage for medical emergencies, sudden cancellations, delayed luggage, and global crisis support.',
          highlights: [
            'Worldwide emergency medical protection',
            'Trip cancellation & flight delay compensation',
            'Lost baggage & personal effects safeguard',
            'Embassy-compliant insurance certificates'
          ],
          popularOptions: ['Individual Comprehensive Plan', 'Family Vacation Protection', 'Senior Citizen Travel Cover', 'Annual Multi-Trip Policy']
        },
        {
          id: 'packages',
          name: 'Holiday Packages',
          tagline: 'Bespoke Leisure & Curated Pilgrimages',
          description: 'Tailored holiday experiences designed from arrival to departure. From romantic honeymoon escapes to family vacations and guided sacred journeys.',
          highlights: [
            'Full itinerary design with private transfers',
            'Handpicked guided cultural & landmark tours',
            'Specialized Umrah & pilgrimage packages',
            'Dedicated on-trip concierge assistance'
          ],
          popularOptions: ['European Grand Circuits', 'Dubai & Arabian Luxury Escapes', 'Umrah & Sacred Journeys', 'Tropical Maldives & Bali Getaways']
        }
      ]
    },
    packages: {
      eyebrow: 'Signature Itineraries',
      title: 'Curated Global Journeys',
      subtitle: 'Exquisite route planning crafted with verified luxury hospitality, seamless transfers, and priority airline routings.',
      durationLabel: 'Duration',
      inclusionsLabel: 'Signature Inclusions:',
      ctaQuote: 'Request Custom Itinerary',
      ctaCall: 'Call for Dates',
      items: [
        {
          code: 'GGT-EU01',
          title: 'The Continental Grandeur',
          route: 'London · Paris · Zurich · Milan · Rome',
          duration: '14 Days / 13 Nights',
          tier: 'Executive Luxury',
          perks: ['Private Airport Chauffeur', '5-Star Central Suites', 'Fast-Track Museum Access', 'Scenic Swiss Express Class']
        },
        {
          code: 'GGT-ME02',
          title: 'Arabian Splendour & Desert Oasis',
          route: 'Dubai · Abu Dhabi · Muscat',
          duration: '8 Days / 7 Nights',
          tier: 'Signature Gold',
          perks: ['Downtown Burj Suites', 'Private Desert Safari & Dining', 'Luxury Yacht Charter', 'VIP Louvre Abu Dhabi Tour']
        },
        {
          code: 'GGT-UM03',
          title: 'Sacred Umrah & Spiritual Journey',
          route: 'Jeddah · Makkah · Madinah',
          duration: '10 Days / 9 Nights',
          tier: 'Premier Pilgrimage',
          perks: ['Haram-View 5-Star Hotels', 'Private High-Speed Train VIP', 'Ziyarat Guided Tours', 'Full Visa & Permit Processing']
        },
        {
          code: 'GGT-IS04',
          title: 'Turquoise Island Sanctuary',
          route: 'Maldives · Overwater Private Villa',
          duration: '7 Days / 6 Nights',
          tier: 'Bespoke Retreat',
          perks: ['Seaplane Scenic Transfers', 'Private Infinity Pool Villa', 'Sunset Dolphin Excursion', 'Personal Island Butler']
        }
      ]
    },
    whyUs: {
      eyebrow: 'Unrivaled Service Distinction',
      title: 'Why Choose Golden Group Travels',
      subtitle: 'We eliminate the stress of travel coordination. Benefit from our verified industry relationships, transparent pricing, and relentless dedication to your journey.',
      pillars: [
        {
          title: 'Global Airline Alliances',
          desc: 'Direct booking privileges with major international carriers, securing competitive rates, seat allocation, and prioritized rebooking support.'
        },
        {
          title: 'Certified Visa Advisory',
          desc: 'Our seasoned visa specialists conduct strict pre-checks on your documentation to minimize delays and maximize embassy approval rates.'
        },
        {
          title: '24/7 Dedicated Concierge',
          desc: 'One dedicated human point of contact throughout your entire trip. Reachable directly by phone at 0666-484815 for immediate adjustments.'
        },
        {
          title: 'Transparent & Secure',
          desc: 'No hidden handling charges or opaque commissions. Receive clear itemized itineraries and fully compliant, secure payment options.'
        }
      ]
    },
    consultation: {
      eyebrow: 'Tailored Quotation',
      title: 'Begin Your Journey',
      subtitle: 'Submit your trip specifications below. Our travel consultants will verify availability, calculate optimal itineraries, and contact you directly.',
      selectService: 'Select Required Service *',
      fullName: 'Full Name *',
      phone: 'Phone Number *',
      email: 'Email Address *',
      destination: 'Destination or Country *',
      travelDate: 'Expected Departure Date',
      travelers: 'Number of Passengers',
      notes: 'Specific Travel Requirements or Questions',
      notesPlaceholder: 'Specify cabin preference (Business/First), hotel tier, visa jurisdiction, or itinerary notes...',
      submit: 'Send Booking via WhatsApp',
      submitting: 'Preparing WhatsApp Message...',
      whatsappCta: 'Continue on WhatsApp (0666-484815)',
      privacyNote: 'Your details are strictly confidential. We respond within standard business hours or call immediately for emergencies.',
      successTitle: 'Consultation Request Received',
      successDesc: 'Thank you. Your inquiry has been prioritized. Our travel concierge will reach you shortly.',
      successRef: 'Reference',
      successUrgent: 'Urgent inquiry? Call our desk directly at',
      submitAnother: 'Submit Another Inquiry'
    },
    faq: {
      eyebrow: 'Clarity & Guidance',
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'How does Golden Group Travels handle flight ticket changes or cancellations?',
          a: 'We understand schedules change. Our agents handle all airline communications directly. Depending on the ticket fare rules, we negotiate waiver privileges, date adjustments, or airline credits without you having to wait in endless airline phone queues.'
        },
        {
          q: 'What documents are required for Visa Assistance?',
          a: 'Document requirements vary by destination (valid passport with at least 6 months validity, photographs, proof of accommodation, bank statements, and travel insurance). Our visa desk provides a personalized checklist tailored to your nationality and destination.'
        },
        {
          q: 'Can you customize private holiday packages for families or groups?',
          a: 'Yes. Every holiday package we organize can be completely customized. We coordinate private chauffeur transfers, family-connected luxury suites, dietary preferences, and private local guides.'
        },
        {
          q: 'What does your Travel Insurance policy cover?',
          a: 'Our international policies offer embassy-compliant medical coverage (including hospitalization and emergency evacuation), trip cancellation reimbursement, delayed baggage indemnity, and 24/7 global medical hotline access.'
        },
        {
          q: 'How can I speak directly with a travel consultant right now?',
          a: 'You can call our direct line at 0666-484815 during operational hours, or fill out the consultation form above for a rapid return call from our dedicated team.'
        }
      ]
    },
    footer: {
      desc: 'Elevating global travel through personalized flight arrangements, verified luxury accommodations, expedited embassy visa handling, and custom holiday experiences.',
      servicesTitle: 'Services Portfolio',
      navTitle: 'Quick Navigation',
      contactTitle: 'Contact & Assistance',
      deskLabel: 'Direct Telephone Desk',
      hoursWeekday: 'Mon – Sat: 9:00 AM – 8:00 PM',
      hoursSunday: 'Sunday: On-Call Support',
      protection: 'Full Consumer Protection',
      protectionSub: 'Licensed Travel & Visa Agency',
      copyright: 'Golden Group Travels. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      conditions: 'Ticketing Conditions'
    }
  },

  fr: {
    dir: 'ltr',
    topStrip: {
      hours: 'Lun – Sam: 9h00 – 20h00 | Dim: Sur appel',
      certified: 'Gestion Certifiée des Voyages et Visas',
      directDesk: 'Conciergerie Directe : 0666-484815',
      email1: 'Info@goldengrouptravels.com',
      phone: '+212 666-484815',
      login: 'Connexion',
      register: "S'inscrire",
      currency: 'MAD'
    },
    nav: {
      accueil: 'ACCUEIL',
      hajOmra: 'HAJ & OMRA',
      voyageOrganise: 'VOYAGE ORGANISÉ',
      circuitsMaroc: 'CIRCUITS MAROC',
      services: 'SERVICES',
      packages: 'Itinéraires Exclusifs',
      whyUs: 'Pourquoi Golden Group',
      inquiry: 'Réservation & Devis',
      faq: 'FAQ',
      contact: 'CONTACT',
      callNow: 'Appeler : 0666-484815',
      tagline: 'Travel Services & Events'
    },
    hero: {
      talbiyah: 'Me voici, ô Allah, me voici.',
      talbiyahTranslation: '',
      arabicTitle: 'Golden Group Services de Voyages & Tourisme',
      tabTours: 'Voyage Organisé',
      tabHotel: 'Hôtel',
      destinationTitle: 'Destination',
      destinationPlaceholder: 'Où voulez-vous aller ?',
      datesTitle: 'De - à',
      datesPlaceholder: 'dd/mm/yyyy - dd/mm/yyyy',
      advancedTitle: 'Avancé',
      advancedSubtitle: 'Plus',
      searchBtn: 'Rechercher',
      headlinePart1: 'Découvrez le Monde avec',
      headlinePart2: 'Golden Group Travels',
      ctaPrimary: 'Planifier Votre Voyage',
      ctaPhone: 'Appelez le 0666-484815',
      selectService: 'Choisir le Service',
      destinationLabel: 'Destination / Pays',
      destinationPlaceholderOld: 'ex. Dubaï, Londres, La Mecque',
      dateLabel: 'Date Prévue du Voyage',
      travelersLabel: 'Nombre de Voyageurs',
      requestQuote: 'Demander un Devis',
      paxSolo: '1 Adulte Seul',
      paxCouple: '2 Adultes (Couple)',
      paxFamily: '3–5 (Famille / Petit Groupe)',
      paxGroup: '6+ (Délégation / Groupe)',
      kpiConcierge: 'Conciergerie Sur-Mesure',
      kpiPartners: 'Compagnies & Hôtels Partenaires',
      kpiVisa: 'Taux de Réussite des Visas',
      kpiSupport: 'Assistance Client Dédiée'
    },
    services: {
      eyebrow: 'Portefeuille Complet de Prestations',
      title: 'Nos Services Premium',
      subtitle: 'Chaque détail est orchestré avec rigueur, discrétion et excellence. Choisissez un service pour découvrir nos offres ou obtenir une proposition personnalisée.',
      inquireNow: 'Demander un Devis',
      viewDetails: 'Détails du Service',
      closeDetails: 'Fermer',
      specializations: 'Spécialisations Disponibles :',
      inquireService: 'Faire une Demande pour ce Service',
      customCardTitle: 'Un Projet de Voyage Particulier ?',
      customCardTagline: 'Conseiller Dédié en Direct',
      customCardDesc: 'Horaires spécifiques, visas multi-destinations ou voyage de groupe complexe ? Nos consultants seniors en voyage sont à votre disposition immédiate.',
      customCardBtn: 'Appeler le 0666-484815',
      customCardSub: 'Réponse rapide · Aucun robot · Équipe locale',
      items: [
        {
          id: 'flights',
          name: 'Réservations de Vols',
          tagline: 'Classes Supérieures & Réseau Aérien Mondial',
          description: 'Accès privilégié aux routes aériennes majeures, surclassements en classe Affaires et Première, tarifs de groupe négociés et vols multi-destinations.',
          highlights: [
            'Tarifs préférentiels auprès des grandes compagnies',
            'Flexibilité sur les dates et échanges de billets',
            'Conseil pour surclassement Première & Affaires',
            'Optimisation des franchises bagages et sièges'
          ],
          popularOptions: ['Classe Première & Affaires', 'Voyages d’Affaires & Groupes', 'Billets Multi-Destinations', 'Vols Privés & Charters']
        },
        {
          id: 'hotels',
          name: 'Réservations d’Hôtels',
          tagline: 'Palaces 5 Étoiles & Hôtels de Charme',
          description: 'Réservations directes auprès des chaînes hôtelières prestigieuses, resorts balnéaires, villas privées et établissements de grand luxe vérifiés.',
          highlights: [
            'Surclassements de chambre VIP selon disponibilité',
            'Petit-déjeuner offert et départs tardifs négociés',
            'Sélection exclusive d’hôtels 4 et 5 étoiles',
            'Tarifs préférentiels pour familles et délégations'
          ],
          popularOptions: ['Suites Urbaines de Prestige', 'Resorts Balnéaires Tout Inclus', 'Chalets Alpins Privés', 'Hôtels Exécutifs Près des Aéroports']
        },
        {
          id: 'visa',
          name: 'Assistance Visa',
          tagline: 'Démarches Consulaires Accélérées et Sereines',
          description: 'Prise en charge intégrale de vos demandes de visa : vérification scrupuleuse des justificatifs, prise de rendez-vous et préparation aux entretiens.',
          highlights: [
            'Contrôle préalable rigoureux de votre dossier',
            'Prise de rendez-vous consulaire prioritaire',
            'Expertise visas tourisme, affaires et transit',
            'Excellente réussite auprès des consulats stricts'
          ],
          popularOptions: ['Visa Schengen Tourisme & Affaires', 'Visas Royaume-Uni & États-Unis', 'e-Visas Moyen-Orient & Golfe', 'Visas Asie & Extrême-Orient']
        },
        {
          id: 'insurance',
          name: 'Assurance Voyage',
          tagline: 'Protection Médicale & Bagages Complète',
          description: 'Voyagez l’esprit tranquille grâce à des garanties complètes : frais médicaux d’urgence à l’étranger, annulations imprévues et perte de bagages.',
          highlights: [
            'Couverture médicale d’urgence internationale',
            'Remboursement annulation & retards de vol',
            'Indemnisation vol ou perte de bagages',
            'Attestations conformes aux exigences consulaires'
          ],
          popularOptions: ['Formule Individuelle Complète', 'Protection Vacances Famille', 'Assurance Senior & Long Séjour', 'Contrat Annuel Multi-Voyages']
        },
        {
          id: 'packages',
          name: 'Forfaits Vacances',
          tagline: 'Séjours Sur Mesure & Pèlerinages Guidés',
          description: 'Des expériences de vacances raffinées pensées de votre départ jusqu’à votre retour. Escapades romantiques, circuits en famille et voyages spirituels de l’Omra.',
          highlights: [
            'Itinéraires complets avec transferts privés',
            'Visites guidées et accès coupe-file aux monuments',
            'Formules Omra avec hôtels face au Haram',
            'Accompagnateur et conciergerie tout au long du séjour'
          ],
          popularOptions: ['Grands Circuits Européens', 'Séjours Prestigieux à Dubaï', 'Omra & Pèlerinages d’Excellence', 'Îles Paradis : Maldives & Bali']
        }
      ]
    },
    packages: {
      eyebrow: 'Itinéraires Signatures',
      title: 'Voyages d’Exception Curatés',
      subtitle: 'Des circuits minutieusement planifiés avec hôtellerie de luxe certifiée, transferts privés et liaisons aériennes optimisées.',
      durationLabel: 'Durée',
      inclusionsLabel: 'Prestations Incluses :',
      ctaQuote: 'Demander cet Itinéraire',
      ctaCall: 'Appeler pour les Dates',
      items: [
        {
          code: 'GGT-EU01',
          title: 'La Splendeur Continentale',
          route: 'Londres · Paris · Zurich · Milan · Rome',
          duration: '14 Jours / 13 Nuits',
          tier: 'Luxe Exécutif',
          perks: ['Chauffeur Privé Aéroports', 'Suites Centrales 5 Étoiles', 'Accès Coupe-File Musées', 'Train Panoramique Première Classe']
        },
        {
          code: 'GGT-ME02',
          title: 'Splendeurs Arabes & Oasis du Désert',
          route: 'Dubaï · Abou Dabi · Mascate',
          duration: '8 Jours / 7 Nuits',
          tier: 'Signature Or',
          perks: ['Suites Tour Burj Khalifa', 'Safari Privé & Dîner Bédouin', 'Sortie Yacht Privatisé', 'Visite VIP Musée du Louvre Abou Dabi']
        },
        {
          code: 'GGT-UM03',
          title: 'Omra Sacrée & Sérénité Spirituelle',
          route: 'Djeddah · La Mecque · Médine',
          duration: '10 Jours / 9 Nuits',
          tier: 'Pèlerinage Premier',
          perks: ['Hôtels 5* Face au Sanctuaire', 'TGV Al Haramain Première Classe', 'Visites Guidées Ziyarat', 'Prise en Charge Visa & Permis']
        },
        {
          code: 'GGT-IS04',
          title: 'Sanctuaire des Îles Turquoises',
          route: 'Maldives · Villa Privée sur Pilotis',
          duration: '7 Jours / 6 Nuits',
          tier: 'Retraite d’Exception',
          perks: ['Transferts Panoramiques en Hydravion', 'Villa avec Piscine à Débordement', 'Excursion Privée Dauphins au Coucher du Soleil', 'Majordome Dédié']
        }
      ]
    },
    whyUs: {
      eyebrow: 'Une Distinction Inégalée',
      title: 'Pourquoi Choisir Golden Group Travels',
      subtitle: 'Nous transformons l’organisation de vos séjours en une expérience fluide et rassurante grâce à nos partenariats directs et notre engagement constant.',
      pillars: [
        {
          title: 'Accords Aériens Mondiaux',
          desc: 'Partenariats privilégiés avec les plus grandes compagnies aériennes, garantissant d’excellents tarifs et une gestion prioritaire de vos réservations.'
        },
        {
          title: 'Conseil Visa Agréé',
          desc: 'Nos experts vérifient minutieusement chaque pièce de votre dossier avant dépôt en consulat afin d’assurer un taux de délivrance optimal.'
        },
        {
          title: 'Conciergerie Dédiée 24h/24',
          desc: 'Un interlocuteur unique et joignable à tout moment au 0666-484815 pour ajuster vos plans de voyage en temps réel.'
        },
        {
          title: 'Transparence & Sécurité',
          desc: 'Aucun frais dissimulé ni commission opaque. Des devis limpides et des protocoles de paiement strictement sécurisés.'
        }
      ]
    },
    consultation: {
      eyebrow: 'Proposition Personnalisée',
      title: 'Commencez Votre Voyage',
      subtitle: 'Indiquez vos souhaits ci-dessous. Nos experts vérifient immédiatement la disponibilité et vous recontactent sans délai.',
      selectService: 'Service Souhaité *',
      fullName: 'Nom et Prénom *',
      phone: 'Numéro de Téléphone *',
      email: 'Adresse E-mail *',
      destination: 'Destination ou Pays *',
      travelDate: 'Date Prévue de Départ',
      travelers: 'Nombre de Voyageurs',
      notes: 'Précisions ou Demandes Spéciales',
      notesPlaceholder: 'Préférence de cabine (Affaires/Première), catégorie d’hôtel, pays de visa ou remarques...',
      submit: 'Envoyer la réservation sur WhatsApp',
      submitting: 'Préparation du message WhatsApp...',
      whatsappCta: 'Continuer sur WhatsApp (0666-484815)',
      privacyNote: 'Vos coordonnées demeurent strictement confidentielles. Nous vous répondons rapidement pendant nos heures d’ouverture.',
      successTitle: 'Demande Bien Reçue',
      successDesc: 'Merci. Votre demande a été enregistrée en priorité. Notre conciergerie vous contactera très rapidement.',
      successRef: 'Référence',
      successUrgent: 'Urgence ? Contactez directement notre bureau au',
      submitAnother: 'Nouvelle Demande'
    },
    faq: {
      eyebrow: 'Questions & Réponses',
      title: 'Foire Aux Questions',
      items: [
        {
          q: 'Comment gérez-vous les modifications ou annulations de billets d’avion ?',
          a: 'Nous prenons en charge toutes les démarches auprès des compagnies sans vous laisser attendre au standard. Selon les conditions de votre billet, nous négocions les modifications de dates ou avoirs.'
        },
        {
          q: 'Quels documents sont nécessaires pour l’assistance Visa ?',
          a: 'Les pièces varient selon le pays (passeport valable plus de 6 mois, photos d’identité récentes, justificatifs de séjour, relevés bancaires et attestation d’assurance). Nous vous transmettons une checklist personnalisée.'
        },
        {
          q: 'Pouvez-vous adapter des séjours complets pour les familles ou groupes ?',
          a: 'Absolument. Chacun de nos forfaits vacances est personnalisable : chambres communicantes, transferts privés spacieux, menus spécifiques et guides privatifs.'
        },
        {
          q: 'Que couvre votre contrat d’Assurance Voyage ?',
          a: 'Nos assurances internationales prennent en charge les frais médicaux et d’hospitalisation d’urgence, le rapatriement sanitaire, l’annulation de voyage et l’indemnisation des bagages égarés.'
        },
        {
          q: 'Comment contacter directement un conseiller en voyage maintenant ?',
          a: 'Appelez notre ligne directe au 0666-484815 pendant nos heures d’ouverture, ou remplissez le formulaire ci-dessus pour un rappel rapide.'
        }
      ]
    },
    footer: {
      desc: 'Sublimer vos voyages à travers le monde grâce à un service aérien haut de gamme, des hôtels d’exception, une assistance visa rigoureuse et des séjours inoubliables.',
      servicesTitle: 'Nos Prestations',
      navTitle: 'Navigation',
      contactTitle: 'Contact & Permanence',
      deskLabel: 'Bureau Téléphonique Direct',
      hoursWeekday: 'Lun – Sam : 9h00 – 20h00',
      hoursSunday: 'Dimanche : Permanence Sur Appel',
      protection: 'Garantie Consommateur Complète',
      protectionSub: 'Agence de Voyages & Visas Agréée',
      copyright: 'Golden Group Travels. Tous droits réservés.',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions Générales de Vente',
      conditions: 'Conditions Tarifaires Aériennes'
    }
  },

  es: {
    dir: 'ltr',
    topStrip: {
      hours: 'Lun – Sáb: 9:00 – 20:00 | Dom: De Guardia',
      certified: 'Gestión Certificada de Viajes y Visados',
      directDesk: 'Conserjería Directa: 0666-484815',
      email1: 'Info@goldengrouptravels.com',
      phone: '+212 666-484815',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      currency: 'MAD'
    },
    nav: {
      accueil: 'INICIO',
      hajOmra: 'HAJ Y UMRA',
      voyageOrganise: 'VIAJE ORGANIZADO',
      circuitsMaroc: 'CIRCUITOS MARRUECOS',
      services: 'SERVICIOS',
      packages: 'Itinerarios Exclusivos',
      whyUs: 'Por Qué Golden Group',
      inquiry: 'Presupuesto & Reserva',
      faq: 'Preguntas Frecuentes',
      contact: 'CONTACTO',
      callNow: 'Llamar: 0666-484815',
      tagline: 'Travel Services & Events'
    },
    hero: {
      talbiyah: 'Aquí estoy, oh Allah, aquí estoy.',
      talbiyahTranslation: '',
      arabicTitle: 'Golden Group Servicios de Viajes y Turismo',
      tabTours: 'Viaje Organizado',
      tabHotel: 'Hotel',
      destinationTitle: 'Destino',
      destinationPlaceholder: '¿A dónde quieres ir?',
      datesTitle: 'De - a',
      datesPlaceholder: 'dd/mm/aaaa - dd/mm/aaaa',
      advancedTitle: 'Avanzado',
      advancedSubtitle: 'Más',
      searchBtn: 'Buscar',
      headlinePart1: 'Descubra el Mundo con',
      headlinePart2: 'Golden Group Travels',
      ctaPrimary: 'Planificar Su Viaje',
      ctaPhone: 'Llamar al 0666-484815',
      selectService: 'Seleccionar Servicio',
      destinationLabel: 'Destino o País',
      destinationPlaceholderOld: 'ej. Dubái, Londres, La Meca',
      dateLabel: 'Fecha Prevista de Viaje',
      travelersLabel: 'Pasajeros / Viajeros',
      requestQuote: 'Solicitar Presupuesto',
      paxSolo: '1 Adulto (Solo)',
      paxCouple: '2 Adultos (Pareja)',
      paxFamily: '3–5 (Familia / Grupo Pequeño)',
      paxGroup: '6+ (Delegación / Grupo Grande)',
      kpiConcierge: 'Conserjería Exclusiva',
      kpiPartners: 'Aerolíneas & Hoteles Aliados',
      kpiVisa: 'Tasa de Éxito en Visados',
      kpiSupport: 'Atención Personalizada 24/7'
    },
    services: {
      eyebrow: 'Catálogo Integral de Servicios',
      title: 'Nuestros Servicios de Alta Gama',
      subtitle: 'Cada detalle coordinado con precisión, discreción y los más altos estándares de calidad. Seleccione un servicio para ver detalles o solicitar presupuesto.',
      inquireNow: 'Solicitar Información',
      viewDetails: 'Ver Detalles',
      closeDetails: 'Cerrar',
      specializations: 'Especializaciones Disponibles:',
      inquireService: 'Consultar por este Servicio',
      customCardTitle: '¿Requiere un Itinerario Personalizado?',
      customCardTagline: 'Asesor Humano Directo',
      customCardDesc: '¿Planes de viaje complejos, múltiples conexiones aéreas o visados para varios países? Nuestros asesores expertos le atienden de inmediato.',
      customCardBtn: 'Llamar al 0666-484815',
      customCardSub: 'Respuesta inmediata · Sin contestadores automáticos',
      items: [
        {
          id: 'flights',
          name: 'Reservas de Vuelos',
          tagline: 'Clases Superiores & Red Aérea Global',
          description: 'Acceso a rutas comerciales preferentes, gestión de billetes en Business y Primera Clase, tarifas corporativas de grupo e itinerarios multiciudad.',
          highlights: [
            'Tarifas ventajosas con aerolíneas de primer nivel',
            'Soporte flexible para cambios de fecha y billetes',
            'Asesoramiento en subidas a Business y Primera Clase',
            'Optimización de asientos y franquicia de equipaje'
          ],
          popularOptions: ['Primera Clase & Business', 'Viajes Corporativos y Grupos', 'Rutas Multiciudad Globales', 'Vuelos Privados y Chárter']
        },
        {
          id: 'hotels',
          name: 'Reservas de Hoteles',
          tagline: 'Resorts 5 Estrellas & Hoteles Boutique Exclusivos',
          description: 'Reservas directas en las cadenas hoteleras internacionales más prestigiosas, villas privadas y alojamientos de lujo certificados.',
          highlights: [
            'Mejora de categoría de habitación según disponibilidad',
            'Desayuno de cortesía y salida tardía gestionada',
            'Propiedades de 4 y 5 estrellas rigurosamente evaluadas',
            'Tarifas especiales para familias y grupos'
          ],
          popularOptions: ['Suites Urbanas de Lujo', 'Resorts de Playa Todo Incluido', 'Chalets Alpinos Privados', 'Hoteles Ejecutivos de Aeropuerto']
        },
        {
          id: 'visa',
          name: 'Asistencia de Visados',
          tagline: 'Tramitación Consular Ágil y Segura',
          description: 'Gestión integral del visado: revisión exhaustiva de documentos, programación de citas consulares y preparación previa para entrevistas.',
          highlights: [
            'Revisión detallada de requisitos antes del envío',
            'Gestión prioritaria de citas en consulados y embajadas',
            'Especialistas en visados de turismo, negocios y tránsito',
            'Alto índice de aprobación en consulados exigentes'
          ],
          popularOptions: ['Visados Schengen Turismo y Negocios', 'Visados Reino Unido y EE.UU.', 'e-Visas Oriente Medio y Países del Golfo', 'Visados Asia y Lejano Oriente']
        },
        {
          id: 'insurance',
          name: 'Seguro de Viaje',
          tagline: 'Protección Médica y de Equipaje Integral',
          description: 'Viaje con total serenidad gracias a pólizas completas para emergencias sanitarias en el extranjero, cancelaciones imprevistas y pérdida de equipaje.',
          highlights: [
            'Cobertura médica internacional para emergencias',
            'Compensación por cancelación y retraso de vuelos',
            'Protección ante pérdida o extravío de equipaje',
            'Certificados válidos para solicitudes de visado'
          ],
          popularOptions: ['Plan Integral Individual', 'Cobertura Vacacional Familiar', 'Seguro para Mayores de 65 Años', 'Póliza Anual Multiviaje']
        },
        {
          id: 'packages',
          name: 'Paquetes Vacacionales',
          tagline: 'Viajes a Medida & Peregrinaciones Guiadas',
          description: 'Experiencias de vacaciones diseñadas con mimo desde la salida hasta el regreso. Escapadas románticas, viajes en familia y peregrinaciones guiadas de Umrah.',
          highlights: [
            'Itinerarios completos con traslados en vehículos privados',
            'Visitas culturales con guías profesionales y entradas VIP',
            'Paquetes especializados de Umrah frente al Haram',
            'Asistencia de conserjería personal durante todo el viaje'
          ],
          popularOptions: ['Grandes Circuitos por Europa', 'Escapadas de Lujo en Dubái', 'Peregrinación Umrah de Excelencia', 'Paraísos Tropicales: Maldivas y Bali']
        }
      ]
    },
    packages: {
      eyebrow: 'Rutas Exclusivas',
      title: 'Itinerarios de Prestigio',
      subtitle: 'Viajes diseñados al milímetro con hospedaje de lujo verificado, traslados en transporte privado y conexiones aéreas prioritarias.',
      durationLabel: 'Duración',
      inclusionsLabel: 'Servicios Destacados:',
      ctaQuote: 'Solicitar este Itinerario',
      ctaCall: 'Consultar Fechas',
      items: [
        {
          code: 'GGT-EU01',
          title: 'Grandeza Continental Europea',
          route: 'Londres · París · Zúrich · Milán · Roma',
          duration: '14 Días / 13 Noches',
          tier: 'Lujo Ejecutivo',
          perks: ['Chófer Privado en Aeropuertos', 'Suites Céntricas 5 Estrellas', 'Entradas VIP sin Colas a Museos', 'Tren Panorámico Suizo en 1ª Clase']
        },
        {
          code: 'GGT-ME02',
          title: 'Esplendor Árabe & Oasis del Desierto',
          route: 'Dubái · Abu Dabi · Mascate',
          duration: '8 Días / 7 Noches',
          tier: 'Firma Oro',
          perks: ['Suites Vistas Burj Khalifa', 'Safari Privado con Cena Beduina', 'Paseo Exclusivo en Yate', 'Visita VIP al Louvre de Abu Dabi']
        },
        {
          code: 'GGT-UM03',
          title: 'Umrah Sagrada & Retiro Espiritual',
          route: 'Yeda · La Meca · Medina',
          duration: '10 Días / 9 Noches',
          tier: 'Peregrinación Premier',
          perks: ['Hoteles 5* con Vistas al Haram', 'Tren de Alta Velocidad en 1ª Clase', 'Tours Guiados de Ziyarat', 'Tramitación Integral de Visado y Permisos']
        },
        {
          code: 'GGT-IS04',
          title: 'Santuario de Aguas Turquesas',
          route: 'Maldivas · Villa Privada sobre el Agua',
          duration: '7 Días / 6 Noches',
          tier: 'Retiro Selecto',
          perks: ['Traslados Escénicos en Hidroavión', 'Villa con Piscina Privada Infinity', 'Paseo en Barco para Avistamiento de Delfines', 'Mayordomo Dedicado 24 Horas']
        }
      ]
    },
    whyUs: {
      eyebrow: 'Excelencia y Compromiso',
      title: 'Por Qué Elegir Golden Group Travels',
      subtitle: 'Eliminamos la complejidad de organizar sus viajes. Disfrute de convenios directos con aerolíneas y una dedicación constante a su bienestar.',
      pillars: [
        {
          title: 'Alianzas Aéreas Globales',
          desc: 'Trato directo con las principales aerolíneas del mundo, asegurando tarifas preferentes, asignación de asientos y soporte prioritario.'
        },
        {
          title: 'Asesoría de Visados Certificada',
          desc: 'Nuestros gestores auditan cada documento antes de su presentación en embajadas para garantizar la máxima tasa de aprobación.'
        },
        {
          title: 'Conserjería 24/7 a su Servicio',
          desc: 'Un único interlocutor disponible en el 0666-484815 en todo momento para solventar imprevistos o solicitar cambios sobre la marcha.'
        },
        {
          title: 'Transparencia y Seguridad Total',
          desc: 'Sin recargos ocultos ni comisiones imprevistas. Presupuestos claros y medios de pago 100% seguros y auditados.'
        }
      ]
    },
    consultation: {
      eyebrow: 'Presupuesto a Medida',
      title: 'Inicie Su Experiencia',
      subtitle: 'Envíe sus preferencias a continuación. Nuestros asesores comprobarán disponibilidad y le contactarán rápidamente con una propuesta adaptada.',
      selectService: 'Servicio Solicitado *',
      fullName: 'Nombre y Apellidos *',
      phone: 'Teléfono de Contacto *',
      email: 'Correo Electrónico *',
      destination: 'Destino o País *',
      travelDate: 'Fecha Estimada de Salida',
      travelers: 'Número de Pasajeros',
      notes: 'Peticiones Especiales o Comentarios',
      notesPlaceholder: 'Tipo de cabina (Business/Primera), categoría hotelera, consulado de visado u otros detalles...',
      submit: 'Enviar reserva por WhatsApp',
      submitting: 'Preparando mensaje de WhatsApp...',
      whatsappCta: 'Continuar en WhatsApp (0666-484815)',
      privacyNote: 'Sus datos se tratan con estricta confidencialidad. Le responderemos en horario laboral o de inmediato para viajes urgentes.',
      successTitle: 'Solicitud Recibida Correctamente',
      successDesc: 'Gracias. Su solicitud ha sido asignada con prioridad. Nuestro asesor de viajes se comunicará con usted a la mayor brevedad.',
      successRef: 'Referencia',
      successUrgent: '¿Viaje urgente? Llámenos directamente al',
      submitAnother: 'Enviar Otra Consulta'
    },
    faq: {
      eyebrow: 'Respuestas Claras',
      title: 'Preguntas Frecuentes',
      items: [
        {
          q: '¿Cómo gestiona Golden Group Travels cambios o cancelaciones de vuelos?',
          a: 'Nosotros nos encargamos de contactar con la aerolínea directamente. Según la tarifa de su billete, negociamos cambios de fecha, bonos o reembolsos sin que deba esperar horas al teléfono.'
        },
        {
          q: '¿Qué documentación se necesita para tramitar el visado?',
          a: 'Varía según el destino (pasaporte con validez mínima de 6 meses, fotografías reglamentarias, reservas de alojamiento, extractos bancarios y seguro médico). Le entregamos una lista de requisitos adaptada a su caso.'
        },
        {
          q: '¿Es posible personalizar los paquetes para familias o grupos grandes?',
          a: 'Por supuesto. Todos nuestros paquetes vacacionales se diseñan a medida: habitaciones conectadas, vehículos con chófer privado, requerimientos dietéticos y guías de habla hispana.'
        },
        {
          q: '¿Qué coberturas incluye el seguro de viaje internacional?',
          a: 'Nuestras pólizas cumplen con los requisitos de las embajadas e incluyen gastos médicos de urgencia, hospitalización, repatriación, reembolso por cancelación y pérdida de equipaje.'
        },
        {
          q: '¿Cómo puedo hablar con un asesor ahora mismo?',
          a: 'Puede llamar directamente al 0666-484815 en nuestro horario de atención o enviar el formulario para que le llamemos de inmediato.'
        }
      ]
    },
    footer: {
      desc: 'Elevamos el nivel de sus viajes mediante reservas de vuelos preferentes, hoteles de lujo rigurosamente verificados, tramitación ágil de visados y vacaciones a medida.',
      servicesTitle: 'Servicios de Viaje',
      navTitle: 'Navegación Rápida',
      contactTitle: 'Contacto y Asistencia',
      deskLabel: 'Línea Telefónica Directa',
      hoursWeekday: 'Lun – Sáb: 9:00 – 20:00',
      hoursSunday: 'Domingo: Atención de Guardia',
      protection: 'Máxima Protección al Viajero',
      protectionSub: 'Agencia Oficial de Viajes y Visados',
      copyright: 'Golden Group Travels. Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      conditions: 'Condiciones de Emisión de Billetes'
    }
  },

  ar: {
    dir: 'rtl',
    topStrip: {
      hours: 'السبت – الخميس: 9:00 صباحاً – 8:00 مساءً | الجمعة: تحت الطلب',
      certified: 'إدارة معتمدة للسياحة وحجوزات السفر والتأشيرات',
      directDesk: 'المكتب المباشر: 0666-484815',
      email1: 'Info@goldengrouptravels.com',
      phone: '+212 666-484815',
      login: 'تسجيل الدخول',
      register: 'حساب جديد',
      currency: 'درهم مغربي MAD'
    },
    nav: {
      accueil: 'الرئيسية',
      hajOmra: 'حج وعمرة',
      voyageOrganise: 'رحلات منظمة',
      circuitsMaroc: 'جولات المغرب',
      services: 'الخدمات',
      packages: 'رحلاتنا المختارة',
      whyUs: 'لماذا جولدن جروب',
      inquiry: 'الحجز والاستفسار',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بنا',
      callNow: 'اتصل الآن: 0666-484815',
      tagline: 'مجموعة جولدن لخدمات السفر والسياحة'
    },
    hero: {
      talbiyah: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْك',
      talbiyahTranslation: '',
      arabicTitle: 'مجموعة جولدن لخدمات السفر والسياحة',
      tabTours: 'رحلات منظمة',
      tabHotel: 'فنادق',
      destinationTitle: 'الوجهة',
      destinationPlaceholder: 'إلى أين تريد الذهاب؟',
      datesTitle: 'من - إلى',
      datesPlaceholder: 'يوم/شهر/سنة - يوم/شهر/سنة',
      advancedTitle: 'خيارات متقدمة',
      advancedSubtitle: 'المزيد',
      searchBtn: 'بحث',
      headlinePart1: 'اكتشف العالم مع',
      headlinePart2: 'جولدن جروب ترافيلز',
      ctaPrimary: 'خطط لرحلتك الآن',
      ctaPhone: 'اتصل بنا: 0666-484815',
      selectService: 'اختر الخدمة المطلوبة',
      destinationLabel: 'الوجهة / الدولة',
      destinationPlaceholderOld: 'مثال: دبي، لندن، مكة المكرمة',
      dateLabel: 'تاريخ السفر التقريبي',
      travelersLabel: 'عدد المسافرين',
      requestQuote: 'طلب عرض أسعار',
      paxSolo: 'مسافر واحد (فردي)',
      paxCouple: 'مسافران (زوجان)',
      paxFamily: '3–5 (عائلة / مجموعة)',
      paxGroup: '6+ (وفود ومجموعات كبيرة)',
      kpiConcierge: 'خدمة كونسيرج مخصصة',
      kpiPartners: 'شركات طيران وفنادق عالمية',
      kpiVisa: 'نسبة نجاح التأشيرات',
      kpiSupport: 'دعم ومتابعة على مدار الساعة'
    },
    services: {
      eyebrow: 'محفظة خدمات السفر المتكاملة',
      title: 'خدماتنا المتميزة',
      subtitle: 'نهتم بأدق التفاصيل بأعلى معايير الدقة والسرية والاحترافية الذهبية. اختر الخدمة لاستكشاف التفاصيل أو لطلب عرض سعر فوري.',
      inquireNow: 'استفسر الآن',
      viewDetails: 'عرض التفاصيل',
      closeDetails: 'إغلاق',
      specializations: 'التخصصات المتاحة:',
      inquireService: 'طلب هذه الخدمة الآن',
      customCardTitle: 'هل تحتاج إلى ترتيبات سفر خاصة؟',
      customCardTagline: 'مستشار سفر مباشر',
      customCardDesc: 'هل لديك مواعيد رحلات محددة، أو تأشيرات لعدة دول، أو رحلات عائلية ومجموعات خاصة؟ خبراؤنا جاهزون لخدمتك هاتفياً على الفور.',
      customCardBtn: 'اتصل على 0666-484815',
      customCardSub: 'استجابة سريعة · تواصل بشري مباشر · مكتب معتمد',
      items: [
        {
          id: 'flights',
          name: 'حجز تذاكر الطيران',
          tagline: 'درجات السفر الأولى ورجال الأعمال وشبكات الطيران العالمية',
          description: 'تأمين أفضل المسارات الجوية بأسعار تفضيلية، وامتيازات الدرجة الأولى ودرجة رجال الأعمال، وحجوزات الوفود والمجموعات والمسارات متعددة الوجهات.',
          highlights: [
            'أسعار حصرية مع كبرى شركات الطيران العالمية',
            'مرونة عالية في تعديل التواريخ وتغيير التذاكر',
            'استشارات ترقية المقاعد لدرجة الأعمال والأولى',
            'تحسين وتنسيق أوزان الأمتعة واختيار المقاعد'
          ],
          popularOptions: ['الدرجة الأولى ورجال الأعمال', 'حجوزات الشركات والوفود', 'رحلات متعددة الوجهات', 'تنسيق الطيران الخاص والشارتر']
        },
        {
          id: 'hotels',
          name: 'حجز الفنادق والمنتجعات',
          tagline: 'منتجعات 5 نجوم وفنادق بوتيك فاخرة حول العالم',
          description: 'حجوزات مباشرة ومؤكدة لدى أرقى السلاسل الفندقية العالمية والمنتجعات الشاطئية والفلل الخاصة بأعلى معايير الضيافة المعتمدة.',
          highlights: [
            'ترقية الغرف لكبار الشخصيات حسب الإمكانية',
            'إفطار مجاني وإمكانية تمديد وقت تسجيل المغادرة',
            'فنادق 4 و 5 نجوم مختارة ومفحوصة بعناية',
            'أسعار مفاوضة ومخفضة للعائلات والمجموعات'
          ],
          popularOptions: ['أجنحة فاخرة في مراكز المدن', 'منتجعات شاطئية شاملة كلياً', 'شاليهات جبلية خاصة', 'فنادق رجال الأعمال بالقرب من المطارات']
        },
        {
          id: 'visa',
          name: 'خدمات وتسهيل التأشيرات',
          tagline: 'إجراءات سريعة وميسرة لدى السفارات والقنصليات',
          description: 'مرافقة كاملة في استخراج التأشيرات: مراجعة دقيقة للمستندات والوثائق، حجز المواعيد بالسفارات، والتحضير لمقابلات التأشيرة.',
          highlights: [
            'تدقيق كامل للأوراق والملف قبل التقديم الرسمي',
            'حجز مواعيد عاجلة ومتقدمة بالسفارات والقنصليات',
            'خبرة شاملة بتأشيرات السياحة والعمل والعبور',
            'سجل نجاح مرتفع لدى السفارات ذات المعايير الصارمة'
          ],
          popularOptions: ['تأشيرات شنغن السياحية والتجارية', 'تأشيرات بريطانيا وأمريكا', 'تأشيرات الخليج والشرق الأوسط الإلكترونية', 'تأشيرات دول آسيا والشرق الأقصى']
        },
        {
          id: 'insurance',
          name: 'وثائق تأمين السفر',
          tagline: 'تغطية طبية دولية وحماية شاملة للأمتعة والرحلات',
          description: 'سافر باطمئنان وراحة بال تامة مع تغطية شاملة للحالات الصحية الطارئة، وإلغاء الرحلات المفاجئ، وضياع الأمتعة والمساعدة في الأزمات.',
          highlights: [
            'تغطية نفقات الطوارئ الطبية والمستشفيات عالمياً',
            'تعويض إلغاء الرحلات وتأخر إقلاع الطائرات',
            'حماية وتعويض الأمتعة المفقودة أو المتأخرة',
            'شهادات معتمدة ومطابقة لشروط طلبات التأشيرات'
          ],
          popularOptions: ['وثيقة سفر فردية شاملة', 'تأمين العطلات العائلية', 'تغطية كبار السن الخاصة', 'وثيقة سنوية للرحلات المتعددة']
        },
        {
          id: 'packages',
          name: 'باقات العطلات والسياحة',
          tagline: 'رحلات ترفيهية خاصة وبرامج عمرة راقية',
          description: 'برامج عطلات متكاملة مصممة بعناية منذ لحظة الوصول وحتى المغادرة؛ تشمل رحلات شهر العسل، الإجازات العائلية، وبرامج العمرة الفاخرة.',
          highlights: [
            'برامج سياحية متكاملة مع سيارات وسائقين خاصين',
            'جولات سياحية وثقافية خاصة مع مرشدين معتمدين',
            'برامج عمرة متميزة بفنادق مطلة على الحرم الشريف',
            'متابعة ومرافقة مستمرة طوال أيام الرحلة'
          ],
          popularOptions: ['جولات المدن الأوروبية الكبرى', 'إجازات دبي والإمارات الفاخرة', 'برامج العمرة والزيارات النبوية', 'جزر المالديف وبالي الاستوائية']
        }
      ]
    },
    packages: {
      eyebrow: 'مساراتنا الحصرية',
      title: 'رحلات عالمية مختارة',
      subtitle: 'مسارات سفر جرى تخطيطها بحرفية فائقة، تجمع بين الفنادق الفاخرة، والتنقلات الخاصة، وأفضل مسارات الطيران.',
      durationLabel: 'المدة',
      inclusionsLabel: 'المزايا الحصرية المشمولة:',
      ctaQuote: 'طلب برنامج مخصص',
      ctaCall: 'اتصل لمعرفة المواعيد',
      items: [
        {
          code: 'GGT-EU01',
          title: 'روائع العواصم الأوروبية',
          route: 'لندن · باريس · زيورخ · ميلانو · روما',
          duration: '14 يوماً / 13 ليلة',
          tier: 'فخامة تنفيذية',
          perks: ['سائق خاص للتنقلات والمطارات', 'أجنحة مركزية فئة 5 نجوم', 'دخول سريع وتذاكر لكافة المعالم', 'قطار بانورامي سويسري الدرجة الأولى']
        },
        {
          code: 'GGT-ME02',
          title: 'سحر الأصالة العربية وواحات الصحراء',
          route: 'دبي · أبوظبي · مسقط',
          duration: '8 أيام / 7 ليالٍ',
          tier: 'الباقة الذهبية المميزة',
          perks: ['أجنحة بإطلالة برج خليفة', 'سفاري صحراوي خاص مع عشاء فاخر', 'جولة يخت بحري خاص', 'زيارة خاصة لمتحف اللوفر أبوظبي']
        },
        {
          code: 'GGT-UM03',
          title: 'رحلة العمرة المباركة والسكينة الروحية',
          route: 'جدة · مكة المكرمة · المدينة المنورة',
          duration: '10 أيام / 9 ليالٍ',
          tier: 'العمرة الراقية الأولى',
          perks: ['فنادق 5 نجوم بإطلالة مباشرة على الحرم', 'قطار الحرمين السريع الدرجة الأولى', 'جولات مزارات دينية بصحبة مرشد', 'استخراج التأشيرة وتصاريح العمرة كاملة']
        },
        {
          code: 'GGT-IS04',
          title: 'واحة الجزر الفيروزية الساحرة',
          route: 'المالديف · فيلا خاصة فوق سطح الماء',
          duration: '7 أيام / 6 ليالٍ',
          tier: 'استجمام استثنائي',
          perks: ['انتقالات بطائرة مائية ذات إطلالة ساحرة', 'فيلا بمسبح خاص مباشر على المحيط', 'رحلة خاصة لمشاهدة الدلافين عند الغروب', 'خادم شخصي خاص بالفيلا على مدار الساعة']
        }
      ]
    },
    whyUs: {
      eyebrow: 'معايير ذهبية لا تضاهى',
      title: 'لماذا تختار جولدن جروب ترافيلز',
      subtitle: 'نزيل عن كاهلك كل أعباء وعناء التخطيط للسفر، لنمنحك رحلة مريحة بفضل علاقاتنا المباشرة في صناعة السفر والتزامنا الراسخ.',
      pillars: [
        {
          title: 'تحالفات طيران دولية مباشرة',
          desc: 'علاقات عمل وثيقة مع كبريات خطوط الطيران العالمية تضمن أفضل الأسعار وأولوية تعديل الرحلات واختيار المقاعد.'
        },
        {
          title: 'استشارات تأشيرات معتمدة',
          desc: 'يقوم خبراؤنا بالتدقيق الدقيق في جميع المستندات المطلوبة لتفادي أي تأخير ولرفع نسبة الموافقة لدى السفارات.'
        },
        {
          title: 'كونسيرج ومساعد خاص 24/7',
          desc: 'مستشار سفر متخصص يتواصل معك مباشرة عبر الهاتف على الرقم 0666-484815 طوال مدة الرحلة لمساعدتك في أي طلب.'
        },
        {
          title: 'شفافية وأمان مالي كامل',
          desc: 'لا توجد أي رسوم خفية أو عمولات غير معلنة. عروض أسعار واضحة ومفصلة مع خيارات دفع آمنة ومعتمدة.'
        }
      ]
    },
    consultation: {
      eyebrow: 'عرض سعر مخصص لرحلتك',
      title: 'ابدأ رحلتك معنا اليوم',
      subtitle: 'أدخل تفاصيل رحلتك في النموذج أدناه وسيقوم مستشارو السفر لدينا بالتأكد من التوافر وتقديم أفضل خطة سفر تناسبك.',
      selectService: 'اختر الخدمة المطلوبة *',
      fullName: 'الاسم الكامل *',
      phone: 'رقم الهاتف *',
      email: 'البريد الإلكتروني *',
      destination: 'الوجهة أو الدولة المرغوبة *',
      travelDate: 'تاريخ السفر المتوقع',
      travelers: 'عدد المسافرين',
      notes: 'تفاصيل خاصة أو ملاحظات إضافية',
      notesPlaceholder: 'حدد درجة السفر (أعمال/أولى)، تصنيف الفندق، نوع التأشيرة، أو أي طلبات خاصة...',
      submit: 'إرسال طلب الحجز عبر واتساب',
      submitting: 'جارٍ إعداد رسالة واتساب...',
      whatsappCta: 'متابعة عبر واتساب (0666-484815)',
      privacyNote: 'بياناتك الشخصية تخضع لسرية تامة. نقوم بالرد خلال ساعات العمل الرسمية وفوراً في الحالات الطارئة.',
      successTitle: 'تم استلام طلبكم بنجاح',
      successDesc: 'شكراً لثقتكم بنا. تم تسجيل طلبكم وسيقوم مستشار السفر الخاص بنا بالتواصل معكم في أقرب وقت.',
      successRef: 'رقم المرجع',
      successUrgent: 'للحالات المستعجلة؟ يرجى الاتصال بنا مباشرة على',
      submitAnother: 'إرسال استفسار آخر'
    },
    faq: {
      eyebrow: 'إجابات واضحة لاستفساراتكم',
      title: 'الأسئلة الأكثر شيوعاً',
      items: [
        {
          q: 'كيف تتعامل جولدن جروب ترافيلز مع تعديل أو إلغاء تذاكر الطيران؟',
          a: 'نتولى التواصل والتفاوض المباشر مع شركات الطيران دون الحاجة لانتظاركم على خطوط الانتظار. وبناءً على شروط التذكرة، نسعى لتعديل التواريخ أو استرداد القيمة أو تحويلها لقسائم سفر معتمدة.'
        },
        {
          q: 'ما هي الوثائق المطلوبة للتقديم على خدمات التأشيرات؟',
          a: 'تختلف المستندات حسب وجهة السفر، وعادة ما تشمل جواز سفر ساري لأكثر من 6 أشهر، صور شخصية، كشف حساب بنكي، وتأمين سفر معتمد. نزودكم بقائمة مخصصة وندقق كافة الأوراق قبل التقديم.'
        },
        {
          q: 'هل يمكنكم تصميم باقة عطلات خاصة للعائلات والوفود؟',
          a: 'نعم بالتأكيد، كافة برامجنا السياحية قابلة للتعديل والتهيئة بالكامل: من اختيار الغرف المتصلة، وتوفير حافلات وسيارات خاصة بسائق، وتوفير مرشدين سياحيين يتحدثون لغتكم.'
        },
        {
          q: 'ما الذي تشمله وثيقة تأمين السفر الدولي؟',
          a: 'تغطي وثائقنا الطوارئ الطبية والعلاج بالمستشفيات، والإخلاء الطبي الطارئ، وتعويض إلغاء الرحلات أو تأخرها، وفقدان الأمتعة الشخصية وتفي بكافة متطلبات السفارات والتأشيرات.'
        },
        {
          q: 'كيف يمكنني التحدث مباشرة مع مستشار السفر الآن؟',
          a: 'يمكنكم الاتصال مباشرة على خطنا المباشر 0666-484815 خلال ساعات العمل، أو ملء النموذج أعلاه لنعاود الاتصال بكم في أقرب فرصة.'
        }
      ]
    },
    footer: {
      desc: 'نرتقي بتجربة السفر الدولي عبر ترتيبات طيران استثنائية، وفنادق فاخرة معتمدة، وتسهيلات تأشيرات دقيقة، وبرامج عطلات وعمرة لا تُنسى.',
      servicesTitle: 'خدماتنا',
      navTitle: 'روابط سريعة',
      contactTitle: 'الاتصال والمساعدة',
      deskLabel: 'المكتب الهاتفي المباشر',
      hoursWeekday: 'السبت – الخميس: 9:00 ص – 8:00 م',
      hoursSunday: 'الجمعة: خدمة تحت الطلب',
      protection: 'حماية كاملة للمسافرين',
      protectionSub: 'وكالة سفر وسياحة وتأشيرات معتمدة',
      copyright: 'جولدن جروب ترافيلز. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      conditions: 'شروط وأحكام إصدار التذاكر'
    }
  }
};
