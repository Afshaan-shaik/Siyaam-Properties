import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowUpRight, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenContactModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Properties', href: '#properties' },
    { label: 'Market Rates', href: '#market-tracker' },
    { label: 'Investment ROI', href: '#investment-calculator' },
    { label: 'About Siyaam', href: '#about' },
    { label: 'Dubai Overseas', href: '#dubai' },
    { label: 'Location & Map', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-obsidian-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Authentic Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative p-1 rounded-xl bg-gradient-to-br from-gold-400/20 to-transparent border border-gold-400/30 group-hover:border-gold-400/60 transition-all duration-300">
              <img 
                src="/assets/siyaam-logo.png" 
                alt="Siyaam Properties Logo" 
                className="h-11 sm:h-13 w-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)]" 
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold tracking-tight text-white font-heading leading-tight">
                SIYAAM <span className="text-gold-400">PROPERTIES</span>
              </span>
              <span className="block text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                Hubballi-Dharwad & Dubai
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs xl:text-sm font-medium text-slate-300 hover:text-gold-300 px-3.5 py-1.5 rounded-full transition-colors duration-200 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/918884969988?text=Hello%20Siyaam%20Properties,%20I%20am%20interested%20in%20property%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500 transition-all duration-300"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              href="tel:+919611263884"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs xl:text-sm font-semibold tracking-wide text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 hover:from-gold-200 hover:to-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_28px_rgba(212,175,55,0.5)] transition-all duration-300 transform active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Connect Today</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+919611263884"
              className="p-2 rounded-lg bg-gold-400 text-obsidian-950 font-bold"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-obsidian-950/95 border-b border-white/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-gold-300 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="tel:+919611263884"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-400 text-obsidian-950 font-bold text-sm"
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
