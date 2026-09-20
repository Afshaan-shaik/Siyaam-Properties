import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  ArrowUpRight, 
  CheckCircle,
  X,
  Sparkles,
  Layers
} from 'lucide-react';
import { propertiesList } from '../data/properties';

export default function PropertyShowcase() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'All Portfolios' },
    { id: 'luxury', label: 'Luxury Villas & Penthouses' },
    { id: 'residential', label: 'Flats & Individual Homes' },
    { id: 'plots', label: 'NA KJP Plots & Layouts' },
    { id: 'commercial', label: 'Commercial Spaces' },
    { id: 'dubai', label: 'Dubai Tax-Free' },
  ];

  const filtered = propertiesList.filter((prop) => {
    if (activeFilter === 'all') return true;
    return prop.category === activeFilter;
  });

  return (
    <section id="properties" className="relative py-24 bg-obsidian-950 border-t border-white/10 overflow-hidden">
      
      {/* Ambient background styling */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-gold-500/30 text-xs font-bold text-gold-300 tracking-wider uppercase font-heading">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>CURATED LUXURY & INVESTMENT PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
            Handpicked Properties in <span className="text-gradient-gold">Hubballi & Beyond</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Every property is rigorously verified for clear ownership titles, town-planning approvals, and superior capital appreciation potential.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold shadow-lg shadow-gold-500/20'
                    : 'bg-slate-900/80 text-slate-300 border border-white/10 hover:border-gold-400/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <div
              key={property.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Zoom & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase bg-gold-400 text-obsidian-950 shadow-md">
                      {property.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-obsidian-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                      {property.badge}
                    </span>
                  </div>

                  {/* Price Tag in photo overlay */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-obsidian-950/90 backdrop-blur-md border border-gold-500/30 text-gold-300 text-base font-black font-heading shadow-xl">
                      {property.price}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 space-y-4">
                  
                  <div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-gold-300 transition-colors">
                      {property.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {property.description}
                  </p>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 bg-slate-950/30 rounded-xl text-center">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">Area</span>
                      <span className="text-xs font-bold text-white">{property.area}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">Type</span>
                      <span className="text-xs font-bold text-white truncate px-1 block">{property.type}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">Beds</span>
                      <span className="text-xs font-bold text-white">{property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Plot/Office'}</span>
                    </div>
                  </div>

                  {/* Features tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {property.features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedProperty(property)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-gold-400 hover:text-obsidian-950 text-white border border-white/15 transition-all duration-200"
                >
                  View Details & Specs
                </button>
                <a
                  href={`https://wa.me/918884969988?text=Hello%20Siyaam%20Properties,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20(${property.price}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                  title="Enquire on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 border border-white/10 relative">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-400 text-obsidian-950">
                  {selectedProperty.tag}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-obsidian-950 text-emerald-400 border border-emerald-500/30">
                  {selectedProperty.badge}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <MapPin className="w-4 h-4 text-gold-400" />
                    <span>{selectedProperty.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    {selectedProperty.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Offer Price</span>
                  <span className="text-2xl font-black text-gold-300 font-heading">
                    {selectedProperty.price}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
                {selectedProperty.description}
              </p>

              {/* Spec details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/10 bg-slate-950/40 rounded-2xl text-center">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Area</span>
                  <span className="text-sm font-bold text-white">{selectedProperty.area}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Type</span>
                  <span className="text-sm font-bold text-white">{selectedProperty.type}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Bedrooms</span>
                  <span className="text-sm font-bold text-white">{selectedProperty.bedrooms > 0 ? selectedProperty.bedrooms : 'Commercial'}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-medium">Verification</span>
                  <span className="text-sm font-bold text-emerald-400">100% Clear</span>
                </div>
              </div>

              {/* All Amenities */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Amenities & Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProperty.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`tel:+918884969988`}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-obsidian-950 font-bold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91-8884969988</span>
                </a>
                <a
                  href={`https://wa.me/918884969988?text=Hello%20Siyaam%20Properties,%20I%20would%20like%20to%20schedule%20a%20site%20visit%20for%20${encodeURIComponent(selectedProperty.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Schedule Site Visit</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
