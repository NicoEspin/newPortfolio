"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const METADATA = [
  "Córdoba, Argentina",
  "Founder — Synttek",
  "60+ productos entregados",
  "Working worldwide",
];

/**
 * Retrato vivo: franja angosta que se expande a foto completa por scroll
 * y se cierra hacia un lateral al salir, en flujo normal, sin sticky/pin
 * (ver docs/visual-direction.md §About) + reveal de color por proximidad
 * del cursor (desktop) o por progreso de scroll (mobile). Placeholder de
 * color en vez de foto real: ver nota de proceso en el mismo doc.
 *
 * Un único timeline con un único ScrollTrigger de scrub controla el
 * `clip-path` — dos ScrollTrigger independientes animando la misma
 * propiedad en el mismo elemento se pisan entre sí (overwrite de GSAP),
 * dejando el mask trabado en el estado del último creado.
 */
export default function AboutPortrait() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const monoRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!wrapRef.current || !maskRef.current) return;
      const mask = maskRef.current;
      const mono = monoRef.current;

      if (prefersReducedMotion()) {
        gsap.set(mask, { clipPath: "inset(0% 0% 0% 0%)" });
        if (mono) gsap.set(mono, { opacity: 0 });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        { isDesktop: "(min-width: 900px)" },
        (context) => {
          const desktop = (context.conditions as { isDesktop: boolean }).isDesktop;

          gsap.set(mask, {
            clipPath: desktop ? "inset(0% 44% 0% 38%)" : "inset(0% 8% 0% 34%)",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          // Entrance: expand over roughly the first ~40% of the element's
          // transit through the viewport, then hold at full width/color
          // with no tween until the exit window near the end.
          tl.to(mask, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power2.out" }, 0);
          if (mono && !desktop) {
            tl.to(mono, { opacity: 0, duration: 0.4, ease: "power1.out" }, 0);
          }

          // Exit: close toward one lateral edge over the final ~18%.
          tl.to(
            mask,
            {
              clipPath: desktop ? "inset(0% 0% 0% 55%)" : "inset(0% 0% 0% 60%)",
              duration: 0.18,
              ease: "power2.in",
            },
            0.82
          );
        }
      );

      return () => mm.revert();
    },
    { scope: wrapRef }
  );

  // Pointer-driven radial color reveal — desktop only, local listener,
  // never touches the global cursor dot (Cursor.tsx).
  useGSAP(
    () => {
      const mask = maskRef.current;
      if (!mask || prefersReducedMotion()) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const state = { x: 50, y: 50, r: 0 };
      const apply = () => {
        mask.style.setProperty("--mx", `${state.x}%`);
        mask.style.setProperty("--my", `${state.y}%`);
        mask.style.setProperty("--reveal-r", `${state.r}px`);
      };

      const moveX = gsap.quickTo(state, "x", { duration: 0.45, ease: "power3", onUpdate: apply });
      const moveY = gsap.quickTo(state, "y", { duration: 0.45, ease: "power3", onUpdate: apply });

      const onMove = (e: MouseEvent) => {
        const rect = mask.getBoundingClientRect();
        moveX(((e.clientX - rect.left) / rect.width) * 100);
        moveY(((e.clientY - rect.top) / rect.height) * 100);
      };
      const onEnter = () => gsap.to(state, { r: 160, duration: 0.4, ease: "power2.out", onUpdate: apply });
      const onLeave = () => gsap.to(state, { r: 0, duration: 0.5, ease: "power2.in", onUpdate: apply });

      mask.addEventListener("mousemove", onMove);
      mask.addEventListener("mouseenter", onEnter);
      mask.addEventListener("mouseleave", onLeave);
      return () => {
        mask.removeEventListener("mousemove", onMove);
        mask.removeEventListener("mouseenter", onEnter);
        mask.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: maskRef }
  );

  return (
    <>
      <div className="about-portrait-wrap" ref={wrapRef}>
        <div
          className="about-portrait-mask"
          ref={maskRef}
          role="img"
          aria-label="Retrato editorial de Nicolás Espin — placeholder, pendiente de fotografía o video real"
        >
          <div className="about-portrait-color" aria-hidden="true" />
          <div className="about-portrait-mono" ref={monoRef} aria-hidden="true" />
          <div className="about-portrait-overlay" aria-hidden="true" />
          <span className="about-portrait-fragment" aria-hidden="true">
            el criterio.
          </span>
          <span className="mono-label about-portrait-tag" aria-hidden="true">
            [Reemplazar — fotografía o video editorial real de Nicolás]
          </span>
        </div>

        <Reveal as="p" className="about-portrait-statement2">
          Me interesa ese momento en el que una idea deja de ser una promesa y
          empieza a funcionar.
        </Reveal>
      </div>

      <div className="about-copy">
        <Reveal as="p" className="about-copy__block reading-measure">
          Soy Nicolás, desarrollador full-stack y fundador de{" "}
          <span className="ne-infrared">Synttek</span>.
        </Reveal>
        <Reveal as="p" className="about-copy__block reading-measure" delay={0.08}>
          Trabajo en el punto donde producto, interacción y negocio dejan de
          ser disciplinas separadas y empiezan a funcionar como una sola
          experiencia.
        </Reveal>
      </div>

      <div className="about-metadata mono-label">
        {METADATA.map((item, i) => (
          <span key={item}>
            {item}
            {i < METADATA.length - 1 && (
              <span className="about-metadata__sep" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </>
  );
}
