"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Clock, Phone } from "lucide-react";

export type HeroSlide = { src: string; alt: string };

export type HeroProps = {
  slides: HeroSlide[];
  heading: string;
  intro?: string | null;
  primaryCtaLabel?: string | null;
  secondaryCtaLabel?: string | null;
  phone?: { display: string; number: string } | null;
  hours?: string | null;
};

export default function Hero({
  slides,
  heading,
  intro,
  primaryCtaLabel,
  secondaryCtaLabel,
  phone,
  hours,
}: HeroProps) {
  const t = useTranslations("Hero");
  const tLogo = useTranslations("Logo");
  const tFooter = useTranslations("Footer");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section id="accueil" className="bg-bg border-b border-line">
      <div className="container-section grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Text */}
        <div className="animate-fadeInUp">
          <p className="flex items-center gap-3 text-sm lg:text-base font-medium uppercase tracking-wider text-muted rtl:tracking-normal">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent" />
            {tLogo("specialty")} · {tFooter("location")}
          </p>

          <h1 className="mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {heading}
          </h1>

          {intro && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text sm:text-lg">
              {intro}
            </p>
          )}

          {(primaryCtaLabel || secondaryCtaLabel) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCtaLabel && (
                <a href="#services" className="btn btn-lg btn-primary">
                  {primaryCtaLabel}
                </a>
              )}
              {secondaryCtaLabel && (
                <a href="#contact" className="btn btn-lg btn-secondary">
                  {secondaryCtaLabel}
                </a>
              )}
            </div>
          )}

          {(phone || hours) && (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm lg:text-base text-text">
              {phone && (
                <a
                  href={`tel:${phone.number}`}
                  className="inline-flex items-center gap-2 font-medium text-ink hover:text-brand"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
                  <span dir="ltr">{phone.display}</span>
                </a>
              )}
              {hours && (
                <span className="inline-flex items-center gap-2">
                  <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
                  {hours}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Photo */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card rounded-ss-[72px] lg:aspect-[4/5] lg:rounded-ss-[140px]">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  preload={i === 0}
                  className="object-cover object-center"
                />
              </div>
            ))}

            {/* Warm overlay from the bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-warm/40 to-transparent" />
          </div>

          {slides.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-brand" : "w-2 bg-muted/50 hover:bg-muted"
                  }`}
                  aria-label={t("goToSlide", { number: i + 1 })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
