import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { programPillars, statistics } from '../../data/program';

/* ── Count-up hook (tasteskill 5.C: motivated animation — communicates state) */
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
function StatCounter({ value, suffix, label, inView }: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const count = useCountUp(value, 2000, inView);
  return (
    <div className="text-center">
      <div className="font-heading font-bold text-5xl sm:text-6xl text-navy tabular leading-none mb-2">
        {count.toLocaleString('id-ID')}{suffix}
      </div>
      <div className="font-body text-xs text-abu tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

/* ── Pillar icon (svg only — per tasteskill 3.C, all SVG from single source) */
const ICONS: Record<string, JSX.Element> = {
  compass: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
    </svg>
  ),
  heritage: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M10 10h4" />
    </svg>
  ),
  community: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  digital: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

/**
 * AboutProgram — four pillar cards + statistics.
 * Light bg (white / abu-terang). No decorative watermarks, no ornamental dividers.
 * tasteskill: section-layout family = grid cards. Scroll-reveal via whileInView.
 * No eyebrow here — already used 1 in Hero (max 1 per 3 sections rule).
 */
export default function AboutProgram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });

  return (
    <section
      id="program"
      ref={sectionRef}
      className="bg-white py-24 lg:py-32"
    >
      <div className="section-container">
        {/* ── Header — NO eyebrow (tasteskill restraint rule) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-[1.1] tracking-tight mb-5">
            Berkarya untuk Indonesia
          </h2>
          <p className="font-body text-abu text-base lg:text-lg leading-relaxed max-w-[52ch]">
            Gerakan untuk memajukan pariwisata dan budaya lokal lewat aksi kreatif dan kolaborasi nyata dari Sabang sampai Merauke.
          </p>
        </motion.div>

        {/* ── Four pillar cards — scroll-reveal stagger (5.C canonical) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20 lg:mb-24">
          {programPillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card p-6 group"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 bg-merah-light text-merah group-hover:bg-merah group-hover:text-white">
                {ICONS[pillar.icon]}
              </div>

              <h3 className="font-heading font-semibold text-navy text-base mb-2.5">
                {pillar.title}
              </h3>

              <p className="font-body text-abu text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* ── Statistics — thin divider then three numbers */}
        <div ref={statsRef}>
          {/* Simple hairline divider — single, no ornamental dots (tasteskill: no decorative dots) */}
          <div className="border-t border-abu-muda mb-14" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20 lg:gap-32"
          >
            {statistics.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={statsInView}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
