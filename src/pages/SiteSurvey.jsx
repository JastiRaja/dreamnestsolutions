import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Clock, Home, Zap, 
  ShieldCheck, ArrowRight, CheckCircle2, ChevronDown, Check 
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

const CustomSelect = ({ label, options, value, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2 block ml-1 drop-shadow-sm">
        {label}
      </label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full cursor-pointer rounded-2xl py-4 pl-12 pr-6 transition-all duration-300 flex items-center justify-between border-2 
          ${isOpen 
            ? 'border-yellow-500 bg-slate-800 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
            : 'border-slate-700 bg-slate-900/80 hover:border-slate-500 hover:bg-slate-800'
          }`}
      >
        <Icon className="absolute left-4 w-5 h-5 text-yellow-500" />
        <span className={`text-sm font-bold ${value.includes("Select") ? 'text-slate-500' : 'text-slate-100'}`}>
          {value}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-yellow-500" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.ul
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 5 }}
              exit={{ opacity: 0, y: -5 }}
              /* Lighter background for the dropdown to create separation */
              className="absolute z-[100] left-0 right-0 top-full bg-slate-800 border-2 border-slate-600 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              {options.map((opt) => (
                <li
                  key={opt}
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className="px-6 py-4 text-sm font-bold text-slate-200 flex items-center justify-between cursor-pointer hover:bg-yellow-500 hover:text-black transition-all border-b border-slate-700/50 last:border-0"
                >
                  {opt}
                  {value === opt && <Check className="w-4 h-4" />}
                </li>
              ))}
            </motion.ul>
            <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SiteSurvey() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: "Select Property Type",
    bill: "",
    address: "",
    date: "",
    slot: "Select Time Slot"
  });

  const inputStyle = `w-full bg-slate-900/80 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-100 placeholder:text-slate-600 focus:border-yellow-500 focus:bg-slate-800 outline-none transition-all duration-300 hover:border-slate-500`;

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#0a0f1a]">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-md w-full p-10 rounded-[3rem] border-2 border-yellow-500/30 text-center bg-slate-900 shadow-2xl">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-2 text-white uppercase tracking-tighter">Request Logged</h2>
            <p className="text-slate-400 mb-8 text-sm">We've scheduled your LIDAR scan. Expect a call shortly.</p>
            <button onClick={() => window.location.href = '/'} className="w-full py-4 bg-yellow-500 text-black font-black rounded-xl uppercase tracking-widest text-xs hover:bg-yellow-400 transition-colors">Return Home</button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="pt-40 pb-32 bg-[#0a0f1a] min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 tracking-tighter text-white uppercase">
              Site <span className="text-yellow-500">Audit Request</span>
            </h2>
            <div className="flex justify-center gap-2">
              <div className={`h-1.5 w-16 rounded-full ${step >= 1 ? 'bg-yellow-500' : 'bg-slate-800'}`} />
              <div className={`h-1.5 w-16 rounded-full ${step >= 2 ? 'bg-yellow-500' : 'bg-slate-800'}`} />
            </div>
          </div>

          {/* Form Container with High Contrast Depth */}
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} 
            className="bg-slate-900 border border-slate-700 p-8 md:p-12 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                  <CustomSelect 
                    label="Property Type"
                    options={["Residential Villa", "Apartment", "Commercial", "Industrial"]}
                    value={formData.propertyType}
                    onChange={(val) => setFormData({...formData, propertyType: val})}
                    icon={Home}
                  />

                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2 block ml-1">Monthly Electricity Bill</label>
                    <div className="relative">
                      <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
                      <input type="number" required placeholder="Amount in ₹" className={inputStyle} value={formData.bill} onChange={(e) => setFormData({...formData, bill: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2 block ml-1">Full Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-5 w-5 h-5 text-yellow-500" />
                      <textarea required rows="3" placeholder="Enter complete site address" className={`${inputStyle} pl-12 pt-4 resize-none`} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                    </div>
                  </div>

                  <button type="button" onClick={() => setStep(2)} className="w-full py-5 bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-yellow-500/10">
                    Next Step
                  </button>
                </motion.div>
              ) : (
                <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2 block ml-1">Select Date</label>
                      <input type="date" required className={inputStyle} value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    </div>
                    <CustomSelect 
                      label="Preferred Slot"
                      options={["Morning (10AM - 1PM)", "Afternoon (2PM - 6PM)"]}
                      value={formData.slot}
                      onChange={(val) => setFormData({...formData, slot: val})}
                      icon={Clock}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="px-8 py-5 rounded-2xl border-2 border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-colors">Back</button>
                    <button type="submit" className="flex-1 py-5 bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-yellow-500/10 hover:bg-yellow-400 transition-colors">Confirm Audit</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}