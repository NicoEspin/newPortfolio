"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import AboutPortrait from "@/components/sections/AboutPortrait";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations("about");
  const openRef = useRef<HTMLDivElement | null>(null);
  const statementRef = useRef<HTMLHeadingElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!line1Ref.current || !line2Ref.current) return;

      if (prefersReducedMotion()) {
        gsap.set([line1Ref.current, line2Ref.current], {
          clipPath: "inset(0 0 0% 0)",
          autoAlpha: 1,
        });
        return;
      }

      gsap.set([line1Ref.current, line2Ref.current], {
        clipPath: "inset(0 0 100% 0)",
        autoAlpha: 1,
      });

      gsap.to(line1Ref.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: openRef.current, start: "top 80%", once: true },
      });

      gsap.to(line2Ref.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.85,
        delay: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: openRef.current, start: "top 80%", once: true },
      });

      // Very leve escala de entrada — no letter-spacing: animar tracking en
      // texto grande con text-wrap:balance fuerza recálculo de wrap en cada
      // frame de scroll (reflow), lo cual se ve entrecortado. transform:scale
      // es compositor-only, sin reflow, y cumple el mismo pedido del brief
      // ("tracking o escala"). Rango corto: solo mientras entra, no todo el scroll.
      gsap.fromTo(
        statementRef.current,
        { scale: 1.015 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: openRef.current,
            start: "top 95%",
            end: "top 55%",
            scrub: true,
          },
        }
      );
    },
    { scope: openRef }
  );

  return (
    <section id="about" aria-label="About" className="about-section">
      <div className="about-open" ref={openRef}>
        <div className="about-open__eyebrow">
          <span className="mono-label" style={{ color: "var(--color-steel)" }}>
            About
          </span>
          <span className="mono-label about-open__name">Nicolás Espin</span>
        </div>

        <h2 className="about-open__statement" ref={statementRef}>
          <span ref={line1Ref} className="about-open__line1" style={{ visibility: "hidden" }}>
            {t("line1")}
          </span>
          <span ref={line2Ref} className="about-open__line2" style={{ visibility: "hidden" }}>
            {t("line2")}
          </span>
        </h2>
      </div>

      <AboutPortrait />
    </section>
  );
}
