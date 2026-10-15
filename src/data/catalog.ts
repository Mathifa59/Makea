import type { StaticImageData } from "next/image";

import chocolateImg from "@/assets/hero-cuchara.jpg";
import maracuyaImg from "@/assets/maracuya.jpg";
import tresLechesImg from "@/assets/tres-leches-fila.jpg";
import chocotejasMesaImg from "@/assets/chocotejas-mesa.jpg";
import chocotejasPlatoImg from "@/assets/chocotejas-plato.jpg";
import cuchareablesFilaImg from "@/assets/cuchareables-fila.jpg";
import chocotejasFrascoImg from "@/assets/chocotejas-frasco.jpg";

/**
 * Catálogo basado exclusivamente en los menús oficiales de MAKEA
 * ("Sabores MAKEA 1" y "Sabores MAKEA 2"). Sin precios ni ingredientes inventados.
 */

export type Category = {
  id: string;
  name: string;
  flavors: string[];
  note?: string;
  image?: { src: StaticImageData; alt: string; position?: string };
};

export type ProductLine = {
  id: "cuchareables" | "chocotejas";
  name: string;
  tagline: string;
  intro: string;
  cover: { src: StaticImageData; alt: string };
  categories: Category[];
};

export const productLines: ProductLine[] = [
  {
    id: "cuchareables",
    name: "Cuchareables",
    tagline: "Cremosos, irresistibles y hechos para disfrutar",
    intro:
      "Postres en vaso pensados para disfrutarse a cucharadas: capas suaves, toppings generosos y sabores para cada antojo.",
    cover: {
      src: cuchareablesFilaImg,
      alt: "Fila de postres cuchareables MAKEA en envases kraft con el logo de la marca",
    },
    categories: [
      {
        id: "chocolatosos",
        name: "Chocolatosos",
        flavors: ["Pudín de chocolate", "Torta de chocolate"],
        image: {
          src: chocolateImg,
          alt: "Cuchara sacando un trozo de torta de chocolate de un cuchareable MAKEA",
          position: "50% 40%",
        },
      },
      {
        id: "clasicos-c",
        name: "Clásicos",
        flavors: ["Café", "Lúcuma", "Manzana"],
      },
      {
        id: "frutales",
        name: "Frutales",
        flavors: ["Fresa", "Frutos rojos", "Maracuyá", "Maracumango"],
        image: {
          src: maracuyaImg,
          alt: "Cuchareable MAKEA cubierto con pulpa y semillas de maracuyá",
          position: "50% 60%",
        },
      },
      {
        id: "tres-leches",
        name: "Tres leches",
        flavors: ["Tres leches de pistacho", "Tres leches"],
        image: {
          src: tresLechesImg,
          alt: "Tres leches de pistacho MAKEA al frente de una fila de cuchareables",
          position: "50% 70%",
        },
      },
      {
        id: "frescos",
        name: "Frescos",
        flavors: ["Menta"],
      },
      {
        id: "especiales",
        name: "Especiales",
        flavors: ["Oreo", "Guanábana"],
      },
    ],
  },
  {
    id: "chocotejas",
    name: "Chocotejas",
    tagline: "Tradición que endulza momentos",
    intro:
      "Bocados de chocolate rellenos, un clásico de siempre que reinventamos en sabores clásicos, tropicales, dulceros y con un toque de pisco.",
    cover: {
      src: chocotejasFrascoImg,
      alt: "Frasco de vidrio con chocotejas MAKEA sobre una mesa de madera",
    },
    categories: [
      {
        id: "clasicos-t",
        name: "Clásicos",
        flavors: ["Pecana", "Maní", "Pasas", "Higo", "Coco"],
        image: {
          src: chocotejasMesaImg,
          alt: "Chocotejas MAKEA sobre un plato blanco",
          position: "50% 55%",
        },
      },
      {
        id: "tropicales",
        name: "Tropicales",
        flavors: ["Maracuyá", "Pie de limón", "Frutos rojos", "Fresa", "Lúcuma", "Piña", "Menta"],
        note: "Opcional: convertirlos en cheesecakes.",
      },
      {
        id: "dulceros",
        name: "Dulceros",
        flavors: ["Oreo", "Ole ole", "Chin chin", "Gomitas", "Marshmallow", "Café"],
        image: {
          src: chocotejasPlatoImg,
          alt: "Vista cenital de cuatro chocotejas MAKEA en un plato cuadrado",
          position: "50% 50%",
        },
      },
      {
        id: "con-alcohol",
        name: "Con alcohol",
        flavors: ["Pasas borrachas", "Pisco sour", "Pisco sour de maracuyá"],
      },
    ],
  },
];

/** Todos los sabores, para la banda decorativa. */
export const allFlavors = Array.from(
  new Set(productLines.flatMap((l) => l.categories.flatMap((c) => c.flavors))),
);
