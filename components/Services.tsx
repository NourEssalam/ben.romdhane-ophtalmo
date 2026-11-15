import { useTranslations } from "next-intl";
import ServicesCards, { type ServiceCard } from "./ServicesCards";

export default function Services({ cards }: { cards: ServiceCard[] }) {
  const t = useTranslations("Services");
  return (
    <section
      id="services"
      className="py-10 sm:py-12 md:py-14 bg-gradient-to-b from-white via-brand-light/30 to-white"
    >
      <div className="container-section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 sm:mb-3">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
            {t("intro")}
          </p>
        </div>

        <ServicesCards cards={cards} />

        {/* Bottom CTA */}
        <div className="mt-6 sm:mt-8 md:mt-10 text-center">
          <p className="text-xs sm:text-sm text-slate-700 mb-2 sm:mb-3">
            {t("ctaQuestion")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base text-white font-medium hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
