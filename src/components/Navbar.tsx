import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Peta', href: '#hero' },
  { label: 'Program', href: '#program' },
  { label: 'Destinasi', href: '#destinasi' },
];

/**
 * Navbar — transparent on hero, transitions to white with navy text on scroll.
 * Single-line at desktop (≤72px height). tasteskill: no scroll cues, one-line nav.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setDrawerOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm ${
          scrolled ? 'shadow-[0_1px_0_rgba(59,34,22,0.08)]' : 'border-b border-abu-muda/50'
        }`}
        style={{ height: '72px' }}  /* tasteskill: max 72px */
      >
        <div className="section-container h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="flex items-center gap-2.5 focus-ring rounded-sm"
            aria-label="Berkarya untuk Indonesia — ke halaman utama"
          >
            {/* Flag mark — two bars */}
            <div className="flex flex-col gap-[3px]">
              <div className="h-[3px] w-5 rounded-full bg-merah" />
              <div className="h-[3px] w-5 rounded-full bg-navy" />
            </div>
            <span className="font-heading font-bold text-sm tracking-tight text-navy">
              Berkarya untuk Indonesia
            </span>
          </a>

          {/* Desktop nav — single line (tasteskill mandate) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-body text-sm font-medium transition-colors duration-300 relative group focus-ring rounded-sm text-abu hover:text-navy"
              >
                {link.label}
                {/* Underline from center */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-merah rounded-full transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#destinasi"
              onClick={(e) => { e.preventDefault(); scrollTo('#destinasi'); }}
              className="hidden sm:inline-flex btn-primary text-xs py-2.5 px-5"
              id="nav-cta-jelajahi"
            >
              Jelajahi
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-xl transition-colors focus-ring text-navy hover:bg-abu-muda"
              aria-label="Buka menu navigasi"
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm"
            />

            {/* Side panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 h-full w-72 z-50 bg-white flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-abu-muda">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-[3px]">
                    <div className="h-[3px] w-4 rounded-full bg-merah" />
                    <div className="h-[3px] w-4 rounded-full bg-navy" />
                  </div>
                  <span className="font-heading font-bold text-xs text-navy tracking-tight">Indonesia</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl text-abu hover:text-navy hover:bg-abu-muda focus-ring"
                  aria-label="Tutup menu"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-6 py-8 flex flex-col gap-1" aria-label="Navigasi mobile">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => scrollTo(link.href)}
                    className="text-left font-heading font-semibold text-navy text-lg px-4 py-3 rounded-2xl hover:bg-abu-terang transition-colors focus-ring"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* Footer CTA */}
              <div className="px-6 pb-8">
                <button
                  onClick={() => scrollTo('#destinasi')}
                  className="w-full btn-primary justify-center"
                >
                  Jelajahi Destinasi
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
