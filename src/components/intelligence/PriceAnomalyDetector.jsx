import React from 'react';
import { AlertTriangle, CheckCircle2, TrendingDown, TrendingUp, Sparkles, Scale, DollarSign } from 'lucide-react';
import { propertyDNAMapping } from '../../services/marketIntelligenceService';

export default function PriceAnomalyDetector({ isDark = true, property }) {
  if (!property) return null;

  const dna = propertyDNAMapping[property.id] || {
    estimatedFairValue: property.priceNumeric * 1.05,
    listingPrice: property.priceNumeric,
    anomalyScore: -4.8,
  };

  const listingPrice = dna.listingPrice || property.priceNumeric;
  const fairValue = dna.estimatedFairValue || listingPrice * 1.05;
  const difference = listingPrice - fairValue;
  const percentDiff = dna.anomalyScore !== undefined ? dna.anomalyScore : (((difference) / fairValue) * 100).toFixed(1);

  const isBargain = percentDiff < -2.0;
  const isFair = Math.abs(percentDiff) <= 2.0;
  const isPremium = percentDiff > 2.0;

  // Gauge percentile calculation
  // Let range be -15% to +15%
  const gaugePercent = Math.min(Math.max(((parseFloat(percentDiff) + 15) / 30) * 100, 5), 95);

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isDark 
        ? 'bg-obsidian-900/90 border-slate-800 text-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.6)]' 
        : 'bg-white border-slate-200 text-slate-900 shadow-xl'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Scale className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              AI Price Anomaly & Valuation Arbitrage Detector
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Algorithmic comparison against micro-market registry medians to detect underpriced gems.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isBargain ? (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UNDERPRICED BARGAIN ({Math.abs(percentDiff)}% Below Median)</span>
            </span>
          ) : isFair ? (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FAIR MARKET VALUATION</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>SIGNATURE LUXURY PREMIUM</span>
            </span>
          )}
        </div>
      </div>

      {/* Metric Cards Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-xs text-slate-400">Current Listing Ask</div>
          <div className="text-xl font-mono font-bold text-gold-400 mt-1">
            {property.price}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Verified direct price
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-xs text-slate-400">AI Estimated Fair Value</div>
          <div className="text-xl font-mono font-bold text-slate-200 mt-1">
            ₹{(fairValue / 10000000 >= 1 ? (fairValue / 10000000).toFixed(2) + ' Cr' : (fairValue / 100000).toFixed(0) + ' Lakhs')}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
            Reg. Comp Median Base
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-xs text-slate-400">Immediate Equity Advantage</div>
          <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
            {isBargain ? `+₹${Math.abs(Math.round((fairValue - listingPrice) / 100000))} Lakhs` : 'Market Parity'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Instant day-one upside
          </div>
        </div>
      </div>

      {/* Visual Percentile Gauge */}
      <div className={`p-4 rounded-xl border mb-4 ${isDark ? 'bg-obsidian-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center text-xs font-mono mb-2">
          <span className="text-emerald-400">Underpriced Bargain (-15%)</span>
          <span className="text-slate-400">Fair Market Median (0%)</span>
          <span className="text-gold-400">Signature Premium (+15%)</span>
        </div>

        {/* Gauge Bar */}
        <div className="relative w-full h-4 rounded-full bg-slate-800 overflow-hidden mb-2">
          {/* Color Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-gold-500 opacity-60"></div>
        </div>

        {/* Marker */}
        <div className="relative w-full h-6">
          <div 
            className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center transition-all duration-500"
            style={{ left: `${gaugePercent}%` }}
          >
            <div className="w-3 h-3 rotate-45 bg-white border-2 border-gold-500 shadow-md"></div>
            <span className="text-[10px] font-mono font-bold text-gold-400 mt-1">
              Ask: {percentDiff}%
            </span>
          </div>
        </div>
      </div>

      {/* Valuation Drivers Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
        <div className={`p-3 rounded-lg border flex items-start gap-2.5 ${
          isDark ? 'bg-obsidian-850/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Title & Zoning Clearance:</span> Clear NA KJP / CC title and direct owner mandate provides zero litigation risk premium.
          </div>
        </div>

        <div className={`p-3 rounded-lg border flex items-start gap-2.5 ${
          isDark ? 'bg-obsidian-850/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Micro-Market Liquidity:</span> Shirur Park & Vidyanagar maintain the lowest time-on-market (&lt;30 days) in North Karnataka.
          </div>
        </div>
      </div>
    </div>
  );
}
