import { Heart } from "lucide-react";
import type { SVGProps } from "react";

/** Gota inspirada en las salpicaduras del logo de MAKEA. */
export function Drop({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 60" aria-hidden className={className} style={style}>
      <path
        d="M20 2C30 2 37 10 37 22c0 13-9 27-17 36C12 49 3 35 3 22 3 10 10 2 20 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Sonrisa del logo, usada como subrayado orgánico. */
export function Smile({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 40" aria-hidden className={className} fill="none">
      <path
        d="M6 8c40 26 120 34 208-2"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Sello circular giratorio, tomado del distintivo "Destapa la felicidad" de los menús. */
export function Stamp({ className = "", id = "stamp" }: { className?: string; id?: string }) {
  const text = "Destapa la felicidad · Tu paladar, la prioridad · ";
  return (
    <div className={`relative grid place-items-center ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full motion-safe:animate-girar">
        <defs>
          <path id={`${id}-circle`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-sans text-[13px] font-bold uppercase">
          <textPath href={`#${id}-circle`} textLength={486} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Heart className="size-[26%] fill-current" strokeWidth={0} />
    </div>
  );
}

/** Forma orgánica como las ondas naranjas de los menús oficiales. */
export function Blob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden className={className} preserveAspectRatio="none">
      <path
        fill="currentColor"
        d="M452 66c64 42 117 116 120 196 4 82-43 170-112 226-69 57-160 82-245 64C130 534 51 473 23 393-6 312 18 214 74 146 130 79 218 42 300 34c55-5 110 3 152 32Z"
      />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 1 1 6.98 3.86Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
