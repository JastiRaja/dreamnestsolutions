import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Headset, ChevronRight, Bolt, IndianRupee, ShieldCheck, TrendingUp, BadgeCheck } from 'lucide-react';
import { useSolar } from '../context/SolarContext'; // Importing our Engine
import { useNavigate } from 'react-router-dom';

function formatInrRange(minValue, maxValue) {
  return `₹${minValue.toLocaleString('en-IN')} - ₹${maxValue.toLocaleString('en-IN')}`;
}

const ROI_TABLE = [
  {
    load: '1 kW',
    totalCost: '₹55,000 - ₹75,000',
    subsidy: '₹30,000',
    netInvestment: '₹25,000 - ₹45,000',
    monthlySaving: '₹800 - ₹1,200',
    savings25Y: '₹4 - ₹6 Lakhs',
  },
  {
    load: '2 kW',
    totalCost: '₹1,10,000 - ₹1,50,000',
    subsidy: '₹60,000',
    netInvestment: '₹50,000 - ₹90,000',
    monthlySaving: '₹1,800 - ₹2,500',
    savings25Y: '₹9 - ₹12 Lakhs',
  },
  {
    load: '3 kW',
    totalCost: '₹1,65,000 - ₹2,25,000',
    subsidy: '₹78,000',
    netInvestment: '₹87,000 - ₹1,47,000',
    monthlySaving: '₹3,000 - ₹4,500',
    savings25Y: '₹18 - ₹22 Lakhs',
  },
  {
    load: '5 kW',
    totalCost: '₹2,75,000 - ₹3,75,000',
    subsidy: '₹78,000',
    netInvestment: '₹1,97,000 - ₹2,97,000',
    monthlySaving: '₹5,500 - ₹7,500',
    savings25Y: '₹35 - ₹45 Lakhs',
  },
  {
    load: '10 kW',
    totalCost: '₹5,50,000 - ₹7,50,000',
    subsidy: '₹78,000*',
    netInvestment: '₹4,72,000 - ₹6,72,000',
    monthlySaving: '₹11,000 - ₹15,000',
    savings25Y: '₹80 - ₹95 Lakhs',
  },
];

const STATE_POLICY_NOTES = {
  'Andhra Pradesh': [
    'Residential rooftop applications are processed through Andhra Pradesh DISCOM workflows (APEPDCL/APSPDCL/APCPDCL).',
    'Net-metering and sanctioned load rules apply as per prevailing APERC and DISCOM guidelines.',
    'Technical feasibility, meter replacement, and commissioning approval are required before subsidy disbursal.',
  ],
  Telangana: [
    'Domestic rooftop applications are processed through state DISCOM workflows.',
    'Net-metering and sanctioned load constraints may apply based on local utility rules.',
    'Installation and subsidy disbursal timelines depend on portal and DISCOM approval stages.',
  ],
  Karnataka: [
    'Subsidy remains under central PM Surya Ghar slabs for eligible residential users.',
    'BESCOM/other ESCOM net-metering procedures and transformer capacity checks apply.',
    'Vendor empanelment and meter replacement timelines can vary by utility zone.',
  ],
  Maharashtra: [
    'DISCOM approval and technical feasibility are mandatory before installation.',
    'Net-metering permissions and meter standards are governed by state utility process.',
    'Final subsidy credit is released after commissioning and verification.',
  ],
  Gujarat: [
    'Residential rooftop adoption is high, but local utility approvals still apply.',
    'System size must align with sanctioned load and rooftop feasibility conditions.',
    'Subsidy processing follows portal workflow after successful commissioning.',
  ],
  Delhi: [
    'DISCOM process and rooftop ownership/NOC requirements may impact eligibility.',
    'Net-metering and meter replacement policies apply as per utility procedures.',
    'Final amount and timeline can vary based on documentation and inspection closure.',
  ],
};

