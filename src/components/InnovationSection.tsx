import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

interface BentoProduct {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  gradientClass: string;
  theme: 'light' | 'terracotta';
  imagePosition: 'right' | 'left';
  desktopGridSpan: string;
  specs: {
    capacity: string;
    temperature: string;
    material: string;
    care: string;
  };
}

const BENTO_PRODUCTS: BentoProduct[] = [
  {
    id: 'charcoal-food-jar',
    badge: 'Culinary Vessel',
    title: 'Thermal Food Jar',
    tagline: 'Charcoal Edition',
    description: 'Wide-mouth vacuum insulation. Engineered to lock heat for 8 hours or chill for 14.',
    image: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_900/v1789930529/charcoal_food_jar_bg_pqkjur.png',
    imageAlt: 'ALEX Charcoal Grey Insulated Food Jar',
    ctaText: 'Explore Vessel',
    gradientClass: 'bento-fluid-rose',
    theme: 'light',
    imagePosition: 'right',
    desktopGridSpan: 'lg:col-span-12',
    specs: {
      capacity: '16 fl oz / 473 ml',
      temperature: '8h Hot • 14h Cold',
      material: 'Pro-grade 18/8 Recycled Stainless Steel',
      care: '100% Dishwasher safe with ergonomic handle',
    },
  },
  {
    id: 'orange-tumbler',
    badge: 'Transit Vessel',
    title: 'Active Tumbler',
    tagline: 'Terracotta Edition',
    description: 'Double-wall cold lock with stealth loop cap engineered for seamless daily commute.',
    image: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_900/v1789929734/orange_tumbler_bg_xejwuq.png',
    imageAlt: 'ALEX Terracotta Orange Water Bottle Tumbler',
    ctaText: 'Explore Tumbler',
    gradientClass: 'bento-fluid-terracotta',
    theme: 'terracotta',
    imagePosition: 'right',
    desktopGridSpan: 'lg:col-span-6',
    specs: {
      capacity: '24 fl oz / 710 ml',
      temperature: '24h Cold • 12h Hot',
      material: 'Impact-resistant matte powder coated steel',
      care: 'Cup-holder friendly & leak-proof seal',
    },
  },
  {
    id: 'lavender-food-jar',
    badge: 'Modular Hardware',
    title: 'Aluminum Carabiner',
    tagline: 'Lavender Edition',
    description: 'Ultralight aerospace-grade aluminum with snag-free wiregate. Fastens ALEX vessels securely to bags and gear.',
    image: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_900/v1789930520/ChatGPT_Image_Sep_20_2026_07_39_08_PM_dowxqm.png',
    imageAlt: 'ALEX Lavender Aluminum Carabiner Clip',
    ctaText: 'Explore Carabiner',
    gradientClass: 'bento-fluid-lavender',
    theme: 'light',
    imagePosition: 'left',
    desktopGridSpan: 'lg:col-span-6',
    specs: {
      capacity: 'Tested to 500 lbs tensile rating',
      temperature: 'All-weather anodized finish',
      material: 'Aerospace-grade 6061 forged aluminum',
      care: 'Snag-free stainless steel wire spring gate',
    },
  },
];

