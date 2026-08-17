"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Project, ProjectType } from "@/lib/projects";
import { PROJECT_TYPES } from "@/lib/projects";
import SignalLink from "@/components/SignalLink";
import { prefersReducedMotion } from "@/lib/motion";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "● LIVE",
  production: "● IN PRODUCTION",
  concept: "○ CONCEPT",
};

type FilterValue = ProjectType | "All";

const FILTERS: FilterValue[] = ["All", ...PROJECT_TYPES];

/**
 * Visual archive of every project — distinct identity from the home
 * "Selected Work" typographic list (see docs/visual-direction.md): here the
 * hero image leads each card, always visible (no hover-reveal), because
 * this page's job is to be scanned as a gallery, not read as a list.
 */
export default function WorkIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterValue>("All");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.type === filter)),
    [projects, filter]
  );

  const counts = useMemo(() => {
    const map = new Map<FilterValue, number>();
    map.set("All", projects.length);
    for (const t of PROJECT_TYPES) map.set(t, projects.filter((p) => p.type === t).length);
    return map;
  }, [projects]);

  useGSAP(
    () => {
      if (!gridRef.current || prefersReducedMotion()) return;
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
      );
    },
    { dependencies: [filter], scope: gridRef }
  );

  return (
    <>
      <div className="work-index__filters" role="group" aria-label="Filtrar proyectos por tipo">
        {FILTERS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            aria-pressed={filter === t}
            className="mono-label work-index__filter"
            data-active={filter === t}
          >
            {t === "All" ? "TODOS" : t.toUpperCase()} ({counts.get(t)})
          </button>
        ))}
      </div>

      <div ref={gridRef} className="work-index__grid">
        {filtered.map((project) => (
          <SignalLink
            key={project.slug}
            href={`/work/${project.slug}`}
            data-cursor-hover
            className="work-index__card"
          >
            <div className="work-index__card-media">
              <img
                src={project.heroImage.src}
                width={project.heroImage.width}
                height={project.heroImage.height}
                alt=""
                className="work-index__card-img"
                draggable={false}
              />
              <span className="mono-label work-index__card-index">{project.index}</span>
              <span
                className="mono-label work-index__card-status"
                style={{
                  color: project.status === "live" ? "var(--color-signal)" : "var(--color-paper)",
                }}
              >
                {STATUS_LABEL[project.status]}
              </span>
            </div>
            <div className="work-index__card-body">
              <span className="work-index__card-name">{project.name}</span>
              <span className="mono-label work-index__card-meta">
                {project.year} · {project.category}
              </span>
            </div>
          </SignalLink>
        ))}
      </div>
    </>
  );
}
