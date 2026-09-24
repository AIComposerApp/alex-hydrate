# Universal Agent Guide (`AGENT_GUIDE.md`)

This guide is designed for any AI coding agent (Cursor, Windsurf, Claude Code, GitHub Copilot Workspace, v0, Bolt, Lovable, etc.) working on this repository.

---

## ⚡ Quick Re-Branding in 1 Prompt
To completely rebrand or transform this template for any product, give your coding agent this prompt:

```text
Read src/siteConfig.ts. Rebrand this luxury showcase for [YOUR BRAND NAME], a [TYPE OF PRODUCT/INDUSTRY, e.g. artisanal coffee machine, luxury wristwatch, mechanical keyboard].
Update:
1. Brand name, tagline, description, and logo.
2. Hero headline, video/poster URLs, and story manifesto.
3. Category cards and 360 showcase product variants with matching titles, descriptions, and images.
4. Bento innovation section specs and features.
Keep all existing animation physics, layout geometry, and responsive behaviors intact.
```

---

## 🏗 Architecture Map

```text
/src
  siteConfig.ts          <-- SINGLE SOURCE OF TRUTH (All content, copy, products, media)
  types.ts               <-- TypeScript interfaces
  index.css              <-- Tailwind CSS v4 entry point & custom utilities
  main.tsx               <-- React root entry point
  App.tsx                <-- Main layout orchestration + Vercel Analytics
  /components
    Header.tsx           <-- Floating desktop capsule + mobile floating bar
    Hero.tsx             <-- Background video streaming + headline typography
    StorySection.tsx     <-- Split-line scroll progress reveal + pill images
    CategoryRow.tsx      <-- Interactive category cards with hover transforms
    TeaMakerShowcase.tsx <-- 360° carousel with tactile mouse/touch drag
    InnovationSection.tsx<-- Bento grid with specs & material highlights
    Footer.tsx           <-- Deep dark footer with scroll parallax bottle
    Bottle3DSection.tsx  <-- (Optional) Interactive Three.js 3D GLTF viewer
```

---

## 🎨 Design System Rules
- **Color Tokens**:
  - Primary Background: `#000000` (Pitch Black)
  - Secondary Section Background: `#faf9f6` (Warm Architectural White)
  - Surface Glass: `rgba(255, 255, 255, 0.08)` with `backdrop-blur-md`
  - Border Accents: `rgba(255, 255, 255, 0.12)` or `neutral-800`
- **Typography**:
  - Plus Jakarta Sans
  - Negative letter tracking on large headings (`tracking-[-0.035em]`)
- **Animation Standards**:
  - Always use hardware-accelerated spring animations (`motion`).
  - No jarring ease-in-out CSS transitions for interactive drags.
