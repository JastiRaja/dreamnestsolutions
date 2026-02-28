import React from 'react';
import { MapPin, Zap, Leaf, Globe, Layers, ArrowRight } from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export default function Home() {
  const { location, solarState } = useSolar();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      
      {/* 1. Hero Section */}
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
          <MapPin className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-black text-yellow-600 uppercase tracking-widest">{location} • Live Solar Index</span>
        </div>
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
            style={{ color: 'var(--color-text-primary)' }}>
          THE FUTURE <br/> IS <span className="text-yellow-500">BRIGHT.</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* 2. Interactive Rooftop Visualizer (Left - 7 cols) */}
        <div className="lg:col-span-7 relative group rounded-[4rem] overflow-hidden border border-white/10 h-[500px] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.4] group-hover:scale-105 transition-transform duration-[5s]" 
            alt="Satellite"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="glass p-4 rounded-2xl border border-white/20 backdrop-blur-md">
                <p className="text-[10px] font-black text-yellow-500 uppercase">AI Roof Scan</p>
                <h4 className="text-white font-bold">Optimal Pitch Detected</h4>
              </div>
              <button className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-yellow-500 transition-all">
                <Layers className="text-white w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center gap-8">
              <div>
                <p className="text-white/40 text-xs font-bold uppercase mb-1">Solar Exposure</p>
                <p className="text-4xl font-black text-white">94%</p>
              </div>
              <div className="h-12 w-[1px] bg-white/20" />
              <div>
                <p className="text-white/40 text-xs font-bold uppercase mb-1">Obstruction Risk</p>
                <p className="text-4xl font-black text-white">Low</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Suitability Score (Right - 5 cols) */}
        <div className="lg:col-span-5 p-12 rounded-[4rem] border flex flex-col justify-center items-center text-center transition-all duration-1000"
             style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}>
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="transparent" />
              <circle cx="96" cy="96" r="80" stroke="var(--sun-color)" strokeWidth="16" fill="transparent"
                      strokeDasharray={502} strokeDashoffset={502 - (502 * 88) / 100} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black" style={{ color: 'var(--color-text-primary)' }}>88%</span>
            </div>
          </div>
          <h3 className="text-2xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>Tier-1 Efficiency</h3>
          <p className="text-sm opacity-60 mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Your location is in the top 5% of solar-ready homes in {location.split(',')[0]}.
          </p>
          <button className="w-full py-5 rounded-3xl bg-yellow-500 text-white font-black uppercase tracking-widest hover:shadow-yellow-500/20 shadow-2xl transition-all flex items-center justify-center gap-2 group">
            Get Full Audit <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 4. Community Impact Ticker */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "CO2 Offset", val: "14,200 Tons", icon: Leaf, color: "text-green-500" },
          { label: "Live Grid Load", val: "-842 MW", icon: Zap, color: "text-yellow-500" },
          { label: "Global Presence", val: "12 Countries", icon: Globe, color: "text-blue-500" }
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-[3rem] border backdrop-blur-xl flex items-center gap-6"
               style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}>
            <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{stat.val}</h4>
              <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}