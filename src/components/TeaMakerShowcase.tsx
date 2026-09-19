import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductVariant } from '../types';

const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    id: 'bottle-1',
    name: 'Ocean Cobalt',
    edition: 'Cobalt Edition',
    description: 'Deep, electric and resolute — engineered for high-altitude endurance and crisp hydration.',
    sliderImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829484/bottle_1_bg_t1zgmw.png',
    thumbImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829484/bottle_1_bg_t1zgmw.png',
  },
  {
    id: 'bottle-2',
    name: 'Alpine Sage',
    edition: 'Sage Edition',
    description: 'Organic forest earth tones balanced with surgical-grade 304 stainless steel purity.',
    sliderImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829551/bottle_2_bg_pixvuw.png',
    thumbImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829551/bottle_2_bg_pixvuw.png',
  },
  {
    id: 'bottle-3',
    name: 'Obsidian Black',
    edition: 'Obsidian Edition',
    description: 'Tactile stealth matte coat. Scratch-resistant, architectural, and eternally timeless.',
    sliderImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829497/bottle_3_bg_fpsl1j.png',
    thumbImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829497/bottle_3_bg_fpsl1j.png',
  },
  {
    id: 'bottle-4',
    name: 'Canyon Coral',
    edition: 'Coral Edition',
    description: 'Warm, radiant earth pigment celebrating active daylight exploration and modern form.',
    sliderImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829511/bottle_4_bg_pmmv4h.png',
    thumbImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829511/bottle_4_bg_pmmv4h.png',
  },
  {
    id: 'bottle-5',
    name: 'Desert Sand',
    edition: 'Sand Edition',
    description: 'Subtle neutral warmth paired with a leakproof dual-thread modular cap construction.',
    sliderImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829519/bottle_5_bg_y8ejlh.png',
    thumbImage:
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829519/bottle_5_bg_y8ejlh.png',
  },
];

