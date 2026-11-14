"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/** Collapsible biography details + mobile "Voir plus" toggle (needs state). */
export default function BiographyDetails({
  children,
}: {
  children: React.ReactNode;
}) {
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
          className="inline-flex items-center gap-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors"
        >
          <span>{isExpanded ? "Voir moins" : "Voir plus de détails"}</span>
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
