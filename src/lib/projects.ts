import type { StaticImageData } from "next/image";

import constructoraHero from "@/assets/projects/constructora-saas/hero.webp";
import constructoraGallery1 from "@/assets/projects/constructora-saas/gallery-1.webp";
import constructoraGallery2 from "@/assets/projects/constructora-saas/gallery-2.webp";
import constructoraGallery3 from "@/assets/projects/constructora-saas/gallery-3.webp";

import thumblifyHero from "@/assets/projects/thumblify/hero.webp";
import thumblifyGallery1 from "@/assets/projects/thumblify/gallery-1.webp";
import thumblifyGallery2 from "@/assets/projects/thumblify/gallery-2.webp";
import thumblifyGallery3 from "@/assets/projects/thumblify/gallery-3.webp";

import ranchHero from "@/assets/projects/ranch/hero.webp";
import ranchGallery1 from "@/assets/projects/ranch/gallery-1.webp";
import ranchGallery2 from "@/assets/projects/ranch/gallery-2.webp";
import ranchGallery3 from "@/assets/projects/ranch/gallery-3.webp";

import synttekHero from "@/assets/projects/synttek/hero.webp";
import synttekGallery1 from "@/assets/projects/synttek/gallery-1.webp";
import synttekGallery2 from "@/assets/projects/synttek/gallery-2.webp";
import synttekGallery3 from "@/assets/projects/synttek/gallery-3.webp";

import viajesHero from "@/assets/projects/viajes-cordoba/hero.webp";
import viajesGallery1 from "@/assets/projects/viajes-cordoba/gallery-1.webp";
import viajesGallery2 from "@/assets/projects/viajes-cordoba/gallery-2.webp";
import viajesGallery3 from "@/assets/projects/viajes-cordoba/gallery-3.webp";

import hotelHero from "@/assets/projects/hotel-california/hero.webp";
import hotelGallery1 from "@/assets/projects/hotel-california/gallery-1.webp";
import hotelGallery2 from "@/assets/projects/hotel-california/gallery-2.webp";
import hotelGallery3 from "@/assets/projects/hotel-california/gallery-3.webp";

export type ProjectType = "SaaS" | "Web Experience" | "Concept";

export type Project = {
  slug: string;
  index: string;
  name: string;
  type: ProjectType;
  category: string;
  year: string;
  status: "live" | "production" | "concept";
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  result: string;
  demoUrl: string;
  heroImage: StaticImageData;
  gallery: StaticImageData[];
  video?: string;
};

export const PROJECT_TYPES: ProjectType[] = ["SaaS", "Web Experience", "Concept"];

