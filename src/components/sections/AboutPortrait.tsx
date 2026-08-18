"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import Reveal from "@/components/Reveal";
import AboutPortraitReveal from "@/components/sections/AboutPortraitReveal";
import image1 from "@/assets/about/image-1.jpg";

gsap.registerPlugin(ScrollTrigger);

// Medido por cross-correlación de fila entre los dos JPG del retrato (misma
// resolución, franja central de la cara): image-2 queda ~45px más arriba
// que image-1 a resolución nativa. Con object-fit:cover el par siempre
// queda acotado por altura en este layout (contenedores más altos, en
// relación a su ancho, que el 1.78:1 de la foto), así que la corrección
// escala 1:1 con containerHeight/naturalHeight.
const ALIGN_OFFSET_NATIVE_PX = 45;

const REVEAL_END = 0.72; // progreso al que la máscara ya cubre todo el cuadro
const FRAGMENT_END = 0.32; // progreso al que el fragmento termina su reveal
const PIN_DISTANCE = "+=180%";

function diagonal(w: number, h: number) {
  return Math.sqrt(w * w + h * h);
}

/**
 * Retrato vivo: franja angosta que se expande a foto completa por scroll
 * y se cierra hacia un lateral al salir, en flujo normal (este timeline de
 * ancho no pinea nada — ver docs/visual-direction.md §About).
 *
 * Un único timeline con un único ScrollTrigger de scrub controla el
 * `clip-path` — dos ScrollTrigger independientes animando la misma
 * propiedad en el mismo elemento se pisan entre sí (overwrite de GSAP),
 * dejando el mask trabado en el estado del último creado.
 *
 * El reveal persona→código→sistema (image-1 → image-2) es un segundo
 * mecanismo independiente: pinea `.about-portrait-mask` (`maskRef`) mientras
 * una máscara elíptica centrada crece hasta cubrir el cuadro, scrubbeada
 * 1:1 con el progreso de scroll. Vive en este componente (no en
 * AboutPortraitReveal, que es puramente presentacional) porque necesita
 * leer `maskRef.current` de forma fiable: un layout effect en un
 * descendiente no puede confiar en el ref de un ANCESTOR pasado por prop
 * — React adjunta refs y corre layout effects en orden hijo→padre, así
 * que el ref del padre todavía es `null` cuando el layout effect del hijo
 * se ejecuta por primera vez.
 */
export default function AboutPortrait() {
  const t = useTranslations("about");
  const METADATA = [
    t("metadata.location"),
    t("metadata.founder"),
    t("metadata.products"),
    t("metadata.worldwide"),
  ];
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const portraitRootRef = useRef<HTMLDivElement | null>(null);
  const hotRef = useRef<HTMLImageElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const fragmentRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!wrapRef.current || !maskRef.current) return;
      const mask = maskRef.current;

      if (prefersReducedMotion()) {
        gsap.set(mask, { clipPath: "inset(0% 0% 0% 0%)" });
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

  useGSAP(
    () => {
      const root = portraitRootRef.current;
      const hot = hotRef.current;
      const glow = glowRef.current;
      const fragment = fragmentRef.current;
      const pinTarget = maskRef.current;
      if (!root || !hot || !glow || !fragment || !pinTarget) return;

      const applyAlignment = () => {
        const scale = root.getBoundingClientRect().height / image1.height;
        hot.style.transform = `translateY(${ALIGN_OFFSET_NATIVE_PX * scale}px)`;
      };
      applyAlignment();

      if (prefersReducedMotion()) return;

      const setProgress = (p: number) => {
        const rect = root.getBoundingClientRect();
        const diag = diagonal(rect.width, rect.height);
        const revealT = gsap.utils.clamp(0, 1, p / REVEAL_END);
        const rx = revealT * diag;
        const ry = revealT * diag;
        const cx = rect.width / 2;
        const cy = rect.height * 0.4;

        for (const el of [hot, glow]) {
          el.style.setProperty("--rv-x", `${cx}px`);
          el.style.setProperty("--rv-y", `${cy}px`);
          el.style.setProperty("--rv-rx", `${rx}px`);
          el.style.setProperty("--rv-ry", `${ry}px`);
        }
        glow.style.opacity = String(p < 0.5 ? p * 2 : Math.max(0, (1 - p) * 2));

        const fragT = gsap.utils.clamp(0, 1, p / FRAGMENT_END);
        fragment.style.opacity = String(gsap.utils.interpolate(0.35, 1, fragT));
        fragment.style.transform = `translateY(${gsap.utils.interpolate(14, 0, fragT)}px)`;
      };

      gsap.set(hot, { opacity: 1 });
      setProgress(0);

      const onResize = () => applyAlignment();
      window.addEventListener("resize", onResize);

      ScrollTrigger.getById("about-portrait-reveal")?.kill();

      const st = ScrollTrigger.create({
        id: "about-portrait-reveal",
        trigger: pinTarget,
        start: "top top",
        end: PIN_DISTANCE,
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: (self) => setProgress(self.progress),
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener("resize", onResize);
        st.kill();
      };
    },
    { scope: wrapRef }
  );

  return (
    <>
      <div className="about-portrait-wrap" ref={wrapRef}>
        <div className="about-portrait-mask" ref={maskRef}>
          <AboutPortraitReveal
            rootRef={portraitRootRef}
            hotRef={hotRef}
            glowRef={glowRef}
            fragmentRef={fragmentRef}
          />
          <div className="about-portrait-overlay" aria-hidden="true" />
        </div>

        <Reveal as="p" className="about-portrait-statement2">
          {t("quote")}
        </Reveal>
      </div>

      <div className="about-copy">
        <Reveal as="p" className="about-copy__block reading-measure">
          {t.rich("bio", {
            infrared: (chunks) => <span className="ne-infrared">{chunks}</span>,
          })}
        </Reveal>
        <Reveal as="p" className="about-copy__block reading-measure" delay={0.08}>
          {t("closing")}
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
