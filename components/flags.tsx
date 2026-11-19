import { useId, type JSX } from "react";
import type { Locale } from "@/i18n/routing";

// Inline SVG flags: emoji flags render as plain letters on Windows.
// Every flag fills a 3:2 box; `slice` crops the 2:1 Union Jack to fit.

type FlagProps = { className?: string };

const base = "inline-block shrink-0 rounded-[3px] ring-1 ring-line";

function Svg({ className = "", viewBox, children }: FlagProps & { viewBox: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={`${base} ${className}`}
    >
      {children}
    </svg>
  );
}

const France = (p: FlagProps) => (
  <Svg {...p} viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#002654" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#CE1126" />
  </Svg>
);

const Tunisia = (p: FlagProps) => (
  <Svg {...p} viewBox="0 0 1200 800">
    <rect width="1200" height="800" fill="#E70013" />
    <circle cx="600" cy="400" r="200" fill="#fff" />
    <circle cx="600" cy="400" r="150" fill="#E70013" />
    <circle cx="640" cy="400" r="120" fill="#fff" />
    <polygon
      fill="#E70013"
      points="535,400 596,379 597,314 636,366 698,347 661,400 698,453 636,434 597,486 596,421"
    />
  </Svg>
);

function UnitedKingdom(p: FlagProps) {
  // Unique per instance: the flag can appear twice (trigger + menu).
  const clip = useId();
  return (
  <Svg {...p} viewBox="0 0 60 30">
    <clipPath id={clip}>
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clip})`} stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </Svg>
  );
}

const Germany = (p: FlagProps) => (
  <Svg {...p} viewBox="0 0 5 3">
    <rect width="5" height="1" fill="#000" />
    <rect y="1" width="5" height="1" fill="#DD0000" />
    <rect y="2" width="5" height="1" fill="#FFCE00" />
  </Svg>
);

/** Flag shown for each site language. Arabic uses Tunisia (the practice is in Mahdia). */
export const flags: Record<Locale, (p: FlagProps) => JSX.Element> = {
  fr: France,
  ar: Tunisia,
  en: UnitedKingdom,
  de: Germany,
};
