import Image from "next/image";
import { notFound } from "next/navigation";
import { categoryIcons } from "@/components/icons";
import { getServiceCategory, toSubcategories } from "@/lib/payload";
import { getTranslations } from "next-intl/server";
import { initLocale, type LocaleParams } from "@/i18n/locale";

export default async function InterventionsPage({ params }: LocaleParams) {
  const locale = await initLocale(params); // before getTranslations: keeps the page static
  const t = await getTranslations("ServicePages");
  const category = await getServiceCategory("interventions", locale);
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

              {sub.interventions && (
                <div className="mt-8">
                  <h3 className="mb-4 flex items-center gap-3 text-lg">
                    <span aria-hidden="true" className="h-5 w-0.5 shrink-0 bg-accent" />
                    {t("interventions")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sub.interventions.map((it, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-line bg-sand p-5"
                      >
                        <h4 className="mb-2 flex items-center gap-2.5 text-base font-semibold text-ink">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          {it.name}
                        </h4>
                        <p className="text-sm text-muted">{it.desc}</p>
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
