"use client";

import { Component, type ReactNode } from "react";

/**
 * The Spline runtime can throw outside Suspense's happy path (e.g. a
 * corrupted or unreachable .splinecode fetch). Without this boundary that
 * error bubbles up and takes the whole page down instead of just the hero
 * visual, so it always falls back to a self-built asset (SignalCore).
 */
export default class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Spline scene failed to load, falling back:", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
