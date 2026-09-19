# ALEX — Form Follows Hydration

ALEX is a premium, minimalist hydration web experience that re-engineers the everyday water bottle into a high-end architectural design object. Featuring interactive 3D product showcases, scroll-driven typographic reveals, modular engineering breakdowns, and responsive mobile-first navigation.

---

## 🌟 Key Features

- **Interactive 360° Product Carousel (`TeaMakerShowcase`)**:
  - Direct hardware-accelerated transforms (`translate3d`, `scale`) for zero input latency and 120fps+ interaction.
  - Progressive depth-of-field and radial occlusion shielding for product variants without costly GPU shader blurs.
  - Responsive desktop custom drag follower cursor with touch swipe support.
  - Performance optimizations including `React.memo`, `useMemo`, and `IntersectionObserver` lazy image decoding.
- **Scroll-Driven Typography (`StorySection`)**:
  - Split-line typography reveal animation synchronized with viewport scroll depth.
- **Category Navigation (`CategoryRow`)**:
  - Tactile, high-contrast category tiles with hover image reveals and touch-friendly scroll containers.
- **Modular Design Breakdown (`InnovationSection`)**:
  - Exploded view and engineering highlight cards celebrating ALEX's patented clean two-part modular bottle assembly.
- **Responsive Floating Header & Mobile Navigation**:
  - Floating top capsule on desktop/tablet, bottom quick-access control bar on mobile devices.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Motion**: [Motion (Framer Motion)](https://motion.dev/)
- **Typography**: Plus Jakarta Sans

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm`, `pnpm`, or `bun` installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/alex-hydration.git
   cd alex-hydration
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📜 Available Scripts

- `npm run dev`: Starts the local Vite development server at `http://localhost:3000`
- `npm run build`: Compiles TypeScript and builds production-optimized static assets to `/dist`
- `npm run preview`: Locally previews the production build
- `npm run lint`: Validates TypeScript types across the entire codebase (`tsc --noEmit`)
- `npm run clean`: Cleans generated distribution artifacts

---

## 🌐 Deployment

The build output generated in `dist/` is completely static and can be deployed directly to:
- **Vercel**: Import repository and deploy with Vite presets.
- **Netlify**: Set build command to `npm run build` and publish directory to `dist`.
- **GitHub Pages**: Deploy the `dist` folder using `gh-pages` or GitHub Actions.
- **Cloud Run / Docker**: Serve the `dist` folder using Nginx, Caddy, or Node.

---

## 📄 License

Apache-2.0
