import React, { useState } from 'react';
import { Box, Layers, Eye, Compass, Sun, Moon, Maximize, Sparkles, CheckCircle2 } from 'lucide-react';

const FLOORS = [
  {
    id: 'ground',
    name: 'Ground Level',
    subtitle: 'Private Portico, Landscaped Lawn & Foyer',
    area: '1,250 sq.ft',
    rooms: [
      { id: 'parking', name: '2-Car Covered Portico', area: '380 sq.ft', highlight: 'EV Charging Ready, Italian Pavers' },
      { id: 'foyer', name: 'Grand Entrance Foyer', area: '190 sq.ft', highlight: '12-Foot Ceiling, Teakwood Pivot Door' },
      { id: 'guest-suite', name: 'Garden Guest Suite', area: '260 sq.ft', highlight: 'Attached Powder Bath, Garden Walkout' },
      { id: 'lawn', name: 'Zen Landscaped Garden', area: '420 sq.ft', highlight: 'Perimeter Bamboo Screen, Drip Irrigation' }
    ]
  },
  {
    id: 'mid',
    name: 'First Level (Living)',
    subtitle: 'Great Room, Gourmet Kitchen & Dining Terrace',
    area: '1,450 sq.ft',
    rooms: [
      { id: 'great-room', name: 'Expansive Living Lounge', area: '580 sq.ft', highlight: 'Italian Statuario Marble, Acoustic Ceiling' },
      { id: 'kitchen', name: 'Designer Modular Kitchen', area: '240 sq.ft', highlight: 'Quartz Island, German Blum Fittings' },
      { id: 'dining', name: 'Alfresco Dining Deck', area: '280 sq.ft', highlight: 'Sliding Glass Wall to Balcony' },
      { id: 'study', name: 'Executive Home Office', area: '190 sq.ft', highlight: 'High Speed Fiber, Sound Dampening' }
    ]
  },
  {
    id: 'penthouse',
    name: 'Second Level (Private)',
    subtitle: 'Master Sanctuary & Children Suites',
    area: '1,150 sq.ft',
    rooms: [
      { id: 'master', name: 'Presidential Master Suite', area: '520 sq.ft', highlight: 'Walk-in Wardrobe, Freestanding Tub' },
      { id: 'bedroom-2', name: 'Junior En-Suite Bedroom', area: '290 sq.ft', highlight: 'Hardwood Flooring, Sunrise Window' },
      { id: 'balcony-p', name: 'Private Sunset Balcony', area: '210 sq.ft', highlight: 'Glass Balustrade, Unobstructed Horizon' }
    ]
  },
  {
    id: 'terrace',
    name: 'Sky Deck & Rooftop',
    subtitle: 'Private Plunge Pool & Stargazing Lounge',
    area: '850 sq.ft',
    rooms: [
      { id: 'pool', name: 'Private Plunge Pool / Jacuzzi', area: '220 sq.ft', highlight: 'Heated Jets, Bisazza Glass Mosaics' },
      { id: 'bbq', name: 'Sky Barbeque Pavilion', area: '340 sq.ft', highlight: 'Granite Counter, Pergola Shade' },
      { id: 'yoga', name: 'Sunrise Yoga Platform', area: '290 sq.ft', highlight: 'Weatherproof Composite Decking' }
    ]
  }
];

