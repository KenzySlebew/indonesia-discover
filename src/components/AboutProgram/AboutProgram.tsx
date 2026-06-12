import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { programPillars, statistics } from '../../data/program';

/* ── Count-up hook (tasteskill 5.C: motivated animation) */
function useCountUp(end: number, duration: number, inView: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, inView]);

  return count;
}

/* ── Stat counter (inView-gated for motivated animation) */
function StatCounter({ value, label, inView }: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const count = useCountUp(value, 2000, inView);
  return (
    <div className="relative overflow-hidden bg-navy text-white rounded-2xl p-6 sm:p-7 shadow-lg mt-6 flex items-center gap-5 group border border-navy-light/40">
      {/* Subtle map compass decoration in background */}
      <div className="absolute -right-6 -bottom-6 opacity-[0.07] text-white pointer-events-none transition-transform duration-[1.5s] ease-out-expo group-hover:rotate-45 group-hover:scale-110">
        <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
        </svg>
      </div>

      {/* Map pin icon */}
      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-merah flex-shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-inner">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="font-heading font-extrabold text-4xl sm:text-5xl text-white tabular leading-none mb-1">
          {count}
        </div>
        <div className="font-body text-[11px] text-white/70 tracking-wider uppercase font-semibold">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ── Pillar icon (svg only) */
const ICONS: Record<string, JSX.Element> = {
  compass: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
    </svg>
  ),
  heritage: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M10 10h4" />
    </svg>
  ),
  community: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  digital: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

/**
 * AboutProgram — split-screen layout featuring a details section on the left
 * and a 2x2 grid of pillar cards on the right.
 */
export default function AboutProgram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="program"
      ref={sectionRef}
      className="bg-abu-terang/30 py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-merah/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Header text + Stat Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-navy leading-[1.1] tracking-tight mb-5">
                Berkarya untuk Indonesia
              </h2>
              <p className="font-body text-abu text-sm sm:text-base lg:text-lg leading-relaxed max-w-[42ch] mb-4">
                Gerakan kolaboratif untuk memetakan keindahan nusantara, melestarikan warisan budaya, dan memberdayakan pelaku ekonomi kreatif lokal.
              </p>
            </motion.div>

            {/* Stat Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {statistics.map((stat) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  inView={isInView}
                />
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Grid of pillars (7 cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {programPillars.map((pillar, i) => (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white rounded-2xl border border-abu-muda/50 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
                >
                  {/* Icon Container */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 bg-merah-light text-merah group-hover:bg-merah group-hover:text-white shadow-sm">
                    {ICONS[pillar.icon]}
                  </div>

                  <h3 className="font-heading font-bold text-navy text-base mb-2 group-hover:text-merah transition-colors duration-200">
                    {pillar.title}
                  </h3>

                  <p className="font-body text-abu text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
