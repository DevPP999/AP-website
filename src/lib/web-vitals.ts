import { onCLS, onFCP, onLCP, onTTFB, onINP } from "web-vitals";

// Web Vitals configuration
const vitalsConfig = {
  // Debug mode for development
  debug: process.env.NODE_ENV === "development",

  // Sample rate (1.0 = 100%, 0.1 = 10%)
  sampleRate: process.env.NODE_ENV === "production" ? 1.0 : 1.0,

  // Report to Google Analytics if available
  reportToGA: !!process.env.NEXT_PUBLIC_GA_ID,
};

// Custom metric reporting function
function reportMetric(metric: {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType?: string;
}) {
  const { name, value, delta, id, navigationType } = metric;

  // Log to console in development
  if (vitalsConfig.debug) {
    console.log(`📊 Web Vitals - ${name}:`, {
      value: Math.round(value),
      delta: Math.round(delta),
      id,
      navigationType,
    });
  }

  // Report to Google Analytics 4
  if (
    vitalsConfig.reportToGA &&
    typeof window !== "undefined" &&
    "gtag" in window
  ) {
    (
      window as unknown as {
        gtag: (
          command: string,
          eventName: string,
          parameters: Record<string, unknown>
        ) => void;
      }
    ).gtag("event", name, {
      event_category: "Web Vitals",
      event_label: id,
      value: Math.round(name === "CLS" ? value * 1000 : value),
      non_interaction: true,
    });
  }

  // Report to custom analytics endpoint (optional)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metric: name,
        value: Math.round(value),
        delta: Math.round(delta),
        id,
        navigationType,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch((error) => {
      if (vitalsConfig.debug) {
        console.warn("Failed to send Web Vitals to custom endpoint:", error);
      }
    });
  }
}

// Performance thresholds (Google's recommended values)
const thresholds = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
};

// Enhanced metric reporting with performance assessment
function reportMetricWithAssessment(metric: {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType?: string;
}) {
  const { name, value } = metric;
  const threshold = thresholds[name as keyof typeof thresholds];

  let assessment = "unknown";
  if (threshold) {
    if (value <= threshold.good) {
      assessment = "good";
    } else if (value <= threshold.needsImprovement) {
      assessment = "needs-improvement";
    } else {
      assessment = "poor";
    }
  }

  // Add assessment to metric
  const enhancedMetric = {
    ...metric,
    assessment,
    threshold: threshold
      ? {
          good: threshold.good,
          needsImprovement: threshold.needsImprovement,
        }
      : null,
  };

  reportMetric(enhancedMetric);

  // Log performance warnings
  if (vitalsConfig.debug && assessment === "poor") {
    console.warn(`⚠️ Poor ${name} performance:`, {
      value: Math.round(value),
      threshold: threshold?.needsImprovement,
      recommendation: getPerformanceRecommendation(name),
    });
  }
}

// Performance recommendations
function getPerformanceRecommendation(name: string): string {
  const recommendations = {
    LCP: "Optimize images, use CDN, improve server response time",
    FID: "Reduce JavaScript execution time, optimize event handlers",
    CLS: "Set image dimensions, avoid dynamic content insertion",
    FCP: "Optimize critical rendering path, reduce render-blocking resources",
    TTFB: "Improve server response time, use CDN, optimize database queries",
    INP: "Optimize JavaScript execution, reduce main thread blocking",
  };

  return (
    recommendations[name as keyof typeof recommendations] ||
    "Optimize performance"
  );
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  if (typeof window === "undefined") return;

  // Core Web Vitals
  onCLS(reportMetricWithAssessment, { reportAllChanges: true });
  onLCP(reportMetricWithAssessment, { reportAllChanges: true });

  // Additional metrics
  onFCP(reportMetricWithAssessment);
  onTTFB(reportMetricWithAssessment);

  // Interaction to Next Paint (INP) - newer metric
  if (onINP) {
    onINP(reportMetricWithAssessment);
  }

  // Custom performance observer for additional metrics
  if ("PerformanceObserver" in window) {
    try {
      // Long Task API
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          reportMetric({
            name: "LONG_TASK",
            value: entry.duration,
            delta: entry.duration,
            id: `long-task-${Date.now()}`,
            navigationType: "navigate",
          });
        }
      });
      longTaskObserver.observe({ entryTypes: ["longtask"] });

      // Layout Shift (alternative to CLS)
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!layoutShiftEntry.hadRecentInput) {
            reportMetric({
              name: "LAYOUT_SHIFT",
              value: layoutShiftEntry.value || 0,
              delta: layoutShiftEntry.value || 0,
              id: `layout-shift-${Date.now()}`,
              navigationType: "navigate",
            });
          }
        }
      });
      layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      if (vitalsConfig.debug) {
        console.warn("Performance Observer not supported:", error);
      }
    }
  }
}

// Performance summary function
export function getPerformanceSummary() {
  if (typeof window === "undefined") return null;

  const navigation = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType("paint");

  return {
    // Navigation timing
    dns: Math.round(
      navigation?.domainLookupEnd - navigation?.domainLookupStart || 0
    ),
    tcp: Math.round(navigation?.connectEnd - navigation?.connectStart || 0),
    ssl: Math.round(
      navigation?.secureConnectionStart
        ? navigation?.connectEnd - navigation?.secureConnectionStart
        : 0
    ),
    ttfb: Math.round(navigation?.responseStart - navigation?.requestStart || 0),
    download: Math.round(
      navigation?.responseEnd - navigation?.responseStart || 0
    ),
    domProcessing: Math.round(
      navigation?.domContentLoadedEventEnd - navigation?.responseEnd || 0
    ),
    loadComplete: Math.round(
      navigation?.loadEventEnd - navigation?.loadEventStart || 0
    ),

    // Paint timing
    fcp: Math.round(
      paint.find((p) => p.name === "first-contentful-paint")?.startTime || 0
    ),
    lcp: Math.round(
      paint.find((p) => p.name === "largest-contentful-paint")?.startTime || 0
    ),

    // Resource timing
    resourceCount: performance.getEntriesByType("resource").length,

    // Memory usage (if available)
    memory: (
      performance as Performance & {
        memory?: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
      }
    ).memory
      ? {
          used: Math.round(
            (
              performance as Performance & {
                memory: {
                  usedJSHeapSize: number;
                  totalJSHeapSize: number;
                  jsHeapSizeLimit: number;
                };
              }
            ).memory.usedJSHeapSize /
              1024 /
              1024
          ), // MB
          total: Math.round(
            (
              performance as Performance & {
                memory: {
                  usedJSHeapSize: number;
                  totalJSHeapSize: number;
                  jsHeapSizeLimit: number;
                };
              }
            ).memory.totalJSHeapSize /
              1024 /
              1024
          ), // MB
          limit: Math.round(
            (
              performance as Performance & {
                memory: {
                  usedJSHeapSize: number;
                  totalJSHeapSize: number;
                  jsHeapSizeLimit: number;
                };
              }
            ).memory.jsHeapSizeLimit /
              1024 /
              1024
          ), // MB
        }
      : null,
  };
}

// Export configuration for external use
export { vitalsConfig, thresholds };
