import React, { useState } from 'react';
import { Sun, Moon, Compass, Sparkles, Eye, ShieldCheck } from 'lucide-react';

export default function SunlightSimulator({ isDark = true, propertyTitle = "Sunset Luxury Villa" }) {
  // Time represented as hour from 6.0 (6:00 AM) to 18.0 (6:00 PM)
  const [timeHour, setTimeHour] = useState(11.5); // 11:30 AM default

  // Format decimal hour to 12-hour AM/PM string
  const formatTime = (h) => {
    const hours = Math.floor(h);
    const minutes = Math.round((h - hours) * 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const displayMin = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHour}:${displayMin} ${period}`;
  };

  // Sun angle calculation (-90 deg at 6 AM, 0 deg at noon, +90 deg at 6 PM)
  const sunProgress = (timeHour - 6) / 12; // 0 to 1
  const sunAngleDeg = (sunProgress - 0.5) * 160; // -80 to +80 deg
  
  // Shadow length & direction
  const shadowLength = Math.max(Math.abs(sunProgress - 0.5) * 80, 15);
  const shadowDirection = sunProgress < 0.5 ? 'shadow-right' : 'shadow-left';

  // Sunlight intensity index
  const sunIntensity = Math.sin(sunProgress * Math.PI) * 100;
  const isGoldenHour = (timeHour >= 16.5 && timeHour <= 18.0) || (timeHour >= 6.0 && timeHour <= 7.5);

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
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sun className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              6:00 AM – 6:00 PM Solar Arc & Sunlight Simulator
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Simulate dynamic solar trajectory, shadow dispersion, Vastu orientation & balcony Golden Hour exposure.
          </p>
        </div>

        {/* Live Time Badge */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-gold-500/40 text-gold-400 font-bold flex items-center gap-1.5">
            <Sun className={`w-4 h-4 ${isGoldenHour ? 'text-amber-400 animate-bounce' : 'text-gold-400'}`} />
            <span>Time: {formatTime(timeHour)}</span>
          </div>
        </div>
      </div>

      {/* Solar Arc Interactive Stage Canvas */}
      <div className={`relative w-full aspect-[16/8] rounded-xl border overflow-hidden p-6 flex flex-col justify-between mb-6 transition-all duration-700 ${
        isGoldenHour
          ? 'bg-gradient-to-t from-amber-950/60 via-obsidian-950 to-black border-amber-500/50'
          : sunProgress < 0.25 || sunProgress > 0.8
            ? 'bg-gradient-to-t from-slate-900 via-obsidian-950 to-black border-slate-800'
            : 'bg-gradient-to-t from-sky-950/40 via-obsidian-950 to-black border-cyan-800/40'
      }`}>
        {/* Sky Ambient Horizon */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div 
            className="w-40 h-40 rounded-full blur-3xl absolute transition-all duration-300"
            style={{
              left: `${sunProgress * 85 + 5}%`,
              top: `${(1 - Math.sin(sunProgress * Math.PI)) * 60 + 10}%`,
              background: isGoldenHour ? '#f59e0b' : '#38bdf8'
            }}
          ></div>
        </div>

        {/* Top Info Strip */}
        <div className="flex justify-between items-center z-10 text-xs font-mono">
          <span className="text-slate-400">East (Sunrise 6:00 AM)</span>
          <span className="text-gold-400 font-bold">Solar Meridian (Noon 12:00 PM)</span>
          <span className="text-slate-400">West (Sunset 6:00 PM)</span>
        </div>

        {/* Interactive Sun Orb & SVG Arc Path */}
        <div className="relative w-full h-32 flex items-end justify-center z-10">
          {/* SVG Dotted Arc */}
          <svg className="absolute w-full h-full overflow-visible">
            <path
              d="M 40 120 Q 350 -10 660 120"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.4"
            />
          </svg>

          {/* Sun Element moving along path */}
          <div
            className="absolute transition-all duration-150 flex flex-col items-center pointer-events-none"
            style={{
              left: `${sunProgress * 88 + 4}%`,
              bottom: `${Math.sin(sunProgress * Math.PI) * 85 + 10}%`,
              transform: 'translate(-50%, 50%)'
            }}
          >
            <div className={`p-2.5 rounded-full shadow-2xl border transition-all duration-300 ${
              isGoldenHour 
                ? 'bg-amber-400 text-black border-amber-200 shadow-[0_0_35px_rgba(245,158,11,0.9)] animate-pulse' 
                : 'bg-gold-300 text-black border-white shadow-[0_0_30px_rgba(253,224,71,0.8)]'
            }`}>
              <Sun className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-white bg-black/80 px-1.5 py-0.5 rounded mt-1 border border-white/20">
              {formatTime(timeHour)}
            </span>
          </div>

          {/* Architectural Building Mass with dynamic shadow */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Building 3D block */}
            <div className={`w-32 h-16 rounded-t-lg border-2 border-slate-600 flex flex-col items-center justify-center relative ${
              isDark ? 'bg-obsidian-850/90 text-white' : 'bg-slate-200 text-slate-800'
            }`}>
              <div className="text-[10px] font-mono font-bold">VILLA FACADE</div>
              <div className="text-[9px] text-slate-400">North-East Vastu</div>

              {/* Dynamic Shadow Cast */}
              <div
                className="absolute -bottom-2 h-4 rounded-full bg-black/60 blur-sm pointer-events-none transition-all duration-200"
                style={{
                  width: `${shadowLength * 1.5}px`,
                  transform: `translateX(${(sunProgress - 0.5) * -120}px)`,
                  opacity: (100 - sunIntensity) / 100 + 0.3
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Bottom Horizon Status */}
        <div className="flex justify-between items-center z-10 text-xs font-mono pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Facing: North-East (Vastu Compliant 100%)</span>
          </div>
          {isGoldenHour && (
            <div className="flex items-center gap-1 text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Golden Hour Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Solar Arc Time Slider */}
      <div className={`p-4 rounded-xl border mb-6 ${isDark ? 'bg-obsidian-850/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-slate-400 font-medium">Scrub Solar Time of Day</span>
          <span className="font-mono font-bold text-gold-400">{formatTime(timeHour)}</span>
        </div>
        <input
          type="range"
          min="6.0"
          max="18.0"
          step="0.25"
          value={timeHour}
          onChange={(e) => setTimeHour(parseFloat(e.target.value))}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>6 AM (Dawn)</span>
          <span>9 AM (Morning Light)</span>
          <span>12 PM (Zenith)</span>
          <span>3 PM (Afternoon)</span>
          <span>6 PM (Dusk)</span>
        </div>
      </div>

      {/* Room-by-Room Daylight Exposure Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-obsidian-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-[10px] text-slate-400">Living Lounge & Deck</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">
            {timeHour >= 7 && timeHour <= 15 ? 'Direct Ambient (95%)' : 'Diffused Warm (65%)'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Energy savings on lighting: 42%</div>
        </div>

        <div className={`p-3 rounded-lg border ${isDark ? 'bg-obsidian-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-[10px] text-slate-400">Master Sanctuary</div>
          <div className="text-sm font-bold text-gold-400 mt-1">
            {timeHour <= 11 ? 'Gentle Morning Sunrise' : 'Shaded Thermal Comfort'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">No direct harsh afternoon glare</div>
        </div>

        <div className={`p-3 rounded-lg border ${isDark ? 'bg-obsidian-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-[10px] text-slate-400">Rooftop Sky Deck</div>
          <div className="text-sm font-bold text-cyan-400 mt-1">
            {isGoldenHour ? 'Panoramic Sunset Glow' : '360° Open Horizon'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Pergola shaded lounge</div>
        </div>
      </div>
    </div>
  );
}
