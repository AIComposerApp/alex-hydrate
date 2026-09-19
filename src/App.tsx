/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { CategoryRow } from './components/CategoryRow';
import { TeaMakerShowcase } from './components/TeaMakerShowcase';
import { InnovationSection } from './components/InnovationSection';

export default function App() {
  return (
    <div className="home min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Floating Header: Desktop & Tablet unified top capsule; Mobile bottom floating light bar */}
      <Header />

      {/* Main Content Flow: Hero -> Story Section with Scroll Animation -> Category Row with interactive hover -> Tea Maker Pro 360 Showcase -> Innovation */}
      <main id="main-content" className="outline-none">
        {/* Full-width Hero with Cloudinary Video & Mobile typography layout */}
        <Hero />

        {/* Captured Next Section with exact scroll-driven split-line text reveal animation */}
        <StorySection />

        {/* Captured Interactive Category Row with exact hover reveal effect & website styling */}
        <CategoryRow />

        {/* Interactive 360 Color Showcase with following custom drag cursor */}
        <div className="w-full bg-[#000000]" style={{ backgroundColor: '#000000' }}>
          <TeaMakerShowcase />
        </div>

        {/* ALEX Modular Body Innovation & Characteristics Section */}
        <InnovationSection />
      </main>

      {/* Architectural Minimalist Footer */}
      <footer className="w-full bg-[#121212] text-white/70 py-16 px-6 sm:px-12 border-t border-neutral-800">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white tracking-tight">ALEX</span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Form Follows Hydration
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <span>Patented Mid-Seam Technology</span>
            <span>ThermaShield™ Vacuum</span>
            <span>90% Recycled Steel</span>
          </div>
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} ALEX Bottle Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
