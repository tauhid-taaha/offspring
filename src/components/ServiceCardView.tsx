import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Arrow, Icon } from "./ui";

export type ServiceCardData = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string | null;
};

/**
 * One home page card (Software, Supply or Installation).
 * With a photo: the photo sits on top. Without: a brand icon tile.
 * Also used as the live preview in the admin card editor.
 */
export function ServiceCardView({
  card,
  href,
  cta,
  className,
}: {
  card: ServiceCardData;
  href?: string;
  cta?: string;
  className?: string;
}) {
  const body = (
    <>
      {card.imageUrl ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          {card.imageUrl.startsWith("blob:") ? (
            // Local preview of a photo that hasn't been uploaded yet
            // eslint-disable-next-line @next/next/no-img-element
            <img src={card.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <Image
              src={card.imageUrl}
              alt={card.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent" />
          <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/90 text-signal shadow-[0_6px_18px_-8px_rgb(2_40_58/0.4)]">
            <Icon name={card.icon} className="h-5 w-5" />
          </span>
        </div>
      ) : null}

      <div className={clsx("flex flex-1 flex-col", card.imageUrl ? "p-6" : "p-7")}>
        {!card.imageUrl && (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(140deg,var(--color-pulse),var(--color-signal)_60%)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(0_119_95/0.8)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
            <Icon name={card.icon} className="h-6 w-6" />
          </span>
        )}
        <h3 className={clsx("line-clamp-2 text-xl font-semibold tracking-tight", card.imageUrl ? "" : "mt-7")} title={card.title}>{card.title || "Card title"}</h3>
        {/* Kept to 4 lines so every card in a row stays the same height */}
        {card.description && <p className="mt-2.5 line-clamp-4 leading-relaxed text-fg-muted">{card.description}</p>}
        {card.tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {card.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-white/70 px-2.5 py-1 text-[12px] text-fg/75 ring-1 ring-fg/[0.07]">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <span className={clsx("inline-flex items-center gap-2 text-[14px] font-semibold text-signal", card.tags.length ? "mt-6" : "mt-auto pt-6")}>
            {cta}
            <Arrow />
          </span>
        )}
      </div>
    </>
  );

  const cls = clsx(
    "glass-card group flex h-full flex-col overflow-hidden rounded-3xl transition-[transform,box-shadow] duration-500 ease-out",
    href && "hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.95),0_30px_60px_-28px_rgb(0_119_95/0.45)]",
    className,
  );

  if (!href) return <div className={cls}>{body}</div>;
  const external = href.startsWith("http");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
