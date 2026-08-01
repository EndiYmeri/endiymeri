import { useEffect, useState } from 'react';
import GlassSurface from './GlassSurface';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const compact = scrolled && !hovered;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-full origin-top transition-all duration-300 ease-out"
        style={{
          maxWidth: compact ? 720 : 920,
          transform: compact ? 'scale(0.92)' : 'scale(1)',
        }}
      >
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={999}
          backgroundOpacity={0.5}
          saturation={0.5}
          blur={14}
          brightness={55}
          opacity={0.92}
          className={`h-auto! w-full transition-all duration-300 ease-out ${
            compact
              ? 'px-4 py-1.5 md:px-5 md:py-2'
              : 'px-5 py-3 md:px-8 md:py-3.5'
          }`}
          style={{ minHeight: compact ? 44 : 60 }}
        >
          <div className="flex w-full items-center justify-between gap-6">
            <a
              href="#top"
              className={`font-display font-semibold tracking-[0.18em] text-bone uppercase transition-all duration-300 ${
                compact ? 'text-xs md:text-sm' : 'text-sm md:text-base'
              }`}
            >
              Endi Ymeri
            </a>

            <nav
              className="hidden items-center gap-8 md:flex"
              aria-label="Primary"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-bone-muted transition-all duration-300 hover:text-bone ${
                    compact ? 'text-sm' : 'text-base'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className={`rounded-full border border-white/15 bg-white/5 font-medium tracking-wide text-bone transition-all duration-300 hover:bg-white/10 ${
                compact
                  ? 'px-3 py-1 text-xs'
                  : 'px-4 py-1.5 text-sm md:text-base'
              }`}
            >
              Say hello
            </a>
          </div>
        </GlassSurface>
      </div>    </header>
  );
}
