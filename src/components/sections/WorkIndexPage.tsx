"use client";

import { useTranslations } from "next-intl";
import type { Project } from "@/lib/projects";
import SignalLink from "@/components/SignalLink";
import Reveal from "@/components/Reveal";
import WorkIndex from "@/components/sections/WorkIndex";

export default function WorkIndexPage({ projects }: { projects: Project[] }) {
  const t = useTranslations("workIndex");

  return (
    <div className="work-index">
      <div className="work-index__inner">
        <SignalLink href="/#work" className="mono-label" style={{ color: "var(--color-steel)" }}>
          {t("backHome")}
        </SignalLink>

        <div className="work-index__head">
          <span className="mono-label" style={{ color: "var(--color-steel)" }}>
            {t("count", { count: String(projects.length).padStart(2, "0") })}
          </span>
          <Reveal>
            <h1 className="work-index__title">{t("title")}</h1>
          </Reveal>
        </div>

        <WorkIndex projects={projects} />
      </div>
    </div>
  );
}
