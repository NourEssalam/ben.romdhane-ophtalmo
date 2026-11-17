import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Logo() {
  const t = useTranslations("Logo");
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-surface border border-line grid place-items-center overflow-hidden">
        <Image
          src="/logo_transparent.png"
          alt={t("alt")}
          width={35}
          height={35}
          className="object-contain rounded-full"
          priority
        />
      </div>
      <div className="leading-tight">
        <p className="font-serif text-lg font-medium text-ink">
          Dr Brahim <i className="italic text-brand">Ben Romdhane</i>
        </p>
        <p className="text-xs lg:text-sm text-muted">{t("specialty")}</p>
      </div>
    </Link>
  );
}
