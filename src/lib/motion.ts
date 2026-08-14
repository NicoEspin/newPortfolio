export const EASE_SIGNAL = "cubic-bezier(0.16, 1, 0.3, 1)";

export const DURATION = {
  pulse: 1.4,
  track: 0.5,
  revealShort: 0.7,
  revealLong: 1.1,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Session flag so the loader (Pulse) only plays once per browser session. */
export function hasSeenLoader(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem("ne-loader-seen") === "1";
}

export function markLoaderSeen(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("ne-loader-seen", "1");
}
