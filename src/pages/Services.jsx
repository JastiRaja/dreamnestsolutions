import React from 'react';
import { ShoppingCart, Wrench, MessageCircle, Home as HomeIcon, ChevronRight } from 'lucide-react';
import { GlassCard } from '../components/ui/Card';

const SERVICES = [
  { title: "Solar Logistics", icon: <ShoppingCart />, color: "bg-yellow-100 text-yellow-600", desc: "Premium MNRE-approved panels delivered across India." },
  { title: "Expert Maintenance", icon: <Wrench />, color: "bg-blue-100 text-blue-600", desc: "Annual panel cleaning and inverter health checks." },
  { title: "Solar Consultation", icon: <MessageCircle />, color: "bg-green-100 text-green-600", desc: "State-specific sizing and net-metering legal guidance." },
  { title: "Free Home Visits", icon: <HomeIcon />, color: "bg-yellow-500 text-white", highlight: true, desc: "Physical audit of your roof's shadow-free area." }
];

export default function Services() {
  return (
    <section className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICES.map((s, i) => (
            <GlassCard key={i} className={`p-10 flex flex-col md:flex-row gap-8 items-start ${s.highlight ? 'border-yellow-500/40' : ''}`}>
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl shadow-lg ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <h4 className="text-2xl font-black mb-4 text-[var(--color-text-primary)]">{s.title}</h4>
                {s.highlight && <p className="text-xs font-black text-yellow-600 uppercase mb-3 tracking-widest">Complimentary Audit</p>}
                <p className="opacity-70 text-[var(--color-text-secondary)]">{s.desc}</p>
                <button className="mt-6 text-sm font-black text-yellow-500 flex items-center gap-2 hover:gap-3 transition-all">Learn More <ChevronRight className="w-4 h-4" /></button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}