/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // PRIMARY ACCENT — one accent, locked across all pages (tasteskill 4.2)
        merah: {
          DEFAULT: '#CE1126',
          dark: '#A50D1F',
          light: '#FDECEA',
          mid: '#D7263D',
        },
        // SECONDARY / HEADINGS / FOOTER
        navy: {
          DEFAULT: '#071C53',
          light: '#0D2B7A',
          soft: '#1A3A7A',
        },
        // LIGHT SURFACES (all within same light family — tasteskill 4.11)
        putih: '#FFFFFF',
        'abu-terang': '#F5F5F5',  // subtle section bg tint, same light family
        abu: {
          DEFAULT: '#6B7280',
          gelap: '#374151',
          muda: '#E5E7EB',
        },
        // DARK — ONLY for footer (the one deliberate dark element)
        hitam: {
          DEFAULT: '#0A0A0A',
        },
      },
      fontFamily: {
        // NO SERIF per tasteskill 4.1 — sans-serif display only
        heading: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Display scale — planned with image size per tasteskill 4.7
        'display-sm': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['4.5rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-lg': ['5.5rem', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        // SHAPE CONSISTENCY LOCK (tasteskill 4.4):
        // Cards = 2xl (16px), Buttons = full (pill), Inputs = xl (12px)
        '2xl': '16px',
      },
      boxShadow: {
        // Tinted to background hue (tasteskill 4.4 — no pure black drop shadows)
        'card': '0 1px 3px rgba(7, 28, 83, 0.06), 0 8px 24px -4px rgba(7, 28, 83, 0.08)',
        'card-hover': '0 4px 16px rgba(206, 17, 38, 0.1), 0 16px 40px -8px rgba(7, 28, 83, 0.12)',
        'merah': '0 4px 20px rgba(206, 17, 38, 0.25)',
      },
      animation: {
        // MOTIVATED animations only (tasteskill: motion must serve a purpose)
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'slide-in': 'slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'progress': 'progress 5s linear',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'progress': {
          from: { width: '0%' },
          to: { width: '100%' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