export default function DigitalTwin3DViewer({ isDark = true }) {
  const [activeFloorId, setActiveFloorId] = useState('mid');
  const [selectedRoomId, setSelectedRoomId] = useState('great-room');
  const [lightingMode, setLightingMode] = useState('day'); // 'day' | 'night'
  const [viewMode, setViewMode] = useState('isometric'); // 'isometric' | 'top-down'

  const activeFloor = FLOORS.find(f => f.id === activeFloorId) || FLOORS[1];
  const activeRoom = activeFloor.rooms.find(r => r.id === selectedRoomId) || activeFloor.rooms[0];

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
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Box className="w-4 h-4" />
            </span>
            <h3 className="font-heading text-lg font-bold">
              3D Digital Twin & Floorplan Inspector
            </h3>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Interactive spatial model with structural layer slicing, room dimensions & luxury material specs.
          </p>
        </div>

        {/* Lighting & Perspective Toggles */}
        <div className="flex items-center gap-2">
          {/* Lighting Mode */}
          <button
            onClick={() => setLightingMode(lightingMode === 'day' ? 'night' : 'day')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
              lightingMode === 'day'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
            }`}
          >
            {lightingMode === 'day' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Day Ambient (5000K)</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Twilight Luxe (2700K)</span>
              </>
            )}
          </button>

          {/* Perspective Selector */}
          <button
            onClick={() => setViewMode(viewMode === 'isometric' ? 'top-down' : 'isometric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
              isDark 
                ? 'bg-obsidian-850 border-slate-700 text-slate-300 hover:border-gold-500/50' 
                : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            {viewMode === 'isometric' ? 'Isometric 3D' : 'Top-Down Blueprint'}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage & Floor Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Floor Level Tabs (Left 3 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <div className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-gold-400" />
            <span>Select Architectural Level</span>
          </div>

          {FLOORS.map((floor) => {
            const isActive = floor.id === activeFloorId;
            return (
              <button
                key={floor.id}
                onClick={() => {
                  setActiveFloorId(floor.id);
                  setSelectedRoomId(floor.rooms[0].id);
                }}
                className={`p-3.5 rounded-xl text-left border transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-500/20 border-gold-500 text-white shadow-md'
                    : isDark 
                      ? 'bg-obsidian-850/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-obsidian-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`font-bold text-sm ${isActive ? 'text-gold-400' : ''}`}>
                    {floor.name}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/30 border border-white/10">
                    {floor.area}
                  </span>
                </div>
                <div className="text-xs truncate text-slate-400">
                  {floor.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* 3D Isometric / Spatial Canvas (Center 8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className={`relative w-full aspect-[16/10] rounded-xl border overflow-hidden p-6 flex flex-col justify-between transition-colors duration-500 ${
            lightingMode === 'day'
              ? isDark 
                ? 'bg-gradient-to-b from-slate-900 via-obsidian-900 to-obsidian-950 border-slate-750' 
                : 'bg-gradient-to-b from-sky-50 via-slate-100 to-white border-slate-300'
              : 'bg-gradient-to-b from-obsidian-950 via-indigo-950/40 to-black border-indigo-900/40'
          }`}>
            {/* Top Canvas Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-black/60 backdrop-blur-md text-gold-300 border border-gold-500/30">
                  {activeFloor.name} • {activeFloor.area}
                </span>
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                  Click rooms below to inspect
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-black/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                <Compass className="w-3.5 h-3.5" />
                <span>North: 15° NE Facing</span>
              </div>
            </div>

            {/* 3D / Isometric Floorplan Graphic Wireframe */}
            <div className="relative w-full h-full my-4 flex items-center justify-center">
              <div 
                className={`grid grid-cols-2 gap-3 w-full max-w-md transition-all duration-500 ${
                  viewMode === 'isometric' 
                    ? 'rotate-[-12deg] skew-x-[-15deg] scale-95 drop-shadow-[0_25px_30px_rgba(0,0,0,0.8)]' 
                    : 'scale-100'
                }`}
              >
                {activeFloor.rooms.map((room) => {
                  const isSelected = room.id === selectedRoomId;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[90px] ${
                        isSelected
                          ? 'bg-gold-500/30 border-gold-400 text-white shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-105 z-20'
                          : lightingMode === 'day'
                            ? isDark
                              ? 'bg-obsidian-850/80 border-slate-700 hover:border-slate-500 text-slate-300'
                              : 'bg-white/90 border-slate-300 hover:border-slate-400 text-slate-800'
                            : 'bg-indigo-950/60 border-indigo-800/80 hover:border-indigo-600 text-indigo-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{room.name}</span>
                        {isSelected && <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" />}
                      </div>
                      <div className="text-[10px] font-mono opacity-80 mt-2">
                        {room.area}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Room Material & Specification Bar */}
            <div className={`p-3 rounded-lg border backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10 ${
              isDark ? 'bg-black/80 border-gold-500/40 text-white' : 'bg-white/90 border-gold-500/50 text-slate-900'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-xs text-gold-400">{activeRoom.name}</span>
                  <span className="text-xs text-slate-300 ml-2 font-mono">({activeRoom.area})</span>
                </div>
              </div>
              <div className="text-xs font-medium text-slate-300 font-sans">
                Finish: <span className="text-emerald-300 font-semibold">{activeRoom.highlight}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
