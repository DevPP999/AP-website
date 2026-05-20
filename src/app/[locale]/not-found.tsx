import NotFoundContent from "@/components/NotFoundContent";
import type { Locale } from "@/types";

export default async function NotFound({
  params,
}: {
  params?: Promise<{ locale: string }>;
}) {
  // Handle case where params might be undefined
  let locale: string = "th";

  if (params) {
    try {
      const resolvedParams = await params;
      locale = resolvedParams?.locale || "th";
    } catch {
      // If params fails, default to "th"
      locale = "th";
    }
  }

  const localeTyped: Locale =
    locale === "th" || locale === "en" ? locale : "th";

  const content = {
    th: {
      title: "ไม่พบหน้าที่คุณกำลังมองหา",
      description: "ขออภัย หน้าที่คุณกำลังมองหาไม่มีอยู่ในระบบ",
      suggestion: "ลองตรวจสอบ URL หรือกลับไปที่หน้าหลัก",
      button: "กลับสู่หน้าหลัก",
      errorCode: "404",
    },
    en: {
      title: "Page Not Found",
      description: "Sorry, the page you are looking for does not exist.",
      suggestion: "Please check the URL or return to the homepage",
      button: "Go to Home",
      errorCode: "404",
    },
  };

  const text = content[localeTyped];

  return (
    <>
      <NotFoundContent locale={localeTyped} content={text} />
    </>
  );
}
