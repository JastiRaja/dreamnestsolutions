import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-yellow-500/30">
      {/* Exact Background Atmosphere Layer from your original code */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
        <div 
          className="absolute w-[200vw] h-[200vh] top-[-20%] right-[-20%] blur-[80px] mix-blend-overlay transition-all duration-[1500ms]"
          style={{
            background: `conic-gradient(from 215deg at var(--sun-x) var(--sun-y), transparent 0%, var(--sun-color) 5%, transparent 15%, rgba(255,255,255,0.2) 25%, var(--sun-color) 40%, transparent 60%)`,
            transformOrigin: 'var(--sun-x) var(--sun-y)'
          }}
        />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}