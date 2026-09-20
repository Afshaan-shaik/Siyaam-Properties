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
  Flame
} from 'lucide-react';
import { hubliMicroMarkets } from '../data/marketRates';

export default function Hero3D() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Interactive Particle Mesh Animation
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
    const particleCount = Math.min(Math.floor(width / 18), 75);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.4 ? '#d4af37' : '#38bdf8',
      });
    }

    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha * 0.8;
        ctx.fill();

        // Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#d4af37';
            ctx.globalAlpha = (1 - dist / 140) * 0.15;
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
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950"
    >
      {/* 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Atmospheric radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-sky-500/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vision & Trust */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* 21st.dev style animated pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-gold-500/30 shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-gold-300 font-heading">
                HUBLI-DHARWAD'S PREMIER REAL ESTATE ADVISORY • EST. 2018
              </span>
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight font-heading leading-[1.12]">
              Where Trusted Real Estate Meets{' '}
              <span className="text-gradient-gold drop-shadow-sm">
                Lasting Prosperity.
              </span>
            </h1>

            {/* Subtext grounded in authentic company bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Founded by <strong className="text-white font-semibold">Mr. Sameer Kasim Shaikh</strong> with over 20 years of Gulf expertise. 
              We deliver complete transparency across <span className="text-gold-300 font-medium">Residential NA KJP Plots</span>, 
              luxury villas, layout civil developments in Hubballi, and tax-free global properties in <span className="text-sky-300 font-medium">Dubai</span>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#properties"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-obsidian-950 bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 hover:from-gold-200 hover:to-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300 transform active:scale-95"
              >
                <span>Explore Verified Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#investment-calculator"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:border-gold-500/50 hover:bg-slate-800/80 backdrop-blur-md transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Calculate ROI</span>
              </a>
            </div>

            {/* Trust Metrics Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <div className="text-xl sm:text-2xl font-black text-white font-heading">20+ Yrs</div>
                <div className="text-[11px] text-slate-400 font-medium">Gulf & Indian Experience</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <div className="text-xl sm:text-2xl font-black text-gold-400 font-heading">100%</div>
                <div className="text-[11px] text-slate-400 font-medium">Legal Verification</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-heading">₹500+ Cr</div>
                <div className="text-[11px] text-slate-400 font-medium">Advised Portfolio</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5">
                <div className="text-xl sm:text-2xl font-black text-sky-400 font-heading">Dubai & Hubli</div>
                <div className="text-[11px] text-slate-400 font-medium">Dual Dual Advantage</div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Showcase Card */}
          <div className="lg:col-span-5 perspective-1000">
            <div 
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative rounded-3xl p-1 bg-gradient-to-b from-gold-400/40 via-white/10 to-transparent shadow-2xl preserve-3d group"
            >
              <div className="rounded-[22px] bg-obsidian-900/90 backdrop-blur-2xl border border-white/10 p-5 sm:p-6 overflow-hidden relative">
                
                {/* Spotlight Image with authentic original photo */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5 border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                  <img 
                    src="/assets/whatsapp-image-2025-12-24-at-00.23.37-EM7khvt5Dq1p83i3.jpeg" 
                    alt="Sunset Luxury Villa Hubballi" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-400 text-obsidian-950 shadow-md">
                      FEATURED PRIME
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-obsidian-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 100% Clear Title
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div>
                      <div className="text-xs text-slate-300 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        Keshwapur / Shirur Park, Hubballi
                      </div>
                      <div className="text-lg font-bold text-white font-heading">
                        Sunset Signature Luxury Villa
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Starting</span>
                      <span className="text-xl font-black text-gold-300 font-heading">₹1.85 Cr</span>
                    </div>
                  </div>
                </div>

                {/* Quick Spec Matrix */}
                <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-white/10 mb-4 bg-slate-950/30 rounded-xl">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">Area</span>
                    <span className="text-sm font-bold text-white">3,400 sq.ft</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">Bedrooms</span>
                    <span className="text-sm font-bold text-white">4 BHK Luxury</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-semibold">Appreciation</span>
                    <span className="text-sm font-bold text-emerald-400">+12.4% p.a.</span>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="tel:+918884969988"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-center bg-white/10 hover:bg-gold-400 hover:text-obsidian-950 text-white border border-white/15 transition-colors"
                  >
                    Direct Enquire Now
                  </a>
                  <a
                    href="#market-tracker"
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1"
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
      <div className="relative z-20 mt-12 border-y border-white/10 bg-obsidian-900/80 backdrop-blur-xl py-3 overflow-hidden">
        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-gold-400 whitespace-nowrap pr-4 border-r border-white/15">
            <Flame className="w-4 h-4 animate-pulse text-amber-400" />
            <span>LIVE HUBLI RATES / SQ.FT</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-8 whitespace-nowrap animate-ticker">
              {[...hubliMicroMarkets, ...hubliMicroMarkets].map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-3 text-xs font-medium">
                  <span className="text-slate-300 font-semibold">{item.name}:</span>
                  <span className="text-gold-300 font-bold">₹{item.avgSqFt.toLocaleString()}</span>
                  <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    {item.yoyGrowth}
                  </span>
                  <span className="text-slate-600">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