export const InnovationSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<BentoProduct | null>(null);

  return (
    <section
      id="meet-alex"
      className="w-full bg-[#faf9f6] py-20 sm:py-28 lg:py-32 text-neutral-900 border-t border-neutral-200"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-block rounded-full border border-black/10 bg-transparent px-4 py-1.5 font-medium text-black/60 text-xs tracking-normal mb-3 sm:mb-4">
            ALEX Ecosystem
          </span>
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] font-normal leading-[1.18] tracking-tight lg:tracking-[-1.5px] text-[#121212]">
            Everyday vessels. Sculpted for life.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 font-normal max-w-xl">
            Clean architectural lines, food-grade thermal precision, and sustainable matte materials across every format.
          </p>
        </div>

        {/* Bento Grid on Desktop | Overhead Non-Overlapping Stack on Mobile */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-6">
          {BENTO_PRODUCTS.map((product) => {
            const isTerracotta = product.theme === 'terracotta';
            const isLeftImage = product.imagePosition === 'left';

            return (
              <div
                key={product.id}
                id={`bento-${product.id}`}
                className={`${product.desktopGridSpan} ${product.gradientClass} relative overflow-hidden rounded-3xl flex flex-col justify-between select-none ${
                  isTerracotta ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {/* Visible Animated Liquid Light Orbs (Fluid Motion) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <div
                    className={`absolute -top-1/4 -right-1/4 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full blur-2xl opacity-60 mix-blend-overlay animate-liquid-orb-1 ${
                      isTerracotta ? 'bg-amber-200' : 'bg-white'
                    }`}
                  />
                  <div
                    className={`absolute -bottom-1/4 -left-1/4 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full blur-2xl opacity-50 mix-blend-overlay animate-liquid-orb-2 ${
                      isTerracotta ? 'bg-rose-900' : 'bg-amber-100'
                    }`}
                  />
                </div>

                {/* ========================================================= */}
                {/* 1. MOBILE LAYOUT (<lg): 
                       - 1. Overhead Header: Badge + Title + Tagline (Top)
                       - 2. Large Centered Product Vessel: 280px–340px (Zero Overlap)
                       - 3. Bottom Dock: Description + Explore CTA (Neatly Docked)
                */}
                {/* ========================================================= */}
                <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 min-h-[580px] sm:min-h-[620px] lg:hidden">
                  {/* Overhead Header at Top */}
                  <div className="w-full text-left">
                    <span
                      className={`inline-block w-max rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase mb-2 ${
                        isTerracotta
                          ? 'border border-white/30 bg-white/20 text-white backdrop-blur-xs'
                          : 'border border-black/15 bg-white/70 text-neutral-900 backdrop-blur-xs'
                      }`}
                    >
                      {product.badge}
                    </span>
                    <h3
                      className={`text-2xl sm:text-3xl font-normal tracking-tight leading-tight ${
                        isTerracotta ? 'text-white' : 'text-[#121212]'
                      }`}
                    >
                      {product.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-medium mt-0.5 tracking-normal ${
                        isTerracotta ? 'text-white/90' : 'text-neutral-700'
                      }`}
                    >
                      {product.tagline}
                    </p>
                  </div>

                  {/* Prominently Scaled Product Vessel: Centered, 290px-340px high, 65-70% visual prominence */}
                  <div className="w-full my-3 flex items-center justify-center h-[300px] sm:h-[340px]">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      loading="lazy"
                      className="max-h-full max-w-[85%] object-contain filter drop-shadow-none"
                    />
                  </div>

                  {/* Bottom Dock: Cleanly placed under product with description and CTA */}
                  <div className="w-full pt-3 border-t border-black/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p
                      className={`text-xs sm:text-sm leading-relaxed max-w-sm ${
                        isTerracotta ? 'text-white/90' : 'text-neutral-700'
                      }`}
                    >
                      {product.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium tracking-tight transition-transform active:scale-95 cursor-pointer shrink-0 ${
                        isTerracotta
                          ? 'bg-white text-[#121212] hover:bg-neutral-100'
                          : 'bg-[#121212] text-white hover:bg-neutral-800'
                      }`}
                    >
                      <span>{product.ctaText}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* 2. DESKTOP BENTO LAYOUT (lg+):
                       - Enlarged 420px–460px Product Vessels
                       - Positioned Far Left or Far Right with Generous Breathing Space
                */}
                {/* ========================================================= */}
                <div
                  className={`hidden lg:flex relative z-10 w-full min-h-[480px] xl:min-h-[500px] justify-between items-center p-10 xl:p-12 ${
                    isLeftImage ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Text & Button Column */}
                  <div
                    className={`flex flex-col justify-between py-2 ${
                      product.desktopGridSpan === 'lg:col-span-12'
                        ? 'max-w-[460px]'
                        : 'max-w-[280px] xl:max-w-[320px]'
                    }`}
                  >
                    <div>
                      {/* Pill Badge */}
                      <span
                        className={`inline-block w-max rounded-full px-3.5 py-1 text-[11px] font-medium tracking-wide uppercase mb-3 sm:mb-4 ${
                          isTerracotta
                            ? 'border border-white/30 bg-white/20 text-white backdrop-blur-xs'
                            : 'border border-black/15 bg-white/70 text-neutral-900 backdrop-blur-xs'
                        }`}
                      >
                        {product.badge}
                      </span>

                      {/* Punchy Headline */}
                      <h3
                        className={`font-normal tracking-tight leading-tight ${
                          product.desktopGridSpan === 'lg:col-span-12'
                            ? 'text-4xl xl:text-[44px]'
                            : 'text-3xl xl:text-[34px]'
                        } ${isTerracotta ? 'text-white' : 'text-[#121212]'}`}
                      >
                        {product.title}
                      </h3>

                      {/* Tagline */}
                      <p
                        className={`text-sm font-medium mt-1 tracking-normal ${
                          isTerracotta ? 'text-white/90' : 'text-neutral-700'
                        }`}
                      >
                        {product.tagline}
                      </p>

                      {/* Description */}
                      <p
                        className={`mt-3 text-sm leading-relaxed ${
                          isTerracotta ? 'text-white/85' : 'text-neutral-600'
                        }`}
                      >
                        {product.description}
                      </p>
                    </div>

                    {/* CTA Explore Button */}
                    <div className="mt-8 xl:mt-10">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-transform active:scale-95 cursor-pointer ${
                          isTerracotta
                            ? 'bg-white text-[#121212] hover:bg-neutral-100'
                            : 'bg-[#121212] text-white hover:bg-neutral-800'
                        }`}
                      >
                        <span>{product.ctaText}</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Substantial, Large Product Image on Desktop (420px to 460px high) */}
                  <div
                    className={`pointer-events-none select-none flex items-center justify-center ${
                      product.desktopGridSpan === 'lg:col-span-12'
                        ? 'h-[430px] xl:h-[460px] w-[460px] xl:w-[500px]'
                        : 'h-[400px] xl:h-[440px] w-[300px] xl:w-[340px]'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain filter drop-shadow-none transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Quick-View Exploration Modal */}
      {selectedProduct && (
        <div
          id="product-explore-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 text-neutral-900 overflow-hidden animate-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div
                className={`w-40 sm:w-48 h-48 sm:h-56 rounded-2xl flex items-center justify-center p-4 shrink-0 ${selectedProduct.gradientClass}`}
              >
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.imageAlt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1 text-left">
                <span className="inline-block rounded-full border border-black/10 bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                  {selectedProduct.badge}
                </span>
                <h3 className="text-2xl font-normal text-neutral-900 tracking-tight">
                  {selectedProduct.title}
                </h3>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-0.5">
                  {selectedProduct.tagline}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Specs List */}
                <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Capacity:</span>
                    <span className="font-medium text-neutral-800">{selectedProduct.specs.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Retention:</span>
                    <span className="font-medium text-neutral-800">{selectedProduct.specs.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Build:</span>
                    <span className="font-medium text-neutral-800">{selectedProduct.specs.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Maintenance:</span>
                    <span className="font-medium text-neutral-800">{selectedProduct.specs.care}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2.5 rounded-full border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href="#best-sellers-section"
                onClick={() => setSelectedProduct(null)}
                className="px-6 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-medium transition-colors cursor-pointer"
              >
                View Collection
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
