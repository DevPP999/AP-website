"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Type definition for window.gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  const pathname = usePathname();
  const pathLocale = pathname?.split("/")[1];
  const locale =
    pathLocale === "th" || pathLocale === "en"
      ? pathLocale
      : typeof navigator !== "undefined" && navigator.language
      ? navigator.language.split("-")[0]
      : "en";

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent) {
      if (savedConsent === "accepted") {
        handleConsent(true);
      }
    } else {
      setTimeout(() => setShowBanner(true), 800);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: accepted ? "granted" : "denied",
        ad_storage: accepted ? "granted" : "denied",
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    handleConsent(true);
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    handleConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 animate-float-up">
        <div className="w-full max-w-4xl rounded-2xl border border-white/20 bg-white/90 p-5 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:bg-gray-900/90 dark:border-gray-700">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            {/* Content Section */}
            <div className="flex items-start gap-4">
              {/* Text */}
              <div className="space-y-1.5">
                <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  เราใส่ใจในความเป็นส่วนตัวของคุณ
                </p>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  เว็บไซต์นี้ใช้คุกกี้เพื่อประสบการณ์ที่ดีที่สุด
                  <Link
                    href={`/${locale}/policy`}
                    target="_blank"
                    className="ml-1 font-medium text-indigo-600 hover:text-indigo-700 hover:underline dark:text-indigo-400"
                  >
                    อ่านนโยบาย
                  </Link>
                </p>
              </div>
            </div>

            {/* Action Buttons (New Design) */}
            <div className="flex w-full flex-shrink-0 flex-col gap-3 md:w-auto md:flex-row md:items-center">
              {/* Secondary Button: Soft Gray (ไม่ใช้ Border แล้ว ดูนุ่มกว่า) */}
              <button
                onClick={handleReject}
                className="order-2 w-full whitespace-nowrap rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 md:order-1 md:w-auto"
              >
                ปฏิเสธทั้งหมด
              </button>

              {/* Primary Button: Gradient/Brand Color (ดูเด่น น่ากด) */}
              <button
                onClick={handleAccept}
                className="order-1 w-full whitespace-nowrap rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:bg-green-700 hover:scale-[1.02] active:scale-95 dark:bg-green-500 dark:hover:bg-green-600 md:order-2 md:w-auto"
              >
                ยอมรับคุกกี้
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-float-up {
          animation: float-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
