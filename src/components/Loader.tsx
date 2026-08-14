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

export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);

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
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
          color: "var(--color-paper)",
          letterSpacing: "-0.03em",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <span className="ne-letter" style={{ display: "inline-block" }}>
          N
        </span>
        <span className="ne-letter" style={{ display: "inline-block" }}>
          E
        </span>
        <span
          ref={dotRef}
          className="ne-letter"
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "0.16em",
            height: "0.16em",
            borderRadius: "50%",
            background: "var(--color-signal)",
            alignSelf: "flex-end",
            marginLeft: "0.06em",
            marginBottom: "0.12em",
          }}
        />
      </div>
    </div>
  );
}
