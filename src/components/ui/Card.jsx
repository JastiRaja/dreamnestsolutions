import React from 'react';

export const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div 
      className={`backdrop-blur-md rounded-[2.5rem] border border-white/20 transition-all ${className}`}
      style={{ 
        backgroundColor: 'var(--color-glass-bg)', 
        boxShadow: 'var(--shadow-offset-x) var(--shadow-offset-y) var(--shadow-blur) var(--shadow-opacity)',
        ...style 
      }}
    >
      {children}
    </div>
  );
};