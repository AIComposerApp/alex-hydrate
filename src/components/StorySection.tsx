import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0, 0]);
  const [imgProgress, setImgProgress] = useState<number[]>([0, 0, 0]);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Smooth scroll animation centered around the middle of the section
  useEffect(() => {
    const updateTarget = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Centered around the middle of the section:
      // Animation starts when top of section reaches 68% of viewport (middle entrance)
      // and completes linearly as section reaches 18% of viewport (middle-to-top exit)
      const startOffset = windowHeight * 0.68;
      const endOffset = windowHeight * 0.18;
      const totalRange = startOffset - endOffset;

      const rawProgress = (startOffset - rect.top) / totalRange;
      targetProgressRef.current = Math.min(1, Math.max(0, rawProgress));
    };

    const animate = () => {
      // Smooth linear interpolation (lerp) for liquid mousewheel and touch scroll
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * 0.12;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;

      // Unified, continuous horizontal reveal across the 3 balanced lines:
      // Line 1: 0.00 -> 0.38
      // Line 2: 0.31 -> 0.69
      // Line 3: 0.62 -> 1.00
      const p1 = Math.min(1, Math.max(0, (p - 0.00) / 0.38));
      const p2 = Math.min(1, Math.max(0, (p - 0.31) / 0.38));
      const p3 = Math.min(1, Math.max(0, (p - 0.62) / 0.38));
      setLineProgress([p1, p2, p3]);

      // Synchronized image illumination as the horizontal wave passes through
      const img1 = Math.min(1, Math.max(0, (p - 0.28) / 0.25));
      const img2 = Math.min(1, Math.max(0, (p - 0.58) / 0.25));
      const img3 = Math.min(1, Math.max(0, (p - 0.78) / 0.22));
      setImgProgress([img1, img2, img3]);

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

  // Compute clean 180° / horizontal linear text reveal:
  // Fills linearly from left to right (#121212), with a single consistent baseline color
  const getLinearStyle = (index: number) => {
    const pct = (lineProgress[index] * 100).toFixed(1);
    return {
      backgroundImage: `linear-gradient(90deg, #121212 0%, #121212 ${pct}%, rgba(18, 18, 18, 0.22) ${pct}%, rgba(18, 18, 18, 0.22) 100%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline',
    };
  };

  return (
    <div className="w-full bg-white text-black overflow-hidden selection:bg-black selection:text-white">
      <section
        id="story-section"
        ref={sectionRef}
        className="container mx-auto flex flex-col items-center gap-7 sm:gap-9 py-20 px-4 sm:px-8 md:px-10 lg:gap-11 lg:py-36 text-center max-w-6xl"
      >
        {/* Brand Tag / Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-4 py-1.5 text-xs font-medium text-black/60 shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
          ALEX Philosophy
        </div>

        {/* Editorial Headline with Responsive Organization & 180° Linear Horizontal Reveal */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4.5 text-center">
          {/* Line 1 */}
          <div className="flex items-center justify-center text-center w-full">
            <h3
              style={getLinearStyle(0)}
              className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[50px] xl:text-[56px] font-normal leading-[1.32] sm:leading-[1.28] tracking-tight lg:tracking-[-1.5px]"
            >
              At ALEX, we blend innovation with tradition to
            </h3>
          </div>

          {/* Line 2: with 1st pill image */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-center w-full">
            <h3
              style={getLinearStyle(1)}
              className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[50px] xl:text-[56px] font-normal leading-[1.32] sm:leading-[1.28] tracking-tight lg:tracking-[-1.5px]"
            >
              elevate your hydration rituals
            </h3>

            {/* Pill Image 1 */}
            <span className="inline-flex items-center justify-center rounded-full overflow-hidden border border-black/10 shadow-xs transition-all duration-300 transform-gpu my-0.5">
              <img
                src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815423/Water_bottle_on_concrete_ledge_2K_20260919115425_zpk4af.jpg"
                alt="ALEX Water Bottle on Concrete Ledge"
                className="h-7 w-14 sm:h-9 sm:w-20 md:h-11 md:w-24 lg:h-13 lg:w-28 xl:h-14 xl:w-32 object-cover transition-all duration-300 hover:scale-105"
                style={{
                  opacity: 0.45 + 0.55 * imgProgress[0],
                  transform: `scale(${0.96 + 0.04 * imgProgress[0]})`,
                }}
                loading="lazy"
                decoding="async"
              />
            </span>

            <h3
              style={getLinearStyle(1)}
              className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[50px] xl:text-[56px] font-normal leading-[1.32] sm:leading-[1.28] tracking-tight lg:tracking-[-1.5px]"
            >
              crafting products
            </h3>
          </div>

          {/* Line 3: with 2nd and 3rd pill images */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-center w-full">
            <h3
              style={getLinearStyle(2)}
              className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[50px] xl:text-[56px] font-normal leading-[1.32] sm:leading-[1.28] tracking-tight lg:tracking-[-1.5px]"
            >
              for extraordinary
            </h3>

            {/* Pill Image 2 */}
            <span className="inline-flex items-center justify-center rounded-full overflow-hidden border border-black/10 shadow-xs transition-all duration-300 transform-gpu my-0.5">
              <img
                src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815427/Terracotta_water_bottle_stands_u__2K_20260919115442_ryhxk0.jpg"
                alt="ALEX Terracotta Water Bottle"
                className="h-7 w-14 sm:h-9 sm:w-20 md:h-11 md:w-24 lg:h-13 lg:w-28 xl:h-14 xl:w-32 object-cover transition-all duration-300 hover:scale-105"
                style={{
                  opacity: 0.45 + 0.55 * imgProgress[1],
                  transform: `scale(${0.96 + 0.04 * imgProgress[1]})`,
                }}
                loading="lazy"
                decoding="async"
              />
            </span>

            {/* Pill Image 3 glued to 'moments.' with whitespace-nowrap to prevent awkward orphan wrapping on mobile */}
            <div className="inline-flex items-center gap-x-2 sm:gap-x-3 whitespace-nowrap">
              <h3
                style={getLinearStyle(2)}
                className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[50px] xl:text-[56px] font-normal leading-[1.32] sm:leading-[1.28] tracking-tight lg:tracking-[-1.5px]"
              >
                moments.
              </h3>

              <span className="inline-flex items-center justify-center rounded-full overflow-hidden border border-black/10 shadow-xs transition-all duration-300 transform-gpu my-0.5">
                <img
                  src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815419/Water_bottle_on_desk_2K_20260919115409_xrujpy.jpg"
                  alt="ALEX Water Bottle in Studio Setting"
                  className="h-7 w-14 sm:h-9 sm:w-20 md:h-11 md:w-24 lg:h-13 lg:w-28 xl:h-14 xl:w-32 object-cover transition-all duration-300 hover:scale-105"
                  style={{
                    opacity: 0.45 + 0.55 * imgProgress[2],
                    transform: `scale(${0.96 + 0.04 * imgProgress[2]})`,
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center w-full mt-2">
          <a
            className="flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-medium tracking-normal transition-all duration-200 ease-in-out bg-[#121212] text-white hover:bg-black active:scale-98 shadow-md hover:shadow-lg py-3.5 px-8 text-sm h-12"
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
