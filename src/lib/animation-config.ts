// Animation configuration for better SEO and performance
export const ANIMATION_CONFIG = {
  // Critical animations - Hero section, CTA buttons
  critical: {
    delay: 0.1,
    duration: 0.3,
    ease: "easeOut" as const,
  },

  // Important animations - Main content sections
  important: {
    delay: 0.2,
    duration: 0.4,
    ease: "easeOut" as const,
  },

  // Optional animations - Secondary content
  optional: {
    delay: 0.1,
    duration: 0.2,
    ease: "easeOut" as const,
  },

  // Stagger configurations
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },

  // Viewport settings for better performance
  viewport: {
    once: true,
    amount: 0.1,
    margin: "0px 0px -50px 0px",
  },
};

// Animation variants for consistent performance
export const ANIMATION_VARIANTS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

// Performance-optimized transition settings
export const TRANSITIONS = {
  fast: { duration: 0.2, ease: "easeOut" as const },
  normal: { duration: 0.3, ease: "easeOut" as const },
  smooth: { duration: 0.4, ease: "easeOut" as const },
};
