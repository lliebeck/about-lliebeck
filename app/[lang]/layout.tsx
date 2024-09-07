import { AppThemeProvider } from "@/config/AppThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { i18n, type Locale } from "../../config/i18n-config";
import { CustomAppBar } from "./components/CustomAppBar";
import { getDictionary } from "../../get-dictionary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Footer from "./components/Footer";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Lukas Liebeck",
  description: "This is Lukas Liebeck's profile",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body>
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
