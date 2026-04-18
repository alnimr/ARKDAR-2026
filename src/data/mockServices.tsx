export interface ServiceReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface LocalizedString {
  ar: string;
  en: string;
  de: string;
  es: string;
}

export interface ServiceData {
  id: string;
  title: LocalizedString;
  location: LocalizedString;
  image: string;
  duration: LocalizedString;
  level: LocalizedString;
  language: LocalizedString;
  equipment: LocalizedString;
  description: LocalizedString;
  included: LocalizedString[];
  notIncluded: LocalizedString[];
  expert: {
    name: LocalizedString;
    image: string;
    bio: LocalizedString;
  };
  reviews: ServiceReview[];
  bookingType: 'fixed' | 'inquiry';
  price: number;
}

export const fallbackServices: ServiceData[] = [
  {
    id: 'archery_ground',
    title: {
      ar: 'أساسيات الرماية',
      en: 'Archery Fundamentals',
      de: 'Grundlagen des Bogenschießens',
      es: 'Fundamentos del Tiro con Arco'
    },
    location: {
      ar: 'القاهرة، مصر',
      en: 'Cairo, Egypt',
      de: 'Kairo, Ägypten',
      es: 'Cairo, Egipto'
    },
    image: 'https://images.unsplash.com/photo-1606801946808-8df09d66ec06?q=80&w=800&auto=format&fit=crop',
    duration: {
      ar: 'ساعتان / جلسة',
      en: '2 Hours / Session',
      de: '2 Stunden / Sitzung',
      es: '2 Horas / Sesión'
    },
    level: {
      ar: 'مبتدئ',
      en: 'Beginner',
      de: 'Anfänger',
      es: 'Principiante'
    },
    language: {
      ar: 'العربية، الإنجليزية',
      en: 'Arabic, English',
      de: 'Arabisch, Englisch',
      es: 'Árabe, Inglés'
    },
    equipment: {
      ar: 'متوفر',
      en: 'Provided',
      de: 'Bereitgestellt',
      es: 'Proporcionado'
    },
    description: {
      ar: 'تعلم فن الرماية التقليدي القديم. مثالي للمبتدئين الراغبين في إتقان أساسيات الوقفة والقبضة والإطلاق.',
      en: 'Learn the ancient art of traditional archery. Perfect for beginners looking to master the basics of stance, grip, and release.',
      de: 'Lernen Sie die alte Kunst des traditionellen Bogenschießens. Perfekt für Anfänger, die die Grundlagen von Haltung, Griff und Loslassen meistern möchten.',
      es: 'Aprende el antiguo arte del tiro con arco tradicional. Perfecto para principiantes que buscan dominar los conceptos básicos de postura, agarre y liberación.'
    },
    included: [
      { ar: 'إشراف احترافي', en: 'Professional instruction', de: 'Professionelle Anleitung', es: 'Instrucción profesional' },
      { ar: 'معدات السلامة', en: 'Safety equipment', de: 'Sicherheitsausrüstung', es: 'Equipo de seguridad' },
      { ar: 'قوس وسهام تقليدية', en: 'Traditional bow and arrows', de: 'Traditioneller Bogen und Pfeile', es: 'Arco y flechas tradicionales' }
    ],
    notIncluded: [
      { ar: 'المواصلات', en: 'Transportation', de: 'Transport', es: 'Transporte' },
      { ar: 'الوجبات', en: 'Meals', de: 'Mahlzeiten', es: 'Comidas' }
    ],
    expert: {
      name: {
        ar: 'طارق المملوك',
        en: 'Tariq Al-Mamluk',
        de: 'Tariq Al-Mamluk',
        es: 'Tariq Al-Mamluk'
      },
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      bio: {
        ar: 'خبير رماية بمدى 15 عاماً في الرماية المملوكية التقليدية.',
        en: 'Master Archer with 15 years of experience in traditional Mamluk archery.',
        de: 'Meisterschütze mit 15 Jahren Erfahrung im traditionellen Mamluken-Bogenschießen.',
        es: 'Maestro arquero con 15 años de experiencia en el tiro con arco mameluco tradicional.'
      }
    },
    reviews: [],
    bookingType: 'fixed',
    price: 150
  },
  {
    id: 'archery_mounted',
    title: {
      ar: 'دورة الرماية من ظهر الخيل',
      en: 'Equestrian Archery Masterclass',
      de: 'Meisterklasse für berittenes Bogenschießen',
      es: 'Masterclass de Tiro con Arco Ecuestre'
    },
    location: {
      ar: 'إشبيلية، إسبانيا',
      en: 'Seville, Spain',
      de: 'Sevilla, Spanien',
      es: 'Sevilla, España'
    },
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800&auto=format&fit=crop',
    duration: {
      ar: '3 أيام مكثفة',
      en: '3 Days Intensive',
      de: '3 Tage intensiv',
      es: '3 Días intensivos'
    },
    level: {
      ar: 'متقدم',
      en: 'Advanced',
      de: 'Fortgeschritten',
      es: 'Avanzado'
    },
    language: {
      ar: 'الإنجليزية، الإسبانية',
      en: 'English, Spanish',
      de: 'Englisch, Spanisch',
      es: 'Inglés, Español'
    },
    equipment: {
      ar: 'أحضر قوسك الخاص',
      en: 'Bring your own bow',
      de: 'Bringen Sie Ihren eigenen Bogen mit',
      es: 'Trae tu propio arco'
    },
    description: {
      ar: 'دورة مكثفة تجمع بين ركوب الخيل والرماية. للرماة ذوي الخبرة الراغبين في رفع مهاراتهم إلى المستوى التالي.',
      en: 'An intensive masterclass combining horseback riding and archery. For experienced archers looking to take their skills to the next level.',
      de: 'Eine intensive Meisterklasse, die Reiten und Bogenschießen kombiniert. Für erfahrene Bogenschützen, die ihre Fähigkeiten auf die nächste Stufe heben möchten.',
      es: 'Una clase magistral intensiva que combina equitación y tiro con arco. Para arqueros experimentados que buscan llevar sus habilidades al siguiente nivel.'
    },
    included: [
      { ar: 'استئجار الخيل', en: 'Horse rental', de: 'Pferdemiete', es: 'Alquiler de caballos' },
      { ar: 'دخول الحلبة', en: 'Track access', de: 'Streckenzugang', es: 'Acceso a la pista' },
      { ar: 'تحليل فيديو', en: 'Video analysis', de: 'Videoanalyse', es: 'Análisis de video' }
    ],
    notIncluded: [
      { ar: 'الإقامة', en: 'Accommodation', de: 'Unterkunft', es: 'Alojamiento' },
      { ar: 'الطيران', en: 'Flights', de: 'Flüge', es: 'Vuelos' }
    ],
    expert: {
      name: {
        ar: 'إيلينا رودريغيز',
        en: 'Elena Rodriguez',
        de: 'Elena Rodriguez',
        es: 'Elena Rodriguez'
      },
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      bio: {
        ar: 'بطلة دولية في الرماية من ظهر الخيل.',
        en: 'International Equestrian Archery Champion.',
        de: 'Internationale Championess im berittenen Bogenschießen.',
        es: 'Campeona internacional de tiro con arco ecuestre.'
      }
    },
    reviews: [],
    bookingType: 'inquiry',
    price: 800
  },
  {
    id: 'sword_ground',
    title: {
      ar: 'تدريب الأسلحة التراثية',
      en: 'Historical Weapons Training',
      de: 'Historisches Waffentraining',
      es: 'Entrenamiento de Armas Históricas'
    },
    location: {
      ar: 'إسطنبول، تركيا',
      en: 'Istanbul, Turkey',
      de: 'Istanbul, Türkei',
      es: 'Estambul, Turquía'
    },
    image: 'https://images.unsplash.com/photo-1464490826362-59825bc56314?q=80&w=800&auto=format&fit=crop',
    duration: {
      ar: '4 ساعات',
      en: '4 Hours',
      de: '4 Stunden',
      es: '4 Horas'
    },
    level: {
      ar: 'متوسط',
      en: 'Intermediate',
      de: 'Mittelstufe',
      es: 'Intermedio'
    },
    language: {
      ar: 'التركية، الإنجليزية',
      en: 'Turkish, English',
      de: 'Türkisch, Englisch',
      es: 'Turco, Inglés'
    },
    equipment: {
      ar: 'متوفر',
      en: 'Provided',
      de: 'Bereitgestellt',
      es: 'Proporcionado'
    },
    description: {
      ar: 'استكشف استخدام الأسلحة المملوكية والعثمانية التاريخية بما في ذلك السيوف والرماح في بيئة آمنة ومنضبطة.',
      en: 'Explore the use of historical Mamluk and Ottoman weapons including swords and spears in a safe, controlled environment.',
      de: 'Erkunden Sie den Einsatz historischer Mamluken- und osmanischer Waffen, einschließlich Schwertern und Speeren, in einer sicheren, kontrollierten Umgebung.',
      es: 'Explora el uso de armas históricas mamelucas y otomanas, incluidos sables y lanzas, en un entorno seguro y controlado.'
    },
    included: [
      { ar: 'أسلحة تدريب', en: 'Training weapons', de: 'Trainingswaffen', es: 'Armas de entrenamiento' },
      { ar: 'معدات واقية', en: 'Protective gear', de: 'Schutzausrüstung', es: 'Equipo de protección' },
      { ar: 'محاضرة في السياق التاريخي', en: 'Historical context lecture', de: 'Vortrag zum historischen Kontext', es: 'Conferencia de contexto histórico' }
    ],
    notIncluded: [
      { ar: 'تأمين شخصي', en: 'Personal insurance', de: 'Persönliche Versicherung', es: 'Seguro personal' }
    ],
    expert: {
      name: {
        ar: 'محمد يلماز',
        en: 'Mehmet Yilmaz',
        de: 'Mehmet Yilmaz',
        es: 'Mehmet Yilmaz'
      },
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
      bio: {
        ar: 'مؤرخ ومدرب فنون قتالية تاريخية.',
        en: 'Historian and historical martial arts instructor.',
        de: 'Historiker und Lehrer für historische Kampfkünste.',
        es: 'Historiador e instructor de artes marciales históricas.'
      }
    },
    reviews: [],
    bookingType: 'fixed',
    price: 200
  }
];
