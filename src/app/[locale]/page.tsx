import Hero from "@/components/Hero";
import { getDictionary } from "@/lib/i18n";
import WhyAP from "@/components/WhyAP";
import MainProduct from "@/components/MainProduct";
import ContactSale from "@/components/ContactSale";
import AboutUs from "@/components/AboutUs";
import Projects from "@/components/Project";
import Articles from "@/components/Articles";
import Career from "@/components/Career";
import ContactUs from "@/components/ContactUs";
import type { Metadata } from "next";
import type { Locale } from "@/types";
import HashScroll from "@/components/HashScroll";
import SEOHead from "@/components/SEOHead";
import WebVitals from "@/components/WebVitals";
import { generateOrganizationSchema } from "@/lib/structured-data";
import type { AboutDictionary } from "@/types/dictionary";

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const localeUrl = `${siteUrl}/${localeTyped}`;
  const isTH = localeTyped === "th";

  return {
    title: isTH
      ? "AP | ผู้นำโซลูชันไฟฟ้า ครบวงจร เชื่อถือได้ทุกระบบ"
      : "AP | Trusted Comprehensive Electrical Solutions",
    description: isTH
      ? "โซลูชันไฟฟ้าครบวงจร ครอบคลุมแรงสูง–แรงต่ำ มาตรฐาน ISO/EGAT/MEA/PEA"
      : "Comprehensive electrical solutions from high to low voltage, certified by ISO/EGAT/MEA/PEA.",
    alternates: {
      canonical: `/${localeTyped}`,
      languages: {
        th: "/th",
        en: "/en",
      },
    },
    openGraph: {
      url: localeUrl,
      locale: localeTyped,
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Validate and fallback to 'th' if locale is invalid
  const localeTyped: Locale =
    locale === "th" || locale === "en" ? locale : "th";

  const dictionary = await getDictionary(localeTyped);
  const isTH = localeTyped === "th";

  // Generate structured data
  const organizationData = {
    name: "Iampong",
    description: isTH
      ? "ผู้นำโซลูชันไฟฟ้า ครบวงจร ครอบคลุมแรงสูง–แรงต่ำ มาตรฐาน ISO/EGAT/MEA/PEA"
      : "Comprehensive electrical solutions from high to low voltage, certified by ISO/EGAT/MEA/PEA",
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/${localeTyped}`,
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/images/logoap/AP_LOGO02.png`,
    address: {
      streetAddress: "123 ถนนสุขุมวิท",
      addressLocality: "กรุงเทพมหานคร",
      addressRegion: "กรุงเทพมหานคร",
      postalCode: "10110",
      addressCountry: "TH",
    },
    contactPoint: {
      telephone: "+66-2-123-4567",
      contactType: "customer service",
      email: "info@iampong.com",
    },
    sameAs: [
      "https://www.facebook.com/iampong",
      "https://www.linkedin.com/company/iampong",
    ],
  };

  // Generate FAQ schema for Why Choose AP section
  const faqData = isTH
    ? [
        {
          question: "ทำไมต้องเลือก AP?",
          answer:
            "AP เป็นผู้นำโซลูชันไฟฟ้าครบวงจร ครอบคลุมแรงสูง–แรงต่ำ มาตรฐาน ISO/EGAT/MEA/PEA พร้อมประสบการณ์กว่า 30 ปี",
        },
        {
          question: "AP มีผลิตภัณฑ์อะไรบ้าง?",
          answer:
            "เรามีผลิตภัณฑ์ 8 หมวดหมู่หลัก ได้แก่ ระบบสายดิน, อุปกรณ์ฮาร์ดแวร์แรงต่ำ-แรงสูง, ระบบป้องกันฟ้าผ่า, โคมไฟถนน, อุปกรณ์ท่อร้อยสายไฟฟ้า, อุปกรณ์โทรคมนาคม, อุปกรณ์ต่อสายไฟฟ้า, และอุปกรณ์ไฟฟ้าใต้ดิน",
        },
        {
          question: "AP ได้รับการรับรองมาตรฐานอะไรบ้าง?",
          answer:
            "AP ได้รับการรับรองมาตรฐาน ISO 9001:2015, MADE IN THAILAND และเป็นพันธมิตรกับ กฟผ., กฟน., กฟภ.",
        },
      ]
    : [
        {
          question: "Why Choose AP?",
          answer:
            "AP is the leader in comprehensive electrical solutions from high to low voltage, certified by ISO/EGAT/MEA/PEA with over 30 years of experience",
        },
        {
          question: "What products does AP offer?",
          answer:
            "We offer 8 major product categories: Ground System, LV & HV Hardware, Lightning Protection, Street Lighting, Conduit Fittings, Telecom Hardware, Electrical Connectors, and Underground Electrical Equipment",
        },
        {
          question: "What certifications does AP have?",
          answer:
            "AP is certified with ISO 9001:2015, MADE IN THAILAND and partners with EGAT, MEA, and PEA",
        },
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <WebVitals />
      <SEOHead
        title={
          isTH
            ? "AP | ผู้นำโซลูชันไฟฟ้า ครบวงจร เชื่อถือได้ทุกระบบ"
            : "AP | Trusted Comprehensive Electrical Solutions"
        }
        description={
          isTH
            ? "โซลูชันไฟฟ้าครบวงจร ครอบคลุมแรงสูง–แรงต่ำ มาตรฐาน ISO/EGAT/MEA/PEA"
            : "Comprehensive electrical solutions from high to low voltage, certified by ISO/EGAT/MEA/PEA"
        }
        keywords={
          isTH
            ? [
                "อุปกรณ์ไฟฟ้า",
                "กราวด์รอด",
                "ระบบไฟฟ้าแรงสูง",
                "ระบบไฟฟ้าแรงต่ำ",
                "AP",
                "Iampong",
              ]
            : [
                "electrical equipment",
                "ground rod",
                "high voltage",
                "low voltage",
                "AP",
                "Iampong",
              ]
        }
        canonical={`/${localeTyped}`}
        structuredData={[
          generateOrganizationSchema(organizationData),
          faqSchema,
        ]}
        locale={localeTyped}
      />
      <HashScroll />
      <Hero dictionary={dictionary.hero} />
      <WhyAP dictionary={dictionary.whyAP} />
      <MainProduct dictionary={dictionary.mainProduct} locale={localeTyped} />
      <ContactSale dictionary={dictionary.contactSale} />
      <AboutUs dictionary={dictionary.about as AboutDictionary} />
      <Projects dictionary={dictionary.projects} locale={localeTyped} />
      <Articles />
      <Career />
      <ContactUs />
    </>
  );
}
