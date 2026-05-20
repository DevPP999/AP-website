import { NextRequest, NextResponse } from "next/server";

// i18n configuration
export const defaultLocale = "th";
const supportedLocales = ["th", "en"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // บล็อก paths ที่น่าสงสัย
  const suspiciousPatterns = [
    /^\/beting-/,
    /^\/slot-/,
    /^\/wp-/,
    /^\/admin/,
    /^\/login/,
    /\.php$/i,
  ]
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(pathname)) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }
  
  // i18n logic (เดิม)
  const segments = pathname.split("/");
  const locale = segments[1];

  if (locale && !supportedLocales.includes(locale)) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  return NextResponse.next();
}