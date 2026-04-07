/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Design tokens (light UI) – optional aliases */
        primary: '#2563EB',
        secondary: '#4F46E5',
        accent: '#F59E0B',
        bg: '#F8FAFC',
        card: '#FFFFFF',
        border: '#E2E8F0',
        text: '#1E293B',
        cyberpunk: {
          cyan: '#00FFFF',
          blue: '#00D9FF',
          pink: '#FF00FF',
          green: '#00FF41',
          purple: '#9D00FF',
          orange: '#FF6B00',
        },
        dark: {
          bg: '#0A0A0F',
          card: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        /* Academic Aurora – light theme only (brand name stays brand.college / brand.care) */
        light: {
          primary: '#2563EB',
          primaryDark: '#1D4ED8',
          primaryDeeper: '#1E40AF',
          secondary: '#4F46E5',
          accent: '#10B981',
          accentHover: '#059669',
          highlight: '#F59E0B',
          highlightText: '#1E293B',
          bg: '#F8FAFC',
          bgAlt: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          borderSoft: '#E0E7FF',
          text: '#1E293B',
          textMuted: '#475569',
          textCourse: '#334155',
          navBg: '#FFFFFF',
          navText: '#1E293B',
          navHover: '#EFF6FF',
          navBorder: '#E2E8F0',
          navActiveBg: '#F59E0B',
          navActiveText: '#1E293B',
          navItemActiveBg: '#DBEAFE',
          navItemActiveText: '#1E293B',
          submenuBg: '#EFF6FF',
          submenuBorder: '#BFDBFE',
          submenuText: '#1E293B',
          submenuHover: '#EFF6FF',
          submenuActive: '#2563EB',
          submenuActiveText: '#FFFFFF',
          dropdownBg: '#FFFFFF',
          dropdownBorder: '#CBD5E1',
          dropdownHover: '#EFF6FF',
          dropdownSelected: '#DBEAFE',
          dropdownSelectedBorder: '#2563EB',
          listHover: '#EFF6FF',
          filterHover: '#EFF6FF',
          selectedBg: '#DBEAFE',
          selectedFilter: '#2563EB',
          footerBg: '#1E293B',
          footerText: '#CBD5E1',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#0EA5E9',
        },
        brand: {
          college: '#1e3a8a',   /* kept for logo in both themes */
          care: '#7c3aed',      /* kept for logo in both themes */
        }
      },
      fontFamily: {
        heading: ['Orbitron', 'Rajdhani', 'Exo 2', 'sans-serif'],
        body: ['Inter', 'Poppins', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        'human': '250ms',
      },
      boxShadow: {
        /* Soft UI Evolution: softer than flat, clearer than neumorphism (UI/UX Pro Max) */
        'aurora-card': '0 8px 20px rgba(37, 99, 235, 0.15)',
        'soft-ui': '0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)',
        'soft-ui-hover': '0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(37, 99, 235, 0.12)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 15s ease infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.5), 0 0 15px rgba(0, 255, 255, 0.5)',
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.8)',
          },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
      },
    },
  },
  plugins: [],
}
