import PrivacyPolicy from "@/components/PrivacyPolicy";
import type { Metadata } from "next";
import type { Locale } from "@/types";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  // Validate and fallback to 'th' if locale is invalid
  const localeTyped: Locale =
    locale === "th" || locale === "en" ? locale : "th";

  const isTH = localeTyped === "th";

  return {
    title: isTH
      ? "นโยบายความเป็นส่วนตัว | Iampong"
      : "Privacy Policy | Iampong",
    description: isTH
      ? "นโยบายความเป็นส่วนตัวของบริษัท เอี่ยมพงศ์พัฒนา จำกัด"
      : "Privacy Policy of Iampong Development Co., Ltd.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${localeTyped}/privacy-policy`,
      languages: {
        th: "/th/privacy-policy",
        en: "/en/privacy-policy",
      },
    },
  };
}

export default async function PrivacyPolicyPage({}: PageProps) {
  return <PrivacyPolicy />;
}
