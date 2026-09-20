import React, { useState, useMemo } from 'react';
import { Sparkles, Search, CheckCircle2, AlertCircle, ArrowRight, Tag, SlidersHorizontal, Eye } from 'lucide-react';
import { parseNaturalLanguageQuery, calculatePropertyMatches } from '../../services/aiSearchEngine';

const PRESET_PROMPTS = [
  "3 BHK penthouse or villa in Vidyanagar or Keshwapur under 2 Cr with high yield",
  "Waterfront home near Unkal Lake with panoramic view and good resale value",
  "Commercial showroom in Dream Plaza Keshwapur with corporate lease potential",
  "High growth NA KJP investment plot corridor under 50 Lakhs",
  "Dubai luxury residence with 0% tax and Golden Visa eligibility"
];

export default function AIPropertyMatchEngine({ isDark = true, onSelectProperty }) {
  const [query, setQuery] = useState(PRESET_PROMPTS[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Parse natural language and compute matches
  const parsedData = useMemo(() => {
    return parseNaturalLanguageQuery(query);
  }, [query]);

  const matchedProperties = useMemo(() => {
    return calculatePropertyMatches(parsedData);
  }, [parsedData]);

  const handlePresetClick = (preset) => {
    setIsProcessing(true);
    setQuery(preset);
    setTimeout(() => setIsProcessing(false), 200);
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isDark 
        ? 'bg-obsidian-900/90 border-slate-800 text-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.6)]' 
        : 'bg-white border-slate-200 text-slate-900 shadow-xl'
    }`}>
      {/* Engine Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-gold-500/20 text-gold-400 border border-gold-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-heading text-lg font-bold">
              AI Natural Language Property Match Engine
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Describe your ideal acquisition in plain English. The AI parses intent, budget, layout & micro-market yield.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            NLP Model: RealEstate-V3 Active
          </span>
        </div>
      </div>

      {/* Natural Language Search Input Field */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 3 BHK with garden in Vidyanagar or Keshwapur under 1.5 Cr..."
          className={`w-full pl-11 pr-24 py-3.5 rounded-xl border text-sm font-medium transition-all outline-none ${
            isDark 
              ? 'bg-obsidian-950 border-slate-700 text-white placeholder-slate-500 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20' 
              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20'
          }`}
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            onClick={() => setQuery('')}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black'
            }`}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Preset Prompts Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Try Prompts:
        </span>
        {PRESET_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePresetClick(prompt)}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-all text-left truncate max-w-xs ${
              query === prompt
                ? 'bg-gold-500/20 border-gold-500 text-gold-300 font-medium'
                : isDark 
                  ? 'bg-obsidian-850 border-slate-800 text-slate-300 hover:border-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            "{prompt.slice(0, 38)}..."
          </button>
        ))}
      </div>

      {/* AI Parsed Parameters Chips */}
      <div className={`p-3.5 rounded-xl border mb-6 ${
        isDark ? 'bg-obsidian-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gold-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Extracted Intent & Constraints</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {parsedData.tags.length} Parameters Extracted
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {parsedData.tags.length > 0 ? (
            parsedData.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-gold-500/10 text-gold-300 border border-gold-500/30"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-500 italic">
              Type your custom investment requirements to extract target criteria...
            </span>
          )}
        </div>
      </div>

      {/* Ranked Properties Results */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-slate-400">
            Ranked Real Estate Recommendations ({matchedProperties.length} matches)
          </h4>
          <span className="text-xs text-gold-400 font-mono">
            Sorted by AI Fit Confidence
          </span>
        </div>

        <div className="space-y-3">
          {matchedProperties.slice(0, 3).map((prop) => {
            const isHighMatch = prop.matchPercentage >= 85;
            return (
              <div
                key={prop.id}
                className={`p-4 rounded-xl border transition-all duration-300 hover:border-gold-500/50 ${
                  isDark 
                    ? 'bg-obsidian-850/80 border-slate-800/90' 
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-700/50 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-sm">{prop.title}</h5>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                          isHighMatch 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {prop.matchPercentage}% MATCH
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {prop.location} • {prop.area} • {prop.type}
                      </p>
                      <div className="text-sm font-mono font-bold text-gold-400 mt-1">
                        {prop.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {onSelectProperty && (
                      <button
                        onClick={() => onSelectProperty(prop)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gold-500 hover:bg-gold-400 text-black transition-all flex items-center gap-1.5 shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Dossier</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* AI Match Justification Breakdown */}
                <div className={`mt-3 pt-3 border-t text-xs grid grid-cols-1 md:grid-cols-2 gap-2 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <div className="space-y-1">
                    {prop.matchReasons.slice(0, 2).map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                  {prop.missingReasons.length > 0 && (
                    <div className="space-y-1">
                      {prop.missingReasons.slice(0, 1).map((miss, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-amber-400/90 text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{miss}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
