import React, { useState, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { siteConfig } from '../siteConfig';

// Brand icon is the stylized "A" glyph
const BRAND_ICON_A = siteConfig.brand.logoIconUrl;
const FOOTER_BOTTLE_IMG = siteConfig.footer.bottleImage;
const TIKTOK_URL = siteConfig.footer.tiktokUrl;

interface NavLink {
  label: string;
  href: string;
}

const PRIMARY_LINKS: NavLink[] = siteConfig.footer.primaryLinks;

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLElement | null>(null);

  // Scroll tracking linked to the footer container entering from viewport bottom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Buttery, tactile 1:1 mouse scroll spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.55,
    restDelta: 0.001,
  });

  // Downward motion:
  // Starts higher (-100px) so its top peeks above into the upper section,
  // and glides down into its resting position (+25px) as the user scrolls into the footer.
  const bottleY = useTransform(smoothProgress, [0, 1], [-100, 25]);
  const bottleRotate = useTransform(smoothProgress, [0, 1], [-16, -11]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 380);
  };

  return (
    <footer
      ref={containerRef}
      id="alex-footer"
      className="relative z-30 w-full text-white overflow-hidden select-none"
      style={{
        // Architectural static monochrome gradient (deep obsidian, charcoal, subtle silver-white ambient radial highlight)
        background:
          'radial-gradient(ellipse 90% 70% at 85% 65%, #222222 0%, #141414 45%, #0a0a0a 85%, #050505 100%)',
      }}
    >
      {/* Ambient static monochrome mesh glow layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(255,255,255,0.02) 70%, transparent 100%)',
        }}
      />

      {/* 
        Main Footer Container:
        - overflow-visible inside so the bottle top can move freely without clipping.
        - Outer footer has overflow-hidden on the X axis, ensuring nothing pushes the screen width horizontally.
      */}
      <div className="relative container mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-14 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 overflow-visible">
        {/* 
          Left Content Block:
          Mobile: Takes 55-60% max-width on the left so the text never collides or runs behind the bottle.
          Desktop: Clean 48% column leaving generous breathing room so the bottle is completely unobstructed.
        */}
        <div className="relative z-20 w-[55%] sm:w-[50%] lg:w-[46%] max-w-lg flex flex-col justify-between space-y-6 sm:space-y-8">
          <div>
            {/* "designed by vixcee" placed BEFORE the icon */}
            <div className="mb-3 sm:mb-4">
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Designed by vixcee on TikTok"
                aria-label="Visit vixcee on TikTok"
                className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 transition-all text-[11px] text-neutral-300 hover:text-white cursor-pointer select-none backdrop-blur-sm"
              >
                <span>
                  designed by{' '}
                  <strong className="font-semibold text-white">
                    vixcee
                  </strong>
                </span>
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-2 h-2 text-neutral-200 group-hover:text-white transition-colors"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.47 6.3 6.3 0 0 0 1.95-4.48V8.67a8.21 8.21 0 0 0 4.79 1.48V6.69h-.97z" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Brand Lockup: The icon IS the "A", and "LEX" is placed directly adjacent */}
            <div className="inline-flex items-center select-none group">
              <img
                src={BRAND_ICON_A}
                alt="A"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full bg-white/10 p-0.5 border border-white/10"
              />
              <span className="-ml-1.5 sm:-ml-2 text-2xl sm:text-3xl font-bold tracking-tight text-white leading-none">
                LEX
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-tight mt-5">
              Join the current.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-sm">
              Private color drops, limited hardware releases, and architectural notes.
            </p>
          </div>

          {/* Minimalist Pill Subscribe Form */}
          <div className="w-full max-w-sm">
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/15 text-emerald-300 text-xs animate-enter">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>You're in the circle.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="relative w-full rounded-full bg-[#1c1c1c]/90 backdrop-blur-md border border-white/15 p-1 flex items-center shadow-xl focus-within:border-white/35 transition-all"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  aria-label="Email subscription"
                  className="w-full bg-transparent px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs text-white placeholder:text-neutral-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 inline-flex items-center justify-center gap-1 rounded-full bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-[#0c0c0c] hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                >
                  <span>{loading ? '...' : 'Join'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>

          {/* Streamlined Minimalist Nav Links - Confined to left column so it never runs behind bottle */}
          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-2 pt-2 text-xs text-neutral-300">
            {PRIMARY_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 
          Right Product Bottle Display:
          - Pure transparent standalone bottle PNG with zero conflicting background boxes or dark bounding blocks.
          - Mask-image smoothly dissolves only the lower body of the bottle directly into transparency.
          - No horizontal overflow beyond screen boundaries (translate clamped).
        */}
        <div
          className="absolute right-0 bottom-0 w-[50%] sm:w-[48%] lg:w-[46%] max-w-[480px] h-[380px] sm:h-[480px] lg:h-[600px] pointer-events-none select-none flex items-end justify-end z-40 overflow-hidden"
        >
          <motion.div
            style={{
              y: bottleY,
              rotate: bottleRotate,
              transformOrigin: 'bottom center',
            }}
            className="relative w-[280px] sm:w-[380px] lg:w-[460px] translate-x-2 sm:translate-x-0 flex justify-end items-end"
          >
            <img
              src={FOOTER_BOTTLE_IMG}
              alt="ALEX Designer Hydration Vessel"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain pointer-events-none select-none bg-transparent"
              style={{
                // Seamless linear-gradient alpha mask:
                // Upper half of bottle is 100% visible and crisp,
                // Lower half fades smoothly to 0% opacity (pure transparent) into the background
                WebkitMaskImage:
                  'linear-gradient(to top, transparent 0%, transparent 16%, rgba(0,0,0,0.4) 34%, rgba(0,0,0,0.85) 52%, black 68%, black 100%)',
                maskImage:
                  'linear-gradient(to top, transparent 0%, transparent 16%, rgba(0,0,0,0.4) 34%, rgba(0,0,0,0.85) 52%, black 68%, black 100%)',
              }}
            />
          </motion.div>
        </div>

        {/* Minimal Bottom Bar: Simple Copyright positioned strictly in left/center space */}
        <div className="relative z-20 mt-12 sm:mt-16 pt-5 flex items-center justify-between text-[11px] text-neutral-400 max-w-sm sm:max-w-md">
          <span>© {new Date().getFullYear()} {siteConfig.brand.copyrightText}</span>
          <span>Culver City, CA</span>
        </div>
      </div>
    </footer>
  );
};
