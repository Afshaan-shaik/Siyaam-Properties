import React from 'react';
import { Activity, ShieldCheck, TrendingUp, Zap, Clock, Users, Flame, ArrowUpRight } from 'lucide-react';
import { propertyDNAMapping } from '../../services/marketIntelligenceService';

export default function InstantPropertyInsights({ isDark = true, property }) {
  if (!property) return null;

  const dna = propertyDNAMapping[property.id] || {
    liquidityScore: "A+",
    capRate: "6.8%",
    buyerInquiryVelocity: "+32% weekly",
    anomalyScore: -4.2,
    walkScore: 88
  };

  const isBargain = dna.anomalyScore < -2.0;

  return (
    <div className={`p-4 rounded-xl border transition-all duration-300 ${
      isDark 
        ? 'bg-obsidian-950/80 border-slate-800 text-slate-100 shadow-lg' 
        : 'bg-white border-slate-200 text-slate-900 shadow-md'
    }`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-gold-500/20 text-gold-400">
            <Zap className="w-3.5 h-3.5" />
          </span>
          <span className="font-mono font-bold uppercase tracking-wider text-[11px] text-slate-300">
            INSTANT PROPERTY TELEMETRY: {property.title}
          </span>
        </div>
        <div className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          REAL-TIME INDEX
        </div>
      </div>

      {/* Telemetry Metric Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Liquidity Index */}
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-obsidian-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>LIQUIDITY</span>
            <Activity className="w-3 h-3 text-cyan-400" />
          </div>
          <div className="text-base font-mono font-bold text-cyan-400 mt-1">
            {dna.liquidityScore}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Avg DOM &lt; 28 Days
          </div>
        </div>

        {/* Valuation Arbitrage */}
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-obsidian-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>ARBITRAGE</span>
            <Flame className="w-3 h-3 text-emerald-400" />
          </div>
          <div className={`text-base font-mono font-bold mt-1 ${isBargain ? 'text-emerald-400' : 'text-gold-400'}`}>
            {dna.anomalyScore}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isBargain ? 'Below Market Median' : 'Fair Market Value'}
          </div>
        </div>

        {/* Cap Rate */}
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-obsidian-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>EST. CAP RATE</span>
            <TrendingUp className="w-3 h-3 text-gold-400" />
          </div>
          <div className="text-base font-mono font-bold text-gold-400 mt-1">
            {dna.capRate}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Annual Net Flow
          </div>
        </div>

        {/* Inquiry Velocity */}
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-obsidian-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>BUYER TRAFFIC</span>
            <Users className="w-3 h-3 text-indigo-400" />
          </div>
          <div className="text-base font-mono font-bold text-indigo-400 mt-1">
            {dna.buyerInquiryVelocity.split(' ')[0]}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Active Verified Leads
          </div>
        </div>
      </div>
    </div>
  );
}
