"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

type SignalNavContextValue = {
  navigate: (href: string, origin: { x: number; y: number }) => void;
};

const SignalNavContext = createContext<SignalNavContextValue | null>(null);

export function useSignalNav() {
  const ctx = useContext(SignalNavContext);
  if (!ctx) throw new Error("useSignalNav must be used within PageTransition");
  return ctx;
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pendingHref = useRef<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navigate = useCallback(
    (href: string, origin: { x: number; y: number }) => {
      if (prefersReducedMotion() || !overlayRef.current) {
        router.push(href);
        return;
      }

      const el = overlayRef.current;
      const vmax = Math.hypot(window.innerWidth, window.innerHeight) * 2.2;

      gsap.set(el, {
        left: origin.x,
        top: origin.y,
        width: 24,
        height: 24,
        marginLeft: -12,
        marginTop: -12,
        scale: 0,
        opacity: 1,
        pointerEvents: "auto",
      });

      pendingHref.current = href;

      const go = () => {
        if (pendingHref.current) {
          const target = pendingHref.current;
          pendingHref.current = null;
          router.push(target);
        }
      };

      // Safety net: if the tab is backgrounded/throttled and rAF stalls,
      // still navigate instead of leaving the user stuck on the overlay.
      const safety = window.setTimeout(go, 900);

      gsap.to(el, {
        scale: vmax / 24,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          window.clearTimeout(safety);
          go();
        },
      });
    },
    [router]
  );

  // Once the new route has mounted, shrink the dot back away.
  useEffect(() => {
    if (!overlayRef.current) return;
    const el = overlayRef.current;
    if (gsap.getProperty(el, "opacity") === 0) return;
    gsap.to(el, {
      opacity: 0,
      duration: 0.4,
      delay: 0.15,
      ease: "power2.out",
      onComplete: () => gsap.set(el, { pointerEvents: "none", scale: 0 }),
    });
  }, [pathname]);

  return (
    <SignalNavContext.Provider value={{ navigate }}>
      {children}
      {mounted && (
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            borderRadius: "50%",
            background: "var(--color-signal)",
            zIndex: 250,
            opacity: 0,
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        />
      )}
    </SignalNavContext.Provider>
  );
}
