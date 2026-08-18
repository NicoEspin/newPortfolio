"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        background: "var(--color-void)",
        color: "var(--color-paper)",
        minHeight: "80svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "96px 24px",
      }}
    >
      <span className="mono-label" style={{ color: "var(--color-steel)" }}>
        {t("label")}
      </span>
      <h1
        style={{
          fontSize: "var(--text-subheading)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          margin: "20px 0 24px",
        }}
      >
        {t("heading")}
      </h1>
      <button
        type="button"
        onClick={reset}
        className="mono-label"
        style={{
          background: "none",
          border: "1px solid var(--color-paper)",
          color: "var(--color-paper)",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {t("retry")}
      </button>
    </div>
  );
}
