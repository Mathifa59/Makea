"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logo from "@/assets/logo.png";
import { navItems, whatsappLink, instagramLink, site, type SectionId } from "@/config/site";
import { EASE } from "./motion-primitives";
import { InstagramIcon, WhatsappIcon } from "./decor";

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("inicio");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wa = whatsappLink();
  const ig = instagramLink();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 480 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  // Menú móvil: bloquear scroll, cerrar con Escape y devolver el foco.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? "-160%" : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: hidden ? 0 : 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Principal"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pl-4 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-[var(--ease-editorial)] sm:pl-6 ${
            scrolled || open
              ? "bg-crema/80 shadow-[0_12px_40px_-20px_rgba(42,26,18,0.35)] ring-1 ring-cacao/5 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <a href="#inicio" className="relative z-10 shrink-0" aria-label={`${site.name}, ir al inicio`}>
            <Image src={logo} alt="" className="h-9 w-auto sm:h-10" preload sizes="80px" />
          </a>

          <ul className="hidden items-center gap-1 rounded-full md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive ? "text-crema" : "text-cacao/75 hover:text-cacao"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-cacao"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full bg-naranja px-5 py-2.5 text-sm font-bold text-cacao transition-[background-color,color,transform] duration-300 hover:bg-cacao hover:text-crema active:scale-95 sm:inline-flex"
              >
                <WhatsappIcon className="size-4" />
                Pedir
              </a>
            ) : null}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative z-10 grid size-11 place-items-center rounded-full bg-cacao text-crema transition-transform active:scale-95 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-40 flex flex-col bg-crema px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <motion.ul
              className="flex flex-1 flex-col justify-center gap-2"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
            >
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    variants={{
                      hidden: { y: "100%" },
                      show: { y: 0, transition: { duration: 0.8, ease: EASE } },
                    }}
                    className="flex items-baseline gap-4 font-display text-[3.4rem] leading-[1.05] text-cacao"
                  >
                    <span className="font-sans text-sm font-semibold text-naranja-hondo">0{i + 1}</span>
                    <span className={active === item.id ? "italic text-naranja-hondo" : ""}>{item.label}</span>
                  </motion.a>
                </li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }}
              className="flex flex-col gap-3 border-t border-cacao/10 pt-6 text-sm"
            >
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold">
                  <WhatsappIcon className="size-5 text-naranja-hondo" /> {site.contact.phoneDisplay}
                </a>
              ) : null}
              {ig ? (
                <a href={ig} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold">
                  <InstagramIcon className="size-5 text-naranja-hondo" /> @{site.contact.instagram}
                </a>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
