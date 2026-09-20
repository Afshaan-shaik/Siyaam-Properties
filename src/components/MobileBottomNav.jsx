import React, { useState, useEffect } from 'react';
import { Home, Building2, TrendingUp, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function MobileBottomNav() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      const propertiesSection = document.getElementById('properties');
      const marketSection = document.getElementById('market-tracker');
      const contactSection = document.getElementById('contact');

      if (contactSection && scrollY >= contactSection.offsetTop - height / 2) {
        setActiveTab('contact');
      } else if (marketSection && scrollY >= marketSection.offsetTop - height / 2) {
        setActiveTab('rates');
      } else if (propertiesSection && scrollY >= propertiesSection.offsetTop - height / 2) {
        setActiveTab('properties');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: '#',
      onClick: (e) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: Building2,
      href: '#properties',
    },
    {
      id: 'rates',
      label: 'Rates',
      icon: TrendingUp,
      href: '#market-tracker',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageSquare,
      isAction: true,
      href: 'https://wa.me/919611263884?text=Hello%20Afshaan%20Shaikh,%20I%20am%20interested%20in%20Siyaam%20Properties%20consultation.',
      external: true,
      badge: 'Chat',
    },
    {
      id: 'call',
      label: 'Call',
      icon: PhoneCall,
      isAction: true,
      href: 'tel:+919611263884',
      badge: 'Direct',
    },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden pointer-events-auto pb-[env(safe-area-inset-bottom)]">
      {/* App Bar Container */}
      <nav 
        className={`mx-auto border-t backdrop-blur-2xl transition-all duration-300 ${
          isDark 
            ? 'bg-obsidian-950/95 border-white/10 text-slate-300 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-white/95 border-slate-200 text-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]'
        }`}
      >
        <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.isAction) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : ''}
                  className="flex flex-col items-center justify-center py-1 px-2.5 relative group active:scale-95 transition-transform"
                >
                  <div className={`p-2 rounded-2xl transition-all shadow-md ${
                    item.id === 'whatsapp'
                      ? 'bg-emerald-600 text-white'
                      : isDark
                        ? 'bg-gold-400 text-obsidian-950'
                        : 'bg-black text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold mt-1 tracking-tight ${
                    item.id === 'whatsapp'
                      ? 'text-emerald-500 font-extrabold'
                      : isDark ? 'text-gold-300' : 'text-slate-900'
                  }`}>
                    {item.label}
                  </span>
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={item.onClick}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? isDark
                      ? 'text-gold-300 font-bold'
                      : 'text-black font-bold'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {isActive && (
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                      isDark ? 'bg-gold-400' : 'bg-black'
                    }`} />
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-1">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
