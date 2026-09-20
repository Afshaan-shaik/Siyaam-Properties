import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Percent, 
  Sun, 
  Box, 
  Calculator, 
  Target, 
  Activity, 
  MessageSquare,
  Navigation
} from 'lucide-react';
import InstantPropertyInsights from './InstantPropertyInsights';
import PropertyDNARadar from './PropertyDNARadar';
import PriceAnomalyDetector from './PriceAnomalyDetector';
import DigitalTwin3DViewer from './DigitalTwin3DViewer';
import SunlightSimulator from './SunlightSimulator';
import TrueCostCalculator from './TrueCostCalculator';
import RentalAffordabilityCommand from './RentalAffordabilityCommand';
import NeighborhoodIntelligence from './NeighborhoodIntelligence';
import PriceIntelligenceGraph from './PriceIntelligenceGraph';

export default function PropertyDetailDossier({ property, onClose, isDark = true }) {
  if (!property) return null;

  const [activeTab, setActiveTab] = useState('dna'); // 'dna' | 'digital-twin' | 'financials' | 'neighborhood'

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-5xl rounded-3xl border overflow-hidden shadow-2xl transition-all my-8 ${
        isDark ? 'bg-obsidian-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        
        {/* Top Header / Hero Banner */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-black/40"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-slate-300 hover:text-white border border-white/20 transition-all z-20"
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Details */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-gold-500 text-black">
                  {property.tag}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  {property.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight">
                {property.title}
              </h2>
              <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{property.location}</span>
                <span>•</span>
                <span className="font-mono">{property.area}</span>
                <span>•</span>
                <span>{property.type}</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-gold-400">
                {property.price}
              </div>
              <div className="text-xs text-emerald-400 font-mono">
                Verified Direct Mandate
              </div>
            </div>
          </div>
        </div>

        {/* Instant Telemetry Strip */}
        <div className="p-4 border-b border-slate-800/80">
          <InstantPropertyInsights isDark={isDark} property={property} />
        </div>

        {/* Analytical Section Tabs */}
        <div className={`px-6 pt-3 border-b flex items-center gap-2 overflow-x-auto text-xs font-mono font-bold ${
          isDark ? 'border-slate-800 bg-obsidian-950/40' : 'border-slate-200 bg-slate-50'
        }`}>
          {[
            { id: 'dna', label: 'Investment DNA & Radar', icon: Target },
            { id: 'digital-twin', label: '3D Spatial Twin & Solar', icon: Box },
            { id: 'financials', label: 'True Cost & Affordability', icon: Calculator },
            { id: 'neighborhood', label: 'Transit & Micro-Market', icon: Navigation },
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition-all shrink-0 ${
                  isActive
                    ? 'border-gold-500 text-gold-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab View Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {activeTab === 'dna' && (
            <div className="space-y-6">
              <PropertyDNARadar isDark={isDark} property={property} />
              <PriceAnomalyDetector isDark={isDark} property={property} />
            </div>
          )}

          {activeTab === 'digital-twin' && (
            <div className="space-y-6">
              <DigitalTwin3DViewer isDark={isDark} />
              <SunlightSimulator isDark={isDark} propertyTitle={property.title} />
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6">
              <TrueCostCalculator isDark={isDark} property={property} />
              <RentalAffordabilityCommand isDark={isDark} propertyPrice={property.priceNumeric} />
            </div>
          )}

          {activeTab === 'neighborhood' && (
            <div className="space-y-6">
              <NeighborhoodIntelligence isDark={isDark} propertyTitle={property.title} />
              <PriceIntelligenceGraph isDark={isDark} />
            </div>
          )}
        </div>

        {/* Footer Contact Bar */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? 'bg-obsidian-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="text-xs">
            <span className="font-bold text-white">Direct Advisory by Afshaan Shaikh & Sameer Kasim Shaikh</span>
            <span className="text-slate-400 ml-2 hidden sm:inline">Siyaam Properties HQ, Dream Plaza Hubballi</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isDark ? 'border-slate-700 text-slate-300 hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Close
            </button>

            <a
              href={`https://wa.me/918884969988?text=Hello%20Sameer%20Kasim%20Shaikh,%20I%20reviewed%20the%20Intelligence%20Dossier%20for%20${encodeURIComponent(property.title)}%20(${encodeURIComponent(property.price)})%20and%20want%20to%20schedule%20a%20private%20site%20inspection.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Schedule Site Inspection with Sameer</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
