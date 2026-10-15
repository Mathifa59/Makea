import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { Category } from "@/data/catalog";
import { whatsappLink } from "@/config/site";
import { Drop } from "./decor";

type Props = { category: Category; lineName: string; index: number };

const cardBase =
  "group relative isolate flex flex-col rounded-[2rem] transition-[transform,box-shadow] duration-700 ease-[var(--ease-editorial)] hover:-translate-y-1.5 hover:shadow-[0_40px_60px_-36px_rgba(42,26,18,0.6)] focus-within:-translate-y-1.5 focus-within:ring-2 focus-within:ring-naranja-hondo focus-within:ring-offset-4 focus-within:ring-offset-crema";

function OrderLink({ category, lineName, dark }: Props & { dark: boolean }) {
  const href = whatsappLink(`¡Hola MAKEA! Quiero pedir ${lineName.toLowerCase()} ${category.name.toLowerCase()} 🧡`);
  const icon = (
    <span
      aria-hidden
      className={`grid size-11 place-items-center rounded-full transition-[transform,background-color,color] duration-500 ease-[var(--ease-editorial)] group-hover:rotate-45 ${
        dark
          ? "bg-crema/15 text-crema backdrop-blur-md group-hover:bg-naranja group-hover:text-cacao"
          : "bg-cacao text-crema group-hover:bg-naranja group-hover:text-cacao"
      }`}
    >
      <ArrowUpRight className="size-5" />
    </span>
  );
  if (!href) return icon;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Pedir ${lineName} ${category.name} por WhatsApp`}
      className="outline-none after:absolute after:inset-0 after:z-10 after:content-['']"
    >
      {icon}
    </a>
  );
}

function FlavorList({ flavors, dark }: { flavors: string[]; dark: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Sabores">
      {flavors.map((f) => (
        <li
          key={f}
          className={`rounded-full px-3 py-1 text-[0.8rem] font-semibold ${
            dark ? "bg-crema/15 text-crema backdrop-blur-md" : "bg-crema text-cacao ring-1 ring-cacao/10"
          }`}
        >
          {f}
        </li>
      ))}
    </ul>
  );
}

export function ProductCard(props: Props) {
  const { category, lineName, index } = props;
  const num = String(index + 1).padStart(2, "0");

  if (category.image) {
    return (
      <article className={`${cardBase} aspect-[4/5] bg-cacao text-crema`}>
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
          placeholder="blur"
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.07]"
          style={{ objectPosition: category.image.position }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,18,12,0.92)_0%,rgba(30,18,12,0.55)_38%,rgba(30,18,12,0)_65%)] transition-opacity duration-700 group-hover:opacity-95"
        />
        </div>
        <div className="flex items-start justify-between p-5 sm:p-6">
          <span className="rounded-full bg-crema/15 px-3 py-1 text-xs font-bold tracking-[0.2em] backdrop-blur-md">
            {num}
          </span>
          <OrderLink {...props} dark />
        </div>
        <div className="mt-auto p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-naranja-suave">{lineName}</p>
          <h3 className="mt-1 font-display text-4xl font-medium italic leading-none">¡{category.name}!</h3>
          <div className="mt-4 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:-translate-y-1">
            <FlavorList flavors={category.flavors} dark />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`${cardBase} min-h-[21rem] bg-crema-2 text-cacao ring-1 ring-inset ring-cacao/5 sm:aspect-[4/5] sm:min-h-auto`}>
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
      <Drop
        className="absolute -right-12 top-14 w-36 rotate-[200deg] text-naranja-suave/60 transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:rotate-[188deg] group-hover:scale-110"
      />
      </div>
      <div className="flex items-start justify-between p-5 sm:p-6">
        <span className="rounded-full bg-crema px-3 py-1 text-xs font-bold tracking-[0.2em] ring-1 ring-cacao/10">
          {num}
        </span>
        <OrderLink {...props} dark={false} />
      </div>
      <div className="px-5 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-naranja-hondo">{lineName}</p>
        <h3 className="mt-1 font-display text-4xl font-medium italic leading-none">¡{category.name}!</h3>
      </div>
      {/* Carta tipográfica de sabores */}
      <div className="mt-auto p-5 pt-6 sm:p-6">
        <ul aria-label="Sabores" className="border-t border-cacao/10">
          {category.flavors.map((f, i) => (
            <li
              key={f}
              className="flex items-baseline justify-between gap-4 border-b border-cacao/10 py-1.5 font-display text-xl leading-snug transition-[padding] duration-500 ease-[var(--ease-editorial)] group-hover:pl-1.5"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {f}
              <Drop className="w-2 shrink-0 rotate-180 text-naranja" />
            </li>
          ))}
        </ul>
        {category.note ? <p className="mt-3 text-sm text-cacao-2">{category.note}</p> : null}
      </div>
    </article>
  );
}
