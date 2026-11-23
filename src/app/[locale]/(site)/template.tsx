"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

/** Re-mounts on every navigation, giving each page a short fade-in. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      {children}
    </m.div>
  );
}
