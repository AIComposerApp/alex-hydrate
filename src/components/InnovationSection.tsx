import React, { useState } from 'react';
import { Sparkles, ShieldCheck, RefreshCw, Feather, Check } from 'lucide-react';

export const InnovationSection: React.FC = () => {
  const [isUnscrewed, setIsUnscrewed] = useState(false);

  return (
    <section id="meet-alex" className="w-full bg-[#f8f7f5] py-24 sm:py-32 text-neutral-900 border-t border-neutral-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-6xl">
        {/* Header Badge & Title */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="inline-block rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-4 shadow-xs">
            Form Follows Hydration
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900 max-w-2xl leading-tight">
            The bottle re-engineered from the inside out.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Eliminating loud logos, neon colors, and cheap plastics in favor of clean architectural lines, matte textures, and sustainable materials.
          </p>
        </div>

        {/* Interactive Modular Body Showcase */}
        <div className="mb-20 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Splitting Bottle Visual */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-neutral-100/70 rounded-2xl relative min-h-[380px]">
              <div className="flex flex-col items-center transition-all duration-700 ease-out">
                {/* Top Half of Bottle with Stealth Loop */}
                <div
                  className={`w-28 sm:w-32 bg-neutral-900 rounded-t-3xl p-5 text-white flex flex-col items-center justify-center transition-transform duration-700 shadow-md ${
                    isUnscrewed ? '-translate-y-6 sm:-translate-y-8 rotate-[-2deg]' : 'translate-y-0'
                  }`}
                >
                  <div className="h-4 w-12 rounded-full bg-neutral-700 mb-4 border border-neutral-600 flex items-center justify-center">
                    <div className="h-1.5 w-6 rounded-full bg-neutral-500"></div>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">Top Half</span>
                  <span className="text-xs font-semibold mt-1">Wide Spout</span>
                </div>

                {/* Mid-Body Seam Indicator */}
                <div className="my-2 flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-neutral-400"></div>
                  <span className="rounded-full bg-neutral-200 border border-neutral-300 px-2.5 py-0.5 text-[10px] font-bold text-neutral-900">
                    {isUnscrewed ? 'UNSCREWED & SEPARATED' : 'PATENTED MID-SEAM'}
                  </span>
                  <div className="h-0.5 w-8 bg-neutral-400"></div>
                </div>

                {/* Bottom Half of Bottle with Cork Base */}
                <div
                  className={`w-28 sm:w-32 bg-neutral-900 rounded-b-2xl p-5 text-white flex flex-col items-center justify-center transition-transform duration-700 shadow-md border-b-8 border-amber-600/80 ${
                    isUnscrewed ? 'translate-y-6 sm:translate-y-8 rotate-[1deg]' : 'translate-y-0'
                  }`}
                >
                  <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">Bottom Half</span>
                  <span className="text-xs font-semibold mt-1">Direct Scrub Access</span>
                  <div className="mt-4 text-[9px] text-amber-300 font-medium px-2 py-0.5 rounded bg-amber-900/30 border border-amber-600/40">
                    Natural Cork Base
                  </div>
                </div>
              </div>

              {/* Interaction trigger button */}
              <button
                type="button"
                onClick={() => setIsUnscrewed(!isUnscrewed)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-neutral-800 transition-all cursor-pointer active:scale-95"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isUnscrewed ? 'rotate-180' : ''} transition-transform duration-500`} />
                <span>{isUnscrewed ? 'Screw Bottle Together' : 'Unscrew Mid-Body Seam'}</span>
              </button>
            </div>

            {/* Right: Signature Innovation Explanations */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  The Signature Innovation
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight">
                  The Modular Body
                </h3>
                <p className="mt-2 text-neutral-600 text-sm sm:text-base leading-relaxed">
                  The defining feature of an ALEX bottle is its patented mid-body seam. The bottle unscrews directly in the middle, splitting into two halves. This permanently eliminates the two biggest pain points of standard bottles:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/70">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-200 text-neutral-900">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Effortless Cleaning</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                      Reach the very bottom to scrub away residue. Ending the era of funky-smelling, impossible-to-wash bottles forever.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/70">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">Easy Loading</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                      The wide center opening allows you to drop in full-sized ice cubes, citrus slices, or powders without jamming them through a narrow neck.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Product Characteristics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {/* Characteristic 1 */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 mb-4">
              <Feather className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-semibold text-neutral-900 tracking-tight">
              Premium Sustainable Materials
            </h4>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              Crafted from 90% recycled pro-grade stainless steel with a distinctive renewable natural cork base that acts as a quiet, built-in coaster.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-neutral-500 border-t border-neutral-100 pt-3">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-neutral-900" />
                <span>90% Recycled 18/8 Stainless Steel</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-neutral-900" />
                <span>Natural Harvested Cork Coaster Base</span>
              </li>
            </ul>
          </div>

          {/* Characteristic 2 */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-semibold text-neutral-900 tracking-tight">
              ThermaShield™ Insulation
            </h4>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              An advanced triple-walled vacuum system engineered to keep your water ice-cold for 36 hours or hot for 12 hours with zero outer condensation.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-neutral-500 border-t border-neutral-100 pt-3">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-neutral-900" />
                <span>36 Hours Sub-Zero Cold</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-neutral-900" />
                <span>Zero Sweat Vacuum Exterior</span>
              </li>
            </ul>
          </div>

          {/* Characteristic 3 */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-xs">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900 mb-4">
              <RefreshCw className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-semibold text-neutral-900 tracking-tight">
              The "Stealth" Loop
            </h4>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              An ergonomic silicone cap featuring a flexible carry strap that snaps completely flat when not in use, maintaining a clean architectural silhouette.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-neutral-500 border-t border-neutral-100 pt-3">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-neutral-900" />
                <span>Snaps Flush into Cap Profile</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-neutral-900" />
                <span>Leak-Proof Architectural Seal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Product Photography Gallery showcasing provided Cloudinary images */}
        <div className="border-t border-neutral-200 pt-16">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Architectural Editions
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900">
              Designed for Natural & Urban Landscapes
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gallery Item 1 */}
            <div className="group overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-all">
              <div className="aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_800/v1789815392/Bottle_lying_on_moss_2K_20260919114934_srcgil.jpg"
                  alt="ALEX Bottle on Natural Moss"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Earth Edition</span>
                <h4 className="text-base font-semibold text-neutral-900 mt-1">Forest Floor & Biophilic Design</h4>
                <p className="text-xs text-neutral-500 mt-1">Sustainably harvested cork foundation resting naturally on organic textures.</p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="group overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-all">
              <div className="aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_800/v1789815409/Matte_green_water_bottle_upright_2K_20260919115337_dtscyx.jpg"
                  alt="ALEX Upright Matte Olive Edition"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Minimalist Series</span>
                <h4 className="text-base font-semibold text-neutral-900 mt-1">Upright Matte Silhouette</h4>
                <p className="text-xs text-neutral-500 mt-1">Clean cylindrical geometry with zero exterior branding or superfluous contours.</p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="group overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-all sm:col-span-2 lg:col-span-1">
              <div className="aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src="https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_800/v1789815827/Water_bottles_on_stone_pedestals_2K_20260919120313_b5nlv5.jpg"
                  alt="ALEX Water Bottles on Stone Pedestals"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Modular Series</span>
                <h4 className="text-base font-semibold text-neutral-900 mt-1">Stone Pedestals Collection</h4>
                <p className="text-xs text-neutral-500 mt-1">Monolithic craftsmanship inspired by raw architectural stone forms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
