"use client";

import type { RefObject } from "react";
import { useTranslations } from "next-intl";
import image1 from "@/assets/about/image-1.jpg";
import image2 from "@/assets/about/image-2.jpg";

/**
 * Presentacional puro — sin hooks propios a propósito. La animación
 * (ScrollTrigger pin + crossfade) vive en AboutPortrait.tsx, que ya es
 * dueño de `maskRef`: un `useGSAP`/layout-effect en este componente no
 * puede leer de forma fiable el ref de un ANCESTOR (`.about-portrait-mask`)
 * pasado por prop, porque React adjunta los refs y corre los layout effects
 * en orden hijo→padre — el layout effect de este componente se ejecutaría
 * antes de que el ref del padre quedara adjuntado. Recibir los refs ya
 * creados por el padre evita el problema de raíz.
 */
export default function AboutPortraitReveal({
  rootRef,
  hotRef,
  glowRef,
  fragmentRef,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  hotRef: RefObject<HTMLImageElement | null>;
  glowRef: RefObject<HTMLDivElement | null>;
  fragmentRef: RefObject<HTMLSpanElement | null>;
}) {
  const t = useTranslations("about");
  return (
    <div className="portrait-reveal" ref={rootRef}>
      <img
        src={image1.src}
        width={image1.width}
        height={image1.height}
        alt={t("portraitAlt")}
        className="portrait-reveal__img portrait-reveal__img--base"
        draggable={false}
      />
      <img
        ref={hotRef}
        src={image2.src}
        width={image2.width}
        height={image2.height}
        alt=""
        aria-hidden="true"
        className="portrait-reveal__img portrait-reveal__img--hot"
        draggable={false}
      />
      <div ref={glowRef} className="portrait-reveal__glow" aria-hidden="true" />
      <span ref={fragmentRef} className="about-portrait-fragment" aria-hidden="true">
        {t("fragmentWord")}
      </span>
    </div>
  );
}
