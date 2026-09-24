# ALEX — Architectural Luxury Product Showcase Template

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AIComposerApp/alex-hydrate)

ALEX is an ultra-premium, dark-mode architectural product showcase template built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Motion**. Engineered with tactile 360° product carousels, scroll-driven typographic reveals, modular bento grids, and integrated Vercel Analytics.

Designed to be **100% template-ready** and easily customized by any developer or AI coding agent.

---

## ⚡ 1-Click Deploy to Vercel

Click the button above or [deploy here](https://vercel.com/new/clone?repository-url=https://github.com/AIComposerApp/alex-hydrate) to instantly clone this repository to your GitHub account and deploy it live to Vercel in under 60 seconds.

---

## 🛠 How to Use as a GitHub Template

1. Click the green **"Use this template"** button at the top right of this repository.
2. Select **"Create a new repository"**.
3. Name your new project and clone it locally.

---

## 🎨 Single-File Customization (`src/siteConfig.ts`)

You don't need to hunt through dozens of component files to customize this website. **All brand information, product lines, headlines, colors, images, and videos are centralized in a single configuration file**:

👉 **`src/siteConfig.ts`**

### Re-brand in 1 Prompt with ANY AI Coding Agent
Open your project in Cursor, Windsurf, Claude Code, or Copilot, and send this prompt:

```text
Read src/siteConfig.ts. Rebrand this website for [YOUR BRAND NAME], a [YOUR PRODUCT TYPE, e.g. luxury watch / specialty espresso maker / minimalist backpack]. Update the brand details, hero headlines, product images, 360 variants, and bento specs in src/siteConfig.ts. Keep all existing layout geometry and spring physics intact.
```

---

## 🌟 Key Features & Components

- **Tactile 360° Product Carousel (`TeaMakerShowcase.tsx`)**:
  - Direct hardware-accelerated GPU transforms (`translate3d`, `scale`) for zero latency interaction.
  - Custom drag follower cursor with touch swipe support.
  - Interactive colorway swatches with real-time liquid text fill.
- **Scroll-Driven Story Reveal (`StorySection.tsx`)**:
  - Split-line typography reveal synchronized with viewport scroll depth.
  - Floating illuminated pill images embedded directly into the editorial text flow.
- **Interactive Category Matrix (`CategoryRow.tsx`)**:
  - Tactile high-contrast category tiles with synchronized vertical offsets and hover image reveals.
- **Modular Bento Grid (`InnovationSection.tsx`)**:
  - Clean specs, material engineering highlights, and responsive column spans.
- **Architectural Deep Footer (`Footer.tsx`)**:
  - Smooth scroll parallax bottle projection with inward-curved geometry and minimalist newsletter input.
- **Floating Responsive Navigation (`Header.tsx`)**:
  - Desktop/tablet top floating capsule; mobile bottom floating navigation bar.
- **Vercel Web Analytics**:
  - Integrated via `@vercel/analytics/react`.

---

## 💻 Local Development

### 1. Clone & Install
```bash
git clone https://github.com/AIComposerApp/alex-hydrate.git
cd alex-hydrate
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🤖 AI Coding Agent Compatibility
This repository includes:
- `.cursorrules` — Project rules, design conventions, and constraints for Cursor and Windsurf.
- `AGENT_GUIDE.md` — Universal architectural reference for Claude Code, Copilot, v0, Bolt, and Lovable.

---

## 📄 License
MIT License. Free to use for personal and commercial client projects.
