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
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group relative h-full overflow-hidden rounded-sovereign glass-sovereign border border-brand-primary/10 hover-sovereign bg-surface"
    >
      {/* Target Image with Gradient Overlay */}
      <div className="relative h-[280px] w-full overflow-hidden cinema-lut safe-zone-right">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category/Price Tag */}
        <div className="absolute top-6 right-6">
          <div className="px-5 py-2 rounded-sovereign glass-sovereign border border-white/10 shadow-xl">
            <span className="text-brand-primary font-black text-sm tracking-[0.1em] font-numbers">${service.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col h-[calc(100%-280px)]">
        <div className="flex items-center gap-3 mb-4 text-[9px] font-numbers font-black tracking-[0.3em] text-brand-primary uppercase">
          <MapPin size={14} className="text-brand-primary" strokeWidth={2} />
          {service.location}
        </div>

        <h3 className="text-2xl font-title font-bold text-white mb-4 group-hover:text-brand-primary transition-colors duration-300 uppercase tracking-tight">
          {service.title}
        </h3>

        <div className="text-foreground/60 text-sm mb-8 line-clamp-3 leading-relaxed font-body">
          {typeof service.description === 'string' ? service.description : "Experience the elite traditions of equestrian arts."}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2.5 text-foreground/40 text-[9px] font-numbers font-black uppercase tracking-[0.1em]">
            <Clock size={14} className="text-brand-primary/60" strokeWidth={2} />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-2.5 text-foreground/40 text-[9px] font-numbers font-black uppercase tracking-[0.1em]">
            <Gauge size={14} className="text-brand-primary/60" strokeWidth={2} />
            <span>{service.level}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sovereign border border-white/10 overflow-hidden relative shadow-lg">
              <Image 
                src={service.expert.image} 
                alt={service.expert.name}
                fill
                className="object-cover cinema-lut"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-brand-primary uppercase tracking-[0.2em] font-numbers font-black mb-0.5">MAESTRO</span>
              <span className="text-[10px] text-foreground/80 font-body font-bold uppercase">
                {service.expert.name}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleBookNow}
            className="w-12 h-12 rounded-sovereign glass-sovereign border border-white/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg group-hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
            aria-label={`Book ${service.title}`}
          >
            <ArrowRight size={20} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Sovereign Corner */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-brand-primary/[0.05] rounded-tl-sovereign border-t border-l border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
