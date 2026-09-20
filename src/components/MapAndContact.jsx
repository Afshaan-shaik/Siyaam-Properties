import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Navigation, 
  CheckCircle2, 
  ArrowUpRight,
  MessageSquare,
  Building
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function MapAndContact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Residential Plot',
    budget: '50L - 1Cr',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Construct WhatsApp message URL
    const text = encodeURIComponent(
      `*New Inquiry from Siyaam Website*\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nInterest: ${formData.propertyType}\nBudget: ${formData.budget}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/919611263884?text=${text}`, '_blank');
  };

  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Dream+Plaza+Keshwapur+Hubballi";

  return (
    <section 
      id="contact" 
      className={`relative py-24 border-t overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-obsidian-900 border-white/10 text-white' 
          : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      
      {/* Background glow in dark mode */}
      {isDark && (
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase font-heading ${
            isDark 
              ? 'bg-slate-950 border border-gold-500/30 text-gold-300' 
              : 'bg-black text-white shadow-sm'
          }`}>
            <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-gold-400' : 'text-amber-400'}`} />
            <span>VISIT OUR HUBLI HEADQUARTERS</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Connect with{' '}
            <span className={isDark ? 'text-gradient-gold' : 'text-red-600 underline decoration-black decoration-2 underline-offset-4'}>
              Siyaam Properties
            </span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Visit our office at Dream Plaza, Keshwapur or schedule a personalized on-site consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details & Form (6 cols) */}
          <div className={`lg:col-span-6 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-8 transition-all duration-300 ${
            isDark 
              ? 'glass-card border-white/10' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className={`p-4 rounded-2xl border space-y-1 transition-colors ${
                isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase ${
                  isDark ? 'text-gold-400' : 'text-red-600'
                }`}>
                  <Phone className="w-4 h-4" /> Afshaan Shaikh
                </div>
                <a 
                  href="tel:+919611263884" 
                  className={`text-base font-black block font-heading ${
                    isDark ? 'text-white hover:text-gold-300' : 'text-slate-950 hover:text-red-600'
                  }`}
                >
                  +91 96112 63884
                </a>
                <span className="text-[11px] text-slate-500 block">Direct Line & Advisory</span>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1 transition-colors ${
                isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase ${
                  isDark ? 'text-gold-400' : 'text-red-600'
                }`}>
                  <Phone className="w-4 h-4" /> Sameer Kasim Shaikh
                </div>
                <a 
                  href="tel:+918884969988" 
                  className={`text-base font-black block font-heading ${
                    isDark ? 'text-white hover:text-gold-300' : 'text-slate-950 hover:text-red-600'
                  }`}
                >
                  +91-8884969988
                </a>
                <span className="text-[11px] text-slate-500 block">Founder & Principal</span>
              </div>

              <div className={`sm:col-span-2 p-4 rounded-2xl border space-y-1 transition-colors ${
                isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase ${
                  isDark ? 'text-gold-400' : 'text-red-600'
                }`}>
                  <Mail className="w-4 h-4" /> Email Enquiries
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
                  <a 
                    href="mailto:afshaan100@gmail.com" 
                    className={`underline ${isDark ? 'text-gold-300 hover:text-white' : 'text-slate-900 hover:text-red-600 font-bold'}`}
                  >
                    afshaan100@gmail.com
                  </a>
                  <a 
                    href="mailto:info@siyaamproperties.in" 
                    className={`underline ${isDark ? 'text-slate-200 hover:text-gold-300' : 'text-slate-700 hover:text-black'}`}
                  >
                    info@siyaamproperties.in
                  </a>
                  <a 
                    href="mailto:siyaamproperties@gmail.com" 
                    className={`underline ${isDark ? 'text-slate-400 hover:text-gold-300' : 'text-slate-500 hover:text-black'}`}
                  >
                    siyaamproperties@gmail.com
                  </a>
                </div>
              </div>

              <div className={`sm:col-span-2 p-4 rounded-2xl border space-y-1 transition-colors ${
                isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase ${
                  isDark ? 'text-gold-400' : 'text-red-600'
                }`}>
                  <Clock className="w-4 h-4" /> Office Timings
                </div>
                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  10:00 AM – 7:00 PM (Monday to Saturday)
                </div>
              </div>

              <div className={`sm:col-span-2 p-4 rounded-2xl border space-y-1 transition-colors ${
                isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase ${
                  isDark ? 'text-gold-400' : 'text-red-600'
                }`}>
                  <MapPin className="w-4 h-4" /> Registered Address
                </div>
                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Dream Plaza, Near Shantinagar Church, Keshwapur, Hubballi - 580020, Karnataka, India
                </div>
              </div>

            </div>

            {/* Quick Consultation Form */}
            <form onSubmit={handleSubmit} className={`space-y-4 border-t pt-6 ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <h4 className={`text-base font-bold font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Schedule a Property Inspection or Valuation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`px-4 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:border-gold-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-black'
                  }`}
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number (+91)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`px-4 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:border-gold-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-black'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-white/15 text-white focus:border-gold-400' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-black'
                  }`}
                >
                  <option value="Residential NA Plot">Residential NA Plot</option>
                  <option value="Independent Villa / Bungalow">Independent Villa / Bungalow</option>
                  <option value="2/3 BHK Apartment">2/3 BHK Apartment</option>
                  <option value="Commercial Space / Showroom">Commercial Space / Showroom</option>
                  <option value="Dubai Overseas Property">Dubai Overseas Property</option>
                  <option value="Layout Land Development">Layout Land Development</option>
                  <option value="Legal & Documentation Consultation">Legal Consultation</option>
                </select>

                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-white/15 text-white focus:border-gold-400' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-black'
                  }`}
                >
                  <option value="Under 35 Lakhs">Under 35 Lakhs</option>
                  <option value="35 Lakhs - 75 Lakhs">35 Lakhs – 75 Lakhs</option>
                  <option value="75 Lakhs - 1.5 Crore">75 Lakhs – 1.5 Crore</option>
                  <option value="1.5 Crore - 3 Crore+">1.5 Crore – 3 Crore+</option>
                  <option value="Dubai Investment (AED 800k+)">Dubai Investment (AED 800k+)</option>
                </select>
              </div>

              <textarea
                rows="2"
                placeholder="Specific requirements or preferred micro-market (e.g., Keshwapur, Vidyanagar)..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none resize-none transition-colors ${
                  isDark 
                    ? 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500 focus:border-gold-400' 
                    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-black'
                }`}
              ></textarea>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? 'text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 hover:from-gold-200 hover:to-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-black text-white hover:bg-slate-800'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Submit & Connect on WhatsApp</span>
              </button>

              {submitted && (
                <div className={`p-3 rounded-xl border text-xs text-center ${
                  isDark 
                    ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300' 
                    : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                }`}>
                  Thank you! Redirecting you to WhatsApp with your customized inquiry...
                </div>
              )}
            </form>

          </div>

          {/* Interactive Google Map & Location Visualizer (6 cols) */}
          <div className={`lg:col-span-6 rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 ${
            isDark 
              ? 'glass-card border-white/10' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* Map Top Bar */}
            <div className={`p-5 border-b flex items-center justify-between transition-colors ${
              isDark ? 'border-white/10 bg-slate-950/80' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    Dream Plaza, Keshwapur
                  </span>
                  <span className="text-[11px] text-slate-500">Siyaam Properties Hubli HQ</span>
                </div>
              </div>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-md ${
                  isDark 
                    ? 'bg-gold-400 hover:bg-gold-300 text-obsidian-950' 
                    : 'bg-black hover:bg-slate-800 text-white'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Embedded Live Google Map */}
            <div className={`relative flex-1 min-h-[380px] ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
              <iframe
                title="Siyaam Properties Dream Plaza Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.145223637589!2d75.1482605751214!3d15.368619385213865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7c50d2fbf31%3A0xcd29a72eb9fa63bd!2sDream%20Plaza!5e0!3m2!1sen!2sin!4v1766412014028!5m2!1sen!2sin"
                className={`w-full h-full border-0 absolute inset-0 ${
                  isDark ? 'filter invert-[0.88] hue-rotate-180 contrast-[1.1] grayscale-[0.2]' : ''
                }`}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Floating Map Card */}
              <div className={`absolute bottom-4 left-4 right-4 p-3 rounded-2xl backdrop-blur-md border flex items-center justify-between text-xs transition-colors ${
                isDark 
                  ? 'bg-obsidian-950/90 border-white/20 text-slate-200' 
                  : 'bg-white/95 border-slate-300 text-slate-800 shadow-lg'
              }`}>
                <div className="flex items-center gap-2">
                  <Building className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gold-400' : 'text-slate-800'}`} />
                  <span className="font-medium">Near Shantinagar Church, Keshwapur</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Dream+Plaza+Keshwapur+Hubballi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-bold flex items-center gap-1 ${
                    isDark ? 'text-gold-400 hover:text-gold-300' : 'text-red-600 hover:text-black underline'
                  }`}
                >
                  Open Map <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
