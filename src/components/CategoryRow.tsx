import React, { useState, useEffect, useRef } from 'react';
import type { CategoryItem } from '../types';

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: 'cobalt-blue',
    title: 'Cobalt Edition',
    image: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_1000/v1789821662/Blue_reusable_water_bottle_2K_20260919133818_fba0gj.jpg',
    ctas: [
      { label: 'Buy Now', href: '#all-products' },
      { label: 'Explore', href: '#product-showcase-section' },
    ],
    restOffsetY: 'translate-y-[34px]',
  },
  {
    id: 'sage-olive',
    title: 'Sage Edition',
    image: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_1000/v1789821618/892768326127050232.jpg_2K_20260919133814_rog3sd.jpg',
    ctas: [
      { label: 'Buy Now', href: '#all-products' },
      { label: 'Explore', href: '#product-showcase-section' },
    ],
    restOffsetY: 'translate-y-[34px]',
  },
  {
    id: 'charcoal-matte',
    title: 'Charcoal Edition',
    image: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_1000/v1789821615/Charcoal_grey_water_bottle_2K_20260919133823_e6op4h.jpg',
    ctas: [
      { label: 'Buy Now', href: '#all-products' },
      { label: 'Explore', href: '#product-showcase-section' },
    ],
    restOffsetY: 'translate-y-[34px]',
  },
  {
    id: 'terracotta-canyon',
    title: 'Terracotta Edition',
    image: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_1000/v1789821613/Terracotta_orange_water_bottle_2K_20260919133830_tzogno.jpg',
    ctas: [
      { label: 'Buy Now', href: '#all-products' },
      { label: 'Explore', href: '#product-showcase-section' },
    ],
    restOffsetY: 'translate-y-[34px]',
  },
];

export const CategoryRow: React.FC = () => {
  // On mobile, whichever card is in the center of the viewport becomes active/pill-shaped.
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  // On desktop, track hovered card for synchronized container morphing and CTA reveal.
  const [hoveredDesktopIndex, setHoveredDesktopIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;

    const checkInView = () => {
      ticking = false;
      if (window.innerWidth >= 768) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const children = Array.from(container.children) as HTMLElement[];

      let closestIdx = 0;
      let minDistance = Infinity;

      for (let idx = 0; idx < children.length; idx++) {
        const child = children[idx];
        const childRect = child.getBoundingClientRect();
        const childCenterX = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenterX - childCenterX);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      }

      setActiveMobileIndex((prev) => (prev === closestIdx ? prev : closestIdx));
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkInView);
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    checkInView();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      id="best-sellers-section"
      className="w-full bg-white text-neutral-900 py-12 sm:py-16 lg:py-20"
    >
      {/* Brand Tag & Section Title - matching StorySection's container & size */}
      <div className="container mx-auto flex flex-col items-center gap-4 text-center max-w-7xl px-6 sm:px-10 mb-10 sm:mb-14 lg:mb-16">
        <span className="inline-block w-max rounded-full border border-app-black/10 bg-transparent px-4 py-2 font-medium text-app-black/60 text-xs leading-normal mx-auto">
          ALEX Products
        </span>
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] xl:text-[62px] font-normal leading-[1.2] lg:leading-[70px] xl:leading-[80px] tracking-tight lg:tracking-[-2px] text-app-black">
          Best Sellers
        </h2>
      </div>

      {/* Product Showcase Container - Full-bleed on mobile for edge-to-edge flow, elegant grid on desktop */}
      <div
        id="category-row"
        className="w-full max-w-7xl mx-auto px-0 md:px-6 lg:px-8 relative text-white"
      >
        <div className="relative block">
          <div className="swiper !overflow-visible">
            <ul
              ref={scrollContainerRef}
              className="swiper-wrapper flex overflow-x-auto snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-4 gap-4 sm:gap-5 md:gap-5 lg:gap-6 scrollbar-none pb-6 md:pb-0 px-6 md:px-0"
            >
              {CATEGORY_ITEMS.map((item, index) => {
                const isMobileInFrame = activeMobileIndex === index;
                const isDesktopHovered = hoveredDesktopIndex === index;

                return (
                  <li
                    key={item.id}
                    onMouseEnter={() => setHoveredDesktopIndex(index)}
                    onMouseLeave={() => setHoveredDesktopIndex(null)}
                    onClick={() => setActiveMobileIndex(index)}
                    className={`swiper-slide category-row-item group relative aspect-[0.76] w-[270px] sm:w-[290px] md:w-full shrink-0 snap-center md:shrink md:snap-none select-none cursor-pointer md:cursor-default overflow-hidden transform-gpu will-change-[border-radius] transition-[border-radius] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isMobileInFrame
                        ? 'rounded-[145px]'
                        : 'rounded-[20px]'
                    } ${
                      isDesktopHovered
                        ? 'md:rounded-[145px]'
                        : 'md:rounded-[20px]'
                    } md:hover:rounded-[145px]`}
                  >
                    {/* Background Images: 100% opacity, completely clear, 100% stationary */}
                    <div className="absolute inset-0 h-full w-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover object-center pointer-events-none opacity-100"
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        width="500"
                        height="660"
                      />
                    </div>

                    {/*
                      Center Content Cluster (Title + CTA Buttons)
                      At rest: shifted vertically so Title sits at the optical center of the card.
                      On hover / mobile in-frame: translates to center, revealing the CTA buttons with smooth, progressive responsiveness.
                    */}
                    <span
                      className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2.5 transform-gpu will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isMobileInFrame
                          ? 'translate-y-0'
                          : item.restOffsetY
                      } ${
                        isDesktopHovered
                          ? 'md:translate-y-0'
                          : `md:${item.restOffsetY}`
                      } md:group-hover:translate-y-0`}
                    >
                      {/* Pill Title: First container ([color] "Edition") is solid black with crisp white border, not transparent */}
                      <h3 className="category-row-item-title inline-flex items-center justify-center rounded-full bg-black border border-white px-5 py-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-white whitespace-nowrap pointer-events-none shadow-md">
                        {item.title}
                      </h3>

                      {/* CTA Buttons: Outline ONLY, not transparent/milky glass, smoothly reveals on hover / active */}
                      <span
                        className={`category-row-item-cta-buttons m-auto flex flex-col items-center justify-center gap-2 transform-gpu transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                          isMobileInFrame
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-2 pointer-events-none'
                        } ${
                          isDesktopHovered
                            ? 'md:opacity-100 md:translate-y-0 md:pointer-events-auto'
                            : 'md:opacity-0 md:translate-y-2 md:pointer-events-none'
                        } md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto`}
                      >
                        {item.ctas.map((cta) => (
                          <a
                            key={cta.label}
                            href={cta.href}
                            className="category-row-item-cta-button inline-flex w-full min-w-[125px] items-center justify-center rounded-full border border-white bg-transparent px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white whitespace-nowrap transition-all duration-200 hover:bg-white hover:text-neutral-900 cursor-pointer active:scale-95 shadow-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                          >
                            {cta.label}
                          </a>
                        ))}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
