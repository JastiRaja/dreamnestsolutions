import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ShieldCheck, Sun, CheckCircle } from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export default function SiteSurvey() {
  const { solarState, location } = useSolar();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ date: '', time: '10:00', address: '' });

  const isDaylight = (time) => {
    const hour = parseInt(time.split(':')[0]);
    return hour >= 9 && hour <= 17;
  };

  return (
    <section className="pt-40 pb-32 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full px-6">
        
        {/* Progress Header */}
        <div className="flex justify-between mb-12 max-w-xs mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 w-20 rounded-full transition-all duration-500 ${step >= i ? 'bg-yellow-500' : 'bg-white/10'}`} />
          ))}
        </div>

        <div 
          className="p-10 md:p-16 rounded-[4rem] border backdrop-blur-2xl transition-all duration-1000"
          style={{ 
            backgroundColor: 'var(--color-glass-bg)', 
            borderColor: 'var(--color-nav-border)',
            boxShadow: 'var(--shadow-offset-x) var(--shadow-offset-y) var(--shadow-blur) var(--shadow-opacity)'
          }}
        >
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center">
                <h2 className="text-4xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>Pick a Sunlight Window</h2>
                <p className="opacity-60" style={{ color: 'var(--color-text-secondary)' }}>Surveys require clear daylight for precise LIDAR scanning.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-40 ml-4" style={{ color: 'var(--color-text-primary)' }}>Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-5 w-5 h-5 text-yellow-500" />
                    <input 
                      type="date" 
                      className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-3xl outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                      style={{ color: 'var(--color-text-primary)' }}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-40 ml-4" style={{ color: 'var(--color-text-primary)' }}>Select Time</label>
                  <div className="relative">
                    <Clock className="absolute left-5 top-5 w-5 h-5 text-yellow-500" />
                    <select 
                      className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-3xl outline-none focus:ring-2 focus:ring-yellow-500 transition-all appearance-none"
                      style={{ color: 'var(--color-text-primary)' }}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    >
                      {["09:00", "10:00", "11:00", "13:00", "15:00", "17:00", "19:00"].map(t => (
                        <option key={t} value={t} className="bg-slate-900">{t} {parseInt(t) > 17 ? ' (Low Sun)' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {!isDaylight(formData.time) && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold">
                  <Sun className="w-5 h-5" /> Warning: Limited accuracy after sunset.
                </div>
              )}

              <button onClick={() => setStep(2)} className="w-full py-6 rounded-3xl bg-yellow-500 text-white font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                Next: Location Details
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="text-center">
                <h2 className="text-4xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>Installation Site</h2>
                <p className="opacity-60" style={{ color: 'var(--color-text-secondary)' }}>Currently detecting coverage for <span className="text-yellow-500 font-bold">{location}</span></p>
              </div>

              <div className="relative">
                <MapPin className="absolute left-5 top-5 w-5 h-5 text-yellow-500" />
                <textarea 
                  placeholder="Enter full site address..."
                  className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-3xl h-32 outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                  style={{ color: 'var(--color-text-primary)' }}
                />
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-6 rounded-3xl bg-white/5 border border-white/10 font-black uppercase tracking-widest" style={{ color: 'var(--color-text-primary)' }}>Back</button>
                <button onClick={() => setStep(3)} className="flex-[2] py-6 rounded-3xl bg-yellow-500 text-white font-black uppercase tracking-widest shadow-2xl">Confirm Booking</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in-95">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-4xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>Survey Confirmed!</h2>
              <p className="opacity-60 mb-10" style={{ color: 'var(--color-text-secondary)' }}>Our engineer will arrive on {formData.date || 'your selected date'} at {formData.time}.</p>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                <ShieldCheck className="text-yellow-500 w-5 h-5" /> Licensed Solar Professional Assigned
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}