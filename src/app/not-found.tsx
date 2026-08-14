import Link from "next/link";

export default function NotFound() {
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
        404 — SEÑAL PERDIDA
      </span>
      <div
        aria-hidden="true"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "var(--color-signal)",
          margin: "28px 0",
        }}
      />
      <h1
        style={{
          fontSize: "var(--text-subheading)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginBottom: 24,
        }}
      >
        Esta página no existe.
      </h1>
      <Link
        href="/"
        style={{ borderBottom: "1px solid var(--color-paper)", paddingBottom: 4 }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
