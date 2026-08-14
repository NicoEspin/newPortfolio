"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The "kinetic signal core" — the site's own abstract hero object.
 * Concentric rings + an infrared core. Tracks the cursor within a small
 * radius (Track behavior) and idles with a slow Pulse otherwise.
 */
export default function SignalCore() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!coreRef.current) return;
      if (prefersReducedMotion()) return;

      gsap.to(coreRef.current, {
        scale: 1.08,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      if (!window.matchMedia("(pointer: fine)").matches) return;

      const wrap = wrapRef.current!;
      const moveX = gsap.quickTo(wrap, "x", { duration: 0.6, ease: "power3" });
      const moveY = gsap.quickTo(wrap, "y", { duration: 0.6, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        // clamp displacement to 10px so it reads as "response", not drag
        const max = 10;
        const dist = Math.hypot(dx, dy) || 1;
        const scale = Math.min(1, max / dist) * 0.15;
        moveX(dx * scale);
        moveY(dy * scale);
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: wrapRef }
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        width: "clamp(120px, 18vw, 220px)",
        height: "clamp(120px, 18vw, 220px)",
        borderRadius: "50%",
        border: "1px solid var(--color-line-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "68%",
          height: "68%",
          borderRadius: "50%",
          border: "1px solid rgba(255,77,0,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={coreRef}
          style={{
            width: "42%",
            height: "42%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, var(--color-signal-soft), var(--color-signal) 60%, #7a1f00 100%)",
          }}
        />
      </div>
    </div>
  );
}
