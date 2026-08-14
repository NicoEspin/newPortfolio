"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal behavior: clip-path mask reveal on scroll-into-view.
 * Falls back to a short fade for prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      if (prefersReducedMotion()) {
        gsap.set(ref.current, { autoAlpha: 1 });
        return;
      }

      gsap.set(ref.current, { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 });
      gsap.to(ref.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </Comp>
  );
}
