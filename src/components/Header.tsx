import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';

const BRAND_ICON_URL =
  'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_120/v1789854644/ChatGPT_Image_Sep_19_2026_10_49_29_PM_batoch.png';

const ALEX_CATEGORIES = [
  { name: 'Modular Bottles', active: true },
  { name: 'ThermaShield™ Insulated', active: false },
  { name: 'Natural Cork Series', active: false },
  { name: 'Stealth Loop Caps', active: false },
  { name: 'Mix & Match Halves', active: false },
  { name: 'Cleaning & Care', active: false },
  { name: 'All Products', active: false, href: '#all-products' },
];

const ALEX_BOTTLE_PRODUCTS = [
  {
    title: 'ALEX Modular Pro 20oz',
    subtitle: 'Patented Mid-Body Seam',
    color: 'Matte Obsidian',
    tag: 'Best Seller',
    img: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_400/v1789815827/Water_bottles_on_stone_pedestals_2K_20260919120313_b5nlv5.jpg',
    href: '#alex-20oz-obsidian',
  },
  {
    title: 'ALEX Terracotta Edition',
    subtitle: 'Triple-Walled Vacuum',
    color: 'Raw Terracotta',
    tag: 'Architectural',
    img: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_400/v1789815427/Terracotta_water_bottle_stands_u__2K_20260919115442_ryhxk0.jpg',
    href: '#alex-terracotta',
  },
  {
    title: 'ALEX Modular Slate 32oz',
    subtitle: 'Full-Day Hydration',
    color: 'Monochrome Slate',
    tag: 'Cold 36h',
    img: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_400/v1789815423/Water_bottle_on_concrete_ledge_2K_20260919115425_zpk4af.jpg',
    href: '#alex-slate',
  },
  {
    title: 'ALEX Studio Edition 20oz',
    subtitle: 'Built-in Natural Coaster',
    color: 'Matte Graphite',
    tag: 'Signature Base',
    img: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_400/v1789815419/Water_bottle_on_desk_2K_20260919115409_xrujpy.jpg',
    href: '#alex-desk',
  },
];

const ALEX_PHILOSOPHY_LINKS = [
  { label: 'The Modular Body', desc: 'Unscrews in the middle for effortless cleaning & ice loading', href: '#modular-body' },
  { label: 'Form Follows Hydration', desc: 'Zero loud logos or cheap plastic', href: '#philosophy' },
  { label: 'ThermaShield™ Insulation', desc: 'Triple-walled vacuum (36h cold / 12h hot)', href: '#thermashield' },
  { label: '90% Recycled Steel & Cork', desc: 'Eco-conscious circular materials', href: '#materials' },
];

