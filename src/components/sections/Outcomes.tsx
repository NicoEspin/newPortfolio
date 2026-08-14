"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ordenImage from "@/assets/outcomes/orden.jpg";
import tiempoImage from "@/assets/outcomes/tiempo.webp";
import ventasImage from "@/assets/outcomes/ventas.webp";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Act = {
  key: "order" | "sales" | "time";
  heading: React.ReactNode;
  sub: React.ReactNode;
  tags: string;
};

const OUTCOME_MEDIA = {
  order: ordenImage,
  sales: ventasImage,
  time: tiempoImage,
} as const;

const ACTS: Act[] = [
  {
    key: "order",
    heading: (
      <>
        Construyo <em className="outcomes-em outcomes-em--accent">orden</em>.
      </>
    ),
    sub: (
      <>
        Software que transforma
        <br />
        complejidad en control.
      </>
    ),
    tags: "CUSTOM SOFTWARE · SYSTEM DESIGN · OPERATIONS",
  },
  {
    key: "sales",
    heading: (
      <>
        Construyo <em className="outcomes-em outcomes-em--accent">ventas</em>.
      </>
    ),
    sub: (
      <>
        Sitios que convierten
        <br />
        atención en acción.
      </>
    ),
    tags: "WEB EXPERIENCE · CONVERSION · POSITIONING",
  },
  {
    key: "time",
    heading: (
      <>
        Construyo <em className="outcomes-em outcomes-em--time">tiempo</em>.
      </>
    ),
    sub: (
      <>
        Agentes de IA que se ocupan
        <br />
        de lo repetitivo.
      </>
    ),
    tags: "AI AGENTS · AUTOMATION · ALWAYS RUNNING",
  },
];

/**
 * Outcomes — sticky four-act narrative (Sistemas → Orden → Ventas → Tiempo).
 * Base render is a plain stacked flow (accessible, no-JS/reduced-motion
 * baseline). Enhancement wires a single scrub timeline to a CSS-sticky
 * stage — never GSAP `pin` — so acts cross-fade as one continuous
 * composition instead of four discrete slides.
 */
