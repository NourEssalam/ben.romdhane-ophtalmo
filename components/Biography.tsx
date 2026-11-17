import Image from "next/image";
import { GraduationCap, Building2, Award, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";
import BiographyDetails from "./BiographyDetails";
import type { Biography as BiographyData } from "../payload-types";

const iconTile =
  "grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-brand";

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
      className="section-padding bg-bg border-b border-line"
    >
      <div className="container-section">
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-base leading-relaxed text-text">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 items-start">
          {/* Left Column - Image */}
          <div className="lg:col-span-4">
            <div className="relative h-48 sm:h-56 lg:h-72 rounded-card overflow-hidden">
              {photo && (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-warm/40 to-transparent" />
              {data.badge && (
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="inline-block rounded-full bg-brand px-3.5 py-1.5 text-xs sm:text-sm font-medium text-on-brand">
                    {data.badge}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Professional Info */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            {/* Main Title */}
            <div className="border-s-4 border-brand ps-4">
              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-brand shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg sm:text-xl mb-1">{data.headline}</h3>
                  {data.headlineSubtitle && (
                    <p className="text-sm text-muted">
                      {data.headlineSubtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <BiographyDetails>
              {/* Education */}
              <div className="card p-5">
                <div className="flex items-start gap-3">
                  <div className={iconTile}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-base sm:text-lg text-ink">
                      {data.education?.institution}
                    </h4>
                    {data.education?.diploma && (
                      <p className="text-sm text-muted mt-1">
                        {data.education.diploma}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={iconTile}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-medium text-base sm:text-lg text-ink">
                    {data.experience?.title}
                  </h4>
                </div>
                <ul className="space-y-2 sm:ms-14">
                  {experienceItems.map((entry, i) => (
                    <li
                      key={entry.id ?? i}
                      className="flex items-start gap-2.5 text-sm text-text"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span>{entry.item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Diplomas */}
              <div className="card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={iconTile}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-base sm:text-lg text-ink">
                      {data.diplomas?.title}
                    </h4>
                    {data.diplomas?.institution && (
                      <p className="text-sm text-muted mt-0.5">
                        {data.diplomas.institution}
                      </p>
                    )}
                  </div>
                </div>
                <ul className="space-y-2 sm:ms-14">
                  {diplomaItems.map((entry, i) => (
                    <li
                      key={entry.id ?? i}
                      className="flex items-start gap-2.5 text-sm text-text"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span>{entry.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BiographyDetails>
          </div>
        </div>
      </div>
    </section>
  );
}
