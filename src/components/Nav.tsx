"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#outcomes", label: "Outcomes" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      if (!menuRef.current) return;
      if (open) {
        gsap.set(menuRef.current, { display: "flex" });
        gsap.fromTo(
          menuRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.inOut" }
        );
        gsap.from(".mobile-nav-link", {
          y: 24,
          opacity: 0,
          stagger: 0.06,
          delay: 0.15,
          duration: 0.4,
        });
      } else {
        gsap.to(menuRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => gsap.set(menuRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 24px",
        mixBlendMode: "difference",
        color: "var(--color-paper)",
      }}
    >
      <Link
        href="/"
        aria-label="NE. — Inicio"
        style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}
      >
        NE<span style={{ color: "var(--color-signal)" }}>.</span>
      </Link>

      <nav aria-label="Navegación principal" className="hidden-mobile">
        <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={sectionHref(l.href)}
                className="mono-label"
                style={{ fontSize: "0.75rem" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="show-mobile"
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.06em",
          cursor: "pointer",
          padding: 8,
        }}
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      <div
        id="mobile-nav"
        ref={menuRef}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          background: "var(--color-void)",
          color: "var(--color-paper)",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 24px",
          zIndex: 140,
          overflowY: "auto",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          {LINKS.map((l, i) => (
            <li key={l.href} className="mobile-nav-link">
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={sectionHref(l.href)}
                style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mono-label" style={{ marginTop: 40, color: "var(--color-steel)" }}>
          Córdoba, AR
        </div>
      </div>
    </header>
  );
}
