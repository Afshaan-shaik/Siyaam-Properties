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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Construct WhatsApp message URL
    const text = encodeURIComponent(
      `*New Inquiry from Siyaam Website*\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nInterest: ${formData.propertyType}\nBudget: ${formData.budget}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/918884969988?text=${text}`, '_blank');
  };

  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Dream+Plaza+Keshwapur+Hubballi";

  return (
    <section id="contact" className="relative py-24 bg-obsidian-900 border-t border-white/10 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-gold-500/30 text-xs font-bold text-gold-300 tracking-wider uppercase font-heading">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>VISIT OUR HUBLI HEADQUARTERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Connect with <span className="text-gradient-gold">Siyaam Properties</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Visit our office at Dream Plaza, Keshwapur or schedule a personalized on-site consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details & Form (6 cols) */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-8">
            
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase">
                  <Phone className="w-4 h-4" /> Afshaan Shaikh
                </div>
                <a 
                  href="tel:+919611263884" 
                  className="text-base font-black text-white hover:text-gold-300 block font-heading"
                >
                  +91 96112 63884
                </a>
                <span className="text-[11px] text-slate-400 block">Direct Line & Advisory</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase">
                  <Phone className="w-4 h-4" /> Sameer Kasim Shaikh
                </div>
                <a 
                  href="tel:+918884969988" 
                  className="text-base font-black text-white hover:text-gold-300 block font-heading"
                >
                  +91-8884969988
                </a>
                <span className="text-[11px] text-slate-400 block">Founder & Principal</span>
              </div>

              <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase">
                  <Mail className="w-4 h-4" /> Email Enquiries
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
                  <a href="mailto:afshaan100@gmail.com" className="text-gold-300 hover:text-white underline">
                    afshaan100@gmail.com
                  </a>
                  <a href="mailto:info@siyaamproperties.in" className="text-slate-200 hover:text-gold-300 underline">
                    info@siyaamproperties.in
                  </a>
                  <a href="mailto:siyaamproperties@gmail.com" className="text-slate-400 hover:text-gold-300 underline">
                    siyaamproperties@gmail.com
                  </a>
                </div>
              </div>

              <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase">
                  <Clock className="w-4 h-4" /> Office Timings
                </div>
                <div className="text-sm font-semibold text-white">
                  10:00 AM – 7:00 PM (Monday to Saturday)
                </div>
              </div>

              <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase">
                  <MapPin className="w-4 h-4" /> Registered Address
                </div>
                <div className="text-sm font-semibold text-white">
                  Dream Plaza, Near Shantinagar Church, Keshwapur, Hubballi - 580020, Karnataka, India
                </div>
              </div>

            </div>

            {/* Quick Consultation Form */}
            <form onSubmit={handleSubmit} className="space-y-4 border-t border-white/10 pt-6">
              <h4 className="text-base font-bold text-white font-heading">
                Schedule a Property Inspection or Valuation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:border-gold-400 outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number (+91)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:border-gold-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:border-gold-400 outline-none"
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
                  className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs focus:border-gold-400 outline-none"
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:border-gold-400 outline-none resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 hover:from-gold-200 hover:to-gold-400 shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Connect on WhatsApp</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs text-center">
                  Thank you! Redirecting you to WhatsApp with your customized inquiry...
                </div>
              )}
            </form>

          </div>

          {/* Interactive Google Map & Location Visualizer (6 cols) */}
          <div className="lg:col-span-6 glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between">
            
            {/* Map Top Bar */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <span className="text-xs font-bold text-white block">Dream Plaza, Keshwapur</span>
                  <span className="text-[11px] text-slate-400">Siyaam Properties Hubli HQ</span>
                </div>
              </div>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 text-xs font-bold transition-colors shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Embedded Live Google Map */}
            <div className="relative flex-1 min-h-[380px] bg-slate-950">
              <iframe
                title="Siyaam Properties Dream Plaza Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.145223637589!2d75.1482605751214!3d15.368619385213865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7c50d2fbf31%3A0xcd29a72eb9fa63bd!2sDream%20Plaza!5e0!3m2!1sen!2sin!4v1766412014028!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0 filter invert-[0.88] hue-rotate-180 contrast-[1.1] grayscale-[0.2]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Floating Map Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-obsidian-950/90 backdrop-blur-md border border-white/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="text-slate-200">Near Shantinagar Church, Keshwapur</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Dream+Plaza+Keshwapur+Hubballi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1"
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