export const projects: Project[] = [
  {
    slug: "constructora-saas",
    index: "01",
    name: "Constructora SaaS",
    type: "SaaS",
    category: "SaaS B2B · Software a medida",
    year: "2026",
    status: "production",
    problem:
      "Las constructoras distribuyen obras, presupuestos y materiales entre planillas y chats que no se comunican entre sí, perdiendo de vista el costo real de cada obra.",
    solution:
      "Backoffice multi-tenant con aislamiento real por organización: obras, presupuestos, gastos e inventario con movimientos reversibles y reporting, todo bajo roles y permisos validados en la API.",
    role: "Full-stack Developer · Product Architecture",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Cloudflare R2"],
    result:
      "Sistema completo en producción, con pruebas de aislamiento entre tenants y trazabilidad de cada movimiento de stock — no un CRUD con login encima.",
    demoUrl: "https://constructora.site/",
    heroImage: constructoraHero,
    gallery: [constructoraGallery1, constructoraGallery2, constructoraGallery3],
    video: "/projects/constructora-saas/demo.webm",
  },
  {
    slug: "thumblify",
    index: "02",
    name: "Thumblify",
    type: "SaaS",
    category: "AI SaaS · Producto digital",
    year: "2026",
    status: "live",
    problem:
      "Producir thumbnails de YouTube consistentes exige tiempo e iteración, y los generadores de imagen genéricos no entienden el formato ni la legibilidad que pide la plataforma.",
    solution:
      "Flujo guiado que traduce título, estilo, esquema de color y hasta dos imágenes de referencia en un prompt multimodal generado con Gemini, organizado en galería personal o comunidad pública.",
    role: "Full-stack Developer · Product Designer",
    stack: ["React", "TypeScript", "Express", "MongoDB", "Gemini", "Cloudinary"],
    result:
      "Producto end-to-end en vivo: autenticación, generación, galería privada y comunidad pública funcionando con polling en tiempo real, en español e inglés.",
    demoUrl: "https://thumblify-chi-henna.vercel.app/",
    heroImage: thumblifyHero,
    gallery: [thumblifyGallery1, thumblifyGallery2, thumblifyGallery3],
    video: "/projects/thumblify/demo.webm",
  },
  {
    slug: "ranch",
    index: "03",
    name: "Ranch VCP",
    type: "Web Experience",
    category: "Web Experience · Gastronomía",
    year: "2026",
    status: "live",
    problem:
      "Las cartas en PDF o imagen se desactualizan y obligan al cliente a reconstruir su pedido a mano dentro de WhatsApp.",
    solution:
      "Carta digital por categorías con armado de pedido, personalización por ingredientes y generación automática del mensaje de WhatsApp con sucursal, entrega y detalle completo.",
    role: "Frontend Developer · UX/UI",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "React Hook Form", "Zod"],
    result:
      "Experiencia mobile-first en vivo, con reservas para dos sucursales y un pedido que llega a WhatsApp ya formateado, sin fricción de cuentas ni apps.",
    demoUrl: "https://ranchvcp.vercel.app/",
    heroImage: ranchHero,
    gallery: [ranchGallery1, ranchGallery2, ranchGallery3],
    video: "/projects/ranch/demo.webm",
  },
  {
    slug: "synttek",
    index: "04",
    name: "Synttek",
    type: "Web Experience",
    category: "Brand Platform · Web Development",
    year: "2025—2026",
    status: "live",
    problem:
      "Una agencia multidisciplinaria necesita explicar qué hace, mostrar trabajo real y generar consultas sin depender solo de redes sociales.",
    solution:
      "Plataforma bilingüe con páginas de servicio, casos de estudio, blog, landings locales y un asistente conversacional en streaming que prepara el traspaso del lead a WhatsApp.",
    role: "Founder · Full-stack Developer",
    stack: ["Next.js", "React", "next-intl", "JSON-LD", "Motion", "Lenis"],
    result:
      "Plataforma comercial propia en producción, con SEO técnico completo (hreflang, sitemap, datos estructurados) y un chatbot funcionando sobre eventos SSE.",
    demoUrl: "https://www.synttek.com/",
    heroImage: synttekHero,
    gallery: [synttekGallery1, synttekGallery2, synttekGallery3],
    video: "/projects/synttek/demo.webm",
  },
  {
    slug: "viajes-cordoba",
    index: "05",
    name: "Viajes Córdoba",
    type: "Concept",
    category: "Concept Web Experience · Turismo",
    year: "2026",
    status: "concept",
    problem:
      "Las agencias de turismo suelen mostrar destinos como listas intercambiables, sin transmitir criterio ni conocimiento real del territorio.",
    solution:
      "Catálogo editorial de seis circuitos filtrables por duración y perfil, con itinerarios día por día y consulta directa por WhatsApp — demo conceptual, no un cliente real.",
    role: "Frontend Developer · Creative Development",
    stack: ["React", "TypeScript", "Vite", "GSAP", "React Router"],
    result:
      "Pieza de exploración de dirección editorial: navegación por rutas reales, scroll progress y soporte de reduced motion, con datos de ejemplo.",
    demoUrl: "https://demo-viajes-five.vercel.app/",
    heroImage: viajesHero,
    gallery: [viajesGallery1, viajesGallery2, viajesGallery3],
  },
  {
    slug: "hotel-california",
    index: "06",
    name: "Hotel California",
    type: "Concept",
    category: "Concept Landing Page · Hospitality",
    year: "2026",
    status: "concept",
    problem:
      "Muchos hoteles dependen de plataformas intermediarias y pierden marca en sitios funcionales pero indiferenciados.",
    solution:
      "Landing cinematográfica con parallax, métricas animadas y disponibilidad orientada a reserva directa por WhatsApp — demo conceptual, no un sistema de reservas real.",
    role: "Frontend Developer · Creative Development",
    stack: ["React", "TypeScript", "Vite", "GSAP", "Lenis"],
    result:
      "Pieza de dirección visual: cursor custom, parallax y contadores con GSAP/ScrollTrigger, con soporte completo de reduced motion.",
    demoUrl: "https://demo-hotel-eight.vercel.app/",
    heroImage: hotelHero,
    gallery: [hotelGallery1, hotelGallery2, hotelGallery3],
    video: "/projects/hotel-california/demo.webm",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
