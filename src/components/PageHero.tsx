import { Container, Eyebrow } from "./ui";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-20 pt-36 sm:pb-24 sm:pt-44">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_20%_0%,#000_30%,transparent_100%)]" />
      <div className="absolute -left-40 -top-60 h-[520px] w-[820px] rounded-full bg-[radial-gradient(closest-side,rgb(47_82_245/0.10),transparent)] blur-2xl" />
      <Container className="relative">
        <div className="fade-up">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <div className="fade-up" style={{ animationDelay: "80ms" }}>
          <h1 className="text-gradient mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            {title}
          </h1>
        </div>
        {subtitle && (
          <div className="fade-up" style={{ animationDelay: "160ms" }}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl">{subtitle}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
