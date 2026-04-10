"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '@/components/core/ServiceCard';
import { fallbackServices } from '@/data/mockServices';

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {fallbackServices.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <ServiceCard service={service} />
        </motion.div>
      ))}
    </div>
  );
}
