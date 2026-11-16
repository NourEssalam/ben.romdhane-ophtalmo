import ServicesNav from "@/components/ServicesNav";
import { getServiceCategories, toServiceLinks } from "@/lib/payload";
import { initLocale, type LocaleParams } from "@/i18n/locale";

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
} & LocaleParams) {
  const categories = await getServiceCategories(await initLocale(params));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="section-padding">
        <div className="container-section">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <ServicesNav links={toServiceLinks(categories)} />

            {/* Content */}
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
