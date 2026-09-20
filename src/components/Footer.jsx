import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp, 
  ShieldCheck, 
  Globe2 
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-950 border-t border-white/10 text-slate-400 text-xs relative overflow-hidden">
      
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-slate-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="/assets/siyaam-logo.png" 
              alt="Siyaam Properties" 
              className="h-12 w-auto object-contain p-1 rounded-xl bg-slate-900 border border-gold-500/30"
            />
            <div>
              <div className="text-lg font-bold text-white font-heading tracking-wide">
                SIYAAM PROPERTIES
              </div>
              <div className="text-xs text-gold-400 font-medium">
                Hubballi-Dharwad's Most Reliable Real Estate Consultancy
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+918884969988"
              className="px-5 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 font-bold transition-colors shadow-lg"
            >
              Call +91-8884969988
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              About Siyaam Properties
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Founded in 2018 by Mr. Sameer Kasim Shaikh (20+ years Gulf experience). 
              Providing transparent property acquisition, NA KJP CC plots, civil layout contracting, and overseas Dubai property advisory.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Certified Title Verification</span>
            </div>
          </div>

          {/* Col 2: Core Solutions */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Real Estate Portfolios
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">Residential Plots & NA KJP Layouts</a>
              </li>
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">Luxury Villas & Independent Houses</a>
              </li>
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">Commercial Spaces & Retail Hubs</a>
              </li>
              <li>
                <a href="#properties" className="hover:text-gold-300 transition-colors">Farm Lands & Agricultural Estates</a>
              </li>
              <li>
                <a href="#dubai" className="hover:text-gold-300 transition-colors">Dubai Tax-Free Golden Visa Properties</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-300 transition-colors">Legal & Advocates Documentation</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Micro-Market Intelligence */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Hubballi Micro-Markets
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#market-tracker" className="hover:text-gold-300 transition-colors">Keshwapur Commercial Main Road</a>
              </li>
              <li>
                <a href="#market-tracker" className="hover:text-gold-300 transition-colors">Vidyanagar High-Value Residential</a>
              </li>
              <li>
                <a href="#market-tracker" className="hover:text-gold-300 transition-colors">Shirur Park Gated Enclaves</a>
              </li>
              <li>
                <a href="#market-tracker" className="hover:text-gold-300 transition-colors">Kusugal Road NA Growth Corridor</a>
              </li>
              <li>
                <a href="#market-tracker" className="hover:text-gold-300 transition-colors">Gokul Road Airport Corridor</a>
              </li>
              <li>
                <a href="#market-tracker" className="hover:text-gold-300 transition-colors">Navanagar & Rayapur BRTS Link</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Headquarters
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Dream Plaza, Near Shantinagar Church, Keshwapur, Hubballi - 580020</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+918884969988" className="hover:text-white">+91-8884969988</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@siyaamproperties.in" className="hover:text-white">info@siyaamproperties.in</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Mon – Sat: 10:00 AM – 7:00 PM</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-white/10"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.0726C24 5.44354 18.629 0.0725708 12 0.0725708C5.37097 0.0725708 0 5.44354 0 12.0726C0 18.0619 4.38823 23.0264 10.125 23.9274V15.5414H7.07661V12.0726H10.125V9.4287C10.125 6.42144 11.9153 4.76031 14.6574 4.76031C15.9706 4.76031 17.3439 4.99451 17.3439 4.99451V7.94612H15.8303C14.34 7.94612 13.875 8.87128 13.875 9.82015V12.0726H17.2031L16.6708 15.5414H13.875V23.9274C19.6118 23.0264 24 18.0619 24 12.0726Z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-white/10"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Attribution Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2025 Siyaam Properties. All rights reserved.
          </div>
          <div>
            Developed &amp; Maintained by{' '}
            <a 
              href="https://app.nirmaantech.in/" 
              target="_blank" 
              rel="nofollow noreferrer" 
              className="text-slate-300 hover:text-gold-300 underline"
            >
              Nirmaantech.in
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
