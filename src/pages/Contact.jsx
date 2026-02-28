import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GlassCard } from '../components/ui/Card';
import { useSolar } from '../context/SolarContext';

export default function Contact() {
  const { solarState } = useSolar();

  return (
    <section className="pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 text-[var(--color-text-primary)]"
              style={{ textShadow: `${solarState.textShadowX} ${solarState.textShadowY} ${solarState.textShadowBlur} ${solarState.textShadowColor}` }}>
            Let’s Power Your Future
          </h2>
          <p className="text-xl opacity-60 text-[var(--color-text-secondary)]">Request a technical site audit or speak with our experts.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <GlassCard className="p-8">
              <div className="flex items-center gap-6">
                <div className="bg-yellow-500/10 p-4 rounded-2xl text-yellow-600"><Phone /></div>
                <div>
                  <p className="text-xs font-black uppercase opacity-40 text-[var(--color-text-primary)]">Call Us</p>
                  <p className="font-bold text-[var(--color-text-primary)]">+91 90008 28333</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="flex items-center gap-6">
                <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-600"><Mail /></div>
                <div>
                  <p className="text-xs font-black uppercase opacity-40 text-[var(--color-text-primary)]">Email</p>
                  <p className="font-bold text-[var(--color-text-primary)]">hello@dreamnest.in</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="flex items-center gap-6">
                <div className="bg-green-500/10 p-4 rounded-2xl text-green-600"><MapPin /></div>
                <div>
                  <p className="text-xs font-black uppercase opacity-40 text-[var(--color-text-primary)]">HQ</p>
                  <p className="font-bold text-[var(--color-text-primary)]">Madhapur, Hyderabad</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Contact Form */}
          <GlassCard className="lg:col-span-2 p-10 md:p-14">
            <form className="grid md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-2">Your Name</label>
                <input type="text" className="auth-input" placeholder="e.g. Anjali Rao" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-2">Phone Number</label>
                <input type="tel" className="auth-input" placeholder="+91" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-60 ml-2">Installation Address</label>
                <textarea className="auth-input min-h-[150px] pt-5" placeholder="Where would you like the solar panels installed?"></textarea>
              </div>
              <button className="md:col-span-2 bg-yellow-500 text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-yellow-600 transition-all flex items-center justify-center gap-4 group">
                Send Inquiry <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}