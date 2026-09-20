import React, { useState } from 'react';
import { MapPin, Layers, TrendingUp, DollarSign, Building, Navigation, Flame, Percent } from 'lucide-react';
import { microMarketHeatmapData } from '../../services/marketIntelligenceService';

const HEATMAP_LAYERS = [
  { id: 'price', label: 'Rate (₹/sq.ft)', icon: DollarSign },
  { id: 'demand', label: 'Demand Index', icon: Flame },
  { id: 'growth', label: '5Y Appreciation', icon: TrendingUp },
  { id: 'yield', label: 'Rental Yield', icon: Percent },
  { id: 'inventory', label: 'Inventory Supply', icon: Building },
  { id: 'infra', label: 'Infra Score', icon: Navigation }
];

export default function RealEstateHeatmap({ isDark = true, onSelectMarket }) {
  const [activeLayer, setActiveLayer] = useState('demand');
  const [selectedMarketId, setSelectedMarketId] = useState('vidyanagar');

  const selectedMarket = microMarketHeatmapData.find(m => m.id === selectedMarketId) || microMarketHeatmapData[0];

  // Heat color calculation based on metric intensity
  const getIntensityBadge = (market, layer) => {
    switch (layer) {
      case 'price':
        return {
          val: market.id === 'dubai-prime' ? 'AED 1,600/sqft' : `₹${market.avgPriceSqFt.toLocaleString()}/sqft`,
          color: market.avgPriceSqFt > 6000 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
        };
      case 'demand':
        return {
          val: `${market.demandScore}/100`,
          color: market.demandScore >= 92 ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
        };
      case 'growth':
        return {
          val: `+${market.capitalAppreciation5Y}%`,
          color: market.capitalAppreciation5Y >= 75 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
        };
      case 'yield':
        return {
          val: `${market.rentalYield}% Yield`,
          color: market.rentalYield >= 7.0 ? 'bg-gold-500/20 text-gold-300 border-gold-500/40' : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
        };
      case 'inventory':
        return {
          val: `${market.inventoryCount} Units`,
          color: 'bg-slate-500/20 text-slate-300 border-slate-500/40'
        };
      case 'infra':
        return {
          val: `${market.infraScore}/100`,
          color: market.infraScore >= 90 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
        };
      default:
        return { val: '', color: '' };
    }
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isDark 
        ? 'bg-obsidian-900/90 border-slate-800 text-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.6)]' 
        : 'bg-white border-slate-200 text-slate-900 shadow-xl'
    }`}>
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              Micro-Market Real Estate Heatmap Matrix
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Cross-sectional heat mapping of price gradients, capital velocity, and structural demand nodes.
          </p>
        </div>

        {/* Heat Layer Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-slate-700/50 bg-black/20 text-xs">
          {HEATMAP_LAYERS.map((layer) => {
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeLayer === layer.id
                    ? 'bg-gold-500 text-black font-bold shadow-sm'
                    : isDark 
                      ? 'text-slate-400 hover:text-white hover:bg-white/5' 
                      : 'text-slate-600 hover:text-black hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{layer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Heatmap Grid & Micro-Market Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {microMarketHeatmapData.map((market) => {
          const isSelected = selectedMarketId === market.id;
          const badge = getIntensityBadge(market, activeLayer);

          return (
            <div
              key={market.id}
              onClick={() => {
                setSelectedMarketId(market.id);
                if (onSelectMarket) onSelectMarket(market);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? 'border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]'
                  : isDark 
                    ? 'bg-obsidian-850/70 border-slate-800 hover:border-slate-700 hover:bg-obsidian-800' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-full bg-gold-500"></div>
              )}

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold text-sm tracking-tight">{market.name}</span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${badge.color}`}>
                  {badge.val}
                </span>
              </div>

              <div className={`text-xs mb-3 truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {market.category}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-800/60">
                <div>
                  <span className="text-slate-400">5Y Growth:</span>
                  <div className="text-emerald-400 font-bold">+{market.capitalAppreciation5Y}%</div>
                </div>
                <div>
                  <span className="text-slate-400">Rental Yield:</span>
                  <div className="text-gold-400 font-bold">{market.rentalYield}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Micro-Market Deep Intel Inspector */}
      <div className={`p-5 rounded-xl border ${
        isDark ? 'bg-obsidian-950/80 border-gold-500/30' : 'bg-slate-50 border-gold-500/40'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/40">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base">{selectedMarket.name} Sector Telemetry</h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {selectedMarket.priceBand}
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {selectedMarket.highlight}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="text-right">
              <div className="text-slate-400 text-[10px]">Active Developers</div>
              <div className="font-bold text-white">{selectedMarket.activeBuilders} Approved</div>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-[10px]">Supply Available</div>
              <div className="font-bold text-gold-400">{selectedMarket.inventoryCount} Properties</div>
            </div>
          </div>
        </div>

        {/* Hotspots Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800">
          <span className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Growth Epicenters & Hotspots:
          </span>
          {selectedMarket.hotspots.map((spot, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
            >
              📍 {spot}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
