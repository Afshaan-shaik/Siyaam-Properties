import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Sparkles, 
  Film, 
  ShieldCheck, 
  BadgeCheck 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const { isDark } = useTheme();

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section 
      id="video-reel" 
      className={`relative py-24 border-t overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-obsidian-900 border-white/10 text-white' 
          : 'bg-slate-100 border-slate-200 text-slate-900'
      }`}
    >
      
      {/* Cinematic Ambilight Glow (in dark mode) */}
      {isDark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-gold-500/15 via-sky-500/10 to-amber-500/15 rounded-full blur-[160px] pointer-events-none" />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase font-heading ${
            isDark 
              ? 'bg-slate-950 border border-gold-500/30 text-gold-300' 
              : 'bg-black text-white shadow-sm'
          }`}>
            <Film className={`w-3.5 h-3.5 ${isDark ? 'text-gold-400' : 'text-amber-400'}`} />
            <span>CINEMATIC EXPERIENCE & CORPORATE REEL</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Witness the{' '}
            <span className={isDark ? 'text-gradient-gold' : 'text-red-600 underline decoration-black decoration-2 underline-offset-4'}>
              Siyaam Standard
            </span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            A visual journey into our layout developments, luxury architectural residences, and transparent client advisory in Hubballi and Dubai.
          </p>
        </div>

        {/* Video Theater Frame */}
        <div className={`relative rounded-3xl p-1.5 sm:p-2.5 transition-all shadow-2xl ${
          isDark 
            ? 'bg-gradient-to-b from-gold-400/40 via-white/10 to-transparent shadow-black/80' 
            : 'bg-gradient-to-b from-slate-400/40 via-slate-200 to-transparent shadow-slate-400/30'
        }`}>
          <div className={`relative rounded-[20px] sm:rounded-[22px] overflow-hidden aspect-[16/9] border group ${
            isDark ? 'bg-obsidian-950 border-white/10' : 'bg-black border-slate-300'
          }`}>
            
            <video
              ref={videoRef}
              className="w-full h-full object-cover cursor-pointer"
              loop
              playsInline
              muted={isMuted}
              poster="/assets/whatsapp-image-2025-12-24-at-00.23.37-2-LnD6KtTmn5SODY2a.jpeg"
              onClick={togglePlay}
            >
              <source 
                src="https://videos.pexels.com/video-files/3773486/3773486-hd_1280_720_60fps.mp4" 
                type="video/mp4" 
              />
              Your browser does not support HTML5 video.
            </video>

            {/* Ambient Dark Overlay when paused */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity"
              >
                {/* 3D Play Button */}
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center ${
                  isDark 
                    ? 'bg-gradient-to-br from-gold-300 via-gold-400 to-amber-500 shadow-[0_0_50px_rgba(212,175,55,0.7)]' 
                    : 'bg-white shadow-2xl'
                }`}>
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${
                    isDark ? 'bg-obsidian-950/80' : 'bg-black'
                  }`}>
                    <Play className={`w-8 h-8 sm:w-10 sm:h-10 ml-1 ${
                      isDark ? 'text-gold-300 fill-gold-300' : 'text-white fill-white'
                    }`} />
                  </div>
                </div>
              </div>
            )}

            {/* Top Bar Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider shadow ${
                  isDark ? 'bg-gold-400 text-obsidian-950' : 'bg-white text-black'
                }`}>
                  SIYAAM CINEMA
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                  <BadgeCheck className={`w-3.5 h-3.5 ${isDark ? 'text-gold-400' : 'text-emerald-400'}`} />
                  Architectural & Site Reel
                </span>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between">
              
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className={`p-2.5 rounded-xl text-white backdrop-blur-md transition-colors ${
                    isDark ? 'bg-white/10 hover:bg-gold-400 hover:text-obsidian-950' : 'bg-white/20 hover:bg-white hover:text-black'
                  }`}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  {isPlaying ? 'Playing • Siyaam Showcase' : 'Click Play to start stream'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Video Note Box */}
        <div className={`mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border text-xs transition-colors ${
          isDark 
            ? 'bg-slate-950/60 border-white/10 text-slate-400' 
            : 'bg-white border-slate-200 text-slate-700 shadow-sm'
        }`}>
          <div className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-gold-400' : 'text-amber-500'}`} />
            <span>Dedicated video player ready for Siyaam Properties' upcoming official video featurette.</span>
          </div>
          <a
            href="tel:+918884969988"
            className={`font-bold whitespace-nowrap ${
              isDark ? 'text-gold-400 hover:text-gold-300' : 'text-slate-900 hover:text-black underline'
            }`}
          >
            Request Private Site Walkthrough →
          </a>
        </div>

      </div>
    </section>
  );
}
