import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Users, 
  Globe2, 
  CheckCircle2, 
  Download, 
  CreditCard, 
  FileText, 
  Building2, 
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  X,
  Sparkles
} from 'lucide-react';

export default function AboutBento() {
  const [showVisitingCardModal, setShowVisitingCardModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  // Generate downloadable vCard
  const downloadVCard = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:Mr. Sameer Kasim Shaikh
ORG:Siyaam Properties
TITLE:Founder & Principal Consultant
TEL;TYPE=CELL:+918884969988
EMAIL:info@siyaamproperties.in
EMAIL:siyaamproperties@gmail.com
ADR;TYPE=WORK:;;Dream Plaza, Near Shantinagar Church, Keshwapur;Hubballi;Karnataka;580020;India
URL:https://siyaamproperties.in
NOTE:Hubballi-Dharwad & Dubai Real Estate Consultancy (Est. 2018). 20+ Years Gulf Experience.
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Sameer_Kasim_Shaikh_Siyaam_Properties.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="relative py-24 bg-obsidian-950 border-t border-white/10 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-gold-500/30 text-xs font-bold text-gold-300 tracking-wider uppercase font-heading">
            <Award className="w-3.5 h-3.5 text-gold-400" />
            <span>ESTABLISHED 2018 • THE SIYAAM LEGACY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Built on Integrity, <span className="text-gradient-gold">Grounded in Hubballi</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Learn how Siyaam Properties transformed from a seasoned vision into North Karnataka’s most trustworthy real estate advisory.
          </p>
        </div>

        {/* Bento Grid Layout (21st.dev Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Founder Feature (8 cols) */}
          <div className="md:col-span-8 glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-400/20 text-gold-300 border border-gold-400/30">
                  FOUNDER PROFILE
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Hubballi-Dharwad & Global Gulf Network
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Mr. Sameer Kasim Shaikh
              </h3>

              <div className="text-sm sm:text-base text-slate-300 space-y-3 leading-relaxed">
                <p>
                  Founded in <strong className="text-white">2018</strong> by Mr. Sameer Kasim Shaikh, a veteran with over <strong className="text-gold-300">20 years of Gulf experience</strong>, 
                  <strong className="text-white"> Siyaam Properties</strong> is Hubballi-Dharwad’s most reliable real estate consultancy.
                </p>
                <p>
                  We bring absolute clarity and transparency to every deal, ensuring a stress-free journey for buyers and sellers across Karnataka and beyond. 
                  From local NA plots to global real-estate fortunes, your financial security is our highest priority.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => setShowVisitingCardModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-gold-300 border border-gold-500/30 transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>View Visiting Card</span>
                </button>

                <button
                  onClick={() => setShowBrochureModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Brochure</span>
                </button>
              </div>
            </div>

            {/* Bottom Quote Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400 italic">
                “We carefully guide your investments, turning property into generational wealth.”
              </div>
              <a
                href="tel:+918884969988"
                className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300"
              >
                <Phone className="w-3.5 h-3.5" /> Speak with Sameer Shaikh →
              </a>
            </div>

            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Card 2: 100% Legal & Documentation (4 cols) */}
          <div className="md:col-span-4 glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-slate-900/60 to-obsidian-950">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                100% Legal Verification
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Complete legal documentation from authorized advocates, certified attorneys, and government-approved bond writers.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>NA KJP & CC Government Norms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>30-Year Title Search & Encumbrance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Sub-Registrar Assistance in Hubli</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                Zero Title Dispute Guarantee
              </span>
            </div>
          </div>

          {/* Card 3: Layout Development & Civil Contracting (6 cols) */}
          <div className="md:col-span-6 glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-950/60 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Layout Development & Sales
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Specialized end-to-end execution for large layout lands. We handle planning, infrastructure works with experienced civil contractors, and full marketing & sales promotion.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                  <strong className="text-white block mb-0.5">Civil Infrastructure</strong>
                  Underground drainage, bitumen roads & power grids.
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                  <strong className="text-white block mb-0.5">Sales Acceleration</strong>
                  Targeted NRI marketing and verified local buyer network.
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Dubai Overseas Partnership (6 cols) */}
          <div className="md:col-span-6 glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between bg-gradient-to-br from-slate-900/80 via-obsidian-950 to-amber-950/20">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-gold-500/40 flex items-center justify-center text-gold-400">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Dubai Overseas Investment Desk (Amniyat)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Unlock tax-free capital growth and 7-9% net rental yields in Dubai. Direct official tie-ups with verified DLD-compliant developers, enabling hassle-free UAE residence visas.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                  <strong className="text-gold-300 block mb-0.5">0% Tax Jurisdiction</strong>
                  Zero personal income and capital gains taxation.
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-white/5">
                  <strong className="text-gold-300 block mb-0.5">UAE Visa Free</strong>
                  Live, travel, and invest with UAE Golden Visa pathways.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">In partnership with amniyatrealestate.com</span>
              <a href="#dubai" className="text-xs font-bold text-gold-400 hover:text-gold-300">
                Explore Dubai Portfolio →
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Visiting Card Modal */}
      {showVisitingCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card rounded-3xl max-w-lg w-full border border-gold-400/30 p-8 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowVisitingCardModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Premium Gold Visiting Card UI */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-obsidian-900 via-slate-900 to-obsidian-950 border border-gold-500/40 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <img src="/assets/siyaam-logo.png" alt="Siyaam Logo" className="h-10 w-auto" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 font-heading">
                  OFFICIAL VISITING CARD
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-black text-white font-heading">
                  Mr. Sameer Kasim Shaikh
                </h4>
                <p className="text-xs text-gold-300 font-medium mt-0.5">
                  Founder & Principal Real Estate Consultant
                </p>
                <p className="text-[11px] text-slate-400">
                  20+ Years Gulf Experience • Est. 2018
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-200 border-t border-white/10 pt-4 font-mono">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>+91 8884969988</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  <span>info@siyaamproperties.in</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-[11px]">
                    Dream Plaza, Near Shantinagar Church, Keshwapur, Hubballi - 580020
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={downloadVCard}
                  className="flex-1 py-2.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Save to Phone Contacts</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Brochure Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card rounded-3xl max-w-lg w-full border border-white/20 p-8 relative animate-in fade-in zoom-in-95 text-center space-y-5">
            <button
              onClick={() => setShowBrochureModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gold-400/20 border border-gold-400/30 flex items-center justify-center text-gold-400 mx-auto">
              <FileText className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-heading">
                Siyaam Properties Official Portfolio
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Complete guide to Hubballi NA plots, luxury villas, commercial developments, and Dubai investments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 text-left text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>HDUTA & NA KJP Layout Guidelines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Price per Sq.Ft Analysis & Micro-Market Heatmap</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dubai Tax-Free Amniyat Investor Checklist</span>
              </div>
            </div>

            <a
              href="https://wa.me/918884969988?text=Hello%20Siyaam%20Properties,%20please%20send%20me%20the%20official%20portfolio%20brochure%20PDF."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Receive High-Res PDF via WhatsApp</span>
            </a>
          </div>
        </div>
      )}

    </section>
  );
}