export const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'philosophy' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Modular Bottles');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoSpinning, setLogoSpinning] = useState(false);
  const [cartHovered, setCartHovered] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (type: 'products' | 'philosophy') => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(type);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  // Scroll detection only for desktop top header transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click without requiring any dark backdrop
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        mobileMenuOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* ============================================================ */}
      {/* DESKTOP & TABLET HEADER (Identical on Desktop & Tablet: md:flex) */}
      {/* Zero shadows, no green colors/dots                          */}
      {/* ============================================================ */}
      <header
        id="header"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none mx-auto hidden md:flex items-center justify-between bg-transparent py-6 px-8 lg:px-12 transition-all duration-300"
      >
        {/* Left column (flex-1): ALEX Brand Wordmark transitioning to circular brand icon on scroll */}
        <div className="flex-1 flex items-center justify-start">
          <a
            href="#home"
            className="pointer-events-auto relative inline-flex items-center justify-start group cursor-pointer select-none h-[52px] min-w-[52px]"
            aria-label="ALEX Hydration Homepage"
          >
            {/* Wordmark: Visible at top, transitions out on scroll */}
            <span
              className={`text-2xl lg:text-3xl font-black text-white tracking-[-0.05em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                scrolled
                  ? 'opacity-0 scale-75 pointer-events-none absolute left-0'
                  : 'opacity-100 scale-100 relative'
              }`}
            >
              ALEX
            </span>

            {/* Circular Container with Brand Icon: Appears on scroll */}
            <div
              className={`h-[52px] w-[52px] rounded-full border border-white/10 bg-[#242424]/90 backdrop-blur-xl flex items-center justify-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
                scrolled
                  ? 'opacity-100 scale-100 relative shadow-none'
                  : 'opacity-0 scale-75 pointer-events-none absolute left-0'
              }`}
            >
              <img
                src={BRAND_ICON_URL}
                alt="ALEX"
                className="h-7 w-7 object-contain rounded-full select-none transition-transform duration-300 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>
        </div>

        {/* Center Floating Capsule Nav - Mathematically locked to center, zero position adjustment */}
        <nav className="pointer-events-auto shrink-0">
          <div className="flex items-center overflow-visible rounded-full border border-white/10 bg-[#242424]/90 text-white backdrop-blur-xl transition-all duration-200">
            {/* Products Dropdown trigger */}
            <button
              className={`group relative flex items-center gap-2 px-6 py-3.5 pl-7 text-[15px] font-medium cursor-pointer ${
                activeDropdown === 'products' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              type="button"
              onMouseEnter={() => openDropdown('products')}
              onMouseLeave={scheduleClose}
              onClick={() =>
                setActiveDropdown(activeDropdown === 'products' ? null : 'products')
              }
            >
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-md"></div>
              </div>
              <span className="z-10 transition-opacity duration-200">Products</span>
              <svg
                className={`h-2 w-3 z-10 transition-transform duration-200 ${
                  activeDropdown === 'products' ? 'rotate-180 text-white' : 'text-white/70'
                }`}
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M1 1L5 5L9 1"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Philosophy & The Bottle */}
            <button
              type="button"
              className={`group relative flex items-center px-5 py-3.5 text-[15px] font-medium cursor-pointer ${
                activeDropdown === 'philosophy' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              onMouseEnter={() => openDropdown('philosophy')}
              onMouseLeave={scheduleClose}
              onClick={() =>
                setActiveDropdown(activeDropdown === 'philosophy' ? null : 'philosophy')
              }
            >
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-md"></div>
              </div>
              <span className="z-10">The Bottle</span>
            </button>

            {/* Support */}
            <a
              className="group relative flex items-center px-5 py-3.5 text-[15px] font-medium text-white/80 hover:text-white"
              href="#support"
            >
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-md"></div>
              </div>
              <span className="z-10">Care & Support</span>
            </a>

            {/* Club */}
            <a
              className="group relative flex items-center gap-1.5 px-6 py-3.5 pr-7 text-[15px] font-medium text-white/80 hover:text-white"
              href="#club"
            >
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-md"></div>
              </div>
              <Sparkles className="h-4 w-4 text-neutral-300 group-hover:scale-110 transition-transform" />
              <span className="z-10">Hydration Club</span>
            </a>
          </div>
        </nav>

        {/* Mega Dropdown Menu - POSITIONED AT ROOT OF HEADER, CENTRED ON SCREEN, ZERO RIGHT CUT-OFF */}
        <div
          className={`fixed inset-x-0 top-[84px] z-50 pointer-events-auto transition-all duration-200 ${
            activeDropdown === 'products'
              ? 'visible opacity-100 translate-y-0'
              : 'invisible opacity-0 -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-50 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white">
              <div className="flex px-8 lg:px-12 py-10 lg:py-12">
                {/* Left: Categories List with generous width */}
                <nav className="w-64 lg:w-72 border-r border-neutral-200/60 pr-6 lg:pr-8 shrink-0">
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Explore Collections
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {ALEX_CATEGORIES.map((cat) => (
                      <li key={cat.name} className="flex items-center justify-between">
                        {cat.href ? (
                          <a
                            className="w-full cursor-pointer text-left font-medium text-neutral-900 tracking-tight hover:text-neutral-500 transition-colors text-base lg:text-lg"
                            href={cat.href}
                          >
                            {cat.name}
                          </a>
                        ) : (
                          <button
                            className={`w-full cursor-pointer text-left font-medium tracking-tight transition-colors text-base lg:text-lg flex items-center justify-between ${
                              selectedCategory === cat.name
                                ? 'text-neutral-900 font-bold'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                            type="button"
                            onClick={() => setSelectedCategory(cat.name)}
                          >
                            <span>{cat.name}</span>
                          </button>
                        )}
                        <ChevronRight className="h-4 w-4 text-neutral-400 shrink-0" />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-neutral-100">
                    <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                      <span className="text-xs font-semibold text-neutral-900 block mb-1">
                        The Modular Guarantee
                      </span>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Every bottle splits at the middle. 100% dishwasher safe, 0% funky smell.
                      </p>
                    </div>
                  </div>
                </nav>

                {/* Right: Product Cards Grid (Expanded & Wider, Zero Shadow) */}
                <div className="flex-1 pl-8 lg:pl-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Featured Bottles ({selectedCategory})
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      Patented Mid-Seam Technology
                    </span>
                  </div>
                  <div className="grid min-h-[300px] grid-cols-4 gap-5">
                    {ALEX_BOTTLE_PRODUCTS.map((prod) => (
                      <a
                        key={prod.color}
                        className="group/card flex flex-col justify-between rounded-2xl bg-neutral-50 p-4 text-neutral-900 border border-neutral-200/60 transition-all duration-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                        href={prod.href}
                        title={prod.title}
                      >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-200/50 mb-3">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                            src={prod.img}
                            alt={prod.title}
                            loading="lazy"
                          />
                          <span className="absolute top-2 left-2 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-neutral-900 group-hover/card:bg-black/70 group-hover/card:text-white">
                            {prod.tag}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold leading-tight">
                            {prod.title}
                          </span>
                          <span className="text-xs text-neutral-500 group-hover/card:text-white/70">
                            {prod.color}
                          </span>
                          <span className="text-[11px] font-medium text-neutral-500 mt-1 group-hover/card:text-neutral-300">
                            {prod.subtitle}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Dropdown - POSITIONED CENTRED ON SCREEN, ZERO RIGHT CUT-OFF */}
        <div
          className={`fixed inset-x-0 top-[84px] z-50 pointer-events-auto transition-all duration-200 ${
            activeDropdown === 'philosophy'
              ? 'visible opacity-100 scale-100'
              : 'invisible opacity-0 scale-95 pointer-events-none'
          }`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3 block">
                Architectural Design
              </span>
              <ul className="divide-y divide-neutral-100">
                {ALEX_PHILOSOPHY_LINKS.map((link) => (
                  <li key={link.label} className="group/item py-3 first:pt-0 last:pb-0">
                    <a
                      className="flex flex-col gap-0.5 text-neutral-900 hover:text-neutral-600 transition-colors"
                      href={link.href}
                    >
                      <span className="text-sm font-semibold flex items-center justify-between">
                        {link.label}
                        <ChevronRight className="h-4 w-4 text-neutral-400 group-hover/item:text-neutral-900 group-hover/item:translate-x-0.5 transition-all" />
                      </span>
                      <span className="text-xs text-neutral-500">{link.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right column (flex-1): Shopping Cart Pill Button in balanced container */}
        <div className="flex-1 flex items-center justify-end">
          <button
            type="button"
            className="pointer-events-auto flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/10 bg-[#242424]/90 text-white backdrop-blur-xl hover:bg-[#2e2e2e] transition-colors cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" strokeWidth={1.8} />
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                0
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE FLOATING NAV PINNED TO BOTTOM                         */}
      {/* Studio X layout, permanently visible, smooth collapse & open */}
      {/* font: Plus Jakarta Sans, color: #242424]/90 dark glass      */}
      {/* ============================================================ */}
      <div
        ref={mobileNavRef}
        id="mobile-bottom-nav-wrap"
        className="nav_bar_wrap fixed bottom-7 left-0 right-0 z-50 pointer-events-none md:hidden px-4 sm:px-6 flex flex-col items-center justify-end w-full"
      >
        <nav data-nav="" className="nav_bar w-full max-w-[416px] relative flex flex-col items-center justify-end">
          {/* Expanded Menu Top Panel with smooth collapse and open */}
          <div
            className={`nav_bar_top w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom transform-gpu ${
              mobileMenuOpen
                ? 'max-h-[520px] opacity-100 scale-100 mb-2.5 pointer-events-auto'
                : 'max-h-0 opacity-0 scale-95 mb-0 pointer-events-none'
            }`}
          >
            <div className="w-full rounded-3xl bg-[#1f1f1f]/95 border border-white/10 backdrop-blur-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <img
                    src={BRAND_ICON_URL}
                    alt="ALEX"
                    className="h-6 w-6 object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-base font-black tracking-tight text-white">ALEX</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    Modular Hydration
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="nav_bar_top_inner mt-2">
                <ul role="list" className="nav_link_primary_list divide-y divide-white/5">
                  {[
                    { label: 'Modular Bottles', href: '#all-products' },
                    { label: 'The Modular Body', href: '#modular-body' },
                    { label: 'Form Follows Hydration', href: '#philosophy' },
                    { label: 'ThermaShield™ Insulation', href: '#thermashield' },
                    { label: '90% Recycled Steel & Cork', href: '#materials' },
                    { label: 'Customer Support & Care', href: '#support' },
                  ].map((item) => (
                    <li key={item.label} className="nav_link_primary_item">
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="clickable_link flex items-center justify-between py-3 px-1.5 group transition-colors active:bg-white/5 rounded-lg"
                      >
                        <span className="text-[15px] font-medium text-white/90 tracking-tight group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-white/40 shrink-0 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* nav_bar_bottom: 416x52px container with logo on left and inner bar on right */}
          <div className="nav_bar_bottom relative w-full h-[52px] flex items-center justify-end pointer-events-auto select-none z-40">
            {/* nav_logo_wrap: Left circular brand icon button (52x52px) */}
            <div
              className={`nav_logo_wrap absolute left-0 top-0 w-[52px] h-[52px] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left transform-gpu ${
                mobileMenuOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
              }`}
            >
              <a
                href="#home"
                onMouseEnter={() => setLogoSpinning(true)}
                onMouseLeave={() => setLogoSpinning(false)}
                onTouchStart={() => setLogoSpinning(true)}
                onTouchEnd={() => setTimeout(() => setLogoSpinning(false), 700)}
                className={`nav_logo w-[52px] h-[52px] rounded-full bg-[#242424]/90 border border-white/10 backdrop-blur-xl flex items-center justify-center overflow-hidden active:scale-95 transition-transform ${
                  logoSpinning ? 'animate-logo-spin' : ''
                }`}
                aria-label="ALEX Hydration – Home"
              >
                <img
                  src={BRAND_ICON_URL}
                  alt="ALEX"
                  className="h-7 w-7 object-contain rounded-full select-none"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>

            {/* nav_bar_inner: 356px pill capsule (w-[calc(100%-60px)] expanding to 100%) */}
            <div
              className={`nav_bar_inner relative h-[52px] p-1 flex items-center justify-between rounded-full bg-[#242424]/90 border border-white/10 backdrop-blur-xl transition-[width,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden transform-gpu ${
                mobileMenuOpen ? 'w-full' : 'w-[calc(100%-60px)]'
              }`}
            >
              {/* button.nav_menu: 2-bar animated hamburger + label */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="nav_menu h-[44px] flex items-center gap-3 px-4 sm:px-5 rounded-full text-white cursor-pointer active:scale-95 transition-all"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                <div className="nav_menu_hamburger relative w-5 h-[5px] flex flex-col justify-center items-center">
                  <div
                    className={`nav_hamburger_bar absolute w-5 h-[1.5px] bg-white rounded-full transition-transform duration-300 transform-gpu ${
                      mobileMenuOpen
                        ? 'translate-y-0 -rotate-45 scale-x-80'
                        : '-translate-y-[2.5px]'
                    }`}
                  />
                  <div
                    className={`nav_hamburger_bar absolute w-5 h-[1.5px] bg-white rounded-full transition-transform duration-300 transform-gpu ${
                      mobileMenuOpen
                        ? 'translate-y-0 rotate-45 scale-x-80'
                        : 'translate-y-[2.5px]'
                    }`}
                  />
                </div>
                <div className="nav_menu_label text-[15px] font-medium text-white tracking-[-0.01em] select-none">
                  {mobileMenuOpen ? 'Close' : 'Menu'}
                </div>
              </button>

              {/* nav_bar_button: Action button with rolling letters animation */}
              <div className="nav_bar_button flex items-center h-[44px]">
                <div
                  className="button_main_wrap relative flex items-center justify-center h-[44px] rounded-full bg-white/10 hover:bg-white/15 px-4 sm:px-5 text-white cursor-pointer transition-all active:scale-95 group"
                  onMouseEnter={() => setCartHovered(true)}
                  onMouseLeave={() => setCartHovered(false)}
                  onTouchStart={() => setCartHovered(true)}
                  onTouchEnd={() => setTimeout(() => setCartHovered(false), 1200)}
                >
                  <div className="clickable_wrap absolute inset-0 rounded-full" />
                  <span className="button_main_text_wrap flex items-center gap-2 text-[14px] font-medium text-white select-none">
                    <ShoppingBag className="h-4 w-4 text-white shrink-0" strokeWidth={1.8} />
                    <div className="button_main_text_mask relative h-[18px] overflow-hidden select-none inline-flex items-center">
                      {/* Row 1 */}
                      <span
                        className={`button_main_text inline-flex font-semibold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          cartHovered ? '-translate-y-full' : 'translate-y-0'
                        }`}
                        aria-label="Bag (0 items)"
                      >
                        {['B', 'a', 'g', '\u00A0', '(', '0', ')'].map((char, idx) => (
                          <div
                            key={`r1-${idx}`}
                            style={{ transitionDelay: `${idx * 16}ms` }}
                            className="inline-block transition-transform duration-300"
                          >
                            {char}
                          </div>
                        ))}
                      </span>

                      {/* Row 2 (is-2) */}
                      <span
                        className={`button_main_text is-2 absolute left-0 top-0 inline-flex font-semibold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          cartHovered ? 'translate-y-0' : 'translate-y-full'
                        }`}
                        aria-label="Bag (0 items)"
                      >
                        {['B', 'a', 'g', '\u00A0', '(', '0', ')'].map((char, idx) => (
                          <div
                            key={`r2-${idx}`}
                            style={{ transitionDelay: `${idx * 16}ms` }}
                            className="inline-block transition-transform duration-300"
                          >
                            {char}
                          </div>
                        ))}
                      </span>
                    </div>
                  </span>
                  <div className="button_main_bg_wrap pointer-events-none absolute inset-0 rounded-full" />
                </div>
              </div>

              {/* Pseudo-elements & multi-layer inner shadows matching specs */}
              <div className="nav_bar_inner_fill pointer-events-none absolute inset-0 rounded-full bg-white/[0.02]" />
              <div className="nav_bar_inner_shadow-3 pointer-events-none absolute inset-0 rounded-full nav-inner-shadow-3" />
              <div className="nav_bar_inner_shadow-4 pointer-events-none absolute inset-0 rounded-full nav-inner-shadow-4" />
              <div className="nav_bar_inner_shadow-5 pointer-events-none absolute inset-0 rounded-full nav-inner-shadow-5" />
              <div
                className={`nav_bar_inner_bg pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${
                  mobileMenuOpen ? 'opacity-100 bg-white/[0.04]' : 'opacity-0'
                }`}
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
