export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-void)",
        color: "var(--color-steel)",
        padding: "24px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        borderTop: "1px solid var(--color-line-dark)",
      }}
    >
      <span className="mono-label">
        NE. © {new Date().getFullYear()}
      </span>
      <span className="mono-label">SYNTTEK</span>
      <span className="mono-label">CBA, AR</span>
    </footer>
  );
}
