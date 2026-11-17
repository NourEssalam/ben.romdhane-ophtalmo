"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

/** Collapsible biography details + mobile "show more" toggle (needs state). */
export default function BiographyDetails({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Biography");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Collapsible Content */}
      <div
        className={`space-y-4 sm:space-y-5 transition-all duration-500 ${
          !isExpanded ? "max-sm:hidden" : ""
        }`}
      >
        {children}
      </div>

      {/* Mobile Toggle Button */}
      <div className="sm:hidden text-center pt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex min-h-11 items-center gap-2 text-brand font-medium text-sm lg:text-base hover:text-brand-hover transition-colors"
        >
          <span>{isExpanded ? t("showLess") : t("showMore")}</span>
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
