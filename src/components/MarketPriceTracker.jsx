import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  MapPin, 
  Search, 
  Compass, 
  ArrowUpRight, 
  CheckCircle2, 
  Scale, 
  Sparkles,
  Layers
} from 'lucide-react';
import { hubliMicroMarkets } from '../data/marketRates';
import { useTheme } from '../context/ThemeContext';

export default function MarketPriceTracker() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [calcSqFt, setCalcSqFt] = useState(1500);
  const [selectedLocality, setSelectedLocality] = useState(hubliMicroMarkets[0].id);
  const { isDark } = useTheme();

  // Filter localities
  const filteredMarkets = hubliMicroMarkets.filter((m) => {
    if (selectedCategory === 'residential') {
      return ['vidyanagar', 'shirur-park', 'unkal'].includes(m.id);
    }
    if (selectedCategory === 'growth-plots') {
      return ['kusugal-road', 'navanagar-rayapur'].includes(m.id);
    }
    if (selectedCategory === 'commercial') {
      return ['keshwapur', 'gokul-road'].includes(m.id);
    }
    if (selectedCategory === 'dubai') {
      return m.id === 'dubai-prime';
    }
    return true;
  });

  const activeMarket = hubliMicroMarkets.find((m) => m.id === selectedLocality) || hubliMicroMarkets[0];
  const calculatedEstimatedCost = activeMarket.avgSqFt * calcSqFt;

  const formatLakhsCr = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crore`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <section id="market-tracker" className={`relative py-20 border-t transition-colors duration-300 overflow-hidden ${
      isDark ? 'bg-obsidian-900 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      
      {/* Subtle Background Elements */}
      {isDark && (
        <>
          <div className="absolute top-10 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase font-heading ${
              isDark ? 'bg-slate-950 border border-gold-500/30 text-gold-300' : 'bg-black text-white'
            }`}>
              <Scale className="w-3.5 h-3.5 text-gold-400" />
              <span>LIVE MICRO-MARKET PRICING MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              Real-Time <span className={isDark ? 'text-gradient-gold' : 'text-slate-950 underline decoration-red-600'}>Square Feet & Price</span> Tracker
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Authentic ground-level pricing intelligence across Hubballi-Dharwad micro-markets and Dubai. Verified weekly by Siyaam Properties' valuation desk.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Localities' },
              { id: 'commercial', label: 'Commercial Hubs' },
              { id: 'growth-plots', label: 'NA Plots Corridor' },
              { id: 'residential', label: 'Prime Residential' },
              { id: 'dubai', label: 'Dubai Tax-Free' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? isDark 
                      ? 'bg-gold-400 text-obsidian-950 shadow-md' 
                      : 'bg-black text-white shadow-md'
                    : isDark 
                      ? 'bg-slate-950/80 text-slate-300 border border-white/10 hover:border-gold-500/40' 
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Instant Sq.Ft Estimator Bar */}
        <div className={`mb-12 rounded-3xl p-6 sm:p-8 border relative overflow-hidden transition-all ${
          isDark 
            ? 'glass-card border-white/10 bg-gradient-to-r from-obsidian-950 via-slate-900 to-obsidian-950' 
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Instant Sq.Ft Cost Estimator
              </span>
              <h3 className={`text-xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Calculate Exact Property Value
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Choose a locality and enter your required area to calculate prevailing market estimates.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Select locality */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Select Locality
                </label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium outline-none ${
                    isDark ? 'bg-slate-950 border-white/15 text-white focus:border-gold-400' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-black'
                  }`}
                >
                  {hubliMicroMarkets.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} (₹{m.avgSqFt.toLocaleString()}/sq.ft)
                    </option>
                  ))}
                </select>
              </div>

              {/* Enter square feet */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Area (Square Feet): <strong className={isDark ? 'text-gold-300' : 'text-black'}>{calcSqFt} sq.ft</strong>
                </label>
                <input
                  type="number"
                  min="300"
                  max="50000"
                  step="50"
                  value={calcSqFt}
                  onChange={(e) => setCalcSqFt(Number(e.target.value))}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium outline-none ${
                    isDark ? 'bg-slate-950 border-white/15 text-white focus:border-gold-400' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  placeholder="e.g. 1500"
                />
              </div>

            </div>

            {/* Total Estimated Cost */}
            <div className={`lg:col-span-3 text-left lg:text-right border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6 ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <span className="text-xs text-slate-400 block font-medium">Estimated Benchmark Cost</span>
              <span className={`text-2xl sm:text-3xl font-black font-heading block ${
                isDark ? 'text-gold-300' : 'text-black'
              }`}>
                {formatLakhsCr(calculatedEstimatedCost)}
              </span>
              <a
                href={`https://wa.me/919611263884?text=Hello%20Afshaan%20Shaikh,%20I%20am%20looking%20for%20a%20${calcSqFt}%20sq.ft%20property%20in%20${activeMarket.name}.%20Estimated%20budget%20is%20${formatLakhsCr(calculatedEstimatedCost)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-400 mt-1"
              >
                Inquire on WhatsApp <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* Micro-Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMarkets.map((market) => (
            <div
              key={market.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${
                isDark 
                  ? 'glass-card glass-card-hover border-white/10' 
                  : 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Card top */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isDark ? 'bg-slate-950 text-gold-300 border border-gold-500/20' : 'bg-slate-100 text-slate-900 border border-slate-200'
                  }`}>
                    <MapPin className="w-3 h-3 text-gold-400" />
                    {market.name}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                    {market.yoyGrowth} YoY
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-[11px] text-slate-400 font-medium line-clamp-1 mb-1">
                    {market.subtext}
                  </div>
                  <div className={`text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    ₹{market.avgSqFt.toLocaleString()}{' '}
                    <span className="text-xs font-semibold text-slate-400 font-sans">/ sq.ft avg</span>
                  </div>
                  <div className={`text-xs font-mono mt-0.5 ${isDark ? 'text-gold-300/80' : 'text-slate-600'}`}>
                    Range: {market.range}
                  </div>
                </div>

                <p className={`text-xs leading-relaxed border-t pt-3 ${
                  isDark ? 'border-white/10 text-slate-300' : 'border-slate-100 text-slate-600'
                }`}>
                  {market.highlight}
                </p>
              </div>

              {/* Card Footer */}
              <div className={`mt-5 pt-3 border-t flex items-center justify-between text-xs ${
                isDark ? 'border-white/10' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-1 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Demand: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{market.demand}</strong></span>
                </div>
                <button
                  onClick={() => {
                    setSelectedLocality(market.id);
                    document.getElementById('market-tracker')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-gold-500 hover:text-gold-400 group-hover:translate-x-0.5 transition-transform"
                >
                  Estimate Cost →
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
