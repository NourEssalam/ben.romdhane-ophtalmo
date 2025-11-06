"use client";
import { useState, useEffect, useMemo } from "react";

interface Review {
  name: string;
  text: string;
  dir?: string;
}

const reviews: Review[] = [
  {
    name: "Aymen",
    text: "Accueil chaleureux et examen très complet. Je recommande vivement !",
  },
  {
    name: "Nadia",
    text: "Très professionnelle, explications claires et rassurantes.",
  },
  { name: "أمينة", text: "استقبال ممتاز وفحص شامل. أنصح به بشدة.", dir: "rtl" },
  { name: "بلال", text: "طبيبة محترفة وتوضيحات دقيقة ومطمئنة.", dir: "rtl" },
];

function chunkReviews(reviews: Review[], reviewsPerSlide: number) {
  let result: Review[][] = [];
  for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
    result.push(reviews.slice(i, i + reviewsPerSlide));
  }
  return result;
}

export default function Testimonials() {
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

  const slides = useMemo(
    () => chunkReviews(reviews, reviewsPerSlide),
    [reviewsPerSlide]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section
      id="temoignages"
      className="section-padding bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="container-section">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center">
          Témoignages
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 text-center">
          Quelques avis de nos patients
        </p>

        {/* Carousel wrapper with padding for buttons */}
        <div className="relative mt-12 px-12 sm:px-16">
          {/* Previous Button */}
          <button
            onClick={prev}
            aria-label="Témoignage précédent"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all duration-200 hover:scale-110"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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

          {/* Next Button */}
          <button
            onClick={next}
            aria-label="Témoignage suivant"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all duration-200 hover:scale-110"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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

          {/* Slides Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((slideReviews, slideIdx) => (
                <div key={slideIdx} className="min-w-full flex gap-4 sm:gap-6">
                  {slideReviews.map((review, reviewIdx) => (
                    <blockquote
                      key={review.name + reviewIdx}
                      className="flex-1 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8 border border-slate-100"
                      dir={review.dir || "ltr"}
                    >
                      <div className="flex items-start mb-4">
                        <svg
                          className="w-8 h-8 text-brand opacity-50"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p
                        className={`text-base sm:text-lg leading-relaxed text-slate-700 mb-4 ${
                          review.dir === "rtl" ? "text-right" : ""
                        }`}
                      >
                        {review.text}
                      </p>
                      <footer
                        className={`text-sm font-semibold text-slate-900 ${
                          review.dir === "rtl" ? "text-right" : ""
                        }`}
                      >
                        — {review.name}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                aria-label={`Aller au témoignage ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === index
                    ? "bg-brand w-8"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
