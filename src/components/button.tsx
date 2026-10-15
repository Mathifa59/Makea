import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline" | "naranja" | "luz";

const base =
  "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-[color,border-color,transform,box-shadow] duration-500 ease-[var(--ease-editorial)] active:scale-[0.97] sm:px-7";

const variants: Record<Variant, { root: string; fill: string }> = {
  solid: {
    root: "bg-cacao text-crema hover:text-cacao shadow-[0_10px_30px_-12px_rgba(42,26,18,0.55)]",
    fill: "bg-naranja",
  },
  naranja: {
    root: "bg-naranja text-cacao hover:text-crema shadow-[0_10px_30px_-12px_rgba(217,106,0,0.7)]",
    fill: "bg-cacao",
  },
  /** Para fondos oscuros: naranja que se rellena de crema. */
  luz: {
    root: "bg-naranja text-cacao shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]",
    fill: "bg-crema",
  },
  outline: {
    root: "border border-cacao/25 text-cacao hover:text-crema hover:border-cacao",
    fill: "bg-cacao",
  },
};

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
};

/** Enlace con forma de botón: relleno que sube desde abajo e icono que se desliza. */
export function Button({ variant = "solid", icon, children, className = "", ...rest }: ButtonProps) {
  const v = variants[variant];
  return (
    <a className={`${base} ${v.root} ${className}`} {...rest}>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-y-0 group-focus-visible:translate-y-0 ${v.fill}`}
      />
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden
          className="relative grid size-5 place-items-center overflow-hidden"
        >
          <span className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-[150%]">
            {icon}
          </span>
          <span className="absolute -translate-x-[150%] transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-0">
            {icon}
          </span>
        </span>
      ) : null}
    </a>
  );
}
