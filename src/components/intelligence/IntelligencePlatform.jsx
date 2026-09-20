import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Compass, 
  Building2, 
  BarChart3, 
  Layers, 
  Boxes, 
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Cpu,
  MessageSquare,
  Phone
} from 'lucide-react';
import { propertiesList } from '../../data/properties';
import LiveMarketTicker from './LiveMarketTicker';
import PriceIntelligenceGraph from './PriceIntelligenceGraph';
import AIPropertyMatchEngine from './AIPropertyMatchEngine';
import RealEstateHeatmap from './RealEstateHeatmap';
import PropertyCard3D from './PropertyCard3D';
import DigitalTwin3DViewer from './DigitalTwin3DViewer';
import NeighborhoodIntelligence from './NeighborhoodIntelligence';
import InvestmentDashboard from './InvestmentDashboard';
import PropertyComparisonLab from './PropertyComparisonLab';
import InstantPropertyInsights from './InstantPropertyInsights';
import SunlightSimulator from './SunlightSimulator';
import PriceAnomalyDetector from './PriceAnomalyDetector';
import PropertyDNARadar from './PropertyDNARadar';
import TrueCostCalculator from './TrueCostCalculator';
import RentalAffordabilityCommand from './RentalAffordabilityCommand';
import PropertyDetailDossier from './PropertyDetailDossier';

