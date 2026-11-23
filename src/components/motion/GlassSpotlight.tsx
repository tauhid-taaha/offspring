"use client";

import { useEffect } from "react";

/**
 * One page-wide listener that tells the hovered `.glass-card` where the cursor is,
 * so its spotlight can follow (CSS vars --mx / --my). Skipped on touch screens.
 */
export function GlassSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    function onMove(e: PointerEvent) {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".glass-card");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
