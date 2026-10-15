"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import logoCrema from "@/assets/logo-crema.png";
import { productLines, type ProductLine } from "@/data/catalog";
import { instagramLink, site, whatsappLink } from "@/config/site";
import { Button } from "./button";
import { InstagramIcon, Stamp, WhatsappIcon } from "./decor";
import { EASE, MaskedImage, Reveal, RevealItem, SplitWords } from "./motion-primitives";
import { ProductCard } from "./product-card";

function LinePanel({ line }: { line: ProductLine }) {
  const wa = whatsappLink(`¡Hola MAKEA! Quiero pedir ${line.name.toLowerCase()} 🧡`);
  return (
    <motion.div
      id={`panel-${line.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${line.id}`}
      tabIndex={0}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid gap-10 outline-none lg:grid-cols-12 lg:gap-12"
    >
      {/* Presentación de la línea */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <MaskedImage
            src={line.cover.src}
            alt={line.cover.alt}
            sizes="(min-width: 1024px) 24rem, 92vw"
            className="aspect-[4/3] rounded-[2rem] sm:aspect-[16/10] lg:aspect-[3/4]"
            position="50% 60%"
            parallax={6}
          />
          <p className="mt-8 font-display text-3xl italic leading-tight text-naranja-hondo">
            {line.tagline}
          </p>
          <p className="mt-4 leading-relaxed text-cacao-2">{line.intro}</p>
          {wa ? (
            <Button
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              variant="naranja"
              className="mt-8"
              icon={<WhatsappIcon className="size-4" />}
            >
              Pedir {line.name.toLowerCase()}
            </Button>
          ) : null}
        </div>
      </div>

      {/* Categorías */}
      <Reveal className="grid gap-5 sm:grid-cols-2 lg:col-span-8" stagger={0.09} amount={0.05}>
        {line.categories.map((c, i) => (
          <RevealItem key={c.id} className={i % 2 === 1 ? "sm:translate-y-12" : undefined}>
            <ProductCard category={c} lineName={line.name} index={i} />
          </RevealItem>
        ))}
      </Reveal>
    </motion.div>
  );
}

export function Catalog() {
  const [activeId, setActiveId] = useState<ProductLine["id"]>(productLines[0].id);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const active = productLines.find((l) => l.id === activeId)!;
  const wa = whatsappLink();
  const ig = instagramLink();

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = productLines.findIndex((l) => l.id === activeId);
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + productLines.length) % productLines.length;
    setActiveId(productLines[next].id);
    tabsRef.current[next]?.focus();
  };

  return (
    <section id="catalogo" aria-labelledby="catalogo-title" className="relative bg-crema pb-10 pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Encabezado */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <RevealItem className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-cacao-2">
                <span className="h-px w-10 bg-naranja" aria-hidden />
                Catálogo
              </RevealItem>
            </Reveal>
            <h2
              id="catalogo-title"
              className="font-display text-[clamp(2.8rem,7vw,5.4rem)] font-medium leading-[0.95] text-cacao"
            >
              <SplitWords
                segments={[
                  { text: "Dos maneras de" },
                  { text: "endulzar tu día.", className: "italic font-soft text-naranja-hondo" },
                ]}
              />
            </h2>
          </div>
          <Reveal className="lg:col-span-5 lg:pb-3">
            <RevealItem>
              <p className="max-w-md leading-relaxed text-cacao-2">
                Elige tu línea favorita y descubre todos los sabores. Cuando tengas tu antojo claro, pídelo
                directamente por WhatsApp.
              </p>
            </RevealItem>
            <RevealItem>
              <div
                role="tablist"
                aria-label="Líneas de productos"
                onKeyDown={onKeyDown}
                className="mt-6 inline-flex rounded-full bg-crema-2 p-1.5 ring-1 ring-cacao/5"
              >
                {productLines.map((l, i) => {
                  const selected = l.id === activeId;
                  return (
                    <button
                      key={l.id}
                      ref={(el) => {
                        tabsRef.current[i] = el;
                      }}
                      id={`tab-${l.id}`}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      aria-controls={`panel-${l.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveId(l.id)}
                      className={`relative rounded-full px-6 py-3 text-sm font-bold transition-colors duration-300 sm:px-8 ${
                        selected ? "text-crema" : "text-cacao-2 hover:text-cacao"
                      }`}
                    >
                      {selected ? (
                        <motion.span
                          layoutId="catalog-tab"
                          className="absolute inset-0 rounded-full bg-cacao"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      ) : null}
                      <span className="relative">{l.name}</span>
                    </button>
                  );
                })}
              </div>
            </RevealItem>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-20">
          <AnimatePresence mode="wait">
            <LinePanel key={active.id} line={active} />
          </AnimatePresence>
        </div>

        {/* Cierre con llamada a la acción */}
        <Reveal className="mt-28 sm:mt-40">
          <RevealItem className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-cacao px-6 py-14 text-crema sm:px-12 sm:py-20 lg:px-20">
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-naranja/25 blur-[90px]" />
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Image src={logoCrema} alt="" className="h-12 w-auto opacity-90" sizes="120px" />
                <p className="mt-8 font-display text-[clamp(2.4rem,5.5vw,4.4rem)] font-medium leading-[1] tracking-tight">
                  ¿Se te antojó algo? <span className="italic font-soft text-naranja">Escríbenos.</span>
                </p>
                <p className="mt-5 max-w-lg text-crema/75">
                  Cuéntanos qué sabores te provocan y coordinamos tu pedido.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  {wa ? (
                    <Button
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="luz"
                      icon={<WhatsappIcon className="size-4" />}
                    >
                      WhatsApp · {site.contact.phoneDisplay}
                    </Button>
                  ) : null}
                  {ig ? (
                    <a
                      href={ig}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-crema/25 px-6 py-3.5 text-[0.95rem] font-semibold transition-colors duration-500 hover:border-crema hover:bg-crema hover:text-cacao sm:px-7"
                    >
                      <InstagramIcon className="size-4" />@{site.contact.instagram}
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="hidden justify-end lg:col-span-4 lg:flex">
                <Stamp id="stamp-cta" className="size-56 text-naranja" />
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
