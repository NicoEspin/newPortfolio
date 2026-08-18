"use client";

import { useTranslations } from "next-intl";
import type { Project } from "@/lib/projects";
import SignalLink from "@/components/SignalLink";

export default function WorkRow({ project }: { project: Project }) {
  const t = useTranslations();
  return (
    <SignalLink href={`/work/${project.slug}`} className="work-row" data-cursor-hover>
      <div className="work-row__thumb" aria-hidden="true">
        <img
          src={project.heroImage.src}
          width={project.heroImage.width}
          height={project.heroImage.height}
          alt=""
          className="work-row__thumb-img"
          draggable={false}
        />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 20, flex: 1, minWidth: 0 }}>
     
        <span
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {project.name}
        </span>
      </div>
      <span className="mono-label work-row__meta" style={{ color: "var(--color-steel)" }}>
        <span style={{ color: project.status === "live" ? "var(--color-signal)" : "var(--color-steel)" }}>
          {t(`common.status.${project.status}`)}
        </span>{" "}
        · {project.year} · {t(`projects.${project.slug}.category`)}
      </span>
    </SignalLink>
  );
}
