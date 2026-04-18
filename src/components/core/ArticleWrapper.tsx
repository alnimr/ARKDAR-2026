'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ArticleWrapperProps {
  children: React.ReactNode;
}

const ArticleWrapper: React.FC<ArticleWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[800px] mx-auto px-6 md:px-12 lg:px-0 font-brand leading-loose text-ghost selection:bg-gold selection:text-black"
    >
      <div className="article-content-flow space-y-16">
        {children}
      </div>
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ArticleWrapper;
