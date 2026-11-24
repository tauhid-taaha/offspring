"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * After moving to another page with a #section in the link (e.g. Contact → /en#quote),
 * scroll that section into view. Same-page #links already work natively.
 */
export function HashScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    // Wait one frame so the new page is laid out first.
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
