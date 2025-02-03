import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./config/i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  if (
    [
      "/next.svg",
      "/vercel.svg",
      "/manifest.json",
      "/favicon.ico",
      "/logo.png",
      "/profile_pic_v1.jpg",
      "/about_me_pic_v1.jpg",
      // "/icons/**",
      "/icons/nextjs-icon.png",
      "/icons/react-icon.png",
      "/icons/js-icon.png",
      "/icons/ts-icon.png",
      "/icons/csharp-icon.png",
      "/icons/msql-icon.png",
      "/icons/electron-icon.png",
      "/icons/kotlin-icon.png",
      "/icons/android-icon.png",
      "/icons/material-ui-icon.png",
      // "/projects/**",
      "/projects/admin_shell.png",
      "/projects/battlefield_lobby.png",
      "/projects/trash_tracker.png",
      "/projects/veda_time_tracker.png",
      "/assets/cv_german.pdf",
      "/assets/cv_english.pdf",
      // Your other files in `public`
    ].includes(pathname)
  )
    return;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - .swa (Azure static web apps)
  //    */
  //   "/((?!.swa).*)",
  // ],
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - .swa (Azure static web apps)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.swa).*)",
  ],
};
