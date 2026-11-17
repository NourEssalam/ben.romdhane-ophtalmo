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
        className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${
          !isExpanded ? "max-md:grid-rows-1" : ""
        }`}
      >
        {cards.map((service, index) => {
          const Icon = categoryIcons[service.icon];
          const isHidden = !isExpanded && index > 0;
          return (
            <Link
              key={service.slug}
              href={service.href}
              className={`group card card-hover flex flex-col overflow-hidden ${
                isHidden ? "max-md:hidden" : ""
              }`}
            >
              {/* Photo with a warm overlay from the bottom */}
              <div className="relative h-40 sm:h-44 overflow-hidden bg-sand">
                {service.image && (
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-warm/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-5 pb-5">
                {/* Icon tile, overlapping the photo edge */}
                <div className="relative -mt-6 mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-line bg-surface text-brand">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>

                <h3 className="text-xl leading-snug">{service.title}</h3>

                {service.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                )}

                {/* Features */}
                <ul className="mt-4 mb-5 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-text"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-brand">
                  <span>{t("learnMore")}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand hover:text-brand-hover transition-colors"
        >
          <span>{isExpanded ? t("showLess") : t("showAll")}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </>
  );
}
