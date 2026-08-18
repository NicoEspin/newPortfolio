"use client";

import { useTranslations } from "next-intl";

export default function SkipLink() {
  const t = useTranslations("common");
  return (
    <a href="#main" className="skip-link">
      {t("skipLink")}
    </a>
  );
}
