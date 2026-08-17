"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  DURATION,
  hasSeenLoader,
  markLoaderSeen,
  prefersReducedMotion,
} from "@/lib/motion";
import { LOGO_DOT, LOGO_E_PATH, LOGO_N_PATH, LOGO_VIEWBOX } from "@/lib/logo";

export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!hasSeenLoader()) {
      setVisible(true);
      markLoaderSeen();
    }
  }, []);

  useGSAP(
    () => {
      if (!visible || !rootRef.current) return;

      if (prefersReducedMotion()) {
        gsap.set(rootRef.current, { autoAlpha: 0 });
        setVisible(false);
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setVisible(false),
      });

      tl.from(".ne-letter", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
      })
        .to(dotRef.current, { scale: 1.6, duration: 0.25, ease: "power2.out" }, "+=0.1")
        .to(
          rootRef.current,
          {
            xPercent: 100,
            duration: 0.5,
            ease: "power3.inOut",
          },
          "+=0.05"
        );

      // Hard safety cap so the loader never blocks the page beyond 1.4s.
      const cap = window.setTimeout(() => setVisible(false), DURATION.pulse * 1000);
      return () => window.clearTimeout(cap);
    },
    { dependencies: [visible], scope: rootRef }
  );

  if (!mounted || !visible) return null;

  return (
    <div
      ref={rootRef}
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "var(--color-void)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox={LOGO_VIEWBOX}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "clamp(220px, 32vw, 380px)",
          height: "auto",
          color: "var(--color-paper)",
          overflow: "hidden",
        }}
      >
        <g className="ne-letter">
          <path fill="currentColor" d={LOGO_N_PATH} />
        </g>
        <g className="ne-letter">
          <path fill="currentColor" d={LOGO_E_PATH} />
        </g>
        <circle
          ref={dotRef}
          className="ne-letter"
          fill="var(--color-signal)"
          cx={LOGO_DOT.cx}
          cy={LOGO_DOT.cy}
          r={LOGO_DOT.r}
        />
      </svg>
    </div>
  );
}
