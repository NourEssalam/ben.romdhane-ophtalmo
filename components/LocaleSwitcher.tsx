"use client";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, routing, type Locale } from "@/i18n/routing";
import { flags } from "./flags";

type Props = {
  className?: string;
  /** compact: flag + code (desktop header). full: flag + name, full width, opens upward (mobile menu). */
  variant?: "compact" | "full";
};

/** Language menu: keeps the current page, swaps the locale prefix. */
export default function LocaleSwitcher({ className = "", variant = "compact" }: Props) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  const full = variant === "full";
  const CurrentFlag = flags[locale];

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Focus the active language when the menu opens.
  useEffect(() => {
    if (open) optionRefs.current[routing.locales.indexOf(locale)]?.focus();
  }, [open, locale]);

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  const select = (next: Locale) => {
    close();
    if (next === locale) return;
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = optionRefs.current;
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const focusAt = (n: number) => items[(n + items.length) % items.length]?.focus();
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusAt(i + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusAt(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusAt(0);
        break;
      case "End":
        e.preventDefault();
        focusAt(items.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={`relative ${full ? "w-full" : ""} ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={t("label")}
        title={t("label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`inline-flex h-10 items-center gap-2 rounded-full border bg-surface text-text hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors duration-200 cursor-pointer ${
          full ? "w-full px-4 text-base" : "px-3 lg:px-4 text-sm lg:text-base"
        } ${open ? "border-brand text-brand" : "border-line"} ${isPending ? "opacity-60" : ""}`}
      >
        <CurrentFlag className="w-5 h-[0.875rem]" />
        {full ? (
          <span lang={locale} className="flex-1 text-start font-medium">
            {localeNames[locale]}
          </span>
        ) : (
          <span className="font-semibold tracking-wide uppercase">{locale}</span>
        )}
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={menuId}
        role="listbox"
        aria-label={t("label")}
        onKeyDown={onMenuKeyDown}
        className={`absolute end-0 z-50 p-1.5 rounded-2xl bg-surface border border-line shadow-card transition duration-150 ease-out ${
          full ? "bottom-full mb-2 w-full origin-bottom" : "top-full mt-2 w-48 origin-top-right rtl:origin-top-left"
        } ${open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95 pointer-events-none"}`}
      >
        {routing.locales.map((l, i) => {
          const Flag = flags[l];
          const active = l === locale;
          return (
            <button
              key={l}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              type="button"
              role="option"
              aria-selected={active}
              lang={l}
              tabIndex={open ? 0 : -1}
              onClick={() => select(l)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm lg:text-base text-start transition-colors focus-visible:outline-none focus-visible:bg-sand cursor-pointer ${
                active ? "bg-sand text-brand font-medium" : "text-text hover:bg-sand hover:text-ink"
              }`}
            >
              <Flag className="w-5 h-[0.875rem]" />
              <span className="flex-1">{localeNames[l]}</span>
              {active && <Check aria-hidden="true" className="w-4 h-4 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
