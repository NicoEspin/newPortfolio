import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAdjacentProject, getProject, projects } from "@/lib/projects";
import SignalLink from "@/components/SignalLink";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — NE.`,
    description: project.solution,
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  const DETAILS = [
    { label: "PROBLEMA", value: project.problem, accent: true },
    { label: "SOLUCIÓN", value: project.solution, accent: true },
    { label: "ROL / STACK", value: `${project.role} · ${project.stack.join(", ")}`, accent: false },
    { label: "RESULTADO", value: project.result, accent: false },
  ];

  return (
    <article
      style={{
        background: "var(--color-void)",
        color: "var(--color-paper)",
        minHeight: "100svh",
        padding: "140px 24px 96px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SignalLink
          href="/#work"
          className="mono-label"
          style={{ color: "var(--color-steel)" }}
        >
          ← Back to Work
        </SignalLink>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: 24,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="mono-label" style={{ color: "var(--color-steel)" }}>
              03 — PROJECT
            </span>
            <h1
              style={{
                fontSize: "var(--text-heading)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginTop: 8,
              }}
            >
              {project.name}
            </h1>
          </div>
          <div className="mono-label" style={{ color: "var(--color-steel)", textAlign: "right" }}>
            {project.year}
            <br />
            {project.category}
          </div>
        </div>

        <Reveal>
          <div
            aria-hidden="true"
            style={{
              width: "100%",
              height: "clamp(220px, 40vw, 440px)",
              background: "linear-gradient(160deg, var(--color-signal), var(--color-ink) 70%)",
              border: "1px solid var(--color-line-dark)",
              marginTop: 40,
            }}
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            background: "var(--color-line-dark)",
            border: "1px solid var(--color-line-dark)",
            marginTop: "1px",
          }}
        >
          {DETAILS.map((d) => (
            <div key={d.label} style={{ background: "var(--color-void)", padding: 28 }}>
              <span
                className="mono-label"
                style={{ color: d.accent ? "var(--color-signal)" : "var(--color-steel)" }}
              >
                {d.label}
              </span>
              <p style={{ marginTop: 10, lineHeight: 1.5 }}>{d.value}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid var(--color-line-dark)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="mono-label" style={{ color: "var(--color-steel)" }}>
            NEXT PROJECT
          </span>
          <SignalLink
            href={`/work/${next.slug}`}
            data-cursor-hover
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.015em",
              borderBottom: "1px solid var(--color-paper)",
              paddingBottom: 4,
            }}
          >
            {next.name} →
          </SignalLink>
        </div>
      </div>
    </article>
  );
}
