import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome locale="en">
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-16 text-center">
      <p className="font-mono text-sm text-fg-subtle">404</p>
      <h1 className="text-gradient mt-4 text-4xl font-semibold tracking-tight">Page not found</h1>
      <Link href="/" className="mt-8 rounded-full border border-line-strong px-5 py-2.5 text-[14px] hover:bg-fg/5">
        Back to home
      </Link>
    </section>
    </SiteChrome>
  );
}
