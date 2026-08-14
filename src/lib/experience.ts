// Placeholder content — reemplazar cada campo marcado antes de publicar.
// Solo la primera entrada (Synttek) está confirmada; el resto son placeholders explícitos.

export type ExperienceEntry = {
  index: string;
  period: string;
  /** ISO start date for <time dateTime>. Omit only while the period stays a placeholder. */
  startDate?: string;
  endDate?: string;
  role: string;
  org: string;
  location: string;
  description: string;
  focus?: string[];
  projectSlug?: string;
};

export const experience: ExperienceEntry[] = [
  {
    index: "01",
    period: "2024 — NOW",
    startDate: "2024-01-01",
    role: "Founder & Creative Full-Stack Developer",
    org: "Synttek",
    location: "Córdoba, Argentina · Remote",
    description:
      "Dirección de productos digitales, sitios, sistemas internos y automatizaciones desde la definición del problema hasta su salida a producción.",
    focus: ["Next.js", "TypeScript", "n8n"],
  },
  {
    index: "02",
    period: "[Reemplazar — período]",
    role: "[Reemplazar — rol]",
    org: "[Reemplazar — empresa o modalidad]",
    location: "[Reemplazar — ubicación]",
    description: "[Reemplazar — descripción]",
  },
  {
    index: "03",
    period: "[Reemplazar — período]",
    role: "[Reemplazar — rol]",
    org: "[Reemplazar — empresa o modalidad]",
    location: "[Reemplazar — ubicación]",
    description: "[Reemplazar — descripción]",
  },
];
