"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ExperienceEntry as ExperienceEntryData } from "@/lib/experience";
import ExperienceEntry from "@/components/sections/ExperienceEntry";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signal track: one Track-derived node (gsap.quickTo, same mechanism as the
 * magnetic cursor/CTA) travels between career-stage markers as each entry
 * crosses the viewport center, with a single short Pulse on arrival.
 * Reduced motion: the node parks at the first (active) entry, no scrub.
 */
export default function ExperienceTrack({ entries }: { entries: ExperienceEntryData[] }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      if (!wrapRef.current || !dotRef.current) return;

      const markerY = (i: number) => {
        const marker = markerRefs.current[i];
        if (!marker || !wrapRef.current) return 0;
        return marker.getBoundingClientRect().top - wrapRef.current.getBoundingClientRect().top;
      };

      if (prefersReducedMotion()) {
        gsap.set(dotRef.current, { opacity: 1, y: markerY(0) });
        return;
      }

      gsap.set(dotRef.current, { opacity: 1 });
      const moveY = gsap.quickTo(dotRef.current, "y", { duration: 0.45, ease: "power3" });

      const setActive = (index: number) => {
        rowRefs.current.forEach((row, i) => {
          if (!row) return;
          row.dataset.state = i === index ? "active" : i < index ? "past" : "future";
          if (i === index) row.setAttribute("aria-current", "step");
          else row.removeAttribute("aria-current");
        });
        moveY(markerY(index));
        gsap.fromTo(
          dotRef.current,
          { scale: 1 },
          { scale: 1.15, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
        );
      };

      setActive(0);

      const triggers = rowRefs.current.map((row, i) => {
        if (!row) return null;
        return ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });

      return () => {
        triggers.forEach((t) => t?.kill());
      };
    },
    { scope: wrapRef, dependencies: [entries.length] }
  );

  return (
    <div ref={wrapRef} className="experience-track">
      <span className="experience-line" aria-hidden="true" />
      <span ref={dotRef} className="experience-dot" aria-hidden="true" />
      <ol aria-label="Trayectoria profesional" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {entries.map((entry, i) => (
          <ExperienceEntry
            key={entry.index}
            entry={entry}
            initialState={i === 0 ? "active" : "future"}
            rowRef={(el) => {
              rowRefs.current[i] = el;
            }}
            markerRef={(el) => {
              markerRefs.current[i] = el;
            }}
          />
        ))}
      </ol>
    </div>
  );
}
