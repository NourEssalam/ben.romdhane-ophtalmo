import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFooter from "@/components/ContactFooter";
import { getGlobal, getServiceCategories, toServiceLinks } from "@/lib/payload";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = await getGlobal("site-settings");
  return { title, description };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, contact] = await Promise.all([
    getServiceCategories(),
    getGlobal("contact"),
  ]);

  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <Header services={toServiceLinks(categories)} />
        {children}
        <ContactFooter contact={contact} />
        <Footer />
      </body>
    </html>
  );
}
