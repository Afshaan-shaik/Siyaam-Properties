import React, { useState } from 'react';
import { 
  GitCompare, 
  Plus, 
  X, 
  Check, 
  ShieldCheck, 
  Percent, 
  TrendingUp, 
  Sun, 
  MapPin, 
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { propertiesList } from '../../data/properties';
import { propertyDNAMapping } from '../../services/marketIntelligenceService';

export default function PropertyComparisonLab({ 
  isDark = true, 
  selectedProperties = [], 
  onRemoveProperty, 
  onAddProperty 
}) {
  // If no external selection passed, default to first 2 properties
  const [internalSelectedIds, setInternalSelectedIds] = useState(['sunset-villas', 'luxury-penthouse']);

  const activeIds = selectedProperties.length > 0 
    ? selectedProperties.map(p => p.id) 
    : internalSelectedIds;

  const currentProperties = propertiesList.filter(p => activeIds.includes(p.id));

  const handleRemove = (id) => {
    if (onRemoveProperty) {
      const prop = propertiesList.find(p => p.id === id);
      if (prop) onRemoveProperty(prop);
    } else {
      setInternalSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const handleAdd = (id) => {
    const prop = propertiesList.find(p => p.id === id);
    if (!prop) return;
    if (onAddProperty) {
      onAddProperty(prop);
    } else {
      if (!internalSelectedIds.includes(id) && internalSelectedIds.length < 4) {
        setInternalSelectedIds(prev => [...prev, id]);
      }
    }
  };

  const availableToAdd = propertiesList.filter(p => !activeIds.includes(p.id));

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
              <GitCompare className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              Multi-Asset Comparison Lab
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Side-by-side quantitative benchmarking across pricing, rental yields, capital growth & specifications.
          </p>
        </div>

        {/* Add Property Dropdown */}
        {activeIds.length < 4 && availableToAdd.length > 0 && (
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAdd(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors outline-none cursor-pointer ${
                isDark 
                  ? 'bg-obsidian-850 border-slate-700 text-slate-200 hover:border-gold-500/60' 
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              <option value="" disabled>+ Add Asset to Compare ({activeIds.length}/4)</option>
              {availableToAdd.map(p => (
                <option key={p.id} value={p.id}>{p.title} ({p.price})</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto pb-2">
        <div className={`grid grid-cols-${currentProperties.length + 1} min-w-[650px] divide-x ${
          isDark ? 'divide-slate-800 border-slate-800' : 'divide-slate-200 border-slate-200'
        } border rounded-xl overflow-hidden`}>
          
          {/* Left Column: Metric Names */}
          <div className={`p-4 space-y-4 text-xs font-medium ${isDark ? 'bg-obsidian-950/60 text-slate-400' : 'bg-slate-50 text-slate-600'}`}>
            <div className="h-44 flex items-end font-mono uppercase text-[11px] font-bold text-gold-400">
              Asset Identity
            </div>
            <div className="font-semibold">Price / Value</div>
            <div className="font-semibold">Area & Layout</div>
            <div className="font-semibold">Location / Sector</div>
            <div className="font-semibold">Gross Rental Yield</div>
            <div className="font-semibold">Capital Growth Rating</div>
            <div className="font-semibold">Sunlight Exposure</div>
            <div className="font-semibold">Title Clearance</div>
            <div className="font-semibold">Top Signature Feature</div>
            <div className="h-10"></div>
          </div>

          {/* Asset Columns */}
          {currentProperties.map((prop) => {
            const dna = propertyDNAMapping[prop.id] || {};
            return (
              <div
                key={prop.id}
                className={`p-4 space-y-4 text-xs ${
                  isDark ? 'bg-obsidian-850/40 text-slate-200' : 'bg-white text-slate-800'
                }`}
              >
                {/* Header Card with Image & Close Button */}
                <div className="h-44 flex flex-col justify-between relative">
                  {currentProperties.length > 1 && (
                    <button
                      onClick={() => handleRemove(prop.id)}
                      className="absolute top-0 right-0 p-1 rounded-full bg-black/60 text-slate-400 hover:text-white z-10 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-24 rounded-lg object-cover border border-slate-700/50"
                  />
                  <div>
                    <h5 className="font-bold text-xs truncate" title={prop.title}>
                      {prop.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {prop.tag}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="font-mono font-bold text-gold-400 text-sm">
                  {prop.price}
                </div>

                {/* Area */}
                <div className="font-mono">
                  {prop.area} {prop.bedrooms > 0 ? `(${prop.bedrooms} BHK)` : ''}
                </div>

                {/* Location */}
                <div className="truncate text-slate-300" title={prop.location}>
                  {prop.location.split(',')[0]}
                </div>

                {/* Rental Yield */}
                <div className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  <span>{dna.capRate || '7.0%'}</span>
                </div>

                {/* Capital Growth */}
                <div className="font-mono text-cyan-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Tier-1 Prime</span>
                </div>

                {/* Sunlight */}
                <div className="font-mono text-amber-400 flex items-center gap-1">
                  <Sun className="w-3 h-3" />
                  <span>{dna.sunlightExposure || 90}% ({dna.orientation ? dna.orientation.split(' ')[0] : 'East'})</span>
                </div>

                {/* Title */}
                <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Clear</span>
                </div>

                {/* Top feature */}
                <div className="text-[11px] truncate text-slate-400" title={prop.features[0]}>
                  {prop.features[0] || 'Prime Location'}
                </div>

                {/* Contact CTA */}
                <div className="h-10 flex items-center">
                  <a
                    href={`https://wa.me/918884969988?text=Hello%20Sameer%20Kasim%20Shaikh,%20I%20am%20comparing%20properties%20and%20interested%20in:%20${encodeURIComponent(prop.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 text-center text-xs font-bold rounded-lg bg-gold-500 hover:bg-gold-400 text-black transition-all shadow-sm"
                  >
                    Consult Sameer
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
