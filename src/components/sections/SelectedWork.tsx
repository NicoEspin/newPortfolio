import { projects } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import WorkRow from "@/components/sections/WorkRow";

export default function SelectedWork() {
  return (
    <section
      id="work"
      aria-label="Selected Work"
      style={{
        background: "var(--color-paper)",
        color: "var(--color-ink)",
        padding: "96px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: "1px solid var(--color-line-light)",
          paddingBottom: 16,
          marginBottom: 8,
        }}
      >
        <span className="mono-label" style={{ color: "var(--color-steel)" }}>
           SELECTED WORK
        </span>
        
      </div>

      <div>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <WorkRow project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
