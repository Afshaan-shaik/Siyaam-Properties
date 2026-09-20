import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Properties', href: '#properties' },
    { label: 'Market Rates', href: '#market-tracker' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark 
          ? scrolled 
            ? 'bg-obsidian-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2 sm:py-3' 
            : 'bg-obsidian-950/70 backdrop-blur-md py-3 sm:py-4'
          : scrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-md py-2 sm:py-3' 
            : 'bg-white/90 backdrop-blur-md py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Authentic Brand Logo - Clean, Prominent, Unboxed */}
          <a href="#" className="flex items-center group transition-transform duration-300 hover:scale-105">
            <img 
              src="/assets/siyaam-logo.png" 
              alt="Siyaam Consultants Real Estate & Properties" 
              className={`h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain transition-all duration-300 ${
                isDark 
                  ? 'p-2 rounded-2xl bg-white/95 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'drop-shadow-sm'
              }`}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:flex items-center gap-1 sm:gap-2 px-4 py-2 rounded-full transition-colors ${
            isDark 
              ? 'bg-slate-900/70 border border-white/10 backdrop-blur-md' 
              : 'bg-slate-100/90 border border-slate-200 backdrop-blur-md'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isDark
                    ? 'text-slate-300 hover:text-gold-300 hover:bg-white/10'
                    : 'text-slate-800 hover:text-black hover:bg-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Day/Night Mode Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Theme Toggle Button: Day Mode (B&W) vs Night Mode (Gold/Black) */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 text-xs font-bold ${
                isDark
                  ? 'bg-slate-900 border border-gold-400/40 text-gold-300 hover:bg-gold-400 hover:text-obsidian-950 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200 shadow-sm'
              }`}
              title={isDark ? 'Switch to Day Mode (Black & White)' : 'Switch to Night Mode (Golden Black)'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden lg:inline">Day Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden lg:inline">Night Mode</span>
                </>
              )}
            </button>

            {/* Connect Today Button - Matches User Screenshot */}
            <a
              href="tel:+919611263884"
              className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 shadow-lg ${
                isDark
                  ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 text-obsidian-950 hover:from-gold-200 hover:to-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                  : 'bg-black text-white hover:bg-slate-800 shadow-slate-900/20'
              }`}
            >
              Connect today !!
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border ${
                isDark ? 'bg-slate-900 border-white/20 text-gold-300' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
              aria-label="Toggle Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="tel:+919611263884"
              className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                isDark ? 'bg-gold-400 text-obsidian-950' : 'bg-black text-white'
              }`}
            >
              Connect
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`sm:hidden px-4 pt-4 pb-6 border-b backdrop-blur-2xl transition-all ${
          isDark 
            ? 'bg-obsidian-950/95 border-white/10 text-white' 
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                  isDark 
                    ? 'text-slate-200 hover:text-gold-300 hover:bg-white/5' 
                    : 'text-slate-800 hover:text-black hover:bg-slate-100'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-200/20 flex flex-col gap-2">
              <a
                href="tel:+919611263884"
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm shadow-md ${
                  isDark ? 'bg-gold-400 text-obsidian-950' : 'bg-black text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                Call +91 96112 63884 (Afshaan Shaikh)
              </a>
              <a
                href="https://wa.me/919611263884?text=Hello%20Afshaan%20Shaikh,%20I%20am%20interested%20in%20Siyaam%20Properties."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
