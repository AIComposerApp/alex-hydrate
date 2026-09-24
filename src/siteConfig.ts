/**
 * SITE CONFIGURATION & CONTENT BLUEPRINT
 * 
 * To re-brand or customize this website for ANY brand or product:
 * Simply modify the content, media URLs, colors, and product specifications in this file.
 * All components dynamically consume their copy, assets, and links from this configuration.
 */

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    description: string;
    logoIconUrl: string;
    logoLetter: string;
    copyrightText: string;
  };
  header: {
    categories: Array<{ name: string; active?: boolean; href?: string }>;
    products: Array<{
      title: string;
      subtitle: string;
      color: string;
      tag: string;
      img: string;
      href: string;
    }>;
    philosophyLinks: Array<{
      label: string;
      desc: string;
      href: string;
    }>;
  };
  hero: {
    badge: string;
    titleDesktop: string;
    mobileTitle: {
      row1: string;
      row2Prefix: string;
      row2Badge: [string, string];
      row3: string;
    };
    videoMp4: string;
    fallbackImage: string;
  };
  story: {
    badge: string;
    line1: string;
    line2Text1: string;
    line2Text2: string;
    line3Text1: string;
    line3Text2: string;
    pillImages: [string, string, string];
  };
  categories: Array<{
    id: string;
    title: string;
    image: string;
    ctas: Array<{ label: string; href: string }>;
    restOffsetY: string;
  }>;
  showcase: {
    badge: string;
    heading: string;
    subheading: string;
    variants: Array<{
      id: string;
      name: string;
      edition: string;
      description: string;
      sliderImage: string;
      thumbImage: string;
    }>;
  };
  innovation: {
    badge: string;
    heading: string;
    description?: string;
    products: Array<{
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
    }>;
  };
  footer: {
    brandStatement: string;
    bottleImage: string;
    primaryLinks: Array<{ label: string; href: string }>;
    newsletterTitle: string;
    newsletterSubtitle: string;
    tiktokUrl: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: 'ALEX',
    tagline: 'The Architecture of Hydration',
    description: 'ALEX is a premium, minimalist hydration brand that re-engineers the everyday water bottle into a high-end design object.',
    logoIconUrl: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_120/v1789854644/ChatGPT_Image_Sep_19_2026_10_49_29_PM_batoch.png',
    logoLetter: 'A',
    copyrightText: 'ALEX Hydration Inc. All rights reserved.',
  },

  header: {
    categories: [
      { name: 'Modular Bottles', active: true },
      { name: 'ThermaShield™ Insulated', active: false },
      { name: 'Natural Cork Series', active: false },
      { name: 'Stealth Loop Caps', active: false },
      { name: 'Mix & Match Halves', active: false },
      { name: 'Cleaning & Care', active: false },
      { name: 'All Products', active: false, href: '#all-products' },
    ],
    products: [
      {
        title: 'ALEX Modular Pro 20oz',
        subtitle: 'Patented Mid-Body Seam',
        color: 'Matte Obsidian',
        tag: 'Best Seller',
        img: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_400/v1789815827/Water_bottles_on_stone_pedestals_2K_20260919120313_b5nlv5.jpg',
        href: '#alex-20oz-obsidian',
      },
      {
        title: 'ALEX Terracotta Edition',
        subtitle: 'Triple-Walled Vacuum',
        color: 'Raw Terracotta',
        tag: 'Architectural',
        img: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_400/v1789815427/Terracotta_water_bottle_stands_u__2K_20260919115442_ryhxk0.jpg',
        href: '#alex-terracotta',
      },
      {
        title: 'ALEX Modular Slate 32oz',
        subtitle: 'Full-Day Hydration',
        color: 'Monochrome Slate',
        tag: 'Cold 36h',
        img: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_400/v1789815423/Water_bottle_on_concrete_ledge_2K_20260919115425_zpk4af.jpg',
        href: '#alex-slate',
      },
      {
        title: 'ALEX Studio Edition 20oz',
        subtitle: 'Built-in Natural Coaster',
        color: 'Matte Graphite',
        tag: 'Signature Base',
        img: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_400/v1789815419/Water_bottle_on_desk_2K_20260919115409_xrujpy.jpg',
        href: '#alex-desk',
      },
    ],
    philosophyLinks: [
      { label: 'The Modular Body', desc: 'Unscrews in the middle for effortless cleaning & ice loading', href: '#modular-body' },
      { label: 'Form Follows Hydration', desc: 'Zero loud logos or cheap plastic', href: '#philosophy' },
      { label: 'ThermaShield™ Insulation', desc: 'Triple-walled vacuum (36h cold / 12h hot)', href: '#thermashield' },
      { label: '90% Recycled Steel & Cork', desc: 'Eco-conscious circular materials', href: '#materials' },
    ],
  },

  hero: {
    badge: 'The Architecture of Hydration',
    titleDesktop: 'Engineered for Pure Hydration',
    mobileTitle: {
      row1: 'Engineered',
      row2Prefix: 'for',
      row2Badge: ['Architectural', 'Design'],
      row3: 'Hydration',
    },
    videoMp4: 'https://res.cloudinary.com/divndlntm/video/upload/Water_pouring_into_bottle_1080p_20260920185607_zt6kh6.mp4',
    fallbackImage: 'https://res.cloudinary.com/divndlntm/video/upload/Water_pouring_into_bottle_1080p_20260920185607_zt6kh6.jpg',
  },

  story: {
    badge: 'ALEX Philosophy',
    line1: 'At ALEX, we blend innovation with tradition to',
    line2Text1: 'elevate your hydration rituals',
    line2Text2: 'crafting products',
    line3Text1: 'for extraordinary',
    line3Text2: 'moments.',
    pillImages: [
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815423/Water_bottle_on_concrete_ledge_2K_20260919115425_zpk4af.jpg',
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815427/Terracotta_water_bottle_stands_u__2K_20260919115442_ryhxk0.jpg',
      'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_500/v1789815419/Water_bottle_on_desk_2K_20260919115409_xrujpy.jpg',
    ],
  },

  categories: [
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
  ],

  showcase: {
    badge: '360° Studio Showcase',
    heading: 'The ALEX Collection',
    subheading: 'Drag horizontally or choose a finish below to rotate',
    variants: [
      {
        id: 'bottle-1',
        name: 'Ocean Cobalt',
        edition: 'Cobalt Edition',
        description: 'Deep, electric and resolute — engineered for high-altitude endurance and crisp hydration.',
        sliderImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829484/bottle_1_bg_t1zgmw.png',
        thumbImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829484/bottle_1_bg_t1zgmw.png',
      },
      {
        id: 'bottle-2',
        name: 'Alpine Sage',
        edition: 'Sage Edition',
        description: 'Organic forest earth tones balanced with surgical-grade 304 stainless steel purity.',
        sliderImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829551/bottle_2_bg_pixvuw.png',
        thumbImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829551/bottle_2_bg_pixvuw.png',
      },
      {
        id: 'bottle-3',
        name: 'Obsidian Black',
        edition: 'Obsidian Edition',
        description: 'Tactile stealth matte coat. Scratch-resistant, architectural, and eternally timeless.',
        sliderImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829497/bottle_3_bg_fpsl1j.png',
        thumbImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829497/bottle_3_bg_fpsl1j.png',
      },
      {
        id: 'bottle-4',
        name: 'Canyon Coral',
        edition: 'Coral Edition',
        description: 'Warm, radiant earth pigment celebrating active daylight exploration and modern form.',
        sliderImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829511/bottle_4_bg_pmmv4h.png',
        thumbImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829511/bottle_4_bg_pmmv4h.png',
      },
      {
        id: 'bottle-5',
        name: 'Desert Sand',
        edition: 'Sand Edition',
        description: 'Subtle neutral warmth paired with a leakproof dual-thread modular cap construction.',
        sliderImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_850/v1789829519/bottle_5_bg_y8ejlh.png',
        thumbImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto:good,w_140/v1789829519/bottle_5_bg_y8ejlh.png',
      },
    ],
  },

  innovation: {
    badge: 'ALEX Ecosystem',
    heading: 'Everyday vessels. Sculpted for life.',
    description: 'Clean architectural lines, food-grade thermal precision, and sustainable matte materials across every format.',
    products: [
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
          temperature: '24h Cold • 10h Hot',
          material: 'Recycled 18/8 Stainless Steel & Silicon Gasket',
          care: 'Fits all standard car cup holders',
        },
      },
      {
        id: 'lavender-carabiner',
        badge: 'Hardware',
        title: 'Precision Carabiner',
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
    ],
  },

  footer: {
    brandStatement: 'ALEX re-engineers daily hydration vessels into architectural, modular design objects built for lifetime durability.',
    bottleImage: 'https://res.cloudinary.com/divndlntm/image/upload/f_auto,q_auto,w_1000/v1789934332/ChatGPT_Image_Sep_20_2026_08_54_23_PM_ofm4es.png',
    primaryLinks: [
      { label: 'Modular Vessels', href: '#best-sellers-section' },
      { label: 'Active Tumbler', href: '#meet-alex' },
      { label: 'Thermal Food Jar', href: '#meet-alex' },
      { label: 'Aluminum Carabiner', href: '#meet-alex' },
      { label: 'Care & Lifetime Warranty', href: '#story-section' },
    ],
    newsletterTitle: 'Architectural Drops & Private Releases',
    newsletterSubtitle: 'Join our private dispatch for limited color drops, material breakthroughs, and member previews.',
    tiktokUrl: 'https://www.tiktok.com/@vixcee_vibes?_r=1&_t=ZS-99tlPUTeU4L',
  },
};