// Helper to calculate circular relative offset (-2, -1, 0, 1, 2)
function getOffset(index: number, activeIndex: number, total: number): number {
  let diff = index - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

// Memoized slide item to prevent unnecessary re-renders when parent states update
interface ProductSlideProps {
  variant: ProductVariant;
  index: number;
  activeIndex: number;
  slideSpacing: number;
  isSectionVisible: boolean;
  onSelect: (index: number) => void;
  slideRef: (el: HTMLDivElement | null) => void;
}

const ProductSlide = React.memo<ProductSlideProps>(
  ({
    variant,
    index,
    activeIndex,
    slideSpacing,
    isSectionVisible,
    onSelect,
    slideRef,
  }) => {
    const total = PRODUCT_VARIANTS.length;
    const baseOffset = getOffset(index, activeIndex, total);
    const absDist = Math.abs(baseOffset);
    const initialTranslateX = baseOffset * slideSpacing;
    const initialTranslateY = absDist * 28;
    const initialScale = Math.max(0.48, 1.05 - absDist * 0.28);
    const initialOpacity =
      absDist > 1.35 ? 0 : Math.max(0, 1 - Math.pow(absDist / 1.35, 1.6) * 0.95);
    const initialZIndex = absDist < 0.45 ? 45 : Math.max(1, 30 - Math.round(absDist * 10));

    return (
      <div
        ref={slideRef}
        onClick={() => onSelect(index)}
        className="absolute top-0 bottom-0 m-auto flex items-center justify-center w-[300px] sm:w-[380px] md:w-[460px] lg:w-[540px] xl:w-[600px] h-full transform-gpu will-change-transform cursor-pointer"
        style={{
          transform: `translate3d(${initialTranslateX}px, ${initialTranslateY}px, 0) scale(${initialScale})`,
          opacity: initialOpacity,
          zIndex: initialZIndex,
          transition: 'none',
        }}
      >
        {isSectionVisible ? (
          <img
            src={variant.sliderImage}
            alt={variant.name}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="max-h-[440px] sm:max-h-[520px] md:max-h-[600px] lg:max-h-[680px] xl:max-h-[740px] w-full select-none object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] pointer-events-none"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
    );
  }
);
ProductSlide.displayName = 'ProductSlide';

// Memoized color swatch item to avoid re-rendering inactive swatches
interface ColorSwatchButtonProps {
  variant: ProductVariant;
  index: number;
  isSelected: boolean;
  isSectionVisible: boolean;
  onSelect: (index: number) => void;
}

const ColorSwatchButton = React.memo<ColorSwatchButtonProps>(
  ({ variant, index, isSelected, isSectionVisible, onSelect }) => (
    <button
      key={variant.id}
      onClick={() => onSelect(index)}
      type="button"
      aria-label={variant.name}
      className={`group relative h-13 w-13 sm:h-15 sm:w-15 lg:h-16 lg:w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-b from-black/80 to-neutral-900/60 p-1.5 transition-all duration-300 ease-out ${
        isSelected
          ? 'ring-2 ring-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.35)] bg-white/10'
          : 'ring-2 ring-white/10 hover:ring-white/40 hover:scale-105 opacity-70 hover:opacity-100'
      }`}
    >
      {isSectionVisible ? (
        <img
          src={variant.thumbImage}
          alt={variant.name}
          loading="lazy"
          decoding="async"
          className="size-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="size-full rounded-lg bg-neutral-900/50" />
      )}
    </button>
  )
);
ColorSwatchButton.displayName = 'ColorSwatchButton';

export const TeaMakerShowcase: React.FC = React.memo(() => {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default to Obsidian Black
  const [slideSpacing, setSlideSpacing] = useState<number>(480);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to load product images lazily, reducing the impact of scroll-related performance bottlenecks
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '300px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Interaction tracking state (kept purely in refs for 0ms input latency & 144fps responsiveness)
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const currentDeltaXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(2);
  const slideSpacingRef = useRef<number>(480);
  const rafIdRef = useRef<number | null>(null);

  const isInitialMountRef = useRef<boolean>(true);

  // Keep activeIndexRef & slideSpacingRef in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    slideSpacingRef.current = slideSpacing;
  }, [slideSpacing]);

  // Responsive slide spacing calculation
  const updateSlideSpacing = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 640) setSlideSpacing(280);
    else if (w < 768) setSlideSpacing(350);
    else if (w < 1024) setSlideSpacing(420);
    else if (w < 1280) setSlideSpacing(490);
    else setSlideSpacing(540);
  }, []);

  useEffect(() => {
    updateSlideSpacing();
    window.addEventListener('resize', updateSlideSpacing, { passive: true });
    return () => window.removeEventListener('resize', updateSlideSpacing);
  }, [updateSlideSpacing]);

  // Asset decoding & preloading triggered only after IntersectionObserver fires
  useEffect(() => {
    if (!isSectionVisible) return;
    const urls = [
      ...PRODUCT_VARIANTS.map((v) => v.sliderImage),
      ...PRODUCT_VARIANTS.map((v) => v.thumbImage),
    ];
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });
  }, [isSectionVisible]);

  // Direct GPU update helper: transforms slides directly without triggering React reconciliations
  const applySlidePositions = useCallback((dragOffset: number, isDirectDrag: boolean) => {
    const total = PRODUCT_VARIANTS.length;
    const spacing = slideSpacingRef.current;
    const currentActive = activeIndexRef.current;
    const dragShift = dragOffset / spacing;

    for (let i = 0; i < total; i++) {
      const el = slideRefs.current[i];
      if (!el) continue;

      const baseOffset = getOffset(i, currentActive, total);
      const dynamicOffset = baseOffset + dragShift;
      const absDist = Math.abs(dynamicOffset);

      const translateX = dynamicOffset * spacing;
      const translateY = absDist * 28;
      const scale = Math.max(0.48, 1.05 - absDist * 0.28);

      // Optical depth layering:
      // Active center: 100% opacity, scale 1.05, top z-index (45)
      // Flanks: scale 0.77, opacity 0.60
      // Rear/background: opacity 0
      const opacity =
        absDist > 1.35 ? 0 : Math.max(0, 1 - Math.pow(absDist / 1.35, 1.6) * 0.95);
      const zIndex = absDist < 0.45 ? 45 : Math.max(1, 30 - Math.round(absDist * 10));

      el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${zIndex}`;

      if (isDirectDrag) {
        el.style.transition = 'none';
      } else {
        el.style.transition =
          'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease-out';
      }
    }
  }, []);

  // Sync positions when activeIndex or spacing updates (no animation on initial mount)
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      applySlidePositions(0, true);
    } else {
      applySlidePositions(0, false);
    }
  }, [activeIndex, slideSpacing, applySlidePositions]);

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    currentDeltaXRef.current = 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    // Remove transitions immediately for instant 1:1 direct tracking
    for (let i = 0; i < PRODUCT_VARIANTS.length; i++) {
      const el = slideRefs.current[i];
      if (el) el.style.transition = 'none';
    }

    if (cursorRef.current && e.pointerType !== 'touch' && window.innerWidth >= 768) {
      cursorRef.current.style.transform = cursorRef.current.style.transform.replace(
        'scale(1)',
        'scale(0.88)'
      );
      const textSpan = cursorRef.current.querySelector('span');
      if (textSpan) textSpan.textContent = 'PAN';
    }
  };

  // Window-level smooth gesture & cursor tracking
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      // 1. Direct hardware-accelerated update for follower cursor (Desktop only)
      const isTouchOrMobile =
        e.pointerType === 'touch' ||
        (typeof window !== 'undefined' && window.innerWidth < 768);

      if (cursorRef.current) {
        if (isTouchOrMobile) {
          cursorRef.current.style.opacity = '0';
        } else if (sliderRef.current) {
          const rect = sliderRef.current.getBoundingClientRect();
          const inBounds =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (inBounds || isDraggingRef.current) {
            cursorRef.current.style.opacity = '1';
            cursorRef.current.style.transform = `translate3d(${e.clientX - rect.left}px, ${
              e.clientY - rect.top
            }px, 0) translate(-50%, -50%) scale(${isDraggingRef.current ? 0.88 : 1})`;
          } else {
            cursorRef.current.style.opacity = '0';
          }
        }
      }

      // 2. High-speed drag update (Direct DOM transform - 0 React re-renders)
      if (isDraggingRef.current) {
        const deltaX = e.clientX - startXRef.current;
        currentDeltaXRef.current = deltaX;

        const now = performance.now();
        const dt = now - lastTimeRef.current;
        if (dt > 8) {
          velocityRef.current = (e.clientX - lastXRef.current) / dt;
          lastXRef.current = e.clientX;
          lastTimeRef.current = now;
        }

        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            applySlidePositions(currentDeltaXRef.current, true);
            rafIdRef.current = null;
          });
        }
      }
    };

    const handleGlobalPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      const offset = currentDeltaXRef.current;
      const velocity = velocityRef.current;
      const total = PRODUCT_VARIANTS.length;

      // Threshold check: either sufficient distance or flick velocity
      const isSwipeLeft = offset < -45 || velocity < -0.35;
      const isSwipeRight = offset > 45 || velocity > 0.35;

      let nextIndex = activeIndexRef.current;
      if (isSwipeLeft) {
        nextIndex = (activeIndexRef.current + 1) % total;
      } else if (isSwipeRight) {
        nextIndex = (activeIndexRef.current - 1 + total) % total;
      }

      // Commit new activeIndex
      setActiveIndex(nextIndex);

      currentDeltaXRef.current = 0;
      velocityRef.current = 0;

      if (cursorRef.current) {
        cursorRef.current.style.transform = cursorRef.current.style.transform.replace(
          'scale(0.88)',
          'scale(1)'
        );
        const textSpan = cursorRef.current.querySelector('span');
        if (textSpan) textSpan.textContent = 'DRAG';
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [applySlidePositions]);

  // Memoize active product variant to avoid unnecessary object lookups & prop recalculations
  const activeVariant = useMemo(
    () => PRODUCT_VARIANTS[activeIndex] || PRODUCT_VARIANTS[2],
    [activeIndex]
  );

  // Memoize explore CTA link
  const exploreHref = useMemo(
    () => `#explore?edition=${encodeURIComponent(activeVariant.edition)}`,
    [activeVariant.edition]
  );

  // Memoized variant selection handler passed to memoized children
  const handleSelectVariant = useCallback((index: number) => {
    if (!isDraggingRef.current || Math.abs(currentDeltaXRef.current) < 15) {
      setActiveIndex(index);
    }
  }, []);

  return (
    <section
      id="product-showcase-section"
      ref={sectionRef}
      style={{ backgroundColor: '#000000' }}
      className="relative overflow-hidden bg-[#000000] py-20 lg:py-28 xl:py-32 text-white select-none"
    >
      {/* Studio Background: Pure CSS true pitch-black with subtle dark-charcoal ambient spotlight (0ms paint, 0 lag) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(28, 28, 30, 0.45) 0%, rgba(10, 10, 10, 0.85) 55%, #000000 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000]" />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full">
        {/* Header Badge & Title */}
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 px-6 text-center mb-8 lg:mb-14">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-xs">
            <span className="text-xs font-medium text-white/60 tracking-normal">ALEX Modular</span>
          </div>
          <h2 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[62px] xl:text-[70px] font-normal leading-[1.15] tracking-tight text-white">
            ALEX Stainless Bottle Pro
          </h2>
        </div>

        {/* Main Interactive Carousel Area */}
        <div className="w-full mt-2 lg:mt-6">
          {/* Edge gradient fade masks (High performance alternative to CSS mask-image) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-r from-[#000000] to-transparent z-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-l from-[#000000] to-transparent z-40" />

          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 overflow-hidden">
            <div
              ref={sliderRef}
              onPointerDown={handlePointerDown}
              className="relative cursor-default md:cursor-grab md:active:cursor-grabbing select-none py-4 sm:py-6 lg:py-8 touch-pan-y md:touch-none"
            >
              {/* Smooth Follower Drag Cursor (Desktop only, hardware accelerated) */}
              <div
                ref={cursorRef}
                className="pointer-events-none absolute top-0 left-0 z-50 hidden md:flex items-center justify-center gap-2 rounded-full border border-white/20 bg-neutral-900 shadow-[0_12px_36px_rgba(0,0,0,0.8)] transition-opacity duration-300 ease-out opacity-0 will-change-transform"
                style={{
                  width: '84px',
                  height: '84px',
                  transform: 'translate3d(-9999px, -9999px, 0)',
                }}
              >
                <ChevronLeft className="w-3.5 h-3.5 text-white/70" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90 select-none">
                  DRAG
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/70" />
              </div>

              {/*
                OCCLUSION SHIELD BEHIND CENTER BOTTLE:
                Sits directly behind the active hero bottle at z-[35] (hero bottle at z-[45]).
                Occludes background bottles cleanly behind the center product without expensive GPU blur shaders.
              */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[35] w-[360px] sm:w-[480px] md:w-[580px] lg:w-[680px] xl:w-[740px] h-[460px] sm:h-[540px] md:h-[640px] lg:h-[720px] xl:h-[780px] rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 75%)',
                }}
              />

              {/* Slider track: Expanded to monumental scale on desktop */}
              <div className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] lg:h-[700px] xl:h-[760px] flex items-center justify-center">
                {PRODUCT_VARIANTS.map((variant, index) => (
                  <ProductSlide
                    key={variant.id}
                    variant={variant}
                    index={index}
                    activeIndex={activeIndex}
                    slideSpacing={slideSpacing}
                    isSectionVisible={isSectionVisible}
                    onSelect={handleSelectVariant}
                    slideRef={(el) => {
                      slideRefs.current[index] = el;
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Control Bar: Color Swatches, Dynamic Edition Description, and Explore Button */}
          <div className="container max-w-6xl mx-auto px-6 sm:px-8 mt-6 sm:mt-10 lg:mt-12 flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            {/* Swatch Selection Buttons */}
            <div className="flex items-center gap-3 sm:gap-4 order-1 lg:order-1">
              {PRODUCT_VARIANTS.map((variant, idx) => (
                <ColorSwatchButton
                  key={variant.id}
                  variant={variant}
                  index={idx}
                  isSelected={activeIndex === idx}
                  isSectionVisible={isSectionVisible}
                  onSelect={handleSelectVariant}
                />
              ))}
            </div>

            {/* Dynamic Variant Description Text */}
            <div className="text-center text-sm sm:text-base text-white/80 max-w-md lg:max-w-xs lg:text-left order-2 lg:order-2 min-h-[48px] flex items-center justify-center lg:justify-start">
              <p key={activeVariant.id} className="leading-relaxed animate-fadeIn">
                {activeVariant.description}
              </p>
            </div>

            {/* Explore CTA Pill Button */}
            <div className="order-3 lg:order-3">
              <a
                href={exploreHref}
                className="flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-medium tracking-normal transition-all duration-200 ease-in-out bg-white text-[#121212] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.25),0_0_0_8px_rgba(255,255,255,0.1)] active:scale-95 px-7 py-3 text-sm h-12"
              >
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 text-[#121212]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

TeaMakerShowcase.displayName = 'TeaMakerShowcase';
