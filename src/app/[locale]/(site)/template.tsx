import type { ReactNode } from "react";

/**
 * Re-mounts on every navigation, so the CSS fade replays per page.
 * Pure CSS: the page is visible as soon as the HTML paints, before any JavaScript.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
