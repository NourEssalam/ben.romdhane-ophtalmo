import { notFound } from "next/navigation";

// Unknown paths under a locale (/ar/foo) render the localized not-found.tsx
// inside the layout instead of the French global-not-found.
export default function CatchAll() {
  notFound();
}
