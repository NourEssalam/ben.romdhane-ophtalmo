"use client";
import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";

export interface Review {
  id: number | string;
  name: string;
  text: string;
  dir?: "ltr" | "rtl";
}

function chunkReviews(reviews: Review[], reviewsPerSlide: number) {
  let result: Review[][] = [];
  for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
    result.push(reviews.slice(i, i + reviewsPerSlide));
  }
  return result;
}

const QUOTE_PATH =
  "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z";

/** Decorative quote mark, always `accent`. */
function QuoteGlyph({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`text-accent ${className}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d={QUOTE_PATH} />
    </svg>
  );
}

const ARROW_CLASS =
  "absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-surface border border-line flex items-center justify-center text-ink hover:bg-sand transition-colors duration-200";

export default function Testimonials({ reviews }: { reviews: Review[] }) {
  const t = useTranslations("Testimonials");
  const [reviewsPerSlide, setReviewsPerSlide] = useState(1);

  useEffect(() => {
    function updateReviewsPerSlide() {
      if (window.innerWidth >= 1024) setReviewsPerSlide(3);
      else if (window.innerWidth >= 640) setReviewsPerSlide(2);
      else setReviewsPerSlide(1);
    }
    updateReviewsPerSlide();
    window.addEventListener("resize", updateReviewsPerSlide);
    return () => window.removeEventListener("resize", updateReviewsPerSlide);
  }, []);

  // The first review (by sortOrder) is featured; the rest go in the carousel.
  const featured = reviews[0];
  const slides = useMemo(
    () => chunkReviews(reviews.slice(1), reviewsPerSlide),
    [reviews, reviewsPerSlide]
  );
  const [index, setIndex] = useState(0);
  const hasControls = slides.length > 1;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % slides.length);

  if (!featured) return null;

  const featuredRtl = featured.dir === "rtl";

  return (
    <section
      id="temoignages"
      className="section-padding bg-sand border-b border-line"
    >
      <div className="container-section">
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-base leading-relaxed text-text">
            {t("subtitle")}
          </p>
        </div>

        {/* Featured quote */}
        <figure
          className="rounded-card bg-brand text-on-brand p-8 sm:p-12"
          dir={featured.dir || "ltr"}
        >
          <QuoteGlyph className="w-10 h-10 sm:w-12 sm:h-12" />
          <blockquote
            className={`mt-6 max-w-4xl ${
              featuredRtl
                ? "font-arabic text-xl sm:text-2xl leading-[1.8]"
                : "font-serif text-2xl sm:text-3xl leading-snug"
            }`}
          >
            {featured.text}
          </blockquote>
          <figcaption className="mt-6 text-sm font-medium">
            — {featured.name}
          </figcaption>
        </figure>

        {/* Carousel. Forced LTR so the translateX track works on RTL pages;
            each quote keeps its own dir. */}
        {slides.length > 0 && (
          <div
            dir="ltr"
            className={`relative mt-6 sm:mt-8 ${
              hasControls ? "px-14 sm:px-16" : ""
            }`}
          >
            {hasControls && (
              <>
                <button
                  onClick={prev}
                  aria-label={t("previous")}
                  className={`${ARROW_CLASS} left-0`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={next}
                  aria-label={t("next")}
                  className={`${ARROW_CLASS} right-0`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Slides Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((slideReviews, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="min-w-full flex gap-4 sm:gap-6"
                  >
                    {slideReviews.map((review) => (
                      <blockquote
                        key={review.id}
                        className="card flex-1 p-6 sm:p-7"
                        dir={review.dir || "ltr"}
                      >
                        <QuoteGlyph className="w-6 h-6" />
                        <p
                          className={`mt-4 text-base text-text ${
                            review.dir === "rtl"
                              ? "font-arabic leading-[1.8]"
                              : "leading-relaxed"
                          }`}
                        >
                          {review.text}
                        </p>
                        <footer className="mt-4 text-sm font-medium text-ink">
                          — {review.name}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicators */}
            {hasControls && (
              <div className="flex justify-center gap-2 mt-8">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setIndex(idx)}
                    aria-label={t("goTo", { number: idx + 1 })}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === index
                        ? "bg-brand w-8"
                        : "bg-muted/40 hover:bg-muted"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
