import React from 'react';
import { useSolar } from '../context/SolarContext';

export default function Atmosphere() {
  const { solarState } = useSolar();

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      <div 
        className="absolute w-[200vw] h-[200vh] top-[-20%] right-[-20%] blur-[80px] mix-blend-overlay transition-all duration-[1500ms]"
        style={{
          background: `conic-gradient(from 215deg at ${solarState.sunX} ${solarState.sunY}, transparent 0%, ${solarState.sunColor} 5%, transparent 15%, rgba(255,255,255,0.2) 25%, ${solarState.sunColor} 40%, transparent 60%)`,
          transformOrigin: `${solarState.sunX} ${solarState.sunY}`
        }}
      />
    </div>
  );
}