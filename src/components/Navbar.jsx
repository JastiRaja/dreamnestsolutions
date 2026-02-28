import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sun, Menu, Clock, FlaskConical } from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export default function Navbar() {
  const { isLiveSync, formattedTime } = useSolar();

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl border-b transition-all duration-1000 bg-[var(--color-glass-bg)] border-[var(--color-nav-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between h-20 items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
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
          
          {/* Solar Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest text-[var(--color-text-secondary)] bg-slate-400/10">
            {isLiveSync ? <Clock className="w-3 h-3 text-yellow-500" /> : <FlaskConical className="w-3 h-3 text-yellow-500" />}
            {isLiveSync ? `Live: ${formattedTime}` : `Sim: ${formattedTime}`}
          </div>
          
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
          <div 
            className="absolute w-[200vw] h-[200vh] top-[-20%] right-[-20%] blur-[80px] mix-blend-overlay transition-all duration-[1500ms]"
            style={{
              background: `conic-gradient(from 215deg at var(--sun-x) var(--sun-y), transparent 0%, var(--sun-color) 5%, transparent 15%, rgba(255,255,255,0.2) 25%, var(--sun-color) 40%, transparent 60%)`,
              transformOrigin: 'var(--sun-x) var(--sun-y)'
            }}
          />
          </div>

          <Link to="/login" className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-primary)] hover:text-yellow-500 transition-colors">Login</Link>
          <Link to="/signup" className="bg-yellow-500 text-white px-6 py-2.5 rounded-xl font-black shadow-lg hover:shadow-yellow-200 transition-all active:scale-95 text-xs uppercase">Sign Up</Link>
        </div>

        <div className="md:hidden text-[var(--color-text-primary)]">
          <Menu className="w-6 h-6" />
        </div>
      </div>
    </nav>
  );
}