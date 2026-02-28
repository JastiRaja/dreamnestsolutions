import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';

// Context Provider
import { SolarProvider } from './context/SolarContext';

// Components & Layout
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Calculator from './pages/Calculator';
import Services from './pages/Services';
import About from './pages/About';
import Auth from './pages/Auth';
import ProductDetails from './pages/ProductDetails';
import ScrollToTop from './hooks/useScrollToTop'; 
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SiteSurvey from './pages/SiteSurvey';
import { AnimatePresence } from 'framer-motion';
import SolarProgressBar from './components/SolarProgressBar';


export default function App() {
  return (
    <SolarProvider>
      <Router>
        <SolarProgressBar /> {/* This stays fixed at the top */}
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="services" element={<Services />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Auth type="login" />} />
            <Route path="signup" element={<Auth type="signup" />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/site-survey" element={<SiteSurvey />} />
            <Route path="products/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
     </AnimatePresence>
      </Router>
    </SolarProvider>
  );
}