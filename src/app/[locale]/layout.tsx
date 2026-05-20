import { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { getDictionary } from "@/lib/i18n";
import LangSetter from "@/components/LangSetter";
import AccessibilityProvider from "@/components/AccessibilityProvider";
import type { Locale } from "@/types";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import PopupWrapper from "@/components/PopupWrapper";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Validate and fallback to 'th' if locale is invalid
  const localeTyped: Locale =
    locale === "th" || locale === "en" ? locale : "th";

  const dictionary = await getDictionary(localeTyped);

  return (
    <AccessibilityProvider locale={localeTyped}>
      <LangSetter lang={localeTyped} />
      <Navbar locale={localeTyped} dictionary={dictionary.navbar ?? {}} />
      <main>{children}</main>
      {/* JSON-LD Breadcrumbs */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `/${localeTyped}`,
              },
            ],
          }),
        }}
      />
      <Footer />
    </AccessibilityProvider>
  );
}

export async function generateStaticParams() {
  return [{ locale: "th" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  // params may be a plain object at runtime; use Promise.resolve so awaiting works
  const { locale } = await Promise.resolve(
    params as unknown as { locale: string }
  );
  if (!["th", "en"].includes(locale)) {
    notFound(); // จะทำให้ Next.js แสดง 404
  }
  return { title: locale === "th" ? "หน้าไทย" : "English page" };
}
