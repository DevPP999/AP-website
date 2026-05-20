"use client";

import { useEffect } from "react";
import { initWebVitals } from "@/lib/web-vitals";

export default function WebVitals() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitals();
  }, []);

  return null; // This component doesn't render anything
}