export default function Outcomes() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const act1Ref = useRef<HTMLDivElement | null>(null);
  const premiseRef = useRef<HTMLSpanElement | null>(null);
  const sistemasRef = useRef<HTMLSpanElement | null>(null);
  const statementRef = useRef<HTMLSpanElement | null>(null);
  const actRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const salesLineRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!wrapRef.current || prefersReducedMotion()) return;
      const acts = actRefs.current;
      const media = mediaRefs.current;
      const copies = copyRefs.current;
      if (!act1Ref.current || acts.some((a) => !a) || media.some((m) => !m)) return;

      wrapRef.current.classList.add("outcomes-story--enhanced");

      // Initial states — set once, before any ScrollTrigger measures layout.
      gsap.set([premiseRef.current, statementRef.current], {
        clipPath: "inset(0 0 100% 0)",
      });
      gsap.set(media[0], { clipPath: "inset(0 0 0 100%)" });
      gsap.set(media[1], { clipPath: "inset(0 100% 0 0)" });
      gsap.set(media[2], { opacity: 0 });
      gsap.set(copies, { opacity: 0, y: 22 });
      if (salesLineRef.current) gsap.set(salesLineRef.current, { scaleX: 0 });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 900px)",
          isMobile: "(max-width: 899px)",
        },
        (context) => {
          const conditions = context.conditions as { isDesktop: boolean } | undefined;
          const shift = conditions?.isDesktop ? 56 : 24;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });

          // Act 1 — typographic mask reveal, then "sistemas" recedes while
          // "lo que hacen posible" gains weight, leading into the transition.
          tl.to([premiseRef.current, statementRef.current], {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.06,
            ease: "power3.out",
            stagger: 0.02,
          }, 0)
            .to(sistemasRef.current, { opacity: 0.4, duration: 0.1, ease: "none" }, 0.07)
            .to(statementRef.current, { x: shift * 0.15, duration: 0.11, ease: "none" }, 0.07)

            // → Orden (0.18–0.28: both acts coexist across the full
            // transition window — a real cross-dissolve, not a hard cut).
            .to(act1Ref.current, { autoAlpha: 0, y: -shift, duration: 0.1, ease: "power2.inOut" }, 0.18)
            .to(acts[0], { opacity: 1, duration: 0.1, ease: "power2.inOut" }, 0.18)
            .to(media[0], { clipPath: "inset(0 0 0 0%)", duration: 0.1, ease: "power2.inOut" }, 0.18)
            .to(copies[0], { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.21)

            // Orden hold — a very leve internal drift, one motion only.
            .to(media[0], { x: -shift * 0.3, duration: 0.15, ease: "none" }, 0.28)

            // → Ventas (0.43–0.53). Orden recedes with a single fade — the
            // same mechanism as Act1's exit — so Ventas' own mask reveal
            // reads as the one, clear main motion instead of competing
            // with a second transform on the outgoing media.
            .to(acts[0], { autoAlpha: 0, duration: 0.1, ease: "power2.inOut" }, 0.43)
            .to(copies[0], { opacity: 0, duration: 0.06, ease: "none" }, 0.43)
            .to(acts[1], { opacity: 1, duration: 0.1, ease: "power2.inOut" }, 0.43)
            .to(media[1], { clipPath: "inset(0 0 0 0%)", duration: 0.1, ease: "power2.inOut" }, 0.43)
            .to(copies[1], { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.46)
            .to(salesLineRef.current, { scaleX: 1, duration: 0.12, ease: "power2.inOut" }, 0.55)

            // Ventas hold — a very leve internal drift, one motion only.
            .to(media[1], { x: shift * 0.2, duration: 0.15, ease: "none" }, 0.53)

            // → Tiempo (0.68–0.78). Ventas recedes with the same single
            // fade; Tiempo's background fade-in is the one main motion.
            .to(acts[1], { autoAlpha: 0, duration: 0.1, ease: "power2.inOut" }, 0.68)
            .to(copies[1], { opacity: 0, duration: 0.06, ease: "none" }, 0.68)
            .to(acts[2], { opacity: 1, duration: 0.1, ease: "power2.inOut" }, 0.68)
            .to(media[2], { opacity: 0.5, duration: 0.14, ease: "power2.inOut" }, 0.68)
            .to(copies[2], { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.72);
          // 0.78 → 1: Tiempo holds, last 8% is a deliberate pause — no tween.
        }
      );

      return () => mm.revert();
    },
    { scope: wrapRef }
  );

  return (
    <section id="outcomes" aria-label="Qué construyo" ref={wrapRef} className="outcomes-story">
      <div className="outcomes-story__sticky">
        <div ref={act1Ref} className="outcomes-act outcomes-act--intro">
          <h2 className="outcomes-act1__statement-wrap">
            <span ref={premiseRef} className="outcomes-act1__premise">
              No construyo{" "}
              <span ref={sistemasRef} className="outcomes-act1__sistemas">
                sistemas
              </span>
              .
            </span>
            <span ref={statementRef} className="outcomes-act1__statement">
              Construyo lo que <em className="outcomes-em">hacen <span className="ne-infrared">posible</span></em>.
            </span>
          </h2>
        </div>

        {ACTS.map((act, i) => (
          <div
            key={act.key}
            ref={(el) => {
              actRefs.current[i] = el;
            }}
            className={`outcomes-act outcomes-act--${act.key}`}
          >
            <div
              ref={(el) => {
                mediaRefs.current[i] = el;
              }}
              className="outcomes-media"
              style={{
                backgroundImage: `url(${OUTCOME_MEDIA[act.key].src})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              aria-hidden="true"
            />
            <div
              ref={(el) => {
                copyRefs.current[i] = el;
              }}
              className="outcomes-copy"
            >
              <h3 className="outcomes-copy__heading">{act.heading}</h3>
              <p className="outcomes-copy__sub">{act.sub}</p>
              {act.key === "sales" && (
                <span ref={salesLineRef} className="outcomes-sales-line" aria-hidden="true" />
              )}
              <p className="mono-label outcomes-copy__tags">{act.tags}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
