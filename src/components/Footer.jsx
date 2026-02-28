import React from 'react';
import { useSolar } from '../context/SolarContext';

export default function Footer() {
  const { solarState } = useSolar();

  return (
    <footer 
      className="backdrop-blur-md py-20 relative z-20 text-center border-t transition-colors duration-1000" 
      style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.1)', 
        borderColor: 'var(--color-nav-border)', 
        color: 'var(--color-text-primary)' 
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-4xl font-black text-yellow-500 mb-6 block">DreamNest Solutions</span>
        <p className="max-w-md mx-auto text-sm opacity-60 mb-10">
          Empowering rooftops with intelligent, time-synced solar technology. 
          Leading the transition to sustainable energy across India.
        </p>
        <div className="pt-12 border-t border-slate-400/20 text-xs font-black uppercase tracking-[0.3em] opacity-50">
          © {new Date().getFullYear()} DreamNest • Synced with your time
        </div>
      </div>
    </footer>
  );
}