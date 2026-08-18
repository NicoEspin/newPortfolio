"use client";

import { useTranslations } from "next-intl";
import type { Project } from "@/lib/projects";
import SignalLink from "@/components/SignalLink";
import Reveal from "@/components/Reveal";

export default function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  const t = useTranslations();

  const DETAILS = [
    {
      label: t("workDetail.detailsLabels.problem"),
      value: t(`projects.${project.slug}.problem`),
      accent: true,
    },
    {
      label: t("workDetail.detailsLabels.solution"),
      value: t(`projects.${project.slug}.solution`),
      accent: true,
    },
    {
      label: t("workDetail.detailsLabels.roleStack"),
      value: `${project.role} · ${project.stack.join(", ")}`,
      accent: false,
    },
    {
      label: t("workDetail.detailsLabels.result"),
      value: t(`projects.${project.slug}.result`),
      accent: false,
    },
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
          {t("workDetail.backToWork")}
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
              {t("workDetail.indexLabel")}
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
            {project.status === "concept" && (
              <p className="mono-label" style={{ color: "var(--color-steel)", marginTop: 10 }}>
                {t("workDetail.conceptDemo")}
              </p>
            )}
          </div>
          <div className="mono-label" style={{ color: "var(--color-steel)", textAlign: "right" }}>
            {project.year}
            <br />
            {t(`projects.${project.slug}.category`)}
          </div>
        </div>

        <Reveal>
          <div
            style={{
              width: "100%",
              height: "clamp(220px, 40vw, 440px)",
              overflow: "hidden",
              border: "1px solid var(--color-line-dark)",
              marginTop: 40,
            }}
          >
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={t("workDetail.videoDemoAlt", { name: project.name })}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <img
                src={project.heroImage.src}
                width={project.heroImage.width}
                height={project.heroImage.height}
                alt={t("workDetail.heroImageAlt", { name: project.name })}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
          </div>
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

        {project.gallery.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: "var(--color-line-dark)",
              border: "1px solid var(--color-line-dark)",
              marginTop: 64,
            }}
          >
            {project.gallery.map((img, i) => (
              <Reveal key={i}>
                <div style={{ position: "relative", background: "var(--color-void)" }}>
                  <img
                    src={img.src}
                    width={img.width}
                    height={img.height}
                    alt={t("workDetail.galleryImageAlt", { index: i + 1, name: project.name })}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <span
                    className="mono-label"
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      color: "var(--color-paper)",
                      background: "rgba(8, 9, 10, 0.55)",
                      padding: "4px 8px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, display: "flex", justifyContent: "flex-end" }}>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="mono-label"
            style={{
              color: "var(--color-signal)",
              borderBottom: "1px solid var(--color-signal)",
              paddingBottom: 4,
            }}
          >
            {t("workDetail.viewLiveSite")}
          </a>
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
            {t("workDetail.nextProject")}
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
