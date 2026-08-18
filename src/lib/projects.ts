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
  year: string;
  status: "live" | "production" | "concept";
  role: string;
  stack: string[];
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
    year: "2026",
    status: "production",
    role: "Full-stack Developer · Product Architecture",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Cloudflare R2"],
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
    year: "2026",
    status: "live",
    role: "Full-stack Developer · Product Designer",
    stack: ["React", "TypeScript", "Express", "MongoDB", "Gemini", "Cloudinary"],
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
    year: "2026",
    status: "live",
    role: "Frontend Developer · UX/UI",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "React Hook Form", "Zod"],
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
    year: "2025—2026",
    status: "live",
    role: "Founder · Full-stack Developer",
    stack: ["Next.js", "React", "next-intl", "JSON-LD", "Motion", "Lenis"],
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
    year: "2026",
    status: "concept",
    role: "Frontend Developer · Creative Development",
    stack: ["React", "TypeScript", "Vite", "GSAP", "React Router"],
    demoUrl: "https://demo-viajes-five.vercel.app/",
    heroImage: viajesHero,
    gallery: [viajesGallery1, viajesGallery2, viajesGallery3],
  },
  {
    slug: "hotel-california",
    index: "06",
    name: "Hotel California",
    type: "Concept",
    year: "2026",
    status: "concept",
    role: "Frontend Developer · Creative Development",
    stack: ["React", "TypeScript", "Vite", "GSAP", "Lenis"],
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
