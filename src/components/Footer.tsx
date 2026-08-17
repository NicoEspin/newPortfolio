const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nicol%C3%A1s-espin/" },
  { label: "GitHub", href: "https://github.com/NicoEspin" },
];

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
      <a className="mono-label" target="_blank" rel="noopener noreferrer" href="https://www.synttek.com/">SYNTTEK</a>
      <span className="mono-label">CBA, AR</span>
      <span style={{ display: "flex", gap: 20 }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label"
            data-cursor-hover
          >
            {s.label}
          </a>
        ))}
      </span>
    </footer>
  );
}
