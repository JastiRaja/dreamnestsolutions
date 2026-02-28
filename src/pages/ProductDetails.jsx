import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Tag, 
  Zap, 
  ArrowLeft, 
  ShoppingCart,
  CheckCircle2,
  Cpu,
  Info
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';

// 1. Expanded Data Map to match your Product IDs
const DETAILS_MAP = {
  "alpha-450": {
    name: "Alpha 450W Mono",
    brand: "DreamNest Elite",
    manufacturer: "DN Solar Tech",
    cost: 18500,
    warranty: "10 Years",
    efficiency: "21.3%",
    capacity: "450W",
    type: "Monocrystalline",
    img: "https://static.ruralsunpower.com/wp-content/uploads/2025/10/rec-alpha-pure-rx-450w-solar-panel-bangladesh.jpg.webp",
    description: "High-density monocrystalline panel designed for residential rooftops. Features anti-reflective glass and superior low-light performance."
  },
  "titan-540": {
    name: "Titan 540W Bifacial",
    brand: "DreamNest Pro",
    manufacturer: "Titan Energy Systems",
    cost: 28000,
    warranty: "30 Years",
    efficiency: "22.5%",
    capacity: "540W",
    type: "Bifacial Dual-Glass",
    img: "https://lntsufin.com/storage/mediafiles/catalog/live/17126-1896/original/17126-1896_image_0.jpg",
    description: "Double-sided power generation technology. Ideal for ground-mounted systems or flat commercial roofs where reflected light can be captured."
  },
  "edge-400": {
    name: "Edge 400W All-Black",
    brand: "DreamNest Luxury",
    manufacturer: "Edge Photovoltaics",
    cost: 22000,
    warranty: "25 Years",
    efficiency: "20.8%",
    capacity: "400W",
    type: "All-Black Shingled",
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80",
    description: "Aesthetic-first design with a pure black finish. Perfect for luxury homes and vertical installations where visual appeal is a priority."
  }
};

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Find product by ID or fallback to the first one if not found
  const product = DETAILS_MAP[id] || DETAILS_MAP["alpha-450"];

  const renderSpecCard = (icon, label, value, color) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-[2rem] border backdrop-blur-xl flex flex-col gap-3 transition-all duration-300"
      style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
    >
      <div className={`p-3 rounded-xl w-fit bg-white/5 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase opacity-40 tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </p>
        <h4 className="text-xl font-black" style={{ color: 'var(--color-text-primary)' }}>
          {value}
        </h4>
      </div>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 mb-8 font-black text-sm uppercase tracking-widest hover:text-yellow-500 transition-colors group"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Range
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Product Showcase */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[3rem] overflow-hidden border border-white/10 aspect-square bg-slate-900 relative group shadow-2xl"
            >
              <img 
                src={product.img} 
                alt={product.name}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute top-8 left-8 bg-yellow-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                Tier 1 Verified
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-bold uppercase opacity-60">Datasheet Available</span>
               </div>
               <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-xs font-bold uppercase opacity-60">Ready for install</span>
               </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Pricing */}
          <div className="space-y-8">
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none" style={{ color: 'var(--color-text-primary)' }}>
                {product.name}
              </h1>
              <p className="text-lg opacity-60 leading-relaxed max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>
                {product.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {renderSpecCard(<Tag className="w-5 h-5" />, "Brand", product.brand, "text-blue-500")}
              {renderSpecCard(<Cpu className="w-5 h-5" />, "Cell Technology", product.type, "text-purple-500")}
              {renderSpecCard(<ShieldCheck className="w-5 h-5" />, "Service Warranty", product.warranty, "text-green-500")}
              {renderSpecCard(<Zap className="w-5 h-5" />, "Peak Capacity", product.capacity, "text-yellow-500")}
            </div>

            {/* Pricing Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-[4rem] border flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
            >
              <div className="relative z-10 text-center md:text-left">
                <p className="text-[10px] font-black uppercase text-yellow-500 mb-2 tracking-widest">Retail Unit Price</p>
                <h2 className="text-5xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                  ₹{product.cost.toLocaleString()}
                </h2>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-10 py-6 rounded-3xl bg-yellow-500 text-white font-black uppercase tracking-widest shadow-2xl shadow-yellow-500/20"
              >
                Place Order
              </motion.button>

              {/* Decorative Glow */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full" />
            </motion.div>

            <p className="text-[10px] text-center opacity-30 uppercase font-black tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>
              Prices may vary based on local subsidies and installation complexity.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}