/**
 * Footer — deep chocolate brown background.
 * The ONE deliberate dark element on a light-theme page.
 * Simple 3-column: Branding | Navigation | Social.
 */
export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Peta Provinsi', id: 'hero' },
    { label: 'Tentang Program', id: 'program' },
    { label: 'Destinasi', id: 'destinasi' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: '#',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-navy py-14" aria-label="Footer">
      {/* Single hairline top border */}
      <div className="border-t border-white/10 -mt-14 mb-14" />

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Column 1: Branding */}
          <div>
            <div className="flex items-center gap-2.5 mb-4" aria-label="Berkarya untuk Indonesia">
              <div className="flex flex-col gap-[3px]">
                <div className="h-[3px] w-5 rounded-full bg-merah" />
                <div className="h-[3px] w-5 rounded-full bg-white/30" />
              </div>
              <span className="font-heading font-bold text-sm text-white tracking-tight">
                Berkarya untuk Indonesia
              </span>
            </div>
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
              Gerakan bersama memajukan pariwisata dan budaya lokal dari Sabang sampai Merauke.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-body text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="font-body text-white/50 text-sm hover:text-white transition-colors duration-200 focus-ring rounded-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="font-body text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Ikuti Kami
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-all duration-200 hover:border-white/30 hover:text-white focus-ring"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: copyright */}
        <div className="border-t border-white/[0.06] pt-6">
          <p className="font-body text-white/25 text-xs">
            &copy; {new Date().getFullYear()} Indonesia Discover. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
