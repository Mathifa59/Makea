import Image from "next/image";

import logo from "@/assets/logo.png";
import { navItems, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-crema">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 border-t border-cacao/10 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <Image src={logo} alt={site.name} className="h-10 w-auto" sizes="80px" />
          <p className="font-display text-lg italic text-cacao-2">Tu paladar, la prioridad.</p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-semibold text-cacao-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="transition-colors hover:text-naranja-hondo">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-cacao-2">© {site.name} · Chocotejas &amp; cuchareables</p>
      </div>
    </footer>
  );
}
