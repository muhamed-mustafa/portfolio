"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

function ExposeLenis() {
  useLenis((lenis) => {
    (window as unknown as { lenis?: unknown }).lenis = lenis;
  });
  return null;
}

const FINE_POINTER = "(pointer: fine)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Smooth wheel scrolling for mouse users only; touch devices keep native scrolling. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const finePointer = useSyncExternalStore(subscribe, () => window.matchMedia(FINE_POINTER).matches, () => false);
  if (reduce || !finePointer) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <ExposeLenis />
      {children}
    </ReactLenis>
  );
}
