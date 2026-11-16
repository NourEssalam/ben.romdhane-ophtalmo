import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/Header";
import ThemeScript from "@/components/ThemeScript";
import Footer from "@/components/Footer";
import ContactFooter from "@/components/ContactFooter";
import { getGlobal, getServiceCategories, toServiceLinks } from "@/lib/payload";
import { localeDir, routing } from "@/i18n/routing";
import { initLocale, type LocaleParams } from "@/i18n/locale";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { title, description } = await getGlobal("site-settings", await initLocale(params));
  return { title, description };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
} & LocaleParams) {
  const locale = await initLocale(params);

  const [categories, contact] = await Promise.all([
    getServiceCategories(locale),
    getGlobal("contact", locale),
  ]);

  return (
    <html lang={locale} dir={localeDir(locale)} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <Header services={toServiceLinks(categories)} />
          {children}
          <ContactFooter contact={contact} />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
