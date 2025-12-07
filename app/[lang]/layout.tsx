import { AppThemeProvider } from "@/config/AppThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { i18n, type Locale } from "../../config/i18n-config";
import { getDictionary } from "../../get-dictionary";
import { CustomAppBar } from "./components/CustomAppBar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
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
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <body>
        <Analytics />
        <AppRouterCacheProvider options={{ key: "css" }}>
          <AppThemeProvider>
            <CustomAppBar dictionary={dictionary.appBar} />
            {children}
            <Footer dictionary={dictionary.footer} />
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
