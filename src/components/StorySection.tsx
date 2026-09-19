import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0, 0, 0]);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Progressive baseline intensity for each line (as in reference: lines below are lighter, and below even lighter)
  const BASE_COLORS = [
    'rgba(18, 18, 18, 0.40)', // Line 0: muted neutral
    'rgba(18, 18, 18, 0.26)', // Line 1: lighter
    'rgba(18, 18, 18, 0.16)', // Line 2: even lighter
    'rgba(18, 18, 18, 0.08)', // Line 3: faintest whisper
  ];

  // Butter-smooth scroll animation with requestAnimationFrame damping / lerp
  useEffect(() => {
    const updateTarget = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // The section starts faint and remains low intensity until user is halfway into the section.
      // startFill: when top of section reaches 35% of viewport height (halfway in)
      const startFill = windowHeight * 0.35;
      const endFill = -rect.height * 0.35;

      const rawProgress = Math.min(1, Math.max(0, (startFill - rect.top) / (startFill - endFill)));
      targetProgressRef.current = rawProgress;
    };

    const animate = () => {
      // Smooth linear interpolation (lerp) so mousewheel scrolling translates fluidly back & forth
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current += diff * 0.11;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      // Staggered fill for lines 0, 1, 2, 3
      const p1 = Math.min(1, Math.max(0, (p - 0.00) / 0.32));
      const p2 = Math.min(1, Math.max(0, (p - 0.22) / 0.32));
      const p3 = Math.min(1, Math.max(0, (p - 0.44) / 0.32));
      const p4 = Math.min(1, Math.max(0, (p - 0.68) / 0.32));

      setLineProgress([p1, p2, p3, p4]);
      rafIdRef.current = requestAnimationFrame(animate);
    };

    updateTarget();
    currentProgressRef.current = targetProgressRef.current;
    rafIdRef.current = requestAnimationFrame(animate);

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Compute exact background fill style:
  // Each line starts at its tailored baseline intensity (descending down the lines)
  // and smoothly reveals solid black (rgb(18, 18, 18)) from left to right as the user scrolls.
  const getSplitLineTextStyle = (index: number) => {
    const pct = (lineProgress[index] * 100).toFixed(2);
    const baseColor = BASE_COLORS[index] || 'rgba(18, 18, 18, 0.15)';
    return {
      backgroundImage: `linear-gradient(to right, rgb(18, 18, 18) 0%, rgb(18, 18, 18) ${pct}%, ${baseColor} ${pct}%, ${baseColor} 100%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline',
    };
  };

  return (
    <div className="w-full bg-white text-black">
      <section
        id="story-section"
        ref={sectionRef}
        className="container mx-auto flex flex-col items-center gap-6 py-20 px-6 sm:px-10 lg:gap-4 lg:py-36 text-center max-w-7xl"
      >
        {/* Brand Tag / Badge */}
        <span className="inline-block w-max rounded-full border border-app-black/10 bg-transparent px-4 py-2 font-medium text-app-black/60 text-xs leading-normal mx-auto">
          ALEX Products
        </span>

        {/* Editorial Headline with Split-Line Scroll-Driven Animation & Inline Pill Images */}
        <div className="mb-10 text-app-black tracking-tight lg:mb-14 max-w-6xl mx-auto w-full text-center">
          <div className="space-y-3 lg:space-y-4">
            {/* Split Line 1 */}
            <div>
              <div className="split-line min-h-[44px] sm:min-h-[58px] lg:min-h-[72px] xl:min-h-[82px] flex items-center justify-center text-center">
                <span
                  style={getSplitLineTextStyle(0)}
                  className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] xl:text-[62px] font-normal leading-[1.2] lg:leading-[70px] xl:leading-[80px] tracking-tight lg:tracking-[-2px]"
                >
                  At ALEX, we blend innovation with tradition to
                </span>
              </div>
            </div>

            {/* Split Line 2 with 1st pill image */}
            <div>
              <div className="split-line min-h-[44px] sm:min-h-[58px] lg:min-h-[72px] xl:min-h-[82px] flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:gap-4 text-center">
                <span
                  style={getSplitLineTextStyle(1)}
                  className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] xl:text-[62px] font-normal leading-[1.2] lg:leading-[70px] xl:leading-[80px] tracking-tight lg:tracking-[-2px]"
                >
                  elevate your hydration rituals,
                </span>
                <img
                  className="inline-flex h-10 w-20 sm:h-13 sm:w-26 lg:h-18 lg:w-34 xl:h-20 xl:w-38 rounded-full object-cover align-bottom lg:align-middle shadow-xs transition-transform duration-300 hover:scale-105"
                  src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815423/Water_bottle_on_concrete_ledge_2K_20260919115425_zpk4af.jpg"
                  alt="ALEX Water Bottle on Concrete Ledge"
                  loading="lazy"
                  decoding="async"
                  width="152"
                  height="80"
                />
              </div>
            </div>

            {/* Split Line 3 with 2nd pill image */}
            <div>
              <div className="split-line min-h-[44px] sm:min-h-[58px] lg:min-h-[72px] xl:min-h-[82px] flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:gap-4 text-center">
                <span
                  style={getSplitLineTextStyle(2)}
                  className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] xl:text-[62px] font-normal leading-[1.2] lg:leading-[70px] xl:leading-[80px] tracking-tight lg:tracking-[-2px]"
                >
                  crafting products for extraordinary
                </span>
                <img
                  className="inline-flex h-10 w-20 sm:h-13 sm:w-26 lg:h-18 lg:w-34 xl:h-20 xl:w-38 rounded-full object-cover align-bottom lg:align-middle shadow-xs transition-transform duration-300 hover:scale-105"
                  src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815427/Terracotta_water_bottle_stands_u__2K_20260919115442_ryhxk0.jpg"
                  alt="ALEX Terracotta Water Bottle"
                  loading="lazy"
                  decoding="async"
                  width="152"
                  height="80"
                />
              </div>
            </div>

            {/* Split Line 4 with 3rd pill image */}
            <div>
              <div className="split-line min-h-[44px] sm:min-h-[58px] lg:min-h-[72px] xl:min-h-[82px] flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:gap-4 text-center">
                <span
                  style={getSplitLineTextStyle(3)}
                  className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] xl:text-[62px] font-normal leading-[1.2] lg:leading-[70px] xl:leading-[80px] tracking-tight lg:tracking-[-2px]"
                >
                  moments.
                </span>
                <img
                  className="inline-flex h-10 w-20 sm:h-13 sm:w-26 lg:h-18 lg:w-34 xl:h-20 xl:w-38 rounded-full object-cover align-bottom lg:align-middle shadow-xs transition-transform duration-300 hover:scale-105"
                  src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815419/Water_bottle_on_desk_2K_20260919115409_xrujpy.jpg"
                  alt="ALEX Water Bottle in Studio Setting"
                  loading="lazy"
                  decoding="async"
                  width="152"
                  height="80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center w-full">
          <a
            className="flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-medium tracking-normal transition-all duration-200 ease-in-out bg-app-black text-white hover:shadow-[0_0_0_4px_rgba(18,18,18,0.2),0_0_0_8px_rgba(18,18,18,0.1)] active:bg-neutral-800 py-[14px] text-sm h-12 px-7"
            href="#meet-alex"
          >
            <span>Meet ALEX</span>
            <ArrowRight className="h-4 w-4 text-white" />
          </a>
        </div>
      </section>
    </div>
  );
};
