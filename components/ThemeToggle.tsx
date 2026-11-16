"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

// Same key ThemeScript reads before first paint.
const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function readStored(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/** Light/dark switch. Follows the OS until the visitor makes a choice. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useTranslations("ThemeToggle");
  // null until mounted: the server can't know the theme, so render a placeholder.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

    // No saved choice: track live OS changes.
    const mq = matchMedia(DARK_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (readStored()) return;
      const next: Theme = e.matches ? "dark" : "light";
      apply(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this page view only.
    }
  };

  const base = `inline-flex items-center justify-center p-2 rounded-lg text-fg-body hover:text-brand hover:bg-surface-subtle transition-colors duration-200 shrink-0 ${className}`;

  if (!theme) return <span className={base} aria-hidden="true"><span className="w-5 h-5" /></span>;

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      className={base}
      aria-label={isDark ? t("toLight") : t("toDark")}
      title={isDark ? t("toLight") : t("toDark")}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
