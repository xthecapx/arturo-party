import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a valid locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get locale from cookie, Accept-Language header, or use default
  let locale = defaultLocale;

  // Check cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Check Accept-Language header
    const acceptLanguage = request.headers.get("Accept-Language");
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim().substring(0, 2))
        .find((lang) => isValidLocale(lang));
      
      if (preferredLocale && isValidLocale(preferredLocale)) {
        locale = preferredLocale;
      }
    }
  }

  // Redirect to locale-prefixed path
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};

