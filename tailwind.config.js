/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#04060a',
          900: '#070a11',
          850: '#0b101c',
          800: '#111726',
          700: '#1c2438',
        },
        gold: {
          50: '#fdfbf0',
          100: '#faeecf',
          200: '#f5dda1',
          300: '#ecc669',
          400: '#e5b23e',
          500: '#d49b22',
          600: '#b87c18',
          700: '#925c16',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 35s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F9E79F 0%, #D4AF37 50%, #AA7C11 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
        'luxury-dark': 'radial-gradient(ellipse at 50% 0%, #151e33 0%, #060911 75%)',
        'card-glow': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
