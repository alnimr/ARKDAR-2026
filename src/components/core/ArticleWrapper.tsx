'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ArticleWrapperProps {
  children: React.ReactNode;
}

const ArticleWrapper: React.FC<ArticleWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-[720px] mx-auto px-6 md:px-0 font-body leading-[1.8] text-foreground/80 selection:bg-brand-primary/30"
    >
      <div className="article-content-flow space-y-10">
        {children}
      </div>
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ArticleWrapper;
