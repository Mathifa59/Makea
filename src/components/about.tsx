"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import compartirImg from "@/assets/compartir.jpg";
import tapaImg from "@/assets/cuchareable-tapa.jpg";
import { Drop, Smile } from "./decor";
import { MaskedImage, Reveal, RevealItem, SplitWords } from "./motion-primitives";

const statement =
  "En MAKEA preparamos chocotejas y postres cuchareables pensando en una sola cosa: tu paladar. Cuidamos cada sabor, cada textura y cada detalle para que abrir un envase sea siempre un pequeño momento de felicidad.";

const values = [
  {
    title: "Cremosos",
    text: "Texturas suaves y generosas, pensadas para disfrutarse cucharada a cucharada.",
  },
  {
    title: "Con tradición",
    text: "La chocoteja de siempre, reinterpretada en sabores que endulzan cualquier momento.",
  },
  {
    title: "Con cariño",
    text: "Cada pedido se prepara con dedicación y atención a los pequeños detalles.",
  },
];

/** Párrafo que se "enciende" palabra a palabra mientras se hace scroll. */
function ScrollLitText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal leading-[1.22] tracking-[-0.015em] text-cacao"
    >
      {words.map((w, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          static={!!reduce}
          highlight={/paladar|felicidad/.test(w)}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  static: isStatic,
  highlight,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  static: boolean;
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity: isStatic ? 1 : opacity }}
      className={highlight ? "italic font-soft text-naranja-hondo" : undefined}
    >
      {children}{" "}
    </motion.span>
  );
}

export function About() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="relative isolate bg-crema-2 py-24 sm:py-32 lg:py-40"
    >
      {/* Onda de transición desde el hero */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-px h-12 w-full text-crema sm:h-20"
      >
        <path fill="currentColor" d="M0 0h1440v26c-240 46-480 54-720 30S240 18 0 52Z" />
      </svg>

      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Collage fotográfico */}
        <div className="relative order-2 lg:order-1 lg:col-span-5">
          <div className="relative mr-[14%] lg:sticky lg:top-28">
            <MaskedImage
              src={compartirImg}
              alt="Dos manos compartiendo cuchareables MAKEA sobre un fondo claro"
              sizes="(min-width: 1024px) 28rem, 80vw"
              className="aspect-[3/4] rounded-[2.5rem]"
              position="50% 35%"
              parallax={10}
            />
            <div className="absolute -bottom-12 -right-[22%] w-[52%]">
              <MaskedImage
                src={tapaImg}
                alt="Cuchareable MAKEA cerrado con su tapa, listo para llevar"
                sizes="(min-width: 1024px) 15rem, 42vw"
                className="aspect-[4/5] rounded-[2rem] ring-8 ring-crema-2"
                position="50% 58%"
                parallax={14}
                from="left"
                delay={0.25}
              />
            </div>
            <Drop className="absolute -left-4 -top-6 w-7 text-naranja motion-safe:animate-flotar" />
          </div>
        </div>

        {/* Texto */}
        <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-10">
          <Reveal>
            <RevealItem className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-cacao-2">
              <span className="h-px w-10 bg-naranja" aria-hidden />
              Nosotros
            </RevealItem>
          </Reveal>
          <h2
            id="nosotros-title"
            className="font-display text-[clamp(2.8rem,7vw,5.4rem)] font-medium leading-[0.95] text-cacao"
          >
            <SplitWords
              segments={[
                { text: "Tu paladar," },
                { text: "la prioridad.", className: "italic font-soft text-naranja-hondo" },
              ]}
            />
          </h2>
          <Smile className="mt-1 w-40 text-naranja" />

          <div className="mt-12 max-w-2xl">
            <ScrollLitText text={statement} />
          </div>

          <Reveal className="mt-16 grid gap-10 border-t border-cacao/10 pt-10 sm:grid-cols-3 sm:gap-8" stagger={0.12}>
            {values.map((v, i) => (
              <RevealItem key={v.title}>
                <span className="font-display text-sm italic text-naranja-hondo">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-medium text-cacao">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-cacao-2">{v.text}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
