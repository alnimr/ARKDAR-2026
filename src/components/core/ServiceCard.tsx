"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Gauge, ArrowRight } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { ServiceData } from '@/data/mockServices';

interface ServiceCardProps {
  service: ServiceData;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBookNow = () => {
    // Update URL with service ID and scroll to booking section
    // Skill: api-patterns (URL State Management)
    router.push(`${pathname}?service=${service.id}#booking`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative h-full overflow-hidden rounded-[32px] glass-dark border border-white/5 hover:border-brand-primary/30 transition-all duration-500"
    >
      {/* Target Image with Gradient Overlay */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-secondary-950/20 to-transparent" />
        
        {/* Category/Price Tag */}
        <div className="absolute top-6 right-6">
          <div className="px-4 py-2 rounded-full glass-dark border border-white/10 backdrop-blur-md">
            <span className="text-brand-primary font-bold text-sm tracking-widest">${service.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col h-[calc(100%-16rem)]">
        <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-[3px] text-brand-secondary uppercase">
          <MapPin size={14} />
          {service.location}
        </div>

        <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-brand-primary transition-colors">
          {service.title}
        </h3>

        <div className="text-white/50 text-sm mb-8 line-clamp-2 leading-relaxed">
          {typeof service.description === 'string' ? service.description : "Experience the elite traditions of equestrian arts."}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Clock size={14} className="text-brand-primary/60" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Gauge size={14} className="text-brand-primary/60" />
            <span>{service.level}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-secondary-900 overflow-hidden relative">
              <Image 
                src={service.expert.image} 
                alt={service.expert.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="ps-4 text-[10px] text-white/40 self-center uppercase tracking-widest">
              With {service.expert.name.split(' ')[0]}
            </span>
          </div>
          
          <button 
            onClick={handleBookNow}
            className="p-3 rounded-full bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
            aria-label={`Book ${service.title}`}
            title={`Book ${service.title}`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-tl-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