export default function IntelligencePlatform({ onReturnHome }) {
  const [isDark, setIsDark] = useState(true);
  const [activeDossierProperty, setActiveDossierProperty] = useState(null);
  const [comparedProperties, setComparedProperties] = useState([propertiesList[0], propertiesList[1]]);
  const [activeFilterCategory, setActiveFilterCategory] = useState('all');

  const handleToggleCompare = (property) => {
    if (comparedProperties.some(p => p.id === property.id)) {
      setComparedProperties(prev => prev.filter(p => p.id !== property.id));
    } else {
      if (comparedProperties.length < 4) {
        setComparedProperties(prev => [...prev, property]);
      }
    }
  };

  const filteredListings = propertiesList.filter(p => {
    if (activeFilterCategory === 'all') return true;
    return p.category === activeFilterCategory;
  });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDark 
        ? 'bg-obsidian-950 text-slate-100 selection:bg-gold-500/30 selection:text-gold-200' 
        : 'bg-slate-50 text-slate-900 selection:bg-black selection:text-white'
    }`}>
      
      {/* 1. Master Navigation Header */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-xl transition-colors duration-300 ${
        isDark ? 'bg-obsidian-950/90 border-slate-800' : 'bg-white/95 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Brand & Perspective Identifier */}
          <div className="flex items-center gap-3">
            <button
              onClick={onReturnHome}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isDark 
                  ? 'bg-obsidian-850 hover:bg-obsidian-800 border-slate-700 text-gold-400 hover:text-gold-300' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}
              title="Return to the live production website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Current Website</span>
            </button>

            <div className="hidden sm:block h-5 w-px bg-slate-700/60"></div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="font-heading font-black tracking-tight text-sm text-gold-400">
                SIYAAM
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-500/30 font-bold uppercase">
                15-Component Intelligence Suite
              </span>
            </div>
          </div>

          {/* Right Actions: Telemetry + Theme Switcher */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>STANDALONE PREVIEW MODE ACTIVE</span>
            </div>

            {/* Day / Night Theme Switcher */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-obsidian-850 border-slate-700 text-gold-400 hover:text-gold-300' 
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-black'
              }`}
              title={isDark ? "Switch to Architectural Day Mode" : "Switch to Obsidian Gold Night Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Component 1: Sticky Live Market Ticker */}
      <LiveMarketTicker isDark={isDark} />

      {/* Sub-Header Quick-Jump Modules Nav Bar */}
      <div className={`border-b overflow-x-auto py-2 px-4 scrollbar-none text-xs font-mono font-medium ${
        isDark ? 'bg-obsidian-900/60 border-slate-800/80 text-slate-400' : 'bg-slate-100/80 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          <span className="text-gold-400 font-bold uppercase text-[11px] mr-1">
            Jump to System:
          </span>
          {[
            { id: 'ai-search', label: '1. AI Match Engine' },
            { id: 'price-graph', label: '2. Price Curve' },
            { id: 'heatmap', label: '3. Heatmap Matrix' },
            { id: 'digital-twin', label: '4. 3D Digital Twin' },
            { id: 'solar-arc', label: '5. Sunlight Simulator' },
            { id: '3d-cards', label: '6. 3D Asset Cards' },
            { id: 'invest-dashboard', label: '7. Yield Dashboard' },
            { id: 'compare-lab', label: '8. Comparison Lab' },
            { id: 'true-cost', label: '9. True Cost & Taxes' },
            { id: 'affordability', label: '10. Loan Stress-Test' },
            { id: 'neighborhood', label: '11. Transit Radar' },
            { id: 'dna-radar', label: '12. DNA Spider' },
            { id: 'anomaly', label: '13. Anomaly Scanner' },
          ].map(mod => (
            <button
              key={mod.id}
              onClick={() => scrollToSection(mod.id)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                isDark 
                  ? 'hover:bg-obsidian-800 hover:text-white' 
                  : 'hover:bg-slate-200 hover:text-black'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Showcase Workspace */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        
        {/* Hero Section Banner */}
        <section className={`p-8 rounded-3xl border relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark 
            ? 'bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border-slate-800' 
            : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200 shadow-xl'
        }`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/10 text-gold-300 border border-gold-500/30 mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Next-Generation Real Estate Intelligence Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight">
              Fintech Valuation & <br className="hidden sm:inline" />
              <span className="text-gradient-gold">Architectural Intelligence Suite</span>
            </h1>
            <p className={`text-sm sm:text-base mt-3 max-w-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Review all 15 intelligent systems in isolation without impacting your live website. 
              Equipped with natural language AI property matching, interactive 3D spatial twins, 
              micro-market heatmaps, statutory tax calculators, and real-time registry feeds.
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <button
              onClick={() => setActiveDossierProperty(propertiesList[0])}
              className="px-6 py-3 rounded-xl font-heading font-bold text-sm bg-gold-500 hover:bg-gold-400 text-black transition-all shadow-[0_4px_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Live Dossier</span>
            </button>
            <button
              onClick={onReturnHome}
              className={`px-6 py-3 rounded-xl font-heading font-semibold text-xs border transition-all text-center ${
                isDark 
                  ? 'border-slate-700 text-slate-300 hover:bg-white/5' 
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Return to Current Website
            </button>
          </div>
        </section>

        {/* Section 1: AI Natural Language Match Engine */}
        <section id="ai-search">
          <AIPropertyMatchEngine 
            isDark={isDark} 
            onSelectProperty={(prop) => setActiveDossierProperty(prop)} 
          />
        </section>

        {/* Section 2: Historical Pricing & Micro-Market Heatmap */}
        <section className="grid grid-cols-1 gap-8">
          <div id="price-graph">
            <PriceIntelligenceGraph isDark={isDark} />
          </div>

          <div id="heatmap">
            <RealEstateHeatmap isDark={isDark} />
          </div>
        </section>

        {/* Section 3: 3D Digital Twin & Sunlight Simulator */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div id="digital-twin">
            <DigitalTwin3DViewer isDark={isDark} />
          </div>

          <div id="solar-arc">
            <SunlightSimulator isDark={isDark} propertyTitle={propertiesList[0].title} />
          </div>
        </section>

        {/* Section 4: 3D Interactive Property Gallery */}
        <section id="3d-cards">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/30">
                  <Boxes className="w-4 h-4" />
                </span>
                <h3 className="font-heading text-xl font-bold">
                  Curated 3D Property Showcase
                </h3>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Hover over cards for 3D perspective tilt. Click to inspect the full 15-point intelligence dossier.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-slate-700/50 bg-black/20 text-xs font-mono">
              {[
                { id: 'all', label: 'All' },
                { id: 'residential', label: 'Residential' },
                { id: 'luxury', label: 'Luxury' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'plots', label: 'Plots' },
                { id: 'dubai', label: 'Dubai Desk' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilterCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeFilterCategory === cat.id
                      ? 'bg-gold-500 text-black font-bold shadow-sm'
                      : isDark 
                        ? 'text-slate-400 hover:text-white' 
                        : 'text-slate-600 hover:text-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(prop => (
              <PropertyCard3D
                key={prop.id}
                property={prop}
                isDark={isDark}
                onInspect={(p) => setActiveDossierProperty(p)}
                onToggleCompare={handleToggleCompare}
                isCompared={comparedProperties.some(cp => cp.id === prop.id)}
              />
            ))}
          </div>
        </section>

        {/* Section 5: Financial Intelligence & Comparison Lab */}
        <section className="space-y-8">
          <div id="invest-dashboard">
            <InvestmentDashboard isDark={isDark} />
          </div>

          <div id="compare-lab">
            <PropertyComparisonLab
              isDark={isDark}
              selectedProperties={comparedProperties}
              onRemoveProperty={(p) => handleToggleCompare(p)}
              onAddProperty={(p) => handleToggleCompare(p)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div id="true-cost">
              <TrueCostCalculator isDark={isDark} property={propertiesList[0]} />
            </div>

            <div id="affordability">
              <RentalAffordabilityCommand isDark={isDark} propertyPrice={propertiesList[0].priceNumeric} />
            </div>
          </div>
        </section>

        {/* Section 6: Micro-Market & Asset Deep-Dive Diagnostics */}
        <section className="space-y-8">
          <div id="neighborhood">
            <NeighborhoodIntelligence isDark={isDark} propertyTitle={propertiesList[0].title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div id="dna-radar">
              <PropertyDNARadar isDark={isDark} property={propertiesList[0]} />
            </div>

            <div id="anomaly">
              <PriceAnomalyDetector isDark={isDark} property={propertiesList[0]} />
            </div>
          </div>
        </section>

        {/* Section 7: Consultation Desk & Review Controls */}
        <section className={`p-8 rounded-3xl border text-center relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-b from-obsidian-900 to-obsidian-950 border-gold-500/30' 
            : 'bg-white border-gold-500/40 shadow-2xl'
        }`}>
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/10 text-gold-300 border border-gold-500/30">
              Siyaam Properties Executive Advisory Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black">
              Ready to Upgrade or Request Adjustments?
            </h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              You are currently viewing this standalone intelligence preview without any impact on your live website. 
              Review the 15 components, test the interactive inputs, and let us know your feedback.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://wa.me/918884969988?text=Hello%20Sameer,%20I%20have%20reviewed%20the%2015%20Intelligence%20Components%20on%20the%20preview%20page."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-heading font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Sameer (+91 8884969988)</span>
              </a>

              <a
                href="tel:+918884969988"
                className={`px-6 py-3 rounded-xl font-heading font-bold text-sm border transition-all flex items-center gap-2 ${
                  isDark ? 'border-slate-700 hover:bg-white/5 text-slate-200' : 'border-slate-300 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Sameer (+91 8884969988)</span>
              </a>

              <button
                onClick={onReturnHome}
                className="px-6 py-3 rounded-xl font-heading font-bold text-sm bg-gold-500 hover:bg-gold-400 text-black transition-all shadow-md"
              >
                ← Return to Current Website
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Deep Analytical Dossier Modal */}
      {activeDossierProperty && (
        <PropertyDetailDossier
          property={activeDossierProperty}
          isDark={isDark}
          onClose={() => setActiveDossierProperty(null)}
        />
      )}

    </div>
  );
}
