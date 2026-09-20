import React, { useState } from 'react';
import { 
  Navigation, 
  Car, 
  Bus, 
  Footprints, 
  Hospital, 
  GraduationCap, 
  Plane, 
  Train, 
  ShoppingBag, 
  ShieldCheck,
  Clock
} from 'lucide-react';

const INFRA_NODES = [
  {
    id: 'airport',
    name: 'Hubballi Airport (HBX)',
    category: 'Aviation Terminal',
    icon: Plane,
    distanceKm: 5.2,
    driveMin: 12,
    transitMin: 22,
    walkMin: 65,
    highlight: 'Direct flights to Mumbai, Bengaluru, Delhi, Hyderabad, Chennai & Goa'
  },
  {
    id: 'railway',
    name: 'Hubballi Junction (SWR HQ)',
    category: 'Railway Terminus',
    icon: Train,
    distanceKm: 2.4,
    driveMin: 6,
    transitMin: 12,
    walkMin: 28,
    highlight: 'World’s Longest Railway Platform (Shree Siddharoodha Swamiji Station)'
  },
  {
    id: 'hospital',
    name: 'KLE Suchirayu & KLES Hospital',
    category: 'Super-Speciality Healthcare',
    icon: Hospital,
    distanceKm: 1.5,
    driveMin: 4,
    transitMin: 8,
    walkMin: 18,
    highlight: '24/7 Level-1 Trauma, multi-organ transplant & cardiac center'
  },
  {
    id: 'university',
    name: 'KLE Tech University (BVB)',
    category: 'Elite Higher Education',
    icon: GraduationCap,
    distanceKm: 1.8,
    driveMin: 5,
    transitMin: 10,
    walkMin: 22,
    highlight: 'Ranked top engineering university in Karnataka, premier tech research'
  },
  {
    id: 'brts',
    name: 'Hubli-Dharwad BRTS High-Speed Corridor',
    category: 'Dedicated Rapid Transit',
    icon: Bus,
    distanceKm: 0.6,
    driveMin: 2,
    transitMin: 3,
    walkMin: 7,
    highlight: 'Green air-conditioned electric express buses linking Twin Cities every 3 mins'
  },
  {
    id: 'retail',
    name: 'Urban Oasis Mall & Commercial Hub',
    category: 'Retail & Entertainment',
    icon: ShoppingBag,
    distanceKm: 1.9,
    driveMin: 5,
    transitMin: 10,
    walkMin: 24,
    highlight: 'Multiplex cinemas, lifestyle department stores, fine dining avenue'
  }
];

export default function NeighborhoodIntelligence({ isDark = true, propertyTitle = "Sunset Luxury Villa (Shirur Park)" }) {
  const [commuteMode, setCommuteMode] = useState('drive'); // 'drive' | 'transit' | 'walk'

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
              <Navigation className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              Neighborhood & Transit Intelligence Radar
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Accurate commute metrics, transit accessibility, and social infrastructure ratings.
          </p>
        </div>

        {/* Commute Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-slate-700/50 bg-black/20 text-xs font-mono">
          {[
            { id: 'drive', label: 'Drive', icon: Car },
            { id: 'transit', label: 'BRTS / Bus', icon: Bus },
            { id: 'walk', label: 'Walk', icon: Footprints },
          ].map(m => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setCommuteMode(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  commuteMode === m.id
                    ? 'bg-gold-500 text-black font-bold shadow-sm'
                    : isDark 
                      ? 'text-slate-400 hover:text-white' 
                      : 'text-slate-600 hover:text-black'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Livability Scores Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className={`p-3 rounded-xl border ${isDark ? 'bg-obsidian-850/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-400 font-medium">Walkability Score</div>
          <div className="text-xl font-mono font-bold text-emerald-400 mt-0.5">88 / 100</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Very Walkable</div>
        </div>

        <div className={`p-3 rounded-xl border ${isDark ? 'bg-obsidian-850/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-400 font-medium">Transit Access</div>
          <div className="text-xl font-mono font-bold text-cyan-400 mt-0.5">92 / 100</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Direct BRTS Spine</div>
        </div>

        <div className={`p-3 rounded-xl border ${isDark ? 'bg-obsidian-850/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-400 font-medium">Healthcare Density</div>
          <div className="text-xl font-mono font-bold text-indigo-400 mt-0.5">&lt; 5 mins</div>
          <div className="text-[10px] text-slate-400 mt-0.5">KLES & Suchirayu</div>
        </div>

        <div className={`p-3 rounded-xl border ${isDark ? 'bg-obsidian-850/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[11px] text-slate-400 font-medium">Safety Rating</div>
          <div className="text-xl font-mono font-bold text-gold-400 mt-0.5">A+ Prime</div>
          <div className="text-[10px] text-slate-400 mt-0.5">CCTV & Gated Security</div>
        </div>
      </div>

      {/* Infrastructure Nodes Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {INFRA_NODES.map((node) => {
          const Icon = node.icon;
          const time = commuteMode === 'drive' ? node.driveMin : commuteMode === 'transit' ? node.transitMin : node.walkMin;

          return (
            <div
              key={node.id}
              className={`p-4 rounded-xl border transition-all duration-300 hover:border-gold-500/50 ${
                isDark 
                  ? 'bg-obsidian-850/70 border-slate-800' 
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs">{node.name}</h5>
                    <span className="text-[10px] text-slate-400">{node.category}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    <span>{time} min</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {node.distanceKm} km
                  </div>
                </div>
              </div>

              <div className={`text-[11px] pt-2 border-t mt-2 leading-relaxed ${
                isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
              }`}>
                {node.highlight}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
