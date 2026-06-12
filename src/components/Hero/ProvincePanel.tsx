import { motion, AnimatePresence } from 'framer-motion';
import { provinceData } from '../../data/provinces';

interface ProvincePanelProps {
  selectedKey: string | null;
  onClose?: () => void;
}

/**
 * Province detail panel — displayed below the map when a province is clicked.
 * Shows: province name, image, description, and list of destinations.
 * Light theme: white card, navy text, merah accent. Smooth enter/exit animation.
 */
export default function ProvincePanel({ selectedKey, onClose }: ProvincePanelProps) {
  const province = selectedKey ? provinceData[selectedKey] : null;

  /** Fallback Unsplash URL seeded by province name for consistent placeholder */
  const fallbackImage = (name: string) =>
    `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80&seed=${encodeURIComponent(name)}`;

  return (
    <AnimatePresence mode="wait">
      {province ? (
        <motion.div
          key={selectedKey}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white rounded-3xl border border-abu-muda overflow-hidden shadow-sm mt-8"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left: Image */}
            <div className="w-full lg:w-[42%] aspect-[16/10] lg:aspect-auto lg:min-h-[300px] relative overflow-hidden group">
              <img
                src={province.imagePath}
                alt={province.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = '1';
                    target.src = fallbackImage(province.name);
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right: Info */}
            <div className="w-full lg:w-[58%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-body font-semibold text-[10px] tracking-[0.2em] text-merah uppercase">
                      Wilayah Wisata
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy tracking-tight mt-1 leading-tight">
                      {province.name}
                    </h3>
                  </div>
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="p-1.5 rounded-full hover:bg-abu-terang text-abu hover:text-navy transition-colors focus-ring flex-shrink-0"
                      aria-label="Tutup detail"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Description */}
                <p className="font-body text-abu text-sm sm:text-base leading-relaxed mb-6">
                  {province.description}
                </p>

                {/* Destinations */}
                <div className="mb-6">
                  <h4 className="font-heading font-semibold text-navy text-xs tracking-wider uppercase mb-3">
                    Destinasi Populer
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {province.destinations.map((dest) => (
                      <span
                        key={dest}
                        className="font-body text-xs text-navy bg-abu-terang hover:bg-merah-light hover:text-merah border border-abu-muda/60 rounded-full px-3.5 py-1.5 transition-colors duration-200 cursor-default select-none"
                      >
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-abu-muda/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-body text-xs text-abu">
                  Klik provinsi lain di peta untuk menjelajahi wilayah baru
                </span>
                <a
                  href="#destinasi"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('destinasi')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-body font-semibold text-xs text-merah hover:text-navy flex items-center gap-1 transition-colors group self-end sm:self-auto whitespace-nowrap"
                >
                  Eksplor Destinasi
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transform transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10m0 0L9 4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Empty/invitation state */
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full bg-abu-terang/50 rounded-3xl border border-dashed border-abu-muda/80 p-8 sm:p-12 text-center mt-8 flex flex-col items-center justify-center gap-4"
        >
          <div className="w-14 h-14 rounded-full bg-white border border-abu-muda flex items-center justify-center text-merah shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h4 className="font-heading font-bold text-navy text-lg mb-1">
              Jelajahi Wilayah Indonesia
            </h4>
            <p className="font-body text-abu text-sm max-w-[42ch] mx-auto">
              Klik provinsi manapun pada peta untuk melihat foto, deskripsi, dan destinasi wisata populer di wilayah tersebut.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
