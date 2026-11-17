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
      <header className="mb-8 flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-brand">
          <Icon aria-hidden="true" className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl">{category.title}</h1>
          <p className="mt-1 text-muted">{category.subtitle}</p>
        </div>
      </header>

      <div className="space-y-8">
        {subcategories.map((sub) => (
          <article key={sub.key} className="card overflow-hidden">
            <div className="relative h-56 sm:h-72 overflow-hidden bg-sand">
              {sub.image && (
                <Image
                  src={sub.image.src}
                  alt={sub.image.alt}
                  fill
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-warm/40 to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl">{sub.name}</h2>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-text">
                {sub.description}
              </p>

              {sub.equipment && (
                <div className="mt-8">
                  <h3 className="mb-4 flex items-center gap-3 text-lg">
                    <span aria-hidden="true" className="h-5 w-0.5 shrink-0 bg-accent" />
                    {t("equipment")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sub.equipment.map((eq, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-xl border border-line bg-sand p-3"
                      >
                        <ChevronRight
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand rtl:rotate-180"
                        />
                        <span className="text-sm lg:text-base font-medium text-ink">{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sub.applications && (
                <div className="mt-8">
                  <h3 className="mb-4 flex items-center gap-3 text-lg">
                    <span aria-hidden="true" className="h-5 w-0.5 shrink-0 bg-accent" />
                    {t("applications")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sub.applications.map((app, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 rounded-xl border border-line bg-sand p-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="text-sm lg:text-base text-text">{app}</span>
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
