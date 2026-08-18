"use client";

import { useTranslations } from "next-intl";
import { useLocaleSwitch } from "@/components/providers/LocaleProvider";
import type { Locale } from "@/i18n/config";

export default function LocaleSwitch() {
  const { locale, setLocale } = useLocaleSwitch();
  const t = useTranslations("nav");

  const button = (target: Locale, label: string, aria: string) => (
    <button
      type="button"
      onClick={() => setLocale(target)}
      aria-pressed={locale === target}
      aria-label={aria}
      className="mono-label"
      data-cursor-hover
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: locale === target ? "default" : "pointer",
        fontSize: "0.75rem",
        color: locale === target ? "var(--color-signal)" : "var(--color-steel)",
      }}
    >
      {label}
    </button>
  );

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "inherit",
      }}
    >
      {button("es", "ES", t("switchToSpanish"))}
      <span aria-hidden="true" style={{ color: "var(--color-steel)" }}>
        /
      </span>
      {button("en", "EN", t("switchToEnglish"))}
    </span>
  );
}
