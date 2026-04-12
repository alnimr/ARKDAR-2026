import React from 'react';

export interface ServiceReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ServiceData {
  id: string;
  title: string;
  location: string;
  image: string;
  duration: string;
  level: string;
  language: string;
  equipment: string;
  description: React.ReactNode;
  included: string[];
  notIncluded: string[];
  expert: {
    name: string;
    image: string;
    bio: string;
  };
  reviews: ServiceReview[];
  bookingType: 'fixed' | 'inquiry';
  price: number;
}

export const fallbackServices: ServiceData[] = [
  {
    id: 'archery_ground',
    title: 'Archery Fundamentals',
    location: 'Cairo, Egypt',
    image: 'https://images.unsplash.com/photo-1606801946808-8df09d66ec06?q=80&w=800&auto=format&fit=crop',
    duration: '2 Hours / Session',
    level: 'Beginner',
    language: 'Arabic, English',
    equipment: 'Provided',
    description: <p>Learn the ancient art of traditional archery. Perfect for beginners looking to master the basics of stance, grip, and release.</p>,
    included: ['Professional instruction', 'Safety equipment', 'Traditional bow and arrows'],
    notIncluded: ['Transportation', 'Meals'],
    expert: {
      name: 'Tariq Al-Mamluk',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
      bio: 'Master Archer with 15 years of experience in traditional Mamluk archery.'
    },
    reviews: [],
    bookingType: 'fixed',
    price: 150
  },
  {
    id: 'archery_mounted',
    title: 'Equestrian Archery Masterclass',
    location: 'Seville, Spain',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800&auto=format&fit=crop',
    duration: '3 Days Intensive',
    level: 'Advanced',
    language: 'English, Spanish',
    equipment: 'Bring your own bow',
    description: <p>An intensive masterclass combining horseback riding and archery. For experienced archers looking to take their skills to the next level.</p>,
    included: ['Horse rental', 'Track access', 'Video analysis'],
    notIncluded: ['Accommodation', 'Flights'],
    expert: {
      name: 'Elena Rodriguez',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      bio: 'International Equestrian Archery Champion.'
    },
    reviews: [],
    bookingType: 'inquiry',
    price: 800
  },
  {
    id: 'sword_ground',
    title: 'Historical Weapons Training',
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1464490826362-59825bc56314?q=80&w=800&auto=format&fit=crop',
    duration: '4 Hours',
    level: 'Intermediate',
    language: 'Turkish, English',
    equipment: 'Provided',
    description: <p>Explore the use of historical Mamluk and Ottoman weapons including swords and spears in a safe, controlled environment.</p>,
    included: ['Training weapons', 'Protective gear', 'Historical context lecture'],
    notIncluded: ['Personal insurance'],
    expert: {
      name: 'Mehmet Yilmaz',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
      bio: 'Historian and historical martial arts instructor.'
    },
    reviews: [],
    bookingType: 'fixed',
    price: 200
  }
];
