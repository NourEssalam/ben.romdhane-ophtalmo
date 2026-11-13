// Global 404 for URLs that match no route at all (handled at the routing level,
// so it never intercepts /admin or /api once Payload adds them).
// It bypasses every layout, so it renders its own <html>/<body> and imports the
// site's global styles. Requires experimental.globalNotFound in next.config.mjs.
import "./(frontend)/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFooter from "@/components/ContactFooter";
import NotFound from "./(frontend)/not-found";

export const metadata: Metadata = {
  title: "Page introuvable | Dr Brahim Ben Romdhane",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <Header />
        <NotFound />
        <ContactFooter />
        <Footer />
      </body>
    </html>
  );
}
