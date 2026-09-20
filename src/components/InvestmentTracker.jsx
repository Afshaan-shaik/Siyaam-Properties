import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Coins, 
  Clock, 
  Percent, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  Building, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export default function InvestmentTracker() {
  const [marketMode, setMarketMode] = useState('hubli'); // 'hubli' or 'dubai'
  const [investmentAmount, setInvestmentAmount] = useState(7500000); // 75 Lakhs default
  const [years, setYears] = useState(5);
  const [appreciationRate, setAppreciationRate] = useState(11.5); // 11.5% default for Hubli
  const [rentalYieldRate, setRentalYieldRate] = useState(4.5); // 4.5% default for Hubli

  // Handle market switch presets
  const handleMarketChange = (mode) => {
    setMarketMode(mode);
    if (mode === 'dubai') {
      setInvestmentAmount(15000000); // ~650k AED
      setAppreciationRate(9.0);
      setRentalYieldRate(7.8);
    } else {
      setInvestmentAmount(7500000);
      setAppreciationRate(11.5);
      setRentalYieldRate(4.5);
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    const P = investmentAmount;
    const r = appreciationRate / 100;
    const y = rentalYieldRate / 100;
    const n = years;

    // Compound future value
    const futureValue = P * Math.pow(1 + r, n);
    const capitalGain = futureValue - P;

    // Cumulative rental income (approximated with 5% annual rent escalation)
    let totalRentalIncome = 0;
    let currentRent = P * y;
    for (let i = 1; i <= n; i++) {
      totalRentalIncome += currentRent;
      currentRent *= 1.05;
    }

    const totalReturn = capitalGain + totalRentalIncome;
    const totalAssetAndCash = futureValue + totalRentalIncome;
    const totalRoiPercent = ((totalReturn / P) * 100).toFixed(1);

    // Yearly progression breakdown for visualization
    const yearlyBreakdown = [];
    let currentVal = P;
    let accumulatedRent = 0;
    let yearlyRent = P * y;
    for (let yr = 1; yr <= n; yr++) {
      currentVal = currentVal * (1 + r);
      accumulatedRent += yearlyRent;
      yearlyRent *= 1.05;
      yearlyBreakdown.push({
        year: `Year ${yr}`,
        assetValue: currentVal,
        rentEarned: accumulatedRent,
        total: currentVal + accumulatedRent
      });
    }

    return {
      futureValue,
      capitalGain,
      totalRentalIncome,
      totalReturn,
      totalAssetAndCash,
      totalRoiPercent,
      yearlyBreakdown
    };
  }, [investmentAmount, years, appreciationRate, rentalYieldRate]);

  // Format currency helper
  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} L`;
    }
    return `₹${Math.round(val).toLocaleString()}`;
  };

  return (
    <section id="investment-calculator" className="relative py-20 bg-obsidian-950 border-t border-white/10 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-gold-500/30 text-xs font-bold text-gold-300 tracking-wider uppercase font-heading">
            <Calculator className="w-3.5 h-3.5 text-gold-400" />
            <span>REAL-TIME CAPITAL & WEALTH SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Calculate Your <span className="text-gradient-gold">Projected Growth</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Simulate your capital gains, passive rental cashflows, and multi-year appreciation for Hubballi NA plots & luxury homes vs. tax-free Dubai real estate.
          </p>

          {/* Market Segment Toggle */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/10 shadow-inner mt-2">
            <button
              onClick={() => handleMarketChange('hubli')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                marketMode === 'hubli'
                  ? 'bg-gold-400 text-obsidian-950 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Hubballi-Dharwad Market</span>
            </button>
            <button
              onClick={() => handleMarketChange('dubai')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                marketMode === 'dubai'
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Dubai Tax-Free (Amniyat)</span>
            </button>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-base font-bold text-white font-heading">
                Investment Parameters
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-gold-300 border border-gold-500/20 font-mono font-medium">
                {marketMode === 'hubli' ? 'INR (₹)' : 'INR equivalent (₹)'}
              </span>
            </div>

            {/* Slider: Initial Investment */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Target Property Investment</label>
                <span className="text-base font-extrabold text-gold-300 font-heading">
                  {formatCurrency(investmentAmount)}
                </span>
              </div>
              <input
                type="range"
                min={2000000}
                max={30000000}
                step={500000}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>₹20 Lakhs</span>
                <span>₹1.5 Cr</span>
                <span>₹3.0 Cr</span>
              </div>
            </div>

            {/* Slider: Tenure Years */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Investment Horizon</label>
                <span className="text-base font-extrabold text-white font-heading">
                  {years} Years
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 7, 10].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      years === y
                        ? 'bg-gold-400 text-obsidian-950 font-black shadow-md'
                        : 'bg-slate-900 text-slate-300 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    {y} Yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Expected Capital Growth */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Annual Capital Growth Rate</label>
                <span className="text-base font-extrabold text-emerald-400 font-heading">
                  {appreciationRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={20}
                step={0.5}
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>5% (Conservative)</span>
                <span>12% (Hubli Avg)</span>
                <span>20% (High Growth Corridor)</span>
              </div>
            </div>

            {/* Slider: Rental Yield */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Expected Rental Yield</label>
                <span className="text-base font-extrabold text-sky-400 font-heading">
                  {rentalYieldRate}% Net
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={12}
                step={0.2}
                value={rentalYieldRate}
                onChange={(e) => setRentalYieldRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>2% (Bare Land)</span>
                <span>4.5% (Hubli Res)</span>
                <span>8%+ (Dubai / Comm)</span>
              </div>
            </div>

            {/* Siyaam Advisory Assurance */}
            <div className="p-3.5 rounded-2xl bg-gold-950/20 border border-gold-500/20 flex items-start gap-3 text-xs text-gold-200/90">
              <ShieldCheck className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Siyaam Guarantee:</strong> We personally verify all titles, approvals (NA KJP, CC, RERA/DLD), and ensure maximum resale liquidity.
              </span>
            </div>

          </div>

          {/* Results & Visual Analytics Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Total Projected Value
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-heading">
                  {formatCurrency(calculations.futureValue)}
                </div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{(calculations.futureValue - investmentAmount > 0) ? formatCurrency(calculations.capitalGain) : '₹0'} Capital Gain
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Cumulative Rent Earned
                </div>
                <div className="text-2xl sm:text-3xl font-black text-sky-400 font-heading">
                  {formatCurrency(calculations.totalRentalIncome)}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  Over {years} years with 5% escalation
                </div>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-gold-500/20 bg-gold-950/20 relative overflow-hidden">
                <div className="text-xs text-gold-300 uppercase tracking-wider font-semibold mb-1">
                  Total Estimated ROI
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gold-400 font-heading">
                  +{calculations.totalRoiPercent}%
                </div>
                <div className="text-[11px] text-gold-200/80 font-medium mt-1">
                  Net Wealth Multiple: {(calculations.totalAssetAndCash / investmentAmount).toFixed(2)}x
                </div>
              </div>

            </div>

            {/* Visual Year-by-Year Growth Chart */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold text-white font-heading">
                    Yearly Wealth Progression
                  </h4>
                  <p className="text-xs text-slate-400">
                    Asset appreciation compounding + cumulative cashflow
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold-400"></span> Property Value
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Rental Payout
                  </span>
                </div>
              </div>

              {/* Progress Bar Stack */}
              <div className="space-y-4 pt-2">
                {calculations.yearlyBreakdown.map((item, idx) => {
                  const maxVal = calculations.yearlyBreakdown[calculations.yearlyBreakdown.length - 1].total;
                  const assetWidth = (item.assetValue / maxVal) * 80;
                  const rentWidth = (item.rentEarned / maxVal) * 20;

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">{item.year}</span>
                        <span className="text-white font-mono">{formatCurrency(item.total)}</span>
                      </div>
                      <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex">
                        <div 
                          style={{ width: `${assetWidth}%` }} 
                          className="bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-500" 
                          title={`Asset: ${formatCurrency(item.assetValue)}`}
                        />
                        <div 
                          style={{ width: `${rentWidth}%` }} 
                          className="bg-gradient-to-r from-sky-500 to-sky-400 transition-all duration-500" 
                          title={`Rental: ${formatCurrency(item.rentEarned)}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Final CTA Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold">Ready to invest?</span> We curate pre-negotiated deals matching your exact target budget.
                </div>
                <a
                  href={`https://wa.me/918884969988?text=Hello%20Sameer%20ji,%20I%20used%20the%20Investment%20Tracker%20for%20a%20budget%20of%20${formatCurrency(investmentAmount)}%20over%20${years}%20years.%20Please%20share%20verified%20options.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-obsidian-950 bg-gold-400 hover:bg-gold-300 transition-colors shadow-lg"
                >
                  <span>Discuss Strategy with Founder</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
