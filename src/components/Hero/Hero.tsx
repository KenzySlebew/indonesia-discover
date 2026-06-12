import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import IndonesiaMap from './IndonesiaMap';
import ProvincePanel from './ProvincePanel';

/**
 * Hero — split-screen layout: left (text + CTA) | right (interactive map).
 * ProvincePanel appears BELOW map on click, NOT as an overlay.
 * No stats below map — stats only in AboutProgram section.
 * tasteskill 4.7: hero fits viewport, max 4 text elements, max 2-line headline.
 */
export default function Hero() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleProvinceClick = useCallback((key: string) => {
    setSelectedKey(key);
    // Smooth scroll to panel after click
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  }, []);

  return (
    <section
      id="hero"
      className="relative bg-white pt-24 pb-12 lg:pb-16"
    >
      {/* Background — subtle topographic-style gradient. NOT decorative orbs. */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(7,28,83,0.03) 0%, transparent 70%)',
        }}
      />

      {/* ── Main container ────────────────────────── */}
      <div className="section-container relative z-10">

        {/* ── Split-screen: Text + Map ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[60vh]">

          {/* LEFT: Text content (5 cols) */}
          <div className="flex flex-col lg:col-span-5">
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.1] tracking-tight text-navy mb-5"
            >
              Temukan Indonesia
              <br />
              <span className="text-merah">dari Peta</span>
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-abu text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-[38ch]"
            >
              Klik provinsi manapun pada peta untuk menjelajahi keindahan wisata di sana.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
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
          </div>

          {/* RIGHT: Interactive map (7 cols) */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="map-wrapper w-full max-w-[680px] lg:max-w-none">
              <IndonesiaMap selectedKey={selectedKey} onProvinceClick={handleProvinceClick} />
            </div>
          </div>
        </div>

        {/* ── Province detail panel (BELOW map, not overlay) ─── */}
        <div ref={panelRef}>
          <ProvincePanel selectedKey={selectedKey} onClose={() => setSelectedKey(null)} />
        </div>
      </div>
    </section>
  );
}
