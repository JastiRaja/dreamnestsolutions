import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Provider
import { SolarProvider } from './context/SolarContext';

// Components & Layout
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Calculator from './pages/Calculator';
import Services from './pages/Services';
import About from './pages/About';
import Auth from './pages/Auth';
import ScrollToTop from './hooks/useScrollToTop'; 
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SiteSurvey from './pages/SiteSurvey';


export default function App() {
  return (
    <SolarProvider>
      <Router>
        <ScrollToTop />
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
          </Route>
        </Routes>
      </Router>
    </SolarProvider>
  );
}