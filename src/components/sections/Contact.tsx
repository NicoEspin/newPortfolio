"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMagnetic } from "@/hooks/useMagnetic";
import Reveal from "@/components/Reveal";
import { prefersReducedMotion } from "@/lib/motion";

const EMAIL = "nicolasespin.dev@gmail.com";

export default function Contact() {
  const dotRef = useMagnetic<HTMLAnchorElement>(0.4);
  const pulseRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    if (!pulseRef.current || prefersReducedMotion()) return;
    gsap.to(pulseRef.current, {
      scale: 1.15,
      duration: 1.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section
      id="contact"
      aria-label="Contact"
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
         CONTACT
      </span>

      <Reveal delay={0.05}>
        <h2
          className="reading-measure"
          style={{
            fontSize: "var(--text-heading)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: "20px 0 40px",
          }}
        >
          Innovemos{" "}
          <em
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--color-signal-soft)",
            }}
          >
            Juntos
          </em>
          .
        </h2>
      </Reveal>

      <a
        ref={dotRef}
        href={`mailto:${EMAIL}`}
        aria-label={`Escribir a ${EMAIL}`}
        data-cursor-hover
        style={{ display: "inline-block", marginBottom: 32 }}
      >
        <span
          ref={pulseRef}
          aria-hidden="true"
          style={{
            display: "block",
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--color-signal)",
          }}
        />
      </a>

      <a
        href={`mailto:${EMAIL}`}
        style={{
          fontSize: "1.1rem",
          borderBottom: "1px solid var(--color-paper)",
          paddingBottom: 4,
        }}
      >
        {EMAIL}
      </a>
    </section>
  );
}
