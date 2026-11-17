import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="border-t border-line bg-sand">
      <div className="container-section py-4 sm:py-6 text-xs sm:text-sm lg:text-base text-muted flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-serif text-sm sm:text-base text-ink">Dr B. Ben Romdhane</span> — {t("specialty")}
        </p>
        <p>{t("location")}</p>
      </div>
    </footer>
  );
}

