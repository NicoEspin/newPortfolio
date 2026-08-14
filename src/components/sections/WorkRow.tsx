import type { Project } from "@/lib/projects";
import SignalLink from "@/components/SignalLink";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "● LIVE",
  production: "● IN PRODUCTION",
  archived: "ARCHIVED",
};

export default function WorkRow({ project }: { project: Project }) {
  return (
    <SignalLink href={`/work/${project.slug}`} className="work-row" data-cursor-hover>
      <div
        className="work-row__thumb"
        style={{
          background: `linear-gradient(135deg, var(--color-signal), #1a1a1c)`,
        }}
        aria-hidden="true"
      />
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
      <span className="mono-label" style={{ color: "var(--color-steel)", whiteSpace: "nowrap" }}>
        {project.year} · {project.category}
      </span>
    </SignalLink>
  );
}
