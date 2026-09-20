import React from 'react';
import { 
  Globe2, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  ArrowUpRight, 
  CheckCircle2, 
  Building,
  Plane,
  Coins
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function DubaiOverseas() {
  const { isDark } = useTheme();

  const benefits = [
    {
      title: "0% Tax Jurisdiction",
      desc: "Zero personal income tax, zero capital gains tax, and zero property tax on your Dubai investments.",
      icon: Coins,
    },
    {
      title: "UAE Golden Visa Pathways",
      desc: "Property investments over AED 2M qualify for 10-year renewable UAE Golden Visas for you and your family.",
      icon: Plane,
    },
    {
      title: "High Net Rental Yields",
      desc: "Earn 7% to 9% net USD-pegged rental yields, significantly higher than global metropolitan benchmarks.",
      icon: TrendingUp,
    },
    {
      title: "100% DLD & RERA Protected",
      desc: "All developer funds held in Dubai Land Department escrow accounts, backed by UAE government regulations.",
      icon: ShieldCheck,
    }
  ];

  return (
    <section id="dubai" className={`relative py-24 border-t transition-colors duration-300 overflow-hidden ${
      isDark ? 'bg-obsidian-950 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      
      {/* Glow Effects */}
      {isDark && (
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase font-heading ${
            isDark ? 'bg-slate-900 border border-gold-500/40 text-gold-300' : 'bg-black text-white'
          }`}>
            <Globe2 className="w-3.5 h-3.5 text-gold-400" />
            <span>GLOBAL INVESTMENT ADVISORY • DUBAI UAE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Unlock Tax-Free Wealth in <span className={isDark ? 'text-gradient-gold' : 'text-slate-950 underline decoration-red-600'}>Dubai</span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Backed by Mr. Sameer Kasim Shaikh’s 20 years of GCC & Gulf market experience. 
            We provide end-to-end legal and investment representation in Hubballi for premier Dubai real estate.
          </p>
        </div>

        {/* Feature Bento Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Partnership Highlight */}
          <div className={`lg:col-span-6 rounded-3xl p-8 border space-y-6 relative overflow-hidden transition-all ${
            isDark ? 'glass-card border-white/10 bg-gradient-to-br from-obsidian-900 via-slate-900 to-obsidian-950' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isDark ? 'bg-gold-400/20 text-gold-300 border border-gold-400/30' : 'bg-black text-white'
              }`}>
                OFFICIAL ALLIANCE
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Verified DLD Developers
              </span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-extrabold font-heading leading-snug ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Curated Opportunities with Amniyat Real Estate
            </h3>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Explore curated ultra-luxury residences and high-yielding commercial towers in Downtown Dubai, Business Bay, Dubai Marina, and Palm Jumeirah.
            </p>

            <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
              isDark ? 'bg-slate-950/80 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Complete Indian RBI LRS & Repatriation Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Direct Virtual & Physical Site Tours in Dubai</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Zero Brokerage Charged to Indian Investors</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/918884969988?text=Hello%20Sameer%20Kasim%20Shaikh,%20I%20am%20interested%20in%20tax-free%20Dubai%20property%20investments%20with%20Amniyat."
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs shadow-lg transition-colors ${
                  isDark ? 'bg-gold-400 hover:bg-gold-300 text-obsidian-950' : 'bg-black hover:bg-slate-800 text-white'
                }`}
              >
                <span>Book Dubai Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://www.amniyatrealestate.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-semibold underline underline-offset-4 ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'}`}
              >
                Visit Partner Platform →
              </a>
            </div>
          </div>

          {/* Right Column: 4 Pillar Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${
                    isDark ? 'glass-card glass-card-hover border-white/10' : 'bg-white border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    isDark ? 'bg-gold-400/10 border border-gold-500/20 text-gold-400' : 'bg-slate-100 border border-slate-200 text-slate-900'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-base font-bold font-heading mb-1.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {b.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
