import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const SolarContext = createContext();

export const SolarProvider = ({ children }) => {
  const [hours, setHours] = useState(new Date().getHours() + new Date().getMinutes() / 60);
  const [weather, setWeather] = useState('clear'); // clear, cloudy, rainy
  const [location, setLocation] = useState('Detecting...');

  // 1. Live Weather & Location Simulation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(() => {
        // In production: fetch weather from an API here
        setLocation("Hyderabad, IN");
        setWeather('clear'); 
      });
    }
  }, []);

  const solarState = useMemo(() => {
    let config = {
      sunX: "50%", sunY: "0%", sunColor: "rgba(255,255,255,0.5)",
      bgTint: "#fffdfa", textPrimary: "#0f172a", textSecondary: "#475569",
      glassBg: "rgba(255, 255, 255, 0.7)", navBorder: "rgba(255, 255, 255, 0.3)",
      shadowOpacity: "rgba(0,0,0,0.1)", weatherBrightness: 1
    };

    // Time-based Logic
    if (hours >= 5 && hours < 11) { // Morning
      config = { ...config, sunX: "90%", sunY: "10%", sunColor: "rgba(255, 240, 150, 0.4)", bgTint: "#fdfbf7" };
    } else if (hours >= 11 && hours < 16) { // Noon
      config = { ...config, sunX: "50%", sunY: "0%", sunColor: "rgba(255, 255, 255, 0.6)", bgTint: "#fffdfa" };
    } else if (hours >= 16 && hours < 19) { // Evening
      config = { ...config, sunX: "10%", sunY: "10%", sunColor: "rgba(251, 191, 36, 0.5)", bgTint: "#fffaf0" };
    } else { // Night
      config = { 
        ...config, sunX: "50%", sunY: "80%", sunColor: "rgba(148, 163, 184, 0.1)", 
        bgTint: "#020617", textPrimary: "#f8fafc", textSecondary: "#94a3b8",
        glassBg: "rgba(15, 23, 42, 0.6)", navBorder: "rgba(255, 255, 255, 0.1)",
        shadowOpacity: "rgba(0,0,0,0.5)"
      };
    }

    // Weather Multiplier
    if (weather === 'cloudy') config.weatherBrightness = 0.7;
    if (weather === 'rainy') config.weatherBrightness = 0.5;

    return config;
  }, [hours, weather]);

  const dynamicStyles = {
    '--sun-x': solarState.sunX,
    '--sun-y': solarState.sunY,
    '--sun-color': solarState.sunColor,
    '--bg-tint': solarState.bgTint,
    '--color-text-primary': solarState.textPrimary,
    '--color-text-secondary': solarState.textSecondary,
    '--color-glass-bg': solarState.glassBg,
    '--color-nav-border': solarState.navBorder,
    '--shadow-opacity': solarState.shadowOpacity,
  };

  return (
    <SolarContext.Provider value={{ hours, setHours, weather, location, solarState }}>
      <div style={dynamicStyles} className="solar-wrapper min-h-screen transition-all duration-1000 overflow-x-hidden">
        {/* Atmosphere Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
             style={{ filter: `brightness(${solarState.weatherBrightness})` }}>
          <div className="absolute w-[200vw] h-[200vh] top-[-50%] left-[-50%] blur-[120px] mix-blend-overlay opacity-60 transition-all duration-1000"
               style={{ background: `conic-gradient(from 180deg at var(--sun-x) var(--sun-y), transparent, var(--sun-color), transparent)` }} />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </SolarContext.Provider>
  );
};

export const useSolar = () => useContext(SolarContext);