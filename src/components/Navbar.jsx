import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Menu, Clock, FlaskConical, X } from 'lucide-react';
import { useSolar } from '../context/SolarContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { isLiveSync, formattedTime } = useSolar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'About', path: '/about' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl border-b transition-all duration-1000 bg-[var(--color-glass-bg)] border-[var(--color-nav-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between h-20 items-center">
        
        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group relative z-[60]">
          <div className="bg-yellow-500 p-2 rounded-xl shadow-lg transition-transform group-hover:rotate-12">
            <Sun className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-[var(--color-text-primary)]">
            DreamNest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `text-xs uppercase tracking-widest font-bold transition-all py-2 border-b-2 ${
                  isActive ? 'text-yellow-500 border-yellow-500' : 'border-transparent text-[var(--color-text-secondary)]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <div className="h-6 w-px bg-slate-400/20 mx-2" />
          
          <div className="hidden xl:flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest text-[var(--color-text-secondary)] bg-slate-400/10">
            {isLiveSync ? <Clock className="w-3 h-3 text-yellow-500" /> : <FlaskConical className="w-3 h-3 text-yellow-500" />}
            {isLiveSync ? `Live: ${formattedTime}` : `Sim: ${formattedTime}`}
          </div>

          <Link to="/login" className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-primary)] hover:text-yellow-500 transition-colors">Login</Link>
          <Link to="/signup" className="bg-yellow-500 text-white px-6 py-2.5 rounded-xl font-black shadow-lg hover:shadow-yellow-200 transition-all active:scale-95 text-xs uppercase">Sign Up</Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden relative z-[60]">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--color-text-primary)]"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[var(--color-glass-bg)] border-b border-[var(--color-nav-border)]"
          >
            <div className="px-8 pb-12 pt-4 flex flex-col gap-6">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `text-2xl font-black tracking-tighter transition-all ${
                      isActive ? 'text-yellow-500' : 'text-[var(--color-text-primary)]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              <div className="h-px w-full bg-slate-400/10 my-2" />
              
              <div className="flex flex-col gap-4">
                <Link 
                  to="/login" 
                  onClick={closeMenu}
                  className="w-full text-center py-4 rounded-2xl border border-[var(--color-nav-border)] font-bold text-[var(--color-text-primary)]"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={closeMenu}
                  className="w-full text-center py-4 rounded-2xl bg-yellow-500 text-white font-black"
                >
                  Sign Up
                </Link>
              </div>

              {/* Status in Mobile Menu */}
              <div className="flex justify-center items-center gap-2 text-[10px] font-bold opacity-50 uppercase tracking-[0.2em] text-[var(--color-text-secondary)] mt-4">
                {isLiveSync ? <Clock className="w-3 h-3" /> : <FlaskConical className="w-3 h-3" />}
                {isLiveSync ? `Live Sync: ${formattedTime}` : `Simulation: ${formattedTime}`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Sun Glow (Kept from your original) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
        <div 
          className="absolute w-[200vw] h-[200vh] top-[-20%] right-[-20%] blur-[80px] mix-blend-overlay transition-all duration-[1500ms]"
          style={{
            background: `conic-gradient(from 215deg at var(--sun-x) var(--sun-y), transparent 0%, var(--sun-color) 5%, transparent 15%, rgba(255,255,255,0.2) 25%, var(--sun-color) 40%, transparent 60%)`,
            transformOrigin: 'var(--sun-x) var(--sun-y)'
          }}
        />
      </div>
    </nav>
  );
}