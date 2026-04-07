import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView, useReducedMotion } from 'framer-motion';
import { MapPin, Zap, Leaf, Globe, Layers, ArrowRight, Sun, ShieldCheck, BadgeCheck, Clock3, FileCheck2, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSolar } from '../context/SolarContext';
import { PageTransition } from '../components/PageTransition';

// 1. Animated Counter Component for Stats
function CountingNumber({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            const displayValue =
              decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest).toLocaleString();
            ref.current.textContent = displayValue + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [value, isInView, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Home() {
  const { location, generationData } = useSolar();
  const shouldReduceMotion = useReducedMotion();

  const totalDailyGeneration = generationData.reduce((sum, point) => sum + (point.generatedKwh || 0), 0);
  const lastHourGeneration = generationData.length ? generationData[generationData.length - 1].generatedKwh || 0 : 0;
  const estimatedMonthlyGeneration = totalDailyGeneration * 30;
  const annualSavingsEstimate = Math.round(estimatedMonthlyGeneration * 12 * 8); // Approx ₹8 per unit.
  const gridExportEstimate = Number((lastHourGeneration / 1000).toFixed(2)); // Displayed in MW/h.
  const cleanHomesEstimate = Math.max(1, Math.round(estimatedMonthlyGeneration / 300));
  const carbonOffsetEstimate = Math.round((estimatedMonthlyGeneration * 12 * 0.82) / 1000); // Tons CO2/year approx.
  const quickEstimateBill = 3500;
  const quickEstimateSavings = '₹3,000 - ₹4,500';
  const quickEstimateSubsidy = 'Up to ₹78,000';

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.div 
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8 backdrop-blur-md"
          >
            <Sun className="w-4 h-4 text-yellow-500 animate-spin-slow" />
            <span className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em]">
              Andhra Pradesh Focus • {location}
            </span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 sm:mb-8 leading-[0.9] sm:leading-[0.85]"
              style={{ color: 'var(--color-text-primary)' }}>
            POWER YOUR <br/> 
            <motion.span 
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500 bg-[length:200%_auto]"
            >
              FUTURE.
            </motion.span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg opacity-60 mb-8 sm:mb-10 px-1" style={{ color: 'var(--color-text-secondary)' }}>
            Get PM Surya Ghar-aligned rooftop solar planning, DISCOM process support, and live generation intelligence for Andhra Pradesh homes.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/site-survey">
              <motion.button 
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05, boxShadow: "0 20px 40px rgba(234, 179, 8, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="touch-manipulation min-h-12 w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 rounded-3xl bg-yellow-500 text-white text-sm sm:text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:brightness-95"
              >
                Book Free Survey <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/calculator">
              <motion.button
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="touch-manipulation min-h-12 w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 rounded-3xl border border-yellow-500/40 text-yellow-600 text-sm sm:text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 backdrop-blur-md active:bg-yellow-500/10"
              >
                Check Subsidy Eligibility <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* --- TRUST STRIP --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: 'PM Surya Ghar Aligned', icon: BadgeCheck },
            { label: 'AP DISCOM Process Support', icon: FileCheck2 },
            { label: '25 Year Warranty Assistance', icon: ShieldCheck },
            { label: 'Service SLA Backed', icon: Clock3 },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-2xl border flex items-center gap-3 min-h-[72px]"
              style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
            >
              <item.icon className="w-5 h-5 text-yellow-500" />
              <p className="text-xs font-black uppercase tracking-widest opacity-80" style={{ color: 'var(--color-text-primary)' }}>
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* --- 3 STEP JOURNEY --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-12"
        >
          {[
            {
              title: 'Check Eligibility',
              desc: 'Share your monthly bill and rooftop details to get an AP-ready estimate.',
              eta: '2-5 Minutes',
              icon: FileCheck2,
            },
            {
              title: 'Site Survey',
              desc: 'Our team performs roof feasibility, sanctioned load checks, and proposal mapping.',
              eta: '24-72 Hours',
              icon: MapPin,
            },
            {
              title: 'Install & Save',
              desc: 'Complete DISCOM approvals, commissioning, and start generating solar savings.',
              eta: '2-6 Weeks',
              icon: Wrench,
            },
          ].map((step, idx) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileTap={{ scale: 0.995 }}
              className="touch-manipulation p-6 sm:p-8 rounded-[2rem] border"
              style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2">Step {idx + 1}</p>
              <h3 className="text-xl sm:text-2xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>{step.title}</h3>
              <p className="text-sm opacity-70 mb-4" style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
              <p className="text-xs font-black uppercase opacity-60" style={{ color: 'var(--color-text-secondary)' }}>{step.eta}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- INTERACTIVE BENTO GRID --- */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 mb-12">
          
          {/* Left: Rooftop Visualizer */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-8 relative group rounded-[2rem] sm:rounded-[4rem] overflow-hidden border border-white/10 h-[420px] sm:h-[500px] shadow-2xl bg-slate-900"
          >
            <motion.img 
              whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
              transition={{ duration: 10 }}
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity" 
              alt="Satellite Roof View"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 sm:p-12 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="glass p-5 rounded-3xl border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] font-black text-white/50 uppercase">LIDAR Scan Active</p>
                  </div>
                  <h4 className="text-white text-xl font-bold">Optimal Pitch: 24°</h4>
                </div>
                <button className="touch-manipulation min-h-12 min-w-12 p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-yellow-500 active:bg-yellow-500 transition-colors">
                  <Layers className="text-white w-6 h-6" />
                </button>
              </div>
              
              <div className="flex gap-6 sm:gap-12">
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase mb-2">Solar Exposure</p>
                  <p className="text-3xl sm:text-5xl font-black text-white"><CountingNumber value={94} suffix="%" /></p>
                </div>
                <div className="w-[1px] bg-white/10" />
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase mb-2">Annual Savings</p>
                  <p className="text-3xl sm:text-5xl font-black text-yellow-500">₹<CountingNumber value={annualSavingsEstimate} /></p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Efficiency Gauge */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-4 p-8 sm:p-12 rounded-[2rem] sm:rounded-[4rem] border flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
          >
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 mb-6 sm:mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="112" cy="112" r="95" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="112" cy="112" r="95" stroke="var(--sun-color)" strokeWidth="12" fill="transparent"
                  strokeDasharray={600}
                  initial={{ strokeDashoffset: 600 }}
                  whileInView={{ strokeDashoffset: 600 - (600 * 88) / 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  className="text-4xl sm:text-6xl font-black" 
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <CountingNumber value={88} suffix="%" />
                </motion.span>
                <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Efficiency</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>Tier-1 Suitability</h3>
            <p className="text-sm opacity-50 mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Your rooftop is ready for maximum generation.
            </p>
            <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" /> 25 Year Warranty Included
            </div>
          </motion.div>
        </div>

        {/* --- QUICK ESTIMATOR --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] border mb-12"
          style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
        >
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Quick Estimate
              </p>
              <h3 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                Typical AP Household
              </h3>
              <p className="text-sm opacity-70 mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                Monthly bill around ₹{quickEstimateBill.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="rounded-2xl p-5 border" style={{ borderColor: 'var(--color-nav-border)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2">Estimated Monthly Savings</p>
              <p className="text-xl font-black" style={{ color: 'var(--color-text-primary)' }}>{quickEstimateSavings}</p>
            </div>
            <div className="rounded-2xl p-5 border" style={{ borderColor: 'rgba(234, 179, 8, 0.35)', backgroundColor: 'rgba(234, 179, 8, 0.07)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-yellow-600 mb-2">PM Surya Ghar Subsidy</p>
              <p className="text-xl font-black" style={{ color: 'var(--color-text-primary)' }}>{quickEstimateSubsidy}</p>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/calculator">
              <button className="touch-manipulation min-h-12 w-full sm:w-auto px-8 py-4 rounded-2xl bg-yellow-500 text-white font-black uppercase tracking-widest text-xs hover:bg-yellow-600 active:bg-yellow-700 transition-colors inline-flex items-center justify-center gap-2">
                Open Full ROI Calculator <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* --- STATS TICKER --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Community Carbon Offset", val: carbonOffsetEstimate, suffix: " Tons", icon: Leaf, color: "text-green-500" },
            { label: "Live Grid Export", val: gridExportEstimate, suffix: " MW/h", icon: Zap, color: "text-yellow-500" },
            { label: "Clean Energy Homes", val: cleanHomesEstimate, suffix: "+", icon: Globe, color: "text-blue-500" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -5, backgroundColor: 'rgba(255,255,255,0.03)' }}
              whileTap={{ scale: 0.995 }}
              className="touch-manipulation p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border backdrop-blur-xl flex items-center gap-4 sm:gap-6"
              style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
            >
              <div className={`p-5 rounded-[2rem] bg-white/5 ${stat.color} border border-white/5`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-3xl font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  <CountingNumber value={stat.val} suffix={stat.suffix} decimals={stat.label === "Live Grid Export" ? 2 : 0} />
                </h4>
                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.15em]" style={{ color: 'var(--color-text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- TESTIMONIALS --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-5 sm:gap-6 mt-10"
        >
          {[
            {
              quote: 'DreamNest handled AP approvals smoothly and our monthly bill dropped within the first cycle.',
              name: 'Praveen Reddy',
              city: 'Vijayawada',
            },
            {
              quote: 'The tracker and support team gave full visibility from survey to commissioning.',
              name: 'Sowmya N.',
              city: 'Visakhapatnam',
            },
          ].map((t) => (
            <motion.div
              key={t.name}
              variants={itemVariants}
              whileTap={{ scale: 0.995 }}
              className="touch-manipulation p-6 sm:p-8 rounded-[2rem] border"
              style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
            >
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--color-text-primary)' }}>
                "{t.quote}"
              </p>
              <p className="text-sm font-black text-yellow-500">{t.name}</p>
              <p className="text-xs opacity-60" style={{ color: 'var(--color-text-secondary)' }}>{t.city}, Andhra Pradesh</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </PageTransition>
  );
}