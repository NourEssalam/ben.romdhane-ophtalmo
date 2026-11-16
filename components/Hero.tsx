"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export type HeroSlide = { src: string; alt: string };

export type HeroProps = {
  slides: HeroSlide[];
  heading: string;
  intro?: string | null;
  primaryCtaLabel?: string | null;
  secondaryCtaLabel?: string | null;
};

export default function Hero({
  slides,
  heading,
  intro,
  primaryCtaLabel,
  secondaryCtaLabel,
}: HeroProps) {
  const t = useTranslations("Hero");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section id="accueil" className="relative">
      <div className="relative h-[60vh] sm:h-[65vh] md:h-[68vh] min-h-[400px] sm:min-h-[420px] w-full overflow-hidden">
        {/* Image Slides */}
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
              sizes="100vw"
              preload={i === 0}
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Enhanced Gradient Overlay - Darker at bottom for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 absolute bottom-4 sm:bottom-8 md:bottom-10 left-0 right-0">
          <div className="max-w-2xl animate-fadeInUp">
            {/* Text Container with Backdrop */}
            <div className="bg-surface/85 backdrop-blur-xs p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-2xl">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-fg leading-tight"
                style={{ textShadow: "1px 1px 3px rgba(255,255,255,0.8)" }}
              >
                {heading}
              </h1>
              {intro && (
                <p className="mt-3 sm:mt-4 text-fg-body text-sm sm:text-base md:text-lg leading-relaxed">
                  {intro}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 sm:px-6 sm:py-3 text-white text-sm sm:text-base font-medium hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {primaryCtaLabel}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full ring-2 ring-line-strong bg-surface px-5 py-2.5 sm:px-6 sm:py-3 text-fg-body text-sm sm:text-base font-medium hover:bg-surface-muted hover:ring-fg-subtle transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {secondaryCtaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={t("goToSlide", { number: i + 1 })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
