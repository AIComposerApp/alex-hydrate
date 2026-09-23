import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { CategoryRow } from './components/CategoryRow';
import { TeaMakerShowcase } from './components/TeaMakerShowcase';
import { InnovationSection } from './components/InnovationSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="home min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#000000] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Floating Header: Desktop & Tablet unified top capsule; Mobile bottom floating light bar */}
      <Header />

      {/* Main Content Flow: Hero -> Story Section with Scroll Animation -> Category Row with interactive hover -> Tea Maker Pro 360 Showcase -> Innovation */}
      <main id="main-content" className="w-full max-w-[100vw] overflow-x-hidden outline-none bg-[#000000]">
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

      {/* Architectural Deep Footer with Inward Rounded Edge, Pill Subscribe & TikTok Credit */}
      <Footer />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
