"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import type { Application } from "@splinetool/runtime";
import SplineScene from "@/components/SplineScene";
import SplineErrorBoundary from "@/components/SplineErrorBoundary";
import SignalCore from "@/components/SignalCore";
import { prefersReducedMotion } from "@/lib/motion";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const splineWrapRef = useRef<HTMLDivElement | null>(null);
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    // Motion-safe only: the Spline scene runs on every viewport size, but
    // still steps aside for prefers-reduced-motion — SignalCore (our own
    // asset) covers that path instead.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowSpline(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!headlineRef.current) return;

      if (prefersReducedMotion()) {
        gsap.set(headlineRef.current, { autoAlpha: 1 });
        return;
      }

      const split = new SplitType(headlineRef.current, { types: "lines" });
      gsap.set(headlineRef.current, { autoAlpha: 1 });
      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out",
      });

      return () => split.revert();
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      if (!showSpline || !splineWrapRef.current) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(splineWrapRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(splineWrapRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 24;
        const y = (e.clientY / window.innerHeight - 0.5) * 14;
        xTo(x);
        yTo(y);
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { dependencies: [showSpline], scope: rootRef }
  );

  const handleSplineLoad = (_app: Application) => {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  };

  return (
    <section
      ref={rootRef}
      aria-label="Hero"
      className="hero-grid"
      style={{
        background: "var(--color-void)",
        color: "var(--color-paper)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="hero-text"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "96px 24px 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div />

        <div>
          <h1
            ref={headlineRef}
            className="hero-headline"
            style={{
              visibility: "hidden",
              fontSize: "var(--text-display-l)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 0.98,
            }}
          >
            Creative full-stack developer building digital products{" "}
            <em
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--color-signal-soft)",
              }}
            >
              with pulse
            </em>
            .
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div className="mono-label" style={{ color: "var(--color-steel)" }}>
              Córdoba, Argentina
              <br />
              <span style={{ color: "var(--color-signal)" }}>●</span> Available
              for work
            </div>

            <a
              href="#work"
              className="mono-label"
              style={{
                borderBottom: "1px solid var(--color-paper)",
                paddingBottom: 4,
              }}
            >
              View Work ↓
            </a>
          </div>
        </div>
      </div>

      <div className="hero-right">
        {showSpline ? (
          <SplineErrorBoundary
            fallback={
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SignalCore />
              </div>
            }
          >
            {/* inset is larger than the container (overscan) so the parallax
                translate never uncovers an edge of .hero-right */}
            <div ref={splineWrapRef} style={{ position: "absolute", inset: -32 }}>
              <SplineScene onLoad={handleSplineLoad} />
            </div>
          </SplineErrorBoundary>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SignalCore />
          </div>
        )}
      </div>
    </section>
  );
}
