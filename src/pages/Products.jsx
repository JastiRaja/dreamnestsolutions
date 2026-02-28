import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/ui/Card';
import { useSolar } from '../context/SolarContext';
import { useNavigate } from 'react-router-dom';

const PRODUCT_DATA = [
  { 
    id: "alpha-450", // Added ID
    name: "Alpha 450W Mono", 
    desc: "High density monocrystalline panel with 21.3% efficiency.", 
    img: "https://static.ruralsunpower.com/wp-content/uploads/2025/10/rec-alpha-pure-rx-450w-solar-panel-bangladesh.jpg.webp", 
    best: true, 
    specs: ["PID Resistance", "Low Light Performance", "10-Year Warranty"] 
  },
  { 
    id: "titan-540", // Added ID
    name: "Titan 540W Bifacial", 
    desc: "Double-sided generation for ground mount & flat roofs.", 
    img: "https://lntsufin.com/storage/mediafiles/catalog/live/17126-1896/original/17126-1896_image_0.jpg", 
    best: false, 
    specs: ["30% Extra Yield", "Dual Glass Protection", "30-Year Performance"] 
  },
  { 
    id: "edge-400", // Added ID
    name: "Edge 400W All-Black", 
    desc: "Aesthetic design for luxury homes and vertical installs.", 
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80", 
    best: false, 
    specs: ["Stealth Appearance", "Integrated Micro-Inverter", "Smart Monitoring"] 
  }
];

export default function Products() {
  const { solarState } = useSolar();
  const navigate = useNavigate();

  return (
    <section className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 text-[var(--color-text-primary)]">
            Our Solar Range
          </h2>
          <p className="text-xl opacity-60 text-[var(--color-text-secondary)]">Modules designed for Indian weather.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCT_DATA.map((p, i) => (
            <GlassCard key={i} className="p-8 group hover:-translate-y-2">
              <div className="h-64 rounded-2xl mb-6 bg-slate-200 overflow-hidden relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                {p.best && <span className="absolute top-4 right-4 bg-yellow-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Bestseller</span>}
              </div>
              <h4 className="text-2xl font-black mb-2 text-[var(--color-text-primary)]">{p.name}</h4>
              <p className="text-sm mb-6 opacity-60 text-[var(--color-text-secondary)]">{p.desc}</p>
              <ul className="space-y-3 mb-8 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {p.specs.map((spec, si) => (
                  <li key={si} className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-yellow-500" /> {spec}</li>
                ))}
              </ul>
              {/* FIXED: Changed product.id to p.id to match the map variable */}
              <button 
                onClick={() => navigate(`/products/${p.id}`)} 
                className="w-full bg-yellow-500 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-yellow-600 transition-all"
              >
                View Specs
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}