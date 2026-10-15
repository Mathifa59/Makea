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

const INTERVAL = 5200;
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

  // Autoplay: lo marca la barra de progreso (animación CSS). Pausar la barra
  // —hover, foco o pestaña oculta— pausa también el carrusel; sin autoplay con
  // movimiento reducido.
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

      {/* Etiqueta y controles */}
      <div className="absolute bottom-5 right-5 z-10 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <div className="overflow-hidden" aria-live="polite">
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
        <div className="flex items-center gap-1.5 rounded-full bg-cacao/35 p-1.5 backdrop-blur-md">
          {slides.map((s, i) => {
            const isActive = i === index;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ver foto ${i + 1} de ${slides.length}: ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative h-2 overflow-hidden rounded-full bg-crema/45 transition-[width] duration-500 ease-[var(--ease-editorial)] ${
                  isActive ? "w-9" : "w-2 hover:bg-crema/80"
                }`}
              >
                {isActive ? (
                  <span
                    key={tick}
                    className="absolute inset-0 origin-left rounded-full bg-crema"
                    style={{
                      animation: reduce
                        ? undefined
                        : `carrusel-progreso ${INTERVAL + (tick === 0 ? 1800 : 0)}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={() => go(index + 1)}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
