export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  location: string;
};

export type ExperienceEntry = Experience & {
  index: string;
  startDate?: string;
  endDate?: string;
  projectSlug?: string;
};

export const experience: ExperienceEntry[] = [
  {
    index: "01",
    period: "2024 — NOW",
    startDate: "2024-01-01",
    role: "Founder & Creative Full-Stack Developer",
    company: "Synttek",
    location: "CÓRDOBA, ARGENTINA · REMOTE",
    description:
      "Fundé y dirijo Synttek, un estudio digital desde el que diseño y desarrollo productos, sitios, sistemas internos y automatizaciones de punta a punta. Lideré más de 60 entregas, conectando estrategia, experiencia, código e infraestructura para convertir necesidades de negocio en soluciones listas para producción.",
    technologies: ["NEXT.JS", "TYPESCRIPT", "NESTJS", "POSTGRESQL", "N8N"],
  },
  {
    index: "02",
    period: "JAN 2025 — MAR 2026",
    startDate: "2025-01-01",
    endDate: "2026-03-31",
    role: "Full-Stack Developer",
    company: "Andeshire",
    location: "REMOTE",
    description:
      "Lideré la migración desde Django Templates hacia Next.js, TypeScript y Redux, estableciendo patrones adoptados por todo el equipo. Construí un sistema de diseño con más de 600 componentes que redujo aproximadamente un 30% el tiempo de desarrollo, mejoré el rendimiento del producto y diseñé flujos con agentes de IA para automatizar procesos de reclutamiento.",
    technologies: ["NEXT.JS", "TYPESCRIPT", "REDUX", "DJANGO", "AI AGENTS"],
  },
  {
    index: "03",
    period: "FEB 2025 — MAY 2025",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    role: "Full-Stack Developer",
    company: "WeHunter",
    location: "REMOTE",
    description:
      "Desarrollé y entregué un MVP listo para producción en tres meses, permitiendo validar el modelo de negocio con usuarios reales. Diseñé una arquitectura de datos para más de 10.000 registros, integré APIs externas y transformé los diseños de Figma en una experiencia responsive y pixel-perfect.",
    technologies: ["React.js", "Node.js", "REST APIS", "FIGMA", "QA"],
  },
  {
    index: "04",
    period: "AUG 2024 — FEB 2025",
    startDate: "2024-08-01",
    endDate: "2025-02-28",
    role: "WordPress Developer",
    company: "Freelance",
    location: "CÓRDOBA, ARGENTINA · REMOTE",
    description:
      "Desarrollé más de cinco soluciones WordPress a medida y optimicé su arquitectura, caché e imágenes para reducir los tiempos de carga aproximadamente un 50%. Combiné desarrollo mobile-first, SEO técnico y soporte continuo, manteniendo una tasa de retención de clientes del 100%.",
    technologies: ["WORDPRESS", "PHP", "SEO", "PERFORMANCE"],
  },
  {
    index: "05",
    period: "DEC 2022 — NOW",
    startDate: "2022-12-01",
    role: "Full-Stack Developer",
    company: "Personal Projects",
    location: "CÓRDOBA, ARGENTINA",
    description:
      "Diseñé y publiqué aplicaciones full stack con el stack MERN, incorporando APIs REST, autenticación JWT y funcionalidades en tiempo real con Socket.io. Gestioné el ciclo completo de cada producto, desde la definición y arquitectura hasta el despliegue mediante CI/CD e infraestructura cloud.",
    technologies: ["REACT", "NODE.JS", "MONGODB", "SOCKET.IO", "JWT"],
  },
];
