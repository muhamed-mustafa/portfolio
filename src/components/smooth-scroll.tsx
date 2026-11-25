"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

function ExposeLenis() {
  useLenis((lenis) => {
    (window as unknown as { lenis?: unknown }).lenis = lenis;
  });
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <ExposeLenis />
      {children}
    </ReactLenis>
  );
}