export default function Calculator() {
  const { roiProjection, calcInput, setCalcInput } = useSolar();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  
  // Local state for the bill slider
  const [calcBill, setCalcBill] = useState(calcInput.monthlyBill || 3000);
  const [selectedState] = useState('Andhra Pradesh');

  const {
    systemKw: kw,
    subsidyAmount,
    grossCostRange,
    netCostRange,
    monthlySavingRange,
    totalSavingsRange,
    paybackYearRange,
  } = roiProjection;
  const activeLoadLabel = `${kw} kW`;
  const stateNotes = STATE_POLICY_NOTES[selectedState] || [];

  return (
    <section className="pt-32 sm:pt-36 pb-20 sm:pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="uppercase tracking-[0.2em] text-xs font-black text-yellow-500 mb-4">ROI Planner</p>
          <h2
            className="text-4xl md:text-6xl font-black mb-4 leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Solar Investment <span className="text-yellow-500">Calculator</span>
          </h2>
          <p className="text-lg md:text-xl opacity-70 max-w-3xl" style={{ color: 'var(--color-text-secondary)' }}>
            Estimate installation cost, subsidy, monthly bill savings, and long-term 25-year returns with 5% annual tariff escalation.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-[2rem] border backdrop-blur-xl"
            style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                Your Monthly Bill
              </h3>
              <span className="bg-slate-900 text-yellow-400 px-5 py-2 rounded-xl text-xl font-black border border-white/10">
                ₹{calcBill.toLocaleString('en-IN')}
              </span>
            </div>

            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={calcBill}
              onChange={(e) => {
                const nextBill = parseInt(e.target.value, 10);
                setCalcBill(nextBill);
                setCalcInput((prev) => ({ ...prev, monthlyBill: nextBill }));
              }}
              className="w-full h-3 bg-slate-400/30 rounded-full appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between mt-2 text-xs opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
              <span>₹1,000</span>
              <span>₹50,000+</span>
            </div>

            <div className="mt-8 rounded-2xl border p-5" style={{ borderColor: 'var(--color-nav-border)' }}>
              <p className="text-xs uppercase tracking-widest font-black opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
                Recommended System Load
              </p>
              <p className="text-3xl font-black mt-2 text-yellow-500">{activeLoadLabel}</p>
              <p className="text-sm opacity-70 mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                Slab-based estimate aligned with your current monthly electricity spend.
              </p>
            </div>

            <div className="mt-6 rounded-xl border px-4 py-3" style={{ borderColor: 'var(--color-nav-border)' }}>
              <p className="text-xs uppercase tracking-widest font-black opacity-60 mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                State / DISCOM Context
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Andhra Pradesh
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
          >
            <div className="rounded-2xl p-5 border" style={{ borderColor: 'var(--color-nav-border)', backgroundColor: 'rgba(100, 116, 139, 0.05)' }}>
              <div className="flex items-center gap-2 mb-3 text-yellow-500"><IndianRupee className="w-4 h-4" /><p className="text-xs font-black tracking-widest uppercase">Total Cost</p></div>
              <p className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{formatInrRange(grossCostRange[0], grossCostRange[1])}</p>
              <p className="text-xs mt-2 opacity-60" style={{ color: 'var(--color-text-secondary)' }}>Before subsidy</p>
            </div>

            <div className="rounded-2xl p-5 border" style={{ borderColor: 'rgba(234, 179, 8, 0.35)', backgroundColor: 'rgba(234, 179, 8, 0.07)' }}>
              <div className="flex items-center gap-2 mb-3 text-yellow-500"><ShieldCheck className="w-4 h-4" /><p className="text-xs font-black tracking-widest uppercase">Govt Subsidy</p></div>
              <p className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>₹{subsidyAmount.toLocaleString('en-IN')}</p>
              <p className="text-xs mt-2 opacity-60" style={{ color: 'var(--color-text-secondary)' }}>Approximate</p>
            </div>

            <div className="rounded-2xl p-5 border" style={{ borderColor: 'var(--color-nav-border)', backgroundColor: 'rgba(100, 116, 139, 0.05)' }}>
              <div className="flex items-center gap-2 mb-3 text-yellow-500"><Bolt className="w-4 h-4" /><p className="text-xs font-black tracking-widest uppercase">Monthly Savings</p></div>
              <p className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{formatInrRange(monthlySavingRange[0], monthlySavingRange[1])}</p>
              <p className="text-xs mt-2 opacity-60" style={{ color: 'var(--color-text-secondary)' }}>Estimated bill reduction</p>
            </div>

            <div className="rounded-2xl p-5 border" style={{ borderColor: 'rgba(34, 197, 94, 0.25)', backgroundColor: 'rgba(34, 197, 94, 0.08)' }}>
              <div className="flex items-center gap-2 mb-3 text-green-600"><TrendingUp className="w-4 h-4" /><p className="text-xs font-black tracking-widest uppercase">25-Year Savings</p></div>
              <p className="text-2xl font-black text-green-500">{formatInrRange(totalSavingsRange[0], totalSavingsRange[1])}</p>
              <p className="text-xs mt-2 text-green-700/80">With 5% annual tariff hike</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}>
            <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2" style={{ color: 'var(--color-text-secondary)' }}>Net Investment</p>
            <p className="text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>{formatInrRange(netCostRange[0], netCostRange[1])}</p>
          </div>
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', borderColor: 'rgba(34, 197, 94, 0.25)' }}>
            <p className="text-xs font-black uppercase tracking-widest text-green-700/80 mb-2">Payback Window</p>
            <p className="text-3xl font-black text-green-600">{paybackYearRange[1] ? `${paybackYearRange[1]} - ${paybackYearRange[0]} Years` : 'N/A'}</p>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border overflow-hidden" style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}>
          <div className="p-6 border-b" style={{ borderColor: 'var(--color-nav-border)' }}>
            <h3 className="text-xl font-black" style={{ color: 'var(--color-text-primary)' }}>System Comparison Table</h3>
            <p className="text-sm opacity-70 mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              Reference slab ranges used by the calculator.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
                  <th className="py-4 px-6">System Load</th>
                  <th className="py-4 px-6">Total Cost</th>
                  <th className="py-4 px-6">Subsidy</th>
                  <th className="py-4 px-6">Net Investment</th>
                  <th className="py-4 px-6">Monthly Saving</th>
                  <th className="py-4 px-6">25-Year Savings</th>
                </tr>
              </thead>
              <tbody>
                {ROI_TABLE.map((row) => (
                  <tr
                    key={row.load}
                    className={`border-t ${row.load === activeLoadLabel ? 'bg-yellow-500/10' : ''}`}
                    style={{ borderColor: 'var(--color-nav-border)' }}
                  >
                    <td className="py-4 px-6 font-black text-yellow-500">{row.load}</td>
                    <td className="py-4 px-6" style={{ color: 'var(--color-text-primary)' }}>{row.totalCost}</td>
                    <td className="py-4 px-6" style={{ color: 'var(--color-text-primary)' }}>{row.subsidy}</td>
                    <td className="py-4 px-6" style={{ color: 'var(--color-text-primary)' }}>{row.netInvestment}</td>
                    <td className="py-4 px-6" style={{ color: 'var(--color-text-primary)' }}>{row.monthlySaving}</td>
                    <td className="py-4 px-6 font-bold text-green-600">{row.savings25Y}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-6 py-4 text-xs opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
            * Subsidy above 3 kW typically follows capped policy slabs. Final values vary by discom/state.
          </p>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}>
            <div className="flex items-center gap-2 mb-3 text-yellow-500">
              <BadgeCheck className="w-5 h-5" />
              <p className="text-sm font-black uppercase tracking-widest">PM Surya Ghar Subsidy Rules</p>
            </div>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
              <li>Up to 2 kW: approx ₹30,000 per kW.</li>
              <li>Additional 1 kW (up to 3 kW total): approx ₹18,000.</li>
              <li>3 kW and above: subsidy typically capped at ₹78,000.</li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: 'rgba(234, 179, 8, 0.07)', borderColor: 'rgba(234, 179, 8, 0.35)' }}>
            <p className="text-sm font-black uppercase tracking-widest text-yellow-600 mb-3">
              {selectedState} Policy Notes
            </p>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
              {stateNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center pt-10">
          <motion.button
            onClick={() => navigate('/site-survey')}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="touch-manipulation min-h-12 bg-yellow-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-black shadow-2xl hover:bg-yellow-600 transition-all flex items-center justify-center gap-3 mx-auto group active:bg-yellow-700"
          >
            <Headset className="w-5 h-5" />
            Book Free Site Survey
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="text-xs opacity-60 mt-4" style={{ color: 'var(--color-text-secondary)' }}>
            Subsidy values are indicative and follow PM Surya Ghar slab assumptions used in this estimator.
          </p>
        </div>
      </div>
    </section>
  );
}