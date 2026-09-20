import React, { useState } from 'react';
import { TrendingUp, Activity, BarChart2, ShieldCheck, Globe, Building2, Flame } from 'lucide-react';
import { hubliMicroMarkets, liveMarketStats } from '../../data/marketRates';

export default function LiveMarketTicker({ isDark = true }) {
  const [activeScope, setActiveScope] = useState('all'); // 'all' | 'residential' | 'commercial' | 'dubai'

  const filteredMarkets = hubliMicroMarkets.filter(m => {
    if (activeScope === 'residential') return m.id !== 'dubai-prime' && m.id !== 'keshwapur';
    if (activeScope === 'commercial') return m.id === 'keshwapur' || m.id === 'gokul-road';
    if (activeScope === 'dubai') return m.id === 'dubai-prime';
    return true;
  });

  return (
    <div className={`w-full border-y transition-colors duration-300 ${
      isDark 
        ? 'bg-obsidian-900/90 border-slate-800/80 text-slate-100' 
        : 'bg-slate-50/95 border-slate-200 text-slate-900'
    } backdrop-blur-md sticky top-0 z-30 shadow-md`}>
      
      {/* Top Scope Control Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Real-time Telemetry Pulse */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono uppercase font-bold tracking-wider text-[11px] text-emerald-400">
            LIVE TICKER 2.4s
          </span>
          <span className={`hidden sm:inline ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>•</span>
          <span className={`hidden sm:inline font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Hubballi-Dharwad RERA & Dubai DLD Certified Feed
          </span>
        </div>

        {/* Scope Pill Selectors */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg border border-slate-700/50 bg-black/20 text-[11px]">
          {[
            { id: 'all', label: 'All Sectors' },
            { id: 'residential', label: 'Prime Resi' },
            { id: 'commercial', label: 'Corporate & Retail' },
            { id: 'dubai', label: 'Dubai Global 0% Tax' },
          ].map((scope) => (
            <button
              key={scope.id}
              onClick={() => setActiveScope(scope.id)}
              className={`px-2.5 py-1 rounded transition-all font-medium ${
                activeScope === scope.id
                  ? 'bg-gold-500 text-black font-bold shadow-sm'
                  : isDark 
                    ? 'text-slate-400 hover:text-white hover:bg-white/5' 
                    : 'text-slate-600 hover:text-black hover:bg-slate-200'
              }`}
            >
              {scope.label}
            </button>
          ))}
        </div>

        {/* Aggregate Stats Badges */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-gold-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Advised: {liveMarketStats.totalAdvisedValue}</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Activity className="w-3.5 h-3.5" />
            <span>Clearance: {liveMarketStats.legalClearanceRate}</span>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Ticker Rail */}
      <div className="overflow-x-auto scrollbar-none py-2 px-4 border-t border-slate-800/40">
        <div className="flex items-center gap-4 min-w-max">
          {filteredMarkets.map((market, idx) => (
            <div
              key={`${market.id}-${idx}`}
              className={`flex items-center gap-3 px-3.5 py-1.5 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                isDark 
                  ? 'bg-obsidian-850/80 border-slate-800 hover:border-gold-500/50' 
                  : 'bg-white border-slate-200 hover:border-gold-500 shadow-sm'
              }`}
              title={market.highlight}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs">{market.name}</span>
                {market.id === 'dubai-prime' ? (
                  <Globe className="w-3 h-3 text-cyan-400" />
                ) : (
                  <Building2 className="w-3 h-3 text-gold-400" />
                )}
              </div>

              <div className="font-mono text-xs font-semibold">
                {market.id === 'dubai-prime' ? market.range : `₹${market.avgSqFt.toLocaleString('en-IN')}/sq.ft`}
              </div>

              <div className="flex items-center gap-0.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                <TrendingUp className="w-3 h-3" />
                <span>{market.yoyGrowth}</span>
              </div>

              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                market.demand === 'Peak' || market.demand === 'Global Ultra'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {market.demand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
