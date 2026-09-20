import React from 'react';
import { Target, Shield, Compass, Sparkles } from 'lucide-react';
import { propertyDNAMapping } from '../../services/marketIntelligenceService';

const AXES = [
  { key: 'spaceEfficiency', label: 'Space Efficiency' },
  { key: 'connectivity', label: 'Connectivity' },
  { key: 'rentalYield', label: 'Rental Yield' },
  { key: 'appreciation', label: 'Appreciation' },
  { key: 'amenities', label: 'Amenities' },
  { key: 'lifestyle', label: 'Lifestyle Index' }
];

export default function PropertyDNARadar({ isDark = true, property }) {
  const dna = (property && propertyDNAMapping[property.id]) || {
    spaceEfficiency: 94,
    connectivity: 90,
    rentalYield: 86,
    appreciation: 92,
    amenities: 95,
    lifestyle: 96
  };

  const center = 160;
  const radius = 100;
  const totalAxes = AXES.length;

  // Calculate coordinates for polygon
  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Outer web polygon rings (25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1.0];

  // Property data polygon path
  const points = AXES.map((axis, i) => {
    const val = dna[axis.key] || 85;
    const { x, y } = getCoordinates(i, val);
    return `${x},${y}`;
  }).join(' ');

  // Calculate average overall DNA score
  const avgScore = Math.round(
    AXES.reduce((acc, a) => acc + (dna[a.key] || 85), 0) / AXES.length
  );

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isDark 
        ? 'bg-obsidian-900/90 border-slate-800 text-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.6)]' 
        : 'bg-white border-slate-200 text-slate-900 shadow-xl'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/30">
              <Target className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              Property Investment DNA Radar (6-Axis)
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Multivariate spider matrix analyzing space layout, connectivity, cash flow & capital preservation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-500/40">
            DNA Score: {avgScore} / 100
          </span>
        </div>
      </div>

      {/* Center Radar Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* SVG Radar Spider (7 Cols) */}
        <div className="md:col-span-7 flex justify-center py-2">
          <svg width="320" height="320" className="overflow-visible select-none">
            <defs>
              <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d4af37" stopOpacity={isDark ? "0.45" : "0.3"} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={isDark ? "0.2" : "0.1"} />
              </linearGradient>
            </defs>

            {/* Background concentric web rings */}
            {rings.map((ratio, rIdx) => {
              const ringPoints = AXES.map((_, i) => {
                const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                const r = ratio * radius;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              }).join(' ');

              return (
                <polygon
                  key={rIdx}
                  points={ringPoints}
                  fill="none"
                  stroke={isDark ? "#1e293b" : "#e2e8f0"}
                  strokeWidth="1"
                  strokeDasharray={ratio < 1 ? "2 2" : "none"}
                />
              );
            })}

            {/* Axis Radial Spokes */}
            {AXES.map((axis, i) => {
              const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              const labelX = center + (radius + 24) * Math.cos(angle);
              const labelY = center + (radius + 24) * Math.sin(angle);

              return (
                <g key={i}>
                  <line
                    x1={center}
                    y1={center}
                    x2={x2}
                    y2={y2}
                    stroke={isDark ? "#334155" : "#cbd5e1"}
                    strokeWidth="1"
                  />
                  <text
                    x={labelX}
                    y={labelY + 4}
                    textAnchor="middle"
                    fill={isDark ? "#94a3b8" : "#475569"}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {axis.label}
                  </text>
                </g>
              );
            })}

            {/* Property Data Area Polygon */}
            <polygon
              points={points}
              fill="url(#radarFill)"
              stroke="#d4af37"
              strokeWidth="2.5"
            />

            {/* Vertex Markers */}
            {AXES.map((axis, i) => {
              const val = dna[axis.key] || 85;
              const { x, y } = getCoordinates(i, val);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4.5"
                  fill="#ffffff"
                  stroke="#d4af37"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>

        {/* Breakdown Metric Tiles (5 Cols) */}
        <div className="md:col-span-5 space-y-2 text-xs font-mono">
          {AXES.map((axis) => {
            const val = dna[axis.key] || 85;
            return (
              <div
                key={axis.key}
                className={`p-2.5 rounded-lg border flex items-center justify-between ${
                  isDark ? 'bg-obsidian-850/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-slate-400 text-[11px]">{axis.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-500 to-amber-300"
                      style={{ width: `${val}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-gold-400 w-8 text-right">{val}%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
