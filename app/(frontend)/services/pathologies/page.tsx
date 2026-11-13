"use client";
import Image from "next/image";
import { servicesData } from "@/lib/servicesData";
import { Eye } from "lucide-react";

export default function PathologiesPage() {
  const category = servicesData.pathologies;
  const Icon = category.icon;

  return (
    <main>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-brand/10">
            <Icon className="w-8 h-8 text-brand" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {category.title}
            </h1>
            <p className="mt-1 text-slate-600">
              Prise en charge complète des pathologies oculaires
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {Object.entries(category.subcategories).map(([key, sub]) => (
          <article key={key} className="card overflow-hidden">
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <Image
                src={sub.image}
                alt={sub.name}
                fill
                className="object-cover"
              />
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
              {sub.conditions && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 rounded bg-brand" />
                    Pathologies Traitées
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sub.conditions.map((cond, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-brand-light text-brand border border-brand/20"
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {sub.treatments && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 rounded bg-brand" />
                    Solutions Thérapeutiques
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {sub.treatments.map((t, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-brand-light/50 border border-brand/20 hover:shadow-md transition-shadow"
                      >
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 bg-brand text-white">
                          <Eye className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-base text-slate-900 mb-1">
                          {t.name}
                        </h4>
                        <p className="text-sm text-slate-600">{t.desc}</p>
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

