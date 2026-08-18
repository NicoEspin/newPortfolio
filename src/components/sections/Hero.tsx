"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Application } from "@splinetool/runtime";
import SplineScene from "@/components/SplineScene";
import SplineErrorBoundary from "@/components/SplineErrorBoundary";
import SignalCore from "@/components/SignalCore";
import { prefersReducedMotion } from "@/lib/motion";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const splineWrapRef = useRef<HTMLDivElement | null>(null);
  const [showSpline, setShowSpline] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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

  useEffect(() => {
    // Below 900px (same breakpoint as .hero-grid) the robot renders as a
    // static image instead of the Spline scene — avoids loading the 3D
    // runtime on mobile entirely, not just hiding it visually.
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!introRef.current) return;

      const nameLines = introRef.current.querySelectorAll(
        "[data-hero-name-line]",
      );
      const role = introRef.current.querySelector("[data-hero-role]");
      const positioning = introRef.current.querySelector(
        "[data-hero-positioning]",
      );
      const footerItems = introRef.current.querySelectorAll(
        "[data-hero-footer-item]",
      );
      const animatedItems = [
        ...Array.from(nameLines),
        ...(role ? [role] : []),
        ...(positioning ? [positioning] : []),
        ...Array.from(footerItems),
      ];

      if (!animatedItems.length) return;

      if (prefersReducedMotion()) {
        gsap.set(animatedItems, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(animatedItems, { autoAlpha: 1 });

      timeline.from(nameLines, {
        yPercent: 112,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        delay: 0.22,
      });

      timeline.from(
        [role, positioning],
        {
          y: 22,
          opacity: 0,
          duration: 0.48,
          stagger: 0.08,
        },
        "<0.1",
      );

      timeline.from(
        footerItems,
        {
          y: 18,
          opacity: 0,
          duration: 0.42,
          stagger: 0.08,
        },
        "<0.14",
      );

      return () => {
        timeline.kill();
      };
    },
    { scope: rootRef },
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
    { dependencies: [showSpline], scope: rootRef },
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
      <div className="hero-text">
        <div />

        <div ref={introRef} className="hero-copy">
          <h1
            className="hero-headline"
            aria-label="Nicolás Espin"
            style={{
              fontSize: "var(--text-display-l)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 0.82,
            }}
          >
            <span className="hero-name-line">
              <span className="hero-name-lineInner" data-hero-name-line>
                NICOLAS
              </span>
            </span>
            <span className="hero-name-line">
              <span className="hero-name-lineInner" data-hero-name-line>
                ESPIN<span style={{ color: "var(--color-signal)" }}>.</span>
              </span>
            </span>
          </h1>

          <p className="hero-role mono-label" data-hero-role>
            FULL-STACK DEVELOPER
          </p>

          <p className="hero-positioning reading-measure" data-hero-positioning>
            Diseño y desarrollo productos digitales desde la interfaz hasta la
            infraestructura{" "}
            <em
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--color-signal-soft)",
              }}
            >
              con criterio
            </em>
            .
          </p>

          <div className="hero-meta">
            <div
              className="hero-status mono-label"
              data-hero-footer-item
              style={{ color: "var(--color-steel)" }}
            >
              <span>CÓRDOBA, ARGENTINA</span>
              <span>
                <span style={{ color: "var(--color-signal)" }}>●</span>{" "}
                AVAILABLE FOR WORK
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-right">
        {!isDesktop ? (
          showSpline ? (
            <video
              src="/robot.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              style={{
                // The source footage is a 1920x1080 recording where the robot
                // only occupies a light card roughly at [600,236]-[1316,1008]
                // px, surrounded by black. object-fit:cover crops the full
                // 16:9 frame, not that card, so the black stays visible — this
                // instead scales/positions the video so just the card fills
                // .hero-right, anchored to its bottom edge (robot's feet sit
                // right at the card's bottom edge, so all the slack from the
                // aspect-ratio mismatch is trimmed off the card's top instead).
                position: "absolute",
                width: "268.16vw",
                height: "150.84vw",
                left: "-83.8vw",
                top: "calc(46vh - 140.78vw)",
                maxWidth: "none",
              }}
            />
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
          )
        ) : showSpline ? (
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
            {/* Overscan (inset: -32 on pointer:fine only, via .hero-spline-overscan)
                covers the parallax translate range so it never uncovers an edge
                of .hero-right. Parallax only runs on pointer:fine (see the
                useGSAP above), so touch viewports stay inset:0 — a wider box
                here would widen the mobile layout viewport past device-width
                and push the fixed navbar off-screen. */}
            <div ref={splineWrapRef} className="hero-spline-overscan">
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
