import Image from "next/image";
import { Icon } from "./ui";
import { LogoMark } from "./Logo";

/**
 * Split-hero visual: a large circle (photo if public/images/home/hero.* exists,
 * otherwise a branded composition) with service "bubbles" orbiting it.
 */
const bubbles = [
  { icon: "school", label: "School ERP", pos: "left-[2%] top-[14%]", delay: "0s" },
  { icon: "globe", label: "Websites", pos: "right-[0%] top-[6%]", delay: "-1.5s" },
  { icon: "phone", label: "Mobile apps", pos: "right-[-4%] top-[46%]", delay: "-3s" },
  { icon: "bolt", label: "Generators", pos: "left-[-4%] top-[52%]", delay: "-2s" },
  { icon: "sun", label: "Solar", pos: "left-[14%] bottom-[2%]", delay: "-4s" },
  { icon: "server", label: "CCTV & IT", pos: "right-[10%] bottom-[0%]", delay: "-2.5s" },
];

export function HeroVisual({ image }: { image: string | null }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]" aria-hidden="true">
      {/* Orbit rings */}
      <div className="absolute inset-[4%] rounded-full border border-dashed border-signal/25 animate-spin-slow" />
      <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-signal to-pulse p-[6px] shadow-[0_40px_80px_-30px_rgb(47_82_245/0.55)]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-canvas">
          {image ? (
            <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 420px, 80vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,#eef2ff,transparent_55%),radial-gradient(circle_at_75%_80%,#e3fbf8,transparent_55%)]">
              <div className="bg-grid absolute inset-0 [background-size:32px_32px] [mask-image:radial-gradient(circle,#000_30%,transparent_72%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-[32px] bg-canvas shadow-[0_20px_50px_-20px_rgb(10_13_20/0.35)] ring-1 ring-line">
                  <LogoMark size={64} className="text-fg" />
                </div>
                <div className="mt-6 flex gap-2">
                  {["code", "box", "bolt"].map((i) => (
                    <span key={i} className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas text-signal shadow-sm ring-1 ring-line">
                      <Icon name={i} className="h-5 w-5" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Service bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.label}
          className={`absolute ${b.pos} animate-float`}
          style={{ animationDelay: b.delay }}
        >
          <div className="flex items-center gap-2 rounded-full bg-canvas py-1.5 pl-1.5 pr-3.5 shadow-[0_12px_30px_-12px_rgb(10_13_20/0.3)] ring-1 ring-line">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal-soft text-signal">
              <Icon name={b.icon} className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap text-[13px] font-medium text-fg">{b.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
