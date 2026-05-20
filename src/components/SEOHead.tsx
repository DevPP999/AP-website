"use client";
import Head from "next/head";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  locale?: string;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "/images/logoap/AP_LOGO02.png",
  ogType = "website",
  structuredData,
  locale = "th",
}: SEOHeadProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteUrl}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={locale} />
      <meta name="language" content={locale} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:locale"
        content={locale === "th" ? "th_TH" : "en_US"}
      />
      <meta property="og:site_name" content="Iampong" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Iampong" />
      <meta name="publisher" content="Iampong" />
      <meta name="copyright" content="Iampong" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#dc2626" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Iampong" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Performance Optimization - Preload Critical Resources */}
      <link
        rel="preload"
        href="/fonts/IBMPlexSansThai-Regular.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/KanitRegular.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link rel="preload" href="/images/logoap/AP_LOGO02.png" as="image" />
      <link rel="preload" href="/background/1.jpg" as="image" />

      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//challenges.cloudflare.com" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: Array.isArray(structuredData)
              ? JSON.stringify(structuredData)
              : JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
}
