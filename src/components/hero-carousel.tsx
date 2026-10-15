"use client";

import { motion, useReducedMotion, type PanInfo } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";

import pistachoImg from "@/assets/hero-pistacho.jpg";
import maracuyaImg from "@/assets/hero-maracuya.jpg";
import chocolateImg from "@/assets/chocolate-cuchara.jpg";
import filaImg from "@/assets/hero-fila.jpg";
import { EASE } from "./motion-primitives";

type Slide = { src: StaticImageData; alt: string; label: string; position: string };

const slides: Slide[] = [
  {
    src: pistachoImg,
    alt: "Tres leches de pistacho MAKEA en su envase kraft con el logo de la marca",
    label: "¡Tres leches!",
    position: "50% 62%",
  },
  {
    src: maracuyaImg,
    alt: "Cuchareable MAKEA cubierto con pulpa y semillas de maracuyá",
    label: "¡Frutales!",
    position: "50% 62%",
  },
  {
    src: chocolateImg,
    alt: "Cuchara sacando un trozo de torta de chocolate de un cuchareable MAKEA",
    label: "¡Chocolatosos!",
    position: "50% 45%",
  },
  {
    src: filaImg,
    alt: "Fila de cuchareables MAKEA de distintos sabores",
    label: "Todos los sabores",
    position: "50% 62%",
  },
];

const INTERVAL = 2500; // ms que permanece cada foto
const HIDDEN = "inset(100% 0% 0% 0%)";
const SHOWN = "inset(0% 0% 0% 0%)";

/** Carrusel de cuchareables dentro del arco del hero: barrido de abajo hacia arriba. */
export function HeroCarousel({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // reinicia el temporizador tras una acción manual

  const go = useCallback(
    (next: number) => {
      const n = (next + slides.length) % slides.length;
      if (n === index) return;
      setPrev(index);
      setIndex(n);
      setTick((t) => t + 1);
    },
    [index],
  );

  // Autoplay: se detiene con hover/foco, pestaña oculta o movimiento reducido.
  // La primera foto espera además a que termine la entrada del hero.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL + (tick === 0 ? 1800 : 0));
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, tick, go]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 40 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;
    go(index + (info.offset.x < 0 ? 1 : -1));
  };

  return (
    <motion.div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Cuchareables MAKEA"
      className={`relative isolate touch-pan-y select-none overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPanEnd={onPanEnd}
    >
      {/* Revelado de entrada de todo el arco */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: HIDDEN }}
        animate={{ clipPath: SHOWN }}
        transition={reduce ? { duration: 0 } : { duration: 1.4, ease: EASE, delay }}
      >
        {slides.map((s, i) => {
          const isActive = i === index;
          const isPrev = i === prev;
          return (
            <motion.div
              key={s.label}
              className="absolute inset-0"
              aria-hidden={!isActive}
              style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
              initial={false}
              animate={{ clipPath: isActive || isPrev ? SHOWN : HIDDEN }}
              transition={
                isActive && !reduce ? { duration: 1.25, ease: EASE } : { duration: 0, delay: isPrev ? 0 : 1.3 }
              }
            >
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ scale: isActive ? 1 : 1.12 }}
                transition={isActive && !reduce ? { duration: 1.8, ease: EASE } : { duration: 0, delay: 1.3 }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 30rem, 90vw"
                  placeholder="blur"
                  preload={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                  draggable={false}
                  className="object-cover"
                  style={{ objectPosition: s.position }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-1/3 bg-[linear-gradient(to_top,rgba(30,18,12,0.45),transparent)]"
        />
      </motion.div>

      {/* Etiqueta de la categoría */}
      <div className="absolute bottom-5 right-5 z-10 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <div className="overflow-hidden" aria-hidden>
          <motion.p
            key={slides[index].label}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-display text-xl italic text-crema drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-2xl"
          >
            {slides[index].label}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
