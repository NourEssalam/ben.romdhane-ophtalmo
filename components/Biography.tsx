import Image from "next/image";
import { GraduationCap, Building2, Award, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";
import BiographyDetails from "./BiographyDetails";
import type { Biography as BiographyData } from "../payload-types";

export default function Biography({
  data,
  photo,
}: {
  data: BiographyData;
  photo: { src: string; alt: string } | null;
}) {
  const t = useTranslations("Biography");
  const experienceItems = data.experience?.items ?? [];
  const diplomaItems = data.diplomas?.items ?? [];

  return (
    <section
      id="biographie"
      className="py-10 sm:py-12 md:py-14 bg-gradient-to-b from-surface to-brand-light/20"
    >
      <div className="container-section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-fg mb-2">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-sm text-fg-muted">
            {t("subtitle")}
          </p>
        </div>

        <div className="card bg-gradient-to-br from-surface to-surface-muted/50 p-5 sm:p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Left Column - Image */}
            <div className="lg:col-span-4">
              <div className="relative h-48 sm:h-56 lg:h-72 rounded-xl overflow-hidden shadow-md">
                {photo && (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                {data.badge && (
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs sm:text-sm font-medium bg-brand/90 backdrop-blur-xs px-3 py-1.5 rounded-lg inline-block">
                      {data.badge}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Professional Info */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              {/* Main Title */}
              <div className="border-l-4 border-brand pl-4">
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-brand shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-fg mb-1">
                      {data.headline}
                    </h3>
                    {data.headlineSubtitle && (
                      <p className="text-xs sm:text-sm text-fg-muted">
                        {data.headlineSubtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <BiographyDetails>
                {/* Education */}
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-fg">
                        {data.education?.institution}
                      </h4>
                      {data.education?.diploma && (
                        <p className="text-xs sm:text-sm text-fg-muted mt-1">
                          {data.education.diploma}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Experience */}
                <div className="bg-emerald-500/10 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Building2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <h4 className="font-semibold text-sm sm:text-base text-fg">
                      {data.experience?.title}
                    </h4>
                  </div>
                  <ul className="space-y-2 ml-8">
                    {experienceItems.map((entry, i) => (
                      <li
                        key={entry.id ?? i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-fg-body"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span>{entry.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Diplomas */}
                <div className="bg-amber-500/10 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-fg">
                        {data.diplomas?.title}
                      </h4>
                      {data.diplomas?.institution && (
                        <p className="text-xs text-fg-muted mt-0.5">
                          {data.diplomas.institution}
                        </p>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-1.5 ml-8">
                    {diplomaItems.map((entry, i) => (
                      <li
                        key={entry.id ?? i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-fg-body"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{entry.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BiographyDetails>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
