"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { Fragment, useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Reveal: aparición con opacity + translate, con stagger para sus hijos      */
/* -------------------------------------------------------------------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

type RevealProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delay?: number;
  amount?: number;
};

/** Contenedor que revela a sus hijos `RevealItem` en cascada al entrar en pantalla. */
export function Reveal({ stagger = 0.1, delay = 0, amount = 0.25, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ variants = fadeUp, ...rest }: HTMLMotionProps<"div">) {
  return <motion.div variants={variants} {...rest} />;
}

/* -------------------------------------------------------------------------- */
/*  SplitWords: titular que se revela palabra a palabra desde una máscara      */
/* -------------------------------------------------------------------------- */

type Segment = { text: string; className?: string };

export function SplitWords({
  segments,
  delay = 0,
  stagger = 0.07,
  inView = true,
}: {
  segments: Segment[];
  delay?: number;
  stagger?: number;
  /** true: se anima al entrar en pantalla; false: al montar (hero). */
  inView?: boolean;
}) {
  const words = segments.flatMap((s) =>
    s.text.split(" ").filter(Boolean).map((w) => ({ w, className: s.className })),
  );
  const trigger = inView
    ? { whileInView: "show" as const, viewport: { once: true, amount: 0.6 } }
    : { animate: "show" as const };

  return (
    <motion.span
      className="inline"
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map(({ w, className }, i) => (
        <Fragment key={i}>
        <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${className ?? ""}`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE } },
            }}
          >
            {w}
          </motion.span>
        </span>
        {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*  MaskedImage: revelado por clip-path + parallax sutil en scroll             */
/* -------------------------------------------------------------------------- */

type MaskedImageProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  position?: string;
  /** Desplazamiento máximo del parallax en % (0 lo desactiva). */
  parallax?: number;
  /** Dirección desde la que se revela la imagen. */
  from?: "bottom" | "top" | "left" | "right";
  delay?: number;
  preload?: boolean;
  /** Animar al montar (hero) en vez de al entrar en pantalla. */
  onMount?: boolean;
  children?: ReactNode;
};

const clipFrom = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

export function MaskedImage({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  position = "50% 50%",
  parallax = 8,
  from = "bottom",
  delay = 0,
  preload,
  onMount,
  children,
}: MaskedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const active = !reduce;
  const instant = { duration: 0 };

  const reveal = {
    hidden: { clipPath: clipFrom[from] },
    show: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: active ? { duration: 1.4, ease: EASE, delay } : instant,
    },
  };
  const zoom = {
    hidden: { scale: 1.25 },
    show: { scale: 1, transition: active ? { duration: 1.8, ease: EASE, delay } : instant },
  };
  // El IntersectionObserver se ata al contenedor sin clip-path: un elemento
  // recortado al 100% nunca se considera visible.
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const animate = onMount || inView ? "show" : "hidden";

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate={animate}
        variants={reveal}
      >
        <motion.div
          className="absolute inset-x-0"
          style={{
            top: `-${parallax}%`,
            bottom: `-${parallax}%`,
            y: active && parallax ? y : 0,
          }}
        >
          <motion.div className="absolute inset-0" variants={zoom}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              placeholder="blur"
              preload={preload}
              className={`object-cover ${imgClassName}`}
              style={{ objectPosition: position }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      {children}
    </div>
  );
}
