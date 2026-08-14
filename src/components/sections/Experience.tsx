import { experience } from "@/lib/experience";
import Reveal from "@/components/Reveal";
import ExperienceTrack from "@/components/sections/ExperienceTrack";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      style={{
        background: "var(--color-paper)",
        color: "var(--color-ink)",
        padding: "96px 24px",
      }}
    >
      <div className="experience-grid">
        <div className="experience-intro">
          <span className="mono-label" style={{ color: "var(--color-steel)" }}>
            EXPERIENCE
          </span>

          <Reveal as="h2" delay={0.05}>
            <span
              style={{
                display: "block",
                fontSize: "var(--text-heading)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 0.98,
                marginTop: 20,
              }}
            >
              Built in
            </span>
            <span
              style={{
                display: "block",
                fontSize: "var(--text-heading)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 0.98,
              }}
            >
              <em
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--color-signal-soft)",
                }}
              >
                production.
              </em>
            </span>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="reading-measure" style={{ marginTop: 24 }}>
              Una trayectoria hecha de productos lanzados, sistemas internos y
              decisiones que tuvieron que funcionar fuera del portfolio.
            </p>
          </Reveal>

          <div
            className="mono-label"
            style={{
              marginTop: 40,
              color: "var(--color-steel)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span>Córdoba, Argentina</span>
            <span>Working worldwide</span>
          </div>
        </div>

        <ExperienceTrack entries={experience} />
      </div>
    </section>
  );
}
