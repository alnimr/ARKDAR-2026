export interface ProductData {
  id: string;
  name: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  description: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  price: number;
  category: {
    ar: string;
    en: string;
    de: string;
    es: string;
  };
  image: string;
  images: string[];
  inStock: boolean;
}

export const mockProducts: ProductData[] = [
  {
    id: '1',
    name: {
      ar: 'قوس مملوكي',
      en: 'Mamluk Bow',
      de: 'Mamluken-Bogen',
      es: 'Arco Mameluco'
    },
    description: {
      ar: 'قوس تقليدي مصنوع يدوياً بدقة متناهية، مستوحى من التصاميم المملوكية الأصيلة. مثالي للرماية من ظهر الخيل.',
      en: 'A meticulously handcrafted traditional bow, inspired by authentic Mamluk designs. Perfect for horseback archery.',
      de: 'Ein sorgfältig handgefertigter traditioneller Bogen, inspiriert von authentischen Mamluken-Designs. Perfekt für das berittene Bogenschießen.',
      es: 'Un arco tradicional meticulosamente hecho a mano, inspirado en auténticos diseños mamelucos. Perfecto para el tiro con arco a caballo.'
    },
    price: 450,
    category: {
      ar: 'أقواس',
      en: 'Bows',
      de: 'Bögen',
      es: 'Arcos'
    },
    image: 'https://images.unsplash.com/photo-1585144860131-245d551c77f6?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585144860131-245d551c77f6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true
  },
  {
    id: '2',
    name: {
      ar: 'جعبة سهام جلدية',
      en: 'Leather Quiver',
      de: 'Lederköcher',
      es: 'Carcaj de Cuero'
    },
    description: {
      ar: 'جعبة سهام مصنوعة من الجلد الطبيعي الفاخر، مصممة لسهولة الاستخدام أثناء الحركة السريعة على ظهر الخيل.',
      en: 'A quiver made from premium natural leather, designed for ease of use during fast movement on horseback.',
      de: 'Ein Köcher aus hochwertigem Naturleder, der für eine einfache Handhabung bei schnellen Bewegungen auf dem Pferderücken entwickelt wurde.',
      es: 'Un carcaj hecho de cuero natural de primera calidad, diseñado para facilitar su uso durante el movimiento rápido a caballo.'
    },
    price: 120,
    category: {
      ar: 'إكسسوارات جلدية',
      en: 'Leather Accessories',
      de: 'Lederzubehör',
      es: 'Accesorios de Cuero'
    },
    image: 'https://images.unsplash.com/photo-1590059346158-3162b2171120?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590059346158-3162b2171120?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true
  },
  {
    id: '3',
    name: {
      ar: 'طقم سهام خشبية',
      en: 'Wooden Arrows Set',
      de: 'Holzpfeil-Set',
      es: 'Juego de Flechas de Madera'
    },
    description: {
      ar: 'طقم مكون من 12 سهم خشبي متوازن بعناية، مع ريش طبيعي ورؤوس معدنية للتدريب الاحترافي.',
      en: 'A set of 12 carefully balanced wooden arrows, with natural feathers and metal tips for professional training.',
      de: 'Ein Set mit 12 sorgfältig ausbalancierten Holzpfeilen mit Naturfedern und Metallspitzen für professionelles Training.',
      es: 'Un juego de 12 flechas de madera cuidadosamente equilibradas, con plumas naturales y puntas de metal para entrenamiento profesional.'
    },
    price: 85,
    category: {
      ar: 'سهام',
      en: 'Arrows',
      de: 'Pfeile',
      es: 'Flechas'
    },
    image: 'https://images.unsplash.com/photo-1589824783837-6169889fa20f?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589824783837-6169889fa20f?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true
  },
  {
    id: '4',
    name: {
      ar: 'واقي ذراع',
      en: 'Arm Guard',
      de: 'Armschutz',
      es: 'Protector de Brazo'
    },
    description: {
      ar: 'واقي ذراع جلدي مزخرف بنقوش إسلامية، يوفر حماية ممتازة وراحة أثناء الرماية.',
      en: 'A leather arm guard decorated with Islamic patterns, providing excellent protection and comfort during archery.',
      de: 'Ein Lederarmschutz, verziert mit islamischen Mustern, der hervorragenden Schutz und Komfort beim Bogenschießen bietet.',
      es: 'Un protector de brazo de cuero decorado con motivos islámicos, que proporciona una excelente protección y comodidad durante el tiro con arco.'
    },
    price: 45,
    category: {
      ar: 'معدات حماية',
      en: 'Protective Gear',
      de: 'Schutzausrüstung',
      es: 'Equipo de Protección'
    },
    image: 'https://images.unsplash.com/photo-1614031679213-3563d7722716?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1614031679213-3563d7722716?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true
  },
  {
    id: '5',
    name: {
      ar: 'حزام تقليدي',
      en: 'Traditional Belt',
      de: 'Traditioneller Gürtel',
      es: 'Cinturón Tradicional'
    },
    description: {
      ar: 'حزام عريض من الجلد الطبيعي، مصمم لحمل الجعبة والسيف بثبات أثناء ركوب الخيل.',
      en: 'A wide natural leather belt, designed to hold the quiver and sword securely while riding.',
      de: 'Ein breiter Naturledergürtel, der Köcher und Schwert beim Reiten sicher hält.',
      es: 'Un cinturón ancho de cuero natural, diseñado para sujetar el carcaj y la espada de forma segura mientras se monta.'
    },
    price: 95,
    category: {
      ar: 'إكسسوارات جلدية',
      en: 'Leather Accessories',
      de: 'Lederzubehör',
      es: 'Accesorios de Cuero'
    },
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: false
  },
  {
    id: '6',
    name: {
      ar: 'حقيبة التدريب التراثية',
      en: 'Heritage Training Kit',
      de: 'Kulturerbe-Trainingsset',
      es: 'Kit de Entrenamiento Patrimonial'
    },
    description: {
      ar: 'مجموعة متكاملة للمبتدئين تحتوي على قوس تدريب، 6 سهام، واقي ذراع، وجعبة بسيطة.',
      en: 'A complete beginner set containing a training bow, 6 arrows, an arm guard, and a simple quiver.',
      de: 'Ein komplettes Anfängerset mit einem Trainingsbogen, 6 Pfeilen, einem Armschutz und einem einfachen Köcher.',
      es: 'Un juego completo para principiantes que contiene un arco de entrenamiento, 6 flechas, un protector de brazo y un carcaj simple.'
    },
    price: 280,
    category: {
      ar: 'مجموعات',
      en: 'Sets',
      de: 'Sets',
      es: 'Conjuntos'
    },
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
    ],
    inStock: true
  }
];
