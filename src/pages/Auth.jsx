import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, HelpCircle } from 'lucide-react'; // Added HelpCircle
import { useSolar } from '../context/SolarContext';

export default function Auth({ type }) {
  const isLogin = type === 'login';
  const { solarState } = useSolar();

  const inputStyle = {
    backgroundColor: 'rgba(100, 116, 139, 0.08)',
    borderColor: 'var(--color-nav-border)',
    color: 'var(--color-text-primary)',
  };

  return (
    <section className="pt-48 pb-32 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-md w-full px-6 relative z-10">
        
        <div 
          className="p-10 md:p-14 rounded-[4rem] border backdrop-blur-2xl transition-all duration-1000"
          style={{ 
            backgroundColor: 'var(--color-glass-bg)', 
            borderColor: 'var(--color-nav-border)',
            boxShadow: 'var(--shadow-offset-x) var(--shadow-offset-y) var(--shadow-blur) var(--shadow-opacity)'
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 transition-colors duration-1000" style={{ color: 'var(--color-text-primary)' }}>
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h2>
            <p className="text-sm opacity-60 transition-colors duration-1000" style={{ color: 'var(--color-text-secondary)' }}>
              {isLogin ? 'Access your real-time solar dashboard.' : 'Start your energy independence journey today.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-5 top-5 w-5 h-5 opacity-40 group-focus-within:text-yellow-500 transition-all" />
                <input type="text" style={inputStyle} className="w-full border p-5 pl-14 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 outline-none transition-all placeholder:opacity-30" placeholder="Full Name" />
              </div>
            )}
            
            <div className="relative group">
              <Mail className="absolute left-5 top-5 w-5 h-5 opacity-40 group-focus-within:text-yellow-500 transition-all" />
              <input type="email" style={inputStyle} className="w-full border p-5 pl-14 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 outline-none transition-all placeholder:opacity-30" placeholder="Email Address" />
            </div>

            <div className="space-y-2">
              <div className="relative group">
                <Lock className="absolute left-5 top-5 w-5 h-5 opacity-40 group-focus-within:text-yellow-500 transition-all" />
                <input type="password" style={inputStyle} className="w-full border p-5 pl-14 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 outline-none transition-all placeholder:opacity-30" placeholder="Password" />
              </div>

              {/* Forgot Password Link - Only visible on Login */}
              {isLogin && (
                <div className="flex justify-end px-2">
                  <Link 
                    to="/forgot-password" 
                    className="text-xs font-bold flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-yellow-500 transition-all"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Forgot Password?
                  </Link>
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-yellow-500 text-white font-black py-5 rounded-3xl shadow-2xl hover:bg-yellow-600 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest flex items-center justify-center gap-3">
              {isLogin ? 'Login Now' : 'Create Profile'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-12 text-center text-sm">
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {isLogin ? "Don't have an account? " : "Already part of the nest? "}
            </span>
            <Link to={isLogin ? '/signup' : '/login'} className="text-yellow-500 font-black hover:underline underline-offset-4 transition-colors">
              {isLogin ? 'Register' : 'Login'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}