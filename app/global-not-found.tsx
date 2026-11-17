// Global 404 for URLs that match no route at all (handled at the routing level,
// so it never intercepts /admin or /api once Payload adds them).
// It bypasses every layout, so it renders its own <html>/<body> and imports the
// site's global styles. Requires experimental.globalNotFound in next.config.mjs.
import "./(frontend)/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import ThemeScript from "@/components/ThemeScript";
import Footer from "@/components/Footer";
import ContactFooter from "@/components/ContactFooter";
import NotFound from "./(frontend)/[locale]/not-found";
import { NextIntlClientProvider } from "next-intl";
import { getGlobal, getServiceCategories, toServiceLinks } from "@/lib/payload";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Page introuvable | Dr Brahim Ben Romdhane",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default async function GlobalNotFound() {
  const [categories, contact] = await Promise.all([
    getServiceCategories("fr"),
    getGlobal("contact", "fr"),
  ]);

  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        {/* No locale segment here: request config falls back to French. */}
        <NextIntlClientProvider>
          <Header services={toServiceLinks(categories)} />
          <NotFound />
          <ContactFooter contact={contact} />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
