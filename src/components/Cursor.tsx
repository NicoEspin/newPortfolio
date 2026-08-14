"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Decide eligibility first. This only flips `active`, which controls
  // whether the dot element renders at all.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setActive(true);
    document.body.classList.add("has-custom-cursor");
    return () => document.body.classList.remove("has-custom-cursor");
  }, []);

  // Wire up tracking only once `active` is true and React has actually
  // committed the dot to the DOM — otherwise dotRef.current is still null
  // here and gsap.quickTo binds to nothing, so the dot never moves.
  useEffect(() => {
    if (!active || !dotRef.current) return;

    const dot = dotRef.current;
    const moveX = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    const interactiveSelector = "a, button, [data-cursor-hover]";
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSelector)) {
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactiveSelector)) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: hovering ? 36 : 12,
        height: hovering ? 36 : 12,
        marginLeft: hovering ? -18 : -6,
        marginTop: hovering ? -18 : -6,
        borderRadius: "50%",
        background: hovering ? "transparent" : "var(--color-signal)",
        border: hovering ? "1px solid var(--color-signal)" : "none",
        pointerEvents: "none",
        zIndex: 200,
        transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease",
      }}
    />
  );
}
