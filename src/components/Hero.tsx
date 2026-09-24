import React, { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../siteConfig';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { hero, brand } = siteConfig;

  useEffect(() => {
    // Ensure muted is set on the native element to guarantee instant mobile autoplay
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoLoaded(true))
          .catch(() => {
            // Autoplay gracefully prevented; fallback poster image is displayed
          });
      }
    }
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full h-[100svh] min-h-[620px] max-h-[1100px] overflow-hidden bg-black flex items-end justify-center"
    >
      {/* Fallback Poster Image from Cloudinary asset with original 1080p quality */}
      <img
        id="hero-fallback-image"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        src={hero.fallbackImage}
        alt={`${brand.name} — ${brand.tagline}`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {/* Cloudinary Video: Original 1080p quality with HTTP/2 byte-range streaming */}
      <video
        id="hero-background-video"
        ref={videoRef}
        className={`absolute inset-0 z-10 h-full w-full object-cover object-center transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-90'
        }`}
        aria-label={`${brand.name} — ${hero.badge}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={hero.fallbackImage}
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
      >
        <source
          src={hero.videoMp4}
          type="video/mp4"
        />
      </video>

      {/* Increased subtle blur overlay at the bottom for smooth text legibility */}
      <div className="blur-overlay"></div>

      {/* Hero Title Container */}
      <div className="container relative z-20 mx-auto px-6 sm:px-10 lg:px-16 pb-28 md:pb-24 lg:pb-28 w-full">
        {/* MOBILE / PHONE LAYOUT: Exact layout from user's uploaded image */}
        <div className="md:hidden flex flex-col text-left max-w-[340px] sm:max-w-[420px]">
          {/* Row 1: Engineered */}
          <h2 className="hero-stagger-item hero-stagger-delay-1 text-[46px] sm:text-[56px] text-white font-normal leading-[0.98] tracking-[-0.03em]">
            {hero.mobileTitle.row1}
          </h2>

          {/* Row 2: "for" + side-by-side architectural subtitle stacked */}
          <div className="hero-stagger-item hero-stagger-delay-2 flex items-center gap-3.5 sm:gap-4.5 my-0.5 sm:my-1">
            <span className="text-[46px] sm:text-[56px] text-white font-normal leading-[0.98] tracking-[-0.03em]">
              {hero.mobileTitle.row2Prefix}
            </span>
            <div className="flex flex-col text-xs sm:text-sm font-medium leading-tight text-white/90 tracking-normal pt-1">
              <span>{hero.mobileTitle.row2Badge[0]}</span>
              <span>{hero.mobileTitle.row2Badge[1]}</span>
            </div>
          </div>

          {/* Row 3: Hydration */}
          <h2 className="hero-stagger-item hero-stagger-delay-3 text-[46px] sm:text-[56px] text-white font-normal leading-[0.98] tracking-[-0.03em]">
            {hero.mobileTitle.row3}
          </h2>
        </div>

        {/* TABLET & DESKTOP LAYOUT: Strictly ON ONE LINE */}
        <div className="hidden md:flex flex-col items-center text-center mx-auto max-w-6xl">
          <span className="hero-stagger-item hero-stagger-delay-1 text-xs lg:text-sm font-medium text-white/85 tracking-[0.2em] mb-2 lg:mb-3">
            {hero.badge}
          </span>
          <h1 className="hero-stagger-item hero-stagger-delay-2 whitespace-nowrap text-5xl lg:text-7xl xl:text-[84px] text-white font-normal leading-none tracking-[-0.035em]">
            {hero.titleDesktop}
          </h1>
        </div>
      </div>
    </section>
  );
};
