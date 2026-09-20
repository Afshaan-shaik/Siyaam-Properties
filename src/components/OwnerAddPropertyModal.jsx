import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Building, 
  ShieldCheck, 
  Layers, 
  Flame,
  Wand2,
  Eye,
  Check
} from 'lucide-react';
import { 
  presetLuxuryImages, 
  sampleSkylinePenthouse, 
  saveCustomProperty 
} from '../data/properties';
import { useTheme } from '../context/ThemeContext';

const DEFAULT_AMENITIES_PRESETS = [
  "Private Rooftop Terrace",
  "Smart Home Automation",
  "Designer Modular Kitchen",
  "Private Elevator Access",
  "Italian Marble Flooring",
  "Clubhouse & Gym Access",
  "Infinity Pool Access",
  "24/7 Multi-Tier Security",
  "Vastu Compliant",
  "2 Car Covered Parking"
];

export default function OwnerAddPropertyModal({ isOpen, onClose, onPropertyAdded }) {
  const { isDark } = useTheme();

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('luxury');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Vidyanagar Central, Hubballi');
  const [area, setArea] = useState('');
  const [type, setType] = useState('Penthouse');
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(3);
  const [tag, setTag] = useState('Ultra Prime');
  const [badge, setBadge] = useState('Immediate Handover');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([
    "Private Rooftop Terrace",
    "Smart Home Automation",
    "Designer Modular Kitchen"
  ]);
  const [customFeatureInput, setCustomFeatureInput] = useState('');
  
  // Image handling
  const [imageTab, setImageTab] = useState('presets'); // 'presets' | 'upload' | 'url'
  const [imageUrl, setImageUrl] = useState(presetLuxuryImages[0].url);
  const [uploadPreview, setUploadPreview] = useState(null);
  
  // Tab view on mobile: form vs preview
  const [activeView, setActiveView] = useState('form'); // 'form' | 'preview'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // 1-Click Load Skyline Penthouse Template
  const handleLoadSkylineTemplate = () => {
    setTitle(sampleSkylinePenthouse.title);
    setCategory(sampleSkylinePenthouse.category);
    setPrice(sampleSkylinePenthouse.price);
    setLocation(sampleSkylinePenthouse.location);
    setArea(sampleSkylinePenthouse.area);
    setType(sampleSkylinePenthouse.type);
    setBedrooms(sampleSkylinePenthouse.bedrooms);
    setBathrooms(sampleSkylinePenthouse.bathrooms);
    setTag(sampleSkylinePenthouse.tag);
    setBadge(sampleSkylinePenthouse.badge);
    setDescription(sampleSkylinePenthouse.description);
    setFeatures([...sampleSkylinePenthouse.features]);
    setImageUrl(sampleSkylinePenthouse.image);
    setImageTab('presets');
    setSuccessMessage('Loaded "Skyline Luxury Penthouse" template!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // 1-Click Load Luxury Villa Template
  const handleLoadVillaTemplate = () => {
    setTitle("Sunset Signature Royal Villa");
    setCategory("residential");
    setPrice("₹1.95 Cr");
    setLocation("Shirur Park / Keshwapur, Hubballi");
    setArea("3,600 sq.ft");
    setType("Independent Luxury Villa");
    setBedrooms(4);
    setBathrooms(4);
    setTag("Signature Luxury");
    setBadge("100% Clear Title");
    setDescription("Opulent 4 BHK royal independent villa with landscaped private lawn, private plunge pool, and Vastu-aligned architecture.");
    setFeatures([
      "Private Landscaped Lawn",
      "Private Plunge Pool",
      "Italian Granite & Teak Wood",
      "Solar Water Heating",
      "2-Car Covered Garage"
    ]);
    setImageUrl(presetLuxuryImages[1].url);
    setImageTab('presets');
    setSuccessMessage('Loaded "Royal Villa" template!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle local image file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (under 4MB for localStorage comfort)
    if (file.size > 4.5 * 1024 * 1024) {
      alert("Please select an image smaller than 4MB for optimal browser performance.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setUploadPreview(dataUrl);
      setImageUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Toggle amenity tag
  const toggleFeature = (feat) => {
    if (features.includes(feat)) {
      setFeatures(features.filter(f => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  // Add custom amenity
  const handleAddCustomFeature = (e) => {
    e.preventDefault();
    if (!customFeatureInput.trim()) return;
    if (!features.includes(customFeatureInput.trim())) {
      setFeatures([...features, customFeatureInput.trim()]);
    }
    setCustomFeatureInput('');
  };

  // Remove amenity
  const removeFeature = (indexToRemove) => {
    setFeatures(features.filter((_, i) => i !== indexToRemove));
  };

  // Submit and Publish
  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a property title.");
      return;
    }
    if (!price.trim()) {
      alert("Please enter a price (e.g., ₹2.0 Cr or AED 850,000).");
      return;
    }
    if (!area.trim()) {
      alert("Please enter the property area (e.g., 3,850 sq.ft).");
      return;
    }

    setIsSubmitting(true);

    const newProperty = {
      id: `siyaam-custom-${Date.now()}`,
      title: title.trim(),
      category: category,
      tag: tag.trim() || 'Curated Prime',
      price: price.trim(),
      priceNumeric: parseInt(price.replace(/[^0-9]/g, ''), 10) || 10000000,
      location: location.trim() || 'Hubballi, Karnataka',
      area: area.trim(),
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      type: type.trim() || 'Luxury Property',
      image: imageUrl || presetLuxuryImages[0].url,
      description: description.trim() || `${title} located at ${location}. Crafted for elevated living.`,
      features: features.length > 0 ? features : ["Verified Title", "Prime Location", "24/7 Security"],
      badge: badge.trim() || 'Verified Property',
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    saveCustomProperty(newProperty);

    setTimeout(() => {
      setIsSubmitting(false);
      onPropertyAdded(newProperty);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className={`relative w-full max-w-6xl my-auto rounded-3xl border shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 ${
        isDark ? 'bg-obsidian-900 border-white/15 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
      }`}>

        {/* Modal Top Header */}
        <div className={`px-6 py-5 border-b flex flex-wrap items-center justify-between gap-4 ${
          isDark ? 'border-white/10 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 text-obsidian-950 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                  Creator & Owner Studio
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Verified Owner
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Add and publish new luxury properties directly into your live Siyaam portfolio.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSkylineTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gold-400/10 hover:bg-gold-400/20 text-gold-400 border border-gold-400/30 transition-all hover:scale-105 active:scale-95"
              title="Click to automatically fill with Skyline Luxury Penthouse sample"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Skyline Penthouse Template</span>
            </button>
            <button
              type="button"
              onClick={handleLoadVillaTemplate}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Royal Villa Template</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick notification banner if template loaded */}
        {successMessage && (
          <div className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold flex items-center justify-between">
            <span>✨ {successMessage}</span>
            <button onClick={() => setSuccessMessage('')}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Mobile View Switcher (Form vs Live Preview) */}
        <div className="lg:hidden flex border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveView('form')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeView === 'form' 
                ? 'border-gold-400 text-gold-400 bg-gold-400/5' 
                : 'border-transparent text-slate-400'
            }`}
          >
            Property Details & Specs
          </button>
          <button
            type="button"
            onClick={() => setActiveView('preview')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeView === 'preview' 
                ? 'border-gold-400 text-gold-400 bg-gold-400/5' 
                : 'border-transparent text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live 3D Card Preview</span>
          </button>
        </div>

        {/* Studio Body: Dual Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[75vh] overflow-y-auto">
          
          {/* Left Column: Form (7 cols on desktop) */}
          <div className={`p-6 space-y-6 lg:col-span-7 ${activeView === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <form onSubmit={handlePublish} className="space-y-6">
              
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Skyline Luxury Penthouse"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark 
                        ? 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Portfolio Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark 
                        ? 'bg-slate-950 border-white/15 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="luxury">Luxury Villas & Penthouses</option>
                    <option value="residential">Flats & Individual Homes</option>
                    <option value="plots">NA KJP Plots & Layouts</option>
                    <option value="commercial">Commercial Spaces</option>
                    <option value="dubai">Dubai Tax-Free Properties</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Price & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Price Tag <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. ₹2.0 Cr or AED 850,000"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark 
                        ? 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Prime Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Vidyanagar Central, Hubballi"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark 
                        ? 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Row 3: Area, Type, Bedrooms, Bathrooms */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. 3,850 sq.ft"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Type
                  </label>
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="e.g. Penthouse"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Row 4: Tag & Verification Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Highlight Tag
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Ultra Prime, Signature Luxury"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Status / Verification Badge
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Immediate Handover, 100% Clear Title"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Row 5: Image Selection (Upload, Preset, or URL) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider">
                    Property High-Res Image
                  </label>
                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setImageTab('presets')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        imageTab === 'presets' ? 'bg-gold-400 text-obsidian-950 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      Presets
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('upload')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        imageTab === 'upload' ? 'bg-gold-400 text-obsidian-950 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('url')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        imageTab === 'url' ? 'bg-gold-400 text-obsidian-950 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      Direct URL
                    </button>
                  </div>
                </div>

                {imageTab === 'presets' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {presetLuxuryImages.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(preset.url)}
                        className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                          imageUrl === preset.url
                            ? 'border-gold-400 ring-2 ring-gold-400/50 scale-105 shadow-lg'
                            : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1.5">
                          <span className="text-[10px] text-white font-bold leading-tight truncate">{preset.name}</span>
                        </div>
                        {imageUrl === preset.url && (
                          <div className="absolute top-1 right-1 p-0.5 rounded-full bg-gold-400 text-obsidian-950">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {imageTab === 'upload' && (
                  <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                    isDark ? 'border-white/20 bg-slate-950/40 hover:border-gold-400/60' : 'border-slate-300 bg-slate-50 hover:border-slate-500'
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      id="property-image-upload"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="property-image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="p-3 rounded-full bg-gold-400/10 text-gold-400 border border-gold-400/30">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gold-300">
                        {uploadPreview ? 'Replace Uploaded Image' : 'Choose Local Property Image'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        PNG, JPG, WEBP up to 4MB (Instant local rendering)
                      </span>
                    </label>
                  </div>
                )}

                {imageTab === 'url' && (
                  <div>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-luxury-penthouse..."
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                        isDark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Row 6: Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Property Description & Lifestyle Highlights
                </label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the architecture, skyline views, exclusivity, materials, or neighborhood advantages..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                    isDark ? 'bg-slate-950 border-white/15 text-white placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Row 7: Amenities & Features */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider">
                  Amenities & Specs Checklist ({features.length} selected)
                </label>

                {/* Quick Toggle Common Presets */}
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_AMENITIES_PRESETS.map((preset) => {
                    const active = features.includes(preset);
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => toggleFeature(preset)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                          active
                            ? 'bg-gold-400 text-obsidian-950 border-gold-300 shadow-sm'
                            : isDark
                              ? 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
                              : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-black'
                        }`}
                      >
                        {active ? '✓ ' : '+ '} {preset}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amenity Adder */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customFeatureInput}
                    onChange={(e) => setCustomFeatureInput(e.target.value)}
                    placeholder="Add custom feature (e.g. Private Wine Cellar)..."
                    className={`flex-1 px-3 py-1.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                      isDark ? 'bg-slate-950 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomFeature}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Selected Features Chips */}
                {features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {features.map((feat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{feat}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          className="hover:text-red-400 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-bold border border-white/15 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 text-obsidian-950 hover:from-gold-200 hover:to-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-obsidian-950" />
                  <span>{isSubmitting ? 'Publishing...' : 'Publish Property to Portfolio'}</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Real-Time Live Card Preview (5 cols on desktop) */}
          <div className={`p-6 border-t lg:border-t-0 lg:border-l lg:col-span-5 flex flex-col justify-between ${
            isDark ? 'border-white/10 bg-slate-950/40' : 'border-slate-200 bg-slate-50/50'
          } ${activeView === 'form' ? 'hidden lg:flex' : 'flex'}`}>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gold-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-gold-400">
                    Real-time Live Card Preview
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Matches Client View
                </span>
              </div>

              {/* Live Preview Card */}
              <div className={`rounded-3xl overflow-hidden border flex flex-col justify-between shadow-2xl transition-all ${
                isDark ? 'glass-card border-white/15' : 'bg-white border-slate-200 shadow-xl'
              }`}>
                {/* Image Box */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={imageUrl || presetLuxuryImages[0].url}
                    alt={title || "Luxury Property"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase bg-gold-400 text-obsidian-950 shadow-md">
                      {tag || 'Ultra Prime'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/80 text-emerald-400 border border-emerald-500/30">
                      {badge || 'Verified Title'}
                    </span>
                  </div>

                  {/* Price Tag in photo overlay */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 text-gold-300 text-base font-black font-heading shadow-xl">
                      {price || '₹2.0 Cr'}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 space-y-3.5">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                      <span className="truncate">{location || 'Vidyanagar Central, Hubballi'}</span>
                    </div>
                    <h3 className={`text-lg font-bold font-heading line-clamp-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {title || 'Skyline Luxury Penthouse'}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {description || 'Expansive bedrooms, private rooftop terrace with 360° panoramic city skyline views, and Italian marble flooring.'}
                  </p>

                  {/* Specs Matrix */}
                  <div className={`grid grid-cols-3 gap-2 py-2.5 border-y rounded-xl text-center ${
                    isDark ? 'border-white/10 bg-slate-950/30' : 'border-slate-100 bg-slate-50'
                  }`}>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 block font-semibold">Area</span>
                      <span className={`text-xs font-bold truncate block ${isDark ? 'text-white' : 'text-slate-900'}`}>{area || '3,850 sq.ft'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 block font-semibold">Type</span>
                      <span className={`text-xs font-bold truncate px-1 block ${isDark ? 'text-white' : 'text-slate-900'}`}>{type || 'Penthouse'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 block font-semibold">Beds</span>
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{bedrooms > 0 ? `${bedrooms} BHK` : 'Plot/Office'}</span>
                    </div>
                  </div>

                  {/* Features tags */}
                  <div className="flex flex-wrap gap-1">
                    {features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded-md border ${
                          isDark ? 'bg-slate-900 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Simulated Action buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      disabled
                      className={`flex-1 py-2 rounded-full text-xs font-bold ${
                        isDark ? 'bg-white/10 text-white' : 'bg-black text-white'
                      }`}
                    >
                      View Details & Specs
                    </button>
                    <div className="p-2 rounded-full bg-emerald-600 text-white shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl border border-gold-400/20 bg-gold-400/5 text-xs text-gold-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Immediate Client Sync</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                When you publish, this property instantly gets added to your live portfolio with instant WhatsApp consultation and schedule site visit routing.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
