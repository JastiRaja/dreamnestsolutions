import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { MapPin, Zap, Leaf, Globe, Layers, ArrowRight, Sun, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSolar } from '../context/SolarContext';
import { PageTransition } from '../components/PageTransition';

// 1. Animated Counter Component for Stats
function CountingNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [value, isInView, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Home() {
  const { location, solarState } = useSolar();

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
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8 backdrop-blur-md"
          >
            <Sun className="w-4 h-4 text-yellow-500 animate-spin-slow" />
            <span className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em]">
              {location} • Optimized for Current Sky
            </span>
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]"
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
          
          <p className="max-w-2xl mx-auto text-lg opacity-60 mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            Experience the next generation of solar intelligence. Real-time tracking, 
            AI-powered rooftop analysis, and seamless energy independence.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/site-survey">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(234, 179, 8, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-3xl bg-yellow-500 text-white font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl"
              >
                Book Free Survey <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* --- INTERACTIVE BENTO GRID --- */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left: Rooftop Visualizer */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-8 relative group rounded-[4rem] overflow-hidden border border-white/10 h-[500px] shadow-2xl bg-slate-900"
          >
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 10 }}
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity" 
              alt="Satellite Roof View"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-12 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="glass p-5 rounded-3xl border border-white/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] font-black text-white/50 uppercase">LIDAR Scan Active</p>
                  </div>
                  <h4 className="text-white text-xl font-bold">Optimal Pitch: 24°</h4>
                </div>
                <button className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-yellow-500 transition-colors">
                  <Layers className="text-white w-6 h-6" />
                </button>
              </div>
              
              <div className="flex gap-12">
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase mb-2">Solar Exposure</p>
                  <p className="text-5xl font-black text-white"><CountingNumber value={94} suffix="%" /></p>
                </div>
                <div className="w-[1px] bg-white/10" />
                <div>
                  <p className="text-white/40 text-xs font-bold uppercase mb-2">Annual Savings</p>
                  <p className="text-5xl font-black text-yellow-500">₹<CountingNumber value={85000} /></p>
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
            className="lg:col-span-4 p-12 rounded-[4rem] border flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
          >
            <div className="relative w-56 h-56 mb-8">
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
                  className="text-6xl font-black" 
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <CountingNumber value={88} suffix="%" />
                </motion.span>
                <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Efficiency</span>
              </div>
            </div>
            <h3 className="text-2xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>Tier-1 Suitability</h3>
            <p className="text-sm opacity-50 mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Your rooftop is ready for maximum generation.
            </p>
            <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4" /> 25 Year Warranty Included
            </div>
          </motion.div>
        </div>

        {/* --- STATS TICKER --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Community Carbon Offset", val: 14200, suffix: " Tons", icon: Leaf, color: "text-green-500" },
            { label: "Live Grid Export", val: 842, suffix: " MW/h", icon: Zap, color: "text-yellow-500" },
            { label: "Clean Energy Homes", val: 2840, suffix: "+", icon: Globe, color: "text-blue-500" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.03)' }}
              className="p-8 rounded-[3rem] border backdrop-blur-xl flex items-center gap-6"
              style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
            >
              <div className={`p-5 rounded-[2rem] bg-white/5 ${stat.color} border border-white/5`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-3xl font-black mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  <CountingNumber value={stat.val} suffix={stat.suffix} />
                </h4>
                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.15em]" style={{ color: 'var(--color-text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </PageTransition>
  );
}