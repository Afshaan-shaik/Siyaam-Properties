import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Maximize2, 
  TrendingUp, 
  Sun, 
  Percent, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckSquare, 
  Square,
  MessageSquare
} from 'lucide-react';
import { propertyDNAMapping } from '../../services/marketIntelligenceService';

export default function PropertyCard3D({ 
  property, 
  isDark = true, 
  onInspect, 
  onToggleCompare, 
  isCompared = false 
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const dna = propertyDNAMapping[property.id] || {
    rentalYield: 85,
    appreciation: 90,
    sunlightExposure: 92,
    anomalyScore: -4.5,
    capRate: "6.8%"
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isBargain = dna.anomalyScore < -3.0;

  return (
    <div 
      className="perspective-1000 transition-all"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`relative rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
          isDark 
            ? 'bg-obsidian-900/90 border-slate-800 hover:border-gold-500/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)]' 
            : 'bg-white border-slate-200 hover:border-gold-500 shadow-xl'
        }`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top Image Section with Live Badges */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/30"></div>

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-gold-300 border border-gold-500/30">
              {property.tag}
            </span>
            {isBargain && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 animate-pulse">
                BARGAIN {Math.abs(dna.anomalyScore)}% UNDER
              </span>
            )}
          </div>

          {/* Compare Toggle Button */}
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property);
              }}
              className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md transition-all ${
                isCompared
                  ? 'bg-gold-500 text-black shadow-lg font-bold'
                  : 'bg-black/60 text-slate-300 hover:text-white border border-white/20'
              }`}
              title="Add to Comparison Lab"
            >
              {isCompared ? (
                <CheckSquare className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Bottom Overlay Price & Area */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
            <div>
              <div className="text-xl font-heading font-black text-gold-400 drop-shadow-md">
                {property.price}
              </div>
              <div className="text-[11px] text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold-400 shrink-0" />
                <span className="truncate max-w-[200px]">{property.location.split(',')[0]}</span>
              </div>
            </div>
            <div className="text-right text-xs font-mono bg-black/60 px-2 py-1 rounded border border-white/10 backdrop-blur-md">
              {property.area}
            </div>
          </div>
        </div>

        {/* Intelligence Telemetry Strip */}
        <div className={`px-4 py-2.5 border-y grid grid-cols-3 gap-2 text-center text-xs font-mono ${
          isDark ? 'bg-obsidian-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="text-[10px] text-slate-400">Rental Yield</div>
            <div className="text-emerald-400 font-bold flex items-center justify-center gap-0.5">
              <Percent className="w-3 h-3" />
              <span>{dna.capRate || '7.2%'}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400">Sunlight Index</div>
            <div className="text-gold-400 font-bold flex items-center justify-center gap-0.5">
              <Sun className="w-3 h-3" />
              <span>{dna.sunlightExposure}%</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400">Capital Growth</div>
            <div className="text-cyan-400 font-bold flex items-center justify-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>Tier 1</span>
            </div>
          </div>
        </div>

        {/* Card Body & Features */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-heading font-bold text-base mb-1 hover:text-gold-400 transition-colors">
              {property.title}
            </h4>
            <p className={`text-xs line-clamp-2 mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {property.description}
            </p>

            {/* Micro feature pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {property.features.slice(0, 3).map((feat, i) => (
                <span
                  key={i}
                  className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                    isDark 
                      ? 'bg-obsidian-800/60 border-slate-700/60 text-slate-300' 
                      : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onInspect && onInspect(property)}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-gold-500 hover:bg-gold-400 text-black transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Full Intelligence Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`https://wa.me/918884969988?text=Hello%20Sameer%20Kasim%20Shaikh,%20I%20want%20to%20inquire%20about%20the%20property:%20${encodeURIComponent(property.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md"
              title="Direct WhatsApp with Sameer Kasim Shaikh"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
