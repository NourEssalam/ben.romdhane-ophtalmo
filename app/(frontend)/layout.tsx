import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFooter from "@/components/ContactFooter";

export const metadata: Metadata = {
  title: "Dr Brahim Ben Romdhane | Ophtalmologiste à Mahdia",
  description:
    "Cabinet d'ophtalmologie à Mahdia: examens, traitements, chirurgie, et suivi visuel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <Header />
        {children}
        <ContactFooter />
        <Footer />
      </body>
    </html>
  );
}
