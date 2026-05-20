"use client";
import { useEffect, useState } from "react";

interface MobileSEOProps {
  children: React.ReactNode;
}

export default function MobileSEO({ children }: MobileSEOProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div
      className={`mobile-optimized ${isMobile ? "mobile" : ""} ${
        isTablet ? "tablet" : ""
      }`}
    >
      {children}
    </div>
  );
}

// Mobile-specific SEO optimizations
export function useMobileSEO() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const isMobile = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1024;
  const isDesktop = viewport.width >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    viewport,
  };
}
