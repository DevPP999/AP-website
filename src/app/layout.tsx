// src/app/layout.tsx
import "../app/globals.css";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WebVitals from "@/components/WebVitals";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Iampong – ผู้นำโซลูชันไฟฟ้า ครบวงจร",
    template: "%s | Iampong",
  },
  description:
    "ผู้นำโซลูชันไฟฟ้า ครบวงจร ครอบคลุมแรงสูง–แรงต่ำ ประสบการณ์กว่า 30 ปี มาตรฐาน ISO/EGAT/MEA/PEA",
  keywords: [
    "AP",
    "Iampong",
    "เอี่ยมพงศ์พัฒนา",
    "อุปกรณ์ไฟฟ้า",
    "กราวด์รอด",
    "Ground Rod",
    "ระบบไฟฟ้าแรงสูง",
    "ระบบไฟฟ้าแรงต่ำ",
    "Next.js",
    "TailwindCSS",
  ],
  icons: {
    icon: "/images/logoap/AP_LOGO02.png",
    shortcut: "/images/logoap/AP_LOGO02.png",
    apple: "/images/logoap/AP_LOGO02.png",
  },
  openGraph: {
    type: "website",
    siteName: "Iampong",
    title: "Iampong – ผู้นำโซลูชันไฟฟ้า ครบวงจร",
    description: "โซลูชันไฟฟ้าครบวงจร คุณภาพรับรองมาตรฐาน ครอบคลุมทุกระบบ",
    url: "/",
    images: [{ url: "/images/logoap/AP_LOGO02.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iampong – ผู้นำโซลูชันไฟฟ้า ครบวงจร",
    description: "โซลูชันไฟฟ้าครบวงจร คุณภาพรับรองมาตรฐาน",
    images: ["/images/logoap/AP_LOGO02.png"],
  },
  alternates: {
    languages: {
      en: "/en",
      th: "/th",
    },
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <WebVitals />
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}
