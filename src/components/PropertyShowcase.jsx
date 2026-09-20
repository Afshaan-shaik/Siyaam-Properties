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
import { useTheme } from '../context/ThemeContext';

export default function PropertyShowcase() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { isDark } = useTheme();

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
    <section id="properties" className={`relative py-24 border-t transition-colors duration-300 overflow-hidden ${
      isDark ? 'bg-obsidian-950 border-white/10 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      
      {/* Ambient background styling */}
      {isDark && (
        <>
          <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase font-heading ${
            isDark ? 'bg-slate-900 border border-gold-500/30 text-gold-300' : 'bg-black text-white'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>CURATED LUXURY & INVESTMENT PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Handpicked Properties in <span className={isDark ? 'text-gradient-gold' : 'text-slate-950 underline decoration-red-600'}>Hubballi & Beyond</span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Every property is rigorously verified for clear ownership titles, town-planning approvals, and superior capital appreciation potential.
          </p>

          {/* Filter Pills (Swipeable on Mobile like Native Real Estate Apps) */}
          <div className="flex overflow-x-auto pb-2 sm:pb-0 scrollbar-none sm:flex-wrap justify-start sm:justify-center gap-2 pt-4 w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 active:scale-95 ${
                  activeFilter === tab.id
                    ? isDark
                      ? 'bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold shadow-lg shadow-gold-500/20'
                      : 'bg-black text-white font-bold shadow-md'
                    : isDark
                      ? 'bg-slate-900/80 text-slate-300 border border-white/10 hover:border-gold-400/40 hover:text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-500'
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
              className={`rounded-3xl overflow-hidden border flex flex-col justify-between group transition-all duration-300 ${
                isDark 
                  ? 'glass-card glass-card-hover border-white/10' 
                  : 'bg-white border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1'
              }`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase bg-gold-400 text-obsidian-950 shadow-md">
                      {property.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/80 text-emerald-400 border border-emerald-500/30">
                      {property.badge}
                    </span>
                  </div>

                  {/* Price Tag in photo overlay */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 text-gold-300 text-base font-black font-heading shadow-xl">
                      {property.price}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 space-y-4">
                  
                  <div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    <h3 className={`text-xl font-bold font-heading transition-colors ${
                      isDark ? 'text-white group-hover:text-gold-300' : 'text-slate-950 group-hover:text-red-600'
                    }`}>
                      {property.title}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {property.description}
                  </p>

                  {/* Specs Matrix */}
                  <div className={`grid grid-cols-3 gap-2 py-3 border-y rounded-xl text-center ${
                    isDark ? 'border-white/10 bg-slate-950/30' : 'border-slate-100 bg-slate-50'
                  }`}>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">Area</span>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{property.area}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">Type</span>
                      <span className={`text-xs font-bold truncate px-1 block ${isDark ? 'text-white' : 'text-slate-900'}`}>{property.type}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 block font-semibold">Beds</span>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Plot/Office'}</span>
                    </div>
                  </div>

                  {/* Features tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {property.features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className={`text-[11px] px-2.5 py-0.5 rounded-lg border ${
                          isDark ? 'bg-slate-900 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
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
                  className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isDark 
                      ? 'bg-white/10 hover:bg-gold-400 hover:text-obsidian-950 text-white border border-white/15' 
                      : 'bg-black text-white hover:bg-slate-800'
                  }`}
                >
                  View Details & Specs
                </button>
                <a
                  href={`https://wa.me/918884969988?text=Hello%20Sameer%20Kasim%20Shaikh,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}%20(${property.price}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-md"
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
          <div className={`relative rounded-3xl max-w-2xl w-full border overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 ${
            isDark ? 'bg-obsidian-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-950'
          }`}>
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
                    isDark ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30' : 'bg-red-50 text-red-600 border border-red-200'
                  }`}>
                    {selectedProperty.tag}
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-white mt-2 drop-shadow-md">
                    {selectedProperty.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>{selectedProperty.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-300">Offer Price</div>
                  <div className={`text-2xl font-black font-heading ${isDark ? 'text-gold-400' : 'text-red-500'}`}>
                    {selectedProperty.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedProperty.description}
              </p>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className={`p-3 rounded-2xl border text-center ${
                  isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Area</div>
                  <div className="font-bold text-sm mt-1">{selectedProperty.area}</div>
                </div>
                <div className={`p-3 rounded-2xl border text-center ${
                  isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Type</div>
                  <div className="font-bold text-sm mt-1">{selectedProperty.type}</div>
                </div>
                <div className={`p-3 rounded-2xl border text-center ${
                  isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Bedrooms</div>
                  <div className="font-bold text-sm mt-1">{selectedProperty.bedrooms > 0 ? selectedProperty.bedrooms : 'Plot / Open'}</div>
                </div>
                <div className={`p-3 rounded-2xl border text-center ${
                  isDark ? 'bg-slate-950/60 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Verification</div>
                  <div className="font-bold text-sm text-emerald-500 mt-1">100% Clear</div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Amenities & Specifications
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProperty.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="tel:+918884969988"
                  className={`w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-sm transition-colors ${
                    isDark ? 'bg-gold-400 hover:bg-gold-300 text-obsidian-950' : 'bg-black hover:bg-slate-800 text-white'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 8884969988</span>
                </a>
                <a
                  href={`https://wa.me/918884969988?text=Hello%20Sameer%20Kasim%20Shaikh,%20I%20would%20like%20to%20schedule%20a%20site%20visit%20for%20${encodeURIComponent(selectedProperty.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors"
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
