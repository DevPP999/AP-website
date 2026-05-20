"use client";

import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsProps {
  GA_TRACKING_ID: string;
}

export default function GoogleAnalytics({
  GA_TRACKING_ID,
}: GoogleAnalyticsProps) {
  if (!GA_TRACKING_ID || GA_TRACKING_ID.trim() === "") {
    console.warn("Google Analytics ID is not provided");
    return null;
  }

  const isProduction = process.env.NODE_ENV === "production";

  return (
    <>
      {/* Load gtag.js */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onError={(e) => {
          console.error("Failed to load Google Analytics script:", e);
        }}
      />

      {/* Initialize Consent Mode and GA */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Default consent to denied
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'wait_for_update': 500
            });
            
            gtag('js', new Date());
            
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              ${!isProduction ? "debug_mode: true," : ""}
            });
          `,
        }}
      />
    </>
  );
}
