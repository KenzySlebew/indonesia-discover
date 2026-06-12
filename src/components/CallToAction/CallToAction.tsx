import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { destinations } from '../../data/destinations';

/**
 * Destination carousel CTA section.
 * Background: abu-terang (warm cream).
 * Uses 16:9 aspect ratio cards for a more compact, user-friendly view.
 */
export default function CallToAction() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressKey, setProgressKey] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = destinations.length;

  // Reset video error on slide change
  useEffect(() => {
    setVideoError(false);
  }, [current]);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent(((next % total) + total) % total);
    setProgressKey((k) => k + 1);
  }, [total]);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    autoplayRef.current = setInterval(next, 5000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [next]);

  const pause = () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  const resume = () => { autoplayRef.current = setInterval(next, 5000); };

  const dest = destinations[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '8%' : '-8%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? '8%' : '-8%', opacity: 0 }),
  };

  return (
    <section
      id="destinasi"
      ref={sectionRef}
      className="bg-abu-terang py-24 lg:py-32"
    >
      <div className="section-container">
        {/* ── Header with eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 lg:mb-12"
        >
          <div>
            <p className="eyebrow mb-3">Destinasi Unggulan</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-[1.1] tracking-tight">
              Jelajahi Nusantara
            </h2>
          </div>

          {/* Nav controls */}
          <div className="flex items-center gap-3" aria-label="Navigasi carousel">
            <button
              onClick={prev}
              aria-label="Destinasi sebelumnya"
              className="w-11 h-11 rounded-full flex items-center justify-center border border-abu-muda bg-white text-abu transition-all duration-200 hover:border-navy hover:text-navy focus-ring"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Destinasi berikutnya"
              className="w-11 h-11 rounded-full flex items-center justify-center border border-abu-muda bg-white text-abu transition-all duration-200 hover:border-navy hover:text-navy focus-ring"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Slide counter */}
            <span className="font-body text-xs text-abu tabular ml-1">
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        {/* ── Card — full width, 16:9 ratio (compact) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <div
            className="dest-card w-full"
            style={{ aspectRatio: '16/9' }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={dest.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-navy"
              >
                {/* Video (if available) or Image */}
                {dest.video && !videoError ? (
                  <video
                    src={dest.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-cover"
                    aria-label={`Video destinasi ${dest.title}`}
                  />
                ) : (
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('picsum')) {
                        target.src = `https://picsum.photos/seed/${dest.title.replace(/\s/g, '-').toLowerCase()}/1200/800`;
                      }
                    }}
                  />
                )}

                {/* Gradient scrim for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

                {/* Card content */}
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#8B5E3C" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                    <span className="font-body text-white/70 text-sm">{dest.location}</span>
                  </div>

                  <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mb-3">
                    {dest.title}
                  </h3>

                  <p className="font-body text-white/60 text-sm sm:text-base leading-relaxed max-w-xl">
                    {dest.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Progress dots */}
        <div className="flex items-center gap-2 mt-5" role="tablist" aria-label="Pilih destinasi">
          {destinations.map((d, i) => (
            <button
              key={d.id}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              role="tab"
              aria-selected={i === current}
              aria-label={d.title}
              className={`h-1.5 rounded-full transition-all duration-300 focus-ring ${i === current ? 'bg-merah w-8' : 'bg-abu-muda w-1.5 hover:bg-abu'
                }`}
            />
          ))}

          {/* Auto-progress bar */}
          <div className="flex-1 max-w-[80px] ml-2 h-[1.5px] bg-abu-muda rounded-full overflow-hidden">
            <motion.div
              key={progressKey}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-full bg-merah rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
