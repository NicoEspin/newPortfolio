// Placeholder content — reemplazar cada campo por datos reales antes de publicar.
// Los nombres, cifras y descripciones de esta lista son de ejemplo, no proyectos reales.

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  year: string;
  status: "live" | "production" | "archived";
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  result: string;
};

export const projects: Project[] = [
  {
    slug: "proyecto-01",
    index: "01",
    name: "[Reemplazar — Nombre del proyecto 1]",
    category: "Producto digital",
    year: "2025",
    status: "production",
    problem: "[Reemplazar: qué problema real tenía el cliente antes de este proyecto]",
    solution: "[Reemplazar: qué se construyó para resolverlo]",
    role: "[Reemplazar: tu rol — ej. Full-stack solo]",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    result: "[Reemplazar: resultado medible — ej. -40% tiempo administrativo]",
  },
  {
    slug: "proyecto-02",
    index: "02",
    name: "[Reemplazar — Nombre del proyecto 2]",
    category: "Sistema de negocio",
    year: "2025",
    status: "live",
    problem: "[Reemplazar: problema real]",
    solution: "[Reemplazar: solución construida]",
    role: "[Reemplazar: rol]",
    stack: ["React", "Node.js", "n8n"],
    result: "[Reemplazar: resultado medible]",
  },
  {
    slug: "proyecto-03",
    index: "03",
    name: "[Reemplazar — Nombre del proyecto 3]",
    category: "Web experience",
    year: "2024",
    status: "live",
    problem: "[Reemplazar: problema real]",
    solution: "[Reemplazar: solución construida]",
    role: "[Reemplazar: rol]",
    stack: ["Next.js", "GSAP", "Sanity"],
    result: "[Reemplazar: resultado medible]",
  },
  {
    slug: "proyecto-04",
    index: "04",
    name: "[Reemplazar — Nombre del proyecto 4]",
    category: "Automatización",
    year: "2024",
    status: "production",
    problem: "[Reemplazar: problema real]",
    solution: "[Reemplazar: solución construida]",
    role: "[Reemplazar: rol]",
    stack: ["Python", "OpenAI API", "n8n"],
    result: "[Reemplazar: resultado medible]",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
