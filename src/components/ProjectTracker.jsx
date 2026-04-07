import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { useSolar } from '../context/SolarContext';

const PROJECT_STEPS = [
  { id: 'survey', label: 'Site Survey' },
  { id: 'permit', label: 'Permit & Approval' },
  { id: 'install', label: 'Installation' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'active', label: 'System Activated' },
];

export default function ProjectTracker() {
  const { projectStage, setProjectStage } = useSolar();
  const activeIndex = Math.max(
    0,
    PROJECT_STEPS.findIndex((step) => step.id === projectStage)
  );
  const progressPercent = (activeIndex / (PROJECT_STEPS.length - 1)) * 100;

  return (
    <div
      className="rounded-[2rem] p-8 border backdrop-blur-xl"
      style={{ backgroundColor: 'var(--color-glass-bg)', borderColor: 'var(--color-nav-border)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>
          Project Tracker
        </h3>
        <span className="text-xs font-black uppercase text-yellow-500 tracking-widest">
          {Math.round(progressPercent)}% Complete
        </span>
      </div>

      <div className="relative h-2 rounded-full bg-slate-300/30 overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="grid md:grid-cols-5 gap-3">
        {PROJECT_STEPS.map((step, index) => {
          const isDone = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <motion.button
              key={step.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setProjectStage(step.id)}
              className={`rounded-xl p-3 border text-left transition-all ${
                isCurrent ? 'ring-2 ring-yellow-500/60' : ''
              }`}
              style={{
                borderColor: isDone ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-nav-border)',
                backgroundColor: isDone ? 'rgba(234, 179, 8, 0.08)' : 'rgba(100, 116, 139, 0.05)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Circle className="w-4 h-4 opacity-40" style={{ color: 'var(--color-text-primary)' }} />
                )}
                <span
                  className="text-[10px] font-black uppercase tracking-widest"
                  style={{ color: 'var(--color-text-secondary)', opacity: 0.9 }}
                >
                  Step {index + 1}
                </span>
              </div>
              <p
                className="text-sm font-bold leading-tight"
                style={{ color: isDone ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
              >
                {step.label}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
