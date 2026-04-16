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
    router.push(`${pathname}?service=${service.id}#booking`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full overflow-hidden rounded-sovereign glass-sovereign border border-brand-primary/5 hover-sovereign bg-surface-base"
    >
      {/* Target Image with Gradient Overlay */}
      <div className="relative h-[280px] w-full overflow-hidden cinema-lut">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        
        {/* Category/Price Tag */}
        <div className="absolute top-8 right-8">
          <div className="px-6 py-3 rounded-sovereign glass-sovereign border border-white/10 shadow-xl">
            <span className="text-brand-primary font-black text-base tracking-[0.1em] font-numbers">${service.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-10 flex flex-col h-[calc(100%-280px)]">
        <div className="flex items-center gap-3 mb-6 text-[10px] font-numbers font-black tracking-[0.4em] text-brand-primary uppercase">
          <MapPin size={16} className="text-brand-primary/60" strokeWidth={1.5} />
          {service.location}
        </div>

        <h3 className="text-3xl font-title font-bold text-white mb-6 group-hover:text-brand-primary transition-colors duration-500 uppercase tracking-tight">
          {service.title}
        </h3>

        <div className="text-foreground/50 text-base mb-10 line-clamp-3 leading-relaxed font-body">
          {typeof service.description === 'string' ? service.description : "Experience the elite traditions of equestrian arts."}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="flex items-center gap-3 text-foreground/40 text-[10px] font-numbers font-black uppercase tracking-[0.2em]">
            <Clock size={16} className="text-brand-primary/40" strokeWidth={1.5} />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-3 text-foreground/40 text-[10px] font-numbers font-black uppercase tracking-[0.2em]">
            <Gauge size={16} className="text-brand-primary/40" strokeWidth={1.5} />
            <span>{service.level}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-brand-primary/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sovereign border border-brand-primary/10 overflow-hidden relative shadow-lg">
              <Image 
                src={service.expert.image} 
                alt={service.expert.name}
                fill
                className="object-cover cinema-lut"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-foreground/20 uppercase tracking-[0.3em] font-numbers font-black mb-0.5">MAESTRO</span>
              <span className="text-[11px] text-foreground/60 font-body font-bold uppercase tracking-wider">
                {service.expert.name}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleBookNow}
            className="w-14 h-14 rounded-sovereign glass-sovereign border border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-lg group-hover:scale-105 active:scale-90 flex items-center justify-center overflow-hidden"
            aria-label={`Book ${service.title}`}
          >
            <ArrowRight size={24} strokeWidth={1.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Sovereign Corner */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-brand-primary/[0.03] rounded-tl-sovereign border-t border-l border-brand-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
    </motion.div>
  );
}
