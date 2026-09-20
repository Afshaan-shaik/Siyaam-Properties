import React, { useState, useMemo } from 'react';
import { CreditCard, AlertCircle, CheckCircle2, TrendingDown, Percent, Clock, DollarSign, ShieldAlert } from 'lucide-react';
import { calculateEMI } from '../../services/financialCalculations';

export default function RentalAffordabilityCommand({ isDark = true, propertyPrice = 18500000 }) {
  const [monthlyIncome, setMonthlyIncome] = useState(350000); // 3.5 Lakhs / month
  const [downPaymentPercent, setDownPaymentPercent] = useState(25); // 25% down payment
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const principalLoan = propertyPrice - downPaymentAmount;

  // Calculate Base EMI
  const baseLoan = useMemo(() => {
    return calculateEMI(principalLoan, interestRate, tenureYears);
  }, [principalLoan, interestRate, tenureYears]);

  // Calculate Stressed EMI (+1.5% interest rate hike)
  const stressedLoan = useMemo(() => {
    return calculateEMI(principalLoan, interestRate + 1.5, tenureYears);
  }, [principalLoan, interestRate, tenureYears]);

  // Debt-to-Income Ratio (DTI)
  const dtiPercent = Math.round((baseLoan.monthlyEMI / monthlyIncome) * 100);
  const stressedDtiPercent = Math.round((stressedLoan.monthlyEMI / monthlyIncome) * 100);

  // Health status
  const isHealthy = dtiPercent <= 35;
  const isModerate = dtiPercent > 35 && dtiPercent <= 50;
  const isHighStress = dtiPercent > 50;

  // Estimated potential rental offset
  const estimatedRent = Math.round(propertyPrice * 0.045 / 12);
  const rentCoveragePercent = Math.min(Math.round((estimatedRent / baseLoan.monthlyEMI) * 100), 100);

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
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <CreditCard className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              Affordability, EMI & Interest Rate Stress-Tester
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Simulate monthly debt-to-income (DTI) health, loan amortizations & +150 bps interest rate rate shocks.
          </p>
        </div>

        {/* Health Status Pill */}
        <div>
          {isHealthy ? (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>HEALTHY DTI RATIO ({dtiPercent}%)</span>
            </span>
          ) : isModerate ? (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>MODERATE COMMITMENT ({dtiPercent}%)</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>HIGH DTI EXPOSURE ({dtiPercent}%)</span>
            </span>
          )}
        </div>
      </div>

      {/* Control Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Monthly Household Income */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Monthly Inflow</span>
            <span className="font-mono font-bold text-gold-400">
              ₹{(monthlyIncome / 100000).toFixed(1)} Lakhs
            </span>
          </div>
          <input
            type="range"
            min="100000"
            max="1200000"
            step="25000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>₹1L</span>
            <span>₹5L</span>
            <span>₹12L</span>
          </div>
        </div>

        {/* Down Payment % */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Down Payment</span>
            <span className="font-mono font-bold text-emerald-400">
              {downPaymentPercent}% (₹{(downPaymentAmount / 100000).toFixed(0)}L)
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="60"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>15%</span>
            <span>30%</span>
            <span>60%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Interest Rate (p.a.)</span>
            <span className="font-mono font-bold text-cyan-400">
              {interestRate}%
            </span>
          </div>
          <input
            type="range"
            min="7.5"
            max="12.0"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>7.5%</span>
            <span>8.5%</span>
            <span>12.0%</span>
          </div>
        </div>

        {/* Tenure Years */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400">Loan Tenure</span>
            <span className="font-mono font-bold text-indigo-400">
              {tenureYears} Years
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>5Y</span>
            <span>20Y</span>
            <span>30Y</span>
          </div>
        </div>
      </div>

      {/* Output Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Baseline Monthly EMI */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-xs text-slate-400 font-medium">Standard Monthly EMI</div>
          <div className="text-2xl font-mono font-bold text-gold-400 mt-1">
            ₹{baseLoan.monthlyEMI.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            {dtiPercent}% of your monthly take-home
          </div>
        </div>

        {/* RBI Rate Shock Stress (+150 bps) */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>Stress Test (+1.5% Shock)</span>
            <span className="text-amber-400 text-[10px] font-mono">{(interestRate + 1.5).toFixed(1)}% p.a.</span>
          </div>
          <div className="text-2xl font-mono font-bold text-amber-400 mt-1">
            ₹{stressedLoan.monthlyEMI.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-400/90 mt-1 font-mono">
            +₹{(stressedLoan.monthlyEMI - baseLoan.monthlyEMI).toLocaleString('en-IN')}/mo buffer needed
          </div>
        </div>

        {/* Rental Yield Offset */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-xs text-slate-400 font-medium">Rental Self-Financing Offset</div>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
            {rentCoveragePercent}% Covered
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">
            Est. rent ₹{estimatedRent.toLocaleString('en-IN')}/mo offsets EMI
          </div>
        </div>
      </div>

      {/* DTI Progress Bar */}
      <div className={`p-4 rounded-xl border ${isDark ? 'bg-obsidian-950/40 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center text-xs font-mono mb-2">
          <span className="text-slate-400">Monthly Debt-to-Income Exposure</span>
          <span className="font-bold text-gold-400">{dtiPercent}% of Income</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isHealthy ? 'bg-emerald-400' : isModerate ? 'bg-amber-400' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(dtiPercent, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
          <span>0%</span>
          <span>35% (Comfortable Banking Ceiling)</span>
          <span>50% (Max Safe Limit)</span>
        </div>
      </div>
    </div>
  );
}
