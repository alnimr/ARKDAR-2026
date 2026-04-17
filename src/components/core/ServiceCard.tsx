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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden layer-1 border border-quiet hover:border-gold transition-all duration-cine depth-card font-brand selection:bg-gold selection:text-black"
    >
      {/* Target Image with Sovereign Overlay */}
      <div className="relative h-[320px] w-full overflow-hidden cinema-lut">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
        
        {/* Category/Price Tag */}
        <div className="absolute top-10 right-10">
          <div className="px-8 py-4 layer-3 border border-quiet bg-black/80">
            <span className="text-gold font-bold text-[13px] tracking-[0.4em] font-brand uppercase">${service.price}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-12 flex flex-col h-[calc(100%-320px)]">
        <div className="flex items-center gap-4 mb-8 text-[10px] font-brand font-bold tracking-[0.5em] text-gold/60 uppercase">
          <MapPin size={16} className="text-gold/60" strokeWidth={1} />
          {service.location}
        </div>

        <h3 className="text-3xl md:text-4xl font-brand font-bold text-white mb-8 group-hover:text-gold transition-all duration-cine uppercase tracking-tighter leading-[0.9]">
          {service.title}
        </h3>

        <div className="text-ghost/60 text-lg mb-12 line-clamp-3 leading-relaxed font-brand font-light italic opacity-80">
          {typeof service.description === 'string' ? service.description : "Experience the elite traditions of equestrian arts."}
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="flex items-center gap-4 text-ghost/40 text-[10px] font-brand font-bold uppercase tracking-[0.4em]">
            <Clock size={16} className="text-gold/40" strokeWidth={1} />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-4 text-ghost/40 text-[10px] font-brand font-bold uppercase tracking-[0.4em]">
            <Gauge size={16} className="text-gold/40" strokeWidth={1} />
            <span>{service.level}</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex items-center justify-between mt-auto pt-10 border-t border-quiet">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 border border-quiet overflow-hidden relative layer-2 group-hover:border-gold transition-all duration-cine">
              <Image 
                src={service.expert.image} 
                alt={service.expert.name}
                fill
                className="object-cover cinema-lut grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2000ms]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gold/40 uppercase tracking-[0.4em] font-brand font-bold mb-1">MAESTRO</span>
              <span className="text-[12px] text-white font-brand font-bold uppercase tracking-[0.3em]">
                {service.expert.name}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleBookNow}
            className="w-16 h-16 layer-2 border border-quiet text-gold hover:bg-gold hover:text-black transition-all duration-cine flex items-center justify-center"
            aria-label={`Book ${service.title}`}
          >
            <ArrowRight size={24} strokeWidth={1} className="group-hover:translate-x-2 transition-transform duration-cine" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
