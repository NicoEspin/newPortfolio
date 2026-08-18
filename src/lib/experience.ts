export type Experience = {
  period: string;
  role: string;
  company: string;
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
    technologies: ["WORDPRESS", "PHP", "SEO", "PERFORMANCE"],
  },
  {
    index: "05",
    period: "DEC 2022 — NOW",
    startDate: "2022-12-01",
    role: "Full-Stack Developer",
    company: "Personal Projects",
    location: "CÓRDOBA, ARGENTINA",
    technologies: ["REACT", "NODE.JS", "MONGODB", "SOCKET.IO", "JWT"],
  },
];
