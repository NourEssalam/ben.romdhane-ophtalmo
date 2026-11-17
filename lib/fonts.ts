import { Figtree, Newsreader, Noto_Naskh_Arabic } from "next/font/google";

// Headings (font-serif).
const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

// Body and UI (font-sans).
const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-figtree",
});

// Arabic (font-arabic). Not preloaded, so fr/en/de pages never download it.
const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
  preload: false,
  variable: "--font-naskh",
});

/** Put on <html>: defines the CSS variables globals.css maps to font utilities. */
export const fontVariables = `${newsreader.variable} ${figtree.variable} ${naskh.variable}`;
