import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Hero3D from './components/Hero3D';
import MarketPriceTracker from './components/MarketPriceTracker';
import InvestmentTracker from './components/InvestmentTracker';
import PropertyShowcase from './components/PropertyShowcase';
import VideoShowcase from './components/VideoShowcase';
import AboutBento from './components/AboutBento';
import DubaiOverseas from './components/DubaiOverseas';
import MapAndContact from './components/MapAndContact';
import Footer from './components/Footer';
import { MessageSquare } from 'lucide-react';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen pb-16 lg:pb-0 transition-colors duration-300 ${
      isDark 
        ? 'bg-obsidian-950 text-slate-100 selection:bg-gold-500/30 selection:text-gold-200' 
        : 'bg-white text-slate-900 selection:bg-black selection:text-white'
    }`}>
      
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* 3D Hero Section */}
        <Hero3D />

        {/* Real-time Square Feet & Market Price Tracker */}
        <MarketPriceTracker />

        {/* Real-time Investment & Yield Simulator */}
        <InvestmentTracker />

        {/* 3D Property Showcase Gallery */}
        <PropertyShowcase />

        {/* Cinematic Video Showcase Reel */}
        <VideoShowcase />

        {/* About & Founder Profile (21st.dev Bento Grid) */}
        <AboutBento />

        {/* Dubai Tax-Free Global Desk */}
        <DubaiOverseas />

        {/* Google Map & Direct Contact Hub */}
        <MapAndContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Desktop Floating WhatsApp Quick Connect Button */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        <a
          href="https://wa.me/918884969988?text=Hello%20Sameer%20Kasim%20Shaikh,%20I%20am%20interested%20in%20Siyaam%20Properties%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 p-3.5 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.5)] border border-emerald-400/40 transition-all duration-300 hover:scale-105"
          title="Chat with Sameer Kasim Shaikh (Siyaam Properties)"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
            WhatsApp Us
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping hidden sm:inline-block" />
        </a>
      </div>

      {/* Native App-Like Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
