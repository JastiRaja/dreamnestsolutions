import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function SolarProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Adding a spring to make the bar feel "liquid" and premium
  const scaleX = useSpring(scrollYProgress, {
    staggerChildren: 0.1,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left"
      style={{ 
        scaleX,
        background: 'linear-gradient(90deg, #EAB308 0%, #FDE047 50%, #EAB308 100%)',
        boxShadow: '0 0 15px rgba(234, 179, 8, 0.6)'
      }}
    />
  );
}