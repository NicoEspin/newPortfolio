"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import esMessages from "@/messages/es.json";
import enMessages from "@/messages/en.json";

const MESSAGES: Record<Locale, typeof esMessages> = {
  es: esMessages,
  en: enMessages,
};

type LocaleSwitchContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleSwitchContext = createContext<LocaleSwitchContextValue | null>(null);

export function useLocaleSwitch() {
  const ctx = useContext(LocaleSwitchContext);
  if (!ctx) throw new Error("useLocaleSwitch must be used within LocaleProvider");
  return ctx;
}

export default function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next;
  }, []);

  const contextValue = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  const messages = MESSAGES[locale];

  return (
    <LocaleSwitchContext.Provider value={contextValue}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleSwitchContext.Provider>
  );
}
