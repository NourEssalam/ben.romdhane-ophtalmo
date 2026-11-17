import { useTranslations } from "next-intl";
import ServicesCards, { type ServiceCard } from "./ServicesCards";

export default function Services({ cards }: { cards: ServiceCard[] }) {
  const t = useTranslations("Services");
  return (
    <section
      id="services"
      className="section-padding bg-sand border-b border-line"
    >
      <div className="container-section">
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-base leading-relaxed text-text">
            {t("intro")}
          </p>
        </div>

        <ServicesCards cards={cards} />

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p className="text-sm text-muted">{t("ctaQuestion")}</p>
          <a href="#contact" className="btn btn-primary">
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
