import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import SignalLink from "@/components/SignalLink";
import Reveal from "@/components/Reveal";
import WorkIndex from "@/components/sections/WorkIndex";

export const metadata: Metadata = {
  title: "Work — NE.",
  description:
    "Todos los proyectos de Nicolás Espin: SaaS, web experiences y demos conceptuales, filtrables por tipo.",
};

export default function WorkIndexPage() {
  return (
    <div className="work-index">
      <div className="work-index__inner">
        <SignalLink href="/#work" className="mono-label" style={{ color: "var(--color-steel)" }}>
          ← Home
        </SignalLink>

        <div className="work-index__head">
          <span className="mono-label" style={{ color: "var(--color-steel)" }}>
            {String(projects.length).padStart(2, "0")} PROYECTOS
          </span>
          <Reveal>
            <h1 className="work-index__title">Todo el trabajo.</h1>
          </Reveal>
        </div>

        <WorkIndex projects={projects} />
      </div>
    </div>
  );
}
