'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ArticleReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gold z-[100] origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}
