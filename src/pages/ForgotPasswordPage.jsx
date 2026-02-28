import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useSolar } from '../context/SolarContext';

export default function ForgotPasswordPage() {
  const { solarState } = useSolar();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New Loading State

  const handleResetRequest = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating an API call to your backend
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1800); // 1.8 seconds feels like a "real" process
  };

  const inputStyle = {
    backgroundColor: 'rgba(100, 116, 139, 0.08)',
    borderColor: 'var(--color-nav-border)',
    color: 'var(--color-text-primary)',
  };

  return (
    <section className="pt-48 pb-32 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-md w-full px-6 relative z-10">
        <div 
          className="p-10 md:p-14 rounded-[4rem] border backdrop-blur-2xl transition-all duration-1000"
          style={{ 
            backgroundColor: 'var(--color-glass-bg)', 
            borderColor: 'var(--color-nav-border)',
            boxShadow: 'var(--shadow-offset-x) var(--shadow-offset-y) var(--shadow-blur) var(--shadow-opacity)'
          }}
        >
          {!submitted ? (
            <>
              <div className="text-center mb-12">
                <div className="bg-yellow-500/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                  <Mail className="text-yellow-500 w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  Reset Password
                </h2>
                <p className="text-sm opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
                  Enter your email and we'll send you a link to get back into your nest.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleResetRequest}>
                <div className="relative group">
                  <Mail className="absolute left-5 top-5 w-5 h-5 opacity-40 group-focus-within:text-yellow-500 transition-all" />
                  <input 
                    required
                    disabled={isLoading}
                    type="email" 
                    style={inputStyle}
                    className="w-full border p-5 pl-14 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 outline-none transition-all placeholder:opacity-30 disabled:opacity-50" 
                    placeholder="your@email.com" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-yellow-500 text-white font-black py-5 rounded-3xl shadow-2xl hover:bg-yellow-600 transition-all uppercase tracking-widest flex items-center justify-center gap-3 disabled:bg-yellow-700 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span>Sending...</span>
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                <CheckCircle2 className="text-green-500 w-10 h-10 animate-[bounce_1s_ease-in-out_infinite]" />
              </div>
              <h2 className="text-3xl font-black mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Check your Inbox
              </h2>
              <p className="text-sm opacity-60 mb-10" style={{ color: 'var(--color-text-secondary)' }}>
                If an account exists for that email, a reset link is on its way.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-yellow-500 hover:underline"
              >
                Didn't get an email? Try again
              </button>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm font-black transition-colors hover:text-yellow-500"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}