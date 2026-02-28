import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Wrench, MessageSquare, Home, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

const SERVICE_DETAILS = [
  {
    id: 'logistics',
    title: "Solar Logistics",
    desc: "Premium MNRE-approved panels delivered across India.",
    icon: <Truck className="w-6 h-6 text-yellow-600" />,
    color: "bg-yellow-100",
    details: [
      "Real-time GPS tracking for panel transit",
      "Insurance coverage against transit damage",
      "Tier-1 MNRE certified inventory only",
      "Pan-India distribution network"
    ]
  },
  {
    id: 'maintenance',
    title: "Expert Maintenance",
    desc: "Annual panel cleaning and inverter health checks.",
    icon: <Wrench className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-100",
    details: [
      "Bi-annual chemical-free cleaning",
      "DC/AC wiring thermal inspection",
      "Inverter firmware updates",
      "Performance optimization reports"
    ]
  },
  {
    id: 'consultation',
    title: "Solar Consultation",
    desc: "State-specific sizing and net-metering legal guidance.",
    icon: <MessageSquare className="w-6 h-6 text-green-600" />,
    color: "bg-green-100",
    details: [
      "Customized shadow analysis reports",
      "ROI and payback period calculations",
      "Net-metering application assistance",
      "Subsidy eligibility checking"
    ]
  },
  {
    id: 'visits',
    title: "Free Home Visits",
    desc: "Physical audit of your roof's shadow-free area.",
    icon: <Home className="w-6 h-6 text-orange-600" />,
    color: "bg-orange-100",
    details: [
      "Professional LIDAR roof measurement",
      "Structure load-bearing assessment",
      "Electrical earthing verification",
      "On-spot technical feasibility study"
    ]
  }
];

export default function Services() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <PageTransition>
      <section className="pt-40 pb-32 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-16">
            <h2 className="text-5xl font-black mb-4 tracking-tighter" style={{ color: 'var(--color-text-primary)' }}>
              Operational <span className="text-yellow-500">Excellence.</span>
            </h2>
            <p className="text-xl opacity-60 max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
              We don't just sell panels; we manage the entire lifecycle of your solar transition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICE_DETAILS.map((service) => (
              <motion.div 
                key={service.id}
                layout
                className={`p-10 rounded-[3rem] border backdrop-blur-xl transition-all duration-500 overflow-hidden relative ${
                  expandedId === service.id ? 'ring-2 ring-yellow-500/50' : ''
                }`}
                style={{ 
                  backgroundColor: 'var(--color-glass-bg)', 
                  borderColor: 'var(--color-nav-border)' 
                }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className={`p-5 rounded-2xl ${service.color}`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                        {service.title}
                      </h3>
                      <p className="opacity-60 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {service.desc}
                      </p>
                    </div>
                  </div>
                  
                  {expandedId === service.id && (
                    <button onClick={() => setExpandedId(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <X className="w-5 h-5 opacity-40" />
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {expandedId === service.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t border-white/5"
                    >
                      <p className="text-xs font-black uppercase text-yellow-500 tracking-widest mb-4">Service Scope</p>
                      <div className="grid gap-3">
                        {service.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium opacity-80" style={{ color: 'var(--color-text-primary)' }}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-8 w-full py-4 rounded-2xl bg-yellow-500 text-white font-black uppercase tracking-widest text-xs hover:bg-yellow-600 transition-colors">
                        Request This Service
                      </button>
                    </motion.div>
                  ) : (
                    <button 
                      onClick={() => setExpandedId(service.id)}
                      className="flex items-center gap-2 text-yellow-500 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}