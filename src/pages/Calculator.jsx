import React, { useState } from 'react';
import { Headset, ChevronRight } from 'lucide-react';
import { useSolar } from '../context/SolarContext'; // Importing our Engine
import { useNavigate } from 'react-router-dom';

export default function Calculator() {
  const { solarState } = useSolar();
  const navigate = useNavigate();
  
  // Local state for the bill slider
  const [calcBill, setCalcBill] = useState(3000);

  // Logic from your Core Code
  const kw = Math.ceil(calcBill / 1000);
  const cost = kw * 48000;
  const savings = Math.round(calcBill * 0.95 * 12 * 25 * 1.5);

  return (
    <section className="pt-40 pb-32 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-black mb-4 transition-all duration-1000" 
            style={{ 
              textShadow: 'var(--text-shadow-x) var(--text-shadow-y) var(--text-shadow-blur) var(--text-shadow-color)',
              color: 'var(--color-text-primary)' 
            }}
          >
            Savings Estimator
          </h2>
          <p className="text-xl opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
            Calculate your return on investment in seconds.
          </p>
        </div>
        
        {/* Main Calculator Card */}
        <div 
          className="backdrop-blur-md p-10 md:p-16 rounded-[4rem] border transition-all duration-1000"
          style={{ 
            backgroundColor: 'var(--color-glass-bg)', 
            borderColor: 'var(--color-nav-border)',
            boxShadow: 'var(--shadow-offset-x) var(--shadow-offset-y) var(--shadow-blur) var(--shadow-opacity)' 
          }}
        >
          <div className="space-y-12">
            
            {/* Input Section */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
                <label className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                  Monthly Utility Bill
                </label>
                <span className="bg-slate-900 text-yellow-400 px-6 py-2.5 rounded-2xl text-2xl font-black shadow-xl border border-white/10">
                  ₹{calcBill.toLocaleString('en-IN')}
                </span>
              </div>
              
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="500" 
                value={calcBill} 
                onChange={(e) => setCalcBill(parseInt(e.target.value))}
                className="w-full h-4 bg-slate-400/30 rounded-full appearance-none cursor-pointer accent-yellow-500" 
              />
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-10">
              
              {/* Cost Card */}
              <div 
                className="p-8 rounded-[2rem] border transition-all duration-1000"
                style={{ backgroundColor: 'rgba(100, 116, 139, 0.05)', borderColor: 'var(--color-nav-border)' }}
              >
                <p className="text-xs font-black uppercase opacity-40 mb-3 tracking-widest" style={{ color: 'var(--color-text-primary)' }}>
                  Base Installation Cost
                </p>
                <p className="text-4xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                  ₹{cost.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-yellow-600 font-bold mt-4 bg-yellow-500/10 inline-block px-2 py-1 rounded">
                  Estimated 40% Subsidy Eligible
                </p>
              </div>

              {/* Savings Card */}
              <div 
                className="p-8 rounded-[2rem] border transition-all duration-1000"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.05)', borderColor: 'rgba(34, 197, 94, 0.2)' }}
              >
                <p className="text-xs font-black uppercase text-green-600/60 mb-3 tracking-widest">
                  25-Year Cumulative Savings
                </p>
                <p className="text-4xl font-black text-green-500">
                  ₹{savings.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-green-600 font-bold mt-4 uppercase">
                  Environmental Impact: High
                </p>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center pt-8">
              <p className="text-sm opacity-60 mb-10 italic" style={{ color: 'var(--color-text-secondary)' }}>
                Based on a {kw}kW standard residential installation in India.
              </p>
              <button 
                onClick={() => navigate('/site-survey')} 
                className="bg-yellow-500 text-white px-12 py-6 rounded-[2rem] text-xl font-black shadow-2xl hover:bg-yellow-600 hover:scale-105 transition-all flex items-center gap-4 mx-auto group active:scale-95"
              >
                <Headset className="w-6 h-6" /> 
                Book Free Site Survey 
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}