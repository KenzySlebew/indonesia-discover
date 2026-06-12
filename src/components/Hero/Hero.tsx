import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import IndonesiaMap from './IndonesiaMap';
import ProvincePanel from './ProvincePanel';

/**
 * Hero — map-centric layout with text overlay.
 * The map is the dominant visual element, filling the hero.
 * Text content sits on the left as an overlay on larger screens.
 */
export default function Hero() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleProvinceClick = useCallback((key: string) => {
    setSelectedKey(key);
  }, []);

  return (
    <section
      id="hero"
      className="relative bg-white pt-20 pb-6 lg:pt-24 lg:pb-10 overflow-hidden"
    >
      {/* Background — warm brown gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(139,94,60,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Main container ────────────────────────── */}
      <div className="section-container relative z-10">

        {/* ── Text content — sits above the map on mobile, overlays on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 lg:absolute lg:left-10 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-md xl:max-w-lg mb-6 lg:mb-0"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-4"
          >
            Berkarya untuk Indonesia
          </motion.p>

          {/* Headline */}
          <h1
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.1] tracking-tight text-navy mb-5"
          >
            Temukan Indonesia
            <br />
            <span className="text-merah">dari Peta</span>
          </h1>

          {/* Sub-text */}
          <p
            className="font-body text-abu text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-[38ch]"
          >
            Klik provinsi manapun pada peta untuk menjelajahi keindahan wisata di sana.
          </p>

          {/* CTA */}
          <a
            href="#destinasi"
            id="hero-cta-jelajahi"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('destinasi')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary shadow-merah"
          >
            Jelajahi Destinasi
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* ── Full-width interactive map */}
        <div className="relative z-10">
          <div className="map-wrapper w-full relative">
            <IndonesiaMap selectedKey={selectedKey} onProvinceClick={handleProvinceClick} />
            <ProvincePanel selectedKey={selectedKey} onClose={() => setSelectedKey(null)} />
          </div>
        </div>
      </div>
    </section>
  );
}
