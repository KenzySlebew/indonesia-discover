import { motion, AnimatePresence } from 'framer-motion';
import { provinceData } from '../../data/provinces';

interface ProvincePanelProps {
  selectedKey: string | null;
  onClose?: () => void;
}

/**
 * Province detail panel — displayed as a floating card overlaying the map when a province is clicked.
 * Shows: province name, image, description, and list of destinations.
 */
export default function ProvincePanel({ selectedKey, onClose }: ProvincePanelProps) {
  const province = selectedKey ? provinceData[selectedKey] : null;

  /** Fallback Unsplash URL seeded by province name for consistent placeholder */
  const fallbackImage = (name: string) =>
    `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80&seed=${encodeURIComponent(name)}`;

  return (
    <AnimatePresence mode="wait">
      {province && (
        <motion.div
          key={selectedKey}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:top-4 sm:bottom-4 sm:w-[350px] z-20 bg-white rounded-2xl shadow-2xl border border-abu-muda overflow-hidden flex flex-col max-h-[calc(100%-2rem)]"
        >
          {/* Close Button overlapping the image */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90 hover:bg-white text-navy hover:text-merah shadow-md transition-colors duration-200 focus-ring"
              aria-label="Tutup detail"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {/* Top: Image */}
          <div className="w-full aspect-[16/10] relative overflow-hidden flex-shrink-0">
            <img
              src={province.imagePath}
              alt={province.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = '1';
                  target.src = fallbackImage(province.name);
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom: Info (scrollable in case of long content) */}
          <div className="p-5 flex-1 overflow-y-auto flex flex-col justify-between select-none">
            <div>
              <span className="font-body font-semibold text-[10px] tracking-[0.2em] text-merah uppercase">
                Wilayah Wisata
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-navy tracking-tight mt-1 mb-2 leading-tight">
                {province.name}
              </h3>
              <p className="font-body text-abu text-xs sm:text-sm leading-relaxed mb-4">
                {province.description}
              </p>

              {/* Destinations */}
              <div className="mb-4">
                <h4 className="font-heading font-semibold text-navy text-[10px] tracking-wider uppercase mb-2">
                  Destinasi Populer
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {province.destinations.map((dest) => (
                    <span
                      key={dest}
                      className="font-body text-[10px] text-navy bg-abu-terang hover:bg-merah-light hover:text-merah border border-abu-muda/60 rounded-full px-3 py-1 transition-colors duration-200 cursor-default"
                    >
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action button at the bottom */}
            <div className="pt-3 border-t border-abu-muda/60 mt-auto">
              <a
                href="#destinasi"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('destinasi')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full btn-outline flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs text-navy border-navy hover:bg-navy hover:text-white transition-colors duration-300"
              >
                Jelajahi {province.name}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
