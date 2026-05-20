// Accessibility utilities for better SEO and user experience

// ARIA labels and descriptions
export const ARIA_LABELS = {
  navigation: "Main navigation",
  search: "Search products",
  menu: "Mobile menu",
  close: "Close",
  open: "Open",
  next: "Next page",
  previous: "Previous page",
  loading: "Loading content",
  error: "Error occurred",
  success: "Success",
};

// Focus management
export function manageFocus(element: HTMLElement | null) {
  if (!element) return;

  element.focus();
  element.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Skip links for keyboard navigation
export function createSkipLinks() {
  return [
    { href: "#main-content", text: "Skip to main content" },
    { href: "#navigation", text: "Skip to navigation" },
    { href: "#footer", text: "Skip to footer" },
  ];
}

// Screen reader announcements
export function announceToScreenReader(message: string) {
  if (typeof window === "undefined") return;

  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Color contrast utilities
export function getContrastRatio(_color1: string, _color2: string): number {
  // Simplified contrast ratio calculation
  // In production, use a proper color contrast library
  return 4.5; // Placeholder value
}

// Keyboard navigation helpers
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  elements: HTMLElement[],
  currentIndex: number
): number {
  switch (event.key) {
    case "ArrowDown":
    case "ArrowRight":
      event.preventDefault();
      return (currentIndex + 1) % elements.length;
    case "ArrowUp":
    case "ArrowLeft":
      event.preventDefault();
      return currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
    case "Home":
      event.preventDefault();
      return 0;
    case "End":
      event.preventDefault();
      return elements.length - 1;
    default:
      return currentIndex;
  }
}

// Form accessibility
export function createFormAccessibility(formId: string) {
  return {
    ariaDescribedBy: `${formId}-description`,
    ariaLabelledBy: `${formId}-label`,
    role: "form",
  };
}

// Image accessibility
export function generateImageAltText(
  imageName: string,
  context: string,
  locale: string = "th"
): string {
  const altTexts = {
    th: {
      logo: `โลโก้ ${context}`,
      product: `รูปภาพสินค้า ${imageName}`,
      company: `รูปภาพบริษัท ${context}`,
      certificate: `ใบรับรอง ${imageName}`,
    },
    en: {
      logo: `${context} logo`,
      product: `${imageName} product image`,
      company: `${context} company image`,
      certificate: `${imageName} certificate`,
    },
  };

  const type = imageName.includes("logo")
    ? "logo"
    : imageName.includes("product")
    ? "product"
    : imageName.includes("cert")
    ? "certificate"
    : "company";

  return (
    altTexts[locale as keyof typeof altTexts][
      type as keyof typeof altTexts.th
    ] || imageName
  );
}

// Heading hierarchy validation
export function validateHeadingHierarchy(
  headings: HTMLHeadingElement[]
): boolean {
  let currentLevel = 0;

  for (const heading of headings) {
    const level = parseInt(heading.tagName.charAt(1));

    if (level > currentLevel + 1) {
      console.warn(
        `Heading hierarchy skipped: ${heading.tagName} after h${currentLevel}`
      );
      return false;
    }

    currentLevel = level;
  }

  return true;
}

// Language detection for screen readers
export function setLanguageAttributes(element: HTMLElement, locale: string) {
  element.setAttribute("lang", locale);
  element.setAttribute("dir", locale === "th" ? "ltr" : "ltr");
}

// Reduced motion support
export function supportsReducedMotion(): boolean {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// High contrast mode support
export function supportsHighContrast(): boolean {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-contrast: high)").matches;
}

// Focus visible polyfill
export function initFocusVisible() {
  if (typeof window === "undefined") return;

  // Add focus-visible class for better keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
  });
}
