import React, { useState, useMemo } from 'react';
import { Calculator, FileText, CheckCircle2, Info, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateTotalAcquisitionCost } from '../../services/financialCalculations';

export default function TrueCostCalculator({ isDark = true, property }) {
  const [basePrice, setBasePrice] = useState(property?.priceNumeric || 18500000);
  const [interiorPercent, setInteriorPercent] = useState(8); // 8% interior budget

  // Keep synced if property prop changes
  React.useEffect(() => {
    if (property?.priceNumeric) {
      setBasePrice(property.priceNumeric);
    }
  }, [property]);

  const costBreakdown = useMemo(() => {
    return calculateTotalAcquisitionCost(basePrice, interiorPercent);
  }, [basePrice, interiorPercent]);

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
              <Calculator className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              True Acquisition Cost & Government Duty Calculator
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Zero hidden costs. Exact Karnataka statutory stamp duty, registration & legal diligence breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Karnataka Stamp Act 2026 Ready</span>
          </span>
        </div>
      </div>

      {/* Interior Budget Slider */}
      <div className={`p-4 rounded-xl border mb-6 ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-slate-400 font-medium">Custom Interior & Furnishing Allowance</span>
          <span className="font-mono font-bold text-gold-400">
            {interiorPercent}% (₹{(costBreakdown.interiorFitout / 100000).toFixed(1)} Lakhs)
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={interiorPercent}
          onChange={(e) => setInteriorPercent(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>0% (Bare Shell)</span>
          <span>8% (Designer Luxury)</span>
          <span>20% (Ultra Bespoke)</span>
        </div>
      </div>

      {/* Itemized Cost Table */}
      <div className={`rounded-xl border overflow-hidden mb-6 ${
        isDark ? 'border-slate-800 bg-obsidian-950/60' : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="divide-y divide-slate-800/80 text-xs font-mono">
          
          {/* Base Agreement Price */}
          <div className="p-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400"></span>
              <span className="font-semibold text-slate-300">Base Agreement Property Value</span>
            </div>
            <span className="font-bold text-sm text-gold-400">
              ₹{(costBreakdown.basePrice).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Stamp Duty */}
          <div className="p-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="text-slate-400">Karnataka Stamp Duty (5.6%)</span>
            </div>
            <span className="font-bold text-cyan-400">
              ₹{costBreakdown.stampDuty.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Registration */}
          <div className="p-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span className="text-slate-400">Government Registration Fee (1.0%)</span>
            </div>
            <span className="font-bold text-indigo-400">
              ₹{costBreakdown.registration.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Legal Due Diligence */}
          <div className="p-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-400">Legal Title Search & Encumbrance Verification</span>
            </div>
            <span className="font-bold text-emerald-400">
              ₹{costBreakdown.legalClearance.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Interior & Fit-out */}
          <div className="p-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-slate-400">Interior Fit-out Budget ({interiorPercent}%)</span>
            </div>
            <span className="font-bold text-amber-400">
              ₹{costBreakdown.interiorFitout.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Grand Total */}
          <div className={`p-4 flex justify-between items-center font-bold text-sm ${
            isDark ? 'bg-black/60 text-white' : 'bg-slate-100 text-slate-900'
          }`}>
            <span className="font-heading uppercase tracking-wide text-xs text-gold-400">
              Total All-Inclusive Outlay
            </span>
            <span className="font-mono text-lg text-emerald-400">
              ₹{(costBreakdown.totalAcquisitionCost).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Note */}
      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 leading-relaxed">
        <Info className="w-3.5 h-3.5 text-gold-400 shrink-0" />
        <span>
          Siyaam Properties manages complete Khata transfer, 30-year Encumbrance Certificate (EC), and Sub-Registrar execution at no hidden brokerage.
        </span>
      </div>
    </div>
  );
}
