import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { GlassCard } from '../components/ui/Card';
import { useSolar } from '../context/SolarContext';

export default function About() {
  const { solarState } = useSolar();
  const stats = [
    { label: "Energy Generated", val: "15GW+", color: "text-yellow-600" },
    { label: "Customer Rating", val: "4.9/5", color: "text-blue-600" },
    { label: "States Covered", val: "14+", color: "text-green-600" },
    { label: "CO2 Offset", val: "200T", color: "text-emerald-600" }
  ];

  return (
    <section className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="space-y-10">
            <h2 className="text-6xl font-black text-[var(--color-text-primary)]"
                style={{ textShadow: `${solarState.textShadowX} ${solarState.textShadowY} ${solarState.textShadowBlur} ${solarState.textShadowColor}` }}>
              Our Legacy
            </h2>
            <p className="text-xl leading-relaxed opacity-80 text-[var(--color-text-secondary)]">
              Founded in Bengaluru, DreamNest integrates IoT-based monitoring with Tier-1 hardware to make every Indian household energy-independent.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-slate-500/5 p-6 rounded-3xl border border-white/10">
                  <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1 text-[var(--color-text-primary)]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <GlassCard className="p-6">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Solar Team" className="rounded-[3rem] w-full h-[500px] object-cover" />
          </GlassCard>
        </div>

        <h2 className="text-4xl font-black text-center mb-20 text-[var(--color-text-primary)]">Voices of Trust</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { n: "Rajesh K.", l: "Mumbai", t: "My bill dropped from ₹7,000 to ₹400 in the first month!" },
            { n: "Priya M.", l: "Bengaluru", t: "DreamNest handled all the subsidy paperwork effortlessly." }
          ].map((r, i) => (
            <GlassCard key={i} className="p-12 italic relative group">
              <div className="absolute -top-4 -left-4 bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center text-white"><Star className="w-5 h-5 fill-white" /></div>
              <p className="opacity-70 text-lg leading-relaxed text-[var(--color-text-secondary)]">"{r.t}"</p>
              <p className="mt-8 not-italic font-black flex items-center gap-2 text-[var(--color-text-primary)] group-hover:text-yellow-500 transition-colors">
                <MapPin className="w-4 h-4" /> {r.n}, {r.l}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}