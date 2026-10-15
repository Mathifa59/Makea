import { allFlavors } from "@/data/catalog";
import { Drop } from "./decor";

/** Banda de sabores en movimiento continuo: puente visual entre Nosotros y Catálogo. */
export function FlavorMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Sabores MAKEA"}>
      {allFlavors.map((f) => (
        <li key={f} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-3xl italic text-cacao sm:text-5xl">
            {f}
          </span>
          <Drop className="w-3 rotate-180 text-crema sm:w-4" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-10 overflow-x-clip bg-[linear-gradient(var(--color-crema-2)_50%,var(--color-crema)_50%)] py-8">
      <div className="-mx-[5vw] -rotate-2 overflow-hidden bg-naranja py-5 shadow-[0_20px_50px_-30px_rgba(217,106,0,0.9)] sm:py-7">
        <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
