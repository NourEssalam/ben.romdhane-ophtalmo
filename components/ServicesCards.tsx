"use client";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { categoryIcons, type ServiceLink } from "./icons";

export type ServiceCard = ServiceLink & {
  title: string;
  description?: string | null;
  image: { src: string; alt: string } | null;
  features: string[];
};

/** Cards grid + mobile "show all services" toggle (needs state). */
export default function ServicesCards({ cards }: { cards: ServiceCard[] }) {
  const t = useTranslations("Services");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Service Cards Grid */}
      <div
        className={`grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${
          !isExpanded ? "max-md:grid-rows-1 max-md:overflow-hidden" : ""
        }`}
      >
        {cards.map((service, index) => {
          const Icon = categoryIcons[service.icon];
          const isHidden = !isExpanded && index > 0;
          return (
            <Link
              key={service.slug}
              href={service.href}
              className={`group card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isHidden ? "max-md:hidden" : ""
              }`}
            >
              {/* Image */}
              <div className="relative h-36 sm:h-40 md:h-44 overflow-hidden">
                {service.image && (
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <div className="p-2 rounded-xl bg-white/95 backdrop-blur-xs shadow-lg">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                {service.description && (
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 leading-relaxed">
                    {service.description}
                  </p>
                )}

                {/* Features */}
                <ul className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-2 text-brand font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all">
                  <span>{t("learnMore")}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden text-center mt-5">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
        >
          <span>{isExpanded ? t("showLess") : t("showAll")}</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
}
