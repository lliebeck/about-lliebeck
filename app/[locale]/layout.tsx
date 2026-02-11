import { AppThemeProvider } from "@/config/AppThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { i18n } from "../i18n/i18n-config";
import { routing } from "../i18n/routing";
import { CustomAppBar } from "./components/CustomAppBar";
import Footer from "./components/Footer";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale: locale }));
}

export const metadata: Metadata = {
  title: "Lukas Liebeck",
  description: "This is the profile of Lukas Liebeck",
  keywords: ["lukas", "liebeck", "lukas liebeck", "lliebeck", "portfolio"],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <Analytics />
        <AppRouterCacheProvider options={{ key: "css" }}>
          <AppThemeProvider>
            <NextIntlClientProvider>
              <CustomAppBar />
              {children}
              <Footer />
            </NextIntlClientProvider>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
