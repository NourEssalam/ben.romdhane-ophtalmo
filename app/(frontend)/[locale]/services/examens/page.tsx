import Image from "next/image";
import { notFound } from "next/navigation";
import { categoryIcons } from "@/components/icons";
import { getServiceCategory, toSubcategories } from "@/lib/payload";
import { getTranslations } from "next-intl/server";
import { initLocale, type LocaleParams } from "@/i18n/locale";
import { ChevronRight } from "lucide-react";

export default async function ExamensPage({ params }: LocaleParams) {
  const locale = await initLocale(params); // before getTranslations: keeps the page static
  const t = await getTranslations("ServicePages");
  const category = await getServiceCategory("examens", locale);
  if (!category) notFound();
  const Icon = categoryIcons[category.icon];
  const subcategories = toSubcategories(category);

  return (
    <main>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-brand/10">
            <Icon className="w-8 h-8 text-brand" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-fg">
              {category.title}
            </h1>
            <p className="mt-1 text-fg-muted">
              {category.subtitle}
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {subcategories.map((sub) => (
            <article key={sub.key} className="card overflow-hidden">
              <div className="relative h-64 sm:h-80 overflow-hidden">
                {sub.image && (
                  <Image
                    src={sub.image.src}
                    alt={sub.image.alt}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {sub.name}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base">
                    {sub.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {sub.equipment && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-fg mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 rounded-sm bg-brand" />
                      {t("equipment")}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {sub.equipment.map((eq, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 rounded-lg bg-brand-light/50 border border-brand/20"
                        >
                          <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-brand" />
                          <span className="text-sm font-medium text-fg-body">
                            {eq}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {sub.applications && (
                  <div>
                    <h3 className="text-lg font-bold text-fg mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 rounded-sm bg-brand" />
                      {t("applications")}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sub.applications.map((app, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 bg-surface-muted rounded-lg border border-line"
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-brand" />
                          <span className="text-sm text-fg-body">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
        ))}
      </div>
    </main>
  );
}

