"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";

import torreImg from "@/assets/chocotejas-torre.jpg";
import { whatsappLink } from "@/config/site";
import { Button } from "./button";
import { Blob, Drop, Stamp, WhatsappIcon } from "./decor";
import { HeroCarousel } from "./hero-carousel";
import { EASE, MaskedImage, SplitWords } from "./motion-primitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 25]);
  const wa = whatsappLink();

  // La misma estructura en servidor y cliente; MotionConfig vuelve instantáneos
  // los desplazamientos cuando el usuario prefiere menos movimiento.
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.3 : 0.9, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24 lg:pt-28"
    >
      {/* Halo cálido de fondo */}
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 -z-10 size-[36rem] rounded-full bg-naranja-suave/40 blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Texto */}
        <motion.div style={{ y: textY }} className="relative z-10 lg:col-span-6 lg:pr-4">
          <motion.p
            {...fade(0.15)}
            className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-cacao-2"
          >
            <span className="h-px w-10 bg-naranja" aria-hidden />
            Chocotejas &amp; cuchareables
          </motion.p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(3.4rem,11vw,7.6rem)] font-medium leading-[0.92] text-cacao"
          >
            <SplitWords
              inView={false}
              delay={0.3}
              segments={[
                { text: "Destapa la" },
                { text: "felicidad", className: "italic font-soft text-naranja-hondo" },
              ]}
            />
            <span className="sr-only">.</span>
          </h1>
          <motion.div
            aria-hidden
            className="-mt-1 ml-[1.2em] w-[min(22rem,62%)] text-naranja sm:ml-[1.6em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.3 }}
          >
            <motion.svg viewBox="0 0 220 40" fill="none" className="w-full">
              <motion.path
                d="M6 8c40 26 120 34 208-2"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.1, duration: 1.1, ease: EASE }}
              />
            </motion.svg>
          </motion.div>

          <motion.p
            {...fade(0.9)}
            className="mt-6 max-w-md text-lg leading-relaxed text-cacao-2 sm:text-xl"
          >
            Chocotejas y postres cuchareables cremosos, irresistibles y hechos para disfrutar.
            Porque en MAKEA, <em className="font-display not-italic font-semibold text-cacao">tu paladar es la prioridad</em>.
          </motion.p>

          <motion.div {...fade(1.05)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#catalogo" icon={<ArrowRight className="size-4" />}>
              Descubrir el catálogo
            </Button>
            {wa ? (
              <Button
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                icon={<WhatsappIcon className="size-4" />}
              >
                Pedir por WhatsApp
              </Button>
            ) : null}
          </motion.div>

          <motion.a
            {...fade(1.3)}
            href="#nosotros"
            className="group mt-14 hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-cacao-2 lg:inline-flex"
          >
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-cacao/20">
              <ArrowDown className="size-4 motion-safe:animate-[flotar_2.4s_ease-in-out_infinite]" />
            </span>
            Conócenos
          </motion.a>
        </motion.div>

        {/* Composición visual */}
        <motion.div style={{ y: visualY }} className="relative lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[30rem] lg:ml-auto lg:mr-4">
            <motion.div
              aria-hidden
              style={{ rotate: blobRotate }}
              className="absolute -right-[18%] -top-[10%] -z-10 w-[105%] text-naranja"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
            >
              <Blob className="aspect-square w-full" />
            </motion.div>

            <HeroCarousel
              className="aspect-[4/5] rounded-t-[999px] rounded-b-[2.5rem] shadow-[0_40px_80px_-40px_rgba(42,26,18,0.55)] ring-8 ring-crema"
              delay={0.35}
            />

            {/* Fotografía secundaria circular */}
            <motion.div
              className="absolute -bottom-10 -left-4 w-[42%] sm:-left-12 lg:-left-20"
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 1 }}
            >
              <MaskedImage
                src={torreImg}
                alt="Torre de chocotejas MAKEA"
                sizes="(min-width: 1024px) 13rem, 40vw"
                className="aspect-square rounded-full ring-8 ring-crema shadow-[0_24px_50px_-24px_rgba(42,26,18,0.6)]"
                position="50% 42%"
                parallax={0}
                onMount
                from="top"
                delay={1}
              />
            </motion.div>

            {/* Sello giratorio */}
            <motion.div
              className="absolute -right-2 top-[6%] w-[30%] text-cacao sm:-right-8"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 1.3 }}
            >
              <div className="rounded-full bg-crema p-[6%] shadow-[0_18px_40px_-20px_rgba(42,26,18,0.45)]">
                <Stamp className="aspect-square w-full text-cacao" />
              </div>
            </motion.div>

            {/* Gotas del logo */}
            <Drop
              className="absolute -left-6 top-[18%] w-4 text-naranja motion-safe:animate-flotar"
              style={{ "--r": "-20deg" } as React.CSSProperties}
            />
            <Drop
              className="absolute bottom-[22%] -right-5 w-6 text-naranja-hondo/80 motion-safe:animate-flotar [animation-delay:-3s]"
              style={{ "--r": "25deg" } as React.CSSProperties}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
