import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/i18n/config";
import esMessages from "@/messages/es.json";
import enMessages from "@/messages/en.json";

const MESSAGES: Record<Locale, typeof esMessages> = {
  es: esMessages,
  en: enMessages,
};

export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export async function getServerMessages() {
  const locale = await getServerLocale();
  return { locale, messages: MESSAGES[locale] };
}
