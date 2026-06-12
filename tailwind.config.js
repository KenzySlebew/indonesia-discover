/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // PRIMARY ACCENT — warm brown, locked across all pages
        merah: {
          DEFAULT: '#8B5E3C',     // warm medium brown (primary accent)
          dark: '#6B3F1F',        // dark espresso
          light: '#F5EDE4',       // cream light
          mid: '#A0714D',         // mid brown
        },
        // SECONDARY / HEADINGS / FOOTER — deep chocolate brown
        navy: {
          DEFAULT: '#3B2216',     // deep chocolate (headings, footer)
          light: '#5A3A28',
          soft: '#6B4A34',
        },
        // LIGHT SURFACES
        putih: '#FFFFFF',
        'abu-terang': '#FAF6F1',  // warm cream tint
        abu: {
          DEFAULT: '#7D6B5D',     // warm gray-brown
          gelap: '#4A3A2E',       // dark warm gray
          muda: '#E8DDD3',        // soft warm border
        },
        // DARK — ONLY for footer
        hitam: {
          DEFAULT: '#1A0E06',
        },
      },
      fontFamily: {
        heading: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['4.5rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-lg': ['5.5rem', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        '2xl': '16px',
      },
      boxShadow: {
        // Brown-tinted shadows for warmth
        'card': '0 1px 3px rgba(59, 34, 22, 0.06), 0 8px 24px -4px rgba(59, 34, 22, 0.08)',
        'card-hover': '0 4px 16px rgba(139, 94, 60, 0.12), 0 16px 40px -8px rgba(59, 34, 22, 0.14)',
        'merah': '0 4px 20px rgba(139, 94, 60, 0.3)',
      },
      animation: {
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
