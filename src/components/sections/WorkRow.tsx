import type { Project } from "@/lib/projects";
import SignalLink from "@/components/SignalLink";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "● LIVE",
  production: "● IN PRODUCTION",
  concept: "○ CONCEPT DEMO",
};

export default function WorkRow({ project }: { project: Project }) {
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
          {STATUS_LABEL[project.status]}
        </span>{" "}
        · {project.year} · {project.category}
      </span>
    </SignalLink>
  );
}
