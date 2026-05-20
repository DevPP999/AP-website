"use client";
import { useEffect } from "react";
import { initFocusVisible, setLanguageAttributes } from "@/lib/accessibility";

interface AccessibilityProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export default function AccessibilityProvider({
  children,
  locale = "th",
}: AccessibilityProviderProps) {
  useEffect(() => {
    // Initialize accessibility features
    initFocusVisible();

    // Set language attributes
    if (typeof document !== "undefined") {
      setLanguageAttributes(document.documentElement, locale);
    }
  }, [locale]);

  return <>{children}</>;
}
