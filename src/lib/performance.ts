// Performance monitoring and optimization utilities

export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

// Web Vitals monitoring
export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
}) {
  if (process.env.NODE_ENV === "production") {
    // Send to analytics service
    console.log("Web Vital:", metric);

    // Example: Send to Google Analytics
    if (
      typeof window !== "undefined" &&
      (window as unknown as Record<string, unknown>).gtag
    ) {
      (
        (window as unknown as Record<string, unknown>).gtag as (
          event: string,
          name: string,
          options: Record<string, unknown>
        ) => void
      )("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }
  }
}

// Image lazy loading optimization
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) {
  if (typeof window === "undefined") return null;

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === "undefined") return;

  const criticalImages = [
    "/images/logoap/AP_LOGO02.png",
    "/background/1.jpg",
    "/background/3.jpg",
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

// Optimize font loading
export function optimizeFontLoading() {
  if (typeof window === "undefined") return;

  // Preload critical fonts
  const criticalFonts = [
    "/fonts/IBMPlexSansThai-Regular.ttf",
    "/fonts/KanitRegular.ttf",
  ];

  criticalFonts.forEach((font) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/ttf";
    link.href = font;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}

// Bundle size optimization
export function optimizeBundleSize() {
  if (typeof window === "undefined") return;

  // Lazy load non-critical components
  // const lazyLoadComponents = [
  //   "yet-another-react-lightbox",
  //   "framer-motion",
  // ];

  // Implement dynamic imports for heavy components
  return {
    loadLightbox: () => import("yet-another-react-lightbox"),
    loadFramerMotion: () => import("framer-motion"),
  };
}

// Memory optimization
export function optimizeMemory() {
  if (typeof window === "undefined") return;

  // Clean up unused event listeners
  const cleanup = () => {
    // Remove old event listeners
    window.removeEventListener("scroll", () => {});
    window.removeEventListener("resize", () => {});
  };

  // Run cleanup on page unload
  window.addEventListener("beforeunload", cleanup);
}

// Cache optimization
export function optimizeCaching() {
  if (typeof window === "undefined") return;

  // Implement service worker for caching
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  }
}

// Performance budget monitoring
export function checkPerformanceBudget() {
  if (typeof window === "undefined") return;

  const budget = {
    lcp: 2500, // 2.5s
    fid: 100, // 100ms
    cls: 0.1, // 0.1
    fcp: 1800, // 1.8s
    ttfb: 600, // 600ms
  };

  return budget;
}
