import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Percent, Calendar, ShieldCheck, ArrowRight, Globe } from 'lucide-react';
import { calculateInvestmentProjection } from '../../services/financialCalculations';

export default function InvestmentDashboard({ isDark = true }) {
  const [initialInvestment, setInitialInvestment] = useState(12000000); // 1.2 Cr default
  const [cagr, setCagr] = useState(9.5); // 9.5% annual appreciation
  const [rentalYield, setRentalYield] = useState(5.2); // 5.2% rental yield
  const [holdingYears, setHoldingYears] = useState(5); // 5 years

  const projectionData = useMemo(() => {
    return calculateInvestmentProjection(initialInvestment, cagr, rentalYield, holdingYears);
  }, [initialInvestment, cagr, rentalYield, holdingYears]);

  // Dubai comparison projection (8.5% yield + 11% appreciation, 0% tax)
  const dubaiProjection = useMemo(() => {
    return calculateInvestmentProjection(initialInvestment, 11.0, 8.4, holdingYears);
  }, [initialInvestment, holdingYears]);

  const finalYear = projectionData.projection[projectionData.projection.length - 1];
  const dubaiFinal = dubaiProjection.projection[dubaiProjection.projection.length - 1];

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
            <span className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/30">
              <DollarSign className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              Quantitative Investment & Yield Dashboard
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Forecast 5-10 year asset appreciation, cumulative rental cash flows, and Dubai tax-free ROI arbitrage.
          </p>
        </div>

        {/* Holding Horizon Selector */}
        <div className="flex items-center p-1 rounded-xl border border-slate-700/50 bg-black/20 text-xs font-mono">
          {[3, 5, 7, 10].map((yr) => (
            <button
              key={yr}
              onClick={() => setHoldingYears(yr)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                holdingYears === yr
                  ? 'bg-gold-500 text-black shadow-sm'
                  : isDark 
                    ? 'text-slate-400 hover:text-white' 
                    : 'text-slate-600 hover:text-black'
              }`}
            >
              {yr} Years
            </button>
          ))}
        </div>
      </div>

      {/* Control Sliders Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Initial Capital Outlay */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Capital Outlay</span>
            <span className="font-mono font-bold text-gold-400">
              ₹{(initialInvestment / 10000000 >= 1 ? (initialInvestment / 10000000).toFixed(2) + ' Cr' : (initialInvestment / 100000).toFixed(0) + ' Lakhs')}
            </span>
          </div>
          <input
            type="range"
            min="2500000"
            max="30000000"
            step="500000"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>₹25L</span>
            <span>₹1.5 Cr</span>
            <span>₹3.0 Cr</span>
          </div>
        </div>

        {/* Expected CAGR */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Annual Appreciation (CAGR)</span>
            <span className="font-mono font-bold text-emerald-400">+{cagr}%</span>
          </div>
          <input
            type="range"
            min="4"
            max="16"
            step="0.5"
            value={cagr}
            onChange={(e) => setCagr(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>4% (Conservative)</span>
            <span>9.5% (Hubli Avg)</span>
            <span>16% (Prime Growth)</span>
          </div>
        </div>

        {/* Target Rental Yield */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Gross Rental Yield</span>
            <span className="font-mono font-bold text-cyan-400">{rentalYield}%</span>
          </div>
          <input
            type="range"
            min="2.5"
            max="8.5"
            step="0.1"
            value={rentalYield}
            onChange={(e) => setRentalYield(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>2.5% (Bare Plot)</span>
            <span>5.2% (Resi)</span>
            <span>8.5% (Commercial)</span>
          </div>
        </div>
      </div>

      {/* Projection Metric Output Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-400 font-medium">Future Asset Value</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-gold-400 mt-1">
            ₹{(finalYear.propertyValue / 10000000 >= 1 ? (finalYear.propertyValue / 10000000).toFixed(2) + ' Cr' : (finalYear.propertyValue / 100000).toFixed(0) + ' L')}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">
            +₹{((finalYear.propertyValue - initialInvestment) / 100000).toFixed(0)}L Capital Gain
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-400 font-medium">Cumulative Rental Cash Flow</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-cyan-400 mt-1">
            ₹{(finalYear.cumulativeRental / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">
            Avg ₹{(finalYear.annualRental / 12000).toFixed(0)}k/month
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-400 font-medium">Total Net Wealth Gain</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400 mt-1">
            ₹{(finalYear.totalReturn / 100000).toFixed(0)} Lakhs
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">
            ROI: +{finalYear.netROI}%
          </div>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-400 font-medium">Dubai Tax-Free Equivalent</div>
          <div className="text-lg sm:text-xl font-mono font-bold text-indigo-400 mt-1">
            +{dubaiFinal.netROI}% Net ROI
          </div>
          <div className="text-[10px] text-indigo-300 font-mono mt-1">
            0% Tax Advantage
          </div>
        </div>
      </div>

      {/* Year-by-Year Growth Visualization */}
      <div className={`p-4 rounded-xl border mb-4 ${isDark ? 'bg-obsidian-950/40 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3 flex items-center justify-between">
          <span>{holdingYears}-Year Compounded Wealth Accumulation Curve</span>
          <span className="text-gold-400 text-[11px] lowercase">includes asset value + cumulative rent</span>
        </div>

        <div className="space-y-2">
          {projectionData.projection.map((item) => {
            const maxVal = finalYear.propertyValue + finalYear.cumulativeRental;
            const currentTotal = item.propertyValue + item.cumulativeRental;
            const widthPercent = (currentTotal / maxVal) * 100;

            return (
              <div key={item.year} className="flex items-center gap-3 text-xs font-mono">
                <span className="w-14 text-slate-400 shrink-0">Year {item.year}</span>
                <div className="flex-1 h-5 rounded-md bg-slate-800/40 overflow-hidden flex">
                  <div 
                    className="h-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${widthPercent}%` }}
                  ></div>
                </div>
                <span className="w-24 text-right font-bold text-gold-300 shrink-0">
                  ₹{(currentTotal / 10000000 >= 1 ? (currentTotal / 10000000).toFixed(2) + ' Cr' : (currentTotal / 100000).toFixed(0) + ' L')}
                </span>
                <span className="w-16 text-right text-emerald-400 text-[11px] shrink-0">
                  +{item.netROI}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dubai Arbitrage Banner */}
      <div className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isDark ? 'bg-gradient-to-r from-indigo-950/40 to-obsidian-900 border-indigo-900/40' : 'bg-indigo-50/50 border-indigo-200'
      }`}>
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-indigo-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white">Looking for Global Diversification?</span>
            <span className="text-slate-400 ml-1.5">
              Siyaam Properties' Dubai Desk with Amniyat provides 8.4%+ USD yields and 100% tax exemption.
            </span>
          </div>
        </div>
        <a
          href="https://wa.me/918884969988?text=Hello%20Sameer%20Kasim%20Shaikh,%20I%20want%20to%20know%20about%20Dubai%20investment%20opportunities%20and%200%25%20tax%20properties."
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 text-center transition-all shadow-md"
        >
          Consult Dubai Desk
        </a>
      </div>
    </div>
  );
}
