import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Building2, 
  ChevronRight, 
  Sparkles,
  MapPin,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { hubliMicroMarkets } from '../data/marketRates';
import { useTheme } from '../context/ThemeContext';

export default function Hero3D() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { isDark } = useTheme();

  // 3D Interactive Particle Mesh Animation (Adaptive to Day/Night mode)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(width / 20), 65);
    const particles = [];
    const colorA = isDark ? '#d4af37' : '#0f172a';
    const colorB = isDark ? '#38bdf8' : '#dc2626';

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.4 ? colorA : colorB,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = isDark ? p1.alpha * 0.7 : p1.alpha * 0.4;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? '#d4af37' : '#64748b';
            ctx.globalAlpha = (1 - dist / 130) * (isDark ? 0.14 : 0.1);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className={`relative min-h-[92vh] lg:min-h-screen pt-28 sm:pt-32 pb-16 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
        isDark 
          ? 'bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 text-slate-100' 
          : 'bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900'
      }`}
    >
      {/* 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />

      {/* Atmospheric radial glows */}
      {isDark && (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-sky-500/8 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Vision, Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase font-heading ${
              isDark 
                ? 'bg-slate-900/90 border border-gold-500/30 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                : 'bg-black text-white shadow-md'
            }`}>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>EST. 2018 • HUBLI-DHARWAD & DUBAI REAL ESTATE</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight font-heading leading-[1.15]">
              Expert Solutions for Success in{' '}
              <span className={isDark ? 'text-gradient-gold' : 'text-slate-950 underline decoration-red-600 decoration-4 underline-offset-4'}>
                Real Estate & Investments.
              </span>
            </h1>

            {/* Bio text */}
            <p className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Founded by <strong className={isDark ? 'text-white' : 'text-slate-950'}>Mr. Sameer Kasim Shaikh</strong> (20+ years of Gulf experience) and represented by <strong className={isDark ? 'text-white' : 'text-slate-950'}>Afshaan Shaikh</strong>. 
              We deal in residential plots, NA KJP layout developments, flats, villas, commercial spaces, and tax-free Dubai properties with 100% legal transparency.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <a
                href="#properties"
                className={`group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 transform active:scale-95 ${
                  isDark
                    ? 'bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 text-obsidian-950 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)]'
                    : 'bg-black text-white hover:bg-slate-800 shadow-xl'
                }`}
              >
                <span>View Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#investment-calculator"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                  isDark
                    ? 'bg-slate-900/80 border border-slate-700 text-slate-200 hover:border-gold-500/50 hover:bg-slate-800'
                    : 'bg-white border border-slate-300 text-slate-900 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Real-Time ROI Tracker</span>
              </a>
            </div>

            {/* Trust Metrics Pill Grid */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`text-xl sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-950'}`}>20+ Yrs</div>
                <div className="text-[11px] text-slate-400 font-medium">Gulf Expertise</div>
              </div>
              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`text-xl sm:text-2xl font-black font-heading ${isDark ? 'text-gold-400' : 'text-red-600'}`}>100%</div>
                <div className="text-[11px] text-slate-400 font-medium">Legal Clearances</div>
              </div>
              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-xl sm:text-2xl font-black text-emerald-500 font-heading">₹500+ Cr</div>
                <div className="text-[11px] text-slate-400 font-medium">Advised Portfolio</div>
              </div>
              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="text-xl sm:text-2xl font-black text-sky-500 font-heading">Dubai & Hubli</div>
                <div className="text-[11px] text-slate-400 font-medium">Global Network</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Spotlight Card */}
          <div className="lg:col-span-5 perspective-1000">
            <div 
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className={`relative rounded-3xl p-1 shadow-2xl preserve-3d group ${
                isDark 
                  ? 'bg-gradient-to-b from-gold-400/40 via-white/10 to-transparent' 
                  : 'bg-gradient-to-b from-slate-300 via-slate-100 to-white shadow-xl'
              }`}
            >
              <div className={`rounded-[22px] p-5 sm:p-6 overflow-hidden relative ${
                isDark 
                  ? 'bg-obsidian-900/90 backdrop-blur-2xl border border-white/10' 
                  : 'bg-white border border-slate-200 shadow-lg'
              }`}>
                
                {/* Spotlight Image with authentic original photo */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5 border border-slate-200/20 group-hover:scale-[1.02] transition-transform duration-500">
                  <img 
                    src="/assets/whatsapp-image-2025-12-24-at-00.23.37-EM7khvt5Dq1p83i3.jpeg" 
                    alt="Sunset Luxury Villa Hubballi" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-400 text-obsidian-950 shadow-md">
                      FEATURED PRIME
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/80 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Clear Title
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div>
                      <div className="text-xs text-slate-200 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        Keshwapur / Shirur Park, Hubballi
                      </div>
                      <div className="text-lg font-bold text-white font-heading">
                        Sunset Signature Luxury Villa
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-300 block">Starting</span>
                      <span className="text-xl font-black text-gold-300 font-heading">₹1.85 Cr</span>
                    </div>
                  </div>
                </div>

                {/* Quick Spec Matrix */}
                <div className={`grid grid-cols-3 gap-2 text-center py-3 border-y mb-4 rounded-xl ${
                  isDark 
                    ? 'border-white/10 bg-slate-950/30' 
                    : 'border-slate-200 bg-slate-50'
                }`}>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">Area</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>3,400 sq.ft</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">Bedrooms</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>4 BHK Luxury</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">Appreciation</span>
                    <span className="text-sm font-bold text-emerald-500">+12.4% p.a.</span>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="tel:+919611263884"
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold text-center transition-all ${
                      isDark
                        ? 'bg-white/10 hover:bg-gold-400 hover:text-obsidian-950 text-white border border-white/15'
                        : 'bg-black text-white hover:bg-slate-800 shadow-md'
                    }`}
                  >
                    Direct Enquire Now
                  </a>
                  <a
                    href="#market-tracker"
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                    }`}
                  >
                    View Rates <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Live Market Ticker Marquee Bar */}
      <div className={`relative z-20 mt-12 border-y py-3 overflow-hidden transition-colors ${
        isDark 
          ? 'border-white/10 bg-obsidian-900/80 backdrop-blur-xl' 
          : 'border-slate-200 bg-white/95 backdrop-blur-md shadow-sm'
      }`}>
        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4">
          <div className={`flex items-center gap-2 text-xs font-extrabold uppercase whitespace-nowrap pr-4 border-r ${
            isDark ? 'text-gold-400 border-white/15' : 'text-slate-900 border-slate-300'
          }`}>
            <Flame className="w-4 h-4 animate-pulse text-amber-500" />
            <span>LIVE HUBLI RATES / SQ.FT</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-8 whitespace-nowrap animate-ticker">
              {[...hubliMicroMarkets, ...hubliMicroMarkets].map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-3 text-xs font-medium">
                  <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{item.name}:</span>
                  <span className={`font-bold ${isDark ? 'text-gold-300' : 'text-black'}`}>₹{item.avgSqFt.toLocaleString()}</span>
                  <span className="text-emerald-500 font-semibold text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    {item.yoyGrowth}
                  </span>
                  <span className="text-slate-400">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
