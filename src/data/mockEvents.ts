export type EventStatus = 'live' | 'upcoming' | 'past';

export interface EventData {
  id: string;
  status: EventStatus;
  title: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  date: string;
  location: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  summary: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  image: string;
  images?: string[];
  schedule?: {
    time: string;
    activity: {
      ar: string;
      en: string;
      de: string;
      es: string;
    };
  }[];
  journalLink?: string; // Link to coverage in journal
  price?: number;
}

export const mockEvents: EventData[] = [
  {
    id: 'live-archery-masterclass',
    status: 'live',
    title: {
      ar: 'ماستر كلاس: الرماية المتقدمة (بث مباشر)',
      en: 'Masterclass: Advanced Archery (Live Stream)',
      de: 'Meisterklasse: Fortgeschrittenes Bogenschießen (Live-Stream)',
      es: 'Clase Magistral: Tiro con Arco Avanzado (Transmisión en Vivo)'
    },
    date: '2026-04-03',
    location: {
      ar: 'أونلاين / إنترلاكن',
      en: 'Online / Interlaken',
      de: 'Online / Interlaken',
      es: 'En línea / Interlaken'
    },
    summary: {
      ar: 'انضم إلينا الآن في بث مباشر لورشة عمل متقدمة مع كبار المدربين. تعلم أسرار الدقة والسرعة.',
      en: 'Join us now in a live stream of an advanced workshop with top instructors. Learn the secrets of accuracy and speed.',
      de: 'Nehmen Sie jetzt an einem Live-Stream eines fortgeschrittenen Workshops mit Top-Instruktoren teil. Lernen Sie die Geheimnisse von Genauigkeit und Geschwindigkeit.',
      es: 'Únase a nosotros ahora en una transmisión en vivo de un taller avanzado con los mejores instructores. Aprenda los secretos de la precisión y la velocidad.'
    },
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
    price: 50
  },
  {
    id: 'swiss-archery-tournament-2024',
    status: 'upcoming',
    title: {
      ar: 'بطولة جبال الألب للرماية من ظهر الخيل',
      en: 'Alpine Horseback Archery Tournament',
      de: 'Alpen-Turnier im berittenen Bogenschießen',
      es: 'Torneo Alpino de Tiro con Arco a Caballo'
    },
    date: '2024-08-15',
    location: {
      ar: 'إنترلاكن، سويسرا',
      en: 'Interlaken, Switzerland',
      de: 'Interlaken, Schweiz',
      es: 'Interlaken, Suiza'
    },
    summary: {
      ar: 'انضم إلينا في أكبر تجمع لرماة الخيل في أوروبا، وسط جبال الألب السويسرية الخلابة. مسابقات، عروض حية، وورش عمل.',
      en: 'Join us at the largest gathering of horseback archers in Europe, amidst the breathtaking Swiss Alps. Competitions, live shows, and workshops.',
      de: 'Nehmen Sie an der größten Zusammenkunft von berittenen Bogenschützen in Europa inmitten der atemberaubenden Schweizer Alpen teil. Wettbewerbe, Live-Shows und Workshops.',
      es: 'Únase a nosotros en la mayor reunión de arqueros a caballo de Europa, en medio de los impresionantes Alpes suizos. Competiciones, espectáculos en vivo y talleres.'
    },
    image: 'https://images.unsplash.com/photo-1590059346158-3162b2171120?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590059346158-3162b2171120?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553532434-5ab5b6b84993?q=80&w=1000&auto=format&fit=crop'
    ],
    schedule: [
      { time: '09:00', activity: { ar: 'تسجيل الحضور', en: 'Registration', de: 'Registrierung', es: 'Registro' } },
      { time: '10:30', activity: { ar: 'الجولة الأولى: الرماية على الأهداف الثابتة', en: 'Round 1: Static Target Archery', de: 'Runde 1: Statisches Zielbogenschießen', es: 'Ronda 1: Tiro con arco a objetivo estático' } },
      { time: '13:00', activity: { ar: 'استراحة الغداء', en: 'Lunch Break', de: 'Mittagspause', es: 'Pausa para el almuerzo' } },
      { time: '14:30', activity: { ar: 'الجولة الثانية: الرماية المتحركة (المسار الكوري)', en: 'Round 2: Moving Archery (Korean Track)', de: 'Runde 2: Bewegliches Bogenschießen (Koreanische Strecke)', es: 'Ronda 2: Tiro con arco en movimiento (Pista coreana)' } },
      { time: '17:00', activity: { ar: 'حفل توزيع الجوائز', en: 'Awards Ceremony', de: 'Preisverleihung', es: 'Ceremonia de premiación' } }
    ]
  },
  {
    id: 'cairo-heritage-camp-2024',
    status: 'upcoming',
    title: {
      ar: 'المعسكر التدريبي الشتوي في القاهرة',
      en: 'Winter Training Camp in Cairo',
      de: 'Wintertrainingslager in Kairo',
      es: 'Campamento de entrenamiento de invierno en El Cairo'
    },
    date: '2024-12-01',
    location: {
      ar: 'القاهرة، مصر',
      en: 'Cairo, Egypt',
      de: 'Kairo, Ägypten',
      es: 'El Cairo, Egipto'
    },
    summary: {
      ar: 'معسكر مكثف لمدة أسبوع يركز على تقنيات السيف المملوكي والرماية المتقدمة في أجواء تاريخية أصيلة.',
      en: 'An intensive week-long camp focusing on Mamluk sword techniques and advanced archery in an authentic historical setting.',
      de: 'Ein intensives einwöchiges Camp mit Schwerpunkt auf Mamluken-Schwerttechniken und fortgeschrittenem Bogenschießen in einer authentischen historischen Umgebung.',
      es: 'Un campamento intensivo de una semana centrado en técnicas de espada mameluca y tiro con arco avanzado en un entorno histórico auténtico.'
    },
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'swiss-launch-event-2023',
    status: 'past',
    title: {
      ar: 'حفل الإطلاق الرسمي لأكاديمية ARKDAR',
      en: 'Official Launch Event of ARKDAR Academy',
      de: 'Offizielle Eröffnungsveranstaltung der ARKDAR-Akademie',
      es: 'Evento de lanzamiento oficial de la Academia ARKDAR'
    },
    date: '2023-10-10',
    location: {
      ar: 'إنترلاكن، سويسرا',
      en: 'Interlaken, Switzerland',
      de: 'Interlaken, Schweiz',
      es: 'Interlaken, Suiza'
    },
    summary: {
      ar: 'شهدنا حضوراً مميزاً من عشاق الفروسية في أوروبا للاحتفال بافتتاح أول أكاديمية متخصصة في التراث المملوكي.',
      en: 'We witnessed a remarkable attendance of equestrian enthusiasts in Europe to celebrate the opening of the first academy specialized in Mamluk heritage.',
      de: 'Wir erlebten eine bemerkenswerte Teilnahme von Reitsportbegeisterten in Europa, um die Eröffnung der ersten Akademie zu feiern, die sich auf das Mamluken-Erbe spezialisiert hat.',
      es: 'Fuimos testigos de una notable asistencia de entusiastas de la equitación en Europa para celebrar la apertura de la primera academia especializada en herencia mameluca.'
    },
    image: 'https://images.unsplash.com/photo-1553532434-5ab5b6b84993?q=80&w=1000&auto=format&fit=crop',
    journalLink: '/journal/press-release-1'
  }
];
