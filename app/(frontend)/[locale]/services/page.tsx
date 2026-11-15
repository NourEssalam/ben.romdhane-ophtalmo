import { redirect } from "@/i18n/navigation";
import { initLocale, type LocaleParams } from "@/i18n/locale";

export default async function ServicesPage({ params }: LocaleParams) {
  redirect({ href: "/services/examens", locale: await initLocale(params) });
}
